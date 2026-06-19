import { defineComponent as le, shallowRef as ni, h as ja, ref as ae, onMounted as tt, onUnmounted as pt, watch as Oe, toRaw as Ya, nextTick as We, version as xl, isProxy as ai, computed as $, toRef as Ce, openBlock as m, createElementBlock as k, createVNode as F, unref as T, createElementVNode as u, Fragment as ne, renderList as he, normalizeStyle as De, normalizeClass as Q, toDisplayString as D, createCommentVNode as z, onBeforeUnmount as si, createStaticVNode as Cs, useSlots as Ja, Transition as Te, withCtx as B, renderSlot as Se, Comment as _l, createBlock as J, resolveDynamicComponent as Ft, createTextVNode as Be, Teleport as Fn, withDirectives as lt, withModifiers as Xe, vModelText as sn, vShow as bn, createSlots as $s, vModelSelect as kl, withKeys as En, useAttrs as ka, inject as oi, mergeProps as Et } from "vue";
import * as Ss from "echarts/core";
import { TooltipComponent as wl, TitleComponent as Cl } from "echarts/components";
import { SankeyChart as $l } from "echarts/charts";
import { CanvasRenderer as Sl } from "echarts/renderers";
import je from "moment";
function Un(e) {
  return e + 0.5 | 0;
}
const Ot = (e, t, n) => Math.max(Math.min(e, n), t);
function Tn(e) {
  return Ot(Un(e * 2.55), 0, 255);
}
function jt(e) {
  return Ot(Un(e * 255), 0, 255);
}
function At(e) {
  return Ot(Un(e / 2.55) / 100, 0, 1);
}
function Ms(e) {
  return Ot(Un(e * 100), 0, 100);
}
const ut = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ka = [..."0123456789ABCDEF"], Ml = (e) => Ka[e & 15], Dl = (e) => Ka[(e & 240) >> 4] + Ka[e & 15], Xn = (e) => (e & 240) >> 4 === (e & 15), Tl = (e) => Xn(e.r) && Xn(e.g) && Xn(e.b) && Xn(e.a);
function Al(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ut[e[1]] * 17,
    g: 255 & ut[e[2]] * 17,
    b: 255 & ut[e[3]] * 17,
    a: t === 5 ? ut[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ut[e[1]] << 4 | ut[e[2]],
    g: ut[e[3]] << 4 | ut[e[4]],
    b: ut[e[5]] << 4 | ut[e[6]],
    a: t === 9 ? ut[e[7]] << 4 | ut[e[8]] : 255
  })), n;
}
const Bl = (e, t) => e < 255 ? t(e) : "";
function Ll(e) {
  var t = Tl(e) ? Ml : Dl;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Bl(e.a, t) : void 0;
}
const Pl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ii(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function Il(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Rl(e, t, n) {
  const a = ii(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function Fl(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function es(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let r, c, d;
  return o !== i && (d = o - i, c = l > 0.5 ? d / (2 - o - i) : d / (o + i), r = Fl(n, a, s, d, o), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function ts(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(jt);
}
function ns(e, t, n) {
  return ts(ii, e, t, n);
}
function El(e, t, n) {
  return ts(Rl, e, t, n);
}
function Ol(e, t, n) {
  return ts(Il, e, t, n);
}
function li(e) {
  return (e % 360 + 360) % 360;
}
function Vl(e) {
  const t = Pl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Tn(+t[5]) : jt(+t[5]));
  const s = li(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = El(s, o, i) : t[1] === "hsv" ? a = Ol(s, o, i) : a = ns(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function zl(e, t) {
  var n = es(e);
  n[0] = li(n[0] + t), n = ns(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Nl(e) {
  if (!e)
    return;
  const t = es(e), n = t[0], a = Ms(t[1]), s = Ms(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${At(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const Ds = {
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
}, Ts = {
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
function Hl() {
  const e = {}, t = Object.keys(Ts), n = Object.keys(Ds);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, Ds[o]);
    o = parseInt(Ts[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Gn;
function Wl(e) {
  Gn || (Gn = Hl(), Gn.transparent = [0, 0, 0, 0]);
  const t = Gn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const jl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Yl(e) {
  const t = jl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Tn(i) : Ot(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? Tn(a) : Ot(a, 0, 255)), s = 255 & (t[4] ? Tn(s) : Ot(s, 0, 255)), o = 255 & (t[6] ? Tn(o) : Ot(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function Kl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${At(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ta = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, hn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Ul(e, t, n) {
  const a = hn(At(e.r)), s = hn(At(e.g)), o = hn(At(e.b));
  return {
    r: jt(Ta(a + n * (hn(At(t.r)) - a))),
    g: jt(Ta(s + n * (hn(At(t.g)) - s))),
    b: jt(Ta(o + n * (hn(At(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Zn(e, t, n) {
  if (e) {
    let a = es(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = ns(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ri(e, t) {
  return e && Object.assign(t || {}, e);
}
function As(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = jt(e[3]))) : (t = ri(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = jt(t.a)), t;
}
function ql(e) {
  return e.charAt(0) === "r" ? Yl(e) : Vl(e);
}
class On {
  constructor(t) {
    if (t instanceof On)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = As(t) : n === "string" && (a = Al(t) || Wl(t) || ql(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ri(this._rgb);
    return t && (t.a = At(t.a)), t;
  }
  set rgb(t) {
    this._rgb = As(t);
  }
  rgbString() {
    return this._valid ? Kl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Ll(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Nl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, r = a.a - s.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      o = 1 - c, a.r = 255 & c * a.r + o * s.r + 0.5, a.g = 255 & c * a.g + o * s.g + 0.5, a.b = 255 & c * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Ul(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new On(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = jt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Un(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Zn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Zn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Zn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Zn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return zl(this._rgb, t), this;
  }
}
function Mt() {
}
const Xl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Ie(e) {
  return e == null;
}
function Ye(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ae(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ft(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function _t(e, t) {
  return ft(e) ? e : t;
}
function _e(e, t) {
  return typeof e > "u" ? t : e;
}
const Gl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, ci = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ee(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Re(e, t, n, a) {
  let s, o, i;
  if (Ye(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (Ae(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function fa(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function ga(e) {
  if (Ye(e))
    return e.map(ga);
  if (Ae(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = ga(e[n[s]]);
    return t;
  }
  return e;
}
function di(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Zl(e, t, n, a) {
  if (!di(e))
    return;
  const s = t[e], o = n[e];
  Ae(s) && Ae(o) ? Vn(s, o, a) : t[e] = ga(o);
}
function Vn(e, t, n) {
  const a = Ye(t) ? t : [
    t
  ], s = a.length;
  if (!Ae(e))
    return e;
  n = n || {};
  const o = n.merger || Zl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !Ae(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      o(r[c], e, i, n);
  }
  return e;
}
function Ln(e, t) {
  return Vn(e, t, {
    merger: Ql
  });
}
function Ql(e, t, n) {
  if (!di(e))
    return;
  const a = t[e], s = n[e];
  Ae(a) && Ae(s) ? Ln(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ga(s));
}
const Bs = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Jl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function er(e) {
  const t = Jl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function ln(e, t) {
  return (Bs[t] || (Bs[t] = er(t)))(e);
}
function as(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const zn = (e) => typeof e < "u", Kt = (e) => typeof e == "function", Ls = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function tr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Fe = Math.PI, Ne = 2 * Fe, nr = Ne + Fe, ma = Number.POSITIVE_INFINITY, ar = Fe / 180, Ke = Fe / 2, Zt = Fe / 4, Ps = Fe * 2 / 3, ui = Math.log10, Ct = Math.sign;
function Pn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Is(e) {
  const t = Math.round(e);
  e = Pn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(ui(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function sr(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function or(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Nn(e) {
  return !or(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function ir(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function lr(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Bt(e) {
  return e * (Fe / 180);
}
function rr(e) {
  return e * (180 / Fe);
}
function Rs(e) {
  if (!ft(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function hi(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Fe && (o += Ne), {
    angle: o,
    distance: s
  };
}
function Ua(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function cr(e, t) {
  return (e - t + nr) % Ne - Fe;
}
function bt(e) {
  return (e % Ne + Ne) % Ne;
}
function Hn(e, t, n, a) {
  const s = bt(e), o = bt(t), i = bt(n), l = bt(o - s), r = bt(i - s), c = bt(s - o), d = bt(s - i);
  return s === o || s === i || a && o === i || l > r && c < d;
}
function Qe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function dr(e) {
  return Qe(e, -32768, 32767);
}
function Vt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function ss(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const an = (e, t, n, a) => ss(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), ur = (e, t, n) => ss(e, n, (a) => e[a][t] >= n);
function hr(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const fi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function fr(e, t) {
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
  }), fi.forEach((n) => {
    const a = "_onData" + as(n), s = e[n];
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
function Fs(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (fi.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function gi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const mi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function pi(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, mi.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function gr(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const os = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ge = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, mr = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function pr(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: p, minDefined: v, maxDefined: g } = i.getUserBounds();
    if (v) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        an(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : an(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, s + 1).reverse().findIndex((b) => !Ie(b[l.axis]));
        s -= Math.max(0, y);
      }
      s = Qe(s, 0, a - 1);
    }
    if (g) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        an(r, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : an(t, d, i.getPixelForValue(p), !0).hi + 1
      );
      if (c) {
        const b = r.slice(y - 1).findIndex((f) => !Ie(f[l.axis]));
        y += Math.max(0, b);
      }
      o = Qe(y, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function br(e) {
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
const Qn = (e) => e === 0 || e === 1, Es = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ne / n)), Os = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ne / n) + 1, In = {
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
  easeInSine: (e) => -Math.cos(e * Ke) + 1,
  easeOutSine: (e) => Math.sin(e * Ke),
  easeInOutSine: (e) => -0.5 * (Math.cos(Fe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Qn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Qn(e) ? e : Es(e, 0.075, 0.3),
  easeOutElastic: (e) => Qn(e) ? e : Os(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Qn(e) ? e : e < 0.5 ? 0.5 * Es(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Os(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - In.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? In.easeInBounce(e * 2) * 0.5 : In.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function is(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Vs(e) {
  return is(e) ? e : new On(e);
}
function Aa(e) {
  return is(e) ? e : new On(e).saturate(0.5).darken(0.1).hexString();
}
const vr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], yr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function xr(e) {
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
      properties: yr
    },
    numbers: {
      type: "number",
      properties: vr
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
function _r(e) {
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
const zs = /* @__PURE__ */ new Map();
function kr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = zs.get(n);
  return a || (a = new Intl.NumberFormat(e, t), zs.set(n, a)), a;
}
function ls(e, t, n) {
  return kr(t, n).format(e);
}
const wr = {
  values(e) {
    return Ye(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = Cr(e, n);
    }
    const i = ui(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), ls(e, a, r);
  }
};
function Cr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var bi = {
  formatters: wr
};
function $r(e) {
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
      callback: bi.formatters.values,
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
const rn = /* @__PURE__ */ Object.create(null), qa = /* @__PURE__ */ Object.create(null);
function Rn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ba(e, t, n) {
  return typeof t == "string" ? Vn(Rn(e, t), n) : Vn(Rn(e, ""), t);
}
class Sr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => Aa(s.backgroundColor), this.hoverBorderColor = (a, s) => Aa(s.borderColor), this.hoverColor = (a, s) => Aa(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Ba(this, t, n);
  }
  get(t) {
    return Rn(this, t);
  }
  describe(t, n) {
    return Ba(qa, t, n);
  }
  override(t, n) {
    return Ba(rn, t, n);
  }
  route(t, n, a, s) {
    const o = Rn(this, t), i = Rn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[s];
          return Ae(r) ? Object.assign({}, c, r) : _e(r, c);
        },
        set(r) {
          this[l] = r;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var He = /* @__PURE__ */ new Sr({
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
  xr,
  _r,
  $r
]);
function Mr(e) {
  return !e || Ie(e.size) || Ie(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Ns(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Qt(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function Hs(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Xa(e, t, n, a) {
  vi(e, t, n, a, null);
}
function vi(e, t, n, a, s) {
  let o, i, l, r, c, d, h, p;
  const v = t.pointStyle, g = t.rotation, y = t.radius;
  let b = (g || 0) * ar;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, y, 0, 0, Ne) : e.arc(n, a, y, 0, Ne), e.closePath();
        break;
      case "triangle":
        d = s ? s / 2 : y, e.moveTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ps, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ps, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(b + Zt) * r, h = Math.cos(b + Zt) * (s ? s / 2 - c : r), l = Math.sin(b + Zt) * r, p = Math.sin(b + Zt) * (s ? s / 2 - c : r), e.arc(n - h, a - l, c, b - Fe, b - Ke), e.arc(n + p, a - i, c, b - Ke, b), e.arc(n + h, a + l, c, b, b + Ke), e.arc(n - p, a + i, c, b + Ke, b + Fe), e.closePath();
        break;
      case "rect":
        if (!g) {
          r = Math.SQRT1_2 * y, d = s ? s / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        b += Zt;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, p = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + p, a - i), e.lineTo(n + h, a + l), e.lineTo(n - p, a + i), e.closePath();
        break;
      case "crossRot":
        b += Zt;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, p = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "star":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, p = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i), b += Zt, h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, p = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(b) * y, l = Math.sin(b) * y, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(b) * (s ? s / 2 : y), a + Math.sin(b) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Wn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function rs(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function cs(e) {
  e.restore();
}
function Dr(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Tr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function Ar(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Ie(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Br(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, r = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, d = s.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Lr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function jn(e, t, n, a, s, o = {}) {
  const i = Ye(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = s.string, Ar(e, o), r = 0; r < i.length; ++r)
    c = i[r], o.backdrop && Lr(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), Ie(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), Br(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function pa(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Fe, Fe, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Fe, Ke, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Ke, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Ke, !0), e.lineTo(n + i.topLeft, a);
}
const Pr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Ir = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Rr(e, t) {
  const n = ("" + e).match(Pr);
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
const Fr = (e) => +e || 0;
function ds(e, t) {
  const n = {}, a = Ae(t), s = a ? Object.keys(t) : t, o = Ae(e) ? a ? (i) => _e(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = Fr(o(i));
  return n;
}
function yi(e) {
  return ds(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function mn(e) {
  return ds(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function gt(e) {
  const t = yi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Je(e, t) {
  e = e || {}, t = t || He.font;
  let n = _e(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = _e(e.style, t.style);
  a && !("" + a).match(Ir) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: _e(e.family, t.family),
    lineHeight: Rr(_e(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: _e(e.weight, t.weight),
    string: ""
  };
  return s.string = Mr(s), s;
}
function Jn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function Er(e, t, n) {
  const { min: a, max: s } = e, o = ci(t, (s - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function cn(e, t) {
  return Object.assign(Object.create(e), t);
}
function us(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = wi("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => us([
      l,
      ...e
    ], t, o, a)
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
      return _i(l, r, () => Yr(r, t, e, l));
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
      return js(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return js(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const d = l._storage || (l._storage = s());
      return l[r] = d[r] = c, delete l._keys, !0;
    }
  });
}
function vn(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: xi(e, a),
    setContext: (o) => vn(e, o, n, a),
    override: (o) => vn(e.override(o), t, n, a)
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
      return _i(o, i, () => Vr(o, i, l));
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
function xi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Kt(n) ? n : () => n,
    isIndexable: Kt(a) ? a : () => a
  };
}
const Or = (e, t) => e ? e + as(t) : t, hs = (e, t) => Ae(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function _i(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Vr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Kt(l) && i.isScriptable(t) && (l = zr(t, l, e, n)), Ye(l) && l.length && (l = Nr(t, l, e, i.isIndexable)), hs(t, l) && (l = vn(l, s, o && o[t], i)), l;
}
function zr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(o, i || a);
  return l.delete(e), hs(e, r) && (r = fs(s._scopes, s, e, r)), r;
}
function Nr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (Ae(t[0])) {
    const r = t, c = s._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = fs(c, s, e, d);
      t.push(vn(h, o, i && i[e], l));
    }
  }
  return t;
}
function ki(e, t, n) {
  return Kt(e) ? e(t, n) : e;
}
const Hr = (e, t) => e === !0 ? t : typeof e == "string" ? ln(t, e) : void 0;
function Wr(e, t, n, a, s) {
  for (const o of t) {
    const i = Hr(n, o);
    if (i) {
      e.add(i);
      const l = ki(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function fs(e, t, n, a) {
  const s = t._rootScopes, o = ki(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Ws(l, i, n, o || n, a);
  return r === null || typeof o < "u" && o !== n && (r = Ws(l, i, o, r, a), r === null) ? !1 : us(Array.from(l), [
    ""
  ], s, o, () => jr(t, n, a));
}
function Ws(e, t, n, a, s) {
  for (; n; )
    n = Wr(e, t, n, a, s);
  return n;
}
function jr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Ye(s) && Ae(n) ? n : s || {};
}
function Yr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = wi(Or(o, e), n), typeof s < "u")
      return hs(e, s) ? fs(n, a, e, s) : s;
}
function wi(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function js(e) {
  let t = e._keys;
  return t || (t = e._keys = Kr(e._scopes)), t;
}
function Kr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Ur = Number.EPSILON || 1e-14, yn = (e, t) => t < e.length && !e[t].skip && e[t], Ci = (e) => e === "x" ? "y" : "x";
function qr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Ua(o, s), r = Ua(i, o);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, p = a * d;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + p * (i.x - s.x),
      y: o.y + p * (i.y - s.y)
    }
  };
}
function Xr(e, t, n) {
  const a = e.length;
  let s, o, i, l, r, c = yn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = yn(e, d + 1), !(!r || !c)) {
      if (Pn(t[d], 0, Ur)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      s = n[d] / t[d], o = n[d + 1] / t[d], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = s * i * t[d], n[d + 1] = o * i * t[d]);
    }
}
function Gr(e, t, n = "x") {
  const a = Ci(n), s = e.length;
  let o, i, l, r = yn(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = r, r = yn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (o = (d - i[n]) / 3, l[`cp1${n}`] = d - o, l[`cp1${a}`] = h - o * t[c]), r && (o = (r[n] - d) / 3, l[`cp2${n}`] = d + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function Zr(e, t = "x") {
  const n = Ci(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, r, c = yn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = yn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        s[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      o[i] = l ? c ? Ct(s[i - 1]) !== Ct(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Xr(e, s, o), Gr(e, o, t);
}
function ea(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Qr(e, t) {
  let n, a, s, o, i, l = Wn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Wn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = ea(s.cp1x, t.left, t.right), s.cp1y = ea(s.cp1y, t.top, t.bottom)), l && (s.cp2x = ea(s.cp2x, t.left, t.right), s.cp2y = ea(s.cp2y, t.top, t.bottom)));
}
function Jr(e, t, n, a, s) {
  let o, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Zr(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], r = qr(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Qr(e, n);
}
function gs() {
  return typeof window < "u" && typeof document < "u";
}
function ms(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ba(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const wa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ec(e, t) {
  return wa(e).getPropertyValue(t);
}
const tc = [
  "top",
  "right",
  "bottom",
  "left"
];
function on(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = tc[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const nc = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function ac(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, r;
  if (nc(s, o, e.target))
    l = s, r = o;
  else {
    const c = t.getBoundingClientRect();
    l = a.clientX - c.left, r = a.clientY - c.top, i = !0;
  }
  return {
    x: l,
    y: r,
    box: i
  };
}
function tn(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = wa(n), o = s.boxSizing === "border-box", i = on(s, "padding"), l = on(s, "border", "width"), { x: r, y: c, box: d } = ac(e, n), h = i.left + (d && l.left), p = i.top + (d && l.top);
  let { width: v, height: g } = t;
  return o && (v -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - p) / g * n.height / a)
  };
}
function sc(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && ms(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = wa(o), r = on(l, "border", "width"), c = on(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = ba(l.maxWidth, o, "clientWidth"), s = ba(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ma,
    maxHeight: s || ma
  };
}
const zt = (e) => Math.round(e * 10) / 10;
function oc(e, t, n, a) {
  const s = wa(e), o = on(s, "margin"), i = ba(s.maxWidth, e, "clientWidth") || ma, l = ba(s.maxHeight, e, "clientHeight") || ma, r = sc(e, t, n);
  let { width: c, height: d } = r;
  if (s.boxSizing === "content-box") {
    const p = on(s, "border", "width"), v = on(s, "padding");
    c -= v.width + p.width, d -= v.height + p.height;
  }
  return c = Math.max(0, c - o.width), d = Math.max(0, a ? c / a : d - o.height), c = zt(Math.min(c, i, r.maxWidth)), d = zt(Math.min(d, l, r.maxHeight)), c && !d && (d = zt(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = zt(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function Ys(e, t, n) {
  const a = t || 1, s = zt(e.height * a), o = zt(e.width * a);
  e.height = zt(e.height), e.width = zt(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const ic = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    gs() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ks(e, t) {
  const n = ec(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function nn(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function lc(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function rc(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = nn(e, s, n), l = nn(s, o, n), r = nn(o, t, n), c = nn(i, l, n), d = nn(l, r, n);
  return nn(c, d, n);
}
const cc = function(e, t) {
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
}, dc = function() {
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
function pn(e, t, n) {
  return e ? cc(t, n) : dc();
}
function $i(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Si(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Mi(e) {
  return e === "angle" ? {
    between: Hn,
    compare: cr,
    normalize: bt
  } : {
    between: Vt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Us({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function uc(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = Mi(a), r = t.length;
  let { start: c, end: d, loop: h } = e, p, v;
  if (h) {
    for (c += r, d += r, p = 0, v = r; p < v && i(l(t[c % r][a]), s, o); ++p)
      c--, d--;
    c %= r, d %= r;
  }
  return d < c && (d += r), {
    start: c,
    end: d,
    loop: h,
    style: e.style
  };
}
function hc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: r, normalize: c } = Mi(a), { start: d, end: h, loop: p, style: v } = uc(e, t, n), g = [];
  let y = !1, b = null, f, x, _;
  const w = () => r(s, _, f) && l(s, _) !== 0, C = () => l(o, f) === 0 || r(o, _, f), M = () => y || w(), S = () => !y || C();
  for (let I = d, V = d; I <= h; ++I)
    x = t[I % i], !x.skip && (f = c(x[a]), f !== _ && (y = r(f, s, o), b === null && M() && (b = l(f, s) === 0 ? I : V), b !== null && S() && (g.push(Us({
      start: b,
      end: I,
      loop: p,
      count: i,
      style: v
    })), b = null), V = I, _ = f));
  return b !== null && g.push(Us({
    start: b,
    end: h,
    loop: p,
    count: i,
    style: v
  })), g;
}
function fc(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = hc(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function gc(e, t, n, a) {
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
function mc(e, t, n, a) {
  const s = e.length, o = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= n; ++r) {
    const c = e[r % s];
    c.skip || c.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (r - 1) % s,
      loop: a
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: a
  }), o;
}
function pc(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = gc(n, s, o, a);
  if (a === !0)
    return qs(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const r = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return qs(e, mc(n, i, r, c), n, t);
}
function qs(e, t, n, a) {
  return !a || !a.setContext || !n ? t : bc(e, t, n, a);
}
function bc(e, t, n, a) {
  const s = e._chart.getContext(), o = Xs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = o, h = t[0].start, p = h;
  function v(g, y, b, f) {
    const x = l ? -1 : 1;
    if (g !== y) {
      for (g += r; n[g % r].skip; )
        g -= x;
      for (; n[y % r].skip; )
        y += x;
      g % r !== y % r && (c.push({
        start: g % r,
        end: y % r,
        loop: b,
        style: f
      }), d = f, h = y % r);
    }
  }
  for (const g of t) {
    h = l ? h : g.start;
    let y = n[h % r], b;
    for (p = h + 1; p <= g.end; p++) {
      const f = n[p % r];
      b = Xs(a.setContext(cn(s, {
        type: "segment",
        p0: y,
        p1: f,
        p0DataIndex: (p - 1) % r,
        p1DataIndex: p % r,
        datasetIndex: i
      }))), vc(b, d) && v(h, p - 1, g.loop, d), y = f, d = b;
    }
    h < p - 1 && v(h, p - 1, g.loop, d);
  }
  return c;
}
function Xs(e) {
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
function vc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return is(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function ta(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function yc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: ta(n, t, "left"),
    right: ta(n, t, "right"),
    top: ta(a, t, "top"),
    bottom: ta(a, t, "bottom")
  } : t;
}
function xc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = yc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class _c {
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
    this._request || (this._running = !0, this._request = mi.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, s) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = o[i], r._active ? (r._total > a.duration && (a.duration = r._total), r.tick(t), l = !0) : (o[i] = o[o.length - 1], o.pop());
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
var Dt = /* @__PURE__ */ new _c();
const Gs = "transparent", kc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Vs(e || Gs), s = a.valid && Vs(t || Gs);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class wc {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Jn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Jn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || kc[t.type || typeof i], this._easing = In[t.easing] || In.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Jn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Jn([
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
    let r;
    if (this._active = o !== l && (i || n < a), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = o;
      return;
    }
    r = n / a % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[s] = this._fn(o, l, r);
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
class Di {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Ae(t))
      return;
    const n = Object.keys(He.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!Ae(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Ye(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = $c(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && Cc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const d = n[c];
      let h = o[c];
      const p = a.get(c);
      if (h)
        if (p && h.active()) {
          h.update(p, d, l);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        t[c] = d;
        continue;
      }
      o[c] = h = new wc(p, t, c, d), s.push(h);
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
      return Dt.add(this._chart, a), !0;
  }
}
function Cc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function $c(e, t) {
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
function Zs(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function Sc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Zs(e, n), s = Zs(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function Mc(e) {
  let t, n, a, s;
  return Ae(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function Ti(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Qs(e, t, n, a = {}) {
  const s = e.keys, o = a.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (r = +s[i], r === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = e.values[r], ft(c) && (o || t === 0 || Ct(t) === Ct(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Dc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [s]: d,
      [o]: e[d]
    };
  return l;
}
function La(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Tc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Ac(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function Bc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Js(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function eo(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, r = o.axis, c = i.axis, d = Tc(o, i, a), h = t.length;
  let p;
  for (let v = 0; v < h; ++v) {
    const g = t[v], { [r]: y, [c]: b } = g, f = g._stacks || (g._stacks = {});
    p = f[c] = Bc(s, d, y), p[l] = b, p._top = Js(p, i, !0, a.type), p._bottom = Js(p, i, !1, a.type);
    const x = p._visualValues || (p._visualValues = {});
    x[l] = b;
  }
}
function Pa(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Lc(e, t) {
  return cn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Pc(e, t, n) {
  return cn(e, {
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
function _n(e, t) {
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
const Ia = (e) => e === "reset" || e === "none", to = (e, t) => t ? e : Object.assign({}, e), Ic = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Ti(n, !0),
  values: null
};
class Ca {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = La(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && _n(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, p, v, g) => h === "x" ? p : h === "r" ? g : v, o = n.xAxisID = _e(a.xAxisID, Pa(t, "x")), i = n.yAxisID = _e(a.yAxisID, Pa(t, "y")), l = n.rAxisID = _e(a.rAxisID, Pa(t, "r")), r = n.indexAxis, c = n.iAxisID = s(r, o, i, l), d = n.vAxisID = s(r, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
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
    this._data && Fs(this._data, this), t._stacked && _n(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Ae(n)) {
      const s = this._cachedMeta;
      this._data = Dc(n, s);
    } else if (a !== n) {
      if (a) {
        Fs(a, this);
        const s = this._cachedMeta;
        _n(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && fr(n, this), this._syncList = [], this._data = n;
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
    n._stacked = La(n.vScale, n), n.stack !== a.stack && (s = !0, _n(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (eo(this, n._parsed), n._stacked = La(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let r = t === 0 && n === s.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, p;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, p = s;
    else {
      Ye(s[t]) ? p = this.parseArrayData(a, s, t, n) : Ae(s[t]) ? p = this.parseObjectData(a, s, t, n) : p = this.parsePrimitiveData(a, s, t, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = p[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && eo(this, p);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, r = i.axis, c = o.getLabels(), d = o === i, h = new Array(s);
    let p, v, g;
    for (p = 0, v = s; p < v; ++p)
      g = p + a, h[p] = {
        [l]: d || o.parse(c[g], g),
        [r]: i.parse(n[g], g)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let r, c, d, h;
    for (r = 0, c = s; r < c; ++r)
      d = r + a, h = n[d], l[r] = {
        x: o.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(s);
    let d, h, p, v;
    for (d = 0, h = s; d < h; ++d)
      p = d + a, v = n[p], c[d] = {
        x: o.parse(ln(v, l), p),
        y: i.parse(ln(v, r), p)
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
      keys: Ti(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Qs(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Qs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), r = Ic(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Ac(l);
    let p, v;
    function g() {
      v = s[p];
      const y = v[l.axis];
      return !ft(v[t.axis]) || d > y || h < y;
    }
    for (p = 0; p < i && !(!g() && (this.updateRangeFromParsed(c, t, v, r), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!g()) {
          this.updateRangeFromParsed(c, t, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], ft(i) && a.push(i);
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
    this.update(t || "default"), n._clip = Mc(_e(this.options.clip, Sc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || s.length - l, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, o, l, r), d = l; d < l + r; ++d) {
      const h = s[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, o));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, o);
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
      o = i.$context || (i.$context = Pc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Lc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], r = this.enableOptionSharing && zn(a);
    if (l)
      return to(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = c.getOptionScopes(this.getDataset(), d), v = Object.keys(He.elements[t]), g = () => this.getContext(a, s, n), y = c.resolveNamedOptions(p, v, g, h);
    return y.$shared && (y.$shared = r, o[i] = Object.freeze(to(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let r;
    if (s.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), p = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(p, this.getContext(t, a, n));
    }
    const c = new Di(s, r && r.animations);
    return r && r._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Ia(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    Ia(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ia(n) && this._resolveAnimations(void 0, n).update(t, a);
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
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const r = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (r(o), l = t; l < i; ++l)
      o[l] = new this.dataElementType();
    this._parsing && r(s._parsed), this.parse(t, n), a && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, a, s) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const s = a._parsed.splice(t, n);
      a._stacked && _n(a, s);
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
function Rc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = gi(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function Fc(e) {
  const t = e.iScale, n = Rc(t, e.type);
  let a = t._length, s, o, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (zn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), r();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), r();
  return a;
}
function Ec(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return Ie(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Oc(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const r = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const c = o - (o - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Vc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[n.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function Ai(e, t, n, a) {
  return Ye(e) ? Vc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function no(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, r = [];
  let c, d, h, p;
  for (c = n, d = n + a; c < d; ++c)
    p = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), r.push(Ai(p, h, o, c));
  return r;
}
function Ra(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function zc(e, t, n) {
  return e !== 0 ? Ct(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Nc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function Hc(e, t, n, a) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Nc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = d : (o[ao(d, i, l, r)] = !0, s = c)), o[ao(s, i, l, r)] = !0, e.borderSkipped = o;
}
function ao(e, t, n, a) {
  return a ? (e = Wc(e, t, n), e = so(e, n, t)) : e = so(e, t, n), e;
}
function Wc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function so(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function jc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Yc extends Ca {
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
    return no(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return no(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = o.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let p, v, g, y;
    for (p = a, v = a + s; p < v; ++p)
      y = n[p], g = {}, g[o.axis] = o.parse(ln(y, c), p), h.push(Ai(ln(y, d), g, i, p));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = Ra(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(n, s);
    for (let v = n; v < n + a; v++) {
      const g = this.getParsed(v), y = o || Ie(g[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, d), f = (g._stacks || {})[l.axis], x = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !f || Ra(g._custom) || i === f._top || i === f._bottom,
        x: c ? y.head : b.center,
        y: c ? b.center : y.head,
        height: c ? b.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : b.size
      };
      p && (x.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : s));
      const _ = x.options || t[v].options;
      Hc(x, _, f, i), jc(x, _, d.ratio), this.updateElement(t[v], v, x, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), p = h && h[d.vScale.axis];
      if (Ie(p) || isNaN(p))
        return !0;
    };
    for (const d of s)
      if (!(n !== void 0 && c(d)) && ((o === !1 || i.indexOf(d.stack) === -1 || o === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      t[_e(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || Fc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, r = this.getParsed(t), c = r._custom, d = Ra(c);
    let h = r[n.axis], p = 0, v = a ? this.applyStack(n, r, a) : h, g, y;
    v !== h && (p = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && Ct(h) !== Ct(c.barEnd) && (p = 0), p += h);
    const b = !Ie(o) && !d ? o : p;
    let f = n.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(p + v) : g = f, y = g - f, Math.abs(y) < i) {
      y = zc(y, n, l) * i, h === l && (f -= y / 2);
      const x = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(x, _), C = Math.max(x, _);
      f = Math.max(Math.min(f, C), w), g = f + y, a && !d && (r._stacks[n.axis]._visualValues[s] = n.getValueForPixel(g) - n.getValueForPixel(f));
    }
    if (f === n.getPixelForValue(l)) {
      const x = Ct(y) * n.getLineWidthForValue(l) / 2;
      f += x, y -= x;
    }
    return {
      size: y,
      base: f,
      head: g,
      center: g + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = _e(s.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Oc(t, n, s, d * c) : Ec(t, n, s, d * c), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(_e(p, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
      l = h.start + h.chunk * g + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(t)[a.axis], t), r = Math.min(i, n.min * n.ratio);
    return {
      base: l - r / 2,
      head: l + r / 2,
      center: l,
      size: r
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, s = a.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[n.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function Kc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Ne) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), p = Math.sin(r), v = (_, w, C) => Hn(_, l, r, !0) ? 1 : Math.max(w, w * n, C, C * n), g = (_, w, C) => Hn(_, l, r, !0) ? -1 : Math.min(w, w * n, C, C * n), y = v(0, c, h), b = v(Ke, d, p), f = g(Fe, c, h), x = g(Fe + Ke, d, p);
    a = (y - f) / 2, s = (b - x) / 2, o = -(y + f) / 2, i = -(b + x) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Uc extends Ca {
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
            return n.labels.length && n.datasets.length ? n.labels.map((r, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
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
      let o = (r) => +a[r];
      if (Ae(a[t])) {
        const { key: r = "value" } = this._parsing;
        o = (c) => +ln(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return Bt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Bt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ne, n = -Ne;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Gl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: v, offsetX: g, offsetY: y } = Kc(h, d, r), b = (a.width - i) / p, f = (a.height - i) / v, x = Math.max(Math.min(b, f) / 2, 0), _ = ci(this.options.radius, x), w = Math.max(_ * r, 0), C = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * _, this.offsetY = y * _, s.total = this.calculateTotal(), this.outerRadius = _ - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Ne);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, p = o && c.animateScale, v = p ? 0 : this.innerRadius, g = p ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: b } = this._getSharedOptions(n, s);
    let f = this._getRotation(), x;
    for (x = 0; x < n; ++x)
      f += this._circumference(x, o);
    for (x = n; x < n + a; ++x) {
      const _ = this._circumference(x, o), w = t[x], C = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: f,
        endAngle: f + _,
        circumference: _,
        outerRadius: g,
        innerRadius: v
      };
      b && (C.options = y || this.resolveDataElementOptions(x, w.active ? "active" : s)), f += _, this.updateElement(w, x, C, s);
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
    return n > 0 && !isNaN(t) ? Ne * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = ls(n._parsed[t], a.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let s, o, i, l, r;
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
      r = l.resolveDataElementOptions(s), r.borderAlign !== "inner" && (n = Math.max(n, r.borderWidth || 0, r.hoverBorderWidth || 0));
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
    return Math.max(_e(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class qc extends Ca {
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
    let { start: l, count: r } = pr(n, s, i);
    this._drawStart = l, this._drawCount = r, br(n) && (l = 0, r = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, r, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, s), p = i.axis, v = l.axis, { spanGaps: g, segment: y } = this.options, b = Nn(g) ? g : Number.POSITIVE_INFINITY, f = this.chart._animationsDisabled || o || s === "none", x = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let C = 0; C < _; ++C) {
      const M = t[C], S = f ? M : {};
      if (C < n || C >= x) {
        S.skip = !0;
        continue;
      }
      const I = this.getParsed(C), V = Ie(I[v]), E = S[p] = i.getPixelForValue(I[p], C), A = S[v] = o || V ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, I, r) : I[v], C);
      S.skip = isNaN(E) || isNaN(A) || V, S.stop = C > 0 && Math.abs(I[p] - w[p]) > b, y && (S.parsed = I, S.raw = c.data[C]), h && (S.options = d || this.resolveDataElementOptions(C, M.active ? "active" : s)), f || this.updateElement(M, C, S, s), w = I;
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
class Xc extends Uc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Jt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ps {
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
    Object.assign(ps.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Jt();
  }
  parse() {
    return Jt();
  }
  format() {
    return Jt();
  }
  add() {
    return Jt();
  }
  diff() {
    return Jt();
  }
  startOf() {
    return Jt();
  }
  endOf() {
    return Jt();
  }
}
var Gc = {
  _date: ps
};
function Zc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? ur : an;
    if (a) {
      if (s._sharedOptions) {
        const d = o[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const p = c(o, t, n - h), v = c(o, t, n + h);
          return {
            lo: p.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(o, t, n);
      if (r) {
        const { vScale: h } = s._cachedMeta, { _parsed: p } = e, v = p.slice(0, d.lo + 1).reverse().findIndex((y) => !Ie(y[h.axis]));
        d.lo -= Math.max(0, v);
        const g = p.slice(d.hi).findIndex((y) => !Ie(y[h.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function $a(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = o.length; l < r; ++l) {
    const { index: c, data: d } = o[l], { lo: h, hi: p } = Zc(o[l], t, i, s);
    for (let v = h; v <= p; ++v) {
      const g = d[v];
      g.skip || a(g, c, v);
    }
  }
}
function Qc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function Fa(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || $a(e, n, t, function(l, r, c) {
    !s && !Wn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), o;
}
function Jc(e, t, n, a) {
  let s = [];
  function o(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = hi(i, {
      x: t.x,
      y: t.y
    });
    Hn(h, c, d) && s.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return $a(e, n, t, o), s;
}
function ed(e, t, n, a, s, o) {
  let i = [];
  const l = Qc(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, p) {
    const v = d.inRange(t.x, t.y, s);
    if (a && !v)
      return;
    const g = d.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(g)) && !v)
      return;
    const b = l(t, g);
    b < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: p
      }
    ], r = b) : b === r && i.push({
      element: d,
      datasetIndex: h,
      index: p
    });
  }
  return $a(e, n, t, c), i;
}
function Ea(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Jc(e, t, n, s) : ed(e, t, n, a, s, o);
}
function oo(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return $a(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], s) && (o.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var td = {
  modes: {
    index(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Fa(e, s, o, a, i) : Ea(e, s, o, !1, a, i), r = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((c) => {
        const d = l[0].index, h = c.data[d];
        h && !h.skip && r.push({
          element: h,
          datasetIndex: c.index,
          index: d
        });
      }), r) : [];
    },
    dataset(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Fa(e, s, o, a, i) : Ea(e, s, o, !1, a, i);
      if (l.length > 0) {
        const r = l[0].datasetIndex, c = e.getDatasetMeta(r).data;
        l = [];
        for (let d = 0; d < c.length; ++d)
          l.push({
            element: c[d],
            datasetIndex: r,
            index: d
          });
      }
      return l;
    },
    point(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Fa(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = tn(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Ea(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = tn(t, e);
      return oo(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = tn(t, e);
      return oo(e, s, "y", n.intersect, a);
    }
  }
};
const Bi = [
  "left",
  "top",
  "right",
  "bottom"
];
function kn(e, t) {
  return e.filter((n) => n.pos === t);
}
function io(e, t) {
  return e.filter((n) => Bi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function wn(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function nd(e) {
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
function ad(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !Bi.includes(s))
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
function sd(e, t) {
  const n = ad(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = s) : (l.width = a, l.height = d ? d * s : r && t.availableHeight);
  }
  return n;
}
function od(e) {
  const t = nd(e), n = wn(t.filter((c) => c.box.fullSize), !0), a = wn(kn(t, "left"), !0), s = wn(kn(t, "right")), o = wn(kn(t, "top"), !0), i = wn(kn(t, "bottom")), l = io(t, "x"), r = io(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(r).concat(i).concat(l),
    chartArea: kn(t, "chartArea"),
    vertical: a.concat(s).concat(r),
    horizontal: o.concat(i).concat(l)
  };
}
function lo(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Li(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function id(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!Ae(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && Li(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - lo(i, e, "left", "right")), r = Math.max(0, t.outerHeight - lo(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function ld(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function rd(e, t) {
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
function An(e, t, n, a) {
  const s = [];
  let o, i, l, r, c, d;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    l = e[o], r = l.box, r.update(l.width || t.w, l.height || t.h, rd(l.horizontal, t));
    const { same: h, other: p } = id(t, n, l, a);
    c |= h && s.length, d = d || p, r.fullSize || s.push(l);
  }
  return c && An(s, t, n, a) || d;
}
function na(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function ro(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, p = c.size || r.height;
      zn(c.start) && (i = c.start), r.fullSize ? na(r, s.left, i, n.outerWidth - s.right - s.left, p) : na(r, t.left + c.placed, i, h, p), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, p = c.size || r.width;
      zn(c.start) && (o = c.start), r.fullSize ? na(r, o, s.top, p, n.outerHeight - s.bottom - s.top) : na(r, o, t.top + c.placed, p, h), c.start = o, c.placed += h, o = r.right;
    }
  }
  t.x = o, t.y = i;
}
var ht = {
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
    const s = gt(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = od(e.boxes), r = l.vertical, c = l.horizontal;
    Re(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, b) => b.box.options && b.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / d,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, s);
    Li(p, gt(a));
    const v = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), g = sd(r.concat(c), h);
    An(l.fullSize, v, h, g), An(r, v, h, g), An(c, v, h, g) && An(r, v, h, g), ld(v), ro(l.leftAndTop, v, h, g), v.x += v.w, v.y += v.h, ro(l.rightAndBottom, v, h, g), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Re(l.chartArea, (y) => {
      const b = y.box;
      Object.assign(b, e.chartArea), b.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Pi {
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
class cd extends Pi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const da = "$chartjs", dd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, co = (e) => e === null || e === "";
function ud(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[da] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", co(s)) {
    const o = Ks(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (co(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ks(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Ii = ic ? {
  passive: !0
} : !1;
function hd(e, t, n) {
  e && e.addEventListener(t, n, Ii);
}
function fd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Ii);
}
function gd(e, t) {
  const n = dd[e.type] || e.type, { x: a, y: s } = tn(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function va(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function md(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || va(l.addedNodes, a), i = i && !va(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function pd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || va(l.removedNodes, a), i = i && !va(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Yn = /* @__PURE__ */ new Map();
let uo = 0;
function Ri() {
  const e = window.devicePixelRatio;
  e !== uo && (uo = e, Yn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function bd(e, t) {
  Yn.size || window.addEventListener("resize", Ri), Yn.set(e, t);
}
function vd(e) {
  Yn.delete(e), Yn.size || window.removeEventListener("resize", Ri);
}
function yd(e, t, n) {
  const a = e.canvas, s = a && ms(a);
  if (!s)
    return;
  const o = pi((l, r) => {
    const c = s.clientWidth;
    n(l, r), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || o(c, d);
  });
  return i.observe(s), bd(e, o), i;
}
function Oa(e, t, n) {
  n && n.disconnect(), t === "resize" && vd(e);
}
function xd(e, t, n) {
  const a = e.canvas, s = pi((o) => {
    e.ctx !== null && n(gd(o, e));
  }, e);
  return hd(a, t, s), s;
}
class _d extends Pi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (ud(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[da])
      return !1;
    const a = n[da].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      Ie(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[da], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: md,
      detach: pd,
      resize: yd
    }[n] || xd;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: Oa,
      detach: Oa,
      resize: Oa
    }[n] || fd)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return oc(t, n, a, s);
  }
  isAttached(t) {
    const n = t && ms(t);
    return !!(n && n.isConnected);
  }
}
function kd(e) {
  return !gs() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? cd : _d;
}
let Pt = class {
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
    return Nn(this.x) && Nn(this.y);
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
function wd(e, t) {
  const n = e.options.ticks, a = Cd(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? Sd(t) : [], i = o.length, l = o[0], r = o[i - 1], c = [];
  if (i > s)
    return Md(t, c, o, i / s), c;
  const d = $d(o, t, s);
  if (i > 0) {
    let h, p;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (aa(t, c, d, Ie(v) ? 0 : l - v, l), h = 0, p = i - 1; h < p; h++)
      aa(t, c, d, o[h], o[h + 1]);
    return aa(t, c, d, r, Ie(v) ? t.length : r + v), c;
  }
  return aa(t, c, d), c;
}
function Cd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function $d(e, t, n) {
  const a = Dd(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = sr(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const r = o[i];
    if (r > s)
      return r;
  }
  return Math.max(s, 1);
}
function Sd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Md(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function aa(e, t, n, a, s) {
  const o = _e(a, 0), i = Math.min(_e(s, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), s && (r = s - a, n = r / Math.floor(r / n)), d = o; d < 0; )
    l++, d = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(o + l * n));
}
function Dd(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Td = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ho = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, fo = (e, t) => Math.min(t || e, e);
function go(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function Ad(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(r - o, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(s - 1)) / 2, r += s < t ? c : -c, r < o - l || r > i + l)))
    return r;
}
function Bd(e, t) {
  Re(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function Cn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function mo(e, t) {
  if (!e.display)
    return 0;
  const n = Je(e.font, t), a = gt(e.padding);
  return (Ye(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Ld(e, t) {
  return cn(e, {
    scale: t,
    type: "scale"
  });
}
function Pd(e, t, n) {
  return cn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Id(e, t, n) {
  let a = os(e);
  return (n && t !== "right" || !n && t === "right") && (a = Td(a)), a;
}
function Rd(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, p, v, g;
  const y = i - s, b = l - o;
  if (e.isHorizontal()) {
    if (v = Ge(a, o, l), Ae(n)) {
      const f = Object.keys(n)[0], x = n[f];
      g = d[f].getPixelForValue(x) + y - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + y - t : g = ho(e, n, t);
    p = l - o;
  } else {
    if (Ae(n)) {
      const f = Object.keys(n)[0], x = n[f];
      v = d[f].getPixelForValue(x) - b + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - b + t : v = ho(e, n, t);
    g = Ge(a, i, s), h = n === "left" ? -Ke : Ke;
  }
  return {
    titleX: v,
    titleY: g,
    maxWidth: p,
    rotation: h
  };
}
class xn extends Pt {
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
    return t = _t(t, Number.POSITIVE_INFINITY), n = _t(n, Number.NEGATIVE_INFINITY), a = _t(a, Number.POSITIVE_INFINITY), s = _t(s, Number.NEGATIVE_INFINITY), {
      min: _t(t, a),
      max: _t(n, s),
      minDefined: ft(t),
      maxDefined: ft(n)
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
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), s || (n = Math.min(n, i.min)), o || (a = Math.max(a, i.max));
    return n = o && n > a ? a : n, a = s && n > a ? n : a, {
      min: _t(n, _t(a, n)),
      max: _t(a, _t(n, a))
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
    Ee(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Er(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? go(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = wd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Ee(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Ee(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Ee(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Ee(this.options[t], [
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
    Ee(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Ee(n.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Ee(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Ee(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = fo(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, r, c;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, p = d.highest.height, v = Qe(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - Cn(t.grid) - n.padding - mo(t.title, this.chart.options.font), c = Math.sqrt(h * h + p * p), i = rr(Math.min(Math.asin(Qe((d.highest.height + 6) / l, -1, 1)), Math.asin(Qe(r / c, -1, 1)) - Math.asin(Qe(p / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Ee(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Ee(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = mo(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Cn(o) + r) : (t.height = this.maxHeight, t.width = Cn(o) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: p } = this._getLabelSizes(), v = a.padding * 2, g = Bt(this.labelRotation), y = Math.cos(g), b = Math.sin(g);
        if (l) {
          const f = a.mirror ? 0 : b * h.width + y * p.height;
          t.height = Math.min(this.maxHeight, t.height + f + v);
        } else {
          const f = a.mirror ? 0 : y * h.width + b * p.height;
          t.width = Math.min(this.maxWidth, t.width + f + v);
        }
        this._calculatePadding(c, d, b, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, v = 0;
      r ? c ? (p = s * t.width, v = a * n.height) : (p = a * t.height, v = s * n.width) : o === "start" ? v = n.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, v = n.width / 2), this.paddingLeft = Math.max((p - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      o === "start" ? (d = 0, h = t.height) : o === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Ee(this.options.afterFit, [
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
      Ie(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = go(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], r = Math.floor(n / fo(n, a));
    let c = 0, d = 0, h, p, v, g, y, b, f, x, _, w, C;
    for (h = 0; h < n; h += r) {
      if (g = t[h].label, y = this._resolveTickFontOptions(h), s.font = b = y.string, f = o[b] = o[b] || {
        data: {},
        gc: []
      }, x = y.lineHeight, _ = w = 0, !Ie(g) && !Ye(g))
        _ = Ns(s, f.data, f.gc, _, g), w = x;
      else if (Ye(g))
        for (p = 0, v = g.length; p < v; ++p)
          C = g[p], !Ie(C) && !Ye(C) && (_ = Ns(s, f.data, f.gc, _, C), w += x);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    Bd(o, n);
    const M = i.indexOf(c), S = l.indexOf(d), I = (V) => ({
      width: i[V] || 0,
      height: l[V] || 0
    });
    return {
      first: I(0),
      last: I(n - 1),
      widest: I(M),
      highest: I(S),
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
    return dr(this._alignToPixels ? Qt(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Pd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Ld(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Bt(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, r = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * s ? l / a : r / s : r * s < l * a ? r / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, r = o.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), p = Cn(o), v = [], g = l.setContext(this.getContext()), y = g.display ? g.width : 0, b = y / 2, f = function(se) {
      return Qt(a, se, y);
    };
    let x, _, w, C, M, S, I, V, E, A, L, O;
    if (i === "top")
      x = f(this.bottom), S = this.bottom - p, V = x - b, A = f(t.top) + b, O = t.bottom;
    else if (i === "bottom")
      x = f(this.top), A = t.top, O = f(t.bottom) - b, S = x + b, V = this.top + p;
    else if (i === "left")
      x = f(this.right), M = this.right - p, I = x - b, E = f(t.left) + b, L = t.right;
    else if (i === "right")
      x = f(this.left), E = t.left, L = f(t.right) - b, M = x + b, I = this.left + p;
    else if (n === "x") {
      if (i === "center")
        x = f((t.top + t.bottom) / 2 + 0.5);
      else if (Ae(i)) {
        const se = Object.keys(i)[0], oe = i[se];
        x = f(this.chart.scales[se].getPixelForValue(oe));
      }
      A = t.top, O = t.bottom, S = x + b, V = S + p;
    } else if (n === "y") {
      if (i === "center")
        x = f((t.left + t.right) / 2);
      else if (Ae(i)) {
        const se = Object.keys(i)[0], oe = i[se];
        x = f(this.chart.scales[se].getPixelForValue(oe));
      }
      M = x - b, I = M - p, E = t.left, L = t.right;
    }
    const X = _e(s.ticks.maxTicksLimit, h), G = Math.max(1, Math.ceil(h / X));
    for (_ = 0; _ < h; _ += G) {
      const se = this.getContext(_), oe = o.setContext(se), me = l.setContext(se), ye = oe.lineWidth, U = oe.color, H = me.dash || [], Z = me.dashOffset, te = oe.tickWidth, fe = oe.tickColor, we = oe.tickBorderDash || [], Me = oe.tickBorderDashOffset;
      w = Ad(this, _, r), w !== void 0 && (C = Qt(a, w, ye), c ? M = I = E = L = C : S = V = A = O = C, v.push({
        tx1: M,
        ty1: S,
        tx2: I,
        ty2: V,
        x1: E,
        y1: A,
        x2: L,
        y2: O,
        width: ye,
        color: U,
        borderDash: H,
        borderDashOffset: Z,
        tickWidth: te,
        tickColor: fe,
        tickBorderDash: we,
        tickBorderDashOffset: Me
      }));
    }
    return this._ticksLength = h, this._borderValue = x, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = o, p = Cn(a.grid), v = p + d, g = h ? -d : v, y = -Bt(this.labelRotation), b = [];
    let f, x, _, w, C, M, S, I, V, E, A, L, O = "middle";
    if (s === "top")
      M = this.bottom - g, S = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      M = this.top + g, S = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const G = this._getYAxisLabelAlignment(p);
      S = G.textAlign, C = G.x;
    } else if (s === "right") {
      const G = this._getYAxisLabelAlignment(p);
      S = G.textAlign, C = G.x;
    } else if (n === "x") {
      if (s === "center")
        M = (t.top + t.bottom) / 2 + v;
      else if (Ae(s)) {
        const G = Object.keys(s)[0], se = s[G];
        M = this.chart.scales[G].getPixelForValue(se) + v;
      }
      S = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        C = (t.left + t.right) / 2 - v;
      else if (Ae(s)) {
        const G = Object.keys(s)[0], se = s[G];
        C = this.chart.scales[G].getPixelForValue(se);
      }
      S = this._getYAxisLabelAlignment(p).textAlign;
    }
    n === "y" && (r === "start" ? O = "top" : r === "end" && (O = "bottom"));
    const X = this._getLabelSizes();
    for (f = 0, x = l.length; f < x; ++f) {
      _ = l[f], w = _.label;
      const G = o.setContext(this.getContext(f));
      I = this.getPixelForTick(f) + o.labelOffset, V = this._resolveTickFontOptions(f), E = V.lineHeight, A = Ye(w) ? w.length : 1;
      const se = A / 2, oe = G.color, me = G.textStrokeColor, ye = G.textStrokeWidth;
      let U = S;
      i ? (C = I, S === "inner" && (f === x - 1 ? U = this.options.reverse ? "left" : "right" : f === 0 ? U = this.options.reverse ? "right" : "left" : U = "center"), s === "top" ? c === "near" || y !== 0 ? L = -A * E + E / 2 : c === "center" ? L = -X.highest.height / 2 - se * E + E : L = -X.highest.height + E / 2 : c === "near" || y !== 0 ? L = E / 2 : c === "center" ? L = X.highest.height / 2 - se * E : L = X.highest.height - A * E, h && (L *= -1), y !== 0 && !G.showLabelBackdrop && (C += E / 2 * Math.sin(y))) : (M = I, L = (1 - A) * E / 2);
      let H;
      if (G.showLabelBackdrop) {
        const Z = gt(G.backdropPadding), te = X.heights[f], fe = X.widths[f];
        let we = L - Z.top, Me = 0 - Z.left;
        switch (O) {
          case "middle":
            we -= te / 2;
            break;
          case "bottom":
            we -= te;
            break;
        }
        switch (S) {
          case "center":
            Me -= fe / 2;
            break;
          case "right":
            Me -= fe;
            break;
          case "inner":
            f === x - 1 ? Me -= fe : f > 0 && (Me -= fe / 2);
            break;
        }
        H = {
          left: Me,
          top: we,
          width: fe + Z.width,
          height: te + Z.height,
          color: G.backdropColor
        };
      }
      b.push({
        label: w,
        font: V,
        textOffset: L,
        options: {
          rotation: y,
          color: oe,
          strokeColor: me,
          strokeWidth: ye,
          textAlign: U,
          textBaseline: O,
          translation: [
            C,
            M
          ],
          backdrop: H
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Bt(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, r = i.widest.width;
    let c, d;
    return n === "left" ? s ? (d = this.right + o, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d += r)) : (d = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d = this.left)) : n === "right" ? s ? (d = this.left + o, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d -= r)) : (d = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d = this.right)) : c = "right", {
      textAlign: c,
      x: d
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
    const l = (r, c, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(r.x, r.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const r = s[o];
        n.drawOnChartArea && l({
          x: r.x1,
          y: r.y1
        }, {
          x: r.x2,
          y: r.y2
        }, r), n.drawTicks && l({
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
    const { chart: t, ctx: n, options: { border: a, grid: s } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, d, h, p;
    this.isHorizontal() ? (c = Qt(t, this.left, i) - i / 2, d = Qt(t, this.right, l) + l / 2, h = p = r) : (h = Qt(t, this.top, i) - i / 2, p = Qt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, p), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && rs(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      jn(a, c, 0, d, r, l);
    }
    s && cs(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Je(a.font), i = gt(a.padding), l = a.align;
    let r = o.lineHeight / 2;
    n === "bottom" || n === "center" || Ae(n) ? (r += i.bottom, Ye(a.text) && (r += o.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: p } = Rd(this, r, n, l);
    jn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: p,
      textAlign: Id(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = _e(t.grid && t.grid.z, -1), s = _e(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== xn.prototype.draw ? [
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
    return Je(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class sa {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Od(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, Fd(t, i, a), this.override && He.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in He[s] && (delete He[s][a], this.override && delete rn[a]);
  }
}
function Fd(e, t, n) {
  const a = Vn(/* @__PURE__ */ Object.create(null), [
    n ? He.get(n) : {},
    He.get(t),
    e.defaults
  ]);
  He.set(t, a), e.defaultRoutes && Ed(t, e.defaultRoutes), e.descriptors && He.describe(t, e.descriptors);
}
function Ed(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    He.route(o, s, r, l);
  });
}
function Od(e) {
  return "id" in e && "defaults" in e;
}
class Vd {
  constructor() {
    this.controllers = new sa(Ca, "datasets", !0), this.elements = new sa(Pt, "elements"), this.plugins = new sa(Object, "plugins"), this.scales = new sa(xn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : Re(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = as(t);
    Ee(a["before" + s], [], a), n[t](a), Ee(a["after" + s], [], a);
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
var wt = /* @__PURE__ */ new Vd();
class zd {
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
      const i = o.plugin, l = i[a], r = [
        n,
        s,
        o.options
      ];
      if (Ee(l, r, i) === !1 && s.cancelable)
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
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = _e(a.options && a.options.plugins, {}), o = Nd(a);
    return s === !1 && !n ? [] : Wd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function Nd(e) {
  const t = {}, n = [], a = Object.keys(wt.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(wt.getPlugin(a[o]));
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
function Hd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Wd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = Hd(a[r], s);
    c !== null && o.push({
      plugin: l,
      options: jd(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return o;
}
function jd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ga(e, t) {
  const n = He.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Yd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Kd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function po(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Ud(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Za(e, ...t) {
  if (po(e))
    return e;
  for (const n of t) {
    const a = n.axis || Ud(n.position) || e.length > 1 && po(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function bo(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function qd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return bo(e, "x", n[0]) || bo(e, "y", n[0]);
  }
  return {};
}
function Xd(e, t) {
  const n = rn[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ga(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!Ae(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Za(i, l, qd(i, e), He.scales[l.type]), c = Kd(r, s), d = n.scales || {};
    o[i] = Ln(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Ga(l, t), d = (rn[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const p = Yd(h, r), v = i[p + "AxisID"] || p;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), Ln(o[v], [
        {
          axis: p
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    Ln(l, [
      He.scales[l.type],
      He.scale
    ]);
  }), o;
}
function Fi(e) {
  const t = e.options || (e.options = {});
  t.plugins = _e(t.plugins, {}), t.scales = Xd(e, t);
}
function Ei(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Gd(e) {
  return e = e || {}, e.data = Ei(e.data), Fi(e), e;
}
const vo = /* @__PURE__ */ new Map(), Oi = /* @__PURE__ */ new Set();
function oa(e, t) {
  let n = vo.get(e);
  return n || (n = t(), vo.set(e, n), Oi.add(n)), n;
}
const $n = (e, t, n) => {
  const a = ln(t, n);
  a !== void 0 && e.add(a);
};
class Zd {
  constructor(t) {
    this._config = Gd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this.clearCache(), Fi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return oa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return oa(`${t}.transition.${n}`, () => [
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
    return oa(`${t}-${n}`, () => [
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
    return oa(`${a}-plugin-${n}`, () => [
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
    const r = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      t && (r.add(t), d.forEach((h) => $n(r, t, h))), d.forEach((h) => $n(r, s, h)), d.forEach((h) => $n(r, rn[o] || {}, h)), d.forEach((h) => $n(r, He, h)), d.forEach((h) => $n(r, qa, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Oi.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      rn[n] || {},
      He.datasets[n] || {},
      {
        type: n
      },
      He,
      qa
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = yo(this._resolverCache, t, s);
    let r = i;
    if (Jd(i, n)) {
      o.$shared = !1, a = Kt(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = vn(i, a, c);
    }
    for (const c of n)
      o[c] = r[c];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = yo(this._resolverCache, t, a);
    return Ae(n) ? vn(o, n, void 0, s) : o;
  }
}
function yo(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: us(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const Qd = (e) => Ae(e) && Object.getOwnPropertyNames(e).some((t) => Kt(e[t]));
function Jd(e, t) {
  const { isScriptable: n, isIndexable: a } = xi(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Kt(l) || Qd(l)) || i && Ye(l))
      return !0;
  }
  return !1;
}
var eu = "4.5.1";
const tu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function xo(e, t) {
  return e === "top" || e === "bottom" || tu.indexOf(e) === -1 && t === "x";
}
function _o(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function ko(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Ee(n && n.onComplete, [
    e
  ], t);
}
function nu(e) {
  const t = e.chart, n = t.options.animation;
  Ee(n && n.onProgress, [
    e
  ], t);
}
function Vi(e) {
  return gs() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ua = {}, wo = (e) => {
  const t = Vi(e);
  return Object.values(ua).filter((n) => n.canvas === t).pop();
};
function au(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function su(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Ut = class {
  static defaults = He;
  static instances = ua;
  static overrides = rn;
  static registry = wt;
  static version = eu;
  static getChart = wo;
  static register(...t) {
    wt.add(...t), Co();
  }
  static unregister(...t) {
    wt.remove(...t), Co();
  }
  constructor(t, n) {
    const a = this.config = new Zd(n), s = Vi(t), o = wo(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || kd(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = Xl(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new zd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = gr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ua[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Dt.listen(this, "complete", ko), Dt.listen(this, "progress", nu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return Ie(t) ? n && o ? o : s ? a / s : null : t;
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
    return wt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Ys(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Hs(this.canvas, this.ctx), this;
  }
  stop() {
    return Dt.stop(this), this;
  }
  resize(t, n) {
    Dt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Ys(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Ee(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Re(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Za(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(o, (i) => {
      const l = i.options, r = l.id, c = Za(r, l), d = _e(l.type, i.dtype);
      (l.position === void 0 || xo(l.position, c) !== xo(i.dposition)) && (l.position = i.dposition), s[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const p = wt.getScale(d);
        h = new p({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Re(s, (i, l) => {
      i || delete a[l];
    }), Re(a, (i) => {
      ht.configure(this, i, i.options), ht.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(_o("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ga(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = wt.getController(l), { datasetElementType: c, dataElementType: d } = He.datasets[l];
        Object.assign(r, {
          dataElementType: wt.getElement(d),
          datasetElementType: c && wt.getElement(c)
        }), i.controller = new r(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Re(this.data.datasets, (t, n) => {
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
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), p = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || Re(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(_o("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Re(this.scales, (t) => {
      ht.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Ls(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      au(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!Ls(s, a(o)))
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
    ht.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Re(this.boxes, (s) => {
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
        this._updateDataset(n, Kt(t) ? t({
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
    }) !== !1 && (Dt.has(this) ? this.attached && !Dt.running(this) && Dt.start(this) : (this.draw(), ko({
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
    }, s = xc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && rs(n, s), t.controller.draw(), s && cs(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Wn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = td.modes[n];
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
    return this.$context || (this.$context = cn(null, {
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
    zn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), Dt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Hs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ua[this.id], this.notifyPlugins("afterDestroy");
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
    Re(this.options.events, (o) => a(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (r, c) => {
      n.addEventListener(this, r, c), t[r] = c;
    }, s = (r, c) => {
      t[r] && (n.removeEventListener(this, r, c), delete t[r]);
    }, o = (r, c) => {
      this.canvas && this.resize(r, c);
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
    Re(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, r;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
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
    !fa(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const s = this.options.hover, o = (r, c) => r.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), r = tr(t), c = su(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Ee(o.onHover, [
      t,
      l,
      this
    ], this), r && Ee(o.onClick, [
      t,
      l,
      this
    ], this));
    const d = !fa(l, s);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = c, d;
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
function Co() {
  return Re(Ut.instances, (e) => e._plugins.invalidate());
}
function ou(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, bt(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const p = Math.min(c / l, bt(a - n));
    e.arc(s, o, l + c / 2, n - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(c / 2, i * bt(a - n));
    if (d === "round")
      e.arc(s, o, p, n - Fe / 2, a + Fe / 2, !0);
    else if (d === "bevel") {
      const v = 2 * p * p, g = -v * Math.cos(n + Fe / 2) + s, y = -v * Math.sin(n + Fe / 2) + o, b = v * Math.cos(a + Fe / 2) + s, f = v * Math.sin(a + Fe / 2) + o;
      e.lineTo(g, y), e.lineTo(b, f);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function iu(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: r } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), r > s ? (c = s / r, e.arc(o, i, r, n + c, a - c, !0)) : e.arc(o, i, s, n + Ke, a - Ke), e.closePath(), e.clip();
}
function lu(e) {
  return ds(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function ru(e, t, n, a) {
  const s = lu(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (r) => {
    const c = (n - Math.min(o, r)) * a / 2;
    return Qe(r, 0, Math.min(o, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Qe(s.innerStart, 0, i),
    innerEnd: Qe(s.innerEnd, 0, i)
  };
}
function fn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ya(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), p = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const g = s - r;
  if (a) {
    const G = d > 0 ? d - a : 0, se = h > 0 ? h - a : 0, oe = (G + se) / 2, me = oe !== 0 ? g * oe / (oe + a) : g;
    v = (g - me) / 2;
  }
  const y = Math.max(1e-3, g * h - n / Fe) / h, b = (g - y) / 2, f = r + b + v, x = s - b - v, { outerStart: _, outerEnd: w, innerStart: C, innerEnd: M } = ru(t, p, h, x - f), S = h - _, I = h - w, V = f + _ / S, E = x - w / I, A = p + C, L = p + M, O = f + C / A, X = x - M / L;
  if (e.beginPath(), o) {
    const G = (V + E) / 2;
    if (e.arc(i, l, h, V, G), e.arc(i, l, h, G, E), w > 0) {
      const ye = fn(I, E, i, l);
      e.arc(ye.x, ye.y, w, E, x + Ke);
    }
    const se = fn(L, x, i, l);
    if (e.lineTo(se.x, se.y), M > 0) {
      const ye = fn(L, X, i, l);
      e.arc(ye.x, ye.y, M, x + Ke, X + Math.PI);
    }
    const oe = (x - M / p + (f + C / p)) / 2;
    if (e.arc(i, l, p, x - M / p, oe, !0), e.arc(i, l, p, oe, f + C / p, !0), C > 0) {
      const ye = fn(A, O, i, l);
      e.arc(ye.x, ye.y, C, O + Math.PI, f - Ke);
    }
    const me = fn(S, f, i, l);
    if (e.lineTo(me.x, me.y), _ > 0) {
      const ye = fn(S, V, i, l);
      e.arc(ye.x, ye.y, _, f - Ke, V);
    }
  } else {
    e.moveTo(i, l);
    const G = Math.cos(V) * h + i, se = Math.sin(V) * h + l;
    e.lineTo(G, se);
    const oe = Math.cos(E) * h + i, me = Math.sin(E) * h + l;
    e.lineTo(oe, me);
  }
  e.closePath();
}
function cu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (o) {
    ya(e, t, n, a, r, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ne || Ne));
  }
  return ya(e, t, n, a, r, s), e.fill(), r;
}
function du(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: p, borderRadius: v } = r, g = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (o) {
    ya(e, t, n, a, y, s);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(l) || (y = i + (l % Ne || Ne));
  }
  g && iu(e, t, y), r.selfJoin && y - i >= Fe && v === 0 && d !== "miter" && ou(e, t, y), o || (ya(e, t, n, a, y, s), e.stroke());
}
class uu extends Pt {
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
    ], a), { angle: o, distance: i } = hi(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, v = _e(h, r - l), g = Hn(o, l, r) && l !== r, y = v >= Ne || g, b = Vt(i, c + p, d + p);
    return y && b;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: s, endAngle: o, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, d = (s + o) / 2, h = (i + l + c + r) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, s = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ne ? Math.floor(a / Ne) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const r = 1 - Math.sin(Math.min(Fe, a || 0)), c = s * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, cu(t, this, c, o, i), du(t, this, c, o, i), t.restore();
  }
}
function zi(e, t, n = t) {
  e.lineCap = _e(n.borderCapStyle, t.borderCapStyle), e.setLineDash(_e(n.borderDash, t.borderDash)), e.lineDashOffset = _e(n.borderDashOffset, t.borderDashOffset), e.lineJoin = _e(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = _e(n.borderWidth, t.borderWidth), e.strokeStyle = _e(n.borderColor, t.borderColor);
}
function hu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function fu(e) {
  return e.stepped ? Dr : e.tension || e.cubicInterpolationMode === "monotone" ? Tr : hu;
}
function Ni(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, r = Math.max(s, i), c = Math.min(o, l), d = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function gu(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: r, ilen: c } = Ni(s, n, a), d = fu(o);
  let { move: h = !0, reverse: p } = a || {}, v, g, y;
  for (v = 0; v <= c; ++v)
    g = s[(l + (p ? c - v : v)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, y, g, p, o.stepped), y = g);
  return r && (g = s[(l + (p ? c : 0)) % i], d(e, y, g, p, o.stepped)), !!r;
}
function mu(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Ni(s, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, p, v, g, y, b, f;
  const x = (w) => (i + (c ? l - w : w)) % o, _ = () => {
    y !== b && (e.lineTo(d, b), e.lineTo(d, y), e.lineTo(d, f));
  };
  for (r && (v = s[x(0)], e.moveTo(v.x, v.y)), p = 0; p <= l; ++p) {
    if (v = s[x(p)], v.skip)
      continue;
    const w = v.x, C = v.y, M = w | 0;
    M === g ? (C < y ? y = C : C > b && (b = C), d = (h * d + w) / ++h) : (_(), e.lineTo(w, C), g = M, h = 0, y = b = C), f = C;
  }
  _();
}
function Qa(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? mu : gu;
}
function pu(e) {
  return e.stepped ? lc : e.tension || e.cubicInterpolationMode === "monotone" ? rc : nn;
}
function bu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), zi(e, t.options), e.stroke(s);
}
function vu(e, t, n, a) {
  const { segments: s, options: o } = t, i = Qa(t);
  for (const l of s)
    zi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const yu = typeof Path2D == "function";
function xu(e, t, n, a) {
  yu && !t.options.segment ? bu(e, t, n, a) : vu(e, t, n, a);
}
class _u extends Pt {
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
      Jr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = pc(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = fc(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], r = pu(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: p } = i[c], v = o[h], g = o[p];
      if (v === g) {
        l.push(v);
        continue;
      }
      const y = Math.abs((s - v[n]) / (g[n] - v[n])), b = r(v, g, y, a.stepped);
      b[n] = t[n], l.push(b);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Qa(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Qa(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), xu(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function $o(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class ku extends Pt {
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
    return $o(this, t, "x", n);
  }
  inYRange(t, n) {
    return $o(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Wn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Xa(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Hi(e, t) {
  const { x: n, y: a, base: s, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, d, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), r = Math.max(n, s), c = a - h, d = a + h) : (h = o / 2, l = n - h, r = n + h, c = Math.min(a, s), d = Math.max(a, s)), {
    left: l,
    top: c,
    right: r,
    bottom: d
  };
}
function Nt(e, t, n, a) {
  return e ? 0 : Qe(t, n, a);
}
function wu(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = yi(a);
  return {
    t: Nt(s.top, o.top, 0, n),
    r: Nt(s.right, o.right, 0, t),
    b: Nt(s.bottom, o.bottom, 0, n),
    l: Nt(s.left, o.left, 0, t)
  };
}
function Cu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = mn(s), i = Math.min(t, n), l = e.borderSkipped, r = a || Ae(s);
  return {
    topLeft: Nt(!r || l.top || l.left, o.topLeft, 0, i),
    topRight: Nt(!r || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Nt(!r || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Nt(!r || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function $u(e) {
  const t = Hi(e), n = t.right - t.left, a = t.bottom - t.top, s = wu(e, n / 2, a / 2), o = Cu(e, n / 2, a / 2);
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
function Va(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && Hi(e, a);
  return l && (s || Vt(t, l.left, l.right)) && (o || Vt(n, l.top, l.bottom));
}
function Su(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Mu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function za(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Du extends Pt {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = $u(this), l = Su(i.radius) ? pa : Mu;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, za(i, n, o)), t.clip(), l(t, za(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, za(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Va(this, t, n, a);
  }
  inXRange(t, n) {
    return Va(this, t, null, n);
  }
  inYRange(t, n) {
    return Va(this, null, t, n);
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
const So = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Tu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Mo extends Pt {
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
    let n = Ee(t.generateLabels, [
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
    const a = t.labels, s = Je(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = So(a, o);
    let c, d;
    n.font = s.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, o, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, s, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, v = -d;
    return this.legendItems.forEach((g, y) => {
      const b = a + n / 2 + o.measureText(g.text).width;
      (y === 0 || c[c.length - 1] + b + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, p++), r[y] = {
        left: 0,
        top: v,
        row: p,
        width: b,
        height: s
      }, c[c.length - 1] += b + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, p = 0, v = 0, g = 0, y = 0;
    return this.legendItems.forEach((b, f) => {
      const { itemWidth: x, itemHeight: _ } = Au(a, n, o, b, s);
      f > 0 && v + _ + 2 * l > d && (h += p + l, c.push({
        width: p,
        height: v
      }), g += p + l, y++, p = v = 0), r[f] = {
        left: g,
        top: v,
        col: y,
        width: x,
        height: _
      }, p = Math.max(p, x), v += _ + l;
    }), h += p, c.push({
      width: p,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = pn(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Ge(a, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Ge(a, this.left + s, this.right - this.lineWidths[l])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + s;
    } else {
      let l = 0, r = Ge(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Ge(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      rs(t, this), this._draw(), cs(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = He.color, r = pn(t.rtl, this.left, this.width), c = Je(i.font), { padding: d } = i, h = c.size, p = h / 2;
    let v;
    this.drawTitle(), s.textAlign = r.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: g, boxHeight: y, itemHeight: b } = So(i, h), f = function(M, S, I) {
      if (isNaN(g) || g <= 0 || isNaN(y) || y < 0)
        return;
      s.save();
      const V = _e(I.lineWidth, 1);
      if (s.fillStyle = _e(I.fillStyle, l), s.lineCap = _e(I.lineCap, "butt"), s.lineDashOffset = _e(I.lineDashOffset, 0), s.lineJoin = _e(I.lineJoin, "miter"), s.lineWidth = V, s.strokeStyle = _e(I.strokeStyle, l), s.setLineDash(_e(I.lineDash, [])), i.usePointStyle) {
        const E = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: I.pointStyle,
          rotation: I.rotation,
          borderWidth: V
        }, A = r.xPlus(M, g / 2), L = S + p;
        vi(s, E, A, L, i.pointStyleWidth && g);
      } else {
        const E = S + Math.max((h - y) / 2, 0), A = r.leftForLtr(M, g), L = mn(I.borderRadius);
        s.beginPath(), Object.values(L).some((O) => O !== 0) ? pa(s, {
          x: A,
          y: E,
          w: g,
          h: y,
          radius: L
        }) : s.rect(A, E, g, y), s.fill(), V !== 0 && s.stroke();
      }
      s.restore();
    }, x = function(M, S, I) {
      jn(s, I.text, M, S + b / 2, c, {
        strikethrough: I.hidden,
        textAlign: r.textAlign(I.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? v = {
      x: Ge(o, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Ge(o, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, $i(this.ctx, t.textDirection);
    const C = b + d;
    this.legendItems.forEach((M, S) => {
      s.strokeStyle = M.fontColor, s.fillStyle = M.fontColor;
      const I = s.measureText(M.text).width, V = r.textAlign(M.textAlign || (M.textAlign = i.textAlign)), E = g + p + I;
      let A = v.x, L = v.y;
      r.setWidth(this.width), _ ? S > 0 && A + E + d > this.right && (L = v.y += C, v.line++, A = v.x = Ge(o, this.left + d, this.right - a[v.line])) : S > 0 && L + C > this.bottom && (A = v.x = A + n[v.line].width + d, v.line++, L = v.y = Ge(o, this.top + w + d, this.bottom - n[v.line].height));
      const O = r.x(A);
      if (f(O, L, M), A = mr(V, A + g + p, _ ? A + E : this.right, t.rtl), x(r.x(A), L, M), _)
        v.x += E + d;
      else if (typeof M.text != "string") {
        const X = c.lineHeight;
        v.y += Wi(M, X) + d;
      } else
        v.y += C;
    }), Si(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Je(n.font), s = gt(n.padding);
    if (!n.display)
      return;
    const o = pn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = s.top + r;
    let d, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), d = this.top + c, h = Ge(t.align, h, this.right - p);
    else {
      const g = this.columnSizes.reduce((y, b) => Math.max(y, b.height), 0);
      d = c + Ge(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const v = Ge(l, h, h + p);
    i.textAlign = o.textAlign(os(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, jn(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Je(t.font), a = gt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (Vt(t, this.left, this.right) && Vt(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], Vt(t, s.left, s.left + s.width) && Vt(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Pu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = Tu(s, a);
      s && !o && Ee(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Ee(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Ee(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Au(e, t, n, a, s) {
  const o = Bu(a, e, t, n), i = Lu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Bu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function Lu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Wi(t, n)), a;
}
function Wi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Pu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var bs = {
  id: "legend",
  _element: Mo,
  start(e, t, n) {
    const a = e.legend = new Mo({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ht.configure(e, a, n), ht.addBox(e, a);
  },
  stop(e) {
    ht.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ht.configure(e, a, n), a.options = n;
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
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(n ? 0 : void 0), d = gt(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
            rotation: c.rotation,
            textAlign: s || c.textAlign,
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
class ji extends Pt {
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
    const s = Ye(a.text) ? a.text.length : 1;
    this._padding = gt(a.padding);
    const o = s * Je(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Ge(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (d = a + t, h = Ge(l, s, n), r = Fe * -0.5) : (d = o - t, h = Ge(l, n, s), r = Fe * 0.5), c = s - n), {
      titleX: d,
      titleY: h,
      maxWidth: c,
      rotation: r
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Je(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(o);
    jn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: os(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Iu(e, t) {
  const n = new ji({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ht.configure(e, n, t), ht.addBox(e, n), e.titleBlock = n;
}
var Yi = {
  id: "title",
  _element: ji,
  start(e, t, n) {
    Iu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ht.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ht.configure(e, a, n), a.options = n;
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
const Bn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        a.add(r.x), s += r.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, r) => l + r) / a.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, s = Number.POSITIVE_INFINITY, o, i, l;
    for (o = 0, i = e.length; o < i; ++o) {
      const r = e[o].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), d = Ua(t, c);
        d < s && (s = d, l = r);
      }
    }
    if (l) {
      const r = l.tooltipPosition();
      n = r.x, a = r.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function kt(e, t) {
  return t && (Ye(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Tt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Ru(e, t) {
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
function Do(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, r = Je(t.bodyFont), c = Je(t.titleFont), d = Je(t.footerFont), h = o.length, p = s.length, v = a.length, g = gt(t.padding);
  let y = g.height, b = 0, f = a.reduce((w, C) => w + C.before.length + C.lines.length + C.after.length, 0);
  if (f += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), f) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (f - v) * r.lineHeight + (f - 1) * t.bodySpacing;
  }
  p && (y += t.footerMarginTop + p * d.lineHeight + (p - 1) * t.footerSpacing);
  let x = 0;
  const _ = function(w) {
    b = Math.max(b, n.measureText(w).width + x);
  };
  return n.save(), n.font = c.string, Re(e.title, _), n.font = r.string, Re(e.beforeBody.concat(e.afterBody), _), x = t.displayColors ? i + 2 + t.boxPadding : 0, Re(a, (w) => {
    Re(w.before, _), Re(w.lines, _), Re(w.after, _);
  }), x = 0, n.font = d.string, Re(e.footer, _), n.restore(), b += g.width, {
    width: b,
    height: y
  };
}
function Fu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Eu(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function Ou(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + r) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), Eu(c, e, t, n) && (c = "center"), c;
}
function To(e, t, n) {
  const a = n.yAlign || t.yAlign || Fu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Ou(e, t, n, a),
    yAlign: a
  };
}
function Vu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function zu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function Ao(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = s + o, { topLeft: d, topRight: h, bottomLeft: p, bottomRight: v } = mn(i);
  let g = Vu(t, l);
  const y = zu(t, r, c);
  return r === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(d, p) + s : l === "right" && (g += Math.max(h, v) + s), {
    x: Qe(g, 0, a.width - t.width),
    y: Qe(y, 0, a.height - t.height)
  };
}
function ia(e, t, n) {
  const a = gt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Bo(e) {
  return kt([], Tt(e));
}
function Nu(e, t, n) {
  return cn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Lo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Ki = {
  beforeTitle: Mt,
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
  afterTitle: Mt,
  beforeBody: Mt,
  beforeLabel: Mt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Ie(n) || (t += n), t;
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
  afterLabel: Mt,
  afterBody: Mt,
  beforeFooter: Mt,
  footer: Mt,
  afterFooter: Mt
};
function at(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Ki[t].call(n, a) : s;
}
class Po extends Pt {
  static positioners = Bn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new Di(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Nu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = at(a, "beforeTitle", this, t), o = at(a, "title", this, t), i = at(a, "afterTitle", this, t);
    let l = [];
    return l = kt(l, Tt(s)), l = kt(l, Tt(o)), l = kt(l, Tt(i)), l;
  }
  getBeforeBody(t, n) {
    return Bo(at(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return Re(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Lo(a, o);
      kt(i.before, Tt(at(l, "beforeLabel", this, o))), kt(i.lines, at(l, "label", this, o)), kt(i.after, Tt(at(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return Bo(at(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = at(a, "beforeFooter", this, t), o = at(a, "footer", this, t), i = at(a, "afterFooter", this, t);
    let l = [];
    return l = kt(l, Tt(s)), l = kt(l, Tt(o)), l = kt(l, Tt(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Ru(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, p) => t.filter(d, h, p, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Re(l, (d) => {
      const h = Lo(t.callbacks, d);
      s.push(at(h, "labelColor", this, d)), o.push(at(h, "labelPointStyle", this, d)), i.push(at(h, "labelTextColor", this, d));
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
      const l = Bn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = Do(this, a), c = Object.assign({}, l, r), d = To(this.chart, a, c), h = Ao(a, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: r.width,
        height: r.height,
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = mn(l), { x: p, y: v } = t, { width: g, height: y } = n;
    let b, f, x, _, w, C;
    return o === "center" ? (w = v + y / 2, s === "left" ? (b = p, f = b - i, _ = w + i, C = w - i) : (b = p + g, f = b + i, _ = w - i, C = w + i), x = b) : (s === "left" ? f = p + Math.max(r, d) + i : s === "right" ? f = p + g - Math.max(c, h) - i : f = this.caretX, o === "top" ? (_ = v, w = _ - i, b = f - i, x = f + i) : (_ = v + y, w = _ + i, b = f + i, x = f - i), C = _), {
      x1: b,
      x2: f,
      x3: x,
      y1: _,
      y2: w,
      y3: C
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, r;
    if (o) {
      const c = pn(a.rtl, this.x, this.width);
      for (t.x = ia(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Je(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < o; ++r)
        n.fillText(s[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = o, d = Je(o.bodyFont), h = ia(this, "left", o), p = s.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, g = n.y + v;
    if (o.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(p, c) + c / 2, f = g + r / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Xa(t, y, b, f), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Xa(t, y, b, f);
    } else {
      t.lineWidth = Ae(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = s.leftForLtr(p, c), b = s.leftForLtr(s.xPlus(p, 1), c - 2), f = mn(i.borderRadius);
      Object.values(f).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, pa(t, {
        x: y,
        y: g,
        w: c,
        h: r,
        radius: f
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), pa(t, {
        x: b,
        y: g + 1,
        w: c - 2,
        h: r - 2,
        radius: f
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(y, g, c, r), t.strokeRect(y, g, c, r), t.fillStyle = i.backgroundColor, t.fillRect(b, g + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Je(a.bodyFont);
    let p = h.lineHeight, v = 0;
    const g = pn(a.rtl, this.x, this.width), y = function(I) {
      n.fillText(I, g.x(t.x + v), t.y + p / 2), t.y += p + o;
    }, b = g.textAlign(i);
    let f, x, _, w, C, M, S;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = ia(this, b, a), n.fillStyle = a.bodyColor, Re(this.beforeBody, y), v = l && b !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, M = s.length; w < M; ++w) {
      for (f = s[w], x = this.labelTextColors[w], n.fillStyle = x, Re(f.before, y), _ = f.lines, l && _.length && (this._drawColorBox(n, t, w, g, a), p = Math.max(h.lineHeight, r)), C = 0, S = _.length; C < S; ++C)
        y(_[C]), p = h.lineHeight;
      Re(f.after, y);
    }
    v = 0, p = h.lineHeight, Re(this.afterBody, y), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const r = pn(a.rtl, this.x, this.width);
      for (t.x = ia(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Je(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: p, bottomLeft: v, bottomRight: g } = mn(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - p, r), n.quadraticCurveTo(l + c, r, l + c, r + p), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, r + d - g), n.quadraticCurveTo(l + c, r + d, l + c - g, r + d), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = Bn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = Do(this, t), r = Object.assign({}, i, this._size), c = To(n, t, r), d = Ao(t, r, c, n);
      (s._to !== d.x || o._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
    const i = gt(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), $i(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), Si(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, s = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), o = !fa(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), r = n || !fa(i, o) || l;
    return r && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), r;
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
    const { caretX: a, caretY: s, options: o } = this, i = Bn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var vs = {
  id: "tooltip",
  _element: Po,
  positioners: Bn,
  afterInit(e, t, n) {
    n && (e.tooltip = new Po({
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
    callbacks: Ki
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
const Hu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Wu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return Hu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const ju = (e, t) => e === null ? null : Qe(Math.round(e), 0, t);
function Io(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ui extends xn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Io
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
    if (Ie(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Wu(a, t, _e(n, t), this._addedLabels), ju(n, a.length - 1);
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
    return Io.call(this, t);
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
function Yu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: p } = e, v = o || 1, g = d - 1, { min: y, max: b } = t, f = !Ie(i), x = !Ie(l), _ = !Ie(c), w = (b - y) / (h + 1);
  let C = Is((b - y) / g / v) * v, M, S, I, V;
  if (C < 1e-14 && !f && !x)
    return [
      {
        value: y
      },
      {
        value: b
      }
    ];
  V = Math.ceil(b / C) - Math.floor(y / C), V > g && (C = Is(V * C / g / v) * v), Ie(r) || (M = Math.pow(10, r), C = Math.ceil(C * M) / M), s === "ticks" ? (S = Math.floor(y / C) * C, I = Math.ceil(b / C) * C) : (S = y, I = b), f && x && o && ir((l - i) / o, C / 1e3) ? (V = Math.round(Math.min((l - i) / C, d)), C = (l - i) / V, S = i, I = l) : _ ? (S = f ? i : S, I = x ? l : I, V = c - 1, C = (I - S) / V) : (V = (I - S) / C, Pn(V, Math.round(V), C / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const E = Math.max(Rs(C), Rs(S));
  M = Math.pow(10, Ie(r) ? E : r), S = Math.round(S * M) / M, I = Math.round(I * M) / M;
  let A = 0;
  for (f && (p && S !== i ? (n.push({
    value: i
  }), S < i && A++, Pn(Math.round((S + A * C) * M) / M, i, Ro(i, w, e)) && A++) : S < i && A++); A < V; ++A) {
    const L = Math.round((S + A * C) * M) / M;
    if (x && L > l)
      break;
    n.push({
      value: L
    });
  }
  return x && p && I !== l ? n.length && Pn(n[n.length - 1].value, l, Ro(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!x || I === l) && n.push({
    value: I
  }), n;
}
function Ro(e, t, { horizontal: n, minRotation: a }) {
  const s = Bt(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class Ku extends xn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Ie(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (r) => s = n ? s : r, l = (r) => o = a ? o : r;
    if (t) {
      const r = Ct(s), c = Ct(o);
      r < 0 && c < 0 ? l(0) : r > 0 && c > 0 && i(0);
    }
    if (s === o) {
      let r = o === 0 ? 1 : Math.abs(o * 0.05);
      l(o + r), t || i(s - r);
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
    }, o = this._range || this, i = Yu(s, o);
    return t.bounds === "ticks" && lr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return ls(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class qi extends Ku {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: bi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ft(t) ? t : 0, this.max = ft(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Bt(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Sa = {
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
}, it = /* @__PURE__ */ Object.keys(Sa);
function Fo(e, t) {
  return e - t;
}
function Eo(e, t) {
  if (Ie(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ft(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (Nn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function Oo(e, t, n, a) {
  const s = it.length;
  for (let o = it.indexOf(e); o < s - 1; ++o) {
    const i = Sa[it[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return it[o];
  }
  return it[s - 1];
}
function Uu(e, t, n, a, s) {
  for (let o = it.length - 1; o >= it.indexOf(n); o--) {
    const i = it[o];
    if (Sa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return it[n ? it.indexOf(n) : 0];
}
function qu(e) {
  for (let t = it.indexOf(e) + 1, n = it.length; t < n; ++t)
    if (Sa[it[t]].common)
      return it[t];
}
function Vo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = ss(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Xu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function zo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Xu(e, a, s, n);
}
class No extends xn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new Gc._date(t.adapters.date);
    s.init(n), Ln(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Eo(this, t);
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
    function r(c) {
      !i && !isNaN(c.min) && (s = Math.min(s, c.min)), !l && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), s = ft(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = ft(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = hr(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? Oo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Uu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : qu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), zo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Qe(n, 0, i), a = Qe(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || Oo(o.minUnit, n, a, this._getLabelCapacity(n)), l = _e(s.ticks.stepSize, 1), r = i === "week" ? o.isoWeekday : !1, c = Nn(r) || r === !0, d = {};
    let h = n, p, v;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, v = 0; p < a; p = +t.add(p, l, i), v++)
      Vo(d, p, g);
    return (p === a || s.bounds === "ticks" || v === 1) && Vo(d, p, g), Object.keys(d).sort(Fo).map((y) => +y);
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
      return Ee(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], p = a[n], v = c && h && p && p.major;
    return this._adapter.format(t, s || (v ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = Bt(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, zo(this, [
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
      t.push(Eo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return gi(t.sort(Fo));
  }
}
function la(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, r;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = an(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: r } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = an(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: r } = e[s]);
  const c = i - o;
  return c ? l + (r - l) * (t - o) / c : l;
}
class F$ extends No {
  static id = "timeseries";
  static defaults = No.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = la(n, this.min), this._tableRange = la(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, r, c, d;
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
      d = s[i + 1], r = s[i - 1], c = s[i], Math.round((d + r) / 2) !== c && o.push({
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
    return (la(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return la(this._table, a * this._tableRange + this._minPos, !0);
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
}, Gu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Zu = {
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
  ...Gu
}, Qu = xl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function gn(e) {
  return ai(e) ? Ya(e) : e;
}
function Ju(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ai(t) ? new Proxy(e, {}) : e;
}
function eh(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Gi(e, t) {
  e.labels = t;
}
function Zi(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function th(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Gi(n, e.labels), Zi(n, e.datasets, t), n;
}
const nh = le({
  props: Zu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = ae(null), o = ni(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: d, options: h, plugins: p, datasetIdKey: v } = e, g = th(d, v), y = Ju(g, d);
      o.value = new Ut(s.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: p
      });
    }, l = () => {
      const c = Ya(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return tt(i), pt(l), Oe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, p] = c, [v, g] = d;
      const y = Ya(o.value);
      if (!y)
        return;
      let b = !1;
      if (h) {
        const f = gn(h), x = gn(v);
        f && f !== x && (eh(y, f), b = !0);
      }
      if (p) {
        const f = gn(p.labels), x = gn(g.labels), _ = gn(p.datasets), w = gn(g.datasets);
        f !== x && (Gi(y.config.data, f), b = !0), _ && _ !== w && (Zi(y.config.data, _, e.datasetIdKey), b = !0);
      }
      b && We(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => ja("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      ja("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ys(e, t) {
  return Ut.register(t), le({
    props: Xi,
    setup(n, a) {
      let { expose: s } = a;
      const o = ni(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => ja(nh, Qu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const ah = /* @__PURE__ */ ys("bar", Yc), sh = /* @__PURE__ */ ys("line", qc), oh = /* @__PURE__ */ ys("pie", Xc), Ho = {
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
}, Wo = {
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
}, ih = [
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
function $e(e) {
  const t = ae("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = $(() => e?.value ? e.value : t.value), o = $(() => s.value === "dark"), i = $(() => o.value ? Wo : Ho), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((c) => {
      for (const d of c)
        d.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, r = () => {
    n && (n.disconnect(), n = null);
  };
  return tt(() => {
    l();
  }), pt(() => {
    r();
  }), e && Oe(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ho,
    darkColors: Wo,
    chartSeriesColors: ih
  };
}
const xa = 5, xs = 8, lh = /^x\d*$/, rh = /^y\d*$/;
function Qi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (lh.test(s) && (r.maxTicksLimit = xs, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), rh.test(s))
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(r.stepSize);
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = xa;
      } else
        r.maxTicksLimit = xa;
    i.ticks = r, a[s] = i;
  }
  return t.scales = a, t;
}
const st = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ch = ["titleFont", "bodyFont", "footerFont"];
function Ji(e, t = st) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const s = { ...n.scales };
    for (const o of Object.keys(s)) {
      const i = s[o];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, r = l.ticks;
      if (r && typeof r == "object") {
        const d = { ...r }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.ticks = d;
      }
      const c = l.title;
      if (c && typeof c == "object") {
        const d = { ...c }, h = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...h, family: t }, l.title = d;
      }
      s[o] = l;
    }
    n.scales = s;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const s = { ...n.plugins }, o = s.legend;
    if (o && typeof o == "object") {
      const l = { ...o }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: t }, l.labels = c;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of ch) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const dh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, jo = 10, uh = /* @__PURE__ */ le({
  __name: "ChartBar",
  props: {
    data: {},
    options: {},
    stacked: { type: Boolean },
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ut.register(Ui, qi, Du, Yi, vs, bs), Ut.defaults.font.family = st;
    const { isDark: a, colors: s } = $e(Ce(n, "theme")), o = $(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const p = { ...d };
      for (const v of Object.keys(h)) {
        const g = h[v];
        g !== void 0 && (p[v] = r(d[v], g));
      }
      return p;
    }
    const c = $(() => {
      const d = {
        font: {
          family: st
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
                family: st,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: jo,
              boxHeight: jo,
              usePointStyle: !1,
              generateLabels: function(p) {
                return p.data.datasets.map((g, y) => {
                  const b = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, f = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, x = typeof f == "string" && f.length > 0 ? f : typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof b == "string" ? b : x,
                    strokeStyle: x,
                    lineWidth: 0,
                    fontColor: x,
                    hidden: !p.isDatasetVisible(y),
                    index: y,
                    datasetIndex: y
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
              family: st,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: st,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(p) {
                return p.length > 0 ? String(i(p[0].label)) : "";
              },
              label: function(p) {
                let v = String(i(p.dataset.label || ""));
                return v && (v += ": "), p.parsed.y !== null && (v += p.parsed.y), v;
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
              maxTicksLimit: xa,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(p) {
                return i(p);
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
              maxTicksLimit: xs,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(p) {
                const v = this.getLabelForValue(p);
                return i(v);
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
      }, h = n.options ? r(d, n.options) : d;
      return Ji(
        Qi(h)
      );
    });
    return t({ isDark: a }), (d, h) => (m(), k("div", dh, [
      F(T(ah), {
        data: o.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ge = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, $t = /* @__PURE__ */ ge(uh, [["__scopeId", "data-v-ee7ca6f2"]]), hh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, fh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, gh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, mh = ["aria-pressed", "aria-label", "onClick"], ph = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, bh = /* @__PURE__ */ le({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ut.register(
      Ui,
      qi,
      ku,
      _u,
      Yi,
      vs,
      bs
    ), Ut.defaults.font.family = st;
    const a = ae(null), { isDark: s, colors: o } = $e(Ce(n, "theme")), i = $(() => o.value.bgCard), l = $(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((f) => {
          const x = f.borderColor, _ = Array.isArray(x) ? x[0] : x, w = typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary, C = f.pointBackgroundColor !== void 0 ? f.pointBackgroundColor : b, M = f.pointHoverBackgroundColor !== void 0 ? f.pointHoverBackgroundColor : C, S = f.pointBorderWidth ?? 2, I = f.pointHoverBorderWidth ?? S;
          return {
            ...f,
            fill: f.fill ?? !1,
            pointBackgroundColor: C,
            pointHoverBackgroundColor: M,
            pointBorderColor: f.pointBorderColor ?? w,
            pointHoverBorderColor: f.pointHoverBorderColor ?? w,
            pointBorderWidth: S,
            pointHoverBorderWidth: I
          };
        })
      };
    }), r = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, c = (b) => typeof b != "string" ? b : n.uppercaseLegendLabels ? b.toUpperCase() : r(b);
    function d(b) {
      const f = b.borderColor, x = Array.isArray(f) ? f[0] : f;
      return typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
    }
    const h = $(
      () => l.value.datasets.map((b, f) => ({
        key: `${b.label ?? "dataset"}-${f}`,
        label: c(b.label || ""),
        color: d(b)
      }))
    ), p = ae([]);
    Oe(
      () => l.value.datasets.length,
      (b) => {
        const f = Array.from({ length: b }, (x, _) => p.value[_] ?? !0);
        p.value = f;
      },
      { immediate: !0 }
    );
    function v(b) {
      const x = a.value?.chart;
      if (!x || b < 0 || b >= x.data.datasets.length) return;
      const _ = !x.isDatasetVisible(b);
      x.setDatasetVisibility(b, _), p.value[b] = _, x.update();
    }
    function g(b, f) {
      if (f == null) return b;
      if (Array.isArray(f) || typeof f != "object" || b == null || Array.isArray(b) || typeof b != "object") return f;
      const x = { ...b };
      for (const _ of Object.keys(f)) {
        const w = f[_];
        w !== void 0 && (x[_] = g(b[_], w));
      }
      return x;
    }
    const y = $(() => {
      const b = {
        font: {
          family: st
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
              family: st,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: st,
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
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: xs,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
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
              maxTicksLimit: xa,
              font: {
                family: st,
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
      }, f = n.options ? g(b, n.options) : b;
      return Ji(
        Qi(f)
      );
    });
    return t({ isDark: s }), (b, f) => (m(), k("div", hh, [
      u("div", fh, [
        F(T(sh), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (m(), k("ul", gh, [
        (m(!0), k(ne, null, he(h.value, (x, _) => (m(), k("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: Q(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", p.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: De({ color: x.color }),
            "aria-pressed": p.value[_] !== !1,
            "aria-label": `${x.label}. ${p.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(_)
          }, [
            u("span", ph, [
              f[0] || (f[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: De({ borderColor: x.color })
              }, null, 4),
              f[1] || (f[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(x.label), 1)
          ], 14, mh)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), yt = /* @__PURE__ */ ge(bh, [["__scopeId", "data-v-fc764ffb"]]), vh = { class: "chart-container" }, yh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", xh = /* @__PURE__ */ le({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Ut.register(uu, vs, bs);
    const { isDark: a, colors: s } = $e(Ce(n, "theme")), o = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = $(() => n.options ? n.options : {
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
              family: yh,
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
              return c.labels.length && c.datasets.length ? c.labels.map((d, h) => {
                const v = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], b = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: b,
                  hidden: !r.getDataVisibility(h),
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, g) => v + g, 0), p = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${p}%)`;
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
    return t({ isDark: a }), (r, c) => (m(), k("div", vh, [
      F(T(oh), {
        data: T(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ma = /* @__PURE__ */ ge(xh, [["__scopeId", "data-v-0f7806d6"]]), _h = { class: "chart-container" }, kh = ["viewBox"], wh = ["transform"], Ch = ["x", "width", "fill", "stroke"], $h = ["fill"], Sh = ["x1", "y1", "x2", "y2", "stroke"], Mh = ["points", "fill"], Dh = ["x1", "y1", "x2", "y2", "stroke"], Th = ["x", "y", "fill"], Ah = ["x1", "y1", "x2", "y2", "stroke"], Bh = ["points", "fill"], Lh = ["transform"], Ph = ["y1", "y2"], Ih = ["y1", "y2"], Rh = ["y1", "y2"], Fh = ["y1", "y2"], Eh = ["y", "height"], Oh = ["y1", "y2"], Vh = ["y1", "y2"], zh = ["y1", "y2"], Nh = ["y1", "y2"], Hh = ["y", "height"], Wh = ["cy", "stroke", "onMouseenter"], jh = ["cy", "stroke", "onMouseenter"], Yh = ["cy", "stroke", "onMouseenter"], Kh = ["cy", "stroke", "onMouseenter"], Uh = ["y1", "y2", "onMouseenter"], qh = ["y1", "y2", "onMouseenter"], Xh = ["x", "y", "fill"], Gh = ["x", "y", "fill"], Zh = ["transform"], Qh = { transform: "translate(-200, 0)" }, Jh = ["stroke"], ef = ["fill"], tf = { transform: "translate(-130, 0)" }, nf = ["stroke"], af = ["fill"], sf = { transform: "translate(-60, 0)" }, of = ["stroke"], lf = ["fill"], rf = { transform: "translate(10, 0)" }, cf = ["stroke"], df = ["fill"], uf = { transform: "translate(80, 0)" }, hf = ["fill"], ff = { transform: "translate(150, 0)" }, gf = ["fill"], mf = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = $e(Ce(n, "theme")), s = $(() => ({
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
    })), o = ae({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, l = (p, v) => {
      const g = p.currentTarget.closest("svg");
      if (!g) return;
      const y = g.getBoundingClientRect(), b = g.createSVGPoint();
      b.x = p.clientX - y.left, b.y = p.clientY - y.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, r = (p) => {
      if (o.value.visible) {
        const v = p.currentTarget, g = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = p.clientX - g.left, y.y = p.clientY - g.top, o.value.x = y.x, o.value.y = y.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = $(() => {
      const p = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const b = y, f = (b - 1) / 9, x = n.chartMargin + g - f * g;
        p.push({ value: b, y: x });
      }
      return p;
    });
    return t({ isDark: a }), (p, v) => (m(), k("div", _h, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: De(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        o.value.visible ? (m(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          u("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: s.value.tooltipBg,
            rx: "6",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, Ch),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, D(o.value.text), 9, $h)
        ], 8, wh)) : z("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Sh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, Mh),
        (m(!0), k(ne, null, he(h.value, (g, y) => (m(), k(ne, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Dh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(g.value), 9, Th)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Ah),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Bh),
        (m(!0), k(ne, null, he(e.boxplotData, (g, y) => (m(), k(ne, { key: y }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (m(), k(ne, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ph),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ih),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Rh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Fh),
              u("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Eh)
            ], 64)) : (m(), k(ne, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Oh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Vh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, zh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Nh),
              u("rect", {
                x: -24,
                y: g.q3Y,
                width: "48",
                height: g.q1Y - g.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, Hh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Wh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, jh),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Yh),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (b) => l(b, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Kh),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Uh),
            g.averageY ? (m(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (b) => l(b, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, qh)) : z("", !0)
          ], 8, Lh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(g.label)), 9, Xh),
          g.responseCount ? (m(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(g.responseCount), 9, Gh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Qh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Jh),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, ef)
          ]),
          u("g", tf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, nf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, af)
          ]),
          u("g", sf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, of),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, lf)
          ]),
          u("g", rf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, cf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, df)
          ]),
          u("g", uf, [
            v[0] || (v[0] = u("line", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, hf)
          ]),
          u("g", ff, [
            v[1] || (v[1] = u("line", {
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, gf)
          ])
        ], 8, Zh)) : z("", !0)
      ], 44, kh))
    ]));
  }
}), pf = /* @__PURE__ */ ge(mf, [["__scopeId", "data-v-9ac5c075"]]), bf = { class: "chart-container" }, vf = ["viewBox"], yf = ["x1", "y1", "x2", "y2", "stroke"], xf = ["points", "fill"], _f = ["x1", "y1", "x2", "y2", "stroke"], kf = ["x1", "y1", "x2", "y2", "stroke"], wf = ["x", "y", "fill"], Cf = ["x", "y", "fill", "transform"], $f = ["x1", "y1", "x2", "y2", "stroke"], Sf = ["points", "fill"], Mf = ["transform"], Df = ["y1", "y2", "stroke", "onMouseenter"], Tf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Af = ["x1", "y1", "x2", "y2", "onMouseenter"], Bf = ["x1", "y1", "x2", "y2", "onMouseenter"], Lf = ["cy", "stroke", "onMouseenter"], Pf = ["cy", "stroke", "onMouseenter"], If = ["x", "y", "fill"], Rf = ["x", "y", "fill"], Ff = ["transform"], Ef = { transform: "translate(-180, 0)" }, Of = ["stroke"], Vf = ["fill"], zf = { transform: "translate(-120, 0)" }, Nf = ["fill"], Hf = { transform: "translate(-60, 0)" }, Wf = ["fill"], jf = { transform: "translate(0, 0)" }, Yf = ["stroke"], Kf = ["fill"], Uf = { transform: "translate(60, 0)" }, qf = ["fill"], Xf = { transform: "translate(130, 0)" }, Gf = ["fill"], Zf = ["transform"], Qf = ["x", "y", "width", "height", "fill", "stroke"], Jf = ["y", "fill"], eg = ["y", "fill"], ra = 10, tg = 14, Na = 13, Yo = 4, Ko = 12, ng = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = ra + Na + Yo + Ko + ra, i = $(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(x, _, w) {
      const C = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * _ * C);
    }
    function r(x, _) {
      return Math.max(
        l(x.length, Na, !0),
        l(_.length, Ko, !1),
        52
      ) + tg * 2;
    }
    function c(x, _, w, C) {
      const M = w / 2, S = 6, I = Math.min(
        Math.max(x, M + S),
        n.chartWidth - M - S
      ), V = S + C + 10, E = n.chartHeight - S + 10, A = Math.min(Math.max(_, V), E);
      return { x: I, y: A };
    }
    const d = $(() => ({
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
    })), h = ae({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), p = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, v = (x, _, w) => {
      const C = x.currentTarget.closest("svg");
      if (!C) return;
      const M = C.getBoundingClientRect(), S = C.createSVGPoint();
      S.x = x.clientX - M.left, S.y = x.clientY - M.top;
      let I = p(_.label), V = "";
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
      const E = r(I, V), A = o;
      let L = S.x, O = S.y - 20;
      const X = c(L, O, E, A);
      L = X.x, O = X.y, h.value = {
        visible: !0,
        x: L,
        y: O,
        title: I,
        text: V,
        width: E,
        height: A
      };
    }, g = (x) => {
      if (h.value.visible) {
        const _ = x.currentTarget, w = _.getBoundingClientRect(), C = _.createSVGPoint();
        C.x = x.clientX - w.left, C.y = x.clientY - w.top;
        let M = C.x, S = C.y - 20;
        const I = c(M, S, h.value.width, h.value.height);
        h.value.x = I.x, h.value.y = I.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, b = () => {
      h.value.visible = !1;
    }, f = $(() => {
      const x = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const M = C, S = (M - 1) / 9, I = n.chartMargin + w - S * w;
        x.push({ value: M, y: I });
      }
      return x;
    });
    return t({ isDark: a }), (x, _) => (m(), k("div", bf, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: De(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: y
      }, [
        _[4] || (_[4] = u("defs", null, [
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
        }, null, 8, yf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, xf),
        (m(!0), k(ne, null, he(f.value, (w, C) => (m(), k("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, _f))), 128)),
        (m(!0), k(ne, null, he(f.value, (w, C) => (m(), k(ne, { key: C }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, kf),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(w.value), 9, wf)
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
        }, D(p(e.yAxisLabel)), 9, Cf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, $f),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Sf),
        (m(!0), k(ne, null, he(e.candlestickData, (w, C) => (m(), k(ne, { key: C }, [
          u("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            u("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "wick"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Df),
            u("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (M) => v(M, w, "body"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Tf),
            w.medianY ? (m(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "median"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Af)) : z("", !0),
            w.averageY ? (m(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (M) => v(M, w, "average"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Bf)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "min"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Lf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "max"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Pf)
          ], 8, Mf),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(p(w.label)), 9, If),
          w.responseCount ? (m(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(w.responseCount), 9, Rf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Ef, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Of),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Vf)
          ]),
          u("g", zf, [
            _[0] || (_[0] = u("rect", {
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
            }, " Q1 ", 8, Nf)
          ]),
          u("g", Hf, [
            _[1] || (_[1] = u("rect", {
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
            }, " Q3 ", 8, Wf)
          ]),
          u("g", jf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Yf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Kf)
          ]),
          u("g", Uf, [
            _[2] || (_[2] = u("line", {
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
            }, " Avg ", 8, qf)
          ]),
          u("g", Xf, [
            _[3] || (_[3] = u("line", {
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
            }, " Median ", 8, Gf)
          ])
        ], 8, Ff)) : z("", !0),
        h.value.visible ? (m(), k("g", {
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
          }, null, 8, Qf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ra,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Jf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ra + Na + Yo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, eg)
        ], 8, Zf)) : z("", !0)
      ], 44, vf))
    ]));
  }
}), ag = /* @__PURE__ */ ge(ng, [["__scopeId", "data-v-22efd66d"]]), sg = ["viewBox"], og = ["x1", "y1", "x2", "y2", "stroke"], ig = ["x1", "y1", "x2", "y2", "stroke"], lg = ["points", "fill"], rg = ["x1", "y1", "x2", "y2", "stroke"], cg = ["x", "y", "fill"], dg = ["x", "y", "fill", "transform"], ug = ["x1", "y1", "x2", "y2", "stroke"], hg = ["points", "fill"], fg = ["x1", "y1", "x2", "y2", "stroke"], gg = ["x", "y", "fill"], mg = ["x", "y", "fill"], pg = ["d"], bg = ["x", "y", "width", "height", "onMouseenter"], vg = ["x1", "y1", "x2", "y2"], yg = ["x", "y"], xg = ["x1", "y1", "x2", "y2"], _g = ["x", "y"], kg = ["x1", "y1", "x2", "y2"], wg = ["x", "y"], Cg = ["x1", "y1", "x2", "y2"], $g = ["x", "y"], Sg = ["x1", "y1", "x2", "y2"], Mg = ["x", "y"], Dg = ["x1", "y1", "x2", "y2"], Tg = ["x", "y"], Ag = ["transform"], Bg = { transform: "translate(-220, 0)" }, Lg = ["fill"], Pg = { transform: "translate(-140, 0)" }, Ig = ["fill"], Rg = { transform: "translate(-80, 0)" }, Fg = ["fill"], Eg = { transform: "translate(-20, 0)" }, Og = ["fill"], Vg = { transform: "translate(60, 0)" }, zg = ["fill"], Ng = { transform: "translate(130, 0)" }, Hg = ["fill"], Wg = { transform: "translate(180, 0)" }, jg = ["fill"], Yg = ["transform"], Kg = ["x", "y", "width", "height", "fill", "stroke"], Ug = ["y", "fill"], qg = ["y", "fill"], ca = 10, Xg = 14, Ha = 13, Uo = 12, qo = 4, Gg = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = ca + Ha + qo + Uo + ca, i = $(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(K, W, q) {
      const re = q ? 0.6 : 0.535;
      return Math.ceil(Math.max(K, 1) * W * re);
    }
    function r(K, W) {
      return Math.max(
        l(K.length, Ha, !0),
        l(W.length, Uo, !1),
        52
      ) + Xg * 2;
    }
    function c(K, W, q, re) {
      const ue = q / 2, P = 6, Y = Math.min(
        Math.max(K, ue + P),
        n.chartWidth - ue - P
      ), ee = P + re + 10, ce = n.chartHeight - P + 10, pe = Math.min(Math.max(W, ee), ce);
      return { x: Y, y: pe };
    }
    const d = $(() => ({
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
    })), h = ae({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), p = $(
      () => n.chartMarginRight ?? n.chartMargin
    ), v = $(() => n.chartMargin + n.plotInset), g = $(
      () => n.chartWidth - p.value - n.plotInset
    ), y = $(() => Math.max(g.value - v.value, 1)), b = $(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), f = $(() => y.value / 10 * 0.52);
    function x(K) {
      if (K < 1 || K > 10) return null;
      const W = y.value / 10;
      return v.value + (K - 0.5) * W;
    }
    const _ = $(
      () => Array.from({ length: 10 }, (K, W) => {
        const q = W + 1, re = x(q);
        return re === null ? null : { score: q, x: re };
      }).filter((K) => K !== null)
    ), w = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const K = Math.max(...n.histogram.map((q) => q.count || 0), 1), W = Math.max(1, Math.ceil(K * 0.2));
      return K + W;
    }), C = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const K = n.averageScore || 0;
      let W = 0, q = 0;
      if (n.histogram.forEach((ue) => {
        const P = ue.count || 0;
        W += P;
        const Y = ue.score - K;
        q += P * (Y * Y);
      }), W === 0) return 1;
      const re = q / W;
      return Math.sqrt(re) || 1;
    }), M = (K, W, q) => {
      if (q === 0) return 0;
      const re = 1 / (q * Math.sqrt(2 * Math.PI)), ue = -0.5 * Math.pow((K - W) / q, 2);
      return re * Math.exp(ue);
    }, S = $(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && C.value === 0) return null;
      const K = n.averageScore, W = C.value, q = 100, ue = Math.max(...n.histogram.map((ce) => ce.count || 0), 1) / w.value * b.value;
      if (ue <= 0) return null;
      let P = 0;
      for (let ce = 0; ce <= q; ce++) {
        const pe = 1 + 9 * (ce / q), xe = M(pe, K, W);
        xe > P && (P = xe);
      }
      if (P <= 0) return null;
      const Y = ue / P, ee = [];
      for (let ce = 0; ce <= q; ce++) {
        const pe = 1 + 9 * (ce / q), xe = M(pe, K, W) * Y, Le = x(pe);
        if (Le !== null) {
          const et = n.chartHeight - n.chartBottomMargin - xe;
          ee.push(`${ce === 0 ? "M" : "L"} ${Le} ${et}`);
        }
      }
      return ee.join(" ");
    }), I = $(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const K = y.value / 10;
      return n.histogram.map((W) => {
        const q = Number(W.score);
        if (!Number.isFinite(q) || q < 1 || q > 10)
          return null;
        const re = v.value + (q - 0.5) * K, ue = W.count > 0 ? W.count / w.value * b.value : 0, P = n.chartHeight - n.chartBottomMargin - ue;
        return {
          score: q,
          count: W.count,
          x: re,
          y: P,
          height: ue
        };
      }).filter((W) => W !== null);
    }), V = $(() => x(n.minScore)), E = $(() => x(n.maxScore)), A = $(() => x(n.q1Score)), L = $(() => x(n.medianScore)), O = $(() => x(n.q3Score)), X = $(() => x(n.averageScore)), G = $(() => n.minScore), se = $(() => n.maxScore), oe = $(() => n.q1Score), me = $(() => n.medianScore), ye = $(() => n.q3Score), U = $(() => n.averageScore), H = $(() => {
      const K = [], W = n.chartMargin - 8, q = 18;
      A.value !== null && K.push({
        x: A.value,
        y: W,
        value: n.q1Score,
        label: `Q1: ${oe.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && K.push({
        x: L.value,
        y: W - q,
        value: n.medianScore,
        label: `Median: ${me.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), X.value !== null && K.push({
        x: X.value,
        y: W - q,
        value: n.averageScore,
        label: `Avg: ${U.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), O.value !== null && K.push({
        x: O.value,
        y: W,
        value: n.q3Score,
        label: `Q3: ${ye.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), K.sort((P, Y) => (P.x || 0) - (Y.x || 0));
      const re = [[], [], []];
      K.forEach((P) => {
        if (P.x === null) return;
        let Y = -1;
        for (let ee = 0; ee < re.length; ee++) {
          let ce = !1;
          for (const pe of re[ee]) {
            if (pe.x === null) continue;
            const xe = Math.abs(P.x - pe.x), Le = (P.width + pe.width) / 2 + 10;
            if (xe < Le) {
              ce = !0;
              break;
            }
          }
          if (!ce) {
            Y = ee;
            break;
          }
        }
        Y === -1 && (Y = re.length - 1), P.y = W - Y * q, re[Y].push(P);
      });
      const ue = 15;
      return K.forEach((P) => {
        P.y < ue && (P.y = ue);
      }), K;
    }), Z = (K) => H.value.find((q) => q.id === K)?.y || n.chartMargin - 10, te = $(() => {
      const K = [];
      for (let q = 0; q <= 5; q++) {
        const re = Math.round(w.value / 5 * q), ue = n.chartHeight - n.chartBottomMargin - q / 5 * b.value;
        K.push({ value: re, y: ue });
      }
      return K;
    });
    function fe(K, W, q) {
      const re = K.createSVGPoint();
      re.x = W, re.y = q;
      const ue = K.getScreenCTM();
      if (!ue) {
        const Y = K.getBoundingClientRect();
        return { x: W - Y.left, y: q - Y.top };
      }
      const P = re.matrixTransform(ue.inverse());
      return { x: P.x, y: P.y };
    }
    const we = (K, W) => {
      n.interactive && R(K, W);
    }, Me = () => {
      n.interactive && de();
    }, R = (K, W) => {
      const q = K.currentTarget.closest("svg");
      if (!q) return;
      const { x: re, y: ue } = fe(q, K.clientX, K.clientY), P = `Score: ${W.score}`, Y = `Count: ${Number(W.count ?? 0).toLocaleString()}`, ee = r(P, Y), ce = o, pe = typeof W?.x == "number" ? W.x : re;
      let xe = ue - 20;
      const Le = c(pe, xe, ee, ce);
      h.value = {
        visible: !0,
        x: Le.x,
        y: Le.y,
        title: P,
        text: Y,
        width: ee,
        height: ce,
        anchorX: typeof W?.x == "number" ? W.x : null
      };
    }, N = (K) => {
      if (n.interactive && h.value.visible) {
        const W = K.currentTarget, { x: q, y: re } = fe(W, K.clientX, K.clientY), ue = h.value.anchorX, P = ue != null && Number.isFinite(ue) ? ue : q;
        let Y = re - 20;
        const ee = c(P, Y, h.value.width, h.value.height);
        h.value.x = ee.x, h.value.y = ee.y;
      }
    }, j = () => {
      de();
    }, de = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (K, W) => (m(), k("div", {
      class: Q(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: De(`min-height: ${e.chartHeight}px;`),
        onMousemove: N,
        onMouseleave: j
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
        (m(!0), k(ne, null, he(te.value, (q, re) => (m(), k("line", {
          key: `grid-${re}`,
          x1: v.value,
          y1: q.y,
          x2: g.value,
          y2: q.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, og))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, ig),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, lg),
        (m(!0), k(ne, null, he(te.value, (q, re) => (m(), k(ne, {
          key: `y-tick-${re}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: q.y,
            x2: e.chartMargin,
            y2: q.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, rg),
          u("text", {
            x: e.chartMargin - 12,
            y: q.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(q.value), 9, cg)
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
        }, " Count ", 8, dg),
        u("line", {
          x1: v.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, ug),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, hg),
        (m(!0), k(ne, null, he(_.value, (q) => (m(), k(ne, {
          key: `tick-${q.score}`
        }, [
          u("line", {
            x1: q.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: q.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, fg),
          u("text", {
            x: q.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(q.score), 9, gg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, mg),
        S.value ? (m(), k("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, pg)) : z("", !0),
        (m(!0), k(ne, null, he(I.value, (q, re) => (m(), k("rect", {
          key: `bar-${re}`,
          x: q.x - f.value / 2,
          y: q.y,
          width: f.value,
          height: q.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (ue) => we(ue, q),
          onMouseleave: Me,
          style: De({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, bg))), 128)),
        e.showStatLabels && V.value ? (m(), k("line", {
          key: 1,
          x1: V.value,
          y1: e.chartMargin,
          x2: V.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, vg)) : z("", !0),
        e.showStatLabels && V.value ? (m(), k("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(G.value.toFixed(1)), 9, yg)) : z("", !0),
        e.showStatLabels && A.value ? (m(), k("line", {
          key: 3,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, xg)) : z("", !0),
        e.showStatLabels && A.value ? (m(), k("text", {
          key: 4,
          x: A.value,
          y: Z("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(oe.value.toFixed(1)), 9, _g)) : z("", !0),
        e.showStatLabels && L.value ? (m(), k("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, kg)) : z("", !0),
        e.showStatLabels && L.value ? (m(), k("text", {
          key: 6,
          x: L.value,
          y: Z("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(me.value.toFixed(1)), 9, wg)) : z("", !0),
        e.showStatLabels && X.value ? (m(), k("line", {
          key: 7,
          x1: X.value,
          y1: e.chartMargin,
          x2: X.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Cg)) : z("", !0),
        e.showStatLabels && X.value ? (m(), k("text", {
          key: 8,
          x: X.value,
          y: Z("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(U.value.toFixed(1)), 9, $g)) : z("", !0),
        e.showStatLabels && O.value ? (m(), k("line", {
          key: 9,
          x1: O.value,
          y1: e.chartMargin,
          x2: O.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Sg)) : z("", !0),
        e.showStatLabels && O.value ? (m(), k("text", {
          key: 10,
          x: O.value,
          y: Z("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(ye.value.toFixed(1)), 9, Mg)) : z("", !0),
        e.showStatLabels && E.value ? (m(), k("line", {
          key: 11,
          x1: E.value,
          y1: e.chartMargin,
          x2: E.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Dg)) : z("", !0),
        e.showStatLabels && E.value ? (m(), k("text", {
          key: 12,
          x: E.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(se.value.toFixed(1)), 9, Tg)) : z("", !0),
        e.showLegend ? (m(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Bg, [
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
            }, " Gaussian ", 8, Lg)
          ]),
          u("g", Pg, [
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
            }, " Min ", 8, Ig)
          ]),
          u("g", Rg, [
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
            }, " Q1 ", 8, Fg)
          ]),
          u("g", Eg, [
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
            }, " Median ", 8, Og)
          ]),
          u("g", Vg, [
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
            }, " Avg ", 8, zg)
          ]),
          u("g", Ng, [
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
            }, " Q3 ", 8, Hg)
          ]),
          u("g", Wg, [
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
            }, " Max ", 8, jg)
          ])
        ], 8, Ag)) : z("", !0),
        e.interactive && h.value.visible ? (m(), k("g", {
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
          }, null, 8, Kg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ca,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Ug),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ca + Ha + qo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, qg)
        ], 8, Yg)) : z("", !0)
      ], 44, sg))
    ], 2));
  }
}), el = /* @__PURE__ */ ge(Gg, [["__scopeId", "data-v-8f9da805"]]), Zg = 639, tl = 1024;
function Xo(e) {
  return e < 640 ? "mobile" : e <= tl ? "tablet" : "desktop";
}
function Qg() {
  const e = ae(
    typeof window > "u" ? "desktop" : Xo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Xo(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  tt(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Zg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${tl}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), pt(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = $(() => e.value === "mobile"), l = $(() => e.value === "tablet"), r = $(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Jg = { class: "chart-container" }, em = {
  key: 0,
  class: "loading-state loading-overlay"
}, en = 12, tm = /* @__PURE__ */ le({
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
    Ss.use([wl, Cl, $l, Sl]);
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), { breakpoint: o } = Qg(), i = ae(null), l = ae(!0), r = ae(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, p = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, v = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, b = $(() => {
      const R = o.value;
      return R === "mobile" ? {
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
      } : R === "tablet" ? {
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
        nodeGap: n.nodeGap,
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
    }), f = (R) => {
      const N = R.replace(/_/g, " ").replace(/\s+/g, " ").trim(), j = N.match(/^Failed:\s*(.+)$/i);
      return j ? `Failed:
${j[1].trim()}` : N;
    }, x = (R, N) => {
      const j = R.trim();
      if (!j || N < 1 || j.length <= N) return j;
      const de = [];
      let K = 0;
      for (; K < j.length; ) {
        const W = Math.min(K + N, j.length);
        if (W >= j.length) {
          const ue = j.slice(K).trim();
          ue && de.push(ue);
          break;
        }
        const q = j.slice(K, W), re = q.lastIndexOf(" ");
        if (re > 0)
          for (de.push(j.slice(K, K + re).trim()), K += re; K < j.length && j[K] === " "; ) K += 1;
        else
          de.push(q), K = W;
      }
      return de.join(`
`);
    }, _ = (R, N) => {
      const j = R.trim();
      return !j || N < 1 ? R : j.split(`
`).map((de) => x(de.trim(), N)).filter(Boolean).join(`
`);
    }, w = (R) => R.status ? R.status : g.test(R.name) ? "abandon" : y.test(R.name) ? "error" : "success", C = (R) => R.originalValue ?? R.value, M = (R, N) => {
      const j = new Set(N.map((K) => K.target)), de = R.filter((K) => !j.has(K.name));
      for (const K of de) {
        if (typeof K.value == "number" && K.value > 0) return K.value;
        const W = N.filter((q) => q.source === K.name);
        if (W.length > 0)
          return W.reduce((q, re) => q + C(re), 0);
      }
      return N.reduce((K, W) => Math.max(K, C(W)), 0);
    }, S = (R, N, j) => {
      if (j && typeof j.value == "number") return j.value;
      const de = N.filter((W) => W.target === R);
      return de.length > 0 ? de.reduce((W, q) => W + C(q), 0) : N.filter((W) => W.source === R).reduce((W, q) => W + C(q), 0);
    }, I = (R, N) => {
      const j = /* @__PURE__ */ new Map(), de = new Set(N.map((W) => W.target)), K = R.filter((W) => !de.has(W.name)).map((W) => ({ name: W.name, depth: 0 }));
      for (; K.length > 0; ) {
        const { name: W, depth: q } = K.shift(), re = j.get(W);
        if (!(re !== void 0 && re >= q)) {
          j.set(W, q);
          for (const ue of N)
            ue.source === W && K.push({ name: ue.target, depth: q + 1 });
        }
      }
      for (const W of R)
        j.has(W.name) || j.set(W.name, 0);
      return j;
    }, V = (R, N) => {
      const j = /* @__PURE__ */ new Map(), de = new Set(N.map((re) => re.target)), K = R.filter((re) => !de.has(re.name));
      let W = 0;
      const q = (re) => {
        let ue = re;
        for (; ue && !j.has(ue); )
          j.set(ue, W), W += 1, ue = N.filter(
            (Y) => Y.source === ue && w({ name: Y.target }) === "success"
          ).sort((Y, ee) => C(ee) - C(Y))[0]?.target;
      };
      return K.forEach((re) => q(re.name)), j;
    }, E = (R, N, j) => {
      const de = w(R);
      if (de === "success" && j.has(R.name))
        return j.get(R.name);
      if (de === "success") {
        const K = N.filter((q) => q.target === R.name);
        return 200 + (K.length ? Math.min(
          ...K.map(
            (q) => j.has(q.source) ? (j.get(q.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return de === "abandon" ? 1e3 : 2e3;
    }, A = (R, N) => {
      const j = I(R, N), de = V(R, N);
      return [...R].sort((K, W) => {
        const q = j.get(K.name) ?? 0, re = j.get(W.name) ?? 0;
        if (q !== re) return q - re;
        const ue = v[w(K)], P = v[w(W)];
        if (ue !== P) return ue - P;
        const Y = E(K, N, de), ee = E(W, N, de);
        return Y !== ee ? Y - ee : K.name.localeCompare(W.name);
      });
    }, L = (R, N, j, de) => {
      const W = _(R, de).split(`
`), q = N * 0.58, ue = Math.max(...W.map((Y) => Y.length), 1) * q, P = W.length * j;
      return {
        lines: W,
        width: ue,
        height: P,
        nodeWidth: ue + en * 2
      };
    }, O = (R, N) => N ? `${(R / N * 100).toFixed(1)}%` : "0.0%", X = (R, N, j, de, K) => {
      if (typeof R.label == "string" && R.label)
        return _(f(R.label), K);
      const W = _(f(R.name), K);
      if (N === "success" && j > 0) {
        const q = S(R.name, de, R), re = O(q, j);
        return `${W}
(${re})`;
      }
      return W;
    }, G = (R, N = 0) => {
      if (N > 0) return N;
      const j = R.match(/^(\d+(?:\.\d+)?)px$/);
      if (j) return Number(j[1]);
      const de = R.match(/^(\d+(?:\.\d+)?)vh$/);
      return de && typeof window < "u" ? Number(de[1]) / 100 * window.innerHeight : 500;
    }, se = (R, N, j, de, K) => {
      if (!N.length || !R.length || K <= 0) return R;
      const W = R.map((pe) => ({ ...pe })), q = j.labelLineHeight || Math.round(j.labelFontSize * 1.25), re = Math.max(4, j.labelCharsPerLine), ue = Math.max(de * 0.88, 260), P = I(N, W), Y = /* @__PURE__ */ new Map();
      N.forEach((pe) => {
        const xe = P.get(pe.name) ?? 0;
        Y.set(xe, (Y.get(xe) ?? 0) + 1);
      });
      const ee = (pe) => {
        const Le = N.find((Gt) => Gt.name === pe)?.displayLabel || pe, dt = L(Le, j.labelFontSize, q, re).height + en * 2, Xt = P.get(pe) ?? 0, xt = Y.get(Xt) ?? 1, un = (Math.max(xt, 1) - 1) * j.nodeGap / Math.max(xt, 1), Da = Math.max(ue - un, dt);
        return Math.max(1, dt / Da * K);
      }, ce = (pe) => {
        const xe = W.filter((Le) => Le.target === pe);
        return xe.length > 0 ? xe.reduce((Le, et) => Le + et.value, 0) : W.filter((Le) => Le.source === pe).reduce((Le, et) => Le + et.value, 0);
      };
      for (let pe = 0; pe < 16; pe += 1) {
        let xe = !1;
        for (const Le of N) {
          const et = ee(Le.name), dt = ce(Le.name);
          if (dt >= et) continue;
          const Xt = W.filter((Gt) => Gt.target === Le.name), xt = W.filter((Gt) => Gt.source === Le.name), un = Xt.length > 0 ? Xt : xt;
          if (un.length === 0) continue;
          const Da = et / Math.max(dt, 1e-6);
          un.forEach((Gt) => {
            Gt.value *= Da;
          }), xe = !0;
        }
        if (!xe) break;
      }
      return W;
    }, oe = (R, N, j) => {
      const de = M(R, N), K = A(R, N), W = j.labelLineHeight || Math.round(j.labelFontSize * 1.25), q = Math.max(4, j.labelCharsPerLine);
      let re = j.nodeWidth;
      const ue = [], P = K.map((ee, ce) => {
        const pe = w(ee), xe = X(
          ee,
          pe,
          de,
          N,
          q
        );
        ue.push(xe);
        const Le = L(xe, j.labelFontSize, W, q);
        j.orient === "vertical" ? re = Math.max(re, Le.height + en * 2) : re = Math.max(re, Le.nodeWidth);
        const et = n.nodeColors[ee.name] || p[pe] || me[ce % me.length], dt = Math.max(Math.ceil(Le.nodeWidth - en * 2), 48);
        return {
          ...ee,
          displayLabel: xe,
          label: {
            width: dt,
            overflow: "none",
            lineHeight: W,
            fontSize: j.labelFontSize
          },
          itemStyle: {
            color: et,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let Y = { ...j.contentMargins };
      if (j.orient === "vertical") {
        const ee = Math.max(
          ...ue.map(
            (pe) => L(pe, j.labelFontSize, W, q).width
          ),
          0
        ), ce = typeof Y.right == "number" ? Y.right : 10;
        Y = {
          ...Y,
          right: Math.max(ce, ee + en + j.labelDistance)
        };
      }
      return { nodes: P, maxNodeWidth: re, contentMargins: Y, originTotal: de };
    }, me = [
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
    ], ye = () => {
      const R = n.data.links.filter(
        (K) => K.source && K.target && typeof K.value == "number"
      ), N = Math.max(...R.map((K) => K.value), 1), j = Math.max(1, N * 0.01), de = R.map((K) => ({
        ...K,
        originalValue: K.value,
        value: K.value < N * 0.01 ? j : K.value
      }));
      return {
        nodes: n.data.nodes.filter((K) => K.name),
        links: de
      };
    }, U = (R) => (N) => {
      const j = N.dataType === "node", de = s.value.tooltipText, K = a.value ? "#d1d5db" : "#e2e8f0";
      if (j) {
        const P = R.filter((ce) => ce.target === N.name), Y = R.filter((ce) => ce.source === N.name), ee = P.length > 0 ? P.reduce((ce, pe) => ce + (pe.originalValue || pe.value), 0) : Y.reduce((ce, pe) => ce + (pe.originalValue || pe.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${N.name}</div><div style="color: ${K}; font-size: 12px;">Count: ${ee.toLocaleString()}</div>`;
      }
      const W = N.data?.source || N.source || "Unknown", q = N.data?.target || N.target || "Unknown", re = N.data?.originalValue || N.data?.value || N.value || 0, ue = N.data?.label || `${re.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${de};">${W} → ${q}</div><div style="color: ${K}; font-size: 12px;">Flow: ${ue}</div>`;
    }, H = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const R = b.value, N = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", j = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", de = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", K = R.labelPosition === "inside" ? "#ffffff" : a.value ? s.value.textPrimary : "#334155";
      try {
        const { nodes: W, links: q } = ye(), { nodes: re, maxNodeWidth: ue, contentMargins: P, originTotal: Y } = oe(
          W,
          q,
          R
        ), ee = G(n.height, i.value?.clientHeight ?? 0), ce = se(
          q,
          re,
          {
            labelFontSize: R.labelFontSize,
            labelLineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
            labelCharsPerLine: R.labelCharsPerLine,
            nodeGap: R.nodeGap
          },
          ee,
          Y
        ), pe = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: U(ce),
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
              data: re,
              links: ce,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: j,
                  opacity: 1
                }
              },
              lineStyle: {
                color: N,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: R.labelPosition,
                color: K,
                fontWeight: 700,
                fontSize: R.labelFontSize,
                lineHeight: R.labelLineHeight || Math.round(R.labelFontSize * 1.25),
                padding: en,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...R.orient === "horizontal" ? { width: Math.max(ue - en * 2, 48), overflow: "none" } : R.labelWrap && R.labelTextWidth > 0 ? { width: R.labelTextWidth, overflow: "none" } : {},
                ...R.labelDistance > 0 ? { distance: R.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => xe.data?.displayLabel || xe.name || ""
              },
              edgeLabel: R.edgeLabelShow ? {
                show: !0,
                fontSize: R.edgeLabelFontSize,
                color: de,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (xe) => {
                  if (xe.data?.label) return xe.data.label;
                  const Le = xe.data?.originalValue ?? xe.value ?? 0, et = xe.data?.source ?? xe.source, dt = ce.filter((xt) => xt.source === et).reduce((xt, un) => xt + C(un), 0), Xt = O(Le, dt);
                  return `${Number(Le).toLocaleString()} (${Xt})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: R.nodeGap,
              nodeWidth: ue,
              layoutIterations: h.node.iterations,
              orient: R.orient,
              draggable: !1,
              ...P
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(pe), c.resize();
      } catch (W) {
        console.error("Error setting Sankey chart options:", W), r.value = !0;
      }
    }, Z = async () => {
      if (i.value)
        try {
          c = Ss.init(i.value), H(), window.addEventListener("resize", we);
        } catch (R) {
          console.error("Error initializing Sankey chart:", R), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, te = () => {
      const R = i.value;
      return !!(R && R.clientWidth > 0 && R.clientHeight > 0);
    }, fe = async () => {
      if (await We(), te()) return Z();
      await new Promise((R) => {
        const N = i.value;
        if (!N) {
          R();
          return;
        }
        d = new ResizeObserver(() => {
          te() && (d?.disconnect(), d = null, Z().then(R));
        }), d.observe(N);
      });
    }, we = () => c?.resize(), Me = () => {
      window.removeEventListener("resize", we), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return tt(() => fe()), si(Me), Oe(() => n.data, H, { deep: !0 }), Oe(a, H), Oe(o, H), t({ isDark: a }), (R, N) => (m(), k("div", Jg, [
      r.value ? (m(), k("div", {
        key: 0,
        class: "error-state",
        style: De({ height: e.height })
      }, [...N[0] || (N[0] = [
        Cs('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: De({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (m(), k("div", em, [...N[1] || (N[1] = [
          Cs('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : z("", !0)
      ], 4))
    ]));
  }
}), qt = /* @__PURE__ */ ge(tm, [["__scopeId", "data-v-b04b208a"]]), nm = ["open"], am = { class: "card-header metric-collapsible__summary" }, sm = { class: "header-content metric-header-content" }, om = { class: "metric-header-content__main" }, im = { class: "metric-header-content__text" }, lm = {
  key: "header-skeleton",
  class: "ut-skeleton-blink ut-skeleton-collapsible-title",
  "aria-hidden": "true",
  "aria-busy": "true"
}, rm = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, cm = {
  key: 0,
  class: "card-title"
}, dm = {
  key: 0,
  class: "card-subtitle"
}, um = {
  key: 0,
  class: "metric-header-content__export"
}, hm = {
  key: 0,
  class: "cmc-header-aside"
}, fm = { class: "chart-metric-container__body" }, gm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, mm = { class: "card-header" }, pm = { class: "header-content metric-header-content" }, bm = { class: "metric-header-content__main" }, vm = { class: "metric-header-content__text" }, ym = {
  key: "header-skeleton",
  class: "ut-skeleton-container",
  "aria-hidden": "true",
  "aria-busy": "true"
}, xm = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, _m = {
  key: 0,
  class: "card-title"
}, km = {
  key: 0,
  class: "card-subtitle"
}, wm = {
  key: 0,
  class: "metric-header-content__export"
}, Cm = {
  key: 0,
  class: "cmc-header-aside"
}, $m = { class: "chart-metric-container__body" }, Sm = /* @__PURE__ */ le({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ae(t.defaultOpen), a = Ja();
    function s(l) {
      return l.some((r) => {
        if (r.type === _l) return !1;
        if (r.type === Text) {
          const c = r.children;
          return typeof c == "string" && c.trim().length > 0;
        }
        return !!r.type;
      });
    }
    const o = $(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? s(l()) : !1;
    });
    Oe(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const r = l.currentTarget;
      r?.tagName === "DETAILS" && (n.value = r.open);
    }
    return (l, r) => e.collapsible ? (m(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", am, [
        u("div", sm, [
          u("div", om, [
            u("div", im, [
              F(Te, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (m(), k("div", lm)) : (m(), k("div", rm, [
                    Se(l.$slots, "title", {}, () => [
                      e.title ? (m(), k("h3", cm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (m(), k("p", dm, D(e.subtitle), 1)) : z("", !0),
                    Se(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (m(), k("div", um, [
              Se(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (m(), k("div", hm, [
            Se(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ]),
        r[0] || (r[0] = u("svg", {
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
      u("div", fm, [
        Se(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, nm)) : (m(), k("div", gm, [
      u("div", mm, [
        u("div", pm, [
          u("div", bm, [
            u("div", vm, [
              F(Te, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (m(), k("div", ym, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (m(), k("div", xm, [
                    Se(l.$slots, "title", {}, () => [
                      e.title ? (m(), k("h3", _m, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (m(), k("p", km, D(e.subtitle), 1)) : z("", !0),
                    Se(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (m(), k("div", wm, [
              Se(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (m(), k("div", Cm, [
            Se(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      u("div", $m, [
        Se(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ke = /* @__PURE__ */ ge(Sm, [["__scopeId", "data-v-8741c0a0"]]);
function Mm(e, t) {
  return m(), k("svg", {
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
function _s(e, t) {
  return m(), k("svg", {
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
function nt(e, t) {
  return m(), k("svg", {
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
function Dm(e, t) {
  return m(), k("svg", {
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
function ks(e, t) {
  return m(), k("svg", {
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
function nl(e, t) {
  return m(), k("svg", {
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
function al(e, t) {
  return m(), k("svg", {
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
function Tm(e, t) {
  return m(), k("svg", {
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
function Am(e, t) {
  return m(), k("svg", {
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
function sl(e, t) {
  return m(), k("svg", {
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
const Bm = {
  key: 0,
  class: "footer-divider"
}, Lm = {
  key: 0,
  class: "export-label"
}, Pm = { class: "export-buttons" }, Im = ["disabled"], Rm = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Fm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Em = ["disabled"], Om = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Vm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, zm = /* @__PURE__ */ le({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = $(() => n.variant === "footer" ? "footer" : "div"), o = $(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (m(), J(Ft(s.value), {
      class: Q(o.value)
    }, {
      default: B(() => [
        e.variant === "footer" ? (m(), k("div", Bm)) : z("", !0),
        u("div", {
          class: Q(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (m(), k("span", Lm, "Export")) : z("", !0),
          u("div", Pm, [
            i("pdf") ? (m(), k("button", {
              key: 0,
              type: "button",
              class: Q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (m(), k("svg", Rm, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), k("svg", Fm, [...c[3] || (c[3] = [
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
            ], 10, Im)) : z("", !0),
            i("csv") ? (m(), k("button", {
              key: 1,
              type: "button",
              class: Q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (m(), k("svg", Om, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), k("svg", Vm, [...c[6] || (c[6] = [
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
            ], 10, Em)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ve = /* @__PURE__ */ ge(zm, [["__scopeId", "data-v-ebfab47f"]]), Nm = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Hm = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Wm = { class: "w-full shrink-0 sm:pr-2" }, jm = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Ym = { class: "max-w-[360px] text-center" }, Km = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Um = /* @__PURE__ */ le({
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
    }, l = Ce(s, "theme"), r = Ce(s, "options"), { isDark: c } = $e(l), d = (p) => {
      const v = new Date(p), g = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, h = $(() => {
      const p = s.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((_) => d(_)), y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(p))
        for (const w of Object.keys(_))
          y.add(w);
      const b = Array.from(y), f = (_) => _, x = b.map((_) => ({
        label: _,
        data: v.map((w) => p[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: f(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (p, v) => (m(), J(ke, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", Nm, [
          F(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              e.loading ? (m(), k("div", {
                key: "loading",
                class: Q(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": T(c) }]]),
                "aria-busy": "true",
                "aria-label": "Loading chart"
              }, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 skeleton-shimmer",
                  style: { "border-radius": "10px" },
                  "aria-hidden": "true"
                }, null, -1)
              ])], 2)) : h.value.labels && h.value.labels.length ? (m(), k("section", Hm, [
                u("div", Wm, [
                  F($t, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (m(), k("section", jm, [
                u("div", Ym, [
                  u("div", Km, [
                    F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), qm = /* @__PURE__ */ ge(Um, [["__scopeId", "data-v-36bec153"]]), dn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", be = (e, t) => `${e.toLocaleString()} (${dn(e, t)})`, Xm = { class: "flex w-full min-w-0 justify-center" }, Gm = { class: "flex max-w-full min-w-0 items-center gap-2" }, Zm = { class: "min-w-0 truncate text-[12px] leading-normal" }, Qm = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Jm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, ep = /* @__PURE__ */ le({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (m(), k("div", {
      class: Q(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", Xm, [
        u("div", Gm, [
          e.color ? (m(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: De({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", Zm, D(e.title), 1)
        ])
      ]),
      u("p", Qm, D(e.value), 1),
      e.subvalue ? (m(), k("p", Jm, D(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ ge(ep, [["__scopeId", "data-v-945ff8fb"]]), tp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, qe = /* @__PURE__ */ le({
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
    const t = e, n = $(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = $(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = $(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = $(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = $(() => {
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
    return (l, r) => n.value ? (m(), k("span", {
      key: 0,
      role: "status",
      class: Q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (m(), k("span", tp, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: Q(["min-w-0 flex-1 text-center", o.value])
      }, D(a.value), 3)
    ], 2)) : (m(), k("span", {
      key: 1,
      class: Q(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Se(l.$slots, "default", {}, () => [
        Be(D(e.label), 1)
      ])
    ], 2));
  }
}), ie = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Pe = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Rt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, np = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, ap = { class: "overflow-x-auto" }, sp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, op = ["aria-sort", "onClick"], ip = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, lp = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, rp = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, cp = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ae(!1), o = "—";
    function i(w) {
      return w == null || w === "" ? o : String(w);
    }
    function l(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function r(w) {
      return `cell-${w}`;
    }
    function c(w, C) {
      return w[C];
    }
    function d(w, C) {
      if (typeof n.rowKey == "function")
        return n.rowKey(w);
      const M = w[n.rowKey];
      return typeof M == "string" || typeof M == "number" ? M : C;
    }
    function h(w, C) {
      return d(w, C);
    }
    function p(w) {
      return n.sortKey === w && n.sortDirection != null;
    }
    function v(w) {
      a("sort", w);
    }
    function g(w) {
      return p(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const y = $(() => n.rows?.length ?? 0), b = $(() => y.value > n.maxVisibleRows), f = $(() => Math.max(0, y.value - n.maxVisibleRows)), x = $(() => n.rows?.length ? s.value || !b.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), _ = $(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(f.value))
    );
    return (w, C) => (m(), k("div", np, [
      u("div", ap, [
        u("table", sp, [
          u("thead", null, [
            u("tr", null, [
              (m(!0), k(ne, null, he(e.columns, (M) => (m(), k("th", {
                key: M.key,
                scope: "col",
                class: Q(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(M.align), M.headerClass]])
              }, [
                M.sortable ? (m(), k("button", {
                  key: 0,
                  type: "button",
                  class: Q(["kiut-table-sort-btn inline-flex items-center gap-1", l(M.align)]),
                  "aria-sort": g(M.key),
                  onClick: (S) => v(M.key)
                }, [
                  u("span", null, D(M.label), 1),
                  u("span", ip, [
                    p(M.key) ? (m(), k(ne, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), k("span", lp, "↑")) : e.sortDirection === "desc" ? (m(), k("span", rp, "↓")) : z("", !0)
                    ], 64)) : (m(), k(ne, { key: 1 }, [
                      C[1] || (C[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      C[2] || (C[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, op)) : (m(), k(ne, { key: 1 }, [
                  Be(D(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(ne, null, he(x.value, (M, S) => (m(), k("tr", {
              key: h(M, S)
            }, [
              (m(!0), k(ne, null, he(e.columns, (I) => (m(), k("td", {
                key: `${S}-${I.key}`,
                class: Q(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(I.align), I.cellClass]])
              }, [
                Se(w.$slots, r(I.key), {
                  row: M,
                  column: I,
                  value: c(M, I.key)
                }, () => [
                  Be(D(i(c(M, I.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      b.value ? (m(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: C[0] || (C[0] = (M) => s.value = !s.value)
      }, [
        Be(D(s.value ? e.viewLessLabel : _.value) + " ", 1),
        (m(), k("svg", {
          class: Q(["view-more-icon", { "view-more-icon-rotated": s.value }]),
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
      ])) : z("", !0)
    ]));
  }
}), rt = /* @__PURE__ */ ge(cp, [["__scopeId", "data-v-22a97a18"]]), dp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, up = {
  key: "error",
  class: "error-state"
}, hp = { class: "error-content" }, fp = { class: "error-description" }, gp = {
  key: "content",
  class: "card-body"
}, mp = { class: "chart-section" }, pp = { class: "chart-wrapper" }, bp = { class: "payment-success-summary" }, vp = {
  key: 0,
  class: "booking-daily-section"
}, yp = { class: "w-full min-w-0" }, xp = { class: "font-medium" }, _p = { class: "percentage-text" }, kp = { class: "badges-container" }, wp = {
  key: 0,
  class: "badges-container"
}, Cp = {
  key: 1,
  class: "percentage-text"
}, $p = { class: "badges-container" }, Sp = {
  key: 1,
  class: "empty-state"
}, Mp = /* @__PURE__ */ le({
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
    }, i = $(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (f, x) => new Date(f.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = $(
      () => i.value.map((f) => ({
        id: f.date,
        ...f
      }))
    ), c = $(() => a.data?.total_payment_success_value || []), d = $(() => {
      const f = c.value;
      return f.length === 0 ? g(0) : f.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (f) => f.payment_success_value || [], p = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce(
      (x, _) => x + (_.count || 0),
      0
    ), v = (f) => Pe(f), g = (f) => f == null ? "0" : Rt(f);
    $(() => (a.data?.total_payment_success_value || []).reduce(
      (f, x) => f + (x.total_value || 0),
      0
    ));
    const y = $(() => {
      const f = a.data, x = f.total_booking_initiated || 0, _ = f.total_booking_started || 0, w = f.total_payment_initiated || 0, C = f.total_not_found || 0, M = f.total_cancelled || 0, S = f.total_no_pending_balance || 0, I = f.total_errors || 0, V = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce(
        (se, oe) => se + (oe.count || 0),
        0
      ), E = f.total_payment_failed || 0, A = Math.max(0, x - _), L = Math.max(
        0,
        _ - w - C - M - S - I
      ), O = (se, oe) => be(se, oe), X = [
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
      ], G = [];
      return _ > 0 && G.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: O(_, x)
      }), A > 0 && G.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: O(A, x)
      }), w > 0 && G.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: O(w, _)
      }), C > 0 && G.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: O(C, _)
      }), M > 0 && G.push({
        source: "Started",
        target: "Cancelled",
        value: M,
        label: O(M, _)
      }), S > 0 && G.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: O(S, _)
      }), I > 0 && G.push({
        source: "Started",
        target: "Errors",
        value: I,
        label: O(I, _)
      }), L > 0 && G.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: O(L, _)
      }), V > 0 && G.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: O(V, w)
      }), E > 0 && G.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: E,
        label: O(E, w)
      }), { nodes: X, links: G };
    }), b = (f, x) => dn(f, x);
    return (f, x) => (m(), J(ke, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading && !a.error ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", dp, [...x[0] || (x[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (m(), k("div", up, [
              u("div", hp, [
                x[1] || (x[1] = u("div", { class: "error-icon-wrapper" }, [
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
                x[2] || (x[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", fp, D(a.error), 1)
              ])
            ])) : (m(), k("div", gp, [
              u("section", mp, [
                u("div", pp, [
                  F(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", bp, [
                F(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (m(), k("section", vp, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", yp, [
                  F(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", xp, D(T(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": B(({ row: _ }) => [
                      u("span", null, [
                        Be(D(T(ie)(Number(_.booking_started_count))) + " ", 1),
                        u("span", _p, " (" + D(b(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": B(({ row: _ }) => [
                      u("div", kp, [
                        F(qe, { color: "success" }, {
                          default: B(() => [
                            Be(" Success: " + D(T(ie)(
                              p(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Failed: " + D(T(ie)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": B(({ row: _ }) => [
                      h(_).length > 0 ? (m(), k("div", wp, [
                        (m(!0), k(ne, null, he(h(
                          _
                        ), (w) => (m(), k("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(v(w.total_value)), 1))), 128))
                      ])) : (m(), k("span", Cp, "N/A"))
                    ]),
                    "cell-outcomes": B(({ row: _ }) => [
                      u("div", $p, [
                        F(qe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Not Found: " + D(_.not_found_count ? T(ie)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "warning" }, {
                          default: B(() => [
                            Be(" Cancelled: " + D(_.cancelled_count ? T(ie)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "orange" }, {
                          default: B(() => [
                            Be(" No Balance: " + D(_.no_pending_balance_count ? T(ie)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        F(qe, { color: "danger" }, {
                          default: B(() => [
                            Be(" Errors: " + D(_.error_count ? T(ie)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", Sp, [...x[4] || (x[4] = [
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
}), Dp = /* @__PURE__ */ ge(Mp, [["__scopeId", "data-v-2a80b433"]]), Tp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ap = {
  key: "content",
  class: "card-body"
}, Bp = {
  key: 0,
  class: "chart-section"
}, Lp = { class: "chart-wrapper" }, Pp = {
  key: 1,
  class: "checkin-daily-section"
}, Ip = { class: "w-full min-w-0" }, Rp = { class: "font-medium" }, Fp = { class: "cell-success" }, Ep = { class: "cell-danger" }, Op = {
  key: 0,
  class: "reasons-list"
}, Vp = { class: "reason-name" }, zp = { class: "reason-count" }, Np = {
  key: 1,
  class: "no-reasons"
}, Hp = {
  key: 2,
  class: "empty-state"
}, Wp = {
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
    }, l = ae([]), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = $(
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
    ), d = $(() => {
      const f = s.data;
      return f && (Array.isArray(f.checkin_by_day) && f.checkin_by_day.length > 0 || (f.total_checkin_initiated ?? 0) > 0) ? { ...o, ...f } : s.checkinData ?? o;
    }), h = $(() => {
      const f = s.data;
      return f && (Array.isArray(f.failed_by_step_by_day) && f.failed_by_step_by_day.length > 0 || Array.isArray(f.unrecovered_by_step) && f.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: f.total_checkin_failed ?? 0,
        total_checkin_unrecovered: f.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: f.failed_by_step_by_day ?? [],
        unrecovered_by_step: f.unrecovered_by_step ?? [],
        unrecovered_by_day: f.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), p = (f, x) => !x || x === 0 ? "0.0%" : dn(f, x), v = (f, x) => {
      const _ = ie(f), w = p(f, x);
      return `${_} (${w})`;
    }, g = (f) => f.reduce((x, _) => x + _.failed_count, 0), y = $(() => {
      const f = [], x = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: f, links: x };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const _ = d.value.total_checkin_initiated, w = d.value.total_checkin_init, C = d.value.total_checkin_init_abandoned, M = w - C, S = d.value.total_checkin_started, I = d.value.total_checkin_completed, V = d.value.total_checkin_closed, E = h.value.unrecovered_by_step || [], A = E.reduce(
        (G, se) => G + se.count,
        0
      );
      w > 0 && x.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: w,
        label: be(w, _)
      });
      const L = _ - w;
      L > 0 && (f.push({ name: "Abandoned (Init)", status: "abandon" }), x.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: L,
        label: be(L, _)
      })), C > 0 && (f.push({ name: "Abandoned (Started)", status: "abandon" }), x.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: C,
        label: be(C, _)
      })), M > 0 && x.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: M,
        label: be(M, _)
      }), S > 0 && x.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: S,
        label: be(S, _)
      }), I > 0 && x.push({
        source: "Number of Passengers",
        target: "Completed",
        value: I,
        label: be(I, S)
      }), E.length > 0 && A > 0 && (f.push({ name: "Unrecovered", status: "error" }), x.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: A,
        label: be(A, S)
      }), E.forEach((G) => {
        const oe = G.step_name.replace(/_/g, " ").split(" ").map((me) => me.charAt(0).toUpperCase() + me.slice(1)).join(" ");
        f.push({ name: oe, status: "error" }), x.push({
          source: "Unrecovered",
          target: oe,
          value: G.count,
          label: be(G.count, S)
        });
      }));
      const O = S - (I + A);
      O > 0 && (f.push({ name: "Abandoned (Flow)", status: "abandon" }), x.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: O,
        label: be(O, S)
      }));
      const X = I - V;
      return X > 0 && (f.push({ name: "BP Error", status: "error" }), x.push({
        source: "Completed",
        target: "BP Error",
        value: X,
        label: be(X, S)
      })), V > 0 && x.push({
        source: "Completed",
        target: "Closed with BP",
        value: V,
        label: be(V, S)
      }), { nodes: f, links: x };
    }), b = () => {
      const f = d.value.checkin_by_day || [], x = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((_) => {
        const w = x.find(
          (C) => C.date === _.date
        );
        return {
          ..._,
          failed_steps: w?.steps || []
        };
      }), l.value.sort((_, w) => new Date(_.date) - new Date(w.date));
    };
    return Oe(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (f, x) => (m(), J(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Tp, [...x[0] || (x[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Ap, [
              y.value.nodes.length > 0 ? (m(), k("section", Bp, [
                u("div", Lp, [
                  F(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (m(), k("section", Pp, [
                u("div", Ip, [
                  F(rt, {
                    columns: r,
                    rows: c.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", Rp, D(T(je)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(_.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: _ }) => [
                      u("span", null, D(v(
                        _.checkin_init_count,
                        _.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": B(({ row: _ }) => [
                      u("span", null, D(T(ie)(_.checkin_started_count)), 1)
                    ]),
                    "cell-completed": B(({ row: _ }) => [
                      u("span", null, D(v(
                        _.checkin_completed_count,
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: _ }) => [
                      u("span", Fp, D(v(
                        _.checkin_closed_count,
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: _ }) => [
                      u("span", Ep, D(v(
                        g(_.failed_steps),
                        _.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: _ }) => [
                      _.failed_steps && _.failed_steps.length > 0 ? (m(), k("div", Op, [
                        (m(!0), k(ne, null, he(_.failed_steps, (w) => (m(), k("div", {
                          key: w.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Vp, D(w.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", zp, D(w.failed_count), 1)
                        ]))), 128))
                      ])) : (m(), k("div", Np, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", Hp, [...x[1] || (x[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}, ol = /* @__PURE__ */ ge(Wp, [["__scopeId", "data-v-f12f3f34"]]), jp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Yp = {
  key: "content",
  class: "card-body"
}, Kp = {
  key: 0,
  class: "sankey-section"
}, Up = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, qp = { class: "w-full min-w-0" }, Xp = { class: "font-medium whitespace-nowrap" }, Gp = { class: "cell-success" }, Zp = { class: "cell-danger" }, Qp = {
  key: 0,
  class: "reasons-list"
}, Jp = { class: "reason-name" }, e0 = { class: "reason-count" }, t0 = {
  key: 1,
  class: "no-reasons"
}, n0 = {
  key: 2,
  class: "empty-state"
}, a0 = { class: "empty-state-content" }, s0 = { class: "empty-icon-wrapper" }, o0 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = $e(Ce(a, "theme")), l = (b) => b == null ? "0" : b.toLocaleString(), r = (b) => {
      const [f, x, _] = b.split("-").map(Number);
      return je([f, x - 1, _]).format("MMM DD");
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), d = (b, f) => dn(b, f), h = (b, f) => {
      const x = b || 0, _ = f || 0, w = l(x), C = d(x, _);
      return `${w} (${C})`;
    }, p = $(() => {
      const b = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return b.map((w) => {
        const C = f.find((S) => S.date === w.date), M = x.find(
          (S) => S.date === w.date
        );
        return {
          ...w,
          failed_steps: C?.steps || [],
          unrecovered_count: M?.unrecovered_count || 0
        };
      }).sort(
        (w, C) => new Date(w.date).getTime() - new Date(C.date).getTime()
      );
    }), v = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = $(
      () => p.value.map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated: b.checkin_initiated,
        record_locator_init_count: b.record_locator_init_count,
        record_locator_started_count: b.record_locator_started_count,
        record_locator_completed_count: b.record_locator_completed_count,
        record_locator_closed_count: b.record_locator_closed_count,
        unrecovered_count: b.unrecovered_count,
        failed_steps: b.failed_steps
      }))
    ), y = $(() => {
      const b = [], f = [], x = /* @__PURE__ */ new Set(), _ = (Me) => {
        x.has(Me) || (b.push({ name: Me }), x.add(Me));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: b, links: f };
      _("Checkin Init"), _("Booking Retrieval"), _("Booking Retrieved"), _("Completed"), _("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, C = a.checkinData.total_record_locator_init || 0, M = a.checkinData.total_record_locator_init_abandoned || 0, S = a.checkinData.total_checkin_pre_init_abandoned_error, I = a.checkinData.total_checkin_pre_init_abandoned_voluntary, V = S != null || I != null, E = V ? Math.max(Number(S) || 0, 0) : 0, A = V ? Math.max(Number(I) || 0, 0) : 0, L = a.checkinData.total_record_locator_init_abandoned_error, O = a.checkinData.total_record_locator_init_abandoned_voluntary, X = L != null || O != null, G = X ? Math.max(Number(L) || 0, 0) : 0, se = X ? Math.max(Number(O) || 0, 0) : 0, oe = X ? Math.max(M - G - se, 0) : M, me = C - M, ye = a.checkinData.total_record_locator_started || 0, U = a.checkinData.total_record_locator_completed || 0, H = a.checkinData.total_record_locator_closed || 0, Z = a.checkinData.total_record_locator_unrecovered || 0;
      C > 0 && f.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: C,
        label: be(C, w)
      });
      const te = w - C;
      V ? (A > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: A,
        label: be(A, w)
      })), E > 0 && (_("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: E,
        label: be(E, w)
      }))) : te > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: te,
        label: be(te, w)
      })), X ? (G > 0 && (_("Error"), f.push({
        source: "Booking Retrieval",
        target: "Error",
        value: G,
        label: be(G, w)
      })), se > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: se,
        label: be(se, w)
      })), oe > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: oe,
        label: be(oe, w)
      }))) : M > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: M,
        label: be(M, w)
      })), me > 0 && f.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: me,
        label: be(me, w)
      }), U > 0 && f.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: U,
        label: be(U, ye)
      }), Z > 0 && (_("Errors"), f.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: Z,
        label: be(Z, ye)
      }));
      const fe = ye - (U + Z);
      fe > 0 && (_("Abandoned (Flow)"), f.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: fe,
        label: be(fe, ye)
      }));
      const we = U - H;
      return we > 0 && (_("BP Error"), f.push({
        source: "Completed",
        target: "BP Error",
        value: we,
        label: be(we, ye)
      })), H > 0 && f.push({
        source: "Completed",
        target: "Closed with BP",
        value: H,
        label: be(H, ye)
      }), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (m(), J(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", jp, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Yp, [
              y.value.nodes.length > 0 ? (m(), k("div", Kp, [
                F(qt, {
                  data: y.value,
                  height: "500px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])
              ])) : z("", !0),
              p.value && p.value.length > 0 ? (m(), k("div", Up, [
                u("div", qp, [
                  F(rt, {
                    columns: v,
                    rows: g.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", Xp, D(r(String(x.date))), 1)
                    ]),
                    "cell-checkinInit": B(({ row: x }) => [
                      u("span", null, D(l(x.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_init_count,
                        x.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_started_count,
                        x.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: x }) => [
                      u("span", null, D(h(
                        x.record_locator_completed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: x }) => [
                      u("span", Gp, D(h(
                        x.record_locator_closed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: x }) => [
                      u("span", Zp, D(h(
                        x.unrecovered_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: x }) => [
                      Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (m(), k("div", Qp, [
                        (m(!0), k(ne, null, he(x.failed_steps, (_) => (m(), k("div", {
                          key: _.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Jp, D(c(_.step_name)) + ":", 1),
                          u("span", e0, D(_.failed_count), 1)
                        ]))), 128))
                      ])) : (m(), k("div", t0, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("div", n0, [
                u("div", a0, [
                  u("div", s0, [
                    F(T(nt), { class: "empty-icon" })
                  ]),
                  f[1] || (f[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
                  f[2] || (f[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), i0 = /* @__PURE__ */ ge(o0, [["__scopeId", "data-v-b86b263c"]]), l0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, r0 = {
  key: "content",
  class: "card-body"
}, c0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, d0 = { class: "w-full min-w-0" }, u0 = { class: "segment-plain" }, h0 = { class: "segment-plain" }, f0 = { class: "segment-plain" }, g0 = { class: "percentage-value" }, m0 = { class: "percentage-value" }, p0 = { class: "percentage-value success" }, b0 = {
  key: 1,
  class: "empty-state"
}, v0 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (p) => {
      s("export", p);
    }, { isDark: i } = $e(Ce(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = $(
      () => a.data.map((p, v) => ({
        id: `segment-${v}-${p.departure_airport}-${p.arrival_airport}-${p.segment_init_count}-${p.segment_started_count}`,
        departure_airport: p.departure_airport,
        conexion_airport: p.conexion_airport,
        arrival_airport: p.arrival_airport,
        segment_init_count: p.segment_init_count,
        segment_started_count: p.segment_started_count,
        segment_completed_count: p.segment_completed_count,
        segment_closed_count: p.segment_closed_count
      }))
    ), c = (p, v) => !v || v === 0 || !p ? "0%" : `${Math.round(p / v * 100)}%`, d = (p) => !p || p === "None" ? "-" : String(p).trim().replace(/_[0-9]+$/i, ""), h = (p) => {
      const v = d(p?.departure_airport), g = d(p?.arrival_airport);
      return v === "-" || g === "-" ? !1 : v === g;
    };
    return t({ isDark: i }), (p, v) => (m(), J(ke, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", l0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", r0, [
              a.data.length > 0 ? (m(), k("section", c0, [
                u("div", d0, [
                  F(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": B(({ row: g }) => [
                      u("span", u0, D(d(g.departure_airport)), 1)
                    ]),
                    "cell-connection": B(({ row: g }) => [
                      u("span", {
                        class: Q(["segment-plain", {
                          "segment-plain--muted": d(g.conexion_airport) === "-"
                        }])
                      }, D(d(g.conexion_airport)), 3)
                    ]),
                    "cell-arrival": B(({ row: g }) => [
                      u("span", h0, D(d(g.arrival_airport)), 1)
                    ]),
                    "cell-trip": B(({ row: g }) => [
                      u("span", f0, D(h(g) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": B(({ row: g }) => [
                      Be(D(T(ie)(g.segment_init_count)), 1)
                    ]),
                    "cell-started": B(({ row: g }) => [
                      u("span", g0, D(c(
                        g.segment_started_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: g }) => [
                      u("span", m0, D(c(
                        g.segment_completed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: g }) => [
                      u("span", p0, D(c(
                        g.segment_closed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", b0, [...v[1] || (v[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["collapsible", "default-open", "loading"]));
  }
}), il = /* @__PURE__ */ ge(v0, [["__scopeId", "data-v-522b5823"]]), y0 = { class: "checkin-container__body" }, x0 = /* @__PURE__ */ le({
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
    segmentsData: {}
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = $(() => n.loading || n.checkinLoading), o = $(() => n.loading || n.segmentsLoading);
    function i(c, d) {
      a("export", { source: c, format: d });
    }
    function l(c) {
      return typeof c == "object" && c !== null && "source" in c;
    }
    function r(c) {
      if (l(c)) {
        a("export", c);
        return;
      }
      i("checkinSegments", c);
    }
    return (c, d) => (m(), J(ke, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", y0, [
          e.showCheckin ? (m(), J(ol, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : z("", !0),
          F(il, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
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
}), _0 = /* @__PURE__ */ ge(x0, [["__scopeId", "data-v-2a3c9d34"]]), k0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, w0 = {
  key: "content",
  class: "card-body"
}, C0 = { class: "chart-section" }, $0 = { class: "chart-wrapper" }, S0 = {
  key: 1,
  class: "empty-chart"
}, M0 = { class: "payment-success-summary" }, D0 = {
  key: 0,
  class: "disruption-daily-section"
}, T0 = { class: "w-full min-w-0" }, A0 = { class: "font-medium text-center" }, B0 = { class: "text-center" }, L0 = { class: "text-center" }, P0 = { class: "percentage-text" }, I0 = { class: "text-center" }, R0 = { class: "abandoned-value" }, F0 = { class: "badges-container badges-wrap" }, E0 = { class: "badges-container badges-wrap" }, O0 = {
  key: 1,
  class: "empty-state"
}, V0 = /* @__PURE__ */ le({
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
    function n(b) {
      return b;
    }
    const a = e, s = t, o = (b) => {
      s("export", b);
    }, i = $(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (b, f) => new Date(b.date).getTime() - new Date(f.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = $(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = $(() => a.data?.total_payment_success || []), d = $(() => {
      const b = c.value;
      return b.length === 0 ? p(0) : b.map((f) => `${f.currency} ${p(f.total_value)}`).join(" · ");
    }), h = (b, f) => dn(b, f), p = (b) => Pe(b), v = (b) => (b ?? []).reduce((f, x) => f + (x.count ?? 0), 0), g = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : v(b.payment_success_total), y = $(() => {
      const b = a.data, f = b.total_disruption_conversations || 0, x = b.total_disruption_initiated || 0, _ = b.total_voluntary || 0, w = b.total_involuntary || 0, C = b.total_accepted || 0, M = b.total_confirmed || 0, S = typeof b.total_sell_success == "number" ? b.total_sell_success : v(b.total_payment_success), I = b.total_sell_failed || 0, V = Math.max(0, f - x), E = Math.max(
        0,
        x - _ - w
      ), A = Math.max(0, w - C), L = Math.max(0, _ - M), O = I, X = Math.max(0, M - S - O), G = (me, ye) => be(me, ye), se = [
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
      ], oe = [];
      return x > 0 && oe.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: G(x, f)
      }), V > 0 && oe.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: G(V, f)
      }), _ > 0 && oe.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: G(_, f)
      }), w > 0 && oe.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: G(w, f)
      }), E > 0 && oe.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: E,
        label: G(E, f)
      }), C > 0 && oe.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: G(C, f)
      }), A > 0 && oe.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: A,
        label: G(A, f)
      }), M > 0 && oe.push({
        source: "Voluntary",
        target: "Confirmed",
        value: M,
        label: G(M, f)
      }), L > 0 && oe.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: G(L, f)
      }), S > 0 && oe.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: G(S, f)
      }), O > 0 && oe.push({
        source: "Confirmed",
        target: "Rejected",
        value: O,
        label: G(O, f)
      }), X > 0 && oe.push({
        source: "Confirmed",
        target: "Not Paid",
        value: X,
        label: G(X, f)
      }), { nodes: se, links: oe };
    });
    return (b, f) => (m(), J(ke, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", k0, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", w0, [
              u("section", C0, [
                u("div", $0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (m(), J(qt, {
                    key: 0,
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])) : (m(), k("div", S0, [...f[1] || (f[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", M0, [
                F(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (m(), k("section", D0, [
                f[2] || (f[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", T0, [
                  F(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", A0, D(T(je)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: x }) => [
                      u("span", B0, D(T(ie)(Number(x.disruption_conversations))), 1)
                    ]),
                    "cell-started": B(({ row: x }) => [
                      u("span", L0, [
                        Be(D(T(ie)(Number(x.disruption_initiated_count))) + " ", 1),
                        u("span", P0, " (" + D(h(
                          Number(x.disruption_initiated_count),
                          Number(x.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": B(({ row: x }) => [
                      u("span", I0, [
                        u("span", R0, D(T(ie)(
                          Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                        )) + " (" + D(h(
                          Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                          Number(x.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": B(({ row: x }) => [
                      u("div", F0, [
                        (m(!0), k(ne, null, he([x], (_, w) => (m(), k(ne, { key: w }, [
                          F(qe, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" VOL " + D(T(ie)(_.voluntary_count)) + " (" + D(h(
                                _.voluntary_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "success" }, {
                            default: B(() => [
                              Be(" Confirm " + D(T(ie)(_.confirmed_count)) + " (" + D(h(
                                _.confirmed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "warning" }, {
                            default: B(() => [
                              Be(" Not Confirm " + D(T(ie)(_.voluntary_count - _.confirmed_count)) + " (" + D(h(
                                _.voluntary_count - _.confirmed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Reject " + D(T(ie)(_.sell_failed_count)) + " (" + D(h(
                                _.sell_failed_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "orange" }, {
                            default: B(() => [
                              Be(" Not Paid " + D(T(ie)(
                                Math.max(
                                  0,
                                  _.confirmed_count - g(_) - _.sell_failed_count
                                )
                              )) + " (" + D(h(
                                Math.max(
                                  0,
                                  _.confirmed_count - g(_) - _.sell_failed_count
                                ),
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: B(() => [
                              Be(" Finish " + D(T(ie)(g(_))) + " (" + D(h(
                                g(_),
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (m(!0), k(ne, null, he(_.payment_success_total || [], (C) => (m(), J(qe, {
                            key: `${_.date}-${C.currency}`,
                            color: "neutral"
                          }, {
                            default: B(() => [
                              Be(D(C.currency) + " " + D(p(C.total_value)), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ], 64))), 128))
                      ])
                    ]),
                    "cell-involuntary": B(({ row: x }) => [
                      u("div", E0, [
                        (m(!0), k(ne, null, he([x], (_, w) => (m(), k(ne, { key: w }, [
                          F(qe, { color: "purple" }, {
                            default: B(() => [
                              Be(" INV " + D(T(ie)(_.involuntary_count)) + " (" + D(h(
                                _.involuntary_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "danger" }, {
                            default: B(() => [
                              Be(" Human " + D(T(ie)(_.involuntary_count - _.accepted_count)) + " (" + D(h(
                                _.involuntary_count - _.accepted_count,
                                _.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          F(qe, { color: "success" }, {
                            default: B(() => [
                              Be(" Accept " + D(T(ie)(_.accepted_count)) + " (" + D(h(
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
              ])) : (m(), k("section", O0, [...f[3] || (f[3] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), z0 = /* @__PURE__ */ ge(V0, [["__scopeId", "data-v-a60fbfa7"]]), N0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, H0 = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, W0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, j0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Y0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, K0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, U0 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, i = Ce(a, "theme"), { isDark: l } = $e(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = ae({
      labels: [],
      datasets: []
    }), d = $(
      () => a.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = $(() => {
      const v = d.value, g = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", b = v.total_faq_events, f = b > 0 ? `${(v.total_documents_found / b * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${ie(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${ie(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${ie(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ie(v.total_documents_found),
          subvalue: f
        }
      ];
    }), p = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = v.faq_by_day || [];
      if (g.length > 0) {
        const y = g.map(
          (_) => je(_.date).format("MMM DD")
        ), b = g.map(
          (_) => _.airline_information_retrieved_count || 0
        ), f = g.map(
          (_) => _.flight_status_retrieved_count || 0
        ), x = g.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: b,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: f,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: x,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Oe(
      () => a.data,
      (v) => {
        p(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, g) => (m(), J(ke, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (m(), k("div", N0, [...g[0] || (g[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", H0, [
                c.value.labels && c.value.labels.length ? (m(), k("section", W0, [
                  u("div", j0, [
                    F(yt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", Y0, [
                    (m(!0), k(ne, null, he(h.value, (y) => (m(), J(ve, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (m(), k("section", K0, [...g[1] || (g[1] = [
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
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), q0 = /* @__PURE__ */ ge(U0, [["__scopeId", "data-v-5d7a0066"]]), X0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, G0 = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Z0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Q0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, J0 = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, eb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, tb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, nb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ab = { class: "max-w-[360px] px-4 text-center" }, sb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ob = /* @__PURE__ */ le({
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
    }, l = Ce(s, "theme"), { isDark: r } = $e(l), c = $(() => {
      const p = s.data?.agents_by_day || {}, v = Object.keys(p).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const f of Object.values(p))
        for (const x of Object.keys(f))
          g.add(x);
      const b = Array.from(g).map((f) => {
        const x = f.toLowerCase(), _ = a[x] || a[f] || "#94a3b8";
        return {
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          data: v.map((w) => p[w]?.[f] || 0),
          borderColor: _
        };
      });
      return {
        labels: v.map((f) => je(f).format("MMM DD")),
        datasets: b
      };
    }), d = $(() => {
      const p = s.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(p))
        for (const [b, f] of Object.entries(y))
          v[b] = (v[b] || 0) + f;
      const g = Object.values(v).reduce((y, b) => y + b, 0);
      return g === 0 ? [] : Object.entries(v).sort(([, y], [, b]) => b - y).map(([y, b]) => {
        const f = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: b,
          percentage: (b / g * 100).toFixed(1),
          color: a[f] || a[y] || "#94a3b8"
        };
      });
    }), h = $(() => d.value.slice(0, 4));
    return t({ isDark: r }), (p, v) => (m(), J(ke, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", s.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              s.loading ? (m(), k("div", X0, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", G0, [
                c.value.labels && c.value.labels.length ? (m(), k("section", Z0, [
                  u("div", Q0, [
                    F(yt, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (m(), k("div", J0, [
                    (m(!0), k(ne, null, he(h.value, (g) => (m(), J(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(ie)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])) : z("", !0)
                ])) : d.value.length ? (m(), k("section", eb, [
                  u("div", tb, [
                    (m(!0), k(ne, null, he(h.value, (g) => (m(), J(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(ie)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : z("", !0),
                d.value.length ? z("", !0) : (m(), k("section", nb, [
                  u("div", ab, [
                    u("div", sb, [
                      F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    v[1] || (v[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                    v[2] || (v[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
                  ])
                ]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ib = /* @__PURE__ */ ge(ob, [["__scopeId", "data-v-299d9c3f"]]), lb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, rb = {
  key: "content",
  class: "card-body"
}, cb = {
  key: 0,
  class: "chart-section"
}, db = { class: "chart-wrapper" }, ub = {
  key: 1,
  class: "record-locator-daily-section"
}, hb = { class: "w-full min-w-0" }, fb = { class: "cell-plain font-medium" }, gb = { class: "cell-plain text-center" }, mb = { class: "cell-plain text-center" }, pb = { class: "cell-plain text-center" }, bb = { class: "cell-plain text-center" }, vb = { class: "cell-plain text-center success-value" }, yb = { class: "cell-plain text-center failed-value" }, xb = { class: "cell-plain text-center warning-value" }, _b = { class: "cell-plain text-center" }, kb = { class: "cell-plain text-center failed-value" }, wb = {
  key: 2,
  class: "empty-state"
}, Cb = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = $e(Ce(a, "theme")), l = $(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (b, f) => new Date(b.date).getTime() - new Date(f.date).getTime()
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
    ], d = $(
      () => a.isAvianca ? [...r, ...c] : r
    ), h = $(
      () => l.value.map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated: b.checkin_initiated,
        record_locator_init_count: b.record_locator_init_count,
        record_locator_started_count: b.record_locator_started_count,
        record_locator_completed_count: b.record_locator_completed_count,
        record_locator_closed_count: b.record_locator_closed_count,
        record_locator_failed_count: b.record_locator_failed_count,
        record_locator_abandoned_count: b.record_locator_abandoned_count,
        record_locator_create_payment_count: b.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: b.record_locator_create_payment_failed_count
      }))
    ), p = $(() => a.data), v = (b, f) => dn(b, f), g = (b, f) => {
      const x = ie(b), _ = v(b, f);
      return `${x} (${_})`;
    }, y = $(() => {
      const b = [], f = [], x = /* @__PURE__ */ new Set(), _ = (te) => {
        x.has(te) || (b.push({ name: te }), x.add(te));
      };
      if (!p.value.total_checkin_initiated)
        return { nodes: b, links: f };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = p.value.total_checkin_initiated, C = p.value.total_record_locator_init, M = p.value.total_record_locator_started, S = p.value.total_record_locator_completed, I = p.value.total_record_locator_closed, V = p.value.total_record_locator_failed, E = p.value.total_record_locator_abandoned, A = p.value.total_record_locator_init_abandoned, L = p.value.total_checkin_pre_init_abandoned_error, O = p.value.total_checkin_pre_init_abandoned_voluntary, X = L != null || O != null, G = X ? Math.max(Number(L) || 0, 0) : 0, se = X ? Math.max(Number(O) || 0, 0) : 0, oe = p.value.total_record_locator_init_abandoned_error, me = p.value.total_record_locator_init_abandoned_voluntary, ye = oe != null || me != null, U = ye ? Math.max(Number(oe) || 0, 0) : 0, H = ye ? Math.max(Number(me) || 0, 0) : 0;
      C > 0 && f.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: C,
        label: be(C, w)
      });
      const Z = w - C;
      return X ? (se > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: se,
        label: be(se, w)
      })), G > 0 && (_("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: G,
        label: be(G, w)
      }))) : Z > 0 && (_("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Z,
        label: be(Z, w)
      })), M > 0 && f.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: M,
        label: be(M, w)
      }), ye ? (U > 0 && (_("Error"), f.push({
        source: "Booking retrive",
        target: "Error",
        value: U,
        label: be(U, w)
      })), H > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: H,
        label: be(H, w)
      }))) : A > 0 && (_("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: A,
        label: be(A, w)
      })), S > 0 && f.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: be(S, M)
      }), I > 0 && f.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: I,
        label: be(I, M)
      }), V > 0 && (_("Checkin Failed"), f.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: be(V, M)
      })), E > 0 && (_("Abandoned (Flow)"), f.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: E,
        label: be(E, M)
      })), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (m(), J(ke, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            a.loading ? (m(), k("div", lb, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", rb, [
              y.value.nodes.length > 0 ? (m(), k("section", cb, [
                u("div", db, [
                  F(qt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (m(), k("section", ub, [
                u("div", hb, [
                  F(rt, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: x }) => [
                      u("span", fb, D(T(je)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: x }) => [
                      u("span", gb, D(T(ie)(x.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: x }) => [
                      u("span", mb, D(g(
                        x.record_locator_init_count,
                        x.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": B(({ row: x }) => [
                      u("span", pb, D(T(ie)(x.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": B(({ row: x }) => [
                      u("span", bb, D(g(
                        x.record_locator_completed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": B(({ row: x }) => [
                      u("span", vb, D(g(
                        x.record_locator_closed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": B(({ row: x }) => [
                      u("span", yb, D(g(
                        x.record_locator_failed_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": B(({ row: x }) => [
                      u("span", xb, D(g(
                        x.record_locator_abandoned_count,
                        x.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": B(({ row: x }) => [
                      u("span", _b, D(T(ie)(
                        x.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": B(({ row: x }) => [
                      u("span", kb, D(T(ie)(
                        x.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (m(), k("section", wb, [...f[1] || (f[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["collapsible", "loading"]));
  }
}), $b = /* @__PURE__ */ ge(Cb, [["__scopeId", "data-v-00877097"]]), Sb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Mb = {
  key: "content",
  class: "card-body"
}, Db = {
  key: 0,
  class: "chart-section"
}, Tb = {
  key: 1,
  class: "empty-state"
}, Ab = {
  key: 2,
  class: "comparison-section"
}, Bb = { class: "comparison-grid" }, Lb = /* @__PURE__ */ le({
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
    }, s = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], o = e, i = n, l = (g) => {
      i("export", g);
    }, { isDark: r } = $e(Ce(o, "theme"));
    $(() => o.data?.total_sell_success ?? 0);
    const c = $(() => {
      const g = /* @__PURE__ */ new Set();
      for (const y of o.data?.sales_by_channel_by_day ?? [])
        for (const b of Object.keys(y.channels))
          g.add(b);
      return Array.from(g).sort();
    }), d = (g, y) => a[g.toLowerCase()] ?? s[y % s.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function p(g) {
      if (g.delta === null) return "No previous data";
      const y = ie(g.previous), b = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${y})` : `${g.delta > 0 ? "↑" : "↓"} ${b} vs prev. period (${y})`;
    }
    const v = $(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const y = g.map((f) => je(f.date).format("MMM-DD")), b = c.value.map((f, x) => ({
        label: f,
        data: g.map((_) => _.channels[f] ?? 0),
        backgroundColor: d(f, x),
        borderRadius: 4
      }));
      return { labels: y, datasets: b };
    });
    return t({ isDark: r }), (g, y) => (m(), J(ke, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (m(), k("div", Sb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Mb, [
              v.value.labels.length > 0 ? (m(), k("section", Db, [
                F($t, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (m(), k("section", Tb, [...y[1] || (y[1] = [
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
              e.channelComparison.length > 0 ? (m(), k("section", Ab, [
                u("div", Bb, [
                  (m(!0), k(ne, null, he(e.channelComparison, (b, f) => (m(), J(T(ve), {
                    key: b.channel,
                    color: d(b.channel, f),
                    title: h(b.channel),
                    value: T(ie)(b.current),
                    subvalue: p(b)
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), ll = /* @__PURE__ */ ge(Lb, [["__scopeId", "data-v-b99f46a5"]]), Pb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ib = {
  key: "content",
  class: "card-body"
}, Rb = {
  key: 0,
  class: "chart-section"
}, Fb = { class: "chart-wrapper" }, Eb = {
  key: 1,
  class: "empty-state"
}, Ob = { class: "seller-value-cards" }, Vb = {
  key: 2,
  class: "seller-daily-section"
}, zb = { class: "w-full min-w-0" }, Nb = { class: "sl-cell font-medium" }, Hb = { class: "sl-cell text-center" }, Wb = { class: "sl-cell text-center" }, jb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center" }, Kb = { class: "sl-cell text-center" }, Ub = { class: "sl-cell text-center success-value" }, qb = {
  key: 0,
  class: "currency-cell-list"
}, Xb = {
  key: 1,
  class: "empty-cell"
}, Gb = { class: "sl-cell text-center success-value" }, Zb = { class: "sl-cell text-center" }, Qb = { class: "sl-cell text-center success-value" }, Jb = {
  key: 0,
  class: "currency-cell-list"
}, ev = {
  key: 1,
  class: "empty-cell"
}, tv = { class: "sl-cell text-center success-value" }, nv = { class: "sl-cell text-center" }, av = { class: "sl-cell text-center success-value" }, sv = {
  key: 0,
  class: "currency-cell-list"
}, ov = { key: 1 }, iv = {
  key: 0,
  class: "failed-reasons"
}, lv = { class: "reason-name" }, rv = { class: "reason-count" }, cv = {
  key: 1,
  class: "empty-cell"
}, dv = /* @__PURE__ */ le({
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
    function a(A) {
      return A;
    }
    const s = e, o = n, i = (A) => {
      o("export", A);
    }, { isDark: l } = $e(Ce(s, "theme")), r = $(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const A = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((L) => {
        const O = A.findIndex(
          (X) => X.date === L.date
        );
        O !== -1 ? A[O] = { ...A[O], reasons: L.reasons } : A.push({
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
      }), A.sort(
        (L, O) => new Date(L.date).getTime() - new Date(O.date).getTime()
      );
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
    ], d = $(
      () => r.value.map((A) => ({
        id: A.date,
        ...A
      }))
    ), h = $(() => s.sellerData), p = $(() => s.failedData), v = $(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), g = $(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), y = $(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = $(() => {
      const A = v.value;
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Rt(L.total_value)}`
      ).join(" · ") : E(s.sellerData.total_value_sell_success);
    });
    function f(A) {
      return A.length > 0 ? A.map(
        (L) => `${L.currency} ${Rt(L.total_value)}`
      ).join(" · ") : "—";
    }
    const x = $(
      () => f(g.value)
    ), _ = $(
      () => f(y.value)
    ), w = (A) => A.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), C = (A) => `Failed:
${w(A)}`, M = $(() => {
      const {
        total_seller_conversations: A = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: O = 0,
        total_sell_success: X = 0,
        total_sell_bank_transfer: G = 0,
        total_sell_cash_option: se = 0,
        total_sell_success_bank_transfer: oe = 0,
        total_sell_success_cash: me = 0
      } = h.value, { failed_by_reason_by_day: ye = [] } = p.value;
      if (A === 0) return { nodes: [], links: [] };
      const U = Math.max(
        0,
        X - (oe ?? 0) - (me ?? 0)
      ), H = [
        { name: "Sell Initiated", value: A, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: O, status: "success" },
        { name: "Sell Success", value: U, status: "success" }
      ], Z = [], te = A - L;
      te > 0 && (H.push({
        name: "Abandoned (Init)",
        value: te,
        status: "abandon"
      }), Z.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: te,
        label: be(te, A)
      })), L > 0 && Z.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: be(L, A)
      });
      const fe = ye.reduce(
        (R, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((j) => {
          const de = j.reason, K = j.failed_count;
          R[de] = (R[de] || 0) + K;
        }), R),
        {}
      );
      O > 0 && Z.push({
        source: "Sell Started",
        target: "Booking Created",
        value: O,
        label: be(O, A)
      }), G > 0 && (H.push({ name: "Bank Transfer", value: G, status: "success" }), Z.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: G,
        label: be(G, A)
      })), se > 0 && (H.push({ name: "Cash Option", value: se, status: "success" }), Z.push({
        source: "Booking Created",
        target: "Cash Option",
        value: se,
        label: be(se, A)
      })), U > 0 && Z.push({
        source: "Booking Created",
        target: "Sell Success",
        value: U,
        label: be(U, A)
      }), (oe ?? 0) > 0 && (H.push({
        name: "Bank Transfer Success",
        value: oe ?? 0,
        status: "success"
      }), Z.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: oe ?? 0,
        label: be(oe ?? 0, A)
      })), (me ?? 0) > 0 && (H.push({
        name: "Cash Option Success",
        value: me ?? 0,
        status: "success"
      }), Z.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: me ?? 0,
        label: be(me ?? 0, A)
      }));
      const we = O - U - G - se;
      we > 0 && (H.push({
        name: "Failed at Completion",
        value: we,
        status: "error"
      }), Z.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: we,
        label: be(we, A)
      }));
      const Me = L - O;
      if (Me > 0 && (H.push({
        name: "Failed at Booking",
        value: Me,
        status: "error"
      }), Z.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: Me,
        label: be(Me, A)
      })), Object.keys(fe).length > 0) {
        const R = Object.values(fe).reduce(
          (j, de) => j + de,
          0
        ), N = Me - R;
        Object.entries(fe).filter(([, j]) => j > 0).sort(([, j], [, de]) => de - j).forEach(([j, de]) => {
          const K = `Failed: ${j}`;
          H.push({
            name: K,
            value: de,
            status: "error",
            label: C(j)
          }), Z.push({
            source: "Failed at Booking",
            target: K,
            value: de,
            label: be(de, A)
          });
        }), N > 0 && (H.push({
          name: "Failed: Without Reason",
          value: N,
          status: "error",
          label: `Failed:
Without Reason`
        }), Z.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: N,
          label: be(N, A)
        }));
      }
      return { nodes: H, links: Z };
    }), S = (A, L) => dn(A, L), I = (A, L) => {
      const O = ie(A), X = S(A, L);
      return `${O} (${X})`;
    }, V = (A) => A == null ? 0 : typeof A == "number" ? A : Array.isArray(A) ? A.reduce((L, O) => L + (O.total_value || 0), 0) : 0, E = (A) => Rt(V(A));
    return t({ isDark: l }), (A, L) => (m(), J(ke, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (m(), k("div", Pb, [...L[0] || (L[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Ib, [
              M.value.nodes.length > 0 ? (m(), k("section", Rb, [
                u("div", Fb, [
                  F(qt, {
                    data: M.value,
                    height: "560px"
                  }, null, 8, ["data"])
                ])
              ])) : (m(), k("section", Eb, [...L[1] || (L[1] = [
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
              u("section", Ob, [
                F(ve, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: b.value
                }, null, 8, ["value"]),
                F(ve, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: x.value
                }, null, 8, ["value"]),
                F(ve, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: _.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (m(), k("section", Vb, [
                u("div", zb, [
                  F(rt, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: O }) => [
                      u("span", Nb, D(T(je)(String(O.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": B(({ row: O }) => [
                      u("span", Hb, D(T(ie)(Number(O.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": B(({ row: O }) => [
                      u("span", Wb, D(I(
                        O.sell_started_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": B(({ row: O }) => [
                      u("span", jb, D(I(
                        O.sell_get_quote_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": B(({ row: O }) => [
                      u("span", Yb, D(I(
                        O.sell_booking_created_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": B(({ row: O }) => [
                      u("span", Kb, D(T(ie)(Number(O.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": B(({ row: O }) => [
                      u("span", Ub, [
                        Array.isArray(
                          O.daily_value_sell_success_bank_transfer
                        ) && O.daily_value_sell_success_bank_transfer.length > 0 ? (m(), k("div", qb, [
                          (m(!0), k(ne, null, he(O.daily_value_sell_success_bank_transfer, (X) => (m(), k("span", {
                            key: `${O.date}-bt-success-${X.currency}`
                          }, D(X.currency) + " " + D(T(Rt)(X.total_value)), 1))), 128))
                        ])) : (m(), k("span", Xb, "-"))
                      ])
                    ]),
                    "cell-btSuccess": B(({ row: O }) => [
                      u("span", Gb, D(T(ie)(
                        Number(
                          O.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": B(({ row: O }) => [
                      u("span", Zb, D(T(ie)(Number(O.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": B(({ row: O }) => [
                      u("span", Qb, [
                        Array.isArray(
                          O.daily_value_sell_success_cash
                        ) && O.daily_value_sell_success_cash.length > 0 ? (m(), k("div", Jb, [
                          (m(!0), k(ne, null, he(O.daily_value_sell_success_cash, (X) => (m(), k("span", {
                            key: `${O.date}-co-success-${X.currency}`
                          }, D(X.currency) + " " + D(T(Rt)(X.total_value)), 1))), 128))
                        ])) : (m(), k("span", ev, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": B(({ row: O }) => [
                      u("span", tv, D(T(ie)(
                        Number(O.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": B(({ row: O }) => [
                      u("span", nv, D(I(
                        O.sell_success_count,
                        O.seller_conversations || O.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": B(({ row: O }) => [
                      u("span", av, [
                        Array.isArray(O.daily_value_sell_success) && O.daily_value_sell_success.length > 0 ? (m(), k("div", sv, [
                          (m(!0), k(ne, null, he(O.daily_value_sell_success, (X) => (m(), k("span", {
                            key: `${O.date}-${X.currency}`
                          }, D(X.currency) + " " + D(T(Rt)(X.total_value)), 1))), 128))
                        ])) : (m(), k("span", ov, D(E(
                          O.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": B(({ row: O }) => [
                      (O.reasons || []).length > 0 ? (m(), k("div", iv, [
                        (m(!0), k(ne, null, he(O.reasons || [], (X) => (m(), k("div", {
                          key: X.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", lv, D(X.reason) + ":", 1),
                          u("span", rv, D(X.failed_count), 1)
                        ]))), 128))
                      ])) : (m(), k("div", cv, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), rl = /* @__PURE__ */ ge(dv, [["__scopeId", "data-v-d2f74abd"]]), uv = { class: "seller-container__body" }, hv = /* @__PURE__ */ le({
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
    const n = e, a = t, s = $(() => n.loading || n.sellerLoading), o = $(() => n.loading || n.salesByChannelLoading), i = $(() => n.exportLoading || n.sellerExportLoading), l = $(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (m(), J(ke, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", uv, [
          F(rl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          F(ll, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: d[1] || (d[1] = (h) => r("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), fv = /* @__PURE__ */ ge(hv, [["__scopeId", "data-v-a9f0dfd2"]]), gv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, mv = {
  key: "content",
  class: "card-body"
}, pv = {
  key: 0,
  class: "chart-section"
}, bv = {
  key: 1,
  class: "empty-state"
}, vv = { class: "empty-state-content" }, yv = { class: "empty-icon-wrapper" }, xv = /* @__PURE__ */ le({
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
    }, { isDark: l, colors: r } = $e(Ce(s, "theme")), c = $(() => {
      const p = (s.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const v = p.reduce(
        (b, f) => b + (Number(f.conversations) || 0),
        0
      ), g = p.map((b) => {
        const f = b.agent_type?.toLowerCase();
        return a[f] || "#94a3b8";
      }), y = g.map((b) => `${b}80`);
      return {
        labels: p.map((b) => {
          const f = Number(b.conversations) || 0, x = v ? f / v * 100 : 0;
          return `${b.agent_type} - ${f.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((b) => b.conversations),
            backgroundColor: y,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), d = $(() => s.options ? s.options : {
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
            label: (h) => {
              const p = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (b, f) => b + (Number(f) || 0),
                0
              ), y = g ? v / g * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, p) => (m(), J(ke, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", gv, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", mv, [
              c.value.labels && c.value.labels.length ? (m(), k("section", pv, [
                F(Ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (m(), k("section", bv, [
                u("div", vv, [
                  u("div", yv, [
                    F(T(Dm), { class: "empty-icon" })
                  ]),
                  p[1] || (p[1] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                  p[2] || (p[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), _v = /* @__PURE__ */ ge(xv, [["__scopeId", "data-v-a52fe7ae"]]), kv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, wv = {
  key: "content",
  class: "card-body"
}, Cv = {
  key: 0,
  class: "payment-methods-section"
}, $v = { class: "payment-methods-grid" }, Sv = {
  key: 1,
  class: "empty-state"
}, Mv = { class: "empty-state-content" }, Dv = { class: "empty-icon-wrapper" }, Tv = {
  key: 2,
  class: "payment-method-daily-section"
}, Av = { class: "w-full min-w-0" }, Bv = { class: "font-medium" }, Lv = { class: "text-center" }, Pv = { class: "text-center success-value" }, Iv = {
  key: 0,
  class: "currency-cell-list"
}, Rv = { class: "payment-tags" }, Fv = { class: "tag-name" }, Ev = {
  key: 0,
  class: "tag-amount"
}, Ov = {
  key: 1,
  class: "tag-amount"
}, Vv = { class: "tag-count" }, zv = {
  key: 3,
  class: "empty-table-state"
}, Nv = "Not Registered", Hv = /* @__PURE__ */ le({
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
    const a = e, s = n, { isDark: o } = $e(Ce(a, "theme")), i = ae(!1), l = ae({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = $(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = $(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = $(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((S, I) => je(S.date).valueOf() - je(I.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], p = $(
      () => d.value.map((S) => ({
        id: S.date,
        date: S.date,
        total_count: S.total_count,
        total_amount: S.total_amount,
        total_amount_by_currency: S.total_amount_by_currency,
        payment_methods: S.payment_methods
      }))
    ), v = (S) => {
      if (!S)
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
      const I = (S.payment_method_breakdown || []).map(
        (E) => ({
          payment_method: E.payment_method || "Unknown",
          total_amount: E.total_amount ?? 0,
          count: E.count ?? 0,
          total_amount_by_currency: E.total_amount_by_currency ?? []
        })
      ), V = (S.payment_method_by_day || []).map((E) => ({
        date: E.date || "",
        total_count: E.total_count ?? 0,
        total_amount: E.total_amount ?? 0,
        total_amount_by_currency: E.total_amount_by_currency ?? [],
        payment_methods: (E.payment_methods || []).map((A) => ({
          payment_method: A.payment_method || "Unknown",
          total_amount: A.total_amount ?? 0,
          count: A.count ?? 0,
          total_amount_by_currency: A.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: S.airline_name || a.airlineName,
        start_date: S.start_date || "",
        end_date: S.end_date || "",
        total_conversations: S.total_conversations ?? 0,
        total_amount: S.total_amount ?? 0,
        total_sell_usd: S.total_sell_usd,
        total_amount_by_currency: S.total_amount_by_currency ?? [],
        payment_method_breakdown: I,
        payment_method_by_day: V
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [S, I] = a.dates.map(
            (E) => je(E).format("YYYY-MM-DD")
          ), V = await a.fetchFunction(
            a.airlineName,
            S,
            I
          );
          l.value = v(V);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), l.value = v(null);
        } finally {
          i.value = !1;
        }
      }
    }, y = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], b = (S) => !S || S.toLowerCase() === "unknown" ? Nv : S.replace(/_/g, " "), f = (S) => S == null ? "$0.00" : Pe(S), x = (S) => {
      const I = S.total_amount_by_currency;
      return I && I.length > 0 ? I.map((V) => `${V.currency} ${f(V.total_value)}`).join(" · ") : f(S.total_amount);
    }, _ = (S) => S ? je(S).format("MMM DD") : "-", w = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), C = (S) => {
      s("export", S);
    };
    function M() {
      const S = a.data;
      S && (Array.isArray(S.payment_method_breakdown) && S.payment_method_breakdown.length > 0 || Array.isArray(S.payment_method_by_day) && S.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(S));
    }
    return tt(() => {
      a.data ? M() : g();
    }), Oe(
      () => a.data,
      (S) => {
        S && M();
      },
      { deep: !0 }
    ), Oe(
      () => a.dates,
      (S) => {
        a.data || S && S[0] && S[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: o }), (S, I) => (m(), J(ke, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: B(() => [
        e.enableExport && !i.value ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            i.value ? (m(), k("div", kv, [...I[0] || (I[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", wv, [
              r.value ? (m(), k("section", Cv, [
                I[1] || (I[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", $v, [
                  (m(!0), k(ne, null, he(l.value.payment_method_breakdown, (V, E) => (m(), J(ve, {
                    key: V.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[E % y.length],
                    title: b(V.payment_method),
                    value: x(V),
                    subvalue: `${w(V.count)} ${w(V.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (m(), k("section", Sv, [
                u("div", Mv, [
                  u("div", Dv, [
                    F(T(Am), { class: "empty-icon" })
                  ]),
                  I[2] || (I[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  I[3] || (I[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (m(), k("section", Tv, [
                I[5] || (I[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", Av, [
                  F(rt, {
                    columns: h,
                    rows: p.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: V }) => [
                      u("span", Bv, D(_(String(V.date))), 1)
                    ]),
                    "cell-totalSales": B(({ row: V }) => [
                      u("span", Lv, D(T(ie)(V.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": B(({ row: V }) => [
                      u("span", Pv, [
                        Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (m(), k("div", Iv, [
                          (m(!0), k(ne, null, he(V.total_amount_by_currency, (E) => (m(), k("span", {
                            key: `${V.date}-${E.currency}`
                          }, D(E.currency) + " " + D(f(E.total_value)), 1))), 128))
                        ])) : (m(), k(ne, { key: 1 }, [
                          Be(D(f(Number(V.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": B(({ row: V }) => [
                      u("div", Rv, [
                        (m(!0), k(ne, null, he(Array.isArray(V.payment_methods) ? V.payment_methods : [], (E) => (m(), k("div", {
                          key: E.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", Fv, D(b(E.payment_method)), 1),
                          I[4] || (I[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !E.total_amount_by_currency || E.total_amount_by_currency.length === 0 ? (m(), k("span", Ev, D(f(E.total_amount)), 1)) : (m(), k("span", Ov, D(E.total_amount_by_currency.map(
                            (A) => `${A.currency} ${f(A.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", Vv, "(" + D(w(E.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (m(), k("div", zv, [...I[6] || (I[6] = [
                u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
              ])])) : z("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Wv = /* @__PURE__ */ ge(Hv, [["__scopeId", "data-v-0d6d2847"]]), jv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Yv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Kv = {
  key: "title-content",
  class: "header-title-group"
}, Uv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, qv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Xv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Gv = { key: "aside-content" }, Zv = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Qv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Jv = {
  key: "body-content",
  class: "highlight-inner"
}, ey = { class: "card-body" }, ty = { class: "metric-row" }, ny = {
  key: 0,
  class: "metric-prefix"
}, ay = {
  key: 0,
  class: "metric-label"
}, sy = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = $e(Ce(n, "theme")), s = $(() => n.labelPosition === "header"), o = $(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = $(() => {
      if (!o.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = $(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}%` : `${c}%`;
    }), r = $(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (m(), J(ke, {
      collapsible: !1,
      class: Q([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(a),
          "card-metric--label-header": s.value
        }
      ])
    }, {
      title: B(() => [
        F(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", jv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              s.value ? (m(), k("div", Yv)) : z("", !0)
            ])) : (m(), k("div", Kv, [
              u("div", Uv, [
                Se(c.$slots, "icon", {}, void 0, !0)
              ]),
              s.value ? (m(), k("span", qv, D(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: B(() => [
        F(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Xv)) : (m(), k("div", Gv, [
              Se(c.$slots, "headerAside", {}, () => [
                o.value ? (m(), k("div", {
                  key: 0,
                  class: Q(["change-badge", r.value])
                }, D(l.value), 3)) : z("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: B(() => [
        F(Te, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Zv, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              s.value ? z("", !0) : (m(), k("div", Qv))
            ])) : (m(), k("div", Jv, [
              u("div", ey, [
                Se(c.$slots, "value", {}, () => [
                  u("div", ty, [
                    e.prefix ? (m(), k("span", ny, D(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: Q(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                s.value ? z("", !0) : (m(), k("span", ay, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), vt = /* @__PURE__ */ ge(sy, [["__scopeId", "data-v-0bc3fac6"]]);
function cl(e, t) {
  return m(), k("svg", {
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
function Ue() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ct = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", mt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", oy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", It = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", St = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", iy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], ly = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, ry = ["placeholder", "aria-label"], cy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, dy = ["aria-selected", "onClick", "onMouseenter"], uy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, hy = { class: "min-w-0 flex-1" }, ws = /* @__PURE__ */ le({
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
    noResultsText: { default: "Sin resultados" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-select-${Ue()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ae(null), c = ae(null), d = ae(null), h = ae(null), p = ae(null), v = ae(!1), g = ae(0), y = ae(""), b = ae({});
    function f() {
      const U = c.value;
      if (!U) return;
      const H = U.getBoundingClientRect();
      b.value = {
        top: `${H.bottom - 3}px`,
        left: `${H.left}px`,
        width: `${H.width}px`
      };
    }
    const x = $(() => n.options.filter((U) => !U.disabled)), _ = $(() => {
      if (!n.searchable) return x.value;
      const U = y.value.trim().toLowerCase();
      return U ? x.value.filter((H) => H.label.toLowerCase().includes(U)) : x.value;
    }), w = $(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), C = $(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((H) => H.value === n.modelValue)?.label ?? String(n.modelValue));
    function M(U) {
      return `${String(U.value)}-${U.label}`;
    }
    function S(U) {
      return n.modelValue === U.value;
    }
    function I(U, H) {
      const Z = S(U), te = g.value === H;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        Z ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !Z && te ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function V() {
      g.value = Math.max(
        0,
        _.value.findIndex((U) => U.value === n.modelValue)
      );
    }
    function E() {
      if (n.searchable) {
        p.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function A() {
      f(), y.value = "", V(), We(() => E());
    }
    function L() {
      v.value = !1, y.value = "";
    }
    function O(U) {
      a("update:modelValue", U.value), L();
    }
    function X() {
      if (!n.disabled) {
        if (v.value) {
          L();
          return;
        }
        v.value = !0, A();
      }
    }
    function G(U) {
      U.stopPropagation(), !n.disabled && X();
    }
    function se(U) {
      if (!v.value) return;
      const H = U.target, Z = r.value, te = d.value;
      Z && !Z.contains(H) && (!te || !te.contains(H)) && L();
    }
    function oe(U) {
      n.disabled || (U.key === "ArrowDown" || U.key === "Enter" || U.key === " ") && (U.preventDefault(), v.value || (v.value = !0, A()));
    }
    function me(U) {
      const H = _.value;
      if (U.key === "Escape") {
        U.preventDefault(), L();
        return;
      }
      if (U.key === "ArrowDown") {
        if (U.preventDefault(), H.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (U.key === "ArrowUp") {
        if (U.preventDefault(), H.length === 0) return;
        g.value = H.length - 1, h.value?.focus();
        return;
      }
      if (U.key === "Enter") {
        U.preventDefault();
        const Z = H[g.value];
        Z && O(Z);
      }
    }
    function ye(U) {
      const H = _.value;
      if (U.key === "Escape") {
        U.preventDefault(), L();
        return;
      }
      if (H.length !== 0) {
        if (U.key === "ArrowDown") {
          U.preventDefault(), g.value = Math.min(g.value + 1, H.length - 1);
          return;
        }
        if (U.key === "ArrowUp") {
          if (U.preventDefault(), g.value === 0 && n.searchable) {
            p.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (U.key === "Enter") {
          U.preventDefault();
          const Z = H[g.value];
          Z && O(Z);
        }
      }
    }
    return Oe(y, () => {
      g.value = 0;
    }), tt(() => {
      document.addEventListener("click", se);
    }), pt(() => {
      document.removeEventListener("click", se);
    }), (U, H) => (m(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Q([
          T(mt),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: G,
        onKeydown: oe
      }, [
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D(C.value), 3),
        F(T(ks), {
          class: Q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, iy),
      (m(), J(Fn, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: De(b.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (m(), k("div", ly, [
            lt(u("input", {
              ref_key: "searchInputRef",
              ref: p,
              "onUpdate:modelValue": H[0] || (H[0] = (Z) => y.value = Z),
              type: "search",
              class: Q([T(mt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: H[1] || (H[1] = Xe(() => {
              }, ["stop"])),
              onKeydown: Xe(me, ["stop"])
            }, null, 42, ry), [
              [sn, y.value]
            ])
          ])) : z("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: Xe(ye, ["stop"])
          }, [
            _.value.length === 0 ? (m(), k("li", cy, D(e.noResultsText), 1)) : z("", !0),
            (m(!0), k(ne, null, he(_.value, (Z, te) => (m(), k("li", {
              key: M(Z),
              role: "option",
              "aria-selected": S(Z),
              class: Q(I(Z, te)),
              onClick: Xe((fe) => O(Z), ["stop"]),
              onMouseenter: (fe) => g.value = te
            }, [
              e.showOptionCheck ? (m(), k("span", uy, [
                S(Z) ? (m(), J(T(cl), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", hy, D(Z.label), 1)
            ], 42, dy))), 128))
          ], 544)
        ], 4), [
          [bn, v.value]
        ])
      ]))
    ], 512));
  }
}), fy = {
  class: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4",
  "aria-hidden": "true"
}, gy = {
  class: "table-skeleton mt-6 w-full min-w-0",
  "aria-hidden": "true"
}, my = { class: "table-skeleton__table" }, py = {
  key: "content",
  class: "card-body"
}, by = { class: "kpi-closed-value" }, vy = { class: "kpi-closed-value__main" }, yy = {
  key: 0,
  class: "kpi-closed-value__pct"
}, xy = { class: "table-view-select flex justify-end" }, _y = { class: "table-section w-full min-w-0" }, ky = { class: "cell-plain" }, wy = { class: "cell-plain" }, Cy = { class: "cell-plain cell-plain--muted" }, $y = { class: "cell-plain" }, Sy = { class: "cell-plain" }, My = { class: "cell-plain" }, Dy = {
  key: 2,
  class: "empty-state"
}, Go = 6, Ty = /* @__PURE__ */ le({
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
  emits: ["export"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = (R) => {
      s("export", R);
    }, { isDark: i } = $e(Ce(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(R) {
      const N = R?.trim() ?? "";
      return N.length > 0 && !l.has(N);
    }
    function c(R) {
      if (!r(R.agent_email)) return !1;
      const N = R.assigned_count ?? 0, j = R.closed_count ?? 0;
      return N > 0 || j > 0;
    }
    function d(R) {
      return (R.assigned_count ?? 0) + (R.closed_count ?? 0);
    }
    function h(R) {
      const N = R?.trim();
      return N || "—";
    }
    const p = $(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), v = $(() => p.value.length > 0), g = $(() => {
      const R = (a.data?.total_enqueued ?? 0) > 0;
      return v.value || R;
    }), y = ae("by_date"), b = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], f = ae("date"), x = ae("desc"), _ = Go;
    Oe(y, (R) => {
      R === "aggregated" ? (f.value = "name", x.value = "asc") : (f.value = "date", x.value = "desc");
    });
    function w(R, N) {
      return N == null ? null : N === 0 ? R > 0 ? 100 : 0 : (R - N) / N * 100;
    }
    function C(R) {
      const N = R.toFixed(1);
      return R > 0 ? `+${N}%` : `${N}%`;
    }
    function M(R, N = !1) {
      const j = N ? -R : R;
      return j > 0 ? "change-badge--up" : j < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(R, N) {
      if (R === null) return null;
      const j = w(R, N);
      return j === null ? null : {
        label: C(j),
        class: M(j, !0)
      };
    }
    function I(R) {
      if (!R) return null;
      const N = R.split(":").map(Number);
      return N.length !== 3 || N.some(isNaN) ? null : N[0] * 3600 + N[1] * 60 + N[2];
    }
    function V(R) {
      const N = Math.round(R), j = Math.floor(N / 3600), de = Math.floor(N % 3600 / 60), K = N % 60;
      return `${String(j).padStart(2, "0")}:${String(de).padStart(2, "0")}:${String(K).padStart(2, "0")}`;
    }
    const E = $(() => a.data?.total_enqueued ?? 0), A = $(() => a.data?.total_closed ?? 0), L = $(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), O = $(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), X = $(() => E.value <= 0 ? null : `(${(A.value / E.value * 100).toFixed(1)}%)`), G = $(
      () => S(
        I(L.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), se = $(
      () => S(
        I(O.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function oe(R, N) {
      return {
        id: `${R.date}-${R.agent_email}-${N}`,
        date: R.date,
        dateSort: new Date(R.date).getTime(),
        agent_name: R.agent_name ?? "",
        agent_email: R.agent_email,
        handled: d(R),
        avg_assignation_seconds: I(R.avg_time_to_assign_seconds),
        avg_resolution_seconds: I(R.avg_conversation_duration_seconds),
        avg_assignation_display: R.avg_time_to_assign_seconds ?? "—",
        avg_resolution_display: R.avg_conversation_duration_seconds ?? "—"
      };
    }
    function me(R) {
      const N = /* @__PURE__ */ new Map();
      for (const j of R) {
        if (!c(j)) continue;
        const de = j.agent_email.trim();
        N.has(de) || N.set(de, {
          agent_name: j.agent_name?.trim() ?? "",
          agent_email: de,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const K = N.get(de), W = j.assigned_count ?? 0, q = j.closed_count ?? 0;
        K.handled += d(j), j.agent_name?.trim() && (K.agent_name = j.agent_name.trim());
        const re = I(j.avg_time_to_assign_seconds);
        re !== null && W > 0 && (K.assignSum += re * W, K.assignWeight += W);
        const ue = I(j.avg_conversation_duration_seconds);
        ue !== null && q > 0 && (K.resolutionSum += ue * q, K.resolutionWeight += q);
      }
      return Array.from(N.values()).map((j, de) => {
        const K = j.assignWeight > 0 ? j.assignSum / j.assignWeight : null, W = j.resolutionWeight > 0 ? j.resolutionSum / j.resolutionWeight : null;
        return {
          id: `agg-${j.agent_email}-${de}`,
          agent_name: j.agent_name,
          agent_email: j.agent_email,
          handled: j.handled,
          avg_assignation_seconds: K,
          avg_resolution_seconds: W,
          avg_assignation_display: K !== null ? V(K) : "—",
          avg_resolution_display: W !== null ? V(W) : "—"
        };
      });
    }
    const ye = $(() => {
      const R = p.value;
      return y.value === "aggregated" ? me(R) : R.map(oe);
    });
    function U(R, N, j, de) {
      const K = de === "asc" ? 1 : -1;
      let W = 0;
      switch (j) {
        case "date":
          W = (R.dateSort ?? 0) - (N.dateSort ?? 0);
          break;
        case "name":
          W = (R.agent_name || "").localeCompare(N.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          W = R.agent_email.localeCompare(N.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          W = R.handled - N.handled;
          break;
        case "avgAssignation":
          W = (R.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          W = (R.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (W !== 0) return W * K;
      if (y.value === "by_date" && j !== "date") {
        const q = (N.dateSort ?? 0) - (R.dateSort ?? 0);
        if (q !== 0) return q;
      }
      return (R.agent_name || "").localeCompare(N.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const H = $(() => {
      const R = [...ye.value];
      return R.sort((N, j) => U(N, j, f.value, x.value)), R;
    }), Z = $(
      () => H.value
    ), te = $(() => {
      const R = [];
      return y.value === "by_date" && R.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), R.push(
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
      ), R;
    });
    function fe(R) {
      const N = R;
      if (f.value === N) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      f.value = N, N === "date" ? x.value = "desc" : N === "name" || N === "email" ? x.value = "asc" : x.value = "desc";
    }
    const we = (R) => R == null ? "0" : ie(R), Me = (R) => new Date(R).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (R, N) => (m(), J(ke, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", {
              key: "loading",
              class: Q(["card-body loading-body", { "agent-human-conv--dark": T(i) }]),
              "aria-busy": "true",
              "aria-label": "Loading agent human conversations"
            }, [
              u("div", fy, [
                (m(), k(ne, null, he(4, (j) => F(vt, {
                  key: `kpi-skeleton-${j}`,
                  label: "Loading",
                  value: "",
                  "label-position": "header",
                  loading: !0,
                  theme: e.theme
                }, null, 8, ["theme"])), 64))
              ]),
              u("section", gy, [
                N[2] || (N[2] = u("div", { class: "table-skeleton__header" }, [
                  u("div", { class: "table-skeleton__titles" }, [
                    u("div", { class: "bm-skeleton-blink skeleton-section-title" }),
                    u("div", { class: "bm-skeleton-blink skeleton-section-subtitle" })
                  ]),
                  u("div", { class: "bm-skeleton-blink skeleton-table-select" })
                ], -1)),
                u("div", my, [
                  N[1] || (N[1] = u("div", { class: "bm-skeleton-blink skeleton-table-head" }, null, -1)),
                  (m(!0), k(ne, null, he(T(_), (j) => (m(), k("div", {
                    key: `table-row-skeleton-${j}`,
                    class: "bm-skeleton-blink skeleton-table-row"
                  }))), 128))
                ])
              ])
            ], 2)) : (m(), k("div", py, [
              g.value ? (m(), k("div", {
                key: 0,
                class: Q(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
              }, [
                F(vt, {
                  label: "Conversations Opened",
                  "label-position": "header",
                  value: we(E.value),
                  theme: e.theme,
                  "current-value": E.value,
                  "previous-value": e.previousTotalEnqueued
                }, {
                  icon: B(() => [...N[3] || (N[3] = [
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
                F(vt, {
                  label: "Conversations Closed",
                  "label-position": "header",
                  value: we(A.value),
                  theme: e.theme,
                  "current-value": A.value,
                  "previous-value": e.previousTotalClosed
                }, {
                  icon: B(() => [...N[4] || (N[4] = [
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
                  value: B(() => [
                    u("div", by, [
                      u("span", vy, D(we(A.value)), 1),
                      X.value ? (m(), k("span", yy, D(X.value), 1)) : z("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                F(vt, {
                  label: "Avg Time to Assign",
                  "label-position": "header",
                  value: L.value ?? "—",
                  theme: e.theme,
                  "current-value": I(L.value) ?? 0,
                  "previous-value": e.previousAvgTimeToAssignSeconds
                }, $s({
                  icon: B(() => [
                    N[5] || (N[5] = u("svg", {
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
                  G.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: Q(["duration-trend-badge", G.value.class])
                      }, D(G.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"]),
                F(vt, {
                  label: "Avg Resolution Time",
                  "label-position": "header",
                  value: O.value ?? "—",
                  theme: e.theme,
                  "current-value": I(O.value) ?? 0,
                  "previous-value": e.previousAvgConversationDurationSeconds
                }, $s({
                  icon: B(() => [
                    N[6] || (N[6] = u("svg", {
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
                  se.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: Q(["duration-trend-badge", se.value.class])
                      }, D(se.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"])
              ], 2)) : z("", !0),
              v.value ? (m(), J(ke, {
                key: 1,
                class: "agent-table-section mt-6",
                title: "Conversations Managed by Agent",
                subtitle: "Daily performance per human agent",
                collapsible: !1
              }, {
                headerAside: B(() => [
                  u("div", xy, [
                    F(ws, {
                      modelValue: y.value,
                      "onUpdate:modelValue": N[0] || (N[0] = (j) => y.value = j),
                      options: b,
                      "aria-label-trigger": "Table view mode",
                      "show-option-check": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                default: B(() => [
                  u("div", _y, [
                    (m(), J(rt, {
                      key: `${y.value}-${f.value}-${x.value}`,
                      columns: te.value,
                      rows: Z.value,
                      "sort-key": f.value,
                      "sort-direction": x.value,
                      "max-visible-rows": Go,
                      "row-key": "id",
                      onSort: fe
                    }, {
                      "cell-date": B(({ row: j }) => [
                        u("span", ky, D(Me(String(j.date))), 1)
                      ]),
                      "cell-name": B(({ row: j }) => [
                        u("span", wy, D(h(j.agent_name)), 1)
                      ]),
                      "cell-email": B(({ row: j }) => [
                        u("span", Cy, D(j.agent_email), 1)
                      ]),
                      "cell-handled": B(({ row: j }) => [
                        u("span", $y, D(we(Number(j.handled))), 1)
                      ]),
                      "cell-avgAssignation": B(({ row: j }) => [
                        u("span", Sy, D(j.avg_assignation_display), 1)
                      ]),
                      "cell-avgResolution": B(({ row: j }) => [
                        u("span", My, D(j.avg_resolution_display), 1)
                      ]),
                      _: 1
                    }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
                  ])
                ]),
                _: 1
              })) : g.value ? z("", !0) : (m(), k("div", Dy, [...N[7] || (N[7] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ay = /* @__PURE__ */ ge(Ty, [["__scopeId", "data-v-4fe2df89"]]), By = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ly = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Py = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Iy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ry = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Fy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ey = { class: "max-w-[360px] px-4 text-center" }, Oy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Zo = 5, Vy = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, i = Ce(a, "theme"), { isDark: l } = $e(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = ae({
      labels: [],
      datasets: []
    }), d = $(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = $(() => {
      const y = d.value.total_by_channel || {}, b = Object.values(y).reduce(
        (f, x) => f + x,
        0
      );
      return b === 0 ? [] : Object.entries(y).sort(([, f], [, x]) => x - f).map(([f, x]) => ({
        name: f,
        label: f.toUpperCase(),
        total: x,
        percentage: (x / b * 100).toFixed(1),
        color: r[f.toLowerCase()] || "#9ca3af"
      }));
    }), p = $(
      () => h.value.slice(0, Zo)
    ), v = $(() => {
      const y = Math.min(p.value.length, Zo);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), g = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const b = y.channels_by_day, f = Object.keys(b).sort();
      if (f.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const C of Object.values(b))
        for (const M of Object.keys(C))
          x.add(M);
      const w = Array.from(x).map((C) => {
        const M = C.toLowerCase(), S = r[M] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: f.map((I) => b[I]?.[C] || 0),
          borderColor: S
        };
      });
      c.value = {
        labels: f.map((C) => je(C).format("MMM DD")),
        datasets: w
      };
    };
    return Oe(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, b) => (m(), J(ke, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (m(), k("div", By, [...b[0] || (b[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", Ly, [
                c.value.labels && c.value.labels.length ? (m(), k("section", Py, [
                  u("div", Iy, [
                    F(yt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  p.value.length ? (m(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: De(v.value)
                  }, [
                    (m(!0), k(ne, null, he(p.value, (f) => (m(), J(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(ie)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : h.value.length ? (m(), k("section", Ry, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: De(v.value)
                  }, [
                    (m(!0), k(ne, null, he(p.value, (f) => (m(), J(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(ie)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : z("", !0),
                h.value.length ? z("", !0) : (m(), k("section", Fy, [
                  u("div", Ey, [
                    u("div", Oy, [
                      F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    b[1] || (b[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                    b[2] || (b[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
                  ])
                ]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), zy = /* @__PURE__ */ ge(Vy, [["__scopeId", "data-v-de07e6c8"]]), Ny = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Hy = {
  key: "content",
  class: "card-body"
}, Wy = { class: "chart-container" }, jy = { class: "triage-table-block w-full min-w-0" }, Yy = { class: "triage-row-label" }, Ky = {
  key: 1,
  class: "triage-count"
}, Uy = {
  key: 1,
  class: "triage-count"
}, qy = {
  key: 1,
  class: "triage-count"
}, Xy = {
  key: 1,
  class: "triage-count"
}, Gy = {
  key: 1,
  class: "triage-count"
}, Zy = {
  key: 1,
  class: "empty-state"
}, Qy = { class: "empty-state-content" }, Jy = { class: "empty-icon-wrapper" }, e1 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (_) => {
      s("export", _);
    }, { isDark: i, colors: l } = $e(
      Ce(a, "theme")
    ), r = $(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, M] of Object.entries(_)) {
        const S = C.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const I = S.filter((V) => V !== "triage").length;
        I >= 4 ? w["4p"] += Number(M) || 0 : w[I] += Number(M) || 0;
      }
      return w;
    }), c = $(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), d = $(() => Object.keys(a.data?.combinations || {}).length > 0), h = $(() => {
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
    }), p = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = $(() => {
      const _ = h.value, w = r.value;
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
    }, y = (_) => _?.replace("80", "") || "#888888", b = $(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: y(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: y(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: y(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: y(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: y(g.c4p),
          borderWidth: 1
        }
      ]
    })), f = $(() => ({
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
    })), x = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (m(), J(ke, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Ny, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Hy, [
              d.value ? (m(), k(ne, { key: 0 }, [
                u("div", Wy, [
                  F($t, {
                    data: b.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ]),
                F(ve, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: T(ie)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", jy, [
                  F(rt, {
                    columns: p,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": B(({ row: C }) => [
                      u("span", Yy, D(C.metric), 1)
                    ]),
                    "cell-b0": B(({ row: C }) => [
                      C.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: De({ color: y(g.c0) })
                      }, D(x(Number(C.b0))) + "%", 5)) : (m(), k("span", Ky, D(T(ie)(Number(C.b0))), 1))
                    ]),
                    "cell-b1": B(({ row: C }) => [
                      C.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: De({ color: y(g.c1) })
                      }, D(x(Number(C.b1))) + "%", 5)) : (m(), k("span", Uy, D(T(ie)(Number(C.b1))), 1))
                    ]),
                    "cell-b2": B(({ row: C }) => [
                      C.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: De({ color: y(g.c2) })
                      }, D(x(Number(C.b2))) + "%", 5)) : (m(), k("span", qy, D(T(ie)(Number(C.b2))), 1))
                    ]),
                    "cell-b3": B(({ row: C }) => [
                      C.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: De({ color: y(g.c3) })
                      }, D(x(Number(C.b3))) + "%", 5)) : (m(), k("span", Xy, D(T(ie)(Number(C.b3))), 1))
                    ]),
                    "cell-b4p": B(({ row: C }) => [
                      C.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: De({ color: y(g.c4p) })
                      }, D(x(Number(C.b4p))) + "%", 5)) : (m(), k("span", Gy, D(T(ie)(Number(C.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (m(), k("div", Zy, [
                u("div", Qy, [
                  u("div", Jy, [
                    F(T(nt), { class: "empty-icon" })
                  ]),
                  w[1] || (w[1] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
                  w[2] || (w[2] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), t1 = /* @__PURE__ */ ge(e1, [["__scopeId", "data-v-4610c1a9"]]), n1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, a1 = {
  key: "content",
  class: "card-body"
}, s1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, o1 = { class: "pie-section" }, i1 = {
  key: 1,
  class: "empty-state"
}, l1 = /* @__PURE__ */ le({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = [
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
    }, l = (v) => i[v]?.label || v.toUpperCase(), r = $(
      () => n.data?.items && n.data.items.length > 0
    ), c = $(
      () => (n.data?.items || []).reduce((v, g) => v + g.count, 0)
    ), d = $(() => {
      const v = {};
      for (const g of n.data?.items || [])
        v[g.language] = (v[g.language] || 0) + g.count;
      return Object.entries(v).map(([g, y]) => ({ language: g, count: y })).sort((g, y) => y.count - g.count);
    }), h = $(() => ({
      labels: d.value.map((v) => l(v.language)),
      datasets: [
        {
          data: d.value.map((v) => v.count),
          backgroundColor: d.value.map(
            (v, g) => o[g % o.length] + "80"
          ),
          borderColor: d.value.map(
            (v, g) => o[g % o.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), p = $(() => ({
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
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const g = v.raw || 0, y = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${g} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (v, g) => (m(), J(ke, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            n.loading ? (m(), k("div", n1, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", a1, [
              r.value ? (m(), k("div", s1, [
                u("section", o1, [
                  F(Ma, {
                    data: h.value,
                    options: p.value
                  }, null, 8, ["data", "options"])
                ]),
                F(ve, {
                  class: "shrink-0",
                  title: "Total",
                  value: T(ie)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (m(), k("section", i1, [...g[1] || (g[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), r1 = /* @__PURE__ */ ge(l1, [["__scopeId", "data-v-8743ba33"]]), c1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, d1 = {
  key: "content",
  class: "card-body"
}, u1 = {
  key: 0,
  class: "guardrails-daily-section"
}, h1 = { class: "w-full min-w-0" }, f1 = { class: "font-medium" }, g1 = { class: "font-semibold" }, m1 = { class: "type-badges-row" }, p1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, b1 = {
  key: 1,
  class: "empty-state"
}, v1 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (b) => {
      s("export", b);
    }, { isDark: i } = $e(Ce(a, "theme")), l = $(
      () => a.data?.items && a.data.items.length > 0
    ), r = $(
      () => (a.data?.items || []).reduce((b, f) => b + f.count, 0)
    ), c = (b) => {
      const f = {};
      for (const w of a.data?.items || [])
        f[w[b]] = (f[w[b]] || 0) + w.count;
      const x = Object.entries(f).sort((w, C) => C[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: x[0][0],
        pct: _ > 0 ? Math.round(x[0][1] / _ * 100) : 0
      };
    }, d = $(() => c("guardrail_type")), h = $(() => c("guardrail_action")), p = $(() => c("guardrail_source")), v = $(() => {
      const b = {};
      for (const f of a.data?.items || [])
        b[f.date] || (b[f.date] = {}), b[f.date][f.guardrail_type] = (b[f.date][f.guardrail_type] || 0) + f.count;
      return Object.entries(b).map(([f, x]) => ({
        date: f,
        total: Object.values(x).reduce((_, w) => _ + w, 0),
        types: Object.entries(x).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((f, x) => new Date(f.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = $(
      () => v.value.map((b) => ({
        id: b.date,
        date: b.date,
        total: b.total,
        types: b.types
      }))
    );
    return t({ isDark: i }), (b, f) => (m(), J(ke, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", c1, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", d1, [
              l.value ? (m(), k(ne, { key: 0 }, [
                v.value.length > 0 ? (m(), k("section", u1, [
                  u("div", h1, [
                    F(rt, {
                      columns: g,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": B(({ row: x }) => [
                        u("span", f1, D(T(je)(String(x.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": B(({ row: x }) => [
                        u("span", g1, D(T(ie)(x.total)), 1)
                      ]),
                      "cell-types": B(({ row: x }) => [
                        u("div", m1, [
                          (m(!0), k(ne, null, he(x.types, (_) => (m(), k("span", {
                            key: _.type,
                            class: "type-count-badge"
                          }, D(_.type) + " (" + D(_.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("section", p1, [
                  F(ve, {
                    title: "Total Events",
                    value: T(ie)(r.value)
                  }, null, 8, ["value"]),
                  F(ve, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    title: "Top source",
                    value: p.value.name,
                    subvalue: p.value.pct > 0 ? `(${p.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (m(), k("section", b1, [...f[1] || (f[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), y1 = /* @__PURE__ */ ge(v1, [["__scopeId", "data-v-80a28b15"]]), x1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, _1 = {
  key: "content",
  class: "card-body"
}, k1 = { class: "chart-section" }, w1 = { class: "chart-wrapper" }, C1 = {
  key: 1,
  class: "empty-chart"
}, $1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, S1 = {
  key: 0,
  class: "dn-failure-section"
}, M1 = { class: "w-full min-w-0" }, D1 = { class: "failure-reason" }, T1 = { class: "failure-count" }, A1 = { class: "impact-bar-container" }, B1 = { class: "impact-label" }, L1 = { class: "dn-trend-health-block flex flex-col gap-0" }, P1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, I1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, R1 = { class: "system-health" }, F1 = { class: "system-health-content" }, E1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, O1 = {
  key: 1,
  class: "empty-state"
}, V1 = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (C) => {
      s("export", C);
    }, { isDark: i, colors: l } = $e(Ce(a, "theme")), r = $(() => {
      const C = a.data?.documentCounts?.items || [], M = a.data?.processingCounts?.items || [];
      return C.length > 0 || M.length > 0;
    }), c = $(() => {
      const C = a.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((M, S) => M + S.processing_started, 0),
        processing_completed: C.reduce((M, S) => M + S.processing_completed, 0),
        processing_failed: C.reduce((M, S) => M + S.processing_failed, 0),
        row_count_total: C.reduce((M, S) => M + S.row_count_total, 0)
      };
    }), d = $(() => {
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
        totalDqErrors: C.reduce(
          (M, S) => M + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other,
          0
        )
      };
    }), h = $(
      () => c.value.row_count_total || d.value.processing_started
    ), p = $(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = (C, M) => M ? `${Math.round(C / M * 100)}%` : "0%", g = $(() => {
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
    }), y = $(() => {
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
    }), b = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], f = $(
      () => y.value.map((C) => ({
        id: C.reason,
        reason: C.reason,
        count: C.count,
        impactPct: C.impactPct
      }))
    ), x = $(() => {
      const C = h.value, M = d.value.processing_success, S = Math.max(0, M - d.value.totalDqErrors), I = d.value.notification_sent, V = Math.max(0, C - M), E = d.value.totalDqErrors, A = Math.max(0, S - I), L = (G, se) => be(G, se), O = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], X = [];
      return M > 0 && X.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: M,
        label: L(M, C)
      }), V > 0 && X.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: L(V, C)
      }), S > 0 && X.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: L(S, C)
      }), E > 0 && X.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: E,
        label: L(E, C)
      }), I > 0 && X.push({
        source: "Contactable",
        target: "Notified",
        value: I,
        label: L(I, C)
      }), A > 0 && X.push({
        source: "Contactable",
        target: "Not Delivered",
        value: A,
        label: L(A, C)
      }), { nodes: O, links: X };
    }), _ = $(() => {
      const C = [...a.data?.processingCounts?.items || []].sort(
        (L, O) => new Date(L.date).getTime() - new Date(O.date).getTime()
      ), M = a.data?.documentCounts?.items || [], S = {};
      for (const L of M)
        S[L.date] = (S[L.date] || 0) + L.row_count_total;
      const I = [
        .../* @__PURE__ */ new Set([
          ...C.map((L) => L.date),
          ...M.map((L) => L.date)
        ])
      ].sort(), V = I.map((L) => je(L).format("MMM DD")), E = I.map((L) => {
        const O = C.find((se) => se.date === L), X = O?.notification_sent || 0, G = S[L] || O?.processing_started || 0;
        return G > 0 ? Math.round(X / G * 100) : 0;
      }), A = I.map((L) => C.find((X) => X.date === L)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: E,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: A,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), w = $(() => ({
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
    return t({ isDark: i }), (C, M) => (m(), J(ke, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", x1, [...M[0] || (M[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", _1, [
              r.value ? (m(), k(ne, { key: 0 }, [
                u("section", k1, [
                  M[2] || (M[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", w1, [
                    x.value.nodes.length > 0 && x.value.links.length > 0 ? (m(), J(qt, {
                      key: 0,
                      data: x.value,
                      height: "350px",
                      "use-gradient": !1,
                      "node-gap": 24
                    }, null, 8, ["data"])) : (m(), k("div", C1, [...M[1] || (M[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", $1, [
                  F(ve, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: T(ie)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  F(ve, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: T(ie)(h.value)
                  }, null, 8, ["value"]),
                  F(ve, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: T(ie)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: T(ie)(p.value),
                    subvalue: v(p.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  F(ve, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: g.value.reason,
                    subvalue: g.value.count > 0 ? `${T(ie)(g.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (m(), k("section", S1, [
                  M[3] || (M[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", M1, [
                    F(rt, {
                      columns: b,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": B(({ row: S }) => [
                        u("span", D1, D(S.reason), 1)
                      ]),
                      "cell-count": B(({ row: S }) => [
                        u("span", T1, D(T(ie)(S.count)), 1)
                      ]),
                      "cell-impact": B(({ row: S }) => [
                        u("div", A1, [
                          u("div", {
                            class: "impact-bar",
                            style: De({ width: S.impactPct + "%" })
                          }, null, 4),
                          u("span", B1, D(S.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("div", L1, [
                  _.value.labels.length > 0 ? (m(), k("section", P1, [
                    M[4] || (M[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", I1, [
                      F(yt, {
                        data: _.value,
                        options: w.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : z("", !0),
                  u("details", R1, [
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
                      Be(" System Health Details ")
                    ], -1)),
                    u("div", F1, [
                      u("div", E1, [
                        F(ve, {
                          title: "Docs Started",
                          value: T(ie)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Docs Completed",
                          value: T(ie)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Docs Failed",
                          value: T(ie)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Processing Started",
                          value: T(ie)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Processing Success",
                          value: T(ie)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        F(ve, {
                          title: "Notification Failed",
                          value: T(ie)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (m(), k("section", O1, [...M[6] || (M[6] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), z1 = /* @__PURE__ */ ge(V1, [["__scopeId", "data-v-c77ab172"]]), N1 = /* @__PURE__ */ le({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => ie(n.totalConversations)), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (m(), J(vt, {
      label: "Total Conversations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), H1 = /* @__PURE__ */ le({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${n.csatP95.toFixed(1)}`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (m(), J(vt, {
      label: "CSAT P95",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), W1 = /* @__PURE__ */ le({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${n.csatPulse.toFixed(1)}%`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (m(), J(vt, {
      label: "CSAT Pulse",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), j1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Y1 = { key: "content" }, K1 = {
  key: 0,
  class: "card-body"
}, U1 = { class: "chart-wrapper" }, q1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, X1 = {
  key: 1,
  class: "empty-state"
}, G1 = 520, Z1 = 300, Q1 = 40, J1 = 48, ex = 48, tx = {
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
    const a = n, s = (r) => {
      a("export", r);
    }, o = e, { isDark: i } = $e(Ce(o, "theme")), l = $(() => o.data);
    return t({ isDark: i }), (r, c) => (m(), J(ke, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (m(), k("div", j1, [...c[0] || (c[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Y1, [
              l.value && l.value.total_nps_responses > 0 ? (m(), k("div", K1, [
                u("div", U1, [
                  F(el, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": G1,
                    "chart-height": Z1,
                    "chart-margin": Q1,
                    "chart-margin-right": J1,
                    "chart-bottom-margin": ex,
                    "plot-inset": 10,
                    "show-legend": !1,
                    "show-stat-labels": !1
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
                ]),
                u("div", q1, [
                  F(ve, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (m(), J(ve, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : z("", !0)
                ])
              ])) : (m(), k("div", X1, [...c[1] || (c[1] = [
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
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, dl = /* @__PURE__ */ ge(tx, [["__scopeId", "data-v-3a3f4c10"]]), nx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ax = { key: "content" }, sx = {
  key: 0,
  class: "card-body"
}, ox = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ix = {
  key: 1,
  class: "empty-state"
}, lx = {
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
    const n = t, a = (c) => {
      n("export", c);
    }, s = e, o = $(() => s.data?.csat_p95_by_day || []), i = $(() => o.value.length > 0), l = $(() => ({
      labels: o.value.map((c) => je(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: o.value.map((c) => Number(c.p95_score || 0)),
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
    return (c, d) => (m(), J(ke, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (m(), k("div", nx, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", ax, [
              i.value ? (m(), k("div", sx, [
                u("div", ox, [
                  F(yt, {
                    data: l.value,
                    options: r,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (m(), k("div", ix, [...d[1] || (d[1] = [
                u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
                u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, ul = /* @__PURE__ */ ge(lx, [["__scopeId", "data-v-cd8c9258"]]), rx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, cx = { key: "content" }, dx = {
  key: 0,
  class: "card-body"
}, ux = {
  key: 1,
  class: "empty-state"
}, hx = /* @__PURE__ */ le({
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
    const t = e, n = $(
      () => t.data?.resolution_breakdown || []
    ), a = $(
      () => n.value.some((i) => Number(i.count || 0) > 0)
    ), s = $(() => {
      const i = n.value;
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
    }), o = {
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
    return (i, l) => (m(), J(ke, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (m(), k("div", rx, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", cx, [
              a.value ? (m(), k("div", dx, [
                F($t, {
                  data: s.value,
                  options: o,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (m(), k("div", ux, [...l[1] || (l[1] = [
                u("p", { class: "empty-title" }, "No resolution answers available", -1),
                u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), fx = /* @__PURE__ */ ge(hx, [["__scopeId", "data-v-f99eebba"]]), gx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, mx = { key: "content" }, px = {
  key: 0,
  class: "card-body"
}, bx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, vx = {
  key: 1,
  class: "empty-state"
}, yx = /* @__PURE__ */ le({
  __name: "npsPulseMetrics",
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
    const t = e, n = $(() => t.data?.csat_pulse_by_day || []), a = $(() => n.value.length > 0), s = $(() => ({
      labels: n.value.map((i) => i.date || ""),
      datasets: [
        {
          label: "CSAT Pulse",
          data: n.value.map((i) => Number(i.csat_pulse || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), o = {
      scales: {
        y: {
          min: -200,
          max: 100,
          ticks: {
            callback: (i) => `${i}%`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (i) => `${i.parsed.y.toFixed(2)}%`
          }
        }
      }
    };
    return (i, l) => (m(), J(ke, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        F(Te, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (m(), k("div", gx, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", mx, [
              a.value ? (m(), k("div", px, [
                u("div", bx, [
                  F(yt, {
                    data: s.value,
                    options: o,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (m(), k("div", vx, [...l[1] || (l[1] = [
                u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
                u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
              ])]))
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), xx = /* @__PURE__ */ ge(yx, [["__scopeId", "data-v-c1c76b84"]]), _x = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, kx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, hl = {
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
    const n = t, a = (d) => {
      n("export", d);
    }, s = e, o = $(() => s.showResolutionChart), i = $(() => s.showCsatPulseChart), l = $(
      () => (o.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = $(() => l.value > 0), c = $(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (m(), k("div", _x, [
      u("div", kx, [
        F(dl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        F(ul, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (m(), k("div", {
        key: 0,
        class: Q(["grid w-full items-start gap-6", c.value])
      }, [
        o.value ? (m(), J(fx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (m(), J(xx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0)
      ], 2)) : z("", !0)
    ]));
  }
}, wx = { class: "csat-container__body" }, Cx = /* @__PURE__ */ le({
  __name: "CSATContainer",
  props: {
    containerInitiallyOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    enableExport: { type: Boolean, default: !1 },
    data: { default: void 0 },
    showResolutionChart: { type: Boolean, default: !1 },
    showCsatPulseChart: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = t;
    function a(s) {
      n("export", { source: "npsMetrics", format: s });
    }
    return (s, o) => (m(), J(ke, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", wx, [
          F(hl, {
            data: e.data,
            loading: e.loading,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "loading", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), $x = /* @__PURE__ */ ge(Cx, [["__scopeId", "data-v-71605c0e"]]), Sx = /* @__PURE__ */ le({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => Rt(n.totalRevenue)), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (m(), J(vt, {
      label: "AI Revenue",
      value: s.value,
      prefix: e.currencyCode,
      "value-size": "large",
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalRevenue,
      "previous-value": e.previousTotalRevenue,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), Qo = 1, Mx = /* @__PURE__ */ le({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), { isDark: s } = $e(Ce(n, "theme")), o = $(() => n.totalConversations * Qo), i = $(() => n.previousTotalConversations === null || n.previousTotalConversations === void 0 ? null : n.previousTotalConversations * Qo), l = $(() => ie(o.value)), r = $(
      () => i.value !== null && i.value !== void 0
    ), c = $(() => {
      if (!r.value) return 0;
      const p = i.value;
      return p === 0 ? o.value > 0 ? 100 : 0 : (o.value - p) / p * 100;
    }), d = $(() => {
      const p = c.value.toFixed(1);
      return c.value > 0 ? `+${p}%` : `${p}%`;
    }), h = $(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: s, changePercent: c }), (p, v) => (m(), J(vt, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...v[0] || (v[0] = [
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
      headerAside: B(() => [
        r.value ? (m(), k("div", {
          key: 0,
          class: Q(["change-badge", h.value, { "change-badge--dark": T(s) }])
        }, D(d.value), 3)) : z("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Dx = /* @__PURE__ */ ge(Mx, [["__scopeId", "data-v-411e0735"]]), Tx = { class: "flex justify-end" }, Ax = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Bx = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Lx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Px = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ix = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, Rx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Fx = /* @__PURE__ */ le({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = Ce(a, "theme"), { isDark: i } = $e(o), l = ae(a.breakdownBy), r = $(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), c = ae({
      labels: [],
      datasets: []
    }), d = ae([]), h = ae(
      []
    ), p = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (x) => p[x % p.length], g = {
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (x) => `${x}%`
          }
        }
      }
    }, y = () => {
      s("changeBreakdown", l.value);
    }, b = (x) => {
      if (!x) return "";
      const w = x.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return w ? w.charAt(0).toUpperCase() + w.slice(1) : "";
    }, f = (x) => {
      if (l.value === "all") {
        const V = x?.escalations_by_day ?? [];
        if (!V.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const E = [...V].sort((A, L) => A.date.localeCompare(L.date));
        c.value = {
          labels: E.map((A) => je(A.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: E.map(
                (A) => Number(A.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, d.value = [], h.value = [];
        return;
      }
      const _ = x?.breakdown_by_day ?? [], w = x?.breakdown_items ?? [];
      if (!_.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const C = [..._].sort(
        (V, E) => V.date.localeCompare(E.date)
      ), M = w.slice(0, 5).map((V) => V.key), S = C.map((V) => je(V.date).format("MMM DD")), I = M.map((V, E) => {
        const A = w.find((L) => L.key === V);
        return {
          label: b(A?.label || V),
          data: C.map((L) => {
            const O = L.items.find((X) => X.key === V);
            return Number(O?.percentage || 0);
          }),
          borderColor: v(E),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      c.value = {
        labels: S,
        datasets: I
      }, d.value = w.slice(0, 5).map((V, E) => ({
        key: V.key,
        label: b(V.label),
        percentage: Number(V.percentage || 0),
        color: v(E)
      })), h.value = w.slice(0, 5).map((V, E) => ({
        key: V.key,
        label: b(V.label),
        color: v(E)
      }));
    };
    return Oe(
      () => a.data,
      (x) => {
        f(x ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Oe(
      () => a.breakdownBy,
      (x) => {
        l.value = x, f(r.value);
      }
    ), t({ isDark: i }), (x, _) => (m(), J(ke, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: B(() => [
        u("div", Tx, [
          lt(u("select", {
            "onUpdate:modelValue": _[0] || (_[0] = (w) => l.value = w),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [..._[1] || (_[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1),
            u("option", { value: "channel" }, "By Channel", -1),
            u("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [kl, l.value]
          ])
        ])
      ]),
      default: B(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          F(Te, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (m(), k("div", Ax, [..._[2] || (_[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", Bx, [
                c.value.labels && c.value.labels.length && c.value.datasets.length ? (m(), k("section", Lx, [
                  u("div", Px, [
                    F(yt, {
                      data: c.value,
                      options: g,
                      theme: o.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", Ix, [
                    (m(!0), k(ne, null, he(d.value, (w) => (m(), J(ve, {
                      key: `card-${w.key}`,
                      class: "min-w-0",
                      color: w.color,
                      title: w.label,
                      value: `${w.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value"]))), 128))
                  ])
                ])) : (m(), k("section", Rx, [..._[3] || (_[3] = [
                  u("div", { class: "max-w-[360px] px-4 text-center" }, [
                    u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No human escalations data available "),
                    u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No escalation data found for the selected period. Try adjusting the date range. ")
                  ], -1)
                ])]))
              ]))
            ]),
            _: 1
          })
        ], 2)
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ex = /* @__PURE__ */ ge(Fx, [["__scopeId", "data-v-126665b7"]]), Ox = /* @__PURE__ */ le({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (m(), J(vt, {
      label: "Human Escalations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: B(() => [...r[0] || (r[0] = [
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
}), Vx = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, zx = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, Nx = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Hx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Wx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, jx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Yx = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Kx = { class: "max-w-[360px] text-center" }, Ux = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, qx = {
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
    const t = e, { isDark: n, colors: a } = $e(Ce(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = $(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, p = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let g = [];
      return p ? g = d : v && (g = h.map((y, b) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[b] ?? 0,
        aws_cost: c.awsCostSeries[b] ?? 0,
        airline_conversations: c.airlineConversationsSeries[b] ?? 0
      }))), {
        daily: g,
        total_allocated_cost: c.total_allocated_cost ?? c.totalAllocated ?? 0,
        total_cost: c.total_cost ?? c.total ?? 0,
        total_conversations: c.total_conversations ?? c.totalConversations ?? 0,
        total_airline_conversations: c.total_airline_conversations ?? c.totalAirlineConversations ?? 0,
        airline_name: c.airline_name
      };
    }), l = $(() => {
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
    }), r = $(() => ({
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
              const d = c.dataset.label ? `${c.dataset.label}: ` : "", h = c.parsed.y;
              return c.dataset.yAxisID === "y" ? d + Pe(h) : d + String(h);
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
            callback: (c) => Pe(c)
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
    return (c, d) => (m(), J(ke, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Vx, [
          e.loading ? (m(), k("div", zx, [
            u("div", Nx, [
              (m(), k(ne, null, he(s, (h, p) => u("div", {
                key: p,
                class: Q(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[p]]),
                style: De({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (m(), k("div", Hx, [
            u("div", Wx, [
              F(yt, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", jx, [
              F(ve, {
                color: T(a).primaryLight,
                title: "Total Allocated",
                value: T(Pe)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              F(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Pe)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (m(), k("section", Yx, [
            u("div", Kx, [
              u("div", Ux, [
                F(T(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              d[1] || (d[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              d[2] || (d[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title"]));
  }
}, Xx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Gx = {
  key: 0,
  class: "card-body"
}, Zx = {
  key: 0,
  class: "chart-section"
}, Qx = { class: "chart-container" }, Jx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, e_ = {
  key: 1,
  class: "empty-state"
}, t_ = { class: "empty-state-content" }, n_ = { class: "empty-icon-wrapper" }, a_ = {
  key: 1,
  class: "loading-state"
}, Sn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Jo = 10, s_ = /* @__PURE__ */ le({
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
    const a = e, { isDark: s, colors: o } = $e(Ce(a, "theme")), i = (g) => {
      const y = new Date(g), b = String(y.getDate()).padStart(2, "0"), f = String(y.getMonth() + 1).padStart(2, "0");
      return `${b}-${f}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.input_cost || 0), 0);
    }), c = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.output_cost || 0), 0);
    }), d = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.cache_read_cost || 0), 0);
    }), h = $(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, b) => y + (b.cache_write_cost || 0), 0);
    }), p = $(() => {
      const g = a.data?.costs_by_day || {}, y = Object.keys(g).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const b = y.map((x) => i(x)), f = [
        {
          label: "Input Cost",
          data: y.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: b,
        datasets: f
      };
    }), v = $(() => a.options ? a.options : {
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
              family: Sn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Jo,
            boxHeight: Jo,
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
            family: Sn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Sn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let y = g.dataset.label || "";
              return y && (y += ": "), g.parsed.y !== null && (y += Pe(g.parsed.y)), y;
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
            font: { family: Sn, size: 12, weight: "500" },
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
            font: { family: Sn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Pe(g);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (g, y) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Xx, [
          e.loading ? (m(), k("div", a_, [...y[2] || (y[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (m(), k("div", Gx, [
            p.value.labels && p.value.labels.length ? (m(), k("section", Zx, [
              u("div", Qx, [
                F($t, {
                  data: p.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Jx, [
                F(ve, {
                  title: "Total Cost",
                  value: T(Pe)(e.data.total_cost)
                }, null, 8, ["value"]),
                F(ve, {
                  title: "Input Cost",
                  value: T(Pe)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Output Cost",
                  value: T(Pe)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Cache Read",
                  value: T(Pe)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Cache Write",
                  value: T(Pe)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                F(ve, {
                  title: "Avg / Conv.",
                  value: T(Pe)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", e_, [
              u("div", t_, [
                u("div", n_, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), o_ = /* @__PURE__ */ ge(s_, [["__scopeId", "data-v-39a5448c"]]), i_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, l_ = {
  key: 0,
  class: "card-body"
}, r_ = {
  key: 0,
  class: "chart-section"
}, c_ = { class: "chart-container" }, d_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, u_ = {
  key: 1,
  class: "empty-state"
}, h_ = { class: "empty-state-content" }, f_ = { class: "empty-icon-wrapper" }, g_ = {
  key: 1,
  class: "loading-state"
}, Mn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ei = 10, m_ = /* @__PURE__ */ le({
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
    const a = e, { isDark: s, colors: o } = $e(Ce(a, "theme")), i = (d) => {
      const h = new Date(d), p = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((g) => i(g)), v = [
        {
          label: "Input Tokens",
          data: h.map((g) => d[g]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => d[g]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => d[g]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => d[g]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: v
      };
    }), c = $(() => a.options ? a.options : {
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
              family: Mn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: ei,
            boxHeight: ei,
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
            family: Mn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Mn,
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
            font: { family: Mn, size: 12, weight: "500" },
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
            font: { family: Mn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (d, h) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", i_, [
          e.loading ? (m(), k("div", g_, [...h[2] || (h[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (m(), k("div", l_, [
            r.value.labels && r.value.labels.length ? (m(), k("section", r_, [
              u("div", c_, [
                F($t, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", d_, [
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(ie)(e.data.total_tokens)
                }, null, 8, ["value"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(ie)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(ie)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(ie)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                F(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(ie)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (m(), k("section", u_, [
              u("div", h_, [
                u("div", f_, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                h[0] || (h[0] = u("p", { class: "empty-title" }, "No token usage data", -1)),
                h[1] || (h[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see token consumption trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), p_ = /* @__PURE__ */ ge(m_, [["__scopeId", "data-v-70c6f3c7"]]), b_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, v_ = {
  key: 0,
  class: "card-body"
}, y_ = {
  key: 0,
  class: "chart-section"
}, x_ = { class: "chart-container" }, __ = { class: "mt-4 w-full min-w-0" }, k_ = {
  key: 1,
  class: "empty-state"
}, w_ = { class: "empty-state-content" }, C_ = { class: "empty-icon-wrapper" }, $_ = {
  key: 1,
  class: "loading-state"
}, S_ = /* @__PURE__ */ le({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(
      () => ie(n.data?.total_conversations ?? 0)
    ), l = $(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((v) => o(v)), p = [
        {
          label: "Conversations",
          data: d.map((v) => c[v] || 0),
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
        datasets: p
      };
    }), r = $(() => n.options ? n.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += c.parsed.y), d;
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
    return t({ isDark: a }), (c, d) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", b_, [
          e.loading ? (m(), k("div", $_, [...d[2] || (d[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (m(), k("div", v_, [
            l.value.labels && l.value.labels.length ? (m(), k("section", y_, [
              u("div", x_, [
                F(yt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", __, [
                F(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", k_, [
              u("div", w_, [
                u("div", C_, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No conversation count data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), M_ = /* @__PURE__ */ ge(S_, [["__scopeId", "data-v-b33e8627"]]), D_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, T_ = {
  key: 0,
  class: "card-body"
}, A_ = {
  key: 0,
  class: "charts-grid"
}, B_ = { class: "chart-section" }, L_ = { class: "chart-container" }, P_ = { class: "chart-section" }, I_ = { class: "chart-container" }, R_ = {
  key: 1,
  class: "empty-state"
}, F_ = { class: "empty-state-content" }, E_ = { class: "empty-icon-wrapper" }, O_ = {
  key: 1,
  class: "loading-state"
}, V_ = /* @__PURE__ */ le({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = $(() => n.data?.top_agents && n.data.top_agents.length > 0), i = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, v) => (v.total_cost || 0) - (p.total_cost || 0)) : []), l = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, v) => (v.total_tokens || 0) - (p.total_tokens || 0)) : []), r = $(() => {
      const p = i.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const p = l.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((v) => v.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), d = $(() => n.options ? n.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const v = p.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
              return g ? [
                `Total Cost: ${Pe(g.total_cost)}`,
                `Input Cost: ${Pe(g.total_input_tokens_cost)}`,
                `Output Cost: ${Pe(g.total_output_tokens_cost)}`,
                `Cache Read: ${Pe(g.total_read_tokens_cost)}`,
                `Cache Write: ${Pe(g.total_write_tokens_cost)}`
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
            callback: function(p) {
              return Pe(p);
            }
          }
        }
      }
    }), h = $(() => n.options ? n.options : {
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
            title: function(p) {
              return p[0]?.label || "";
            },
            label: function(p) {
              const v = p.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
              return g ? [
                `Total Tokens: ${g.total_tokens.toLocaleString()}`,
                `Input Tokens: ${g.total_input_tokens.toLocaleString()}`,
                `Output Tokens: ${g.total_output_tokens.toLocaleString()}`,
                `Cache Read: ${g.total_read_tokens.toLocaleString()}`,
                `Cache Write: ${g.total_write_tokens.toLocaleString()}`
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
            callback: function(p) {
              return p.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (p, v) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", D_, [
          e.loading ? (m(), k("div", O_, [...v[4] || (v[4] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (m(), k("div", T_, [
            o.value ? (m(), k("div", A_, [
              u("section", B_, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", L_, [
                  F($t, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", P_, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", I_, [
                  F($t, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (m(), k("section", R_, [
              u("div", F_, [
                u("div", E_, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                v[2] || (v[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                v[3] || (v[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), z_ = /* @__PURE__ */ ge(V_, [["__scopeId", "data-v-a5014772"]]), N_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, H_ = {
  key: 0,
  class: "card-body"
}, W_ = {
  key: 0,
  class: "chart-section"
}, j_ = { class: "chart-container" }, Y_ = {
  key: 1,
  class: "empty-state"
}, K_ = { class: "empty-state-content" }, U_ = { class: "empty-icon-wrapper" }, q_ = {
  key: 1,
  class: "loading-state"
}, X_ = /* @__PURE__ */ le({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = $(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = $(() => i.value.length > 0), r = $(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), c = $(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return (o[b] || "#a78bfa") + "80";
      }), v = h.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return o[b] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const b = y.conversations || 0, f = r.value ? b / r.value * 100 : 0;
          return `${y.agent_type} - ${b.toLocaleString()} (${f.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: p,
            borderColor: v,
            borderWidth: 2
          }
        ]
      };
    }), d = $(() => n.options ? n.options : {
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
              const p = (h.label || "").toString(), v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((b, f) => b + (Number(f) || 0), 0), y = g ? v / g * 100 : 0;
              return `${p}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, p) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", N_, [
          e.loading ? (m(), k("div", q_, [...p[2] || (p[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (m(), k("div", H_, [
            l.value ? (m(), k("section", W_, [
              u("div", j_, [
                F(Ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), k("section", Y_, [
              u("div", K_, [
                u("div", U_, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                p[1] || (p[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), G_ = /* @__PURE__ */ ge(X_, [["__scopeId", "data-v-14445b91"]]), Z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = {
  key: 0,
  class: "card-body"
}, J_ = {
  key: 0,
  class: "chart-section"
}, ek = { class: "chart-container" }, tk = {
  key: 1,
  class: "empty-state"
}, nk = { class: "empty-state-content" }, ak = { class: "empty-icon-wrapper" }, sk = {
  key: 1,
  class: "loading-state"
}, ok = /* @__PURE__ */ le({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = $e(Ce(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), l = $(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const b = [...c].sort((f, x) => f.date.localeCompare(x.date));
        return {
          labels: b.map((f) => o(f.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: b.map((f) => Number(f.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, v = Object.keys(d).filter((b) => h[b]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((b) => o(b)), y = v.map((b) => {
        const f = d[b]?.total_cost || 0, x = h[b] || 0;
        return x > 0 ? f / x : 0;
      });
      return {
        labels: g,
        datasets: [
          {
            label: "Mean USD/conv",
            data: y,
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
    }), r = $(() => n.options ? n.options : {
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += Pe(c.parsed.y)), d;
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
              return Pe(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Z_, [
          e.loading ? (m(), k("div", sk, [...d[2] || (d[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-lines-loader" }, [
                u("div", { class: "line line-1" }),
                u("div", { class: "line line-2" }),
                u("div", { class: "line line-3" }),
                u("div", { class: "line line-4" }),
                u("div", { class: "line line-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading chart data...")
            ], -1)
          ])])) : (m(), k("div", Q_, [
            i.value ? (m(), k("section", J_, [
              u("div", ek, [
                F(yt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), k("section", tk, [
              u("div", nk, [
                u("div", ak, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                d[0] || (d[0] = u("p", { class: "empty-title" }, "No daily cost trends data", -1)),
                d[1] || (d[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), ik = /* @__PURE__ */ ge(ok, [["__scopeId", "data-v-1e8204ea"]]), lk = { class: "tabs text-sm" }, rk = ["aria-label"], ck = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], dk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, uk = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ae([]), o = `tabs-${Ue()}`, i = (g) => `${o}-tab-${g}`, l = $(
      () => n.items.map((g, y) => g.disabled ? -1 : y).filter((g) => g >= 0)
    );
    function r(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const y = r(g), f = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${f} cursor-not-allowed opacity-40` : y ? `${f} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${f} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, y) {
      g === y || n.items.find((f) => f.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: y }));
    }
    function h(g, y) {
      a("tab-click", { value: g.value, originalEvent: y }), !g.disabled && (d(g.value, n.modelValue), We(() => {
        s.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function p(g, y) {
      const b = n.items.length;
      if (b === 0) return 0;
      let f = g;
      for (let x = 0; x < b; x++)
        if (f = (f + y + b) % b, !n.items[f]?.disabled) return f;
      return g;
    }
    async function v(g, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let f = y;
      g.key === "ArrowLeft" ? f = p(y, -1) : g.key === "ArrowRight" ? f = p(y, 1) : g.key === "Home" ? f = l.value[0] ?? 0 : g.key === "End" && (f = l.value[l.value.length - 1] ?? y);
      const x = n.items[f];
      !x || x.disabled || (d(x.value, n.modelValue), await We(), s.value[f]?.focus());
    }
    return (g, y) => (m(), k("div", lk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Q([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), k(ne, null, he(e.items, (b, f) => (m(), k("button", {
          id: i(b.value),
          key: b.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": r(b),
          "aria-disabled": b.disabled === !0,
          tabindex: r(b) ? 0 : -1,
          class: Q(c(b)),
          onClick: (x) => h(b, x),
          onKeydown: (x) => v(x, f)
        }, [
          u("span", {
            class: Q(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (m(), J(Ft(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", dk, D(b.label), 1)
          ], 2)
        ], 42, ck))), 128))
      ], 10, rk),
      g.$slots.default ? (m(), J(Te, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: B(() => [
          (m(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Se(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : z("", !0)
    ]));
  }
}), fl = /* @__PURE__ */ ge(uk, [["__scopeId", "data-v-f9c367eb"]]), hk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, fk = {
  key: 0,
  class: "loading-state"
}, gk = {
  key: 1,
  class: "card-body"
}, mk = {
  key: 0,
  class: "model-usage-table-block"
}, pk = { class: "w-full min-w-0" }, bk = {
  key: 1,
  class: "empty-state"
}, vk = { class: "empty-state-content" }, yk = { class: "empty-icon-wrapper" }, xk = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i } = $e(Ce(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = ae("by_model"), c = $(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = $(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = $(
      () => Object.entries(c.value).map(([g, y]) => ({
        id: g,
        name: g,
        avgCost: v(y.avg_cost_per_message),
        avgTokens: p(y.avg_tokens_per_message),
        messageCount: p(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: p(y.total_tokens)
      }))
    ), p = (g) => g == null ? "0" : ie(g), v = (g) => g == null ? "$0.00" : Pe(g);
    return t({ isDark: i }), (g, y) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", hk, [
          e.loading ? (m(), k("div", fk, [...y[1] || (y[1] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading model usage data...")
            ], -1)
          ])])) : (m(), k("div", gk, [
            F(fl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (b) => r.value = b),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: B(() => [
                c.value && Object.keys(c.value).length > 0 ? (m(), k("div", mk, [
                  u("div", pk, [
                    F(rt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (m(), k("div", bk, [
                  u("div", vk, [
                    u("div", yk, [
                      F(T(nt), { class: "empty-icon" })
                    ]),
                    y[2] || (y[2] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    y[3] || (y[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
                  ])
                ]))
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), _k = /* @__PURE__ */ ge(xk, [["__scopeId", "data-v-0c23d620"]]), kk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wk = {
  key: 0,
  class: "loading-state"
}, Ck = {
  key: 1,
  class: "card-body"
}, $k = {
  key: 0,
  class: "message-roles-table-block"
}, Sk = { class: "w-full min-w-0" }, Mk = {
  key: 1,
  class: "empty-state"
}, Dk = { class: "empty-state-content" }, Tk = { class: "empty-icon-wrapper" }, Ak = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, { isDark: i } = $e(Ce(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = $(() => a.data?.total_by_role || {}), d = $(
      () => l.map((y) => ({
        id: y,
        role: g(y),
        avgCost: v(c.value[y]?.avg_cost_per_message),
        avgTokens: p(c.value[y]?.avg_tokens_per_message),
        messageCount: p(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: p(c.value[y]?.total_tokens)
      }))
    ), h = $(() => Object.keys(c.value).length > 0), p = (y) => y == null ? "0" : ie(y), v = (y) => y == null ? "$0.00" : Pe(y), g = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, b) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", kk, [
          e.loading ? (m(), k("div", wk, [...b[0] || (b[0] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading message role data...")
            ], -1)
          ])])) : (m(), k("div", Ck, [
            h.value ? (m(), k("div", $k, [
              u("div", Sk, [
                F(rt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (m(), k("div", Mk, [
              u("div", Dk, [
                u("div", Tk, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                b[1] || (b[1] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                b[2] || (b[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Bk = /* @__PURE__ */ ge(Ak, [["__scopeId", "data-v-362c0dbc"]]), Lk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Pk = {
  key: 0,
  class: "card-body"
}, Ik = {
  key: 0,
  class: "chart-section"
}, Rk = { class: "chart-container" }, Fk = { class: "kpi-grid" }, Ek = {
  key: 1,
  class: "empty-state"
}, Ok = { class: "empty-state-content" }, Vk = { class: "empty-icon-wrapper" }, zk = {
  key: 1,
  class: "loading-state"
}, Nk = /* @__PURE__ */ le({
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
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i, colors: l } = $e(Ce(a, "theme")), r = {
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
    }, c = (x) => x.agent_type || x.agent_id || x.agent_name || "", d = (x) => x.agent_name ? x.agent_name : c(x).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (x) => {
      const _ = c(x).toLowerCase();
      for (const [w, C] of Object.entries(r))
        if (_.includes(w))
          return C;
      return "#9ca3af";
    }, p = $(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), v = $(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((x, _) => x + _.conversations, 0)), g = $(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((x, _) => x + _.total_cost, 0)), y = $(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : g.value / v.value), b = $(() => {
      const x = p.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const _ = x.map((M) => d(M)), w = x.map((M) => M.avg_cost_per_conversation), C = x.map((M) => h(M));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: C.map((M) => `${M}80`),
            borderColor: C,
            borderWidth: 1
          }
        ]
      };
    }), f = $(() => a.options ? a.options : {
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
            label: function(x) {
              const _ = p.value[x.dataIndex];
              return [
                `Cost: ${Pe(x.parsed.x)}`,
                `Conversations: ${ie(_.conversations)}`,
                `Total Cost: ${Pe(_.total_cost)}`
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
            callback: function(x) {
              return Pe(x);
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
    return t({ isDark: i }), (x, _) => (m(), J(ke, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), J(T(Ve), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: B(() => [
        u("div", Lk, [
          e.loading ? (m(), k("div", zk, [..._[2] || (_[2] = [
            u("div", { class: "loading-container" }, [
              u("div", { class: "chart-bars-loader" }, [
                u("div", { class: "bar bar-1" }),
                u("div", { class: "bar bar-2" }),
                u("div", { class: "bar bar-3" }),
                u("div", { class: "bar bar-4" }),
                u("div", { class: "bar bar-5" })
              ]),
              u("p", { class: "loading-text" }, "Loading agent costs...")
            ], -1)
          ])])) : (m(), k("div", Pk, [
            b.value.labels && b.value.labels.length ? (m(), k("section", Ik, [
              u("div", Rk, [
                F($t, {
                  data: b.value,
                  options: f.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Fk, [
                F(T(ve), {
                  title: "Total Agents",
                  value: String(p.value.length)
                }, null, 8, ["value"]),
                F(T(ve), {
                  title: "Total Conversations",
                  value: T(ie)(v.value)
                }, null, 8, ["value"]),
                F(T(ve), {
                  title: "Total Cost",
                  value: T(Pe)(g.value)
                }, null, 8, ["value"]),
                F(T(ve), {
                  title: "Avg Cost / Conv.",
                  value: T(Pe)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", Ek, [
              u("div", Ok, [
                u("div", Vk, [
                  F(T(nt), { class: "empty-icon" })
                ]),
                _[0] || (_[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                _[1] || (_[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Hk = /* @__PURE__ */ ge(Nk, [["__scopeId", "data-v-49068ad7"]]), Wk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, jk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Yk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Kk = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Uk = ["checked", "aria-label"], qk = ["aria-sort", "onClick"], Xk = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Gk = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Zk = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Qk = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Jk = ["checked", "aria-label", "onChange"], e2 = /* @__PURE__ */ le({
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
    sortDirection: { default: null }
  },
  emits: ["update:selectedKeys", "sort"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ae(null);
    function o(C) {
      return `cell-${C}`;
    }
    function i(C) {
      return C === "center" ? "text-center" : C === "right" ? "text-right" : "text-left";
    }
    function l(C, M) {
      if (typeof n.rowKey == "function")
        return n.rowKey(C);
      const S = C[n.rowKey];
      return S != null ? String(S) : `__index_${M}`;
    }
    function r(C, M) {
      return C[M];
    }
    function c(C) {
      return C == null || typeof C == "object" ? "" : String(C);
    }
    function d(C, M) {
      return l(C, M);
    }
    const h = $(
      () => n.rows.map((C, M) => l(C, M))
    );
    function p(C, M) {
      const S = l(C, M);
      return n.selectedKeys.includes(S);
    }
    const v = $(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((C) => n.selectedKeys.includes(C))), g = $(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const C = h.value.filter((M) => n.selectedKeys.includes(M));
      return C.length > 0 && C.length < n.rows.length;
    });
    Oe(
      [g, v, () => n.selectable],
      async () => {
        await We();
        const C = s.value;
        C && (C.indeterminate = g.value && !v.value);
      },
      { immediate: !0 }
    );
    function y() {
      if (n.selectable)
        if (v.value) {
          const C = n.selectedKeys.filter((M) => !h.value.includes(M));
          a("update:selectedKeys", C);
        } else {
          const C = new Set(n.selectedKeys);
          h.value.forEach((M) => C.add(M)), a("update:selectedKeys", [...C]);
        }
    }
    function b(C, M) {
      if (!n.selectable) return;
      const S = l(C, M);
      n.selectedKeys.includes(S) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((V) => V !== S)
      ) : a("update:selectedKeys", [...n.selectedKeys, S]);
    }
    function f(C, M) {
      const S = l(C, M);
      return `${n.ariaLabelSelectRow} ${S}`;
    }
    function x(C) {
      a("sort", C);
    }
    function _(C) {
      return n.sortKey === C && n.sortDirection != null;
    }
    function w(C) {
      return _(C) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (C, M) => (m(), k("div", Wk, [
      u("div", jk, [
        u("table", {
          class: Q([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Yk, [
              e.selectable ? (m(), k("th", Kk, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: y
                }, null, 40, Uk)
              ])) : z("", !0),
              (m(!0), k(ne, null, he(e.columns, (S) => (m(), k("th", {
                key: S.key,
                scope: "col",
                class: Q([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(S.align),
                  S.headerClass ?? ""
                ])
              }, [
                S.sortable ? (m(), k("button", {
                  key: 0,
                  type: "button",
                  class: Q(["kiut-table-sort-btn inline-flex items-center gap-1", i(S.align)]),
                  "aria-sort": w(S.key),
                  onClick: (I) => x(S.key)
                }, [
                  u("span", null, D(S.label), 1),
                  u("span", Xk, [
                    _(S.key) ? (m(), k(ne, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), k("span", Gk, "↑")) : e.sortDirection === "desc" ? (m(), k("span", Zk, "↓")) : z("", !0)
                    ], 64)) : (m(), k(ne, { key: 1 }, [
                      M[0] || (M[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      M[1] || (M[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, qk)) : (m(), k(ne, { key: 1 }, [
                  Be(D(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(ne, null, he(e.rows, (S, I) => (m(), k("tr", {
              key: d(S, I),
              class: "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (m(), k("td", Qk, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(S, I),
                  "aria-label": f(S, I),
                  onChange: (V) => b(S, I)
                }, null, 40, Jk)
              ])) : z("", !0),
              (m(!0), k(ne, null, he(e.columns, (V) => (m(), k("td", {
                key: V.key,
                class: Q([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(V.align),
                  V.cellClass ?? ""
                ])
              }, [
                Se(C.$slots, o(V.key), {
                  row: S,
                  column: V,
                  value: r(S, V.key)
                }, () => [
                  Be(D(c(r(S, V.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), t2 = /* @__PURE__ */ ge(e2, [["__scopeId", "data-v-0bb9a9aa"]]);
function n2(e, t) {
  return m(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function a2(e, t) {
  return m(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const s2 = ["aria-label"], o2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, i2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, l2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, r2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], c2 = { class: "truncate" }, d2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, u2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, h2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, f2 = ["aria-label", "onClick"], g2 = ["aria-label", "onClick"], m2 = ["aria-label"], p2 = ["aria-label"], b2 = {
  key: 1,
  class: "space-y-2"
}, v2 = ["for"], y2 = ["id", "placeholder", "onKeydown"], x2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, _2 = ["aria-label"], k2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, w2 = ["checked", "onChange"], C2 = { class: "min-w-0 flex-1" }, $2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, S2 = { class: "flex flex-wrap items-end gap-2" }, M2 = { class: "min-w-[120px] flex-1" }, D2 = ["for"], T2 = ["id"], A2 = { class: "min-w-[120px] flex-1" }, B2 = ["for"], L2 = ["id"], P2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = Ja(), i = `${`kiut-filters-${Ue()}`}-panel`, l = ae(null), r = /* @__PURE__ */ new Map(), c = ae(null), d = ae(!1), h = ae({}), p = ae(null), v = ae(""), g = ae([]), y = ae(""), b = ae(""), f = $(() => c.value ? n.filterDefinitions.find((P) => P.id === c.value) ?? null : null), x = $(() => {
      const P = f.value;
      if (P)
        return P.type === "text" ? v.value : P.type === "select" ? g.value : { start: y.value, end: b.value };
    });
    function _(P, Y) {
      Y && Y instanceof HTMLElement ? r.set(P, Y) : r.delete(P);
    }
    function w(P) {
      return n.modelValue[P];
    }
    function C(P) {
      if (P == null) return [];
      if (Array.isArray(P))
        return P.filter((Y) => typeof Y == "string" && Y.trim() !== "");
      if (typeof P == "string") {
        const Y = P.trim();
        return Y ? [Y] : [];
      }
      return [];
    }
    function M(P, Y) {
      if (Y == null) return !0;
      if (P.type === "text") return String(Y).trim() === "";
      if (P.type === "select") return C(Y).length === 0;
      if (P.type === "dateRange") {
        const ee = Y;
        return !ee?.start?.trim() || !ee?.end?.trim();
      }
      return !0;
    }
    const S = $(
      () => n.filterDefinitions.some((P) => !M(P, w(P.id)))
    ), I = $(() => {
      const P = [];
      for (const Y of n.filterDefinitions) {
        const ee = w(Y.id);
        if (!M(Y, ee)) {
          if (Y.type === "text")
            P.push({ kind: "text", def: Y, key: Y.id });
          else if (Y.type === "dateRange")
            P.push({ kind: "dateRange", def: Y, key: Y.id });
          else if (Y.type === "select")
            for (const ce of C(ee))
              P.push({
                kind: "select",
                def: Y,
                optionValue: ce,
                key: `${Y.id}::${ce}`
              });
        }
      }
      return P;
    });
    function V(P) {
      return P.type !== "select" ? 0 : C(w(P.id)).length;
    }
    function E(P) {
      const Y = w(P.id), ee = P.label.replace(/^\+\s*/, "");
      if (P.type === "text") return `${ee}: ${String(Y ?? "").trim()}`;
      if (P.type === "select") {
        const et = C(Y).map((dt) => P.options.find((xt) => xt.value === dt)?.label ?? dt);
        return `${ee}: ${et.join(", ")}`;
      }
      const ce = Y, pe = L(ce.start), xe = L(ce.end);
      return `${ee}: ${pe} – ${xe}`;
    }
    function A(P) {
      return P.kind === "text" || P.kind === "dateRange" ? E(P.def) : P.def.options.find((ee) => ee.value === P.optionValue)?.label ?? P.optionValue;
    }
    function L(P) {
      if (!P) return "";
      const Y = je(P, "YYYY-MM-DD", !0);
      return Y.isValid() ? Y.format("L") : P;
    }
    function O(P) {
      const Y = c.value === P.id && d.value, ee = !M(P, w(P.id));
      return Y || ee ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function X(P) {
      return M(P, w(P.id)) ? K(P) : `Editar filtro ${P.label.replace(/^\+\s*/, "")}`;
    }
    function G(P) {
      const Y = w(P.id);
      if (P.type === "text") {
        v.value = Y != null ? String(Y) : "";
        return;
      }
      if (P.type === "select") {
        g.value = [...C(Y)];
        return;
      }
      const ee = Y;
      y.value = ee?.start?.trim() ?? "", b.value = ee?.end?.trim() ?? "";
    }
    function se() {
      const P = f.value;
      if (!P || P.type !== "select") return;
      const Y = { ...n.modelValue };
      g.value.length === 0 ? delete Y[P.id] : Y[P.id] = [...g.value], a("update:modelValue", Y), a("change", Y);
    }
    function oe(P) {
      const Y = g.value.indexOf(P);
      Y >= 0 ? g.value = g.value.filter((ee, ce) => ce !== Y) : g.value = [...g.value, P], se();
    }
    function me(P) {
      if (!P) return;
      p.value = P;
      const Y = P.getBoundingClientRect(), ee = 300;
      let ce = Y.left;
      const pe = window.innerWidth - ee - 12;
      ce > pe && (ce = Math.max(12, pe)), ce < 12 && (ce = 12);
      const xe = Y.bottom + 8;
      h.value = {
        top: `${xe}px`,
        left: `${ce}px`,
        width: `${Math.min(ee, window.innerWidth - 24)}px`
      };
    }
    function ye(P, Y) {
      if (c.value === P.id && d.value) {
        fe();
        return;
      }
      d.value && c.value !== P.id && fe(), c.value = P.id, d.value = !0, G(P), We().then(async () => {
        me(Y.currentTarget), await We(), H();
      });
    }
    function U(P, Y) {
      if (c.value === P.id && d.value) {
        fe();
        return;
      }
      d.value && c.value !== P.id && fe(), c.value = P.id, d.value = !0, G(P), We().then(async () => {
        const ee = r.get(P.id) ?? Y.currentTarget;
        me(ee), await We(), H();
      });
    }
    function H() {
      const P = l.value;
      if (!P) return;
      P.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function Z() {
      d.value = !1, c.value = null, p.value = null;
    }
    function te(P) {
      const Y = f.value;
      if (!Y) return;
      if (Y.type === "text") {
        v.value = P != null ? String(P) : "";
        return;
      }
      if (Y.type === "select") {
        g.value = Array.isArray(P) ? P.filter((ce) => typeof ce == "string") : C(P);
        return;
      }
      const ee = P;
      y.value = ee?.start?.trim() ?? "", b.value = ee?.end?.trim() ?? "";
    }
    function fe() {
      const P = f.value;
      if (!P) return;
      if (P.type === "text") {
        const pe = v.value.trim(), xe = { ...n.modelValue };
        pe === "" ? delete xe[P.id] : xe[P.id] = pe, a("update:modelValue", xe), a("change", xe), Z();
        return;
      }
      if (P.type === "select") {
        se(), Z();
        return;
      }
      const Y = y.value.trim(), ee = b.value.trim(), ce = { ...n.modelValue };
      !Y || !ee || Y > ee ? delete ce[P.id] : ce[P.id] = { start: Y, end: ee }, a("update:modelValue", ce), a("change", ce), Z();
    }
    function we(P) {
      const Y = { ...n.modelValue };
      delete Y[P], a("update:modelValue", Y), a("change", Y), c.value === P && Z();
    }
    function Me(P) {
      if (P.kind === "text" || P.kind === "dateRange") {
        we(P.def.id);
        return;
      }
      const Y = { ...n.modelValue }, ce = C(Y[P.def.id]).filter((pe) => pe !== P.optionValue);
      ce.length === 0 ? delete Y[P.def.id] : Y[P.def.id] = ce, a("update:modelValue", Y), a("change", Y), c.value === P.def.id && G(P.def);
    }
    function R() {
      const P = {};
      a("update:modelValue", P), a("change", P), Z();
    }
    const N = $(() => {
      const P = f.value;
      return P ? `Editar filtro: ${P.label}` : "Filtro";
    });
    function j(P) {
      const Y = P.def.label.replace(/^\+\s*/, "");
      return P.kind === "select" ? `Quitar ${P.def.options.find((pe) => pe.value === P.optionValue)?.label ?? P.optionValue} del filtro ${Y}` : `Quitar filtro ${Y}`;
    }
    function de(P) {
      const Y = P.def.label.replace(/^\+\s*/, "");
      if (P.kind === "select") {
        const ce = P.def.options.find((pe) => pe.value === P.optionValue)?.label ?? P.optionValue;
        return `Editar filtro ${Y}: ${ce}`;
      }
      return `Editar filtro ${Y}`;
    }
    function K(P) {
      return `Añadir filtro ${P.label.replace(/^\+\s*/, "")}`;
    }
    const W = $(() => n.clearLabel);
    function q(P) {
      if (!d.value || !l.value) return;
      const Y = P.target;
      if (!(l.value.contains(Y) || (Y instanceof Element ? Y : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ce of r.values())
          if (ce?.contains(Y)) return;
        fe();
      }
    }
    function re(P) {
      P.key === "Escape" && d.value && (P.preventDefault(), Z());
    }
    function ue() {
      !d.value || !p.value || me(p.value);
    }
    return tt(() => {
      document.addEventListener("mousedown", q, !0), window.addEventListener("keydown", re, !0), window.addEventListener("resize", ue);
    }), si(() => {
      document.removeEventListener("mousedown", q, !0), window.removeEventListener("keydown", re, !0), window.removeEventListener("resize", ue);
    }), Oe(
      () => n.modelValue,
      () => {
        const P = f.value;
        P && d.value && !s.panel && G(P);
      },
      { deep: !0 }
    ), (P, Y) => (m(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", o2, [
        u("span", i2, D(e.label), 1),
        u("div", l2, [
          (m(!0), k(ne, null, he(e.filterDefinitions, (ee) => (m(), k("button", {
            key: `pill-${ee.id}`,
            ref_for: !0,
            ref: (ce) => _(ee.id, ce),
            type: "button",
            class: Q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", O(ee)]),
            "aria-label": X(ee),
            "aria-expanded": c.value === ee.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ee.id ? i : void 0,
            onClick: (ce) => U(ee, ce)
          }, [
            F(T(n2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", c2, D(ee.label), 1),
            ee.type === "select" && V(ee) > 0 ? (m(), k("span", d2, D(V(ee)), 1)) : z("", !0)
          ], 10, r2))), 128))
        ])
      ]),
      S.value ? (m(), k("div", u2, [
        u("div", h2, [
          (m(!0), k(ne, null, he(I.value, (ee) => (m(), k("div", {
            key: ee.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": de(ee),
              onClick: (ce) => ye(ee.def, ce)
            }, [
              Se(P.$slots, "formatChip", {
                filter: ee.def,
                value: w(ee.def.id),
                optionValue: ee.kind === "select" ? ee.optionValue : void 0
              }, () => [
                Be(D(A(ee)), 1)
              ], !0)
            ], 8, f2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": j(ee),
              onClick: (ce) => Me(ee)
            }, [
              F(T(a2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, g2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": W.value,
          onClick: R
        }, D(e.clearLabel), 9, m2)
      ])) : z("", !0),
      (m(), J(Fn, { to: "body" }, [
        c.value && d.value ? (m(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": N.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: De(h.value),
          onKeydown: Y[3] || (Y[3] = Xe(() => {
          }, ["stop"]))
        }, [
          f.value ? (m(), k(ne, { key: 0 }, [
            P.$slots.panel ? Se(P.$slots, "panel", {
              key: 0,
              filter: f.value,
              close: fe,
              value: x.value,
              updateValue: te
            }, void 0, !0) : (m(), k("div", b2, [
              f.value.type === "text" ? (m(), k(ne, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(f.value.label), 9, v2),
                lt(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Y[0] || (Y[0] = (ee) => v.value = ee),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: f.value.placeholder ?? "…",
                  onKeydown: En(Xe(fe, ["prevent"]), ["enter"])
                }, null, 40, y2), [
                  [sn, v.value]
                ])
              ], 64)) : f.value.type === "select" ? (m(), k(ne, { key: 1 }, [
                u("p", x2, D(f.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": f.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), k(ne, null, he(f.value.options, (ee) => (m(), k("li", {
                    key: ee.value
                  }, [
                    u("label", k2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(ee.value),
                        onChange: (ce) => oe(ee.value)
                      }, null, 40, w2),
                      u("span", C2, D(ee.label), 1)
                    ])
                  ]))), 128))
                ], 8, _2)
              ], 64)) : f.value.type === "dateRange" ? (m(), k(ne, { key: 2 }, [
                u("p", $2, D(f.value.label), 1),
                u("div", S2, [
                  u("div", M2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, D2),
                    lt(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Y[1] || (Y[1] = (ee) => y.value = ee),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, T2), [
                      [sn, y.value]
                    ])
                  ]),
                  u("div", A2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, B2),
                    lt(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Y[2] || (Y[2] = (ee) => b.value = ee),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, L2), [
                      [sn, b.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, p2)) : z("", !0)
      ]))
    ], 8, s2));
  }
}), I2 = /* @__PURE__ */ ge(P2, [["__scopeId", "data-v-f38e0100"]]), R2 = { class: "font-sans" }, F2 = ["for"], E2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], O2 = ["id"], V2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = oi("$pcForm", null), i = `kiut-input-text-${Ue()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? s.name ?? ""), d = ae(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (f) => {
        d.value = f ?? "";
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const h = $(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? d.value : d.value), p = $(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(f) {
      const x = f.target.value;
      d.value = x, a("update:modelValue", x);
      const _ = o?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(f);
    }
    function g(f) {
      const x = o?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(f);
    }
    function y(f) {
      const x = o?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(f);
    }
    const b = $(() => {
      const { name: f, id: x, type: _, ...w } = s;
      return w;
    });
    return (f, x) => (m(), k("div", R2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ct))
      }, D(e.label), 11, F2)) : z("", !0),
      u("input", Et(b.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [T(mt), p.value ? T(It) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": p.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: g,
        onBlur: y
      }), null, 16, E2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, O2)) : z("", !0)
    ]));
  }
}), z2 = { class: "font-sans" }, N2 = ["for"], H2 = { class: "relative" }, W2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], j2 = ["aria-label"], Y2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, K2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, U2 = ["id"], q2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = oi("$pcForm", null), i = `kiut-input-password-${Ue()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? s.name ?? ""), d = ae(!1), h = ae(n.modelValue ?? "");
    Oe(
      () => n.modelValue,
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), tt(() => {
      o && c.value && o.register?.(c.value, {});
    }), pt(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const p = $(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? h.value : h.value), v = $(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(x) {
      const _ = x.target.value;
      h.value = _, a("update:modelValue", _);
      const w = o?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function y(x) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(x);
    }
    function b(x) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(x);
    }
    const f = $(() => {
      const { name: x, id: _, ...w } = s;
      return w;
    });
    return (x, _) => (m(), k("div", z2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ct))
      }, D(e.label), 11, N2)) : z("", !0),
      u("div", H2, [
        u("input", Et(f.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(mt), v.value ? T(It) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: p.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: g,
          onChange: y,
          onBlur: b
        }), null, 16, W2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (m(), k("svg", K2, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (m(), k("svg", Y2, [..._[1] || (_[1] = [
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
        ], 8, j2)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, U2)) : z("", !0)
    ]));
  }
}), X2 = { class: "font-sans" }, G2 = ["for"], Z2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Q2 = ["id"], J2 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-textarea-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (m(), k("div", X2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ct))
      }, D(e.label), 11, G2)) : z("", !0),
      lt(u("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: Q([T(oy), e.invalid ? T(It) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Z2), [
        [sn, l.value]
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Q2)) : z("", !0)
    ]));
  }
}), ew = { class: "font-sans" }, tw = ["for"], nw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], aw = ["for"], sw = ["title"], ow = ["aria-label"], iw = ["id"], lw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-file-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = ae(null), r = $(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, p) => (m(), k("div", ew, [
      e.label ? (m(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ct))
      }, D(e.label), 11, tw)) : z("", !0),
      u("div", {
        class: Q([
          T(mt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(It) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
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
        }, null, 40, nw),
        u("label", {
          for: o.value,
          class: Q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          F(T(Mm), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Be(" " + D(e.chooseLabel), 1)
        ], 10, aw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, sw),
        e.modelValue && !e.disabled ? (m(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          F(T(sl), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, ow)) : z("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, iw)) : z("", !0)
    ]));
  }
}), rw = { class: "font-sans" }, cw = ["for"], dw = { class: "relative" }, uw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], hw = ["id"], fw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-datetime-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (m(), k("div", rw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ct))
      }, D(e.label), 11, cw)) : z("", !0),
      u("div", dw, [
        F(T(_s), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: Q([
            T(mt),
            "pl-10",
            e.invalid ? T(It) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, uw)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, hw)) : z("", !0)
    ]));
  }
}), gw = { class: "font-sans" }, mw = ["for"], pw = { class: "relative" }, bw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], vw = ["id"], yw = /* @__PURE__ */ le({
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
      const p = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!p) return null;
      const v = Number(p[1]), g = Number(p[2]);
      return !Number.isInteger(v) || !Number.isInteger(g) || v < 0 || v > 23 || g < 0 || g > 59 ? null : `${String(v).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Ue()}`, l = $(() => s.id ?? i), r = $(() => `${l.value}-err`), c = $(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function d(h) {
      const p = h.target.value;
      o("update:modelValue", a(p));
    }
    return (h, p) => (m(), k("div", gw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ct))
      }, D(e.label), 11, mw)) : z("", !0),
      u("div", pw, [
        F(T(Tm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Q([
            T(mt),
            "pl-10",
            e.invalid ? T(It) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, bw)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, vw)) : z("", !0)
    ]));
  }
}), xw = { class: "font-sans" }, _w = ["for"], kw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, ww = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Cw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, $w = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Sw = { class: "min-w-0 text-left leading-snug" }, Mw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Dw = { class: "min-w-0 text-right leading-snug" }, Tw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Aw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Bw = ["id"], Lw = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-range-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = $(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = $(() => !!(n.captionMin || n.captionMax)), d = $(() => {
      const { min: v, max: g, modelValue: y } = n;
      if (g === v) return 0;
      const b = (y - v) / (g - v);
      return Math.min(100, Math.max(0, b * 100));
    }), h = $(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function p(v) {
      const g = Number(v.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (v, g) => (m(), k("div", xw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ct))
      }, D(e.label), 11, _w)) : z("", !0),
      u("div", {
        class: Q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), k("p", kw, D(e.captionMax), 1)) : z("", !0),
        u("div", {
          class: Q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: De(h.value)
        }, [
          u("input", {
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
            class: Q([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, ww)
        ], 6),
        e.orientation === "horizontal" && r.value ? (m(), k("p", Cw, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (m(), k("div", $w, [
          u("span", Sw, D(e.captionMin), 1),
          u("span", Mw, D(e.caption), 1),
          u("span", Dw, D(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), k("p", Tw, D(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (m(), k("p", Aw, D(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Bw)) : z("", !0)
    ]));
  }
}), Pw = /* @__PURE__ */ ge(Lw, [["__scopeId", "data-v-a1343418"]]), Iw = { class: "font-sans" }, Rw = ["for"], Fw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Ew = ["id"], Ow = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-input-number-${Ue()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = $(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const p = Number(h);
      a("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (d, h) => (m(), k("div", Iw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ct))
      }, D(e.label), 11, Rw)) : z("", !0),
      u("input", {
        id: o.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: Q([
          T(mt),
          e.invalid ? T(It) : "",
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
      }, null, 42, Fw),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Ew)) : z("", !0)
    ]));
  }
}), Vw = { class: "font-sans" }, zw = ["for"], Nw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Hw = ["disabled"], Ww = ["id"], jw = "#3b82f6", Yw = "#aabbcc", Kw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Uw = /* @__PURE__ */ le({
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
    function n(g) {
      const y = g.trim(), b = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (b) return `#${b[1].toLowerCase()}`;
      const f = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (f) {
        const [x, _, w] = f[1].split("");
        return `#${x}${x}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? jw;
    }
    const s = e, o = t, i = `kiut-input-color-${Ue()}`, l = $(() => s.id ?? i), r = $(() => `${l.value}-err`), c = $(() => a(s.modelValue)), d = ae(c.value), h = ae(!1);
    Oe(c, (g) => {
      h.value || (d.value = g);
    });
    function p(g) {
      const y = g.target, b = n(y.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, o("update:modelValue", g)) : d.value = c.value;
    }
    return Oe(d, (g) => {
      if (!h.value) return;
      const y = n(g);
      y && o("update:modelValue", y);
    }), (g, y) => (m(), k("div", Vw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ct))
      }, D(e.label), 11, zw)) : z("", !0),
      u("div", {
        class: Q([
          Kw,
          e.invalid ? T(It) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        u("input", {
          id: l.value,
          type: "color",
          value: c.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, Nw),
        e.showHexInput ? lt((m(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (b) => d.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Yw,
          onFocus: y[1] || (y[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, Hw)), [
          [sn, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, Ww)) : z("", !0)
    ]));
  }
}), qw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Xw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Gw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Zw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, Qw = { class: "truncate" }, Jw = ["aria-selected", "onClick", "onMouseenter"], e5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, t5 = { class: "min-w-0 flex-1" }, n5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-multiselect-${Ue()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ae(null), c = ae(null), d = ae(!1), h = ae(0), p = $(() => n.options.filter((E) => !E.disabled)), v = $(() => new Set(n.modelValue ?? [])), g = $(
      () => n.options.filter((E) => v.value.has(E.value))
    ), y = $(() => {
      const E = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", A = g.value.length;
      return A === 0 ? E : `${E}, ${A} seleccionada${A === 1 ? "" : "s"}`;
    });
    function b(E) {
      return `${String(E.value)}-${E.label}`;
    }
    function f(E) {
      return v.value.has(E.value);
    }
    function x(E, A) {
      const L = f(E), O = h.value === A;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && O ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(E) {
      const A = [...n.modelValue ?? []], L = A.indexOf(E.value);
      L >= 0 ? A.splice(L, 1) : A.push(E.value), a("update:modelValue", A);
    }
    function w() {
      const E = p.value;
      if (E.length === 0) {
        h.value = 0;
        return;
      }
      const A = v.value, L = E.findIndex((O) => A.has(O.value));
      h.value = L >= 0 ? L : 0;
    }
    function C() {
      n.disabled || (d.value = !d.value);
    }
    function M(E) {
      E.stopPropagation(), !n.disabled && (C(), d.value && (w(), We(() => c.value?.focus())));
    }
    function S(E) {
      if (!d.value) return;
      const A = r.value;
      A && !A.contains(E.target) && (d.value = !1);
    }
    function I(E) {
      n.disabled || (E.key === "ArrowDown" || E.key === "Enter" || E.key === " ") && (E.preventDefault(), d.value || (d.value = !0, w(), We(() => c.value?.focus())));
    }
    function V(E) {
      const A = p.value;
      if (A.length !== 0) {
        if (E.key === "Escape") {
          E.preventDefault(), d.value = !1;
          return;
        }
        if (E.key === "ArrowDown") {
          E.preventDefault(), h.value = Math.min(h.value + 1, A.length - 1);
          return;
        }
        if (E.key === "ArrowUp") {
          E.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (E.key === "Enter" || E.key === " ") {
          E.preventDefault();
          const L = A[h.value];
          L && _(L);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", S);
    }), pt(() => {
      document.removeEventListener("click", S);
    }), (E, A) => (m(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Q([
          T(mt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: M,
        onKeydown: I
      }, [
        u("div", Xw, [
          g.value.length === 0 ? (m(), k("span", Gw, D(e.placeholder), 1)) : (m(), k("div", Zw, [
            (m(!0), k(ne, null, he(g.value, (L) => (m(), k("span", {
              key: b(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", Qw, D(L.label), 1)
            ]))), 128))
          ]))
        ]),
        F(T(ks), {
          class: Q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, qw),
      lt(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Xe(V, ["stop"])
      }, [
        (m(!0), k(ne, null, he(p.value, (L, O) => (m(), k("li", {
          key: b(L),
          role: "option",
          "aria-selected": f(L),
          class: Q(x(L, O)),
          onClick: Xe((X) => _(L), ["stop"]),
          onMouseenter: (X) => h.value = O
        }, [
          u("span", e5, [
            f(L) ? (m(), J(T(cl), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", t5, D(L.label), 1)
        ], 42, Jw))), 128))
      ], 544), [
        [bn, d.value]
      ])
    ], 512));
  }
}), a5 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], s5 = { class: "sr-only" }, o5 = /* @__PURE__ */ le({
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
    return (o, i) => (m(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: Q([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: s,
      onKeydown: [
        En(Xe(s, ["prevent", "stop"]), ["space"]),
        En(Xe(s, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: Q(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", s5, D(e.ariaLabel), 1)
    ], 42, a5));
  }
}), i5 = { class: "font-sans" }, l5 = ["for"], r5 = { class: "flex gap-2" }, c5 = { class: "w-[7.5rem] shrink-0" }, d5 = { class: "min-w-0 flex-1" }, u5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], h5 = ["id"], f5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `kiut-phone-${Ue()}`, o = $(() => n.id ?? `${s}-num`), i = $(() => `${o.value}-err`), l = $({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = $({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (m(), k("div", i5, [
      e.label ? (m(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ct))
      }, D(e.label), 11, l5)) : z("", !0),
      u("div", r5, [
        u("div", c5, [
          F(ws, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", d5, [
          lt(u("input", {
            id: o.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Q([T(mt), e.invalid ? T(It) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, u5), [
            [sn, r.value]
          ])
        ])
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(St)),
        role: "alert"
      }, D(e.errorText), 11, h5)) : z("", !0)
    ]));
  }
}), g5 = ["role", "aria-label"], m5 = { class: "flex flex-wrap gap-2" }, p5 = ["aria-checked", "role", "onClick"], b5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, v5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, y5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, x5 = /* @__PURE__ */ le({
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
    const n = e, a = t, s = $(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(r) {
      return n.multiple ? s.value.includes(r.value) : n.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(r) {
      if (n.multiple) {
        const c = Array.isArray(n.modelValue) ? [...n.modelValue] : [], d = c.indexOf(r.value);
        d >= 0 ? c.splice(d, 1) : c.push(r.value), a("update:modelValue", c);
        return;
      }
      a("update:modelValue", r.value);
    }
    return (r, c) => (m(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", m5, [
        (m(!0), k(ne, null, he(e.items, (d) => (m(), k("button", {
          key: d.value,
          type: "button",
          class: Q(i(d)),
          "aria-checked": o(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", b5, [
            o(d) ? (m(), k("span", v5)) : z("", !0)
          ]),
          d.dotColor ? (m(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: De({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", y5, D(d.label), 1)
        ], 10, p5))), 128))
      ])
    ], 8, g5));
  }
}), _5 = ["aria-label"], k5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], w5 = { class: "truncate px-3 py-2 text-sm font-medium" }, C5 = /* @__PURE__ */ le({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Ue()}`, o = (y) => `${s}-seg-${y}`, i = ae([]);
    function l(y, b) {
      y instanceof HTMLButtonElement ? i.value[b] = y : i.value[b] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const b = r(y), f = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${f} cursor-not-allowed opacity-40` : b ? `${f} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${f} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, b, f) {
      d(y), We(() => i.value[b]?.focus());
    }
    const p = $(
      () => n.items.map((y, b) => y.disabled ? -1 : b).filter((y) => y >= 0)
    );
    function v(y, b) {
      const f = n.items.length;
      if (f === 0) return 0;
      let x = y;
      for (let _ = 0; _ < f; _++)
        if (x = (x + b + f) % f, !n.items[x]?.disabled) return x;
      return y;
    }
    function g(y, b) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const f = v(b, 1), x = n.items[f];
        x && d(x), We(() => i.value[f]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const f = v(b, -1), x = n.items[f];
        x && d(x), We(() => i.value[f]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const f = p.value[0];
        if (f !== void 0) {
          const x = n.items[f];
          x && d(x), We(() => i.value[f]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const f = p.value[p.value.length - 1];
        if (f !== void 0) {
          const x = n.items[f];
          x && d(x), We(() => i.value[f]?.focus());
        }
      }
    }
    return (y, b) => (m(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), k(ne, null, he(e.items, (f, x) => (m(), k("button", {
        id: o(f.value),
        key: f.value,
        ref_for: !0,
        ref: (_) => l(_, x),
        type: "button",
        role: "tab",
        "aria-selected": r(f),
        "aria-disabled": f.disabled === !0,
        tabindex: r(f) ? 0 : -1,
        class: Q(c(f)),
        onClick: (_) => h(f, x),
        onKeydown: (_) => g(_, x)
      }, [
        u("span", w5, D(f.label), 1)
      ], 42, k5))), 128))
    ], 8, _5));
  }
}), $5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, S5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, M5 = {
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
}, D5 = {
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
}, T5 = [
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
function A5(e = "en") {
  return $5[e];
}
function gl(e = "en") {
  return T5.map((t) => ({ id: t, label: D5[e][t] }));
}
function B5(e = "en") {
  return "Presets";
}
gl("es");
function Ze(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function ot(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ze(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Lt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Kn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function L5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return ze(n);
}
function Dn(e, t) {
  return L5(e, -t);
}
function P5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function ml(e, t = /* @__PURE__ */ new Date()) {
  const n = ze(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Dn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Dn(n, 6), end: n };
    case "last14":
      return { start: Dn(n, 13), end: n };
    case "last30":
      return { start: Dn(n, 29), end: n };
    case "last90":
      return { start: Dn(n, 89), end: n };
    case "thisMonth":
      return { start: Lt(n), end: n };
    case "lastMonth": {
      const a = Lt(Kn(n, -1));
      return { start: a, end: P5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function pl(e, t, n) {
  let a = ze(e.start), s = ze(e.end);
  if (t) {
    const o = ze(Ze(t));
    Yt(a, o) && (a = o), Yt(s, o) && (s = o);
  }
  if (n) {
    const o = ze(Ze(n));
    Wa(a, o) && (a = o), Wa(s, o) && (s = o);
  }
  return Wa(a, s) ? { start: s, end: a } : { start: a, end: s };
}
function I5(e, t, n = /* @__PURE__ */ new Date(), a, s) {
  if (!e.start || !e.end) return !1;
  const o = pl(ml(t, n), a, s);
  return ot(o.start) === e.start && ot(o.end) === e.end;
}
function qn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Ht(e, t) {
  return qn(e, t) === 0;
}
function Yt(e, t) {
  return qn(e, t) < 0;
}
function Wa(e, t) {
  return qn(e, t) > 0;
}
function bl(e, t) {
  return qn(e, t) >= 0;
}
function vl(e, t) {
  return qn(e, t) <= 0;
}
function yl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
function _a(e, t = "en") {
  return `${S5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Wt(e, t = "en") {
  return `${M5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const R5 = ["aria-expanded", "aria-labelledby", "aria-label"], F5 = ["onKeydown"], E5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, O5 = { class: "mb-4 flex items-center justify-between gap-2" }, V5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, z5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, N5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, H5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, W5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, j5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, Y5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, K5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, U5 = ["disabled", "onClick"], q5 = "rounded-lg text-[#61616b]", X5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", G5 = "opacity-30", Z5 = "bg-[#6b35e9] font-medium text-white", Q5 = "bg-[#895af6] font-semibold text-white", J5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `${`kiut-drp-${Ue()}`}-lbl`, i = ae(null), l = ae(null), r = ae(!1), c = ae(null), d = ae(Lt(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), p = $(() => {
      const A = Lt(d.value);
      return [A, Kn(A, 1)];
    }), v = $(() => n.ariaLabel ?? n.placeholder), g = $(() => {
      const A = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${A}` : `left-0 right-auto ${A}`;
    }), y = $(
      () => `${Wt(p.value[0])} – ${Wt(p.value[1])}`
    ), b = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const A = Ze(n.modelValue.start), L = Ze(n.modelValue.end);
      return `${_a(A)} – ${_a(L)}`;
    });
    function x(A, L) {
      return A.getMonth() === L.getMonth() && A.getFullYear() === L.getFullYear();
    }
    function _(A) {
      const L = ze(A);
      if (n.minDate) {
        const O = ze(Ze(n.minDate));
        if (Yt(L, O)) return !0;
      }
      if (n.maxDate) {
        const O = ze(Ze(n.maxDate));
        if (Yt(O, L)) return !0;
      }
      return !1;
    }
    function w(A, L, O) {
      const X = Ht(A, L), G = Ht(A, O);
      if (X && G) return "rounded-lg";
      const se = X || A.getDay() === 0, oe = G || A.getDay() === 6;
      return se && oe ? "rounded-lg" : se ? "rounded-l-lg" : oe ? "rounded-r-lg" : "rounded-none";
    }
    function C(A, L) {
      const O = x(L, A), X = _(L), G = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, se = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, oe = ze(L);
      if (X)
        return q5;
      let me = X5;
      if (G && se && bl(oe, G) && vl(oe, se)) {
        const U = Ht(oe, G), H = Ht(oe, se);
        me = `${w(oe, G, se)} ${U || H ? Q5 : Z5}`;
      }
      return O || (me = `${me} ${G5}`), me;
    }
    function M(A) {
      if (_(A)) return;
      const L = ze(A);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: ot(L), end: ot(L) });
        return;
      }
      let X = ze(c.value), G = new Date(L);
      Yt(G, X) && ([X, G] = [G, X]), a("update:modelValue", { start: ot(X), end: ot(G) }), c.value = null, r.value = !1;
    }
    function S(A) {
      d.value = Kn(d.value, A);
    }
    function I() {
      r.value = !1;
    }
    function V(A) {
      if (A?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Lt(Ze(n.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function E(A) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(A.target) && (r.value = !1);
    }
    return Oe(r, (A) => {
      A && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", E);
    }), pt(() => {
      document.removeEventListener("click", E);
    }), (A, L) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: Q([
          T(mt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: V,
        onClick: V
      }, [
        F(T(_s), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(f.value), 3)
      ], 42, R5),
      lt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Q([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: En(Xe(I, ["stop"]), ["escape"])
      }, [
        u("div", E5, [
          u("div", O5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (O) => S(-1))
            }, [
              F(T(nl), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", V5, [
              u("span", z5, D(y.value), 1),
              u("div", N5, [
                u("span", H5, D(T(Wt)(p.value[0])), 1),
                u("span", W5, D(T(Wt)(p.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (O) => S(1))
            }, [
              F(T(al), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", j5, [
            (m(!0), k(ne, null, he(p.value, (O) => (m(), k("div", {
              key: `${O.getFullYear()}-${O.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", Y5, [
                (m(), k(ne, null, he(b, (X) => u("span", { key: X }, D(X), 1)), 64))
              ]),
              u("div", K5, [
                (m(!0), k(ne, null, he(T(yl)(O), (X) => (m(), k("button", {
                  key: T(ot)(X),
                  type: "button",
                  disabled: _(X),
                  class: Q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", C(O, X)]),
                  onClick: (G) => M(X)
                }, D(X.getDate()), 11, U5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, F5), [
        [bn, r.value]
      ])
    ], 512));
  }
}), eC = ["aria-expanded", "aria-labelledby", "aria-label"], tC = ["aria-label", "onKeydown"], nC = { class: "flex flex-col sm:flex-row" }, aC = ["aria-label"], sC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, oC = { class: "flex flex-col gap-0.5" }, iC = ["onClick"], lC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, rC = { class: "mb-4 flex items-center justify-between gap-2" }, cC = ["aria-label"], dC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, uC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, hC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, fC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, gC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, mC = ["aria-label"], pC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, bC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, vC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, yC = ["disabled", "onClick"], xC = "rounded-lg text-[#61616b]", _C = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", kC = "opacity-30", wC = "bg-[#6b35e9] font-medium text-white", CC = "bg-[#895af6] font-semibold text-white", $C = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `${`kiut-dpp-${Ue()}`}-lbl`, i = ae(null), l = ae(null), r = ae(!1), c = ae(null), d = ae(Lt(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), p = $(() => {
      const U = Lt(d.value);
      return [U, Kn(U, 1)];
    }), v = $(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = $(() => n.ariaLabel ?? v.value), y = $(() => gl(n.locale)), b = $(() => B5(n.locale)), f = $(() => A5(n.locale)), x = $(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = $(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = $(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), C = $(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = $(() => {
      const U = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${U}` : `left-0 right-auto ${U}`;
    }), S = $(
      () => `${Wt(p.value[0], n.locale)} – ${Wt(p.value[1], n.locale)}`
    ), I = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const U = Ze(n.modelValue.start), H = Ze(n.modelValue.end);
      return `${_a(U, n.locale)} – ${_a(H, n.locale)}`;
    });
    function V(U, H) {
      return U.getMonth() === H.getMonth() && U.getFullYear() === H.getFullYear();
    }
    function E(U) {
      const H = ze(U);
      if (n.minDate) {
        const Z = ze(Ze(n.minDate));
        if (Yt(H, Z)) return !0;
      }
      if (n.maxDate) {
        const Z = ze(Ze(n.maxDate));
        if (Yt(Z, H)) return !0;
      }
      return !1;
    }
    function A(U, H, Z) {
      const te = Ht(U, H), fe = Ht(U, Z);
      if (te && fe) return "rounded-lg";
      const we = te || U.getDay() === 0, Me = fe || U.getDay() === 6;
      return we && Me ? "rounded-lg" : we ? "rounded-l-lg" : Me ? "rounded-r-lg" : "rounded-none";
    }
    function L(U) {
      const H = I5(
        n.modelValue,
        U,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), Z = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return H ? `${Z} font-medium` : Z;
    }
    function O(U, H) {
      const Z = V(H, U), te = E(H), fe = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, we = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, Me = ze(H);
      if (te)
        return xC;
      let R = _C;
      if (fe && we && bl(Me, fe) && vl(Me, we)) {
        const j = Ht(Me, fe), de = Ht(Me, we);
        R = `${A(Me, fe, we)} ${j || de ? CC : wC}`;
      }
      return Z || (R = `${R} ${kC}`), R;
    }
    function X(U) {
      const H = pl(ml(U), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: ot(H.start),
        end: ot(H.end)
      }), d.value = Lt(H.start), c.value = null, r.value = !1;
    }
    function G(U) {
      if (E(U)) return;
      const H = ze(U);
      if (!c.value) {
        c.value = new Date(H), a("update:modelValue", { start: ot(H), end: ot(H) });
        return;
      }
      let te = ze(c.value), fe = new Date(H);
      Yt(fe, te) && ([te, fe] = [fe, te]), a("update:modelValue", { start: ot(te), end: ot(fe) }), c.value = null, r.value = !1;
    }
    function se(U) {
      d.value = Kn(d.value, U);
    }
    function oe() {
      r.value = !1;
    }
    function me(U) {
      if (U.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = Lt(Ze(n.modelValue.start));
        } catch {
        }
      We(() => l.value?.focus());
    }
    function ye(U) {
      if (!r.value) return;
      const H = i.value;
      H && !H.contains(U.target) && (r.value = !1);
    }
    return Oe(r, (U) => {
      U && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", ye);
    }), pt(() => {
      document.removeEventListener("click", ye);
    }), (U, H) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ct))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: Q([
          T(mt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: me
      }, [
        F(T(_s), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(I.value), 3)
      ], 10, eC),
      lt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": C.value,
        class: Q([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: En(Xe(oe, ["stop"]), ["escape"])
      }, [
        u("div", nC, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", sC, D(b.value), 1),
            u("ul", oC, [
              (m(!0), k(ne, null, he(y.value, (Z) => (m(), k("li", {
                key: Z.id
              }, [
                u("button", {
                  type: "button",
                  class: Q(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(Z.id)]),
                  onClick: (te) => X(Z.id)
                }, D(Z.label), 11, iC)
              ]))), 128))
            ])
          ], 8, aC),
          u("div", lC, [
            u("div", rC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: H[0] || (H[0] = (Z) => se(-1))
              }, [
                F(T(nl), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, cC),
              u("div", dC, [
                u("span", uC, D(S.value), 1),
                u("div", hC, [
                  u("span", fC, D(T(Wt)(p.value[0], e.locale)), 1),
                  u("span", gC, D(T(Wt)(p.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: H[1] || (H[1] = (Z) => se(1))
              }, [
                F(T(al), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, mC)
            ]),
            u("div", pC, [
              (m(!0), k(ne, null, he(p.value, (Z) => (m(), k("div", {
                key: `${Z.getFullYear()}-${Z.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", bC, [
                  (m(!0), k(ne, null, he(f.value, (te) => (m(), k("span", { key: te }, D(te), 1))), 128))
                ]),
                u("div", vC, [
                  (m(!0), k(ne, null, he(T(yl)(Z), (te) => (m(), k("button", {
                    key: T(ot)(te),
                    type: "button",
                    disabled: E(te),
                    class: Q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", O(Z, te)]),
                    onClick: (fe) => G(te)
                  }, D(te.getDate()), 11, yC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, tC), [
        [bn, r.value]
      ])
    ], 512));
  }
}), ti = /* @__PURE__ */ le({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = $(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, s) => (m(), k("svg", {
      class: Q(["inline-flex shrink-0 animate-spin", n.value]),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2.5",
      "stroke-linecap": "round",
      "aria-hidden": "true"
    }, [...s[0] || (s[0] = [
      u("circle", {
        cx: "12",
        cy: "12",
        r: "10",
        "stroke-opacity": "0.25"
      }, null, -1),
      u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
    ])], 2));
  }
}), SC = ["disabled", "aria-expanded", "aria-label"], MC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, DC = { class: "min-w-0 truncate" }, TC = ["disabled", "onClick", "onMouseenter"], AC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, BC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, LC = { class: "min-w-0 flex-1 text-left" }, PC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, IC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, RC = ["disabled", "aria-expanded", "aria-label"], FC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, EC = ["disabled", "onClick", "onMouseenter"], OC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, VC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, zC = { class: "min-w-0 flex-1 text-left" }, NC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, HC = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, WC = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, jC = ["type", "disabled", "aria-busy", "aria-label"], YC = {
  key: 2,
  class: "min-w-0 truncate"
}, KC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, UC = ["type", "disabled", "aria-busy", "aria-label"], qC = {
  key: 2,
  class: "min-w-0 truncate"
}, ha = /* @__PURE__ */ le({
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
    const n = e, a = t, s = ka(), o = $(
      () => !!n.tooltip?.trim() && n.variant !== "dropdown" && n.variant !== "split"
    ), i = $(() => n.variant === "dropdown"), l = $(() => n.variant === "split"), r = $(() => n.variant === "action"), c = $(() => !r.value && !l.value), d = $(() => n.disabled || n.loading), h = $(
      () => n.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), p = $(() => {
      const H = s["aria-label"];
      if (typeof H == "string" && H.length > 0) return H;
      if ((r.value || l.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), v = $(() => {
      const H = s.type;
      return H === "submit" || H === "reset" || H === "button" ? H : "button";
    }), g = $(() => {
      const { class: H, type: Z, "aria-label": te, ...fe } = s;
      return fe;
    }), y = $(() => n.variant === "primary" || n.variant === "dropdown" ? [
      "px-4 py-2.5",
      "bg-[color:var(--kiut-primary)] text-white shadow-sm",
      "hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]",
      "dark:text-white dark:hover:brightness-110 dark:active:brightness-95"
    ] : n.variant === "secondary" ? [
      "px-4 py-2.5",
      "border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]",
      "hover:border-slate-300 hover:bg-slate-100",
      "active:bg-slate-200/80",
      "dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100",
      "dark:hover:border-white/[0.18] dark:hover:bg-slate-800",
      "dark:active:bg-slate-700/90"
    ] : n.tone === "danger" ? [
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
    ]), b = `kiut-button-menu-${Ue()}`, f = `${b}-btn`, x = `${b}-menu`, _ = ae(null), w = ae(null), C = ae(null), M = ae(!1), S = ae(0), I = ae({}), V = $(() => n.options.filter((H) => !H.disabled));
    function E(H) {
      return `${H.value}-${H.label}`;
    }
    function A() {
      const H = w.value;
      if (!H) return;
      const Z = H.getBoundingClientRect(), te = {
        top: `${Z.bottom - 3}px`,
        minWidth: `max(${Z.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (te.right = `${window.innerWidth - Z.right}px`, te.left = "auto") : (te.left = `${Z.left}px`, te.right = "auto"), I.value = te;
    }
    function L(H) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        S.value === H ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function O() {
      M.value = !1;
    }
    function X() {
      A(), S.value = 0, We(() => C.value?.focus());
    }
    function G() {
      if (!n.disabled) {
        if (M.value) {
          O();
          return;
        }
        M.value = !0, X();
      }
    }
    function se(H) {
      H.disabled || (a("select", H), O());
    }
    function oe(H) {
      H.stopPropagation(), G();
    }
    function me(H) {
      if (!M.value) return;
      const Z = H.target, te = _.value, fe = C.value;
      te && !te.contains(Z) && (!fe || !fe.contains(Z)) && O();
    }
    function ye(H) {
      n.disabled || (H.key === "ArrowDown" || H.key === "Enter" || H.key === " ") && (H.preventDefault(), M.value || (M.value = !0, X()));
    }
    function U(H) {
      const Z = V.value;
      if (H.key === "Escape") {
        H.preventDefault(), O(), w.value?.focus();
        return;
      }
      if (Z.length !== 0) {
        if (H.key === "ArrowDown") {
          H.preventDefault(), S.value = Math.min(S.value + 1, Z.length - 1);
          return;
        }
        if (H.key === "ArrowUp") {
          H.preventDefault(), S.value = Math.max(S.value - 1, 0);
          return;
        }
        if (H.key === "Enter" || H.key === " ") {
          H.preventDefault();
          const te = Z[S.value];
          te && se(te);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", me);
    }), pt(() => {
      document.removeEventListener("click", me);
    }), (H, Z) => i.value ? (m(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", Et({
        ref_key: "buttonRef",
        ref: w,
        id: f,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, T(s).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": p.value
      }, g.value, {
        onClick: oe,
        onKeydown: ye
      }), [
        H.$slots.icon ? (m(), k("span", MC, [
          Se(H.$slots, "icon")
        ])) : z("", !0),
        u("span", DC, [
          Se(H.$slots, "default")
        ]),
        F(T(ks), {
          class: Q(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", M.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, SC),
      (m(), J(Fn, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: C,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: De(I.value),
          onKeydown: Xe(U, ["stop"])
        }, [
          (m(!0), k(ne, null, he(V.value, (te, fe) => (m(), k("button", {
            key: E(te),
            type: "button",
            role: "menuitem",
            disabled: te.disabled,
            class: Q(L(fe)),
            onClick: Xe((we) => se(te), ["stop"]),
            onMouseenter: (we) => S.value = fe
          }, [
            te.icon ? (m(), k("span", AC, [
              (m(), J(Ft(te.icon), { class: "h-5 w-5" }))
            ])) : (m(), k("span", BC)),
            u("span", LC, [
              u("span", PC, D(te.label), 1),
              te.description ? (m(), k("span", IC, D(te.description), 1)) : z("", !0)
            ])
          ], 42, TC))), 128))
        ], 36), [
          [bn, M.value]
        ])
      ]))
    ], 512)) : l.value ? (m(), k("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", Et({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, T(s).class]],
        disabled: e.disabled,
        "aria-expanded": M.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": p.value
      }, g.value, {
        onClick: oe,
        onKeydown: ye
      }), [
        H.$slots.icon ? (m(), k("span", FC, [
          Se(H.$slots, "icon")
        ])) : z("", !0)
      ], 16, RC),
      (m(), J(Fn, { to: "body" }, [
        lt(u("div", {
          ref_key: "panelRef",
          ref: C,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: De(I.value),
          onKeydown: Xe(U, ["stop"])
        }, [
          (m(!0), k(ne, null, he(V.value, (te, fe) => (m(), k("button", {
            key: E(te),
            type: "button",
            role: "menuitem",
            disabled: te.disabled,
            class: Q(L(fe)),
            onClick: Xe((we) => se(te), ["stop"]),
            onMouseenter: (we) => S.value = fe
          }, [
            te.icon ? (m(), k("span", OC, [
              (m(), J(Ft(te.icon), { class: "h-5 w-5" }))
            ])) : (m(), k("span", VC)),
            u("span", zC, [
              u("span", NC, D(te.label), 1),
              te.description ? (m(), k("span", HC, D(te.description), 1)) : z("", !0)
            ])
          ], 42, EC))), 128))
        ], 36), [
          [bn, M.value]
        ])
      ]))
    ], 512)) : o.value ? (m(), k("span", WC, [
      u("button", Et({
        type: v.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, T(s).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": p.value
      }, g.value), [
        e.loading ? (m(), J(ti, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : H.$slots.icon ? (m(), k("span", {
          key: 1,
          class: Q(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Se(H.$slots, "icon")
        ], 2)) : z("", !0),
        c.value ? (m(), k("span", YC, [
          Se(H.$slots, "default")
        ])) : z("", !0)
      ], 16, jC),
      u("span", KC, D(e.tooltip), 1)
    ])) : (m(), k("button", Et({
      key: 3,
      type: v.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, T(s).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": p.value
    }, g.value), [
      e.loading ? (m(), J(ti, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : H.$slots.icon ? (m(), k("span", {
        key: 1,
        class: Q(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Se(H.$slots, "icon")
      ], 2)) : z("", !0),
      c.value ? (m(), k("span", qC, [
        Se(H.$slots, "default")
      ])) : z("", !0)
    ], 16, UC));
  }
}), XC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, GC = { class: "min-w-0 flex-1 space-y-1" }, ZC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, QC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, JC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, e$ = /* @__PURE__ */ le({
  name: "Modal",
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    subtitle: {},
    cancelLabel: { default: "Cancelar" },
    confirmLabel: { default: "Guardar" },
    width: { default: 512 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "cancel", "confirm"],
  setup(e, { emit: t }) {
    const n = e, a = $(() => ({ maxWidth: `${n.width}px` })), s = t, i = `${`kiut-modal-${Ue()}`}-title`, l = ae(null);
    function r() {
      n.loading || (s("cancel"), s("update:modelValue", !1));
    }
    function c() {
      s("confirm");
    }
    function d(h) {
      if (n.modelValue && h.key === "Escape") {
        if (n.loading) return;
        h.preventDefault(), r();
      }
    }
    return Oe(
      () => n.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), tt(() => {
      document.addEventListener("keydown", d);
    }), pt(() => {
      document.removeEventListener("keydown", d);
    }), (h, p) => (m(), J(Fn, { to: "body" }, [
      F(Te, { name: "kiut-modal" }, {
        default: B(() => [
          e.modelValue ? (m(), k("div", XC, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            u("div", {
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: De(a.value),
              onClick: p[0] || (p[0] = Xe(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: Q(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", GC, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (m(), k("p", ZC, D(e.subtitle), 1)) : z("", !0)
                ]),
                F(ha, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: B(() => [
                    F(T(sl), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", QC, [
                Se(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", JC, [
                F(ha, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: B(() => [
                    Be(D(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                F(ha, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: B(() => [
                    Be(D(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 4)
          ])) : z("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), t$ = /* @__PURE__ */ ge(e$, [["__scopeId", "data-v-1815ac92"]]), n$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, a$ = {
  key: 0,
  class: ""
}, s$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, o$ = { class: "flex min-w-0 flex-1 items-center" }, i$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, l$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, r$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, c$ = /* @__PURE__ */ le({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Ja(), n = $(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (m(), k("section", n$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (m(), k("header", a$, [
        a.$slots.description ? (m(), k("div", s$, [
          Se(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.tabs ? (m(), k("div", {
          key: 1,
          class: Q(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", o$, [
            Se(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (m(), k("div", i$, [
            Se(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (m(), k("div", {
          key: 2,
          class: Q([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (m(), k("div", l$, [
            Se(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (m(), k("div", r$, [
            Se(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (m(), k("div", {
        key: 1,
        class: Q({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        Se(a.$slots, "content", {}, () => [
          Se(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), d$ = { class: "flex flex-1 min-h-0" }, u$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, h$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, f$ = ["aria-current", "data-has-active", "title", "onClick"], g$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, m$ = { class: "px-4 py-4 shrink-0" }, p$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, b$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, v$ = ["data-nav-id", "aria-current", "onClick"], y$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, x$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, _$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, k$ = ["data-nav-id", "aria-current", "onClick"], w$ = { class: "truncate text-[15px]" }, C$ = ["aria-current", "data-has-active", "onClick"], $$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, S$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, M$ = /* @__PURE__ */ le({
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
    const n = ae(!1), a = e, s = t, o = ka(), { class: i, ...l } = o, r = ae(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    tt(() => {
      c(), window.addEventListener("resize", c);
    }), pt(() => {
      window.removeEventListener("resize", c);
    });
    const d = $(() => {
      const f = a.sections.find((x) => x.id === a.selectedSectionId);
      return f?.items?.length ? f : null;
    });
    function h(f) {
      return a.activePath ? a.activePath === f.path || a.activePath.startsWith(f.path + "/") : !1;
    }
    function p(f) {
      return f.items?.length ? f.items.some(h) : !a.activePath || !f.path ? !1 : a.activePath === f.path || a.activePath.startsWith(f.path + "/");
    }
    function v(f) {
      if (!f.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: f,
          item: { id: f.id, label: f.label, path: f.path }
        });
        return;
      }
      const x = a.selectedSectionId === f.id ? null : f.id;
      s("update:selectedSectionId", x);
    }
    function g(f, x) {
      s("navigate", { section: f, item: x });
    }
    function y() {
      s("update:selectedSectionId", null);
    }
    function b(f, x) {
      g(f, x), y();
    }
    return (f, x) => r.value ? (m(), k("div", Et({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      F(Te, { name: "ksn-overlay" }, {
        default: B(() => [
          d.value ? (m(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : z("", !0)
        ]),
        _: 1
      }),
      F(Te, { name: "ksn-sheet" }, {
        default: B(() => [
          d.value ? (m(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: De({ paddingBottom: a.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", y$, [
              u("p", x$, D(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [...x[2] || (x[2] = [
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
            u("nav", _$, [
              (m(!0), k(ne, null, he(d.value.items, (_) => (m(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => b(d.value, _)
              }, [
                _.icon ? (m(), J(Ft(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", w$, D(_.label), 1)
              ], 8, k$))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: De({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (m(!0), k(ne, null, he(e.sections, (_) => (m(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": p(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(_)
        }, [
          e.selectedSectionId === _.id || p(_) ? (m(), k("span", $$)) : z("", !0),
          _.icon ? (m(), J(Ft(_.icon), {
            key: 1,
            class: "shrink-0",
            style: De({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", S$, D(_.label), 1)
        ], 8, C$))), 128))
      ], 4)
    ], 16)) : (m(), k("aside", Et({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", d$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: De({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (_) => n.value = !0),
          onMouseleave: x[1] || (x[1] = (_) => n.value = !1)
        }, [
          f.$slots.logo ? (m(), k("div", u$, [
            Se(f.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", h$, [
            (m(!0), k(ne, null, he(e.sections, (_) => (m(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": p(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(_)
            }, [
              _.icon ? (m(), J(Ft(_.icon), {
                key: 0,
                class: "shrink-0",
                style: De({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: De({ fontSize: e.primaryFontSize })
              }, D(_.label), 5)
            ], 8, f$))), 128))
          ]),
          f.$slots.footer ? (m(), k("div", g$, [
            Se(f.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        F(Te, { name: "ksn-sub" }, {
          default: B(() => [
            d.value ? (m(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: De({ width: e.secondaryWidth })
            }, [
              u("div", m$, [
                u("p", p$, D(d.value.label), 1)
              ]),
              u("nav", b$, [
                (m(!0), k(ne, null, he(d.value.items, (_) => (m(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, _)
                }, [
                  _.icon ? (m(), J(Ft(_.icon), {
                    key: 0,
                    style: De({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: De({ fontSize: e.secondaryFontSize })
                  }, D(_.label), 5)
                ], 8, v$))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), D$ = /* @__PURE__ */ ge(M$, [["__scopeId", "data-v-e0ccb96c"]]), E$ = {
  install(e) {
    e.component("KiutChartBar", $t), e.component("KiutChartLine", yt), e.component("KiutPieChart", Ma), e.component("KiutBoxplotChart", pf), e.component("KiutCandlestickChart", ag), e.component("KiutHistogramChart", el), e.component("KiutSankeyChart", qt), e.component("KiutAgentsPerDay", qm), e.component("KiutBookingManager", Dp), e.component("KiutCheckin", ol), e.component("KiutCheckinContainer", _0), e.component("KiutCheckinMetrics", i0), e.component("KiutCheckinSegments", il), e.component("KiutDisruption", z0), e.component("KiutFAQ", q0), e.component("KiutMessagesPerAgent", ib), e.component("KiutRecordLocator", $b), e.component("KiutSalesByChannel", ll), e.component("KiutSeller", rl), e.component("KiutSellerContainer", fv), e.component("KiutTopAgents", _v), e.component("KiutPaymentMethod", Wv), e.component("KiutAgentHumanConversations", Ay), e.component("KiutChannelMetrics", zy), e.component("KiutTriageCombinations", t1), e.component("KiutSelectLanguage", r1), e.component("KiutGuardrails", y1), e.component("KiutDisruptionNotifier", z1), e.component("KiutTotalConversationsCard", N1), e.component("KiutCsatP95Card", H1), e.component("KiutCsatPulseCard", W1), e.component("KiutCSATContainer", $x), e.component("KiutAiGeneratedRevenueCard", Sx), e.component("KiutCostCard", Dx), e.component("KiutHumanEscalations", Ex), e.component("KiutHumanEscalationsCard", Ox), e.component("KiutNpsDailyMetrics", ul), e.component("KiutNpsMetrics", hl), e.component("KiutNpsOverviewMetrics", dl), e.component("KiutAWSCost", qx), e.component("KiutCostUsage", o_), e.component("KiutTokenUsage", p_), e.component("KiutConversationCount", M_), e.component("KiutTopAgentsAnalysis", z_), e.component("KiutTopAgentsPie", G_), e.component("KiutDailyCostTrends", ik), e.component("KiutModelUsage", _k), e.component("KiutMessageRoles", Bk), e.component("KiutCostPerConversations", Hk), e.component("Tabs", fl), e.component("Table", t2), e.component("Filters", I2), e.component("InputText", V2), e.component("InputPassword", q2), e.component("InputTextarea", J2), e.component("InputFile", lw), e.component("InputDateTime", fw), e.component("InputTime", yw), e.component("InputRange", Pw), e.component("InputNumber", Ow), e.component("InputColorPicker", Uw), e.component("Select", ws), e.component("MultiSelect", n5), e.component("Toggle", o5), e.component("InputPhone", f5), e.component("SelectablePills", x5), e.component("SegmentedControl", C5), e.component("DateRangePicker", J5), e.component("DatePickerPresets", $C), e.component("Tag", qe), e.component("Button", ha), e.component("Modal", t$), e.component("Section", c$), e.component("KiutAppShellNavigation", D$);
  }
};
export {
  qx as AWSCost,
  Ay as AgentHumanConversations,
  qm as AgentsPerDay,
  Sx as AiGeneratedRevenueCard,
  D$ as AppShellNavigation,
  Dp as BookingManager,
  pf as BoxplotChart,
  ha as Button,
  $x as CSATContainer,
  ag as CandlestickChart,
  zy as ChannelMetrics,
  $t as ChartBar,
  yt as ChartLine,
  ol as Checkin,
  _0 as CheckinContainer,
  i0 as CheckinMetrics,
  il as CheckinSegments,
  M_ as ConversationCount,
  Dx as CostCard,
  Hk as CostPerConversations,
  o_ as CostUsage,
  H1 as CsatP95Card,
  W1 as CsatPulseCard,
  ik as DailyCostTrends,
  $C as DatePickerPresets,
  J5 as DateRangePicker,
  z0 as Disruption,
  z1 as DisruptionNotifier,
  q0 as FAQ,
  I2 as Filters,
  y1 as Guardrails,
  el as HistogramChart,
  Ex as HumanEscalations,
  Ox as HumanEscalationsCard,
  Uw as InputColorPicker,
  fw as InputDateTime,
  lw as InputFile,
  Ow as InputNumber,
  q2 as InputPassword,
  f5 as InputPhone,
  Pw as InputRange,
  V2 as InputText,
  J2 as InputTextarea,
  yw as InputTime,
  E$ as KiutUIPlugin,
  Bk as MessageRoles,
  ib as MessagesPerAgent,
  t$ as Modal,
  _k as ModelUsage,
  n5 as MultiSelect,
  ul as NpsDailyMetrics,
  hl as NpsMetrics,
  dl as NpsOverviewMetrics,
  Wv as PaymentMethod,
  Ma as PieChart,
  $b as RecordLocator,
  ll as SalesByChannel,
  qt as SankeyChart,
  c$ as Section,
  C5 as SegmentedControl,
  ws as Select,
  r1 as SelectLanguage,
  x5 as SelectablePills,
  rl as Seller,
  fv as SellerContainer,
  t2 as Table,
  fl as Tabs,
  qe as Tag,
  o5 as Toggle,
  p_ as TokenUsage,
  _v as TopAgents,
  z_ as TopAgentsAnalysis,
  G_ as TopAgentsPie,
  N1 as TotalConversationsCard,
  t1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
