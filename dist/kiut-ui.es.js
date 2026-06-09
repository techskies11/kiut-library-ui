import { defineComponent as re, shallowRef as Qo, h as Ha, ref as ae, onMounted as Je, onUnmounted as ft, watch as Fe, toRaw as ja, nextTick as We, version as vl, isProxy as Jo, computed as $, toRef as we, openBlock as p, createElementBlock as k, createVNode as R, unref as T, createElementVNode as u, Fragment as ie, renderList as fe, normalizeStyle as Te, normalizeClass as Q, toDisplayString as D, createCommentVNode as z, onBeforeUnmount as ei, createStaticVNode as ws, useSlots as Qa, Transition as Me, withCtx as L, renderSlot as Se, Comment as yl, createBlock as ee, resolveDynamicComponent as Jt, createTextVNode as Ae, Teleport as _a, withDirectives as it, withModifiers as Qe, vModelText as tn, vShow as jn, createSlots as Cs, vModelSelect as xl, withKeys as In, useAttrs as ka, inject as ti, mergeProps as nn } from "vue";
import * as $s from "echarts/core";
import { TooltipComponent as _l, TitleComponent as kl } from "echarts/components";
import { SankeyChart as wl } from "echarts/charts";
import { CanvasRenderer as Cl } from "echarts/renderers";
import He from "moment";
function Yn(e) {
  return e + 0.5 | 0;
}
const Rt = (e, t, n) => Math.max(Math.min(e, n), t);
function Sn(e) {
  return Rt(Yn(e * 2.55), 0, 255);
}
function Nt(e) {
  return Rt(Yn(e * 255), 0, 255);
}
function St(e) {
  return Rt(Yn(e / 2.55) / 100, 0, 1);
}
function Ms(e) {
  return Rt(Yn(e * 100), 0, 100);
}
const rt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ya = [..."0123456789ABCDEF"], $l = (e) => Ya[e & 15], Ml = (e) => Ya[(e & 240) >> 4] + Ya[e & 15], Un = (e) => (e & 240) >> 4 === (e & 15), Sl = (e) => Un(e.r) && Un(e.g) && Un(e.b) && Un(e.a);
function Dl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & rt[e[1]] * 17,
    g: 255 & rt[e[2]] * 17,
    b: 255 & rt[e[3]] * 17,
    a: t === 5 ? rt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: rt[e[1]] << 4 | rt[e[2]],
    g: rt[e[3]] << 4 | rt[e[4]],
    b: rt[e[5]] << 4 | rt[e[6]],
    a: t === 9 ? rt[e[7]] << 4 | rt[e[8]] : 255
  })), n;
}
const Tl = (e, t) => e < 255 ? t(e) : "";
function Al(e) {
  var t = Sl(e) ? $l : Ml;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Tl(e.a, t) : void 0;
}
const Bl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ni(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function Ll(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function Pl(e, t, n) {
  const a = ni(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function Il(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ja(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let r, c, d;
  return o !== i && (d = o - i, c = l > 0.5 ? d / (2 - o - i) : d / (o + i), r = Il(n, a, s, d, o), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function es(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Nt);
}
function ts(e, t, n) {
  return es(ni, e, t, n);
}
function Rl(e, t, n) {
  return es(Pl, e, t, n);
}
function Fl(e, t, n) {
  return es(Ll, e, t, n);
}
function ai(e) {
  return (e % 360 + 360) % 360;
}
function El(e) {
  const t = Bl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Sn(+t[5]) : Nt(+t[5]));
  const s = ai(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Rl(s, o, i) : t[1] === "hsv" ? a = Fl(s, o, i) : a = ts(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Ol(e, t) {
  var n = Ja(e);
  n[0] = ai(n[0] + t), n = ts(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Vl(e) {
  if (!e)
    return;
  const t = Ja(e), n = t[0], a = Ms(t[1]), s = Ms(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${St(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const Ss = {
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
}, Ds = {
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
function zl() {
  const e = {}, t = Object.keys(Ds), n = Object.keys(Ss);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, Ss[o]);
    o = parseInt(Ds[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let qn;
function Nl(e) {
  qn || (qn = zl(), qn.transparent = [0, 0, 0, 0]);
  const t = qn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Wl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Hl(e) {
  const t = Wl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Sn(i) : Rt(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? Sn(a) : Rt(a, 0, 255)), s = 255 & (t[4] ? Sn(s) : Rt(s, 0, 255)), o = 255 & (t[6] ? Sn(o) : Rt(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function jl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${St(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Da = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, cn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Yl(e, t, n) {
  const a = cn(St(e.r)), s = cn(St(e.g)), o = cn(St(e.b));
  return {
    r: Nt(Da(a + n * (cn(St(t.r)) - a))),
    g: Nt(Da(s + n * (cn(St(t.g)) - s))),
    b: Nt(Da(o + n * (cn(St(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Xn(e, t, n) {
  if (e) {
    let a = Ja(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = ts(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function si(e, t) {
  return e && Object.assign(t || {}, e);
}
function Ts(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Nt(e[3]))) : (t = si(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Nt(t.a)), t;
}
function Kl(e) {
  return e.charAt(0) === "r" ? Hl(e) : El(e);
}
class Rn {
  constructor(t) {
    if (t instanceof Rn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = Ts(t) : n === "string" && (a = Dl(t) || Nl(t) || Kl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = si(this._rgb);
    return t && (t.a = St(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Ts(t);
  }
  rgbString() {
    return this._valid ? jl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Al(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Vl(this._rgb) : void 0;
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
    return t && (this._rgb = Yl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Rn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Nt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Yn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Xn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Xn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Xn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Xn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Ol(this._rgb, t), this;
  }
}
function Ct() {
}
const Ul = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Le(e) {
  return e == null;
}
function je(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function De(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function dt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function bt(e, t) {
  return dt(e) ? e : t;
}
function _e(e, t) {
  return typeof e > "u" ? t : e;
}
const ql = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, oi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Re(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Pe(e, t, n, a) {
  let s, o, i;
  if (je(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (De(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function ha(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function fa(e) {
  if (je(e))
    return e.map(fa);
  if (De(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = fa(e[n[s]]);
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
function Xl(e, t, n, a) {
  if (!ii(e))
    return;
  const s = t[e], o = n[e];
  De(s) && De(o) ? Fn(s, o, a) : t[e] = fa(o);
}
function Fn(e, t, n) {
  const a = je(t) ? t : [
    t
  ], s = a.length;
  if (!De(e))
    return e;
  n = n || {};
  const o = n.merger || Xl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !De(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      o(r[c], e, i, n);
  }
  return e;
}
function An(e, t) {
  return Fn(e, t, {
    merger: Gl
  });
}
function Gl(e, t, n) {
  if (!ii(e))
    return;
  const a = t[e], s = n[e];
  De(a) && De(s) ? An(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = fa(s));
}
const As = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Zl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Ql(e) {
  const t = Zl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function sn(e, t) {
  return (As[t] || (As[t] = Ql(t)))(e);
}
function ns(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const En = (e) => typeof e < "u", Ht = (e) => typeof e == "function", Bs = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Jl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ie = Math.PI, Ve = 2 * Ie, er = Ve + Ie, ga = Number.POSITIVE_INFINITY, tr = Ie / 180, Ye = Ie / 2, qt = Ie / 4, Ls = Ie * 2 / 3, li = Math.log10, _t = Math.sign;
function Bn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Ps(e) {
  const t = Math.round(e);
  e = Bn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(li(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function nr(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function ar(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function On(e) {
  return !ar(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function sr(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function or(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Dt(e) {
  return e * (Ie / 180);
}
function ir(e) {
  return e * (180 / Ie);
}
function Is(e) {
  if (!dt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function ri(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * Ie && (o += Ve), {
    angle: o,
    distance: s
  };
}
function Ka(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function lr(e, t) {
  return (e - t + er) % Ve - Ie;
}
function mt(e) {
  return (e % Ve + Ve) % Ve;
}
function Vn(e, t, n, a) {
  const s = mt(e), o = mt(t), i = mt(n), l = mt(o - s), r = mt(i - s), c = mt(s - o), d = mt(s - i);
  return s === o || s === i || a && o === i || l > r && c < d;
}
function Ge(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function rr(e) {
  return Ge(e, -32768, 32767);
}
function Ft(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function as(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const en = (e, t, n, a) => as(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), cr = (e, t, n) => as(e, n, (a) => e[a][t] >= n);
function dr(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const ci = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function ur(e, t) {
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
  }), ci.forEach((n) => {
    const a = "_onData" + ns(n), s = e[n];
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
function Rs(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (ci.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function di(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ui = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function hi(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, ui.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function hr(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const ss = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", qe = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, fr = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function gr(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: m, minDefined: v, maxDefined: g } = i.getUserBounds();
    if (v) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        en(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : en(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, s + 1).reverse().findIndex((b) => !Le(b[l.axis]));
        s -= Math.max(0, y);
      }
      s = Ge(s, 0, a - 1);
    }
    if (g) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        en(r, i.axis, m, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : en(t, d, i.getPixelForValue(m), !0).hi + 1
      );
      if (c) {
        const b = r.slice(y - 1).findIndex((f) => !Le(f[l.axis]));
        y += Math.max(0, b);
      }
      o = Ge(y, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function mr(e) {
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
const Gn = (e) => e === 0 || e === 1, Fs = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ve / n)), Es = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ve / n) + 1, Ln = {
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
  easeInSine: (e) => -Math.cos(e * Ye) + 1,
  easeOutSine: (e) => Math.sin(e * Ye),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ie * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Gn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Gn(e) ? e : Fs(e, 0.075, 0.3),
  easeOutElastic: (e) => Gn(e) ? e : Es(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Gn(e) ? e : e < 0.5 ? 0.5 * Fs(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Es(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ln.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ln.easeInBounce(e * 2) * 0.5 : Ln.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function os(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Os(e) {
  return os(e) ? e : new Rn(e);
}
function Ta(e) {
  return os(e) ? e : new Rn(e).saturate(0.5).darken(0.1).hexString();
}
const pr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], br = [
  "color",
  "borderColor",
  "backgroundColor"
];
function vr(e) {
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
      properties: br
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
function yr(e) {
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
const Vs = /* @__PURE__ */ new Map();
function xr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = Vs.get(n);
  return a || (a = new Intl.NumberFormat(e, t), Vs.set(n, a)), a;
}
function is(e, t, n) {
  return xr(t, n).format(e);
}
const _r = {
  values(e) {
    return je(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (s = "scientific"), o = kr(e, n);
    }
    const i = li(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), is(e, a, r);
  }
};
function kr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var fi = {
  formatters: _r
};
function wr(e) {
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
      callback: fi.formatters.values,
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
const on = /* @__PURE__ */ Object.create(null), Ua = /* @__PURE__ */ Object.create(null);
function Pn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Aa(e, t, n) {
  return typeof t == "string" ? Fn(Pn(e, t), n) : Fn(Pn(e, ""), t);
}
class Cr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => Ta(s.backgroundColor), this.hoverBorderColor = (a, s) => Ta(s.borderColor), this.hoverColor = (a, s) => Ta(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Aa(this, t, n);
  }
  get(t) {
    return Pn(this, t);
  }
  describe(t, n) {
    return Aa(Ua, t, n);
  }
  override(t, n) {
    return Aa(on, t, n);
  }
  route(t, n, a, s) {
    const o = Pn(this, t), i = Pn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[s];
          return De(r) ? Object.assign({}, c, r) : _e(r, c);
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
var ze = /* @__PURE__ */ new Cr({
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
  vr,
  yr,
  wr
]);
function $r(e) {
  return !e || Le(e.size) || Le(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function zs(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Xt(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function Ns(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function qa(e, t, n, a) {
  gi(e, t, n, a, null);
}
function gi(e, t, n, a, s) {
  let o, i, l, r, c, d, h, m;
  const v = t.pointStyle, g = t.rotation, y = t.radius;
  let b = (g || 0) * tr;
  if (v && typeof v == "object" && (o = v.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(b), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, y, 0, 0, Ve) : e.arc(n, a, y, 0, Ve), e.closePath();
        break;
      case "triangle":
        d = s ? s / 2 : y, e.moveTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ls, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), b += Ls, e.lineTo(n + Math.sin(b) * d, a - Math.cos(b) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(b + qt) * r, h = Math.cos(b + qt) * (s ? s / 2 - c : r), l = Math.sin(b + qt) * r, m = Math.sin(b + qt) * (s ? s / 2 - c : r), e.arc(n - h, a - l, c, b - Ie, b - Ye), e.arc(n + m, a - i, c, b - Ye, b), e.arc(n + h, a + l, c, b, b + Ye), e.arc(n - m, a + i, c, b + Ye, b + Ie), e.closePath();
        break;
      case "rect":
        if (!g) {
          r = Math.SQRT1_2 * y, d = s ? s / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        b += qt;
      /* falls through */
      case "rectRot":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + m, a - i), e.lineTo(n + h, a + l), e.lineTo(n - m, a + i), e.closePath();
        break;
      case "crossRot":
        b += qt;
      /* falls through */
      case "cross":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
        break;
      case "star":
        h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i), b += qt, h = Math.cos(b) * (s ? s / 2 : y), i = Math.cos(b) * y, l = Math.sin(b) * y, m = Math.sin(b) * (s ? s / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + m, a - i), e.lineTo(n - m, a + i);
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
function zn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function ls(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function rs(e) {
  e.restore();
}
function Mr(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Sr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function Dr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Le(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Tr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, r = n - o.actualBoundingBoxAscent, c = n + o.actualBoundingBoxDescent, d = s.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Ar(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Nn(e, t, n, a, s, o = {}) {
  const i = je(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = s.string, Dr(e, o), r = 0; r < i.length; ++r)
    c = i[r], o.backdrop && Ar(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), Le(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, n, a, o.maxWidth)), e.fillText(c, n, a, o.maxWidth), Tr(e, n, a, c, o), a += Number(s.lineHeight);
  e.restore();
}
function ma(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ie, Ie, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, Ie, Ye, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Ye, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Ye, !0), e.lineTo(n + i.topLeft, a);
}
const Br = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Lr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Pr(e, t) {
  const n = ("" + e).match(Br);
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
const Ir = (e) => +e || 0;
function cs(e, t) {
  const n = {}, a = De(t), s = a ? Object.keys(t) : t, o = De(e) ? a ? (i) => _e(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = Ir(o(i));
  return n;
}
function mi(e) {
  return cs(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function hn(e) {
  return cs(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ut(e) {
  const t = mi(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Ze(e, t) {
  e = e || {}, t = t || ze.font;
  let n = _e(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = _e(e.style, t.style);
  a && !("" + a).match(Lr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: _e(e.family, t.family),
    lineHeight: Pr(_e(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: _e(e.weight, t.weight),
    string: ""
  };
  return s.string = $r(s), s;
}
function Zn(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function Rr(e, t, n) {
  const { min: a, max: s } = e, o = oi(t, (s - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function ln(e, t) {
  return Object.assign(Object.create(e), t);
}
function ds(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = yi("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => ds([
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
      return bi(l, r, () => Hr(r, t, e, l));
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
      return Hs(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Hs(l);
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
function gn(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: pi(e, a),
    setContext: (o) => gn(e, o, n, a),
    override: (o) => gn(e.override(o), t, n, a)
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
      return bi(o, i, () => Er(o, i, l));
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
function pi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Ht(n) ? n : () => n,
    isIndexable: Ht(a) ? a : () => a
  };
}
const Fr = (e, t) => e ? e + ns(t) : t, us = (e, t) => De(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function bi(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Er(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Ht(l) && i.isScriptable(t) && (l = Or(t, l, e, n)), je(l) && l.length && (l = Vr(t, l, e, i.isIndexable)), us(t, l) && (l = gn(l, s, o && o[t], i)), l;
}
function Or(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(o, i || a);
  return l.delete(e), us(e, r) && (r = hs(s._scopes, s, e, r)), r;
}
function Vr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (De(t[0])) {
    const r = t, c = s._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = hs(c, s, e, d);
      t.push(gn(h, o, i && i[e], l));
    }
  }
  return t;
}
function vi(e, t, n) {
  return Ht(e) ? e(t, n) : e;
}
const zr = (e, t) => e === !0 ? t : typeof e == "string" ? sn(t, e) : void 0;
function Nr(e, t, n, a, s) {
  for (const o of t) {
    const i = zr(n, o);
    if (i) {
      e.add(i);
      const l = vi(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function hs(e, t, n, a) {
  const s = t._rootScopes, o = vi(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Ws(l, i, n, o || n, a);
  return r === null || typeof o < "u" && o !== n && (r = Ws(l, i, o, r, a), r === null) ? !1 : ds(Array.from(l), [
    ""
  ], s, o, () => Wr(t, n, a));
}
function Ws(e, t, n, a, s) {
  for (; n; )
    n = Nr(e, t, n, a, s);
  return n;
}
function Wr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return je(s) && De(n) ? n : s || {};
}
function Hr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = yi(Fr(o, e), n), typeof s < "u")
      return us(e, s) ? hs(n, a, e, s) : s;
}
function yi(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Hs(e) {
  let t = e._keys;
  return t || (t = e._keys = jr(e._scopes)), t;
}
function jr(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Yr = Number.EPSILON || 1e-14, mn = (e, t) => t < e.length && !e[t].skip && e[t], xi = (e) => e === "x" ? "y" : "x";
function Kr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Ka(o, s), r = Ka(i, o);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, m = a * d;
  return {
    previous: {
      x: o.x - h * (i.x - s.x),
      y: o.y - h * (i.y - s.y)
    },
    next: {
      x: o.x + m * (i.x - s.x),
      y: o.y + m * (i.y - s.y)
    }
  };
}
function Ur(e, t, n) {
  const a = e.length;
  let s, o, i, l, r, c = mn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = mn(e, d + 1), !(!r || !c)) {
      if (Bn(t[d], 0, Yr)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      s = n[d] / t[d], o = n[d + 1] / t[d], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = s * i * t[d], n[d + 1] = o * i * t[d]);
    }
}
function qr(e, t, n = "x") {
  const a = xi(n), s = e.length;
  let o, i, l, r = mn(e, 0);
  for (let c = 0; c < s; ++c) {
    if (i = l, l = r, r = mn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (o = (d - i[n]) / 3, l[`cp1${n}`] = d - o, l[`cp1${a}`] = h - o * t[c]), r && (o = (r[n] - d) / 3, l[`cp2${n}`] = d + o, l[`cp2${a}`] = h + o * t[c]);
  }
}
function Xr(e, t = "x") {
  const n = xi(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, r, c = mn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = mn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        s[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      o[i] = l ? c ? _t(s[i - 1]) !== _t(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Ur(e, s, o), qr(e, o, t);
}
function Qn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Gr(e, t) {
  let n, a, s, o, i, l = zn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && zn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = Qn(s.cp1x, t.left, t.right), s.cp1y = Qn(s.cp1y, t.top, t.bottom)), l && (s.cp2x = Qn(s.cp2x, t.left, t.right), s.cp2y = Qn(s.cp2y, t.top, t.bottom)));
}
function Zr(e, t, n, a, s) {
  let o, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    Xr(e, s);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], r = Kr(c, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Gr(e, n);
}
function fs() {
  return typeof window < "u" && typeof document < "u";
}
function gs(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function pa(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const wa = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Qr(e, t) {
  return wa(e).getPropertyValue(t);
}
const Jr = [
  "top",
  "right",
  "bottom",
  "left"
];
function an(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Jr[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const ec = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function tc(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, r;
  if (ec(s, o, e.target))
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
function Zt(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = wa(n), o = s.boxSizing === "border-box", i = an(s, "padding"), l = an(s, "border", "width"), { x: r, y: c, box: d } = tc(e, n), h = i.left + (d && l.left), m = i.top + (d && l.top);
  let { width: v, height: g } = t;
  return o && (v -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - m) / g * n.height / a)
  };
}
function nc(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && gs(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = wa(o), r = an(l, "border", "width"), c = an(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = pa(l.maxWidth, o, "clientWidth"), s = pa(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ga,
    maxHeight: s || ga
  };
}
const Et = (e) => Math.round(e * 10) / 10;
function ac(e, t, n, a) {
  const s = wa(e), o = an(s, "margin"), i = pa(s.maxWidth, e, "clientWidth") || ga, l = pa(s.maxHeight, e, "clientHeight") || ga, r = nc(e, t, n);
  let { width: c, height: d } = r;
  if (s.boxSizing === "content-box") {
    const m = an(s, "border", "width"), v = an(s, "padding");
    c -= v.width + m.width, d -= v.height + m.height;
  }
  return c = Math.max(0, c - o.width), d = Math.max(0, a ? c / a : d - o.height), c = Et(Math.min(c, i, r.maxWidth)), d = Et(Math.min(d, l, r.maxHeight)), c && !d && (d = Et(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Et(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function js(e, t, n) {
  const a = t || 1, s = Et(e.height * a), o = Et(e.width * a);
  e.height = Et(e.height), e.width = Et(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const sc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    fs() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Ys(e, t) {
  const n = Qr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function Qt(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function oc(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function ic(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Qt(e, s, n), l = Qt(s, o, n), r = Qt(o, t, n), c = Qt(i, l, n), d = Qt(l, r, n);
  return Qt(c, d, n);
}
const lc = function(e, t) {
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
}, rc = function() {
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
function fn(e, t, n) {
  return e ? lc(t, n) : rc();
}
function _i(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ki(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function wi(e) {
  return e === "angle" ? {
    between: Vn,
    compare: lr,
    normalize: mt
  } : {
    between: Ft,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ks({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function cc(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = wi(a), r = t.length;
  let { start: c, end: d, loop: h } = e, m, v;
  if (h) {
    for (c += r, d += r, m = 0, v = r; m < v && i(l(t[c % r][a]), s, o); ++m)
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
function dc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: r, normalize: c } = wi(a), { start: d, end: h, loop: m, style: v } = cc(e, t, n), g = [];
  let y = !1, b = null, f, _, x;
  const w = () => r(s, x, f) && l(s, x) !== 0, C = () => l(o, f) === 0 || r(o, x, f), S = () => y || w(), M = () => !y || C();
  for (let O = d, A = d; O <= h; ++O)
    _ = t[O % i], !_.skip && (f = c(_[a]), f !== x && (y = r(f, s, o), b === null && S() && (b = l(f, s) === 0 ? O : A), b !== null && M() && (g.push(Ks({
      start: b,
      end: O,
      loop: m,
      count: i,
      style: v
    })), b = null), A = O, x = f));
  return b !== null && g.push(Ks({
    start: b,
    end: h,
    loop: m,
    count: i,
    style: v
  })), g;
}
function uc(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = dc(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function hc(e, t, n, a) {
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
function fc(e, t, n, a) {
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
function gc(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = hc(n, s, o, a);
  if (a === !0)
    return Us(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const r = l < i ? l + s : l, c = !!e._fullLoop && i === 0 && l === s - 1;
  return Us(e, fc(n, i, r, c), n, t);
}
function Us(e, t, n, a) {
  return !a || !a.setContext || !n ? t : mc(e, t, n, a);
}
function mc(e, t, n, a) {
  const s = e._chart.getContext(), o = qs(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = o, h = t[0].start, m = h;
  function v(g, y, b, f) {
    const _ = l ? -1 : 1;
    if (g !== y) {
      for (g += r; n[g % r].skip; )
        g -= _;
      for (; n[y % r].skip; )
        y += _;
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
    for (m = h + 1; m <= g.end; m++) {
      const f = n[m % r];
      b = qs(a.setContext(ln(s, {
        type: "segment",
        p0: y,
        p1: f,
        p0DataIndex: (m - 1) % r,
        p1DataIndex: m % r,
        datasetIndex: i
      }))), pc(b, d) && v(h, m - 1, g.loop, d), y = f, d = b;
    }
    h < m - 1 && v(h, m - 1, g.loop, d);
  }
  return c;
}
function qs(e) {
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
function pc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return os(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Jn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function bc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Jn(n, t, "left"),
    right: Jn(n, t, "right"),
    top: Jn(a, t, "top"),
    bottom: Jn(a, t, "bottom")
  } : t;
}
function vc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = bc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class yc {
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
    this._request || (this._running = !0, this._request = ui.call(window, () => {
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
var $t = /* @__PURE__ */ new yc();
const Xs = "transparent", xc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Os(e || Xs), s = a.valid && Os(t || Xs);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class _c {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Zn([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Zn([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || xc[t.type || typeof i], this._easing = Ln[t.easing] || Ln.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Zn([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Zn([
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
class Ci {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!De(t))
      return;
    const n = Object.keys(ze.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!De(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (je(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = wc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && kc(t.options.$animations, a).then(() => {
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
      const m = a.get(c);
      if (h)
        if (m && h.active()) {
          h.update(m, d, l);
          continue;
        } else
          h.cancel();
      if (!m || !m.duration) {
        t[c] = d;
        continue;
      }
      o[c] = h = new _c(m, t, c, d), s.push(h);
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
      return $t.add(this._chart, a), !0;
  }
}
function kc(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function wc(e, t) {
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
function Gs(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function Cc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Gs(e, n), s = Gs(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function $c(e) {
  let t, n, a, s;
  return De(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function $i(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Zs(e, t, n, a = {}) {
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
    c = e.values[r], dt(c) && (o || t === 0 || _t(t) === _t(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Mc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [s]: d,
      [o]: e[d]
    };
  return l;
}
function Ba(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Sc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Dc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function Tc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Qs(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Js(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, r = o.axis, c = i.axis, d = Sc(o, i, a), h = t.length;
  let m;
  for (let v = 0; v < h; ++v) {
    const g = t[v], { [r]: y, [c]: b } = g, f = g._stacks || (g._stacks = {});
    m = f[c] = Tc(s, d, y), m[l] = b, m._top = Qs(m, i, !0, a.type), m._bottom = Qs(m, i, !1, a.type);
    const _ = m._visualValues || (m._visualValues = {});
    _[l] = b;
  }
}
function La(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Ac(e, t) {
  return ln(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Bc(e, t, n) {
  return ln(e, {
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
function vn(e, t) {
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
const Pa = (e) => e === "reset" || e === "none", eo = (e, t) => t ? e : Object.assign({}, e), Lc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: $i(n, !0),
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
    this.configure(), this.linkScales(), t._stacked = Ba(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && vn(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, m, v, g) => h === "x" ? m : h === "r" ? g : v, o = n.xAxisID = _e(a.xAxisID, La(t, "x")), i = n.yAxisID = _e(a.yAxisID, La(t, "y")), l = n.rAxisID = _e(a.rAxisID, La(t, "r")), r = n.indexAxis, c = n.iAxisID = s(r, o, i, l), d = n.vAxisID = s(r, i, o, l);
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
    this._data && Rs(this._data, this), t._stacked && vn(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (De(n)) {
      const s = this._cachedMeta;
      this._data = Mc(n, s);
    } else if (a !== n) {
      if (a) {
        Rs(a, this);
        const s = this._cachedMeta;
        vn(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && ur(n, this), this._syncList = [], this._data = n;
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
    n._stacked = Ba(n.vScale, n), n.stack !== a.stack && (s = !0, vn(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Js(this, n._parsed), n._stacked = Ba(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let r = t === 0 && n === s.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, m;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, m = s;
    else {
      je(s[t]) ? m = this.parseArrayData(a, s, t, n) : De(s[t]) ? m = this.parseObjectData(a, s, t, n) : m = this.parsePrimitiveData(a, s, t, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = m[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && Js(this, m);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, r = i.axis, c = o.getLabels(), d = o === i, h = new Array(s);
    let m, v, g;
    for (m = 0, v = s; m < v; ++m)
      g = m + a, h[m] = {
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
    let d, h, m, v;
    for (d = 0, h = s; d < h; ++d)
      m = d + a, v = n[m], c[d] = {
        x: o.parse(sn(v, l), m),
        y: i.parse(sn(v, r), m)
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
      keys: $i(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Zs(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Zs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), r = Lc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Dc(l);
    let m, v;
    function g() {
      v = s[m];
      const y = v[l.axis];
      return !dt(v[t.axis]) || d > y || h < y;
    }
    for (m = 0; m < i && !(!g() && (this.updateRangeFromParsed(c, t, v, r), o)); ++m)
      ;
    if (o) {
      for (m = i - 1; m >= 0; --m)
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
      i = n[s][t.axis], dt(i) && a.push(i);
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
    this.update(t || "default"), n._clip = $c(_e(this.options.clip, Cc(n.xScale, n.yScale, this.getMaxOverflow())));
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
      o = i.$context || (i.$context = Bc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ac(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], r = this.enableOptionSharing && En(a);
    if (l)
      return eo(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], m = c.getOptionScopes(this.getDataset(), d), v = Object.keys(ze.elements[t]), g = () => this.getContext(a, s, n), y = c.resolveNamedOptions(m, v, g, h);
    return y.$shared && (y.$shared = r, o[i] = Object.freeze(eo(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let r;
    if (s.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), m = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(m, this.getContext(t, a, n));
    }
    const c = new Ci(s, r && r.animations);
    return r && r._cacheable && (o[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Pa(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    Pa(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Pa(n) && this._resolveAnimations(void 0, n).update(t, a);
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
      a._stacked && vn(a, s);
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
function Pc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = di(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function Ic(e) {
  const t = e.iScale, n = Pc(t, e.type);
  let a = t._length, s, o, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (En(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), r();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), r();
  return a;
}
function Rc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return Le(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function Fc(e, t, n, a) {
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
function Ec(e, t, n, a) {
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
function Mi(e, t, n, a) {
  return je(e) ? Ec(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function to(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, r = [];
  let c, d, h, m;
  for (c = n, d = n + a; c < d; ++c)
    m = t[c], h = {}, h[s.axis] = l || s.parse(i[c], c), r.push(Mi(m, h, o, c));
  return r;
}
function Ia(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Oc(e, t, n) {
  return e !== 0 ? _t(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Vc(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function zc(e, t, n, a) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Vc(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = c : (n._bottom || 0) === a ? s = d : (o[no(d, i, l, r)] = !0, s = c)), o[no(s, i, l, r)] = !0, e.borderSkipped = o;
}
function no(e, t, n, a) {
  return a ? (e = Nc(e, t, n), e = ao(e, n, t)) : e = ao(e, t, n), e;
}
function Nc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function ao(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Wc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Hc extends Ca {
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
    return to(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return to(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = o.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let m, v, g, y;
    for (m = a, v = a + s; m < v; ++m)
      y = n[m], g = {}, g[o.axis] = o.parse(sn(y, c), m), h.push(Mi(sn(y, d), g, i, m));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = Ia(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: m } = this._getSharedOptions(n, s);
    for (let v = n; v < n + a; v++) {
      const g = this.getParsed(v), y = o || Le(g[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), b = this._calculateBarIndexPixels(v, d), f = (g._stacks || {})[l.axis], _ = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !f || Ia(g._custom) || i === f._top || i === f._bottom,
        x: c ? y.head : b.center,
        y: c ? b.center : y.head,
        height: c ? b.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : b.size
      };
      m && (_.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : s));
      const x = _.options || t[v].options;
      zc(_, x, f, i), Wc(_, x, d.ratio), this.updateElement(t[v], v, _, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), m = h && h[d.vScale.axis];
      if (Le(m) || isNaN(m))
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
      min: l || Ic(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, r = this.getParsed(t), c = r._custom, d = Ia(c);
    let h = r[n.axis], m = 0, v = a ? this.applyStack(n, r, a) : h, g, y;
    v !== h && (m = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && _t(h) !== _t(c.barEnd) && (m = 0), m += h);
    const b = !Le(o) && !d ? o : m;
    let f = n.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(m + v) : g = f, y = g - f, Math.abs(y) < i) {
      y = Oc(y, n, l) * i, h === l && (f -= y / 2);
      const _ = n.getPixelForDecimal(0), x = n.getPixelForDecimal(1), w = Math.min(_, x), C = Math.max(_, x);
      f = Math.max(Math.min(f, C), w), g = f + y, a && !d && (r._stacks[n.axis]._visualValues[s] = n.getValueForPixel(g) - n.getValueForPixel(f));
    }
    if (f === n.getPixelForValue(l)) {
      const _ = _t(y) * n.getLineWidthForValue(l) / 2;
      f += _, y -= _;
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
      const d = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? Fc(t, n, s, d * c) : Rc(t, n, s, d * c), m = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(_e(m, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + v;
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
function jc(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Ve) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), m = Math.sin(r), v = (x, w, C) => Vn(x, l, r, !0) ? 1 : Math.max(w, w * n, C, C * n), g = (x, w, C) => Vn(x, l, r, !0) ? -1 : Math.min(w, w * n, C, C * n), y = v(0, c, h), b = v(Ye, d, m), f = g(Ie, c, h), _ = g(Ie + Ye, d, m);
    a = (y - f) / 2, s = (b - _) / 2, o = -(y + f) / 2, i = -(b + _) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Yc extends Ca {
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
      if (De(a[t])) {
        const { key: r = "value" } = this._parsing;
        o = (c) => +sn(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return Dt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Dt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ve, n = -Ve;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(ql(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: m, ratioY: v, offsetX: g, offsetY: y } = jc(h, d, r), b = (a.width - i) / m, f = (a.height - i) / v, _ = Math.max(Math.min(b, f) / 2, 0), x = oi(this.options.radius, _), w = Math.max(x * r, 0), C = (x - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * x, this.offsetY = y * x, s.total = this.calculateTotal(), this.outerRadius = x - C * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - C * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Ve);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, m = o && c.animateScale, v = m ? 0 : this.innerRadius, g = m ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: b } = this._getSharedOptions(n, s);
    let f = this._getRotation(), _;
    for (_ = 0; _ < n; ++_)
      f += this._circumference(_, o);
    for (_ = n; _ < n + a; ++_) {
      const x = this._circumference(_, o), w = t[_], C = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: f,
        endAngle: f + x,
        circumference: x,
        outerRadius: g,
        innerRadius: v
      };
      b && (C.options = y || this.resolveDataElementOptions(_, w.active ? "active" : s)), f += x, this.updateElement(w, _, C, s);
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
    return n > 0 && !isNaN(t) ? Ve * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = is(n._parsed[t], a.options.locale);
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
class Kc extends Ca {
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
    let { start: l, count: r } = gr(n, s, i);
    this._drawStart = l, this._drawCount = r, mr(n) && (l = 0, r = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(s, l, r, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, s), m = i.axis, v = l.axis, { spanGaps: g, segment: y } = this.options, b = On(g) ? g : Number.POSITIVE_INFINITY, f = this.chart._animationsDisabled || o || s === "none", _ = n + a, x = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let C = 0; C < x; ++C) {
      const S = t[C], M = f ? S : {};
      if (C < n || C >= _) {
        M.skip = !0;
        continue;
      }
      const O = this.getParsed(C), A = Le(O[v]), P = M[m] = i.getPixelForValue(O[m], C), B = M[v] = o || A ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, O, r) : O[v], C);
      M.skip = isNaN(P) || isNaN(B) || A, M.stop = C > 0 && Math.abs(O[m] - w[m]) > b, y && (M.parsed = O, M.raw = c.data[C]), h && (M.options = d || this.resolveDataElementOptions(C, S.active ? "active" : s)), f || this.updateElement(S, C, M, s), w = O;
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
class Uc extends Yc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Gt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ms {
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
    Object.assign(ms.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Gt();
  }
  parse() {
    return Gt();
  }
  format() {
    return Gt();
  }
  add() {
    return Gt();
  }
  diff() {
    return Gt();
  }
  startOf() {
    return Gt();
  }
  endOf() {
    return Gt();
  }
}
var qc = {
  _date: ms
};
function Xc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const c = l._reversePixels ? cr : en;
    if (a) {
      if (s._sharedOptions) {
        const d = o[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const m = c(o, t, n - h), v = c(o, t, n + h);
          return {
            lo: m.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(o, t, n);
      if (r) {
        const { vScale: h } = s._cachedMeta, { _parsed: m } = e, v = m.slice(0, d.lo + 1).reverse().findIndex((y) => !Le(y[h.axis]));
        d.lo -= Math.max(0, v);
        const g = m.slice(d.hi).findIndex((y) => !Le(y[h.axis]));
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
    const { index: c, data: d } = o[l], { lo: h, hi: m } = Xc(o[l], t, i, s);
    for (let v = h; v <= m; ++v) {
      const g = d[v];
      g.skip || a(g, c, v);
    }
  }
}
function Gc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function Ra(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || $a(e, n, t, function(l, r, c) {
    !s && !zn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), o;
}
function Zc(e, t, n, a) {
  let s = [];
  function o(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = ri(i, {
      x: t.x,
      y: t.y
    });
    Vn(h, c, d) && s.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return $a(e, n, t, o), s;
}
function Qc(e, t, n, a, s, o) {
  let i = [];
  const l = Gc(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, m) {
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
        index: m
      }
    ], r = b) : b === r && i.push({
      element: d,
      datasetIndex: h,
      index: m
    });
  }
  return $a(e, n, t, c), i;
}
function Fa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Zc(e, t, n, s) : Qc(e, t, n, a, s, o);
}
function so(e, t, n, a, s) {
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
var Jc = {
  modes: {
    index(e, t, n, a) {
      const s = Zt(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Ra(e, s, o, a, i) : Fa(e, s, o, !1, a, i), r = [];
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
      const s = Zt(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Ra(e, s, o, a, i) : Fa(e, s, o, !1, a, i);
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
      const s = Zt(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Ra(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Zt(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return Fa(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = Zt(t, e);
      return so(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = Zt(t, e);
      return so(e, s, "y", n.intersect, a);
    }
  }
};
const Si = [
  "left",
  "top",
  "right",
  "bottom"
];
function yn(e, t) {
  return e.filter((n) => n.pos === t);
}
function oo(e, t) {
  return e.filter((n) => Si.indexOf(n.pos) === -1 && n.box.axis === t);
}
function xn(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function ed(e) {
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
function td(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !Si.includes(s))
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
function nd(e, t) {
  const n = td(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = s) : (l.width = a, l.height = d ? d * s : r && t.availableHeight);
  }
  return n;
}
function ad(e) {
  const t = ed(e), n = xn(t.filter((c) => c.box.fullSize), !0), a = xn(yn(t, "left"), !0), s = xn(yn(t, "right")), o = xn(yn(t, "top"), !0), i = xn(yn(t, "bottom")), l = oo(t, "x"), r = oo(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(r).concat(i).concat(l),
    chartArea: yn(t, "chartArea"),
    vertical: a.concat(s).concat(r),
    horizontal: o.concat(i).concat(l)
  };
}
function io(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Di(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function sd(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!De(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && Di(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - io(i, e, "left", "right")), r = Math.max(0, t.outerHeight - io(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function od(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function id(e, t) {
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
function Dn(e, t, n, a) {
  const s = [];
  let o, i, l, r, c, d;
  for (o = 0, i = e.length, c = 0; o < i; ++o) {
    l = e[o], r = l.box, r.update(l.width || t.w, l.height || t.h, id(l.horizontal, t));
    const { same: h, other: m } = sd(t, n, l, a);
    c |= h && s.length, d = d || m, r.fullSize || s.push(l);
  }
  return c && Dn(s, t, n, a) || d;
}
function ea(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function lo(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, m = c.size || r.height;
      En(c.start) && (i = c.start), r.fullSize ? ea(r, s.left, i, n.outerWidth - s.right - s.left, m) : ea(r, t.left + c.placed, i, h, m), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, m = c.size || r.width;
      En(c.start) && (o = c.start), r.fullSize ? ea(r, o, s.top, m, n.outerHeight - s.bottom - s.top) : ea(r, o, t.top + c.placed, m, h), c.start = o, c.placed += h, o = r.right;
    }
  }
  t.x = o, t.y = i;
}
var ct = {
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
    const s = ut(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = ad(e.boxes), r = l.vertical, c = l.horizontal;
    Pe(e.boxes, (y) => {
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
    }), m = Object.assign({}, s);
    Di(m, ut(a));
    const v = Object.assign({
      maxPadding: m,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), g = nd(r.concat(c), h);
    Dn(l.fullSize, v, h, g), Dn(r, v, h, g), Dn(c, v, h, g) && Dn(r, v, h, g), od(v), lo(l.leftAndTop, v, h, g), v.x += v.w, v.y += v.h, lo(l.rightAndBottom, v, h, g), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Pe(l.chartArea, (y) => {
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
class Ti {
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
class ld extends Ti {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ca = "$chartjs", rd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, ro = (e) => e === null || e === "";
function cd(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[ca] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", ro(s)) {
    const o = Ys(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (ro(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Ys(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Ai = sc ? {
  passive: !0
} : !1;
function dd(e, t, n) {
  e && e.addEventListener(t, n, Ai);
}
function ud(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Ai);
}
function hd(e, t) {
  const n = rd[e.type] || e.type, { x: a, y: s } = Zt(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function ba(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function fd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ba(l.addedNodes, a), i = i && !ba(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function gd(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || ba(l.removedNodes, a), i = i && !ba(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Wn = /* @__PURE__ */ new Map();
let co = 0;
function Bi() {
  const e = window.devicePixelRatio;
  e !== co && (co = e, Wn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function md(e, t) {
  Wn.size || window.addEventListener("resize", Bi), Wn.set(e, t);
}
function pd(e) {
  Wn.delete(e), Wn.size || window.removeEventListener("resize", Bi);
}
function bd(e, t, n) {
  const a = e.canvas, s = a && gs(a);
  if (!s)
    return;
  const o = hi((l, r) => {
    const c = s.clientWidth;
    n(l, r), c < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || o(c, d);
  });
  return i.observe(s), md(e, o), i;
}
function Ea(e, t, n) {
  n && n.disconnect(), t === "resize" && pd(e);
}
function vd(e, t, n) {
  const a = e.canvas, s = hi((o) => {
    e.ctx !== null && n(hd(o, e));
  }, e);
  return dd(a, t, s), s;
}
class yd extends Ti {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (cd(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[ca])
      return !1;
    const a = n[ca].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      Le(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[ca], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: fd,
      detach: gd,
      resize: bd
    }[n] || vd;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: Ea,
      detach: Ea,
      resize: Ea
    }[n] || ud)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return ac(t, n, a, s);
  }
  isAttached(t) {
    const n = t && gs(t);
    return !!(n && n.isConnected);
  }
}
function xd(e) {
  return !fs() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? ld : yd;
}
let At = class {
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
    return On(this.x) && On(this.y);
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
function _d(e, t) {
  const n = e.options.ticks, a = kd(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? Cd(t) : [], i = o.length, l = o[0], r = o[i - 1], c = [];
  if (i > s)
    return $d(t, c, o, i / s), c;
  const d = wd(o, t, s);
  if (i > 0) {
    let h, m;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (ta(t, c, d, Le(v) ? 0 : l - v, l), h = 0, m = i - 1; h < m; h++)
      ta(t, c, d, o[h], o[h + 1]);
    return ta(t, c, d, r, Le(v) ? t.length : r + v), c;
  }
  return ta(t, c, d), c;
}
function kd(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function wd(e, t, n) {
  const a = Md(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = nr(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const r = o[i];
    if (r > s)
      return r;
  }
  return Math.max(s, 1);
}
function Cd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function $d(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function ta(e, t, n, a, s) {
  const o = _e(a, 0), i = Math.min(_e(s, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), s && (r = s - a, n = r / Math.floor(r / n)), d = o; d < 0; )
    l++, d = Math.round(o + l * n);
  for (c = Math.max(o, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(o + l * n));
}
function Md(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Sd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, uo = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ho = (e, t) => Math.min(t || e, e);
function fo(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function Dd(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(s), c;
  if (!(n && (a === 1 ? c = Math.max(r - o, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(s - 1)) / 2, r += s < t ? c : -c, r < o - l || r > i + l)))
    return r;
}
function Td(e, t) {
  Pe(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function _n(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function go(e, t) {
  if (!e.display)
    return 0;
  const n = Ze(e.font, t), a = ut(e.padding);
  return (je(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Ad(e, t) {
  return ln(e, {
    scale: t,
    type: "scale"
  });
}
function Bd(e, t, n) {
  return ln(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Ld(e, t, n) {
  let a = ss(e);
  return (n && t !== "right" || !n && t === "right") && (a = Sd(a)), a;
}
function Pd(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, m, v, g;
  const y = i - s, b = l - o;
  if (e.isHorizontal()) {
    if (v = qe(a, o, l), De(n)) {
      const f = Object.keys(n)[0], _ = n[f];
      g = d[f].getPixelForValue(_) + y - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + y - t : g = uo(e, n, t);
    m = l - o;
  } else {
    if (De(n)) {
      const f = Object.keys(n)[0], _ = n[f];
      v = d[f].getPixelForValue(_) - b + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - b + t : v = uo(e, n, t);
    g = qe(a, i, s), h = n === "left" ? -Ye : Ye;
  }
  return {
    titleX: v,
    titleY: g,
    maxWidth: m,
    rotation: h
  };
}
class pn extends At {
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
    return t = bt(t, Number.POSITIVE_INFINITY), n = bt(n, Number.NEGATIVE_INFINITY), a = bt(a, Number.POSITIVE_INFINITY), s = bt(s, Number.NEGATIVE_INFINITY), {
      min: bt(t, a),
      max: bt(n, s),
      minDefined: dt(t),
      maxDefined: dt(n)
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
      min: bt(n, bt(a, n)),
      max: bt(a, bt(n, a))
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
    Re(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Rr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? fo(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = _d(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Re(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Re(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Re(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Re(this.options[t], [
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
    Re(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Re(n.callback, [
        o.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Re(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Re(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = ho(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, r, c;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, m = d.highest.height, v = Ge(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - _n(t.grid) - n.padding - go(t.title, this.chart.options.font), c = Math.sqrt(h * h + m * m), i = ir(Math.min(Math.asin(Ge((d.highest.height + 6) / l, -1, 1)), Math.asin(Ge(r / c, -1, 1)) - Math.asin(Ge(m / c, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Re(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Re(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = go(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = _n(o) + r) : (t.height = this.maxHeight, t.width = _n(o) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: m } = this._getLabelSizes(), v = a.padding * 2, g = Dt(this.labelRotation), y = Math.cos(g), b = Math.sin(g);
        if (l) {
          const f = a.mirror ? 0 : b * h.width + y * m.height;
          t.height = Math.min(this.maxHeight, t.height + f + v);
        } else {
          const f = a.mirror ? 0 : y * h.width + b * m.height;
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
      let m = 0, v = 0;
      r ? c ? (m = s * t.width, v = a * n.height) : (m = a * t.height, v = s * n.width) : o === "start" ? v = n.width : o === "end" ? m = t.width : o !== "inner" && (m = t.width / 2, v = n.width / 2), this.paddingLeft = Math.max((m - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      o === "start" ? (d = 0, h = t.height) : o === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Re(this.options.afterFit, [
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
      Le(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = fo(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], r = Math.floor(n / ho(n, a));
    let c = 0, d = 0, h, m, v, g, y, b, f, _, x, w, C;
    for (h = 0; h < n; h += r) {
      if (g = t[h].label, y = this._resolveTickFontOptions(h), s.font = b = y.string, f = o[b] = o[b] || {
        data: {},
        gc: []
      }, _ = y.lineHeight, x = w = 0, !Le(g) && !je(g))
        x = zs(s, f.data, f.gc, x, g), w = _;
      else if (je(g))
        for (m = 0, v = g.length; m < v; ++m)
          C = g[m], !Le(C) && !je(C) && (x = zs(s, f.data, f.gc, x, C), w += _);
      i.push(x), l.push(w), c = Math.max(x, c), d = Math.max(w, d);
    }
    Td(o, n);
    const S = i.indexOf(c), M = l.indexOf(d), O = (A) => ({
      width: i[A] || 0,
      height: l[A] || 0
    });
    return {
      first: O(0),
      last: O(n - 1),
      widest: O(S),
      highest: O(M),
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
    return rr(this._alignToPixels ? Xt(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Bd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Ad(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Dt(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, r = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * s ? l / a : r / s : r * s < l * a ? r / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, r = o.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), m = _n(o), v = [], g = l.setContext(this.getContext()), y = g.display ? g.width : 0, b = y / 2, f = function(le) {
      return Xt(a, le, y);
    };
    let _, x, w, C, S, M, O, A, P, B, F, X;
    if (i === "top")
      _ = f(this.bottom), M = this.bottom - m, A = _ - b, B = f(t.top) + b, X = t.bottom;
    else if (i === "bottom")
      _ = f(this.top), B = t.top, X = f(t.bottom) - b, M = _ + b, A = this.top + m;
    else if (i === "left")
      _ = f(this.right), S = this.right - m, O = _ - b, P = f(t.left) + b, F = t.right;
    else if (i === "right")
      _ = f(this.left), P = t.left, F = f(t.right) - b, S = _ + b, O = this.left + m;
    else if (n === "x") {
      if (i === "center")
        _ = f((t.top + t.bottom) / 2 + 0.5);
      else if (De(i)) {
        const le = Object.keys(i)[0], ce = i[le];
        _ = f(this.chart.scales[le].getPixelForValue(ce));
      }
      B = t.top, X = t.bottom, M = _ + b, A = M + m;
    } else if (n === "y") {
      if (i === "center")
        _ = f((t.left + t.right) / 2);
      else if (De(i)) {
        const le = Object.keys(i)[0], ce = i[le];
        _ = f(this.chart.scales[le].getPixelForValue(ce));
      }
      S = _ - b, O = S - m, P = t.left, F = t.right;
    }
    const te = _e(s.ticks.maxTicksLimit, h), U = Math.max(1, Math.ceil(h / te));
    for (x = 0; x < h; x += U) {
      const le = this.getContext(x), ce = o.setContext(le), G = l.setContext(le), de = ce.lineWidth, N = ce.color, J = G.dash || [], se = G.dashOffset, ge = ce.tickWidth, xe = ce.tickColor, Y = ce.tickBorderDash || [], q = ce.tickBorderDashOffset;
      w = Dd(this, x, r), w !== void 0 && (C = Xt(a, w, de), c ? S = O = P = F = C : M = A = B = X = C, v.push({
        tx1: S,
        ty1: M,
        tx2: O,
        ty2: A,
        x1: P,
        y1: B,
        x2: F,
        y2: X,
        width: de,
        color: N,
        borderDash: J,
        borderDashOffset: se,
        tickWidth: ge,
        tickColor: xe,
        tickBorderDash: Y,
        tickBorderDashOffset: q
      }));
    }
    return this._ticksLength = h, this._borderValue = _, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = o, m = _n(a.grid), v = m + d, g = h ? -d : v, y = -Dt(this.labelRotation), b = [];
    let f, _, x, w, C, S, M, O, A, P, B, F, X = "middle";
    if (s === "top")
      S = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      S = this.top + g, M = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const U = this._getYAxisLabelAlignment(m);
      M = U.textAlign, C = U.x;
    } else if (s === "right") {
      const U = this._getYAxisLabelAlignment(m);
      M = U.textAlign, C = U.x;
    } else if (n === "x") {
      if (s === "center")
        S = (t.top + t.bottom) / 2 + v;
      else if (De(s)) {
        const U = Object.keys(s)[0], le = s[U];
        S = this.chart.scales[U].getPixelForValue(le) + v;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        C = (t.left + t.right) / 2 - v;
      else if (De(s)) {
        const U = Object.keys(s)[0], le = s[U];
        C = this.chart.scales[U].getPixelForValue(le);
      }
      M = this._getYAxisLabelAlignment(m).textAlign;
    }
    n === "y" && (r === "start" ? X = "top" : r === "end" && (X = "bottom"));
    const te = this._getLabelSizes();
    for (f = 0, _ = l.length; f < _; ++f) {
      x = l[f], w = x.label;
      const U = o.setContext(this.getContext(f));
      O = this.getPixelForTick(f) + o.labelOffset, A = this._resolveTickFontOptions(f), P = A.lineHeight, B = je(w) ? w.length : 1;
      const le = B / 2, ce = U.color, G = U.textStrokeColor, de = U.textStrokeWidth;
      let N = M;
      i ? (C = O, M === "inner" && (f === _ - 1 ? N = this.options.reverse ? "left" : "right" : f === 0 ? N = this.options.reverse ? "right" : "left" : N = "center"), s === "top" ? c === "near" || y !== 0 ? F = -B * P + P / 2 : c === "center" ? F = -te.highest.height / 2 - le * P + P : F = -te.highest.height + P / 2 : c === "near" || y !== 0 ? F = P / 2 : c === "center" ? F = te.highest.height / 2 - le * P : F = te.highest.height - B * P, h && (F *= -1), y !== 0 && !U.showLabelBackdrop && (C += P / 2 * Math.sin(y))) : (S = O, F = (1 - B) * P / 2);
      let J;
      if (U.showLabelBackdrop) {
        const se = ut(U.backdropPadding), ge = te.heights[f], xe = te.widths[f];
        let Y = F - se.top, q = 0 - se.left;
        switch (X) {
          case "middle":
            Y -= ge / 2;
            break;
          case "bottom":
            Y -= ge;
            break;
        }
        switch (M) {
          case "center":
            q -= xe / 2;
            break;
          case "right":
            q -= xe;
            break;
          case "inner":
            f === _ - 1 ? q -= xe : f > 0 && (q -= xe / 2);
            break;
        }
        J = {
          left: q,
          top: Y,
          width: xe + se.width,
          height: ge + se.height,
          color: U.backdropColor
        };
      }
      b.push({
        label: w,
        font: A,
        textOffset: F,
        options: {
          rotation: y,
          color: ce,
          strokeColor: G,
          strokeWidth: de,
          textAlign: N,
          textBaseline: X,
          translation: [
            C,
            S
          ],
          backdrop: J
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Dt(this.labelRotation))
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
    let c, d, h, m;
    this.isHorizontal() ? (c = Xt(t, this.left, i) - i / 2, d = Xt(t, this.right, l) + l / 2, h = m = r) : (h = Xt(t, this.top, i) - i / 2, m = Xt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, m), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && ls(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Nn(a, c, 0, d, r, l);
    }
    s && rs(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Ze(a.font), i = ut(a.padding), l = a.align;
    let r = o.lineHeight / 2;
    n === "bottom" || n === "center" || De(n) ? (r += i.bottom, je(a.text) && (r += o.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: m } = Pd(this, r, n, l);
    Nn(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: m,
      textAlign: Ld(l, n, s),
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
    return !this._isVisible() || this.draw !== pn.prototype.draw ? [
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
    return Ze(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class na {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Fd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, Id(t, i, a), this.override && ze.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in ze[s] && (delete ze[s][a], this.override && delete on[a]);
  }
}
function Id(e, t, n) {
  const a = Fn(/* @__PURE__ */ Object.create(null), [
    n ? ze.get(n) : {},
    ze.get(t),
    e.defaults
  ]);
  ze.set(t, a), e.defaultRoutes && Rd(t, e.defaultRoutes), e.descriptors && ze.describe(t, e.descriptors);
}
function Rd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    ze.route(o, s, r, l);
  });
}
function Fd(e) {
  return "id" in e && "defaults" in e;
}
class Ed {
  constructor() {
    this.controllers = new na(Ca, "datasets", !0), this.elements = new na(At, "elements"), this.plugins = new na(Object, "plugins"), this.scales = new na(pn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : Pe(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = ns(t);
    Re(a["before" + s], [], a), n[t](a), Re(a["after" + s], [], a);
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
var yt = /* @__PURE__ */ new Ed();
class Od {
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
      if (Re(l, r, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Le(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = _e(a.options && a.options.plugins, {}), o = Vd(a);
    return s === !1 && !n ? [] : Nd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function Vd(e) {
  const t = {}, n = [], a = Object.keys(yt.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(yt.getPlugin(a[o]));
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
function zd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Nd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = zd(a[r], s);
    c !== null && o.push({
      plugin: l,
      options: Wd(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return o;
}
function Wd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Xa(e, t) {
  const n = ze.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Hd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function jd(e, t) {
  return e === t ? "_index_" : "_value_";
}
function mo(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Yd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ga(e, ...t) {
  if (mo(e))
    return e;
  for (const n of t) {
    const a = n.axis || Yd(n.position) || e.length > 1 && mo(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function po(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Kd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return po(e, "x", n[0]) || po(e, "y", n[0]);
  }
  return {};
}
function Ud(e, t) {
  const n = on[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Xa(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!De(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Ga(i, l, Kd(i, e), ze.scales[l.type]), c = jd(r, s), d = n.scales || {};
    o[i] = An(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Xa(l, t), d = (on[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const m = Hd(h, r), v = i[m + "AxisID"] || m;
      o[v] = o[v] || /* @__PURE__ */ Object.create(null), An(o[v], [
        {
          axis: m
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    An(l, [
      ze.scales[l.type],
      ze.scale
    ]);
  }), o;
}
function Li(e) {
  const t = e.options || (e.options = {});
  t.plugins = _e(t.plugins, {}), t.scales = Ud(e, t);
}
function Pi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function qd(e) {
  return e = e || {}, e.data = Pi(e.data), Li(e), e;
}
const bo = /* @__PURE__ */ new Map(), Ii = /* @__PURE__ */ new Set();
function aa(e, t) {
  let n = bo.get(e);
  return n || (n = t(), bo.set(e, n), Ii.add(n)), n;
}
const kn = (e, t, n) => {
  const a = sn(t, n);
  a !== void 0 && e.add(a);
};
class Xd {
  constructor(t) {
    this._config = qd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Pi(t);
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
    this.clearCache(), Li(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return aa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return aa(`${t}.transition.${n}`, () => [
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
    return aa(`${t}-${n}`, () => [
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
    return aa(`${a}-plugin-${n}`, () => [
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
      t && (r.add(t), d.forEach((h) => kn(r, t, h))), d.forEach((h) => kn(r, s, h)), d.forEach((h) => kn(r, on[o] || {}, h)), d.forEach((h) => kn(r, ze, h)), d.forEach((h) => kn(r, Ua, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Ii.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      on[n] || {},
      ze.datasets[n] || {},
      {
        type: n
      },
      ze,
      Ua
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = vo(this._resolverCache, t, s);
    let r = i;
    if (Zd(i, n)) {
      o.$shared = !1, a = Ht(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = gn(i, a, c);
    }
    for (const c of n)
      o[c] = r[c];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = vo(this._resolverCache, t, a);
    return De(n) ? gn(o, n, void 0, s) : o;
  }
}
function vo(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: ds(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const Gd = (e) => De(e) && Object.getOwnPropertyNames(e).some((t) => Ht(e[t]));
function Zd(e, t) {
  const { isScriptable: n, isIndexable: a } = pi(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Ht(l) || Gd(l)) || i && je(l))
      return !0;
  }
  return !1;
}
var Qd = "4.5.1";
const Jd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function yo(e, t) {
  return e === "top" || e === "bottom" || Jd.indexOf(e) === -1 && t === "x";
}
function xo(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function _o(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Re(n && n.onComplete, [
    e
  ], t);
}
function eu(e) {
  const t = e.chart, n = t.options.animation;
  Re(n && n.onProgress, [
    e
  ], t);
}
function Ri(e) {
  return fs() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const da = {}, ko = (e) => {
  const t = Ri(e);
  return Object.values(da).filter((n) => n.canvas === t).pop();
};
function tu(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function nu(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let jt = class {
  static defaults = ze;
  static instances = da;
  static overrides = on;
  static registry = yt;
  static version = Qd;
  static getChart = ko;
  static register(...t) {
    yt.add(...t), wo();
  }
  static unregister(...t) {
    yt.remove(...t), wo();
  }
  constructor(t, n) {
    const a = this.config = new Xd(n), s = Ri(t), o = ko(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || xd(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = Ul(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Od(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = hr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], da[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    $t.listen(this, "complete", _o), $t.listen(this, "progress", eu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return Le(t) ? n && o ? o : s ? a / s : null : t;
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
    return yt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : js(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ns(this.canvas, this.ctx), this;
  }
  stop() {
    return $t.stop(this), this;
  }
  resize(t, n) {
    $t.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, js(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Re(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Pe(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Ga(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Pe(o, (i) => {
      const l = i.options, r = l.id, c = Ga(r, l), d = _e(l.type, i.dtype);
      (l.position === void 0 || yo(l.position, c) !== yo(i.dposition)) && (l.position = i.dposition), s[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const m = yt.getScale(d);
        h = new m({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Pe(s, (i, l) => {
      i || delete a[l];
    }), Pe(a, (i) => {
      ct.configure(this, i, i.options), ct.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(xo("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Xa(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = yt.getController(l), { datasetElementType: c, dataElementType: d } = ze.datasets[l];
        Object.assign(r, {
          dataElementType: yt.getElement(d),
          datasetElementType: c && yt.getElement(c)
        }), i.controller = new r(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Pe(this.data.datasets, (t, n) => {
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
      const { controller: h } = this.getDatasetMeta(c), m = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(m), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || Pe(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(xo("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Pe(this.scales, (t) => {
      ct.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Bs(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      tu(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!Bs(s, a(o)))
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
    ct.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Pe(this.boxes, (s) => {
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
        this._updateDataset(n, Ht(t) ? t({
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
    }) !== !1 && ($t.has(this) ? this.attached && !$t.running(this) && $t.start(this) : (this.draw(), _o({
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
    }, s = vc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && ls(n, s), t.controller.draw(), s && rs(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return zn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = Jc.modes[n];
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
    return this.$context || (this.$context = ln(null, {
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
    En(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), $t.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ns(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete da[this.id], this.notifyPlugins("afterDestroy");
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
    Pe(this.options.events, (o) => a(o, s));
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
    Pe(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Pe(this._responsiveListeners, (t, n) => {
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
    !ha(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), r = Jl(t), c = nu(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Re(o.onHover, [
      t,
      l,
      this
    ], this), r && Re(o.onClick, [
      t,
      l,
      this
    ], this));
    const d = !ha(l, s);
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
function wo() {
  return Pe(jt.instances, (e) => e._plugins.invalidate());
}
function au(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, mt(a - n));
  if (e.beginPath(), e.arc(s, o, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const m = Math.min(c / l, mt(a - n));
    e.arc(s, o, l + c / 2, n - m / 2, a + m / 2, !0);
  } else {
    const m = Math.min(c / 2, i * mt(a - n));
    if (d === "round")
      e.arc(s, o, m, n - Ie / 2, a + Ie / 2, !0);
    else if (d === "bevel") {
      const v = 2 * m * m, g = -v * Math.cos(n + Ie / 2) + s, y = -v * Math.sin(n + Ie / 2) + o, b = v * Math.cos(a + Ie / 2) + s, f = v * Math.sin(a + Ie / 2) + o;
      e.lineTo(g, y), e.lineTo(b, f);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function su(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: r } = t;
  let c = s / l;
  e.beginPath(), e.arc(o, i, l, a - c, n + c), r > s ? (c = s / r, e.arc(o, i, r, n + c, a - c, !0)) : e.arc(o, i, s, n + Ye, a - Ye), e.closePath(), e.clip();
}
function ou(e) {
  return cs(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function iu(e, t, n, a) {
  const s = ou(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (r) => {
    const c = (n - Math.min(o, r)) * a / 2;
    return Ge(r, 0, Math.min(o, c));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Ge(s.innerStart, 0, i),
    innerEnd: Ge(s.innerEnd, 0, i)
  };
}
function dn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function va(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), m = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const g = s - r;
  if (a) {
    const U = d > 0 ? d - a : 0, le = h > 0 ? h - a : 0, ce = (U + le) / 2, G = ce !== 0 ? g * ce / (ce + a) : g;
    v = (g - G) / 2;
  }
  const y = Math.max(1e-3, g * h - n / Ie) / h, b = (g - y) / 2, f = r + b + v, _ = s - b - v, { outerStart: x, outerEnd: w, innerStart: C, innerEnd: S } = iu(t, m, h, _ - f), M = h - x, O = h - w, A = f + x / M, P = _ - w / O, B = m + C, F = m + S, X = f + C / B, te = _ - S / F;
  if (e.beginPath(), o) {
    const U = (A + P) / 2;
    if (e.arc(i, l, h, A, U), e.arc(i, l, h, U, P), w > 0) {
      const de = dn(O, P, i, l);
      e.arc(de.x, de.y, w, P, _ + Ye);
    }
    const le = dn(F, _, i, l);
    if (e.lineTo(le.x, le.y), S > 0) {
      const de = dn(F, te, i, l);
      e.arc(de.x, de.y, S, _ + Ye, te + Math.PI);
    }
    const ce = (_ - S / m + (f + C / m)) / 2;
    if (e.arc(i, l, m, _ - S / m, ce, !0), e.arc(i, l, m, ce, f + C / m, !0), C > 0) {
      const de = dn(B, X, i, l);
      e.arc(de.x, de.y, C, X + Math.PI, f - Ye);
    }
    const G = dn(M, f, i, l);
    if (e.lineTo(G.x, G.y), x > 0) {
      const de = dn(M, A, i, l);
      e.arc(de.x, de.y, x, f - Ye, A);
    }
  } else {
    e.moveTo(i, l);
    const U = Math.cos(A) * h + i, le = Math.sin(A) * h + l;
    e.lineTo(U, le);
    const ce = Math.cos(P) * h + i, G = Math.sin(P) * h + l;
    e.lineTo(ce, G);
  }
  e.closePath();
}
function lu(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (o) {
    va(e, t, n, a, r, s);
    for (let c = 0; c < o; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ve || Ve));
  }
  return va(e, t, n, a, r, s), e.fill(), r;
}
function ru(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: m, borderRadius: v } = r, g = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = m, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (o) {
    va(e, t, n, a, y, s);
    for (let b = 0; b < o; ++b)
      e.stroke();
    isNaN(l) || (y = i + (l % Ve || Ve));
  }
  g && su(e, t, y), r.selfJoin && y - i >= Ie && v === 0 && d !== "miter" && au(e, t, y), o || (va(e, t, n, a, y, s), e.stroke());
}
class cu extends At {
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
    ], a), { angle: o, distance: i } = ri(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), m = (this.options.spacing + this.options.borderWidth) / 2, v = _e(h, r - l), g = Vn(o, l, r) && l !== r, y = v >= Ve || g, b = Ft(i, c + m, d + m);
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ve ? Math.floor(a / Ve) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const r = 1 - Math.sin(Math.min(Ie, a || 0)), c = s * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, lu(t, this, c, o, i), ru(t, this, c, o, i), t.restore();
  }
}
function Fi(e, t, n = t) {
  e.lineCap = _e(n.borderCapStyle, t.borderCapStyle), e.setLineDash(_e(n.borderDash, t.borderDash)), e.lineDashOffset = _e(n.borderDashOffset, t.borderDashOffset), e.lineJoin = _e(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = _e(n.borderWidth, t.borderWidth), e.strokeStyle = _e(n.borderColor, t.borderColor);
}
function du(e, t, n) {
  e.lineTo(n.x, n.y);
}
function uu(e) {
  return e.stepped ? Mr : e.tension || e.cubicInterpolationMode === "monotone" ? Sr : du;
}
function Ei(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, r = Math.max(s, i), c = Math.min(o, l), d = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function hu(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: r, ilen: c } = Ei(s, n, a), d = uu(o);
  let { move: h = !0, reverse: m } = a || {}, v, g, y;
  for (v = 0; v <= c; ++v)
    g = s[(l + (m ? c - v : v)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, y, g, m, o.stepped), y = g);
  return r && (g = s[(l + (m ? c : 0)) % i], d(e, y, g, m, o.stepped)), !!r;
}
function fu(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = Ei(s, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, m, v, g, y, b, f;
  const _ = (w) => (i + (c ? l - w : w)) % o, x = () => {
    y !== b && (e.lineTo(d, b), e.lineTo(d, y), e.lineTo(d, f));
  };
  for (r && (v = s[_(0)], e.moveTo(v.x, v.y)), m = 0; m <= l; ++m) {
    if (v = s[_(m)], v.skip)
      continue;
    const w = v.x, C = v.y, S = w | 0;
    S === g ? (C < y ? y = C : C > b && (b = C), d = (h * d + w) / ++h) : (x(), e.lineTo(w, C), g = S, h = 0, y = b = C), f = C;
  }
  x();
}
function Za(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? fu : hu;
}
function gu(e) {
  return e.stepped ? oc : e.tension || e.cubicInterpolationMode === "monotone" ? ic : Qt;
}
function mu(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), Fi(e, t.options), e.stroke(s);
}
function pu(e, t, n, a) {
  const { segments: s, options: o } = t, i = Za(t);
  for (const l of s)
    Fi(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const bu = typeof Path2D == "function";
function vu(e, t, n, a) {
  bu && !t.options.segment ? mu(e, t, n, a) : pu(e, t, n, a);
}
class yu extends At {
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
      Zr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = gc(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = uc(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], r = gu(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: m } = i[c], v = o[h], g = o[m];
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
    return Za(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = Za(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), vu(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Co(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class xu extends At {
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
    return Co(this, t, "x", n);
  }
  inYRange(t, n) {
    return Co(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !zn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, qa(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Oi(e, t) {
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
function Ot(e, t, n, a) {
  return e ? 0 : Ge(t, n, a);
}
function _u(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = mi(a);
  return {
    t: Ot(s.top, o.top, 0, n),
    r: Ot(s.right, o.right, 0, t),
    b: Ot(s.bottom, o.bottom, 0, n),
    l: Ot(s.left, o.left, 0, t)
  };
}
function ku(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = hn(s), i = Math.min(t, n), l = e.borderSkipped, r = a || De(s);
  return {
    topLeft: Ot(!r || l.top || l.left, o.topLeft, 0, i),
    topRight: Ot(!r || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Ot(!r || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Ot(!r || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function wu(e) {
  const t = Oi(e), n = t.right - t.left, a = t.bottom - t.top, s = _u(e, n / 2, a / 2), o = ku(e, n / 2, a / 2);
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
function Oa(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && Oi(e, a);
  return l && (s || Ft(t, l.left, l.right)) && (o || Ft(n, l.top, l.bottom));
}
function Cu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function $u(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Va(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class Mu extends At {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = wu(this), l = Cu(i.radius) ? ma : $u;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, Va(i, n, o)), t.clip(), l(t, Va(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Va(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Oa(this, t, n, a);
  }
  inXRange(t, n) {
    return Oa(this, t, null, n);
  }
  inYRange(t, n) {
    return Oa(this, null, t, n);
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
const $o = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Su = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Mo extends At {
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
    let n = Re(t.generateLabels, [
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
    const a = t.labels, s = Ze(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = $o(a, o);
    let c, d;
    n.font = s.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, o, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, s, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let m = -1, v = -d;
    return this.legendItems.forEach((g, y) => {
      const b = a + n / 2 + o.measureText(g.text).width;
      (y === 0 || c[c.length - 1] + b + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, m++), r[y] = {
        left: 0,
        top: v,
        row: m,
        width: b,
        height: s
      }, c[c.length - 1] += b + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, m = 0, v = 0, g = 0, y = 0;
    return this.legendItems.forEach((b, f) => {
      const { itemWidth: _, itemHeight: x } = Du(a, n, o, b, s);
      f > 0 && v + x + 2 * l > d && (h += m + l, c.push({
        width: m,
        height: v
      }), g += m + l, y++, m = v = 0), r[f] = {
        left: g,
        top: v,
        col: y,
        width: _,
        height: x
      }, m = Math.max(m, _), v += x + l;
    }), h += m, c.push({
      width: m,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = fn(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = qe(a, this.left + s, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = qe(a, this.left + s, this.right - this.lineWidths[l])), c.top += this.top + t + s, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + s;
    } else {
      let l = 0, r = qe(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = qe(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + s, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ls(t, this), this._draw(), rs(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = ze.color, r = fn(t.rtl, this.left, this.width), c = Ze(i.font), { padding: d } = i, h = c.size, m = h / 2;
    let v;
    this.drawTitle(), s.textAlign = r.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = c.string;
    const { boxWidth: g, boxHeight: y, itemHeight: b } = $o(i, h), f = function(S, M, O) {
      if (isNaN(g) || g <= 0 || isNaN(y) || y < 0)
        return;
      s.save();
      const A = _e(O.lineWidth, 1);
      if (s.fillStyle = _e(O.fillStyle, l), s.lineCap = _e(O.lineCap, "butt"), s.lineDashOffset = _e(O.lineDashOffset, 0), s.lineJoin = _e(O.lineJoin, "miter"), s.lineWidth = A, s.strokeStyle = _e(O.strokeStyle, l), s.setLineDash(_e(O.lineDash, [])), i.usePointStyle) {
        const P = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: O.pointStyle,
          rotation: O.rotation,
          borderWidth: A
        }, B = r.xPlus(S, g / 2), F = M + m;
        gi(s, P, B, F, i.pointStyleWidth && g);
      } else {
        const P = M + Math.max((h - y) / 2, 0), B = r.leftForLtr(S, g), F = hn(O.borderRadius);
        s.beginPath(), Object.values(F).some((X) => X !== 0) ? ma(s, {
          x: B,
          y: P,
          w: g,
          h: y,
          radius: F
        }) : s.rect(B, P, g, y), s.fill(), A !== 0 && s.stroke();
      }
      s.restore();
    }, _ = function(S, M, O) {
      Nn(s, O.text, S, M + b / 2, c, {
        strikethrough: O.hidden,
        textAlign: r.textAlign(O.textAlign)
      });
    }, x = this.isHorizontal(), w = this._computeTitleHeight();
    x ? v = {
      x: qe(o, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: qe(o, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, _i(this.ctx, t.textDirection);
    const C = b + d;
    this.legendItems.forEach((S, M) => {
      s.strokeStyle = S.fontColor, s.fillStyle = S.fontColor;
      const O = s.measureText(S.text).width, A = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), P = g + m + O;
      let B = v.x, F = v.y;
      r.setWidth(this.width), x ? M > 0 && B + P + d > this.right && (F = v.y += C, v.line++, B = v.x = qe(o, this.left + d, this.right - a[v.line])) : M > 0 && F + C > this.bottom && (B = v.x = B + n[v.line].width + d, v.line++, F = v.y = qe(o, this.top + w + d, this.bottom - n[v.line].height));
      const X = r.x(B);
      if (f(X, F, S), B = fr(A, B + g + m, x ? B + P : this.right, t.rtl), _(r.x(B), F, S), x)
        v.x += P + d;
      else if (typeof S.text != "string") {
        const te = c.lineHeight;
        v.y += Vi(S, te) + d;
      } else
        v.y += C;
    }), ki(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Ze(n.font), s = ut(n.padding);
    if (!n.display)
      return;
    const o = fn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = s.top + r;
    let d, h = this.left, m = this.width;
    if (this.isHorizontal())
      m = Math.max(...this.lineWidths), d = this.top + c, h = qe(t.align, h, this.right - m);
    else {
      const g = this.columnSizes.reduce((y, b) => Math.max(y, b.height), 0);
      d = c + qe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const v = qe(l, h, h + m);
    i.textAlign = o.textAlign(ss(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Nn(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Ze(t.font), a = ut(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if (Ft(t, this.left, this.right) && Ft(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], Ft(t, s.left, s.left + s.width) && Ft(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Bu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = Su(s, a);
      s && !o && Re(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Re(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Re(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Du(e, t, n, a, s) {
  const o = Tu(a, e, t, n), i = Au(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function Tu(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function Au(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Vi(t, n)), a;
}
function Vi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Bu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var ps = {
  id: "legend",
  _element: Mo,
  start(e, t, n) {
    const a = e.legend = new Mo({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ct.configure(e, a, n), ct.addBox(e, a);
  },
  stop(e) {
    ct.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ct.configure(e, a, n), a.options = n;
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
          const c = r.controller.getStyle(n ? 0 : void 0), d = ut(c.borderWidth);
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
class zi extends At {
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
    const s = je(a.text) ? a.text.length : 1;
    this._padding = ut(a.padding);
    const o = s * Ze(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = qe(l, a, o), h = n + t, c = o - a) : (i.position === "left" ? (d = a + t, h = qe(l, s, n), r = Ie * -0.5) : (d = o - t, h = qe(l, n, s), r = Ie * 0.5), c = s - n), {
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
    const a = Ze(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(o);
    Nn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: ss(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Lu(e, t) {
  const n = new zi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ct.configure(e, n, t), ct.addBox(e, n), e.titleBlock = n;
}
var Ni = {
  id: "title",
  _element: zi,
  start(e, t, n) {
    Lu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ct.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ct.configure(e, a, n), a.options = n;
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
const Tn = {
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
        const c = r.getCenterPoint(), d = Ka(t, c);
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
function vt(e, t) {
  return t && (je(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Mt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Pu(e, t) {
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
function So(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, r = Ze(t.bodyFont), c = Ze(t.titleFont), d = Ze(t.footerFont), h = o.length, m = s.length, v = a.length, g = ut(t.padding);
  let y = g.height, b = 0, f = a.reduce((w, C) => w + C.before.length + C.lines.length + C.after.length, 0);
  if (f += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), f) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (f - v) * r.lineHeight + (f - 1) * t.bodySpacing;
  }
  m && (y += t.footerMarginTop + m * d.lineHeight + (m - 1) * t.footerSpacing);
  let _ = 0;
  const x = function(w) {
    b = Math.max(b, n.measureText(w).width + _);
  };
  return n.save(), n.font = c.string, Pe(e.title, x), n.font = r.string, Pe(e.beforeBody.concat(e.afterBody), x), _ = t.displayColors ? i + 2 + t.boxPadding : 0, Pe(a, (w) => {
    Pe(w.before, x), Pe(w.lines, x), Pe(w.after, x);
  }), _ = 0, n.font = d.string, Pe(e.footer, x), n.restore(), b += g.width, {
    width: b,
    height: y
  };
}
function Iu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Ru(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function Fu(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = s <= (l + r) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= i - o / 2 && (c = "right"), Ru(c, e, t, n) && (c = "center"), c;
}
function Do(e, t, n) {
  const a = n.yAlign || t.yAlign || Iu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Fu(e, t, n, a),
    yAlign: a
  };
}
function Eu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Ou(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function To(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = s + o, { topLeft: d, topRight: h, bottomLeft: m, bottomRight: v } = hn(i);
  let g = Eu(t, l);
  const y = Ou(t, r, c);
  return r === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(d, m) + s : l === "right" && (g += Math.max(h, v) + s), {
    x: Ge(g, 0, a.width - t.width),
    y: Ge(y, 0, a.height - t.height)
  };
}
function sa(e, t, n) {
  const a = ut(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Ao(e) {
  return vt([], Mt(e));
}
function Vu(e, t, n) {
  return ln(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Bo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Wi = {
  beforeTitle: Ct,
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
  afterTitle: Ct,
  beforeBody: Ct,
  beforeLabel: Ct,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Le(n) || (t += n), t;
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
  afterLabel: Ct,
  afterBody: Ct,
  beforeFooter: Ct,
  footer: Ct,
  afterFooter: Ct
};
function tt(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Wi[t].call(n, a) : s;
}
class Lo extends At {
  static positioners = Tn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new Ci(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = Vu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = tt(a, "beforeTitle", this, t), o = tt(a, "title", this, t), i = tt(a, "afterTitle", this, t);
    let l = [];
    return l = vt(l, Mt(s)), l = vt(l, Mt(o)), l = vt(l, Mt(i)), l;
  }
  getBeforeBody(t, n) {
    return Ao(tt(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return Pe(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Bo(a, o);
      vt(i.before, Mt(tt(l, "beforeLabel", this, o))), vt(i.lines, tt(l, "label", this, o)), vt(i.after, Mt(tt(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return Ao(tt(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = tt(a, "beforeFooter", this, t), o = tt(a, "footer", this, t), i = tt(a, "afterFooter", this, t);
    let l = [];
    return l = vt(l, Mt(s)), l = vt(l, Mt(o)), l = vt(l, Mt(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Pu(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, m) => t.filter(d, h, m, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Pe(l, (d) => {
      const h = Bo(t.callbacks, d);
      s.push(tt(h, "labelColor", this, d)), o.push(tt(h, "labelPointStyle", this, d)), i.push(tt(h, "labelTextColor", this, d));
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
      const l = Tn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = So(this, a), c = Object.assign({}, l, r), d = Do(this.chart, a, c), h = To(a, c, d, this.chart);
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = hn(l), { x: m, y: v } = t, { width: g, height: y } = n;
    let b, f, _, x, w, C;
    return o === "center" ? (w = v + y / 2, s === "left" ? (b = m, f = b - i, x = w + i, C = w - i) : (b = m + g, f = b + i, x = w - i, C = w + i), _ = b) : (s === "left" ? f = m + Math.max(r, d) + i : s === "right" ? f = m + g - Math.max(c, h) - i : f = this.caretX, o === "top" ? (x = v, w = x - i, b = f - i, _ = f + i) : (x = v + y, w = x + i, b = f + i, _ = f - i), C = x), {
      x1: b,
      x2: f,
      x3: _,
      y1: x,
      y2: w,
      y3: C
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, r;
    if (o) {
      const c = fn(a.rtl, this.x, this.width);
      for (t.x = sa(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Ze(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < o; ++r)
        n.fillText(s[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = o, d = Ze(o.bodyFont), h = sa(this, "left", o), m = s.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, g = n.y + v;
    if (o.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(m, c) + c / 2, f = g + r / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, qa(t, y, b, f), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, qa(t, y, b, f);
    } else {
      t.lineWidth = De(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = s.leftForLtr(m, c), b = s.leftForLtr(s.xPlus(m, 1), c - 2), f = hn(i.borderRadius);
      Object.values(f).some((_) => _ !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, ma(t, {
        x: y,
        y: g,
        w: c,
        h: r,
        radius: f
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ma(t, {
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
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Ze(a.bodyFont);
    let m = h.lineHeight, v = 0;
    const g = fn(a.rtl, this.x, this.width), y = function(O) {
      n.fillText(O, g.x(t.x + v), t.y + m / 2), t.y += m + o;
    }, b = g.textAlign(i);
    let f, _, x, w, C, S, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = sa(this, b, a), n.fillStyle = a.bodyColor, Pe(this.beforeBody, y), v = l && b !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = s.length; w < S; ++w) {
      for (f = s[w], _ = this.labelTextColors[w], n.fillStyle = _, Pe(f.before, y), x = f.lines, l && x.length && (this._drawColorBox(n, t, w, g, a), m = Math.max(h.lineHeight, r)), C = 0, M = x.length; C < M; ++C)
        y(x[C]), m = h.lineHeight;
      Pe(f.after, y);
    }
    v = 0, m = h.lineHeight, Pe(this.afterBody, y), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const r = fn(a.rtl, this.x, this.width);
      for (t.x = sa(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Ze(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: m, bottomLeft: v, bottomRight: g } = hn(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + c - m, r), n.quadraticCurveTo(l + c, r, l + c, r + m), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + c, r + d - g), n.quadraticCurveTo(l + c, r + d, l + c - g, r + d), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = Tn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = So(this, t), r = Object.assign({}, i, this._size), c = Do(n, t, r), d = To(t, r, c, n);
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
    const i = ut(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), _i(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), ki(t, n.textDirection), t.restore());
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
    }), o = !ha(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), r = n || !ha(i, o) || l;
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
    const { caretX: a, caretY: s, options: o } = this, i = Tn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var bs = {
  id: "tooltip",
  _element: Lo,
  positioners: Tn,
  afterInit(e, t, n) {
    n && (e.tooltip = new Lo({
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
    callbacks: Wi
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
const zu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Nu(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return zu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const Wu = (e, t) => e === null ? null : Ge(Math.round(e), 0, t);
function Po(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Hi extends pn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Po
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
    if (Le(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Nu(a, t, _e(n, t), this._addedLabels), Wu(n, a.length - 1);
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
    return Po.call(this, t);
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
function Hu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: m } = e, v = o || 1, g = d - 1, { min: y, max: b } = t, f = !Le(i), _ = !Le(l), x = !Le(c), w = (b - y) / (h + 1);
  let C = Ps((b - y) / g / v) * v, S, M, O, A;
  if (C < 1e-14 && !f && !_)
    return [
      {
        value: y
      },
      {
        value: b
      }
    ];
  A = Math.ceil(b / C) - Math.floor(y / C), A > g && (C = Ps(A * C / g / v) * v), Le(r) || (S = Math.pow(10, r), C = Math.ceil(C * S) / S), s === "ticks" ? (M = Math.floor(y / C) * C, O = Math.ceil(b / C) * C) : (M = y, O = b), f && _ && o && sr((l - i) / o, C / 1e3) ? (A = Math.round(Math.min((l - i) / C, d)), C = (l - i) / A, M = i, O = l) : x ? (M = f ? i : M, O = _ ? l : O, A = c - 1, C = (O - M) / A) : (A = (O - M) / C, Bn(A, Math.round(A), C / 1e3) ? A = Math.round(A) : A = Math.ceil(A));
  const P = Math.max(Is(C), Is(M));
  S = Math.pow(10, Le(r) ? P : r), M = Math.round(M * S) / S, O = Math.round(O * S) / S;
  let B = 0;
  for (f && (m && M !== i ? (n.push({
    value: i
  }), M < i && B++, Bn(Math.round((M + B * C) * S) / S, i, Io(i, w, e)) && B++) : M < i && B++); B < A; ++B) {
    const F = Math.round((M + B * C) * S) / S;
    if (_ && F > l)
      break;
    n.push({
      value: F
    });
  }
  return _ && m && O !== l ? n.length && Bn(n[n.length - 1].value, l, Io(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!_ || O === l) && n.push({
    value: O
  }), n;
}
function Io(e, t, { horizontal: n, minRotation: a }) {
  const s = Dt(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class ju extends pn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Le(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (r) => s = n ? s : r, l = (r) => o = a ? o : r;
    if (t) {
      const r = _t(s), c = _t(o);
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
    }, o = this._range || this, i = Hu(s, o);
    return t.bounds === "ticks" && or(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return is(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ji extends ju {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: fi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = dt(t) ? t : 0, this.max = dt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Dt(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Ma = {
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
}, st = /* @__PURE__ */ Object.keys(Ma);
function Ro(e, t) {
  return e - t;
}
function Fo(e, t) {
  if (Le(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), dt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (On(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function Eo(e, t, n, a) {
  const s = st.length;
  for (let o = st.indexOf(e); o < s - 1; ++o) {
    const i = Ma[st[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return st[o];
  }
  return st[s - 1];
}
function Yu(e, t, n, a, s) {
  for (let o = st.length - 1; o >= st.indexOf(n); o--) {
    const i = st[o];
    if (Ma[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return st[n ? st.indexOf(n) : 0];
}
function Ku(e) {
  for (let t = st.indexOf(e) + 1, n = st.length; t < n; ++t)
    if (Ma[st[t]].common)
      return st[t];
}
function Oo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = as(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Uu(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function Vo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Uu(e, a, s, n);
}
class zo extends pn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new qc._date(t.adapters.date);
    s.init(n), An(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Fo(this, t);
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
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), s = dt(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = dt(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = dr(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? Eo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Yu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Ku(this._unit), this.initOffsets(s), t.reverse && l.reverse(), Vo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ge(n, 0, i), a = Ge(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || Eo(o.minUnit, n, a, this._getLabelCapacity(n)), l = _e(s.ticks.stepSize, 1), r = i === "week" ? o.isoWeekday : !1, c = On(r) || r === !0, d = {};
    let h = n, m, v;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = s.ticks.source === "data" && this.getDataTimestamps();
    for (m = h, v = 0; m < a; m = +t.add(m, l, i), v++)
      Oo(d, m, g);
    return (m === a || s.bounds === "ticks" || v === 1) && Oo(d, m, g), Object.keys(d).sort(Ro).map((y) => +y);
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
      return Re(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], m = a[n], v = c && h && m && m.major;
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = Dt(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, Vo(this, [
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
      t.push(Fo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return di(t.sort(Ro));
  }
}
function oa(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, r;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = en(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: r } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = en(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: r } = e[s]);
  const c = i - o;
  return c ? l + (r - l) * (t - o) / c : l;
}
class f$ extends zo {
  static id = "timeseries";
  static defaults = zo.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = oa(n, this.min), this._tableRange = oa(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (oa(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return oa(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Yi = {
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
}, qu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Xu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Yi,
  ...qu
}, Gu = vl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function un(e) {
  return Jo(e) ? ja(e) : e;
}
function Zu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Jo(t) ? new Proxy(e, {}) : e;
}
function Qu(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ki(e, t) {
  e.labels = t;
}
function Ui(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function Ju(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ki(n, e.labels), Ui(n, e.datasets, t), n;
}
const eh = re({
  props: Xu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = ae(null), o = Qo(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: c, data: d, options: h, plugins: m, datasetIdKey: v } = e, g = Ju(d, v), y = Zu(g, d);
      o.value = new jt(s.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: m
      });
    }, l = () => {
      const c = ja(o.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), o.value = null;
      }, e.destroyDelay) : (c.destroy(), o.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return Je(i), ft(l), Fe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, m] = c, [v, g] = d;
      const y = ja(o.value);
      if (!y)
        return;
      let b = !1;
      if (h) {
        const f = un(h), _ = un(v);
        f && f !== _ && (Qu(y, f), b = !0);
      }
      if (m) {
        const f = un(m.labels), _ = un(g.labels), x = un(m.datasets), w = un(g.datasets);
        f !== _ && (Ki(y.config.data, f), b = !0), x && x !== w && (Ui(y.config.data, x, e.datasetIdKey), b = !0);
      }
      b && We(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => Ha("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      Ha("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function vs(e, t) {
  return jt.register(t), re({
    props: Yi,
    setup(n, a) {
      let { expose: s } = a;
      const o = Qo(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => Ha(eh, Gu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const th = /* @__PURE__ */ vs("bar", Hc), nh = /* @__PURE__ */ vs("line", Kc), ah = /* @__PURE__ */ vs("pie", Uc), No = {
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
}, sh = [
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
function Ce(e) {
  const t = ae("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = $(() => e?.value ? e.value : t.value), o = $(() => s.value === "dark"), i = $(() => o.value ? Wo : No), l = () => {
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
  return Je(() => {
    l();
  }), ft(() => {
    r();
  }), e && Fe(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: No,
    darkColors: Wo,
    chartSeriesColors: sh
  };
}
const ya = 5, ys = 8, oh = /^x\d*$/, ih = /^y\d*$/;
function qi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (oh.test(s) && (r.maxTicksLimit = ys, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), ih.test(s))
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(r.stepSize);
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = ya;
      } else
        r.maxTicksLimit = ya;
    i.ticks = r, a[s] = i;
  }
  return t.scales = a, t;
}
const nt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", lh = ["titleFont", "bodyFont", "footerFont"];
function Xi(e, t = nt) {
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
      for (const r of lh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const rh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ho = 10, ch = /* @__PURE__ */ re({
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
    jt.register(Hi, ji, Mu, Ni, bs, ps), jt.defaults.font.family = nt;
    const { isDark: a, colors: s } = Ce(we(n, "theme")), o = $(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const m = { ...d };
      for (const v of Object.keys(h)) {
        const g = h[v];
        g !== void 0 && (m[v] = r(d[v], g));
      }
      return m;
    }
    const c = $(() => {
      const d = {
        font: {
          family: nt
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
                family: nt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Ho,
              boxHeight: Ho,
              usePointStyle: !1,
              generateLabels: function(m) {
                return m.data.datasets.map((g, y) => {
                  const b = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, f = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, _ = typeof f == "string" && f.length > 0 ? f : typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof b == "string" ? b : _,
                    strokeStyle: _,
                    lineWidth: 0,
                    fontColor: _,
                    hidden: !m.isDatasetVisible(y),
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
              family: nt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: nt,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(m) {
                return m.length > 0 ? String(i(m[0].label)) : "";
              },
              label: function(m) {
                let v = String(i(m.dataset.label || ""));
                return v && (v += ": "), m.parsed.y !== null && (v += m.parsed.y), v;
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
              maxTicksLimit: ya,
              font: {
                family: nt,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(m) {
                return i(m);
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
              maxTicksLimit: ys,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: nt,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(m) {
                const v = this.getLabelForValue(m);
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
      return Xi(
        qi(h)
      );
    });
    return t({ isDark: a }), (d, h) => (p(), k("div", rh, [
      R(T(th), {
        data: o.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, kt = /* @__PURE__ */ me(ch, [["__scopeId", "data-v-ee7ca6f2"]]), dh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, uh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, hh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, fh = ["aria-pressed", "aria-label", "onClick"], gh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, mh = /* @__PURE__ */ re({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    jt.register(
      Hi,
      ji,
      xu,
      yu,
      Ni,
      bs,
      ps
    ), jt.defaults.font.family = nt;
    const a = ae(null), { isDark: s, colors: o } = Ce(we(n, "theme")), i = $(() => o.value.bgCard), l = $(() => {
      const b = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((f) => {
          const _ = f.borderColor, x = Array.isArray(_) ? _[0] : _, w = typeof x == "string" && x.length > 0 ? x : o.value.textSecondary, C = f.pointBackgroundColor !== void 0 ? f.pointBackgroundColor : b, S = f.pointHoverBackgroundColor !== void 0 ? f.pointHoverBackgroundColor : C, M = f.pointBorderWidth ?? 2, O = f.pointHoverBorderWidth ?? M;
          return {
            ...f,
            fill: f.fill ?? !1,
            pointBackgroundColor: C,
            pointHoverBackgroundColor: S,
            pointBorderColor: f.pointBorderColor ?? w,
            pointHoverBorderColor: f.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: O
          };
        })
      };
    }), r = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, c = (b) => typeof b != "string" ? b : n.uppercaseLegendLabels ? b.toUpperCase() : r(b);
    function d(b) {
      const f = b.borderColor, _ = Array.isArray(f) ? f[0] : f;
      return typeof _ == "string" && _.length > 0 ? _ : o.value.textSecondary;
    }
    const h = $(
      () => l.value.datasets.map((b, f) => ({
        key: `${b.label ?? "dataset"}-${f}`,
        label: c(b.label || ""),
        color: d(b)
      }))
    ), m = ae([]);
    Fe(
      () => l.value.datasets.length,
      (b) => {
        const f = Array.from({ length: b }, (_, x) => m.value[x] ?? !0);
        m.value = f;
      },
      { immediate: !0 }
    );
    function v(b) {
      const _ = a.value?.chart;
      if (!_ || b < 0 || b >= _.data.datasets.length) return;
      const x = !_.isDatasetVisible(b);
      _.setDatasetVisibility(b, x), m.value[b] = x, _.update();
    }
    function g(b, f) {
      if (f == null) return b;
      if (Array.isArray(f) || typeof f != "object" || b == null || Array.isArray(b) || typeof b != "object") return f;
      const _ = { ...b };
      for (const x of Object.keys(f)) {
        const w = f[x];
        w !== void 0 && (_[x] = g(b[x], w));
      }
      return _;
    }
    const y = $(() => {
      const b = {
        font: {
          family: nt
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
              family: nt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: nt,
              size: 13
            },
            callbacks: {
              title: function(x) {
                return x.length > 0 ? String(r(x[0].label)) : "";
              },
              label: function(x) {
                let w = String(r(x.dataset.label || ""));
                return w && (w += ": "), x.parsed.y !== null && (w += x.parsed.y), w;
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
              maxTicksLimit: ys,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: nt,
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
              maxTicksLimit: ya,
              font: {
                family: nt,
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
      return Xi(
        qi(f)
      );
    });
    return t({ isDark: s }), (b, f) => (p(), k("div", dh, [
      u("div", uh, [
        R(T(nh), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (p(), k("ul", hh, [
        (p(!0), k(ie, null, fe(h.value, (_, x) => (p(), k("li", {
          key: _.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: Q(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", m.value[x] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Te({ color: _.color }),
            "aria-pressed": m.value[x] !== !1,
            "aria-label": `${_.label}. ${m.value[x] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(x)
          }, [
            u("span", gh, [
              f[0] || (f[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Te({ borderColor: _.color })
              }, null, 4),
              f[1] || (f[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(_.label), 1)
          ], 14, fh)
        ]))), 128))
      ])) : z("", !0)
    ]));
  }
}), pt = /* @__PURE__ */ me(mh, [["__scopeId", "data-v-fc764ffb"]]), ph = { class: "chart-container" }, bh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", vh = /* @__PURE__ */ re({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    jt.register(cu, bs, ps);
    const { isDark: a, colors: s } = Ce(we(n, "theme")), o = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = $(() => n.options ? n.options : {
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
              family: bh,
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
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, g) => v + g, 0), m = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${m}%)`;
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
    return t({ isDark: a }), (r, c) => (p(), k("div", ph, [
      R(T(ah), {
        data: T(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Sa = /* @__PURE__ */ me(vh, [["__scopeId", "data-v-0f7806d6"]]), yh = { class: "chart-container" }, xh = ["viewBox"], _h = ["transform"], kh = ["x", "width", "fill", "stroke"], wh = ["fill"], Ch = ["x1", "y1", "x2", "y2", "stroke"], $h = ["points", "fill"], Mh = ["x1", "y1", "x2", "y2", "stroke"], Sh = ["x", "y", "fill"], Dh = ["x1", "y1", "x2", "y2", "stroke"], Th = ["points", "fill"], Ah = ["transform"], Bh = ["y1", "y2"], Lh = ["y1", "y2"], Ph = ["y1", "y2"], Ih = ["y1", "y2"], Rh = ["y", "height"], Fh = ["y1", "y2"], Eh = ["y1", "y2"], Oh = ["y1", "y2"], Vh = ["y1", "y2"], zh = ["y", "height"], Nh = ["cy", "stroke", "onMouseenter"], Wh = ["cy", "stroke", "onMouseenter"], Hh = ["cy", "stroke", "onMouseenter"], jh = ["cy", "stroke", "onMouseenter"], Yh = ["y1", "y2", "onMouseenter"], Kh = ["y1", "y2", "onMouseenter"], Uh = ["x", "y", "fill"], qh = ["x", "y", "fill"], Xh = ["transform"], Gh = { transform: "translate(-200, 0)" }, Zh = ["stroke"], Qh = ["fill"], Jh = { transform: "translate(-130, 0)" }, ef = ["stroke"], tf = ["fill"], nf = { transform: "translate(-60, 0)" }, af = ["stroke"], sf = ["fill"], of = { transform: "translate(10, 0)" }, lf = ["stroke"], rf = ["fill"], cf = { transform: "translate(80, 0)" }, df = ["fill"], uf = { transform: "translate(150, 0)" }, hf = ["fill"], ff = /* @__PURE__ */ re({
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
    const n = e, { isDark: a } = Ce(we(n, "theme")), s = $(() => ({
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
    }), i = (m) => typeof m == "string" ? m.charAt(0).toUpperCase() + m.slice(1).toLowerCase() : m, l = (m, v) => {
      const g = m.currentTarget.closest("svg");
      if (!g) return;
      const y = g.getBoundingClientRect(), b = g.createSVGPoint();
      b.x = m.clientX - y.left, b.y = m.clientY - y.top, o.value = {
        visible: !0,
        x: b.x,
        y: b.y - 20,
        text: v
      };
    }, r = (m) => {
      if (o.value.visible) {
        const v = m.currentTarget, g = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = m.clientX - g.left, y.y = m.clientY - g.top, o.value.x = y.x, o.value.y = y.y - 20;
      }
    }, c = () => {
      o.value.visible = !1;
    }, d = () => {
      o.value.visible = !1;
    }, h = $(() => {
      const m = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const b = y, f = (b - 1) / 9, _ = n.chartMargin + g - f * g;
        m.push({ value: b, y: _ });
      }
      return m;
    });
    return t({ isDark: a }), (m, v) => (p(), k("div", yh, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Te(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        o.value.visible ? (p(), k("g", {
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
          }, null, 8, kh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, D(o.value.text), 9, wh)
        ], 8, _h)) : z("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Ch),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, $h),
        (p(!0), k(ie, null, fe(h.value, (g, y) => (p(), k(ie, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Mh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(g.value), 9, Sh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, Dh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, Th),
        (p(!0), k(ie, null, fe(e.boxplotData, (g, y) => (p(), k(ie, { key: y }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (p(), k(ie, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Bh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Lh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ph),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Ih),
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
              }, null, 8, Rh)
            ], 64)) : (p(), k(ie, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Fh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Eh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Oh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Vh),
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
              }, null, 8, zh)
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
            }, null, 40, Nh),
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
            }, null, 40, Wh),
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
            }, null, 40, Hh),
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
            }, null, 40, jh),
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
            }, null, 40, Yh),
            g.averageY ? (p(), k("line", {
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
            }, null, 40, Kh)) : z("", !0)
          ], 8, Ah),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(g.label)), 9, Uh),
          g.responseCount ? (p(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(g.responseCount), 9, qh)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Gh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Zh),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Qh)
          ]),
          u("g", Jh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ef),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, tf)
          ]),
          u("g", nf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, af),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, sf)
          ]),
          u("g", of, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, lf),
            u("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, rf)
          ]),
          u("g", cf, [
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
            }, " Avg ", 8, df)
          ]),
          u("g", uf, [
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
            }, " Median ", 8, hf)
          ])
        ], 8, Xh)) : z("", !0)
      ], 44, xh))
    ]));
  }
}), gf = /* @__PURE__ */ me(ff, [["__scopeId", "data-v-9ac5c075"]]), mf = { class: "chart-container" }, pf = ["viewBox"], bf = ["x1", "y1", "x2", "y2", "stroke"], vf = ["points", "fill"], yf = ["x1", "y1", "x2", "y2", "stroke"], xf = ["x1", "y1", "x2", "y2", "stroke"], _f = ["x", "y", "fill"], kf = ["x", "y", "fill", "transform"], wf = ["x1", "y1", "x2", "y2", "stroke"], Cf = ["points", "fill"], $f = ["transform"], Mf = ["y1", "y2", "stroke", "onMouseenter"], Sf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Df = ["x1", "y1", "x2", "y2", "onMouseenter"], Tf = ["x1", "y1", "x2", "y2", "onMouseenter"], Af = ["cy", "stroke", "onMouseenter"], Bf = ["cy", "stroke", "onMouseenter"], Lf = ["x", "y", "fill"], Pf = ["x", "y", "fill"], If = ["transform"], Rf = { transform: "translate(-180, 0)" }, Ff = ["stroke"], Ef = ["fill"], Of = { transform: "translate(-120, 0)" }, Vf = ["fill"], zf = { transform: "translate(-60, 0)" }, Nf = ["fill"], Wf = { transform: "translate(0, 0)" }, Hf = ["stroke"], jf = ["fill"], Yf = { transform: "translate(60, 0)" }, Kf = ["fill"], Uf = { transform: "translate(130, 0)" }, qf = ["fill"], Xf = ["transform"], Gf = ["x", "y", "width", "height", "fill", "stroke"], Zf = ["y", "fill"], Qf = ["y", "fill"], ia = 10, Jf = 14, za = 13, jo = 4, Yo = 12, eg = /* @__PURE__ */ re({
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
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = ia + za + jo + Yo + ia, i = $(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(_, x, w) {
      const C = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(_, 1) * x * C);
    }
    function r(_, x) {
      return Math.max(
        l(_.length, za, !0),
        l(x.length, Yo, !1),
        52
      ) + Jf * 2;
    }
    function c(_, x, w, C) {
      const S = w / 2, M = 6, O = Math.min(
        Math.max(_, S + M),
        n.chartWidth - S - M
      ), A = M + C + 10, P = n.chartHeight - M + 10, B = Math.min(Math.max(x, A), P);
      return { x: O, y: B };
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
    }), m = (_) => typeof _ == "string" ? _.charAt(0).toUpperCase() + _.slice(1).toLowerCase() : _, v = (_, x, w) => {
      const C = _.currentTarget.closest("svg");
      if (!C) return;
      const S = C.getBoundingClientRect(), M = C.createSVGPoint();
      M.x = _.clientX - S.left, M.y = _.clientY - S.top;
      let O = m(x.label), A = "";
      switch (w) {
        case "body":
          A = `Q1: ${x.q1.toFixed(1)} | Q3: ${x.q3.toFixed(1)}`;
          break;
        case "wick":
          A = `Min: ${x.low.toFixed(1)} | Max: ${x.high.toFixed(1)}`;
          break;
        case "median":
          A = `Median: ${x.median.toFixed(1)}`;
          break;
        case "average":
          A = `Average: ${x.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          A = `Min: ${x.low.toFixed(1)}`;
          break;
        case "max":
          A = `Max: ${x.high.toFixed(1)}`;
          break;
      }
      const P = r(O, A), B = o;
      let F = M.x, X = M.y - 20;
      const te = c(F, X, P, B);
      F = te.x, X = te.y, h.value = {
        visible: !0,
        x: F,
        y: X,
        title: O,
        text: A,
        width: P,
        height: B
      };
    }, g = (_) => {
      if (h.value.visible) {
        const x = _.currentTarget, w = x.getBoundingClientRect(), C = x.createSVGPoint();
        C.x = _.clientX - w.left, C.y = _.clientY - w.top;
        let S = C.x, M = C.y - 20;
        const O = c(S, M, h.value.width, h.value.height);
        h.value.x = O.x, h.value.y = O.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, b = () => {
      h.value.visible = !1;
    }, f = $(() => {
      const _ = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let C = 1; C <= 10; C++) {
        const S = C, M = (S - 1) / 9, O = n.chartMargin + w - M * w;
        _.push({ value: S, y: O });
      }
      return _;
    });
    return t({ isDark: a }), (_, x) => (p(), k("div", mf, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Te(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: y
      }, [
        x[4] || (x[4] = u("defs", null, [
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
        }, null, 8, bf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, vf),
        (p(!0), k(ie, null, fe(f.value, (w, C) => (p(), k("line", {
          key: `grid-${C}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, yf))), 128)),
        (p(!0), k(ie, null, fe(f.value, (w, C) => (p(), k(ie, { key: C }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, xf),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(w.value), 9, _f)
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
        }, D(m(e.yAxisLabel)), 9, kf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, wf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Cf),
        (p(!0), k(ie, null, fe(e.candlestickData, (w, C) => (p(), k(ie, { key: C }, [
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
              onMouseenter: (S) => v(S, w, "wick"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Mf),
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
              onMouseenter: (S) => v(S, w, "body"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Sf),
            w.medianY ? (p(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "median"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Df)) : z("", !0),
            w.averageY ? (p(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => v(S, w, "average"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Tf)) : z("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "min"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Af),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => v(S, w, "max"),
              onMouseleave: b,
              style: { cursor: "pointer" }
            }, null, 40, Bf)
          ], 8, $f),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(m(w.label)), 9, Lf),
          w.responseCount ? (p(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(w.responseCount), 9, Pf)) : z("", !0)
        ], 64))), 128)),
        e.showLegend ? (p(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Rf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Ff),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Ef)
          ]),
          u("g", Of, [
            x[0] || (x[0] = u("rect", {
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
            }, " Q1 ", 8, Vf)
          ]),
          u("g", zf, [
            x[1] || (x[1] = u("rect", {
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
            }, " Q3 ", 8, Nf)
          ]),
          u("g", Wf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Hf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, jf)
          ]),
          u("g", Yf, [
            x[2] || (x[2] = u("line", {
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
            }, " Avg ", 8, Kf)
          ]),
          u("g", Uf, [
            x[3] || (x[3] = u("line", {
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
            }, " Median ", 8, qf)
          ])
        ], 8, If)) : z("", !0),
        h.value.visible ? (p(), k("g", {
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
          }, null, 8, Gf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ia,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Zf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ia + za + jo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, Qf)
        ], 8, Xf)) : z("", !0)
      ], 44, pf))
    ]));
  }
}), tg = /* @__PURE__ */ me(eg, [["__scopeId", "data-v-22efd66d"]]), ng = ["viewBox"], ag = ["x1", "y1", "x2", "y2", "stroke"], sg = ["x1", "y1", "x2", "y2", "stroke"], og = ["points", "fill"], ig = ["x1", "y1", "x2", "y2", "stroke"], lg = ["x", "y", "fill"], rg = ["x", "y", "fill", "transform"], cg = ["x1", "y1", "x2", "y2", "stroke"], dg = ["points", "fill"], ug = ["x1", "y1", "x2", "y2", "stroke"], hg = ["x", "y", "fill"], fg = ["x", "y", "fill"], gg = ["d"], mg = ["x", "y", "width", "height", "onMouseenter"], pg = ["x1", "y1", "x2", "y2"], bg = ["x", "y"], vg = ["x1", "y1", "x2", "y2"], yg = ["x", "y"], xg = ["x1", "y1", "x2", "y2"], _g = ["x", "y"], kg = ["x1", "y1", "x2", "y2"], wg = ["x", "y"], Cg = ["x1", "y1", "x2", "y2"], $g = ["x", "y"], Mg = ["x1", "y1", "x2", "y2"], Sg = ["x", "y"], Dg = ["transform"], Tg = { transform: "translate(-220, 0)" }, Ag = ["fill"], Bg = { transform: "translate(-140, 0)" }, Lg = ["fill"], Pg = { transform: "translate(-80, 0)" }, Ig = ["fill"], Rg = { transform: "translate(-20, 0)" }, Fg = ["fill"], Eg = { transform: "translate(60, 0)" }, Og = ["fill"], Vg = { transform: "translate(130, 0)" }, zg = ["fill"], Ng = { transform: "translate(180, 0)" }, Wg = ["fill"], Hg = ["transform"], jg = ["x", "y", "width", "height", "fill", "stroke"], Yg = ["y", "fill"], Kg = ["y", "fill"], la = 10, Ug = 14, Na = 13, Ko = 12, Uo = 4, qg = /* @__PURE__ */ re({
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
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = la + Na + Uo + Ko + la, i = $(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(W, K, I) {
      const V = I ? 0.6 : 0.535;
      return Math.ceil(Math.max(W, 1) * K * V);
    }
    function r(W, K) {
      return Math.max(
        l(W.length, Na, !0),
        l(K.length, Ko, !1),
        52
      ) + Ug * 2;
    }
    function c(W, K, I, V) {
      const H = I / 2, ne = 6, ue = Math.min(
        Math.max(W, H + ne),
        n.chartWidth - H - ne
      ), ye = ne + V + 10, pe = n.chartHeight - ne + 10, E = Math.min(Math.max(K, ye), pe);
      return { x: ue, y: E };
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
    }), m = $(() => n.chartWidth - n.chartMargin * 2), v = $(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), g = $(() => m.value / 10 * 0.6), y = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const W = Math.max(...n.histogram.map((I) => I.count || 0), 1), K = Math.max(1, Math.ceil(W * 0.2));
      return W + K;
    }), b = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const W = n.averageScore || 0;
      let K = 0, I = 0;
      if (n.histogram.forEach((H) => {
        const ne = H.count || 0;
        K += ne;
        const ue = H.score - W;
        I += ne * (ue * ue);
      }), K === 0) return 1;
      const V = I / K;
      return Math.sqrt(V) || 1;
    }), f = (W, K, I) => {
      if (I === 0) return 0;
      const V = 1 / (I * Math.sqrt(2 * Math.PI)), H = -0.5 * Math.pow((W - K) / I, 2);
      return V * Math.exp(H);
    }, _ = $(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && b.value === 0) return null;
      const W = n.averageScore, K = b.value, I = 100, H = Math.max(...n.histogram.map((pe) => pe.count || 0), 1) / y.value * v.value;
      if (H <= 0) return null;
      let ne = 0;
      for (let pe = 0; pe <= I; pe++) {
        const E = 1 + 9 * (pe / I), j = f(E, W, K);
        j > ne && (ne = j);
      }
      if (ne <= 0) return null;
      const ue = H / ne, ye = [];
      for (let pe = 0; pe <= I; pe++) {
        const E = 1 + 9 * (pe / I), j = f(E, W, K) * ue, Z = w(E);
        if (Z !== null) {
          const he = n.chartHeight - n.chartBottomMargin - j;
          ye.push(`${pe === 0 ? "M" : "L"} ${Z} ${he}`);
        }
      }
      return ye.join(" ");
    }), x = $(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const W = m.value / 10;
      return n.histogram.map((K, I) => {
        const V = n.chartMargin + (I + 0.5) * W, H = K.count > 0 ? K.count / y.value * v.value : 0, ne = n.chartHeight - n.chartBottomMargin - H;
        return {
          score: K.score,
          count: K.count,
          x: V,
          y: ne,
          height: H
        };
      });
    }), w = (W) => {
      if (W < 1 || W > 10) return null;
      const K = m.value / 10;
      return n.chartMargin + (W - 0.5) * K;
    }, C = $(() => w(n.minScore)), S = $(() => w(n.maxScore)), M = $(() => w(n.q1Score)), O = $(() => w(n.medianScore)), A = $(() => w(n.q3Score)), P = $(() => w(n.averageScore)), B = $(() => n.minScore), F = $(() => n.maxScore), X = $(() => n.q1Score), te = $(() => n.medianScore), U = $(() => n.q3Score), le = $(() => n.averageScore), ce = $(() => {
      const W = [], K = n.chartMargin - 8, I = 18;
      M.value !== null && W.push({
        x: M.value,
        y: K,
        value: n.q1Score,
        label: `Q1: ${X.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), O.value !== null && W.push({
        x: O.value,
        y: K - I,
        value: n.medianScore,
        label: `Median: ${te.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), P.value !== null && W.push({
        x: P.value,
        y: K - I,
        value: n.averageScore,
        label: `Avg: ${le.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), A.value !== null && W.push({
        x: A.value,
        y: K,
        value: n.q3Score,
        label: `Q3: ${U.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), W.sort((ne, ue) => (ne.x || 0) - (ue.x || 0));
      const V = [[], [], []];
      W.forEach((ne) => {
        if (ne.x === null) return;
        let ue = -1;
        for (let ye = 0; ye < V.length; ye++) {
          let pe = !1;
          for (const E of V[ye]) {
            if (E.x === null) continue;
            const j = Math.abs(ne.x - E.x), Z = (ne.width + E.width) / 2 + 10;
            if (j < Z) {
              pe = !0;
              break;
            }
          }
          if (!pe) {
            ue = ye;
            break;
          }
        }
        ue === -1 && (ue = V.length - 1), ne.y = K - ue * I, V[ue].push(ne);
      });
      const H = 15;
      return W.forEach((ne) => {
        ne.y < H && (ne.y = H);
      }), W;
    }), G = (W) => ce.value.find((I) => I.id === W)?.y || n.chartMargin - 10, de = $(() => {
      const W = [];
      for (let I = 0; I <= 5; I++) {
        const V = Math.round(y.value / 5 * I), H = n.chartHeight - n.chartBottomMargin - I / 5 * v.value;
        W.push({ value: V, y: H });
      }
      return W;
    });
    function N(W, K, I) {
      const V = W.createSVGPoint();
      V.x = K, V.y = I;
      const H = W.getScreenCTM();
      if (!H) {
        const ue = W.getBoundingClientRect();
        return { x: K - ue.left, y: I - ue.top };
      }
      const ne = V.matrixTransform(H.inverse());
      return { x: ne.x, y: ne.y };
    }
    const J = (W, K) => {
      n.interactive && ge(W, K);
    }, se = () => {
      n.interactive && q();
    }, ge = (W, K) => {
      const I = W.currentTarget.closest("svg");
      if (!I) return;
      const { x: V, y: H } = N(I, W.clientX, W.clientY), ne = `Score: ${K.score}`, ue = `Count: ${Number(K.count ?? 0).toLocaleString()}`, ye = r(ne, ue), pe = o, E = typeof K?.x == "number" ? K.x : V;
      let j = H - 20;
      const Z = c(E, j, ye, pe);
      h.value = {
        visible: !0,
        x: Z.x,
        y: Z.y,
        title: ne,
        text: ue,
        width: ye,
        height: pe,
        anchorX: typeof K?.x == "number" ? K.x : null
      };
    }, xe = (W) => {
      if (n.interactive && h.value.visible) {
        const K = W.currentTarget, { x: I, y: V } = N(K, W.clientX, W.clientY), H = h.value.anchorX, ne = H != null && Number.isFinite(H) ? H : I;
        let ue = V - 20;
        const ye = c(ne, ue, h.value.width, h.value.height);
        h.value.x = ye.x, h.value.y = ye.y;
      }
    }, Y = () => {
      q();
    }, q = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (W, K) => (p(), k("div", {
      class: Q(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (p(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Te(`min-height: ${e.chartHeight}px;`),
        onMousemove: xe,
        onMouseleave: Y
      }, [
        K[7] || (K[7] = u("defs", null, [
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
        (p(!0), k(ie, null, fe(de.value, (I, V) => (p(), k("line", {
          key: `grid-${V}`,
          x1: e.chartMargin,
          y1: I.y,
          x2: e.chartWidth - e.chartMargin,
          y2: I.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, ag))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, sg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, og),
        (p(!0), k(ie, null, fe(de.value, (I, V) => (p(), k(ie, {
          key: `y-tick-${V}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: I.y,
            x2: e.chartMargin,
            y2: I.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ig),
          u("text", {
            x: e.chartMargin - 12,
            y: I.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(I.value), 9, lg)
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
        }, " Count ", 8, rg),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, cg),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, dg),
        (p(!0), k(ie, null, fe(x.value, (I, V) => (p(), k(ie, {
          key: `tick-${V}`
        }, [
          u("line", {
            x1: I.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: I.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, ug),
          u("text", {
            x: I.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(I.score), 9, hg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, fg),
        _.value ? (p(), k("path", {
          key: 0,
          d: _.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, gg)) : z("", !0),
        (p(!0), k(ie, null, fe(x.value, (I, V) => (p(), k("rect", {
          key: `bar-${V}`,
          x: I.x - g.value / 2,
          y: I.y,
          width: g.value,
          height: I.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (H) => J(H, I),
          onMouseleave: se,
          style: Te({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, mg))), 128)),
        C.value ? (p(), k("line", {
          key: 1,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, pg)) : z("", !0),
        C.value ? (p(), k("text", {
          key: 2,
          x: C.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(B.value.toFixed(1)), 9, bg)) : z("", !0),
        M.value ? (p(), k("line", {
          key: 3,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, vg)) : z("", !0),
        M.value ? (p(), k("text", {
          key: 4,
          x: M.value,
          y: G("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(X.value.toFixed(1)), 9, yg)) : z("", !0),
        O.value ? (p(), k("line", {
          key: 5,
          x1: O.value,
          y1: e.chartMargin,
          x2: O.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, xg)) : z("", !0),
        O.value ? (p(), k("text", {
          key: 6,
          x: O.value,
          y: G("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(te.value.toFixed(1)), 9, _g)) : z("", !0),
        P.value ? (p(), k("line", {
          key: 7,
          x1: P.value,
          y1: e.chartMargin,
          x2: P.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, kg)) : z("", !0),
        P.value ? (p(), k("text", {
          key: 8,
          x: P.value,
          y: G("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(le.value.toFixed(1)), 9, wg)) : z("", !0),
        A.value ? (p(), k("line", {
          key: 9,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Cg)) : z("", !0),
        A.value ? (p(), k("text", {
          key: 10,
          x: A.value,
          y: G("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(U.value.toFixed(1)), 9, $g)) : z("", !0),
        S.value ? (p(), k("line", {
          key: 11,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Mg)) : z("", !0),
        S.value ? (p(), k("text", {
          key: 12,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(F.value.toFixed(1)), 9, Sg)) : z("", !0),
        e.showLegend ? (p(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Tg, [
            K[0] || (K[0] = u("line", {
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
            }, " Gaussian ", 8, Ag)
          ]),
          u("g", Bg, [
            K[1] || (K[1] = u("line", {
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
            }, " Min ", 8, Lg)
          ]),
          u("g", Pg, [
            K[2] || (K[2] = u("line", {
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
            }, " Q1 ", 8, Ig)
          ]),
          u("g", Rg, [
            K[3] || (K[3] = u("line", {
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
            }, " Median ", 8, Fg)
          ]),
          u("g", Eg, [
            K[4] || (K[4] = u("line", {
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
            }, " Avg ", 8, Og)
          ]),
          u("g", Vg, [
            K[5] || (K[5] = u("line", {
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
            }, " Q3 ", 8, zg)
          ]),
          u("g", Ng, [
            K[6] || (K[6] = u("line", {
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
            }, " Max ", 8, Wg)
          ])
        ], 8, Dg)) : z("", !0),
        e.interactive && h.value.visible ? (p(), k("g", {
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
          }, null, 8, jg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + la,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, Yg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + la + Na + Uo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, Kg)
        ], 8, Hg)) : z("", !0)
      ], 44, ng))
    ], 2));
  }
}), Gi = /* @__PURE__ */ me(qg, [["__scopeId", "data-v-47db27b6"]]), Xg = 639, Zi = 1024;
function qo(e) {
  return e < 640 ? "mobile" : e <= Zi ? "tablet" : "desktop";
}
function Gg() {
  const e = ae(
    typeof window > "u" ? "desktop" : qo(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = qo(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  Je(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Xg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Zi}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), ft(() => {
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
const Zg = { class: "chart-container" }, Qg = {
  key: 0,
  class: "loading-state loading-overlay"
}, wn = 12, Jg = /* @__PURE__ */ re({
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
    $s.use([_l, kl, wl, Cl]);
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), { breakpoint: o } = Gg(), i = ae(null), l = ae(!0), r = ae(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, m = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, v = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, b = $(() => {
      const Y = o.value;
      return Y === "mobile" ? {
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
      } : Y === "tablet" ? {
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
    }), f = (Y, q) => {
      const W = Y.trim();
      if (!W || q < 1) return Y;
      if (W.length <= q) return W;
      const K = [];
      let I = 0;
      for (; I < W.length; ) {
        const V = Math.min(I + q, W.length);
        if (V >= W.length) {
          const ue = W.slice(I).trim();
          ue && K.push(ue);
          break;
        }
        const H = W.slice(I, V), ne = H.lastIndexOf(" ");
        if (ne > 0)
          for (K.push(W.slice(I, I + ne).trim()), I += ne; I < W.length && W[I] === " "; ) I += 1;
        else
          K.push(H), I = V;
      }
      return K.join(`
`);
    }, _ = (Y) => Y.status ? Y.status : g.test(Y.name) ? "abandon" : y.test(Y.name) ? "error" : "success", x = (Y) => Y.originalValue ?? Y.value, w = (Y, q) => {
      const W = new Set(q.map((I) => I.target)), K = Y.filter((I) => !W.has(I.name));
      for (const I of K) {
        if (typeof I.value == "number" && I.value > 0) return I.value;
        const V = q.filter((H) => H.source === I.name);
        if (V.length > 0)
          return V.reduce((H, ne) => H + x(ne), 0);
      }
      return q.reduce((I, V) => Math.max(I, x(V)), 0);
    }, C = (Y, q, W) => {
      if (W && typeof W.value == "number") return W.value;
      const K = q.filter((V) => V.target === Y);
      return K.length > 0 ? K.reduce((V, H) => V + x(H), 0) : q.filter((V) => V.source === Y).reduce((V, H) => V + x(H), 0);
    }, S = (Y, q) => {
      const W = /* @__PURE__ */ new Map(), K = new Set(q.map((V) => V.target)), I = Y.filter((V) => !K.has(V.name)).map((V) => ({ name: V.name, depth: 0 }));
      for (; I.length > 0; ) {
        const { name: V, depth: H } = I.shift(), ne = W.get(V);
        if (!(ne !== void 0 && ne >= H)) {
          W.set(V, H);
          for (const ue of q)
            ue.source === V && I.push({ name: ue.target, depth: H + 1 });
        }
      }
      for (const V of Y)
        W.has(V.name) || W.set(V.name, 0);
      return W;
    }, M = (Y, q) => {
      const W = /* @__PURE__ */ new Map(), K = new Set(q.map((ne) => ne.target)), I = Y.filter((ne) => !K.has(ne.name));
      let V = 0;
      const H = (ne) => {
        let ue = ne;
        for (; ue && !W.has(ue); )
          W.set(ue, V), V += 1, ue = q.filter(
            (pe) => pe.source === ue && _({ name: pe.target }) === "success"
          ).sort((pe, E) => x(E) - x(pe))[0]?.target;
      };
      return I.forEach((ne) => H(ne.name)), W;
    }, O = (Y, q, W) => {
      const K = _(Y);
      if (K === "success" && W.has(Y.name))
        return W.get(Y.name);
      if (K === "success") {
        const I = q.filter((H) => H.target === Y.name);
        return 200 + (I.length ? Math.min(
          ...I.map(
            (H) => W.has(H.source) ? (W.get(H.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return K === "abandon" ? 1e3 : 2e3;
    }, A = (Y, q) => {
      const W = S(Y, q), K = M(Y, q);
      return [...Y].sort((I, V) => {
        const H = W.get(I.name) ?? 0, ne = W.get(V.name) ?? 0;
        if (H !== ne) return H - ne;
        const ue = v[_(I)], ye = v[_(V)];
        if (ue !== ye) return ue - ye;
        const pe = O(I, q, K), E = O(V, q, K);
        return pe !== E ? pe - E : I.name.localeCompare(V.name);
      });
    }, P = (Y, q, W, K) => {
      const V = f(Y, K).split(`
`), H = q * 0.58, ue = Math.max(...V.map((pe) => pe.length), 1) * H, ye = V.length * W;
      return {
        lines: V,
        width: ue,
        height: ye,
        nodeWidth: ue + wn * 2
      };
    }, B = (Y, q) => q ? `${(Y / q * 100).toFixed(1)}%` : "0.0%", F = (Y, q, W, K, I) => {
      if (Y.label) return f(Y.label, I);
      const V = f(Y.name, I);
      if (q === "success" && W > 0) {
        const H = C(Y.name, K, Y), ne = B(H, W);
        return `${V}
(${ne})`;
      }
      return V;
    }, X = (Y, q = 0) => {
      if (q > 0) return q;
      const W = Y.match(/^(\d+(?:\.\d+)?)px$/);
      if (W) return Number(W[1]);
      const K = Y.match(/^(\d+(?:\.\d+)?)vh$/);
      return K && typeof window < "u" ? Number(K[1]) / 100 * window.innerHeight : 500;
    }, te = (Y, q, W, K, I) => {
      if (!q.length || !Y.length || I <= 0) return Y;
      const V = Y.map((Z) => ({ ...Z })), H = W.labelLineHeight || Math.round(W.labelFontSize * 1.25), ne = Math.max(4, W.labelCharsPerLine), ue = Math.max(K * 0.88, 260), ye = S(q, V), pe = /* @__PURE__ */ new Map();
      q.forEach((Z) => {
        const he = ye.get(Z.name) ?? 0;
        pe.set(he, (pe.get(he) ?? 0) + 1);
      });
      const E = (Z) => {
        const $e = q.find((Ut) => Ut.name === Z)?.displayLabel || Z, Lt = P($e, W.labelFontSize, H, ne).height + wn * 2, Pt = ye.get(Z) ?? 0, gt = pe.get(Pt) ?? 1, Kt = (Math.max(gt, 1) - 1) * W.nodeGap / Math.max(gt, 1), bn = Math.max(ue - Kt, Lt);
        return Math.max(1, Lt / bn * I);
      }, j = (Z) => {
        const he = V.filter(($e) => $e.target === Z);
        return he.length > 0 ? he.reduce(($e, Ne) => $e + Ne.value, 0) : V.filter(($e) => $e.source === Z).reduce(($e, Ne) => $e + Ne.value, 0);
      };
      for (let Z = 0; Z < 16; Z += 1) {
        let he = !1;
        for (const $e of q) {
          const Ne = E($e.name), Lt = j($e.name);
          if (Lt >= Ne) continue;
          const Pt = V.filter((Ut) => Ut.target === $e.name), gt = V.filter((Ut) => Ut.source === $e.name), Kt = Pt.length > 0 ? Pt : gt;
          if (Kt.length === 0) continue;
          const bn = Ne / Math.max(Lt, 1e-6);
          Kt.forEach((Ut) => {
            Ut.value *= bn;
          }), he = !0;
        }
        if (!he) break;
      }
      return V;
    }, U = (Y, q, W) => {
      const K = w(Y, q), I = A(Y, q), V = W.labelLineHeight || Math.round(W.labelFontSize * 1.25), H = Math.max(4, W.labelCharsPerLine);
      let ne = W.nodeWidth;
      const ue = [], ye = I.map((E, j) => {
        const Z = _(E), he = F(
          E,
          Z,
          K,
          q,
          H
        );
        ue.push(he);
        const $e = P(he, W.labelFontSize, V, H);
        W.orient === "vertical" ? ne = Math.max(ne, $e.height + wn * 2) : ne = Math.max(ne, $e.nodeWidth);
        const Ne = n.nodeColors[E.name] || m[Z] || le[j % le.length];
        return {
          ...E,
          displayLabel: he,
          itemStyle: {
            color: Ne,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let pe = { ...W.contentMargins };
      if (W.orient === "vertical") {
        const E = Math.max(
          ...ue.map(
            (Z) => P(Z, W.labelFontSize, V, H).width
          ),
          0
        ), j = typeof pe.right == "number" ? pe.right : 10;
        pe = {
          ...pe,
          right: Math.max(j, E + wn + W.labelDistance)
        };
      }
      return { nodes: ye, maxNodeWidth: ne, contentMargins: pe, originTotal: K };
    }, le = [
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
    ], ce = () => {
      const Y = n.data.links.filter(
        (I) => I.source && I.target && typeof I.value == "number"
      ), q = Math.max(...Y.map((I) => I.value), 1), W = Math.max(1, q * 0.01), K = Y.map((I) => ({
        ...I,
        originalValue: I.value,
        value: I.value < q * 0.01 ? W : I.value
      }));
      return {
        nodes: n.data.nodes.filter((I) => I.name),
        links: K
      };
    }, G = (Y) => (q) => {
      const W = q.dataType === "node", K = s.value.tooltipText, I = a.value ? "#d1d5db" : "#e2e8f0";
      if (W) {
        const ye = Y.filter((j) => j.target === q.name), pe = Y.filter((j) => j.source === q.name), E = ye.length > 0 ? ye.reduce((j, Z) => j + (Z.originalValue || Z.value), 0) : pe.reduce((j, Z) => j + (Z.originalValue || Z.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${K};">${q.name}</div><div style="color: ${I}; font-size: 12px;">Count: ${E.toLocaleString()}</div>`;
      }
      const V = q.data?.source || q.source || "Unknown", H = q.data?.target || q.target || "Unknown", ne = q.data?.originalValue || q.data?.value || q.value || 0, ue = q.data?.label || `${ne.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${K};">${V} → ${H}</div><div style="color: ${I}; font-size: 12px;">Flow: ${ue}</div>`;
    }, de = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const Y = b.value, q = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", W = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", K = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", I = Y.labelPosition === "inside" ? "#ffffff" : a.value ? s.value.textPrimary : "#334155";
      try {
        const { nodes: V, links: H } = ce(), { nodes: ne, maxNodeWidth: ue, contentMargins: ye, originTotal: pe } = U(
          V,
          H,
          Y
        ), E = X(n.height, i.value?.clientHeight ?? 0), j = te(
          H,
          ne,
          {
            labelFontSize: Y.labelFontSize,
            labelLineHeight: Y.labelLineHeight || Math.round(Y.labelFontSize * 1.25),
            labelCharsPerLine: Y.labelCharsPerLine,
            nodeGap: Y.nodeGap
          },
          E,
          pe
        ), Z = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: G(j),
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
              data: ne,
              links: j,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: W,
                  opacity: 1
                }
              },
              lineStyle: {
                color: q,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: Y.labelPosition,
                color: I,
                fontWeight: 700,
                fontSize: Y.labelFontSize,
                lineHeight: Y.labelLineHeight || Math.round(Y.labelFontSize * 1.25),
                padding: wn,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...Y.labelWrap && Y.labelTextWidth > 0 ? { width: Y.labelTextWidth, overflow: "none" } : {},
                ...Y.labelDistance > 0 ? { distance: Y.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (he) => he.data?.displayLabel || he.name || ""
              },
              edgeLabel: Y.edgeLabelShow ? {
                show: !0,
                fontSize: Y.edgeLabelFontSize,
                color: K,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (he) => {
                  if (he.data?.label) return he.data.label;
                  const $e = he.data?.originalValue ?? he.value ?? 0, Ne = he.data?.source ?? he.source, Lt = j.filter((gt) => gt.source === Ne).reduce((gt, Kt) => gt + x(Kt), 0), Pt = B($e, Lt);
                  return `${Number($e).toLocaleString()} (${Pt})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: Y.nodeGap,
              nodeWidth: ue,
              layoutIterations: h.node.iterations,
              orient: Y.orient,
              draggable: !1,
              ...ye
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(Z), c.resize();
      } catch (V) {
        console.error("Error setting Sankey chart options:", V), r.value = !0;
      }
    }, N = async () => {
      if (i.value)
        try {
          c = $s.init(i.value), de(), window.addEventListener("resize", ge);
        } catch (Y) {
          console.error("Error initializing Sankey chart:", Y), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, J = () => {
      const Y = i.value;
      return !!(Y && Y.clientWidth > 0 && Y.clientHeight > 0);
    }, se = async () => {
      if (await We(), J()) return N();
      await new Promise((Y) => {
        const q = i.value;
        if (!q) {
          Y();
          return;
        }
        d = new ResizeObserver(() => {
          J() && (d?.disconnect(), d = null, N().then(Y));
        }), d.observe(q);
      });
    }, ge = () => c?.resize(), xe = () => {
      window.removeEventListener("resize", ge), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Je(() => se()), ei(xe), Fe(() => n.data, de, { deep: !0 }), Fe(a, de), Fe(o, de), t({ isDark: a }), (Y, q) => (p(), k("div", Zg, [
      r.value ? (p(), k("div", {
        key: 0,
        class: "error-state",
        style: Te({ height: e.height })
      }, [...q[0] || (q[0] = [
        ws('<div class="error-content" data-v-4a1e9903><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4a1e9903><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-4a1e9903></path></svg><p class="error-title" data-v-4a1e9903>Chart could not be loaded</p><p class="error-description" data-v-4a1e9903>Please check the data format.</p></div>', 1)
      ])], 4)) : (p(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: Te({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (p(), k("div", Qg, [...q[1] || (q[1] = [
          ws('<div class="loading-container" data-v-4a1e9903><div class="sankey-loader" data-v-4a1e9903><div class="flow flow-1" data-v-4a1e9903></div><div class="flow flow-2" data-v-4a1e9903></div><div class="flow flow-3" data-v-4a1e9903></div><div class="flow flow-4" data-v-4a1e9903></div></div><p class="loading-text" data-v-4a1e9903>Loading Sankey diagram...</p></div>', 1)
        ])])) : z("", !0)
      ], 4))
    ]));
  }
}), Yt = /* @__PURE__ */ me(Jg, [["__scopeId", "data-v-4a1e9903"]]), em = ["open"], tm = { class: "card-header metric-collapsible__summary" }, nm = { class: "header-content metric-header-content" }, am = { class: "metric-header-content__main" }, sm = { class: "metric-header-content__text" }, om = {
  key: "header-skeleton",
  class: "ut-skeleton-blink ut-skeleton-collapsible-title",
  "aria-hidden": "true",
  "aria-busy": "true"
}, im = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, lm = {
  key: 0,
  class: "card-title"
}, rm = {
  key: 0,
  class: "card-subtitle"
}, cm = {
  key: 0,
  class: "metric-header-content__export"
}, dm = {
  key: 0,
  class: "cmc-header-aside"
}, um = { class: "chart-metric-container__body" }, hm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, fm = { class: "card-header" }, gm = { class: "header-content metric-header-content" }, mm = { class: "metric-header-content__main" }, pm = { class: "metric-header-content__text" }, bm = {
  key: "header-skeleton",
  class: "ut-skeleton-container",
  "aria-hidden": "true",
  "aria-busy": "true"
}, vm = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, ym = {
  key: 0,
  class: "card-title"
}, xm = {
  key: 0,
  class: "card-subtitle"
}, _m = {
  key: 0,
  class: "metric-header-content__export"
}, km = {
  key: 0,
  class: "cmc-header-aside"
}, wm = { class: "chart-metric-container__body" }, Cm = /* @__PURE__ */ re({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ae(t.defaultOpen), a = Qa();
    function s(l) {
      return l.some((r) => {
        if (r.type === yl) return !1;
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
    Fe(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const r = l.currentTarget;
      r?.tagName === "DETAILS" && (n.value = r.open);
    }
    return (l, r) => e.collapsible ? (p(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", tm, [
        u("div", nm, [
          u("div", am, [
            u("div", sm, [
              R(Me, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: L(() => [
                  e.loading ? (p(), k("div", om)) : (p(), k("div", im, [
                    Se(l.$slots, "title", {}, () => [
                      e.title ? (p(), k("h3", lm, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (p(), k("p", rm, D(e.subtitle), 1)) : z("", !0),
                    Se(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (p(), k("div", cm, [
              Se(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (p(), k("div", dm, [
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
      u("div", um, [
        Se(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, em)) : (p(), k("div", hm, [
      u("div", fm, [
        u("div", gm, [
          u("div", mm, [
            u("div", pm, [
              R(Me, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: L(() => [
                  e.loading ? (p(), k("div", bm, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (p(), k("div", vm, [
                    Se(l.$slots, "title", {}, () => [
                      e.title ? (p(), k("h3", ym, D(e.title), 1)) : z("", !0)
                    ], !0),
                    e.subtitle ? (p(), k("p", xm, D(e.subtitle), 1)) : z("", !0),
                    Se(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            o.value ? (p(), k("div", _m, [
              Se(l.$slots, "headerExport", {}, void 0, !0)
            ])) : z("", !0)
          ]),
          l.$slots.headerAside ? (p(), k("div", km, [
            Se(l.$slots, "headerAside", {}, void 0, !0)
          ])) : z("", !0)
        ])
      ]),
      u("div", wm, [
        Se(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ke = /* @__PURE__ */ me(Cm, [["__scopeId", "data-v-8741c0a0"]]);
function $m(e, t) {
  return p(), k("svg", {
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
function xs(e, t) {
  return p(), k("svg", {
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
function et(e, t) {
  return p(), k("svg", {
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
function Mm(e, t) {
  return p(), k("svg", {
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
function _s(e, t) {
  return p(), k("svg", {
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
function Qi(e, t) {
  return p(), k("svg", {
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
function Ji(e, t) {
  return p(), k("svg", {
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
function Sm(e, t) {
  return p(), k("svg", {
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
function Dm(e, t) {
  return p(), k("svg", {
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
function el(e, t) {
  return p(), k("svg", {
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
const Tm = {
  key: 0,
  class: "footer-divider"
}, Am = {
  key: 0,
  class: "export-label"
}, Bm = { class: "export-buttons" }, Lm = ["disabled"], Pm = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Im = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Rm = ["disabled"], Fm = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Em = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Om = /* @__PURE__ */ re({
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
    return (r, c) => (p(), ee(Jt(s.value), {
      class: Q(o.value)
    }, {
      default: L(() => [
        e.variant === "footer" ? (p(), k("div", Tm)) : z("", !0),
        u("div", {
          class: Q(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (p(), k("span", Am, "Export")) : z("", !0),
          u("div", Bm, [
            i("pdf") ? (p(), k("button", {
              key: 0,
              type: "button",
              class: Q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (p(), k("svg", Pm, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Im, [...c[3] || (c[3] = [
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
            ], 10, Lm)) : z("", !0),
            i("csv") ? (p(), k("button", {
              key: 1,
              type: "button",
              class: Q(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (p(), k("svg", Fm, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (p(), k("svg", Em, [...c[6] || (c[6] = [
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
            ], 10, Rm)) : z("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ee = /* @__PURE__ */ me(Om, [["__scopeId", "data-v-ebfab47f"]]), Vm = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, zm = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Nm = { class: "w-full shrink-0 sm:pr-2" }, Wm = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Hm = { class: "max-w-[360px] text-center" }, jm = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ym = /* @__PURE__ */ re({
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
    }, s = e, o = n, i = (m) => {
      o("export", m);
    }, l = we(s, "theme"), r = we(s, "options"), { isDark: c } = Ce(l), d = (m) => {
      const v = new Date(m), g = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, h = $(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = v.map((x) => d(x)), y = /* @__PURE__ */ new Set();
      for (const x of Object.values(m))
        for (const w of Object.keys(x))
          y.add(w);
      const b = Array.from(y), f = (x) => x, _ = b.map((x) => ({
        label: x,
        data: v.map((w) => m[w]?.[x] || 0),
        backgroundColor: `${a[x] || "#94a3b8"}80`,
        borderColor: f(a[x] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: _
      };
    });
    return t({ isDark: c }), (m, v) => (p(), ee(ke, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", Vm, [
          R(Me, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: L(() => [
              e.loading ? (p(), k("div", {
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
              ])], 2)) : h.value.labels && h.value.labels.length ? (p(), k("section", zm, [
                u("div", Nm, [
                  R(kt, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (p(), k("section", Wm, [
                u("div", Hm, [
                  u("div", jm, [
                    R(T(et), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Km = /* @__PURE__ */ me(Ym, [["__scopeId", "data-v-36bec153"]]), rn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", be = (e, t) => `${e.toLocaleString()} (${rn(e, t)})`, Um = { class: "flex w-full min-w-0 justify-center" }, qm = { class: "flex max-w-full min-w-0 items-center gap-2" }, Xm = { class: "min-w-0 truncate text-[12px] leading-normal" }, Gm = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Zm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Qm = /* @__PURE__ */ re({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (p(), k("div", {
      class: Q(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", Um, [
        u("div", qm, [
          e.color ? (p(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Te({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", Xm, D(e.title), 1)
        ])
      ]),
      u("p", Gm, D(e.value), 1),
      e.subvalue ? (p(), k("p", Zm, D(e.subvalue), 1)) : z("", !0)
    ], 2));
  }
}), ve = /* @__PURE__ */ me(Qm, [["__scopeId", "data-v-945ff8fb"]]), Jm = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ue = /* @__PURE__ */ re({
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
    return (l, r) => n.value ? (p(), k("span", {
      key: 0,
      role: "status",
      class: Q(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (p(), k("span", Jm, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : z("", !0),
      u("span", {
        class: Q(["min-w-0 flex-1 text-center", o.value])
      }, D(a.value), 3)
    ], 2)) : (p(), k("span", {
      key: 1,
      class: Q(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Se(l.$slots, "default", {}, () => [
        Ae(D(e.label), 1)
      ])
    ], 2));
  }
}), oe = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Be = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), It = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, ep = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, tp = { class: "overflow-x-auto" }, np = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, ap = /* @__PURE__ */ re({
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
    const t = e, n = ae(!1), a = "—";
    function s(y) {
      return y == null || y === "" ? a : String(y);
    }
    function o(y) {
      return y === "center" ? "text-center" : y === "right" ? "text-right" : "text-left";
    }
    function i(y) {
      return `cell-${y}`;
    }
    function l(y, b) {
      return y[b];
    }
    function r(y, b) {
      if (typeof t.rowKey == "function")
        return t.rowKey(y);
      const f = y[t.rowKey];
      return typeof f == "string" || typeof f == "number" ? f : b;
    }
    function c(y, b) {
      return r(y, b);
    }
    const d = $(() => t.rows?.length ?? 0), h = $(() => d.value > t.maxVisibleRows), m = $(() => Math.max(0, d.value - t.maxVisibleRows)), v = $(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), g = $(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(m.value))
    );
    return (y, b) => (p(), k("div", ep, [
      u("div", tp, [
        u("table", np, [
          u("thead", null, [
            u("tr", null, [
              (p(!0), k(ie, null, fe(e.columns, (f) => (p(), k("th", {
                key: f.key,
                scope: "col",
                class: Q(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(f.align), f.headerClass]])
              }, D(f.label), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(ie, null, fe(v.value, (f, _) => (p(), k("tr", {
              key: c(f, _)
            }, [
              (p(!0), k(ie, null, fe(e.columns, (x) => (p(), k("td", {
                key: `${_}-${x.key}`,
                class: Q(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(x.align), x.cellClass]])
              }, [
                Se(y.$slots, i(x.key), {
                  row: f,
                  column: x,
                  value: l(f, x.key)
                }, () => [
                  Ae(D(s(l(f, x.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (p(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: b[0] || (b[0] = (f) => n.value = !n.value)
      }, [
        Ae(D(n.value ? e.viewLessLabel : g.value) + " ", 1),
        (p(), k("svg", {
          class: Q(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...b[1] || (b[1] = [
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
}), lt = /* @__PURE__ */ me(ap, [["__scopeId", "data-v-58cfdc5e"]]), sp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, op = {
  key: "error",
  class: "error-state"
}, ip = { class: "error-content" }, lp = { class: "error-description" }, rp = {
  key: "content",
  class: "card-body"
}, cp = { class: "chart-section" }, dp = { class: "chart-wrapper" }, up = { class: "payment-success-summary" }, hp = {
  key: 0,
  class: "booking-daily-section"
}, fp = { class: "w-full min-w-0" }, gp = { class: "font-medium" }, mp = { class: "percentage-text" }, pp = { class: "badges-container" }, bp = {
  key: 0,
  class: "badges-container"
}, vp = {
  key: 1,
  class: "percentage-text"
}, yp = { class: "badges-container" }, xp = {
  key: 1,
  class: "empty-state"
}, _p = /* @__PURE__ */ re({
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
      (f, _) => new Date(f.date).getTime() - new Date(_.date).getTime()
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
        (_) => `${_.currency} ${g(_.total_value)}`
      ).join(" · ");
    }), h = (f) => f.payment_success_value || [], m = (f) => typeof f.payment_success_count == "number" ? f.payment_success_count : (f.payment_success_value || []).reduce(
      (_, x) => _ + (x.count || 0),
      0
    ), v = (f) => Be(f), g = (f) => f == null ? "0" : It(f);
    $(() => (a.data?.total_payment_success_value || []).reduce(
      (f, _) => f + (_.total_value || 0),
      0
    ));
    const y = $(() => {
      const f = a.data, _ = f.total_booking_initiated || 0, x = f.total_booking_started || 0, w = f.total_payment_initiated || 0, C = f.total_not_found || 0, S = f.total_cancelled || 0, M = f.total_no_pending_balance || 0, O = f.total_errors || 0, A = typeof f.total_payment_success == "number" ? f.total_payment_success : (f.total_payment_success_value || []).reduce(
        (le, ce) => le + (ce.count || 0),
        0
      ), P = f.total_payment_failed || 0, B = Math.max(0, _ - x), F = Math.max(
        0,
        x - w - C - S - M - O
      ), X = (le, ce) => be(le, ce), te = [
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
      ], U = [];
      return x > 0 && U.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: X(x, _)
      }), B > 0 && U.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: B,
        label: X(B, _)
      }), w > 0 && U.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: X(w, x)
      }), C > 0 && U.push({
        source: "Started",
        target: "Not Found",
        value: C,
        label: X(C, x)
      }), S > 0 && U.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: X(S, x)
      }), M > 0 && U.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: X(M, x)
      }), O > 0 && U.push({
        source: "Started",
        target: "Errors",
        value: O,
        label: X(O, x)
      }), F > 0 && U.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: F,
        label: X(F, x)
      }), A > 0 && U.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: A,
        label: X(A, w)
      }), P > 0 && U.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: P,
        label: X(P, w)
      }), { nodes: te, links: U };
    }), b = (f, _) => rn(f, _);
    return (f, _) => (p(), ee(ke, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading && !a.error ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", sp, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (p(), k("div", op, [
              u("div", ip, [
                _[1] || (_[1] = u("div", { class: "error-icon-wrapper" }, [
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
                _[2] || (_[2] = u("p", { class: "error-title" }, "Error loading data", -1)),
                u("p", lp, D(a.error), 1)
              ])
            ])) : (p(), k("div", rp, [
              u("section", cp, [
                u("div", dp, [
                  R(Yt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", up, [
                R(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (p(), k("section", hp, [
                _[3] || (_[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", fp, [
                  R(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: x }) => [
                      u("span", gp, D(T(He)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": L(({ row: x }) => [
                      u("span", null, D(T(oe)(Number(x.booking_initiated_count))), 1)
                    ]),
                    "cell-started": L(({ row: x }) => [
                      u("span", null, [
                        Ae(D(T(oe)(Number(x.booking_started_count))) + " ", 1),
                        u("span", mp, " (" + D(b(
                          Number(x.booking_started_count),
                          Number(x.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": L(({ row: x }) => [
                      u("span", null, D(T(oe)(Number(x.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": L(({ row: x }) => [
                      u("div", pp, [
                        R(Ue, { color: "success" }, {
                          default: L(() => [
                            Ae(" Success: " + D(T(oe)(
                              m(x)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(Ue, { color: "danger" }, {
                          default: L(() => [
                            Ae(" Failed: " + D(T(oe)(Number(x.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": L(({ row: x }) => [
                      h(x).length > 0 ? (p(), k("div", bp, [
                        (p(!0), k(ie, null, fe(h(
                          x
                        ), (w) => (p(), k("span", {
                          key: `${x.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(v(w.total_value)), 1))), 128))
                      ])) : (p(), k("span", vp, "N/A"))
                    ]),
                    "cell-outcomes": L(({ row: x }) => [
                      u("div", yp, [
                        R(Ue, { color: "danger" }, {
                          default: L(() => [
                            Ae(" Not Found: " + D(x.not_found_count ? T(oe)(Number(x.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(Ue, { color: "warning" }, {
                          default: L(() => [
                            Ae(" Cancelled: " + D(x.cancelled_count ? T(oe)(Number(x.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(Ue, { color: "orange" }, {
                          default: L(() => [
                            Ae(" No Balance: " + D(x.no_pending_balance_count ? T(oe)(Number(x.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        R(Ue, { color: "danger" }, {
                          default: L(() => [
                            Ae(" Errors: " + D(x.error_count ? T(oe)(Number(x.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", xp, [..._[4] || (_[4] = [
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
}), kp = /* @__PURE__ */ me(_p, [["__scopeId", "data-v-2a80b433"]]), wp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Cp = {
  key: "content",
  class: "card-body"
}, $p = {
  key: 0,
  class: "chart-section"
}, Mp = { class: "chart-wrapper" }, Sp = {
  key: 1,
  class: "checkin-daily-section"
}, Dp = { class: "w-full min-w-0" }, Tp = { class: "font-medium" }, Ap = { class: "cell-success" }, Bp = { class: "cell-danger" }, Lp = {
  key: 0,
  class: "reasons-list"
}, Pp = { class: "reason-name" }, Ip = { class: "reason-count" }, Rp = {
  key: 1,
  class: "no-reasons"
}, Fp = {
  key: 2,
  class: "empty-state"
}, Ep = {
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
    }), m = (f, _) => !_ || _ === 0 ? "0.0%" : rn(f, _), v = (f, _) => {
      const x = oe(f), w = m(f, _);
      return `${x} (${w})`;
    }, g = (f) => f.reduce((_, x) => _ + x.failed_count, 0), y = $(() => {
      const f = [], _ = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: f, links: _ };
      f.push({ name: "Checkin Init" }), f.push({ name: "Booking retrive" }), f.push({ name: "Booking retrive success" }), f.push({ name: "Number of Passengers" }), f.push({ name: "Completed" }), f.push({ name: "Closed with BP" });
      const x = d.value.total_checkin_initiated, w = d.value.total_checkin_init, C = d.value.total_checkin_init_abandoned, S = w - C, M = d.value.total_checkin_started, O = d.value.total_checkin_completed, A = d.value.total_checkin_closed, P = h.value.unrecovered_by_step || [], B = P.reduce(
        (U, le) => U + le.count,
        0
      );
      w > 0 && _.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: w,
        label: be(w, x)
      });
      const F = x - w;
      F > 0 && (f.push({ name: "Abandoned (Init)", status: "abandon" }), _.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: F,
        label: be(F, x)
      })), C > 0 && (f.push({ name: "Abandoned (Started)", status: "abandon" }), _.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: C,
        label: be(C, x)
      })), S > 0 && _.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: S,
        label: be(S, x)
      }), M > 0 && _.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: M,
        label: be(M, x)
      }), O > 0 && _.push({
        source: "Number of Passengers",
        target: "Completed",
        value: O,
        label: be(O, M)
      }), P.length > 0 && B > 0 && (f.push({ name: "Unrecovered", status: "error" }), _.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: B,
        label: be(B, M)
      }), P.forEach((U) => {
        const ce = U.step_name.replace(/_/g, " ").split(" ").map((G) => G.charAt(0).toUpperCase() + G.slice(1)).join(" ");
        f.push({ name: ce, status: "error" }), _.push({
          source: "Unrecovered",
          target: ce,
          value: U.count,
          label: be(U.count, M)
        });
      }));
      const X = M - (O + B);
      X > 0 && (f.push({ name: "Abandoned (Flow)", status: "abandon" }), _.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: X,
        label: be(X, M)
      }));
      const te = O - A;
      return te > 0 && (f.push({ name: "BP Error", status: "error" }), _.push({
        source: "Completed",
        target: "BP Error",
        value: te,
        label: be(te, M)
      })), A > 0 && _.push({
        source: "Completed",
        target: "Closed with BP",
        value: A,
        label: be(A, M)
      }), { nodes: f, links: _ };
    }), b = () => {
      const f = d.value.checkin_by_day || [], _ = h.value.failed_by_step_by_day || [];
      if (f.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...f].map((x) => {
        const w = _.find(
          (C) => C.date === x.date
        );
        return {
          ...x,
          failed_steps: w?.steps || []
        };
      }), l.value.sort((x, w) => new Date(x.date) - new Date(w.date));
    };
    return Fe(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        b();
      },
      { deep: !0, immediate: !0 }
    ), (f, _) => (p(), ee(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", wp, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Cp, [
              y.value.nodes.length > 0 ? (p(), k("section", $p, [
                u("div", Mp, [
                  R(Yt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (p(), k("section", Sp, [
                u("div", Dp, [
                  R(lt, {
                    columns: r,
                    rows: c.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: x }) => [
                      u("span", Tp, D(T(He)(String(x.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": L(({ row: x }) => [
                      u("span", null, D(T(oe)(x.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": L(({ row: x }) => [
                      u("span", null, D(v(
                        x.checkin_init_count,
                        x.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": L(({ row: x }) => [
                      u("span", null, D(T(oe)(x.checkin_started_count)), 1)
                    ]),
                    "cell-completed": L(({ row: x }) => [
                      u("span", null, D(v(
                        x.checkin_completed_count,
                        x.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": L(({ row: x }) => [
                      u("span", Ap, D(v(
                        x.checkin_closed_count,
                        x.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": L(({ row: x }) => [
                      u("span", Bp, D(v(
                        g(x.failed_steps),
                        x.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": L(({ row: x }) => [
                      x.failed_steps && x.failed_steps.length > 0 ? (p(), k("div", Lp, [
                        (p(!0), k(ie, null, fe(x.failed_steps, (w) => (p(), k("div", {
                          key: w.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Pp, D(w.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", Ip, D(w.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", Rp, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", Fp, [..._[1] || (_[1] = [
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
}, tl = /* @__PURE__ */ me(Ep, [["__scopeId", "data-v-f12f3f34"]]), Op = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Vp = {
  key: "content",
  class: "card-body"
}, zp = {
  key: 0,
  class: "sankey-section"
}, Np = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Wp = { class: "w-full min-w-0" }, Hp = { class: "font-medium whitespace-nowrap" }, jp = { class: "cell-success" }, Yp = { class: "cell-danger" }, Kp = {
  key: 0,
  class: "reasons-list"
}, Up = { class: "reason-name" }, qp = { class: "reason-count" }, Xp = {
  key: 1,
  class: "no-reasons"
}, Gp = {
  key: 2,
  class: "empty-state"
}, Zp = { class: "empty-state-content" }, Qp = { class: "empty-icon-wrapper" }, Jp = /* @__PURE__ */ re({
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
    }, { isDark: i } = Ce(we(a, "theme")), l = (b) => b == null ? "0" : b.toLocaleString(), r = (b) => {
      const [f, _, x] = b.split("-").map(Number);
      return He([f, _ - 1, x]).format("MMM DD");
    }, c = (b) => b.replace(/_/g, " ").replace(/\b\w/g, (f) => f.toUpperCase()), d = (b, f) => rn(b, f), h = (b, f) => {
      const _ = b || 0, x = f || 0, w = l(_), C = d(_, x);
      return `${w} (${C})`;
    }, m = $(() => {
      const b = a.checkinData?.record_locator_by_day || [], f = a.failedData?.failed_by_step_by_day || [], _ = a.failedData?.unrecovered_by_day || [];
      return b.map((w) => {
        const C = f.find((M) => M.date === w.date), S = _.find(
          (M) => M.date === w.date
        );
        return {
          ...w,
          failed_steps: C?.steps || [],
          unrecovered_count: S?.unrecovered_count || 0
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
      () => m.value.map((b) => ({
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
      const b = [], f = [], _ = /* @__PURE__ */ new Set(), x = (q) => {
        _.has(q) || (b.push({ name: q }), _.add(q));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: b, links: f };
      x("Checkin Init"), x("Booking Retrieval"), x("Booking Retrieved"), x("Completed"), x("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, C = a.checkinData.total_record_locator_init || 0, S = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, O = a.checkinData.total_checkin_pre_init_abandoned_voluntary, A = M != null || O != null, P = A ? Math.max(Number(M) || 0, 0) : 0, B = A ? Math.max(Number(O) || 0, 0) : 0, F = a.checkinData.total_record_locator_init_abandoned_error, X = a.checkinData.total_record_locator_init_abandoned_voluntary, te = F != null || X != null, U = te ? Math.max(Number(F) || 0, 0) : 0, le = te ? Math.max(Number(X) || 0, 0) : 0, ce = te ? Math.max(S - U - le, 0) : S, G = C - S, de = a.checkinData.total_record_locator_started || 0, N = a.checkinData.total_record_locator_completed || 0, J = a.checkinData.total_record_locator_closed || 0, se = a.checkinData.total_record_locator_unrecovered || 0;
      C > 0 && f.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: C,
        label: be(C, w)
      });
      const ge = w - C;
      A ? (B > 0 && (x("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: B,
        label: be(B, w)
      })), P > 0 && (x("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: P,
        label: be(P, w)
      }))) : ge > 0 && (x("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ge,
        label: be(ge, w)
      })), te ? (U > 0 && (x("Error"), f.push({
        source: "Booking Retrieval",
        target: "Error",
        value: U,
        label: be(U, w)
      })), le > 0 && (x("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: le,
        label: be(le, w)
      })), ce > 0 && (x("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ce,
        label: be(ce, w)
      }))) : S > 0 && (x("Abandoned (Started)"), f.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: S,
        label: be(S, w)
      })), G > 0 && f.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: G,
        label: be(G, w)
      }), N > 0 && f.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: N,
        label: be(N, de)
      }), se > 0 && (x("Errors"), f.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: se,
        label: be(se, de)
      }));
      const xe = de - (N + se);
      xe > 0 && (x("Abandoned (Flow)"), f.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: xe,
        label: be(xe, de)
      }));
      const Y = N - J;
      return Y > 0 && (x("BP Error"), f.push({
        source: "Completed",
        target: "BP Error",
        value: Y,
        label: be(Y, de)
      })), J > 0 && f.push({
        source: "Completed",
        target: "Closed with BP",
        value: J,
        label: be(J, de)
      }), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", Op, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Vp, [
              y.value.nodes.length > 0 ? (p(), k("div", zp, [
                R(Yt, {
                  data: y.value,
                  height: "500px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])
              ])) : z("", !0),
              m.value && m.value.length > 0 ? (p(), k("div", Np, [
                u("div", Wp, [
                  R(lt, {
                    columns: v,
                    rows: g.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: _ }) => [
                      u("span", Hp, D(r(String(_.date))), 1)
                    ]),
                    "cell-checkinInit": L(({ row: _ }) => [
                      u("span", null, D(l(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": L(({ row: _ }) => [
                      u("span", null, D(h(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": L(({ row: _ }) => [
                      u("span", null, D(h(
                        _.record_locator_started_count,
                        _.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": L(({ row: _ }) => [
                      u("span", null, D(h(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": L(({ row: _ }) => [
                      u("span", jp, D(h(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": L(({ row: _ }) => [
                      u("span", Yp, D(h(
                        _.unrecovered_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": L(({ row: _ }) => [
                      Array.isArray(_.failed_steps) && _.failed_steps.length > 0 ? (p(), k("div", Kp, [
                        (p(!0), k(ie, null, fe(_.failed_steps, (x) => (p(), k("div", {
                          key: x.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Up, D(c(x.step_name)) + ":", 1),
                          u("span", qp, D(x.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", Xp, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("div", Gp, [
                u("div", Zp, [
                  u("div", Qp, [
                    R(T(et), { class: "empty-icon" })
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
}), e0 = /* @__PURE__ */ me(Jp, [["__scopeId", "data-v-b86b263c"]]), t0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, n0 = {
  key: "content",
  class: "card-body"
}, a0 = {
  key: 0,
  class: "chart-section"
}, s0 = { class: "chart-wrapper" }, o0 = {
  key: 1,
  class: "record-locator-daily-section"
}, i0 = { class: "w-full min-w-0" }, l0 = { class: "cell-plain font-medium" }, r0 = { class: "cell-plain text-center" }, c0 = { class: "cell-plain text-center" }, d0 = { class: "cell-plain text-center" }, u0 = { class: "cell-plain text-center" }, h0 = { class: "cell-plain text-center success-value" }, f0 = { class: "cell-plain text-center failed-value" }, g0 = { class: "cell-plain text-center warning-value" }, m0 = { class: "cell-plain text-center" }, p0 = { class: "cell-plain text-center failed-value" }, b0 = {
  key: 2,
  class: "empty-state"
}, v0 = /* @__PURE__ */ re({
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
    }, { isDark: i } = Ce(we(a, "theme")), l = $(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
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
    ), m = $(() => a.data), v = (b, f) => rn(b, f), g = (b, f) => {
      const _ = oe(b), x = v(b, f);
      return `${_} (${x})`;
    }, y = $(() => {
      const b = [], f = [], _ = /* @__PURE__ */ new Set(), x = (ge) => {
        _.has(ge) || (b.push({ name: ge }), _.add(ge));
      };
      if (!m.value.total_checkin_initiated)
        return { nodes: b, links: f };
      x("Checkin Init"), x("Booking retrive"), x("Checkin Started"), x("Checkin Completed"), x("Checkin Closed");
      const w = m.value.total_checkin_initiated, C = m.value.total_record_locator_init, S = m.value.total_record_locator_started, M = m.value.total_record_locator_completed, O = m.value.total_record_locator_closed, A = m.value.total_record_locator_failed, P = m.value.total_record_locator_abandoned, B = m.value.total_record_locator_init_abandoned, F = m.value.total_checkin_pre_init_abandoned_error, X = m.value.total_checkin_pre_init_abandoned_voluntary, te = F != null || X != null, U = te ? Math.max(Number(F) || 0, 0) : 0, le = te ? Math.max(Number(X) || 0, 0) : 0, ce = m.value.total_record_locator_init_abandoned_error, G = m.value.total_record_locator_init_abandoned_voluntary, de = ce != null || G != null, N = de ? Math.max(Number(ce) || 0, 0) : 0, J = de ? Math.max(Number(G) || 0, 0) : 0;
      C > 0 && f.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: C,
        label: be(C, w)
      });
      const se = w - C;
      return te ? (le > 0 && (x("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: le,
        label: be(le, w)
      })), U > 0 && (x("Booking not retreived"), f.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: U,
        label: be(U, w)
      }))) : se > 0 && (x("Abandoned (Init)"), f.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: se,
        label: be(se, w)
      })), S > 0 && f.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: be(S, w)
      }), de ? (N > 0 && (x("Error"), f.push({
        source: "Booking retrive",
        target: "Error",
        value: N,
        label: be(N, w)
      })), J > 0 && (x("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: J,
        label: be(J, w)
      }))) : B > 0 && (x("Abandoned (Started)"), f.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: B,
        label: be(B, w)
      })), M > 0 && f.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: be(M, S)
      }), O > 0 && f.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: O,
        label: be(O, S)
      }), A > 0 && (x("Checkin Failed"), f.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: A,
        label: be(A, S)
      })), P > 0 && (x("Abandoned (Flow)"), f.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: P,
        label: be(P, S)
      })), { nodes: b, links: f };
    });
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            a.loading ? (p(), k("div", t0, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", n0, [
              y.value.nodes.length > 0 ? (p(), k("section", a0, [
                u("div", s0, [
                  R(Yt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : z("", !0),
              l.value && l.value.length > 0 ? (p(), k("section", o0, [
                u("div", i0, [
                  R(lt, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: _ }) => [
                      u("span", l0, D(T(He)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": L(({ row: _ }) => [
                      u("span", r0, D(T(oe)(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": L(({ row: _ }) => [
                      u("span", c0, D(g(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": L(({ row: _ }) => [
                      u("span", d0, D(T(oe)(_.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": L(({ row: _ }) => [
                      u("span", u0, D(g(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": L(({ row: _ }) => [
                      u("span", h0, D(g(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": L(({ row: _ }) => [
                      u("span", f0, D(g(
                        _.record_locator_failed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": L(({ row: _ }) => [
                      u("span", g0, D(g(
                        _.record_locator_abandoned_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": L(({ row: _ }) => [
                      u("span", m0, D(T(oe)(
                        _.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": L(({ row: _ }) => [
                      u("span", p0, D(T(oe)(
                        _.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (p(), k("section", b0, [...f[1] || (f[1] = [
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
}), nl = /* @__PURE__ */ me(v0, [["__scopeId", "data-v-00877097"]]), y0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, x0 = {
  key: "content",
  class: "card-body"
}, _0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, k0 = { class: "w-full min-w-0" }, w0 = { class: "segment-plain" }, C0 = { class: "segment-plain" }, $0 = { class: "segment-plain" }, M0 = { class: "percentage-value" }, S0 = { class: "percentage-value" }, D0 = { class: "percentage-value success" }, T0 = {
  key: 1,
  class: "empty-state"
}, A0 = /* @__PURE__ */ re({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = Ce(we(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = $(
      () => a.data.map((m, v) => ({
        id: `segment-${v}-${m.departure_airport}-${m.arrival_airport}-${m.segment_init_count}-${m.segment_started_count}`,
        departure_airport: m.departure_airport,
        conexion_airport: m.conexion_airport,
        arrival_airport: m.arrival_airport,
        segment_init_count: m.segment_init_count,
        segment_started_count: m.segment_started_count,
        segment_completed_count: m.segment_completed_count,
        segment_closed_count: m.segment_closed_count
      }))
    ), c = (m, v) => !v || v === 0 || !m ? "0%" : `${Math.round(m / v * 100)}%`, d = (m) => !m || m === "None" ? "-" : String(m).trim().replace(/_[0-9]+$/i, ""), h = (m) => {
      const v = d(m?.departure_airport), g = d(m?.arrival_airport);
      return v === "-" || g === "-" ? !1 : v === g;
    };
    return t({ isDark: i }), (m, v) => (p(), ee(ke, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", y0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", x0, [
              a.data.length > 0 ? (p(), k("section", _0, [
                u("div", k0, [
                  R(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": L(({ row: g }) => [
                      u("span", w0, D(d(g.departure_airport)), 1)
                    ]),
                    "cell-connection": L(({ row: g }) => [
                      u("span", {
                        class: Q(["segment-plain", {
                          "segment-plain--muted": d(g.conexion_airport) === "-"
                        }])
                      }, D(d(g.conexion_airport)), 3)
                    ]),
                    "cell-arrival": L(({ row: g }) => [
                      u("span", C0, D(d(g.arrival_airport)), 1)
                    ]),
                    "cell-trip": L(({ row: g }) => [
                      u("span", $0, D(h(g) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": L(({ row: g }) => [
                      Ae(D(T(oe)(g.segment_init_count)), 1)
                    ]),
                    "cell-started": L(({ row: g }) => [
                      u("span", M0, D(c(
                        g.segment_started_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": L(({ row: g }) => [
                      u("span", S0, D(c(
                        g.segment_completed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": L(({ row: g }) => [
                      u("span", D0, D(c(
                        g.segment_closed_count,
                        g.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (p(), k("section", T0, [...v[1] || (v[1] = [
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
}), al = /* @__PURE__ */ me(A0, [["__scopeId", "data-v-522b5823"]]), B0 = { class: "checkin-container__body" }, L0 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = $(() => n.loading || n.checkinLoading);
    $(() => n.loading || n.checkinMetricsLoading);
    const o = $(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = $(() => n.loading || n.segmentsLoading), l = $(() => n.recordLocatorData ?? n.checkinMetricsData);
    function r(h, m) {
      a("export", { source: h, format: m });
    }
    function c(h) {
      return typeof h == "object" && h !== null && "source" in h;
    }
    function d(h) {
      if (c(h)) {
        a("export", h);
        return;
      }
      r("checkinSegments", h);
    }
    return (h, m) => (p(), ee(ke, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: L(() => [
        u("div", B0, [
          e.showCheckin ? (p(), ee(tl, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[0] || (m[0] = (v) => r("checkin", v))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : z("", !0),
          R(nl, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: m[1] || (m[1] = (v) => r("recordLocator", v))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          R(al, {
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: i.value,
            data: e.segmentsData ?? [],
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: d
          }, null, 8, ["initially-open", "loading", "data", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), P0 = /* @__PURE__ */ me(L0, [["__scopeId", "data-v-d7fe32b0"]]), I0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, R0 = {
  key: "content",
  class: "card-body"
}, F0 = { class: "chart-section" }, E0 = { class: "chart-wrapper" }, O0 = {
  key: 1,
  class: "empty-chart"
}, V0 = { class: "payment-success-summary" }, z0 = {
  key: 0,
  class: "disruption-daily-section"
}, N0 = { class: "w-full min-w-0" }, W0 = { class: "font-medium text-center" }, H0 = { class: "text-center" }, j0 = { class: "text-center" }, Y0 = { class: "percentage-text" }, K0 = { class: "text-center" }, U0 = { class: "abandoned-value" }, q0 = { class: "badges-container badges-wrap" }, X0 = { class: "badges-container badges-wrap" }, G0 = {
  key: 1,
  class: "empty-state"
}, Z0 = /* @__PURE__ */ re({
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
      return b.length === 0 ? m(0) : b.map((f) => `${f.currency} ${m(f.total_value)}`).join(" · ");
    }), h = (b, f) => rn(b, f), m = (b) => Be(b), v = (b) => (b ?? []).reduce((f, _) => f + (_.count ?? 0), 0), g = (b) => typeof b.sell_success_count == "number" ? b.sell_success_count : v(b.payment_success_total), y = $(() => {
      const b = a.data, f = b.total_disruption_conversations || 0, _ = b.total_disruption_initiated || 0, x = b.total_voluntary || 0, w = b.total_involuntary || 0, C = b.total_accepted || 0, S = b.total_confirmed || 0, M = typeof b.total_sell_success == "number" ? b.total_sell_success : v(b.total_payment_success), O = b.total_sell_failed || 0, A = Math.max(0, f - _), P = Math.max(
        0,
        _ - x - w
      ), B = Math.max(0, w - C), F = Math.max(0, x - S), X = O, te = Math.max(0, S - M - X), U = (G, de) => be(G, de), le = [
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
      ], ce = [];
      return _ > 0 && ce.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: U(_, f)
      }), A > 0 && ce.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: A,
        label: U(A, f)
      }), x > 0 && ce.push({
        source: "Started",
        target: "Voluntary",
        value: x,
        label: U(x, f)
      }), w > 0 && ce.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: U(w, f)
      }), P > 0 && ce.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: U(P, f)
      }), C > 0 && ce.push({
        source: "Involuntary",
        target: "Accepted",
        value: C,
        label: U(C, f)
      }), B > 0 && ce.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: B,
        label: U(B, f)
      }), S > 0 && ce.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: U(S, f)
      }), F > 0 && ce.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: F,
        label: U(F, f)
      }), M > 0 && ce.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: U(M, f)
      }), X > 0 && ce.push({
        source: "Confirmed",
        target: "Rejected",
        value: X,
        label: U(X, f)
      }), te > 0 && ce.push({
        source: "Confirmed",
        target: "Not Paid",
        value: te,
        label: U(te, f)
      }), { nodes: le, links: ce };
    });
    return (b, f) => (p(), ee(ke, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", I0, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", R0, [
              u("section", F0, [
                u("div", E0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (p(), ee(Yt, {
                    key: 0,
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])) : (p(), k("div", O0, [...f[1] || (f[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", V0, [
                R(ve, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (p(), k("section", z0, [
                f[2] || (f[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", N0, [
                  R(lt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: _ }) => [
                      u("span", W0, D(T(He)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": L(({ row: _ }) => [
                      u("span", H0, D(T(oe)(Number(_.disruption_conversations))), 1)
                    ]),
                    "cell-started": L(({ row: _ }) => [
                      u("span", j0, [
                        Ae(D(T(oe)(Number(_.disruption_initiated_count))) + " ", 1),
                        u("span", Y0, " (" + D(h(
                          Number(_.disruption_initiated_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": L(({ row: _ }) => [
                      u("span", K0, [
                        u("span", U0, D(T(oe)(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count)
                        )) + " (" + D(h(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": L(({ row: _ }) => [
                      u("div", q0, [
                        (p(!0), k(ie, null, fe([_], (x, w) => (p(), k(ie, { key: w }, [
                          R(Ue, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: L(() => [
                              Ae(" VOL " + D(T(oe)(x.voluntary_count)) + " (" + D(h(
                                x.voluntary_count,
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, { color: "success" }, {
                            default: L(() => [
                              Ae(" Confirm " + D(T(oe)(x.confirmed_count)) + " (" + D(h(
                                x.confirmed_count,
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, { color: "warning" }, {
                            default: L(() => [
                              Ae(" Not Confirm " + D(T(oe)(x.voluntary_count - x.confirmed_count)) + " (" + D(h(
                                x.voluntary_count - x.confirmed_count,
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, { color: "danger" }, {
                            default: L(() => [
                              Ae(" Reject " + D(T(oe)(x.sell_failed_count)) + " (" + D(h(
                                x.sell_failed_count,
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, { color: "orange" }, {
                            default: L(() => [
                              Ae(" Not Paid " + D(T(oe)(
                                Math.max(
                                  0,
                                  x.confirmed_count - g(x) - x.sell_failed_count
                                )
                              )) + " (" + D(h(
                                Math.max(
                                  0,
                                  x.confirmed_count - g(x) - x.sell_failed_count
                                ),
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: L(() => [
                              Ae(" Finish " + D(T(oe)(g(x))) + " (" + D(h(
                                g(x),
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (p(!0), k(ie, null, fe(x.payment_success_total || [], (C) => (p(), ee(Ue, {
                            key: `${x.date}-${C.currency}`,
                            color: "neutral"
                          }, {
                            default: L(() => [
                              Ae(D(C.currency) + " " + D(m(C.total_value)), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ], 64))), 128))
                      ])
                    ]),
                    "cell-involuntary": L(({ row: _ }) => [
                      u("div", X0, [
                        (p(!0), k(ie, null, fe([_], (x, w) => (p(), k(ie, { key: w }, [
                          R(Ue, { color: "purple" }, {
                            default: L(() => [
                              Ae(" INV " + D(T(oe)(x.involuntary_count)) + " (" + D(h(
                                x.involuntary_count,
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, { color: "danger" }, {
                            default: L(() => [
                              Ae(" Human " + D(T(oe)(x.involuntary_count - x.accepted_count)) + " (" + D(h(
                                x.involuntary_count - x.accepted_count,
                                x.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          R(Ue, { color: "success" }, {
                            default: L(() => [
                              Ae(" Accept " + D(T(oe)(x.accepted_count)) + " (" + D(h(
                                x.accepted_count,
                                x.disruption_conversations
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
              ])) : (p(), k("section", G0, [...f[3] || (f[3] = [
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
}), Q0 = /* @__PURE__ */ me(Z0, [["__scopeId", "data-v-a60fbfa7"]]), J0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, eb = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, tb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, nb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ab = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, sb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ob = /* @__PURE__ */ re({
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
    }, i = we(a, "theme"), { isDark: l } = Ce(i), r = {
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
      const v = d.value, g = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (_) => g > 0 ? (_ / g * 100).toFixed(1) : "0.0", b = v.total_faq_events, f = b > 0 ? `${(v.total_documents_found / b * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${oe(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${oe(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${oe(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: oe(v.total_documents_found),
          subvalue: f
        }
      ];
    }), m = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = v.faq_by_day || [];
      if (g.length > 0) {
        const y = g.map(
          (x) => He(x.date).format("MMM DD")
        ), b = g.map(
          (x) => x.airline_information_retrieved_count || 0
        ), f = g.map(
          (x) => x.flight_status_retrieved_count || 0
        ), _ = g.map(
          (x) => x.booking_info_retrieved_count || 0
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
              data: _,
              borderColor: r.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Fe(
      () => a.data,
      (v) => {
        m(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, g) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(Me, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: L(() => [
              a.loading ? (p(), k("div", J0, [...g[0] || (g[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", eb, [
                c.value.labels && c.value.labels.length ? (p(), k("section", tb, [
                  u("div", nb, [
                    R(pt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", ab, [
                    (p(!0), k(ie, null, fe(h.value, (y) => (p(), ee(ve, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (p(), k("section", sb, [...g[1] || (g[1] = [
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
}), ib = /* @__PURE__ */ me(ob, [["__scopeId", "data-v-5d7a0066"]]), lb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, rb = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, cb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, db = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ub = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, hb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, fb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, gb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, mb = { class: "max-w-[360px] px-4 text-center" }, pb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, bb = /* @__PURE__ */ re({
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
    }, s = e, o = n, i = (m) => {
      o("export", m);
    }, l = we(s, "theme"), { isDark: r } = Ce(l), c = $(() => {
      const m = s.data?.agents_by_day || {}, v = Object.keys(m).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const g = /* @__PURE__ */ new Set();
      for (const f of Object.values(m))
        for (const _ of Object.keys(f))
          g.add(_);
      const b = Array.from(g).map((f) => {
        const _ = f.toLowerCase(), x = a[_] || a[f] || "#94a3b8";
        return {
          label: f.charAt(0).toUpperCase() + f.slice(1).replace(/_/g, " "),
          data: v.map((w) => m[w]?.[f] || 0),
          borderColor: x
        };
      });
      return {
        labels: v.map((f) => He(f).format("MMM DD")),
        datasets: b
      };
    }), d = $(() => {
      const m = s.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(m))
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
    return t({ isDark: r }), (m, v) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", s.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(Me, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: L(() => [
              s.loading ? (p(), k("div", lb, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", rb, [
                c.value.labels && c.value.labels.length ? (p(), k("section", cb, [
                  u("div", db, [
                    R(pt, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (p(), k("div", ub, [
                    (p(!0), k(ie, null, fe(h.value, (g) => (p(), ee(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(oe)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])) : z("", !0)
                ])) : d.value.length ? (p(), k("section", hb, [
                  u("div", fb, [
                    (p(!0), k(ie, null, fe(h.value, (g) => (p(), ee(ve, {
                      key: g.name,
                      class: "min-w-0",
                      color: g.color,
                      title: g.label,
                      value: `${g.percentage}%`,
                      subvalue: `${T(oe)(g.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : z("", !0),
                d.value.length ? z("", !0) : (p(), k("section", gb, [
                  u("div", mb, [
                    u("div", pb, [
                      R(T(et), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), vb = /* @__PURE__ */ me(bb, [["__scopeId", "data-v-299d9c3f"]]), yb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, xb = {
  key: "content",
  class: "card-body"
}, _b = {
  key: 0,
  class: "chart-section"
}, kb = {
  key: 1,
  class: "empty-state"
}, wb = {
  key: 2,
  class: "comparison-section"
}, Cb = { class: "comparison-grid" }, $b = /* @__PURE__ */ re({
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
    }, { isDark: r } = Ce(we(o, "theme"));
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
    function m(g) {
      if (g.delta === null) return "No previous data";
      const y = oe(g.previous), b = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${y})` : `${g.delta > 0 ? "↑" : "↓"} ${b} vs prev. period (${y})`;
    }
    const v = $(() => {
      const g = o.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const y = g.map((f) => He(f.date).format("MMM-DD")), b = c.value.map((f, _) => ({
        label: f,
        data: g.map((x) => x.channels[f] ?? 0),
        backgroundColor: d(f, _),
        borderRadius: 4
      }));
      return { labels: y, datasets: b };
    });
    return t({ isDark: r }), (g, y) => (p(), ee(ke, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !o.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            o.loading ? (p(), k("div", yb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", xb, [
              v.value.labels.length > 0 ? (p(), k("section", _b, [
                R(kt, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (p(), k("section", kb, [...y[1] || (y[1] = [
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
              e.channelComparison.length > 0 ? (p(), k("section", wb, [
                u("div", Cb, [
                  (p(!0), k(ie, null, fe(e.channelComparison, (b, f) => (p(), ee(T(ve), {
                    key: b.channel,
                    color: d(b.channel, f),
                    title: h(b.channel),
                    value: T(oe)(b.current),
                    subvalue: m(b)
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
}), sl = /* @__PURE__ */ me($b, [["__scopeId", "data-v-b99f46a5"]]), Mb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Sb = {
  key: "content",
  class: "card-body"
}, Db = {
  key: 0,
  class: "chart-section"
}, Tb = { class: "chart-wrapper" }, Ab = {
  key: 1,
  class: "empty-state"
}, Bb = { class: "seller-value-cards" }, Lb = {
  key: 2,
  class: "seller-daily-section"
}, Pb = { class: "w-full min-w-0" }, Ib = { class: "sl-cell font-medium" }, Rb = { class: "sl-cell text-center" }, Fb = { class: "sl-cell text-center" }, Eb = { class: "sl-cell text-center" }, Ob = { class: "sl-cell text-center" }, Vb = { class: "sl-cell text-center" }, zb = { class: "sl-cell text-center success-value" }, Nb = {
  key: 0,
  class: "currency-cell-list"
}, Wb = {
  key: 1,
  class: "empty-cell"
}, Hb = { class: "sl-cell text-center success-value" }, jb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center success-value" }, Kb = {
  key: 0,
  class: "currency-cell-list"
}, Ub = {
  key: 1,
  class: "empty-cell"
}, qb = { class: "sl-cell text-center success-value" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center success-value" }, Zb = {
  key: 0,
  class: "currency-cell-list"
}, Qb = { key: 1 }, Jb = {
  key: 0,
  class: "failed-reasons"
}, ev = { class: "reason-name" }, tv = { class: "reason-count" }, nv = {
  key: 1,
  class: "empty-cell"
}, av = /* @__PURE__ */ re({
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
    }, { isDark: l } = Ce(we(s, "theme")), r = $(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const A = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((P) => {
        const B = A.findIndex(
          (F) => F.date === P.date
        );
        B !== -1 ? A[B] = { ...A[B], reasons: P.reasons } : A.push({
          date: P.date,
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
          reasons: P.reasons
        });
      }), A.sort(
        (P, B) => new Date(P.date).getTime() - new Date(B.date).getTime()
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
    ), h = $(() => s.sellerData), m = $(() => s.failedData), v = $(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), g = $(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), y = $(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), b = $(() => {
      const A = v.value;
      return A.length > 0 ? A.map(
        (P) => `${P.currency} ${It(P.total_value)}`
      ).join(" · ") : O(s.sellerData.total_value_sell_success);
    });
    function f(A) {
      return A.length > 0 ? A.map(
        (P) => `${P.currency} ${It(P.total_value)}`
      ).join(" · ") : "—";
    }
    const _ = $(
      () => f(g.value)
    ), x = $(
      () => f(y.value)
    ), w = $(() => {
      const {
        total_seller_conversations: A = 0,
        total_sell_started: P = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: F = 0,
        total_sell_bank_transfer: X = 0,
        total_sell_cash_option: te = 0,
        total_sell_success_bank_transfer: U = 0,
        total_sell_success_cash: le = 0
      } = h.value, { failed_by_reason_by_day: ce = [] } = m.value;
      if (A === 0) return { nodes: [], links: [] };
      const G = Math.max(
        0,
        F - (U ?? 0) - (le ?? 0)
      ), de = [
        { name: "Sell Initiated", value: A },
        { name: "Sell Started", value: P },
        { name: "Booking Created", value: B },
        { name: "Sell Success", value: G }
      ], N = [], J = A - P;
      J > 0 && (de.push({ name: "Abandoned (Init)", value: J }), N.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: J,
        label: be(J, A)
      })), P > 0 && N.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: P,
        label: be(P, A)
      });
      const se = ce.reduce(
        (Y, q) => (q.reasons && Array.isArray(q.reasons) && q.reasons.forEach((W) => {
          const K = W.reason, I = W.failed_count;
          Y[K] = (Y[K] || 0) + I;
        }), Y),
        {}
      );
      B > 0 && N.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: be(B, A)
      }), X > 0 && (de.push({ name: "Bank Transfer", value: X }), N.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: X,
        label: be(X, A)
      })), te > 0 && (de.push({ name: "Cash Option", value: te }), N.push({
        source: "Booking Created",
        target: "Cash Option",
        value: te,
        label: be(te, A)
      })), G > 0 && N.push({
        source: "Booking Created",
        target: "Sell Success",
        value: G,
        label: be(G, A)
      }), (U ?? 0) > 0 && (de.push({
        name: "Bank Transfer Success",
        value: U ?? 0
      }), N.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: U ?? 0,
        label: be(U ?? 0, A)
      })), (le ?? 0) > 0 && (de.push({ name: "Cash Option Success", value: le ?? 0 }), N.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: le ?? 0,
        label: be(le ?? 0, A)
      }));
      const ge = B - G - X - te;
      ge > 0 && (de.push({ name: "Failed at Completion", value: ge }), N.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: ge,
        label: be(ge, A)
      }));
      const xe = P - B;
      if (xe > 0 && (de.push({ name: "Failed at Booking", value: xe }), N.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: xe,
        label: be(xe, A)
      })), Object.keys(se).length > 0) {
        const Y = Object.values(se).reduce(
          (W, K) => W + K,
          0
        ), q = xe - Y;
        Object.entries(se).filter(([, W]) => W > 0).sort(([, W], [, K]) => K - W).forEach(([W, K]) => {
          de.push({ name: `Failed: ${W}`, value: K }), N.push({
            source: "Failed at Booking",
            target: `Failed: ${W}`,
            value: K,
            label: be(K, A)
          });
        }), q > 0 && (de.push({ name: "Failed: Without Reason", value: q }), N.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: q,
          label: be(q, A)
        }));
      }
      return { nodes: de, links: N };
    }), C = (A, P) => rn(A, P), S = (A, P) => {
      const B = oe(A), F = C(A, P);
      return `${B} (${F})`;
    }, M = (A) => A == null ? 0 : typeof A == "number" ? A : Array.isArray(A) ? A.reduce((P, B) => P + (B.total_value || 0), 0) : 0, O = (A) => It(M(A));
    return t({ isDark: l }), (A, P) => (p(), ee(ke, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            s.loading ? (p(), k("div", Mb, [...P[0] || (P[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Sb, [
              w.value.nodes.length > 0 ? (p(), k("section", Db, [
                u("div", Tb, [
                  R(Yt, {
                    data: w.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("section", Ab, [...P[1] || (P[1] = [
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
              u("section", Bb, [
                R(ve, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: b.value
                }, null, 8, ["value"]),
                R(ve, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: _.value
                }, null, 8, ["value"]),
                R(ve, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: x.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (p(), k("section", Lb, [
                u("div", Pb, [
                  R(lt, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: B }) => [
                      u("span", Ib, D(T(He)(String(B.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": L(({ row: B }) => [
                      u("span", Rb, D(T(oe)(Number(B.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": L(({ row: B }) => [
                      u("span", Fb, D(S(
                        B.sell_started_count,
                        B.seller_conversations || B.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": L(({ row: B }) => [
                      u("span", Eb, D(S(
                        B.sell_get_quote_count,
                        B.seller_conversations || B.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": L(({ row: B }) => [
                      u("span", Ob, D(S(
                        B.sell_booking_created_count,
                        B.seller_conversations || B.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": L(({ row: B }) => [
                      u("span", Vb, D(T(oe)(Number(B.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": L(({ row: B }) => [
                      u("span", zb, [
                        Array.isArray(
                          B.daily_value_sell_success_bank_transfer
                        ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (p(), k("div", Nb, [
                          (p(!0), k(ie, null, fe(B.daily_value_sell_success_bank_transfer, (F) => (p(), k("span", {
                            key: `${B.date}-bt-success-${F.currency}`
                          }, D(F.currency) + " " + D(T(It)(F.total_value)), 1))), 128))
                        ])) : (p(), k("span", Wb, "-"))
                      ])
                    ]),
                    "cell-btSuccess": L(({ row: B }) => [
                      u("span", Hb, D(T(oe)(
                        Number(
                          B.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": L(({ row: B }) => [
                      u("span", jb, D(T(oe)(Number(B.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": L(({ row: B }) => [
                      u("span", Yb, [
                        Array.isArray(
                          B.daily_value_sell_success_cash
                        ) && B.daily_value_sell_success_cash.length > 0 ? (p(), k("div", Kb, [
                          (p(!0), k(ie, null, fe(B.daily_value_sell_success_cash, (F) => (p(), k("span", {
                            key: `${B.date}-co-success-${F.currency}`
                          }, D(F.currency) + " " + D(T(It)(F.total_value)), 1))), 128))
                        ])) : (p(), k("span", Ub, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": L(({ row: B }) => [
                      u("span", qb, D(T(oe)(
                        Number(B.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": L(({ row: B }) => [
                      u("span", Xb, D(S(
                        B.sell_success_count,
                        B.seller_conversations || B.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": L(({ row: B }) => [
                      u("span", Gb, [
                        Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (p(), k("div", Zb, [
                          (p(!0), k(ie, null, fe(B.daily_value_sell_success, (F) => (p(), k("span", {
                            key: `${B.date}-${F.currency}`
                          }, D(F.currency) + " " + D(T(It)(F.total_value)), 1))), 128))
                        ])) : (p(), k("span", Qb, D(O(
                          B.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": L(({ row: B }) => [
                      (B.reasons || []).length > 0 ? (p(), k("div", Jb, [
                        (p(!0), k(ie, null, fe(B.reasons || [], (F) => (p(), k("div", {
                          key: F.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", ev, D(F.reason) + ":", 1),
                          u("span", tv, D(F.failed_count), 1)
                        ]))), 128))
                      ])) : (p(), k("div", nv, "-"))
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
}), ol = /* @__PURE__ */ me(av, [["__scopeId", "data-v-8951604e"]]), sv = { class: "seller-container__body" }, ov = /* @__PURE__ */ re({
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
    return (c, d) => (p(), ee(ke, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: L(() => [
        u("div", sv, [
          R(ol, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          R(sl, {
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
}), iv = /* @__PURE__ */ me(ov, [["__scopeId", "data-v-a9f0dfd2"]]), lv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, rv = {
  key: "content",
  class: "card-body"
}, cv = {
  key: 0,
  class: "chart-section"
}, dv = {
  key: 1,
  class: "empty-state"
}, uv = { class: "empty-state-content" }, hv = { class: "empty-icon-wrapper" }, fv = /* @__PURE__ */ re({
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
    }, { isDark: l, colors: r } = Ce(we(s, "theme")), c = $(() => {
      const m = (s.data?.top_agents || []).filter(
        (b) => b.agent_type?.toLowerCase() !== "triage"
      );
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const v = m.reduce(
        (b, f) => b + (Number(f.conversations) || 0),
        0
      ), g = m.map((b) => {
        const f = b.agent_type?.toLowerCase();
        return a[f] || "#94a3b8";
      }), y = g.map((b) => `${b}80`);
      return {
        labels: m.map((b) => {
          const f = Number(b.conversations) || 0, _ = v ? f / v * 100 : 0;
          return `${b.agent_type} - ${f.toLocaleString()} (${_.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: m.map((b) => b.conversations),
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
              const m = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (b, f) => b + (Number(f) || 0),
                0
              ), y = g ? v / g * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, m) => (p(), ee(ke, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", lv, [...m[0] || (m[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", rv, [
              c.value.labels && c.value.labels.length ? (p(), k("section", cv, [
                R(Sa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (p(), k("section", dv, [
                u("div", uv, [
                  u("div", hv, [
                    R(T(Mm), { class: "empty-icon" })
                  ]),
                  m[1] || (m[1] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                  m[2] || (m[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
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
}), gv = /* @__PURE__ */ me(fv, [["__scopeId", "data-v-a52fe7ae"]]), mv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, pv = {
  key: "content",
  class: "card-body"
}, bv = {
  key: 0,
  class: "payment-methods-section"
}, vv = { class: "payment-methods-grid" }, yv = {
  key: 1,
  class: "empty-state"
}, xv = { class: "empty-state-content" }, _v = { class: "empty-icon-wrapper" }, kv = {
  key: 2,
  class: "payment-method-daily-section"
}, wv = { class: "w-full min-w-0" }, Cv = { class: "font-medium" }, $v = { class: "text-center" }, Mv = { class: "text-center success-value" }, Sv = {
  key: 0,
  class: "currency-cell-list"
}, Dv = { class: "payment-tags" }, Tv = { class: "tag-name" }, Av = {
  key: 0,
  class: "tag-amount"
}, Bv = {
  key: 1,
  class: "tag-amount"
}, Lv = { class: "tag-count" }, Pv = {
  key: 3,
  class: "empty-table-state"
}, Iv = "Not Registered", Rv = /* @__PURE__ */ re({
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
    const a = e, s = n, { isDark: o } = Ce(we(a, "theme")), i = ae(!1), l = ae({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = $(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = $(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = $(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, O) => He(M.date).valueOf() - He(O.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], m = $(
      () => d.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), v = (M) => {
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
      const O = (M.payment_method_breakdown || []).map(
        (P) => ({
          payment_method: P.payment_method || "Unknown",
          total_amount: P.total_amount ?? 0,
          count: P.count ?? 0,
          total_amount_by_currency: P.total_amount_by_currency ?? []
        })
      ), A = (M.payment_method_by_day || []).map((P) => ({
        date: P.date || "",
        total_count: P.total_count ?? 0,
        total_amount: P.total_amount ?? 0,
        total_amount_by_currency: P.total_amount_by_currency ?? [],
        payment_methods: (P.payment_methods || []).map((B) => ({
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
        payment_method_breakdown: O,
        payment_method_by_day: A
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, O] = a.dates.map(
            (P) => He(P).format("YYYY-MM-DD")
          ), A = await a.fetchFunction(
            a.airlineName,
            M,
            O
          );
          l.value = v(A);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = v(null);
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
    ], b = (M) => !M || M.toLowerCase() === "unknown" ? Iv : M.replace(/_/g, " "), f = (M) => M == null ? "$0.00" : Be(M), _ = (M) => {
      const O = M.total_amount_by_currency;
      return O && O.length > 0 ? O.map((A) => `${A.currency} ${f(A.total_value)}`).join(" · ") : f(M.total_amount);
    }, x = (M) => M ? He(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), C = (M) => {
      s("export", M);
    };
    function S() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(M));
    }
    return Je(() => {
      a.data ? S() : g();
    }), Fe(
      () => a.data,
      (M) => {
        M && S();
      },
      { deep: !0 }
    ), Fe(
      () => a.dates,
      (M) => {
        a.data || M && M[0] && M[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: o }), (M, O) => (p(), ee(ke, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: L(() => [
        e.enableExport && !i.value ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: C,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            i.value ? (p(), k("div", mv, [...O[0] || (O[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", pv, [
              r.value ? (p(), k("section", bv, [
                O[1] || (O[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", vv, [
                  (p(!0), k(ie, null, fe(l.value.payment_method_breakdown, (A, P) => (p(), ee(ve, {
                    key: A.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[P % y.length],
                    title: b(A.payment_method),
                    value: _(A),
                    subvalue: `${w(A.count)} ${w(A.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (p(), k("section", yv, [
                u("div", xv, [
                  u("div", _v, [
                    R(T(Dm), { class: "empty-icon" })
                  ]),
                  O[2] || (O[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  O[3] || (O[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (p(), k("section", kv, [
                O[5] || (O[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", wv, [
                  R(lt, {
                    columns: h,
                    rows: m.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": L(({ row: A }) => [
                      u("span", Cv, D(x(String(A.date))), 1)
                    ]),
                    "cell-totalSales": L(({ row: A }) => [
                      u("span", $v, D(T(oe)(A.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": L(({ row: A }) => [
                      u("span", Mv, [
                        Array.isArray(A.total_amount_by_currency) && A.total_amount_by_currency.length > 0 ? (p(), k("div", Sv, [
                          (p(!0), k(ie, null, fe(A.total_amount_by_currency, (P) => (p(), k("span", {
                            key: `${A.date}-${P.currency}`
                          }, D(P.currency) + " " + D(f(P.total_value)), 1))), 128))
                        ])) : (p(), k(ie, { key: 1 }, [
                          Ae(D(f(Number(A.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": L(({ row: A }) => [
                      u("div", Dv, [
                        (p(!0), k(ie, null, fe(Array.isArray(A.payment_methods) ? A.payment_methods : [], (P) => (p(), k("div", {
                          key: P.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", Tv, D(b(P.payment_method)), 1),
                          O[4] || (O[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !P.total_amount_by_currency || P.total_amount_by_currency.length === 0 ? (p(), k("span", Av, D(f(P.total_amount)), 1)) : (p(), k("span", Bv, D(P.total_amount_by_currency.map(
                            (B) => `${B.currency} ${f(B.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", Lv, "(" + D(w(P.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (p(), k("div", Pv, [...O[6] || (O[6] = [
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
}), Fv = /* @__PURE__ */ me(Rv, [["__scopeId", "data-v-0d6d2847"]]), Ev = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Ov = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Vv = {
  key: "title-content",
  class: "header-title-group"
}, zv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Nv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Wv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Hv = { key: "aside-content" }, jv = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Yv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, Kv = {
  key: "body-content",
  class: "highlight-inner"
}, Uv = { class: "card-body" }, qv = { class: "metric-row" }, Xv = {
  key: 0,
  class: "metric-prefix"
}, Gv = {
  key: 0,
  class: "metric-label"
}, Zv = /* @__PURE__ */ re({
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
    const n = e, { isDark: a } = Ce(we(n, "theme")), s = $(() => n.labelPosition === "header"), o = $(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = $(() => {
      if (!o.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = $(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}%` : `${c}%`;
    }), r = $(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (p(), ee(ke, {
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
      title: L(() => [
        R(Me, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", Ev, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              s.value ? (p(), k("div", Ov)) : z("", !0)
            ])) : (p(), k("div", Vv, [
              u("div", zv, [
                Se(c.$slots, "icon", {}, void 0, !0)
              ]),
              s.value ? (p(), k("span", Nv, D(e.label), 1)) : z("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: L(() => [
        R(Me, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", Wv)) : (p(), k("div", Hv, [
              Se(c.$slots, "headerAside", {}, () => [
                o.value ? (p(), k("div", {
                  key: 0,
                  class: Q(["change-badge", r.value])
                }, D(l.value), 3)) : z("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: L(() => [
        R(Me, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", jv, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              s.value ? z("", !0) : (p(), k("div", Yv))
            ])) : (p(), k("div", Kv, [
              u("div", Uv, [
                Se(c.$slots, "value", {}, () => [
                  u("div", qv, [
                    e.prefix ? (p(), k("span", Xv, D(e.prefix), 1)) : z("", !0),
                    u("span", {
                      class: Q(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                s.value ? z("", !0) : (p(), k("span", Gv, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), xt = /* @__PURE__ */ me(Zv, [["__scopeId", "data-v-291e9a9e"]]), Qv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Jv = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, ey = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, ty = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, ny = ["checked", "aria-label"], ay = ["aria-sort", "onClick"], sy = {
  class: "kiut-table-sort-icon",
  "aria-hidden": "true"
}, oy = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, iy = ["checked", "aria-label", "onChange"], ly = /* @__PURE__ */ re({
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
    function l(C, S) {
      if (typeof n.rowKey == "function")
        return n.rowKey(C);
      const M = C[n.rowKey];
      return M != null ? String(M) : `__index_${S}`;
    }
    function r(C, S) {
      return C[S];
    }
    function c(C) {
      return C == null || typeof C == "object" ? "" : String(C);
    }
    function d(C, S) {
      return l(C, S);
    }
    const h = $(
      () => n.rows.map((C, S) => l(C, S))
    );
    function m(C, S) {
      const M = l(C, S);
      return n.selectedKeys.includes(M);
    }
    const v = $(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((C) => n.selectedKeys.includes(C))), g = $(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const C = h.value.filter((S) => n.selectedKeys.includes(S));
      return C.length > 0 && C.length < n.rows.length;
    });
    Fe(
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
          const C = n.selectedKeys.filter((S) => !h.value.includes(S));
          a("update:selectedKeys", C);
        } else {
          const C = new Set(n.selectedKeys);
          h.value.forEach((S) => C.add(S)), a("update:selectedKeys", [...C]);
        }
    }
    function b(C, S) {
      if (!n.selectable) return;
      const M = l(C, S);
      n.selectedKeys.includes(M) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((A) => A !== M)
      ) : a("update:selectedKeys", [...n.selectedKeys, M]);
    }
    function f(C, S) {
      const M = l(C, S);
      return `${n.ariaLabelSelectRow} ${M}`;
    }
    function _(C) {
      a("sort", C);
    }
    function x(C) {
      return n.sortKey !== C ? "↕" : n.sortDirection === "asc" ? "↑" : n.sortDirection === "desc" ? "↓" : "↕";
    }
    function w(C) {
      return n.sortKey !== C || !n.sortDirection ? "none" : n.sortDirection === "asc" ? "ascending" : "descending";
    }
    return (C, S) => (p(), k("div", Qv, [
      u("div", Jv, [
        u("table", {
          class: Q([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", ey, [
              e.selectable ? (p(), k("th", ty, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: y
                }, null, 40, ny)
              ])) : z("", !0),
              (p(!0), k(ie, null, fe(e.columns, (M) => (p(), k("th", {
                key: M.key,
                scope: "col",
                class: Q([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(M.align),
                  M.headerClass ?? ""
                ])
              }, [
                M.sortable ? (p(), k("button", {
                  key: 0,
                  type: "button",
                  class: Q(["kiut-table-sort-btn inline-flex items-center gap-1", i(M.align)]),
                  "aria-sort": w(M.key),
                  onClick: (O) => _(M.key)
                }, [
                  u("span", null, D(M.label), 1),
                  u("span", sy, D(x(M.key)), 1)
                ], 10, ay)) : (p(), k(ie, { key: 1 }, [
                  Ae(D(M.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (p(!0), k(ie, null, fe(e.rows, (M, O) => (p(), k("tr", {
              key: d(M, O),
              class: "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (p(), k("td", oy, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: m(M, O),
                  "aria-label": f(M, O),
                  onChange: (A) => b(M, O)
                }, null, 40, iy)
              ])) : z("", !0),
              (p(!0), k(ie, null, fe(e.columns, (A) => (p(), k("td", {
                key: A.key,
                class: Q([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(A.align),
                  A.cellClass ?? ""
                ])
              }, [
                Se(C.$slots, o(A.key), {
                  row: M,
                  column: A,
                  value: r(M, A.key)
                }, () => [
                  Ae(D(c(r(M, A.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), il = /* @__PURE__ */ me(ly, [["__scopeId", "data-v-2de39916"]]);
function ll(e, t) {
  return p(), k("svg", {
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
function Ke() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ot = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", ht = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", ry = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Bt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", wt = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", cy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], dy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, uy = ["placeholder", "aria-label"], hy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, fy = ["aria-selected", "onClick", "onMouseenter"], gy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, my = { class: "min-w-0 flex-1" }, ks = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-select-${Ke()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ae(null), c = ae(null), d = ae(null), h = ae(null), m = ae(null), v = ae(!1), g = ae(0), y = ae(""), b = ae({});
    function f() {
      const N = c.value;
      if (!N) return;
      const J = N.getBoundingClientRect();
      b.value = {
        top: `${J.bottom - 3}px`,
        left: `${J.left}px`,
        width: `${J.width}px`
      };
    }
    const _ = $(() => n.options.filter((N) => !N.disabled)), x = $(() => {
      if (!n.searchable) return _.value;
      const N = y.value.trim().toLowerCase();
      return N ? _.value.filter((J) => J.label.toLowerCase().includes(N)) : _.value;
    }), w = $(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), C = $(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((J) => J.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(N) {
      return `${String(N.value)}-${N.label}`;
    }
    function M(N) {
      return n.modelValue === N.value;
    }
    function O(N, J) {
      const se = M(N), ge = g.value === J;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        se ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !se && ge ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function A() {
      g.value = Math.max(
        0,
        x.value.findIndex((N) => N.value === n.modelValue)
      );
    }
    function P() {
      if (n.searchable) {
        m.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function B() {
      f(), y.value = "", A(), We(() => P());
    }
    function F() {
      v.value = !1, y.value = "";
    }
    function X(N) {
      a("update:modelValue", N.value), F();
    }
    function te() {
      if (!n.disabled) {
        if (v.value) {
          F();
          return;
        }
        v.value = !0, B();
      }
    }
    function U(N) {
      N.stopPropagation(), !n.disabled && te();
    }
    function le(N) {
      if (!v.value) return;
      const J = N.target, se = r.value, ge = d.value;
      se && !se.contains(J) && (!ge || !ge.contains(J)) && F();
    }
    function ce(N) {
      n.disabled || (N.key === "ArrowDown" || N.key === "Enter" || N.key === " ") && (N.preventDefault(), v.value || (v.value = !0, B()));
    }
    function G(N) {
      const J = x.value;
      if (N.key === "Escape") {
        N.preventDefault(), F();
        return;
      }
      if (N.key === "ArrowDown") {
        if (N.preventDefault(), J.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (N.key === "ArrowUp") {
        if (N.preventDefault(), J.length === 0) return;
        g.value = J.length - 1, h.value?.focus();
        return;
      }
      if (N.key === "Enter") {
        N.preventDefault();
        const se = J[g.value];
        se && X(se);
      }
    }
    function de(N) {
      const J = x.value;
      if (N.key === "Escape") {
        N.preventDefault(), F();
        return;
      }
      if (J.length !== 0) {
        if (N.key === "ArrowDown") {
          N.preventDefault(), g.value = Math.min(g.value + 1, J.length - 1);
          return;
        }
        if (N.key === "ArrowUp") {
          if (N.preventDefault(), g.value === 0 && n.searchable) {
            m.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (N.key === "Enter") {
          N.preventDefault();
          const se = J[g.value];
          se && X(se);
        }
      }
    }
    return Fe(y, () => {
      g.value = 0;
    }), Je(() => {
      document.addEventListener("click", le);
    }), ft(() => {
      document.removeEventListener("click", le);
    }), (N, J) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ot))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Q([
          T(ht),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: U,
        onKeydown: ce
      }, [
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D(C.value), 3),
        R(T(_s), {
          class: Q(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, cy),
      (p(), ee(_a, { to: "body" }, [
        it(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: Te(b.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (p(), k("div", dy, [
            it(u("input", {
              ref_key: "searchInputRef",
              ref: m,
              "onUpdate:modelValue": J[0] || (J[0] = (se) => y.value = se),
              type: "search",
              class: Q([T(ht), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: J[1] || (J[1] = Qe(() => {
              }, ["stop"])),
              onKeydown: Qe(G, ["stop"])
            }, null, 42, uy), [
              [tn, y.value]
            ])
          ])) : z("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: Qe(de, ["stop"])
          }, [
            x.value.length === 0 ? (p(), k("li", hy, D(e.noResultsText), 1)) : z("", !0),
            (p(!0), k(ie, null, fe(x.value, (se, ge) => (p(), k("li", {
              key: S(se),
              role: "option",
              "aria-selected": M(se),
              class: Q(O(se, ge)),
              onClick: Qe((xe) => X(se), ["stop"]),
              onMouseenter: (xe) => g.value = ge
            }, [
              e.showOptionCheck ? (p(), k("span", gy, [
                M(se) ? (p(), ee(T(ll), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : z("", !0)
              ])) : z("", !0),
              u("span", my, D(se.label), 1)
            ], 42, fy))), 128))
          ], 544)
        ], 4), [
          [jn, v.value]
        ])
      ]))
    ], 512));
  }
}), py = {
  class: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4",
  "aria-hidden": "true"
}, by = {
  class: "table-skeleton mt-6 w-full min-w-0",
  "aria-hidden": "true"
}, vy = { class: "table-skeleton__table" }, yy = {
  key: "content",
  class: "card-body"
}, xy = { class: "kpi-closed-value" }, _y = { class: "kpi-closed-value__main" }, ky = {
  key: 0,
  class: "kpi-closed-value__pct"
}, wy = { class: "table-view-select flex justify-end" }, Cy = { class: "table-section w-full min-w-0" }, $y = { class: "ah-cell name-cell" }, My = { class: "ah-cell name-cell" }, Sy = { class: "ah-cell email-cell" }, Dy = { class: "ah-cell" }, Ty = { class: "ah-cell" }, Ay = { class: "ah-cell" }, By = {
  key: 2,
  class: "empty-state"
}, ra = 6, Ly = /* @__PURE__ */ re({
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
    const a = e, s = n, o = (I) => {
      s("export", I);
    }, { isDark: i } = Ce(we(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(I) {
      const V = I?.trim() ?? "";
      return V.length > 0 && !l.has(V);
    }
    function c(I) {
      if (!r(I.agent_email)) return !1;
      const V = I.assigned_count ?? 0, H = I.closed_count ?? 0;
      return V > 0 || H > 0;
    }
    function d(I) {
      return (I.assigned_count ?? 0) + (I.closed_count ?? 0);
    }
    function h(I) {
      const V = I?.trim();
      return V || "—";
    }
    const m = $(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), v = $(() => m.value.length > 0), g = $(() => {
      const I = (a.data?.total_enqueued ?? 0) > 0;
      return v.value || I;
    }), y = ae("by_date"), b = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], f = ae("date"), _ = ae("desc"), x = ae(!1), w = ra;
    Fe(y, (I) => {
      x.value = !1, I === "aggregated" ? (f.value = "name", _.value = "asc") : (f.value = "date", _.value = "desc");
    });
    function C(I, V) {
      return V == null ? null : V === 0 ? I > 0 ? 100 : 0 : (I - V) / V * 100;
    }
    function S(I) {
      const V = I.toFixed(1);
      return I > 0 ? `+${V}%` : `${V}%`;
    }
    function M(I, V = !1) {
      const H = V ? -I : I;
      return H > 0 ? "change-badge--up" : H < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function O(I, V) {
      if (I === null) return null;
      const H = C(I, V);
      return H === null ? null : {
        label: S(H),
        class: M(H, !0)
      };
    }
    const A = $(() => a.data?.total_enqueued ?? 0), P = $(() => a.data?.total_closed ?? 0), B = $(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), F = $(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), X = $(() => A.value <= 0 ? null : `(${(P.value / A.value * 100).toFixed(1)}%)`), te = $(
      () => O(
        B.value,
        a.previousAvgTimeToAssignSeconds
      )
    ), U = $(
      () => O(
        F.value,
        a.previousAvgConversationDurationSeconds
      )
    );
    function le(I, V) {
      return {
        id: `${I.date}-${I.agent_email}-${V}`,
        date: I.date,
        dateSort: new Date(I.date).getTime(),
        agent_name: I.agent_name ?? "",
        agent_email: I.agent_email,
        handled: d(I),
        avg_assignation_seconds: I.avg_time_to_assign_seconds ?? null,
        avg_resolution_seconds: I.avg_conversation_duration_seconds ?? null
      };
    }
    function ce(I) {
      const V = /* @__PURE__ */ new Map();
      for (const H of I) {
        if (!c(H)) continue;
        const ne = H.agent_email.trim();
        V.has(ne) || V.set(ne, {
          agent_name: H.agent_name?.trim() ?? "",
          agent_email: ne,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const ue = V.get(ne), ye = H.assigned_count ?? 0, pe = H.closed_count ?? 0;
        ue.handled += d(H), H.agent_name?.trim() && (ue.agent_name = H.agent_name.trim()), H.avg_time_to_assign_seconds != null && ye > 0 && (ue.assignSum += H.avg_time_to_assign_seconds * ye, ue.assignWeight += ye), H.avg_conversation_duration_seconds != null && pe > 0 && (ue.resolutionSum += H.avg_conversation_duration_seconds * pe, ue.resolutionWeight += pe);
      }
      return Array.from(V.values()).map((H, ne) => ({
        id: `agg-${H.agent_email}-${ne}`,
        agent_name: H.agent_name,
        agent_email: H.agent_email,
        handled: H.handled,
        avg_assignation_seconds: H.assignWeight > 0 ? H.assignSum / H.assignWeight : null,
        avg_resolution_seconds: H.resolutionWeight > 0 ? H.resolutionSum / H.resolutionWeight : null
      }));
    }
    const G = $(() => {
      const I = m.value;
      return y.value === "aggregated" ? ce(I) : I.map(le);
    });
    function de(I, V, H, ne) {
      const ue = ne === "asc" ? 1 : -1;
      let ye = 0;
      switch (H) {
        case "date":
          ye = (I.dateSort ?? 0) - (V.dateSort ?? 0);
          break;
        case "name":
          ye = (I.agent_name || "").localeCompare(V.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          ye = I.agent_email.localeCompare(V.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          ye = I.handled - V.handled;
          break;
        case "avgAssignation":
          ye = (I.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (V.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          ye = (I.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (V.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (ye !== 0) return ye * ue;
      if (y.value === "by_date" && H !== "date") {
        const pe = (V.dateSort ?? 0) - (I.dateSort ?? 0);
        if (pe !== 0) return pe;
      }
      return (I.agent_name || "").localeCompare(V.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const N = $(() => {
      const I = [...G.value];
      return I.sort((V, H) => de(V, H, f.value, _.value)), I;
    }), J = $(() => {
      const I = [];
      return y.value === "by_date" && I.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), I.push(
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
      ), I;
    }), se = $(
      () => Math.max(0, N.value.length - ra)
    ), ge = $(
      () => N.value.length > ra
    ), xe = $(() => x.value || !ge.value ? N.value : N.value.slice(0, ra));
    function Y(I) {
      const V = I;
      if (x.value = !1, f.value === V) {
        _.value = _.value === "asc" ? "desc" : "asc";
        return;
      }
      f.value = V, V === "date" ? _.value = "desc" : V === "name" || V === "email" ? _.value = "asc" : _.value = "desc";
    }
    const q = (I) => I == null ? "0" : oe(I), W = (I) => {
      if (I == null)
        return "—";
      if (I < 60)
        return `${Math.round(I)}s`;
      const V = Math.round(I), H = Math.floor(V / 60), ne = V % 60;
      if (H < 60)
        return `${H}m ${ne}s`;
      const ue = Math.floor(H / 60), ye = H % 60;
      return `${ue}h ${ye}m`;
    }, K = (I) => new Date(I).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (I, V) => (p(), ee(ke, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", {
              key: "loading",
              class: Q(["card-body loading-body", { "agent-human-conv--dark": T(i) }]),
              "aria-busy": "true",
              "aria-label": "Loading agent human conversations"
            }, [
              u("div", py, [
                (p(), k(ie, null, fe(4, (H) => R(xt, {
                  key: `kpi-skeleton-${H}`,
                  label: "Loading",
                  value: "",
                  "label-position": "header",
                  loading: !0,
                  theme: e.theme
                }, null, 8, ["theme"])), 64))
              ]),
              u("section", by, [
                V[3] || (V[3] = u("div", { class: "table-skeleton__header" }, [
                  u("div", { class: "table-skeleton__titles" }, [
                    u("div", { class: "bm-skeleton-blink skeleton-section-title" }),
                    u("div", { class: "bm-skeleton-blink skeleton-section-subtitle" })
                  ]),
                  u("div", { class: "bm-skeleton-blink skeleton-table-select" })
                ], -1)),
                u("div", vy, [
                  V[2] || (V[2] = u("div", { class: "bm-skeleton-blink skeleton-table-head" }, null, -1)),
                  (p(!0), k(ie, null, fe(T(w), (H) => (p(), k("div", {
                    key: `table-row-skeleton-${H}`,
                    class: "bm-skeleton-blink skeleton-table-row"
                  }))), 128))
                ]),
                V[4] || (V[4] = u("div", { class: "bm-skeleton-blink skeleton-view-more" }, null, -1))
              ])
            ], 2)) : (p(), k("div", yy, [
              g.value ? (p(), k("div", {
                key: 0,
                class: Q(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
              }, [
                R(xt, {
                  label: "Conversations Opened",
                  "label-position": "header",
                  value: q(A.value),
                  theme: e.theme,
                  "current-value": A.value,
                  "previous-value": e.previousTotalEnqueued
                }, {
                  icon: L(() => [...V[5] || (V[5] = [
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
                R(xt, {
                  label: "Conversations Closed",
                  "label-position": "header",
                  value: q(P.value),
                  theme: e.theme,
                  "current-value": P.value,
                  "previous-value": e.previousTotalClosed
                }, {
                  icon: L(() => [...V[6] || (V[6] = [
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
                  value: L(() => [
                    u("div", xy, [
                      u("span", _y, D(q(P.value)), 1),
                      X.value ? (p(), k("span", ky, D(X.value), 1)) : z("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                R(xt, {
                  label: "Avg Time to Assign",
                  "label-position": "header",
                  value: W(B.value),
                  theme: e.theme,
                  "current-value": B.value ?? 0,
                  "previous-value": e.previousAvgTimeToAssignSeconds
                }, Cs({
                  icon: L(() => [
                    V[7] || (V[7] = u("svg", {
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
                  te.value ? {
                    name: "headerAside",
                    fn: L(() => [
                      u("div", {
                        class: Q(["duration-trend-badge", te.value.class])
                      }, D(te.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"]),
                R(xt, {
                  label: "Avg Resolution Time",
                  "label-position": "header",
                  value: W(F.value),
                  theme: e.theme,
                  "current-value": F.value ?? 0,
                  "previous-value": e.previousAvgConversationDurationSeconds
                }, Cs({
                  icon: L(() => [
                    V[8] || (V[8] = u("svg", {
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
                  U.value ? {
                    name: "headerAside",
                    fn: L(() => [
                      u("div", {
                        class: Q(["duration-trend-badge", U.value.class])
                      }, D(U.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"])
              ], 2)) : z("", !0),
              v.value ? (p(), ee(ke, {
                key: 1,
                class: "agent-table-section mt-6",
                title: "Conversations Managed by Agent",
                subtitle: "Daily performance per human agent",
                collapsible: !1
              }, {
                headerAside: L(() => [
                  u("div", wy, [
                    R(ks, {
                      modelValue: y.value,
                      "onUpdate:modelValue": V[0] || (V[0] = (H) => y.value = H),
                      options: b,
                      "aria-label-trigger": "Table view mode",
                      "show-option-check": !1
                    }, null, 8, ["modelValue"])
                  ])
                ]),
                default: L(() => [
                  u("div", Cy, [
                    R(il, {
                      columns: J.value,
                      rows: xe.value,
                      "sort-key": f.value,
                      "sort-direction": _.value,
                      "row-key": "id",
                      onSort: Y
                    }, {
                      "cell-date": L(({ row: H }) => [
                        u("span", $y, D(K(String(H.date))), 1)
                      ]),
                      "cell-name": L(({ row: H }) => [
                        u("span", My, D(h(H.agent_name)), 1)
                      ]),
                      "cell-email": L(({ row: H }) => [
                        u("span", Sy, D(H.agent_email), 1)
                      ]),
                      "cell-handled": L(({ row: H }) => [
                        u("span", Dy, D(q(Number(H.handled))), 1)
                      ]),
                      "cell-avgAssignation": L(({ row: H }) => [
                        u("span", Ty, D(W(
                          H.avg_assignation_seconds
                        )), 1)
                      ]),
                      "cell-avgResolution": L(({ row: H }) => [
                        u("span", Ay, D(W(
                          H.avg_resolution_seconds
                        )), 1)
                      ]),
                      _: 1
                    }, 8, ["columns", "rows", "sort-key", "sort-direction"]),
                    ge.value ? (p(), k("button", {
                      key: 0,
                      type: "button",
                      class: "view-more-btn",
                      onClick: V[1] || (V[1] = (H) => x.value = !x.value)
                    }, [
                      Ae(D(x.value ? "View less" : `View more (${se.value} rows)`) + " ", 1),
                      (p(), k("svg", {
                        class: Q([
                          "view-more-icon",
                          { "view-more-icon-rotated": x.value }
                        ]),
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "aria-hidden": "true"
                      }, [...V[9] || (V[9] = [
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        }, null, -1)
                      ])], 2))
                    ])) : z("", !0)
                  ])
                ]),
                _: 1
              })) : g.value ? z("", !0) : (p(), k("div", By, [...V[10] || (V[10] = [
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
}), Py = /* @__PURE__ */ me(Ly, [["__scopeId", "data-v-8059b3f9"]]), Iy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ry = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, Fy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Ey = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Oy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Vy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, zy = { class: "max-w-[360px] px-4 text-center" }, Ny = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Xo = 5, Wy = /* @__PURE__ */ re({
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
    }, i = we(a, "theme"), { isDark: l } = Ce(i), r = {
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
        (f, _) => f + _,
        0
      );
      return b === 0 ? [] : Object.entries(y).sort(([, f], [, _]) => _ - f).map(([f, _]) => ({
        name: f,
        label: f.toUpperCase(),
        total: _,
        percentage: (_ / b * 100).toFixed(1),
        color: r[f.toLowerCase()] || "#9ca3af"
      }));
    }), m = $(
      () => h.value.slice(0, Xo)
    ), v = $(() => {
      const y = Math.min(m.value.length, Xo);
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
      const _ = /* @__PURE__ */ new Set();
      for (const C of Object.values(b))
        for (const S of Object.keys(C))
          _.add(S);
      const w = Array.from(_).map((C) => {
        const S = C.toLowerCase(), M = r[S] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: f.map((O) => b[O]?.[C] || 0),
          borderColor: M
        };
      });
      c.value = {
        labels: f.map((C) => He(C).format("MMM DD")),
        datasets: w
      };
    };
    return Fe(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, b) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: o
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(Me, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: L(() => [
              a.loading ? (p(), k("div", Iy, [...b[0] || (b[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", Ry, [
                c.value.labels && c.value.labels.length ? (p(), k("section", Fy, [
                  u("div", Ey, [
                    R(pt, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  m.value.length ? (p(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Te(v.value)
                  }, [
                    (p(!0), k(ie, null, fe(m.value, (f) => (p(), ee(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(oe)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : z("", !0)
                ])) : h.value.length ? (p(), k("section", Oy, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: Te(v.value)
                  }, [
                    (p(!0), k(ie, null, fe(m.value, (f) => (p(), ee(ve, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(oe)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : z("", !0),
                h.value.length ? z("", !0) : (p(), k("section", Vy, [
                  u("div", zy, [
                    u("div", Ny, [
                      R(T(et), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Hy = /* @__PURE__ */ me(Wy, [["__scopeId", "data-v-de07e6c8"]]), jy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Yy = {
  key: "content",
  class: "card-body"
}, Ky = { class: "chart-container" }, Uy = { class: "triage-table-block w-full min-w-0" }, qy = { class: "triage-row-label" }, Xy = {
  key: 1,
  class: "triage-count"
}, Gy = {
  key: 1,
  class: "triage-count"
}, Zy = {
  key: 1,
  class: "triage-count"
}, Qy = {
  key: 1,
  class: "triage-count"
}, Jy = {
  key: 1,
  class: "triage-count"
}, e1 = {
  key: 1,
  class: "empty-state"
}, t1 = { class: "empty-state-content" }, n1 = { class: "empty-icon-wrapper" }, a1 = /* @__PURE__ */ re({
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
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i, colors: l } = Ce(
      we(a, "theme")
    ), r = $(() => {
      const x = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [C, S] of Object.entries(x)) {
        const M = C.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const O = M.filter((A) => A !== "triage").length;
        O >= 4 ? w["4p"] += Number(S) || 0 : w[O] += Number(S) || 0;
      }
      return w;
    }), c = $(() => {
      const x = r.value;
      return x[0] + x[1] + x[2] + x[3] + x["4p"] || 0;
    }), d = $(() => Object.keys(a.data?.combinations || {}).length > 0), h = $(() => {
      const x = c.value;
      if (!x) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = r.value;
      return {
        pct0: w[0] / x * 100,
        pct1: w[1] / x * 100,
        pct2: w[2] / x * 100,
        pct3: w[3] / x * 100,
        pct4p: w["4p"] / x * 100
      };
    }), m = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], v = $(() => {
      const x = h.value, w = r.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: x.pct0,
          b1: x.pct1,
          b2: x.pct2,
          b3: x.pct3,
          b4p: x.pct4p
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
    }, y = (x) => x?.replace("80", "") || "#888888", b = $(() => ({
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
            label: (x) => `${x.dataset.label} intent(s): ${Number(x.raw || 0).toFixed(0)}%`
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
    })), _ = (x) => `${(Number(x) || 0).toFixed(0)}`;
    return t({ isDark: i }), (x, w) => (p(), ee(ke, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", jy, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", Yy, [
              d.value ? (p(), k(ie, { key: 0 }, [
                u("div", Ky, [
                  R(kt, {
                    data: b.value,
                    options: f.value
                  }, null, 8, ["data", "options"])
                ]),
                R(ve, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: T(oe)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", Uy, [
                  R(lt, {
                    columns: m,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": L(({ row: C }) => [
                      u("span", qy, D(C.metric), 1)
                    ]),
                    "cell-b0": L(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c0) })
                      }, D(_(Number(C.b0))) + "%", 5)) : (p(), k("span", Xy, D(T(oe)(Number(C.b0))), 1))
                    ]),
                    "cell-b1": L(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c1) })
                      }, D(_(Number(C.b1))) + "%", 5)) : (p(), k("span", Gy, D(T(oe)(Number(C.b1))), 1))
                    ]),
                    "cell-b2": L(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c2) })
                      }, D(_(Number(C.b2))) + "%", 5)) : (p(), k("span", Zy, D(T(oe)(Number(C.b2))), 1))
                    ]),
                    "cell-b3": L(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c3) })
                      }, D(_(Number(C.b3))) + "%", 5)) : (p(), k("span", Qy, D(T(oe)(Number(C.b3))), 1))
                    ]),
                    "cell-b4p": L(({ row: C }) => [
                      C.id === "pct" ? (p(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: Te({ color: y(g.c4p) })
                      }, D(_(Number(C.b4p))) + "%", 5)) : (p(), k("span", Jy, D(T(oe)(Number(C.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (p(), k("div", e1, [
                u("div", t1, [
                  u("div", n1, [
                    R(T(et), { class: "empty-icon" })
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
}), s1 = /* @__PURE__ */ me(a1, [["__scopeId", "data-v-4610c1a9"]]), o1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, i1 = {
  key: "content",
  class: "card-body"
}, l1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, r1 = { class: "pie-section" }, c1 = {
  key: 1,
  class: "empty-state"
}, d1 = /* @__PURE__ */ re({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = [
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
    return t({ isDark: a }), (v, g) => (p(), ee(ke, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            n.loading ? (p(), k("div", o1, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", i1, [
              r.value ? (p(), k("div", l1, [
                u("section", r1, [
                  R(Sa, {
                    data: h.value,
                    options: m.value
                  }, null, 8, ["data", "options"])
                ]),
                R(ve, {
                  class: "shrink-0",
                  title: "Total",
                  value: T(oe)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (p(), k("section", c1, [...g[1] || (g[1] = [
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
}), u1 = /* @__PURE__ */ me(d1, [["__scopeId", "data-v-8743ba33"]]), h1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, f1 = {
  key: "content",
  class: "card-body"
}, g1 = {
  key: 0,
  class: "guardrails-daily-section"
}, m1 = { class: "w-full min-w-0" }, p1 = { class: "font-medium" }, b1 = { class: "font-semibold" }, v1 = { class: "type-badges-row" }, y1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, x1 = {
  key: 1,
  class: "empty-state"
}, _1 = /* @__PURE__ */ re({
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
    }, { isDark: i } = Ce(we(a, "theme")), l = $(
      () => a.data?.items && a.data.items.length > 0
    ), r = $(
      () => (a.data?.items || []).reduce((b, f) => b + f.count, 0)
    ), c = (b) => {
      const f = {};
      for (const w of a.data?.items || [])
        f[w[b]] = (f[w[b]] || 0) + w.count;
      const _ = Object.entries(f).sort((w, C) => C[1] - w[1]);
      if (_.length === 0) return { name: "—", pct: 0 };
      const x = r.value;
      return {
        name: _[0][0],
        pct: x > 0 ? Math.round(_[0][1] / x * 100) : 0
      };
    }, d = $(() => c("guardrail_type")), h = $(() => c("guardrail_action")), m = $(() => c("guardrail_source")), v = $(() => {
      const b = {};
      for (const f of a.data?.items || [])
        b[f.date] || (b[f.date] = {}), b[f.date][f.guardrail_type] = (b[f.date][f.guardrail_type] || 0) + f.count;
      return Object.entries(b).map(([f, _]) => ({
        date: f,
        total: Object.values(_).reduce((x, w) => x + w, 0),
        types: Object.entries(_).map(([x, w]) => ({ type: x, count: w })).sort((x, w) => w.count - x.count)
      })).sort((f, _) => new Date(f.date).getTime() - new Date(_.date).getTime());
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
    return t({ isDark: i }), (b, f) => (p(), ee(ke, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", h1, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", f1, [
              l.value ? (p(), k(ie, { key: 0 }, [
                v.value.length > 0 ? (p(), k("section", g1, [
                  u("div", m1, [
                    R(lt, {
                      columns: g,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": L(({ row: _ }) => [
                        u("span", p1, D(T(He)(String(_.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": L(({ row: _ }) => [
                        u("span", b1, D(T(oe)(_.total)), 1)
                      ]),
                      "cell-types": L(({ row: _ }) => [
                        u("div", v1, [
                          (p(!0), k(ie, null, fe(_.types, (x) => (p(), k("span", {
                            key: x.type,
                            class: "type-count-badge"
                          }, D(x.type) + " (" + D(x.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("section", y1, [
                  R(ve, {
                    title: "Total Events",
                    value: T(oe)(r.value)
                  }, null, 8, ["value"]),
                  R(ve, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  R(ve, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  R(ve, {
                    title: "Top source",
                    value: m.value.name,
                    subvalue: m.value.pct > 0 ? `(${m.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (p(), k("section", x1, [...f[1] || (f[1] = [
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
}), k1 = /* @__PURE__ */ me(_1, [["__scopeId", "data-v-80a28b15"]]), w1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, C1 = {
  key: "content",
  class: "card-body"
}, $1 = { class: "chart-section" }, M1 = { class: "chart-wrapper" }, S1 = {
  key: 1,
  class: "empty-chart"
}, D1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, T1 = {
  key: 0,
  class: "dn-failure-section"
}, A1 = { class: "w-full min-w-0" }, B1 = { class: "failure-reason" }, L1 = { class: "failure-count" }, P1 = { class: "impact-bar-container" }, I1 = { class: "impact-label" }, R1 = { class: "dn-trend-health-block flex flex-col gap-0" }, F1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, E1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, O1 = { class: "system-health" }, V1 = { class: "system-health-content" }, z1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, N1 = {
  key: 1,
  class: "empty-state"
}, W1 = /* @__PURE__ */ re({
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
    }, { isDark: i, colors: l } = Ce(we(a, "theme")), r = $(() => {
      const C = a.data?.documentCounts?.items || [], S = a.data?.processingCounts?.items || [];
      return C.length > 0 || S.length > 0;
    }), c = $(() => {
      const C = a.data?.documentCounts?.items || [];
      return {
        processing_started: C.reduce((S, M) => S + M.processing_started, 0),
        processing_completed: C.reduce((S, M) => S + M.processing_completed, 0),
        processing_failed: C.reduce((S, M) => S + M.processing_failed, 0),
        row_count_total: C.reduce((S, M) => S + M.row_count_total, 0)
      };
    }), d = $(() => {
      const C = a.data?.processingCounts?.items || [];
      return {
        processing_started: C.reduce((S, M) => S + M.processing_started, 0),
        processing_success: C.reduce((S, M) => S + M.processing_success, 0),
        notification_sent: C.reduce((S, M) => S + M.notification_sent, 0),
        notification_failed: C.reduce((S, M) => S + M.notification_failed, 0),
        dq_phone: C.reduce((S, M) => S + M.dq_error_phone_not_found, 0),
        dq_flight: C.reduce((S, M) => S + M.dq_error_flight_not_found, 0),
        dq_booking: C.reduce((S, M) => S + M.dq_error_booking_not_found, 0),
        dq_other: C.reduce((S, M) => S + M.dq_error_other, 0),
        totalDqErrors: C.reduce(
          (S, M) => S + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), h = $(
      () => c.value.row_count_total || d.value.processing_started
    ), m = $(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = (C, S) => S ? `${Math.round(C / S * 100)}%` : "0%", g = $(() => {
      const C = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, M) => M.count - S.count);
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
      ].map((S) => ({
        ...S,
        impactPct: C > 0 ? Math.round(S.count / C * 100) : 0
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
    ), _ = $(() => {
      const C = h.value, S = d.value.processing_success, M = Math.max(0, S - d.value.totalDqErrors), O = d.value.notification_sent, A = Math.max(0, C - S), P = d.value.totalDqErrors, B = Math.max(0, M - O), F = (U, le) => be(U, le), X = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], te = [];
      return S > 0 && te.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: F(S, C)
      }), A > 0 && te.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: A,
        label: F(A, C)
      }), M > 0 && te.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: F(M, C)
      }), P > 0 && te.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: P,
        label: F(P, C)
      }), O > 0 && te.push({
        source: "Contactable",
        target: "Notified",
        value: O,
        label: F(O, C)
      }), B > 0 && te.push({
        source: "Contactable",
        target: "Not Delivered",
        value: B,
        label: F(B, C)
      }), { nodes: X, links: te };
    }), x = $(() => {
      const C = [...a.data?.processingCounts?.items || []].sort(
        (F, X) => new Date(F.date).getTime() - new Date(X.date).getTime()
      ), S = a.data?.documentCounts?.items || [], M = {};
      for (const F of S)
        M[F.date] = (M[F.date] || 0) + F.row_count_total;
      const O = [
        .../* @__PURE__ */ new Set([
          ...C.map((F) => F.date),
          ...S.map((F) => F.date)
        ])
      ].sort(), A = O.map((F) => He(F).format("MMM DD")), P = O.map((F) => {
        const X = C.find((le) => le.date === F), te = X?.notification_sent || 0, U = M[F] || X?.processing_started || 0;
        return U > 0 ? Math.round(te / U * 100) : 0;
      }), B = O.map((F) => C.find((te) => te.date === F)?.notification_sent || 0);
      return {
        labels: A,
        datasets: [
          {
            label: "Success Rate (%)",
            data: P,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: B,
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
    return t({ isDark: i }), (C, S) => (p(), ee(ke, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !a.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            e.loading ? (p(), k("div", w1, [...S[0] || (S[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", C1, [
              r.value ? (p(), k(ie, { key: 0 }, [
                u("section", $1, [
                  S[2] || (S[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", M1, [
                    _.value.nodes.length > 0 && _.value.links.length > 0 ? (p(), ee(Yt, {
                      key: 0,
                      data: _.value,
                      height: "350px",
                      "use-gradient": !1,
                      "node-gap": 24
                    }, null, 8, ["data"])) : (p(), k("div", S1, [...S[1] || (S[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", D1, [
                  R(ve, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: T(oe)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  R(ve, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: T(oe)(h.value)
                  }, null, 8, ["value"]),
                  R(ve, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: T(oe)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  R(ve, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: T(oe)(m.value),
                    subvalue: v(m.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  R(ve, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: g.value.reason,
                    subvalue: g.value.count > 0 ? `${T(oe)(g.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (p(), k("section", T1, [
                  S[3] || (S[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", A1, [
                    R(lt, {
                      columns: b,
                      rows: f.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": L(({ row: M }) => [
                        u("span", B1, D(M.reason), 1)
                      ]),
                      "cell-count": L(({ row: M }) => [
                        u("span", L1, D(T(oe)(M.count)), 1)
                      ]),
                      "cell-impact": L(({ row: M }) => [
                        u("div", P1, [
                          u("div", {
                            class: "impact-bar",
                            style: Te({ width: M.impactPct + "%" })
                          }, null, 4),
                          u("span", I1, D(M.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : z("", !0),
                u("div", R1, [
                  x.value.labels.length > 0 ? (p(), k("section", F1, [
                    S[4] || (S[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", E1, [
                      R(pt, {
                        data: x.value,
                        options: w.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : z("", !0),
                  u("details", O1, [
                    S[5] || (S[5] = u("summary", { class: "system-health-toggle" }, [
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
                    u("div", V1, [
                      u("div", z1, [
                        R(ve, {
                          title: "Docs Started",
                          value: T(oe)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        R(ve, {
                          title: "Docs Completed",
                          value: T(oe)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        R(ve, {
                          title: "Docs Failed",
                          value: T(oe)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        R(ve, {
                          title: "Processing Started",
                          value: T(oe)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        R(ve, {
                          title: "Processing Success",
                          value: T(oe)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        R(ve, {
                          title: "Notification Failed",
                          value: T(oe)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (p(), k("section", N1, [...S[6] || (S[6] = [
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
}), H1 = /* @__PURE__ */ me(W1, [["__scopeId", "data-v-c77ab172"]]), j1 = /* @__PURE__ */ re({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => oe(n.totalConversations)), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(xt, {
      label: "Total Conversations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: L(() => [...r[0] || (r[0] = [
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
}), Y1 = /* @__PURE__ */ re({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${n.csatP95.toFixed(1)}`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(xt, {
      label: "CSAT P95",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: L(() => [...r[0] || (r[0] = [
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
}), K1 = /* @__PURE__ */ re({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${n.csatPulse.toFixed(1)}%`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(xt, {
      label: "CSAT Pulse",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: L(() => [...r[0] || (r[0] = [
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
}), U1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, q1 = { key: "content" }, X1 = {
  key: 0,
  class: "card-body"
}, G1 = { class: "chart-wrapper" }, Z1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, Q1 = {
  key: 1,
  class: "empty-state"
}, J1 = 520, ex = 280, tx = 44, nx = 52, ax = {
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
    }, o = e, { isDark: i } = Ce(we(o, "theme")), l = $(() => o.data);
    return t({ isDark: i }), (r, c) => (p(), ee(ke, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !o.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            o.loading ? (p(), k("div", U1, [...c[0] || (c[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", q1, [
              l.value && l.value.total_nps_responses > 0 ? (p(), k("div", X1, [
                u("div", G1, [
                  R(Gi, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": J1,
                    "chart-height": ex,
                    "chart-margin": tx,
                    "chart-bottom-margin": nx
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
                ]),
                u("div", Z1, [
                  R(ve, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (p(), ee(ve, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : z("", !0)
                ])
              ])) : (p(), k("div", Q1, [...c[1] || (c[1] = [
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
}, rl = /* @__PURE__ */ me(ax, [["__scopeId", "data-v-a2a6de84"]]), sx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ox = { key: "content" }, ix = {
  key: 0,
  class: "card-body"
}, lx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, rx = {
  key: 1,
  class: "empty-state"
}, cx = {
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
      labels: o.value.map((c) => He(c.date).format("DD-MM-YYYY")),
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
    return (c, d) => (p(), ee(ke, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: L(() => [
        e.enableExport && !s.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            s.loading ? (p(), k("div", sx, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", ox, [
              i.value ? (p(), k("div", ix, [
                u("div", lx, [
                  R(pt, {
                    data: l.value,
                    options: r,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("div", rx, [...d[1] || (d[1] = [
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
}, cl = /* @__PURE__ */ me(cx, [["__scopeId", "data-v-cd8c9258"]]), dx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, ux = { key: "content" }, hx = {
  key: 0,
  class: "card-body"
}, fx = {
  key: 1,
  class: "empty-state"
}, gx = /* @__PURE__ */ re({
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
    return (i, l) => (p(), ee(ke, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            t.loading ? (p(), k("div", dx, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", ux, [
              a.value ? (p(), k("div", hx, [
                R(kt, {
                  data: s.value,
                  options: o,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (p(), k("div", fx, [...l[1] || (l[1] = [
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
}), mx = /* @__PURE__ */ me(gx, [["__scopeId", "data-v-f99eebba"]]), px = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, bx = { key: "content" }, vx = {
  key: 0,
  class: "card-body"
}, yx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, xx = {
  key: 1,
  class: "empty-state"
}, _x = /* @__PURE__ */ re({
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
          borderColor: "#2563EB",
          pointBorderColor: "#2563EB",
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
    return (i, l) => (p(), ee(ke, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: t.loading
    }, {
      default: L(() => [
        R(Me, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: L(() => [
            t.loading ? (p(), k("div", px, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (p(), k("div", bx, [
              a.value ? (p(), k("div", vx, [
                u("div", yx, [
                  R(pt, {
                    data: s.value,
                    options: o,
                    "uppercase-legend-labels": !0
                  }, null, 8, ["data"])
                ])
              ])) : (p(), k("div", xx, [...l[1] || (l[1] = [
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
}), kx = /* @__PURE__ */ me(_x, [["__scopeId", "data-v-fd81f810"]]), wx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Cx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, dl = {
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
    return (d, h) => (p(), k("div", wx, [
      u("div", Cx, [
        R(rl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        R(cl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (p(), k("div", {
        key: 0,
        class: Q(["grid w-full items-start gap-6", c.value])
      }, [
        o.value ? (p(), ee(mx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0),
        i.value ? (p(), ee(kx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : z("", !0)
      ], 2)) : z("", !0)
    ]));
  }
}, $x = { class: "csat-container__body" }, Mx = /* @__PURE__ */ re({
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
    return (s, o) => (p(), ee(ke, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: L(() => [
        u("div", $x, [
          R(dl, {
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
}), Sx = /* @__PURE__ */ me(Mx, [["__scopeId", "data-v-71605c0e"]]), Dx = /* @__PURE__ */ re({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => It(n.totalRevenue)), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(xt, {
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
      icon: L(() => [...r[0] || (r[0] = [
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
}), Tx = { class: "flex justify-end" }, Ax = {
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
}, Fx = /* @__PURE__ */ re({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = we(a, "theme"), { isDark: i } = Ce(o), l = ae(a.breakdownBy), r = $(() => a.data ?? {
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
    ), m = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (_) => m[_ % m.length], g = {
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
    }, y = () => {
      s("changeBreakdown", l.value);
    }, b = (_) => {
      if (!_) return "";
      const w = _.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return w ? w.charAt(0).toUpperCase() + w.slice(1) : "";
    }, f = (_) => {
      if (l.value === "all") {
        const A = _?.escalations_by_day ?? [];
        if (!A.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const P = [...A].sort((B, F) => B.date.localeCompare(F.date));
        c.value = {
          labels: P.map((B) => He(B.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: P.map(
                (B) => Number(B.escalation_rate_percentage || 0)
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
      const x = _?.breakdown_by_day ?? [], w = _?.breakdown_items ?? [];
      if (!x.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const C = [...x].sort(
        (A, P) => A.date.localeCompare(P.date)
      ), S = w.slice(0, 5).map((A) => A.key), M = C.map((A) => He(A.date).format("MMM DD")), O = S.map((A, P) => {
        const B = w.find((F) => F.key === A);
        return {
          label: b(B?.label || A),
          data: C.map((F) => {
            const X = F.items.find((te) => te.key === A);
            return Number(X?.percentage || 0);
          }),
          borderColor: v(P),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      c.value = {
        labels: M,
        datasets: O
      }, d.value = w.slice(0, 5).map((A, P) => ({
        key: A.key,
        label: b(A.label),
        percentage: Number(A.percentage || 0),
        color: v(P)
      })), h.value = w.slice(0, 5).map((A, P) => ({
        key: A.key,
        label: b(A.label),
        color: v(P)
      }));
    };
    return Fe(
      () => a.data,
      (_) => {
        f(_ ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Fe(
      () => a.breakdownBy,
      (_) => {
        l.value = _, f(r.value);
      }
    ), t({ isDark: i }), (_, x) => (p(), ee(ke, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: L(() => [
        u("div", Tx, [
          it(u("select", {
            "onUpdate:modelValue": x[0] || (x[0] = (w) => l.value = w),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: y
          }, [...x[1] || (x[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1),
            u("option", { value: "channel" }, "By Channel", -1),
            u("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [xl, l.value]
          ])
        ])
      ]),
      default: L(() => [
        u("div", {
          class: Q(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          R(Me, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: L(() => [
              a.loading ? (p(), k("div", Ax, [...x[2] || (x[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (p(), k("div", Bx, [
                c.value.labels && c.value.labels.length && c.value.datasets.length ? (p(), k("section", Lx, [
                  u("div", Px, [
                    R(pt, {
                      data: c.value,
                      options: g,
                      theme: o.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", Ix, [
                    (p(!0), k(ie, null, fe(d.value, (w) => (p(), ee(ve, {
                      key: `card-${w.key}`,
                      class: "min-w-0",
                      color: w.color,
                      title: w.label,
                      value: `${w.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value"]))), 128))
                  ])
                ])) : (p(), k("section", Rx, [...x[3] || (x[3] = [
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
}), Ex = /* @__PURE__ */ me(Fx, [["__scopeId", "data-v-126665b7"]]), Ox = /* @__PURE__ */ re({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = ae(null), s = $(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), o = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: o, changePercent: i }), (l, r) => (p(), ee(xt, {
      label: "Human Escalations",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: L(() => [...r[0] || (r[0] = [
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
}, Nx = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, Wx = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Hx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, jx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Yx = {
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
    const t = e, { isDark: n, colors: a } = Ce(we(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = $(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, m = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let g = [];
      return m ? g = d : v && (g = h.map((y, b) => ({
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
              return c.dataset.yAxisID === "y" ? d + Be(h) : d + String(h);
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
            callback: (c) => Be(c)
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
    return (c, d) => (p(), ee(ke, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", Vx, [
          e.loading ? (p(), k("div", zx, [
            u("div", Nx, [
              (p(), k(ie, null, fe(s, (h, m) => u("div", {
                key: m,
                class: Q(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[m]]),
                style: Te({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (p(), k("div", Wx, [
            u("div", Hx, [
              R(pt, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", jx, [
              R(ve, {
                color: T(a).primaryLight,
                title: "Total Allocated",
                value: T(Be)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              R(ve, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Be)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (p(), k("section", Yx, [
            u("div", Kx, [
              u("div", Ux, [
                R(T(et), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, Cn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Go = 10, s_ = /* @__PURE__ */ re({
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
    const a = e, { isDark: s, colors: o } = Ce(we(a, "theme")), i = (g) => {
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
    }), m = $(() => {
      const g = a.data?.costs_by_day || {}, y = Object.keys(g).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const b = y.map((_) => i(_)), f = [
        {
          label: "Input Cost",
          data: y.map((_) => g[_]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((_) => g[_]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((_) => g[_]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((_) => g[_]?.cache_write_cost || 0),
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
              family: Cn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Go,
            boxHeight: Go,
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
            family: Cn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Cn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let y = g.dataset.label || "";
              return y && (y += ": "), g.parsed.y !== null && (y += Be(g.parsed.y)), y;
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
            font: { family: Cn, size: 12, weight: "500" },
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
            font: { family: Cn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Be(g);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (g, y) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", Xx, [
          e.loading ? (p(), k("div", a_, [...y[2] || (y[2] = [
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
          ])])) : (p(), k("div", Gx, [
            m.value.labels && m.value.labels.length ? (p(), k("section", Zx, [
              u("div", Qx, [
                R(kt, {
                  data: m.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Jx, [
                R(ve, {
                  title: "Total Cost",
                  value: T(Be)(e.data.total_cost)
                }, null, 8, ["value"]),
                R(ve, {
                  title: "Input Cost",
                  value: T(Be)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(ve, {
                  title: "Output Cost",
                  value: T(Be)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(ve, {
                  title: "Cache Read",
                  value: T(Be)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(ve, {
                  title: "Cache Write",
                  value: T(Be)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                R(ve, {
                  title: "Avg / Conv.",
                  value: T(Be)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", e_, [
              u("div", t_, [
                u("div", n_, [
                  R(T(et), { class: "empty-icon" })
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
}), o_ = /* @__PURE__ */ me(s_, [["__scopeId", "data-v-39a5448c"]]), i_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, l_ = {
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
}, $n = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Zo = 10, m_ = /* @__PURE__ */ re({
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
    const a = e, { isDark: s, colors: o } = Ce(we(a, "theme")), i = (d) => {
      const h = new Date(d), m = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${m}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((g) => i(g)), v = [
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
        labels: m,
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
              family: $n,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Zo,
            boxHeight: Zo,
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
            family: $n,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: $n,
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
            font: { family: $n, size: 12, weight: "500" },
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
            font: { family: $n, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (d, h) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", i_, [
          e.loading ? (p(), k("div", g_, [...h[2] || (h[2] = [
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
          ])])) : (p(), k("div", l_, [
            r.value.labels && r.value.labels.length ? (p(), k("section", r_, [
              u("div", c_, [
                R(kt, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", d_, [
                R(ve, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(oe)(e.data.total_tokens)
                }, null, 8, ["value"]),
                R(ve, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(oe)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                R(ve, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(oe)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                R(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(oe)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                R(ve, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(oe)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (p(), k("section", u_, [
              u("div", h_, [
                u("div", f_, [
                  R(T(et), { class: "empty-icon" })
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
}), p_ = /* @__PURE__ */ me(m_, [["__scopeId", "data-v-70c6f3c7"]]), b_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, v_ = {
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
}, M_ = /* @__PURE__ */ re({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(
      () => oe(n.data?.total_conversations ?? 0)
    ), l = $(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((v) => o(v)), m = [
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
        datasets: m
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
    return t({ isDark: a }), (c, d) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", b_, [
          e.loading ? (p(), k("div", $_, [...d[2] || (d[2] = [
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
          ])])) : (p(), k("div", v_, [
            l.value.labels && l.value.labels.length ? (p(), k("section", y_, [
              u("div", x_, [
                R(pt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", __, [
                R(ve, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", k_, [
              u("div", w_, [
                u("div", C_, [
                  R(T(et), { class: "empty-icon" })
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
}), S_ = /* @__PURE__ */ me(M_, [["__scopeId", "data-v-b33e8627"]]), D_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, T_ = {
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
}, V_ = /* @__PURE__ */ re({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = $(() => n.data?.top_agents && n.data.top_agents.length > 0), i = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_cost || 0) - (m.total_cost || 0)) : []), l = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((m, v) => (v.total_tokens || 0) - (m.total_tokens || 0)) : []), r = $(() => {
      const m = i.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: m.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const m = l.value;
      return m.length === 0 ? { labels: [], datasets: [] } : {
        labels: m.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: m.map((v) => v.total_tokens || 0),
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const v = m.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
              return g ? [
                `Total Cost: ${Be(g.total_cost)}`,
                `Input Cost: ${Be(g.total_input_tokens_cost)}`,
                `Output Cost: ${Be(g.total_output_tokens_cost)}`,
                `Cache Read: ${Be(g.total_read_tokens_cost)}`,
                `Cache Write: ${Be(g.total_write_tokens_cost)}`
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
            callback: function(m) {
              return Be(m);
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
            title: function(m) {
              return m[0]?.label || "";
            },
            label: function(m) {
              const v = m.label, g = n.data?.top_agents?.find((y) => y.agent_type === v);
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
            callback: function(m) {
              return m.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (m, v) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", D_, [
          e.loading ? (p(), k("div", O_, [...v[4] || (v[4] = [
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
          ])])) : (p(), k("div", T_, [
            o.value ? (p(), k("div", A_, [
              u("section", B_, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", L_, [
                  R(kt, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", P_, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", I_, [
                  R(kt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (p(), k("section", R_, [
              u("div", F_, [
                u("div", E_, [
                  R(T(et), { class: "empty-icon" })
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
}), z_ = /* @__PURE__ */ me(V_, [["__scopeId", "data-v-a5014772"]]), N_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, W_ = {
  key: 0,
  class: "card-body"
}, H_ = {
  key: 0,
  class: "chart-section"
}, j_ = { class: "chart-container" }, Y_ = {
  key: 1,
  class: "empty-state"
}, K_ = { class: "empty-state-content" }, U_ = { class: "empty-icon-wrapper" }, q_ = {
  key: 1,
  class: "loading-state"
}, X_ = /* @__PURE__ */ re({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = {
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
    ) : []), l = $(() => i.value.length > 0), r = $(() => i.value.reduce((h, m) => h + (m.conversations || 0), 0)), c = $(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const m = h.map((y) => {
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
            backgroundColor: m,
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
              const m = (h.label || "").toString(), v = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((b, f) => b + (Number(f) || 0), 0), y = g ? v / g * 100 : 0;
              return `${m}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, m) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", N_, [
          e.loading ? (p(), k("div", q_, [...m[2] || (m[2] = [
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
          ])])) : (p(), k("div", W_, [
            l.value ? (p(), k("section", H_, [
              u("div", j_, [
                R(Sa, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", Y_, [
              u("div", K_, [
                u("div", U_, [
                  R(T(et), { class: "empty-icon" })
                ]),
                m[0] || (m[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                m[1] || (m[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), G_ = /* @__PURE__ */ me(X_, [["__scopeId", "data-v-14445b91"]]), Z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Q_ = {
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
}, ok = /* @__PURE__ */ re({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = Ce(we(n, "theme")), o = (c) => {
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
        const b = [...c].sort((f, _) => f.date.localeCompare(_.date));
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
        const f = d[b]?.total_cost || 0, _ = h[b] || 0;
        return _ > 0 ? f / _ : 0;
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
              return d && (d += ": "), c.parsed.y !== null && (d += Be(c.parsed.y)), d;
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
              return Be(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: L(() => [
        u("div", Z_, [
          e.loading ? (p(), k("div", sk, [...d[2] || (d[2] = [
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
          ])])) : (p(), k("div", Q_, [
            i.value ? (p(), k("section", J_, [
              u("div", ek, [
                R(pt, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (p(), k("section", tk, [
              u("div", nk, [
                u("div", ak, [
                  R(T(et), { class: "empty-icon" })
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
}), ik = /* @__PURE__ */ me(ok, [["__scopeId", "data-v-1e8204ea"]]), lk = { class: "tabs text-sm" }, rk = ["aria-label"], ck = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], dk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, uk = /* @__PURE__ */ re({
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
    const n = e, a = t, s = ae([]), o = `tabs-${Ke()}`, i = (g) => `${o}-tab-${g}`, l = $(
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
    function m(g, y) {
      const b = n.items.length;
      if (b === 0) return 0;
      let f = g;
      for (let _ = 0; _ < b; _++)
        if (f = (f + y + b) % b, !n.items[f]?.disabled) return f;
      return g;
    }
    async function v(g, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let f = y;
      g.key === "ArrowLeft" ? f = m(y, -1) : g.key === "ArrowRight" ? f = m(y, 1) : g.key === "Home" ? f = l.value[0] ?? 0 : g.key === "End" && (f = l.value[l.value.length - 1] ?? y);
      const _ = n.items[f];
      !_ || _.disabled || (d(_.value, n.modelValue), await We(), s.value[f]?.focus());
    }
    return (g, y) => (p(), k("div", lk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Q([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (p(!0), k(ie, null, fe(e.items, (b, f) => (p(), k("button", {
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
          onClick: (_) => h(b, _),
          onKeydown: (_) => v(_, f)
        }, [
          u("span", {
            class: Q(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            b.icon ? (p(), ee(Jt(b.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : z("", !0),
            u("span", dk, D(b.label), 1)
          ], 2)
        ], 42, ck))), 128))
      ], 10, rk),
      g.$slots.default ? (p(), ee(Me, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: L(() => [
          (p(), k("div", {
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
}), ul = /* @__PURE__ */ me(uk, [["__scopeId", "data-v-f9c367eb"]]), hk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, fk = {
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
}, vk = { class: "empty-state-content" }, yk = { class: "empty-icon-wrapper" }, xk = /* @__PURE__ */ re({
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
    }, { isDark: i } = Ce(we(a, "theme")), l = [
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
        avgTokens: m(y.avg_tokens_per_message),
        messageCount: m(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: m(y.total_tokens)
      }))
    ), m = (g) => g == null ? "0" : oe(g), v = (g) => g == null ? "$0.00" : Be(g);
    return t({ isDark: i }), (g, y) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", hk, [
          e.loading ? (p(), k("div", fk, [...y[1] || (y[1] = [
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
          ])])) : (p(), k("div", gk, [
            R(ul, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (b) => r.value = b),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: L(() => [
                c.value && Object.keys(c.value).length > 0 ? (p(), k("div", mk, [
                  u("div", pk, [
                    R(lt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (p(), k("div", bk, [
                  u("div", vk, [
                    u("div", yk, [
                      R(T(et), { class: "empty-icon" })
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
}), _k = /* @__PURE__ */ me(xk, [["__scopeId", "data-v-0c23d620"]]), kk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wk = {
  key: 0,
  class: "loading-state"
}, Ck = {
  key: 1,
  class: "card-body"
}, $k = {
  key: 0,
  class: "message-roles-table-block"
}, Mk = { class: "w-full min-w-0" }, Sk = {
  key: 1,
  class: "empty-state"
}, Dk = { class: "empty-state-content" }, Tk = { class: "empty-icon-wrapper" }, Ak = /* @__PURE__ */ re({
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
    }, { isDark: i } = Ce(we(a, "theme")), l = ["assistant", "system", "user"], r = [
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
        avgTokens: m(c.value[y]?.avg_tokens_per_message),
        messageCount: m(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: m(c.value[y]?.total_tokens)
      }))
    ), h = $(() => Object.keys(c.value).length > 0), m = (y) => y == null ? "0" : oe(y), v = (y) => y == null ? "$0.00" : Be(y), g = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, b) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", kk, [
          e.loading ? (p(), k("div", wk, [...b[0] || (b[0] = [
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
          ])])) : (p(), k("div", Ck, [
            h.value ? (p(), k("div", $k, [
              u("div", Mk, [
                R(lt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (p(), k("div", Sk, [
              u("div", Dk, [
                u("div", Tk, [
                  R(T(et), { class: "empty-icon" })
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
}), Bk = /* @__PURE__ */ me(Ak, [["__scopeId", "data-v-362c0dbc"]]), Lk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Pk = {
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
}, Nk = /* @__PURE__ */ re({
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
    const a = e, s = n, o = (_) => {
      s("export", _);
    }, { isDark: i, colors: l } = Ce(we(a, "theme")), r = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", d = (_) => _.agent_name ? _.agent_name : c(_).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (_) => {
      const x = c(_).toLowerCase();
      for (const [w, C] of Object.entries(r))
        if (x.includes(w))
          return C;
      return "#9ca3af";
    }, m = $(() => [...a.data?.top_agents || []].sort((x, w) => w.avg_cost_per_conversation - x.avg_cost_per_conversation)), v = $(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : m.value.reduce((_, x) => _ + x.conversations, 0)), g = $(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : m.value.reduce((_, x) => _ + x.total_cost, 0)), y = $(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : g.value / v.value), b = $(() => {
      const _ = m.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const x = _.map((S) => d(S)), w = _.map((S) => S.avg_cost_per_conversation), C = _.map((S) => h(S));
      return {
        labels: x,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: C.map((S) => `${S}80`),
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
            label: function(_) {
              const x = m.value[_.dataIndex];
              return [
                `Cost: ${Be(_.parsed.x)}`,
                `Conversations: ${oe(x.conversations)}`,
                `Total Cost: ${Be(x.total_cost)}`
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
            callback: function(_) {
              return Be(_);
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
    return t({ isDark: i }), (_, x) => (p(), ee(ke, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: L(() => [
        e.enableExport && !e.loading ? (p(), ee(T(Ee), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : z("", !0)
      ]),
      default: L(() => [
        u("div", Lk, [
          e.loading ? (p(), k("div", zk, [...x[2] || (x[2] = [
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
          ])])) : (p(), k("div", Pk, [
            b.value.labels && b.value.labels.length ? (p(), k("section", Ik, [
              u("div", Rk, [
                R(kt, {
                  data: b.value,
                  options: f.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Fk, [
                R(T(ve), {
                  title: "Total Agents",
                  value: String(m.value.length)
                }, null, 8, ["value"]),
                R(T(ve), {
                  title: "Total Conversations",
                  value: T(oe)(v.value)
                }, null, 8, ["value"]),
                R(T(ve), {
                  title: "Total Cost",
                  value: T(Be)(g.value)
                }, null, 8, ["value"]),
                R(T(ve), {
                  title: "Avg Cost / Conv.",
                  value: T(Be)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (p(), k("section", Ek, [
              u("div", Ok, [
                u("div", Vk, [
                  R(T(et), { class: "empty-icon" })
                ]),
                x[0] || (x[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                x[1] || (x[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Wk = /* @__PURE__ */ me(Nk, [["__scopeId", "data-v-49068ad7"]]);
function Hk(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function jk(e, t) {
  return p(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Yk = ["aria-label"], Kk = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Uk = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, qk = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Xk = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Gk = { class: "truncate" }, Zk = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, Qk = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Jk = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, e2 = ["aria-label", "onClick"], t2 = ["aria-label", "onClick"], n2 = ["aria-label"], a2 = ["aria-label"], s2 = {
  key: 1,
  class: "space-y-2"
}, o2 = ["for"], i2 = ["id", "placeholder", "onKeydown"], l2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, r2 = ["aria-label"], c2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, d2 = ["checked", "onChange"], u2 = { class: "min-w-0 flex-1" }, h2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, f2 = { class: "flex flex-wrap items-end gap-2" }, g2 = { class: "min-w-[120px] flex-1" }, m2 = ["for"], p2 = ["id"], b2 = { class: "min-w-[120px] flex-1" }, v2 = ["for"], y2 = ["id"], x2 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = Qa(), i = `${`kiut-filters-${Ke()}`}-panel`, l = ae(null), r = /* @__PURE__ */ new Map(), c = ae(null), d = ae(!1), h = ae({}), m = ae(null), v = ae(""), g = ae([]), y = ae(""), b = ae(""), f = $(() => c.value ? n.filterDefinitions.find((E) => E.id === c.value) ?? null : null), _ = $(() => {
      const E = f.value;
      if (E)
        return E.type === "text" ? v.value : E.type === "select" ? g.value : { start: y.value, end: b.value };
    });
    function x(E, j) {
      j && j instanceof HTMLElement ? r.set(E, j) : r.delete(E);
    }
    function w(E) {
      return n.modelValue[E];
    }
    function C(E) {
      if (E == null) return [];
      if (Array.isArray(E))
        return E.filter((j) => typeof j == "string" && j.trim() !== "");
      if (typeof E == "string") {
        const j = E.trim();
        return j ? [j] : [];
      }
      return [];
    }
    function S(E, j) {
      if (j == null) return !0;
      if (E.type === "text") return String(j).trim() === "";
      if (E.type === "select") return C(j).length === 0;
      if (E.type === "dateRange") {
        const Z = j;
        return !Z?.start?.trim() || !Z?.end?.trim();
      }
      return !0;
    }
    const M = $(
      () => n.filterDefinitions.some((E) => !S(E, w(E.id)))
    ), O = $(() => {
      const E = [];
      for (const j of n.filterDefinitions) {
        const Z = w(j.id);
        if (!S(j, Z)) {
          if (j.type === "text")
            E.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            E.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const he of C(Z))
              E.push({
                kind: "select",
                def: j,
                optionValue: he,
                key: `${j.id}::${he}`
              });
        }
      }
      return E;
    });
    function A(E) {
      return E.type !== "select" ? 0 : C(w(E.id)).length;
    }
    function P(E) {
      const j = w(E.id), Z = E.label.replace(/^\+\s*/, "");
      if (E.type === "text") return `${Z}: ${String(j ?? "").trim()}`;
      if (E.type === "select") {
        const Pt = C(j).map((gt) => E.options.find((bn) => bn.value === gt)?.label ?? gt);
        return `${Z}: ${Pt.join(", ")}`;
      }
      const he = j, $e = F(he.start), Ne = F(he.end);
      return `${Z}: ${$e} – ${Ne}`;
    }
    function B(E) {
      return E.kind === "text" || E.kind === "dateRange" ? P(E.def) : E.def.options.find((Z) => Z.value === E.optionValue)?.label ?? E.optionValue;
    }
    function F(E) {
      if (!E) return "";
      const j = He(E, "YYYY-MM-DD", !0);
      return j.isValid() ? j.format("L") : E;
    }
    function X(E) {
      const j = c.value === E.id && d.value, Z = !S(E, w(E.id));
      return j || Z ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function te(E) {
      return S(E, w(E.id)) ? H(E) : `Editar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function U(E) {
      const j = w(E.id);
      if (E.type === "text") {
        v.value = j != null ? String(j) : "";
        return;
      }
      if (E.type === "select") {
        g.value = [...C(j)];
        return;
      }
      const Z = j;
      y.value = Z?.start?.trim() ?? "", b.value = Z?.end?.trim() ?? "";
    }
    function le() {
      const E = f.value;
      if (!E || E.type !== "select") return;
      const j = { ...n.modelValue };
      g.value.length === 0 ? delete j[E.id] : j[E.id] = [...g.value], a("update:modelValue", j), a("change", j);
    }
    function ce(E) {
      const j = g.value.indexOf(E);
      j >= 0 ? g.value = g.value.filter((Z, he) => he !== j) : g.value = [...g.value, E], le();
    }
    function G(E) {
      if (!E) return;
      m.value = E;
      const j = E.getBoundingClientRect(), Z = 300;
      let he = j.left;
      const $e = window.innerWidth - Z - 12;
      he > $e && (he = Math.max(12, $e)), he < 12 && (he = 12);
      const Ne = j.bottom + 8;
      h.value = {
        top: `${Ne}px`,
        left: `${he}px`,
        width: `${Math.min(Z, window.innerWidth - 24)}px`
      };
    }
    function de(E, j) {
      if (c.value === E.id && d.value) {
        xe();
        return;
      }
      d.value && c.value !== E.id && xe(), c.value = E.id, d.value = !0, U(E), We().then(async () => {
        G(j.currentTarget), await We(), J();
      });
    }
    function N(E, j) {
      if (c.value === E.id && d.value) {
        xe();
        return;
      }
      d.value && c.value !== E.id && xe(), c.value = E.id, d.value = !0, U(E), We().then(async () => {
        const Z = r.get(E.id) ?? j.currentTarget;
        G(Z), await We(), J();
      });
    }
    function J() {
      const E = l.value;
      if (!E) return;
      E.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function se() {
      d.value = !1, c.value = null, m.value = null;
    }
    function ge(E) {
      const j = f.value;
      if (!j) return;
      if (j.type === "text") {
        v.value = E != null ? String(E) : "";
        return;
      }
      if (j.type === "select") {
        g.value = Array.isArray(E) ? E.filter((he) => typeof he == "string") : C(E);
        return;
      }
      const Z = E;
      y.value = Z?.start?.trim() ?? "", b.value = Z?.end?.trim() ?? "";
    }
    function xe() {
      const E = f.value;
      if (!E) return;
      if (E.type === "text") {
        const $e = v.value.trim(), Ne = { ...n.modelValue };
        $e === "" ? delete Ne[E.id] : Ne[E.id] = $e, a("update:modelValue", Ne), a("change", Ne), se();
        return;
      }
      if (E.type === "select") {
        le(), se();
        return;
      }
      const j = y.value.trim(), Z = b.value.trim(), he = { ...n.modelValue };
      !j || !Z || j > Z ? delete he[E.id] : he[E.id] = { start: j, end: Z }, a("update:modelValue", he), a("change", he), se();
    }
    function Y(E) {
      const j = { ...n.modelValue };
      delete j[E], a("update:modelValue", j), a("change", j), c.value === E && se();
    }
    function q(E) {
      if (E.kind === "text" || E.kind === "dateRange") {
        Y(E.def.id);
        return;
      }
      const j = { ...n.modelValue }, he = C(j[E.def.id]).filter(($e) => $e !== E.optionValue);
      he.length === 0 ? delete j[E.def.id] : j[E.def.id] = he, a("update:modelValue", j), a("change", j), c.value === E.def.id && U(E.def);
    }
    function W() {
      const E = {};
      a("update:modelValue", E), a("change", E), se();
    }
    const K = $(() => {
      const E = f.value;
      return E ? `Editar filtro: ${E.label}` : "Filtro";
    });
    function I(E) {
      const j = E.def.label.replace(/^\+\s*/, "");
      return E.kind === "select" ? `Quitar ${E.def.options.find(($e) => $e.value === E.optionValue)?.label ?? E.optionValue} del filtro ${j}` : `Quitar filtro ${j}`;
    }
    function V(E) {
      const j = E.def.label.replace(/^\+\s*/, "");
      if (E.kind === "select") {
        const he = E.def.options.find(($e) => $e.value === E.optionValue)?.label ?? E.optionValue;
        return `Editar filtro ${j}: ${he}`;
      }
      return `Editar filtro ${j}`;
    }
    function H(E) {
      return `Añadir filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    const ne = $(() => n.clearLabel);
    function ue(E) {
      if (!d.value || !l.value) return;
      const j = E.target;
      if (!(l.value.contains(j) || (j instanceof Element ? j : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const he of r.values())
          if (he?.contains(j)) return;
        xe();
      }
    }
    function ye(E) {
      E.key === "Escape" && d.value && (E.preventDefault(), se());
    }
    function pe() {
      !d.value || !m.value || G(m.value);
    }
    return Je(() => {
      document.addEventListener("mousedown", ue, !0), window.addEventListener("keydown", ye, !0), window.addEventListener("resize", pe);
    }), ei(() => {
      document.removeEventListener("mousedown", ue, !0), window.removeEventListener("keydown", ye, !0), window.removeEventListener("resize", pe);
    }), Fe(
      () => n.modelValue,
      () => {
        const E = f.value;
        E && d.value && !s.panel && U(E);
      },
      { deep: !0 }
    ), (E, j) => (p(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", Kk, [
        u("span", Uk, D(e.label), 1),
        u("div", qk, [
          (p(!0), k(ie, null, fe(e.filterDefinitions, (Z) => (p(), k("button", {
            key: `pill-${Z.id}`,
            ref_for: !0,
            ref: (he) => x(Z.id, he),
            type: "button",
            class: Q(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", X(Z)]),
            "aria-label": te(Z),
            "aria-expanded": c.value === Z.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === Z.id ? i : void 0,
            onClick: (he) => N(Z, he)
          }, [
            R(T(Hk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", Gk, D(Z.label), 1),
            Z.type === "select" && A(Z) > 0 ? (p(), k("span", Zk, D(A(Z)), 1)) : z("", !0)
          ], 10, Xk))), 128))
        ])
      ]),
      M.value ? (p(), k("div", Qk, [
        u("div", Jk, [
          (p(!0), k(ie, null, fe(O.value, (Z) => (p(), k("div", {
            key: Z.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": V(Z),
              onClick: (he) => de(Z.def, he)
            }, [
              Se(E.$slots, "formatChip", {
                filter: Z.def,
                value: w(Z.def.id),
                optionValue: Z.kind === "select" ? Z.optionValue : void 0
              }, () => [
                Ae(D(B(Z)), 1)
              ], !0)
            ], 8, e2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": I(Z),
              onClick: (he) => q(Z)
            }, [
              R(T(jk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, t2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": ne.value,
          onClick: W
        }, D(e.clearLabel), 9, n2)
      ])) : z("", !0),
      (p(), ee(_a, { to: "body" }, [
        c.value && d.value ? (p(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": K.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Te(h.value),
          onKeydown: j[3] || (j[3] = Qe(() => {
          }, ["stop"]))
        }, [
          f.value ? (p(), k(ie, { key: 0 }, [
            E.$slots.panel ? Se(E.$slots, "panel", {
              key: 0,
              filter: f.value,
              close: xe,
              value: _.value,
              updateValue: ge
            }, void 0, !0) : (p(), k("div", s2, [
              f.value.type === "text" ? (p(), k(ie, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(f.value.label), 9, o2),
                it(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (Z) => v.value = Z),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: f.value.placeholder ?? "…",
                  onKeydown: In(Qe(xe, ["prevent"]), ["enter"])
                }, null, 40, i2), [
                  [tn, v.value]
                ])
              ], 64)) : f.value.type === "select" ? (p(), k(ie, { key: 1 }, [
                u("p", l2, D(f.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": f.value.label,
                  "aria-multiselectable": !0
                }, [
                  (p(!0), k(ie, null, fe(f.value.options, (Z) => (p(), k("li", {
                    key: Z.value
                  }, [
                    u("label", c2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(Z.value),
                        onChange: (he) => ce(Z.value)
                      }, null, 40, d2),
                      u("span", u2, D(Z.label), 1)
                    ])
                  ]))), 128))
                ], 8, r2)
              ], 64)) : f.value.type === "dateRange" ? (p(), k(ie, { key: 2 }, [
                u("p", h2, D(f.value.label), 1),
                u("div", f2, [
                  u("div", g2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, m2),
                    it(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (Z) => y.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, p2), [
                      [tn, y.value]
                    ])
                  ]),
                  u("div", b2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, v2),
                    it(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (Z) => b.value = Z),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, y2), [
                      [tn, b.value]
                    ])
                  ])
                ])
              ], 64)) : z("", !0)
            ]))
          ], 64)) : z("", !0)
        ], 44, a2)) : z("", !0)
      ]))
    ], 8, Yk));
  }
}), _2 = /* @__PURE__ */ me(x2, [["__scopeId", "data-v-f38e0100"]]), k2 = { class: "font-sans" }, w2 = ["for"], C2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], $2 = ["id"], M2 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = ka(), o = ti("$pcForm", null), i = `kiut-input-text-${Ke()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? s.name ?? ""), d = ae(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (f) => {
        d.value = f ?? "";
      }
    ), Je(() => {
      o && c.value && o.register?.(c.value, {});
    }), ft(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const h = $(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? d.value : d.value), m = $(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(f) {
      const _ = f.target.value;
      d.value = _, a("update:modelValue", _);
      const x = o?.fields?.[c.value]?.props;
      x?.onInput && x.onInput(f);
    }
    function g(f) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(f);
    }
    function y(f) {
      const _ = o?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(f);
    }
    const b = $(() => {
      const { name: f, id: _, type: x, ...w } = s;
      return w;
    });
    return (f, _) => (p(), k("div", k2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ot))
      }, D(e.label), 11, w2)) : z("", !0),
      u("input", nn(b.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [T(ht), m.value ? T(Bt) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": m.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: g,
        onBlur: y
      }), null, 16, C2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, $2)) : z("", !0)
    ]));
  }
}), S2 = { class: "font-sans" }, D2 = ["for"], T2 = { class: "relative" }, A2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], B2 = ["aria-label"], L2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, P2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, I2 = ["id"], R2 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = ka(), o = ti("$pcForm", null), i = `kiut-input-password-${Ke()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? s.name ?? ""), d = ae(!1), h = ae(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (_) => {
        _ !== void 0 && _ !== h.value && (h.value = _);
      }
    ), Je(() => {
      o && c.value && o.register?.(c.value, {});
    }), ft(() => {
      o && c.value && o.deregister?.(c.value);
    });
    const m = $(() => o && c.value ? o.fields?.[c.value]?.states?.value ?? h.value : h.value), v = $(() => o && c.value ? o.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(_) {
      const x = _.target.value;
      h.value = x, a("update:modelValue", x);
      const w = o?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(_);
    }
    function y(_) {
      const x = o?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(_);
    }
    function b(_) {
      const x = o?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(_);
    }
    const f = $(() => {
      const { name: _, id: x, ...w } = s;
      return w;
    });
    return (_, x) => (p(), k("div", S2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ot))
      }, D(e.label), 11, D2)) : z("", !0),
      u("div", T2, [
        u("input", nn(f.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(ht), v.value ? T(Bt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: m.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: g,
          onChange: y,
          onBlur: b
        }), null, 16, A2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: x[0] || (x[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (p(), k("svg", P2, [...x[2] || (x[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (p(), k("svg", L2, [...x[1] || (x[1] = [
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
        ], 8, B2)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, I2)) : z("", !0)
    ]));
  }
}), F2 = { class: "font-sans" }, E2 = ["for"], O2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], V2 = ["id"], z2 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-input-textarea-${Ke()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (p(), k("div", F2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ot))
      }, D(e.label), 11, E2)) : z("", !0),
      it(u("textarea", {
        id: o.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: Q([T(ry), e.invalid ? T(Bt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, O2), [
        [tn, l.value]
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, V2)) : z("", !0)
    ]));
  }
}), N2 = { class: "font-sans" }, W2 = ["for"], H2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], j2 = ["for"], Y2 = ["title"], K2 = ["aria-label"], U2 = ["id"], q2 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-input-file-${Ke()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = ae(null), r = $(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, m) => (p(), k("div", N2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ot))
      }, D(e.label), 11, W2)) : z("", !0),
      u("div", {
        class: Q([
          T(ht),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(Bt) : "",
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
        }, null, 40, H2),
        u("label", {
          for: o.value,
          class: Q(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          R(T($m), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + D(e.chooseLabel), 1)
        ], 10, j2),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, Y2),
        e.modelValue && !e.disabled ? (p(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          R(T(el), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, K2)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, U2)) : z("", !0)
    ]));
  }
}), X2 = { class: "font-sans" }, G2 = ["for"], Z2 = { class: "relative" }, Q2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], J2 = ["id"], ew = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-input-datetime-${Ke()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (p(), k("div", X2, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ot))
      }, D(e.label), 11, G2)) : z("", !0),
      u("div", Z2, [
        R(T(xs), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: Q([
            T(ht),
            "pl-10",
            e.invalid ? T(Bt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, Q2)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, J2)) : z("", !0)
    ]));
  }
}), tw = { class: "font-sans" }, nw = ["for"], aw = { class: "relative" }, sw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], ow = ["id"], iw = /* @__PURE__ */ re({
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
      const v = Number(m[1]), g = Number(m[2]);
      return !Number.isInteger(v) || !Number.isInteger(g) || v < 0 || v > 23 || g < 0 || g > 59 ? null : `${String(v).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Ke()}`, l = $(() => s.id ?? i), r = $(() => `${l.value}-err`), c = $(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function d(h) {
      const m = h.target.value;
      o("update:modelValue", a(m));
    }
    return (h, m) => (p(), k("div", tw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ot))
      }, D(e.label), 11, nw)) : z("", !0),
      u("div", aw, [
        R(T(Sm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Q([
            T(ht),
            "pl-10",
            e.invalid ? T(Bt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, sw)
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, ow)) : z("", !0)
    ]));
  }
}), lw = { class: "font-sans" }, rw = ["for"], cw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, dw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], uw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, hw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, fw = { class: "min-w-0 text-left leading-snug" }, gw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, mw = { class: "min-w-0 text-right leading-snug" }, pw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, bw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, vw = ["id"], yw = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-input-range-${Ke()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => {
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
    function m(v) {
      const g = Number(v.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (v, g) => (p(), k("div", lw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ot))
      }, D(e.label), 11, rw)) : z("", !0),
      u("div", {
        class: Q(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (p(), k("p", cw, D(e.captionMax), 1)) : z("", !0),
        u("div", {
          class: Q(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Te(h.value)
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
            onInput: m
          }, null, 42, dw)
        ], 6),
        e.orientation === "horizontal" && r.value ? (p(), k("p", uw, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (p(), k("div", hw, [
          u("span", fw, D(e.captionMin), 1),
          u("span", gw, D(e.caption), 1),
          u("span", mw, D(e.captionMax), 1)
        ])) : z("", !0),
        e.orientation === "vertical" && e.captionMin ? (p(), k("p", pw, D(e.captionMin), 1)) : z("", !0),
        e.orientation === "vertical" && e.caption ? (p(), k("p", bw, D(e.caption), 1)) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, vw)) : z("", !0)
    ]));
  }
}), xw = /* @__PURE__ */ me(yw, [["__scopeId", "data-v-a1343418"]]), _w = { class: "font-sans" }, kw = ["for"], ww = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Cw = ["id"], $w = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-input-number-${Ke()}`, o = $(() => n.id ?? s), i = $(() => `${o.value}-err`), l = $(() => {
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
      const m = Number(h);
      a("update:modelValue", Number.isNaN(m) ? null : m);
    }
    return (d, h) => (p(), k("div", _w, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ot))
      }, D(e.label), 11, kw)) : z("", !0),
      u("input", {
        id: o.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: Q([
          T(ht),
          e.invalid ? T(Bt) : "",
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
      }, null, 42, ww),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, Cw)) : z("", !0)
    ]));
  }
}), Mw = { class: "font-sans" }, Sw = ["for"], Dw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Tw = ["disabled"], Aw = ["id"], Bw = "#3b82f6", Lw = "#aabbcc", Pw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Iw = /* @__PURE__ */ re({
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
        const [_, x, w] = f[1].split("");
        return `#${_}${_}${x}${x}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? Bw;
    }
    const s = e, o = t, i = `kiut-input-color-${Ke()}`, l = $(() => s.id ?? i), r = $(() => `${l.value}-err`), c = $(() => a(s.modelValue)), d = ae(c.value), h = ae(!1);
    Fe(c, (g) => {
      h.value || (d.value = g);
    });
    function m(g) {
      const y = g.target, b = n(y.value);
      b && o("update:modelValue", b);
    }
    function v() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, o("update:modelValue", g)) : d.value = c.value;
    }
    return Fe(d, (g) => {
      if (!h.value) return;
      const y = n(g);
      y && o("update:modelValue", y);
    }), (g, y) => (p(), k("div", Mw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: l.value,
        class: Q(T(ot))
      }, D(e.label), 11, Sw)) : z("", !0),
      u("div", {
        class: Q([
          Pw,
          e.invalid ? T(Bt) : "",
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
          onInput: m
        }, null, 40, Dw),
        e.showHexInput ? it((p(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (b) => d.value = b),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Lw,
          onFocus: y[1] || (y[1] = (b) => h.value = !0),
          onBlur: v
        }, null, 40, Tw)), [
          [tn, d.value]
        ]) : z("", !0)
      ], 2),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: r.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, Aw)) : z("", !0)
    ]));
  }
}), Rw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Fw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Ew = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Ow = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, Vw = { class: "truncate" }, zw = ["aria-selected", "onClick", "onMouseenter"], Nw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Ww = { class: "min-w-0 flex-1" }, Hw = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-multiselect-${Ke()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, r = ae(null), c = ae(null), d = ae(!1), h = ae(0), m = $(() => n.options.filter((P) => !P.disabled)), v = $(() => new Set(n.modelValue ?? [])), g = $(
      () => n.options.filter((P) => v.value.has(P.value))
    ), y = $(() => {
      const P = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", B = g.value.length;
      return B === 0 ? P : `${P}, ${B} seleccionada${B === 1 ? "" : "s"}`;
    });
    function b(P) {
      return `${String(P.value)}-${P.label}`;
    }
    function f(P) {
      return v.value.has(P.value);
    }
    function _(P, B) {
      const F = f(P), X = h.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        F ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !F && X ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function x(P) {
      const B = [...n.modelValue ?? []], F = B.indexOf(P.value);
      F >= 0 ? B.splice(F, 1) : B.push(P.value), a("update:modelValue", B);
    }
    function w() {
      const P = m.value;
      if (P.length === 0) {
        h.value = 0;
        return;
      }
      const B = v.value, F = P.findIndex((X) => B.has(X.value));
      h.value = F >= 0 ? F : 0;
    }
    function C() {
      n.disabled || (d.value = !d.value);
    }
    function S(P) {
      P.stopPropagation(), !n.disabled && (C(), d.value && (w(), We(() => c.value?.focus())));
    }
    function M(P) {
      if (!d.value) return;
      const B = r.value;
      B && !B.contains(P.target) && (d.value = !1);
    }
    function O(P) {
      n.disabled || (P.key === "ArrowDown" || P.key === "Enter" || P.key === " ") && (P.preventDefault(), d.value || (d.value = !0, w(), We(() => c.value?.focus())));
    }
    function A(P) {
      const B = m.value;
      if (B.length !== 0) {
        if (P.key === "Escape") {
          P.preventDefault(), d.value = !1;
          return;
        }
        if (P.key === "ArrowDown") {
          P.preventDefault(), h.value = Math.min(h.value + 1, B.length - 1);
          return;
        }
        if (P.key === "ArrowUp") {
          P.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (P.key === "Enter" || P.key === " ") {
          P.preventDefault();
          const F = B[h.value];
          F && x(F);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", M);
    }), ft(() => {
      document.removeEventListener("click", M);
    }), (P, B) => (p(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ot))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Q([
          T(ht),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: S,
        onKeydown: O
      }, [
        u("div", Fw, [
          g.value.length === 0 ? (p(), k("span", Ew, D(e.placeholder), 1)) : (p(), k("div", Ow, [
            (p(!0), k(ie, null, fe(g.value, (F) => (p(), k("span", {
              key: b(F),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", Vw, D(F.label), 1)
            ]))), 128))
          ]))
        ]),
        R(T(_s), {
          class: Q(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Rw),
      it(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Qe(A, ["stop"])
      }, [
        (p(!0), k(ie, null, fe(m.value, (F, X) => (p(), k("li", {
          key: b(F),
          role: "option",
          "aria-selected": f(F),
          class: Q(_(F, X)),
          onClick: Qe((te) => x(F), ["stop"]),
          onMouseenter: (te) => h.value = X
        }, [
          u("span", Nw, [
            f(F) ? (p(), ee(T(ll), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : z("", !0)
          ]),
          u("span", Ww, D(F.label), 1)
        ], 42, zw))), 128))
      ], 544), [
        [jn, d.value]
      ])
    ], 512));
  }
}), jw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Yw = { class: "sr-only" }, Kw = /* @__PURE__ */ re({
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
    return (o, i) => (p(), k("button", {
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
        In(Qe(s, ["prevent", "stop"]), ["space"]),
        In(Qe(s, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: Q(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", Yw, D(e.ariaLabel), 1)
    ], 42, jw));
  }
}), Uw = { class: "font-sans" }, qw = ["for"], Xw = { class: "flex gap-2" }, Gw = { class: "w-[7.5rem] shrink-0" }, Zw = { class: "min-w-0 flex-1" }, Qw = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Jw = ["id"], e5 = /* @__PURE__ */ re({
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
    const n = e, a = t, s = `kiut-phone-${Ke()}`, o = $(() => n.id ?? `${s}-num`), i = $(() => `${o.value}-err`), l = $({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = $({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (p(), k("div", Uw, [
      e.label ? (p(), k("label", {
        key: 0,
        for: o.value,
        class: Q(T(ot))
      }, D(e.label), 11, qw)) : z("", !0),
      u("div", Xw, [
        u("div", Gw, [
          R(ks, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", Zw, [
          it(u("input", {
            id: o.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Q([T(ht), e.invalid ? T(Bt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, Qw), [
            [tn, r.value]
          ])
        ])
      ]),
      e.errorText ? (p(), k("p", {
        key: 1,
        id: i.value,
        class: Q(T(wt)),
        role: "alert"
      }, D(e.errorText), 11, Jw)) : z("", !0)
    ]));
  }
}), t5 = ["role", "aria-label"], n5 = { class: "flex flex-wrap gap-2" }, a5 = ["aria-checked", "role", "onClick"], s5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, o5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, i5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, l5 = /* @__PURE__ */ re({
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
    return (r, c) => (p(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", n5, [
        (p(!0), k(ie, null, fe(e.items, (d) => (p(), k("button", {
          key: d.value,
          type: "button",
          class: Q(i(d)),
          "aria-checked": o(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", s5, [
            o(d) ? (p(), k("span", o5)) : z("", !0)
          ]),
          d.dotColor ? (p(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Te({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          u("span", i5, D(d.label), 1)
        ], 10, a5))), 128))
      ])
    ], 8, t5));
  }
}), r5 = ["aria-label"], c5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], d5 = { class: "truncate px-3 py-2 text-sm font-medium" }, u5 = /* @__PURE__ */ re({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Ke()}`, o = (y) => `${s}-seg-${y}`, i = ae([]);
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
    const m = $(
      () => n.items.map((y, b) => y.disabled ? -1 : b).filter((y) => y >= 0)
    );
    function v(y, b) {
      const f = n.items.length;
      if (f === 0) return 0;
      let _ = y;
      for (let x = 0; x < f; x++)
        if (_ = (_ + b + f) % f, !n.items[_]?.disabled) return _;
      return y;
    }
    function g(y, b) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const f = v(b, 1), _ = n.items[f];
        _ && d(_), We(() => i.value[f]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const f = v(b, -1), _ = n.items[f];
        _ && d(_), We(() => i.value[f]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const f = m.value[0];
        if (f !== void 0) {
          const _ = n.items[f];
          _ && d(_), We(() => i.value[f]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const f = m.value[m.value.length - 1];
        if (f !== void 0) {
          const _ = n.items[f];
          _ && d(_), We(() => i.value[f]?.focus());
        }
      }
    }
    return (y, b) => (p(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (p(!0), k(ie, null, fe(e.items, (f, _) => (p(), k("button", {
        id: o(f.value),
        key: f.value,
        ref_for: !0,
        ref: (x) => l(x, _),
        type: "button",
        role: "tab",
        "aria-selected": r(f),
        "aria-disabled": f.disabled === !0,
        tabindex: r(f) ? 0 : -1,
        class: Q(c(f)),
        onClick: (x) => h(f, _),
        onKeydown: (x) => g(x, _)
      }, [
        u("span", d5, D(f.label), 1)
      ], 42, c5))), 128))
    ], 8, r5));
  }
}), h5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, f5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, g5 = {
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
}, m5 = {
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
}, p5 = [
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
function b5(e = "en") {
  return h5[e];
}
function hl(e = "en") {
  return p5.map((t) => ({ id: t, label: m5[e][t] }));
}
function v5(e = "en") {
  return "Presets";
}
hl("es");
function Xe(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function at(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function Oe(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Tt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Hn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function y5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Oe(n);
}
function Mn(e, t) {
  return y5(e, -t);
}
function x5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function fl(e, t = /* @__PURE__ */ new Date()) {
  const n = Oe(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Mn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Mn(n, 6), end: n };
    case "last14":
      return { start: Mn(n, 13), end: n };
    case "last30":
      return { start: Mn(n, 29), end: n };
    case "last90":
      return { start: Mn(n, 89), end: n };
    case "thisMonth":
      return { start: Tt(n), end: n };
    case "lastMonth": {
      const a = Tt(Hn(n, -1));
      return { start: a, end: x5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function gl(e, t, n) {
  let a = Oe(e.start), s = Oe(e.end);
  if (t) {
    const o = Oe(Xe(t));
    Wt(a, o) && (a = o), Wt(s, o) && (s = o);
  }
  if (n) {
    const o = Oe(Xe(n));
    Wa(a, o) && (a = o), Wa(s, o) && (s = o);
  }
  return Wa(a, s) ? { start: s, end: a } : { start: a, end: s };
}
function _5(e, t, n = /* @__PURE__ */ new Date(), a, s) {
  if (!e.start || !e.end) return !1;
  const o = gl(fl(t, n), a, s);
  return at(o.start) === e.start && at(o.end) === e.end;
}
function Kn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Vt(e, t) {
  return Kn(e, t) === 0;
}
function Wt(e, t) {
  return Kn(e, t) < 0;
}
function Wa(e, t) {
  return Kn(e, t) > 0;
}
function ml(e, t) {
  return Kn(e, t) >= 0;
}
function pl(e, t) {
  return Kn(e, t) <= 0;
}
function bl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
function xa(e, t = "en") {
  return `${f5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function zt(e, t = "en") {
  return `${g5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const k5 = ["aria-expanded", "aria-labelledby", "aria-label"], w5 = ["onKeydown"], C5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, $5 = { class: "mb-4 flex items-center justify-between gap-2" }, M5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, S5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, D5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, T5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, A5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, B5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, L5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, P5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, I5 = ["disabled", "onClick"], R5 = "rounded-lg text-[#61616b]", F5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", E5 = "opacity-30", O5 = "bg-[#6b35e9] font-medium text-white", V5 = "bg-[#895af6] font-semibold text-white", z5 = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `${`kiut-drp-${Ke()}`}-lbl`, i = ae(null), l = ae(null), r = ae(!1), c = ae(null), d = ae(Tt(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), m = $(() => {
      const B = Tt(d.value);
      return [B, Hn(B, 1)];
    }), v = $(() => n.ariaLabel ?? n.placeholder), g = $(() => {
      const B = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${B}` : `left-0 right-auto ${B}`;
    }), y = $(
      () => `${zt(m.value[0])} – ${zt(m.value[1])}`
    ), b = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], f = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const B = Xe(n.modelValue.start), F = Xe(n.modelValue.end);
      return `${xa(B)} – ${xa(F)}`;
    });
    function _(B, F) {
      return B.getMonth() === F.getMonth() && B.getFullYear() === F.getFullYear();
    }
    function x(B) {
      const F = Oe(B);
      if (n.minDate) {
        const X = Oe(Xe(n.minDate));
        if (Wt(F, X)) return !0;
      }
      if (n.maxDate) {
        const X = Oe(Xe(n.maxDate));
        if (Wt(X, F)) return !0;
      }
      return !1;
    }
    function w(B, F, X) {
      const te = Vt(B, F), U = Vt(B, X);
      if (te && U) return "rounded-lg";
      const le = te || B.getDay() === 0, ce = U || B.getDay() === 6;
      return le && ce ? "rounded-lg" : le ? "rounded-l-lg" : ce ? "rounded-r-lg" : "rounded-none";
    }
    function C(B, F) {
      const X = _(F, B), te = x(F), U = n.modelValue.start ? Oe(Xe(n.modelValue.start)) : null, le = n.modelValue.end ? Oe(Xe(n.modelValue.end)) : null, ce = Oe(F);
      if (te)
        return R5;
      let G = F5;
      if (U && le && ml(ce, U) && pl(ce, le)) {
        const N = Vt(ce, U), J = Vt(ce, le);
        G = `${w(ce, U, le)} ${N || J ? V5 : O5}`;
      }
      return X || (G = `${G} ${E5}`), G;
    }
    function S(B) {
      if (x(B)) return;
      const F = Oe(B);
      if (!c.value) {
        c.value = new Date(F), a("update:modelValue", { start: at(F), end: at(F) });
        return;
      }
      let te = Oe(c.value), U = new Date(F);
      Wt(U, te) && ([te, U] = [U, te]), a("update:modelValue", { start: at(te), end: at(U) }), c.value = null, r.value = !1;
    }
    function M(B) {
      d.value = Hn(d.value, B);
    }
    function O() {
      r.value = !1;
    }
    function A(B) {
      if (B?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = Tt(Xe(n.modelValue.start));
          } catch {
          }
        We(() => l.value?.focus());
      }
    }
    function P(B) {
      if (!r.value) return;
      const F = i.value;
      F && !F.contains(B.target) && (r.value = !1);
    }
    return Fe(r, (B) => {
      B && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", P);
    }), ft(() => {
      document.removeEventListener("click", P);
    }), (B, F) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ot))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: Q([
          T(ht),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: A,
        onClick: A
      }, [
        R(T(xs), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(f.value), 3)
      ], 42, k5),
      it(u("div", {
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
        onKeydown: In(Qe(O, ["stop"]), ["escape"])
      }, [
        u("div", C5, [
          u("div", $5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: F[0] || (F[0] = (X) => M(-1))
            }, [
              R(T(Qi), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", M5, [
              u("span", S5, D(y.value), 1),
              u("div", D5, [
                u("span", T5, D(T(zt)(m.value[0])), 1),
                u("span", A5, D(T(zt)(m.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: F[1] || (F[1] = (X) => M(1))
            }, [
              R(T(Ji), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", B5, [
            (p(!0), k(ie, null, fe(m.value, (X) => (p(), k("div", {
              key: `${X.getFullYear()}-${X.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", L5, [
                (p(), k(ie, null, fe(b, (te) => u("span", { key: te }, D(te), 1)), 64))
              ]),
              u("div", P5, [
                (p(!0), k(ie, null, fe(T(bl)(X), (te) => (p(), k("button", {
                  key: T(at)(te),
                  type: "button",
                  disabled: x(te),
                  class: Q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", C(X, te)]),
                  onClick: (U) => S(te)
                }, D(te.getDate()), 11, I5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, w5), [
        [jn, r.value]
      ])
    ], 512));
  }
}), N5 = ["aria-expanded", "aria-labelledby", "aria-label"], W5 = ["aria-label", "onKeydown"], H5 = { class: "flex flex-col sm:flex-row" }, j5 = ["aria-label"], Y5 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, K5 = { class: "flex flex-col gap-0.5" }, U5 = ["onClick"], q5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, X5 = { class: "mb-4 flex items-center justify-between gap-2" }, G5 = ["aria-label"], Z5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, Q5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, J5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, eC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, tC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, nC = ["aria-label"], aC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, sC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, oC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, iC = ["disabled", "onClick"], lC = "rounded-lg text-[#61616b]", rC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", cC = "opacity-30", dC = "bg-[#6b35e9] font-medium text-white", uC = "bg-[#895af6] font-semibold text-white", hC = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `${`kiut-dpp-${Ke()}`}-lbl`, i = ae(null), l = ae(null), r = ae(!1), c = ae(null), d = ae(Tt(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), m = $(() => {
      const N = Tt(d.value);
      return [N, Hn(N, 1)];
    }), v = $(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = $(() => n.ariaLabel ?? v.value), y = $(() => hl(n.locale)), b = $(() => v5(n.locale)), f = $(() => b5(n.locale)), _ = $(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), x = $(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = $(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), C = $(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = $(() => {
      const N = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${N}` : `left-0 right-auto ${N}`;
    }), M = $(
      () => `${zt(m.value[0], n.locale)} – ${zt(m.value[1], n.locale)}`
    ), O = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const N = Xe(n.modelValue.start), J = Xe(n.modelValue.end);
      return `${xa(N, n.locale)} – ${xa(J, n.locale)}`;
    });
    function A(N, J) {
      return N.getMonth() === J.getMonth() && N.getFullYear() === J.getFullYear();
    }
    function P(N) {
      const J = Oe(N);
      if (n.minDate) {
        const se = Oe(Xe(n.minDate));
        if (Wt(J, se)) return !0;
      }
      if (n.maxDate) {
        const se = Oe(Xe(n.maxDate));
        if (Wt(se, J)) return !0;
      }
      return !1;
    }
    function B(N, J, se) {
      const ge = Vt(N, J), xe = Vt(N, se);
      if (ge && xe) return "rounded-lg";
      const Y = ge || N.getDay() === 0, q = xe || N.getDay() === 6;
      return Y && q ? "rounded-lg" : Y ? "rounded-l-lg" : q ? "rounded-r-lg" : "rounded-none";
    }
    function F(N) {
      const J = _5(
        n.modelValue,
        N,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), se = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return J ? `${se} font-medium` : se;
    }
    function X(N, J) {
      const se = A(J, N), ge = P(J), xe = n.modelValue.start ? Oe(Xe(n.modelValue.start)) : null, Y = n.modelValue.end ? Oe(Xe(n.modelValue.end)) : null, q = Oe(J);
      if (ge)
        return lC;
      let W = rC;
      if (xe && Y && ml(q, xe) && pl(q, Y)) {
        const I = Vt(q, xe), V = Vt(q, Y);
        W = `${B(q, xe, Y)} ${I || V ? uC : dC}`;
      }
      return se || (W = `${W} ${cC}`), W;
    }
    function te(N) {
      const J = gl(fl(N), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: at(J.start),
        end: at(J.end)
      }), d.value = Tt(J.start), c.value = null, r.value = !1;
    }
    function U(N) {
      if (P(N)) return;
      const J = Oe(N);
      if (!c.value) {
        c.value = new Date(J), a("update:modelValue", { start: at(J), end: at(J) });
        return;
      }
      let ge = Oe(c.value), xe = new Date(J);
      Wt(xe, ge) && ([ge, xe] = [xe, ge]), a("update:modelValue", { start: at(ge), end: at(xe) }), c.value = null, r.value = !1;
    }
    function le(N) {
      d.value = Hn(d.value, N);
    }
    function ce() {
      r.value = !1;
    }
    function G(N) {
      if (N.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = Tt(Xe(n.modelValue.start));
        } catch {
        }
      We(() => l.value?.focus());
    }
    function de(N) {
      if (!r.value) return;
      const J = i.value;
      J && !J.contains(N.target) && (r.value = !1);
    }
    return Fe(r, (N) => {
      N && (c.value = null);
    }), Je(() => {
      document.addEventListener("click", de);
    }), ft(() => {
      document.removeEventListener("click", de);
    }), (N, J) => (p(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (p(), k("label", {
        key: 0,
        id: o,
        class: Q(T(ot))
      }, D(e.label), 3)) : z("", !0),
      u("button", {
        type: "button",
        class: Q([
          T(ht),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: G
      }, [
        R(T(xs), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Q([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(O.value), 3)
      ], 10, N5),
      it(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": C.value,
        class: Q([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: In(Qe(ce, ["stop"]), ["escape"])
      }, [
        u("div", H5, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": _.value
          }, [
            u("p", Y5, D(b.value), 1),
            u("ul", K5, [
              (p(!0), k(ie, null, fe(y.value, (se) => (p(), k("li", {
                key: se.id
              }, [
                u("button", {
                  type: "button",
                  class: Q(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", F(se.id)]),
                  onClick: (ge) => te(se.id)
                }, D(se.label), 11, U5)
              ]))), 128))
            ])
          ], 8, j5),
          u("div", q5, [
            u("div", X5, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": x.value,
                onClick: J[0] || (J[0] = (se) => le(-1))
              }, [
                R(T(Qi), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, G5),
              u("div", Z5, [
                u("span", Q5, D(M.value), 1),
                u("div", J5, [
                  u("span", eC, D(T(zt)(m.value[0], e.locale)), 1),
                  u("span", tC, D(T(zt)(m.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: J[1] || (J[1] = (se) => le(1))
              }, [
                R(T(Ji), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, nC)
            ]),
            u("div", aC, [
              (p(!0), k(ie, null, fe(m.value, (se) => (p(), k("div", {
                key: `${se.getFullYear()}-${se.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", sC, [
                  (p(!0), k(ie, null, fe(f.value, (ge) => (p(), k("span", { key: ge }, D(ge), 1))), 128))
                ]),
                u("div", oC, [
                  (p(!0), k(ie, null, fe(T(bl)(se), (ge) => (p(), k("button", {
                    key: T(at)(ge),
                    type: "button",
                    disabled: P(ge),
                    class: Q(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", X(se, ge)]),
                    onClick: (xe) => U(ge)
                  }, D(ge.getDate()), 11, iC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, W5), [
        [jn, r.value]
      ])
    ], 512));
  }
}), fC = ["disabled", "aria-expanded", "aria-label"], gC = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, mC = { class: "min-w-0 truncate" }, pC = ["disabled", "onClick", "onMouseenter"], bC = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, vC = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, yC = { class: "min-w-0 flex-1 text-left" }, xC = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, _C = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, kC = {
  key: 1,
  class: "group relative inline-flex shrink-0"
}, wC = ["type", "disabled", "aria-label"], CC = {
  key: 1,
  class: "min-w-0 truncate"
}, $C = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, MC = ["type", "disabled", "aria-label"], SC = {
  key: 1,
  class: "min-w-0 truncate"
}, ua = /* @__PURE__ */ re({
  name: "Button",
  inheritAttrs: !1,
  __name: "Button",
  props: {
    variant: { default: "primary" },
    tone: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    tooltip: {},
    options: { default: () => [] },
    menuMinWidth: { default: "280px" }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = ka(), o = $(() => !!n.tooltip?.trim() && n.variant !== "dropdown"), i = $(() => n.variant === "dropdown"), l = $(() => n.variant === "action"), r = $(() => !l.value), c = $(() => {
      const G = s["aria-label"];
      if (typeof G == "string" && G.length > 0) return G;
      if (l.value && n.tooltip?.trim()) return n.tooltip.trim();
    }), d = $(() => {
      const G = s.type;
      return G === "submit" || G === "reset" || G === "button" ? G : "button";
    }), h = $(() => {
      const { class: G, type: de, "aria-label": N, ...J } = s;
      return J;
    }), m = $(() => n.variant === "primary" || n.variant === "dropdown" ? [
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
    ]), v = `kiut-button-menu-${Ke()}`, g = `${v}-btn`, y = `${v}-menu`, b = ae(null), f = ae(null), _ = ae(null), x = ae(!1), w = ae(0), C = ae({}), S = $(() => n.options.filter((G) => !G.disabled));
    function M(G) {
      return `${G.value}-${G.label}`;
    }
    function O() {
      const G = f.value;
      if (!G) return;
      const de = G.getBoundingClientRect();
      C.value = {
        top: `${de.bottom - 3}px`,
        left: `${de.left}px`,
        minWidth: `max(${de.width}px, ${n.menuMinWidth})`
      };
    }
    function A(G) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        w.value === G ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function P() {
      x.value = !1;
    }
    function B() {
      O(), w.value = 0, We(() => _.value?.focus());
    }
    function F() {
      if (!n.disabled) {
        if (x.value) {
          P();
          return;
        }
        x.value = !0, B();
      }
    }
    function X(G) {
      G.disabled || (a("select", G), P());
    }
    function te(G) {
      G.stopPropagation(), !n.disabled && F();
    }
    function U(G) {
      if (!x.value) return;
      const de = G.target, N = b.value, J = _.value;
      N && !N.contains(de) && (!J || !J.contains(de)) && P();
    }
    function le(G) {
      n.disabled || (G.key === "ArrowDown" || G.key === "Enter" || G.key === " ") && (G.preventDefault(), x.value || (x.value = !0, B()));
    }
    function ce(G) {
      const de = S.value;
      if (G.key === "Escape") {
        G.preventDefault(), P(), f.value?.focus();
        return;
      }
      if (de.length !== 0) {
        if (G.key === "ArrowDown") {
          G.preventDefault(), w.value = Math.min(w.value + 1, de.length - 1);
          return;
        }
        if (G.key === "ArrowUp") {
          G.preventDefault(), w.value = Math.max(w.value - 1, 0);
          return;
        }
        if (G.key === "Enter" || G.key === " ") {
          G.preventDefault();
          const N = de[w.value];
          N && X(N);
        }
      }
    }
    return Je(() => {
      document.addEventListener("click", U);
    }), ft(() => {
      document.removeEventListener("click", U);
    }), (G, de) => i.value ? (p(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: b,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", nn({
        ref_key: "buttonRef",
        ref: f,
        id: g,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, T(s).class]],
        disabled: e.disabled,
        "aria-expanded": x.value,
        "aria-haspopup": "menu",
        "aria-controls": y,
        "aria-label": c.value
      }, h.value, {
        onClick: te,
        onKeydown: le
      }), [
        G.$slots.icon ? (p(), k("span", gC, [
          Se(G.$slots, "icon")
        ])) : z("", !0),
        u("span", mC, [
          Se(G.$slots, "default")
        ]),
        R(T(_s), {
          class: Q(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", x.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, fC),
      (p(), ee(_a, { to: "body" }, [
        it(u("div", {
          ref_key: "panelRef",
          ref: _,
          id: y,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Te(C.value),
          onKeydown: Qe(ce, ["stop"])
        }, [
          (p(!0), k(ie, null, fe(S.value, (N, J) => (p(), k("button", {
            key: M(N),
            type: "button",
            role: "menuitem",
            disabled: N.disabled,
            class: Q(A(J)),
            onClick: Qe((se) => X(N), ["stop"]),
            onMouseenter: (se) => w.value = J
          }, [
            N.icon ? (p(), k("span", bC, [
              (p(), ee(Jt(N.icon), { class: "h-5 w-5" }))
            ])) : (p(), k("span", vC)),
            u("span", yC, [
              u("span", xC, D(N.label), 1),
              N.description ? (p(), k("span", _C, D(N.description), 1)) : z("", !0)
            ])
          ], 42, pC))), 128))
        ], 36), [
          [jn, x.value]
        ])
      ]))
    ], 512)) : o.value ? (p(), k("span", kC, [
      u("button", nn({
        type: d.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, T(s).class]],
        disabled: e.disabled,
        "aria-label": c.value
      }, h.value), [
        G.$slots.icon ? (p(), k("span", {
          key: 0,
          class: Q(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Se(G.$slots, "icon")
        ], 2)) : z("", !0),
        r.value ? (p(), k("span", CC, [
          Se(G.$slots, "default")
        ])) : z("", !0)
      ], 16, wC),
      u("span", $C, D(e.tooltip), 1)
    ])) : (p(), k("button", nn({
      key: 2,
      type: d.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [m.value, T(s).class]],
      disabled: e.disabled,
      "aria-label": c.value
    }, h.value), [
      G.$slots.icon ? (p(), k("span", {
        key: 0,
        class: Q(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Se(G.$slots, "icon")
      ], 2)) : z("", !0),
      r.value ? (p(), k("span", SC, [
        Se(G.$slots, "default")
      ])) : z("", !0)
    ], 16, MC));
  }
}), DC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, TC = { class: "min-w-0 flex-1 space-y-1" }, AC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, BC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, LC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, PC = /* @__PURE__ */ re({
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
    const n = e, a = t, o = `${`kiut-modal-${Ke()}`}-title`, i = ae(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function r() {
      a("confirm");
    }
    function c(d) {
      n.modelValue && d.key === "Escape" && (d.preventDefault(), l());
    }
    return Fe(
      () => n.modelValue,
      (d) => {
        d && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), Je(() => {
      document.addEventListener("keydown", c);
    }), ft(() => {
      document.removeEventListener("keydown", c);
    }), (d, h) => (p(), ee(_a, { to: "body" }, [
      R(Me, { name: "kiut-modal" }, {
        default: L(() => [
          e.modelValue ? (p(), k("div", DC, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: l
            }),
            u("div", {
              ref_key: "panelRef",
              ref: i,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": o,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = Qe(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: Q(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", TC, [
                  u("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (p(), k("p", AC, D(e.subtitle), 1)) : z("", !0)
                ]),
                R(ua, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: L(() => [
                    R(T(el), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              u("div", BC, [
                Se(d.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", LC, [
                R(ua, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: L(() => [
                    Ae(D(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                R(ua, {
                  variant: "primary",
                  type: "button",
                  onClick: r
                }, {
                  default: L(() => [
                    Ae(D(e.confirmLabel), 1)
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
}), IC = /* @__PURE__ */ me(PC, [["__scopeId", "data-v-4ed7bb14"]]), RC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, FC = {
  key: 0,
  class: ""
}, EC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, OC = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, VC = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, zC = /* @__PURE__ */ re({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Qa(), n = $(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (p(), k("section", RC, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (p(), k("header", FC, [
        a.$slots.description ? (p(), k("div", EC, [
          Se(a.$slots, "description")
        ])) : z("", !0),
        a.$slots.filters || a.$slots.actions ? (p(), k("div", {
          key: 1,
          class: Q(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (p(), k("div", OC, [
            Se(a.$slots, "filters")
          ])) : z("", !0),
          a.$slots.actions ? (p(), k("div", VC, [
            Se(a.$slots, "actions")
          ])) : z("", !0)
        ], 2)) : z("", !0)
      ])) : z("", !0),
      a.$slots.content || a.$slots.default ? (p(), k("div", {
        key: 1,
        class: Q({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        Se(a.$slots, "content", {}, () => [
          Se(a.$slots, "default")
        ])
      ], 2)) : z("", !0)
    ]));
  }
}), NC = { class: "flex flex-1 min-h-0" }, WC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, HC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, jC = ["aria-current", "data-has-active", "title", "onClick"], YC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, KC = { class: "px-4 py-4 shrink-0" }, UC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, qC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, XC = ["data-nav-id", "aria-current", "onClick"], GC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, ZC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, QC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, JC = ["data-nav-id", "aria-current", "onClick"], e$ = { class: "truncate text-[15px]" }, t$ = ["aria-current", "data-has-active", "onClick"], n$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, a$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, s$ = /* @__PURE__ */ re({
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
    Je(() => {
      c(), window.addEventListener("resize", c);
    }), ft(() => {
      window.removeEventListener("resize", c);
    });
    const d = $(() => {
      const f = a.sections.find((_) => _.id === a.selectedSectionId);
      return f?.items?.length ? f : null;
    });
    function h(f) {
      return a.activePath ? a.activePath === f.path || a.activePath.startsWith(f.path + "/") : !1;
    }
    function m(f) {
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
      const _ = a.selectedSectionId === f.id ? null : f.id;
      s("update:selectedSectionId", _);
    }
    function g(f, _) {
      s("navigate", { section: f, item: _ });
    }
    function y() {
      s("update:selectedSectionId", null);
    }
    function b(f, _) {
      g(f, _), y();
    }
    return (f, _) => r.value ? (p(), k("div", nn({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      R(Me, { name: "ksn-overlay" }, {
        default: L(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : z("", !0)
        ]),
        _: 1
      }),
      R(Me, { name: "ksn-sheet" }, {
        default: L(() => [
          d.value ? (p(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Te({ paddingBottom: a.mobileBarHeight })
          }, [
            _[3] || (_[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", GC, [
              u("p", ZC, D(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [..._[2] || (_[2] = [
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
            u("nav", QC, [
              (p(!0), k(ie, null, fe(d.value.items, (x) => (p(), k("button", {
                key: x.id,
                type: "button",
                "data-nav-id": x.id,
                "aria-current": h(x) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => b(d.value, x)
              }, [
                x.icon ? (p(), ee(Jt(x.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : z("", !0),
                u("span", e$, D(x.label), 1)
              ], 8, JC))), 128))
            ])
          ], 4)) : z("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Te({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (p(!0), k(ie, null, fe(e.sections, (x) => (p(), k("button", {
          key: x.id,
          type: "button",
          "aria-current": e.selectedSectionId === x.id ? "true" : void 0,
          "data-has-active": m(x) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(x)
        }, [
          e.selectedSectionId === x.id || m(x) ? (p(), k("span", n$)) : z("", !0),
          x.icon ? (p(), ee(Jt(x.icon), {
            key: 1,
            class: "shrink-0",
            style: Te({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : z("", !0),
          u("span", a$, D(x.label), 1)
        ], 8, t$))), 128))
      ], 4)
    ], 16)) : (p(), k("aside", nn({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", NC, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Te({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: _[0] || (_[0] = (x) => n.value = !0),
          onMouseleave: _[1] || (_[1] = (x) => n.value = !1)
        }, [
          f.$slots.logo ? (p(), k("div", WC, [
            Se(f.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : z("", !0),
          u("nav", HC, [
            (p(!0), k(ie, null, fe(e.sections, (x) => (p(), k("button", {
              key: x.id,
              type: "button",
              "aria-current": e.selectedSectionId === x.id ? "true" : void 0,
              "data-has-active": m(x) ? "true" : void 0,
              title: x.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(x)
            }, [
              x.icon ? (p(), ee(Jt(x.icon), {
                key: 0,
                class: "shrink-0",
                style: Te({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : z("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Te({ fontSize: e.primaryFontSize })
              }, D(x.label), 5)
            ], 8, jC))), 128))
          ]),
          f.$slots.footer ? (p(), k("div", YC, [
            Se(f.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : z("", !0)
        ], 36),
        R(Me, { name: "ksn-sub" }, {
          default: L(() => [
            d.value ? (p(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Te({ width: e.secondaryWidth })
            }, [
              u("div", KC, [
                u("p", UC, D(d.value.label), 1)
              ]),
              u("nav", qC, [
                (p(!0), k(ie, null, fe(d.value.items, (x) => (p(), k("button", {
                  key: x.id,
                  type: "button",
                  "data-nav-id": x.id,
                  "aria-current": h(x) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, x)
                }, [
                  x.icon ? (p(), ee(Jt(x.icon), {
                    key: 0,
                    style: Te({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : z("", !0),
                  u("span", {
                    class: "truncate",
                    style: Te({ fontSize: e.secondaryFontSize })
                  }, D(x.label), 5)
                ], 8, XC))), 128))
              ])
            ], 4)) : z("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), o$ = /* @__PURE__ */ me(s$, [["__scopeId", "data-v-e0ccb96c"]]), g$ = {
  install(e) {
    e.component("KiutChartBar", kt), e.component("KiutChartLine", pt), e.component("KiutPieChart", Sa), e.component("KiutBoxplotChart", gf), e.component("KiutCandlestickChart", tg), e.component("KiutHistogramChart", Gi), e.component("KiutSankeyChart", Yt), e.component("KiutAgentsPerDay", Km), e.component("KiutBookingManager", kp), e.component("KiutCheckin", tl), e.component("KiutCheckinContainer", P0), e.component("KiutCheckinMetrics", e0), e.component("KiutCheckinSegments", al), e.component("KiutDisruption", Q0), e.component("KiutFAQ", ib), e.component("KiutMessagesPerAgent", vb), e.component("KiutRecordLocator", nl), e.component("KiutSalesByChannel", sl), e.component("KiutSeller", ol), e.component("KiutSellerContainer", iv), e.component("KiutTopAgents", gv), e.component("KiutPaymentMethod", Fv), e.component("KiutAgentHumanConversations", Py), e.component("KiutChannelMetrics", Hy), e.component("KiutTriageCombinations", s1), e.component("KiutSelectLanguage", u1), e.component("KiutGuardrails", k1), e.component("KiutDisruptionNotifier", H1), e.component("KiutTotalConversationsCard", j1), e.component("KiutCsatP95Card", Y1), e.component("KiutCsatPulseCard", K1), e.component("KiutCSATContainer", Sx), e.component("KiutAiGeneratedRevenueCard", Dx), e.component("KiutHumanEscalations", Ex), e.component("KiutHumanEscalationsCard", Ox), e.component("KiutNpsDailyMetrics", cl), e.component("KiutNpsMetrics", dl), e.component("KiutNpsOverviewMetrics", rl), e.component("KiutAWSCost", qx), e.component("KiutCostUsage", o_), e.component("KiutTokenUsage", p_), e.component("KiutConversationCount", S_), e.component("KiutTopAgentsAnalysis", z_), e.component("KiutTopAgentsPie", G_), e.component("KiutDailyCostTrends", ik), e.component("KiutModelUsage", _k), e.component("KiutMessageRoles", Bk), e.component("KiutCostPerConversations", Wk), e.component("Tabs", ul), e.component("Table", il), e.component("Filters", _2), e.component("InputText", M2), e.component("InputPassword", R2), e.component("InputTextarea", z2), e.component("InputFile", q2), e.component("InputDateTime", ew), e.component("InputTime", iw), e.component("InputRange", xw), e.component("InputNumber", $w), e.component("InputColorPicker", Iw), e.component("Select", ks), e.component("MultiSelect", Hw), e.component("Toggle", Kw), e.component("InputPhone", e5), e.component("SelectablePills", l5), e.component("SegmentedControl", u5), e.component("DateRangePicker", z5), e.component("DatePickerPresets", hC), e.component("Tag", Ue), e.component("Button", ua), e.component("Modal", IC), e.component("Section", zC), e.component("KiutAppShellNavigation", o$);
  }
};
export {
  qx as AWSCost,
  Py as AgentHumanConversations,
  Km as AgentsPerDay,
  Dx as AiGeneratedRevenueCard,
  o$ as AppShellNavigation,
  kp as BookingManager,
  gf as BoxplotChart,
  ua as Button,
  Sx as CSATContainer,
  tg as CandlestickChart,
  Hy as ChannelMetrics,
  kt as ChartBar,
  pt as ChartLine,
  tl as Checkin,
  P0 as CheckinContainer,
  e0 as CheckinMetrics,
  al as CheckinSegments,
  S_ as ConversationCount,
  Wk as CostPerConversations,
  o_ as CostUsage,
  Y1 as CsatP95Card,
  K1 as CsatPulseCard,
  ik as DailyCostTrends,
  hC as DatePickerPresets,
  z5 as DateRangePicker,
  Q0 as Disruption,
  H1 as DisruptionNotifier,
  ib as FAQ,
  _2 as Filters,
  k1 as Guardrails,
  Gi as HistogramChart,
  Ex as HumanEscalations,
  Ox as HumanEscalationsCard,
  Iw as InputColorPicker,
  ew as InputDateTime,
  q2 as InputFile,
  $w as InputNumber,
  R2 as InputPassword,
  e5 as InputPhone,
  xw as InputRange,
  M2 as InputText,
  z2 as InputTextarea,
  iw as InputTime,
  g$ as KiutUIPlugin,
  Bk as MessageRoles,
  vb as MessagesPerAgent,
  IC as Modal,
  _k as ModelUsage,
  Hw as MultiSelect,
  cl as NpsDailyMetrics,
  dl as NpsMetrics,
  rl as NpsOverviewMetrics,
  Fv as PaymentMethod,
  Sa as PieChart,
  nl as RecordLocator,
  sl as SalesByChannel,
  Yt as SankeyChart,
  zC as Section,
  u5 as SegmentedControl,
  ks as Select,
  u1 as SelectLanguage,
  l5 as SelectablePills,
  ol as Seller,
  iv as SellerContainer,
  il as Table,
  ul as Tabs,
  Ue as Tag,
  Kw as Toggle,
  p_ as TokenUsage,
  gv as TopAgents,
  z_ as TopAgentsAnalysis,
  G_ as TopAgentsPie,
  j1 as TotalConversationsCard,
  s1 as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
