import { defineComponent as fe, shallowRef as xi, h as He, ref as oe, onMounted as Je, onUnmounted as lt, watch as Te, toRaw as Jn, nextTick as Ke, version as Yl, isProxy as ki, computed as C, toRef as $e, openBlock as h, createElementBlock as x, normalizeStyle as _e, createVNode as z, unref as T, createElementVNode as d, Fragment as he, renderList as pe, normalizeClass as Z, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as _i, createStaticVNode as eo, useSlots as ho, renderSlot as ke, Transition as ct, withCtx as E, Comment as ql, createBlock as te, resolveDynamicComponent as rt, createTextVNode as Ae, Teleport as ea, withDirectives as Xe, withModifiers as Be, vModelText as Pt, vShow as Ht, createSlots as Vo, vModelSelect as Xl, mergeProps as yt, useAttrs as Ja, withKeys as Ca, inject as wi } from "vue";
import * as No from "echarts/core";
import { TooltipComponent as Gl, TitleComponent as Zl } from "echarts/components";
import { SankeyChart as Ql } from "echarts/charts";
import { CanvasRenderer as Jl } from "echarts/renderers";
import Ne from "moment";
function en(e) {
  return e + 0.5 | 0;
}
const Xt = (e, t, a) => Math.max(Math.min(e, a), t);
function Fa(e) {
  return Xt(en(e * 2.55), 0, 255);
}
function Jt(e) {
  return Xt(en(e * 255), 0, 255);
}
function Vt(e) {
  return Xt(en(e / 2.55) / 100, 0, 1);
}
function zo(e) {
  return Xt(en(e * 100), 0, 100);
}
const vt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, to = [..."0123456789ABCDEF"], er = (e) => to[e & 15], tr = (e) => to[(e & 240) >> 4] + to[e & 15], on = (e) => (e & 240) >> 4 === (e & 15), ar = (e) => on(e.r) && on(e.g) && on(e.b) && on(e.a);
function nr(e) {
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
const or = (e, t) => e < 255 ? t(e) : "";
function sr(e) {
  var t = ar(e) ? er : tr;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + or(e.a, t) : void 0;
}
const ir = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ci(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function lr(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function rr(e, t, a) {
  const n = Ci(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function cr(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function fo(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), l = (s + i) / 2;
  let r, c, u;
  return s !== i && (u = s - i, c = l > 0.5 ? u / (2 - s - i) : u / (s + i), r = cr(a, n, o, u, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function go(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Jt);
}
function mo(e, t, a) {
  return go(Ci, e, t, a);
}
function dr(e, t, a) {
  return go(rr, e, t, a);
}
function ur(e, t, a) {
  return go(lr, e, t, a);
}
function $i(e) {
  return (e % 360 + 360) % 360;
}
function hr(e) {
  const t = ir.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Fa(+t[5]) : Jt(+t[5]));
  const o = $i(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = dr(o, s, i) : t[1] === "hsv" ? n = ur(o, s, i) : n = mo(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function fr(e, t) {
  var a = fo(e);
  a[0] = $i(a[0] + t), a = mo(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function gr(e) {
  if (!e)
    return;
  const t = fo(e), a = t[0], n = zo(t[1]), o = zo(t[2]);
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
function mr() {
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
function pr(e) {
  sn || (sn = mr(), sn.transparent = [0, 0, 0, 0]);
  const t = sn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const br = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function vr(e) {
  const t = br.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Fa(i) : Xt(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Fa(n) : Xt(n, 0, 255)), o = 255 & (t[4] ? Fa(o) : Xt(o, 0, 255)), s = 255 & (t[6] ? Fa(s) : Xt(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function yr(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Vt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Vn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ba = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function xr(e, t, a) {
  const n = ba(Vt(e.r)), o = ba(Vt(e.g)), s = ba(Vt(e.b));
  return {
    r: Jt(Vn(n + a * (ba(Vt(t.r)) - n))),
    g: Jt(Vn(o + a * (ba(Vt(t.g)) - o))),
    b: Jt(Vn(s + a * (ba(Vt(t.b)) - s))),
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
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Jt(e[3]))) : (t = Si(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Jt(t.a)), t;
}
function kr(e) {
  return e.charAt(0) === "r" ? vr(e) : hr(e);
}
class Wa {
  constructor(t) {
    if (t instanceof Wa)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Wo(t) : a === "string" && (n = nr(t) || pr(t) || kr(t)), this._rgb = n, this._valid = !!n;
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
    return this._valid ? yr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? sr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? gr(this._rgb) : void 0;
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
    return t && (this._rgb = xr(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new Wa(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Jt(t), this;
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
    return fr(this._rgb, t), this;
  }
}
function Et() {
}
const _r = /* @__PURE__ */ (() => {
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
function Bt(e, t) {
  return wt(e) ? e : t;
}
function De(e, t) {
  return typeof e > "u" ? t : e;
}
const wr = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Mi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
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
function Cr(e, t, a, n) {
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
  const s = a.merger || Cr;
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
function Na(e, t) {
  return Ka(e, t, {
    merger: $r
  });
}
function $r(e, t, a) {
  if (!Di(e))
    return;
  const n = t[e], o = a[e];
  Le(n) && Le(o) ? Na(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = $n(o));
}
const Ko = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Sr(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function Mr(e) {
  const t = Sr(e);
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
  return (Ko[t] || (Ko[t] = Mr(t)))(e);
}
function po(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Ua = (e) => typeof e < "u", ta = (e) => typeof e == "function", Uo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function Dr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Oe = Math.PI, Ue = 2 * Oe, Ar = Ue + Oe, Sn = Number.POSITIVE_INFINITY, Tr = Oe / 180, Qe = Oe / 2, sa = Oe / 4, Yo = Oe * 2 / 3, Ai = Math.log10, It = Math.sign;
function za(e, t, a) {
  return Math.abs(e - t) < a;
}
function qo(e) {
  const t = Math.round(e);
  e = za(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(Ai(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function Br(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function Lr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Ya(e) {
  return !Lr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Rr(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function Pr(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Nt(e) {
  return e * (Oe / 180);
}
function Ir(e) {
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
function Er(e, t) {
  return (e - t + Ar) % Ue - Oe;
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
function Fr(e) {
  return st(e, -32768, 32767);
}
function Gt(e, t, a, n = 1e-6) {
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
} : (o) => e[o][t] < a), Or = (e, t, a) => bo(e, a, (n) => e[n][t] >= a);
function Vr(e, t, a) {
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
function Nr(e, t) {
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
const vo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", at = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, jr = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Hr(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: g, max: m, minDefined: p, maxDefined: f } = i.getUserBounds();
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
    if (f) {
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
function Wr(e) {
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
function Nn(e) {
  return yo(e) ? e : new Wa(e).saturate(0.5).darken(0.1).hexString();
}
const Kr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Ur = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Yr(e) {
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
      properties: Ur
    },
    numbers: {
      type: "number",
      properties: Kr
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
function qr(e) {
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
function Xr(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = es.get(a);
  return n || (n = new Intl.NumberFormat(e, t), es.set(a, n)), n;
}
function xo(e, t, a) {
  return Xr(t, a).format(e);
}
const Gr = {
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
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Zr(e, a);
    }
    const i = Ai(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), xo(e, n, r);
  }
};
function Zr(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var Ii = {
  formatters: Gr
};
function Qr(e) {
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
function zn(e, t, a) {
  return typeof t == "string" ? Ka(Ha(e, t), a) : Ka(Ha(e, ""), t);
}
class Jr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => Nn(o.backgroundColor), this.hoverBorderColor = (n, o) => Nn(o.borderColor), this.hoverColor = (n, o) => Nn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return zn(this, t, a);
  }
  get(t) {
    return Ha(this, t);
  }
  describe(t, a) {
    return zn(no, t, a);
  }
  override(t, a) {
    return zn(ga, t, a);
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
var Ye = /* @__PURE__ */ new Jr({
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
  Yr,
  qr,
  Qr
]);
function ec(e) {
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
  const p = t.pointStyle, f = t.rotation, b = t.radius;
  let v = (f || 0) * Tr;
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
        if (!f) {
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
function tc(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function ac(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function nc(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ee(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function oc(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, u = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function sc(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Ga(e, t, a, n, o, s = {}) {
  const i = Ze(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, nc(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && sc(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Ee(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), oc(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function Mn(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Oe, Oe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Oe, Qe, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Qe, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Qe, !0), e.lineTo(a + i.topLeft, n);
}
const ic = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, lc = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function rc(e, t) {
  const a = ("" + e).match(ic);
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
const cc = (e) => +e || 0;
function wo(e, t) {
  const a = {}, n = Le(t), o = n ? Object.keys(t) : t, s = Le(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = cc(s(i));
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
  n && !("" + n).match(lc) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: De(e.family, t.family),
    lineHeight: rc(De(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: De(e.weight, t.weight),
    string: ""
  };
  return o.string = ec(o), o;
}
function cn(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function dc(e, t, a) {
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
  typeof n > "u" && (n = zi("_fallback", e));
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
      return Vi(l, r, () => vc(r, t, e, l));
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
      return Vi(s, i, () => hc(s, i, l));
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
    isScriptable: ta(a) ? a : () => a,
    isIndexable: ta(n) ? n : () => n
  };
}
const uc = (e, t) => e ? e + po(t) : t, $o = (e, t) => Le(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Vi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function hc(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = n[t];
  return ta(l) && i.isScriptable(t) && (l = fc(t, l, e, a)), Ze(l) && l.length && (l = gc(t, l, e, i.isIndexable)), $o(t, l) && (l = $a(l, o, s && s[t], i)), l;
}
function fc(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = a;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || n);
  return l.delete(e), $o(e, r) && (r = So(o._scopes, o, e, r)), r;
}
function gc(e, t, a, n) {
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
function Ni(e, t, a) {
  return ta(e) ? e(t, a) : e;
}
const mc = (e, t) => e === !0 ? t : typeof e == "string" ? fa(t, e) : void 0;
function pc(e, t, a, n, o) {
  for (const s of t) {
    const i = mc(a, s);
    if (i) {
      e.add(i);
      const l = Ni(i._fallback, a, o);
      if (typeof l < "u" && l !== a && l !== n)
        return l;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function So(e, t, a, n) {
  const o = t._rootScopes, s = Ni(t._fallback, a, n), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(n);
  let r = ns(l, i, a, s || a, n);
  return r === null || typeof s < "u" && s !== a && (r = ns(l, i, s, r, n), r === null) ? !1 : Co(Array.from(l), [
    ""
  ], o, s, () => bc(t, a, n));
}
function ns(e, t, a, n, o) {
  for (; a; )
    a = pc(e, t, a, n, o);
  return a;
}
function bc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return Ze(o) && Le(a) ? a : o || {};
}
function vc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = zi(uc(s, e), a), typeof o < "u")
      return $o(e, o) ? So(a, n, e, o) : o;
}
function zi(e, t) {
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
  return t || (t = e._keys = yc(e._scopes)), t;
}
function yc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const xc = Number.EPSILON || 1e-14, Sa = (e, t) => t < e.length && !e[t].skip && e[t], ji = (e) => e === "x" ? "y" : "x";
function kc(e, t, a, n) {
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
function _c(e, t, a) {
  const n = e.length;
  let o, s, i, l, r, c = Sa(e, 0);
  for (let u = 0; u < n - 1; ++u)
    if (r = c, c = Sa(e, u + 1), !(!r || !c)) {
      if (za(t[u], 0, xc)) {
        a[u] = a[u + 1] = 0;
        continue;
      }
      o = a[u] / t[u], s = a[u + 1] / t[u], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), a[u] = o * i * t[u], a[u + 1] = s * i * t[u]);
    }
}
function wc(e, t, a = "x") {
  const n = ji(a), o = e.length;
  let s, i, l, r = Sa(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = Sa(e, c + 1), !l)
      continue;
    const u = l[a], g = l[n];
    i && (s = (u - i[a]) / 3, l[`cp1${a}`] = u - s, l[`cp1${n}`] = g - s * t[c]), r && (s = (r[a] - u) / 3, l[`cp2${a}`] = u + s, l[`cp2${n}`] = g + s * t[c]);
  }
}
function Cc(e, t = "x") {
  const a = ji(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, l, r, c = Sa(e, 0);
  for (i = 0; i < n; ++i)
    if (l = r, r = c, c = Sa(e, i + 1), !!r) {
      if (c) {
        const u = c[t] - r[t];
        o[i] = u !== 0 ? (c[a] - r[a]) / u : 0;
      }
      s[i] = l ? c ? It(o[i - 1]) !== It(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  _c(e, o, s), wc(e, s, t);
}
function dn(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function $c(e, t) {
  let a, n, o, s, i, l = Xa(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = l, l = a < n - 1 && Xa(e[a + 1], t), s && (o = e[a], i && (o.cp1x = dn(o.cp1x, t.left, t.right), o.cp1y = dn(o.cp1y, t.top, t.bottom)), l && (o.cp2x = dn(o.cp2x, t.left, t.right), o.cp2y = dn(o.cp2y, t.top, t.bottom)));
}
function Sc(e, t, a, n, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Cc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = kc(c, l, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && $c(e, a);
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
function Mc(e, t) {
  return Rn(e).getPropertyValue(t);
}
const Dc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ha(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = Dc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const Ac = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function Tc(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, l, r;
  if (Ac(o, s, e.target))
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
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Rn(a), s = o.boxSizing === "border-box", i = ha(o, "padding"), l = ha(o, "border", "width"), { x: r, y: c, box: u } = Tc(e, a), g = i.left + (u && l.left), m = i.top + (u && l.top);
  let { width: p, height: f } = t;
  return s && (p -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((r - g) / p * a.width / n),
    y: Math.round((c - m) / f * a.height / n)
  };
}
function Bc(e, t, a) {
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
const Zt = (e) => Math.round(e * 10) / 10;
function Lc(e, t, a, n) {
  const o = Rn(e), s = ha(o, "margin"), i = Dn(o.maxWidth, e, "clientWidth") || Sn, l = Dn(o.maxHeight, e, "clientHeight") || Sn, r = Bc(e, t, a);
  let { width: c, height: u } = r;
  if (o.boxSizing === "content-box") {
    const m = ha(o, "border", "width"), p = ha(o, "padding");
    c -= p.width + m.width, u -= p.height + m.height;
  }
  return c = Math.max(0, c - s.width), u = Math.max(0, n ? c / n : u - s.height), c = Zt(Math.min(c, i, r.maxWidth)), u = Zt(Math.min(u, l, r.maxHeight)), c && !u && (u = Zt(c / 2)), (t !== void 0 || a !== void 0) && n && r.height && u > r.height && (u = r.height, c = Zt(Math.floor(u * n))), {
    width: c,
    height: u
  };
}
function ss(e, t, a) {
  const n = t || 1, o = Zt(e.height * n), s = Zt(e.width * n);
  e.height = Zt(e.height), e.width = Zt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const Rc = (function() {
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
  const a = Mc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function da(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function Pc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function Ic(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = da(e, o, a), l = da(o, s, a), r = da(s, t, a), c = da(i, l, a), u = da(l, r, a);
  return da(c, u, a);
}
const Ec = function(e, t) {
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
}, Fc = function() {
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
  return e ? Ec(t, a) : Fc();
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
    compare: Er,
    normalize: St
  } : {
    between: Gt,
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
function Oc(e, t, a) {
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
function Vc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: l, between: r, normalize: c } = Ki(n), { start: u, end: g, loop: m, style: p } = Oc(e, t, a), f = [];
  let b = !1, v = null, y, k, _;
  const w = () => r(o, _, y) && l(o, _) !== 0, $ = () => l(s, y) === 0 || r(s, _, y), M = () => b || w(), D = () => !b || $();
  for (let P = u, V = u; P <= g; ++P)
    k = t[P % i], !k.skip && (y = c(k[n]), y !== _ && (b = r(y, o, s), v === null && M() && (v = l(y, o) === 0 ? P : V), v !== null && D() && (f.push(ls({
      start: v,
      end: P,
      loop: m,
      count: i,
      style: p
    })), v = null), V = P, _ = y));
  return v !== null && f.push(ls({
    start: v,
    end: g,
    loop: m,
    count: i,
    style: p
  })), f;
}
function Nc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Vc(n[o], e.points, t);
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
function jc(e, t, a, n) {
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
function Hc(e, t) {
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
  return rs(e, jc(a, i, r, c), a, t);
}
function rs(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Wc(e, t, a, n);
}
function Wc(e, t, a, n) {
  const o = e._chart.getContext(), s = cs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = a.length, c = [];
  let u = s, g = t[0].start, m = g;
  function p(f, b, v, y) {
    const k = l ? -1 : 1;
    if (f !== b) {
      for (f += r; a[f % r].skip; )
        f -= k;
      for (; a[b % r].skip; )
        b += k;
      f % r !== b % r && (c.push({
        start: f % r,
        end: b % r,
        loop: v,
        style: y
      }), u = y, g = b % r);
    }
  }
  for (const f of t) {
    g = l ? g : f.start;
    let b = a[g % r], v;
    for (m = g + 1; m <= f.end; m++) {
      const y = a[m % r];
      v = cs(n.setContext(ma(o, {
        type: "segment",
        p0: b,
        p1: y,
        p0DataIndex: (m - 1) % r,
        p1DataIndex: m % r,
        datasetIndex: i
      }))), Kc(v, u) && p(g, m - 1, f.loop, u), b = y, u = v;
    }
    g < m - 1 && p(g, m - 1, f.loop, u);
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
function Kc(e, t) {
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
function Uc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: un(a, t, "left"),
    right: un(a, t, "right"),
    top: un(n, t, "top"),
    bottom: un(n, t, "bottom")
  } : t;
}
function Yc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Uc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class qc {
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
var Ft = /* @__PURE__ */ new qc();
const ds = "transparent", Xc = {
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
class Gc {
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
    this._active = !0, this._fn = t.fn || Xc[t.type || typeof i], this._easing = ja[t.easing] || ja.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
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
    const n = a.options, o = Qc(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Zc(t.options.$animations, n).then(() => {
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
      s[c] = g = new Gc(m, t, c, u), o.push(g);
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
function Zc(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function Qc(e, t) {
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
function Jc(e, t, a) {
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
function ed(e) {
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
    c = e.values[r], wt(c) && (s || t === 0 || It(t) === It(c)) && (t += c);
  }
  return !u && !n.all ? 0 : t;
}
function td(e, t) {
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
function ad(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function nd(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function od(e, t, a) {
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
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: l } = n, r = s.axis, c = i.axis, u = ad(s, i, n), g = t.length;
  let m;
  for (let p = 0; p < g; ++p) {
    const f = t[p], { [r]: b, [c]: v } = f, y = f._stacks || (f._stacks = {});
    m = y[c] = od(o, u, b), m[l] = v, m._top = fs(m, i, !0, n.type), m._bottom = fs(m, i, !1, n.type);
    const k = m._visualValues || (m._visualValues = {});
    k[l] = v;
  }
}
function Hn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function sd(e, t) {
  return ma(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function id(e, t, a) {
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
const Wn = (e) => e === "reset" || e === "none", ms = (e, t) => t ? e : Object.assign({}, e), ld = (e, t, a) => e && !t.hidden && t._stacked && {
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
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (g, m, p, f) => g === "x" ? m : g === "r" ? f : p, s = a.xAxisID = De(n.xAxisID, Hn(t, "x")), i = a.yAxisID = De(n.yAxisID, Hn(t, "y")), l = a.rAxisID = De(n.rAxisID, Hn(t, "r")), r = a.indexAxis, c = a.iAxisID = o(r, s, i, l), u = a.vAxisID = o(r, i, s, l);
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
      this._data = td(a, o);
    } else if (n !== a) {
      if (n) {
        Go(n, this);
        const o = this._cachedMeta;
        Aa(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Nr(a, this), this._syncList = [], this._data = a;
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
    let m, p, f;
    for (m = 0, p = o; m < p; ++m)
      f = m + n, g[m] = {
        [l]: u || s.parse(c[f], f),
        [r]: i.parse(a[f], f)
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
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, l = this._getOtherScale(t), r = ld(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: g } = nd(l);
    let m, p;
    function f() {
      p = o[m];
      const b = p[l.axis];
      return !wt(p[t.axis]) || u > b || g < b;
    }
    for (m = 0; m < i && !(!f() && (this.updateRangeFromParsed(c, t, p, r), s)); ++m)
      ;
    if (s) {
      for (m = i - 1; m >= 0; --m)
        if (!f()) {
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
    this.update(t || "default"), a._clip = ed(De(this.options.clip, Jc(a.xScale, a.yScale, this.getMaxOverflow())));
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
      s = i.$context || (i.$context = id(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = sd(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
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
    ], m = c.getOptionScopes(this.getDataset(), u), p = Object.keys(Ye.elements[t]), f = () => this.getContext(n, o, a), b = c.resolveNamedOptions(m, p, f, g);
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
function rd(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = Li(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function cd(e) {
  const t = e.iScale, a = rd(t, e.type);
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
function dd(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Ee(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function ud(e, t, a, n) {
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
function hd(e, t, a, n) {
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
  return Ze(e) ? hd(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
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
function fd(e, t, a) {
  return e !== 0 ? It(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function gd(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function md(e, t, a, n) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: u } = gd(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = u : (s[bs(u, i, l, r)] = !0, o = c)), s[bs(o, i, l, r)] = !0, e.borderSkipped = s;
}
function bs(e, t, a, n) {
  return n ? (e = pd(e, t, a), e = vs(e, a, t)) : e = vs(e, t, a), e;
}
function pd(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function vs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function bd(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class vd extends Pn {
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
    let m, p, f, b;
    for (m = n, p = n + o; m < p; ++m)
      b = a[m], f = {}, f[s.axis] = s.parse(fa(b, c), m), g.push(qi(fa(b, u), f, i, m));
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
      const f = this.getParsed(p), b = s || Ee(f[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(p), v = this._calculateBarIndexPixels(p, u), y = (f._stacks || {})[l.axis], k = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !y || Kn(f._custom) || i === y._top || i === y._bottom,
        x: c ? b.head : v.center,
        y: c ? v.center : b.head,
        height: c ? v.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : v.size
      };
      m && (k.options = g || this.resolveDataElementOptions(p, t[p].active ? "active" : o));
      const _ = k.options || t[p].options;
      md(k, _, y, i), bd(k, _, u.ratio), this.updateElement(t[p], p, k, o);
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
      min: l || cd(a),
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
    let g = r[a.axis], m = 0, p = n ? this.applyStack(a, r, n) : g, f, b;
    p !== g && (m = p - g, p = g), u && (g = c.barStart, p = c.barEnd - c.barStart, g !== 0 && It(g) !== It(c.barEnd) && (m = 0), m += g);
    const v = !Ee(s) && !u ? s : m;
    let y = a.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? f = a.getPixelForValue(m + p) : f = y, b = f - y, Math.abs(b) < i) {
      b = fd(b, a, l) * i, g === l && (y -= b / 2);
      const k = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), w = Math.min(k, _), $ = Math.max(k, _);
      y = Math.max(Math.min(y, $), w), f = y + b, n && !u && (r._stacks[a.axis]._visualValues[o] = a.getValueForPixel(f) - a.getValueForPixel(y));
    }
    if (y === a.getPixelForValue(l)) {
      const k = It(b) * a.getLineWidthForValue(l) / 2;
      y += k, b -= k;
    }
    return {
      size: b,
      base: y,
      head: f,
      center: f + b / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (a.grouped) {
      const u = s ? this._getStackCount(t) : a.stackCount, g = o.barThickness === "flex" ? ud(t, a, o, u * c) : dd(t, a, o, u * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(De(m, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + p;
      l = g.start + g.chunk * f + g.chunk / 2, r = Math.min(i, g.chunk * g.ratio);
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
function yd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < Ue) {
    const l = e, r = l + t, c = Math.cos(l), u = Math.sin(l), g = Math.cos(r), m = Math.sin(r), p = (_, w, $) => qa(_, l, r, !0) ? 1 : Math.max(w, w * a, $, $ * a), f = (_, w, $) => qa(_, l, r, !0) ? -1 : Math.min(w, w * a, $, $ * a), b = p(0, c, g), v = p(Qe, u, m), y = f(Oe, c, g), k = f(Oe + Qe, u, m);
    n = (b - y) / 2, o = (v - k) / 2, s = -(b + y) / 2, i = -(v + k) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class xd extends Pn {
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
    return Nt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Nt(this.options.circumference);
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(n.width, n.height) - i) / 2, 0), r = Math.min(wr(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: u, rotation: g } = this._getRotationExtents(), { ratioX: m, ratioY: p, offsetX: f, offsetY: b } = yd(g, u, r), v = (n.width - i) / m, y = (n.height - i) / p, k = Math.max(Math.min(v, y) / 2, 0), _ = Mi(this.options.radius, k), w = Math.max(_ * r, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * _, this.offsetY = b * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ue);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, u = (l.left + l.right) / 2, g = (l.top + l.bottom) / 2, m = s && c.animateScale, p = m ? 0 : this.innerRadius, f = m ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: v } = this._getSharedOptions(a, o);
    let y = this._getRotation(), k;
    for (k = 0; k < a; ++k)
      y += this._circumference(k, s);
    for (k = a; k < a + n; ++k) {
      const _ = this._circumference(k, s), w = t[k], $ = {
        x: u + this.offsetX,
        y: g + this.offsetY,
        startAngle: y,
        endAngle: y + _,
        circumference: _,
        outerRadius: f,
        innerRadius: p
      };
      v && ($.options = b || this.resolveDataElementOptions(k, w.active ? "active" : o)), y += _, this.updateElement(w, k, $, o);
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
class kd extends Pn {
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
    let { start: l, count: r } = Hr(a, o, i);
    this._drawStart = l, this._drawCount = r, Wr(a) && (l = 0, r = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: u, includeOptions: g } = this._getSharedOptions(a, o), m = i.axis, p = l.axis, { spanGaps: f, segment: b } = this.options, v = Ya(f) ? f : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", k = a + n, _ = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < _; ++$) {
      const M = t[$], D = y ? M : {};
      if ($ < a || $ >= k) {
        D.skip = !0;
        continue;
      }
      const P = this.getParsed($), V = Ee(P[p]), j = D[m] = i.getPixelForValue(P[m], $), S = D[p] = s || V ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, P, r) : P[p], $);
      D.skip = isNaN(j) || isNaN(S) || V, D.stop = $ > 0 && Math.abs(P[m] - w[m]) > v, b && (D.parsed = P, D.raw = c.data[$]), g && (D.options = u || this.resolveDataElementOptions($, M.active ? "active" : o)), y || this.updateElement(M, $, D, o), w = P;
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
class _d extends xd {
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
var wd = {
  _date: Ao
};
function Cd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? Or : ua;
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
        const f = m.slice(u.hi).findIndex((b) => !Ee(b[g.axis]));
        u.hi += Math.max(0, f);
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
    const { index: c, data: u } = s[l], { lo: g, hi: m } = Cd(s[l], t, i, o);
    for (let p = g; p <= m; ++p) {
      const f = u[p];
      f.skip || n(f, c, p);
    }
  }
}
function $d(e) {
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
function Sd(e, t, a, n) {
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
function Md(e, t, a, n, o, s) {
  let i = [];
  const l = $d(a);
  let r = Number.POSITIVE_INFINITY;
  function c(u, g, m) {
    const p = u.inRange(t.x, t.y, o);
    if (n && !p)
      return;
    const f = u.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(f)) && !p)
      return;
    const v = l(t, f);
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
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? Sd(e, t, a, o) : Md(e, t, a, n, o, s);
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
var Dd = {
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
function Ad(e) {
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
function Td(e) {
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
function Bd(e, t) {
  const a = Td(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = a[l.stack], u = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = u ? u * n : r && t.availableWidth, l.height = o) : (l.width = n, l.height = u ? u * o : r && t.availableHeight);
  }
  return a;
}
function Ld(e) {
  const t = Ad(e), a = Ba(t.filter((c) => c.box.fullSize), !0), n = Ba(Ta(t, "left"), !0), o = Ba(Ta(t, "right")), s = Ba(Ta(t, "top"), !0), i = Ba(Ta(t, "bottom")), l = xs(t, "x"), r = xs(t, "y");
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
function Rd(e, t, a, n) {
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
function Pd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function Id(e, t) {
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
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, Id(l.horizontal, t));
    const { same: g, other: m } = Rd(t, a, l, n);
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
    const o = Ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), l = Ld(e.boxes), r = l.vertical, c = l.horizontal;
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
    }, o), f = Bd(r.concat(c), g);
    Oa(l.fullSize, p, g, f), Oa(r, p, g, f), Oa(c, p, g, f) && Oa(r, p, g, f), Pd(p), _s(l.leftAndTop, p, g, f), p.x += p.w, p.y += p.h, _s(l.rightAndBottom, p, g, f), e.chartArea = {
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
class Ed extends Zi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const kn = "$chartjs", Fd = {
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
function Od(e, t) {
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
const Qi = Rc ? {
  passive: !0
} : !1;
function Vd(e, t, a) {
  e && e.addEventListener(t, a, Qi);
}
function Nd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, Qi);
}
function zd(e, t) {
  const a = Fd[e.type] || e.type, { x: n, y: o } = ca(e, t);
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
function jd(e, t, a) {
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
function Hd(e, t, a) {
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
function Wd(e, t) {
  Za.size || window.addEventListener("resize", Ji), Za.set(e, t);
}
function Kd(e) {
  Za.delete(e), Za.size || window.removeEventListener("resize", Ji);
}
function Ud(e, t, a) {
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
  return i.observe(o), Wd(e, s), i;
}
function qn(e, t, a) {
  a && a.disconnect(), t === "resize" && Kd(e);
}
function Yd(e, t, a) {
  const n = e.canvas, o = Pi((s) => {
    e.ctx !== null && a(zd(s, e));
  }, e);
  return Vd(n, t, o), o;
}
class qd extends Zi {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (Od(t, a), n) : null;
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
      attach: jd,
      detach: Hd,
      resize: Ud
    }[a] || Yd;
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
    }[a] || Nd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return Lc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && Do(t);
    return !!(a && a.isConnected);
  }
}
function Xd(e) {
  return !Mo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Ed : qd;
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
function Gd(e, t) {
  const a = e.options.ticks, n = Zd(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? Jd(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return eu(t, c, s, i / o), c;
  const u = Qd(s, t, o);
  if (i > 0) {
    let g, m;
    const p = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (fn(t, c, u, Ee(p) ? 0 : l - p, l), g = 0, m = i - 1; g < m; g++)
      fn(t, c, u, s[g], s[g + 1]);
    return fn(t, c, u, r, Ee(p) ? t.length : r + p), c;
  }
  return fn(t, c, u), c;
}
function Zd(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function Qd(e, t, a) {
  const n = tu(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = Br(n);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function Jd(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function eu(e, t, a, n) {
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
function tu(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const au = (e) => e === "left" ? "right" : e === "right" ? "left" : e, $s = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, Ss = (e, t) => Math.min(t || e, e);
function Ms(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function nu(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function ou(e, t) {
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
function su(e, t) {
  return ma(e, {
    scale: t,
    type: "scale"
  });
}
function iu(e, t, a) {
  return ma(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function lu(e, t, a) {
  let n = vo(e);
  return (a && t !== "right" || !a && t === "right") && (n = au(n)), n;
}
function ru(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: u } = r;
  let g = 0, m, p, f;
  const b = i - o, v = l - s;
  if (e.isHorizontal()) {
    if (p = at(n, s, l), Le(a)) {
      const y = Object.keys(a)[0], k = a[y];
      f = u[y].getPixelForValue(k) + b - t;
    } else a === "center" ? f = (c.bottom + c.top) / 2 + b - t : f = $s(e, a, t);
    m = l - s;
  } else {
    if (Le(a)) {
      const y = Object.keys(a)[0], k = a[y];
      p = u[y].getPixelForValue(k) - v + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - v + t : p = $s(e, a, t);
    f = at(n, i, o), g = a === "left" ? -Qe : Qe;
  }
  return {
    titleX: p,
    titleY: f,
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
    return t = Bt(t, Number.POSITIVE_INFINITY), a = Bt(a, Number.NEGATIVE_INFINITY), n = Bt(n, Number.POSITIVE_INFINITY), o = Bt(o, Number.NEGATIVE_INFINITY), {
      min: Bt(t, n),
      max: Bt(a, o),
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
      min: Bt(a, Bt(n, a)),
      max: Bt(n, Bt(a, n))
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
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = dc(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? Ms(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Gd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    l = t.offset ? this.maxWidth / n : p / (n - 1), g + 6 > l && (l = p / (n - (t.offset ? 0.5 : 1)), r = this.maxHeight - La(t.grid) - a.padding - Ds(t.title, this.chart.options.font), c = Math.sqrt(g * g + m * m), i = Ir(Math.min(Math.asin(st((u.highest.height + 6) / l, -1, 1)), Math.asin(st(r / c, -1, 1)) - Math.asin(st(m / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
        const { first: c, last: u, widest: g, highest: m } = this._getLabelSizes(), p = n.padding * 2, f = Nt(this.labelRotation), b = Math.cos(f), v = Math.sin(f);
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
    let c = 0, u = 0, g, m, p, f, b, v, y, k, _, w, $;
    for (g = 0; g < a; g += r) {
      if (f = t[g].label, b = this._resolveTickFontOptions(g), o.font = v = b.string, y = s[v] = s[v] || {
        data: {},
        gc: []
      }, k = b.lineHeight, _ = w = 0, !Ee(f) && !Ze(f))
        _ = ts(o, y.data, y.gc, _, f), w = k;
      else if (Ze(f))
        for (m = 0, p = f.length; m < p; ++m)
          $ = f[m], !Ee($) && !Ze($) && (_ = ts(o, y.data, y.gc, _, $), w += k);
      i.push(_), l.push(w), c = Math.max(_, c), u = Math.max(w, u);
    }
    ou(s, a);
    const M = i.indexOf(c), D = l.indexOf(u), P = (V) => ({
      width: i[V] || 0,
      height: l[V] || 0
    });
    return {
      first: P(0),
      last: P(a - 1),
      widest: P(M),
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
    return Fr(this._alignToPixels ? ia(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = iu(this.getContext(), t, n));
    }
    return this.$context || (this.$context = su(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = Nt(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * n > l * o ? l / n : r / o : r * o < l * n ? r / n : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), g = this.ticks.length + (r ? 1 : 0), m = La(s), p = [], f = l.setContext(this.getContext()), b = f.display ? f.width : 0, v = b / 2, y = function(J) {
      return ia(n, J, b);
    };
    let k, _, w, $, M, D, P, V, j, S, R, B;
    if (i === "top")
      k = y(this.bottom), D = this.bottom - m, V = k - v, S = y(t.top) + v, B = t.bottom;
    else if (i === "bottom")
      k = y(this.top), S = t.top, B = y(t.bottom) - v, D = k + v, V = this.top + m;
    else if (i === "left")
      k = y(this.right), M = this.right - m, P = k - v, j = y(t.left) + v, R = t.right;
    else if (i === "right")
      k = y(this.left), j = t.left, R = y(t.right) - v, M = k + v, P = this.left + m;
    else if (a === "x") {
      if (i === "center")
        k = y((t.top + t.bottom) / 2 + 0.5);
      else if (Le(i)) {
        const J = Object.keys(i)[0], re = i[J];
        k = y(this.chart.scales[J].getPixelForValue(re));
      }
      S = t.top, B = t.bottom, D = k + v, V = D + m;
    } else if (a === "y") {
      if (i === "center")
        k = y((t.left + t.right) / 2);
      else if (Le(i)) {
        const J = Object.keys(i)[0], re = i[J];
        k = y(this.chart.scales[J].getPixelForValue(re));
      }
      M = k - v, P = M - m, j = t.left, R = t.right;
    }
    const H = De(o.ticks.maxTicksLimit, g), W = Math.max(1, Math.ceil(g / H));
    for (_ = 0; _ < g; _ += W) {
      const J = this.getContext(_), re = s.setContext(J), ue = l.setContext(J), q = re.lineWidth, ne = re.color, L = ue.dash || [], K = ue.dashOffset, Y = re.tickWidth, N = re.tickColor, ie = re.tickBorderDash || [], ce = re.tickBorderDashOffset;
      w = nu(this, _, r), w !== void 0 && ($ = ia(n, w, q), c ? M = P = j = R = $ : D = V = S = B = $, p.push({
        tx1: M,
        ty1: D,
        tx2: P,
        ty2: V,
        x1: j,
        y1: S,
        x2: R,
        y2: B,
        width: q,
        color: ne,
        borderDash: L,
        borderDashOffset: K,
        tickWidth: Y,
        tickColor: N,
        tickBorderDash: ie,
        tickBorderDashOffset: ce
      }));
    }
    return this._ticksLength = g, this._borderValue = k, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: u, mirror: g } = s, m = La(n.grid), p = m + u, f = g ? -u : p, b = -Nt(this.labelRotation), v = [];
    let y, k, _, w, $, M, D, P, V, j, S, R, B = "middle";
    if (o === "top")
      M = this.bottom - f, D = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      M = this.top + f, D = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const W = this._getYAxisLabelAlignment(m);
      D = W.textAlign, $ = W.x;
    } else if (o === "right") {
      const W = this._getYAxisLabelAlignment(m);
      D = W.textAlign, $ = W.x;
    } else if (a === "x") {
      if (o === "center")
        M = (t.top + t.bottom) / 2 + p;
      else if (Le(o)) {
        const W = Object.keys(o)[0], J = o[W];
        M = this.chart.scales[W].getPixelForValue(J) + p;
      }
      D = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - p;
      else if (Le(o)) {
        const W = Object.keys(o)[0], J = o[W];
        $ = this.chart.scales[W].getPixelForValue(J);
      }
      D = this._getYAxisLabelAlignment(m).textAlign;
    }
    a === "y" && (r === "start" ? B = "top" : r === "end" && (B = "bottom"));
    const H = this._getLabelSizes();
    for (y = 0, k = l.length; y < k; ++y) {
      _ = l[y], w = _.label;
      const W = s.setContext(this.getContext(y));
      P = this.getPixelForTick(y) + s.labelOffset, V = this._resolveTickFontOptions(y), j = V.lineHeight, S = Ze(w) ? w.length : 1;
      const J = S / 2, re = W.color, ue = W.textStrokeColor, q = W.textStrokeWidth;
      let ne = D;
      i ? ($ = P, D === "inner" && (y === k - 1 ? ne = this.options.reverse ? "left" : "right" : y === 0 ? ne = this.options.reverse ? "right" : "left" : ne = "center"), o === "top" ? c === "near" || b !== 0 ? R = -S * j + j / 2 : c === "center" ? R = -H.highest.height / 2 - J * j + j : R = -H.highest.height + j / 2 : c === "near" || b !== 0 ? R = j / 2 : c === "center" ? R = H.highest.height / 2 - J * j : R = H.highest.height - S * j, g && (R *= -1), b !== 0 && !W.showLabelBackdrop && ($ += j / 2 * Math.sin(b))) : (M = P, R = (1 - S) * j / 2);
      let L;
      if (W.showLabelBackdrop) {
        const K = Ct(W.backdropPadding), Y = H.heights[y], N = H.widths[y];
        let ie = R - K.top, ce = 0 - K.left;
        switch (B) {
          case "middle":
            ie -= Y / 2;
            break;
          case "bottom":
            ie -= Y;
            break;
        }
        switch (D) {
          case "center":
            ce -= N / 2;
            break;
          case "right":
            ce -= N;
            break;
          case "inner":
            y === k - 1 ? ce -= N : y > 0 && (ce -= N / 2);
            break;
        }
        L = {
          left: ce,
          top: ie,
          width: N + K.width,
          height: Y + K.height,
          color: W.backdropColor
        };
      }
      v.push({
        label: w,
        font: V,
        textOffset: R,
        options: {
          rotation: b,
          color: re,
          strokeColor: ue,
          strokeWidth: q,
          textAlign: ne,
          textBaseline: B,
          translation: [
            $,
            M
          ],
          backdrop: L
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-Nt(this.labelRotation))
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
    const { titleX: c, titleY: u, maxWidth: g, rotation: m } = ru(this, r, a, l);
    Ga(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: g,
      rotation: m,
      textAlign: lu(l, a, o),
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
    uu(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, cu(t, i, n), this.override && Ye.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ye[o] && (delete Ye[o][n], this.override && delete ga[n]);
  }
}
function cu(e, t, a) {
  const n = Ka(/* @__PURE__ */ Object.create(null), [
    a ? Ye.get(a) : {},
    Ye.get(t),
    e.defaults
  ]);
  Ye.set(t, n), e.defaultRoutes && du(t, e.defaultRoutes), e.descriptors && Ye.describe(t, e.descriptors);
}
function du(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), l = i.pop(), r = i.join(".");
    Ye.route(s, o, r, l);
  });
}
function uu(e) {
  return "id" in e && "defaults" in e;
}
class hu {
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
var Rt = /* @__PURE__ */ new hu();
class fu {
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
    const n = t && t.config, o = De(n.options && n.options.plugins, {}), s = gu(n);
    return o === !1 && !a ? [] : pu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function gu(e) {
  const t = {}, a = [], n = Object.keys(Rt.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Rt.getPlugin(n[s]));
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
function mu(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function pu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = mu(n[r], o);
    c !== null && s.push({
      plugin: l,
      options: bu(e.config, {
        plugin: l,
        local: a[r]
      }, c, i)
    });
  }
  return s;
}
function bu(e, { plugin: t, local: a }, n, o) {
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
function vu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function yu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function As(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function xu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function io(e, ...t) {
  if (As(e))
    return e;
  for (const a of t) {
    const n = a.axis || xu(a.position) || e.length > 1 && As(e[0].toLowerCase());
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
function ku(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return Ts(e, "x", a[0]) || Ts(e, "y", a[0]);
  }
  return {};
}
function _u(e, t) {
  const a = ga[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = so(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const l = n[i];
    if (!Le(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = io(i, l, ku(i, e), Ye.scales[l.type]), c = yu(r, o), u = a.scales || {};
    s[i] = Na(/* @__PURE__ */ Object.create(null), [
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
      const m = vu(g, r), p = i[m + "AxisID"] || m;
      s[p] = s[p] || /* @__PURE__ */ Object.create(null), Na(s[p], [
        {
          axis: m
        },
        n[p],
        u[g]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    Na(l, [
      Ye.scales[l.type],
      Ye.scale
    ]);
  }), s;
}
function el(e) {
  const t = e.options || (e.options = {});
  t.plugins = De(t.plugins, {}), t.scales = _u(e, t);
}
function tl(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function wu(e) {
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
class Cu {
  constructor(t) {
    this._config = wu(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    if (Su(i, a)) {
      s.$shared = !1, n = ta(n) ? n() : n;
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
const $u = (e) => Le(e) && Object.getOwnPropertyNames(e).some((t) => ta(e[t]));
function Su(e, t) {
  const { isScriptable: a, isIndexable: n } = Oi(e);
  for (const o of t) {
    const s = a(o), i = n(o), l = (i || s) && e[o];
    if (s && (ta(l) || $u(l)) || i && Ze(l))
      return !0;
  }
  return !1;
}
var Mu = "4.5.1";
const Du = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Rs(e, t) {
  return e === "top" || e === "bottom" || Du.indexOf(e) === -1 && t === "x";
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
function Au(e) {
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
function Tu(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function Bu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let aa = class {
  static defaults = Ye;
  static instances = _n;
  static overrides = ga;
  static registry = Rt;
  static version = Mu;
  static getChart = Es;
  static register(...t) {
    Rt.add(...t), Fs();
  }
  static unregister(...t) {
    Rt.remove(...t), Fs();
  }
  constructor(t, a) {
    const n = this.config = new Cu(a), o = nl(t), s = Es(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Xd(o))(), this.platform.updateConfig(n);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, u = r && r.width;
    if (this.id = _r(), this.ctx = l, this.canvas = r, this.width = u, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new fu(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = zr((g) => this.update(g), i.resizeDelay || 0), this._dataChanges = [], _n[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ft.listen(this, "complete", Is), Ft.listen(this, "progress", Au), this._initialize(), this.attached && this.update();
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
    return Rt;
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
        const m = Rt.getScale(u);
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
        const r = Rt.getController(l), { datasetElementType: c, dataElementType: u } = Ye.datasets[l];
        Object.assign(r, {
          dataElementType: Rt.getElement(u),
          datasetElementType: c && Rt.getElement(c)
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
      Tu(t, o, i);
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
        this._updateDataset(a, ta(t) ? t({
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
    }, o = Yc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && ko(a, o), t.controller.draw(), o && _o(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Xa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = Dd.modes[a];
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
    const { _active: o = [], options: s } = this, i = a, l = this._getActiveElements(t, o, n, i), r = Dr(t), c = Bu(t, this._lastEvent, n, r);
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
  return Fe(aa.instances, (e) => e._plugins.invalidate());
}
function Lu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: u } = r, g = Math.min(c / i, St(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + g / 2, a - g / 2), l > 0) {
    const m = Math.min(c / l, St(n - a));
    e.arc(o, s, l + c / 2, a - m / 2, n + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * St(n - a));
    if (u === "round")
      e.arc(o, s, m, a - Oe / 2, n + Oe / 2, !0);
    else if (u === "bevel") {
      const p = 2 * m * m, f = -p * Math.cos(a + Oe / 2) + o, b = -p * Math.sin(a + Oe / 2) + s, v = p * Math.cos(n + Oe / 2) + o, y = p * Math.sin(n + Oe / 2) + s;
      e.lineTo(f, b), e.lineTo(v, y);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Ru(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, n - c, a + c), r > o ? (c = o / r, e.arc(s, i, r, a + c, n - c, !0)) : e.arc(s, i, o, a + Qe, n - Qe), e.closePath(), e.clip();
}
function Pu(e) {
  return wo(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Iu(e, t, a, n) {
  const o = Pu(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), l = (r) => {
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
  const f = o - r;
  if (n) {
    const W = u > 0 ? u - n : 0, J = g > 0 ? g - n : 0, re = (W + J) / 2, ue = re !== 0 ? f * re / (re + n) : f;
    p = (f - ue) / 2;
  }
  const b = Math.max(1e-3, f * g - a / Oe) / g, v = (f - b) / 2, y = r + v + p, k = o - v - p, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: M } = Iu(t, m, g, k - y), D = g - _, P = g - w, V = y + _ / D, j = k - w / P, S = m + $, R = m + M, B = y + $ / S, H = k - M / R;
  if (e.beginPath(), s) {
    const W = (V + j) / 2;
    if (e.arc(i, l, g, V, W), e.arc(i, l, g, W, j), w > 0) {
      const q = va(P, j, i, l);
      e.arc(q.x, q.y, w, j, k + Qe);
    }
    const J = va(R, k, i, l);
    if (e.lineTo(J.x, J.y), M > 0) {
      const q = va(R, H, i, l);
      e.arc(q.x, q.y, M, k + Qe, H + Math.PI);
    }
    const re = (k - M / m + (y + $ / m)) / 2;
    if (e.arc(i, l, m, k - M / m, re, !0), e.arc(i, l, m, re, y + $ / m, !0), $ > 0) {
      const q = va(S, B, i, l);
      e.arc(q.x, q.y, $, B + Math.PI, y - Qe);
    }
    const ue = va(D, y, i, l);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const q = va(D, V, i, l);
      e.arc(q.x, q.y, _, y - Qe, V);
    }
  } else {
    e.moveTo(i, l);
    const W = Math.cos(V) * g + i, J = Math.sin(V) * g + l;
    e.lineTo(W, J);
    const re = Math.cos(j) * g + i, ue = Math.sin(j) * g + l;
    e.lineTo(re, ue);
  }
  e.closePath();
}
function Eu(e, t, a, n, o) {
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
function Fu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: u, borderDash: g, borderDashOffset: m, borderRadius: p } = r, f = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(g || []), e.lineDashOffset = m, f ? (e.lineWidth = c * 2, e.lineJoin = u || "round") : (e.lineWidth = c, e.lineJoin = u || "bevel");
  let b = t.endAngle;
  if (s) {
    Tn(e, t, a, n, b, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(l) || (b = i + (l % Ue || Ue));
  }
  f && Ru(e, t, b), r.selfJoin && b - i >= Oe && p === 0 && u !== "miter" && Lu(e, t, b), s || (Tn(e, t, a, n, b, o), e.stroke());
}
class Ou extends Wt {
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
    ], n), m = (this.options.spacing + this.options.borderWidth) / 2, p = De(g, r - l), f = qa(s, l, r) && l !== r, b = p >= Ue || f, v = Gt(i, c + m, u + m);
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
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, Eu(t, this, c, s, i), Fu(t, this, c, s, i), t.restore();
  }
}
function ol(e, t, a = t) {
  e.lineCap = De(a.borderCapStyle, t.borderCapStyle), e.setLineDash(De(a.borderDash, t.borderDash)), e.lineDashOffset = De(a.borderDashOffset, t.borderDashOffset), e.lineJoin = De(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = De(a.borderWidth, t.borderWidth), e.strokeStyle = De(a.borderColor, t.borderColor);
}
function Vu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Nu(e) {
  return e.stepped ? tc : e.tension || e.cubicInterpolationMode === "monotone" ? ac : Vu;
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
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = sl(o, a, n), u = Nu(s);
  let { move: g = !0, reverse: m } = n || {}, p, f, b;
  for (p = 0; p <= c; ++p)
    f = o[(l + (m ? c - p : p)) % i], !f.skip && (g ? (e.moveTo(f.x, f.y), g = !1) : u(e, b, f, m, s.stepped), b = f);
  return r && (f = o[(l + (m ? c : 0)) % i], u(e, b, f, m, s.stepped)), !!r;
}
function ju(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: l } = sl(o, a, n), { move: r = !0, reverse: c } = n || {};
  let u = 0, g = 0, m, p, f, b, v, y;
  const k = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    b !== v && (e.lineTo(u, v), e.lineTo(u, b), e.lineTo(u, y));
  };
  for (r && (p = o[k(0)], e.moveTo(p.x, p.y)), m = 0; m <= l; ++m) {
    if (p = o[k(m)], p.skip)
      continue;
    const w = p.x, $ = p.y, M = w | 0;
    M === f ? ($ < b ? b = $ : $ > v && (v = $), u = (g * u + w) / ++g) : (_(), e.lineTo(w, $), f = M, g = 0, b = v = $), y = $;
  }
  _();
}
function lo(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? ju : zu;
}
function Hu(e) {
  return e.stepped ? Pc : e.tension || e.cubicInterpolationMode === "monotone" ? Ic : da;
}
function Wu(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), ol(e, t.options), e.stroke(o);
}
function Ku(e, t, a, n) {
  const { segments: o, options: s } = t, i = lo(t);
  for (const l of o)
    ol(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Uu = typeof Path2D == "function";
function Yu(e, t, a, n) {
  Uu && !t.options.segment ? Wu(e, t, a, n) : Ku(e, t, a, n);
}
class qu extends Wt {
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
      Sc(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Hc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = Nc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = Hu(n);
    let c, u;
    for (c = 0, u = i.length; c < u; ++c) {
      const { start: g, end: m } = i[c], p = s[g], f = s[m];
      if (p === f) {
        l.push(p);
        continue;
      }
      const b = Math.abs((o - p[a]) / (f[a] - p[a])), v = r(p, f, b, n.stepped);
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
    (this.points || []).length && s.borderWidth && (t.save(), Yu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Os(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Xu extends Wt {
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
function Qt(e, t, a, n) {
  return e ? 0 : st(t, a, n);
}
function Gu(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Fi(n);
  return {
    t: Qt(o.top, s.top, 0, a),
    r: Qt(o.right, s.right, 0, t),
    b: Qt(o.bottom, s.bottom, 0, a),
    l: Qt(o.left, s.left, 0, t)
  };
}
function Zu(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = _a(o), i = Math.min(t, a), l = e.borderSkipped, r = n || Le(o);
  return {
    topLeft: Qt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Qt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Qt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Qt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function Qu(e) {
  const t = il(e), a = t.right - t.left, n = t.bottom - t.top, o = Gu(e, a / 2, n / 2), s = Zu(e, a / 2, n / 2);
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
  return l && (o || Gt(t, l.left, l.right)) && (s || Gt(a, l.top, l.bottom));
}
function Ju(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function eh(e, t) {
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
class th extends Wt {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = Qu(this), l = Ju(i.radius) ? Mn : eh;
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
}, ah = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Ns extends Wt {
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
    return this.legendItems.forEach((f, b) => {
      const v = n + a / 2 + s.measureText(f.text).width;
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
    let g = l, m = 0, p = 0, f = 0, b = 0;
    return this.legendItems.forEach((v, y) => {
      const { itemWidth: k, itemHeight: _ } = nh(n, a, s, v, o);
      y > 0 && p + _ + 2 * l > u && (g += m + l, c.push({
        width: m,
        height: p
      }), f += m + l, b++, m = p = 0), r[y] = {
        left: f,
        top: p,
        col: b,
        width: k,
        height: _
      }, m = Math.max(m, k), p += _ + l;
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
      let l = 0, r = at(n, this.left + o, this.right - this.lineWidths[l]);
      for (const c of a)
        l !== c.row && (l = c.row, r = at(n, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = at(n, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of a)
        c.col !== l && (l = c.col, r = at(n, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
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
    const { boxWidth: f, boxHeight: b, itemHeight: v } = Vs(i, g), y = function(M, D, P) {
      if (isNaN(f) || f <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const V = De(P.lineWidth, 1);
      if (o.fillStyle = De(P.fillStyle, l), o.lineCap = De(P.lineCap, "butt"), o.lineDashOffset = De(P.lineDashOffset, 0), o.lineJoin = De(P.lineJoin, "miter"), o.lineWidth = V, o.strokeStyle = De(P.strokeStyle, l), o.setLineDash(De(P.lineDash, [])), i.usePointStyle) {
        const j = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: P.pointStyle,
          rotation: P.rotation,
          borderWidth: V
        }, S = r.xPlus(M, f / 2), R = D + m;
        Ei(o, j, S, R, i.pointStyleWidth && f);
      } else {
        const j = D + Math.max((g - b) / 2, 0), S = r.leftForLtr(M, f), R = _a(P.borderRadius);
        o.beginPath(), Object.values(R).some((B) => B !== 0) ? Mn(o, {
          x: S,
          y: j,
          w: f,
          h: b,
          radius: R
        }) : o.rect(S, j, f, b), o.fill(), V !== 0 && o.stroke();
      }
      o.restore();
    }, k = function(M, D, P) {
      Ga(o, P.text, M, D + v / 2, c, {
        strikethrough: P.hidden,
        textAlign: r.textAlign(P.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? p = {
      x: at(s, this.left + u, this.right - n[0]),
      y: this.top + u + w,
      line: 0
    } : p = {
      x: this.left + u,
      y: at(s, this.top + w + u, this.bottom - a[0].height),
      line: 0
    }, Hi(this.ctx, t.textDirection);
    const $ = v + u;
    this.legendItems.forEach((M, D) => {
      o.strokeStyle = M.fontColor, o.fillStyle = M.fontColor;
      const P = o.measureText(M.text).width, V = r.textAlign(M.textAlign || (M.textAlign = i.textAlign)), j = f + m + P;
      let S = p.x, R = p.y;
      r.setWidth(this.width), _ ? D > 0 && S + j + u > this.right && (R = p.y += $, p.line++, S = p.x = at(s, this.left + u, this.right - n[p.line])) : D > 0 && R + $ > this.bottom && (S = p.x = S + a[p.line].width + u, p.line++, R = p.y = at(s, this.top + w + u, this.bottom - a[p.line].height));
      const B = r.x(S);
      if (y(B, R, M), S = jr(V, S + f + m, _ ? S + j : this.right, t.rtl), k(r.x(S), R, M), _)
        p.x += j + u;
      else if (typeof M.text != "string") {
        const H = c.lineHeight;
        p.y += ll(M, H) + u;
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
      m = Math.max(...this.lineWidths), u = this.top + c, g = at(t.align, g, this.right - m);
    else {
      const f = this.columnSizes.reduce((b, v) => Math.max(b, v.height), 0);
      u = c + at(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const p = at(l, g, g + m);
    i.textAlign = s.textAlign(vo(l)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ga(i, a.text, p, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = it(t.font), n = Ct(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (Gt(t, this.left, this.right) && Gt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], Gt(t, o.left, o.left + o.width) && Gt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!ih(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = ah(o, n);
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
function nh(e, t, a, n, o) {
  const s = oh(n, e, t, a), i = sh(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function oh(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function sh(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = ll(t, a)), n;
}
function ll(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function ih(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var To = {
  id: "legend",
  _element: Ns,
  start(e, t, a) {
    const n = e.legend = new Ns({
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
    return this.isHorizontal() ? (u = at(l, n, s), g = a + t, c = s - n) : (i.position === "left" ? (u = n + t, g = at(l, o, a), r = Oe * -0.5) : (u = s - t, g = at(l, a, o), r = Oe * 0.5), c = o - a), {
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
function lh(e, t) {
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
    lh(e, a);
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
function Lt(e, t) {
  return t && (Ze(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ot(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function rh(e, t) {
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
function zs(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = it(t.bodyFont), c = it(t.titleFont), u = it(t.footerFont), g = s.length, m = o.length, p = n.length, f = Ct(t.padding);
  let b = f.height, v = 0, y = n.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (y += e.beforeBody.length + e.afterBody.length, g && (b += g * c.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    b += p * w + (y - p) * r.lineHeight + (y - 1) * t.bodySpacing;
  }
  m && (b += t.footerMarginTop + m * u.lineHeight + (m - 1) * t.footerSpacing);
  let k = 0;
  const _ = function(w) {
    v = Math.max(v, a.measureText(w).width + k);
  };
  return a.save(), a.font = c.string, Fe(e.title, _), a.font = r.string, Fe(e.beforeBody.concat(e.afterBody), _), k = t.displayColors ? i + 2 + t.boxPadding : 0, Fe(n, (w) => {
    Fe(w.before, _), Fe(w.lines, _), Fe(w.after, _);
  }), k = 0, a.font = u.string, Fe(e.footer, _), a.restore(), v += f.width, {
    width: v,
    height: b
  };
}
function ch(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function dh(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function uh(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return n === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), dh(c, e, t, a) && (c = "center"), c;
}
function js(e, t, a) {
  const n = a.yAlign || t.yAlign || ch(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || uh(e, t, a, n),
    yAlign: n
  };
}
function hh(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function fh(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Hs(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = a, c = o + s, { topLeft: u, topRight: g, bottomLeft: m, bottomRight: p } = _a(i);
  let f = hh(t, l);
  const b = fh(t, r, c);
  return r === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(u, m) + o : l === "right" && (f += Math.max(g, p) + o), {
    x: st(f, 0, n.width - t.width),
    y: st(b, 0, n.height - t.height)
  };
}
function pn(e, t, a) {
  const n = Ct(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ws(e) {
  return Lt([], Ot(e));
}
function gh(e, t, a) {
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
function ft(e, t, a, n) {
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
    return this.$context || (this.$context = gh(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = ft(n, "beforeTitle", this, t), s = ft(n, "title", this, t), i = ft(n, "afterTitle", this, t);
    let l = [];
    return l = Lt(l, Ot(o)), l = Lt(l, Ot(s)), l = Lt(l, Ot(i)), l;
  }
  getBeforeBody(t, a) {
    return Ws(ft(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Fe(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Ks(n, s);
      Lt(i.before, Ot(ft(l, "beforeLabel", this, s))), Lt(i.lines, ft(l, "label", this, s)), Lt(i.after, Ot(ft(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Ws(ft(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = ft(n, "beforeFooter", this, t), s = ft(n, "footer", this, t), i = ft(n, "afterFooter", this, t);
    let l = [];
    return l = Lt(l, Ot(o)), l = Lt(l, Ot(s)), l = Lt(l, Ot(i)), l;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = a.length; r < c; ++r)
      l.push(rh(this.chart, a[r]));
    return t.filter && (l = l.filter((u, g, m) => t.filter(u, g, m, n))), t.itemSort && (l = l.sort((u, g) => t.itemSort(u, g, n))), Fe(l, (u) => {
      const g = Ks(t.callbacks, u);
      o.push(ft(g, "labelColor", this, u)), s.push(ft(g, "labelPointStyle", this, u)), i.push(ft(g, "labelTextColor", this, u));
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
      const r = this._size = zs(this, n), c = Object.assign({}, l, r), u = js(this.chart, n, c), g = Hs(n, c, u, this.chart);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = n, { topLeft: r, topRight: c, bottomLeft: u, bottomRight: g } = _a(l), { x: m, y: p } = t, { width: f, height: b } = a;
    let v, y, k, _, w, $;
    return s === "center" ? (w = p + b / 2, o === "left" ? (v = m, y = v - i, _ = w + i, $ = w - i) : (v = m + f, y = v + i, _ = w - i, $ = w + i), k = v) : (o === "left" ? y = m + Math.max(r, u) + i : o === "right" ? y = m + f - Math.max(c, g) - i : y = this.caretX, s === "top" ? (_ = p, w = _ - i, v = y - i, k = y + i) : (_ = p + b, w = _ + i, v = y + i, k = y - i), $ = _), {
      x1: v,
      x2: y,
      x3: k,
      y1: _,
      y2: w,
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
    const i = this.labelColors[n], l = this.labelPointStyles[n], { boxHeight: r, boxWidth: c } = s, u = it(s.bodyFont), g = pn(this, "left", s), m = o.x(g), p = r < u.lineHeight ? (u.lineHeight - r) / 2 : 0, f = a.y + p;
    if (s.usePointStyle) {
      const b = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(m, c) + c / 2, y = f + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, oo(t, b, v, y), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, oo(t, b, v, y);
    } else {
      t.lineWidth = Le(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(m, c), v = o.leftForLtr(o.xPlus(m, 1), c - 2), y = _a(i.borderRadius);
      Object.values(y).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, Mn(t, {
        x: b,
        y: f,
        w: c,
        h: r,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Mn(t, {
        x: v,
        y: f + 1,
        w: c - 2,
        h: r - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, f, c, r), t.strokeRect(b, f, c, r), t.fillStyle = i.backgroundColor, t.fillRect(v, f + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: u } = n, g = it(n.bodyFont);
    let m = g.lineHeight, p = 0;
    const f = wa(n.rtl, this.x, this.width), b = function(P) {
      a.fillText(P, f.x(t.x + p), t.y + m / 2), t.y += m + s;
    }, v = f.textAlign(i);
    let y, k, _, w, $, M, D;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = g.string, t.x = pn(this, v, n), a.fillStyle = n.bodyColor, Fe(this.beforeBody, b), p = l && v !== "right" ? i === "center" ? c / 2 + u : c + 2 + u : 0, w = 0, M = o.length; w < M; ++w) {
      for (y = o[w], k = this.labelTextColors[w], a.fillStyle = k, Fe(y.before, b), _ = y.lines, l && _.length && (this._drawColorBox(a, t, w, f, n), m = Math.max(g.lineHeight, r)), $ = 0, D = _.length; $ < D; ++$)
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
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: u } = n, { topLeft: g, topRight: m, bottomLeft: p, bottomRight: f } = _a(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(l + g, r), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(l + c - m, r), a.quadraticCurveTo(l + c, r, l + c, r + m), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(l + c, r + u - f), a.quadraticCurveTo(l + c, r + u, l + c - f, r + u), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(l + p, r + u), a.quadraticCurveTo(l, r + u, l, r + u - p), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(l, r + g), a.quadraticCurveTo(l, r, l + g, r), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Va[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = zs(this, t), r = Object.assign({}, i, this._size), c = js(a, t, r), u = Hs(t, r, c, a);
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
const mh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function ph(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return mh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const bh = (e, t) => e === null ? null : st(Math.round(e), 0, t);
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
    return a = isFinite(a) && n[a] === t ? a : ph(n, t, De(a, t), this._addedLabels), bh(a, n.length - 1);
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
function vh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: u, maxDigits: g, includeBounds: m } = e, p = s || 1, f = u - 1, { min: b, max: v } = t, y = !Ee(i), k = !Ee(l), _ = !Ee(c), w = (v - b) / (g + 1);
  let $ = qo((v - b) / f / p) * p, M, D, P, V;
  if ($ < 1e-14 && !y && !k)
    return [
      {
        value: b
      },
      {
        value: v
      }
    ];
  V = Math.ceil(v / $) - Math.floor(b / $), V > f && ($ = qo(V * $ / f / p) * p), Ee(r) || (M = Math.pow(10, r), $ = Math.ceil($ * M) / M), o === "ticks" ? (D = Math.floor(b / $) * $, P = Math.ceil(v / $) * $) : (D = b, P = v), y && k && s && Rr((l - i) / s, $ / 1e3) ? (V = Math.round(Math.min((l - i) / $, u)), $ = (l - i) / V, D = i, P = l) : _ ? (D = y ? i : D, P = k ? l : P, V = c - 1, $ = (P - D) / V) : (V = (P - D) / $, za(V, Math.round(V), $ / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const j = Math.max(Xo($), Xo(D));
  M = Math.pow(10, Ee(r) ? j : r), D = Math.round(D * M) / M, P = Math.round(P * M) / M;
  let S = 0;
  for (y && (m && D !== i ? (a.push({
    value: i
  }), D < i && S++, za(Math.round((D + S * $) * M) / M, i, qs(i, w, e)) && S++) : D < i && S++); S < V; ++S) {
    const R = Math.round((D + S * $) * M) / M;
    if (k && R > l)
      break;
    a.push({
      value: R
    });
  }
  return k && m && P !== l ? a.length && za(a[a.length - 1].value, l, qs(l, w, e)) ? a[a.length - 1].value = l : a.push({
    value: l
  }) : (!k || P === l) && a.push({
    value: P
  }), a;
}
function qs(e, t, { horizontal: a, minRotation: n }) {
  const o = Nt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class yh extends Da {
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
      const r = It(o), c = It(s);
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
    }, s = this._range || this, i = vh(o, s);
    return t.bounds === "ticks" && Pr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
class hl extends yh {
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
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = Nt(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
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
}, mt = /* @__PURE__ */ Object.keys(En);
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
  const o = mt.length;
  for (let s = mt.indexOf(e); s < o - 1; ++s) {
    const i = En[mt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (l * i.size)) <= n)
      return mt[s];
  }
  return mt[o - 1];
}
function xh(e, t, a, n, o) {
  for (let s = mt.length - 1; s >= mt.indexOf(a); s--) {
    const i = mt[s];
    if (En[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return mt[a ? mt.indexOf(a) : 0];
}
function kh(e) {
  for (let t = mt.indexOf(e) + 1, a = mt.length; t < a; ++t)
    if (En[mt[t]].common)
      return mt[t];
}
function Qs(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = bo(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function _h(e, t, a, n) {
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
  return s === 0 || !a ? n : _h(e, n, o, a);
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
    const n = t.time || (t.time = {}), o = this._adapter = new wd._date(t.adapters.date);
    o.init(a), Na(n.displayFormats, o.formats()), this._parseOpts = {
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
    const s = this.min, i = this.max, l = Vr(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? Zs(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : xh(this, l.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : kh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), Js(this, l, this._majorUnit);
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
    const f = o.ticks.source === "data" && this.getDataTimestamps();
    for (m = g, p = 0; m < n; m = +t.add(m, l, i), p++)
      Qs(u, m, f);
    return (m === n || o.bounds === "ticks" || p === 1) && Qs(u, m, f), Object.keys(u).sort(Xs).map((b) => +b);
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = Nt(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
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
class SM extends ei {
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
}, wh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Ch = {
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
  ...wh
}, $h = Yl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function ya(e) {
  return ki(e) ? Jn(e) : e;
}
function Sh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ki(t) ? new Proxy(e, {}) : e;
}
function Mh(e, t) {
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
function Dh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return gl(a, e.labels), ml(a, e.datasets, t), a;
}
const Ah = fe({
  props: Ch,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = oe(null), s = xi(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: u, options: g, plugins: m, datasetIdKey: p } = e, f = Dh(u, p), b = Sh(f, u);
      s.value = new aa(o.value, {
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
      let [g, m] = c, [p, f] = u;
      const b = Jn(s.value);
      if (!b)
        return;
      let v = !1;
      if (g) {
        const y = ya(g), k = ya(p);
        y && y !== k && (Mh(b, y), v = !0);
      }
      if (m) {
        const y = ya(m.labels), k = ya(f.labels), _ = ya(m.datasets), w = ya(f.datasets);
        y !== k && (gl(b.config.data, y), v = !0), _ && _ !== w && (ml(b.config.data, _, e.datasetIdKey), v = !0);
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
  return aa.register(t), fe({
    props: fl,
    setup(a, n) {
      let { expose: o } = n;
      const s = xi(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => He(Ah, $h({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const Th = /* @__PURE__ */ Lo("bar", vd), Bh = /* @__PURE__ */ Lo("line", kd), Lh = /* @__PURE__ */ Lo("pie", _d), ti = {
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
}, Rh = [
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
    chartSeriesColors: Rh
  };
}
const Qa = 5, Ro = 8, Ph = /^x\d*$/, Ih = /^y\d*$/;
function pl(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (Ph.test(o) && (r.maxTicksLimit = Ro, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), Ih.test(o)) {
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
const gt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Eh = ["titleFont", "bodyFont", "footerFont"];
function bl(e, t = gt) {
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
      for (const r of Eh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    a.plugins = o;
  }
  return a;
}
const ni = 10, Fh = /* @__PURE__ */ fe({
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
    aa.register(ul, hl, th, cl, Bo, To), aa.defaults.font.family = gt;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m) => typeof m != "string" ? m : a.uppercaseLegendLabels ? m.toUpperCase() : i(m), r = (m, p) => m.length <= p ? m : `${m.slice(0, Math.max(1, p - 1))}…`;
    function c(m, p) {
      if (p == null) return m;
      if (Array.isArray(p) || typeof p != "object" || m == null || Array.isArray(m) || typeof m != "object") return p;
      const f = { ...m };
      for (const b of Object.keys(p)) {
        const v = p[b];
        v !== void 0 && (f[b] = c(m[b], v));
      }
      return f;
    }
    const u = C(() => {
      const m = {
        font: {
          family: gt
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
                family: gt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: ni,
              boxHeight: ni,
              usePointStyle: !1,
              generateLabels: function(f) {
                return f.data.datasets.map((v, y) => {
                  const k = Array.isArray(v.backgroundColor) ? v.backgroundColor[0] : v.backgroundColor, _ = Array.isArray(v.borderColor) ? v.borderColor[0] : v.borderColor, w = typeof _ == "string" && _.length > 0 ? _ : typeof k == "string" && k.length > 0 ? k : o.value.textSecondary;
                  return {
                    text: l(v.label || ""),
                    fillStyle: typeof k == "string" ? k : w,
                    strokeStyle: w,
                    lineWidth: 0,
                    fontColor: w,
                    hidden: !f.isDatasetVisible(y),
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
              family: gt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: gt,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(f) {
                return f.length > 0 ? String(i(f[0].label)) : "";
              },
              label: function(f) {
                let b = String(i(f.dataset.label || ""));
                b && (b += ": ");
                const y = (f.chart?.options?.indexAxis ?? "x") === "y" ? f.parsed.x : f.parsed.y;
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
                family: gt,
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
              maxTicksLimit: Ro,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: gt,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(f) {
                const b = this.getLabelForValue(f);
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
        const { beginAtZero: f, ticks: b, ...v } = p.scales.y ?? {}, y = a.data.labels?.length ?? 0, k = a.categoryLabelMaxLength ?? 20;
        p.scales.y = {
          type: "category",
          ...v,
          ticks: {
            ...b,
            autoSkip: !1,
            maxTicksLimit: y > 0 ? y : Qa,
            callback: function(_) {
              const w = this.getLabelForValue(_), $ = typeof w == "string" ? w : String(w ?? "");
              return r($, k);
            }
          }
        };
      }
      return bl(
        pl(p)
      );
    }), g = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (m, p) => (h(), x("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: _e({ height: `${g.value}px` })
    }, [
      z(T(Th), {
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
}, $t = /* @__PURE__ */ be(Fh, [["__scopeId", "data-v-1d64fb88"]]), Oh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Vh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Nh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, zh = ["aria-pressed", "aria-label", "onClick"], jh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Hh = /* @__PURE__ */ fe({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(
      ul,
      hl,
      Xu,
      qu,
      cl,
      Bo,
      To
    ), aa.defaults.font.family = gt;
    const n = oe(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const v = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((y) => {
          const k = y.borderColor, _ = Array.isArray(k) ? k[0] : k, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = y.pointBackgroundColor !== void 0 ? y.pointBackgroundColor : v, M = y.pointHoverBackgroundColor !== void 0 ? y.pointHoverBackgroundColor : $, D = y.pointBorderWidth ?? 2, P = y.pointHoverBorderWidth ?? D;
          return {
            ...y,
            fill: y.fill ?? !1,
            clip: y.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: M,
            pointBorderColor: y.pointBorderColor ?? w,
            pointHoverBorderColor: y.pointHoverBorderColor ?? w,
            pointBorderWidth: D,
            pointHoverBorderWidth: P
          };
        })
      };
    }), r = (v) => typeof v == "string" ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v, c = (v) => typeof v != "string" ? v : a.uppercaseLegendLabels ? v.toUpperCase() : r(v);
    function u(v) {
      const y = v.borderColor, k = Array.isArray(y) ? y[0] : y;
      return typeof k == "string" && k.length > 0 ? k : s.value.textSecondary;
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
        const y = Array.from({ length: v }, (k, _) => m.value[_] ?? !0);
        m.value = y;
      },
      { immediate: !0 }
    );
    function p(v) {
      const k = n.value?.chart;
      if (!k || v < 0 || v >= k.data.datasets.length) return;
      const _ = !k.isDatasetVisible(v);
      k.setDatasetVisibility(v, _), m.value[v] = _, k.update();
    }
    function f(v, y) {
      if (y == null) return v;
      if (Array.isArray(y) || typeof y != "object" || v == null || Array.isArray(v) || typeof v != "object") return y;
      const k = { ...v };
      for (const _ of Object.keys(y)) {
        const w = y[_];
        w !== void 0 && (k[_] = f(v[_], w));
      }
      return k;
    }
    const b = C(() => {
      const v = {
        font: {
          family: gt
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
              family: gt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: gt,
              size: 13
            },
            callbacks: {
              title: function(_) {
                return _.length > 0 ? String(r(_[0].label)) : "";
              },
              label: function(_) {
                let w = String(r(_.dataset.label || ""));
                return w && (w += ": "), _.parsed.y !== null && (w += _.parsed.y), w;
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
                family: gt,
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
                family: gt,
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
      }, y = a.options ? f(v, a.options) : v;
      return bl(
        pl(y)
      );
    });
    return t({ isDark: o }), (v, y) => (h(), x("div", Oh, [
      d("div", Vh, [
        z(T(Bh), {
          ref_key: "lineChartRef",
          ref: n,
          data: l.value,
          options: b.value
        }, null, 8, ["data", "options"])
      ]),
      g.value.length > 0 ? (h(), x("ul", Nh, [
        (h(!0), x(he, null, pe(g.value, (k, _) => (h(), x("li", {
          key: k.key,
          role: "listitem"
        }, [
          d("button", {
            type: "button",
            class: Z(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: _e({ color: k.color }),
            "aria-pressed": m.value[_] !== !1,
            "aria-label": `${k.label}. ${m.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => p(_)
          }, [
            d("span", jh, [
              y[0] || (y[0] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              d("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: _e({ borderColor: k.color })
              }, null, 4),
              y[1] || (y[1] = d("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            d("span", null, A(k.label), 1)
          ], 14, zh)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), pt = /* @__PURE__ */ be(Hh, [["__scopeId", "data-v-426e23d5"]]), Wh = { class: "chart-container" }, Kh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Uh = /* @__PURE__ */ fe({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    aa.register(Ou, Bo, To);
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
              family: Kh,
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
              const c = r.label || "", u = r.parsed || 0, g = r.dataset.data.reduce((p, f) => p + f, 0), m = (u / g * 100).toFixed(1);
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
    return t({ isDark: n }), (r, c) => (h(), x("div", Wh, [
      z(T(Lh), {
        data: T(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Fn = /* @__PURE__ */ be(Uh, [["__scopeId", "data-v-0f7806d6"]]), Yh = { class: "chart-container" }, qh = ["viewBox"], Xh = ["transform"], Gh = ["x", "width", "fill", "stroke"], Zh = ["fill"], Qh = ["x1", "y1", "x2", "y2", "stroke"], Jh = ["points", "fill"], ef = ["x1", "y1", "x2", "y2", "stroke"], tf = ["x", "y", "fill"], af = ["x1", "y1", "x2", "y2", "stroke"], nf = ["points", "fill"], of = ["transform"], sf = ["y1", "y2"], lf = ["y1", "y2"], rf = ["y1", "y2"], cf = ["y1", "y2"], df = ["y", "height"], uf = ["y1", "y2"], hf = ["y1", "y2"], ff = ["y1", "y2"], gf = ["y1", "y2"], mf = ["y", "height"], pf = ["cy", "stroke", "onMouseenter"], bf = ["cy", "stroke", "onMouseenter"], vf = ["cy", "stroke", "onMouseenter"], yf = ["cy", "stroke", "onMouseenter"], xf = ["y1", "y2", "onMouseenter"], kf = ["y1", "y2", "onMouseenter"], _f = ["x", "y", "fill"], wf = ["x", "y", "fill"], Cf = ["transform"], $f = { transform: "translate(-200, 0)" }, Sf = ["stroke"], Mf = ["fill"], Df = { transform: "translate(-130, 0)" }, Af = ["stroke"], Tf = ["fill"], Bf = { transform: "translate(-60, 0)" }, Lf = ["stroke"], Rf = ["fill"], Pf = { transform: "translate(10, 0)" }, If = ["stroke"], Ef = ["fill"], Ff = { transform: "translate(80, 0)" }, Of = ["fill"], Vf = { transform: "translate(150, 0)" }, Nf = ["fill"], zf = /* @__PURE__ */ fe({
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
      const f = m.currentTarget.closest("svg");
      if (!f) return;
      const b = f.getBoundingClientRect(), v = f.createSVGPoint();
      v.x = m.clientX - b.left, v.y = m.clientY - b.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: p
      };
    }, r = (m) => {
      if (s.value.visible) {
        const p = m.currentTarget, f = p.getBoundingClientRect(), b = p.createSVGPoint();
        b.x = m.clientX - f.left, b.y = m.clientY - f.top, s.value.x = b.x, s.value.y = b.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, u = () => {
      s.value.visible = !1;
    }, g = C(() => {
      const m = [], f = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const v = b, y = (v - 1) / 9, k = a.chartMargin + f - y * f;
        m.push({ value: v, y: k });
      }
      return m;
    });
    return t({ isDark: n }), (m, p) => (h(), x("div", Yh, [
      (h(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: _e(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (h(), x("g", {
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
          }, null, 8, Gh),
          d("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Zh)
        ], 8, Xh)) : O("", !0),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Qh),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Jh),
        (h(!0), x(he, null, pe(g.value, (f, b) => (h(), x(he, { key: b }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ef),
          d("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, tf)
        ], 64))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, af),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, nf),
        (h(!0), x(he, null, pe(e.boxplotData, (f, b) => (h(), x(he, { key: b }, [
          d("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (h(), x(he, { key: 0 }, [
              d("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, sf),
              d("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, lf),
              d("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, rf),
              d("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, cf),
              d("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, df)
            ], 64)) : (h(), x(he, { key: 1 }, [
              d("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, uf),
              d("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, hf),
              d("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, ff),
              d("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, gf),
              d("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, mf)
            ], 64)),
            d("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, pf),
            d("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, bf),
            d("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, vf),
            d("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, yf),
            d("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, xf),
            f.averageY ? (h(), x("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, kf)) : O("", !0)
          ], 8, of),
          d("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, _f),
          f.responseCount ? (h(), x("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, wf)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (h(), x("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", $f, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Sf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Mf)
          ]),
          d("g", Df, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Af),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Tf)
          ]),
          d("g", Bf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Lf),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Rf)
          ]),
          d("g", Pf, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, If),
            d("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Ef)
          ]),
          d("g", Ff, [
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
            }, " Avg ", 8, Of)
          ]),
          d("g", Vf, [
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
            }, " Median ", 8, Nf)
          ])
        ], 8, Cf)) : O("", !0)
      ], 44, qh))
    ]));
  }
}), jf = /* @__PURE__ */ be(zf, [["__scopeId", "data-v-9ac5c075"]]), Hf = { class: "chart-container" }, Wf = ["viewBox"], Kf = ["x1", "y1", "x2", "y2", "stroke"], Uf = ["points", "fill"], Yf = ["x1", "y1", "x2", "y2", "stroke"], qf = ["x1", "y1", "x2", "y2", "stroke"], Xf = ["x", "y", "fill"], Gf = ["x", "y", "fill", "transform"], Zf = ["x1", "y1", "x2", "y2", "stroke"], Qf = ["points", "fill"], Jf = ["transform"], eg = ["y1", "y2", "stroke", "onMouseenter"], tg = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], ag = ["x1", "y1", "x2", "y2", "onMouseenter"], ng = ["x1", "y1", "x2", "y2", "onMouseenter"], og = ["cy", "stroke", "onMouseenter"], sg = ["cy", "stroke", "onMouseenter"], ig = ["x", "y", "fill"], lg = ["x", "y", "fill"], rg = ["transform"], cg = { transform: "translate(-180, 0)" }, dg = ["stroke"], ug = ["fill"], hg = { transform: "translate(-120, 0)" }, fg = ["fill"], gg = { transform: "translate(-60, 0)" }, mg = ["fill"], pg = { transform: "translate(0, 0)" }, bg = ["stroke"], vg = ["fill"], yg = { transform: "translate(60, 0)" }, xg = ["fill"], kg = { transform: "translate(130, 0)" }, _g = ["fill"], wg = ["transform"], Cg = ["x", "y", "width", "height", "fill", "stroke"], $g = ["y", "fill"], Sg = ["y", "fill"], vn = 10, Mg = 14, Zn = 13, oi = 4, si = 12, Dg = /* @__PURE__ */ fe({
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
    function l(k, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(k, 1) * _ * $);
    }
    function r(k, _) {
      return Math.max(
        l(k.length, Zn, !0),
        l(_.length, si, !1),
        52
      ) + Mg * 2;
    }
    function c(k, _, w, $) {
      const M = w / 2, D = 6, P = Math.min(
        Math.max(k, M + D),
        a.chartWidth - M - D
      ), V = D + $ + 10, j = a.chartHeight - D + 10, S = Math.min(Math.max(_, V), j);
      return { x: P, y: S };
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
    }), m = (k) => typeof k == "string" ? k.charAt(0).toUpperCase() + k.slice(1).toLowerCase() : k, p = (k, _, w) => {
      const $ = k.currentTarget.closest("svg");
      if (!$) return;
      const M = $.getBoundingClientRect(), D = $.createSVGPoint();
      D.x = k.clientX - M.left, D.y = k.clientY - M.top;
      let P = m(_.label), V = "";
      switch (w) {
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
      const j = r(P, V), S = s;
      let R = D.x, B = D.y - 20;
      const H = c(R, B, j, S);
      R = H.x, B = H.y, g.value = {
        visible: !0,
        x: R,
        y: B,
        title: P,
        text: V,
        width: j,
        height: S
      };
    }, f = (k) => {
      if (g.value.visible) {
        const _ = k.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = k.clientX - w.left, $.y = k.clientY - w.top;
        let M = $.x, D = $.y - 20;
        const P = c(M, D, g.value.width, g.value.height);
        g.value.x = P.x, g.value.y = P.y;
      }
    }, b = () => {
      g.value.visible = !1;
    }, v = () => {
      g.value.visible = !1;
    }, y = C(() => {
      const k = [], w = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const M = $, D = (M - 1) / 9, P = a.chartMargin + w - D * w;
        k.push({ value: M, y: P });
      }
      return k;
    });
    return t({ isDark: n }), (k, _) => (h(), x("div", Hf, [
      (h(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: _e(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
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
        }, null, 8, Kf),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Uf),
        (h(!0), x(he, null, pe(y.value, (w, $) => (h(), x("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Yf))), 128)),
        (h(!0), x(he, null, pe(y.value, (w, $) => (h(), x(he, { key: $ }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, qf),
          d("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, Xf)
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
        }, A(m(e.yAxisLabel)), 9, Gf),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Zf),
        d("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Qf),
        (h(!0), x(he, null, pe(e.candlestickData, (w, $) => (h(), x(he, { key: $ }, [
          d("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            d("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (M) => p(M, w, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, eg),
            d("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (M) => p(M, w, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, tg),
            w.medianY ? (h(), x("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (M) => p(M, w, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ag)) : O("", !0),
            w.averageY ? (h(), x("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (M) => p(M, w, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, ng)) : O("", !0),
            d("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => p(M, w, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, og),
            d("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => p(M, w, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, sg)
          ], 8, Jf),
          d("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(m(w.label)), 9, ig),
          w.responseCount ? (h(), x("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, lg)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (h(), x("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          d("g", cg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, dg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, ug)
          ]),
          d("g", hg, [
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
            }, " Q1 ", 8, fg)
          ]),
          d("g", gg, [
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
            }, " Q3 ", 8, mg)
          ]),
          d("g", pg, [
            d("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, bg),
            d("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, vg)
          ]),
          d("g", yg, [
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
            }, " Avg ", 8, xg)
          ]),
          d("g", kg, [
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
            }, " Median ", 8, _g)
          ])
        ], 8, rg)) : O("", !0),
        g.value.visible ? (h(), x("g", {
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
          }, null, 8, Cg),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + vn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.title), 9, $g),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + vn + Zn + oi,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.text), 9, Sg)
        ], 8, wg)) : O("", !0)
      ], 44, Wf))
    ]));
  }
}), Ag = /* @__PURE__ */ be(Dg, [["__scopeId", "data-v-22efd66d"]]), Tg = ["viewBox"], Bg = ["x1", "y1", "x2", "y2", "stroke"], Lg = ["x1", "y1", "x2", "y2", "stroke"], Rg = ["points", "fill"], Pg = ["x1", "y1", "x2", "y2", "stroke"], Ig = ["x", "y", "fill"], Eg = ["x", "y", "fill", "transform"], Fg = ["x1", "y1", "x2", "y2", "stroke"], Og = ["points", "fill"], Vg = ["x1", "y1", "x2", "y2", "stroke"], Ng = ["x", "y", "fill"], zg = ["x", "y", "fill"], jg = ["d"], Hg = ["x", "y", "width", "height", "onMouseenter"], Wg = ["x1", "y1", "x2", "y2"], Kg = ["x", "y"], Ug = ["x1", "y1", "x2", "y2"], Yg = ["x", "y"], qg = ["x1", "y1", "x2", "y2"], Xg = ["x", "y"], Gg = ["x1", "y1", "x2", "y2"], Zg = ["x", "y"], Qg = ["x1", "y1", "x2", "y2"], Jg = ["x", "y"], em = ["x1", "y1", "x2", "y2"], tm = ["x", "y"], am = ["transform"], nm = { transform: "translate(-220, 0)" }, om = ["fill"], sm = { transform: "translate(-140, 0)" }, im = ["fill"], lm = { transform: "translate(-80, 0)" }, rm = ["fill"], cm = { transform: "translate(-20, 0)" }, dm = ["fill"], um = { transform: "translate(60, 0)" }, hm = ["fill"], fm = { transform: "translate(130, 0)" }, gm = ["fill"], mm = { transform: "translate(180, 0)" }, pm = ["fill"], bm = ["transform"], vm = ["x", "y", "width", "height", "fill", "stroke"], ym = ["y", "fill"], xm = ["y", "fill"], yn = 10, km = 14, Qn = 13, ii = 12, li = 4, _m = /* @__PURE__ */ fe({
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
    function l(ae, X, I) {
      const G = I ? 0.6 : 0.535;
      return Math.ceil(Math.max(ae, 1) * X * G);
    }
    function r(ae, X) {
      return Math.max(
        l(ae.length, Qn, !0),
        l(X.length, ii, !1),
        52
      ) + km * 2;
    }
    function c(ae, X, I, G) {
      const ee = I / 2, F = 6, Q = Math.min(
        Math.max(ae, ee + F),
        a.chartWidth - ee - F
      ), se = F + G + 10, me = a.chartHeight - F + 10, Ce = Math.min(Math.max(X, se), me);
      return { x: Q, y: Ce };
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
    ), p = C(() => a.chartMargin + a.plotInset), f = C(
      () => a.chartWidth - m.value - a.plotInset
    ), b = C(() => Math.max(f.value - p.value, 1)), v = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), y = C(() => b.value / 10 * 0.52);
    function k(ae) {
      if (ae < 1 || ae > 10) return null;
      const X = b.value / 10;
      return p.value + (ae - 0.5) * X;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (ae, X) => {
        const I = X + 1, G = k(I);
        return G === null ? null : { score: I, x: G };
      }).filter((ae) => ae !== null)
    ), w = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ae = Math.max(...a.histogram.map((I) => I.count || 0), 1), X = Math.max(1, Math.ceil(ae * 0.2));
      return ae + X;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const ae = a.averageScore || 0;
      let X = 0, I = 0;
      if (a.histogram.forEach((ee) => {
        const F = ee.count || 0;
        X += F;
        const Q = ee.score - ae;
        I += F * (Q * Q);
      }), X === 0) return 1;
      const G = I / X;
      return Math.sqrt(G) || 1;
    }), M = (ae, X, I) => {
      if (I === 0) return 0;
      const G = 1 / (I * Math.sqrt(2 * Math.PI)), ee = -0.5 * Math.pow((ae - X) / I, 2);
      return G * Math.exp(ee);
    }, D = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const ae = a.averageScore, X = $.value, I = 100, ee = Math.max(...a.histogram.map((me) => me.count || 0), 1) / w.value * v.value;
      if (ee <= 0) return null;
      let F = 0;
      for (let me = 0; me <= I; me++) {
        const Ce = 1 + 9 * (me / I), we = M(Ce, ae, X);
        we > F && (F = we);
      }
      if (F <= 0) return null;
      const Q = ee / F, se = [];
      for (let me = 0; me <= I; me++) {
        const Ce = 1 + 9 * (me / I), we = M(Ce, ae, X) * Q, Re = k(Ce);
        if (Re !== null) {
          const Pe = a.chartHeight - a.chartBottomMargin - we;
          se.push(`${me === 0 ? "M" : "L"} ${Re} ${Pe}`);
        }
      }
      return se.join(" ");
    }), P = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const ae = b.value / 10;
      return a.histogram.map((X) => {
        const I = Number(X.score);
        if (!Number.isFinite(I) || I < 1 || I > 10)
          return null;
        const G = p.value + (I - 0.5) * ae, ee = X.count > 0 ? X.count / w.value * v.value : 0, F = a.chartHeight - a.chartBottomMargin - ee;
        return {
          score: I,
          count: X.count,
          x: G,
          y: F,
          height: ee
        };
      }).filter((X) => X !== null);
    }), V = C(() => k(a.minScore)), j = C(() => k(a.maxScore)), S = C(() => k(a.q1Score)), R = C(() => k(a.medianScore)), B = C(() => k(a.q3Score)), H = C(() => k(a.averageScore)), W = C(() => a.minScore), J = C(() => a.maxScore), re = C(() => a.q1Score), ue = C(() => a.medianScore), q = C(() => a.q3Score), ne = C(() => a.averageScore), L = C(() => {
      const ae = [], X = a.chartMargin - 8, I = 18;
      S.value !== null && ae.push({
        x: S.value,
        y: X,
        value: a.q1Score,
        label: `Q1: ${re.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), R.value !== null && ae.push({
        x: R.value,
        y: X - I,
        value: a.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), H.value !== null && ae.push({
        x: H.value,
        y: X - I,
        value: a.averageScore,
        label: `Avg: ${ne.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && ae.push({
        x: B.value,
        y: X,
        value: a.q3Score,
        label: `Q3: ${q.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), ae.sort((F, Q) => (F.x || 0) - (Q.x || 0));
      const G = [[], [], []];
      ae.forEach((F) => {
        if (F.x === null) return;
        let Q = -1;
        for (let se = 0; se < G.length; se++) {
          let me = !1;
          for (const Ce of G[se]) {
            if (Ce.x === null) continue;
            const we = Math.abs(F.x - Ce.x), Re = (F.width + Ce.width) / 2 + 10;
            if (we < Re) {
              me = !0;
              break;
            }
          }
          if (!me) {
            Q = se;
            break;
          }
        }
        Q === -1 && (Q = G.length - 1), F.y = X - Q * I, G[Q].push(F);
      });
      const ee = 15;
      return ae.forEach((F) => {
        F.y < ee && (F.y = ee);
      }), ae;
    }), K = (ae) => L.value.find((I) => I.id === ae)?.y || a.chartMargin - 10, Y = C(() => {
      const ae = [];
      for (let I = 0; I <= 5; I++) {
        const G = Math.round(w.value / 5 * I), ee = a.chartHeight - a.chartBottomMargin - I / 5 * v.value;
        ae.push({ value: G, y: ee });
      }
      return ae;
    });
    function N(ae, X, I) {
      const G = ae.createSVGPoint();
      G.x = X, G.y = I;
      const ee = ae.getScreenCTM();
      if (!ee) {
        const Q = ae.getBoundingClientRect();
        return { x: X - Q.left, y: I - Q.top };
      }
      const F = G.matrixTransform(ee.inverse());
      return { x: F.x, y: F.y };
    }
    const ie = (ae, X) => {
      a.interactive && ye(ae, X);
    }, ce = () => {
      a.interactive && de();
    }, ye = (ae, X) => {
      const I = ae.currentTarget.closest("svg");
      if (!I) return;
      const { x: G, y: ee } = N(I, ae.clientX, ae.clientY), F = `Score: ${X.score}`, Q = `Count: ${Number(X.count ?? 0).toLocaleString()}`, se = r(F, Q), me = s, Ce = typeof X?.x == "number" ? X.x : G;
      let we = ee - 20;
      const Re = c(Ce, we, se, me);
      g.value = {
        visible: !0,
        x: Re.x,
        y: Re.y,
        title: F,
        text: Q,
        width: se,
        height: me,
        anchorX: typeof X?.x == "number" ? X.x : null
      };
    }, U = (ae) => {
      if (a.interactive && g.value.visible) {
        const X = ae.currentTarget, { x: I, y: G } = N(X, ae.clientX, ae.clientY), ee = g.value.anchorX, F = ee != null && Number.isFinite(ee) ? ee : I;
        let Q = G - 20;
        const se = c(F, Q, g.value.width, g.value.height);
        g.value.x = se.x, g.value.y = se.y;
      }
    }, le = () => {
      de();
    }, de = () => {
      g.value.visible = !1, g.value.anchorX = null;
    };
    return t({ isDark: n }), (ae, X) => (h(), x("div", {
      class: Z(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (h(), x("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: _e(`min-height: ${e.chartHeight}px;`),
        onMousemove: U,
        onMouseleave: le
      }, [
        X[7] || (X[7] = d("defs", null, [
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
        (h(!0), x(he, null, pe(Y.value, (I, G) => (h(), x("line", {
          key: `grid-${G}`,
          x1: p.value,
          y1: I.y,
          x2: f.value,
          y2: I.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Bg))), 128)),
        d("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Lg),
        d("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Rg),
        (h(!0), x(he, null, pe(Y.value, (I, G) => (h(), x(he, {
          key: `y-tick-${G}`
        }, [
          d("line", {
            x1: e.chartMargin - 6,
            y1: I.y,
            x2: e.chartMargin,
            y2: I.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Pg),
          d("text", {
            x: e.chartMargin - 12,
            y: I.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(I.value), 9, Ig)
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
        }, " Count ", 8, Eg),
        d("line", {
          x1: p.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: f.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Fg),
        d("polygon", {
          points: `${f.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${f.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${f.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Og),
        (h(!0), x(he, null, pe(_.value, (I) => (h(), x(he, {
          key: `tick-${I.score}`
        }, [
          d("line", {
            x1: I.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: I.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Vg),
          d("text", {
            x: I.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(I.score), 9, Ng)
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
        D.value ? (h(), x("path", {
          key: 0,
          d: D.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, jg)) : O("", !0),
        (h(!0), x(he, null, pe(P.value, (I, G) => (h(), x("rect", {
          key: `bar-${G}`,
          x: I.x - y.value / 2,
          y: I.y,
          width: y.value,
          height: I.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ee) => ie(ee, I),
          onMouseleave: ce,
          style: _e({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Hg))), 128)),
        e.showStatLabels && V.value ? (h(), x("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Wg)) : O("", !0),
        e.showStatLabels && V.value ? (h(), x("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(W.value.toFixed(1)), 9, Kg)) : O("", !0),
        e.showStatLabels && S.value ? (h(), x("line", {
          key: 3,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ug)) : O("", !0),
        e.showStatLabels && S.value ? (h(), x("text", {
          key: 4,
          x: S.value,
          y: K("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(re.value.toFixed(1)), 9, Yg)) : O("", !0),
        e.showStatLabels && R.value ? (h(), x("line", {
          key: 5,
          x1: R.value,
          y1: e.chartMargin,
          x2: R.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, qg)) : O("", !0),
        e.showStatLabels && R.value ? (h(), x("text", {
          key: 6,
          x: R.value,
          y: K("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ue.value.toFixed(1)), 9, Xg)) : O("", !0),
        e.showStatLabels && H.value ? (h(), x("line", {
          key: 7,
          x1: H.value,
          y1: e.chartMargin,
          x2: H.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Gg)) : O("", !0),
        e.showStatLabels && H.value ? (h(), x("text", {
          key: 8,
          x: H.value,
          y: K("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(ne.value.toFixed(1)), 9, Zg)) : O("", !0),
        e.showStatLabels && B.value ? (h(), x("line", {
          key: 9,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Qg)) : O("", !0),
        e.showStatLabels && B.value ? (h(), x("text", {
          key: 10,
          x: B.value,
          y: K("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(q.value.toFixed(1)), 9, Jg)) : O("", !0),
        e.showStatLabels && j.value ? (h(), x("line", {
          key: 11,
          x1: j.value,
          y1: e.chartMargin,
          x2: j.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, em)) : O("", !0),
        e.showStatLabels && j.value ? (h(), x("text", {
          key: 12,
          x: j.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(J.value.toFixed(1)), 9, tm)) : O("", !0),
        e.showLegend ? (h(), x("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          d("g", nm, [
            X[0] || (X[0] = d("line", {
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
            }, " Gaussian ", 8, om)
          ]),
          d("g", sm, [
            X[1] || (X[1] = d("line", {
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
            }, " Min ", 8, im)
          ]),
          d("g", lm, [
            X[2] || (X[2] = d("line", {
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
            }, " Q1 ", 8, rm)
          ]),
          d("g", cm, [
            X[3] || (X[3] = d("line", {
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
            }, " Median ", 8, dm)
          ]),
          d("g", um, [
            X[4] || (X[4] = d("line", {
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
            }, " Avg ", 8, hm)
          ]),
          d("g", fm, [
            X[5] || (X[5] = d("line", {
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
            }, " Q3 ", 8, gm)
          ]),
          d("g", mm, [
            X[6] || (X[6] = d("line", {
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
            }, " Max ", 8, pm)
          ])
        ], 8, am)) : O("", !0),
        e.interactive && g.value.visible ? (h(), x("g", {
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
          }, null, 8, vm),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + yn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.title), 9, ym),
          d("text", {
            x: "0",
            y: -g.value.height - 10 + yn + Qn + li,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(g.value.text), 9, xm)
        ], 8, bm)) : O("", !0)
      ], 44, Tg))
    ], 2));
  }
}), vl = /* @__PURE__ */ be(_m, [["__scopeId", "data-v-8f9da805"]]), wm = 639, yl = 1024;
function ri(e) {
  return e < 640 ? "mobile" : e <= yl ? "tablet" : "desktop";
}
function Cm() {
  const e = oe(
    typeof window > "u" ? "desktop" : ri(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = ri(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Je(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${wm}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${yl}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
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
const Dt = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", xe = (e, t) => `${e.toLocaleString()} (${Dt(e, t)})`, $m = { class: "chart-container" }, Sm = {
  key: 0,
  class: "loading-state loading-overlay"
}, ra = 12, Mm = /* @__PURE__ */ fe({
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
    No.use([Gl, Zl, Ql, Jl]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = Cm(), i = oe(null), l = oe(!0), r = oe(!1);
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
    }, f = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, b = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, v = C(() => {
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
      const le = U.replace(/_/g, " ").replace(/\s+/g, " ").trim(), de = le.match(/^Failed:\s*(.+)$/i);
      return de ? `Failed:
${de[1].trim()}` : le;
    }, k = (U, le) => {
      const de = U.trim();
      if (!de || le < 1 || de.length <= le) return de;
      const ae = [];
      let X = 0;
      for (; X < de.length; ) {
        const I = Math.min(X + le, de.length);
        if (I >= de.length) {
          const F = de.slice(X).trim();
          F && ae.push(F);
          break;
        }
        const G = de.slice(X, I), ee = G.lastIndexOf(" ");
        if (ee > 0)
          for (ae.push(de.slice(X, X + ee).trim()), X += ee; X < de.length && de[X] === " "; ) X += 1;
        else
          ae.push(G), X = I;
      }
      return ae.join(`
`);
    }, _ = (U, le) => {
      const de = U.trim();
      return !de || le < 1 ? U : de.split(`
`).map((ae) => k(ae.trim(), le)).filter(Boolean).join(`
`);
    }, w = (U) => U.status ? U.status : f.test(U.name) ? "abandon" : b.test(U.name) ? "error" : "success", $ = (U) => U.originalValue ?? U.value, M = (U, le) => {
      const de = new Set(le.map((X) => X.target)), ae = U.filter((X) => !de.has(X.name));
      for (const X of ae) {
        if (typeof X.value == "number" && X.value > 0) return X.value;
        const I = le.filter((G) => G.source === X.name);
        if (I.length > 0)
          return I.reduce((G, ee) => G + $(ee), 0);
      }
      return le.reduce((X, I) => Math.max(X, $(I)), 0);
    }, D = (U, le) => {
      const de = /* @__PURE__ */ new Map(), ae = new Set(le.map((I) => I.target)), X = U.filter((I) => !ae.has(I.name)).map((I) => ({ name: I.name, depth: 0 }));
      for (; X.length > 0; ) {
        const { name: I, depth: G } = X.shift(), ee = de.get(I);
        if (!(ee !== void 0 && ee >= G)) {
          de.set(I, G);
          for (const F of le)
            F.source === I && X.push({ name: F.target, depth: G + 1 });
        }
      }
      for (const I of U)
        de.has(I.name) || de.set(I.name, 0);
      return de;
    }, P = (U, le) => {
      const de = /* @__PURE__ */ new Map(), ae = new Set(le.map((ee) => ee.target)), X = U.filter((ee) => !ae.has(ee.name));
      let I = 0;
      const G = (ee) => {
        let F = ee;
        for (; F && !de.has(F); )
          de.set(F, I), I += 1, F = le.filter(
            (se) => se.source === F && w({ name: se.target }) === "success"
          ).sort((se, me) => $(me) - $(se))[0]?.target;
      };
      return X.forEach((ee) => G(ee.name)), de;
    }, V = (U, le, de) => {
      const ae = w(U);
      if (ae === "success" && de.has(U.name))
        return de.get(U.name);
      if (ae === "success") {
        const X = le.filter((G) => G.target === U.name);
        return 200 + (X.length ? Math.min(
          ...X.map(
            (G) => de.has(G.source) ? (de.get(G.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ae === "abandon" ? 1e3 : 2e3;
    }, j = (U, le) => {
      const de = D(U, le), ae = P(U, le);
      return [...U].sort((X, I) => {
        const G = de.get(X.name) ?? 0, ee = de.get(I.name) ?? 0;
        if (G !== ee) return G - ee;
        const F = p[w(X)], Q = p[w(I)];
        if (F !== Q) return F - Q;
        const se = V(X, le, ae), me = V(I, le, ae);
        if (se !== me) return se - me;
        const Ce = typeof X.order == "number" ? X.order : Number.MAX_SAFE_INTEGER, we = typeof I.order == "number" ? I.order : Number.MAX_SAFE_INTEGER;
        return Ce !== we ? Ce - we : X.name.localeCompare(I.name);
      });
    }, S = (U, le, de, ae) => {
      const I = _(U, ae).split(`
`), G = le * 0.58, F = Math.max(...I.map((se) => se.length), 1) * G, Q = I.length * de;
      return {
        lines: I,
        width: F,
        height: Q,
        nodeWidth: F + ra * 2
      };
    }, R = (U, le, de, ae) => {
      const X = typeof U.label == "string" && U.label ? U.label : U.name, I = `${y(X)}
(${Dt(de, ae)})`;
      return _(I, le);
    }, B = (U, le) => {
      const de = le.filter((ae) => ae.target === U.name);
      return de.length > 0 ? de.reduce((ae, X) => ae + $(X), 0) : typeof U.value == "number" ? U.value : le.filter((ae) => ae.source === U.name).reduce((ae, X) => ae + $(X), 0);
    }, H = (U, le, de) => {
      const ae = le.find((X) => X.name === U);
      return ae ? B(ae, de) : de.filter((X) => X.source === U).reduce((X, I) => X + $(I), 0);
    }, W = (U, le, de, ae) => {
      const X = H(U, de, ae);
      return `${le.toLocaleString()} (${Dt(le, X)})`;
    }, J = (U, le = 0) => {
      if (le > 0) return le;
      const de = U.match(/^(\d+(?:\.\d+)?)px$/);
      if (de) return Number(de[1]);
      const ae = U.match(/^(\d+(?:\.\d+)?)vh$/);
      return ae && typeof window < "u" ? Number(ae[1]) / 100 * window.innerHeight : 500;
    }, re = (U, le, de, ae, X) => {
      if (!le.length || !U.length || X <= 0) return U;
      const I = U.map((we) => ({ ...we })), G = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), ee = Math.max(4, de.labelCharsPerLine), F = Math.max(ae * 0.88, 260), Q = D(le, I), se = /* @__PURE__ */ new Map();
      le.forEach((we) => {
        const Re = Q.get(we.name) ?? 0;
        se.set(Re, (se.get(Re) ?? 0) + 1);
      });
      const me = (we) => {
        const Pe = le.find((oa) => oa.name === we)?.displayLabel || we, Yt = S(Pe, de.labelFontSize, G, ee).height + ra * 2, pa = Q.get(we) ?? 0, an = se.get(pa) ?? 1, nn = (Math.max(an, 1) - 1) * de.nodeGap / Math.max(an, 1), On = Math.max(F - nn, Yt);
        return Math.max(1, Yt / On * X);
      }, Ce = (we) => {
        const Re = I.filter((Pe) => Pe.target === we);
        return Re.length > 0 ? Re.reduce((Pe, qe) => Pe + qe.value, 0) : I.filter((Pe) => Pe.source === we).reduce((Pe, qe) => Pe + qe.value, 0);
      };
      for (let we = 0; we < 16; we += 1) {
        let Re = !1;
        for (const Pe of le) {
          const qe = me(Pe.name), Yt = Ce(Pe.name);
          if (Yt >= qe) continue;
          const pa = I.filter((oa) => oa.target === Pe.name), an = I.filter((oa) => oa.source === Pe.name), nn = pa.length > 0 ? pa : an;
          if (nn.length === 0) continue;
          const On = qe / Math.max(Yt, 1e-6);
          nn.forEach((oa) => {
            oa.value *= On;
          }), Re = !0;
        }
        if (!Re) break;
      }
      return I;
    }, ue = (U, le, de) => {
      const ae = M(U, le), X = j(U, le), I = de.labelLineHeight || Math.round(de.labelFontSize * 1.25), G = Math.max(4, de.labelCharsPerLine);
      let ee = de.nodeWidth;
      const F = [], Q = X.map((me, Ce) => {
        const we = w(me), Re = R(
          me,
          G,
          B(me, le),
          ae
        );
        F.push(Re);
        const Pe = S(Re, de.labelFontSize, I, G);
        de.orient === "vertical" ? ee = Math.max(ee, Pe.height + ra * 2) : ee = Math.max(ee, Pe.nodeWidth);
        const qe = a.nodeColors[me.name] || m[we] || q[Ce % q.length], Yt = Math.max(Math.ceil(Pe.nodeWidth - ra * 2), 48);
        return {
          ...me,
          displayLabel: Re,
          label: {
            width: Yt,
            overflow: "none",
            lineHeight: I,
            fontSize: de.labelFontSize
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
      let se = { ...de.contentMargins };
      if (de.orient === "vertical") {
        const me = Math.max(
          ...F.map(
            (we) => S(we, de.labelFontSize, I, G).width
          ),
          0
        ), Ce = typeof se.right == "number" ? se.right : 10;
        se = {
          ...se,
          right: Math.max(Ce, me + ra + de.labelDistance)
        };
      }
      return { nodes: Q, maxNodeWidth: ee, contentMargins: se, originTotal: ae };
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
      const U = a.data.links.filter(
        (X) => X.source && X.target && typeof X.value == "number"
      ), le = Math.max(...U.map((X) => X.value), 1), de = Math.max(1, le * 0.01), ae = U.map((X) => ({
        ...X,
        originalValue: X.value,
        value: X.value < le * 0.01 ? de : X.value
      }));
      return {
        nodes: a.data.nodes.filter((X) => X.name),
        links: ae
      };
    }, L = (U, le, de) => (ae) => {
      const X = ae.dataType === "node", I = o.value.tooltipText, G = n.value ? "#d1d5db" : "#e2e8f0";
      if (X) {
        const me = le.filter((Pe) => Pe.target === ae.name), Ce = le.filter((Pe) => Pe.source === ae.name), we = me.length > 0 ? me.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0) : Ce.reduce((Pe, qe) => Pe + (qe.originalValue || qe.value), 0), Re = Dt(we, de);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${ae.name} (${Re})</div><div style="color: ${G}; font-size: 12px;">Count: ${we.toLocaleString()}</div>`;
      }
      const ee = ae.data?.source || ae.source || "Unknown", F = ae.data?.target || ae.target || "Unknown", Q = Number(ae.data?.originalValue ?? ae.data?.value ?? ae.value ?? 0), se = W(ee, Q, U, le);
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${ee} → ${F}</div><div style="color: ${G}; font-size: 12px;">Flow: ${se}</div>`;
    }, K = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const U = v.value, le = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", de = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ae = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", X = U.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: I, links: G } = ne(), { nodes: ee, maxNodeWidth: F, contentMargins: Q, originTotal: se } = ue(
          I,
          G,
          U
        ), me = J(a.height, i.value?.clientHeight ?? 0), Ce = re(
          G,
          ee,
          {
            labelFontSize: U.labelFontSize,
            labelLineHeight: U.labelLineHeight || Math.round(U.labelFontSize * 1.25),
            labelCharsPerLine: U.labelCharsPerLine,
            nodeGap: U.nodeGap
          },
          me,
          se
        ), we = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: L(I, Ce, se),
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
              data: ee,
              links: Ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: de,
                  opacity: 1
                }
              },
              lineStyle: {
                color: le,
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
                color: X,
                fontWeight: 700,
                fontSize: U.labelFontSize,
                lineHeight: U.labelLineHeight || Math.round(U.labelFontSize * 1.25),
                padding: ra,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...U.orient === "horizontal" ? { width: Math.max(F - ra * 2, 48), overflow: "none" } : U.labelWrap && U.labelTextWidth > 0 ? { width: U.labelTextWidth, overflow: "none" } : {},
                ...U.labelDistance > 0 ? { distance: U.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => Re.data?.displayLabel || Re.name || ""
              },
              edgeLabel: U.edgeLabelShow ? {
                show: !0,
                fontSize: U.edgeLabelFontSize,
                color: ae,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (Re) => {
                  const Pe = Number(Re.data?.originalValue ?? Re.value ?? 0), qe = Re.data?.source || Re.source || "";
                  return W(qe, Pe, I, Ce);
                }
              } : { show: !1 },
              nodeAlign: g.node.align,
              nodeGap: U.nodeGap,
              nodeWidth: F,
              layoutIterations: g.node.iterations,
              orient: U.orient,
              draggable: !1,
              ...Q
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: g.animation.duration,
          animationEasing: g.animation.easing
        };
        c.setOption(we), c.resize();
      } catch (I) {
        console.error("Error setting Sankey chart options:", I), r.value = !0;
      }
    }, Y = async () => {
      if (i.value)
        try {
          c = No.init(i.value), K(), window.addEventListener("resize", ce);
        } catch (U) {
          console.error("Error initializing Sankey chart:", U), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, N = () => {
      const U = i.value;
      return !!(U && U.clientWidth > 0 && U.clientHeight > 0);
    }, ie = async () => {
      if (await Ke(), N()) return Y();
      await new Promise((U) => {
        const le = i.value;
        if (!le) {
          U();
          return;
        }
        u = new ResizeObserver(() => {
          N() && (u?.disconnect(), u = null, Y().then(U));
        }), u.observe(le);
      });
    }, ce = () => c?.resize(), ye = () => {
      window.removeEventListener("resize", ce), u?.disconnect(), u = null, c && (c.dispose(), c = null);
    };
    return Je(() => ie()), _i(ye), Te(() => a.data, K, { deep: !0 }), Te(n, K), Te(s, K), t({ isDark: n }), (U, le) => (h(), x("div", $m, [
      r.value ? (h(), x("div", {
        key: 0,
        class: "error-state",
        style: _e({ height: e.height })
      }, [...le[0] || (le[0] = [
        eo('<div class="error-content" data-v-c2130602><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2130602><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c2130602></path></svg><p class="error-title" data-v-c2130602>Chart could not be loaded</p><p class="error-description" data-v-c2130602>Please check the data format.</p></div>', 1)
      ])], 4)) : (h(), x("div", {
        key: 1,
        class: "chart-wrapper",
        style: _e({ height: e.height })
      }, [
        d("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (h(), x("div", Sm, [...le[1] || (le[1] = [
          eo('<div class="loading-container" data-v-c2130602><div class="sankey-loader" data-v-c2130602><div class="flow flow-1" data-v-c2130602></div><div class="flow flow-2" data-v-c2130602></div><div class="flow flow-3" data-v-c2130602></div><div class="flow flow-4" data-v-c2130602></div></div><p class="loading-text" data-v-c2130602>Loading Sankey diagram...</p></div>', 1)
        ])])) : O("", !0)
      ], 4))
    ]));
  }
}), Kt = /* @__PURE__ */ be(Mm, [["__scopeId", "data-v-c2130602"]]), Dm = ["open"], Am = { class: "card-header metric-collapsible__summary" }, Tm = { class: "header-content metric-header-content" }, Bm = { class: "metric-header-content__main" }, Lm = { class: "metric-header-content__text" }, Rm = { class: "metric-header-content__loaded" }, Pm = {
  key: 0,
  class: "card-title"
}, Im = {
  key: 0,
  class: "card-subtitle"
}, Em = {
  key: 0,
  class: "metric-header-content__export"
}, Fm = {
  key: 0,
  class: "cmc-header-aside"
}, Om = {
  key: 0,
  class: "chart-metric-container__body"
}, Vm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Nm = { key: "body-content" }, zm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, jm = { class: "card-header" }, Hm = { class: "header-content metric-header-content" }, Wm = { class: "metric-header-content__main" }, Km = { class: "metric-header-content__text" }, Um = { class: "metric-header-content__loaded" }, Ym = {
  key: 0,
  class: "card-title"
}, qm = {
  key: 0,
  class: "card-subtitle"
}, Xm = {
  key: 0,
  class: "metric-header-content__export"
}, Gm = {
  key: 0,
  class: "cmc-header-aside"
}, Zm = {
  key: 0,
  class: "chart-metric-container__body"
}, Qm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Jm = { key: "body-content" }, ep = /* @__PURE__ */ fe({
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
    const s = oe(null), i = oe(o(a.defaultOpen)), l = oe(o(a.defaultOpen)), r = ho();
    function c(f) {
      return f.some((b) => {
        if (b.type === ql) return !1;
        if (b.type === Text) {
          const v = b.children;
          return typeof v == "string" && v.trim().length > 0;
        }
        return !!b.type;
      });
    }
    const u = C(() => a.collapsible ? a.lazyMount ? l.value : i.value : !0), g = C(() => a.loading && u.value), m = C(() => {
      if (a.collapsible && !i.value) return !1;
      const f = r.headerExport;
      return f ? c(f()) : !1;
    });
    Te(
      () => a.defaultOpen,
      (f) => {
        if (!a.collapsible) return;
        const b = o(f);
        i.value = b, b && (l.value = !0), s.value && s.value.open !== b && (s.value.open = b);
      }
    ), Je(() => {
      !a.collapsible || !s.value || (s.value.open = i.value);
    });
    function p(f) {
      const b = f.currentTarget;
      if (b?.tagName !== "DETAILS") return;
      const v = i.value, y = b.open;
      if (i.value = y, y && !v) {
        const k = !l.value;
        l.value = !0, k && n("open");
      }
      n("toggle", y);
    }
    return (f, b) => e.collapsible ? (h(), x("details", {
      key: 0,
      ref_key: "detailsRef",
      ref: s,
      class: "chart-metric-container metric-collapsible",
      open: i.value ? !0 : void 0,
      onToggle: p
    }, [
      d("summary", Am, [
        d("div", Tm, [
          d("div", Bm, [
            d("div", Lm, [
              d("div", Rm, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (h(), x("h3", Pm, A(e.title), 1)) : O("", !0)
                ], !0),
                e.subtitle ? (h(), x("p", Im, A(e.subtitle), 1)) : O("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (h(), x("div", Em, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          f.$slots.headerAside ? (h(), x("div", Fm, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
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
      u.value ? (h(), x("div", Om, [
        z(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            g.value ? (h(), x("div", Vm, [
              ke(f.$slots, "loading", {}, () => [
                b[1] || (b[1] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (h(), x("div", Nm, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : O("", !0)
    ], 40, Dm)) : (h(), x("div", zm, [
      d("div", jm, [
        d("div", Hm, [
          d("div", Wm, [
            d("div", Km, [
              d("div", Um, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (h(), x("h3", Ym, A(e.title), 1)) : O("", !0)
                ], !0),
                e.subtitle ? (h(), x("p", qm, A(e.subtitle), 1)) : O("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            m.value ? (h(), x("div", Xm, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          f.$slots.headerAside ? (h(), x("div", Gm, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      u.value ? (h(), x("div", Zm, [
        z(ct, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            g.value ? (h(), x("div", Qm, [
              ke(f.$slots, "loading", {}, () => [
                b[2] || (b[2] = d("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (h(), x("div", Jm, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : O("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ be(ep, [["__scopeId", "data-v-ade4038f"]]);
function tp(e, t) {
  return h(), x("svg", {
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
  return h(), x("svg", {
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
  return h(), x("svg", {
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
function dt(e, t) {
  return h(), x("svg", {
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
function ap(e, t) {
  return h(), x("svg", {
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
function na(e, t) {
  return h(), x("svg", {
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
  return h(), x("svg", {
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
  return h(), x("svg", {
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
  return h(), x("svg", {
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
function np(e, t) {
  return h(), x("svg", {
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
  return h(), x("svg", {
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
function op(e, t) {
  return h(), x("svg", {
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
  return h(), x("svg", {
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
function sp(e, t) {
  return h(), x("svg", {
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
  return h(), x("svg", {
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
function ip(e, t) {
  return h(), x("svg", {
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
function lp(e, t) {
  return h(), x("svg", {
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
function rp(e, t) {
  return h(), x("svg", {
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
  return h(), x("svg", {
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
const cp = {
  key: 0,
  class: "footer-divider"
}, dp = {
  key: 0,
  class: "export-label"
}, up = { class: "export-buttons" }, hp = ["disabled"], fp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, gp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, mp = ["disabled"], pp = {
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
}, vp = /* @__PURE__ */ fe({
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
    return (r, c) => (h(), te(rt(o.value), {
      class: Z(s.value)
    }, {
      default: E(() => [
        e.variant === "footer" ? (h(), x("div", cp)) : O("", !0),
        d("div", {
          class: Z(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (h(), x("span", dp, "Export")) : O("", !0),
          d("div", up, [
            i("pdf") ? (h(), x("button", {
              key: 0,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (u) => l("pdf"))
            }, [
              e.loading ? (h(), x("svg", fp, [...c[2] || (c[2] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (h(), x("svg", gp, [...c[3] || (c[3] = [
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
            ], 10, hp)) : O("", !0),
            i("csv") ? (h(), x("button", {
              key: 1,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (u) => l("csv"))
            }, [
              e.loading ? (h(), x("svg", pp, [...c[5] || (c[5] = [
                d("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                d("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (h(), x("svg", bp, [...c[6] || (c[6] = [
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
            ], 10, mp)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), ze = /* @__PURE__ */ be(vp, [["__scopeId", "data-v-ebfab47f"]]), yp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, kp = { class: "w-full shrink-0 sm:pr-2" }, _p = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, wp = { class: "max-w-[360px] text-center" }, Cp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, $p = /* @__PURE__ */ fe({
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
      const p = new Date(m), f = String(p.getDate()).padStart(2, "0"), b = String(p.getMonth() + 1).padStart(2, "0");
      return `${f}-${b}`;
    }, g = C(() => {
      const m = o.data?.agents_by_day || {}, p = Object.keys(m).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const f = p.map((_) => u(_)), b = /* @__PURE__ */ new Set();
      for (const _ of Object.values(m))
        for (const w of Object.keys(_))
          b.add(w);
      const v = Array.from(b), y = (_) => _, k = v.map((_) => ({
        label: _,
        data: p.map((w) => m[w]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: y(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: k
      };
    });
    return t({ isDark: c }), (m, p) => (h(), te(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", yp, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              g.value.labels && g.value.labels.length ? (h(), x("section", xp, [
                d("div", kp, [
                  z($t, {
                    data: g.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (h(), x("section", _p, [
                d("div", wp, [
                  d("div", Cp, [
                    z(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Sp = /* @__PURE__ */ be($p, [["__scopeId", "data-v-f8d0ec91"]]), Mp = { class: "flex w-full min-w-0 justify-center" }, Dp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Ap = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, Tp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Bp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Lp = /* @__PURE__ */ fe({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (h(), x("div", {
      class: Z(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      d("div", Mp, [
        d("div", Dp, [
          e.color ? (h(), x("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: _e({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          d("span", Ap, A(e.title), 1)
        ])
      ]),
      d("p", Tp, A(e.value), 1),
      e.subvalue ? (h(), x("p", Bp, A(e.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ be(Lp, [["__scopeId", "data-v-0d546967"]]), kl = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
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
const Rp = {
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
    return (l, r) => a.value ? (h(), x("span", {
      key: 0,
      role: "status",
      class: Z(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (h(), x("span", Rp, [...r[0] || (r[0] = [
        d("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        d("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      d("span", {
        class: Z(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (h(), x("span", {
      key: 1,
      class: Z([T(kl), i.value])
    }, [
      ke(l.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), ge = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Ie = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), qt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Pp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Ip = { class: "overflow-x-auto" }, Ep = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Fp = ["aria-sort", "onClick"], Op = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Vp = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Np = {
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
    function i(w) {
      return w == null || w === "" ? s : String(w);
    }
    function l(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function r(w) {
      return `cell-${w}`;
    }
    function c(w, $) {
      return w[$];
    }
    function u(w, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(w);
      const M = w[a.rowKey];
      return typeof M == "string" || typeof M == "number" ? M : $;
    }
    function g(w, $) {
      return u(w, $);
    }
    function m(w) {
      return a.sortKey === w && a.sortDirection != null;
    }
    function p(w) {
      n("sort", w);
    }
    function f(w) {
      return m(w) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const b = C(() => a.rows?.length ?? 0), v = C(() => b.value > a.maxVisibleRows), y = C(() => Math.max(0, b.value - a.maxVisibleRows)), k = C(() => a.rows?.length ? o.value || !v.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(y.value))
    );
    return (w, $) => (h(), x("div", Pp, [
      d("div", Ip, [
        d("table", Ep, [
          d("thead", null, [
            d("tr", null, [
              (h(!0), x(he, null, pe(e.columns, (M) => (h(), x("th", {
                key: M.key,
                scope: "col",
                class: Z(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(M.align), M.headerClass]])
              }, [
                M.sortable ? (h(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", l(M.align)]),
                  "aria-sort": f(M.key),
                  onClick: (D) => p(M.key)
                }, [
                  d("span", null, A(M.label), 1),
                  d("span", Op, [
                    m(M.key) ? (h(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (h(), x("span", Vp, "↑")) : e.sortDirection === "desc" ? (h(), x("span", Np, "↓")) : O("", !0)
                    ], 64)) : (h(), x(he, { key: 1 }, [
                      $[1] || ($[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, Fp)) : (h(), x(he, { key: 1 }, [
                  Ae(A(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (h(!0), x(he, null, pe(k.value, (M, D) => (h(), x("tr", {
              key: g(M, D)
            }, [
              (h(!0), x(he, null, pe(e.columns, (P) => (h(), x("td", {
                key: `${D}-${P.key}`,
                class: Z(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(P.align), P.cellClass]])
              }, [
                ke(w.$slots, r(P.key), {
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
      v.value ? (h(), x("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (M) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (h(), x("svg", {
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
}), ut = /* @__PURE__ */ be(zp, [["__scopeId", "data-v-22a97a18"]]), jp = {
  key: "error",
  class: "error-state"
}, Hp = { class: "error-content" }, Wp = { class: "error-description" }, Kp = {
  key: "content",
  class: "card-body"
}, Up = { class: "chart-section" }, Yp = { class: "chart-wrapper" }, qp = { class: "payment-success-summary" }, Xp = {
  key: 0,
  class: "booking-daily-section"
}, Gp = { class: "w-full min-w-0" }, Zp = { class: "font-medium" }, Qp = { class: "percentage-text" }, Jp = { class: "badges-container" }, e0 = {
  key: 0,
  class: "badges-container"
}, t0 = {
  key: 1,
  class: "percentage-text"
}, a0 = { class: "badges-container" }, n0 = {
  key: 1,
  class: "empty-state"
}, o0 = /* @__PURE__ */ fe({
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
      (y, k) => new Date(y.date).getTime() - new Date(k.date).getTime()
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
      return y.length === 0 ? f(0) : y.map(
        (k) => `${k.currency} ${f(k.total_value)}`
      ).join(" · ");
    }), g = (y) => y.payment_success_value || [], m = (y) => typeof y.payment_success_count == "number" ? y.payment_success_count : (y.payment_success_value || []).reduce(
      (k, _) => k + (_.count || 0),
      0
    ), p = (y) => Ie(y), f = (y) => y == null ? "0" : qt(y);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (y, k) => y + (k.total_value || 0),
      0
    ));
    const b = C(() => {
      const y = n.data, k = y.total_booking_initiated || 0, _ = y.total_booking_started || 0, w = y.total_payment_initiated || 0, $ = y.total_not_found || 0, M = y.total_cancelled || 0, D = y.total_no_pending_balance || 0, P = y.total_errors || 0, V = typeof y.total_payment_success == "number" ? y.total_payment_success : (y.total_payment_success_value || []).reduce(
        (J, re) => J + (re.count || 0),
        0
      ), j = y.total_payment_failed || 0, S = Math.max(0, k - _), R = Math.max(
        0,
        _ - w - $ - M - D - P
      ), B = (J, re) => xe(J, re), H = [
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
      ], W = [];
      return _ > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: B(_, k)
      }), S > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: S,
        label: B(S, k)
      }), w > 0 && W.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: B(w, k)
      }), $ > 0 && W.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: B($, k)
      }), M > 0 && W.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: B(M, k)
      }), D > 0 && W.push({
        source: "Started",
        target: "No Pending Balance",
        value: D,
        label: B(D, k)
      }), P > 0 && W.push({
        source: "Started",
        target: "Errors",
        value: P,
        label: B(P, k)
      }), R > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: R,
        label: B(R, k)
      }), V > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: B(V, k)
      }), j > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: j,
        label: B(j, k)
      }), { nodes: H, links: W };
    }), v = (y, k) => Dt(y, k);
    return (y, k) => (h(), te(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: k[0] || (k[0] = (_) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading && !n.error ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        z(ct, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            n.error ? (h(), x("div", jp, [
              d("div", Hp, [
                k[1] || (k[1] = d("div", { class: "error-icon-wrapper" }, [
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
                k[2] || (k[2] = d("p", { class: "error-title" }, "Error loading data", -1)),
                d("p", Wp, A(n.error), 1)
              ])
            ])) : (h(), x("div", Kp, [
              d("section", Up, [
                d("div", Yp, [
                  z(Kt, {
                    data: b.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              d("section", qp, [
                z(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: u.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (h(), x("section", Xp, [
                k[3] || (k[3] = d("div", { class: "section-header" }, [
                  d("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                d("div", Gp, [
                  z(ut, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": E(({ row: _ }) => [
                      d("span", Zp, A(T(Ne)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": E(({ row: _ }) => [
                      d("span", null, A(T(ge)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": E(({ row: _ }) => [
                      d("span", null, [
                        Ae(A(T(ge)(Number(_.booking_started_count))) + " ", 1),
                        d("span", Qp, " (" + A(v(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": E(({ row: _ }) => [
                      d("span", null, A(T(ge)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": E(({ row: _ }) => [
                      d("div", Jp, [
                        z(Ge, { color: "success" }, {
                          default: E(() => [
                            Ae(" Success: " + A(T(ge)(
                              m(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Failed: " + A(T(ge)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": E(({ row: _ }) => [
                      g(_).length > 0 ? (h(), x("div", e0, [
                        (h(!0), x(he, null, pe(g(
                          _
                        ), (w) => (h(), x("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, A(w.currency) + " " + A(p(w.total_value)), 1))), 128))
                      ])) : (h(), x("span", t0, "N/A"))
                    ]),
                    "cell-outcomes": E(({ row: _ }) => [
                      d("div", a0, [
                        z(Ge, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Not Found: " + A(_.not_found_count ? T(ge)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "warning" }, {
                          default: E(() => [
                            Ae(" Cancelled: " + A(_.cancelled_count ? T(ge)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "orange" }, {
                          default: E(() => [
                            Ae(" No Balance: " + A(_.no_pending_balance_count ? T(ge)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ge, { color: "danger" }, {
                          default: E(() => [
                            Ae(" Errors: " + A(_.error_count ? T(ge)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (h(), x("section", n0, [...k[4] || (k[4] = [
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
}), s0 = /* @__PURE__ */ be(o0, [["__scopeId", "data-v-d68eddff"]]), i0 = { class: "card-body" }, l0 = {
  key: 0,
  class: "chart-section"
}, r0 = { class: "chart-wrapper" }, c0 = {
  key: 1,
  class: "checkin-daily-section"
}, d0 = { class: "w-full min-w-0" }, u0 = { class: "font-medium" }, h0 = { class: "cell-success" }, f0 = { class: "cell-danger" }, g0 = {
  key: 0,
  class: "reasons-list"
}, m0 = { class: "reason-name" }, p0 = { class: "reason-count" }, b0 = {
  key: 1,
  class: "no-reasons"
}, v0 = {
  key: 2,
  class: "empty-state"
}, y0 = {
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
    const a = t, n = (w) => {
      a("export", w);
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
      () => (l.value || []).map((w) => ({
        id: w.date,
        date: w.date,
        checkin_initiated_count: w.checkin_initiated_count,
        checkin_init_count: w.checkin_init_count,
        checkin_started_count: w.checkin_started_count,
        checkin_completed_count: w.checkin_completed_count,
        checkin_closed_count: w.checkin_closed_count,
        failed_steps: w.failed_steps,
        record_locator_create_payment_count: w.record_locator_create_payment_count
      }))
    ), m = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...s, ...w } : o.checkinData ?? s;
    }), p = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), f = (w, $) => !$ || $ === 0 ? "0.0%" : Dt(w, $), b = (w, $) => {
      const M = ge(w), D = f(w, $);
      return `${M} (${D})`;
    }, v = (w) => w.reduce(($, M) => $ + M.failed_count, 0), y = C(() => {
      const w = [], $ = [], M = /* @__PURE__ */ new Set(), D = (ae, X = {}) => {
        M.has(ae) || (w.push({ name: ae, ...X }), M.add(ae));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      D("Checkin Init", { value: m.value.total_checkin_initiated }), D("Booking retrive"), D("Booking retrive success"), D("Number of Passengers"), D("Completed"), D("Closed with BP");
      const P = m.value.total_checkin_initiated, V = m.value.total_checkin_init, j = m.value.total_checkin_init_abandoned || 0, S = m.value.total_checkin_pre_init_abandoned_error, R = m.value.total_checkin_pre_init_abandoned_voluntary, B = S != null || R != null, H = B ? Math.max(Number(S) || 0, 0) : 0, W = B ? Math.max(Number(R) || 0, 0) : 0, J = m.value.total_checkin_init_abandoned_error, re = m.value.total_checkin_init_abandoned_voluntary, ue = J != null || re != null, q = ue ? Math.max(Number(J) || 0, 0) : 0, ne = ue ? Math.max(Number(re) || 0, 0) : 0, L = ue ? Math.max(j - q - ne, 0) : j, K = V - j, Y = m.value.total_checkin_started, N = m.value.total_checkin_completed, ie = m.value.total_checkin_closed, ce = p.value.unrecovered_by_step || [], ye = ce.reduce(
        (ae, X) => ae + X.count,
        0
      );
      V > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: V,
        label: xe(V, P)
      });
      const U = P - V;
      B ? (W > 0 && (D("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: W,
        label: xe(W, P)
      })), H > 0 && (D("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: xe(H, P)
      }))) : U > 0 && (D("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: U,
        label: xe(U, P)
      })), ue ? (q > 0 && (D("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: q,
        label: xe(q, P)
      })), ne > 0 && (D("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: ne,
        label: xe(ne, P)
      })), L > 0 && (D("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: xe(L, P)
      }))) : j > 0 && (D("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: j,
        label: xe(j, P)
      })), K > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: K,
        label: xe(K, P)
      }), Y > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: xe(Y, P)
      }), N > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: N,
        label: xe(N, P)
      }), ce.length > 0 && ye > 0 && (D("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: ye,
        label: xe(ye, P)
      }), ce.forEach((ae, X) => {
        const G = ae.step_name.replace(/_/g, " ").split(" ").map((ee) => ee.charAt(0).toUpperCase() + ee.slice(1)).join(" ");
        D(G, { status: "error", order: X + 1 }), $.push({
          source: "Unrecovered",
          target: G,
          value: ae.count,
          label: xe(ae.count, P)
        });
      }));
      const le = Y - (N + ye);
      le > 0 && (D("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: le,
        label: xe(le, P)
      }));
      const de = N - ie;
      return de > 0 && (D("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: de,
        label: xe(de, P)
      })), ie > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: ie,
        label: xe(ie, P)
      }), { nodes: w, links: $ };
    }), k = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const w = m.value.checkin_by_day || [], $ = p.value.failed_by_step_by_day || [], M = k();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((D) => {
        const P = $.find(
          (j) => j.date === D.date
        ), V = M.find(
          (j) => j.date === D.date
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
    ), (w, $) => (h(), te(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", i0, [
          y.value.nodes.length > 0 ? (h(), x("section", l0, [
            d("div", r0, [
              z(Kt, {
                data: y.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (h(), x("section", c0, [
            d("div", d0, [
              z(ut, {
                columns: u.value,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: M }) => [
                  d("span", u0, A(T(Ne)(String(M.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: M }) => [
                  d("span", null, A(T(ge)(M.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: M }) => [
                  d("span", null, A(b(
                    M.checkin_init_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": E(({ row: M }) => [
                  d("span", null, A(T(ge)(M.checkin_started_count)), 1)
                ]),
                "cell-completed": E(({ row: M }) => [
                  d("span", null, A(b(
                    M.checkin_completed_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: M }) => [
                  d("span", h0, A(b(
                    M.checkin_closed_count,
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: M }) => [
                  d("span", f0, A(b(
                    v(M.failed_steps),
                    M.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": E(({ row: M }) => [
                  M.failed_steps && M.failed_steps.length > 0 ? (h(), x("div", g0, [
                    (h(!0), x(he, null, pe(M.failed_steps, (D) => (h(), x("div", {
                      key: D.step_name,
                      class: "reason-item"
                    }, [
                      d("span", m0, A(D.step_name.replace(/_/g, " ")) + ":", 1),
                      d("span", p0, A(D.failed_count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", b0, "-"))
                ]),
                "cell-createPayment": E(({ row: M }) => [
                  d("span", null, A(T(ge)(M.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (h(), x("section", v0, [...$[0] || ($[0] = [
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
}, x0 = /* @__PURE__ */ be(y0, [["__scopeId", "data-v-ae5fc0f7"]]), k0 = { class: "card-body" }, _0 = {
  key: 0,
  class: "sankey-section"
}, w0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, C0 = { class: "w-full min-w-0" }, $0 = { class: "font-medium whitespace-nowrap" }, S0 = { class: "cell-success" }, M0 = { class: "cell-danger" }, D0 = {
  key: 0,
  class: "reasons-list"
}, A0 = { class: "reason-name" }, T0 = { class: "reason-count" }, B0 = {
  key: 1,
  class: "no-reasons"
}, L0 = {
  key: 2,
  class: "empty-state"
}, R0 = { class: "empty-state-content" }, P0 = { class: "empty-icon-wrapper" }, I0 = /* @__PURE__ */ fe({
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
      const [M, D, P] = $.split("-").map(Number);
      return Ne([M, D - 1, P]).format("MMM DD");
    }, c = ($) => $.replace(/_/g, " ").replace(/\b\w/g, (M) => M.toUpperCase()), u = ($, M) => Dt($, M), g = ($, M) => {
      const D = $ || 0, P = M || 0, V = l(D), j = u(D, P);
      return `${V} (${j})`;
    }, m = C(() => {
      const $ = n.checkinData?.record_locator_by_day || [], M = n.failedData?.failed_by_step_by_day || [], D = n.failedData?.unrecovered_by_day || [];
      return $.map((V) => {
        const j = M.find((R) => R.date === V.date), S = D.find(
          (R) => R.date === V.date
        );
        return {
          ...V,
          failed_steps: j?.steps || [],
          unrecovered_count: S?.unrecovered_count || 0
        };
      }).sort(
        (V, j) => new Date(V.date).getTime() - new Date(j.date).getTime()
      );
    }), p = /* @__PURE__ */ new Set([
      "choose_boardingpass",
      "boarding_pass",
      "generate_boarding_pass"
    ]), f = ($) => {
      if (!$) return !1;
      const M = $.toLowerCase().trim();
      return p.has(M) || M.includes("boarding_pass");
    }, b = ($) => {
      const M = $?.failed_by_step_by_day || [];
      let D = 0;
      for (const P of M)
        for (const V of P.steps || [])
          f(V.step_name) && (D += V.failed_count || 0);
      if (D > 0) return D;
      for (const P of $?.unrecovered_by_step || [])
        f(P.step_name) && (D += P.count || 0);
      return D;
    }, v = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved (%)", align: "center" },
      { key: "closed", label: "Check-in Closed (%)", align: "center" },
      { key: "completed", label: "BP Issued (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], y = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, k = C(() => n.isAvianca ? [...v, y] : v), _ = C(
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
    ), w = C(() => {
      const $ = [], M = [], D = /* @__PURE__ */ new Set(), P = (ee, F = {}) => {
        D.has(ee) || ($.push({ name: ee, ...F }), D.add(ee));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: $, links: M };
      const V = n.checkinData.total_checkin_initiated || 0;
      P("Checkin Init", { value: V }), P("Booking Retrieved"), P("Check-in Closed"), P("BP Issued");
      const j = n.checkinData.total_record_locator_init || 0, S = n.checkinData.total_record_locator_init_abandoned || 0, R = n.checkinData.total_checkin_pre_init_abandoned_error, B = n.checkinData.total_checkin_pre_init_abandoned_voluntary, H = R != null || B != null, W = H ? Math.max(Number(R) || 0, 0) : 0, J = H ? Math.max(Number(B) || 0, 0) : 0, re = n.checkinData.total_record_locator_init_abandoned_error, ue = n.checkinData.total_record_locator_init_abandoned_voluntary, q = re != null || ue != null, ne = q ? Math.max(Number(re) || 0, 0) : 0, L = q ? Math.max(Number(ue) || 0, 0) : 0, K = q ? Math.max(S - ne - L, 0) : S, Y = Math.max(j - S, 0), N = n.checkinData.total_record_locator_started || 0, ie = n.checkinData.total_record_locator_completed || 0, ce = n.checkinData.total_record_locator_closed || 0, ye = n.checkinData.total_record_locator_unrecovered || 0, U = Math.max(V - j, 0), le = W + ne, de = H ? J + (q ? L + K : S) : U + (q ? L + K : S);
      Y > 0 && M.push({
        source: "Checkin Init",
        target: "Booking Retrieved",
        value: Y,
        label: xe(Y, V)
      }), de > 0 && (P("Abandoned before retrieved", { status: "abandon" }), M.push({
        source: "Checkin Init",
        target: "Abandoned before retrieved",
        value: de,
        label: xe(de, V)
      })), le > 0 && (P("Errors before retrieved", { status: "error" }), M.push({
        source: "Checkin Init",
        target: "Errors before retrieved",
        value: le,
        label: xe(le, V)
      })), ce > 0 && M.push({
        source: "Booking Retrieved",
        target: "Check-in Closed",
        value: ce,
        label: xe(ce, V)
      });
      const ae = b(n.failedData), X = Math.min(ae, Math.max(ce - ie, 0));
      ie > 0 && M.push({
        source: "Check-in Closed",
        target: "BP Issued",
        value: ie,
        label: xe(ie, V)
      }), X > 0 && (P("BP Error", { status: "error" }), M.push({
        source: "Check-in Closed",
        target: "BP Error",
        value: X,
        label: xe(X, V)
      }));
      const I = Math.max(ce - ie - X, 0);
      I > 0 && (P("Abandoned after closed", { status: "abandon" }), M.push({
        source: "Check-in Closed",
        target: "Abandoned after closed",
        value: I,
        label: xe(I, V)
      })), ye > 0 && (P("Errors before closed", { status: "error" }), M.push({
        source: "Booking Retrieved",
        target: "Errors before closed",
        value: ye,
        label: xe(ye, V)
      }));
      const G = Math.max(N - ce - ye, 0);
      return G > 0 && (P("Abandoned before closed", { status: "abandon" }), M.push({
        source: "Booking Retrieved",
        target: "Abandoned before closed",
        value: G,
        label: xe(G, V)
      })), { nodes: $, links: M };
    });
    return t({ isDark: i }), ($, M) => (h(), te(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": n.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", k0, [
          w.value.nodes.length > 0 ? (h(), x("div", _0, [
            z(Kt, {
              data: w.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : O("", !0),
          m.value && m.value.length > 0 ? (h(), x("div", w0, [
            d("div", C0, [
              z(ut, {
                columns: k.value,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: D }) => [
                  d("span", $0, A(r(String(D.date))), 1)
                ]),
                "cell-checkinInit": E(({ row: D }) => [
                  d("span", null, A(l(D.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": E(({ row: D }) => [
                  d("span", null, A(g(
                    D.record_locator_started_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": E(({ row: D }) => [
                  d("span", null, A(g(
                    D.record_locator_closed_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": E(({ row: D }) => [
                  d("span", S0, A(g(
                    D.record_locator_completed_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": E(({ row: D }) => [
                  d("span", M0, A(g(
                    D.unrecovered_count,
                    D.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: D }) => [
                  d("span", null, A(l(
                    D.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": E(({ row: D }) => [
                  Array.isArray(D.failed_steps) && D.failed_steps.length > 0 ? (h(), x("div", D0, [
                    (h(!0), x(he, null, pe(D.failed_steps, (P) => (h(), x("div", {
                      key: P.step_name,
                      class: "reason-item"
                    }, [
                      d("span", A0, A(c(P.step_name)) + ":", 1),
                      d("span", T0, A(P.failed_count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", B0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (h(), x("div", L0, [
            d("div", R0, [
              d("div", P0, [
                z(T(dt), { class: "empty-icon" })
              ]),
              M[0] || (M[0] = d("p", { class: "empty-title" }, "No check-in data available", -1)),
              M[1] || (M[1] = d("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), wl = /* @__PURE__ */ be(I0, [["__scopeId", "data-v-d16cd158"]]), E0 = { class: "card-body" }, F0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, O0 = { class: "w-full min-w-0" }, V0 = { class: "segment-plain" }, N0 = { class: "segment-plain" }, z0 = { class: "segment-plain" }, j0 = { class: "percentage-value" }, H0 = { class: "percentage-value" }, W0 = { class: "percentage-value success" }, K0 = {
  key: 1,
  class: "empty-state"
}, U0 = /* @__PURE__ */ fe({
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
      const p = u(m?.departure_airport), f = u(m?.arrival_airport);
      return p === "-" || f === "-" ? !1 : p === f;
    };
    return t({ isDark: i }), (m, p) => (h(), te(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", E0, [
          n.data.length > 0 ? (h(), x("section", F0, [
            d("div", O0, [
              z(ut, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": E(({ row: f }) => [
                  d("span", V0, A(u(f.departure_airport)), 1)
                ]),
                "cell-connection": E(({ row: f }) => [
                  d("span", {
                    class: Z(["segment-plain", {
                      "segment-plain--muted": u(f.conexion_airport) === "-"
                    }])
                  }, A(u(f.conexion_airport)), 3)
                ]),
                "cell-arrival": E(({ row: f }) => [
                  d("span", N0, A(u(f.arrival_airport)), 1)
                ]),
                "cell-trip": E(({ row: f }) => [
                  d("span", z0, A(g(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": E(({ row: f }) => [
                  Ae(A(T(ge)(f.segment_init_count)), 1)
                ]),
                "cell-started": E(({ row: f }) => [
                  d("span", j0, A(c(
                    f.segment_started_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: f }) => [
                  d("span", H0, A(c(
                    f.segment_closed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: f }) => [
                  d("span", W0, A(c(
                    f.segment_completed_count,
                    f.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (h(), x("section", K0, [...p[0] || (p[0] = [
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
}), Cl = /* @__PURE__ */ be(U0, [["__scopeId", "data-v-9a9d7a34"]]), Y0 = { class: "checkin-container__body" }, q0 = /* @__PURE__ */ fe({
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
    return (c, u) => (h(), te(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[1] || (u[1] = (g) => n("open"))
    }, {
      default: E(() => [
        d("div", Y0, [
          e.showCheckin ? (h(), te(wl, {
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
          z(Cl, {
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
}), X0 = /* @__PURE__ */ be(q0, [["__scopeId", "data-v-bedc6aa8"]]), G0 = { class: "card-body" }, Z0 = { class: "chart-section" }, Q0 = { class: "chart-wrapper" }, J0 = {
  key: 1,
  class: "empty-chart"
}, eb = { class: "payment-success-summary" }, tb = {
  key: 0,
  class: "disruption-daily-section"
}, ab = { class: "w-full min-w-0" }, nb = { class: "font-medium text-center" }, ob = { class: "text-center" }, sb = { class: "text-center" }, ib = { class: "percentage-text" }, lb = { class: "text-center" }, rb = { class: "abandoned-value" }, cb = { class: "badges-container badges-wrap" }, db = { class: "badges-container badges-wrap" }, ub = {
  key: 1,
  class: "empty-state"
}, hb = /* @__PURE__ */ fe({
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
    }), g = (v, y) => Dt(v, y), m = (v) => Ie(v), p = (v) => (v ?? []).reduce((y, k) => y + (k.count ?? 0), 0), f = (v) => typeof v.sell_success_count == "number" ? v.sell_success_count : p(v.payment_success_total), b = C(() => {
      const v = n.data, y = v.total_disruption_conversations || 0, k = v.total_disruption_initiated || 0, _ = v.total_voluntary || 0, w = v.total_involuntary || 0, $ = v.total_accepted || 0, M = v.total_confirmed || 0, D = typeof v.total_sell_success == "number" ? v.total_sell_success : p(v.total_payment_success), P = v.total_sell_failed || 0, V = Math.max(0, y - k), j = Math.max(
        0,
        k - _ - w
      ), S = Math.max(0, w - $), R = Math.max(0, _ - M), B = P, H = Math.max(0, M - D - B), W = (ue, q) => xe(ue, q), J = [
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
      return k > 0 && re.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: W(k, y)
      }), V > 0 && re.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: W(V, y)
      }), _ > 0 && re.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: W(_, y)
      }), w > 0 && re.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: W(w, y)
      }), j > 0 && re.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: j,
        label: W(j, y)
      }), $ > 0 && re.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: W($, y)
      }), S > 0 && re.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: S,
        label: W(S, y)
      }), M > 0 && re.push({
        source: "Voluntary",
        target: "Confirmed",
        value: M,
        label: W(M, y)
      }), R > 0 && re.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: R,
        label: W(R, y)
      }), D > 0 && re.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: W(D, y)
      }), B > 0 && re.push({
        source: "Confirmed",
        target: "Rejected",
        value: B,
        label: W(B, y)
      }), H > 0 && re.push({
        source: "Confirmed",
        target: "Not Paid",
        value: H,
        label: W(H, y)
      }), { nodes: J, links: re };
    });
    return (v, y) => (h(), te(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: y[0] || (y[0] = (k) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", G0, [
          d("section", Z0, [
            d("div", Q0, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (h(), te(Kt, {
                key: 0,
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (h(), x("div", J0, [...y[1] || (y[1] = [
                d("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          d("section", eb, [
            z(ve, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (h(), x("section", tb, [
            y[2] || (y[2] = d("div", { class: "section-header" }, [
              d("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            d("div", ab, [
              z(ut, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  d("span", nb, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: k }) => [
                  d("span", ob, A(T(ge)(Number(k.disruption_conversations))), 1)
                ]),
                "cell-started": E(({ row: k }) => [
                  d("span", sb, [
                    Ae(A(T(ge)(Number(k.disruption_initiated_count))) + " ", 1),
                    d("span", ib, " (" + A(g(
                      Number(k.disruption_initiated_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": E(({ row: k }) => [
                  d("span", lb, [
                    d("span", rb, A(T(ge)(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count)
                    )) + " (" + A(g(
                      Number(k.disruption_initiated_count) - Number(k.voluntary_count) - Number(k.involuntary_count),
                      Number(k.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": E(({ row: k }) => [
                  d("div", cb, [
                    (h(!0), x(he, null, pe([k], (_, w) => (h(), x(he, { key: w }, [
                      z(Ge, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Ae(" VOL " + A(T(ge)(_.voluntary_count)) + " (" + A(g(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "success" }, {
                        default: E(() => [
                          Ae(" Confirm " + A(T(ge)(_.confirmed_count)) + " (" + A(g(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "warning" }, {
                        default: E(() => [
                          Ae(" Not Confirm " + A(T(ge)(_.voluntary_count - _.confirmed_count)) + " (" + A(g(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "danger" }, {
                        default: E(() => [
                          Ae(" Reject " + A(T(ge)(_.sell_failed_count)) + " (" + A(g(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "orange" }, {
                        default: E(() => [
                          Ae(" Not Paid " + A(T(ge)(
                            Math.max(
                              0,
                              _.confirmed_count - f(_) - _.sell_failed_count
                            )
                          )) + " (" + A(g(
                            Math.max(
                              0,
                              _.confirmed_count - f(_) - _.sell_failed_count
                            ),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Ae(" Finish " + A(T(ge)(f(_))) + " (" + A(g(
                            f(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (h(!0), x(he, null, pe(_.payment_success_total || [], ($) => (h(), te(Ge, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: E(() => [
                          Ae(A($.currency) + " " + A(m($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": E(({ row: k }) => [
                  d("div", db, [
                    (h(!0), x(he, null, pe([k], (_, w) => (h(), x(he, { key: w }, [
                      z(Ge, { color: "purple" }, {
                        default: E(() => [
                          Ae(" INV " + A(T(ge)(_.involuntary_count)) + " (" + A(g(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "danger" }, {
                        default: E(() => [
                          Ae(" Human " + A(T(ge)(_.involuntary_count - _.accepted_count)) + " (" + A(g(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ge, { color: "success" }, {
                        default: E(() => [
                          Ae(" Accept " + A(T(ge)(_.accepted_count)) + " (" + A(g(
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
          ])) : (h(), x("section", ub, [...y[3] || (y[3] = [
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
}), fb = /* @__PURE__ */ be(hb, [["__scopeId", "data-v-033e517a"]]), gb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, mb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, pb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, bb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, vb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, yb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, xb = /* @__PURE__ */ fe({
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
      const p = u.value, f = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, b = (k) => f > 0 ? (k / f * 100).toFixed(1) : "0.0", v = p.total_faq_events, y = v > 0 ? `${(p.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${b(p.total_airline_information_retrieved)}%`,
          subvalue: `${ge(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${b(p.total_booking_info_retrieved)}%`,
          subvalue: `${ge(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${b(p.total_flight_status_retrieved)}%`,
          subvalue: `${ge(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ge(p.total_documents_found),
          subvalue: y
        }
      ];
    }), m = (p) => {
      if (!p) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const f = p.faq_by_day || [];
      if (f.length > 0) {
        const b = f.map(
          (_) => Ne(_.date).format("MMM DD")
        ), v = f.map(
          (_) => _.airline_information_retrieved_count || 0
        ), y = f.map(
          (_) => _.flight_status_retrieved_count || 0
        ), k = f.map(
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
              data: k,
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
    ), t({ isDark: l }), (p, f) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQs",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", gb, [
          d("div", mb, [
            c.value.labels && c.value.labels.length ? (h(), x("section", pb, [
              d("div", bb, [
                z(pt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              d("div", vb, [
                (h(!0), x(he, null, pe(g.value, (b) => (h(), te(ve, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (h(), x("section", yb, [...f[0] || (f[0] = [
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
}), kb = /* @__PURE__ */ be(xb, [["__scopeId", "data-v-74ceae76"]]);
function Bn(e, t) {
  return h(), x("svg", {
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
function _b(e, t) {
  return h(), x("svg", {
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
const ht = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", et = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", wb = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", At = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", Tt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", Cb = "kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4";
function ui(e = "neutral") {
  return `${Cb} kiut-select-option-badge--${e}`;
}
const $b = { class: "flex flex-row gap-3 items-center" }, Sb = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, Mb = ["disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], Db = { class: "flex min-w-0 flex-1 items-center gap-2.5 truncate" }, Ab = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, Tb = { class: "relative" }, Bb = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Lb = ["placeholder", "aria-label"], Rb = {
  key: 1,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Pb = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Ib = ["aria-selected", "onClick", "onMouseenter"], Eb = {
  key: 1,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Fb = { class: "min-w-0 flex-1 truncate" }, Ut = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-select-${We()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = `${o}-err`, c = C(() => a.invalid ?? !1), u = oe(null), g = oe(null), m = oe(null), p = oe(null), f = oe(null), b = oe(!1), v = oe(0), y = oe(""), k = oe({});
    function _() {
      const N = g.value;
      if (!N) return;
      const ie = N.getBoundingClientRect();
      k.value = {
        top: `${ie.bottom - 3}px`,
        left: `${ie.left}px`,
        width: `${ie.width}px`
      };
    }
    const w = C(() => a.options.filter((N) => !N.disabled)), $ = C(() => {
      if (!a.searchable) return w.value;
      const N = y.value.trim().toLowerCase();
      return N ? w.value.filter(
        (ie) => ie.label.toLowerCase().includes(N) || ie.badge?.label.toLowerCase().includes(N)
      ) : w.value;
    }), M = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), D = C(
      () => a.options.find((N) => N.value === a.modelValue) ?? null
    ), P = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : D.value?.label ?? String(a.modelValue)), V = C(() => D.value?.leadingClass);
    function j(N) {
      return `${String(N.value)}-${N.label}`;
    }
    function S(N) {
      return a.modelValue === N.value;
    }
    function R(N, ie) {
      const ce = S(N), ye = v.value === ie, U = !!a.listSectionLabel;
      return [
        "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
        U ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5" : "gap-1.5 px-2 py-2",
        ce ? U ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]" : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ye ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      v.value = Math.max(
        0,
        $.value.findIndex((N) => N.value === a.modelValue)
      );
    }
    function H() {
      if (a.searchable) {
        f.value?.focus();
        return;
      }
      p.value?.focus();
    }
    function W() {
      _(), y.value = "", B(), Ke(() => H());
    }
    function J() {
      b.value = !1, y.value = "";
    }
    function re(N) {
      n("update:modelValue", N.value), J();
    }
    function ue() {
      if (!a.disabled) {
        if (b.value) {
          J();
          return;
        }
        b.value = !0, W();
      }
    }
    function q(N) {
      N.stopPropagation(), !a.disabled && ue();
    }
    function ne(N) {
      if (!b.value) return;
      const ie = N.target, ce = u.value, ye = m.value;
      ce && !ce.contains(ie) && (!ye || !ye.contains(ie)) && J();
    }
    function L(N) {
      a.disabled || (N.key === "ArrowDown" || N.key === "Enter" || N.key === " ") && (N.preventDefault(), b.value || (b.value = !0, W()));
    }
    function K(N) {
      const ie = $.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (N.key === "ArrowDown") {
        if (N.preventDefault(), ie.length === 0) return;
        v.value = 0, p.value?.focus();
        return;
      }
      if (N.key === "ArrowUp") {
        if (N.preventDefault(), ie.length === 0) return;
        v.value = ie.length - 1, p.value?.focus();
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault();
        const ce = ie[v.value];
        ce && re(ce);
      }
    }
    function Y(N) {
      const ie = $.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (ie.length !== 0) {
        if (N.key === "ArrowDown") {
          N.preventDefault(), v.value = Math.min(v.value + 1, ie.length - 1);
          return;
        }
        if (N.key === "ArrowUp") {
          if (N.preventDefault(), v.value === 0 && a.searchable) {
            f.value?.focus();
            return;
          }
          v.value = Math.max(v.value - 1, 0);
          return;
        }
        if (N.key === "Enter") {
          N.preventDefault();
          const ce = ie[v.value];
          ce && re(ce);
        }
      }
    }
    return Te(y, () => {
      v.value = 0;
    }), Je(() => {
      document.addEventListener("click", ne);
    }), lt(() => {
      document.removeEventListener("click", ne);
    }), (N, ie) => (h(), x("div", {
      ref_key: "rootRef",
      ref: u,
      class: "relative font-sans"
    }, [
      d("div", $b, [
        N.$slots.icon ? (h(), x("span", Sb, [
          ke(N.$slots, "icon")
        ])) : O("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          id: s,
          class: Z(T(ht))
        }, A(e.label), 3)) : O("", !0)
      ]),
      d("button", {
        ref_key: "buttonRef",
        ref: g,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          c.value ? T(At) : "",
          b.value && !c.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : "",
          "flex items-center justify-between gap-2 text-left"
        ]),
        "aria-expanded": b.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : M.value,
        "aria-invalid": c.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: q,
        onKeydown: L
      }, [
        d("span", Db, [
          V.value ? (h(), x("span", {
            key: 0,
            class: Z([V.value, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : O("", !0),
          D.value?.leadingIcon ? (h(), x("span", {
            key: 1,
            class: Z([
              "inline-flex shrink-0 items-center justify-center rounded-full",
              D.value.leadingIconWrapperClass
            ])
          }, [
            (h(), te(rt(D.value.leadingIcon), {
              class: Z(["h-4 w-4", D.value.leadingIconClass])
            }, null, 8, ["class"]))
          ], 2)) : O("", !0),
          d("span", {
            class: Z([
              "min-w-0 truncate",
              e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
            ])
          }, A(P.value), 3),
          D.value?.badge ? (h(), x("span", {
            key: 2,
            class: Z(T(ui)(D.value.badge.variant))
          }, A(D.value.badge.label), 3)) : O("", !0)
        ]),
        z(T(na), {
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", b.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Mb),
      e.errorText ? (h(), x("p", {
        key: 0,
        id: r,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 3)) : O("", !0),
      (h(), te(ea, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: m,
          style: _e(k.value),
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (h(), x("div", Ab, [
            d("div", Tb, [
              d("span", Bb, [
                z(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
              ]),
              Xe(d("input", {
                ref_key: "searchInputRef",
                ref: f,
                "onUpdate:modelValue": ie[0] || (ie[0] = (ce) => y.value = ce),
                type: "search",
                class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
                placeholder: e.searchPlaceholder,
                "aria-label": e.searchPlaceholder,
                onClick: ie[1] || (ie[1] = Be(() => {
                }, ["stop"])),
                onKeydown: Be(K, ["stop"])
              }, null, 42, Lb), [
                [Pt, y.value]
              ])
            ])
          ])) : O("", !0),
          e.listSectionLabel ? (h(), x("p", Rb, A(e.listSectionLabel), 1)) : O("", !0),
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
            $.value.length === 0 ? (h(), x("li", Pb, A(e.noResultsText), 1)) : O("", !0),
            (h(!0), x(he, null, pe($.value, (ce, ye) => (h(), x("li", {
              key: j(ce),
              role: "option",
              "aria-selected": S(ce),
              class: Z(R(ce, ye)),
              onClick: Be((U) => re(ce), ["stop"]),
              onMouseenter: (U) => v.value = ye
            }, [
              ce.leadingClass ? (h(), x("span", {
                key: 0,
                class: Z([ce.leadingClass, "shrink-0"]),
                "aria-hidden": "true"
              }, null, 2)) : O("", !0),
              e.showOptionCheck ? (h(), x("span", Eb, [
                S(ce) ? (h(), te(T(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ])) : O("", !0),
              ce.leadingIcon ? (h(), x("span", {
                key: 2,
                class: Z([
                  "inline-flex shrink-0 items-center justify-center rounded-full",
                  ce.leadingIconWrapperClass
                ])
              }, [
                (h(), te(rt(ce.leadingIcon), {
                  class: Z(["h-4 w-4", ce.leadingIconClass])
                }, null, 8, ["class"]))
              ], 2)) : O("", !0),
              d("span", Fb, A(ce.label), 1),
              ce.badge ? (h(), x("span", {
                key: 3,
                class: Z(T(ui)(ce.badge.variant))
              }, A(ce.badge.label), 3)) : O("", !0)
            ], 42, Ib))), 128))
          ], 34)
        ], 4), [
          [Ht, b.value]
        ])
      ]))
    ], 512));
  }
}), kt = (e) => e.replace(/\b(seller|checkin)_state\b/gi, "$1"), Ob = {
  key: 0,
  class: "w-52"
}, Vb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Nb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, zb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, jb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Hb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Wb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Kb = { class: "max-w-[360px] px-4 text-center" }, Ub = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Yb = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, qb = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, Xb = /* @__PURE__ */ fe({
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
      all: "#8b5cf6",
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
    }, o = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], s = e, i = a, l = (k) => {
      i("export", k);
    }, r = (k) => {
      i("changeBreakdown", String(k));
    }, c = (k) => {
      const _ = k.toLowerCase(), w = n[_] || n[k];
      if (w) return w;
      const $ = Array.from(_).reduce(
        (M, D) => (M << 5) - M + D.charCodeAt(0) | 0,
        0
      );
      return o[Math.abs($) % o.length];
    }, u = $e(s, "theme"), { isDark: g } = Me(u), m = (k) => {
      const _ = kt(k).replace(/_/g, " ");
      return _.charAt(0).toUpperCase() + _.slice(1);
    }, p = C(() => {
      const k = {};
      for (const _ of Object.values(s.data?.agents_by_day || {}))
        for (const [w, $] of Object.entries(_))
          k[w] = (k[w] || 0) + $;
      return k;
    }), f = C(() => {
      const k = s.data?.agents_by_day || {}, _ = Object.keys(k).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const $ = Object.keys(p.value).sort(
        (M, D) => p.value[D] - p.value[M] || M.localeCompare(D)
      ).slice(0, s.maxSeries).map((M) => ({
        label: m(M),
        data: _.map((D) => k[D]?.[M] || 0),
        borderColor: c(M)
      }));
      return {
        labels: _.map((M) => Ne(M).format("MMM DD")),
        datasets: $
      };
    }), b = C(() => {
      const k = Object.values(p.value).reduce((w, $) => w + $, 0), _ = s.totalConversations ?? k;
      return _ === 0 ? [] : Object.entries(p.value).sort(([, w], [, $]) => $ - w).map(([w, $]) => ({
        name: w,
        label: m(w),
        total: $,
        percentage: ($ / _ * 100).toFixed(1),
        color: c(w)
      }));
    }), v = C(() => b.value.slice(0, 4)), y = C(() => {
      const k = v.value.length;
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    });
    return t({ isDark: g }), (k, _) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: s.title,
      subtitle: s.subtitle,
      collapsible: !1,
      loading: s.loading
    }, {
      headerAside: E(() => [
        s.breakdownOptions.length ? (h(), x("div", Ob, [
          z(Ut, {
            "model-value": s.breakdownBy,
            options: s.breakdownOptions,
            "onUpdate:modelValue": r
          }, null, 8, ["model-value", "options"])
        ])) : O("", !0)
      ]),
      headerExport: E(() => [
        e.enableExport && !s.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", Vb, [
          d("div", Nb, [
            f.value.labels && f.value.labels.length ? (h(), x("section", zb, [
              d("div", jb, [
                z(pt, {
                  data: f.value,
                  options: e.options,
                  theme: u.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              s.showSummaryCards && v.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(y.value)
              }, [
                (h(!0), x(he, null, pe(v.value, (w) => (h(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : s.showSummaryCards && b.value.length ? (h(), x("section", Hb, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: _e(y.value)
              }, [
                (h(!0), x(he, null, pe(v.value, (w) => (h(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${s.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            b.value.length ? O("", !0) : (h(), x("section", Wb, [
              d("div", Kb, [
                d("div", Ub, [
                  z(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", Yb, A(s.emptyTitle), 1),
                d("p", qb, A(s.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), $l = /* @__PURE__ */ be(Xb, [["__scopeId", "data-v-c2fc7beb"]]), Gb = { class: "card-body" }, Zb = {
  key: 0,
  class: "chart-section"
}, Qb = { class: "chart-wrapper" }, Jb = {
  key: 1,
  class: "record-locator-daily-section"
}, ev = { class: "w-full min-w-0" }, tv = { class: "cell-plain font-medium" }, av = { class: "cell-plain text-center" }, nv = { class: "cell-plain text-center" }, ov = { class: "cell-plain text-center" }, sv = { class: "cell-plain text-center" }, iv = { class: "cell-plain text-center success-value" }, lv = { class: "cell-plain text-center failed-value" }, rv = { class: "cell-plain text-center warning-value" }, cv = { class: "cell-plain text-center" }, dv = { class: "cell-plain text-center failed-value" }, uv = {
  key: 2,
  class: "empty-state"
}, hv = /* @__PURE__ */ fe({
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
    ), m = C(() => n.data), p = (v, y) => Dt(v, y), f = (v, y) => {
      const k = ge(v), _ = p(v, y);
      return `${k} (${_})`;
    }, b = C(() => {
      const v = [], y = [], k = /* @__PURE__ */ new Set(), _ = (Y) => {
        k.has(Y) || (v.push({ name: Y }), k.add(Y));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: v, links: y };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = m.value.total_checkin_initiated, $ = m.value.total_record_locator_init, M = m.value.total_record_locator_started, D = m.value.total_record_locator_completed, P = m.value.total_record_locator_closed, V = m.value.total_record_locator_failed, j = m.value.total_record_locator_abandoned, S = m.value.total_record_locator_init_abandoned, R = m.value.total_checkin_pre_init_abandoned_error, B = m.value.total_checkin_pre_init_abandoned_voluntary, H = R != null || B != null, W = H ? Math.max(Number(R) || 0, 0) : 0, J = H ? Math.max(Number(B) || 0, 0) : 0, re = m.value.total_record_locator_init_abandoned_error, ue = m.value.total_record_locator_init_abandoned_voluntary, q = re != null || ue != null, ne = q ? Math.max(Number(re) || 0, 0) : 0, L = q ? Math.max(Number(ue) || 0, 0) : 0;
      $ > 0 && y.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: xe($, w)
      });
      const K = w - $;
      return H ? (J > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: J,
        label: xe(J, w)
      })), W > 0 && (_("Booking not retreived"), y.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: W,
        label: xe(W, w)
      }))) : K > 0 && (_("Abandoned (Init)"), y.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: xe(K, w)
      })), M > 0 && y.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: M,
        label: xe(M, w)
      }), q ? (ne > 0 && (_("Error"), y.push({
        source: "Booking retrive",
        target: "Error",
        value: ne,
        label: xe(ne, w)
      })), L > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: xe(L, w)
      }))) : S > 0 && (_("Abandoned (Started)"), y.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: S,
        label: xe(S, w)
      })), D > 0 && y.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: D,
        label: xe(D, w)
      }), P > 0 && y.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: P,
        label: xe(P, w)
      }), V > 0 && (_("Checkin Failed"), y.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: xe(V, w)
      })), j > 0 && (_("Abandoned (Flow)"), y.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: j,
        label: xe(j, w)
      })), { nodes: v, links: y };
    });
    return t({ isDark: i }), (v, y) => (h(), te(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", Gb, [
          b.value.nodes.length > 0 ? (h(), x("section", Zb, [
            d("div", Qb, [
              z(Kt, {
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (h(), x("section", Jb, [
            d("div", ev, [
              z(ut, {
                columns: u.value,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  d("span", tv, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: k }) => [
                  d("span", av, A(T(ge)(k.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: k }) => [
                  d("span", nv, A(f(
                    k.record_locator_init_count,
                    k.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": E(({ row: k }) => [
                  d("span", ov, A(T(ge)(k.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": E(({ row: k }) => [
                  d("span", sv, A(f(
                    k.record_locator_completed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": E(({ row: k }) => [
                  d("span", iv, A(f(
                    k.record_locator_closed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": E(({ row: k }) => [
                  d("span", lv, A(f(
                    k.record_locator_failed_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": E(({ row: k }) => [
                  d("span", rv, A(f(
                    k.record_locator_abandoned_count,
                    k.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: k }) => [
                  d("span", cv, A(T(ge)(
                    k.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": E(({ row: k }) => [
                  d("span", dv, A(T(ge)(
                    k.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (h(), x("section", uv, [...y[0] || (y[0] = [
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
}), fv = /* @__PURE__ */ be(hv, [["__scopeId", "data-v-f904c66a"]]), gv = { class: "card-body" }, mv = {
  key: 0,
  class: "chart-section"
}, pv = {
  key: 1,
  class: "empty-state"
}, bv = {
  key: 2,
  class: "comparison-section"
}, vv = { class: "comparison-grid" }, yv = /* @__PURE__ */ fe({
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
    ], s = e, i = a, l = (f) => {
      i("export", f);
    }, { isDark: r } = Me($e(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const f = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(b.channels))
          f.add(v);
      return Array.from(f).sort();
    }), u = (f, b) => n[f.toLowerCase()] ?? o[b % o.length];
    function g(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function m(f) {
      if (f.delta === null) return "No previous data";
      const b = ge(f.previous), v = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${b})` : `${f.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${b})`;
    }
    const p = C(() => {
      const f = s.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const b = f.map((y) => Ne(y.date).format("MMM-DD")), v = c.value.map((y, k) => ({
        label: y,
        data: f.map((_) => _.channels[y] ?? 0),
        backgroundColor: u(y, k),
        borderRadius: 4
      }));
      return { labels: b, datasets: v };
    });
    return t({ isDark: r }), (f, b) => (h(), te(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", gv, [
          p.value.labels.length > 0 ? (h(), x("section", mv, [
            z($t, {
              data: p.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (h(), x("section", pv, [...b[0] || (b[0] = [
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
          e.channelComparison.length > 0 ? (h(), x("section", bv, [
            d("div", vv, [
              (h(!0), x(he, null, pe(e.channelComparison, (v, y) => (h(), te(T(ve), {
                key: v.channel,
                color: u(v.channel, y),
                title: g(v.channel),
                value: T(ge)(v.current),
                subvalue: m(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Sl = /* @__PURE__ */ be(yv, [["__scopeId", "data-v-4879d791"]]), xv = { class: "card-body" }, kv = {
  key: 0,
  class: "chart-section"
}, _v = { class: "chart-wrapper" }, wv = {
  key: 1,
  class: "empty-state"
}, Cv = { class: "seller-value-cards" }, $v = {
  key: 2,
  class: "seller-daily-section"
}, Sv = { class: "w-full min-w-0" }, Mv = { class: "sl-cell font-medium" }, Dv = { class: "sl-cell text-center" }, Av = { class: "sl-cell text-center" }, Tv = { class: "sl-cell text-center" }, Bv = { class: "sl-cell text-center" }, Lv = { class: "sl-cell text-center success-value" }, Rv = {
  key: 0,
  class: "currency-cell-list"
}, Pv = {
  key: 1,
  class: "empty-cell"
}, Iv = { class: "sl-cell text-center success-value" }, Ev = { class: "sl-cell text-center success-value" }, Fv = {
  key: 0,
  class: "currency-cell-list"
}, Ov = {
  key: 1,
  class: "empty-cell"
}, Vv = { class: "sl-cell text-center success-value" }, Nv = { class: "sl-cell text-center" }, zv = { class: "sl-cell text-center success-value" }, jv = {
  key: 0,
  class: "currency-cell-list"
}, Hv = { key: 1 }, Wv = {
  key: 0,
  class: "failed-reasons"
}, Kv = { class: "reason-name" }, Uv = { class: "reason-count" }, Yv = {
  key: 1,
  class: "empty-cell"
}, qv = /* @__PURE__ */ fe({
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
    function n(S) {
      return S;
    }
    const o = e, s = a, i = (S) => {
      s("export", S);
    }, { isDark: l } = Me($e(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const S = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((R) => {
        const B = S.findIndex(
          (H) => H.date === R.date
        );
        B !== -1 ? S[B] = { ...S[B], reasons: R.reasons } : S.push({
          date: R.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: R.reasons
        });
      }), S.sort(
        (R, B) => new Date(R.date).getTime() - new Date(B.date).getTime()
      );
    }), c = C(() => {
      const S = [
        { key: "date", label: "Date", align: "center" },
        { key: "sellInitiated", label: "Sell Initiated", align: "center" },
        { key: "sellStarted", label: "Sell Started", align: "center" },
        { key: "getQuote", label: "Get Quote", align: "center" },
        { key: "bookingCreated", label: "Booking Created", align: "center" }
      ];
      return o.showPaymentMethodDetails && S.push(
        { key: "btValue", label: "BT Success Value", align: "center" },
        { key: "btSuccess", label: "BT Success", align: "center" },
        { key: "coValue", label: "CO Success Value", align: "center" },
        { key: "cashSuccess", label: "Cash Success", align: "center" }
      ), S.push(
        { key: "sellSuccess", label: "Sell Success", align: "center" },
        { key: "totalSalesValue", label: "Total Sales Value", align: "center" },
        { key: "failed", label: "Failed", align: "left" }
      ), S;
    }), u = C(
      () => r.value.map((S) => ({
        id: S.date,
        ...S
      }))
    ), g = C(() => o.sellerData), m = C(() => o.failedData), p = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), f = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_bank_transfer) ? o.sellerData.total_value_sell_success_bank_transfer : []
    ), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_success_cash) ? o.sellerData.total_value_sell_success_cash : []
    ), v = C(() => {
      const S = p.value;
      return S.length > 0 ? S.map(
        (R) => `${R.currency} ${qt(R.total_value)}`
      ).join(" · ") : j(o.sellerData.total_value_sell_success);
    });
    function y(S) {
      return S.length > 0 ? S.map(
        (R) => `${R.currency} ${qt(R.total_value)}`
      ).join(" · ") : "—";
    }
    const k = C(
      () => y(f.value)
    ), _ = C(
      () => y(b.value)
    ), w = (S) => S.replace(/_/g, " ").replace(/\b\w/g, (R) => R.toUpperCase()), $ = (S) => `Failed:
${w(S)}`, M = C(() => {
      const {
        total_seller_conversations: S = 0,
        total_sell_started: R = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: H = 0,
        total_sell_success_bank_transfer: W = 0,
        total_sell_success_cash: J = 0
      } = g.value, { failed_by_reason_by_day: re = [] } = m.value;
      if (S === 0) return { nodes: [], links: [] };
      const ue = H, q = [
        { name: "Sell Initiated", value: S, status: "success" },
        { name: "Sell Started", value: R, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: ue, status: "success" }
      ], ne = [], L = S - R;
      L > 0 && (q.push({
        name: "Abandoned (Init)",
        value: L,
        status: "abandon"
      }), ne.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: L,
        label: xe(L, S)
      })), R > 0 && ne.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: R,
        label: xe(R, S)
      });
      const K = re.reduce(
        (ie, ce) => (ce.reasons && Array.isArray(ce.reasons) && ce.reasons.forEach((ye) => {
          const U = ye.reason, le = ye.failed_count;
          ie[U] = (ie[U] || 0) + le;
        }), ie),
        {}
      );
      B > 0 && ne.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: xe(B, S)
      }), (W ?? 0) > 0 && (q.push({
        name: "Bank Transfer",
        value: W ?? 0,
        status: "success"
      }), ne.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: W ?? 0,
        label: xe(W ?? 0, S)
      })), (J ?? 0) > 0 && (q.push({
        name: "Cash Option",
        value: J ?? 0,
        status: "success"
      }), ne.push({
        source: "Booking Created",
        target: "Cash Option",
        value: J ?? 0,
        label: xe(J ?? 0, S)
      })), ue > 0 && ne.push({
        source: "Booking Created",
        target: "Sell Success",
        value: ue,
        label: xe(ue, S)
      });
      const Y = B - ue - (W ?? 0) - (J ?? 0);
      Y > 0 && (q.push({
        name: "Failed at Completion",
        value: Y,
        status: "error"
      }), ne.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: Y,
        label: xe(Y, S)
      }));
      const N = R - B;
      if (N > 0 && (q.push({
        name: "Failed at Booking",
        value: N,
        status: "error"
      }), ne.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: N,
        label: xe(N, S)
      })), Object.keys(K).length > 0) {
        const ie = Object.values(K).reduce(
          (ye, U) => ye + U,
          0
        ), ce = N - ie;
        Object.entries(K).filter(([, ye]) => ye > 0).sort(([, ye], [, U]) => U - ye).forEach(([ye, U]) => {
          const le = `Failed: ${ye}`;
          q.push({
            name: le,
            value: U,
            status: "error",
            label: $(ye)
          }), ne.push({
            source: "Failed at Booking",
            target: le,
            value: U,
            label: xe(U, S)
          });
        }), ce > 0 && (q.push({
          name: "Failed: Without Reason",
          value: ce,
          status: "error",
          label: `Failed:
Without Reason`
        }), ne.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: ce,
          label: xe(ce, S)
        }));
      }
      return {
        nodes: q,
        links: ne
      };
    }), D = (S, R) => Dt(S, R), P = (S, R) => {
      const B = ge(S), H = D(S, R);
      return `${B} (${H})`;
    }, V = (S) => S == null ? 0 : typeof S == "number" ? S : Array.isArray(S) ? S.reduce((R, B) => R + (B.total_value || 0), 0) : 0, j = (S) => qt(V(S));
    return t({ isDark: l }), (S, R) => (h(), te(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", xv, [
          M.value.nodes.length > 0 ? (h(), x("section", kv, [
            d("div", _v, [
              z(Kt, {
                data: M.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (h(), x("section", wv, [...R[0] || (R[0] = [
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
          d("section", Cv, [
            z(ve, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            o.showPaymentMethodDetails ? (h(), x(he, { key: 0 }, [
              z(ve, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Bank Transfer Value",
                value: k.value
              }, null, 8, ["value"]),
              z(ve, {
                class: "seller-value-card",
                color: "var(--kiut-success)",
                title: "Cash Option Value",
                value: _.value
              }, null, 8, ["value"])
            ], 64)) : O("", !0)
          ]),
          r.value && r.value.length > 0 ? (h(), x("section", $v, [
            d("div", Sv, [
              z(ut, {
                columns: c.value,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: B }) => [
                  d("span", Mv, A(T(Ne)(String(B.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": E(({ row: B }) => [
                  d("span", Dv, A(T(ge)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": E(({ row: B }) => [
                  d("span", Av, A(P(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": E(({ row: B }) => [
                  d("span", Tv, A(P(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": E(({ row: B }) => [
                  d("span", Bv, A(P(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-btValue": E(({ row: B }) => [
                  d("span", Lv, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (h(), x("div", Rv, [
                      (h(!0), x(he, null, pe(B.daily_value_sell_success_bank_transfer, (H) => (h(), x("span", {
                        key: `${B.date}-bt-success-${H.currency}`
                      }, A(H.currency) + " " + A(T(qt)(H.total_value)), 1))), 128))
                    ])) : (h(), x("span", Pv, "-"))
                  ])
                ]),
                "cell-btSuccess": E(({ row: B }) => [
                  d("span", Iv, A(T(ge)(
                    Number(
                      B.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-coValue": E(({ row: B }) => [
                  d("span", Ev, [
                    Array.isArray(
                      B.daily_value_sell_success_cash
                    ) && B.daily_value_sell_success_cash.length > 0 ? (h(), x("div", Fv, [
                      (h(!0), x(he, null, pe(B.daily_value_sell_success_cash, (H) => (h(), x("span", {
                        key: `${B.date}-co-success-${H.currency}`
                      }, A(H.currency) + " " + A(T(qt)(H.total_value)), 1))), 128))
                    ])) : (h(), x("span", Ov, "-"))
                  ])
                ]),
                "cell-cashSuccess": E(({ row: B }) => [
                  d("span", Vv, A(T(ge)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": E(({ row: B }) => [
                  d("span", Nv, A(P(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": E(({ row: B }) => [
                  d("span", zv, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (h(), x("div", jv, [
                      (h(!0), x(he, null, pe(B.daily_value_sell_success, (H) => (h(), x("span", {
                        key: `${B.date}-${H.currency}`
                      }, A(H.currency) + " " + A(T(qt)(H.total_value)), 1))), 128))
                    ])) : (h(), x("span", Hv, A(j(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": E(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (h(), x("div", Wv, [
                    (h(!0), x(he, null, pe(B.reasons || [], (H) => (h(), x("div", {
                      key: H.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", Kv, A(H.reason) + ":", 1),
                      d("span", Uv, A(H.failed_count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", Yv, "-"))
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
}), Ml = /* @__PURE__ */ be(qv, [["__scopeId", "data-v-19fee7a8"]]), Xv = { class: "seller-container__body" }, Gv = /* @__PURE__ */ fe({
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
    return (c, u) => (h(), te(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: u[2] || (u[2] = (g) => n("open"))
    }, {
      default: E(() => [
        d("div", Xv, [
          z(Ml, {
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
          z(Sl, {
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
}), Zv = /* @__PURE__ */ be(Gv, [["__scopeId", "data-v-34a76e0c"]]), Qv = { class: "card-body" }, Jv = {
  key: 0,
  class: "chart-section"
}, ey = { class: "chart-wrapper" }, ty = {
  key: 1,
  class: "empty-state"
}, ay = { class: "ancillaries-value-cards" }, ny = {
  key: 2,
  class: "ancillaries-daily-section"
}, oy = { class: "w-full min-w-0" }, sy = { class: "sl-cell font-medium" }, iy = { class: "sl-cell text-center" }, ly = { class: "sl-cell text-center" }, ry = { class: "sl-cell text-center" }, cy = {
  key: 0,
  class: "failed-reasons"
}, dy = { class: "reason-name" }, uy = { class: "reason-count" }, hy = {
  key: 1,
  class: "empty-cell"
}, fy = /* @__PURE__ */ fe({
  __name: "Ancillaries",
  props: {
    ancillariesData: { default: () => ({
      total_ancillaries_offered: 0,
      total_ancillaries_selected: 0,
      total_ancillaries_declined: 0,
      ancillaries_cr: 0,
      declined_by_reason: [],
      ancillaries_by_day: [],
      declined_by_reason_by_day: []
    }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    initiallyOpen: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    function a(v) {
      return v;
    }
    const n = e, { isDark: o } = Me($e(n, "theme")), s = C(
      () => n.ancillariesData?.total_ancillaries_offered || 0
    ), i = C(
      () => n.ancillariesData?.total_ancillaries_selected || 0
    ), l = C(
      () => n.ancillariesData?.total_ancillaries_declined || 0
    ), r = C(
      () => n.ancillariesData?.ancillaries_cr || 0
    ), c = C(
      () => `${Number(r.value || 0).toFixed(1)}%`
    ), u = (v) => v.replace(/_/g, " ").replace(/\b\w/g, (y) => y.toUpperCase()), g = (v) => `Declined:
${u(v)}`, m = C(() => {
      const v = s.value, y = i.value, k = l.value, _ = n.ancillariesData?.declined_by_reason || [];
      if (v === 0) return { nodes: [], links: [] };
      const w = [
        { name: "Offered", value: v, status: "success" },
        { name: "Selected", value: y, status: "success" }
      ], $ = [];
      y > 0 && $.push({
        source: "Offered",
        target: "Selected",
        value: y,
        label: xe(y, v)
      });
      const M = _.reduce(
        (j, S) => (S.count > 0 && (j[S.reason] = (j[S.reason] || 0) + S.count), j),
        {}
      ), D = Object.values(M).reduce((j, S) => j + S, 0), P = Math.max(0, k - D);
      Object.entries(M).sort(([, j], [, S]) => S - j).forEach(([j, S]) => {
        const R = `Declined: ${j}`;
        w.push({
          name: R,
          value: S,
          status: "error",
          label: g(j)
        }), $.push({
          source: "Offered",
          target: R,
          value: S,
          label: xe(S, v)
        });
      }), P > 0 && (w.push({
        name: "Declined: Without Reason",
        value: P,
        status: "error",
        label: `Declined:
Without Reason`
      }), $.push({
        source: "Offered",
        target: "Declined: Without Reason",
        value: P,
        label: xe(P, v)
      }));
      const V = Math.max(
        0,
        v - y - k
      );
      return V > 0 && (w.push({
        name: "No Response",
        value: V,
        status: "abandon"
      }), $.push({
        source: "Offered",
        target: "No Response",
        value: V,
        label: xe(V, v)
      })), { nodes: w, links: $ };
    }), p = C(() => {
      const v = [...n.ancillariesData?.ancillaries_by_day || []];
      return (n.ancillariesData?.declined_by_reason_by_day || []).forEach((k) => {
        const _ = v.findIndex((w) => w.date === k.date);
        _ !== -1 ? v[_] = { ...v[_], reasons: k.reasons } : v.push({
          date: k.date,
          offered_count: 0,
          selected_count: 0,
          declined_count: 0,
          reasons: k.reasons
        });
      }), v.sort(
        (k, _) => new Date(k.date).getTime() - new Date(_.date).getTime()
      );
    }), f = C(() => [
      { key: "date", label: "Date", align: "center" },
      { key: "offered", label: "Offered", align: "center" },
      { key: "selected", label: "Selected", align: "center" },
      { key: "declined", label: "Declined", align: "center" },
      { key: "reasons", label: "Decline Reasons", align: "left" }
    ]), b = C(
      () => p.value.map((v) => ({
        id: v.date,
        ...v
      }))
    );
    return t({
      isDark: o,
      formatSankeyPercentage: Dt
    }), (v, y) => (h(), te(Se, {
      class: "ancillaries-metrics-root h-full min-h-0",
      title: "Ancillaries",
      subtitle: "Ancillary offer conversion funnel",
      "default-open": e.initiallyOpen,
      loading: n.loading
    }, {
      default: E(() => [
        d("div", Qv, [
          m.value.nodes.length > 0 ? (h(), x("section", Jv, [
            d("div", ey, [
              z(Kt, {
                data: m.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (h(), x("section", ty, [...y[0] || (y[0] = [
            d("div", { class: "empty-state-content" }, [
              d("p", { class: "empty-title" }, "No ancillaries data available"),
              d("p", { class: "empty-description" }, " No ancillary funnel events found for the selected period. Try adjusting the date range. ")
            ], -1)
          ])])),
          d("section", ay, [
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Ancillaries CR",
              value: c.value
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-primary, #5d4b93)",
              title: "Offered",
              value: T(ge)(s.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-success)",
              title: "Selected",
              value: T(ge)(i.value)
            }, null, 8, ["value"]),
            z(ve, {
              class: "ancillaries-value-card",
              color: "var(--kiut-error, #ef4444)",
              title: "Declined",
              value: T(ge)(l.value)
            }, null, 8, ["value"])
          ]),
          b.value.length > 0 ? (h(), x("section", ny, [
            d("div", oy, [
              z(ut, {
                columns: f.value,
                rows: b.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: k }) => [
                  d("span", sy, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                ]),
                "cell-offered": E(({ row: k }) => [
                  d("span", iy, A(T(ge)(Number(k.offered_count) || 0)), 1)
                ]),
                "cell-selected": E(({ row: k }) => [
                  d("span", ly, A(T(ge)(Number(k.selected_count) || 0)), 1)
                ]),
                "cell-declined": E(({ row: k }) => [
                  d("span", ry, A(T(ge)(Number(k.declined_count) || 0)), 1)
                ]),
                "cell-reasons": E(({ row: k }) => [
                  (k.reasons || []).length > 0 ? (h(), x("div", cy, [
                    (h(!0), x(he, null, pe(k.reasons || [], (_) => (h(), x("div", {
                      key: _.reason,
                      class: "failed-reason-item"
                    }, [
                      d("span", dy, A(_.reason) + ":", 1),
                      d("span", uy, A(_.count), 1)
                    ]))), 128))
                  ])) : (h(), x("div", hy, "-"))
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
}), gy = /* @__PURE__ */ be(fy, [["__scopeId", "data-v-17814424"]]), my = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, py = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, by = {
  key: "title-content",
  class: "header-title-group"
}, vy = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, yy = {
  key: 0,
  class: "metric-label metric-label--header"
}, xy = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, ky = { key: "aside-content" }, _y = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, wy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Cy = {
  key: "body-content",
  class: "highlight-inner"
}, $y = { class: "card-body" }, Sy = { class: "metric-row" }, My = {
  key: 0,
  class: "metric-prefix"
}, Dy = {
  key: 0,
  class: "metric-label"
}, Ay = /* @__PURE__ */ fe({
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
    return t({ isDark: n, changePercent: i }), (c, u) => (h(), te(Se, {
      collapsible: !1,
      class: Z([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: E(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (h(), x("div", my, [
              u[0] || (u[0] = d("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (h(), x("div", py)) : O("", !0)
            ])) : (h(), x("div", by, [
              d("div", vy, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (h(), x("span", yy, A(e.label), 1)) : O("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: E(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (h(), x("div", xy)) : (h(), x("div", ky, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (h(), x("div", {
                  key: 0,
                  class: Z(["change-badge", r.value])
                }, A(l.value), 3)) : O("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: E(() => [
        z(ct, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (h(), x("div", _y, [
              u[1] || (u[1] = d("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? O("", !0) : (h(), x("div", wy))
            ])) : (h(), x("div", Cy, [
              d("div", $y, [
                ke(c.$slots, "value", {}, () => [
                  d("div", Sy, [
                    e.prefix ? (h(), x("span", My, A(e.prefix), 1)) : O("", !0),
                    d("span", {
                      class: Z(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? O("", !0) : (h(), x("span", Dy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), tt = /* @__PURE__ */ be(Ay, [["__scopeId", "data-v-c81268f4"]]), Ty = /* @__PURE__ */ fe({
  __name: "AncillariesCR",
  props: {
    ancillariesCr: { default: 0 },
    previousAncillariesCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(
      () => `${Number(a.ancillariesCr || 0).toFixed(1)}%`
    ), s = C(() => T(n.value?.isDark) ?? !1), i = C(
      () => T(n.value?.changePercent) ?? 0
    );
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "Ancillaries CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.ancillariesCr,
      "previous-value": e.previousAncillariesCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
        d("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          d("path", { d: "M12 3v18" }),
          d("path", { d: "M5 8h14" }),
          d("path", { d: "M7 12h10" }),
          d("path", { d: "M9 16h6" }),
          d("rect", {
            x: "4",
            y: "4",
            width: "16",
            height: "16",
            rx: "2"
          })
        ], -1)
      ])]),
      _: 1
    }, 8, ["value", "loading", "theme", "current-value", "previous-value"]));
  }
}), By = { class: "card-body" }, Ly = {
  key: 0,
  class: "chart-section"
}, Ry = {
  key: 1,
  class: "empty-state"
}, Py = { class: "empty-state-content" }, Iy = { class: "empty-icon-wrapper" }, Ey = /* @__PURE__ */ fe({
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
      ), f = m.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return n[y] || "#94a3b8";
      }), b = f.map((v) => `${v}80`);
      return {
        labels: m.map((v) => {
          const y = Number(v.conversations) || 0, k = p ? y / p * 100 : 0;
          return `${kt(v.agent_type)} - ${y.toLocaleString()} (${k.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((v) => v.conversations),
            backgroundColor: b,
            borderColor: f,
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
              const m = (g.label || "").toString().split(" - ")[0], p = Number(g.parsed) || 0, f = (g.dataset.data || []).reduce(
                (v, y) => v + (Number(y) || 0),
                0
              ), b = f ? p / f * 100 : 0;
              return `${m}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (g, m) => (h(), te(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", By, [
          c.value.labels && c.value.labels.length ? (h(), x("section", Ly, [
            z(Fn, {
              data: c.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (h(), x("section", Ry, [
            d("div", Py, [
              d("div", Iy, [
                z(T(ap), { class: "empty-icon" })
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
}), Fy = /* @__PURE__ */ be(Ey, [["__scopeId", "data-v-34a998ae"]]), Oy = { class: "card-body" }, Vy = {
  key: 0,
  class: "payment-methods-section"
}, Ny = { class: "payment-methods-grid" }, zy = {
  key: 1,
  class: "empty-state"
}, jy = { class: "empty-state-content" }, Hy = { class: "empty-icon-wrapper" }, Wy = {
  key: 2,
  class: "payment-method-daily-section"
}, Ky = { class: "w-full min-w-0" }, Uy = { class: "font-medium" }, Yy = { class: "text-center" }, qy = { class: "text-center success-value" }, Xy = {
  key: 0,
  class: "currency-cell-list"
}, Gy = { class: "payment-tags" }, Zy = { class: "tag-name" }, Qy = {
  key: 0,
  class: "tag-amount"
}, Jy = {
  key: 1,
  class: "tag-amount"
}, e1 = { class: "tag-count" }, t1 = {
  key: 3,
  class: "empty-table-state"
}, a1 = "Not Registered", n1 = /* @__PURE__ */ fe({
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
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((D, P) => Ne(D.date).valueOf() - Ne(P.date).valueOf())), g = [
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
        (j) => ({
          payment_method: j.payment_method || "Unknown",
          total_amount: j.total_amount ?? 0,
          count: j.count ?? 0,
          total_amount_by_currency: j.total_amount_by_currency ?? []
        })
      ), V = (D.payment_method_by_day || []).map((j) => ({
        date: j.date || "",
        total_count: j.total_count ?? 0,
        total_amount: j.total_amount ?? 0,
        total_amount_by_currency: j.total_amount_by_currency ?? [],
        payment_methods: (j.payment_methods || []).map((S) => ({
          payment_method: S.payment_method || "Unknown",
          total_amount: S.total_amount ?? 0,
          count: S.count ?? 0,
          total_amount_by_currency: S.total_amount_by_currency ?? []
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
    }, f = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [D, P] = n.dates.map(
            (j) => Ne(j).format("YYYY-MM-DD")
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
    ], v = (D) => !D || D.toLowerCase() === "unknown" ? a1 : D.replace(/_/g, " "), y = (D) => D == null ? "$0.00" : Ie(D), k = (D) => {
      const P = D.total_amount_by_currency;
      return P && P.length > 0 ? P.map((V) => `${V.currency} ${y(V.total_value)}`).join(" · ") : y(D.total_amount);
    }, _ = (D) => D ? Ne(D).format("MMM DD") : "-", w = (D) => D == null || Number.isNaN(Number(D)) ? 0 : Number(D), $ = (D) => {
      o("export", D);
    };
    function M() {
      const D = n.data;
      D && (Array.isArray(D.payment_method_breakdown) && D.payment_method_breakdown.length > 0 || Array.isArray(D.payment_method_by_day) && D.payment_method_by_day.length > 0) && (i.value = !1, l.value = p(D));
    }
    return Je(() => {
      n.data ? M() : f();
    }), Te(
      () => n.data,
      (D) => {
        D && M();
      },
      { deep: !0 }
    ), Te(
      () => n.dates,
      (D) => {
        n.data || D && D[0] && D[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: s }), (D, P) => (h(), te(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: P[0] || (P[0] = (V) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !i.value ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", Oy, [
          r.value ? (h(), x("section", Vy, [
            P[1] || (P[1] = d("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            d("div", Ny, [
              (h(!0), x(he, null, pe(l.value.payment_method_breakdown, (V, j) => (h(), te(ve, {
                key: V.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[j % b.length],
                title: v(V.payment_method),
                value: k(V),
                subvalue: `${w(V.count)} ${w(V.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (h(), x("section", zy, [
            d("div", jy, [
              d("div", Hy, [
                z(T(np), { class: "empty-icon" })
              ]),
              P[2] || (P[2] = d("p", { class: "empty-title" }, "No payment data available", -1)),
              P[3] || (P[3] = d("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (h(), x("section", Wy, [
            P[5] || (P[5] = d("p", { class: "section-label" }, "Daily Breakdown", -1)),
            d("div", Ky, [
              z(ut, {
                columns: g,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: V }) => [
                  d("span", Uy, A(_(String(V.date))), 1)
                ]),
                "cell-totalSales": E(({ row: V }) => [
                  d("span", Yy, A(T(ge)(V.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": E(({ row: V }) => [
                  d("span", qy, [
                    Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (h(), x("div", Xy, [
                      (h(!0), x(he, null, pe(V.total_amount_by_currency, (j) => (h(), x("span", {
                        key: `${V.date}-${j.currency}`
                      }, A(j.currency) + " " + A(y(j.total_value)), 1))), 128))
                    ])) : (h(), x(he, { key: 1 }, [
                      Ae(A(y(Number(V.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": E(({ row: V }) => [
                  d("div", Gy, [
                    (h(!0), x(he, null, pe(Array.isArray(V.payment_methods) ? V.payment_methods : [], (j) => (h(), x("div", {
                      key: j.payment_method,
                      class: "payment-tag"
                    }, [
                      d("span", Zy, A(v(j.payment_method)), 1),
                      P[4] || (P[4] = d("span", { class: "tag-separator" }, "•", -1)),
                      !j.total_amount_by_currency || j.total_amount_by_currency.length === 0 ? (h(), x("span", Qy, A(y(j.total_amount)), 1)) : (h(), x("span", Jy, A(j.total_amount_by_currency.map(
                        (S) => `${S.currency} ${y(S.total_value)}`
                      ).join(" / ")), 1)),
                      d("span", e1, "(" + A(w(j.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (h(), x("div", t1, [...P[6] || (P[6] = [
            d("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), o1 = /* @__PURE__ */ be(n1, [["__scopeId", "data-v-168637eb"]]), s1 = { class: "card-body" }, i1 = { class: "kpi-closed-value" }, l1 = { class: "kpi-closed-value__main" }, r1 = {
  key: 0,
  class: "kpi-closed-value__pct"
}, c1 = { class: "table-view-select flex justify-end" }, d1 = { class: "table-section w-full min-w-0" }, u1 = { class: "cell-plain" }, h1 = { class: "cell-plain" }, f1 = { class: "cell-plain cell-plain--muted" }, g1 = { class: "cell-plain" }, m1 = { class: "cell-plain cell-plain--orange" }, p1 = { class: "cell-plain cell-plain--red" }, b1 = { class: "cell-plain cell-plain--muted" }, v1 = { class: "cell-plain cell-plain--muted" }, y1 = { class: "cell-plain cell-plain--muted" }, x1 = { class: "cell-plain" }, k1 = { class: "cell-plain" }, _1 = {
  key: 2,
  class: "empty-state"
}, w1 = 6, C1 = /* @__PURE__ */ fe({
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
      const G = I?.trim() ?? "";
      return G.length > 0 && !l.has(G);
    }
    function c(I) {
      if (!r(I.agent_email)) return !1;
      const G = I.assigned_count ?? 0, ee = I.closed_count ?? 0, F = I.transferred_count ?? 0, Q = I.abandoned_count ?? 0;
      return G > 0 || ee > 0 || F > 0 || Q > 0;
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
      const G = I?.trim();
      return G || "—";
    }
    function f(I) {
      const G = I?.trim();
      return G || "—";
    }
    function b(I) {
      return I == null ? "0" : ae(I);
    }
    const v = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), y = C(() => v.value.length > 0), k = C(() => {
      const I = (n.data?.total_enqueued ?? 0) > 0, G = (n.data?.total_transferred ?? 0) > 0, ee = (n.data?.total_abandoned ?? 0) > 0;
      return y.value || I || G || ee;
    }), _ = oe("by_date"), w = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], $ = oe("date"), M = oe("desc");
    Te(_, (I) => {
      I === "aggregated" ? ($.value = "name", M.value = "asc") : ($.value = "date", M.value = "desc");
    });
    function D(I, G) {
      return G == null ? null : G === 0 ? I > 0 ? 100 : 0 : (I - G) / G * 100;
    }
    function P(I) {
      const G = I.toFixed(1);
      return I > 0 ? `+${G}%` : `${G}%`;
    }
    function V(I, G = !1) {
      const ee = G ? -I : I;
      return ee > 0 ? "change-badge--up" : ee < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function j(I, G) {
      if (I === null) return null;
      const ee = D(I, G);
      return ee === null ? null : {
        label: P(ee),
        class: V(ee, !0)
      };
    }
    function S(I) {
      if (I == null || I === "") return null;
      if (typeof I == "number")
        return Number.isFinite(I) ? I : null;
      const G = I.trim();
      if (!G) return null;
      if (G.includes(":")) {
        const F = G.split(":").map(Number);
        return F.length !== 3 || F.some(isNaN) ? null : F[0] * 3600 + F[1] * 60 + F[2];
      }
      const ee = Number(G);
      return Number.isFinite(ee) ? ee : null;
    }
    function R(I) {
      const G = Math.round(I), ee = Math.floor(G / 3600), F = Math.floor(G % 3600 / 60), Q = G % 60;
      return `${String(ee).padStart(2, "0")}:${String(F).padStart(2, "0")}:${String(Q).padStart(2, "0")}`;
    }
    function B(I) {
      const G = S(I);
      return G === null ? "—" : typeof I == "string" && I.includes(":") ? I.trim() : R(G);
    }
    const H = C(() => n.data?.total_enqueued ?? 0), W = C(() => n.data?.total_closed ?? 0), J = C(() => n.data?.total_transferred ?? 0), re = C(() => n.data?.total_abandoned ?? 0), ue = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), q = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), ne = C(() => H.value <= 0 ? null : `(${(W.value / H.value * 100).toFixed(1)}%)`), L = C(
      () => j(
        S(ue.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), K = C(
      () => j(
        S(q.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function Y(I, G) {
      return {
        id: `${I.date}-${I.agent_email}-${G}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: u(I),
        transferred: g(I),
        abandoned: m(I),
        connected_at: I.connected_at ?? null,
        disconnected_at: I.disconnected_at ?? null,
        online_time_display: I.online_time_seconds == null || I.online_time_seconds === "" ? null : B(I.online_time_seconds),
        avg_assignation_seconds: S(I.avg_time_to_assign_seconds),
        avg_resolution_seconds: S(I.avg_conversation_duration_seconds),
        avg_assignation_display: B(I.avg_time_to_assign_seconds),
        avg_resolution_display: B(I.avg_conversation_duration_seconds)
      };
    }
    function N(I) {
      const G = /* @__PURE__ */ new Map();
      for (const ee of I) {
        if (!c(ee)) continue;
        const F = ee.agent_email.trim();
        G.has(F) || G.set(F, {
          agent_name: ee.agent_name?.trim() ?? "",
          agent_email: F,
          handled: 0,
          transferred: 0,
          abandoned: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const Q = G.get(F), se = ee.assigned_count ?? 0, me = ee.closed_count ?? 0;
        Q.handled += u(ee), Q.transferred += g(ee), Q.abandoned += m(ee), ee.agent_name?.trim() && (Q.agent_name = ee.agent_name.trim());
        const Ce = S(ee.avg_time_to_assign_seconds);
        Ce !== null && se > 0 && (Q.assignSum += Ce * se, Q.assignWeight += se);
        const we = S(ee.avg_conversation_duration_seconds);
        we !== null && me > 0 && (Q.resolutionSum += we * me, Q.resolutionWeight += me);
      }
      return Array.from(G.values()).map((ee, F) => {
        const Q = ee.assignWeight > 0 ? ee.assignSum / ee.assignWeight : null, se = ee.resolutionWeight > 0 ? ee.resolutionSum / ee.resolutionWeight : null;
        return {
          id: `agg-${ee.agent_email}-${F}`,
          agent_name: ee.agent_name,
          agent_email: ee.agent_email,
          handled: ee.handled,
          transferred: ee.transferred,
          abandoned: ee.abandoned,
          connected_at: null,
          disconnected_at: null,
          online_time_display: null,
          avg_assignation_seconds: Q,
          avg_resolution_seconds: se,
          avg_assignation_display: Q !== null ? R(Q) : "—",
          avg_resolution_display: se !== null ? R(se) : "—"
        };
      });
    }
    const ie = C(() => {
      const I = v.value;
      return _.value === "aggregated" ? N(I) : I.map(Y);
    });
    function ce(I, G, ee, F) {
      const Q = F === "asc" ? 1 : -1;
      let se = 0;
      switch (ee) {
        case "date":
          se = (I.dateSort ?? 0) - (G.dateSort ?? 0);
          break;
        case "name":
          se = (I.agent_name || "").localeCompare(G.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          se = I.agent_email.localeCompare(G.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          se = I.handled - G.handled;
          break;
        case "transferred":
          se = I.transferred - G.transferred;
          break;
        case "abandoned":
          se = (I.abandoned ?? 0) - (G.abandoned ?? 0);
          break;
        case "avgAssignation":
          se = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (G.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          se = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (G.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (se !== 0) return se * Q;
      if (_.value === "by_date" && ee !== "date") {
        const me = (G.dateSort ?? 0) - (I.dateSort ?? 0);
        if (me !== 0) return me;
      }
      return (I.agent_name || "").localeCompare(G.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const ye = C(() => {
      const I = [...ie.value];
      return I.sort((G, ee) => ce(G, ee, $.value, M.value)), I;
    }), U = C(
      () => ye.value
    ), le = C(() => {
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
    function de(I) {
      const G = I;
      if ($.value === G) {
        M.value = M.value === "asc" ? "desc" : "asc";
        return;
      }
      $.value = G, G === "date" ? M.value = "desc" : G === "name" || G === "email" ? M.value = "asc" : M.value = "desc";
    }
    const ae = (I) => I == null ? "0" : ge(I), X = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, G) => (h(), te(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: G[1] || (G[1] = (ee) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", s1, [
          k.value ? (h(), x("div", {
            key: 0,
            class: Z(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4", { "agent-human-conv--dark": T(i) }])
          }, [
            z(tt, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ae(H.value),
              theme: e.theme,
              "current-value": H.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: E(() => [...G[2] || (G[2] = [
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
            z(tt, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ae(W.value),
              theme: e.theme,
              "current-value": W.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: E(() => [...G[3] || (G[3] = [
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
              value: E(() => [
                d("div", i1, [
                  d("span", l1, A(ae(W.value)), 1),
                  ne.value ? (h(), x("span", r1, A(ne.value), 1)) : O("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Transferred",
              "label-position": "header",
              value: ae(J.value),
              theme: e.theme,
              "current-value": J.value,
              "previous-value": e.previousTotalTransferred
            }, {
              icon: E(() => [...G[4] || (G[4] = [
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
            z(tt, {
              label: "Abandoned",
              "label-position": "header",
              value: ae(re.value),
              theme: e.theme,
              "current-value": re.value,
              "previous-value": e.previousTotalAbandoned
            }, {
              icon: E(() => [...G[5] || (G[5] = [
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
            z(tt, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: B(ue.value),
              theme: e.theme,
              "current-value": S(ue.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Vo({
              icon: E(() => [
                G[6] || (G[6] = d("svg", {
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
                fn: E(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", L.value.class])
                  }, A(L.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            z(tt, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: B(q.value),
              theme: e.theme,
              "current-value": S(q.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Vo({
              icon: E(() => [
                G[7] || (G[7] = d("svg", {
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
                fn: E(() => [
                  d("div", {
                    class: Z(["duration-trend-badge", K.value.class])
                  }, A(K.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : O("", !0),
          y.value ? (h(), te(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: E(() => [
              d("div", c1, [
                z(Ut, {
                  modelValue: _.value,
                  "onUpdate:modelValue": G[0] || (G[0] = (ee) => _.value = ee),
                  options: w,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: E(() => [
              d("div", d1, [
                (h(), te(ut, {
                  key: `${_.value}-${$.value}-${M.value}`,
                  columns: le.value,
                  rows: U.value,
                  "sort-key": $.value,
                  "sort-direction": M.value,
                  "max-visible-rows": w1,
                  "row-key": "id",
                  onSort: de
                }, {
                  "cell-date": E(({ row: ee }) => [
                    d("span", u1, A(X(String(ee.date))), 1)
                  ]),
                  "cell-name": E(({ row: ee }) => [
                    d("span", h1, A(p(ee.agent_name)), 1)
                  ]),
                  "cell-email": E(({ row: ee }) => [
                    d("span", f1, A(ee.agent_email), 1)
                  ]),
                  "cell-handled": E(({ row: ee }) => [
                    d("span", g1, A(ae(Number(ee.handled))), 1)
                  ]),
                  "cell-transferred": E(({ row: ee }) => [
                    d("span", m1, A(ae(Number(ee.transferred))), 1)
                  ]),
                  "cell-abandoned": E(({ row: ee }) => [
                    d("span", p1, A(b(ee.abandoned)), 1)
                  ]),
                  "cell-connected": E(({ row: ee }) => [
                    d("span", b1, A(f(ee.connected_at)), 1)
                  ]),
                  "cell-disconnected": E(({ row: ee }) => [
                    d("span", v1, A(f(ee.disconnected_at)), 1)
                  ]),
                  "cell-onlineTime": E(({ row: ee }) => [
                    d("span", y1, A(f(ee.online_time_display)), 1)
                  ]),
                  "cell-avgAssignation": E(({ row: ee }) => [
                    d("span", x1, A(ee.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": E(({ row: ee }) => [
                    d("span", k1, A(ee.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : k.value ? O("", !0) : (h(), x("div", _1, [...G[8] || (G[8] = [
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
}), $1 = /* @__PURE__ */ be(C1, [["__scopeId", "data-v-96b44a98"]]), S1 = {
  key: 0,
  class: "w-52"
}, M1 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, D1 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, A1 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, T1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, B1 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, L1 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, R1 = { class: "max-w-[360px] px-4 text-center" }, P1 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, I1 = { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, E1 = { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, hi = 5, F1 = /* @__PURE__ */ fe({
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
    }, u = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"], g = (k) => {
      const _ = k.toLowerCase(), w = c[_];
      if (w) return w;
      const $ = Array.from(_).reduce(
        (M, D) => (M << 5) - M + D.charCodeAt(0) | 0,
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
    ), f = C(() => {
      const k = p.value.total_by_channel || {}, _ = Object.values(k).reduce(
        ($, M) => $ + M,
        0
      ), w = n.totalConversations ?? _;
      return w === 0 ? [] : Object.entries(k).sort(([, $], [, M]) => M - $).map(([$, M]) => ({
        name: $,
        label: $.toUpperCase(),
        total: M,
        percentage: (M / w * 100).toFixed(1),
        color: g($)
      }));
    }), b = C(
      () => f.value.slice(0, hi)
    ), v = C(() => {
      const k = Math.min(b.value.length, hi);
      if (!(k <= 0))
        return { gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))` };
    }), y = (k) => {
      if (!k || !k.channels_by_day) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const _ = k.channels_by_day, w = Object.keys(_).sort();
      if (w.length === 0) {
        m.value = { labels: [], datasets: [] };
        return;
      }
      const $ = /* @__PURE__ */ new Set();
      for (const P of Object.values(_))
        for (const V of Object.keys(P))
          $.add(V);
      const D = Array.from($).map((P) => ({
        label: P.toUpperCase(),
        data: w.map((V) => _[V]?.[P] || 0),
        borderColor: g(P)
      }));
      m.value = {
        labels: w.map((P) => Ne(P).format("MMM DD")),
        datasets: D
      };
    };
    return Te(
      () => n.data,
      (k) => {
        y(k ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (k, _) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: n.title,
      subtitle: n.subtitle,
      collapsible: !1,
      loading: n.loading
    }, {
      headerAside: E(() => [
        n.breakdownOptions.length ? (h(), x("div", S1, [
          z(Ut, {
            "model-value": n.breakdownBy,
            options: n.breakdownOptions,
            "onUpdate:modelValue": i
          }, null, 8, ["model-value", "options"])
        ])) : O("", !0)
      ]),
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", M1, [
          d("div", D1, [
            m.value.labels && m.value.labels.length ? (h(), x("section", A1, [
              d("div", T1, [
                z(pt, {
                  data: m.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              n.showSummaryCards && b.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(v.value)
              }, [
                (h(!0), x(he, null, pe(b.value, (w) => (h(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : n.showSummaryCards && f.value.length ? (h(), x("section", B1, [
              d("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: _e(v.value)
              }, [
                (h(!0), x(he, null, pe(b.value, (w) => (h(), te(ve, {
                  key: w.name,
                  class: "min-w-0",
                  color: w.color,
                  title: w.label,
                  value: `${w.percentage}%`,
                  subvalue: `${T(ge)(w.total)} ${n.unit}`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            f.value.length ? O("", !0) : (h(), x("section", L1, [
              d("div", R1, [
                d("div", P1, [
                  z(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                d("p", I1, A(n.emptyTitle), 1),
                d("p", E1, A(n.emptyDescription), 1)
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["title", "subtitle", "loading"]));
  }
}), Dl = /* @__PURE__ */ be(F1, [["__scopeId", "data-v-987b8c34"]]), O1 = /* @__PURE__ */ fe({
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
    return (c, u) => a.breakdownBy === "channel" ? (h(), te(Dl, {
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
    }, null, 8, ["data", "loading", "title", "subtitle", "breakdown-by", "breakdown-options", "total-conversations", "empty-title", "empty-description"])) : (h(), te($l, {
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
}), V1 = { class: "card-body" }, N1 = { class: "chart-container" }, z1 = { class: "triage-table-block w-full min-w-0" }, j1 = { class: "triage-row-label" }, H1 = {
  key: 1,
  class: "triage-count"
}, W1 = {
  key: 1,
  class: "triage-count"
}, K1 = {
  key: 1,
  class: "triage-count"
}, U1 = {
  key: 1,
  class: "triage-count"
}, Y1 = {
  key: 1,
  class: "triage-count"
}, q1 = {
  key: 1,
  class: "empty-state"
}, X1 = { class: "empty-state-content" }, G1 = { class: "empty-icon-wrapper" }, Z1 = /* @__PURE__ */ fe({
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
      const _ = n.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, M] of Object.entries(_)) {
        const D = $.split("+").filter(Boolean);
        if (!D.includes("triage")) continue;
        const P = D.filter((V) => V !== "triage").length;
        P >= 4 ? w["4p"] += Number(M) || 0 : w[P] += Number(M) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), u = C(() => Object.keys(n.data?.combinations || {}).length > 0), g = C(() => {
      const _ = c.value;
      if (!_) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = r.value;
      return {
        pct0: w[0] / _ * 100,
        pct1: w[1] / _ * 100,
        pct2: w[2] / _ * 100,
        pct3: w[3] / _ * 100,
        pct4p: w["4p"] / _ * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], p = C(() => {
      const _ = g.value, w = r.value;
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
          b0: w[0],
          b1: w[1],
          b2: w[2],
          b3: w[3],
          b4p: w["4p"]
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
    }, b = (_) => _?.replace("80", "") || "#888888", v = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [g.value.pct0],
          backgroundColor: f.c0,
          borderColor: b(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [g.value.pct1],
          backgroundColor: f.c1,
          borderColor: b(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [g.value.pct2],
          backgroundColor: f.c2,
          borderColor: b(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [g.value.pct3],
          backgroundColor: f.c3,
          borderColor: b(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [g.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: b(f.c4p),
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
    })), k = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (h(), te(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", V1, [
          u.value ? (h(), x(he, { key: 0 }, [
            d("div", N1, [
              z($t, {
                data: v.value,
                options: y.value
              }, null, 8, ["data", "options"])
            ]),
            z(ve, {
              class: "w-full min-w-0",
              title: "Total",
              value: T(ge)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            d("div", z1, [
              z(ut, {
                columns: m,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": E(({ row: $ }) => [
                  d("span", j1, A($.metric), 1)
                ]),
                "cell-b0": E(({ row: $ }) => [
                  $.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(f.c0) })
                  }, A(k(Number($.b0))) + "%", 5)) : (h(), x("span", H1, A(T(ge)(Number($.b0))), 1))
                ]),
                "cell-b1": E(({ row: $ }) => [
                  $.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(f.c1) })
                  }, A(k(Number($.b1))) + "%", 5)) : (h(), x("span", W1, A(T(ge)(Number($.b1))), 1))
                ]),
                "cell-b2": E(({ row: $ }) => [
                  $.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(f.c2) })
                  }, A(k(Number($.b2))) + "%", 5)) : (h(), x("span", K1, A(T(ge)(Number($.b2))), 1))
                ]),
                "cell-b3": E(({ row: $ }) => [
                  $.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(f.c3) })
                  }, A(k(Number($.b3))) + "%", 5)) : (h(), x("span", U1, A(T(ge)(Number($.b3))), 1))
                ]),
                "cell-b4p": E(({ row: $ }) => [
                  $.id === "pct" ? (h(), x("span", {
                    key: 0,
                    class: "triage-pct",
                    style: _e({ color: b(f.c4p) })
                  }, A(k(Number($.b4p))) + "%", 5)) : (h(), x("span", Y1, A(T(ge)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (h(), x("div", q1, [
            d("div", X1, [
              d("div", G1, [
                z(T(dt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = d("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = d("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Q1 = /* @__PURE__ */ be(Z1, [["__scopeId", "data-v-be7d2c0c"]]), J1 = { class: "card-body" }, ex = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, tx = { class: "pie-section" }, ax = {
  key: 1,
  class: "empty-state"
}, nx = /* @__PURE__ */ fe({
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
      () => (a.data?.items || []).reduce((p, f) => p + f.count, 0)
    ), u = C(() => {
      const p = {};
      for (const f of a.data?.items || [])
        p[f.language] = (p[f.language] || 0) + f.count;
      return Object.entries(p).map(([f, b]) => ({ language: f, count: b })).sort((f, b) => b.count - f.count);
    }), g = C(() => ({
      labels: u.value.map((p) => l(p.language)),
      datasets: [
        {
          data: u.value.map((p) => p.count),
          backgroundColor: u.value.map(
            (p, f) => s[f % s.length] + "80"
          ),
          borderColor: u.value.map(
            (p, f) => s[f % s.length]
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
              const f = p.raw || 0, b = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${f} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (p, f) => (h(), te(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: E(() => [
        d("div", J1, [
          r.value ? (h(), x("div", ex, [
            d("section", tx, [
              z(Fn, {
                data: g.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            z(ve, {
              class: "shrink-0",
              title: "Total",
              value: T(ge)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (h(), x("section", ax, [...f[0] || (f[0] = [
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
}), ox = /* @__PURE__ */ be(nx, [["__scopeId", "data-v-9385c088"]]), sx = { class: "card-body" }, ix = {
  key: 0,
  class: "guardrails-daily-section"
}, lx = { class: "w-full min-w-0" }, rx = { class: "font-medium" }, cx = { class: "font-semibold" }, dx = { class: "type-badges-row" }, ux = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, hx = {
  key: 1,
  class: "empty-state"
}, fx = /* @__PURE__ */ fe({
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
      for (const w of n.data?.items || [])
        y[w[v]] = (y[w[v]] || 0) + w.count;
      const k = Object.entries(y).sort((w, $) => $[1] - w[1]);
      if (k.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: k[0][0],
        pct: _ > 0 ? Math.round(k[0][1] / _ * 100) : 0
      };
    }, u = C(() => c("guardrail_type")), g = C(() => c("guardrail_action")), m = C(() => c("guardrail_source")), p = C(() => {
      const v = {};
      for (const y of n.data?.items || [])
        v[y.date] || (v[y.date] = {}), v[y.date][y.guardrail_type] = (v[y.date][y.guardrail_type] || 0) + y.count;
      return Object.entries(v).map(([y, k]) => ({
        date: y,
        total: Object.values(k).reduce((_, w) => _ + w, 0),
        types: Object.entries(k).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((y, k) => new Date(y.date).getTime() - new Date(k.date).getTime());
    }), f = [
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
    return t({ isDark: i }), (v, y) => (h(), te(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", sx, [
          l.value ? (h(), x(he, { key: 0 }, [
            p.value.length > 0 ? (h(), x("section", ix, [
              d("div", lx, [
                z(ut, {
                  columns: f,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": E(({ row: k }) => [
                    d("span", rx, A(T(Ne)(String(k.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": E(({ row: k }) => [
                    d("span", cx, A(T(ge)(k.total)), 1)
                  ]),
                  "cell-types": E(({ row: k }) => [
                    d("div", dx, [
                      (h(!0), x(he, null, pe(k.types, (_) => (h(), x("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            d("section", ux, [
              z(ve, {
                title: "Total Events",
                value: T(ge)(r.value)
              }, null, 8, ["value"]),
              z(ve, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                title: "Top action",
                value: g.value.name,
                subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                title: "Top source",
                value: m.value.name,
                subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (h(), x("section", hx, [...y[0] || (y[0] = [
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
}), gx = /* @__PURE__ */ be(fx, [["__scopeId", "data-v-c042ede0"]]), mx = { class: "card-body" }, px = { class: "chart-section" }, bx = { class: "chart-wrapper" }, vx = {
  key: 1,
  class: "empty-chart"
}, yx = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, xx = {
  key: 0,
  class: "dn-failure-section"
}, kx = { class: "w-full min-w-0" }, _x = { class: "failure-reason" }, wx = { class: "failure-count" }, Cx = { class: "impact-bar-container" }, $x = { class: "impact-label" }, Sx = { class: "dn-trend-health-block flex flex-col gap-0" }, Mx = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, Dx = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, Ax = { class: "system-health" }, Tx = { class: "system-health-content" }, Bx = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, Lx = {
  key: 1,
  class: "empty-state"
}, Rx = /* @__PURE__ */ fe({
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
      const $ = n.data?.documentCounts?.items || [], M = n.data?.processingCounts?.items || [];
      return $.length > 0 || M.length > 0;
    }), c = C(() => {
      const $ = n.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((M, D) => M + D.processing_started, 0),
        processing_completed: $.reduce((M, D) => M + D.processing_completed, 0),
        processing_failed: $.reduce((M, D) => M + D.processing_failed, 0),
        row_count_total: $.reduce((M, D) => M + D.row_count_total, 0)
      };
    }), u = C(() => {
      const $ = n.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((M, D) => M + D.processing_started, 0),
        processing_success: $.reduce((M, D) => M + D.processing_success, 0),
        notification_sent: $.reduce((M, D) => M + D.notification_sent, 0),
        notification_failed: $.reduce((M, D) => M + D.notification_failed, 0),
        dq_phone: $.reduce((M, D) => M + D.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((M, D) => M + D.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((M, D) => M + D.dq_error_booking_not_found, 0),
        dq_other: $.reduce((M, D) => M + D.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (M, D) => M + D.dq_error_phone_not_found + D.dq_error_flight_not_found + D.dq_error_booking_not_found + D.dq_error_other,
          0
        )
      };
    }), g = C(
      () => c.value.row_count_total || u.value.processing_started
    ), m = C(
      () => Math.max(0, g.value - u.value.notification_sent)
    ), p = ($, M) => M ? `${Math.round($ / M * 100)}%` : "0%", f = C(() => {
      const $ = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        {
          reason: "Notification failed",
          count: u.value.notification_failed
        },
        { reason: "Other", count: u.value.dq_other }
      ].filter((M) => M.count > 0).sort((M, D) => D.count - M.count);
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
      ].map((M) => ({
        ...M,
        impactPct: $ > 0 ? Math.round(M.count / $ * 100) : 0
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
    ), k = C(() => {
      const $ = g.value, M = u.value.processing_success, D = Math.max(0, M - u.value.totalDqErrors), P = u.value.notification_sent, V = Math.max(0, $ - M), j = u.value.totalDqErrors, S = Math.max(0, D - P), R = (W, J) => xe(W, J), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], H = [];
      return M > 0 && H.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: M,
        label: R(M, $)
      }), V > 0 && H.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: R(V, $)
      }), D > 0 && H.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: D,
        label: R(D, $)
      }), j > 0 && H.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: j,
        label: R(j, $)
      }), P > 0 && H.push({
        source: "Contactable",
        target: "Notified",
        value: P,
        label: R(P, $)
      }), S > 0 && H.push({
        source: "Contactable",
        target: "Not Delivered",
        value: S,
        label: R(S, $)
      }), { nodes: B, links: H };
    }), _ = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (R, B) => new Date(R.date).getTime() - new Date(B.date).getTime()
      ), M = n.data?.documentCounts?.items || [], D = {};
      for (const R of M)
        D[R.date] = (D[R.date] || 0) + R.row_count_total;
      const P = [
        .../* @__PURE__ */ new Set([
          ...$.map((R) => R.date),
          ...M.map((R) => R.date)
        ])
      ].sort(), V = P.map((R) => Ne(R).format("MMM DD")), j = P.map((R) => {
        const B = $.find((J) => J.date === R), H = B?.notification_sent || 0, W = D[R] || B?.processing_started || 0;
        return W > 0 ? Math.round(H / W * 100) : 0;
      }), S = P.map((R) => $.find((H) => H.date === R)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: j,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: S,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), w = C(() => ({
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
    return t({ isDark: i }), ($, M) => (h(), te(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: M[0] || (M[0] = (D) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !n.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", mx, [
          r.value ? (h(), x(he, { key: 0 }, [
            d("section", px, [
              M[2] || (M[2] = d("div", { class: "chart-header" }, [
                d("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              d("div", bx, [
                k.value.nodes.length > 0 && k.value.links.length > 0 ? (h(), te(Kt, {
                  key: 0,
                  data: k.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (h(), x("div", vx, [...M[1] || (M[1] = [
                  d("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            d("div", yx, [
              z(ve, {
                color: "#3b82f6",
                title: "Total Records",
                value: T(ge)(c.value.row_count_total)
              }, null, 8, ["value"]),
              z(ve, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: T(ge)(g.value)
              }, null, 8, ["value"]),
              z(ve, {
                color: "#10b981",
                title: "Successfully Notified",
                value: T(ge)(u.value.notification_sent),
                subvalue: p(u.value.notification_sent, g.value)
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                color: "#ef4444",
                title: "Not Notified",
                value: T(ge)(m.value),
                subvalue: p(m.value, g.value)
              }, null, 8, ["value", "subvalue"]),
              z(ve, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${T(ge)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (h(), x("section", xx, [
              M[3] || (M[3] = d("div", { class: "section-header" }, [
                d("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              d("div", kx, [
                z(ut, {
                  columns: v,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": E(({ row: D }) => [
                    d("span", _x, A(D.reason), 1)
                  ]),
                  "cell-count": E(({ row: D }) => [
                    d("span", wx, A(T(ge)(D.count)), 1)
                  ]),
                  "cell-impact": E(({ row: D }) => [
                    d("div", Cx, [
                      d("div", {
                        class: "impact-bar",
                        style: _e({ width: D.impactPct + "%" })
                      }, null, 4),
                      d("span", $x, A(D.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            d("div", Sx, [
              _.value.labels.length > 0 ? (h(), x("section", Mx, [
                M[4] || (M[4] = d("div", { class: "chart-header" }, [
                  d("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                d("div", Dx, [
                  z(pt, {
                    data: _.value,
                    options: w.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              d("details", Ax, [
                M[5] || (M[5] = d("summary", { class: "system-health-toggle" }, [
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
                d("div", Tx, [
                  d("div", Bx, [
                    z(ve, {
                      title: "Docs Started",
                      value: T(ge)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Docs Completed",
                      value: T(ge)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Docs Failed",
                      value: T(ge)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Processing Started",
                      value: T(ge)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Processing Success",
                      value: T(ge)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ve, {
                      title: "Notification Failed",
                      value: T(ge)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (h(), x("section", Lx, [...M[6] || (M[6] = [
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
}), Px = /* @__PURE__ */ be(Rx, [["__scopeId", "data-v-2342d485"]]), Ix = /* @__PURE__ */ fe({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => ge(a.totalConversations)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), Ex = /* @__PURE__ */ fe({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), Fx = /* @__PURE__ */ fe({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), Ox = {
  key: 0,
  class: "card-body"
}, Vx = { class: "chart-wrapper" }, Nx = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, zx = {
  key: 1,
  class: "empty-state"
}, jx = 520, Hx = 300, Wx = 40, Kx = 48, Ux = 48, Yx = {
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
    return t({ isDark: i }), (r, c) => (h(), te(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        l.value && l.value.total_nps_responses > 0 ? (h(), x("div", Ox, [
          d("div", Vx, [
            z(vl, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": jx,
              "chart-height": Hx,
              "chart-margin": Wx,
              "chart-margin-right": Kx,
              "chart-bottom-margin": Ux,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          d("div", Nx, [
            z(ve, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (h(), te(ve, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : O("", !0)
          ])
        ])) : (h(), x("div", zx, [...c[0] || (c[0] = [
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
}, Al = /* @__PURE__ */ be(Yx, [["__scopeId", "data-v-e98fe9b2"]]), qx = {
  key: 0,
  class: "card-body"
}, Xx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Gx = {
  key: 1,
  class: "empty-state"
}, Zx = {
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
      labels: s.value.map((c) => Ne(c.date).format("DD-MM-YYYY")),
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
    return (c, u) => (h(), te(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        i.value ? (h(), x("div", qx, [
          d("div", Xx, [
            z(pt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (h(), x("div", Gx, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          d("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, Tl = /* @__PURE__ */ be(Zx, [["__scopeId", "data-v-5207cfa7"]]), Qx = {
  key: 0,
  class: "card-body"
}, Jx = {
  key: 1,
  class: "empty-state"
}, ek = /* @__PURE__ */ fe({
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
    return (i, l) => (h(), te(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: E(() => [
        n.value ? (h(), x("div", Qx, [
          z($t, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (h(), x("div", Jx, [...l[0] || (l[0] = [
          d("p", { class: "empty-title" }, "No resolution answers available", -1),
          d("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), tk = /* @__PURE__ */ be(ek, [["__scopeId", "data-v-6849ef24"]]), ak = {
  key: 0,
  class: "card-body"
}, nk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ok = {
  key: 1,
  class: "empty-state"
}, sk = /* @__PURE__ */ fe({
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
    return (c, u) => (h(), te(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        i.value ? (h(), x("div", ak, [
          d("div", nk, [
            z(pt, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (h(), x("div", ok, [...u[0] || (u[0] = [
          d("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          d("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ik = /* @__PURE__ */ be(sk, [["__scopeId", "data-v-72955d9a"]]), lk = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, rk = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, Bl = {
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
    return (u, g) => (h(), x("div", lk, [
      d("div", rk, [
        z(Al, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        z(Tl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (h(), x("div", {
        key: 0,
        class: Z(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (h(), te(tk, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : O("", !0),
        i.value ? (h(), te(ik, {
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
}, ck = { class: "csat-container__body" }, dk = /* @__PURE__ */ fe({
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
    return (o, s) => (h(), te(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: E(() => [
        d("div", ck, [
          z(Bl, {
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
}), uk = /* @__PURE__ */ be(dk, [["__scopeId", "data-v-37178ba1"]]), hk = /* @__PURE__ */ fe({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => qt(a.totalRevenue)), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), fk = { class: "flex justify-end" }, gk = { class: "w-52" }, mk = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, pk = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, bk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, vk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, yk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, xk = /* @__PURE__ */ fe({
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
    ], f = (S) => p[S % p.length], b = (S) => {
      if (!S) return "0";
      const R = Math.abs(S);
      return R >= 1e6 ? (S / 1e6).toFixed(2) + "M" : R >= 1e5 ? (S / 1e3).toFixed(1) + "K" : Math.round(S).toLocaleString();
    }, v = (S) => !S || S === "unknown" ? "Unknown" : kt(S).split(/[_|]/).map((R) => R ? R.charAt(0).toUpperCase() + R.slice(1) : "").join(" "), y = oe({
      labels: [],
      datasets: []
    }), k = oe([]), _ = C(() => {
      const S = Math.min(k.value.length, 5);
      if (!(S <= 0))
        return { gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))` };
    }), w = (S) => {
      const R = S?.ai_revenue_by_day ?? [], B = S?.breakdown ?? [];
      if (!R.length) {
        y.value = { labels: [], datasets: [] }, k.value = [];
        return;
      }
      const H = [...R].sort((q, ne) => q.date.localeCompare(ne.date)), W = H.map((q) => Ne(q.date).format("MMM DD")), J = "ai_revenue";
      if (r.value === "all") {
        y.value = {
          labels: W,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: H.map((q) => Number(q[J] ?? 0)),
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
        }, k.value = [];
        return;
      }
      const ue = B.slice(0, 7).map((q) => q.key).map((q, ne) => {
        const L = f(ne), K = H.map((Y) => {
          const N = (Y.breakdown ?? {})[q];
          return N ? Number(N[J] ?? 0) : 0;
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
      y.value = { labels: W, datasets: ue }, k.value = B.slice(0, 5).map((q, ne) => ({
        key: q.key,
        label: v(q.key),
        amount: `${c.value} ${b(q.total)}`,
        percentage: Number(q.percentage ?? 0),
        color: f(ne)
      }));
    }, $ = C(() => ({
      callback: (S) => `${c.value} ${b(Number(S))}`,
      color: l.value.textSecondary,
      padding: 8
    })), M = C(() => ({
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
        x: M.value,
        y: D.value
      }
    })), V = C(() => ({
      scales: {
        x: { ...M.value, stacked: !0 },
        y: { ...D.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (S) => w(S ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (S) => {
        r.value = S, w(n.data ?? null);
      }
    );
    const j = (S) => {
      r.value = String(S), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (S, R) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: g.value,
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: E(() => [
        d("div", fk, [
          d("div", gk, [
            z(Ut, {
              "model-value": r.value,
              options: u,
              "onUpdate:modelValue": j
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              n.loading ? (h(), x("div", mk, [...R[0] || (R[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (h(), x("div", pk, [
                y.value.labels && y.value.labels.length && y.value.datasets.length ? (h(), x("section", bk, [
                  d("div", vk, [
                    m.value ? (h(), te($t, {
                      key: 0,
                      data: y.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (h(), te(pt, {
                      key: 1,
                      data: y.value,
                      options: P.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  k.value.length ? (h(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: _e(_.value)
                  }, [
                    (h(!0), x(he, null, pe(k.value, (B) => (h(), te(ve, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : O("", !0)
                ])) : (h(), x("section", yk, [...R[1] || (R[1] = [
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
}), kk = /* @__PURE__ */ be(xk, [["__scopeId", "data-v-d3e5e67f"]]), _k = { class: "flex justify-end" }, wk = { class: "w-52" }, Ck = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, $k = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Sk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Mk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Dk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ak = /* @__PURE__ */ fe({
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
    ], p = (S) => m[S % m.length], f = (S) => {
      if (!S) return "0";
      const R = Math.abs(S);
      return R >= 1e6 ? (S / 1e6).toFixed(2) + "M" : R >= 1e5 ? (S / 1e3).toFixed(1) + "K" : Math.round(S).toLocaleString();
    }, b = (S) => !S || S === "unknown" ? "Unknown" : kt(S).split(/[_|]/).map((R) => R ? R.charAt(0).toUpperCase() + R.slice(1) : "").join(" "), v = oe({
      labels: [],
      datasets: []
    }), y = oe([]), k = C(() => {
      const S = Math.min(y.value.length, 5);
      if (!(S <= 0))
        return { gridTemplateColumns: `repeat(${S}, minmax(0, 1fr))` };
    }), _ = (S) => Object.values(S ?? {}).reduce((R, B) => R + Number(B ?? 0), 0), w = (S) => {
      const R = S?.breakdown ?? [];
      if (r.value === "all") {
        const ue = S?.sales_by_channel_by_day ?? [];
        if (!ue.length) {
          v.value = { labels: [], datasets: [] }, y.value = [];
          return;
        }
        const q = [...ue].sort((ne, L) => ne.date.localeCompare(L.date));
        v.value = {
          labels: q.map((ne) => Ne(ne.date).format("MMM DD")),
          datasets: [
            {
              label: "Transactions",
              data: q.map((ne) => _(ne.channels)),
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
      const B = S?.transactions_by_day ?? [];
      if (!B.length) {
        v.value = { labels: [], datasets: [] }, y.value = [];
        return;
      }
      const H = [...B].sort((ue, q) => ue.date.localeCompare(q.date)), W = H.map((ue) => Ne(ue.date).format("MMM DD")), re = R.slice(0, 7).map((ue) => ue.key).map((ue, q) => {
        const ne = p(q), L = H.map((K) => Number((K.breakdown ?? {})[ue] ?? 0));
        return g.value ? {
          label: b(ue),
          data: L,
          backgroundColor: ne,
          borderColor: ne,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: b(ue),
          data: L,
          borderColor: ne,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: ne,
          pointBorderWidth: 2
        };
      });
      v.value = { labels: W, datasets: re }, y.value = R.slice(0, 5).map((ue, q) => ({
        key: ue.key,
        label: b(ue.key),
        amount: f(ue.count),
        percentage: Number(ue.percentage ?? 0),
        color: p(q)
      }));
    }, $ = C(() => ({
      callback: (S) => f(Number(S)),
      color: l.value.textSecondary,
      padding: 8
    })), M = C(() => ({
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
        x: M.value,
        y: D.value
      }
    })), V = C(() => ({
      scales: {
        x: { ...M.value, stacked: !0 },
        y: { ...D.value, stacked: !0 }
      }
    }));
    Te(
      () => n.data,
      (S) => w(S ?? null),
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (S) => {
        r.value = S, w(n.data ?? null);
      }
    );
    const j = (S) => {
      r.value = String(S), o("changeBreakdown", r.value);
    };
    return t({ isDark: i }), (S, R) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "Number of transactions generated by agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: E(() => [
        d("div", _k, [
          d("div", wk, [
            z(Ut, {
              "model-value": r.value,
              options: c,
              "onUpdate:modelValue": j
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          z(ct, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              n.loading ? (h(), x("div", Ck, [...R[0] || (R[0] = [
                d("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (h(), x("div", $k, [
                v.value.labels && v.value.labels.length && v.value.datasets.length ? (h(), x("section", Sk, [
                  d("div", Mk, [
                    g.value ? (h(), te($t, {
                      key: 0,
                      data: v.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (h(), te(pt, {
                      key: 1,
                      data: v.value,
                      options: P.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  y.value.length ? (h(), x("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: _e(k.value)
                  }, [
                    (h(!0), x(he, null, pe(y.value, (B) => (h(), te(ve, {
                      key: `card-${B.key}`,
                      class: "min-w-0",
                      color: B.color,
                      title: B.label,
                      value: B.amount,
                      subvalue: `${B.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : O("", !0)
                ])) : (h(), x("section", Dk, [...R[1] || (R[1] = [
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
}), Tk = /* @__PURE__ */ be(Ak, [["__scopeId", "data-v-c7fba568"]]), fi = 1, Bk = /* @__PURE__ */ fe({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = Me($e(a, "theme")), s = C(() => a.totalConversations * fi), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * fi), l = C(() => ge(s.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const m = i.value;
      return m === 0 ? s.value > 0 ? 100 : 0 : (s.value - m) / m * 100;
    }), u = C(() => {
      const m = c.value.toFixed(1);
      return c.value > 0 ? `+${m}%` : `${m}%`;
    }), g = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (m, p) => (h(), te(tt, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...p[0] || (p[0] = [
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
      headerAside: E(() => [
        r.value ? (h(), x("div", {
          key: 0,
          class: Z(["change-badge", g.value, { "change-badge--dark": T(o) }])
        }, A(u.value), 3)) : O("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Lk = /* @__PURE__ */ be(Bk, [["__scopeId", "data-v-411e0735"]]), Rk = { class: "flex justify-end" }, Pk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ik = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ek = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Fk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ok = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Vk = /* @__PURE__ */ fe({
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
    const n = e, o = a, s = (w) => {
      o("export", w);
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
      const w = g.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), p = oe(
      []
    ), f = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], b = (w) => f[w % f.length], v = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (w) => `${w}%`
          }
        }
      }
    }, y = () => {
      o("changeBreakdown", r.value);
    }, k = (w) => {
      if (!w) return "";
      const M = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return M ? M.charAt(0).toUpperCase() + M.slice(1) : "";
    }, _ = (w) => {
      if (r.value === "all") {
        const S = w?.escalations_by_day ?? [];
        if (!S.length) {
          u.value = { labels: [], datasets: [] }, g.value = [], p.value = [];
          return;
        }
        const R = [...S].sort((B, H) => B.date.localeCompare(H.date));
        u.value = {
          labels: R.map((B) => Ne(B.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: R.map(
                (B) => Number(B.escalation_rate_percentage || 0)
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
      const $ = w?.breakdown_by_day ?? [], M = w?.breakdown_items ?? [];
      if (!$.length) {
        u.value = { labels: [], datasets: [] }, g.value = [], p.value = [];
        return;
      }
      const D = [...$].sort(
        (S, R) => S.date.localeCompare(R.date)
      ), P = M.slice(0, 5).map((S) => S.key), V = D.map((S) => Ne(S.date).format("MMM DD")), j = P.map((S, R) => {
        const B = M.find((H) => H.key === S);
        return {
          label: k(B?.label || S),
          data: D.map((H) => {
            const W = H.items.find((J) => J.key === S);
            return Number(W?.percentage || 0);
          }),
          borderColor: b(R),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      u.value = {
        labels: V,
        datasets: j
      }, g.value = M.slice(0, 5).map((S, R) => ({
        key: S.key,
        label: k(S.label),
        percentage: Number(S.percentage || 0),
        color: b(R)
      })), p.value = M.slice(0, 5).map((S, R) => ({
        key: S.key,
        label: k(S.label),
        color: b(R)
      }));
    };
    return Te(
      () => n.data,
      (w) => {
        _(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Te(
      () => n.breakdownBy,
      (w) => {
        r.value = w, _(c.value);
      }
    ), t({ isDark: l }), (w, $) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      headerAside: E(() => [
        d("div", Rk, [
          Xe(d("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (M) => r.value = M),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [...$[1] || ($[1] = [
            d("option", { value: "all" }, "All", -1),
            d("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [Xl, r.value]
          ])
        ])
      ]),
      default: E(() => [
        d("div", Pk, [
          d("div", Ik, [
            u.value.labels && u.value.labels.length && u.value.datasets.length ? (h(), x("section", Ek, [
              d("div", Fk, [
                z(pt, {
                  data: u.value,
                  options: v,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              g.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(m.value)
              }, [
                (h(!0), x(he, null, pe(g.value, (M) => (h(), te(ve, {
                  key: `card-${M.key}`,
                  class: "min-w-0",
                  color: M.color,
                  title: M.label,
                  value: `${M.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : O("", !0)
            ])) : (h(), x("section", Ok, [...$[2] || ($[2] = [
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
}), Nk = /* @__PURE__ */ be(Vk, [["__scopeId", "data-v-b18e0ebd"]]), zk = /* @__PURE__ */ fe({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
const jk = { class: "flex justify-end" }, Hk = { class: "w-52" }, Wk = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Kk = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Uk = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Yk = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, qk = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Xk = "#8b5cf6", Gk = "#9ca3af", Zk = "#94a3b8", Qk = /* @__PURE__ */ fe({
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
      const ne = {
        resolution_mode: "Resolution Mode",
        agent: "Agent",
        channel: "Channel",
        agent_channel: "Channel & Agent"
      }[c.value];
      return ne ? `Average resolution time by ${ne}` : "Average resolution time";
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
    }, f = (q) => p[q.toLowerCase()] || Gk, b = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, v = (q) => b[q.toLowerCase()] || Zk, y = (q) => {
      const [ne] = q.split("|").map((L) => L.trim());
      return v(ne || q);
    }, k = (q) => {
      if (!q) return "Unknown";
      const ne = kt(q).replace(/_/g, " ").trim();
      return ne ? ne.charAt(0).toUpperCase() + ne.slice(1) : "Unknown";
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
    }), w = oe({
      labels: [],
      datasets: []
    }), $ = C(() => {
      const q = _.value, ne = {
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
        subvalue: `${ne[K.key] || 0} conversations`
      }));
    }), M = (q, ne) => q.map((L) => ({
      key: L.key,
      label: k(L.label),
      color: ne(L.key),
      formattedValue: L.avg_resolution_time_formatted || "-",
      subvalue: `${L.total_conversations} conversations (${L.percentage.toFixed(1)}%)`
    })), D = C(
      () => M(_.value.channel_breakdown_items ?? [], f)
    ), P = C(
      () => M(_.value.agent_breakdown_items ?? [], v)
    ), V = C(
      () => M(
        _.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), j = C(() => {
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
    }), S = C(() => {
      const q = j.value.length;
      if (!(q <= 0))
        return { gridTemplateColumns: `repeat(${q}, minmax(0, 1fr))` };
    }), R = (q) => q == null ? null : Number((q / 60).toFixed(2)), B = oe([]), H = (q) => {
      const ne = q?.overall_resolution_time_by_day ?? {}, L = Object.keys(ne).sort((K, Y) => K.localeCompare(Y));
      if (!L.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = [L.map((K) => ne[K] ?? null)], w.value = {
        labels: L.map((K) => Ne(K).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: B.value[0].map((K) => R(K)),
            borderColor: Xk,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, W = (q) => {
      const ne = q?.resolution_time_by_day ?? {}, L = Object.keys(ne).sort((K, Y) => K.localeCompare(Y));
      if (!L.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      B.value = m.map(
        (K) => L.map((Y) => ne[Y]?.[K.key] ?? null)
      ), w.value = {
        labels: L.map((K) => Ne(K).format("MMM DD")),
        datasets: m.map((K, Y) => ({
          label: K.label,
          data: B.value[Y].map((N) => R(N)),
          borderColor: K.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, J = (q, ne, L) => {
      const K = Object.keys(q).sort((N, ie) => N.localeCompare(ie));
      if (!K.length || !ne.length) {
        w.value = { labels: [], datasets: [] }, B.value = [];
        return;
      }
      const Y = ne.map((N) => N.key);
      B.value = Y.map((N) => K.map((ie) => q[ie]?.[N] ?? null)), w.value = {
        labels: K.map((N) => Ne(N).format("MMM DD")),
        datasets: Y.map((N, ie) => {
          const ce = ne.find((ye) => ye.key === N);
          return {
            label: k(ce?.label || N),
            data: B.value[ie].map((ye) => R(ye)),
            borderColor: L(N),
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
          J(
            q?.channel_resolution_time_by_day ?? {},
            q?.channel_breakdown_items ?? [],
            f
          );
          return;
        case "agent":
          J(
            q?.agent_resolution_time_by_day ?? {},
            q?.agent_breakdown_items ?? [],
            v
          );
          return;
        case "agent_channel":
          J(
            q?.agent_channel_resolution_time_by_day ?? {},
            q?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          W(q);
          return;
        default:
          H(q);
      }
    }, ue = C(() => ({
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
              const ne = q.dataset.label || "", L = B.value[q.datasetIndex]?.[q.dataIndex];
              return L == null ? `${ne}: -` : `${ne}: ${uo(L)}`;
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
    ), t({ isDark: r }), (q, ne) => (h(), te(Se, {
      class: "w-full min-h-0 self-start",
      title: u.value,
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      headerAside: E(() => [
        d("div", jk, [
          d("div", Hk, [
            z(Ut, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": g
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: E(() => [
        d("div", Wk, [
          d("div", Kk, [
            w.value.labels.length && w.value.datasets.length ? (h(), x("section", Uk, [
              d("div", Yk, [
                z(pt, {
                  data: w.value,
                  options: ue.value,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              j.value.length ? (h(), x("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: _e(S.value)
              }, [
                (h(!0), x(he, null, pe(j.value, (L) => (h(), te(ve, {
                  key: `card-${L.key}`,
                  class: "min-w-0",
                  color: L.color,
                  title: L.label,
                  value: L.formattedValue,
                  subvalue: L.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : (h(), x("section", qk, [...ne[0] || (ne[0] = [
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
}), Jk = /* @__PURE__ */ be(Qk, [["__scopeId", "data-v-05854dc5"]]), e_ = { class: "art-values__item" }, t_ = { class: "art-values__number" }, a_ = { class: "art-values__item" }, n_ = { class: "art-values__number" }, o_ = /* @__PURE__ */ fe({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = Me($e(a, "theme")), s = C(() => uo(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => uo(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (l, r) => (h(), te(tt, {
      label: "Average Resolution Time",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
      value: E(() => [
        d("div", {
          class: Z(["art-values", { "art-values--dark": T(o) }])
        }, [
          d("div", e_, [
            d("span", t_, A(s.value), 1),
            r[1] || (r[1] = d("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          r[3] || (r[3] = d("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          d("div", a_, [
            d("span", n_, A(i.value), 1),
            r[2] || (r[2] = d("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), s_ = /* @__PURE__ */ be(o_, [["__scopeId", "data-v-19e8dead"]]), i_ = /* @__PURE__ */ fe({
  __name: "CheckinCR",
  props: {
    checkinCr: { default: 0 },
    previousCheckinCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.checkinCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "Check-in CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.checkinCr,
      "previous-value": e.previousCheckinCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), l_ = /* @__PURE__ */ fe({
  __name: "SellerCR",
  props: {
    sellerCr: { default: 0 },
    previousSellerCr: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.sellerCr || 0).toFixed(1)}%`), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "Seller CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.sellerCr,
      "previous-value": e.previousSellerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), r_ = /* @__PURE__ */ fe({
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
    ), s = C(() => T(n.value?.isDark) ?? !1), i = C(() => T(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (h(), te(tt, {
      label: "Booking Manager CR",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.bookingManagerCr,
      "previous-value": e.previousBookingManagerCr,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), c_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, d_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, u_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, h_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, f_ = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, g_ = { class: "max-w-[360px] text-center" }, m_ = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, p_ = {
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
      return u ? m = r : g && (m = c.map((p, f) => ({
        date: p,
        allocated_cost: l.allocatedCostSeries[f] ?? 0,
        aws_cost: l.awsCostSeries[f] ?? 0,
        airline_conversations: l.airlineConversationsSeries[f] ?? 0
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
    return (l, r) => (h(), te(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", c_, [
          o.value.daily.length > 0 ? (h(), x("div", d_, [
            d("div", u_, [
              z(pt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            d("div", h_, [
              z(ve, {
                color: T(n).primaryLight,
                title: "Total Allocated",
                value: T(Ie)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Ie)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (h(), x("section", f_, [
            d("div", g_, [
              d("div", m_, [
                z(T(dt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, b_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, v_ = { class: "card-body" }, y_ = {
  key: 0,
  class: "chart-section"
}, x_ = { class: "chart-container" }, k_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, __ = {
  key: 1,
  class: "empty-state"
}, w_ = { class: "empty-state-content" }, C_ = { class: "empty-icon-wrapper" }, Pa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", gi = 10, $_ = /* @__PURE__ */ fe({
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
      const b = new Date(f), v = String(b.getDate()).padStart(2, "0"), y = String(b.getMonth() + 1).padStart(2, "0");
      return `${v}-${y}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((b, v) => b + (v.input_cost || 0), 0);
    }), c = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((b, v) => b + (v.output_cost || 0), 0);
    }), u = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((b, v) => b + (v.cache_read_cost || 0), 0);
    }), g = C(() => {
      const f = n.data?.costs_by_day || {};
      return Object.values(f).reduce((b, v) => b + (v.cache_write_cost || 0), 0);
    }), m = C(() => {
      const f = n.data?.costs_by_day || {}, b = Object.keys(f).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const v = b.map((k) => i(k)), y = [
        {
          label: "Input Cost",
          data: b.map((k) => f[k]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((k) => f[k]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((k) => f[k]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((k) => f[k]?.cache_write_cost || 0),
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
            label: function(f) {
              let b = f.dataset.label || "";
              return b && (b += ": "), f.parsed.y !== null && (b += Ie(f.parsed.y)), b;
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
            callback: function(f) {
              return Ie(f);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (f, b) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", b_, [
          d("div", v_, [
            m.value.labels && m.value.labels.length ? (h(), x("section", y_, [
              d("div", x_, [
                z($t, {
                  data: m.value,
                  options: p.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", k_, [
                z(ve, {
                  title: "Total Cost",
                  value: T(Ie)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ve, {
                  title: "Input Cost",
                  value: T(Ie)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Output Cost",
                  value: T(Ie)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Cache Read",
                  value: T(Ie)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Cache Write",
                  value: T(Ie)(g.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ve, {
                  title: "Avg / Conv.",
                  value: T(Ie)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (h(), x("section", __, [
              d("div", w_, [
                d("div", C_, [
                  z(T(dt), { class: "empty-icon" })
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
}), S_ = /* @__PURE__ */ be($_, [["__scopeId", "data-v-e1c4a95b"]]), M_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, D_ = { class: "card-body" }, A_ = {
  key: 0,
  class: "chart-section"
}, T_ = { class: "chart-container" }, B_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, L_ = {
  key: 1,
  class: "empty-state"
}, R_ = { class: "empty-state-content" }, P_ = { class: "empty-icon-wrapper" }, Ia = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", mi = 10, I_ = /* @__PURE__ */ fe({
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
      const m = g.map((f) => i(f)), p = [
        {
          label: "Input Tokens",
          data: g.map((f) => u[f]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: g.map((f) => u[f]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: g.map((f) => u[f]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: g.map((f) => u[f]?.cache_write_tokens || 0),
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
    return t({ isDark: o }), (u, g) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", M_, [
          d("div", D_, [
            r.value.labels && r.value.labels.length ? (h(), x("section", A_, [
              d("div", T_, [
                z($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              d("footer", B_, [
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(ge)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(ge)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(ge)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(ge)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(ge)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (h(), x("section", L_, [
              d("div", R_, [
                d("div", P_, [
                  z(T(dt), { class: "empty-icon" })
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
}), E_ = /* @__PURE__ */ be(I_, [["__scopeId", "data-v-554d3cda"]]), F_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, O_ = { class: "card-body" }, V_ = {
  key: 0,
  class: "chart-section"
}, N_ = { class: "chart-container" }, z_ = { class: "mt-4 w-full min-w-0" }, j_ = {
  key: 1,
  class: "empty-state"
}, H_ = { class: "empty-state-content" }, W_ = { class: "empty-icon-wrapper" }, K_ = /* @__PURE__ */ fe({
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
      () => ge(a.data?.total_conversations ?? 0)
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
    return t({ isDark: n }), (c, u) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", F_, [
          d("div", O_, [
            l.value.labels && l.value.labels.length ? (h(), x("section", V_, [
              d("div", N_, [
                z(pt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              d("div", z_, [
                z(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (h(), x("section", j_, [
              d("div", H_, [
                d("div", W_, [
                  z(T(dt), { class: "empty-icon" })
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
}), U_ = /* @__PURE__ */ be(K_, [["__scopeId", "data-v-311f443a"]]), Y_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, q_ = { class: "card-body" }, X_ = {
  key: 0,
  class: "charts-grid"
}, G_ = { class: "chart-section" }, Z_ = { class: "chart-container" }, Q_ = { class: "chart-section" }, J_ = { class: "chart-container" }, e2 = {
  key: 1,
  class: "empty-state"
}, t2 = { class: "empty-state-content" }, a2 = { class: "empty-icon-wrapper" }, n2 = /* @__PURE__ */ fe({
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
              const p = m.label, f = a.data?.top_agents?.find(
                (b) => kt(b.agent_type) === p
              );
              return f ? [
                `Total Cost: ${Ie(f.total_cost)}`,
                `Input Cost: ${Ie(f.total_input_tokens_cost)}`,
                `Output Cost: ${Ie(f.total_output_tokens_cost)}`,
                `Cache Read: ${Ie(f.total_read_tokens_cost)}`,
                `Cache Write: ${Ie(f.total_write_tokens_cost)}`
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
              const p = m.label, f = a.data?.top_agents?.find(
                (b) => kt(b.agent_type) === p
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
    return t({ isDark: n }), (m, p) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", Y_, [
          d("div", q_, [
            s.value ? (h(), x("div", X_, [
              d("section", G_, [
                p[0] || (p[0] = d("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                d("div", Z_, [
                  z($t, {
                    data: r.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              d("section", Q_, [
                p[1] || (p[1] = d("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                d("div", J_, [
                  z($t, {
                    data: c.value,
                    options: g.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (h(), x("section", e2, [
              d("div", t2, [
                d("div", a2, [
                  z(T(dt), { class: "empty-icon" })
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
}), o2 = /* @__PURE__ */ be(n2, [["__scopeId", "data-v-ae26eabc"]]), s2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, i2 = { class: "card-body" }, l2 = {
  key: 0,
  class: "chart-section"
}, r2 = { class: "chart-container" }, c2 = {
  key: 1,
  class: "empty-state"
}, d2 = { class: "empty-state-content" }, u2 = { class: "empty-icon-wrapper" }, h2 = /* @__PURE__ */ fe({
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
              const m = (g.label || "").toString(), p = Number(g.parsed) || 0, f = (g.dataset.data || []).reduce((v, y) => v + (Number(y) || 0), 0), b = f ? p / f * 100 : 0;
              return `${m}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (g, m) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", s2, [
          d("div", i2, [
            l.value ? (h(), x("section", l2, [
              d("div", r2, [
                z(Fn, {
                  data: c.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (h(), x("section", c2, [
              d("div", d2, [
                d("div", u2, [
                  z(T(dt), { class: "empty-icon" })
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
}), f2 = /* @__PURE__ */ be(h2, [["__scopeId", "data-v-a909b73c"]]), g2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, m2 = { class: "card-body" }, p2 = {
  key: 0,
  class: "chart-section"
}, b2 = { class: "chart-container" }, v2 = {
  key: 1,
  class: "empty-state"
}, y2 = { class: "empty-state-content" }, x2 = { class: "empty-icon-wrapper" }, k2 = /* @__PURE__ */ fe({
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
        const v = [...c].sort((y, k) => y.date.localeCompare(k.date));
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
      const f = p.map((v) => s(v)), b = p.map((v) => {
        const y = u[v]?.total_cost || 0, k = g[v] || 0;
        return k > 0 ? y / k : 0;
      });
      return {
        labels: f,
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
    return t({ isDark: n }), (c, u) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        d("div", g2, [
          d("div", m2, [
            i.value ? (h(), x("section", p2, [
              d("div", b2, [
                z(pt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (h(), x("section", v2, [
              d("div", y2, [
                d("div", x2, [
                  z(T(dt), { class: "empty-icon" })
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
}), _2 = /* @__PURE__ */ be(k2, [["__scopeId", "data-v-ae6c48b1"]]), w2 = { class: "tabs text-sm" }, C2 = ["aria-label"], $2 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], S2 = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, M2 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = oe([]), s = `tabs-${We()}`, i = (f) => `${s}-tab-${f}`, l = C(
      () => a.items.map((f, b) => f.disabled ? -1 : b).filter((f) => f >= 0)
    );
    function r(f) {
      return f.value === a.modelValue;
    }
    function c(f) {
      const b = r(f), y = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${y} cursor-not-allowed opacity-40` : b ? `${y} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${y} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, b) {
      f === b || a.items.find((y) => y.value === f)?.disabled || (n("update:modelValue", f), n("change", { value: f, previousValue: b }));
    }
    function g(f, b) {
      n("tab-click", { value: f.value, originalEvent: b }), !f.disabled && (u(f.value, a.modelValue), Ke(() => {
        o.value[a.items.indexOf(f)]?.focus();
      }));
    }
    function m(f, b) {
      const v = a.items.length;
      if (v === 0) return 0;
      let y = f;
      for (let k = 0; k < v; k++)
        if (y = (y + b + v) % v, !a.items[y]?.disabled) return y;
      return f;
    }
    async function p(f, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let y = b;
      f.key === "ArrowLeft" ? y = m(b, -1) : f.key === "ArrowRight" ? y = m(b, 1) : f.key === "Home" ? y = l.value[0] ?? 0 : f.key === "End" && (y = l.value[l.value.length - 1] ?? b);
      const k = a.items[y];
      !k || k.disabled || (u(k.value, a.modelValue), await Ke(), o.value[y]?.focus());
    }
    return (f, b) => (h(), x("div", w2, [
      d("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Z([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (h(!0), x(he, null, pe(e.items, (v, y) => (h(), x("button", {
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
          onClick: (k) => g(v, k),
          onKeydown: (k) => p(k, y)
        }, [
          d("span", {
            class: Z(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (h(), te(rt(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            d("span", S2, A(v.label), 1)
          ], 2)
        ], 42, $2))), 128))
      ], 10, C2),
      f.$slots.default ? (h(), te(ct, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: E(() => [
          (h(), x("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), Ll = /* @__PURE__ */ be(M2, [["__scopeId", "data-v-f9c367eb"]]), D2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, A2 = { class: "card-body" }, T2 = {
  key: 0,
  class: "model-usage-table-block"
}, B2 = { class: "w-full min-w-0" }, L2 = {
  key: 1,
  class: "empty-state"
}, R2 = { class: "empty-state-content" }, P2 = { class: "empty-icon-wrapper" }, I2 = /* @__PURE__ */ fe({
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
      () => Object.entries(c.value).map(([f, b]) => ({
        id: f,
        name: f,
        avgCost: p(b.avg_cost_per_message),
        avgTokens: m(b.avg_tokens_per_message),
        messageCount: m(b.message_count),
        totalCost: p(b.total_cost),
        totalTokens: m(b.total_tokens)
      }))
    ), m = (f) => f == null ? "0" : ge(f), p = (f) => f == null ? "$0.00" : Ie(f);
    return t({ isDark: i }), (f, b) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", D2, [
          d("div", A2, [
            z(Ll, {
              modelValue: r.value,
              "onUpdate:modelValue": b[0] || (b[0] = (v) => r.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: E(() => [
                c.value && Object.keys(c.value).length > 0 ? (h(), x("div", T2, [
                  d("div", B2, [
                    z(ut, {
                      columns: u.value,
                      rows: g.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (h(), x("div", L2, [
                  d("div", R2, [
                    d("div", P2, [
                      z(T(dt), { class: "empty-icon" })
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
}), E2 = /* @__PURE__ */ be(I2, [["__scopeId", "data-v-48a6cc07"]]), F2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, O2 = { class: "card-body" }, V2 = {
  key: 0,
  class: "message-roles-table-block"
}, N2 = { class: "w-full min-w-0" }, z2 = {
  key: 1,
  class: "empty-state"
}, j2 = { class: "empty-state-content" }, H2 = { class: "empty-icon-wrapper" }, W2 = /* @__PURE__ */ fe({
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
        role: f(b),
        avgCost: p(c.value[b]?.avg_cost_per_message),
        avgTokens: m(c.value[b]?.avg_tokens_per_message),
        messageCount: m(c.value[b]?.message_count),
        totalCost: p(c.value[b]?.total_cost),
        totalTokens: m(c.value[b]?.total_tokens)
      }))
    ), g = C(() => Object.keys(c.value).length > 0), m = (b) => b == null ? "0" : ge(b), p = (b) => b == null ? "$0.00" : Ie(b), f = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, v) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", F2, [
          d("div", O2, [
            g.value ? (h(), x("div", V2, [
              d("div", N2, [
                z(ut, {
                  columns: r,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (h(), x("div", z2, [
              d("div", j2, [
                d("div", H2, [
                  z(T(dt), { class: "empty-icon" })
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
}), K2 = /* @__PURE__ */ be(W2, [["__scopeId", "data-v-d38e854e"]]), U2 = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Y2 = { class: "card-body" }, q2 = {
  key: 0,
  class: "chart-section"
}, X2 = { class: "chart-container" }, G2 = { class: "kpi-grid" }, Z2 = {
  key: 1,
  class: "empty-state"
}, Q2 = { class: "empty-state-content" }, J2 = { class: "empty-icon-wrapper" }, ew = 40, tw = 230, aw = /* @__PURE__ */ fe({
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
      const w = c(_).toLowerCase();
      for (const [$, M] of Object.entries(r))
        if (w.includes($))
          return M;
      return "#9ca3af";
    }, m = C(() => [...n.data?.top_agents || []].sort((w, $) => $.avg_cost_per_conversation - w.avg_cost_per_conversation)), p = C(
      () => Math.max(tw, m.value.length * ew + 32)
    ), f = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : m.value.reduce((_, w) => _ + w.conversations, 0)), b = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : m.value.reduce((_, w) => _ + w.total_cost, 0)), v = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : f.value === 0 ? 0 : b.value / f.value), y = C(() => {
      const _ = m.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const w = _.map((D) => u(D)), $ = _.map((D) => D.avg_cost_per_conversation), M = _.map((D) => g(D));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: $,
            backgroundColor: M.map((D) => `${D}80`),
            borderColor: M,
            borderWidth: 1
          }
        ]
      };
    }), k = C(() => n.options ? n.options : {
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
              const w = m.value[_[0]?.dataIndex];
              return w ? u(w) : "";
            },
            label: function(_) {
              const w = m.value[_.dataIndex];
              return [
                `Cost: ${Ie(_.parsed.x)}`,
                `Conversations: ${ge(w.conversations)}`,
                `Total Cost: ${Ie(w.total_cost)}`
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
    return t({ isDark: i }), (_, w) => (h(), te(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (h(), te(T(ze), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: E(() => [
        d("div", U2, [
          d("div", Y2, [
            y.value.labels && y.value.labels.length ? (h(), x("section", q2, [
              d("div", X2, [
                z($t, {
                  data: y.value,
                  options: k.value,
                  "height-px": p.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              d("footer", G2, [
                z(T(ve), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                z(T(ve), {
                  title: "Total Conversations",
                  value: T(ge)(f.value)
                }, null, 8, ["value"]),
                z(T(ve), {
                  title: "Total Cost",
                  value: T(Ie)(b.value)
                }, null, 8, ["value"]),
                z(T(ve), {
                  title: "Avg Cost / Conv.",
                  value: T(Ie)(v.value)
                }, null, 8, ["value"])
              ])
            ])) : (h(), x("section", Z2, [
              d("div", Q2, [
                d("div", J2, [
                  z(T(dt), { class: "empty-icon" })
                ]),
                w[0] || (w[0] = d("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                w[1] || (w[1] = d("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), nw = /* @__PURE__ */ be(aw, [["__scopeId", "data-v-2a8f51ca"]]);
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
    const m = l(u, o + g), p = Oo(u, s), f = p.length > 0, b = i.has(m);
    c.push({
      row: u,
      key: m,
      depth: a,
      hasChildren: f,
      isExpanded: b,
      parentKey: n
    }), f && b && (r === void 0 || a < r) && c.push(
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
const ow = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, sw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, iw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, lw = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, rw = ["checked", "aria-label"], cw = ["aria-sort", "onClick"], dw = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, uw = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, hw = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, fw = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, gw = ["checked", "aria-label", "onChange"], mw = ["aria-expanded", "aria-label", "onClick"], pw = ["aria-expanded", "aria-label", "onClick"], bw = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, vw = { class: "min-w-0 flex-1" }, yw = /* @__PURE__ */ fe({
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
      resolveRowKey: f,
      maxDepth: a.maxDepth
    })), u = C(() => {
      const { sortKey: L, sortDirection: K, sortCompare: Y, rows: N } = a;
      return !L || !K || !Y ? N : a.expandable ? Rl(N, {
        childrenKey: a.childrenKey,
        sortKey: L,
        sortDirection: K,
        compare: Y
      }) : [...N].sort((ie, ce) => Y(ie, ce, L, K));
    }), g = C(() => a.expandable ? Pl(u.value, c.value) : u.value.map((L, K) => ({
      row: L,
      key: f(L, K),
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
    function f(L, K) {
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
    function k(L) {
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
    function w(L) {
      if (!k(L)) return;
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
    function M(L, K) {
      return a.isRowSelectable?.(L, K) ?? !0;
    }
    function D(L) {
      return M(L.row, $(L));
    }
    function P(L) {
      return a.selectable && k(L) && !D(L);
    }
    function V(L) {
      return k(L) && !P(L);
    }
    function j(L) {
      return V(L) ? !1 : L.depth > 0 ? !0 : a.selectable && !k(L);
    }
    const S = C(() => {
      const { isRowSelectable: L } = a;
      return a.expandable ? Il(u.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: f,
        isRowSelectable: L
      }) : u.value.map((K, Y) => ({
        row: K,
        key: f(K, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: K, context: Y }) => M(K, Y)).map(({ key: K }) => K);
    });
    function R(L) {
      const K = String(L);
      return a.selectedKeys.some((Y) => String(Y) === K);
    }
    const B = C(() => !a.selectable || S.value.length === 0 ? !1 : S.value.every(
      (L) => a.selectedKeys.some((K) => String(K) === String(L))
    )), H = C(() => {
      if (!a.selectable || S.value.length === 0) return !1;
      const L = S.value.filter(
        (K) => a.selectedKeys.some((Y) => String(Y) === String(K))
      );
      return L.length > 0 && L.length < S.value.length;
    });
    Te(
      [H, B, () => a.selectable],
      async () => {
        await Ke();
        const L = o.value;
        L && (L.indeterminate = H.value && !B.value);
      },
      { immediate: !0 }
    );
    function W() {
      if (a.selectable)
        if (B.value) {
          const L = new Set(
            S.value.map((Y) => String(Y))
          ), K = a.selectedKeys.filter(
            (Y) => !L.has(String(Y))
          );
          n("update:selectedKeys", K);
        } else {
          const L = new Set(a.selectedKeys.map((K) => String(K)));
          S.value.forEach((K) => L.add(String(K))), n("update:selectedKeys", [...L]);
        }
    }
    function J(L) {
      if (!a.selectable) return;
      const K = String(L), Y = g.value.find((ie) => String(ie.key) === K);
      if (Y && !D(Y) || !Y && !S.value.some((ie) => String(ie) === K))
        return;
      a.selectedKeys.some((ie) => String(ie) === K) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((ie) => String(ie) !== K)
      ) : n("update:selectedKeys", [...a.selectedKeys, K]);
    }
    function re(L) {
      return `${a.ariaLabelSelectRow} ${L}`;
    }
    function ue(L) {
      n("sort", L);
    }
    function q(L) {
      return a.sortKey === L && a.sortDirection != null;
    }
    function ne(L) {
      return q(L) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, K) => (h(), x("div", ow, [
      d("div", sw, [
        d("table", {
          class: Z([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          d("thead", null, [
            d("tr", iw, [
              e.selectable ? (h(), x("th", lw, [
                d("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: W
                }, null, 40, rw)
              ])) : O("", !0),
              (h(!0), x(he, null, pe(e.columns, (Y) => (h(), x("th", {
                key: Y.key,
                scope: "col",
                class: Z([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  y(Y.key) && e.selectable ? "!pl-0" : "",
                  p(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (h(), x("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", p(Y.align)]),
                  "aria-sort": ne(Y.key),
                  onClick: (N) => ue(Y.key)
                }, [
                  d("span", null, A(Y.label), 1),
                  d("span", dw, [
                    q(Y.key) ? (h(), x(he, { key: 0 }, [
                      e.sortDirection === "asc" ? (h(), x("span", uw, "↑")) : e.sortDirection === "desc" ? (h(), x("span", hw, "↓")) : O("", !0)
                    ], 64)) : (h(), x(he, { key: 1 }, [
                      K[0] || (K[0] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      K[1] || (K[1] = d("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, cw)) : (h(), x(he, { key: 1 }, [
                  Ae(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          d("tbody", null, [
            (h(!0), x(he, null, pe(g.value, (Y) => (h(), x("tr", {
              key: Y.key,
              class: Z([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (h(), x("td", fw, [
                D(Y) ? (h(), x("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: R(Y.key),
                  "aria-label": re(Y.key),
                  onChange: (N) => J(Y.key)
                }, null, 40, gw)) : P(Y) ? (h(), x("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Be((N) => w(Y), ["stop"])
                }, [
                  z(T(na), {
                    class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, mw)) : O("", !0)
              ])) : O("", !0),
              (h(!0), x(he, null, pe(e.columns, (N) => (h(), x("td", {
                key: N.key,
                class: Z([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  y(N.key) ? "pl-0 pr-2" : "px-2",
                  p(N.align),
                  N.cellClass ?? ""
                ])
              }, [
                y(N.key) ? (h(), x("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: _e({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  ke(L.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => w(Y)
                  }, () => [
                    V(Y) ? (h(), x("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Be((ie) => w(Y), ["stop"])
                    }, [
                      z(T(na), {
                        class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, pw)) : j(Y) ? (h(), x("span", bw)) : O("", !0)
                  ], !0),
                  d("div", vw, [
                    ke(L.$slots, m(N.key), yt({ ref_for: !0 }, _(Y, N)), () => [
                      Ae(A(v(b(Y.row, N.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(L.$slots, m(N.key), yt({
                  key: 1,
                  ref_for: !0
                }, _(Y, N)), () => [
                  Ae(A(v(b(Y.row, N.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), xw = /* @__PURE__ */ be(yw, [["__scopeId", "data-v-b3104817"]]), pi = /* @__PURE__ */ fe({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (h(), x("svg", {
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
}), kw = ["disabled", "aria-expanded", "aria-label"], _w = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, ww = { class: "min-w-0 truncate" }, Cw = ["disabled", "onClick", "onMouseenter"], $w = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Sw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Mw = { class: "min-w-0 flex-1 text-left" }, Dw = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Aw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Tw = ["disabled", "aria-expanded", "aria-label"], Bw = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, Lw = ["disabled", "onClick", "onMouseenter"], Rw = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, Pw = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Iw = { class: "min-w-0 flex-1 text-left" }, Ew = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Fw = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Ow = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, Vw = ["type", "disabled", "aria-busy", "aria-label"], Nw = {
  key: 2,
  class: "min-w-0 truncate"
}, zw = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, jw = ["type", "disabled", "aria-busy", "aria-label"], Hw = {
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
    }), f = C(() => {
      const { class: L, type: K, "aria-label": Y, ...N } = o;
      return N;
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
    ]), v = `kiut-button-menu-${We()}`, y = `${v}-btn`, k = `${v}-menu`, _ = oe(null), w = oe(null), $ = oe(null), M = oe(!1), D = oe(0), P = oe({}), V = C(() => a.options.filter((L) => !L.disabled));
    function j(L) {
      return `${L.value}-${L.label}`;
    }
    function S() {
      const L = w.value;
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
    function B() {
      M.value = !1;
    }
    function H() {
      S(), D.value = 0, Ke(() => $.value?.focus());
    }
    function W() {
      if (!a.disabled) {
        if (M.value) {
          B();
          return;
        }
        M.value = !0, H();
      }
    }
    function J(L) {
      L.disabled || (n("select", L), B());
    }
    function re(L) {
      L.stopPropagation(), W();
    }
    function ue(L) {
      if (!M.value) return;
      const K = L.target, Y = _.value, N = $.value;
      Y && !Y.contains(K) && (!N || !N.contains(K)) && B();
    }
    function q(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), M.value || (M.value = !0, H()));
    }
    function ne(L) {
      const K = V.value;
      if (L.key === "Escape") {
        L.preventDefault(), B(), w.value?.focus();
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
          Y && J(Y);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", ue);
    }), lt(() => {
      document.removeEventListener("click", ue);
    }), (L, K) => i.value ? (h(), x("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: w,
        id: y,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": m.value
      }, f.value, {
        onClick: re,
        onKeydown: q
      }), [
        L.$slots.icon ? (h(), x("span", _w, [
          ke(L.$slots, "icon")
        ])) : O("", !0),
        d("span", ww, [
          ke(L.$slots, "default")
        ]),
        z(T(na), {
          class: Z(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", M.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, kw),
      (h(), te(ea, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: _e(P.value),
          onKeydown: Be(ne, ["stop"])
        }, [
          (h(!0), x(he, null, pe(V.value, (Y, N) => (h(), x("button", {
            key: j(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(R(N)),
            onClick: Be((ie) => J(Y), ["stop"]),
            onMouseenter: (ie) => D.value = N
          }, [
            Y.icon ? (h(), x("span", $w, [
              (h(), te(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (h(), x("span", Sw)),
            d("span", Mw, [
              d("span", Dw, A(Y.label), 1),
              Y.description ? (h(), x("span", Aw, A(Y.description), 1)) : O("", !0)
            ])
          ], 42, Cw))), 128))
        ], 36), [
          [Ht, M.value]
        ])
      ]))
    ], 512)) : l.value ? (h(), x("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      d("button", yt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, T(o).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": k,
        "aria-label": m.value
      }, f.value, {
        onClick: re,
        onKeydown: q
      }), [
        L.$slots.icon ? (h(), x("span", Bw, [
          ke(L.$slots, "icon")
        ])) : O("", !0)
      ], 16, Tw),
      (h(), te(ea, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: $,
          id: k,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: _e(P.value),
          onKeydown: Be(ne, ["stop"])
        }, [
          (h(!0), x(he, null, pe(V.value, (Y, N) => (h(), x("button", {
            key: j(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(R(N)),
            onClick: Be((ie) => J(Y), ["stop"]),
            onMouseenter: (ie) => D.value = N
          }, [
            Y.icon ? (h(), x("span", Rw, [
              (h(), te(rt(Y.icon), { class: "h-5 w-5" }))
            ])) : (h(), x("span", Pw)),
            d("span", Iw, [
              d("span", Ew, A(Y.label), 1),
              Y.description ? (h(), x("span", Fw, A(Y.description), 1)) : O("", !0)
            ])
          ], 42, Lw))), 128))
        ], 36), [
          [Ht, M.value]
        ])
      ]))
    ], 512)) : s.value ? (h(), x("span", Ow, [
      d("button", yt({
        type: p.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [g.value, b.value, T(o).class]],
        disabled: u.value,
        "aria-busy": e.loading || void 0,
        "aria-label": m.value
      }, f.value), [
        e.loading ? (h(), te(pi, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : L.$slots.icon ? (h(), x("span", {
          key: 1,
          class: Z(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(L.$slots, "icon")
        ], 2)) : O("", !0),
        c.value ? (h(), x("span", Nw, [
          ke(L.$slots, "default")
        ])) : O("", !0)
      ], 16, Vw),
      d("span", zw, A(e.tooltip), 1)
    ])) : (h(), x("button", yt({
      key: 3,
      type: p.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [g.value, b.value, T(o).class]],
      disabled: u.value,
      "aria-busy": e.loading || void 0,
      "aria-label": m.value
    }, f.value), [
      e.loading ? (h(), te(pi, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : L.$slots.icon ? (h(), x("span", {
        key: 1,
        class: Z(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(L.$slots, "icon")
      ], 2)) : O("", !0),
      c.value ? (h(), x("span", Hw, [
        ke(L.$slots, "default")
      ])) : O("", !0)
    ], 16, jw));
  }
}), Ww = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Kw = { class: "sr-only" }, El = /* @__PURE__ */ fe({
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
    return (s, i) => (h(), x("button", {
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
      d("span", Kw, A(e.ariaLabel), 1)
    ], 42, Ww));
  }
}), Uw = {
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
}, Yw = [
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
], MM = [
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
], qw = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Xw = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Gw = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, Zw = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Qw = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, Jw = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, e5 = ["aria-expanded", "aria-label", "onClick"], t5 = { class: "min-w-0 flex-1" }, a5 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, n5 = ["colspan"], o5 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, s5 = ["aria-label"], i5 = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, l5 = {
  key: 2,
  class: "space-y-2"
}, r5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, c5 = ["title"], d5 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, u5 = { class: "ml-auto flex shrink-0 items-center gap-2" }, h5 = /* @__PURE__ */ fe({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => Yw },
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
      set(S) {
        o.value = S, n("update:expandedKeys", S);
      }
    }), i = C(() => ({
      ...Uw,
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
    function c(S) {
      return `cell-${S}`;
    }
    function u(S, R, B) {
      return {
        row: S,
        column: R,
        index: B,
        expanded: b(S, B)
      };
    }
    function g(S) {
      const R = S.key;
      return S.label ? S.label : R in i.value ? i.value[R] : S.key;
    }
    function m(S) {
      return S === "center" ? "text-center" : S === "right" ? "text-right" : "text-left";
    }
    function p(S) {
      return S === l.value;
    }
    function f(S, R) {
      if (typeof a.rowKey == "function")
        return a.rowKey(S);
      const B = S[a.rowKey];
      return B != null ? String(B) : `__index_${R}`;
    }
    function b(S, R) {
      return s.value.includes(f(S, R));
    }
    function v(S) {
      return S.versionsLoading === !0;
    }
    function y(S, R) {
      const B = f(S, R), H = new Set(s.value);
      H.has(B) ? (H.delete(B), n("collapse", B, S)) : (a.singleExpand && H.clear(), H.add(B), n("expand", B, S)), s.value = [...H];
    }
    function k(S) {
      return S.type ?? S.key;
    }
    function _(S) {
      return r[S] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function w(S) {
      return S === "published" ? "success" : "warning";
    }
    function $(S) {
      const R = S instanceof Date ? S : new Date(S);
      return Number.isNaN(R.getTime()) ? String(S) : R.toLocaleDateString("es-ES");
    }
    function M(S) {
      const R = S instanceof Date ? S : new Date(S);
      return Number.isNaN(R.getTime()) ? String(S) : R.toLocaleString("es-ES");
    }
    function D(S) {
      return He("div", { class: "min-w-0" }, [
        He(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          S.name
        ),
        S.description ? He(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          S.description
        ) : null
      ]);
    }
    function P(S) {
      return S.method ? He(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            _(S.method)
          ]
        },
        S.method
      ) : null;
    }
    function V(S, R) {
      const B = R.actions ?? ["view", "edit"], H = [];
      for (const W of B)
        W === "view" ? H.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", S)
            },
            { icon: () => He(di, { class: "h-4 w-4" }) }
          )
        ) : W === "run" ? H.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", S)
            },
            { icon: () => He(lp, { class: "h-4 w-4" }) }
          )
        ) : W === "edit" ? H.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", S)
            },
            { icon: () => He(ip, { class: "h-4 w-4" }) }
          )
        ) : W === "createDraft" ? H.push(
          He(
            Mt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", S)
            },
            { icon: () => He(ci, { class: "h-4 w-4" }) }
          )
        ) : W === "delete" && H.push(
          He(
            Mt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", S)
            },
            { icon: () => He(rp, { class: "h-4 w-4" }) }
          )
        );
      return He(
        "div",
        { class: "flex items-center justify-end gap-1" },
        H
      );
    }
    function j(S, R, B) {
      switch (k(R)) {
        case "name":
          return D(S);
        case "method":
          return P(S);
        case "url":
          return S.url ? He(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: S.url
            },
            S.url
          ) : null;
        case "status":
          return He(
            Ge,
            { color: w(S.status), outlined: !1 },
            () => S.status
          );
        case "version":
          return He("span", {}, S.version);
        case "updated":
          return He(
            "span",
            { class: "whitespace-nowrap text-xs" },
            $(S.updatedAt)
          );
        case "active":
          return He(El, {
            modelValue: S.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (W) => n("toggleActive", S, W)
          });
        case "actions":
          return V(S, R);
        default:
          return He("span", {}, String(S[R.key] ?? ""));
      }
    }
    return (S, R) => (h(), x("div", qw, [
      d("div", Xw, [
        d("table", Gw, [
          d("thead", null, [
            d("tr", Zw, [
              (h(!0), x(he, null, pe(e.columns, (B) => (h(), x("th", {
                key: B.key,
                scope: "col",
                class: Z([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  m(B.align),
                  B.headerClass ?? ""
                ])
              }, A(g(B)), 3))), 128))
            ])
          ]),
          d("tbody", null, [
            (h(!0), x(he, null, pe(e.rows, (B, H) => (h(), x(he, {
              key: f(B, H)
            }, [
              d("tr", Qw, [
                (h(!0), x(he, null, pe(e.columns, (W) => (h(), x("td", {
                  key: W.key,
                  class: Z([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    m(W.align),
                    W.cellClass ?? ""
                  ])
                }, [
                  ke(S.$slots, c(W.key), yt({ ref_for: !0 }, u(B, W, H)), () => [
                    p(W.key) ? (h(), x("div", Jw, [
                      d("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": b(B, H),
                        "aria-label": b(B, H) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (J) => y(B, H)
                      }, [
                        z(T(na), {
                          class: Z(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !b(B, H) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, e5),
                      d("div", t5, [
                        (h(), te(rt(() => j(B, W))))
                      ])
                    ])) : (h(), te(rt(() => j(B, W)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              b(B, H) ? (h(), x("tr", a5, [
                d("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  d("h4", o5, A(i.value.historialTitle), 1),
                  v(B) ? (h(), x("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (h(!0), x(he, null, pe(e.historySkeletonCount, (W) => (h(), x("div", {
                      key: W,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...R[0] || (R[0] = [
                      eo('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, s5)) : B.versions?.length ? (h(), x("div", l5, [
                    (h(!0), x(he, null, pe(B.versions, (W) => (h(), x("div", {
                      key: W.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(S.$slots, "history-item", {
                        version: W,
                        row: B
                      }, () => [
                        z(Ge, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: E(() => [
                            Ae(A(W.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        d("span", r5, A(W.version), 1),
                        W.method ? (h(), x("span", {
                          key: 0,
                          class: Z(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(W.method)])
                        }, A(W.method), 3)) : O("", !0),
                        W.url ? (h(), x("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: W.url
                        }, A(W.url), 9, c5)) : O("", !0),
                        d("span", d5, A(M(W.updatedAt)), 1)
                      ], !0),
                      d("div", u5, [
                        ke(S.$slots, "history-actions", {
                          version: W,
                          row: B
                        }, () => [
                          z(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (J) => n("viewVersion", W, B)
                          }, {
                            icon: E(() => [
                              z(T(di), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          z(Mt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (J) => n("createDraftFromVersion", W, B)
                          }, {
                            icon: E(() => [
                              z(T(ci), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (h(), x("p", i5, A(i.value.emptyHistory), 1))
                ], 8, n5)
              ])) : O("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), f5 = /* @__PURE__ */ be(h5, [["__scopeId", "data-v-177ecafb"]]);
function bi(e, t) {
  return h(), x("svg", {
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
function g5(e, t) {
  return h(), x("svg", {
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
function m5(e, t) {
  return h(), x("svg", {
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
function p5(e, t) {
  return h(), x("svg", {
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
function b5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function v5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" })
  ]);
}
function y5(e, t) {
  return h(), x("svg", {
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
function x5(e, t) {
  return h(), x("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    d("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const k5 = ["aria-label"], _5 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, w5 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, C5 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, $5 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], S5 = { class: "truncate" }, M5 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, D5 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, A5 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, T5 = ["aria-label", "onClick"], B5 = ["aria-label", "onClick"], L5 = ["aria-label"], R5 = ["aria-label"], P5 = {
  key: 1,
  class: "space-y-2"
}, I5 = ["for"], E5 = ["id", "placeholder", "onKeydown"], F5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, O5 = ["aria-label"], V5 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, N5 = ["checked", "onChange"], z5 = { class: "min-w-0 flex-1" }, j5 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, H5 = { class: "flex flex-wrap items-end gap-2" }, W5 = { class: "min-w-[120px] flex-1" }, K5 = ["for"], U5 = ["id"], Y5 = { class: "min-w-[120px] flex-1" }, q5 = ["for"], X5 = ["id"], G5 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = ho(), i = `${`kiut-filters-${We()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), u = oe(!1), g = oe({}), m = oe(null), p = oe(""), f = oe([]), b = oe(""), v = oe(""), y = C(() => c.value ? a.filterDefinitions.find((F) => F.id === c.value) ?? null : null), k = C(() => {
      const F = y.value;
      if (F)
        return F.type === "text" ? p.value : F.type === "select" ? f.value : { start: b.value, end: v.value };
    });
    function _(F, Q) {
      Q && Q instanceof HTMLElement ? r.set(F, Q) : r.delete(F);
    }
    function w(F) {
      return a.modelValue[F];
    }
    function $(F) {
      if (F == null) return [];
      if (Array.isArray(F))
        return F.filter((Q) => typeof Q == "string" && Q.trim() !== "");
      if (typeof F == "string") {
        const Q = F.trim();
        return Q ? [Q] : [];
      }
      return [];
    }
    function M(F, Q) {
      if (Q == null) return !0;
      if (F.type === "text") return String(Q).trim() === "";
      if (F.type === "select") return $(Q).length === 0;
      if (F.type === "dateRange") {
        const se = Q;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const D = C(
      () => a.filterDefinitions.some((F) => !M(F, w(F.id)))
    ), P = C(() => {
      const F = [];
      for (const Q of a.filterDefinitions) {
        const se = w(Q.id);
        if (!M(Q, se)) {
          if (Q.type === "text")
            F.push({ kind: "text", def: Q, key: Q.id });
          else if (Q.type === "dateRange")
            F.push({ kind: "dateRange", def: Q, key: Q.id });
          else if (Q.type === "select")
            for (const me of $(se))
              F.push({
                kind: "select",
                def: Q,
                optionValue: me,
                key: `${Q.id}::${me}`
              });
        }
      }
      return F;
    });
    function V(F) {
      return F.type !== "select" ? 0 : $(w(F.id)).length;
    }
    function j(F) {
      const Q = w(F.id), se = F.label.replace(/^\+\s*/, "");
      if (F.type === "text") return `${se}: ${String(Q ?? "").trim()}`;
      if (F.type === "select") {
        const Pe = $(Q).map((qe) => F.options.find((pa) => pa.value === qe)?.label ?? qe);
        return `${se}: ${Pe.join(", ")}`;
      }
      const me = Q, Ce = R(me.start), we = R(me.end);
      return `${se}: ${Ce} – ${we}`;
    }
    function S(F) {
      return F.kind === "text" || F.kind === "dateRange" ? j(F.def) : F.def.options.find((se) => se.value === F.optionValue)?.label ?? F.optionValue;
    }
    function R(F) {
      if (!F) return "";
      const Q = Ne(F, "YYYY-MM-DD", !0);
      return Q.isValid() ? Q.format("L") : F;
    }
    function B(F) {
      const Q = c.value === F.id && u.value, se = !M(F, w(F.id));
      return Q || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function H(F) {
      return M(F, w(F.id)) ? ae(F) : `Editar filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    function W(F) {
      const Q = w(F.id);
      if (F.type === "text") {
        p.value = Q != null ? String(Q) : "";
        return;
      }
      if (F.type === "select") {
        f.value = [...$(Q)];
        return;
      }
      const se = Q;
      b.value = se?.start?.trim() ?? "", v.value = se?.end?.trim() ?? "";
    }
    function J() {
      const F = y.value;
      if (!F || F.type !== "select") return;
      const Q = { ...a.modelValue };
      f.value.length === 0 ? delete Q[F.id] : Q[F.id] = [...f.value], n("update:modelValue", Q), n("change", Q);
    }
    function re(F) {
      const Q = f.value.indexOf(F);
      Q >= 0 ? f.value = f.value.filter((se, me) => me !== Q) : f.value = [...f.value, F], J();
    }
    function ue(F) {
      if (!F) return;
      m.value = F;
      const Q = F.getBoundingClientRect(), se = 300;
      let me = Q.left;
      const Ce = window.innerWidth - se - 12;
      me > Ce && (me = Math.max(12, Ce)), me < 12 && (me = 12);
      const we = Q.bottom + 8;
      g.value = {
        top: `${we}px`,
        left: `${me}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function q(F, Q) {
      if (c.value === F.id && u.value) {
        N();
        return;
      }
      u.value && c.value !== F.id && N(), c.value = F.id, u.value = !0, W(F), Ke().then(async () => {
        ue(Q.currentTarget), await Ke(), L();
      });
    }
    function ne(F, Q) {
      if (c.value === F.id && u.value) {
        N();
        return;
      }
      u.value && c.value !== F.id && N(), c.value = F.id, u.value = !0, W(F), Ke().then(async () => {
        const se = r.get(F.id) ?? Q.currentTarget;
        ue(se), await Ke(), L();
      });
    }
    function L() {
      const F = l.value;
      if (!F) return;
      F.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function K() {
      u.value = !1, c.value = null, m.value = null;
    }
    function Y(F) {
      const Q = y.value;
      if (!Q) return;
      if (Q.type === "text") {
        p.value = F != null ? String(F) : "";
        return;
      }
      if (Q.type === "select") {
        f.value = Array.isArray(F) ? F.filter((me) => typeof me == "string") : $(F);
        return;
      }
      const se = F;
      b.value = se?.start?.trim() ?? "", v.value = se?.end?.trim() ?? "";
    }
    function N() {
      const F = y.value;
      if (!F) return;
      if (F.type === "text") {
        const Ce = p.value.trim(), we = { ...a.modelValue };
        Ce === "" ? delete we[F.id] : we[F.id] = Ce, n("update:modelValue", we), n("change", we), K();
        return;
      }
      if (F.type === "select") {
        J(), K();
        return;
      }
      const Q = b.value.trim(), se = v.value.trim(), me = { ...a.modelValue };
      !Q || !se || Q > se ? delete me[F.id] : me[F.id] = { start: Q, end: se }, n("update:modelValue", me), n("change", me), K();
    }
    function ie(F) {
      const Q = { ...a.modelValue };
      delete Q[F], n("update:modelValue", Q), n("change", Q), c.value === F && K();
    }
    function ce(F) {
      if (F.kind === "text" || F.kind === "dateRange") {
        ie(F.def.id);
        return;
      }
      const Q = { ...a.modelValue }, me = $(Q[F.def.id]).filter((Ce) => Ce !== F.optionValue);
      me.length === 0 ? delete Q[F.def.id] : Q[F.def.id] = me, n("update:modelValue", Q), n("change", Q), c.value === F.def.id && W(F.def);
    }
    function ye() {
      const F = {};
      n("update:modelValue", F), n("change", F), K();
    }
    const U = C(() => {
      const F = y.value;
      return F ? `Editar filtro: ${F.label}` : "Filtro";
    });
    function le(F) {
      const Q = F.def.label.replace(/^\+\s*/, "");
      return F.kind === "select" ? `Quitar ${F.def.options.find((Ce) => Ce.value === F.optionValue)?.label ?? F.optionValue} del filtro ${Q}` : `Quitar filtro ${Q}`;
    }
    function de(F) {
      const Q = F.def.label.replace(/^\+\s*/, "");
      if (F.kind === "select") {
        const me = F.def.options.find((Ce) => Ce.value === F.optionValue)?.label ?? F.optionValue;
        return `Editar filtro ${Q}: ${me}`;
      }
      return `Editar filtro ${Q}`;
    }
    function ae(F) {
      return `Añadir filtro ${F.label.replace(/^\+\s*/, "")}`;
    }
    const X = C(() => a.clearLabel);
    function I(F) {
      if (!u.value || !l.value) return;
      const Q = F.target;
      if (!(l.value.contains(Q) || (Q instanceof Element ? Q : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const me of r.values())
          if (me?.contains(Q)) return;
        N();
      }
    }
    function G(F) {
      F.key === "Escape" && u.value && (F.preventDefault(), K());
    }
    function ee() {
      !u.value || !m.value || ue(m.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", I, !0), window.addEventListener("keydown", G, !0), window.addEventListener("resize", ee);
    }), _i(() => {
      document.removeEventListener("mousedown", I, !0), window.removeEventListener("keydown", G, !0), window.removeEventListener("resize", ee);
    }), Te(
      () => a.modelValue,
      () => {
        const F = y.value;
        F && u.value && !o.panel && W(F);
      },
      { deep: !0 }
    ), (F, Q) => (h(), x("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      d("div", _5, [
        d("span", w5, A(e.label), 1),
        d("div", C5, [
          (h(!0), x(he, null, pe(e.filterDefinitions, (se) => (h(), x("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (me) => _(se.id, me),
            type: "button",
            class: Z(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(se)]),
            "aria-label": H(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (me) => ne(se, me)
          }, [
            z(T(b5), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            d("span", S5, A(se.label), 1),
            se.type === "select" && V(se) > 0 ? (h(), x("span", M5, A(V(se)), 1)) : O("", !0)
          ], 10, $5))), 128))
        ])
      ]),
      D.value ? (h(), x("div", D5, [
        d("div", A5, [
          (h(!0), x(he, null, pe(P.value, (se) => (h(), x("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            d("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(se),
              onClick: (me) => q(se.def, me)
            }, [
              ke(F.$slots, "formatChip", {
                filter: se.def,
                value: w(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                Ae(A(S(se)), 1)
              ], !0)
            ], 8, T5),
            d("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": le(se),
              onClick: (me) => ce(se)
            }, [
              z(T(x5), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, B5)
          ]))), 128))
        ]),
        d("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": X.value,
          onClick: ye
        }, A(e.clearLabel), 9, L5)
      ])) : O("", !0),
      (h(), te(ea, { to: "body" }, [
        c.value && u.value ? (h(), x("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": U.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: _e(g.value),
          onKeydown: Q[3] || (Q[3] = Be(() => {
          }, ["stop"]))
        }, [
          y.value ? (h(), x(he, { key: 0 }, [
            F.$slots.panel ? ke(F.$slots, "panel", {
              key: 0,
              filter: y.value,
              close: N,
              value: k.value,
              updateValue: Y
            }, void 0, !0) : (h(), x("div", P5, [
              y.value.type === "text" ? (h(), x(he, { key: 0 }, [
                d("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(y.value.label), 9, I5),
                Xe(d("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Q[0] || (Q[0] = (se) => p.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: y.value.placeholder ?? "…",
                  onKeydown: Ca(Be(N, ["prevent"]), ["enter"])
                }, null, 40, E5), [
                  [Pt, p.value]
                ])
              ], 64)) : y.value.type === "select" ? (h(), x(he, { key: 1 }, [
                d("p", F5, A(y.value.label), 1),
                d("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": y.value.label,
                  "aria-multiselectable": !0
                }, [
                  (h(!0), x(he, null, pe(y.value.options, (se) => (h(), x("li", {
                    key: se.value
                  }, [
                    d("label", V5, [
                      d("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(se.value),
                        onChange: (me) => re(se.value)
                      }, null, 40, N5),
                      d("span", z5, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, O5)
              ], 64)) : y.value.type === "dateRange" ? (h(), x(he, { key: 2 }, [
                d("p", j5, A(y.value.label), 1),
                d("div", H5, [
                  d("div", W5, [
                    d("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, K5),
                    Xe(d("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Q[1] || (Q[1] = (se) => b.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, U5), [
                      [Pt, b.value]
                    ])
                  ]),
                  d("div", Y5, [
                    d("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, q5),
                    Xe(d("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Q[2] || (Q[2] = (se) => v.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, X5), [
                      [Pt, v.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, R5)) : O("", !0)
      ]))
    ], 8, k5));
  }
}), Z5 = /* @__PURE__ */ be(G5, [["__scopeId", "data-v-f38e0100"]]), Q5 = { class: "font-sans" }, J5 = ["for"], eC = { class: "relative" }, tC = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], aC = ["id"], Fl = /* @__PURE__ */ fe({
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
      const k = y.target.value;
      u.value = k, n("update:modelValue", k);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(y);
    }
    function f(y) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(y);
    }
    function b(y) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(y);
    }
    const v = C(() => {
      const { name: y, id: k, type: _, ...w } = o;
      return w;
    });
    return (y, k) => (h(), x("div", Q5, [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(T(ht))
      }, A(e.label), 11, J5)) : O("", !0),
      d("div", eC, [
        e.icon ? (h(), te(rt(e.icon), {
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
            T(et),
            e.icon ? "pl-10" : "",
            m.value ? T(At) : ""
          ],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: g.value,
          "aria-invalid": m.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: p,
          onChange: f,
          onBlur: b
        }), null, 16, tC)
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, aC)) : O("", !0)
    ]));
  }
}), nC = { class: "font-sans" }, oC = ["for"], sC = { class: "relative" }, iC = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], lC = ["aria-label"], rC = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, cC = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, dC = ["id"], uC = /* @__PURE__ */ fe({
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
      (k) => {
        k !== void 0 && k !== g.value && (g.value = k);
      }
    ), Je(() => {
      s && c.value && s.register?.(c.value, {});
    }), lt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const m = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? g.value : g.value), p = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function f(k) {
      const _ = k.target.value;
      g.value = _, n("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(k);
    }
    function b(k) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(k);
    }
    function v(k) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(k);
    }
    const y = C(() => {
      const { name: k, id: _, ...w } = o;
      return w;
    });
    return (k, _) => (h(), x("div", nC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(T(ht))
      }, A(e.label), 11, oC)) : O("", !0),
      d("div", sC, [
        d("input", yt(y.value, {
          id: l.value,
          name: c.value,
          type: u.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(et), p.value ? T(At) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": p.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: f,
          onChange: b,
          onBlur: v
        }), null, 16, iC),
        d("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => u.value = !u.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": u.value ? "Hide password" : "Show password"
        }, [
          u.value ? (h(), x("svg", cC, [..._[2] || (_[2] = [
            d("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (h(), x("svg", rC, [..._[1] || (_[1] = [
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
        ], 8, lC)
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, dC)) : O("", !0)
    ]));
  }
}), hC = { class: "font-sans" }, fC = ["for"], gC = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], mC = ["id"], pC = /* @__PURE__ */ fe({
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
    return (r, c) => (h(), x("div", hC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ht))
      }, A(e.label), 11, fC)) : O("", !0),
      Xe(d("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: Z([T(wb), e.invalid ? T(At) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, gC), [
        [Pt, l.value]
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, mC)) : O("", !0)
    ]));
  }
}), bC = { class: "font-sans" }, vC = ["for"], yC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], xC = ["for"], kC = ["title"], _C = ["aria-label"], wC = {
  key: 2,
  class: "space-y-3"
}, CC = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], $C = ["for"], SC = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, MC = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, DC = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, AC = { class: "flex items-start gap-2" }, TC = { class: "min-w-0 flex-1 space-y-2" }, BC = { class: "flex items-center gap-2" }, LC = ["title"], RC = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, PC = ["aria-label", "onClick"], IC = ["id"], EC = /* @__PURE__ */ fe({
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
    function f(D) {
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
    function k(D) {
      const V = D.target.files?.[0] ?? null;
      n("update:modelValue", V);
    }
    function _(D) {
      const P = D.target, V = Array.from(P.files ?? []);
      if (V.length === 0) return;
      const j = [...c.value];
      for (const S of V) {
        if (j.length >= a.maxFiles) break;
        v(j, S) || j.push(b(S));
      }
      n("update:modelValue", j), y();
    }
    function w() {
      n("update:modelValue", null), y();
    }
    function $(D) {
      n(
        "update:modelValue",
        c.value.filter((P) => P.id !== D)
      );
    }
    function M(D, P) {
      n(
        "update:modelValue",
        c.value.map(
          (V) => V.id === D ? { ...V, description: P } : V
        )
      );
    }
    return (D, P) => (h(), x("div", bC, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ht))
      }, A(e.label), 11, vC)) : O("", !0),
      e.multiple ? (h(), x("div", wC, [
        d("div", {
          class: Z([
            T(et),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? T(At) : "",
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
          }, null, 40, CC),
          d("label", {
            for: s.value,
            class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || g.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            z(T(ro), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, $C),
          d("span", SC, A(m.value), 1),
          e.filesCountLabel ? (h(), x("span", MC, A(e.filesCountLabel), 1)) : O("", !0)
        ], 2),
        c.value.length > 0 ? (h(), x("ul", DC, [
          (h(!0), x(he, null, pe(c.value, (V) => (h(), x("li", {
            key: V.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            d("div", AC, [
              z(T(op), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              d("div", TC, [
                d("div", BC, [
                  d("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: V.file.name
                  }, A(V.file.name), 9, LC),
                  d("span", RC, A(f(V.file.size)), 1),
                  e.disabled ? O("", !0) : (h(), x("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (j) => $(V.id)
                  }, [
                    z(T(co), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, PC))
                ]),
                e.showDescriptions ? (h(), te(Fl, {
                  key: 0,
                  "model-value": V.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: p(V),
                  "error-text": p(V) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (j) => M(V.id, j)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : O("", !0)
              ])
            ])
          ]))), 128))
        ])) : O("", !0)
      ])) : (h(), x("div", {
        key: 1,
        class: Z([
          T(et),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(At) : "",
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
          onChange: k
        }, null, 40, yC),
        d("label", {
          for: s.value,
          class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(T(ro), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, xC),
        d("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: u.value || void 0
        }, A(u.value), 9, kC),
        r.value && !e.disabled ? (h(), x("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: w
        }, [
          z(T(co), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, _C)) : O("", !0)
      ], 2)),
      e.errorText ? (h(), x("p", {
        key: 3,
        id: i.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, IC)) : O("", !0)
    ]));
  }
}), FC = ["for"], OC = { class: "flex w-full min-w-0 items-center gap-3" }, VC = ["for", "aria-label"], NC = ["src"], zC = ["id", "accept", "disabled"], jC = ["id", "value", "placeholder", "disabled"], HC = /* @__PURE__ */ fe({
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
    function m(f) {
      const b = f.target, v = b.files?.[0];
      v && n("select", v), b.value = "";
    }
    function p(f) {
      n("update:modelValue", f.target.value);
    }
    return (f, b) => (h(), x("div", yt({ class: "font-sans flex w-full flex-col gap-2" }, f.$attrs), [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(T(ht))
      }, A(e.label), 11, FC)) : O("", !0),
      d("div", OC, [
        d("label", {
          for: l.value,
          class: Z(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            g.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (h(), x("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: b[0] || (b[0] = (v) => o.value = !0)
          }, null, 40, NC)) : e.loading ? (h(), te(T(tp), {
            key: 1,
            class: Z([u.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (h(), te(T(ro), {
            key: 2,
            class: Z([u.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, VC),
        d("input", {
          id: l.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: m
        }, null, 40, zC),
        e.showUrlInput ? (h(), x("div", {
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
            class: Z([T(et), "w-full min-w-0"]),
            onInput: p
          }, null, 42, jC)
        ], 2)) : O("", !0)
      ])
    ], 16));
  }
}), WC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, KC = {
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"]
}, UC = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, YC = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, qC = {
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
}, XC = {
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
}, GC = [
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
function ZC(e = "en") {
  return WC[e];
}
function QC(e = "en") {
  return KC[e];
}
function Ol(e = "en") {
  return GC.map((t) => ({ id: t, label: XC[e][t] }));
}
function JC(e = "en") {
  return "Presets";
}
Ol("es");
function nt(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function ot(e) {
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
function e$(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ve(a);
}
function Ea(e, t) {
  return e$(e, -t);
}
function t$(e) {
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
      return { start: n, end: t$(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Nl(e, t, a) {
  let n = Ve(e.start), o = Ve(e.end);
  if (t) {
    const s = Ve(nt(t));
    jt(n, s) && (n = s), jt(o, s) && (o = s);
  }
  if (a) {
    const s = Ve(nt(a));
    wn(n, s) && (n = s), wn(o, s) && (o = s);
  }
  return wn(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function a$(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Nl(Vl(t, a), n, o);
  return ot(s.start) === e.start && ot(s.end) === e.end;
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
function zl(e, t) {
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
function n$(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - (n.getDay() + 6) % 7);
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function ka(e) {
  if (!e?.trim()) return null;
  const t = UC.exec(e.trim());
  if (!t) return null;
  const a = Number(t[1]), n = Number(t[2]), o = Number(t[3]), s = Number(t[4]), i = Number(t[5]), l = new Date(a, n - 1, o, s, i);
  return Number.isNaN(l.getTime()) ? null : l;
}
function o$(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0"), o = String(e.getHours()).padStart(2, "0"), s = String(e.getMinutes()).padStart(2, "0");
  return `${t}-${a}-${n}T${o}:${s}`;
}
function s$(e) {
  const t = ka(e);
  return t ? `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : "00:00";
}
function i$(e, t = "es") {
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
  return `${YC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function zt(e, t = "en") {
  return `${qC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const l$ = ["name", "value"], r$ = { class: "flex flex-row gap-3 items-center" }, c$ = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, d$ = ["for"], u$ = ["id", "disabled", "aria-expanded", "aria-labelledby", "aria-label", "aria-invalid", "aria-describedby"], h$ = ["aria-label", "onKeydown"], f$ = { class: "p-3" }, g$ = { class: "mb-4 flex items-center justify-between gap-2" }, m$ = ["aria-label"], p$ = { class: "min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]" }, b$ = ["aria-label"], v$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]" }, y$ = { class: "grid grid-cols-7 gap-y-2" }, x$ = ["disabled", "onClick"], k$ = { class: "border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]" }, _$ = { class: "relative" }, w$ = ["value", "disabled", "min", "max", "step", "aria-label"], C$ = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-input-datetime-${We()}`, s = `${o}-label`, i = C(() => a.id ?? `${o}-btn`), l = `${o}-panel`, r = `${o}-err`, c = oe(null), u = oe(null), g = oe(null), m = oe(!1), p = oe(_t(/* @__PURE__ */ new Date())), f = oe(null), b = oe("00:00"), v = C(() => !!a.modelValue), y = C(() => QC(a.locale)), k = C(() => n$(p.value)), _ = C(() => a.placeholder), w = C(() => a.modelValue ? i$(a.modelValue, a.locale) : a.placeholder), $ = C(() => {
      const U = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${U}` : `left-0 right-auto ${U}`;
    }), M = C(
      () => a.locale === "es" ? "Calendario de fecha y hora" : "Date and time calendar"
    ), D = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), P = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), V = C(
      () => a.locale === "es" ? "Hora" : "Time"
    ), j = C(() => ka(a.min)), S = C(() => ka(a.max)), R = C(() => {
      if (!(!f.value || !j.value) && bt(f.value, j.value))
        return `${String(j.value.getHours()).padStart(2, "0")}:${String(j.value.getMinutes()).padStart(2, "0")}`;
    }), B = C(() => {
      if (!(!f.value || !S.value) && bt(f.value, S.value))
        return `${String(S.value.getHours()).padStart(2, "0")}:${String(S.value.getMinutes()).padStart(2, "0")}`;
    });
    function H(U, le) {
      return U.getMonth() === le.getMonth() && U.getFullYear() === le.getFullYear();
    }
    function W(U) {
      const le = Ve(U);
      return !!(j.value && jt(le, Ve(j.value)) || S.value && wn(le, Ve(S.value)));
    }
    function J(U) {
      const le = H(U, p.value), de = W(U), ae = f.value ? bt(U, f.value) : !1;
      if (de)
        return "rounded-lg text-[#61616b] opacity-40";
      let X = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";
      return ae && (X = "rounded-lg bg-[#895af6] font-semibold text-white"), le || (X = `${X} opacity-30`), X;
    }
    function re() {
      const U = ka(a.modelValue);
      if (U) {
        f.value = Ve(U), b.value = s$(a.modelValue), p.value = _t(U);
        return;
      }
      f.value = null, b.value = "00:00", p.value = _t(/* @__PURE__ */ new Date());
    }
    function ue(U) {
      if (!f.value) return U;
      let le = ka(
        `${ot(f.value)}T${U}`
      );
      return le ? (j.value && bt(f.value, j.value) && vi(le, j.value) && (le = j.value), S.value && bt(f.value, S.value) && yi(le, S.value) && (le = S.value), `${String(le.getHours()).padStart(2, "0")}:${String(le.getMinutes()).padStart(2, "0")}`) : U;
    }
    function q() {
      if (!f.value) {
        n("update:modelValue", null);
        return;
      }
      const U = ue(b.value);
      b.value = U;
      const le = new Date(
        f.value.getFullYear(),
        f.value.getMonth(),
        f.value.getDate(),
        Number(U.slice(0, 2)),
        Number(U.slice(3, 5))
      ), de = o$(le);
      j.value && vi(le, j.value) || S.value && yi(le, S.value) || n("update:modelValue", de);
    }
    function ne(U) {
      W(U) || (f.value = Ve(U), b.value = ue(b.value), q());
    }
    function L(U) {
      const le = U.target.value;
      le && (b.value = le, q());
    }
    function K(U) {
      p.value = Ma(p.value, U);
    }
    function Y() {
      m.value = !1;
    }
    function N() {
      a.disabled || (re(), m.value = !0, Ke(() => g.value?.focus()));
    }
    function ie(U) {
      if (U.stopPropagation(), !a.disabled) {
        if (m.value) {
          Y();
          return;
        }
        N();
      }
    }
    function ce(U) {
      a.disabled || (U.key === "ArrowDown" || U.key === "Enter" || U.key === " ") && (U.preventDefault(), m.value || N());
    }
    function ye(U) {
      if (!m.value) return;
      const le = c.value;
      le && !le.contains(U.target) && Y();
    }
    return Te(
      () => a.modelValue,
      () => {
        m.value || re();
      }
    ), Je(() => {
      re(), document.addEventListener("click", ye);
    }), lt(() => {
      document.removeEventListener("click", ye);
    }), (U, le) => (h(), x("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.name ? (h(), x("input", {
        key: 0,
        type: "hidden",
        name: e.name,
        value: e.modelValue ?? ""
      }, null, 8, l$)) : O("", !0),
      d("div", r$, [
        U.$slots.icon ? (h(), x("span", c$, [
          ke(U.$slots, "icon")
        ])) : O("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          id: s,
          for: i.value,
          class: Z(T(ht))
        }, A(e.label), 11, d$)) : O("", !0)
      ]),
      d("button", {
        id: i.value,
        ref_key: "buttonRef",
        ref: u,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          "flex w-full items-center gap-2 text-left",
          e.invalid ? T(At) : "",
          m.value && !e.invalid ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "dialog",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : _.value,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? r : void 0,
        onClick: ie,
        onKeydown: ce
      }, [
        z(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            v.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(w.value), 3)
      ], 42, u$),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 3)) : O("", !0),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: g,
        id: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": M.value,
        class: Z([
          $.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(Y, ["stop"]), ["escape"])
      }, [
        d("div", f$, [
          d("div", g$, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": D.value,
              onClick: le[0] || (le[0] = Be((de) => K(-1), ["stop"]))
            }, [
              z(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, m$),
            d("span", p$, A(T(zt)(p.value, e.locale)), 1),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": P.value,
              onClick: le[1] || (le[1] = Be((de) => K(1), ["stop"]))
            }, [
              z(T(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ], 8, b$)
          ]),
          d("div", v$, [
            (h(!0), x(he, null, pe(y.value, (de) => (h(), x("span", { key: de }, A(de), 1))), 128))
          ]),
          d("div", y$, [
            (h(!0), x(he, null, pe(k.value, (de) => (h(), x("button", {
              key: T(ot)(de),
              type: "button",
              disabled: W(de),
              class: Z(["relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed", J(de)]),
              onClick: Be((ae) => ne(de), ["stop"])
            }, A(de.getDate()), 11, x$))), 128))
          ])
        ]),
        d("div", k$, [
          d("div", _$, [
            z(T(xl), {
              class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
              "aria-hidden": "true"
            }),
            d("input", {
              value: b.value,
              type: "time",
              autocomplete: "off",
              class: Z([T(et), "min-h-0 py-2 pl-10 pr-3 text-sm"]),
              disabled: !f.value,
              min: R.value,
              max: B.value,
              step: e.step,
              "aria-label": V.value,
              onInput: L,
              onClick: le[2] || (le[2] = Be(() => {
              }, ["stop"]))
            }, null, 42, w$)
          ])
        ])
      ], 42, h$), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), $$ = { class: "font-sans" }, S$ = { class: "flex flex-row gap-3 items-center" }, M$ = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, D$ = ["for"], A$ = { class: "relative" }, T$ = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], B$ = ["id"], L$ = /* @__PURE__ */ fe({
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
      const p = Number(m[1]), f = Number(m[2]);
      return !Number.isInteger(p) || !Number.isInteger(f) || p < 0 || p > 23 || f < 0 || f > 59 ? null : `${String(p).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function n(g) {
      return g === "" ? null : a(g);
    }
    const o = e, s = t, i = `kiut-input-time-${We()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function u(g) {
      const m = g.target.value;
      s("update:modelValue", n(m));
    }
    return (g, m) => (h(), x("div", $$, [
      d("div", S$, [
        g.$slots.icon ? (h(), x("span", M$, [
          ke(g.$slots, "icon")
        ])) : O("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          for: l.value,
          class: Z(T(ht))
        }, A(e.label), 11, D$)) : O("", !0)
      ]),
      d("div", A$, [
        z(T(xl), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Z([
            T(et),
            "pl-10",
            e.invalid ? T(At) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: u
        }, null, 42, T$)
      ]),
      e.errorText ? (h(), x("p", {
        key: 0,
        id: r.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, B$)) : O("", !0)
    ]));
  }
}), R$ = { class: "font-sans" }, P$ = ["for"], I$ = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, E$ = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], F$ = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, O$ = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, V$ = { class: "min-w-0 text-left leading-snug" }, N$ = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, z$ = { class: "min-w-0 text-right leading-snug" }, j$ = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, H$ = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, W$ = ["id"], K$ = /* @__PURE__ */ fe({
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
      const { min: p, max: f, modelValue: b } = a;
      if (f === p) return 0;
      const v = (b - p) / (f - p);
      return Math.min(100, Math.max(0, v * 100));
    }), g = C(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function m(p) {
      const f = Number(p.target.value);
      n("update:modelValue", Number.isNaN(f) ? a.min : f);
    }
    return (p, f) => (h(), x("div", R$, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ht))
      }, A(e.label), 11, P$)) : O("", !0),
      d("div", {
        class: Z(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (h(), x("p", I$, A(e.captionMax), 1)) : O("", !0),
        d("div", {
          class: Z(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: _e(g.value)
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
          }, null, 42, E$)
        ], 6),
        e.orientation === "horizontal" && r.value ? (h(), x("p", F$, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (h(), x("div", O$, [
          d("span", V$, A(e.captionMin), 1),
          d("span", N$, A(e.caption), 1),
          d("span", z$, A(e.captionMax), 1)
        ])) : O("", !0),
        e.orientation === "vertical" && e.captionMin ? (h(), x("p", j$, A(e.captionMin), 1)) : O("", !0),
        e.orientation === "vertical" && e.caption ? (h(), x("p", H$, A(e.caption), 1)) : O("", !0)
      ], 2),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, W$)) : O("", !0)
    ]));
  }
}), U$ = /* @__PURE__ */ be(K$, [["__scopeId", "data-v-ce7263e4"]]), Y$ = { class: "font-sans" }, q$ = ["for"], X$ = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], G$ = ["id"], Z$ = /* @__PURE__ */ fe({
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
    return (u, g) => (h(), x("div", Y$, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ht))
      }, A(e.label), 11, q$)) : O("", !0),
      d("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: Z([
          T(et),
          e.invalid ? T(At) : "",
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
      }, null, 42, X$),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, G$)) : O("", !0)
    ]));
  }
}), Q$ = { class: "font-sans" }, J$ = ["for"], e4 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], t4 = ["disabled"], a4 = ["id"], n4 = "#3b82f6", o4 = "#aabbcc", s4 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", i4 = /* @__PURE__ */ fe({
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
      const b = f.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (v) return `#${v[1].toLowerCase()}`;
      const y = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (y) {
        const [k, _, w] = y[1].split("");
        return `#${k}${k}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function n(f) {
      return a(f) ?? n4;
    }
    const o = e, s = t, i = `kiut-input-color-${We()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n(o.modelValue)), u = oe(c.value), g = oe(!1);
    Te(c, (f) => {
      g.value || (u.value = f);
    });
    function m(f) {
      const b = f.target, v = a(b.value);
      v && s("update:modelValue", v);
    }
    function p() {
      g.value = !1;
      const f = a(u.value);
      f ? (u.value = f, s("update:modelValue", f)) : u.value = c.value;
    }
    return Te(u, (f) => {
      if (!g.value) return;
      const b = a(f);
      b && s("update:modelValue", b);
    }), (f, b) => (h(), x("div", Q$, [
      e.label ? (h(), x("label", {
        key: 0,
        for: l.value,
        class: Z(T(ht))
      }, A(e.label), 11, J$)) : O("", !0),
      d("div", {
        class: Z([
          s4,
          e.invalid ? T(At) : "",
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
        }, null, 40, e4),
        e.showHexInput ? Xe((h(), x("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (v) => u.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: o4,
          onFocus: b[1] || (b[1] = (v) => g.value = !0),
          onBlur: p
        }, null, 40, t4)), [
          [Pt, u.value]
        ]) : O("", !0)
      ], 2),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: r.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, a4)) : O("", !0)
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
function l4(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function r4(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (l) => s || l4(l, n)
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
function DM(e) {
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
function c4(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function d4(e, t) {
  return `${e}${t}`;
}
const u4 = ["disabled", "aria-expanded", "aria-label"], h4 = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, f4 = {
  key: 0,
  class: "truncate text-sm"
}, g4 = ["aria-label"], m4 = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, p4 = ["disabled", "placeholder", "aria-label"], b4 = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, v4 = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, y4 = { class: "grid grid-cols-8 gap-0.5" }, x4 = ["disabled", "aria-label", "onClick"], k4 = { class: "text-[1.35rem] leading-none" }, _4 = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, w4 = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, C4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-emoji-picker-${We()}`, s = `${o}-btn`, i = `${o}-panel`, l = oe(null), r = oe(null), c = oe(null), u = oe(null), g = oe(!1), m = oe(""), p = oe({}), f = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), b = C(() => ({
      ...Wl,
      ...a.categoryLabels
    })), v = C(() => new Set(c4(a.draft))), y = C(() => {
      if (a.categories?.length) {
        const B = m.value.trim().toLowerCase();
        return B ? a.categories.map((H) => ({
          ...H,
          emojis: H.emojis.filter((W) => W.includes(B) || H.label.toLowerCase().includes(B) ? !0 : H.id.toLowerCase().includes(B))
        })).filter((H) => H.emojis.length > 0) : a.categories;
      }
      return r4(
        Kl,
        b.value,
        m.value
      );
    });
    function k() {
      const B = r.value;
      if (!B) return;
      const H = B.getBoundingClientRect(), W = 320, J = 8, re = 8;
      let ue = H.right - W;
      ue < re && (ue = H.left), ue + W > window.innerWidth - re && (ue = Math.max(re, window.innerWidth - W - re));
      const q = Math.max(160, H.top - J - re);
      p.value = {
        bottom: `${window.innerHeight - H.top + J}px`,
        left: `${ue}px`,
        width: `${W}px`,
        maxHeight: `${q}px`
      };
    }
    function _(B) {
      const H = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return v.value.has(B) ? `${H} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : H;
    }
    function w(B) {
      if (a.disabled) return;
      const H = d4(a.draft ?? "", B);
      n("update:draft", H), n("select", B);
    }
    function $() {
      m.value = "", n("open"), Ke(() => {
        k(), u.value?.focus();
      });
    }
    function M() {
      g.value && (g.value = !1, m.value = "", n("close"), r.value?.focus());
    }
    function D() {
      if (!a.disabled) {
        if (g.value) {
          M();
          return;
        }
        g.value = !0, $();
      }
    }
    function P(B) {
      B.stopPropagation(), D();
    }
    function V(B) {
      if (!g.value) return;
      const H = B.target, W = l.value, J = c.value;
      W && !W.contains(H) && (!J || !J.contains(H)) && M();
    }
    function j(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), g.value || (g.value = !0, $())), B.key === "Escape" && g.value && (B.preventDefault(), M()));
    }
    function S(B) {
      B.key === "Escape" && (B.preventDefault(), M());
    }
    function R() {
      g.value && k();
    }
    return Je(() => {
      document.addEventListener("click", V), window.addEventListener("resize", R), window.addEventListener("scroll", R, !0);
    }), lt(() => {
      document.removeEventListener("click", V), window.removeEventListener("resize", R), window.removeEventListener("scroll", R, !0);
    }), (B, H) => (h(), x("div", {
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
          T(et),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          g.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": g.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": f.value,
        onClick: P,
        onKeydown: j
      }, [
        d("span", h4, [
          ke(B.$slots, "icon", {}, () => [
            z(T(sp), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (h(), x("span", f4, A(e.triggerLabel), 1)) : O("", !0),
        e.triggerLabel ? (h(), te(T(na), {
          key: 1,
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", g.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : O("", !0)
      ], 42, u4),
      (h(), te(ea, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: _e(p.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: H[2] || (H[2] = Be(() => {
          }, ["stop"])),
          onKeydown: Be(S, ["stop"])
        }, [
          d("div", m4, [
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": H[0] || (H[0] = (W) => m.value = W),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: H[1] || (H[1] = Be(() => {
              }, ["stop"]))
            }, null, 8, p4), [
              [Pt, m.value]
            ])
          ]),
          d("div", b4, [
            y.value.length > 0 ? (h(!0), x(he, { key: 0 }, pe(y.value, (W) => (h(), x("section", {
              key: W.id
            }, [
              d("h3", v4, A(W.label), 1),
              d("div", y4, [
                (h(!0), x(he, null, pe(W.emojis, (J) => (h(), x("button", {
                  key: `${W.id}-${J}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${J} to input`,
                  class: Z(_(J)),
                  onClick: Be((re) => w(J), ["stop"])
                }, [
                  d("span", k4, A(J), 1)
                ], 10, x4))), 128))
              ])
            ]))), 128)) : (h(), x("p", _4, A(e.emptySearchText), 1))
          ]),
          e.hint ? (h(), x("p", w4, A(e.hint), 1)) : O("", !0)
        ], 44, g4), [
          [Ht, g.value]
        ])
      ]))
    ], 512));
  }
}), $4 = /* @__PURE__ */ fe({
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
    return (i, l) => (h(), te(Ut, {
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
}), S4 = { class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]" }, M4 = { class: "relative" }, D4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, A4 = ["placeholder", "aria-label", "disabled"], T4 = {
  key: 0,
  class: "px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, B4 = ["aria-label"], L4 = {
  key: 0,
  class: "px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, R4 = ["aria-selected", "onClick", "onMouseenter"], P4 = { class: "min-w-0 flex-1 truncate" }, I4 = /* @__PURE__ */ fe({
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
    const n = e, o = a, i = `${`kiut-language-picker-${We()}`}-listbox`, l = oe(null), r = oe(null), c = oe(""), u = oe(0), g = C(() => n.options.filter((w) => !w.disabled)), m = C(() => {
      const w = c.value.trim().toLowerCase();
      return w ? g.value.filter(($) => $.label.toLowerCase().includes(w)) : g.value;
    });
    function p(w) {
      return `${w.value}-${w.label}`;
    }
    function f(w) {
      return n.modelValue === w.value;
    }
    function b(w, $) {
      const M = f(w), D = u.value === $;
      return [
        "flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5",
        M ? "bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !M && D ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function v() {
      u.value = Math.max(
        0,
        m.value.findIndex((w) => w.value === n.modelValue)
      );
    }
    function y(w) {
      w.disabled || o("update:modelValue", w.value);
    }
    function k(w) {
      const $ = m.value;
      if (w.key === "ArrowDown") {
        if (w.preventDefault(), $.length === 0) return;
        u.value = 0, r.value?.focus();
        return;
      }
      if (w.key === "ArrowUp") {
        if (w.preventDefault(), $.length === 0) return;
        u.value = $.length - 1, r.value?.focus();
        return;
      }
      if (w.key === "Enter") {
        w.preventDefault();
        const M = $[u.value];
        M && y(M);
      }
    }
    function _(w) {
      const $ = m.value;
      if ($.length !== 0) {
        if (w.key === "ArrowDown") {
          w.preventDefault(), u.value = Math.min(u.value + 1, $.length - 1);
          return;
        }
        if (w.key === "ArrowUp") {
          if (w.preventDefault(), u.value === 0) {
            l.value?.focus();
            return;
          }
          u.value = Math.max(u.value - 1, 0);
          return;
        }
        if (w.key === "Enter") {
          w.preventDefault();
          const M = $[u.value];
          M && y(M);
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
    }), (w, $) => (h(), x("div", {
      class: Z(["overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]", e.disabled ? "pointer-events-none opacity-50" : ""])
    }, [
      d("div", S4, [
        d("div", M4, [
          d("span", D4, [
            z(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
          ]),
          Xe(d("input", {
            ref_key: "searchInputRef",
            ref: l,
            "onUpdate:modelValue": $[0] || ($[0] = (M) => c.value = M),
            type: "search",
            class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
            placeholder: e.searchPlaceholder,
            "aria-label": e.searchPlaceholder,
            disabled: e.disabled,
            onKeydown: k
          }, null, 42, A4), [
            [Pt, c.value]
          ])
        ])
      ]),
      e.listSectionLabel ? (h(), x("p", T4, A(e.listSectionLabel), 1)) : O("", !0),
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
        m.value.length === 0 ? (h(), x("li", L4, A(e.noResultsText), 1)) : O("", !0),
        (h(!0), x(he, null, pe(m.value, (M, D) => (h(), x("li", {
          key: p(M),
          role: "option",
          "aria-selected": f(M),
          class: Z(b(M, D)),
          onClick: (P) => y(M),
          onMouseenter: (P) => u.value = D
        }, [
          M.flagClass ? (h(), x("span", {
            key: 0,
            class: Z([M.flagClass, "shrink-0"]),
            "aria-hidden": "true"
          }, null, 2)) : O("", !0),
          d("span", P4, A(M.label), 1)
        ], 42, R4))), 128))
      ], 42, B4)
    ], 2));
  }
}), E4 = { class: "flex flex-row gap-3 items-center" }, F4 = {
  key: 0,
  class: "mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4",
  "aria-hidden": "true"
}, O4 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], V4 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, N4 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, z4 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, j4 = { class: "truncate" }, H4 = { class: "absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]" }, W4 = {
  key: 0,
  class: "border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
}, K4 = { class: "relative" }, U4 = {
  class: "pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center",
  "aria-hidden": "true"
}, Y4 = ["placeholder", "aria-label"], q4 = ["aria-checked", "disabled"], X4 = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, G4 = ["aria-selected", "onClick", "onMouseenter"], Z4 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Q4 = { class: "min-w-0 flex-1" }, J4 = /* @__PURE__ */ fe({
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
    const a = e, n = t, o = `kiut-multiselect-${We()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), u = oe(null), g = oe(null), m = oe(!1), p = oe(0), f = oe(""), b = C(() => a.options.filter((N) => !N.disabled)), v = C(() => {
      if (!a.searchable) return b.value;
      const N = f.value.trim().toLowerCase();
      return N ? b.value.filter(
        (ie) => ie.label.toLowerCase().includes(N)
      ) : b.value;
    }), y = C(() => new Set(a.modelValue ?? [])), k = C(
      () => b.value.filter((N) => y.value.has(N.value)).length
    ), _ = C(
      () => b.value.length > 0 && k.value === b.value.length
    ), w = C(
      () => k.value > 0 && !_.value
    ), $ = C(
      () => w.value ? "mixed" : _.value
    ), M = C(
      () => a.options.filter((N) => y.value.has(N.value))
    ), D = C(() => {
      const N = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", ie = M.value.length;
      return ie === 0 ? N : `${N}, ${ie} seleccionada${ie === 1 ? "" : "s"}`;
    });
    function P(N) {
      return `${String(N.value)}-${N.label}`;
    }
    function V(N) {
      return y.value.has(N.value);
    }
    function j(N, ie) {
      const ce = V(N), ye = p.value === ie;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ce ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ce && ye ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S(N) {
      const ie = [...a.modelValue ?? []], ce = ie.indexOf(N.value);
      ce >= 0 ? ie.splice(ce, 1) : ie.push(N.value), n("update:modelValue", ie);
    }
    function R() {
      const N = new Set(b.value.map((ce) => ce.value)), ie = (a.modelValue ?? []).filter(
        (ce) => !N.has(ce)
      );
      n(
        "update:modelValue",
        _.value ? ie : [...ie, ...b.value.map((ce) => ce.value)]
      );
    }
    function B() {
      const N = v.value;
      if (N.length === 0) {
        p.value = 0;
        return;
      }
      const ie = y.value, ce = N.findIndex((ye) => ie.has(ye.value));
      p.value = ce >= 0 ? ce : 0;
    }
    function H() {
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
    function W() {
      f.value = "", B(), Ke(() => H());
    }
    function J() {
      m.value = !1, f.value = "";
    }
    function re() {
      if (!a.disabled) {
        if (m.value) {
          J();
          return;
        }
        m.value = !0, W();
      }
    }
    function ue(N) {
      N.stopPropagation(), !a.disabled && re();
    }
    function q(N) {
      if (!m.value) return;
      const ie = r.value;
      ie && !ie.contains(N.target) && J();
    }
    function ne(N) {
      a.disabled || (N.key === "ArrowDown" || N.key === "Enter" || N.key === " ") && (N.preventDefault(), m.value || (m.value = !0, W()));
    }
    function L(N) {
      const ie = v.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (N.key === "ArrowDown") {
        if (N.preventDefault(), a.showSelectAll) {
          g.value?.focus();
          return;
        }
        if (ie.length === 0) return;
        p.value = 0, c.value?.focus();
        return;
      }
      if (N.key === "ArrowUp") {
        if (N.preventDefault(), ie.length === 0) return;
        p.value = ie.length - 1, c.value?.focus();
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault();
        const ce = ie[p.value];
        ce && S(ce);
      }
    }
    function K(N) {
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (N.key === "ArrowDown" && v.value.length > 0) {
        N.preventDefault(), p.value = 0, c.value?.focus();
        return;
      }
      N.key === "ArrowUp" && a.searchable && (N.preventDefault(), u.value?.focus());
    }
    function Y(N) {
      const ie = v.value;
      if (N.key === "Escape") {
        N.preventDefault(), J();
        return;
      }
      if (ie.length !== 0) {
        if (N.key === "ArrowDown") {
          N.preventDefault(), p.value = Math.min(p.value + 1, ie.length - 1);
          return;
        }
        if (N.key === "ArrowUp") {
          if (N.preventDefault(), p.value === 0 && a.showSelectAll) {
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
        if (N.key === "Enter" || N.key === " ") {
          N.preventDefault();
          const ce = ie[p.value];
          ce && S(ce);
        }
      }
    }
    return Te(f, () => {
      p.value = 0;
    }), Je(() => {
      document.addEventListener("click", q);
    }), lt(() => {
      document.removeEventListener("click", q);
    }), (N, ie) => (h(), x("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      d("div", E4, [
        N.$slots.icon ? (h(), x("span", F4, [
          ke(N.$slots, "icon")
        ])) : O("", !0),
        e.label ? (h(), x("label", {
          key: 1,
          id: s,
          class: Z(T(ht))
        }, A(e.label), 3)) : O("", !0)
      ]),
      d("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          T(et),
          "flex items-start justify-between gap-2 text-left",
          m.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : D.value,
        onClick: ue,
        onKeydown: ne
      }, [
        d("div", V4, [
          M.value.length === 0 ? (h(), x("span", N4, A(e.placeholder), 1)) : (h(), x("div", z4, [
            (h(!0), x(he, null, pe(M.value, (ce) => (h(), x("span", {
              key: P(ce),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              d("span", j4, A(ce.label), 1)
            ]))), 128))
          ]))
        ]),
        z(T(na), {
          class: Z(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", m.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, O4),
      Xe(d("div", H4, [
        e.searchable ? (h(), x("div", W4, [
          d("div", K4, [
            d("span", U4, [
              z(T(Fo), { class: "h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500" })
            ]),
            Xe(d("input", {
              ref_key: "searchInputRef",
              ref: u,
              "onUpdate:modelValue": ie[0] || (ie[0] = (ce) => f.value = ce),
              type: "search",
              class: Z([T(et), "min-h-0 py-2 pl-9 pr-3 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: ie[1] || (ie[1] = Be(() => {
              }, ["stop"])),
              onKeydown: Be(L, ["stop"])
            }, null, 42, Y4), [
              [Pt, f.value]
            ])
          ])
        ])) : O("", !0),
        e.showSelectAll ? (h(), x("button", {
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
              _.value || w.value ? "border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]" : ""
            ]),
            "aria-hidden": "true"
          }, [
            w.value ? (h(), te(T(_b), {
              key: 0,
              class: "h-3 w-3"
            })) : _.value ? (h(), te(T(Bn), {
              key: 1,
              class: "h-3 w-3"
            })) : O("", !0)
          ], 2),
          d("span", null, A(e.selectAllLabel), 1)
        ], 40, q4)) : O("", !0),
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
          v.value.length === 0 ? (h(), x("li", X4, A(e.noResultsText), 1)) : O("", !0),
          (h(!0), x(he, null, pe(v.value, (ce, ye) => (h(), x("li", {
            key: P(ce),
            role: "option",
            "aria-selected": V(ce),
            class: Z(j(ce, ye)),
            onClick: Be((U) => S(ce), ["stop"]),
            onMouseenter: (U) => p.value = ye
          }, [
            d("span", Z4, [
              V(ce) ? (h(), te(T(Bn), {
                key: 0,
                class: "h-4 w-4 text-white"
              })) : O("", !0)
            ]),
            d("span", Q4, A(ce.label), 1)
          ], 42, G4))), 128))
        ], 544)
      ], 512), [
        [Ht, m.value]
      ])
    ], 512));
  }
}), eS = { class: "font-sans" }, tS = ["for"], aS = { class: "flex gap-2" }, nS = { class: "w-[7.5rem] shrink-0" }, oS = { class: "min-w-0 flex-1" }, sS = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], iS = ["id"], lS = /* @__PURE__ */ fe({
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
    return (c, u) => (h(), x("div", eS, [
      e.label ? (h(), x("label", {
        key: 0,
        for: s.value,
        class: Z(T(ht))
      }, A(e.label), 11, tS)) : O("", !0),
      d("div", aS, [
        d("div", nS, [
          z(Ut, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (g) => l.value = g),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1,
            searchable: "",
            "search-placeholder": "Buscar país…"
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        d("div", oS, [
          Xe(d("input", {
            id: s.value,
            "onUpdate:modelValue": u[1] || (u[1] = (g) => r.value = g),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Z([T(et), e.invalid ? T(At) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, sS), [
            [Pt, r.value]
          ])
        ])
      ]),
      e.errorText ? (h(), x("p", {
        key: 1,
        id: i.value,
        class: Z(T(Tt)),
        role: "alert"
      }, A(e.errorText), 11, iS)) : O("", !0)
    ]));
  }
}), rS = ["role", "aria-label"], cS = { class: "flex flex-wrap gap-2" }, dS = ["aria-checked", "role", "onClick"], uS = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, hS = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, fS = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, gS = /* @__PURE__ */ fe({
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
    return (r, c) => (h(), x("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      d("div", cS, [
        (h(!0), x(he, null, pe(e.items, (u) => (h(), x("button", {
          key: u.value,
          type: "button",
          class: Z(i(u)),
          "aria-checked": s(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (g) => l(u)
        }, [
          d("span", uS, [
            s(u) ? (h(), x("span", hS)) : O("", !0)
          ]),
          u.dotColor ? (h(), x("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: _e({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          d("span", fS, A(u.label), 1)
        ], 10, dS))), 128))
      ])
    ], 8, rS));
  }
}), mS = ["aria-label"], pS = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], bS = { class: "truncate px-3 py-2 text-sm font-medium" }, vS = /* @__PURE__ */ fe({
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
      let k = b;
      for (let _ = 0; _ < y; _++)
        if (k = (k + v + y) % y, !a.items[k]?.disabled) return k;
      return b;
    }
    function f(b, v) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const y = p(v, 1), k = a.items[y];
        k && u(k), Ke(() => i.value[y]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const y = p(v, -1), k = a.items[y];
        k && u(k), Ke(() => i.value[y]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const y = m.value[0];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), Ke(() => i.value[y]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const y = m.value[m.value.length - 1];
        if (y !== void 0) {
          const k = a.items[y];
          k && u(k), Ke(() => i.value[y]?.focus());
        }
      }
    }
    return (b, v) => (h(), x("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (h(!0), x(he, null, pe(e.items, (y, k) => (h(), x("button", {
        id: s(y.value),
        key: y.value,
        ref_for: !0,
        ref: (_) => l(_, k),
        type: "button",
        role: "tab",
        "aria-selected": r(y),
        "aria-disabled": y.disabled === !0,
        tabindex: r(y) ? 0 : -1,
        class: Z(c(y)),
        onClick: (_) => g(y, k),
        onKeydown: (_) => f(_, k)
      }, [
        d("span", bS, A(y.label), 1)
      ], 42, pS))), 128))
    ], 8, mS));
  }
}), yS = ["aria-expanded", "aria-labelledby", "aria-label"], xS = ["onKeydown"], kS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, _S = { class: "mb-4 flex items-center justify-between gap-2" }, wS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, CS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, $S = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, SS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, MS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, DS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, AS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, TS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, BS = ["disabled", "onClick"], LS = "rounded-lg text-[#61616b]", RS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", PS = "opacity-30", IS = "bg-[#6b35e9] font-medium text-white", ES = "bg-[#895af6] font-semibold text-white", FS = /* @__PURE__ */ fe({
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
      const S = _t(u.value);
      return [S, Ma(S, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), f = C(() => {
      const S = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${S}` : `left-0 right-auto ${S}`;
    }), b = C(
      () => `${zt(m.value[0])} – ${zt(m.value[1])}`
    ), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], y = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const S = nt(a.modelValue.start), R = nt(a.modelValue.end);
      return `${Ln(S)} – ${Ln(R)}`;
    });
    function k(S, R) {
      return S.getMonth() === R.getMonth() && S.getFullYear() === R.getFullYear();
    }
    function _(S) {
      const R = Ve(S);
      if (a.minDate) {
        const B = Ve(nt(a.minDate));
        if (jt(R, B)) return !0;
      }
      if (a.maxDate) {
        const B = Ve(nt(a.maxDate));
        if (jt(B, R)) return !0;
      }
      return !1;
    }
    function w(S, R, B) {
      const H = bt(S, R), W = bt(S, B);
      if (H && W) return "rounded-lg";
      const J = H || S.getDay() === 0, re = W || S.getDay() === 6;
      return J && re ? "rounded-lg" : J ? "rounded-l-lg" : re ? "rounded-r-lg" : "rounded-none";
    }
    function $(S, R) {
      const B = k(R, S), H = _(R), W = a.modelValue.start ? Ve(nt(a.modelValue.start)) : null, J = a.modelValue.end ? Ve(nt(a.modelValue.end)) : null, re = Ve(R);
      if (H)
        return LS;
      let ue = RS;
      if (W && J && zl(re, W) && jl(re, J)) {
        const ne = bt(re, W), L = bt(re, J);
        ue = `${w(re, W, J)} ${ne || L ? ES : IS}`;
      }
      return B || (ue = `${ue} ${PS}`), ue;
    }
    function M(S) {
      if (_(S)) return;
      const R = Ve(S);
      if (!c.value) {
        c.value = new Date(R), n("update:modelValue", { start: ot(R), end: ot(R) });
        return;
      }
      let H = Ve(c.value), W = new Date(R);
      jt(W, H) && ([H, W] = [W, H]), n("update:modelValue", { start: ot(H), end: ot(W) }), c.value = null, r.value = !1;
    }
    function D(S) {
      u.value = Ma(u.value, S);
    }
    function P() {
      r.value = !1;
    }
    function V(S) {
      if (S?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, a.modelValue.start)
          try {
            u.value = _t(nt(a.modelValue.start));
          } catch {
          }
        Ke(() => l.value?.focus());
      }
    }
    function j(S) {
      if (!r.value) return;
      const R = i.value;
      R && !R.contains(S.target) && (r.value = !1);
    }
    return Te(r, (S) => {
      S && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", j);
    }), lt(() => {
      document.removeEventListener("click", j);
    }), (S, R) => (h(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (h(), x("label", {
        key: 0,
        id: s,
        class: Z(T(ht))
      }, A(e.label), 3)) : O("", !0),
      d("button", {
        type: "button",
        class: Z([
          T(et),
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
        z(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            g.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(y.value), 3)
      ], 42, yS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Z([
          f.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(P, ["stop"]), ["escape"])
      }, [
        d("div", kS, [
          d("div", _S, [
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: R[0] || (R[0] = (B) => D(-1))
            }, [
              z(T(Io), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            d("div", wS, [
              d("span", CS, A(b.value), 1),
              d("div", $S, [
                d("span", SS, A(T(zt)(m.value[0])), 1),
                d("span", MS, A(T(zt)(m.value[1])), 1)
              ])
            ]),
            d("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: R[1] || (R[1] = (B) => D(1))
            }, [
              z(T(Eo), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          d("div", DS, [
            (h(!0), x(he, null, pe(m.value, (B) => (h(), x("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              d("div", AS, [
                (h(), x(he, null, pe(v, (H) => d("span", { key: H }, A(H), 1)), 64))
              ]),
              d("div", TS, [
                (h(!0), x(he, null, pe(T(Hl)(B), (H) => (h(), x("button", {
                  key: T(ot)(H),
                  type: "button",
                  disabled: _(H),
                  class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(B, H)]),
                  onClick: (W) => M(H)
                }, A(H.getDate()), 11, BS))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, xS), [
        [Ht, r.value]
      ])
    ], 512));
  }
}), OS = ["aria-expanded", "aria-labelledby", "aria-label"], VS = ["aria-label", "onKeydown"], NS = { class: "flex flex-col sm:flex-row" }, zS = ["aria-label"], jS = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, HS = { class: "flex flex-col gap-0.5" }, WS = ["onClick"], KS = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, US = { class: "mb-4 flex items-center justify-between gap-2" }, YS = ["aria-label"], qS = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, XS = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, GS = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, ZS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, QS = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, JS = ["aria-label"], e3 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, t3 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, a3 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, n3 = ["disabled", "onClick"], o3 = "rounded-lg text-[#61616b]", s3 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", i3 = "opacity-30", l3 = "bg-[#6b35e9] font-medium text-white", r3 = "bg-[#895af6] font-semibold text-white", c3 = /* @__PURE__ */ fe({
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
      const ne = _t(u.value);
      return [ne, Ma(ne, 1)];
    }), p = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = C(() => a.ariaLabel ?? p.value), b = C(() => Ol(a.locale)), v = C(() => JC(a.locale)), y = C(() => ZC(a.locale)), k = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = C(() => {
      const ne = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${ne}` : `left-0 right-auto ${ne}`;
    }), D = C(
      () => `${zt(m.value[0], a.locale)} – ${zt(m.value[1], a.locale)}`
    ), P = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return p.value;
      const ne = nt(a.modelValue.start), L = nt(a.modelValue.end);
      return `${Ln(ne, a.locale)} – ${Ln(L, a.locale)}`;
    });
    function V(ne, L) {
      return ne.getMonth() === L.getMonth() && ne.getFullYear() === L.getFullYear();
    }
    function j(ne) {
      const L = Ve(ne);
      if (a.minDate) {
        const K = Ve(nt(a.minDate));
        if (jt(L, K)) return !0;
      }
      if (a.maxDate) {
        const K = Ve(nt(a.maxDate));
        if (jt(K, L)) return !0;
      }
      return !1;
    }
    function S(ne, L, K) {
      const Y = bt(ne, L), N = bt(ne, K);
      if (Y && N) return "rounded-lg";
      const ie = Y || ne.getDay() === 0, ce = N || ne.getDay() === 6;
      return ie && ce ? "rounded-lg" : ie ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function R(ne) {
      const L = a$(
        a.modelValue,
        ne,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), K = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${K} font-medium` : K;
    }
    function B(ne, L) {
      const K = V(L, ne), Y = j(L), N = a.modelValue.start ? Ve(nt(a.modelValue.start)) : null, ie = a.modelValue.end ? Ve(nt(a.modelValue.end)) : null, ce = Ve(L);
      if (Y)
        return o3;
      let ye = s3;
      if (N && ie && zl(ce, N) && jl(ce, ie)) {
        const le = bt(ce, N), de = bt(ce, ie);
        ye = `${S(ce, N, ie)} ${le || de ? r3 : l3}`;
      }
      return K || (ye = `${ye} ${i3}`), ye;
    }
    function H(ne) {
      const L = Nl(Vl(ne), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: ot(L.start),
        end: ot(L.end)
      }), u.value = _t(L.start), c.value = null, r.value = !1;
    }
    function W(ne) {
      if (j(ne)) return;
      const L = Ve(ne);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: ot(L), end: ot(L) });
        return;
      }
      let Y = Ve(c.value), N = new Date(L);
      jt(N, Y) && ([Y, N] = [N, Y]), n("update:modelValue", { start: ot(Y), end: ot(N) }), c.value = null, r.value = !1;
    }
    function J(ne) {
      u.value = Ma(u.value, ne);
    }
    function re() {
      r.value = !1;
    }
    function ue(ne) {
      if (ne.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, a.modelValue.start)
        try {
          u.value = _t(nt(a.modelValue.start));
        } catch {
        }
      Ke(() => l.value?.focus());
    }
    function q(ne) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(ne.target) && (r.value = !1);
    }
    return Te(r, (ne) => {
      ne && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", q);
    }), lt(() => {
      document.removeEventListener("click", q);
    }), (ne, L) => (h(), x("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (h(), x("label", {
        key: 0,
        id: s,
        class: Z(T(ht))
      }, A(e.label), 3)) : O("", !0),
      d("button", {
        type: "button",
        class: Z([
          T(et),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: ue
      }, [
        z(T(Po), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        d("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            g.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(P.value), 3)
      ], 10, OS),
      Xe(d("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: Z([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Ca(Be(re, ["stop"]), ["escape"])
      }, [
        d("div", NS, [
          d("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": k.value
          }, [
            d("p", jS, A(v.value), 1),
            d("ul", HS, [
              (h(!0), x(he, null, pe(b.value, (K) => (h(), x("li", {
                key: K.id
              }, [
                d("button", {
                  type: "button",
                  class: Z(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", R(K.id)]),
                  onClick: (Y) => H(K.id)
                }, A(K.label), 11, WS)
              ]))), 128))
            ])
          ], 8, zS),
          d("div", KS, [
            d("div", US, [
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: L[0] || (L[0] = (K) => J(-1))
              }, [
                z(T(Io), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, YS),
              d("div", qS, [
                d("span", XS, A(D.value), 1),
                d("div", GS, [
                  d("span", ZS, A(T(zt)(m.value[0], e.locale)), 1),
                  d("span", QS, A(T(zt)(m.value[1], e.locale)), 1)
                ])
              ]),
              d("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: L[1] || (L[1] = (K) => J(1))
              }, [
                z(T(Eo), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, JS)
            ]),
            d("div", e3, [
              (h(!0), x(he, null, pe(m.value, (K) => (h(), x("div", {
                key: `${K.getFullYear()}-${K.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                d("div", t3, [
                  (h(!0), x(he, null, pe(y.value, (Y) => (h(), x("span", { key: Y }, A(Y), 1))), 128))
                ]),
                d("div", a3, [
                  (h(!0), x(he, null, pe(T(Hl)(K), (Y) => (h(), x("button", {
                    key: T(ot)(Y),
                    type: "button",
                    disabled: j(Y),
                    class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(K, Y)]),
                    onClick: (N) => W(Y)
                  }, A(Y.getDate()), 11, n3))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, VS), [
        [Ht, r.value]
      ])
    ], 512));
  }
}), d3 = { class: "kiut-translation-count-badge__content" }, u3 = { class: "kiut-translation-count-badge__title" }, h3 = { class: "kiut-translation-count-badge__pills" }, f3 = {
  key: 0,
  class: "kiut-translation-count-badge__pill-note"
}, xn = 8, xa = 12, g3 = /* @__PURE__ */ fe({
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
      const p = s.value, f = i.value;
      if (!p || !f) return;
      const b = p.getBoundingClientRect(), v = f.getBoundingClientRect(), y = b.top - xa, k = window.innerHeight - b.bottom - xa, _ = y >= v.height + xn, w = k >= v.height + xn;
      let $ = "top";
      _ ? $ = "top" : w ? $ = "bottom" : $ = k >= y ? "bottom" : "top", n.value = $;
      let M = $ === "top" ? b.top - v.height - xn : b.bottom + xn;
      M = Math.max(
        xa,
        Math.min(M, window.innerHeight - v.height - xa)
      );
      let D = b.left + b.width / 2 - v.width / 2;
      D = Math.max(
        xa,
        Math.min(D, window.innerWidth - v.width - xa)
      ), o.value = {
        top: `${M}px`,
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
    }), (p, f) => (h(), x(he, null, [
      d("span", {
        ref_key: "triggerRef",
        ref: s,
        class: Z([l.value, e.pulse && "animate-pulse"]),
        onMouseenter: g,
        onMouseleave: c,
        onFocus: g,
        onBlur: c
      }, A(e.label), 35),
      (h(), te(ea, { to: "body" }, [
        a.value && e.items.length ? (h(), x("div", {
          key: 0,
          ref_key: "tooltipRef",
          ref: i,
          role: "tooltip",
          class: Z(["kiut-translation-count-badge__tooltip", `kiut-translation-count-badge__tooltip--${n.value}`]),
          style: _e({
            position: "fixed",
            top: o.value.top,
            left: o.value.left,
            zIndex: 1100
          }),
          onMouseenter: g,
          onMouseleave: c
        }, [
          d("div", d3, [
            d("span", u3, A(e.tooltipTitle), 1),
            d("div", h3, [
              (h(!0), x(he, null, pe(e.items, (b) => (h(), x("span", {
                key: b.id,
                class: Z(r.value)
              }, [
                Ae(A(b.label) + " ", 1),
                b.note ? (h(), x("span", f3, " (" + A(b.note) + ") ", 1)) : O("", !0)
              ], 2))), 128))
            ])
          ])
        ], 38)) : O("", !0)
      ]))
    ], 64));
  }
}), m3 = ["disabled", "aria-expanded", "aria-label"], p3 = { class: "min-w-0 flex-1 truncate" }, b3 = ["aria-selected", "onClick", "onMouseenter"], v3 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, y3 = { class: "min-w-0 flex-1" }, x3 = /* @__PURE__ */ fe({
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
    const a = e, n = t, s = `${`kiut-tag-select-${We()}`}-listbox`, i = oe(null), l = oe(null), r = oe(null), c = oe(null), u = oe(!1), g = oe(0), m = oe({}), p = C(() => a.options.filter((J) => !J.disabled)), f = C(
      () => a.options.find((J) => J.value === a.modelValue) ?? null
    ), b = C(() => f.value?.color ?? "neutral"), v = C(
      () => _l(b.value, a.outlined)
    ), y = C(() => f.value ? f.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : p.value[0]?.label ?? "Seleccionar…"), k = C(
      () => a.ariaLabel ?? `Estado: ${y.value}`
    );
    function _() {
      const J = l.value;
      if (!J) return;
      const re = J.getBoundingClientRect();
      m.value = {
        top: `${re.bottom + 4}px`,
        left: `${re.left}px`,
        minWidth: `${re.width}px`
      };
    }
    function w(J) {
      return `${String(J.value)}-${J.label}`;
    }
    function $(J) {
      return a.modelValue === J.value;
    }
    function M(J, re) {
      const ue = $(J), q = g.value === re;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && q ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function D() {
      g.value = Math.max(
        0,
        p.value.findIndex((J) => J.value === a.modelValue)
      );
    }
    function P() {
      _(), D(), Ke(() => c.value?.focus());
    }
    function V() {
      u.value = !1;
    }
    function j(J) {
      n("update:modelValue", J.value), V();
    }
    function S() {
      if (!a.disabled) {
        if (u.value) {
          V();
          return;
        }
        u.value = !0, P();
      }
    }
    function R(J) {
      J.stopPropagation(), !a.disabled && S();
    }
    function B(J) {
      if (!u.value) return;
      const re = J.target, ue = i.value, q = r.value;
      ue && !ue.contains(re) && (!q || !q.contains(re)) && V();
    }
    function H(J) {
      a.disabled || (J.key === "ArrowDown" || J.key === "Enter" || J.key === " ") && (J.preventDefault(), u.value || (u.value = !0, P()));
    }
    function W(J) {
      const re = p.value;
      if (J.key === "Escape") {
        J.preventDefault(), V(), l.value?.focus();
        return;
      }
      if (re.length !== 0) {
        if (J.key === "ArrowDown") {
          J.preventDefault(), g.value = Math.min(g.value + 1, re.length - 1);
          return;
        }
        if (J.key === "ArrowUp") {
          J.preventDefault(), g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (J.key === "Enter") {
          J.preventDefault();
          const ue = re[g.value];
          ue && j(ue);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", B);
    }), lt(() => {
      document.removeEventListener("click", B);
    }), (J, re) => (h(), x("div", {
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
          T(kl),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          v.value,
          u.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": k.value,
        onClick: R,
        onKeydown: H
      }, [
        d("span", p3, A(y.value), 1),
        z(T(na), {
          class: Z(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, m3),
      (h(), te(ea, { to: "body" }, [
        Xe(d("div", {
          ref_key: "panelRef",
          ref: r,
          style: _e(m.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          d("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Be(W, ["stop"])
          }, [
            (h(!0), x(he, null, pe(p.value, (ue, q) => (h(), x("li", {
              key: w(ue),
              role: "option",
              "aria-selected": $(ue),
              class: Z(M(ue, q)),
              onClick: Be((ne) => j(ue), ["stop"]),
              onMouseenter: (ne) => g.value = q
            }, [
              d("span", v3, [
                $(ue) ? (h(), te(T(Bn), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ]),
              d("span", y3, A(ue.label), 1)
            ], 42, b3))), 128))
          ], 544)
        ], 4), [
          [Ht, u.value]
        ])
      ]))
    ], 512));
  }
}), k3 = ["aria-label"], _3 = { class: "flex flex-col gap-1" }, w3 = { class: "flex flex-row gap-3 items-center" }, C3 = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, $3 = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, S3 = /* @__PURE__ */ fe({
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
      warning: m5,
      info: p5,
      success: g5,
      feature: v5,
      danger: y5
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
    return (l, r) => (h(), x("div", {
      role: "region",
      "aria-label": e.title,
      class: Z([
        s.value.container,
        T(t).class,
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
            (h(), te(rt(i.value)))
          ])
        ], 2)
      ], 2),
      d("div", _3, [
        d("h1", {
          class: Z([s.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        d("span", {
          class: Z([s.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        d("div", w3, [
          a.date_start ? (h(), x("div", C3, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                z(T(bi))
              ])
            ], 2),
            a.subtitle_date_start ? (h(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : O("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : O("", !0),
          a.date_final ? (h(), x("div", $3, [
            d("span", {
              class: Z([
                s.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(l.$slots, "icon_date", {}, () => [
                z(T(bi))
              ])
            ], 2),
            a.subtitle_date_final ? (h(), x("span", {
              key: 0,
              class: Z([s.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : O("", !0),
            d("span", {
              class: Z([s.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : O("", !0)
        ])
      ])
    ], 10, k3));
  }
}), M3 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, D3 = ["id"], A3 = { class: "min-w-0 flex-1 space-y-1" }, T3 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, B3 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, L3 = {
  key: 0,
  class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2"
}, R3 = /* @__PURE__ */ fe({
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
    }), (g, m) => (h(), te(ea, { to: "body" }, [
      z(ct, { name: "kiut-modal" }, {
        default: E(() => [
          e.modelValue ? (h(), x("div", M3, [
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
              style: _e(n.value),
              onClick: m[0] || (m[0] = Be(() => {
              }, ["stop"]))
            }, [
              d("header", {
                class: Z(["flex shrink-0 justify-between gap-4 bg-slate-50/50 px-6 py-5 dark:bg-white/[0.02]", [
                  e.subtitle ? "items-start" : "items-center",
                  e.headerBorder ? "border-b border-slate-100 dark:border-[color:var(--kiut-border-light)]" : ""
                ]])
              }, [
                d("div", A3, [
                  d("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (h(), x("p", T3, A(e.subtitle), 1)) : O("", !0)
                ]),
                z(Mt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: E(() => [
                    z(T(co), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              d("div", B3, [
                ke(g.$slots, "default", {}, void 0, !0)
              ]),
              e.showFooter ? (h(), x("footer", L3, [
                z(Mt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: E(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                z(Mt, {
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
              ])) : O("", !0)
            ], 12, D3)
          ])) : O("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), P3 = /* @__PURE__ */ be(R3, [["__scopeId", "data-v-1ab330ef"]]), I3 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, E3 = {
  key: 0,
  class: ""
}, F3 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, O3 = { class: "flex min-w-0 flex-1 items-center" }, V3 = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, N3 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, z3 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, j3 = /* @__PURE__ */ fe({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = ho(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (h(), x("section", I3, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (h(), x("header", E3, [
        n.$slots.description ? (h(), x("div", F3, [
          ke(n.$slots, "description")
        ])) : O("", !0),
        n.$slots.tabs ? (h(), x("div", {
          key: 1,
          class: Z(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          d("div", O3, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (h(), x("div", V3, [
            ke(n.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (h(), x("div", {
          key: 2,
          class: Z([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (h(), x("div", N3, [
            ke(n.$slots, "filters")
          ])) : O("", !0),
          n.$slots.actions ? (h(), x("div", z3, [
            ke(n.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      n.$slots.content || n.$slots.default ? (h(), x("div", {
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
}), H3 = { class: "flex flex-1 min-h-0" }, W3 = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, K3 = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, U3 = ["aria-current", "data-has-active", "title", "onClick"], Y3 = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, q3 = { class: "px-4 py-4 shrink-0" }, X3 = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, G3 = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, Z3 = ["data-nav-id", "aria-current", "onClick"], Q3 = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, J3 = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, eM = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, tM = ["data-nav-id", "aria-current", "onClick"], aM = { class: "truncate text-[15px]" }, nM = ["aria-current", "data-has-active", "onClick"], oM = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, sM = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, iM = /* @__PURE__ */ fe({
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
      const y = n.sections.find((k) => k.id === n.selectedSectionId);
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
      const k = n.selectedSectionId === y.id ? null : y.id;
      o("update:selectedSectionId", k);
    }
    function f(y, k) {
      o("navigate", { section: y, item: k });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function v(y, k) {
      f(y, k), b();
    }
    return (y, k) => r.value ? (h(), x("div", yt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(ct, { name: "ksn-overlay" }, {
        default: E(() => [
          u.value ? (h(), x("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : O("", !0)
        ]),
        _: 1
      }),
      z(ct, { name: "ksn-sheet" }, {
        default: E(() => [
          u.value ? (h(), x("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: _e({ paddingBottom: n.mobileBarHeight })
          }, [
            k[3] || (k[3] = d("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              d("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            d("div", Q3, [
              d("p", J3, A(u.value.label), 1),
              d("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
              }, [...k[2] || (k[2] = [
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
            d("nav", eM, [
              (h(!0), x(he, null, pe(u.value.items, (_) => (h(), x("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": g(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => v(u.value, _)
              }, [
                _.icon ? (h(), te(rt(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                d("span", aM, A(_.label), 1)
              ], 8, tM))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      d("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: _e({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (h(!0), x(he, null, pe(e.sections, (_) => (h(), x("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": m(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => p(_)
        }, [
          e.selectedSectionId === _.id || m(_) ? (h(), x("span", oM)) : O("", !0),
          _.icon ? (h(), te(rt(_.icon), {
            key: 1,
            class: "shrink-0",
            style: _e({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          d("span", sM, A(_.label), 1)
        ], 8, nM))), 128))
      ], 4)
    ], 16)) : (h(), x("aside", yt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      d("div", H3, [
        d("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: _e({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: k[0] || (k[0] = (_) => a.value = !0),
          onMouseleave: k[1] || (k[1] = (_) => a.value = !1)
        }, [
          y.$slots.logo ? (h(), x("div", W3, [
            ke(y.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : O("", !0),
          d("nav", K3, [
            (h(!0), x(he, null, pe(e.sections, (_) => (h(), x("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": m(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => p(_)
            }, [
              _.icon ? (h(), te(rt(_.icon), {
                key: 0,
                class: "shrink-0",
                style: _e({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              d("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: _e({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, U3))), 128))
          ]),
          y.$slots.footer ? (h(), x("div", Y3, [
            ke(y.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        z(ct, { name: "ksn-sub" }, {
          default: E(() => [
            u.value ? (h(), x("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: _e({ width: e.secondaryWidth })
            }, [
              d("div", q3, [
                d("p", X3, A(u.value.label), 1)
              ]),
              d("nav", G3, [
                (h(!0), x(he, null, pe(u.value.items, (_) => (h(), x("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": g(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => f(u.value, _)
                }, [
                  _.icon ? (h(), te(rt(_.icon), {
                    key: 0,
                    style: _e({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  d("span", {
                    class: "truncate",
                    style: _e({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, Z3))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), lM = /* @__PURE__ */ be(iM, [["__scopeId", "data-v-e0ccb96c"]]), rM = ["aria-label"], cM = {
  key: 0,
  class: "shrink-0 px-4 py-4"
}, dM = { class: "text-start text-[12px] font-bold uppercase tracking-widest [color:var(--kiut-text-subtitle)]" }, uM = ["aria-label"], hM = ["data-nav-id", "data-testid", "disabled", "aria-current", "onClick"], fM = {
  key: 1,
  class: "h-3.5 w-3.5 shrink-0 opacity-70",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, gM = /* @__PURE__ */ fe({
  name: "VerticalNavPanel",
  __name: "VerticalNavPanel",
  props: {
    items: {},
    modelValue: {},
    title: {},
    ariaLabel: { default: "Section navigation" },
    panelWidth: { default: "14rem" },
    fontSize: { default: "14px" },
    iconSize: { default: "16px" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = e, n = t;
    function o(i) {
      return i.value === a.modelValue;
    }
    function s(i) {
      if (i.disabled || i.value === a.modelValue) return;
      const l = a.modelValue;
      n("update:modelValue", i.value), n("change", { value: i.value, previousValue: l });
    }
    return (i, l) => (h(), x("aside", {
      class: "kiut-vertical-nav-panel flex shrink-0 flex-col overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] [background-color:var(--kiut-lateral-bg)] font-['Inter',system-ui,sans-serif]",
      style: _e({ width: e.panelWidth }),
      role: "navigation",
      "aria-label": e.ariaLabel
    }, [
      e.title ? (h(), x("div", cM, [
        d("p", dM, A(e.title), 1)
      ])) : O("", !0),
      d("nav", {
        class: Z(["flex flex-1 flex-col gap-0.5 overflow-y-auto px-1 pb-3", { "pt-2": !e.title }]),
        "aria-label": e.title || e.ariaLabel
      }, [
        (h(!0), x(he, null, pe(e.items, (r) => (h(), x("button", {
          key: r.value,
          type: "button",
          "data-nav-id": r.value,
          "data-testid": r.testId,
          disabled: r.disabled === !0,
          "aria-current": o(r) ? "true" : void 0,
          class: "kvnp-item group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40",
          onClick: (c) => s(r)
        }, [
          r.icon ? (h(), te(rt(r.icon), {
            key: 0,
            class: "shrink-0",
            style: _e({ width: e.iconSize, height: e.iconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          d("span", {
            class: "min-w-0 flex-1 truncate",
            style: _e({ fontSize: e.fontSize })
          }, A(r.label), 5),
          o(r) ? (h(), x("svg", fM, [...l[0] || (l[0] = [
            d("path", { d: "M9 6l6 6-6 6" }, null, -1)
          ])])) : O("", !0)
        ], 8, hM))), 128))
      ], 10, uM)
    ], 12, rM));
  }
}), Ul = /* @__PURE__ */ be(gM, [["__scopeId", "data-v-cf2cdc84"]]), mM = { class: "kiut-module-nav-layout flex min-h-0 w-full flex-col gap-4 md:flex-row md:items-start" }, pM = { class: "min-w-0 flex-1" }, bM = /* @__PURE__ */ fe({
  name: "ModuleNavLayout",
  __name: "ModuleNavLayout",
  props: {
    items: {},
    modelValue: {},
    title: {},
    ariaLabel: { default: "Section navigation" },
    panelWidth: { default: "14rem" },
    fontSize: { default: "14px" },
    iconSize: { default: "16px" }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, o) => (h(), x("div", mM, [
      z(Ul, {
        title: e.title,
        items: e.items,
        "model-value": e.modelValue,
        "aria-label": e.ariaLabel,
        "panel-width": e.panelWidth,
        "font-size": e.fontSize,
        "icon-size": e.iconSize,
        "onUpdate:modelValue": o[0] || (o[0] = (s) => a("update:modelValue", s)),
        onChange: o[1] || (o[1] = (s) => a("change", s))
      }, null, 8, ["title", "items", "model-value", "aria-label", "panel-width", "font-size", "icon-size"]),
      d("div", pM, [
        n.$slots.default ? (h(), te(ct, {
          key: 0,
          name: "module-nav-panel",
          mode: "out-in"
        }, {
          default: E(() => [
            (h(), x("div", {
              key: e.modelValue,
              class: "module-nav-panel"
            }, [
              ke(n.$slots, "default", { active: e.modelValue }, void 0, !0)
            ]))
          ]),
          _: 3
        })) : ke(n.$slots, "default", { key: 1 }, void 0, !0)
      ])
    ]));
  }
}), vM = /* @__PURE__ */ be(bM, [["__scopeId", "data-v-6f3134eb"]]), AM = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", pt), e.component("KiutPieChart", Fn), e.component("KiutBoxplotChart", jf), e.component("KiutCandlestickChart", Ag), e.component("KiutHistogramChart", vl), e.component("KiutSankeyChart", Kt), e.component("KiutAgentsPerDay", Sp), e.component("KiutBookingManager", s0), e.component("KiutCheckin", x0), e.component("KiutCheckinContainer", X0), e.component("KiutCheckinMetrics", wl), e.component("KiutCheckinSegments", Cl), e.component("KiutDisruption", fb), e.component("KiutFAQ", kb), e.component("KiutMessagesPerAgent", $l), e.component("KiutRecordLocator", fv), e.component("KiutSalesByChannel", Sl), e.component("KiutSeller", Ml), e.component("KiutSellerContainer", Zv), e.component("KiutAncillaries", gy), e.component("KiutAncillariesCR", Ty), e.component("KiutTopAgents", Fy), e.component("KiutPaymentMethod", o1), e.component("KiutAgentHumanConversations", $1), e.component("KiutChannelMetrics", Dl), e.component("KiutConversationVolume", O1), e.component("KiutTriageCombinations", Q1), e.component("KiutSelectLanguage", ox), e.component("KiutGuardrails", gx), e.component("KiutDisruptionNotifier", Px), e.component("KiutTotalConversationsCard", Ix), e.component("KiutCsatP95Card", Ex), e.component("KiutCsatPulseCard", Fx), e.component("KiutCSATContainer", uk), e.component("KiutAiGeneratedRevenueCard", hk), e.component("KiutAiGeneratedChart", kk), e.component("KiutTransactionsChart", Tk), e.component("KiutCostCard", Lk), e.component("KiutHumanEscalations", Nk), e.component("KiutHumanEscalationsCard", zk), e.component("KiutAvgResolutionTime", Jk), e.component("KiutAvgResolutionTimeCard", s_), e.component("KiutCheckinCR", i_), e.component("KiutSellerCR", l_), e.component("KiutBookingManagerCR", r_), e.component("KiutNpsDailyMetrics", Tl), e.component("KiutNpsMetrics", Bl), e.component("KiutNpsOverviewMetrics", Al), e.component("KiutAWSCost", p_), e.component("KiutCostUsage", S_), e.component("KiutTokenUsage", E_), e.component("KiutConversationCount", U_), e.component("KiutTopAgentsAnalysis", o2), e.component("KiutTopAgentsPie", f2), e.component("KiutDailyCostTrends", _2), e.component("KiutModelUsage", E2), e.component("KiutMessageRoles", K2), e.component("KiutCostPerConversations", nw), e.component("Tabs", Ll), e.component("Table", xw), e.component("TableVersions", f5), e.component("Filters", Z5), e.component("InputText", Fl), e.component("InputPassword", uC), e.component("InputTextarea", pC), e.component("InputFile", EC), e.component("ImageUploadCircle", HC), e.component("InputDateTime", C$), e.component("InputTime", L$), e.component("InputRange", U$), e.component("InputNumber", Z$), e.component("InputColorPicker", i4), e.component("EmojiPicker", C4), e.component("Select", Ut), e.component("LanguageSelect", $4), e.component("LanguagePicker", I4), e.component("MultiSelect", J4), e.component("Toggle", El), e.component("InputPhone", lS), e.component("SelectablePills", gS), e.component("SegmentedControl", vS), e.component("DateRangePicker", FS), e.component("DatePickerPresets", c3), e.component("Tag", Ge), e.component("TagSelect", x3), e.component("TranslationCountBadge", g3), e.component("Button", Mt), e.component("Banner", S3), e.component("Modal", P3), e.component("Section", j3), e.component("KiutAppShellNavigation", lM), e.component("ModuleNavLayout", vM), e.component("VerticalNavPanel", Ul);
  }
};
export {
  p_ as AWSCost,
  $1 as AgentHumanConversations,
  Sp as AgentsPerDay,
  kk as AiGeneratedChart,
  hk as AiGeneratedRevenueCard,
  gy as Ancillaries,
  Ty as AncillariesCR,
  lM as AppShellNavigation,
  Jk as AvgResolutionTime,
  s_ as AvgResolutionTimeCard,
  S3 as Banner,
  s0 as BookingManager,
  r_ as BookingManagerCR,
  jf as BoxplotChart,
  Mt as Button,
  uk as CSATContainer,
  Ag as CandlestickChart,
  Dl as ChannelMetrics,
  $t as ChartBar,
  pt as ChartLine,
  x0 as Checkin,
  i_ as CheckinCR,
  X0 as CheckinContainer,
  wl as CheckinMetrics,
  Cl as CheckinSegments,
  U_ as ConversationCount,
  O1 as ConversationVolume,
  Lk as CostCard,
  nw as CostPerConversations,
  S_ as CostUsage,
  Ex as CsatP95Card,
  Fx as CsatPulseCard,
  Wl as DEFAULT_CATEGORY_LABELS,
  Kl as DEFAULT_EMOJI_CATALOG,
  Uw as DEFAULT_TABLE_VERSIONS_LABELS,
  _2 as DailyCostTrends,
  c3 as DatePickerPresets,
  FS as DateRangePicker,
  fb as Disruption,
  Px as DisruptionNotifier,
  Yw as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  C4 as EmojiPicker,
  kb as FAQ,
  Z5 as Filters,
  gx as Guardrails,
  vl as HistogramChart,
  Nk as HumanEscalations,
  zk as HumanEscalationsCard,
  HC as ImageUploadCircle,
  i4 as InputColorPicker,
  C$ as InputDateTime,
  EC as InputFile,
  Z$ as InputNumber,
  uC as InputPassword,
  lS as InputPhone,
  U$ as InputRange,
  Fl as InputText,
  pC as InputTextarea,
  L$ as InputTime,
  AM as KiutUIPlugin,
  I4 as LanguagePicker,
  $4 as LanguageSelect,
  K2 as MessageRoles,
  $l as MessagesPerAgent,
  P3 as Modal,
  E2 as ModelUsage,
  vM as ModuleNavLayout,
  J4 as MultiSelect,
  Tl as NpsDailyMetrics,
  Bl as NpsMetrics,
  Al as NpsOverviewMetrics,
  o1 as PaymentMethod,
  Fn as PieChart,
  MM as RESOURCE_TABLE_VERSIONS_COLUMNS,
  fv as RecordLocator,
  Sl as SalesByChannel,
  Kt as SankeyChart,
  j3 as Section,
  vS as SegmentedControl,
  Ut as Select,
  ox as SelectLanguage,
  gS as SelectablePills,
  Ml as Seller,
  l_ as SellerCR,
  Zv as SellerContainer,
  xw as Table,
  f5 as TableVersions,
  Ll as Tabs,
  Ge as Tag,
  x3 as TagSelect,
  El as Toggle,
  E_ as TokenUsage,
  Fy as TopAgents,
  o2 as TopAgentsAnalysis,
  f2 as TopAgentsPie,
  Ix as TotalConversationsCard,
  Tk as TransactionsChart,
  g3 as TranslationCountBadge,
  Q1 as TriageCombinations,
  Ul as VerticalNavPanel,
  d4 as appendEmojiToDraft,
  DM as buildDefaultCategories,
  c4 as extractEmojis,
  r4 as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
