import { defineComponent as ae, shallowRef as Ws, h as La, ref as oe, onMounted as tt, onUnmounted as ht, watch as Fe, toRaw as Fa, nextTick as ze, version as fl, isProxy as js, computed as $, toRef as ye, openBlock as m, createElementBlock as k, createVNode as E, unref as T, createElementVNode as u, Fragment as ee, renderList as le, normalizeStyle as xe, normalizeClass as G, toDisplayString as A, createCommentVNode as V, onBeforeUnmount as Hs, createStaticVNode as go, withDirectives as Xe, vShow as sn, useSlots as Na, Transition as ke, withCtx as B, renderSlot as Se, Comment as gl, createBlock as Z, resolveDynamicComponent as nn, createTextVNode as $e, createSlots as po, vModelSelect as Ys, Teleport as Wa, withModifiers as ot, withKeys as Sn, vModelText as qt, useAttrs as ua, inject as Ks, mergeProps as ln } from "vue";
import * as mo from "echarts/core";
import { TooltipComponent as pl, TitleComponent as ml } from "echarts/components";
import { SankeyChart as bl } from "echarts/charts";
import { CanvasRenderer as vl } from "echarts/renderers";
import Ve from "moment";
function In(e) {
  return e + 0.5 | 0;
}
const Bt = (e, t, n) => Math.max(Math.min(e, n), t);
function yn(e) {
  return Bt(In(e * 2.55), 0, 255);
}
function Rt(e) {
  return Bt(In(e * 255), 0, 255);
}
function Ct(e) {
  return Bt(In(e / 2.55) / 100, 0, 1);
}
function bo(e) {
  return Bt(In(e * 100), 0, 100);
}
const it = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Pa = [..."0123456789ABCDEF"], yl = (e) => Pa[e & 15], _l = (e) => Pa[(e & 240) >> 4] + Pa[e & 15], On = (e) => (e & 240) >> 4 === (e & 15), xl = (e) => On(e.r) && On(e.g) && On(e.b) && On(e.a);
function kl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & it[e[1]] * 17,
    g: 255 & it[e[2]] * 17,
    b: 255 & it[e[3]] * 17,
    a: t === 5 ? it[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: it[e[1]] << 4 | it[e[2]],
    g: it[e[3]] << 4 | it[e[4]],
    b: it[e[5]] << 4 | it[e[6]],
    a: t === 9 ? it[e[7]] << 4 | it[e[8]] : 255
  })), n;
}
const wl = (e, t) => e < 255 ? t(e) : "";
function Cl(e) {
  var t = xl(e) ? yl : _l;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + wl(e.a, t) : void 0;
}
const $l = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Us(e, t, n) {
  const a = t * Math.min(n, 1 - n), o = (s, i = (s + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function Sl(e, t, n) {
  const a = (o, s = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function Ml(e, t, n) {
  const a = Us(e, 1, 0.5);
  let o;
  for (t + n > 1 && (o = 1 / (t + n), t *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - t - n, a[o] += t;
  return a;
}
function Dl(e, t, n, a, o) {
  return e === o ? (t - n) / a + (t < n ? 6 : 0) : t === o ? (n - e) / a + 2 : (e - t) / a + 4;
}
function ja(e) {
  const n = e.r / 255, a = e.g / 255, o = e.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), l = (s + i) / 2;
  let r, c, d;
  return s !== i && (d = s - i, c = l > 0.5 ? d / (2 - s - i) : d / (s + i), r = Dl(n, a, o, d, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function Ha(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Rt);
}
function Ya(e, t, n) {
  return Ha(Us, e, t, n);
}
function Al(e, t, n) {
  return Ha(Ml, e, t, n);
}
function Tl(e, t, n) {
  return Ha(Sl, e, t, n);
}
function qs(e) {
  return (e % 360 + 360) % 360;
}
function Bl(e) {
  const t = $l.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? yn(+t[5]) : Rt(+t[5]));
  const o = qs(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Al(o, s, i) : t[1] === "hsv" ? a = Tl(o, s, i) : a = Ya(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function Ll(e, t) {
  var n = ja(e);
  n[0] = qs(n[0] + t), n = Ya(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Fl(e) {
  if (!e)
    return;
  const t = ja(e), n = t[0], a = bo(t[1]), o = bo(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${Ct(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const vo = {
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
}, yo = {
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
function Pl() {
  const e = {}, t = Object.keys(yo), n = Object.keys(vo);
  let a, o, s, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], o = 0; o < n.length; o++)
      s = n[o], l = l.replace(s, vo[s]);
    s = parseInt(yo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Vn;
function El(e) {
  Vn || (Vn = Pl(), Vn.transparent = [0, 0, 0, 0]);
  const t = Vn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Il = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Rl(e) {
  const t = Il.exec(e);
  let n = 255, a, o, s;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? yn(i) : Bt(i * 255, 0, 255);
    }
    return a = +t[1], o = +t[3], s = +t[5], a = 255 & (t[2] ? yn(a) : Bt(a, 0, 255)), o = 255 & (t[4] ? yn(o) : Bt(o, 0, 255)), s = 255 & (t[6] ? yn(s) : Bt(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function Ol(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Ct(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const ba = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Jt = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Vl(e, t, n) {
  const a = Jt(Ct(e.r)), o = Jt(Ct(e.g)), s = Jt(Ct(e.b));
  return {
    r: Rt(ba(a + n * (Jt(Ct(t.r)) - a))),
    g: Rt(ba(o + n * (Jt(Ct(t.g)) - o))),
    b: Rt(ba(s + n * (Jt(Ct(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function zn(e, t, n) {
  if (e) {
    let a = ja(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = Ya(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function Xs(e, t) {
  return e && Object.assign(t || {}, e);
}
function _o(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Rt(e[3]))) : (t = Xs(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Rt(t.a)), t;
}
function zl(e) {
  return e.charAt(0) === "r" ? Rl(e) : Bl(e);
}
class Mn {
  constructor(t) {
    if (t instanceof Mn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = _o(t) : n === "string" && (a = kl(t) || El(t) || zl(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Xs(this._rgb);
    return t && (t.a = Ct(t.a)), t;
  }
  set rgb(t) {
    this._rgb = _o(t);
  }
  rgbString() {
    return this._valid ? Ol(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Cl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Fl(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, o = t.rgb;
      let s;
      const i = n === s ? 0.5 : n, l = 2 * i - 1, r = a.a - o.a, c = ((l * r === -1 ? l : (l + r) / (1 + l * r)) + 1) / 2;
      s = 1 - c, a.r = 255 & c * a.r + s * o.r + 0.5, a.g = 255 & c * a.g + s * o.g + 0.5, a.b = 255 & c * a.b + s * o.b + 0.5, a.a = i * a.a + (1 - i) * o.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Vl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Mn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Rt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = In(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return zn(this._rgb, 2, t), this;
  }
  darken(t) {
    return zn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return zn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return zn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Ll(this._rgb, t), this;
  }
}
function xt() {
}
const Nl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function De(e) {
  return e == null;
}
function Ne(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ce(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function rt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function gt(e, t) {
  return rt(e) ? e : t;
}
function pe(e, t) {
  return typeof e > "u" ? t : e;
}
const Wl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Gs = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Le(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Ae(e, t, n, a) {
  let o, s, i;
  if (Ne(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (Ce(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function aa(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function oa(e) {
  if (Ne(e))
    return e.map(oa);
  if (Ce(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = oa(e[n[o]]);
    return t;
  }
  return e;
}
function Zs(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function jl(e, t, n, a) {
  if (!Zs(e))
    return;
  const o = t[e], s = n[e];
  Ce(o) && Ce(s) ? Dn(o, s, a) : t[e] = oa(s);
}
function Dn(e, t, n) {
  const a = Ne(t) ? t : [
    t
  ], o = a.length;
  if (!Ce(e))
    return e;
  n = n || {};
  const s = n.merger || jl;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = a[l], !Ce(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      s(r[c], e, i, n);
  }
  return e;
}
function kn(e, t) {
  return Dn(e, t, {
    merger: Hl
  });
}
function Hl(e, t, n) {
  if (!Zs(e))
    return;
  const a = t[e], o = n[e];
  Ce(a) && Ce(o) ? kn(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = oa(o));
}
const xo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Yl(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Kl(e) {
  const t = Yl(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function Gt(e, t) {
  return (xo[t] || (xo[t] = Kl(t)))(e);
}
function Ka(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const An = (e) => typeof e < "u", Vt = (e) => typeof e == "function", ko = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Ul(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Te = Math.PI, Ie = 2 * Te, ql = Ie + Te, sa = Number.POSITIVE_INFINITY, Xl = Te / 180, We = Te / 2, Wt = Te / 4, wo = Te * 2 / 3, Qs = Math.log10, vt = Math.sign;
function wn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Co(e) {
  const t = Math.round(e);
  e = wn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Qs(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Gl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function Zl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Tn(e) {
  return !Zl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Ql(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Jl(e, t, n) {
  let a, o, s;
  for (a = 0, o = e.length; a < o; a++)
    s = e[a][n], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function $t(e) {
  return e * (Te / 180);
}
function er(e) {
  return e * (180 / Te);
}
function $o(e) {
  if (!rt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Js(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * Te && (s += Ie), {
    angle: s,
    distance: o
  };
}
function Ea(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function tr(e, t) {
  return (e - t + ql) % Ie - Te;
}
function ut(e) {
  return (e % Ie + Ie) % Ie;
}
function Bn(e, t, n, a) {
  const o = ut(e), s = ut(t), i = ut(n), l = ut(s - o), r = ut(i - o), c = ut(o - s), d = ut(o - i);
  return o === s || o === i || a && s === i || l > r && c < d;
}
function Ue(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function nr(e) {
  return Ue(e, -32768, 32767);
}
function Lt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Ua(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const Ut = (e, t, n, a) => Ua(e, n, a ? (o) => {
  const s = e[o][t];
  return s < n || s === n && e[o + 1][t] === n;
} : (o) => e[o][t] < n), ar = (e, t, n) => Ua(e, n, (a) => e[a][t] >= n);
function or(e, t, n) {
  let a = 0, o = e.length;
  for (; a < o && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const ei = [
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
  }), ei.forEach((n) => {
    const a = "_onData" + Ka(n), o = e[n];
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
function So(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (ei.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function ti(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const ni = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ai(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, ni.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function ir(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const qa = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ye = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, lr = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function rr(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: g, minDefined: v, maxDefined: f } = i.getUserBounds();
    if (v) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        Ut(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ut(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, o + 1).reverse().findIndex((x) => !De(x[l.axis]));
        o -= Math.max(0, y);
      }
      o = Ue(o, 0, a - 1);
    }
    if (f) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        Ut(r, i.axis, g, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ut(t, d, i.getPixelForValue(g), !0).hi + 1
      );
      if (c) {
        const x = r.slice(y - 1).findIndex((p) => !De(p[l.axis]));
        y += Math.max(0, x);
      }
      s = Ue(y, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function cr(e) {
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
const Nn = (e) => e === 0 || e === 1, Mo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ie / n)), Do = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ie / n) + 1, Cn = {
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
  easeInSine: (e) => -Math.cos(e * We) + 1,
  easeOutSine: (e) => Math.sin(e * We),
  easeInOutSine: (e) => -0.5 * (Math.cos(Te * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Nn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Nn(e) ? e : Mo(e, 0.075, 0.3),
  easeOutElastic: (e) => Nn(e) ? e : Do(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Nn(e) ? e : e < 0.5 ? 0.5 * Mo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Do(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Cn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Cn.easeInBounce(e * 2) * 0.5 : Cn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Xa(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ao(e) {
  return Xa(e) ? e : new Mn(e);
}
function va(e) {
  return Xa(e) ? e : new Mn(e).saturate(0.5).darken(0.1).hexString();
}
const dr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], ur = [
  "color",
  "borderColor",
  "backgroundColor"
];
function hr(e) {
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
      properties: ur
    },
    numbers: {
      type: "number",
      properties: dr
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
function fr(e) {
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
const To = /* @__PURE__ */ new Map();
function gr(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = To.get(n);
  return a || (a = new Intl.NumberFormat(e, t), To.set(n, a)), a;
}
function Ga(e, t, n) {
  return gr(t, n).format(e);
}
const pr = {
  values(e) {
    return Ne(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = mr(e, n);
    }
    const i = Qs(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), Ga(e, a, r);
  }
};
function mr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var oi = {
  formatters: pr
};
function br(e) {
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
      callback: oi.formatters.values,
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
const Zt = /* @__PURE__ */ Object.create(null), Ia = /* @__PURE__ */ Object.create(null);
function $n(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ya(e, t, n) {
  return typeof t == "string" ? Dn($n(e, t), n) : Dn($n(e, ""), t);
}
class vr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => va(o.backgroundColor), this.hoverBorderColor = (a, o) => va(o.borderColor), this.hoverColor = (a, o) => va(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return ya(this, t, n);
  }
  get(t) {
    return $n(this, t);
  }
  describe(t, n) {
    return ya(Ia, t, n);
  }
  override(t, n) {
    return ya(Zt, t, n);
  }
  route(t, n, a, o) {
    const s = $n(this, t), i = $n(this, a), l = "_" + n;
    Object.defineProperties(s, {
      [l]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return Ce(r) ? Object.assign({}, c, r) : pe(r, c);
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
var Oe = /* @__PURE__ */ new vr({
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
  hr,
  fr,
  br
]);
function yr(e) {
  return !e || De(e.size) || De(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Bo(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function jt(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Lo(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ra(e, t, n, a) {
  si(e, t, n, a, null);
}
function si(e, t, n, a, o) {
  let s, i, l, r, c, d, h, g;
  const v = t.pointStyle, f = t.rotation, y = t.radius;
  let x = (f || 0) * Xl;
  if (v && typeof v == "object" && (s = v.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(x), e.drawImage(v, -v.width / 2, -v.height / 2, v.width, v.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), v) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, y, 0, 0, Ie) : e.arc(n, a, y, 0, Ie), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : y, e.moveTo(n + Math.sin(x) * d, a - Math.cos(x) * y), x += wo, e.lineTo(n + Math.sin(x) * d, a - Math.cos(x) * y), x += wo, e.lineTo(n + Math.sin(x) * d, a - Math.cos(x) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(x + Wt) * r, h = Math.cos(x + Wt) * (o ? o / 2 - c : r), l = Math.sin(x + Wt) * r, g = Math.sin(x + Wt) * (o ? o / 2 - c : r), e.arc(n - h, a - l, c, x - Te, x - We), e.arc(n + g, a - i, c, x - We, x), e.arc(n + h, a + l, c, x, x + We), e.arc(n - g, a + i, c, x + We, x + Te), e.closePath();
        break;
      case "rect":
        if (!f) {
          r = Math.SQRT1_2 * y, d = o ? o / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        x += Wt;
      /* falls through */
      case "rectRot":
        h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, g = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + g, a - i), e.lineTo(n + h, a + l), e.lineTo(n - g, a + i), e.closePath();
        break;
      case "crossRot":
        x += Wt;
      /* falls through */
      case "cross":
        h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, g = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + g, a - i), e.lineTo(n - g, a + i);
        break;
      case "star":
        h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, g = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + g, a - i), e.lineTo(n - g, a + i), x += Wt, h = Math.cos(x) * (o ? o / 2 : y), i = Math.cos(x) * y, l = Math.sin(x) * y, g = Math.sin(x) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + g, a - i), e.lineTo(n - g, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(x) * y, l = Math.sin(x) * y, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(x) * (o ? o / 2 : y), a + Math.sin(x) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Ln(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Za(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Qa(e) {
  e.restore();
}
function _r(e, t, n, a, o) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function xr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function kr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), De(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function wr(e, t, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(a), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, d = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function Cr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Fn(e, t, n, a, o, s = {}) {
  const i = Ne(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, kr(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && Cr(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), De(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, n, a, s.maxWidth)), e.fillText(c, n, a, s.maxWidth), wr(e, n, a, c, s), a += Number(o.lineHeight);
  e.restore();
}
function ia(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Te, Te, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, Te, We, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, We, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -We, !0), e.lineTo(n + i.topLeft, a);
}
const $r = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Sr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Mr(e, t) {
  const n = ("" + e).match($r);
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
const Dr = (e) => +e || 0;
function Ja(e, t) {
  const n = {}, a = Ce(t), o = a ? Object.keys(t) : t, s = Ce(e) ? a ? (i) => pe(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    n[i] = Dr(s(i));
  return n;
}
function ii(e) {
  return Ja(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function an(e) {
  return Ja(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ct(e) {
  const t = ii(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function qe(e, t) {
  e = e || {}, t = t || Oe.font;
  let n = pe(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = pe(e.style, t.style);
  a && !("" + a).match(Sr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: pe(e.family, t.family),
    lineHeight: Mr(pe(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: pe(e.weight, t.weight),
    string: ""
  };
  return o.string = yr(o), o;
}
function Wn(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function Ar(e, t, n) {
  const { min: a, max: o } = e, s = Gs(t, (o - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function Qt(e, t) {
  return Object.assign(Object.create(e), t);
}
function eo(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = di("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (l) => eo([
      l,
      ...e
    ], t, s, a)
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
      return ri(l, r, () => Rr(r, t, e, l));
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
      return Po(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Po(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, r, c) {
      const d = l._storage || (l._storage = o());
      return l[r] = d[r] = c, delete l._keys, !0;
    }
  });
}
function rn(e, t, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: li(e, a),
    setContext: (s) => rn(e, s, n, a),
    override: (s) => rn(e.override(s), t, n, a)
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
      return ri(s, i, () => Br(s, i, l));
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
function li(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: Vt(n) ? n : () => n,
    isIndexable: Vt(a) ? a : () => a
  };
}
const Tr = (e, t) => e ? e + Ka(t) : t, to = (e, t) => Ce(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ri(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Br(e, t, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = a[t];
  return Vt(l) && i.isScriptable(t) && (l = Lr(t, l, e, n)), Ne(l) && l.length && (l = Fr(t, l, e, i.isIndexable)), to(t, l) && (l = rn(l, o, s && s[t], i)), l;
}
function Lr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || a);
  return l.delete(e), to(e, r) && (r = no(o._scopes, o, e, r)), r;
}
function Fr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = n;
  if (typeof s.index < "u" && a(e))
    return t[s.index % t.length];
  if (Ce(t[0])) {
    const r = t, c = o._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = no(c, o, e, d);
      t.push(rn(h, s, i && i[e], l));
    }
  }
  return t;
}
function ci(e, t, n) {
  return Vt(e) ? e(t, n) : e;
}
const Pr = (e, t) => e === !0 ? t : typeof e == "string" ? Gt(t, e) : void 0;
function Er(e, t, n, a, o) {
  for (const s of t) {
    const i = Pr(n, s);
    if (i) {
      e.add(i);
      const l = ci(i._fallback, n, o);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function no(e, t, n, a) {
  const o = t._rootScopes, s = ci(t._fallback, n, a), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Fo(l, i, n, s || n, a);
  return r === null || typeof s < "u" && s !== n && (r = Fo(l, i, s, r, a), r === null) ? !1 : eo(Array.from(l), [
    ""
  ], o, s, () => Ir(t, n, a));
}
function Fo(e, t, n, a, o) {
  for (; n; )
    n = Er(e, t, n, a, o);
  return n;
}
function Ir(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const o = a[t];
  return Ne(o) && Ce(n) ? n : o || {};
}
function Rr(e, t, n, a) {
  let o;
  for (const s of t)
    if (o = di(Tr(s, e), n), typeof o < "u")
      return to(e, o) ? no(n, a, e, o) : o;
}
function di(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Po(e) {
  let t = e._keys;
  return t || (t = e._keys = Or(e._scopes)), t;
}
function Or(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Vr = Number.EPSILON || 1e-14, cn = (e, t) => t < e.length && !e[t].skip && e[t], ui = (e) => e === "x" ? "y" : "x";
function zr(e, t, n, a) {
  const o = e.skip ? t : e, s = t, i = n.skip ? t : n, l = Ea(s, o), r = Ea(i, s);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, g = a * d;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + g * (i.x - o.x),
      y: s.y + g * (i.y - o.y)
    }
  };
}
function Nr(e, t, n) {
  const a = e.length;
  let o, s, i, l, r, c = cn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = cn(e, d + 1), !(!r || !c)) {
      if (wn(t[d], 0, Vr)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      o = n[d] / t[d], s = n[d + 1] / t[d], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = o * i * t[d], n[d + 1] = s * i * t[d]);
    }
}
function Wr(e, t, n = "x") {
  const a = ui(n), o = e.length;
  let s, i, l, r = cn(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = cn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (s = (d - i[n]) / 3, l[`cp1${n}`] = d - s, l[`cp1${a}`] = h - s * t[c]), r && (s = (r[n] - d) / 3, l[`cp2${n}`] = d + s, l[`cp2${a}`] = h + s * t[c]);
  }
}
function jr(e, t = "x") {
  const n = ui(t), a = e.length, o = Array(a).fill(0), s = Array(a);
  let i, l, r, c = cn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = cn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        o[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      s[i] = l ? c ? vt(o[i - 1]) !== vt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  Nr(e, o, s), Wr(e, s, t);
}
function jn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Hr(e, t) {
  let n, a, o, s, i, l = Ln(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = l, l = n < a - 1 && Ln(e[n + 1], t), s && (o = e[n], i && (o.cp1x = jn(o.cp1x, t.left, t.right), o.cp1y = jn(o.cp1y, t.top, t.bottom)), l && (o.cp2x = jn(o.cp2x, t.left, t.right), o.cp2y = jn(o.cp2y, t.top, t.bottom)));
}
function Yr(e, t, n, a, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    jr(e, o);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = zr(c, l, e[Math.min(s + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && Hr(e, n);
}
function ao() {
  return typeof window < "u" && typeof document < "u";
}
function oo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function la(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const ha = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Kr(e, t) {
  return ha(e).getPropertyValue(t);
}
const Ur = [
  "top",
  "right",
  "bottom",
  "left"
];
function Xt(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = Ur[o];
    a[s] = parseFloat(e[t + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const qr = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Xr(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: o, offsetY: s } = a;
  let i = !1, l, r;
  if (qr(o, s, e.target))
    l = o, r = s;
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
function Yt(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, o = ha(n), s = o.boxSizing === "border-box", i = Xt(o, "padding"), l = Xt(o, "border", "width"), { x: r, y: c, box: d } = Xr(e, n), h = i.left + (d && l.left), g = i.top + (d && l.top);
  let { width: v, height: f } = t;
  return s && (v -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((r - h) / v * n.width / a),
    y: Math.round((c - g) / f * n.height / a)
  };
}
function Gr(e, t, n) {
  let a, o;
  if (t === void 0 || n === void 0) {
    const s = e && oo(e);
    if (!s)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = ha(s), r = Xt(l, "border", "width"), c = Xt(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = la(l.maxWidth, s, "clientWidth"), o = la(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || sa,
    maxHeight: o || sa
  };
}
const Ft = (e) => Math.round(e * 10) / 10;
function Zr(e, t, n, a) {
  const o = ha(e), s = Xt(o, "margin"), i = la(o.maxWidth, e, "clientWidth") || sa, l = la(o.maxHeight, e, "clientHeight") || sa, r = Gr(e, t, n);
  let { width: c, height: d } = r;
  if (o.boxSizing === "content-box") {
    const g = Xt(o, "border", "width"), v = Xt(o, "padding");
    c -= v.width + g.width, d -= v.height + g.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, a ? c / a : d - s.height), c = Ft(Math.min(c, i, r.maxWidth)), d = Ft(Math.min(d, l, r.maxHeight)), c && !d && (d = Ft(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Ft(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function Eo(e, t, n) {
  const a = t || 1, o = Ft(e.height * a), s = Ft(e.width * a);
  e.height = Ft(e.height), e.width = Ft(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Qr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    ao() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Io(e, t) {
  const n = Kr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function Kt(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Jr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function ec(e, t, n, a) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = Kt(e, o, n), l = Kt(o, s, n), r = Kt(s, t, n), c = Kt(i, l, n), d = Kt(l, r, n);
  return Kt(c, d, n);
}
const tc = function(e, t) {
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
}, nc = function() {
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
function on(e, t, n) {
  return e ? tc(t, n) : nc();
}
function hi(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function fi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function gi(e) {
  return e === "angle" ? {
    between: Bn,
    compare: tr,
    normalize: ut
  } : {
    between: Lt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ro({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function ac(e, t, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: l } = gi(a), r = t.length;
  let { start: c, end: d, loop: h } = e, g, v;
  if (h) {
    for (c += r, d += r, g = 0, v = r; g < v && i(l(t[c % r][a]), o, s); ++g)
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
function oc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: o, end: s } = n, i = t.length, { compare: l, between: r, normalize: c } = gi(a), { start: d, end: h, loop: g, style: v } = ac(e, t, n), f = [];
  let y = !1, x = null, p, b, _;
  const w = () => r(o, _, p) && l(o, _) !== 0, S = () => l(s, p) === 0 || r(s, _, p), M = () => y || w(), C = () => !y || S();
  for (let D = d, I = d; D <= h; ++D)
    b = t[D % i], !b.skip && (p = c(b[a]), p !== _ && (y = r(p, o, s), x === null && M() && (x = l(p, o) === 0 ? D : I), x !== null && C() && (f.push(Ro({
      start: x,
      end: D,
      loop: g,
      count: i,
      style: v
    })), x = null), I = D, _ = p));
  return x !== null && f.push(Ro({
    start: x,
    end: h,
    loop: g,
    count: i,
    style: v
  })), f;
}
function sc(e, t) {
  const n = [], a = e.segments;
  for (let o = 0; o < a.length; o++) {
    const s = oc(a[o], e.points, t);
    s.length && n.push(...s);
  }
  return n;
}
function ic(e, t, n, a) {
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
function lc(e, t, n, a) {
  const o = e.length, s = [];
  let i = t, l = e[t], r;
  for (r = t + 1; r <= n; ++r) {
    const c = e[r % o];
    c.skip || c.stop ? l.skip || (a = !1, s.push({
      start: t % o,
      end: (r - 1) % o,
      loop: a
    }), t = i = c.stop ? r : null) : (i = r, l.skip && (t = r)), l = c;
  }
  return i !== null && s.push({
    start: t % o,
    end: i % o,
    loop: a
  }), s;
}
function rc(e, t) {
  const n = e.points, a = e.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = ic(n, o, s, a);
  if (a === !0)
    return Oo(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], n, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return Oo(e, lc(n, i, r, c), n, t);
}
function Oo(e, t, n, a) {
  return !a || !a.setContext || !n ? t : cc(e, t, n, a);
}
function cc(e, t, n, a) {
  const o = e._chart.getContext(), s = Vo(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = s, h = t[0].start, g = h;
  function v(f, y, x, p) {
    const b = l ? -1 : 1;
    if (f !== y) {
      for (f += r; n[f % r].skip; )
        f -= b;
      for (; n[y % r].skip; )
        y += b;
      f % r !== y % r && (c.push({
        start: f % r,
        end: y % r,
        loop: x,
        style: p
      }), d = p, h = y % r);
    }
  }
  for (const f of t) {
    h = l ? h : f.start;
    let y = n[h % r], x;
    for (g = h + 1; g <= f.end; g++) {
      const p = n[g % r];
      x = Vo(a.setContext(Qt(o, {
        type: "segment",
        p0: y,
        p1: p,
        p0DataIndex: (g - 1) % r,
        p1DataIndex: g % r,
        datasetIndex: i
      }))), dc(x, d) && v(h, g - 1, f.loop, d), y = p, d = x;
    }
    h < g - 1 && v(h, g - 1, f.loop, d);
  }
  return c;
}
function Vo(e) {
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
function dc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(o, s) {
    return Xa(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Hn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function uc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Hn(n, t, "left"),
    right: Hn(n, t, "right"),
    top: Hn(a, t, "top"),
    bottom: Hn(a, t, "bottom")
  } : t;
}
function hc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = uc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class fc {
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
    this._request || (this._running = !0, this._request = ni.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, o) => {
      if (!a.running || !a.items.length)
        return;
      const s = a.items;
      let i = s.length - 1, l = !1, r;
      for (; i >= 0; --i)
        r = s[i], r._active ? (r._total > a.duration && (a.duration = r._total), r.tick(t), l = !0) : (s[i] = s[s.length - 1], s.pop());
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
var kt = /* @__PURE__ */ new fc();
const zo = "transparent", gc = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Ao(e || zo), o = a.valid && Ao(t || zo);
    return o && o.valid ? o.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class pc {
  constructor(t, n, a, o) {
    const s = n[a];
    o = Wn([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = Wn([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || gc[t.type || typeof i], this._easing = Cn[t.easing] || Cn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = Wn([
        t.to,
        n,
        o,
        t.from
      ]), this._from = Wn([
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
    let r;
    if (this._active = s !== l && (i || n < a), !this._active) {
      this._target[o] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[o] = s;
      return;
    }
    r = n / a % 2, r = i && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[o] = this._fn(s, l, r);
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
class pi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Ce(t))
      return;
    const n = Object.keys(Oe.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Ce(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = s[l];
      (Ne(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, o = bc(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && mc(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), s;
  }
  _createAnimations(t, n) {
    const a = this._properties, o = [], s = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let r;
    for (r = i.length - 1; r >= 0; --r) {
      const c = i[r];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        o.push(...this._animateOptions(t, n));
        continue;
      }
      const d = n[c];
      let h = s[c];
      const g = a.get(c);
      if (h)
        if (g && h.active()) {
          h.update(g, d, l);
          continue;
        } else
          h.cancel();
      if (!g || !g.duration) {
        t[c] = d;
        continue;
      }
      s[c] = h = new pc(g, t, c, d), o.push(h);
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
      return kt.add(this._chart, a), !0;
  }
}
function mc(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function bc(e, t) {
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
function No(e, t) {
  const n = e && e.options || {}, a = n.reverse, o = n.min === void 0 ? t : 0, s = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function vc(e, t, n) {
  if (n === !1)
    return !1;
  const a = No(e, n), o = No(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function yc(e) {
  let t, n, a, o;
  return Ce(e) ? (t = e.top, n = e.right, a = e.bottom, o = e.left) : t = n = a = o = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function mi(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function Wo(e, t, n, a = {}) {
  const o = e.keys, s = a.mode === "single";
  let i, l, r, c;
  if (t === null)
    return;
  let d = !1;
  for (i = 0, l = o.length; i < l; ++i) {
    if (r = +o[i], r === n) {
      if (d = !0, a.all)
        continue;
      break;
    }
    c = e.values[r], rt(c) && (s || t === 0 || vt(t) === vt(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function _c(e, t) {
  const { iScale: n, vScale: a } = t, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [o]: d,
      [s]: e[d]
    };
  return l;
}
function _a(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function xc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function kc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: o } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function wc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function jo(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function Ho(e, t) {
  const { chart: n, _cachedMeta: a } = e, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: l } = a, r = s.axis, c = i.axis, d = xc(s, i, a), h = t.length;
  let g;
  for (let v = 0; v < h; ++v) {
    const f = t[v], { [r]: y, [c]: x } = f, p = f._stacks || (f._stacks = {});
    g = p[c] = wc(o, d, y), g[l] = x, g._top = jo(g, i, !0, a.type), g._bottom = jo(g, i, !1, a.type);
    const b = g._visualValues || (g._visualValues = {});
    b[l] = x;
  }
}
function xa(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function Cc(e, t) {
  return Qt(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function $c(e, t, n) {
  return Qt(e, {
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
function un(e, t) {
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
const ka = (e) => e === "reset" || e === "none", Yo = (e, t) => t ? e : Object.assign({}, e), Sc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: mi(n, !0),
  values: null
};
class fa {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = _a(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && un(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, g, v, f) => h === "x" ? g : h === "r" ? f : v, s = n.xAxisID = pe(a.xAxisID, xa(t, "x")), i = n.yAxisID = pe(a.yAxisID, xa(t, "y")), l = n.rAxisID = pe(a.rAxisID, xa(t, "r")), r = n.indexAxis, c = n.iAxisID = o(r, s, i, l), d = n.vAxisID = o(r, i, s, l);
    n.xScale = this.getScaleForId(s), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(c), n.vScale = this.getScaleForId(d);
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
    this._data && So(this._data, this), t._stacked && un(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Ce(n)) {
      const o = this._cachedMeta;
      this._data = _c(n, o);
    } else if (a !== n) {
      if (a) {
        So(a, this);
        const o = this._cachedMeta;
        un(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && sr(n, this), this._syncList = [], this._data = n;
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
    n._stacked = _a(n.vScale, n), n.stack !== a.stack && (o = !0, un(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (Ho(this, n._parsed), n._stacked = _a(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, l = s.axis;
    let r = t === 0 && n === o.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, g;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, g = o;
    else {
      Ne(o[t]) ? g = this.parseArrayData(a, o, t, n) : Ce(o[t]) ? g = this.parseObjectData(a, o, t, n) : g = this.parsePrimitiveData(a, o, t, n);
      const v = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = g[d], r && (v() && (r = !1), c = h);
      a._sorted = r;
    }
    i && Ho(this, g);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let g, v, f;
    for (g = 0, v = o; g < v; ++g)
      f = g + a, h[g] = {
        [l]: d || s.parse(c[f], f),
        [r]: i.parse(n[f], f)
      };
    return h;
  }
  parseArrayData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, l = new Array(o);
    let r, c, d, h;
    for (r = 0, c = o; r < c; ++r)
      d = r + a, h = n[d], l[r] = {
        x: s.parse(h[0], d),
        y: i.parse(h[1], d)
      };
    return l;
  }
  parseObjectData(t, n, a, o) {
    const { xScale: s, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = new Array(o);
    let d, h, g, v;
    for (d = 0, h = o; d < h; ++d)
      g = d + a, v = n[g], c[d] = {
        x: s.parse(Gt(v, l), g),
        y: i.parse(Gt(v, r), g)
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
      keys: mi(o, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Wo(l, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const l = o && a._stacks[n.axis];
    o && l && (o.values = l, i = Wo(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && t === a.iScale, i = o.length, l = this._getOtherScale(t), r = Sc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = kc(l);
    let g, v;
    function f() {
      v = o[g];
      const y = v[l.axis];
      return !rt(v[t.axis]) || d > y || h < y;
    }
    for (g = 0; g < i && !(!f() && (this.updateRangeFromParsed(c, t, v, r), s)); ++g)
      ;
    if (s) {
      for (g = i - 1; g >= 0; --g)
        if (!f()) {
          this.updateRangeFromParsed(c, t, v, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], rt(i) && a.push(i);
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
    this.update(t || "default"), n._clip = yc(pe(this.options.clip, vc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, o = a.data || [], s = n.chartArea, i = [], l = this._drawStart || 0, r = this._drawCount || o.length - l, c = this.options.drawActiveElementsOnTop;
    let d;
    for (a.dataset && a.dataset.draw(t, s, l, r), d = l; d < l + r; ++d) {
      const h = o[d];
      h.hidden || (h.active && c ? i.push(h) : h.draw(t, s));
    }
    for (d = 0; d < i.length; ++d)
      i[d].draw(t, s);
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
      s = i.$context || (i.$context = $c(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = Cc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = t + "-" + n, l = s[i], r = this.enableOptionSharing && An(a);
    if (l)
      return Yo(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], g = c.getOptionScopes(this.getDataset(), d), v = Object.keys(Oe.elements[t]), f = () => this.getContext(a, o, n), y = c.resolveNamedOptions(g, v, f, h);
    return y.$shared && (y.$shared = r, s[i] = Object.freeze(Yo(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), g = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(g, this.getContext(t, a, n));
    }
    const c = new pi(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || ka(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    ka(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !ka(n) && this._resolveAnimations(void 0, n).update(t, a);
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
    for (const [l, r, c] of this._syncList)
      this[l](r, c);
    this._syncList = [];
    const o = a.length, s = n.length, i = Math.min(s, o);
    i && this.parse(0, i), s > o ? this._insertElements(o, s - o, t) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(t, n, a = !0) {
    const o = this._cachedMeta, s = o.data, i = t + n;
    let l;
    const r = (c) => {
      for (c.length += n, l = c.length - 1; l >= i; l--)
        c[l] = c[l - n];
    };
    for (r(s), l = t; l < i; ++l)
      s[l] = new this.dataElementType();
    this._parsing && r(o._parsed), this.parse(t, n), a && this.updateElements(s, t, n, "reset");
  }
  updateElements(t, n, a, o) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const o = a._parsed.splice(t, n);
      a._stacked && un(a, o);
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
function Mc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = ti(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function Dc(e) {
  const t = e.iScale, n = Mc(t, e.type);
  let a = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (An(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = t.getPixelForValue(n[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return a;
}
function Ac(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return De(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function Tc(e, t, n, a) {
  const o = t.pixels, s = o[e];
  let i = e > 0 ? o[e - 1] : null, l = e < o.length - 1 ? o[e + 1] : null;
  const r = n.categoryPercentage;
  i === null && (i = s - (l === null ? t.end - t.start : l - s)), l === null && (l = s + s - i);
  const c = s - (s - Math.min(i, l)) / 2 * r;
  return {
    chunk: Math.abs(l - i) / 2 * r / a,
    ratio: n.barPercentage,
    start: c
  };
}
function Bc(e, t, n, a) {
  const o = n.parse(e[0], a), s = n.parse(e[1], a), i = Math.min(o, s), l = Math.max(o, s);
  let r = i, c = l;
  Math.abs(i) > Math.abs(l) && (r = l, c = i), t[n.axis] = c, t._custom = {
    barStart: r,
    barEnd: c,
    start: o,
    end: s,
    min: i,
    max: l
  };
}
function bi(e, t, n, a) {
  return Ne(e) ? Bc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Ko(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, d, h, g;
  for (c = n, d = n + a; c < d; ++c)
    g = t[c], h = {}, h[o.axis] = l || o.parse(i[c], c), r.push(bi(g, h, s, c));
  return r;
}
function wa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Lc(e, t, n) {
  return e !== 0 ? vt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Fc(e) {
  let t, n, a, o, s;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function Pc(e, t, n, a) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Fc(e);
  o === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = d : (s[Uo(d, i, l, r)] = !0, o = c)), s[Uo(o, i, l, r)] = !0, e.borderSkipped = s;
}
function Uo(e, t, n, a) {
  return a ? (e = Ec(e, t, n), e = qo(e, n, t)) : e = qo(e, t, n), e;
}
function Ec(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function qo(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Ic(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Rc extends fa {
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
    return Ko(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return Ko(t, n, a, o);
  }
  parseObjectData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let g, v, f, y;
    for (g = a, v = a + o; g < v; ++g)
      y = n[g], f = {}, f[s.axis] = s.parse(Gt(y, c), g), h.push(bi(Gt(y, d), f, i, g));
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
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(t), i = s._custom, l = wa(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: g } = this._getSharedOptions(n, o);
    for (let v = n; v < n + a; v++) {
      const f = this.getParsed(v), y = s || De(f[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(v), x = this._calculateBarIndexPixels(v, d), p = (f._stacks || {})[l.axis], b = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !p || wa(f._custom) || i === p._top || i === p._bottom,
        x: c ? y.head : x.center,
        y: c ? x.center : y.head,
        height: c ? x.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : x.size
      };
      g && (b.options = h || this.resolveDataElementOptions(v, t[v].active ? "active" : o));
      const _ = b.options || t[v].options;
      Pc(b, _, p, i), Ic(b, _, d.ratio), this.updateElement(t[v], v, b, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((v) => v[a.axis] === r), g = h && h[d.vScale.axis];
      if (De(g) || isNaN(g))
        return !0;
    };
    for (const d of o)
      if (!(n !== void 0 && c(d)) && ((s === !1 || i.indexOf(d.stack) === -1 || s === void 0 && d.stack === void 0) && i.push(d.stack), d.index === t))
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
      t[pe(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || Dc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, d = wa(c);
    let h = r[n.axis], g = 0, v = a ? this.applyStack(n, r, a) : h, f, y;
    v !== h && (g = v - h, v = h), d && (h = c.barStart, v = c.barEnd - c.barStart, h !== 0 && vt(h) !== vt(c.barEnd) && (g = 0), g += h);
    const x = !De(s) && !d ? s : g;
    let p = n.getPixelForValue(x);
    if (this.chart.getDataVisibility(t) ? f = n.getPixelForValue(g + v) : f = p, y = f - p, Math.abs(y) < i) {
      y = Lc(y, n, l) * i, h === l && (p -= y / 2);
      const b = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(b, _), S = Math.max(b, _);
      p = Math.max(Math.min(p, S), w), f = p + y, a && !d && (r._stacks[n.axis]._visualValues[o] = n.getValueForPixel(f) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const b = vt(y) * n.getLineWidthForValue(l) / 2;
      p += b, y -= b;
    }
    return {
      size: y,
      base: p,
      head: f,
      center: f + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = pe(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? Tc(t, n, o, d * c) : Ac(t, n, o, d * c), g = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, v = this._getAxis().indexOf(pe(g, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + v;
      l = h.start + h.chunk * f + h.chunk / 2, r = Math.min(i, h.chunk * h.ratio);
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
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function Oc(e, t, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (t < Ie) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), g = Math.sin(r), v = (_, w, S) => Bn(_, l, r, !0) ? 1 : Math.max(w, w * n, S, S * n), f = (_, w, S) => Bn(_, l, r, !0) ? -1 : Math.min(w, w * n, S, S * n), y = v(0, c, h), x = v(We, d, g), p = f(Te, c, h), b = f(Te + We, d, g);
    a = (y - p) / 2, o = (x - b) / 2, s = -(y + p) / 2, i = -(x + b) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class Vc extends fa {
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
            return n.labels.length && n.datasets.length ? n.labels.map((r, c) => {
              const h = t.getDatasetMeta(0).controller.getStyle(c);
              return {
                text: r,
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
      let s = (r) => +a[r];
      if (Ce(a[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +Gt(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return $t(this.options.rotation - 90);
  }
  _getCircumference() {
    return $t(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ie, n = -Ie;
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
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(Wl(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: g, ratioY: v, offsetX: f, offsetY: y } = Oc(h, d, r), x = (a.width - i) / g, p = (a.height - i) / v, b = Math.max(Math.min(x, p) / 2, 0), _ = Gs(this.options.radius, b), w = Math.max(_ * r, 0), S = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * _, this.offsetY = y * _, o.total = this.calculateTotal(), this.outerRadius = _ - S * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - S * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ie);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, g = s && c.animateScale, v = g ? 0 : this.innerRadius, f = g ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: x } = this._getSharedOptions(n, o);
    let p = this._getRotation(), b;
    for (b = 0; b < n; ++b)
      p += this._circumference(b, s);
    for (b = n; b < n + a; ++b) {
      const _ = this._circumference(b, s), w = t[b], S = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + _,
        circumference: _,
        outerRadius: f,
        innerRadius: v
      };
      x && (S.options = y || this.resolveDataElementOptions(b, w.active ? "active" : o)), p += _, this.updateElement(w, b, S, o);
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
    return n > 0 && !isNaN(t) ? Ie * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = Ga(n._parsed[t], a.options.locale);
    return {
      label: o[t] || "",
      value: s
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let o, s, i, l, r;
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
      r = l.resolveDataElementOptions(o), r.borderAlign !== "inner" && (n = Math.max(n, r.borderWidth || 0, r.hoverBorderWidth || 0));
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
    return Math.max(pe(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class zc extends fa {
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
    let { start: l, count: r } = rr(n, o, i);
    this._drawStart = l, this._drawCount = r, cr(n) && (l = 0, r = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), g = i.axis, v = l.axis, { spanGaps: f, segment: y } = this.options, x = Tn(f) ? f : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || s || o === "none", b = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let S = 0; S < _; ++S) {
      const M = t[S], C = p ? M : {};
      if (S < n || S >= b) {
        C.skip = !0;
        continue;
      }
      const D = this.getParsed(S), I = De(D[v]), F = C[g] = i.getPixelForValue(D[g], S), L = C[v] = s || I ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, D, r) : D[v], S);
      C.skip = isNaN(F) || isNaN(L) || I, C.stop = S > 0 && Math.abs(D[g] - w[g]) > x, y && (C.parsed = D, C.raw = c.data[S]), h && (C.options = d || this.resolveDataElementOptions(S, M.active ? "active" : o)), p || this.updateElement(M, S, C, o), w = D;
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
class Nc extends Vc {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function Ht() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class so {
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
    Object.assign(so.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Ht();
  }
  parse() {
    return Ht();
  }
  format() {
    return Ht();
  }
  add() {
    return Ht();
  }
  diff() {
    return Ht();
  }
  startOf() {
    return Ht();
  }
  endOf() {
    return Ht();
  }
}
var Wc = {
  _date: so
};
function jc(e, t, n, a) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? ar : Ut;
    if (a) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const g = c(s, t, n - h), v = c(s, t, n + h);
          return {
            lo: g.lo,
            hi: v.hi
          };
        }
      }
    } else {
      const d = c(s, t, n);
      if (r) {
        const { vScale: h } = o._cachedMeta, { _parsed: g } = e, v = g.slice(0, d.lo + 1).reverse().findIndex((y) => !De(y[h.axis]));
        d.lo -= Math.max(0, v);
        const f = g.slice(d.hi).findIndex((y) => !De(y[h.axis]));
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
function ga(e, t, n, a, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: d } = s[l], { lo: h, hi: g } = jc(s[l], t, i, o);
    for (let v = h; v <= g; ++v) {
      const f = d[v];
      f.skip || a(f, c, v);
    }
  }
}
function Hc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Ca(e, t, n, a, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || ga(e, n, t, function(l, r, c) {
    !o && !Ln(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function Yc(e, t, n, a) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Js(i, {
      x: t.x,
      y: t.y
    });
    Bn(h, c, d) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return ga(e, n, t, s), o;
}
function Kc(e, t, n, a, o, s) {
  let i = [];
  const l = Hc(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, g) {
    const v = d.inRange(t.x, t.y, o);
    if (a && !v)
      return;
    const f = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(f)) && !v)
      return;
    const x = l(t, f);
    x < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: g
      }
    ], r = x) : x === r && i.push({
      element: d,
      datasetIndex: h,
      index: g
    });
  }
  return ga(e, n, t, c), i;
}
function $a(e, t, n, a, o, s) {
  return !s && !e.isPointInArea(t) ? [] : n === "r" && !a ? Yc(e, t, n, o) : Kc(e, t, n, a, o, s);
}
function Xo(e, t, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return ga(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, o));
  }), a && !l ? [] : s;
}
var Uc = {
  modes: {
    index(e, t, n, a) {
      const o = Yt(t, e), s = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Ca(e, o, s, a, i) : $a(e, o, s, !1, a, i), r = [];
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
      const o = Yt(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Ca(e, o, s, a, i) : $a(e, o, s, !1, a, i);
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
      const o = Yt(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Ca(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = Yt(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return $a(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = Yt(t, e);
      return Xo(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = Yt(t, e);
      return Xo(e, o, "y", n.intersect, a);
    }
  }
};
const vi = [
  "left",
  "top",
  "right",
  "bottom"
];
function hn(e, t) {
  return e.filter((n) => n.pos === t);
}
function Go(e, t) {
  return e.filter((n) => vi.indexOf(n.pos) === -1 && n.box.axis === t);
}
function fn(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function qc(e) {
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
function Xc(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !vi.includes(o))
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
function Gc(e, t) {
  const n = Xc(e), { vBoxMaxWidth: a, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = o) : (l.width = a, l.height = d ? d * o : r && t.availableHeight);
  }
  return n;
}
function Zc(e) {
  const t = qc(e), n = fn(t.filter((c) => c.box.fullSize), !0), a = fn(hn(t, "left"), !0), o = fn(hn(t, "right")), s = fn(hn(t, "top"), !0), i = fn(hn(t, "bottom")), l = Go(t, "x"), r = Go(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: hn(t, "chartArea"),
    vertical: a.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function Zo(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function yi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Qc(e, t, n, a) {
  const { pos: o, box: s } = n, i = e.maxPadding;
  if (!Ce(o)) {
    n.size && (e[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  s.getPadding && yi(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - Zo(i, e, "left", "right")), r = Math.max(0, t.outerHeight - Zo(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function Jc(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function ed(e, t) {
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
function _n(e, t, n, a) {
  const o = [];
  let s, i, l, r, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, ed(l.horizontal, t));
    const { same: h, other: g } = Qc(t, n, l, a);
    c |= h && o.length, d = d || g, r.fullSize || o.push(l);
  }
  return c && _n(o, t, n, a) || d;
}
function Yn(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function Qo(e, t, n, a) {
  const o = n.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, g = c.size || r.height;
      An(c.start) && (i = c.start), r.fullSize ? Yn(r, o.left, i, n.outerWidth - o.right - o.left, g) : Yn(r, t.left + c.placed, i, h, g), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, g = c.size || r.width;
      An(c.start) && (s = c.start), r.fullSize ? Yn(r, s, o.top, g, n.outerHeight - o.bottom - o.top) : Yn(r, s, t.top + c.placed, g, h), c.start = s, c.placed += h, s = r.right;
    }
  }
  t.x = s, t.y = i;
}
var lt = {
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
    const o = ct(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(n - o.height, 0), l = Zc(e.boxes), r = l.vertical, c = l.horizontal;
    Ae(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, x) => x.box.options && x.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), g = Object.assign({}, o);
    yi(g, ct(a));
    const v = Object.assign({
      maxPadding: g,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), f = Gc(r.concat(c), h);
    _n(l.fullSize, v, h, f), _n(r, v, h, f), _n(c, v, h, f) && _n(r, v, h, f), Jc(v), Qo(l.leftAndTop, v, h, f), v.x += v.w, v.y += v.h, Qo(l.rightAndBottom, v, h, f), e.chartArea = {
      left: v.left,
      top: v.top,
      right: v.left + v.w,
      bottom: v.top + v.h,
      height: v.h,
      width: v.w
    }, Ae(l.chartArea, (y) => {
      const x = y.box;
      Object.assign(x, e.chartArea), x.update(v.w, v.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class _i {
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
class td extends _i {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ea = "$chartjs", nd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Jo = (e) => e === null || e === "";
function ad(e, t) {
  const n = e.style, a = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[ea] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", Jo(o)) {
    const s = Io(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (Jo(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Io(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const xi = Qr ? {
  passive: !0
} : !1;
function od(e, t, n) {
  e && e.addEventListener(t, n, xi);
}
function sd(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, xi);
}
function id(e, t) {
  const n = nd[e.type] || e.type, { x: a, y: o } = Yt(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function ra(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function ld(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || ra(l.addedNodes, a), i = i && !ra(l.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function rd(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || ra(l.removedNodes, a), i = i && !ra(l.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Pn = /* @__PURE__ */ new Map();
let es = 0;
function ki() {
  const e = window.devicePixelRatio;
  e !== es && (es = e, Pn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function cd(e, t) {
  Pn.size || window.addEventListener("resize", ki), Pn.set(e, t);
}
function dd(e) {
  Pn.delete(e), Pn.size || window.removeEventListener("resize", ki);
}
function ud(e, t, n) {
  const a = e.canvas, o = a && oo(a);
  if (!o)
    return;
  const s = ai((l, r) => {
    const c = o.clientWidth;
    n(l, r), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), cd(e, s), i;
}
function Sa(e, t, n) {
  n && n.disconnect(), t === "resize" && dd(e);
}
function hd(e, t, n) {
  const a = e.canvas, o = ai((s) => {
    e.ctx !== null && n(id(s, e));
  }, e);
  return od(a, t, o), o;
}
class fd extends _i {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (ad(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[ea])
      return !1;
    const a = n[ea].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      De(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[ea], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: ld,
      detach: rd,
      resize: ud
    }[n] || hd;
    o[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: Sa,
      detach: Sa,
      resize: Sa
    }[n] || sd)(t, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, o) {
    return Zr(t, n, a, o);
  }
  isAttached(t) {
    const n = t && oo(t);
    return !!(n && n.isConnected);
  }
}
function gd(e) {
  return !ao() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? td : fd;
}
let Mt = class {
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
    return Tn(this.x) && Tn(this.y);
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
function pd(e, t) {
  const n = e.options.ticks, a = md(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? vd(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return yd(t, c, s, i / o), c;
  const d = bd(s, t, o);
  if (i > 0) {
    let h, g;
    const v = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (Kn(t, c, d, De(v) ? 0 : l - v, l), h = 0, g = i - 1; h < g; h++)
      Kn(t, c, d, s[h], s[h + 1]);
    return Kn(t, c, d, r, De(v) ? t.length : r + v), c;
  }
  return Kn(t, c, d), c;
}
function md(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function bd(e, t, n) {
  const a = _d(e), o = t.length / n;
  if (!a)
    return Math.max(o, 1);
  const s = Gl(a);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function vd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function yd(e, t, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function Kn(e, t, n, a, o) {
  const s = pe(a, 0), i = Math.min(pe(o, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), o && (r = o - a, n = r / Math.floor(r / n)), d = s; d < 0; )
    l++, d = Math.round(s + l * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(s + l * n));
}
function _d(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const xd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ts = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ns = (e, t) => Math.min(t || e, e);
function as(e, t) {
  const n = [], a = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(e[Math.floor(s)]);
  return n;
}
function kd(e, t, n) {
  const a = e.ticks.length, o = Math.min(t, a - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function wd(e, t) {
  Ae(e, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function gn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function os(e, t) {
  if (!e.display)
    return 0;
  const n = qe(e.font, t), a = ct(e.padding);
  return (Ne(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function Cd(e, t) {
  return Qt(e, {
    scale: t,
    type: "scale"
  });
}
function $d(e, t, n) {
  return Qt(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Sd(e, t, n) {
  let a = qa(e);
  return (n && t !== "right" || !n && t === "right") && (a = xd(a)), a;
}
function Md(e, t, n, a) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, g, v, f;
  const y = i - o, x = l - s;
  if (e.isHorizontal()) {
    if (v = Ye(a, s, l), Ce(n)) {
      const p = Object.keys(n)[0], b = n[p];
      f = d[p].getPixelForValue(b) + y - t;
    } else n === "center" ? f = (c.bottom + c.top) / 2 + y - t : f = ts(e, n, t);
    g = l - s;
  } else {
    if (Ce(n)) {
      const p = Object.keys(n)[0], b = n[p];
      v = d[p].getPixelForValue(b) - x + t;
    } else n === "center" ? v = (c.left + c.right) / 2 - x + t : v = ts(e, n, t);
    f = Ye(a, i, o), h = n === "left" ? -We : We;
  }
  return {
    titleX: v,
    titleY: f,
    maxWidth: g,
    rotation: h
  };
}
class dn extends Mt {
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
    return t = gt(t, Number.POSITIVE_INFINITY), n = gt(n, Number.NEGATIVE_INFINITY), a = gt(a, Number.POSITIVE_INFINITY), o = gt(o, Number.NEGATIVE_INFINITY), {
      min: gt(t, a),
      max: gt(n, o),
      minDefined: rt(t),
      maxDefined: rt(n)
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
    for (let r = 0, c = l.length; r < c; ++r)
      i = l[r].controller.getMinMax(this, t), o || (n = Math.min(n, i.min)), s || (a = Math.max(a, i.max));
    return n = s && n > a ? a : n, a = o && n > a ? n : a, {
      min: gt(n, gt(a, n)),
      max: gt(a, gt(n, a))
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
    Le(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Ar(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? as(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = pd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Le(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Le(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Le(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Le(this.options[t], [
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
    Le(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Le(n.callback, [
        s.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Le(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Le(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = ns(this.ticks.length, t.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, g = d.highest.height, v = Ue(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : v / (a - 1), h + 6 > l && (l = v / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - gn(t.grid) - n.padding - os(t.title, this.chart.options.font), c = Math.sqrt(h * h + g * g), i = er(Math.min(Math.asin(Ue((d.highest.height + 6) / l, -1, 1)), Math.asin(Ue(r / c, -1, 1)) - Math.asin(Ue(g / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Le(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Le(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = os(o, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = gn(s) + r) : (t.height = this.maxHeight, t.width = gn(s) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: g } = this._getLabelSizes(), v = a.padding * 2, f = $t(this.labelRotation), y = Math.cos(f), x = Math.sin(f);
        if (l) {
          const p = a.mirror ? 0 : x * h.width + y * g.height;
          t.height = Math.min(this.maxHeight, t.height + p + v);
        } else {
          const p = a.mirror ? 0 : y * h.width + x * g.height;
          t.width = Math.min(this.maxWidth, t.width + p + v);
        }
        this._calculatePadding(c, d, x, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let g = 0, v = 0;
      r ? c ? (g = o * t.width, v = a * n.height) : (g = a * t.height, v = o * n.width) : s === "start" ? v = n.width : s === "end" ? g = t.width : s !== "inner" && (g = t.width / 2, v = n.width / 2), this.paddingLeft = Math.max((g - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((v - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Le(this.options.afterFit, [
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
      De(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = as(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(n / ns(n, a));
    let c = 0, d = 0, h, g, v, f, y, x, p, b, _, w, S;
    for (h = 0; h < n; h += r) {
      if (f = t[h].label, y = this._resolveTickFontOptions(h), o.font = x = y.string, p = s[x] = s[x] || {
        data: {},
        gc: []
      }, b = y.lineHeight, _ = w = 0, !De(f) && !Ne(f))
        _ = Bo(o, p.data, p.gc, _, f), w = b;
      else if (Ne(f))
        for (g = 0, v = f.length; g < v; ++g)
          S = f[g], !De(S) && !Ne(S) && (_ = Bo(o, p.data, p.gc, _, S), w += b);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    wd(s, n);
    const M = i.indexOf(c), C = l.indexOf(d), D = (I) => ({
      width: i[I] || 0,
      height: l[I] || 0
    });
    return {
      first: D(0),
      last: D(n - 1),
      widest: D(M),
      highest: D(C),
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
    return nr(this._alignToPixels ? jt(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = $d(this.getContext(), t, a));
    }
    return this.$context || (this.$context = Cd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = $t(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * o ? l / a : r / o : r * o < l * a ? r / a : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), g = gn(s), v = [], f = l.setContext(this.getContext()), y = f.display ? f.width : 0, x = y / 2, p = function(H) {
      return jt(a, H, y);
    };
    let b, _, w, S, M, C, D, I, F, L, R, P;
    if (i === "top")
      b = p(this.bottom), C = this.bottom - g, I = b - x, L = p(t.top) + x, P = t.bottom;
    else if (i === "bottom")
      b = p(this.top), L = t.top, P = p(t.bottom) - x, C = b + x, I = this.top + g;
    else if (i === "left")
      b = p(this.right), M = this.right - g, D = b - x, F = p(t.left) + x, R = t.right;
    else if (i === "right")
      b = p(this.left), F = t.left, R = p(t.right) - x, M = b + x, D = this.left + g;
    else if (n === "x") {
      if (i === "center")
        b = p((t.top + t.bottom) / 2 + 0.5);
      else if (Ce(i)) {
        const H = Object.keys(i)[0], te = i[H];
        b = p(this.chart.scales[H].getPixelForValue(te));
      }
      L = t.top, P = t.bottom, C = b + x, I = C + g;
    } else if (n === "y") {
      if (i === "center")
        b = p((t.left + t.right) / 2);
      else if (Ce(i)) {
        const H = Object.keys(i)[0], te = i[H];
        b = p(this.chart.scales[H].getPixelForValue(te));
      }
      M = b - x, D = M - g, F = t.left, R = t.right;
    }
    const j = pe(o.ticks.maxTicksLimit, h), q = Math.max(1, Math.ceil(h / j));
    for (_ = 0; _ < h; _ += q) {
      const H = this.getContext(_), te = s.setContext(H), ne = l.setContext(H), re = te.lineWidth, W = te.color, X = ne.dash || [], Q = ne.dashOffset, ce = te.tickWidth, ie = te.tickColor, we = te.tickBorderDash || [], be = te.tickBorderDashOffset;
      w = kd(this, _, r), w !== void 0 && (S = jt(a, w, re), c ? M = D = F = R = S : C = I = L = P = S, v.push({
        tx1: M,
        ty1: C,
        tx2: D,
        ty2: I,
        x1: F,
        y1: L,
        x2: R,
        y2: P,
        width: re,
        color: W,
        borderDash: X,
        borderDashOffset: Q,
        tickWidth: ce,
        tickColor: ie,
        tickBorderDash: we,
        tickBorderDashOffset: be
      }));
    }
    return this._ticksLength = h, this._borderValue = b, v;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = s, g = gn(a.grid), v = g + d, f = h ? -d : v, y = -$t(this.labelRotation), x = [];
    let p, b, _, w, S, M, C, D, I, F, L, R, P = "middle";
    if (o === "top")
      M = this.bottom - f, C = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      M = this.top + f, C = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const q = this._getYAxisLabelAlignment(g);
      C = q.textAlign, S = q.x;
    } else if (o === "right") {
      const q = this._getYAxisLabelAlignment(g);
      C = q.textAlign, S = q.x;
    } else if (n === "x") {
      if (o === "center")
        M = (t.top + t.bottom) / 2 + v;
      else if (Ce(o)) {
        const q = Object.keys(o)[0], H = o[q];
        M = this.chart.scales[q].getPixelForValue(H) + v;
      }
      C = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        S = (t.left + t.right) / 2 - v;
      else if (Ce(o)) {
        const q = Object.keys(o)[0], H = o[q];
        S = this.chart.scales[q].getPixelForValue(H);
      }
      C = this._getYAxisLabelAlignment(g).textAlign;
    }
    n === "y" && (r === "start" ? P = "top" : r === "end" && (P = "bottom"));
    const j = this._getLabelSizes();
    for (p = 0, b = l.length; p < b; ++p) {
      _ = l[p], w = _.label;
      const q = s.setContext(this.getContext(p));
      D = this.getPixelForTick(p) + s.labelOffset, I = this._resolveTickFontOptions(p), F = I.lineHeight, L = Ne(w) ? w.length : 1;
      const H = L / 2, te = q.color, ne = q.textStrokeColor, re = q.textStrokeWidth;
      let W = C;
      i ? (S = D, C === "inner" && (p === b - 1 ? W = this.options.reverse ? "left" : "right" : p === 0 ? W = this.options.reverse ? "right" : "left" : W = "center"), o === "top" ? c === "near" || y !== 0 ? R = -L * F + F / 2 : c === "center" ? R = -j.highest.height / 2 - H * F + F : R = -j.highest.height + F / 2 : c === "near" || y !== 0 ? R = F / 2 : c === "center" ? R = j.highest.height / 2 - H * F : R = j.highest.height - L * F, h && (R *= -1), y !== 0 && !q.showLabelBackdrop && (S += F / 2 * Math.sin(y))) : (M = D, R = (1 - L) * F / 2);
      let X;
      if (q.showLabelBackdrop) {
        const Q = ct(q.backdropPadding), ce = j.heights[p], ie = j.widths[p];
        let we = R - Q.top, be = 0 - Q.left;
        switch (P) {
          case "middle":
            we -= ce / 2;
            break;
          case "bottom":
            we -= ce;
            break;
        }
        switch (C) {
          case "center":
            be -= ie / 2;
            break;
          case "right":
            be -= ie;
            break;
          case "inner":
            p === b - 1 ? be -= ie : p > 0 && (be -= ie / 2);
            break;
        }
        X = {
          left: be,
          top: we,
          width: ie + Q.width,
          height: ce + Q.height,
          color: q.backdropColor
        };
      }
      x.push({
        label: w,
        font: I,
        textOffset: R,
        options: {
          rotation: y,
          color: te,
          strokeColor: ne,
          strokeWidth: re,
          textAlign: W,
          textBaseline: P,
          translation: [
            S,
            M
          ],
          backdrop: X
        }
      });
    }
    return x;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-$t(this.labelRotation))
      return t === "top" ? "left" : "right";
    let o = "center";
    return n.align === "start" ? o = "left" : n.align === "end" ? o = "right" : n.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: o, padding: s } } = this.options, i = this._getLabelSizes(), l = t + s, r = i.widest.width;
    let c, d;
    return n === "left" ? o ? (d = this.right + s, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d += r)) : (d = this.right - l, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d = this.left)) : n === "right" ? o ? (d = this.left + s, a === "near" ? c = "right" : a === "center" ? (c = "center", d -= r / 2) : (c = "left", d -= r)) : (d = this.left + l, a === "near" ? c = "left" : a === "center" ? (c = "center", d += r / 2) : (c = "right", d = this.right)) : c = "right", {
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
    const l = (r, c, d) => {
      !d.width || !d.color || (a.save(), a.lineWidth = d.width, a.strokeStyle = d.color, a.setLineDash(d.borderDash || []), a.lineDashOffset = d.borderDashOffset, a.beginPath(), a.moveTo(r.x, r.y), a.lineTo(c.x, c.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (s = 0, i = o.length; s < i; ++s) {
        const r = o[s];
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
    const { chart: t, ctx: n, options: { border: a, grid: o } } = this, s = a.setContext(this.getContext()), i = a.display ? s.width : 0;
    if (!i)
      return;
    const l = o.setContext(this.getContext(0)).lineWidth, r = this._borderValue;
    let c, d, h, g;
    this.isHorizontal() ? (c = jt(t, this.left, i) - i / 2, d = jt(t, this.right, l) + l / 2, h = g = r) : (h = jt(t, this.top, i) - i / 2, g = jt(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, g), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && Za(a, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Fn(a, c, 0, d, r, l);
    }
    o && Qa(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = qe(a.font), i = ct(a.padding), l = a.align;
    let r = s.lineHeight / 2;
    n === "bottom" || n === "center" || Ce(n) ? (r += i.bottom, Ne(a.text) && (r += s.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: g } = Md(this, r, n, l);
    Fn(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: h,
      rotation: g,
      textAlign: Sd(l, n, o),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = pe(t.grid && t.grid.z, -1), o = pe(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== dn.prototype.draw ? [
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
    return qe(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Un {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Td(n) && (a = this.register(n));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, Dd(t, i, a), this.override && Oe.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in Oe[o] && (delete Oe[o][a], this.override && delete Zt[a]);
  }
}
function Dd(e, t, n) {
  const a = Dn(/* @__PURE__ */ Object.create(null), [
    n ? Oe.get(n) : {},
    Oe.get(t),
    e.defaults
  ]);
  Oe.set(t, a), e.defaultRoutes && Ad(t, e.defaultRoutes), e.descriptors && Oe.describe(t, e.descriptors);
}
function Ad(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    Oe.route(s, o, r, l);
  });
}
function Td(e) {
  return "id" in e && "defaults" in e;
}
class Bd {
  constructor() {
    this.controllers = new Un(fa, "datasets", !0), this.elements = new Un(Mt, "elements"), this.plugins = new Un(Object, "plugins"), this.scales = new Un(dn, "scales"), this._typedRegistries = [
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
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Ae(o, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = Ka(t);
    Le(a["before" + o], [], a), n[t](a), Le(a["after" + o], [], a);
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
var mt = /* @__PURE__ */ new Bd();
class Ld {
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
      const i = s.plugin, l = i[a], r = [
        n,
        o,
        s.options
      ];
      if (Le(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    De(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, o = pe(a.options && a.options.plugins, {}), s = Fd(a);
    return o === !1 && !n ? [] : Ed(t, s, o, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(n, a), t, "stop"), this._notify(o(a, n), t, "start");
  }
}
function Fd(e) {
  const t = {}, n = [], a = Object.keys(mt.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push(mt.getPlugin(a[s]));
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
function Pd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Ed(e, { plugins: t, localIds: n }, a, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = Pd(a[r], o);
    c !== null && s.push({
      plugin: l,
      options: Id(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return s;
}
function Id(e, { plugin: t, local: n }, a, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(a, s);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Oa(e, t) {
  const n = Oe.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Rd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function Od(e, t) {
  return e === t ? "_index_" : "_value_";
}
function ss(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Vd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Va(e, ...t) {
  if (ss(e))
    return e;
  for (const n of t) {
    const a = n.axis || Vd(n.position) || e.length > 1 && ss(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function is(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function zd(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return is(e, "x", n[0]) || is(e, "y", n[0]);
  }
  return {};
}
function Nd(e, t) {
  const n = Zt[e.type] || {
    scales: {}
  }, a = t.scales || {}, o = Oa(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!Ce(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Va(i, l, zd(i, e), Oe.scales[l.type]), c = Od(r, o), d = n.scales || {};
    s[i] = kn(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Oa(l, t), d = (Zt[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const g = Rd(h, r), v = i[g + "AxisID"] || g;
      s[v] = s[v] || /* @__PURE__ */ Object.create(null), kn(s[v], [
        {
          axis: g
        },
        a[v],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    kn(l, [
      Oe.scales[l.type],
      Oe.scale
    ]);
  }), s;
}
function wi(e) {
  const t = e.options || (e.options = {});
  t.plugins = pe(t.plugins, {}), t.scales = Nd(e, t);
}
function Ci(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Wd(e) {
  return e = e || {}, e.data = Ci(e.data), wi(e), e;
}
const ls = /* @__PURE__ */ new Map(), $i = /* @__PURE__ */ new Set();
function qn(e, t) {
  let n = ls.get(e);
  return n || (n = t(), ls.set(e, n), $i.add(n)), n;
}
const pn = (e, t, n) => {
  const a = Gt(t, n);
  a !== void 0 && e.add(a);
};
class jd {
  constructor(t) {
    this._config = Wd(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Ci(t);
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
    this.clearCache(), wi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return qn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return qn(`${t}.transition.${n}`, () => [
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
    return qn(`${t}-${n}`, () => [
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
    return qn(`${a}-plugin-${n}`, () => [
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
    const r = /* @__PURE__ */ new Set();
    n.forEach((d) => {
      t && (r.add(t), d.forEach((h) => pn(r, t, h))), d.forEach((h) => pn(r, o, h)), d.forEach((h) => pn(r, Zt[s] || {}, h)), d.forEach((h) => pn(r, Oe, h)), d.forEach((h) => pn(r, Ia, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), $i.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Zt[n] || {},
      Oe.datasets[n] || {},
      {
        type: n
      },
      Oe,
      Ia
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = rs(this._resolverCache, t, o);
    let r = i;
    if (Yd(i, n)) {
      s.$shared = !1, a = Vt(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = rn(i, a, c);
    }
    for (const c of n)
      s[c] = r[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], o) {
    const { resolver: s } = rs(this._resolverCache, t, a);
    return Ce(n) ? rn(s, n, void 0, o) : s;
  }
}
function rs(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: eo(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const Hd = (e) => Ce(e) && Object.getOwnPropertyNames(e).some((t) => Vt(e[t]));
function Yd(e, t) {
  const { isScriptable: n, isIndexable: a } = li(e);
  for (const o of t) {
    const s = n(o), i = a(o), l = (i || s) && e[o];
    if (s && (Vt(l) || Hd(l)) || i && Ne(l))
      return !0;
  }
  return !1;
}
var Kd = "4.5.1";
const Ud = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function cs(e, t) {
  return e === "top" || e === "bottom" || Ud.indexOf(e) === -1 && t === "x";
}
function ds(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function us(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Le(n && n.onComplete, [
    e
  ], t);
}
function qd(e) {
  const t = e.chart, n = t.options.animation;
  Le(n && n.onProgress, [
    e
  ], t);
}
function Si(e) {
  return ao() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ta = {}, hs = (e) => {
  const t = Si(e);
  return Object.values(ta).filter((n) => n.canvas === t).pop();
};
function Xd(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function Gd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let zt = class {
  static defaults = Oe;
  static instances = ta;
  static overrides = Zt;
  static registry = mt;
  static version = Kd;
  static getChart = hs;
  static register(...t) {
    mt.add(...t), fs();
  }
  static unregister(...t) {
    mt.remove(...t), fs();
  }
  constructor(t, n) {
    const a = this.config = new jd(n), o = Si(t), s = hs(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || gd(o))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = Nl(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Ld(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ir((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ta[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    kt.listen(this, "complete", us), kt.listen(this, "progress", qd), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return De(t) ? n && s ? s : o ? a / o : null : t;
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
    return mt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Eo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Lo(this.canvas, this.ctx), this;
  }
  stop() {
    return kt.stop(this), this;
  }
  resize(t, n) {
    kt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, n, s), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Eo(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Le(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Ae(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, o = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Va(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Ae(s, (i) => {
      const l = i.options, r = l.id, c = Va(r, l), d = pe(l.type, i.dtype);
      (l.position === void 0 || cs(l.position, c) !== cs(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const g = mt.getScale(d);
        h = new g({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Ae(o, (i, l) => {
      i || delete a[l];
    }), Ae(a, (i) => {
      lt.configure(this, i, i.options), lt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(ds("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = s.indexAxis || Oa(l, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = mt.getController(l), { datasetElementType: c, dataElementType: d } = Oe.datasets[l];
        Object.assign(r, {
          dataElementType: mt.getElement(d),
          datasetElementType: c && mt.getElement(c)
        }), i.controller = new r(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Ae(this.data.datasets, (t, n) => {
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
    for (let c = 0, d = this.data.datasets.length; c < d; c++) {
      const { controller: h } = this.getDatasetMeta(c), g = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(g), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Ae(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ds("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Ae(this.scales, (t) => {
      lt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!ko(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      Xd(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!ko(o, a(s)))
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
    lt.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Ae(this.boxes, (o) => {
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
        this._updateDataset(n, Vt(t) ? t({
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
    }) !== !1 && (kt.has(this) ? this.attached && !kt.running(this) && kt.start(this) : (this.draw(), us({
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
    }, o = hc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && Za(n, o), t.controller.draw(), o && Qa(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Ln(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, o) {
    const s = Uc.modes[n];
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
    return this.$context || (this.$context = Qt(null, {
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
    An(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
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
    for (this.stop(), kt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Lo(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ta[this.id], this.notifyPlugins("afterDestroy");
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
    Ae(this.options.events, (s) => a(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (r, c) => {
      n.addEventListener(this, r, c), t[r] = c;
    }, o = (r, c) => {
      t[r] && (n.removeEventListener(this, r, c), delete t[r]);
    }, s = (r, c) => {
      this.canvas && this.resize(r, c);
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
    Ae(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Ae(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const o = a ? "set" : "remove";
    let s, i, l, r;
    for (n === "dataset" && (s = this.getDatasetMeta(t[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), l = 0, r = t.length; l < r; ++l) {
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
    !aa(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const o = this.options.hover, s = (r, c) => r.filter((d) => !c.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), i = s(n, t), l = a ? t : s(t, n);
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
    const { _active: o = [], options: s } = this, i = n, l = this._getActiveElements(t, o, a, i), r = Ul(t), c = Gd(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Le(s.onHover, [
      t,
      l,
      this
    ], this), r && Le(s.onClick, [
      t,
      l,
      this
    ], this));
    const d = !aa(l, o);
    return (d || n) && (this._active = l, this._updateHoverStyles(l, o, n)), this._lastEvent = c, d;
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
function fs() {
  return Ae(zt.instances, (e) => e._plugins.invalidate());
}
function Zd(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, ut(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const g = Math.min(c / l, ut(a - n));
    e.arc(o, s, l + c / 2, n - g / 2, a + g / 2, !0);
  } else {
    const g = Math.min(c / 2, i * ut(a - n));
    if (d === "round")
      e.arc(o, s, g, n - Te / 2, a + Te / 2, !0);
    else if (d === "bevel") {
      const v = 2 * g * g, f = -v * Math.cos(n + Te / 2) + o, y = -v * Math.sin(n + Te / 2) + s, x = v * Math.cos(a + Te / 2) + o, p = v * Math.sin(a + Te / 2) + s;
      e.lineTo(f, y), e.lineTo(x, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Qd(e, t, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, a - c, n + c), r > o ? (c = o / r, e.arc(s, i, r, n + c, a - c, !0)) : e.arc(s, i, o, n + We, a - We), e.closePath(), e.clip();
}
function Jd(e) {
  return Ja(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function eu(e, t, n, a) {
  const o = Jd(e.options.borderRadius), s = (n - t) / 2, i = Math.min(s, a * t / 2), l = (r) => {
    const c = (n - Math.min(s, r)) * a / 2;
    return Ue(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: Ue(o.innerStart, 0, i),
    innerEnd: Ue(o.innerEnd, 0, i)
  };
}
function en(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ca(e, t, n, a, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), g = d > 0 ? d + a + n + c : 0;
  let v = 0;
  const f = o - r;
  if (a) {
    const q = d > 0 ? d - a : 0, H = h > 0 ? h - a : 0, te = (q + H) / 2, ne = te !== 0 ? f * te / (te + a) : f;
    v = (f - ne) / 2;
  }
  const y = Math.max(1e-3, f * h - n / Te) / h, x = (f - y) / 2, p = r + x + v, b = o - x - v, { outerStart: _, outerEnd: w, innerStart: S, innerEnd: M } = eu(t, g, h, b - p), C = h - _, D = h - w, I = p + _ / C, F = b - w / D, L = g + S, R = g + M, P = p + S / L, j = b - M / R;
  if (e.beginPath(), s) {
    const q = (I + F) / 2;
    if (e.arc(i, l, h, I, q), e.arc(i, l, h, q, F), w > 0) {
      const re = en(D, F, i, l);
      e.arc(re.x, re.y, w, F, b + We);
    }
    const H = en(R, b, i, l);
    if (e.lineTo(H.x, H.y), M > 0) {
      const re = en(R, j, i, l);
      e.arc(re.x, re.y, M, b + We, j + Math.PI);
    }
    const te = (b - M / g + (p + S / g)) / 2;
    if (e.arc(i, l, g, b - M / g, te, !0), e.arc(i, l, g, te, p + S / g, !0), S > 0) {
      const re = en(L, P, i, l);
      e.arc(re.x, re.y, S, P + Math.PI, p - We);
    }
    const ne = en(C, p, i, l);
    if (e.lineTo(ne.x, ne.y), _ > 0) {
      const re = en(C, I, i, l);
      e.arc(re.x, re.y, _, p - We, I);
    }
  } else {
    e.moveTo(i, l);
    const q = Math.cos(I) * h + i, H = Math.sin(I) * h + l;
    e.lineTo(q, H);
    const te = Math.cos(F) * h + i, ne = Math.sin(F) * h + l;
    e.lineTo(te, ne);
  }
  e.closePath();
}
function tu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    ca(e, t, n, a, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ie || Ie));
  }
  return ca(e, t, n, a, r, o), e.fill(), r;
}
function nu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: g, borderRadius: v } = r, f = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = g, f ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (s) {
    ca(e, t, n, a, y, o);
    for (let x = 0; x < s; ++x)
      e.stroke();
    isNaN(l) || (y = i + (l % Ie || Ie));
  }
  f && Qd(e, t, y), r.selfJoin && y - i >= Te && v === 0 && d !== "miter" && Zd(e, t, y), s || (ca(e, t, n, a, y, o), e.stroke());
}
class au extends Mt {
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
    ], a), { angle: s, distance: i } = Js(o, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), g = (this.options.spacing + this.options.borderWidth) / 2, v = pe(h, r - l), f = Bn(s, l, r) && l !== r, y = v >= Ie || f, x = Lt(i, c + g, d + g);
    return y && x;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: o, endAngle: s, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: r, spacing: c } = this.options, d = (o + s) / 2, h = (i + l + c + r) / 2;
    return {
      x: n + Math.cos(d) * h,
      y: a + Math.sin(d) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, o = (n.offset || 0) / 4, s = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ie ? Math.floor(a / Ie) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(Te, a || 0)), c = o * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, tu(t, this, c, s, i), nu(t, this, c, s, i), t.restore();
  }
}
function Mi(e, t, n = t) {
  e.lineCap = pe(n.borderCapStyle, t.borderCapStyle), e.setLineDash(pe(n.borderDash, t.borderDash)), e.lineDashOffset = pe(n.borderDashOffset, t.borderDashOffset), e.lineJoin = pe(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = pe(n.borderWidth, t.borderWidth), e.strokeStyle = pe(n.borderColor, t.borderColor);
}
function ou(e, t, n) {
  e.lineTo(n.x, n.y);
}
function su(e) {
  return e.stepped ? _r : e.tension || e.cubicInterpolationMode === "monotone" ? xr : ou;
}
function Di(e, t, n = {}) {
  const a = e.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), d = o < i && s < i || o > l && s > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function iu(e, t, n, a) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = Di(o, n, a), d = su(s);
  let { move: h = !0, reverse: g } = a || {}, v, f, y;
  for (v = 0; v <= c; ++v)
    f = o[(l + (g ? c - v : v)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : d(e, y, f, g, s.stepped), y = f);
  return r && (f = o[(l + (g ? c : 0)) % i], d(e, y, f, g, s.stepped)), !!r;
}
function lu(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: l } = Di(o, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, g, v, f, y, x, p;
  const b = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    y !== x && (e.lineTo(d, x), e.lineTo(d, y), e.lineTo(d, p));
  };
  for (r && (v = o[b(0)], e.moveTo(v.x, v.y)), g = 0; g <= l; ++g) {
    if (v = o[b(g)], v.skip)
      continue;
    const w = v.x, S = v.y, M = w | 0;
    M === f ? (S < y ? y = S : S > x && (x = S), d = (h * d + w) / ++h) : (_(), e.lineTo(w, S), f = M, h = 0, y = x = S), p = S;
  }
  _();
}
function za(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? lu : iu;
}
function ru(e) {
  return e.stepped ? Jr : e.tension || e.cubicInterpolationMode === "monotone" ? ec : Kt;
}
function cu(e, t, n, a) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, n, a) && o.closePath()), Mi(e, t.options), e.stroke(o);
}
function du(e, t, n, a) {
  const { segments: o, options: s } = t, i = za(t);
  for (const l of o)
    Mi(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const uu = typeof Path2D == "function";
function hu(e, t, n, a) {
  uu && !t.options.segment ? cu(e, t, n, a) : du(e, t, n, a);
}
class fu extends Mt {
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
      Yr(this._points, a, t, o, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = rc(this, this.options.segment));
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
    const a = this.options, o = t[n], s = this.points, i = sc(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = ru(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: g } = i[c], v = s[h], f = s[g];
      if (v === f) {
        l.push(v);
        continue;
      }
      const y = Math.abs((o - v[n]) / (f[n] - v[n])), x = r(v, f, y, a.stepped);
      x[n] = t[n], l.push(x);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return za(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = za(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), hu(t, this, a, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function gs(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class gu extends Mt {
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
    return gs(this, t, "x", n);
  }
  inYRange(t, n) {
    return gs(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Ln(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ra(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Ai(e, t) {
  const { x: n, y: a, base: o, width: s, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, r, c, d, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, o), r = Math.max(n, o), c = a - h, d = a + h) : (h = s / 2, l = n - h, r = n + h, c = Math.min(a, o), d = Math.max(a, o)), {
    left: l,
    top: c,
    right: r,
    bottom: d
  };
}
function Pt(e, t, n, a) {
  return e ? 0 : Ue(t, n, a);
}
function pu(e, t, n) {
  const a = e.options.borderWidth, o = e.borderSkipped, s = ii(a);
  return {
    t: Pt(o.top, s.top, 0, n),
    r: Pt(o.right, s.right, 0, t),
    b: Pt(o.bottom, s.bottom, 0, n),
    l: Pt(o.left, s.left, 0, t)
  };
}
function mu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = an(o), i = Math.min(t, n), l = e.borderSkipped, r = a || Ce(o);
  return {
    topLeft: Pt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: Pt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: Pt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: Pt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function bu(e) {
  const t = Ai(e), n = t.right - t.left, a = t.bottom - t.top, o = pu(e, n / 2, a / 2), s = mu(e, n / 2, a / 2);
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
function Ma(e, t, n, a) {
  const o = t === null, s = n === null, l = e && !(o && s) && Ai(e, a);
  return l && (o || Lt(t, l.left, l.right)) && (s || Lt(n, l.top, l.bottom));
}
function vu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function yu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Da(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class _u extends Mt {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = bu(this), l = vu(i.radius) ? ia : yu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Da(i, n, s)), t.clip(), l(t, Da(s, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Da(s, n)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Ma(this, t, n, a);
  }
  inXRange(t, n) {
    return Ma(this, t, null, n);
  }
  inYRange(t, n) {
    return Ma(this, null, t, n);
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
const ps = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, xu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class ms extends Mt {
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
    let n = Le(t.generateLabels, [
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
    const a = t.labels, o = qe(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = ps(a, s);
    let c, d;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + l;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let g = -1, v = -d;
    return this.legendItems.forEach((f, y) => {
      const x = a + n / 2 + s.measureText(f.text).width;
      (y === 0 || c[c.length - 1] + x + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, v += d, g++), r[y] = {
        left: 0,
        top: v,
        row: g,
        width: x,
        height: o
      }, c[c.length - 1] += x + l;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, g = 0, v = 0, f = 0, y = 0;
    return this.legendItems.forEach((x, p) => {
      const { itemWidth: b, itemHeight: _ } = ku(a, n, s, x, o);
      p > 0 && v + _ + 2 * l > d && (h += g + l, c.push({
        width: g,
        height: v
      }), f += g + l, y++, g = v = 0), r[p] = {
        left: f,
        top: v,
        col: y,
        width: b,
        height: _
      }, g = Math.max(g, b), v += _ + l;
    }), h += g, c.push({
      width: g,
      height: v
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = on(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Ye(a, this.left + o, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Ye(a, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = Ye(a, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Ye(a, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Za(t, this), this._draw(), Qa(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = t, l = Oe.color, r = on(t.rtl, this.left, this.width), c = qe(i.font), { padding: d } = i, h = c.size, g = h / 2;
    let v;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: f, boxHeight: y, itemHeight: x } = ps(i, h), p = function(M, C, D) {
      if (isNaN(f) || f <= 0 || isNaN(y) || y < 0)
        return;
      o.save();
      const I = pe(D.lineWidth, 1);
      if (o.fillStyle = pe(D.fillStyle, l), o.lineCap = pe(D.lineCap, "butt"), o.lineDashOffset = pe(D.lineDashOffset, 0), o.lineJoin = pe(D.lineJoin, "miter"), o.lineWidth = I, o.strokeStyle = pe(D.strokeStyle, l), o.setLineDash(pe(D.lineDash, [])), i.usePointStyle) {
        const F = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: D.pointStyle,
          rotation: D.rotation,
          borderWidth: I
        }, L = r.xPlus(M, f / 2), R = C + g;
        si(o, F, L, R, i.pointStyleWidth && f);
      } else {
        const F = C + Math.max((h - y) / 2, 0), L = r.leftForLtr(M, f), R = an(D.borderRadius);
        o.beginPath(), Object.values(R).some((P) => P !== 0) ? ia(o, {
          x: L,
          y: F,
          w: f,
          h: y,
          radius: R
        }) : o.rect(L, F, f, y), o.fill(), I !== 0 && o.stroke();
      }
      o.restore();
    }, b = function(M, C, D) {
      Fn(o, D.text, M, C + x / 2, c, {
        strikethrough: D.hidden,
        textAlign: r.textAlign(D.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? v = {
      x: Ye(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : v = {
      x: this.left + d,
      y: Ye(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, hi(this.ctx, t.textDirection);
    const S = x + d;
    this.legendItems.forEach((M, C) => {
      o.strokeStyle = M.fontColor, o.fillStyle = M.fontColor;
      const D = o.measureText(M.text).width, I = r.textAlign(M.textAlign || (M.textAlign = i.textAlign)), F = f + g + D;
      let L = v.x, R = v.y;
      r.setWidth(this.width), _ ? C > 0 && L + F + d > this.right && (R = v.y += S, v.line++, L = v.x = Ye(s, this.left + d, this.right - a[v.line])) : C > 0 && R + S > this.bottom && (L = v.x = L + n[v.line].width + d, v.line++, R = v.y = Ye(s, this.top + w + d, this.bottom - n[v.line].height));
      const P = r.x(L);
      if (p(P, R, M), L = lr(I, L + f + g, _ ? L + F : this.right, t.rtl), b(r.x(L), R, M), _)
        v.x += F + d;
      else if (typeof M.text != "string") {
        const j = c.lineHeight;
        v.y += Ti(M, j) + d;
      } else
        v.y += S;
    }), fi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = qe(n.font), o = ct(n.padding);
    if (!n.display)
      return;
    const s = on(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = o.top + r;
    let d, h = this.left, g = this.width;
    if (this.isHorizontal())
      g = Math.max(...this.lineWidths), d = this.top + c, h = Ye(t.align, h, this.right - g);
    else {
      const f = this.columnSizes.reduce((y, x) => Math.max(y, x.height), 0);
      d = c + Ye(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const v = Ye(l, h, h + g);
    i.textAlign = s.textAlign(qa(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Fn(i, n.text, v, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = qe(t.font), a = ct(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, o, s;
    if (Lt(t, this.left, this.right) && Lt(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], Lt(t, o.left, o.left + o.width) && Lt(n, o.top, o.top + o.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!$u(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = xu(o, a);
      o && !s && Le(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Le(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Le(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function ku(e, t, n, a, o) {
  const s = wu(a, e, t, n), i = Cu(o, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function wu(e, t, n, a) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + n.size / 2 + a.measureText(o).width;
}
function Cu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Ti(t, n)), a;
}
function Ti(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function $u(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var io = {
  id: "legend",
  _element: ms,
  start(e, t, n) {
    const a = e.legend = new ms({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    lt.configure(e, a, n), lt.addBox(e, a);
  },
  stop(e) {
    lt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    lt.configure(e, a, n), a.options = n;
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
        return e._getSortedDatasetMetas().map((r) => {
          const c = r.controller.getStyle(n ? 0 : void 0), d = ct(c.borderWidth);
          return {
            text: t[r.index].label,
            fillStyle: c.backgroundColor,
            fontColor: s,
            hidden: !r.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: a || c.pointStyle,
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
class Bi extends Mt {
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
    const o = Ne(a.text) ? a.text.length : 1;
    this._padding = ct(a.padding);
    const s = o * qe(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Ye(l, a, s), h = n + t, c = s - a) : (i.position === "left" ? (d = a + t, h = Ye(l, o, n), r = Te * -0.5) : (d = s - t, h = Ye(l, n, o), r = Te * 0.5), c = o - n), {
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
    const a = qe(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Fn(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: qa(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Su(e, t) {
  const n = new Bi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  lt.configure(e, n, t), lt.addBox(e, n), e.titleBlock = n;
}
var Li = {
  id: "title",
  _element: Bi,
  start(e, t, n) {
    Su(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    lt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    lt.configure(e, a, n), a.options = n;
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
const xn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const r = l.tooltipPosition();
        a.add(r.x), o += r.y, ++s;
      }
    }
    return s === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, r) => l + r) / a.size,
      y: o / s
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, o = Number.POSITIVE_INFINITY, s, i, l;
    for (s = 0, i = e.length; s < i; ++s) {
      const r = e[s].element;
      if (r && r.hasValue()) {
        const c = r.getCenterPoint(), d = Ea(t, c);
        d < o && (o = d, l = r);
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
function pt(e, t) {
  return t && (Ne(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function wt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Mu(e, t) {
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
function bs(e, t) {
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = qe(t.bodyFont), c = qe(t.titleFont), d = qe(t.footerFont), h = s.length, g = o.length, v = a.length, f = ct(t.padding);
  let y = f.height, x = 0, p = a.reduce((w, S) => w + S.before.length + S.lines.length + S.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += v * w + (p - v) * r.lineHeight + (p - 1) * t.bodySpacing;
  }
  g && (y += t.footerMarginTop + g * d.lineHeight + (g - 1) * t.footerSpacing);
  let b = 0;
  const _ = function(w) {
    x = Math.max(x, n.measureText(w).width + b);
  };
  return n.save(), n.font = c.string, Ae(e.title, _), n.font = r.string, Ae(e.beforeBody.concat(e.afterBody), _), b = t.displayColors ? i + 2 + t.boxPadding : 0, Ae(a, (w) => {
    Ae(w.before, _), Ae(w.lines, _), Ae(w.after, _);
  }), b = 0, n.font = d.string, Ae(e.footer, _), n.restore(), x += f.width, {
    width: x,
    height: y
  };
}
function Du(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Au(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function Tu(e, t, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), Au(c, e, t, n) && (c = "center"), c;
}
function vs(e, t, n) {
  const a = n.yAlign || t.yAlign || Du(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Tu(e, t, n, a),
    yAlign: a
  };
}
function Bu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function Lu(e, t, n) {
  let { y: a, height: o } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= o + n : a -= o / 2, a;
}
function ys(e, t, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: g, bottomRight: v } = an(i);
  let f = Bu(t, l);
  const y = Lu(t, r, c);
  return r === "center" ? l === "left" ? f += c : l === "right" && (f -= c) : l === "left" ? f -= Math.max(d, g) + o : l === "right" && (f += Math.max(h, v) + o), {
    x: Ue(f, 0, a.width - t.width),
    y: Ue(y, 0, a.height - t.height)
  };
}
function Xn(e, t, n) {
  const a = ct(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function _s(e) {
  return pt([], wt(e));
}
function Fu(e, t, n) {
  return Qt(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function xs(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Fi = {
  beforeTitle: xt,
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
  afterTitle: xt,
  beforeBody: xt,
  beforeLabel: xt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return De(n) || (t += n), t;
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
  afterLabel: xt,
  afterBody: xt,
  beforeFooter: xt,
  footer: xt,
  afterFooter: xt
};
function Ze(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? Fi[t].call(n, a) : o;
}
class ks extends Mt {
  static positioners = xn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new pi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Fu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, o = Ze(a, "beforeTitle", this, t), s = Ze(a, "title", this, t), i = Ze(a, "afterTitle", this, t);
    let l = [];
    return l = pt(l, wt(o)), l = pt(l, wt(s)), l = pt(l, wt(i)), l;
  }
  getBeforeBody(t, n) {
    return _s(Ze(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return Ae(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = xs(a, s);
      pt(i.before, wt(Ze(l, "beforeLabel", this, s))), pt(i.lines, Ze(l, "label", this, s)), pt(i.after, wt(Ze(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, n) {
    return _s(Ze(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, o = Ze(a, "beforeFooter", this, t), s = Ze(a, "footer", this, t), i = Ze(a, "afterFooter", this, t);
    let l = [];
    return l = pt(l, wt(o)), l = pt(l, wt(s)), l = pt(l, wt(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(Mu(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, g) => t.filter(d, h, g, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Ae(l, (d) => {
      const h = xs(t.callbacks, d);
      o.push(Ze(h, "labelColor", this, d)), s.push(Ze(h, "labelPointStyle", this, d)), i.push(Ze(h, "labelTextColor", this, d));
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
      const l = xn[a.position].call(this, o, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = bs(this, a), c = Object.assign({}, l, r), d = vs(this.chart, a, c), h = ys(a, c, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: r.width,
        height: r.height,
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = an(l), { x: g, y: v } = t, { width: f, height: y } = n;
    let x, p, b, _, w, S;
    return s === "center" ? (w = v + y / 2, o === "left" ? (x = g, p = x - i, _ = w + i, S = w - i) : (x = g + f, p = x + i, _ = w - i, S = w + i), b = x) : (o === "left" ? p = g + Math.max(r, d) + i : o === "right" ? p = g + f - Math.max(c, h) - i : p = this.caretX, s === "top" ? (_ = v, w = _ - i, x = p - i, b = p + i) : (_ = v + y, w = _ + i, x = p + i, b = p - i), S = _), {
      x1: x,
      x2: p,
      x3: b,
      y1: _,
      y2: w,
      y3: S
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = on(a.rtl, this.x, this.width);
      for (t.x = Xn(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = qe(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = s, d = qe(s.bodyFont), h = Xn(this, "left", s), g = o.x(h), v = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, f = n.y + v;
    if (s.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, x = o.leftForLtr(g, c) + c / 2, p = f + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ra(t, y, x, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ra(t, y, x, p);
    } else {
      t.lineWidth = Ce(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = o.leftForLtr(g, c), x = o.leftForLtr(o.xPlus(g, 1), c - 2), p = an(i.borderRadius);
      Object.values(p).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, ia(t, {
        x: y,
        y: f,
        w: c,
        h: r,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), ia(t, {
        x,
        y: f + 1,
        w: c - 2,
        h: r - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(y, f, c, r), t.strokeRect(y, f, c, r), t.fillStyle = i.backgroundColor, t.fillRect(x, f + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = qe(a.bodyFont);
    let g = h.lineHeight, v = 0;
    const f = on(a.rtl, this.x, this.width), y = function(D) {
      n.fillText(D, f.x(t.x + v), t.y + g / 2), t.y += g + s;
    }, x = f.textAlign(i);
    let p, b, _, w, S, M, C;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Xn(this, x, a), n.fillStyle = a.bodyColor, Ae(this.beforeBody, y), v = l && x !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, M = o.length; w < M; ++w) {
      for (p = o[w], b = this.labelTextColors[w], n.fillStyle = b, Ae(p.before, y), _ = p.lines, l && _.length && (this._drawColorBox(n, t, w, f, a), g = Math.max(h.lineHeight, r)), S = 0, C = _.length; S < C; ++S)
        y(_[S]), g = h.lineHeight;
      Ae(p.after, y);
    }
    v = 0, g = h.lineHeight, Ae(this.afterBody, y), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = on(a.rtl, this.x, this.width);
      for (t.x = Xn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = qe(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: g, bottomLeft: v, bottomRight: f } = an(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(l + c - g, r), n.quadraticCurveTo(l + c, r, l + c, r + g), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(l + c, r + d - f), n.quadraticCurveTo(l + c, r + d, l + c - f, r + d), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(l + v, r + d), n.quadraticCurveTo(l, r + d, l, r + d - v), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = xn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = bs(this, t), r = Object.assign({}, i, this._size), c = vs(n, t, r), d = ys(t, r, c, n);
      (o._to !== d.x || s._to !== d.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, d));
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
    const i = ct(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(s, t, o, n), hi(t, n.textDirection), s.y += i.top, this.drawTitle(s, t, n), this.drawBody(s, t, n), this.drawFooter(s, t, n), fi(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, o = t.map(({ datasetIndex: l, index: r }) => {
      const c = this.chart.getDatasetMeta(l);
      if (!c)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: c.data[r],
        index: r
      };
    }), s = !aa(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), l = this._positionChanged(i, t), r = n || !aa(i, s) || l;
    return r && (this._active = i, (o.enabled || o.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), r;
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
    const { caretX: a, caretY: o, options: s } = this, i = xn[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var lo = {
  id: "tooltip",
  _element: ks,
  positioners: xn,
  afterInit(e, t, n) {
    n && (e.tooltip = new ks({
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
    callbacks: Fi
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
const Pu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Eu(e, t, n, a) {
  const o = e.indexOf(t);
  if (o === -1)
    return Pu(e, t, n, a);
  const s = e.lastIndexOf(t);
  return o !== s ? n : o;
}
const Iu = (e, t) => e === null ? null : Ue(Math.round(e), 0, t);
function ws(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Pi extends dn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: ws
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
    if (De(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Eu(a, t, pe(n, t), this._addedLabels), Iu(n, a.length - 1);
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
    return ws.call(this, t);
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
function Ru(e, t) {
  const n = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: g } = e, v = s || 1, f = d - 1, { min: y, max: x } = t, p = !De(i), b = !De(l), _ = !De(c), w = (x - y) / (h + 1);
  let S = Co((x - y) / f / v) * v, M, C, D, I;
  if (S < 1e-14 && !p && !b)
    return [
      {
        value: y
      },
      {
        value: x
      }
    ];
  I = Math.ceil(x / S) - Math.floor(y / S), I > f && (S = Co(I * S / f / v) * v), De(r) || (M = Math.pow(10, r), S = Math.ceil(S * M) / M), o === "ticks" ? (C = Math.floor(y / S) * S, D = Math.ceil(x / S) * S) : (C = y, D = x), p && b && s && Ql((l - i) / s, S / 1e3) ? (I = Math.round(Math.min((l - i) / S, d)), S = (l - i) / I, C = i, D = l) : _ ? (C = p ? i : C, D = b ? l : D, I = c - 1, S = (D - C) / I) : (I = (D - C) / S, wn(I, Math.round(I), S / 1e3) ? I = Math.round(I) : I = Math.ceil(I));
  const F = Math.max($o(S), $o(C));
  M = Math.pow(10, De(r) ? F : r), C = Math.round(C * M) / M, D = Math.round(D * M) / M;
  let L = 0;
  for (p && (g && C !== i ? (n.push({
    value: i
  }), C < i && L++, wn(Math.round((C + L * S) * M) / M, i, Cs(i, w, e)) && L++) : C < i && L++); L < I; ++L) {
    const R = Math.round((C + L * S) * M) / M;
    if (b && R > l)
      break;
    n.push({
      value: R
    });
  }
  return b && g && D !== l ? n.length && wn(n[n.length - 1].value, l, Cs(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!b || D === l) && n.push({
    value: D
  }), n;
}
function Cs(e, t, { horizontal: n, minRotation: a }) {
  const o = $t(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class Ou extends dn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return De(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = n ? o : r, l = (r) => s = a ? s : r;
    if (t) {
      const r = vt(o), c = vt(s);
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
    }, s = this._range || this, i = Ru(o, s);
    return t.bounds === "ticks" && Jl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return Ga(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ei extends Ou {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: oi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = rt(t) ? t : 0, this.max = rt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = $t(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const pa = {
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
}, et = /* @__PURE__ */ Object.keys(pa);
function $s(e, t) {
  return e - t;
}
function Ss(e, t) {
  if (De(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), rt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (Tn(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function Ms(e, t, n, a) {
  const o = et.length;
  for (let s = et.indexOf(e); s < o - 1; ++s) {
    const i = pa[et[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return et[s];
  }
  return et[o - 1];
}
function Vu(e, t, n, a, o) {
  for (let s = et.length - 1; s >= et.indexOf(n); s--) {
    const i = et[s];
    if (pa[i].common && e._adapter.diff(o, a, i) >= t - 1)
      return i;
  }
  return et[n ? et.indexOf(n) : 0];
}
function zu(e) {
  for (let t = et.indexOf(e) + 1, n = et.length; t < n; ++t)
    if (pa[et[t]].common)
      return et[t];
}
function Ds(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = Ua(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function Nu(e, t, n, a) {
  const o = e._adapter, s = +o.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function As(e, t, n) {
  const a = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, a.push({
      value: l,
      major: !1
    });
  return s === 0 || !n ? a : Nu(e, a, o, n);
}
class Ts extends dn {
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
    const a = t.time || (t.time = {}), o = this._adapter = new Wc._date(t.adapters.date);
    o.init(n), kn(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Ss(this, t);
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
    function r(c) {
      !i && !isNaN(c.min) && (o = Math.min(o, c.min)), !l && !isNaN(c.max) && (s = Math.max(s, c.max));
    }
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = rt(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = rt(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, l = or(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? Ms(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : Vu(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : zu(this._unit), this.initOffsets(o), t.reverse && l.reverse(), As(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Ue(n, 0, i), a = Ue(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || Ms(s.minUnit, n, a, this._getLabelCapacity(n)), l = pe(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = Tn(r) || r === !0, d = {};
    let h = n, g, v;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const f = o.ticks.source === "data" && this.getDataTimestamps();
    for (g = h, v = 0; g < a; g = +t.add(g, l, i), v++)
      Ds(d, g, f);
    return (g === a || o.bounds === "ticks" || v === 1) && Ds(d, g, f), Object.keys(d).sort($s).map((y) => +y);
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
      return Le(i, [
        t,
        n,
        a
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], g = a[n], v = c && h && g && g.major;
    return this._adapter.format(t, o || (v ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = $t(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + l * i,
      h: a * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, As(this, [
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
      t.push(Ss(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return ti(t.sort($s));
  }
}
function Gn(e, t, n) {
  let a = 0, o = e.length - 1, s, i, l, r;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = Ut(e, "pos", t)), { pos: s, time: l } = e[a], { pos: i, time: r } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = Ut(e, "time", t)), { time: s, pos: l } = e[a], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class n$ extends Ts {
  static id = "timeseries";
  static defaults = Ts.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = Gn(n, this.min), this._tableRange = Gn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, o = [], s = [];
    let i, l, r, c, d;
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
      d = o[i + 1], r = o[i - 1], c = o[i], Math.round((d + r) / 2) !== c && s.push({
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
    return (Gn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return Gn(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ii = {
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
}, Wu = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, ju = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ii,
  ...Wu
}, Hu = fl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function tn(e) {
  return js(e) ? Fa(e) : e;
}
function Yu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return js(t) ? new Proxy(e, {}) : e;
}
function Ku(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ri(e, t) {
  e.labels = t;
}
function Oi(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function Uu(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ri(n, e.labels), Oi(n, e.datasets, t), n;
}
const qu = ae({
  props: ju,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = oe(null), s = Ws(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: g, datasetIdKey: v } = e, f = Uu(d, v), y = Yu(f, d);
      s.value = new zt(o.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: g
      });
    }, l = () => {
      const c = Fa(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return tt(i), ht(l), Fe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, g] = c, [v, f] = d;
      const y = Fa(s.value);
      if (!y)
        return;
      let x = !1;
      if (h) {
        const p = tn(h), b = tn(v);
        p && p !== b && (Ku(y, p), x = !0);
      }
      if (g) {
        const p = tn(g.labels), b = tn(f.labels), _ = tn(g.datasets), w = tn(f.datasets);
        p !== b && (Ri(y.config.data, p), x = !0), _ && _ !== w && (Oi(y.config.data, _, e.datasetIdKey), x = !0);
      }
      x && ze(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => La("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      La("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ro(e, t) {
  return zt.register(t), ae({
    props: Ii,
    setup(n, a) {
      let { expose: o } = a;
      const s = Ws(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => La(qu, Hu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Xu = /* @__PURE__ */ ro("bar", Rc), Gu = /* @__PURE__ */ ro("line", zc), Zu = /* @__PURE__ */ ro("pie", Nc), Bs = {
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
}, Ls = {
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
}, Qu = [
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
function _e(e) {
  const t = oe("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = $(() => e?.value ? e.value : t.value), s = $(() => o.value === "dark"), i = $(() => s.value ? Ls : Bs), l = () => {
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
  }), ht(() => {
    r();
  }), e && Fe(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Bs,
    darkColors: Ls,
    chartSeriesColors: Qu
  };
}
const co = 5, uo = 8, Ju = /^x\d*$/, eh = /^y\d*$/;
function Vi(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    Ju.test(o) && (r.maxTicksLimit = uo, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), eh.test(o) && (r.maxTicksLimit = co), i.ticks = r, a[o] = i;
  }
  return t.scales = a, t;
}
const Qe = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", th = ["titleFont", "bodyFont", "footerFont"];
function zi(e, t = Qe) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const o = { ...n.scales };
    for (const s of Object.keys(o)) {
      const i = o[s];
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
      o[s] = l;
    }
    n.scales = o;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const o = { ...n.plugins }, s = o.legend;
    if (s && typeof s == "object") {
      const l = { ...s }, r = l.labels;
      if (r && typeof r == "object") {
        const c = { ...r }, d = typeof c.font == "object" && c.font !== null ? c.font : {};
        c.font = { ...d, family: t }, l.labels = c;
      }
      o.legend = l;
    }
    const i = o.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const r of th) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    n.plugins = o;
  }
  return n;
}
const nh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Fs = 10, ah = /* @__PURE__ */ ae({
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
    zt.register(Pi, Ei, _u, Li, lo, io), zt.defaults.font.family = Qe;
    const { isDark: a, colors: o } = _e(ye(n, "theme")), s = $(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const g = { ...d };
      for (const v of Object.keys(h)) {
        const f = h[v];
        f !== void 0 && (g[v] = r(d[v], f));
      }
      return g;
    }
    const c = $(() => {
      const d = {
        font: {
          family: Qe
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
                family: Qe,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Fs,
              boxHeight: Fs,
              usePointStyle: !1,
              generateLabels: function(g) {
                return g.data.datasets.map((f, y) => {
                  const x = Array.isArray(f.backgroundColor) ? f.backgroundColor[0] : f.backgroundColor, p = Array.isArray(f.borderColor) ? f.borderColor[0] : f.borderColor, b = typeof p == "string" && p.length > 0 ? p : typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
                  return {
                    text: l(f.label || ""),
                    fillStyle: typeof x == "string" ? x : b,
                    strokeStyle: b,
                    lineWidth: 0,
                    fontColor: b,
                    hidden: !g.isDatasetVisible(y),
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
            bodyColor: a.value ? "#d1d5db" : "#e2e8f0",
            borderColor: a.value ? "rgba(198, 125, 255, 0.2)" : "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            displayColors: !0,
            titleFont: {
              family: Qe,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: Qe,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(g) {
                return g.length > 0 ? String(i(g[0].label)) : "";
              },
              label: function(g) {
                let v = String(i(g.dataset.label || ""));
                return v && (v += ": "), g.parsed.y !== null && (v += g.parsed.y), v;
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
              maxTicksLimit: co,
              font: {
                family: Qe,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(g) {
                return i(g);
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
              maxTicksLimit: uo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Qe,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(g) {
                const v = this.getLabelForValue(g);
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
      return zi(
        Vi(h)
      );
    });
    return t({ isDark: a }), (d, h) => (m(), k("div", nh, [
      E(T(Xu), {
        data: s.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, yt = /* @__PURE__ */ de(ah, [["__scopeId", "data-v-ee7ca6f2"]]), oh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, sh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, ih = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, lh = ["aria-pressed", "aria-label", "onClick"], rh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, ch = /* @__PURE__ */ ae({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    zt.register(
      Pi,
      Ei,
      gu,
      fu,
      Li,
      lo,
      io
    ), zt.defaults.font.family = Qe;
    const a = oe(null), { isDark: o, colors: s } = _e(ye(n, "theme")), i = $(() => s.value.bgCard), l = $(() => {
      const x = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((p) => {
          const b = p.borderColor, _ = Array.isArray(b) ? b[0] : b, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, S = p.pointBackgroundColor !== void 0 ? p.pointBackgroundColor : x, M = p.pointHoverBackgroundColor !== void 0 ? p.pointHoverBackgroundColor : S, C = p.pointBorderWidth ?? 2, D = p.pointHoverBorderWidth ?? C;
          return {
            ...p,
            fill: p.fill ?? !1,
            pointBackgroundColor: S,
            pointHoverBackgroundColor: M,
            pointBorderColor: p.pointBorderColor ?? w,
            pointHoverBorderColor: p.pointHoverBorderColor ?? w,
            pointBorderWidth: C,
            pointHoverBorderWidth: D
          };
        })
      };
    }), r = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, c = (x) => typeof x != "string" ? x : n.uppercaseLegendLabels ? x.toUpperCase() : r(x);
    function d(x) {
      const p = x.borderColor, b = Array.isArray(p) ? p[0] : p;
      return typeof b == "string" && b.length > 0 ? b : s.value.textSecondary;
    }
    const h = $(
      () => l.value.datasets.map((x, p) => ({
        key: `${x.label ?? "dataset"}-${p}`,
        label: c(x.label || ""),
        color: d(x)
      }))
    ), g = oe([]);
    Fe(
      () => l.value.datasets.length,
      (x) => {
        const p = Array.from({ length: x }, (b, _) => g.value[_] ?? !0);
        g.value = p;
      },
      { immediate: !0 }
    );
    function v(x) {
      const b = a.value?.chart;
      if (!b || x < 0 || x >= b.data.datasets.length) return;
      const _ = !b.isDatasetVisible(x);
      b.setDatasetVisibility(x, _), g.value[x] = _, b.update();
    }
    function f(x, p) {
      if (p == null) return x;
      if (Array.isArray(p) || typeof p != "object" || x == null || Array.isArray(x) || typeof x != "object") return p;
      const b = { ...x };
      for (const _ of Object.keys(p)) {
        const w = p[_];
        w !== void 0 && (b[_] = f(x[_], w));
      }
      return b;
    }
    const y = $(() => {
      const x = {
        font: {
          family: Qe
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
              family: Qe,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: Qe,
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
              maxTicksLimit: uo,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: Qe,
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
              maxTicksLimit: co,
              font: {
                family: Qe,
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
      }, p = n.options ? f(x, n.options) : x;
      return zi(
        Vi(p)
      );
    });
    return t({ isDark: o }), (x, p) => (m(), k("div", oh, [
      u("div", sh, [
        E(T(Gu), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (m(), k("ul", ih, [
        (m(!0), k(ee, null, le(h.value, (b, _) => (m(), k("li", {
          key: b.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: G(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", g.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: xe({ color: b.color }),
            "aria-pressed": g.value[_] !== !1,
            "aria-label": `${b.label}. ${g.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => v(_)
          }, [
            u("span", rh, [
              p[0] || (p[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: xe({ borderColor: b.color })
              }, null, 4),
              p[1] || (p[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(b.label), 1)
          ], 14, lh)
        ]))), 128))
      ])) : V("", !0)
    ]));
  }
}), ft = /* @__PURE__ */ de(ch, [["__scopeId", "data-v-fc764ffb"]]), dh = { class: "chart-container" }, uh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", hh = /* @__PURE__ */ ae({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    zt.register(au, lo, io);
    const { isDark: a, colors: o } = _e(ye(n, "theme")), s = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = $(() => n.options ? n.options : {
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
              family: uh,
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
                const v = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], x = typeof v.backgroundColor == "string" && v.backgroundColor.length > 0 ? v.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: v.backgroundColor,
                  strokeStyle: v.borderColor,
                  lineWidth: v.borderWidth,
                  lineDash: v.borderDash,
                  lineDashOffset: v.borderDashOffset,
                  lineJoin: v.borderJoinStyle,
                  fontColor: x,
                  hidden: !r.getDataVisibility(h),
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
            title: function(r) {
              return r.length > 0 ? String(i(r[0].label)) : "";
            },
            label: function(r) {
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((v, f) => v + f, 0), g = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${g}%)`;
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
    return t({ isDark: a }), (r, c) => (m(), k("div", dh, [
      E(T(Zu), {
        data: T(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), ma = /* @__PURE__ */ de(hh, [["__scopeId", "data-v-0f7806d6"]]), fh = { class: "chart-container" }, gh = ["viewBox"], ph = ["transform"], mh = ["x", "width", "fill", "stroke"], bh = ["fill"], vh = ["x1", "y1", "x2", "y2", "stroke"], yh = ["points", "fill"], _h = ["x1", "y1", "x2", "y2", "stroke"], xh = ["x", "y", "fill"], kh = ["x1", "y1", "x2", "y2", "stroke"], wh = ["points", "fill"], Ch = ["transform"], $h = ["y1", "y2"], Sh = ["y1", "y2"], Mh = ["y1", "y2"], Dh = ["y1", "y2"], Ah = ["y", "height"], Th = ["y1", "y2"], Bh = ["y1", "y2"], Lh = ["y1", "y2"], Fh = ["y1", "y2"], Ph = ["y", "height"], Eh = ["cy", "stroke", "onMouseenter"], Ih = ["cy", "stroke", "onMouseenter"], Rh = ["cy", "stroke", "onMouseenter"], Oh = ["cy", "stroke", "onMouseenter"], Vh = ["y1", "y2", "onMouseenter"], zh = ["y1", "y2", "onMouseenter"], Nh = ["x", "y", "fill"], Wh = ["x", "y", "fill"], jh = ["transform"], Hh = { transform: "translate(-200, 0)" }, Yh = ["stroke"], Kh = ["fill"], Uh = { transform: "translate(-130, 0)" }, qh = ["stroke"], Xh = ["fill"], Gh = { transform: "translate(-60, 0)" }, Zh = ["stroke"], Qh = ["fill"], Jh = { transform: "translate(10, 0)" }, ef = ["stroke"], tf = ["fill"], nf = { transform: "translate(80, 0)" }, af = ["fill"], of = { transform: "translate(150, 0)" }, sf = ["fill"], lf = /* @__PURE__ */ ae({
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
    const n = e, { isDark: a } = _e(ye(n, "theme")), o = $(() => ({
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
    })), s = oe({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, l = (g, v) => {
      const f = g.currentTarget.closest("svg");
      if (!f) return;
      const y = f.getBoundingClientRect(), x = f.createSVGPoint();
      x.x = g.clientX - y.left, x.y = g.clientY - y.top, s.value = {
        visible: !0,
        x: x.x,
        y: x.y - 20,
        text: v
      };
    }, r = (g) => {
      if (s.value.visible) {
        const v = g.currentTarget, f = v.getBoundingClientRect(), y = v.createSVGPoint();
        y.x = g.clientX - f.left, y.y = g.clientY - f.top, s.value.x = y.x, s.value.y = y.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = $(() => {
      const g = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const x = y, p = (x - 1) / 9, b = n.chartMargin + f - p * f;
        g.push({ value: x, y: b });
      }
      return g;
    });
    return t({ isDark: a }), (g, v) => (m(), k("div", fh, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: xe(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (m(), k("g", {
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
          }, null, 8, mh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, bh)
        ], 8, ph)) : V("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, vh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, yh),
        (m(!0), k(ee, null, le(h.value, (f, y) => (m(), k(ee, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, _h),
          u("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, xh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, kh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, wh),
        (m(!0), k(ee, null, le(e.boxplotData, (f, y) => (m(), k(ee, { key: y }, [
          u("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (m(), k(ee, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, $h),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Sh),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Mh),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Dh),
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
              }, null, 8, Ah)
            ], 64)) : (m(), k(ee, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Th),
              u("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Bh),
              u("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Lh),
              u("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Fh),
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
              }, null, 8, Ph)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Eh),
            u("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Ih),
            u("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Rh),
            u("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Oh),
            u("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (x) => l(x, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Vh),
            f.averageY ? (m(), k("line", {
              key: 2,
              x1: -24,
              y1: f.averageY,
              x2: 24,
              y2: f.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (x) => l(x, `Avg: ${f.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, zh)) : V("", !0)
          ], 8, Ch),
          u("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, Nh),
          f.responseCount ? (m(), k("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, Wh)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Hh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Yh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Kh)
          ]),
          u("g", Uh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, qh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Xh)
          ]),
          u("g", Gh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Zh),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Qh)
          ]),
          u("g", Jh, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ef),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, tf)
          ]),
          u("g", nf, [
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, af)
          ]),
          u("g", of, [
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
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, sf)
          ])
        ], 8, jh)) : V("", !0)
      ], 44, gh))
    ]));
  }
}), rf = /* @__PURE__ */ de(lf, [["__scopeId", "data-v-9ac5c075"]]), cf = { class: "chart-container" }, df = ["viewBox"], uf = ["x1", "y1", "x2", "y2", "stroke"], hf = ["points", "fill"], ff = ["x1", "y1", "x2", "y2", "stroke"], gf = ["x1", "y1", "x2", "y2", "stroke"], pf = ["x", "y", "fill"], mf = ["x", "y", "fill", "transform"], bf = ["x1", "y1", "x2", "y2", "stroke"], vf = ["points", "fill"], yf = ["transform"], _f = ["y1", "y2", "stroke", "onMouseenter"], xf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], kf = ["x1", "y1", "x2", "y2", "onMouseenter"], wf = ["x1", "y1", "x2", "y2", "onMouseenter"], Cf = ["cy", "stroke", "onMouseenter"], $f = ["cy", "stroke", "onMouseenter"], Sf = ["x", "y", "fill"], Mf = ["x", "y", "fill"], Df = ["transform"], Af = { transform: "translate(-180, 0)" }, Tf = ["stroke"], Bf = ["fill"], Lf = { transform: "translate(-120, 0)" }, Ff = ["fill"], Pf = { transform: "translate(-60, 0)" }, Ef = ["fill"], If = { transform: "translate(0, 0)" }, Rf = ["stroke"], Of = ["fill"], Vf = { transform: "translate(60, 0)" }, zf = ["fill"], Nf = { transform: "translate(130, 0)" }, Wf = ["fill"], jf = ["transform"], Hf = ["x", "y", "width", "height", "fill", "stroke"], Yf = ["y", "fill"], Kf = ["y", "fill"], Zn = 10, Uf = 14, Aa = 13, Ps = 4, Es = 12, qf = /* @__PURE__ */ ae({
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
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = Zn + Aa + Ps + Es + Zn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(b, _, w) {
      const S = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(b, 1) * _ * S);
    }
    function r(b, _) {
      return Math.max(
        l(b.length, Aa, !0),
        l(_.length, Es, !1),
        52
      ) + Uf * 2;
    }
    function c(b, _, w, S) {
      const M = w / 2, C = 6, D = Math.min(
        Math.max(b, M + C),
        n.chartWidth - M - C
      ), I = C + S + 10, F = n.chartHeight - C + 10, L = Math.min(Math.max(_, I), F);
      return { x: D, y: L };
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
    })), h = oe({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), g = (b) => typeof b == "string" ? b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() : b, v = (b, _, w) => {
      const S = b.currentTarget.closest("svg");
      if (!S) return;
      const M = S.getBoundingClientRect(), C = S.createSVGPoint();
      C.x = b.clientX - M.left, C.y = b.clientY - M.top;
      let D = g(_.label), I = "";
      switch (w) {
        case "body":
          I = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          I = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          I = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          I = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          I = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          I = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const F = r(D, I), L = s;
      let R = C.x, P = C.y - 20;
      const j = c(R, P, F, L);
      R = j.x, P = j.y, h.value = {
        visible: !0,
        x: R,
        y: P,
        title: D,
        text: I,
        width: F,
        height: L
      };
    }, f = (b) => {
      if (h.value.visible) {
        const _ = b.currentTarget, w = _.getBoundingClientRect(), S = _.createSVGPoint();
        S.x = b.clientX - w.left, S.y = b.clientY - w.top;
        let M = S.x, C = S.y - 20;
        const D = c(M, C, h.value.width, h.value.height);
        h.value.x = D.x, h.value.y = D.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, x = () => {
      h.value.visible = !1;
    }, p = $(() => {
      const b = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let S = 1; S <= 10; S++) {
        const M = S, C = (M - 1) / 9, D = n.chartMargin + w - C * w;
        b.push({ value: M, y: D });
      }
      return b;
    });
    return t({ isDark: a }), (b, _) => (m(), k("div", cf, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: xe(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
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
        }, null, 8, uf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, hf),
        (m(!0), k(ee, null, le(p.value, (w, S) => (m(), k("line", {
          key: `grid-${S}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, ff))), 128)),
        (m(!0), k(ee, null, le(p.value, (w, S) => (m(), k(ee, { key: S }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, gf),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, pf)
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
        }, A(g(e.yAxisLabel)), 9, mf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, bf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, vf),
        (m(!0), k(ee, null, le(e.candlestickData, (w, S) => (m(), k(ee, { key: S }, [
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
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, _f),
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
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, xf),
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
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, kf)) : V("", !0),
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
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, wf)) : V("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "min"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, Cf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (M) => v(M, w, "max"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, $f)
          ], 8, yf),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(g(w.label)), 9, Sf),
          w.responseCount ? (m(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Mf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Af, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Tf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Bf)
          ]),
          u("g", Lf, [
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
            }, " Q1 ", 8, Ff)
          ]),
          u("g", Pf, [
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
            }, " Q3 ", 8, Ef)
          ]),
          u("g", If, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Rf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, Of)
          ]),
          u("g", Vf, [
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
            }, " Avg ", 8, zf)
          ]),
          u("g", Nf, [
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
            }, " Median ", 8, Wf)
          ])
        ], 8, Df)) : V("", !0),
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
          }, null, 8, Hf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Zn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Yf),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Zn + Aa + Ps,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Kf)
        ], 8, jf)) : V("", !0)
      ], 44, df))
    ]));
  }
}), Xf = /* @__PURE__ */ de(qf, [["__scopeId", "data-v-22efd66d"]]), Gf = ["viewBox"], Zf = ["x1", "y1", "x2", "y2", "stroke"], Qf = ["x1", "y1", "x2", "y2", "stroke"], Jf = ["points", "fill"], eg = ["x1", "y1", "x2", "y2", "stroke"], tg = ["x", "y", "fill"], ng = ["x", "y", "fill", "transform"], ag = ["x1", "y1", "x2", "y2", "stroke"], og = ["points", "fill"], sg = ["x1", "y1", "x2", "y2", "stroke"], ig = ["x", "y", "fill"], lg = ["x", "y", "fill"], rg = ["d"], cg = ["x", "y", "width", "height", "onMouseenter"], dg = ["x1", "y1", "x2", "y2"], ug = ["x", "y"], hg = ["x1", "y1", "x2", "y2"], fg = ["x", "y"], gg = ["x1", "y1", "x2", "y2"], pg = ["x", "y"], mg = ["x1", "y1", "x2", "y2"], bg = ["x", "y"], vg = ["x1", "y1", "x2", "y2"], yg = ["x", "y"], _g = ["x1", "y1", "x2", "y2"], xg = ["x", "y"], kg = ["transform"], wg = { transform: "translate(-220, 0)" }, Cg = ["fill"], $g = { transform: "translate(-140, 0)" }, Sg = ["fill"], Mg = { transform: "translate(-80, 0)" }, Dg = ["fill"], Ag = { transform: "translate(-20, 0)" }, Tg = ["fill"], Bg = { transform: "translate(60, 0)" }, Lg = ["fill"], Fg = { transform: "translate(130, 0)" }, Pg = ["fill"], Eg = { transform: "translate(180, 0)" }, Ig = ["fill"], Rg = ["transform"], Og = ["x", "y", "width", "height", "fill", "stroke"], Vg = ["y", "fill"], zg = ["y", "fill"], Qn = 10, Ng = 14, Ta = 13, Is = 12, Rs = 4, Wg = /* @__PURE__ */ ae({
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
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = Qn + Ta + Rs + Is + Qn, i = $(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(Y, z, N) {
      const K = N ? 0.6 : 0.535;
      return Math.ceil(Math.max(Y, 1) * z * K);
    }
    function r(Y, z) {
      return Math.max(
        l(Y.length, Ta, !0),
        l(z.length, Is, !1),
        52
      ) + Ng * 2;
    }
    function c(Y, z, N, K) {
      const he = N / 2, fe = 6, ge = Math.min(
        Math.max(Y, he + fe),
        n.chartWidth - he - fe
      ), Be = fe + K + 10, Re = n.chartHeight - fe + 10, O = Math.min(Math.max(z, Be), Re);
      return { x: ge, y: O };
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
    }), g = $(() => n.chartWidth - n.chartMargin * 2), v = $(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), f = $(() => g.value / 10 * 0.6), y = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const Y = Math.max(...n.histogram.map((N) => N.count || 0), 1), z = Math.max(1, Math.ceil(Y * 0.2));
      return Y + z;
    }), x = $(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const Y = n.averageScore || 0;
      let z = 0, N = 0;
      if (n.histogram.forEach((he) => {
        const fe = he.count || 0;
        z += fe;
        const ge = he.score - Y;
        N += fe * (ge * ge);
      }), z === 0) return 1;
      const K = N / z;
      return Math.sqrt(K) || 1;
    }), p = (Y, z, N) => {
      if (N === 0) return 0;
      const K = 1 / (N * Math.sqrt(2 * Math.PI)), he = -0.5 * Math.pow((Y - z) / N, 2);
      return K * Math.exp(he);
    }, b = $(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && x.value === 0) return null;
      const Y = n.averageScore, z = x.value, N = 100, he = Math.max(...n.histogram.map((Re) => Re.count || 0), 1) / y.value * v.value;
      if (he <= 0) return null;
      let fe = 0;
      for (let Re = 0; Re <= N; Re++) {
        const O = 1 + 9 * (Re / N), U = p(O, Y, z);
        U > fe && (fe = U);
      }
      if (fe <= 0) return null;
      const ge = he / fe, Be = [];
      for (let Re = 0; Re <= N; Re++) {
        const O = 1 + 9 * (Re / N), U = p(O, Y, z) * ge, se = w(O);
        if (se !== null) {
          const ve = n.chartHeight - n.chartBottomMargin - U;
          Be.push(`${Re === 0 ? "M" : "L"} ${se} ${ve}`);
        }
      }
      return Be.join(" ");
    }), _ = $(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const Y = g.value / 10;
      return n.histogram.map((z, N) => {
        const K = n.chartMargin + (N + 0.5) * Y, he = z.count > 0 ? z.count / y.value * v.value : 0, fe = n.chartHeight - n.chartBottomMargin - he;
        return {
          score: z.score,
          count: z.count,
          x: K,
          y: fe,
          height: he
        };
      });
    }), w = (Y) => {
      if (Y < 1 || Y > 10) return null;
      const z = g.value / 10;
      return n.chartMargin + (Y - 0.5) * z;
    }, S = $(() => w(n.minScore)), M = $(() => w(n.maxScore)), C = $(() => w(n.q1Score)), D = $(() => w(n.medianScore)), I = $(() => w(n.q3Score)), F = $(() => w(n.averageScore)), L = $(() => n.minScore), R = $(() => n.maxScore), P = $(() => n.q1Score), j = $(() => n.medianScore), q = $(() => n.q3Score), H = $(() => n.averageScore), te = $(() => {
      const Y = [], z = n.chartMargin - 8, N = 18;
      C.value !== null && Y.push({
        x: C.value,
        y: z,
        value: n.q1Score,
        label: `Q1: ${P.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), D.value !== null && Y.push({
        x: D.value,
        y: z - N,
        value: n.medianScore,
        label: `Median: ${j.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), F.value !== null && Y.push({
        x: F.value,
        y: z - N,
        value: n.averageScore,
        label: `Avg: ${H.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), I.value !== null && Y.push({
        x: I.value,
        y: z,
        value: n.q3Score,
        label: `Q3: ${q.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), Y.sort((fe, ge) => (fe.x || 0) - (ge.x || 0));
      const K = [[], [], []];
      Y.forEach((fe) => {
        if (fe.x === null) return;
        let ge = -1;
        for (let Be = 0; Be < K.length; Be++) {
          let Re = !1;
          for (const O of K[Be]) {
            if (O.x === null) continue;
            const U = Math.abs(fe.x - O.x), se = (fe.width + O.width) / 2 + 10;
            if (U < se) {
              Re = !0;
              break;
            }
          }
          if (!Re) {
            ge = Be;
            break;
          }
        }
        ge === -1 && (ge = K.length - 1), fe.y = z - ge * N, K[ge].push(fe);
      });
      const he = 15;
      return Y.forEach((fe) => {
        fe.y < he && (fe.y = he);
      }), Y;
    }), ne = (Y) => te.value.find((N) => N.id === Y)?.y || n.chartMargin - 10, re = $(() => {
      const Y = [];
      for (let N = 0; N <= 5; N++) {
        const K = Math.round(y.value / 5 * N), he = n.chartHeight - n.chartBottomMargin - N / 5 * v.value;
        Y.push({ value: K, y: he });
      }
      return Y;
    });
    function W(Y, z, N) {
      const K = Y.createSVGPoint();
      K.x = z, K.y = N;
      const he = Y.getScreenCTM();
      if (!he) {
        const ge = Y.getBoundingClientRect();
        return { x: z - ge.left, y: N - ge.top };
      }
      const fe = K.matrixTransform(he.inverse());
      return { x: fe.x, y: fe.y };
    }
    const X = (Y, z) => {
      n.interactive && ce(Y, z);
    }, Q = () => {
      n.interactive && be();
    }, ce = (Y, z) => {
      const N = Y.currentTarget.closest("svg");
      if (!N) return;
      const { x: K, y: he } = W(N, Y.clientX, Y.clientY), fe = `Score: ${z.score}`, ge = `Count: ${Number(z.count ?? 0).toLocaleString()}`, Be = r(fe, ge), Re = s, O = typeof z?.x == "number" ? z.x : K;
      let U = he - 20;
      const se = c(O, U, Be, Re);
      h.value = {
        visible: !0,
        x: se.x,
        y: se.y,
        title: fe,
        text: ge,
        width: Be,
        height: Re,
        anchorX: typeof z?.x == "number" ? z.x : null
      };
    }, ie = (Y) => {
      if (n.interactive && h.value.visible) {
        const z = Y.currentTarget, { x: N, y: K } = W(z, Y.clientX, Y.clientY), he = h.value.anchorX, fe = he != null && Number.isFinite(he) ? he : N;
        let ge = K - 20;
        const Be = c(fe, ge, h.value.width, h.value.height);
        h.value.x = Be.x, h.value.y = Be.y;
      }
    }, we = () => {
      be();
    }, be = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (Y, z) => (m(), k("div", {
      class: G(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: xe(`min-height: ${e.chartHeight}px;`),
        onMousemove: ie,
        onMouseleave: we
      }, [
        z[7] || (z[7] = u("defs", null, [
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
        (m(!0), k(ee, null, le(re.value, (N, K) => (m(), k("line", {
          key: `grid-${K}`,
          x1: e.chartMargin,
          y1: N.y,
          x2: e.chartWidth - e.chartMargin,
          y2: N.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Zf))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Qf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Jf),
        (m(!0), k(ee, null, le(re.value, (N, K) => (m(), k(ee, {
          key: `y-tick-${K}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: N.y,
            x2: e.chartMargin,
            y2: N.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, eg),
          u("text", {
            x: e.chartMargin - 12,
            y: N.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(N.value), 9, tg)
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
        }, " Count ", 8, ng),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, ag),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, og),
        (m(!0), k(ee, null, le(_.value, (N, K) => (m(), k(ee, {
          key: `tick-${K}`
        }, [
          u("line", {
            x1: N.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: N.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, sg),
          u("text", {
            x: N.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(N.score), 9, ig)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, lg),
        b.value ? (m(), k("path", {
          key: 0,
          d: b.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, rg)) : V("", !0),
        (m(!0), k(ee, null, le(_.value, (N, K) => (m(), k("rect", {
          key: `bar-${K}`,
          x: N.x - f.value / 2,
          y: N.y,
          width: f.value,
          height: N.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (he) => X(he, N),
          onMouseleave: Q,
          style: xe({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, cg))), 128)),
        S.value ? (m(), k("line", {
          key: 1,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, dg)) : V("", !0),
        S.value ? (m(), k("text", {
          key: 2,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(L.value.toFixed(1)), 9, ug)) : V("", !0),
        C.value ? (m(), k("line", {
          key: 3,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, hg)) : V("", !0),
        C.value ? (m(), k("text", {
          key: 4,
          x: C.value,
          y: ne("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(P.value.toFixed(1)), 9, fg)) : V("", !0),
        D.value ? (m(), k("line", {
          key: 5,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, gg)) : V("", !0),
        D.value ? (m(), k("text", {
          key: 6,
          x: D.value,
          y: ne("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(j.value.toFixed(1)), 9, pg)) : V("", !0),
        F.value ? (m(), k("line", {
          key: 7,
          x1: F.value,
          y1: e.chartMargin,
          x2: F.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, mg)) : V("", !0),
        F.value ? (m(), k("text", {
          key: 8,
          x: F.value,
          y: ne("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(H.value.toFixed(1)), 9, bg)) : V("", !0),
        I.value ? (m(), k("line", {
          key: 9,
          x1: I.value,
          y1: e.chartMargin,
          x2: I.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, vg)) : V("", !0),
        I.value ? (m(), k("text", {
          key: 10,
          x: I.value,
          y: ne("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(q.value.toFixed(1)), 9, yg)) : V("", !0),
        M.value ? (m(), k("line", {
          key: 11,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, _g)) : V("", !0),
        M.value ? (m(), k("text", {
          key: 12,
          x: M.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(R.value.toFixed(1)), 9, xg)) : V("", !0),
        e.showLegend ? (m(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", wg, [
            z[0] || (z[0] = u("line", {
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
            }, " Gaussian ", 8, Cg)
          ]),
          u("g", $g, [
            z[1] || (z[1] = u("line", {
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
            }, " Min ", 8, Sg)
          ]),
          u("g", Mg, [
            z[2] || (z[2] = u("line", {
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
            }, " Q1 ", 8, Dg)
          ]),
          u("g", Ag, [
            z[3] || (z[3] = u("line", {
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
            }, " Median ", 8, Tg)
          ]),
          u("g", Bg, [
            z[4] || (z[4] = u("line", {
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
            }, " Avg ", 8, Lg)
          ]),
          u("g", Fg, [
            z[5] || (z[5] = u("line", {
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
            }, " Q3 ", 8, Pg)
          ]),
          u("g", Eg, [
            z[6] || (z[6] = u("line", {
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
            }, " Max ", 8, Ig)
          ])
        ], 8, kg)) : V("", !0),
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
          }, null, 8, Og),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Qn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Vg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + Qn + Ta + Rs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, zg)
        ], 8, Rg)) : V("", !0)
      ], 44, Gf))
    ], 2));
  }
}), Ni = /* @__PURE__ */ de(Wg, [["__scopeId", "data-v-a1e39e34"]]), jg = 639, Wi = 1024;
function Os(e) {
  return e < 640 ? "mobile" : e <= Wi ? "tablet" : "desktop";
}
function Hg() {
  const e = oe(
    typeof window > "u" ? "desktop" : Os(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Os(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  tt(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${jg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Wi}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), ht(() => {
    !s || !n || !a || !o || (n.removeEventListener("change", s), a.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = $(() => e.value === "mobile"), l = $(() => e.value === "tablet"), r = $(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const Yg = { class: "chart-container" }, Kg = {
  key: 1,
  class: "chart-wrapper"
}, Ug = /* @__PURE__ */ ae({
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
    mo.use([pl, ml, bl, vl]);
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), { breakpoint: s } = Hg(), i = oe(null), l = oe(!0), r = oe(!1);
    let c = null;
    const d = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = $(() => {
      const M = s.value;
      return M === "mobile" ? {
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
      } : M === "tablet" ? {
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
        contentMargins: { ...d.margins }
      } : {
        orient: "horizontal",
        nodeWidth: d.node.width,
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
        contentMargins: { ...d.margins }
      };
    }), g = (M, C) => {
      const D = M.trim();
      if (!D || C < 1) return M;
      if (D.length <= C) return D;
      const I = [];
      let F = 0;
      for (; F < D.length; ) {
        const L = Math.min(F + C, D.length);
        if (L >= D.length) {
          const j = D.slice(F).trim();
          j && I.push(j);
          break;
        }
        const R = D.slice(F, L), P = R.lastIndexOf(" ");
        if (P > 0)
          for (I.push(D.slice(F, F + P).trim()), F += P; F < D.length && D[F] === " "; ) F += 1;
        else
          I.push(R), F = L;
      }
      return I.join(`
`);
    }, v = [
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
    ], f = () => {
      const M = n.data.links.filter(
        (F) => F.source && F.target && typeof F.value == "number"
      ), C = Math.max(...M.map((F) => F.value), 1), D = Math.max(1, C * 0.01), I = M.map((F) => ({
        ...F,
        originalValue: F.value,
        value: F.value < C * 0.01 ? D : F.value
      }));
      return {
        nodes: n.data.nodes.filter((F) => F.name),
        links: I
      };
    }, y = (M) => M.map((C, D) => ({
      ...C,
      itemStyle: {
        color: n.nodeColors[C.name] || v[D % v.length],
        borderRadius: 8
      }
    })), x = (M) => (C) => {
      const D = C.dataType === "node", I = o.value.tooltipText, F = a.value ? "#d1d5db" : "#e2e8f0";
      if (D) {
        const q = M.filter((ne) => ne.target === C.name), H = M.filter((ne) => ne.source === C.name), te = q.length > 0 ? q.reduce((ne, re) => ne + (re.originalValue || re.value), 0) : H.reduce((ne, re) => ne + (re.originalValue || re.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${C.name}</div><div style="color: ${F}; font-size: 12px;">Count: ${te.toLocaleString()}</div>`;
      }
      const L = C.data?.source || C.source || "Unknown", R = C.data?.target || C.target || "Unknown", P = C.data?.originalValue || C.data?.value || C.value || 0, j = C.data?.label || `${P.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${I};">${L} → ${R}</div><div style="color: ${F}; font-size: 12px;">Flow: ${j}</div>`;
    }, p = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const M = h.value, C = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", D = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: I, links: F } = f(), L = y(I), R = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: x(F),
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
              data: L,
              links: F,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: D,
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
                  lineStyle: { color: C, opacity: 1 }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: "#8b5cf6",
                    borderRadius: 8
                  },
                  lineStyle: { color: C, opacity: 1 }
                }
              ],
              lineStyle: {
                color: C,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: d.style,
              label: {
                show: !0,
                position: M.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: M.labelPosition === "right" && a.value ? o.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: M.labelFontSize,
                ...M.labelWrap && M.labelLineHeight > 0 ? { lineHeight: M.labelLineHeight } : {},
                ...M.labelWrap && M.labelTextWidth > 0 ? { width: M.labelTextWidth, overflow: "none" } : {},
                ...M.labelDistance > 0 ? { distance: M.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (P) => {
                  const j = P.name || "";
                  if (M.labelWrap)
                    return g(j, Math.max(4, M.labelCharsPerLine));
                  const q = M.labelMaxChars;
                  return j.length > q ? `${j.substring(0, q)}...` : j;
                }
              },
              edgeLabel: M.edgeLabelShow ? {
                show: !0,
                fontSize: M.edgeLabelFontSize,
                color: o.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (P) => {
                  const j = P.data?.originalValue || P.value || 0;
                  return P.data?.label || `${j.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: d.node.align,
              nodeGap: M.nodeGap,
              nodeWidth: M.nodeWidth,
              layoutIterations: d.node.iterations,
              orient: M.orient,
              draggable: !1,
              ...M.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: d.animation.duration,
          animationEasing: d.animation.easing
        };
        c.setOption(R), c.resize();
      } catch (I) {
        console.error("Error setting Sankey chart options:", I), r.value = !0;
      }
    }, b = async () => {
      if (i.value)
        try {
          c = mo.init(i.value), p(), window.addEventListener("resize", w);
        } catch (M) {
          console.error("Error initializing Sankey chart:", M), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, _ = async (M = 40) => {
      await ze();
      for (let C = 0; C < M; C++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await b();
        await new Promise((D) => setTimeout(D, 50));
      }
      await b(), setTimeout(w, 50);
    }, w = () => c?.resize(), S = () => {
      window.removeEventListener("resize", w), c && (c.dispose(), c = null);
    };
    return tt(() => i.value && _()), Hs(S), Fe(() => n.data, p, { deep: !0 }), Fe(a, p), Fe(s, p), t({ isDark: a }), (M, C) => (m(), k("div", Yg, [
      r.value ? (m(), k("div", {
        key: 0,
        class: "error-state",
        style: xe({ height: e.height })
      }, [...C[0] || (C[0] = [
        go('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), k("div", Kg, [
        Xe(u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: xe({ height: e.height })
        }, null, 4), [
          [sn, !l.value]
        ]),
        Xe(u("div", {
          class: "loading-state",
          style: xe({ height: e.height })
        }, [...C[1] || (C[1] = [
          go('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [sn, l.value]
        ])
      ]))
    ]));
  }
}), Nt = /* @__PURE__ */ de(Ug, [["__scopeId", "data-v-eb927194"]]), qg = ["open"], Xg = { class: "card-header metric-collapsible__summary" }, Gg = { class: "header-content metric-header-content" }, Zg = { class: "metric-header-content__main" }, Qg = { class: "metric-header-content__text" }, Jg = {
  key: "header-skeleton",
  class: "ut-skeleton-blink ut-skeleton-collapsible-title",
  "aria-hidden": "true",
  "aria-busy": "true"
}, ep = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, tp = {
  key: 0,
  class: "card-title"
}, np = {
  key: 0,
  class: "card-subtitle"
}, ap = {
  key: 0,
  class: "metric-header-content__export"
}, op = {
  key: 0,
  class: "cmc-header-aside"
}, sp = { class: "chart-metric-container__body" }, ip = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, lp = { class: "card-header" }, rp = { class: "header-content metric-header-content" }, cp = { class: "metric-header-content__main" }, dp = { class: "metric-header-content__text" }, up = {
  key: "header-skeleton",
  class: "ut-skeleton-container",
  "aria-hidden": "true",
  "aria-busy": "true"
}, hp = {
  key: "header-content",
  class: "metric-header-content__loaded"
}, fp = {
  key: 0,
  class: "card-title"
}, gp = {
  key: 0,
  class: "card-subtitle"
}, pp = {
  key: 0,
  class: "metric-header-content__export"
}, mp = {
  key: 0,
  class: "cmc-header-aside"
}, bp = { class: "chart-metric-container__body" }, vp = /* @__PURE__ */ ae({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = oe(t.defaultOpen), a = Na();
    function o(l) {
      return l.some((r) => {
        if (r.type === gl) return !1;
        if (r.type === Text) {
          const c = r.children;
          return typeof c == "string" && c.trim().length > 0;
        }
        return !!r.type;
      });
    }
    const s = $(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? o(l()) : !1;
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
    return (l, r) => e.collapsible ? (m(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      u("summary", Xg, [
        u("div", Gg, [
          u("div", Zg, [
            u("div", Qg, [
              E(ke, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (m(), k("div", Jg)) : (m(), k("div", ep, [
                    Se(l.$slots, "title", {}, () => [
                      e.title ? (m(), k("h3", tp, A(e.title), 1)) : V("", !0)
                    ], !0),
                    e.subtitle ? (m(), k("p", np, A(e.subtitle), 1)) : V("", !0),
                    Se(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            s.value ? (m(), k("div", ap, [
              Se(l.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          l.$slots.headerAside ? (m(), k("div", op, [
            Se(l.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
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
      u("div", sp, [
        Se(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, qg)) : (m(), k("div", ip, [
      u("div", lp, [
        u("div", rp, [
          u("div", cp, [
            u("div", dp, [
              E(ke, {
                name: "chart-metric-fade",
                mode: "out-in"
              }, {
                default: B(() => [
                  e.loading ? (m(), k("div", up, [...r[1] || (r[1] = [
                    u("div", { class: "ut-skeleton-title-subtitle" }, [
                      u("div", { class: "ut-skeleton-blink ut-skeleton-title" }),
                      u("div", { class: "ut-skeleton-blink ut-skeleton-subtitle" })
                    ], -1),
                    u("div", { class: "ut-skeleton-blink ut-skeleton-options" }, null, -1)
                  ])])) : (m(), k("div", hp, [
                    Se(l.$slots, "title", {}, () => [
                      e.title ? (m(), k("h3", fp, A(e.title), 1)) : V("", !0)
                    ], !0),
                    e.subtitle ? (m(), k("p", gp, A(e.subtitle), 1)) : V("", !0),
                    Se(l.$slots, "headerAppend", {}, void 0, !0)
                  ]))
                ]),
                _: 3
              })
            ]),
            s.value ? (m(), k("div", pp, [
              Se(l.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          l.$slots.headerAside ? (m(), k("div", mp, [
            Se(l.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ])
      ]),
      u("div", bp, [
        Se(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), me = /* @__PURE__ */ de(vp, [["__scopeId", "data-v-8741c0a0"]]);
function yp(e, t) {
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
function ho(e, t) {
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
function Ge(e, t) {
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
function _p(e, t) {
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
function ji(e, t) {
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
function Hi(e, t) {
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
function Yi(e, t) {
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
function xp(e, t) {
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
function kp(e, t) {
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
function Ki(e, t) {
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
const wp = {
  key: 0,
  class: "footer-divider"
}, Cp = {
  key: 0,
  class: "export-label"
}, $p = { class: "export-buttons" }, Sp = ["disabled"], Mp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Dp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ap = ["disabled"], Tp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Bp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Lp = /* @__PURE__ */ ae({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = $(() => n.variant === "footer" ? "footer" : "div"), s = $(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (m(), Z(nn(o.value), {
      class: G(s.value)
    }, {
      default: B(() => [
        e.variant === "footer" ? (m(), k("div", wp)) : V("", !0),
        u("div", {
          class: G(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (m(), k("span", Cp, "Export")) : V("", !0),
          u("div", $p, [
            i("pdf") ? (m(), k("button", {
              key: 0,
              type: "button",
              class: G(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (m(), k("svg", Mp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), k("svg", Dp, [...c[3] || (c[3] = [
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
            ], 10, Sp)) : V("", !0),
            i("csv") ? (m(), k("button", {
              key: 1,
              type: "button",
              class: G(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (m(), k("svg", Tp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), k("svg", Bp, [...c[6] || (c[6] = [
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
            ], 10, Ap)) : V("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Pe = /* @__PURE__ */ de(Lp, [["__scopeId", "data-v-ebfab47f"]]), Fp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Pp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ep = { class: "w-full shrink-0 sm:pr-2" }, Ip = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Rp = { class: "max-w-[360px] text-center" }, Op = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Vp = /* @__PURE__ */ ae({
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
    }, o = e, s = n, i = (g) => {
      s("export", g);
    }, l = ye(o, "theme"), r = ye(o, "options"), { isDark: c } = _e(l), d = (g) => {
      const v = new Date(g), f = String(v.getDate()).padStart(2, "0"), y = String(v.getMonth() + 1).padStart(2, "0");
      return `${f}-${y}`;
    }, h = $(() => {
      const g = o.data?.agents_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((_) => d(_)), y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(g))
        for (const w of Object.keys(_))
          y.add(w);
      const x = Array.from(y), p = (_) => _, b = x.map((_) => ({
        label: _,
        data: v.map((w) => g[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: p(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: f,
        datasets: b
      };
    });
    return t({ isDark: c }), (g, v) => (m(), Z(me, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", Fp, [
          E(ke, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              e.loading ? (m(), k("div", {
                key: "loading",
                class: G(["flex h-[320px] flex-col gap-3 px-4 pb-4", ["sk-root", { "sk-root--dark": T(c) }]]),
                "aria-busy": "true",
                "aria-label": "Loading chart"
              }, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 skeleton-shimmer",
                  style: { "border-radius": "10px" },
                  "aria-hidden": "true"
                }, null, -1)
              ])], 2)) : h.value.labels && h.value.labels.length ? (m(), k("section", Pp, [
                u("div", Ep, [
                  E(yt, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (m(), k("section", Ip, [
                u("div", Rp, [
                  u("div", Op, [
                    E(T(Ge), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), zp = /* @__PURE__ */ de(Vp, [["__scopeId", "data-v-36bec153"]]), Np = { class: "flex w-full min-w-0 justify-center" }, Wp = { class: "flex max-w-full min-w-0 items-center gap-2" }, jp = { class: "min-w-0 truncate text-[12px] leading-normal" }, Hp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Yp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Kp = /* @__PURE__ */ ae({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (m(), k("div", {
      class: G(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", Np, [
        u("div", Wp, [
          e.color ? (m(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: xe({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", jp, A(e.title), 1)
        ])
      ]),
      u("p", Hp, A(e.value), 1),
      e.subvalue ? (m(), k("p", Yp, A(e.subvalue), 1)) : V("", !0)
    ], 2));
  }
}), ue = /* @__PURE__ */ de(Kp, [["__scopeId", "data-v-945ff8fb"]]), Up = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, He = /* @__PURE__ */ ae({
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
    ), o = $(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = $(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = $(() => {
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
      class: G(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (m(), k("span", Up, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      u("span", {
        class: G(["min-w-0 flex-1 text-center", s.value])
      }, A(a.value), 3)
    ], 2)) : (m(), k("span", {
      key: 1,
      class: G(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      Se(l.$slots, "default", {}, () => [
        $e(A(e.label), 1)
      ])
    ], 2));
  }
}), J = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Me = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Tt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, qp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Xp = { class: "overflow-x-auto" }, Gp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Zp = /* @__PURE__ */ ae({
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
    const t = e, n = oe(!1), a = "—";
    function o(y) {
      return y == null || y === "" ? a : String(y);
    }
    function s(y) {
      return y === "center" ? "text-center" : y === "right" ? "text-right" : "text-left";
    }
    function i(y) {
      return `cell-${y}`;
    }
    function l(y, x) {
      return y[x];
    }
    function r(y, x) {
      if (typeof t.rowKey == "function")
        return t.rowKey(y);
      const p = y[t.rowKey];
      return typeof p == "string" || typeof p == "number" ? p : x;
    }
    function c(y, x) {
      return r(y, x);
    }
    const d = $(() => t.rows?.length ?? 0), h = $(() => d.value > t.maxVisibleRows), g = $(() => Math.max(0, d.value - t.maxVisibleRows)), v = $(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), f = $(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(g.value))
    );
    return (y, x) => (m(), k("div", qp, [
      u("div", Xp, [
        u("table", Gp, [
          u("thead", null, [
            u("tr", null, [
              (m(!0), k(ee, null, le(e.columns, (p) => (m(), k("th", {
                key: p.key,
                scope: "col",
                class: G(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [s(p.align), p.headerClass]])
              }, A(p.label), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(ee, null, le(v.value, (p, b) => (m(), k("tr", {
              key: c(p, b)
            }, [
              (m(!0), k(ee, null, le(e.columns, (_) => (m(), k("td", {
                key: `${b}-${_.key}`,
                class: G(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [s(_.align), _.cellClass]])
              }, [
                Se(y.$slots, i(_.key), {
                  row: p,
                  column: _,
                  value: l(p, _.key)
                }, () => [
                  $e(A(o(l(p, _.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (m(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: x[0] || (x[0] = (p) => n.value = !n.value)
      }, [
        $e(A(n.value ? e.viewLessLabel : f.value) + " ", 1),
        (m(), k("svg", {
          class: G(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...x[1] || (x[1] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : V("", !0)
    ]));
  }
}), st = /* @__PURE__ */ de(Zp, [["__scopeId", "data-v-58cfdc5e"]]), Qp = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Jp = {
  key: "error",
  class: "error-state"
}, em = { class: "error-content" }, tm = { class: "error-description" }, nm = {
  key: "content",
  class: "card-body"
}, am = { class: "chart-section" }, om = { class: "chart-wrapper" }, sm = { class: "payment-success-summary" }, im = {
  key: 0,
  class: "booking-daily-section"
}, lm = { class: "w-full min-w-0" }, rm = { class: "font-medium" }, cm = { class: "percentage-text" }, dm = { class: "badges-container" }, um = {
  key: 0,
  class: "badges-container"
}, hm = {
  key: 1,
  class: "percentage-text"
}, fm = { class: "badges-container" }, gm = {
  key: 1,
  class: "empty-state"
}, pm = /* @__PURE__ */ ae({
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
    function n(b) {
      return b;
    }
    const a = e, o = t, s = (b) => {
      o("export", b);
    }, i = $(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (b, _) => new Date(b.date).getTime() - new Date(_.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = $(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = $(() => a.data?.total_payment_success_value || []), d = $(() => {
      const b = c.value;
      return b.length === 0 ? f(0) : b.map(
        (_) => `${_.currency} ${f(_.total_value)}`
      ).join(" · ");
    }), h = (b) => b.payment_success_value || [], g = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce(
      (_, w) => _ + (w.count || 0),
      0
    ), v = (b) => Me(b), f = (b) => b == null ? "0" : Tt(b);
    $(() => (a.data?.total_payment_success_value || []).reduce(
      (b, _) => b + (_.total_value || 0),
      0
    ));
    const y = $(() => {
      const b = a.data, _ = b.total_booking_initiated || 0, w = b.total_booking_started || 0, S = b.total_payment_initiated || 0, M = b.total_not_found || 0, C = b.total_cancelled || 0, D = b.total_no_pending_balance || 0, I = b.total_errors || 0, F = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce(
        (te, ne) => te + (ne.count || 0),
        0
      ), L = b.total_payment_failed || 0, R = Math.max(0, _ - w), P = Math.max(
        0,
        w - S - M - C - D - I
      ), j = (te, ne) => {
        const re = ne > 0 ? Math.round(te / ne * 100) : 0;
        return `${J(te)} (${re}%)`;
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
      ], H = [];
      return w > 0 && H.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: j(w, _)
      }), R > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: R,
        label: j(R, _)
      }), S > 0 && H.push({
        source: "Started",
        target: "Payment Initiated",
        value: S,
        label: j(S, w)
      }), M > 0 && H.push({
        source: "Started",
        target: "Not Found",
        value: M,
        label: j(M, w)
      }), C > 0 && H.push({
        source: "Started",
        target: "Cancelled",
        value: C,
        label: j(C, w)
      }), D > 0 && H.push({
        source: "Started",
        target: "No Pending Balance",
        value: D,
        label: j(D, w)
      }), I > 0 && H.push({
        source: "Started",
        target: "Errors",
        value: I,
        label: j(I, w)
      }), P > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: P,
        label: j(P, w)
      }), F > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: F,
        label: j(F, S)
      }), L > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: L,
        label: j(L, S)
      }), { nodes: q, links: H };
    }), x = {
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
    }, p = (b, _) => !_ || _ === 0 ? "0%" : `${Math.round(b / _ * 100)}%`;
    return (b, _) => (m(), Z(me, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading && !a.error ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Qp, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : a.error ? (m(), k("div", Jp, [
              u("div", em, [
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
                u("p", tm, A(a.error), 1)
              ])
            ])) : (m(), k("div", nm, [
              u("section", am, [
                u("div", om, [
                  E(Nt, {
                    data: y.value,
                    "node-colors": x,
                    height: "500px",
                    "node-gap": 15
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", sm, [
                E(ue, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (m(), k("section", im, [
                _[3] || (_[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", lm, [
                  E(st, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: w }) => [
                      u("span", rm, A(T(Ve)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: w }) => [
                      u("span", null, A(T(J)(Number(w.booking_initiated_count))), 1)
                    ]),
                    "cell-started": B(({ row: w }) => [
                      u("span", null, [
                        $e(A(T(J)(Number(w.booking_started_count))) + " ", 1),
                        u("span", cm, " (" + A(p(
                          Number(w.booking_started_count),
                          Number(w.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": B(({ row: w }) => [
                      u("span", null, A(T(J)(Number(w.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": B(({ row: w }) => [
                      u("div", dm, [
                        E(He, { color: "success" }, {
                          default: B(() => [
                            $e(" Success: " + A(T(J)(
                              g(w)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(He, { color: "danger" }, {
                          default: B(() => [
                            $e(" Failed: " + A(T(J)(Number(w.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": B(({ row: w }) => [
                      h(w).length > 0 ? (m(), k("div", um, [
                        (m(!0), k(ee, null, le(h(
                          w
                        ), (S) => (m(), k("span", {
                          key: `${w.date}-${S.currency}`,
                          class: "badge badge-currency"
                        }, A(S.currency) + " " + A(v(S.total_value)), 1))), 128))
                      ])) : (m(), k("span", hm, "N/A"))
                    ]),
                    "cell-outcomes": B(({ row: w }) => [
                      u("div", fm, [
                        E(He, { color: "danger" }, {
                          default: B(() => [
                            $e(" Not Found: " + A(w.not_found_count ? T(J)(Number(w.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(He, { color: "warning" }, {
                          default: B(() => [
                            $e(" Cancelled: " + A(w.cancelled_count ? T(J)(Number(w.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(He, { color: "orange" }, {
                          default: B(() => [
                            $e(" No Balance: " + A(w.no_pending_balance_count ? T(J)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        E(He, { color: "danger" }, {
                          default: B(() => [
                            $e(" Errors: " + A(w.error_count ? T(J)(Number(w.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", gm, [..._[4] || (_[4] = [
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
}), mm = /* @__PURE__ */ de(pm, [["__scopeId", "data-v-c2cd8b09"]]), bm = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, vm = {
  key: "content",
  class: "card-body"
}, ym = {
  key: 0,
  class: "chart-section"
}, _m = { class: "chart-wrapper" }, xm = {
  key: 1,
  class: "checkin-daily-section"
}, km = { class: "w-full min-w-0" }, wm = { class: "font-medium" }, Cm = { class: "cell-success" }, $m = { class: "cell-danger" }, Sm = {
  key: 0,
  class: "reasons-list"
}, Mm = { class: "reason-name" }, Dm = { class: "reason-count" }, Am = {
  key: 1,
  class: "no-reasons"
}, Tm = {
  key: 2,
  class: "empty-state"
}, Bm = {
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
    const n = t, a = (b) => {
      n("export", b);
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
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], c = $(
      () => (l.value || []).map((b) => ({
        id: b.date,
        date: b.date,
        checkin_initiated_count: b.checkin_initiated_count,
        checkin_init_count: b.checkin_init_count,
        checkin_started_count: b.checkin_started_count,
        checkin_completed_count: b.checkin_completed_count,
        checkin_closed_count: b.checkin_closed_count,
        failed_steps: b.failed_steps
      }))
    ), d = $(() => {
      const b = o.data;
      return b && (Array.isArray(b.checkin_by_day) && b.checkin_by_day.length > 0 || (b.total_checkin_initiated ?? 0) > 0) ? { ...s, ...b } : o.checkinData ?? s;
    }), h = $(() => {
      const b = o.data;
      return b && (Array.isArray(b.failed_by_step_by_day) && b.failed_by_step_by_day.length > 0 || Array.isArray(b.unrecovered_by_step) && b.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: b.total_checkin_failed ?? 0,
        total_checkin_unrecovered: b.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: b.failed_by_step_by_day ?? [],
        unrecovered_by_step: b.unrecovered_by_step ?? [],
        unrecovered_by_day: b.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), g = $(() => {
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
      return (h.value.unrecovered_by_step || []).forEach((w) => {
        const M = w.step_name.replace(/_/g, " ").split(" ").map((D) => D.charAt(0).toUpperCase() + D.slice(1)).join(" "), C = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        b[M] = C[M] || "#DC2626";
      }), b;
    }), v = (b, _) => !_ || _ === 0 ? "0%" : `${Math.round(b / _ * 100)}%`, f = (b, _) => {
      const w = J(b), S = v(b, _);
      return `${w} (${S})`;
    }, y = (b) => b.reduce((_, w) => _ + w.failed_count, 0), x = $(() => {
      const b = [], _ = [];
      if (!d.value.total_checkin_initiated)
        return { nodes: b, links: _ };
      b.push({ name: "Checkin Init" }), b.push({ name: "Booking retrive" }), b.push({ name: "Booking retrive success" }), b.push({ name: "Number of Passengers" }), b.push({ name: "Completed" }), b.push({ name: "Closed with BP" });
      const w = d.value.total_checkin_initiated, S = d.value.total_checkin_init, M = d.value.total_checkin_init_abandoned, C = S - M, D = d.value.total_checkin_started, I = d.value.total_checkin_completed, F = d.value.total_checkin_closed, L = h.value.unrecovered_by_step || [], R = L.reduce(
        (H, te) => H + te.count,
        0
      );
      if (S > 0) {
        const H = Math.round(S / w * 100);
        _.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${H}%)`
        });
      }
      const P = w - S;
      if (P > 0) {
        const H = Math.round(P / w * 100);
        b.push({ name: "Abandoned (Init)" }), _.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: P,
          label: `${P.toLocaleString()} (${H}%)`
        });
      }
      if (M > 0) {
        const H = Math.round(M / w * 100);
        b.push({ name: "Abandoned (Started)" }), _.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: M,
          label: `${M.toLocaleString()} (${H}%)`
        });
      }
      if (C > 0) {
        const H = Math.round(C / w * 100);
        _.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: C,
          label: `${C.toLocaleString()} (${H}%)`
        });
      }
      if (D > 0) {
        const H = Math.round(D / w * 100);
        _.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: D,
          label: `${D.toLocaleString()} (${H}%)`
        });
      }
      if (I > 0) {
        const H = Math.round(I / D * 100);
        _.push({
          source: "Number of Passengers",
          target: "Completed",
          value: I,
          label: `${I.toLocaleString()} (${H}%)`
        });
      }
      if (L.length > 0 && R > 0) {
        b.push({ name: "Unrecovered" });
        const H = Math.round(R / D * 100);
        _.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: R,
          label: `${R.toLocaleString()} (${H}%)`
        }), L.forEach((te) => {
          const re = te.step_name.replace(/_/g, " ").split(" ").map((X) => X.charAt(0).toUpperCase() + X.slice(1)).join(" "), W = Math.round(te.count / D * 100);
          b.push({ name: re }), _.push({
            source: "Unrecovered",
            target: re,
            value: te.count,
            label: `${te.count.toLocaleString()} (${W}%)`
          });
        });
      }
      const j = D - (I + R);
      if (j > 0) {
        const H = Math.round(j / D * 100);
        b.push({ name: "Abandoned (Flow)" }), _.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: j,
          label: `${j.toLocaleString()} (${H}%)`
        });
      }
      const q = I - F;
      if (q > 0) {
        const H = Math.round(q / D * 100);
        b.push({ name: "BP Error" }), _.push({
          source: "Completed",
          target: "BP Error",
          value: q,
          label: `${q.toLocaleString()} (${H}%)`
        });
      }
      if (F > 0) {
        const H = Math.round(F / D * 100);
        _.push({
          source: "Completed",
          target: "Closed with BP",
          value: F,
          label: `${F.toLocaleString()} (${H}%)`
        });
      }
      return { nodes: b, links: _ };
    }), p = () => {
      const b = d.value.checkin_by_day || [], _ = h.value.failed_by_step_by_day || [];
      if (b.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...b].map((w) => {
        const S = _.find(
          (M) => M.date === w.date
        );
        return {
          ...w,
          failed_steps: S?.steps || []
        };
      }), l.value.sort((w, S) => new Date(w.date) - new Date(S.date));
    };
    return Fe(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        p();
      },
      { deep: !0, immediate: !0 }
    ), (b, _) => (m(), Z(me, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", bm, [..._[0] || (_[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", vm, [
              x.value.nodes.length > 0 ? (m(), k("section", ym, [
                u("div", _m, [
                  E(Nt, {
                    data: x.value,
                    height: "500px",
                    "node-colors": g.value,
                    "use-gradient": !1,
                    "node-gap": 30
                  }, null, 8, ["data", "node-colors"])
                ])
              ])) : V("", !0),
              l.value && l.value.length > 0 ? (m(), k("section", xm, [
                u("div", km, [
                  E(st, {
                    columns: r,
                    rows: c.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: w }) => [
                      u("span", wm, A(T(Ve)(String(w.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: w }) => [
                      u("span", null, A(T(J)(w.checkin_initiated_count)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: w }) => [
                      u("span", null, A(f(
                        w.checkin_init_count,
                        w.checkin_initiated_count
                      )), 1)
                    ]),
                    "cell-passengers": B(({ row: w }) => [
                      u("span", null, A(T(J)(w.checkin_started_count)), 1)
                    ]),
                    "cell-completed": B(({ row: w }) => [
                      u("span", null, A(f(
                        w.checkin_completed_count,
                        w.checkin_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: w }) => [
                      u("span", Cm, A(f(
                        w.checkin_closed_count,
                        w.checkin_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: w }) => [
                      u("span", $m, A(f(
                        y(w.failed_steps),
                        w.checkin_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: w }) => [
                      w.failed_steps && w.failed_steps.length > 0 ? (m(), k("div", Sm, [
                        (m(!0), k(ee, null, le(w.failed_steps, (S) => (m(), k("div", {
                          key: S.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Mm, A(S.step_name.replace(/_/g, " ")) + ":", 1),
                          u("span", Dm, A(S.failed_count), 1)
                        ]))), 128))
                      ])) : (m(), k("div", Am, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", Tm, [..._[1] || (_[1] = [
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
}, Ui = /* @__PURE__ */ de(Bm, [["__scopeId", "data-v-052a84f4"]]), Lm = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Fm = {
  key: "content",
  class: "card-body"
}, Pm = {
  key: 0,
  class: "sankey-section"
}, Em = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, Im = { class: "w-full min-w-0" }, Rm = { class: "font-medium whitespace-nowrap" }, Om = { class: "cell-success" }, Vm = { class: "cell-danger" }, zm = {
  key: 0,
  class: "reasons-list"
}, Nm = { class: "reason-name" }, Wm = { class: "reason-count" }, jm = {
  key: 1,
  class: "no-reasons"
}, Hm = {
  key: 2,
  class: "empty-state"
}, Ym = { class: "empty-state-content" }, Km = { class: "empty-icon-wrapper" }, Um = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (p) => {
      o("export", p);
    }, { isDark: i } = _e(ye(a, "theme")), l = (p) => p == null ? "0" : p.toLocaleString(), r = (p) => {
      const [b, _, w] = p.split("-").map(Number);
      return Ve([b, _ - 1, w]).format("MMM DD");
    }, c = (p) => p.replace(/_/g, " ").replace(/\b\w/g, (b) => b.toUpperCase()), d = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, h = (p, b) => {
      const _ = p || 0, w = b || 0, S = l(_), M = d(_, w);
      return `${S} (${M})`;
    }, g = $(() => ({
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
    })), v = $(() => {
      const p = a.checkinData?.record_locator_by_day || [], b = a.failedData?.failed_by_step_by_day || [], _ = a.failedData?.unrecovered_by_day || [];
      return p.map((S) => {
        const M = b.find((D) => D.date === S.date), C = _.find(
          (D) => D.date === S.date
        );
        return {
          ...S,
          failed_steps: M?.steps || [],
          unrecovered_count: C?.unrecovered_count || 0
        };
      }).sort(
        (S, M) => new Date(S.date).getTime() - new Date(M.date).getTime()
      );
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], y = $(
      () => v.value.map((p) => ({
        id: p.date,
        date: p.date,
        checkin_initiated: p.checkin_initiated,
        record_locator_init_count: p.record_locator_init_count,
        record_locator_started_count: p.record_locator_started_count,
        record_locator_completed_count: p.record_locator_completed_count,
        record_locator_closed_count: p.record_locator_closed_count,
        unrecovered_count: p.unrecovered_count,
        failed_steps: p.failed_steps
      }))
    ), x = $(() => {
      const p = [], b = [], _ = /* @__PURE__ */ new Set(), w = (Y) => {
        _.has(Y) || (p.push({ name: Y }), _.add(Y));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: p, links: b };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const S = a.checkinData.total_checkin_initiated || 0, M = a.checkinData.total_record_locator_init || 0, C = a.checkinData.total_record_locator_init_abandoned || 0, D = a.checkinData.total_checkin_pre_init_abandoned_error, I = a.checkinData.total_checkin_pre_init_abandoned_voluntary, F = D != null || I != null, L = F ? Math.max(Number(D) || 0, 0) : 0, R = F ? Math.max(Number(I) || 0, 0) : 0, P = a.checkinData.total_record_locator_init_abandoned_error, j = a.checkinData.total_record_locator_init_abandoned_voluntary, q = P != null || j != null, H = q ? Math.max(Number(P) || 0, 0) : 0, te = q ? Math.max(Number(j) || 0, 0) : 0, ne = q ? Math.max(C - H - te, 0) : C, re = M - C, W = a.checkinData.total_record_locator_started || 0, X = a.checkinData.total_record_locator_completed || 0, Q = a.checkinData.total_record_locator_closed || 0, ce = a.checkinData.total_record_locator_unrecovered || 0;
      if (M > 0) {
        const Y = Math.round(M / S * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: M,
          label: `${M.toLocaleString()} (${Y}%)`
        });
      }
      const ie = S - M;
      if (F) {
        if (R > 0) {
          const Y = Math.round(
            R / S * 100
          );
          w("Abandoned (Init)"), b.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: R,
            label: `${R.toLocaleString()} (${Y}%)`
          });
        }
        if (L > 0) {
          const Y = Math.round(L / S * 100);
          w("Booking not retreived"), b.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: L,
            label: `${L.toLocaleString()} (${Y}%)`
          });
        }
      } else if (ie > 0) {
        const Y = Math.round(ie / S * 100);
        w("Abandoned (Init)"), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: ie,
          label: `${ie.toLocaleString()} (${Y}%)`
        });
      }
      if (q) {
        if (H > 0) {
          const Y = Math.round(H / S * 100);
          w("Error"), b.push({
            source: "Booking Retrieval",
            target: "Error",
            value: H,
            label: `${H.toLocaleString()} (${Y}%)`
          });
        }
        if (te > 0) {
          const Y = Math.round(te / S * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: te,
            label: `${te.toLocaleString()} (${Y}%)`
          });
        }
        if (ne > 0) {
          const Y = Math.round(
            ne / S * 100
          );
          w("Abandoned (Started)"), b.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: ne,
            label: `${ne.toLocaleString()} (${Y}%)`
          });
        }
      } else if (C > 0) {
        const Y = Math.round(C / S * 100);
        w("Abandoned (Started)"), b.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${Y}%)`
        });
      }
      if (re > 0) {
        const Y = Math.round(re / S * 100);
        b.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: re,
          label: `${re.toLocaleString()} (${Y}%)`
        });
      }
      if (X > 0) {
        const Y = Math.round(X / W * 100);
        b.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: X,
          label: `${X.toLocaleString()} (${Y}%)`
        });
      }
      if (ce > 0) {
        w("Errors");
        const Y = Math.round(ce / W * 100);
        b.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: ce,
          label: `${ce.toLocaleString()} (${Y}%)`
        });
      }
      const we = W - (X + ce);
      if (we > 0) {
        const Y = Math.round(we / W * 100);
        w("Abandoned (Flow)"), b.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: we,
          label: `${we.toLocaleString()} (${Y}%)`
        });
      }
      const be = X - Q;
      if (be > 0) {
        const Y = Math.round(be / W * 100);
        w("BP Error"), b.push({
          source: "Completed",
          target: "BP Error",
          value: be,
          label: `${be.toLocaleString()} (${Y}%)`
        });
      }
      if (Q > 0) {
        const Y = Math.round(Q / W * 100);
        b.push({
          source: "Completed",
          target: "Closed with BP",
          value: Q,
          label: `${Q.toLocaleString()} (${Y}%)`
        });
      }
      return { nodes: p, links: b };
    });
    return t({ isDark: i }), (p, b) => (m(), Z(me, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Lm, [...b[0] || (b[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Fm, [
              x.value.nodes.length > 0 ? (m(), k("div", Pm, [
                E(Nt, {
                  data: x.value,
                  height: "500px",
                  "node-colors": g.value,
                  "use-gradient": !1,
                  "node-gap": 30
                }, null, 8, ["data", "node-colors"])
              ])) : V("", !0),
              v.value && v.value.length > 0 ? (m(), k("div", Em, [
                u("div", Im, [
                  E(st, {
                    columns: f,
                    rows: y.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", Rm, A(r(String(_.date))), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", null, A(l(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieval": B(({ row: _ }) => [
                      u("span", null, A(h(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-bookingRetrieved": B(({ row: _ }) => [
                      u("span", null, A(h(
                        _.record_locator_started_count,
                        _.record_locator_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: _ }) => [
                      u("span", null, A(h(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: _ }) => [
                      u("span", Om, A(h(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-failed": B(({ row: _ }) => [
                      u("span", Vm, A(h(
                        _.unrecovered_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-reasons": B(({ row: _ }) => [
                      Array.isArray(_.failed_steps) && _.failed_steps.length > 0 ? (m(), k("div", zm, [
                        (m(!0), k(ee, null, le(_.failed_steps, (w) => (m(), k("div", {
                          key: w.step_name,
                          class: "reason-item"
                        }, [
                          u("span", Nm, A(c(w.step_name)) + ":", 1),
                          u("span", Wm, A(w.failed_count), 1)
                        ]))), 128))
                      ])) : (m(), k("div", jm, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("div", Hm, [
                u("div", Ym, [
                  u("div", Km, [
                    E(T(Ge), { class: "empty-icon" })
                  ]),
                  b[1] || (b[1] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
                  b[2] || (b[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
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
}), qm = /* @__PURE__ */ de(Um, [["__scopeId", "data-v-0845cd9f"]]), Xm = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Gm = {
  key: "content",
  class: "card-body"
}, Zm = {
  key: 0,
  class: "chart-section"
}, Qm = { class: "chart-wrapper" }, Jm = {
  key: 1,
  class: "record-locator-daily-section"
}, e0 = { class: "w-full min-w-0" }, t0 = { class: "cell-plain font-medium" }, n0 = { class: "cell-plain text-center" }, a0 = { class: "cell-plain text-center" }, o0 = { class: "cell-plain text-center" }, s0 = { class: "cell-plain text-center" }, i0 = { class: "cell-plain text-center success-value" }, l0 = { class: "cell-plain text-center failed-value" }, r0 = { class: "cell-plain text-center warning-value" }, c0 = { class: "cell-plain text-center" }, d0 = { class: "cell-plain text-center failed-value" }, u0 = {
  key: 2,
  class: "empty-state"
}, h0 = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (p) => {
      o("export", p);
    }, { isDark: i } = _e(ye(a, "theme")), l = $(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (p, b) => new Date(p.date).getTime() - new Date(b.date).getTime()
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
      () => l.value.map((p) => ({
        id: p.date,
        date: p.date,
        checkin_initiated: p.checkin_initiated,
        record_locator_init_count: p.record_locator_init_count,
        record_locator_started_count: p.record_locator_started_count,
        record_locator_completed_count: p.record_locator_completed_count,
        record_locator_closed_count: p.record_locator_closed_count,
        record_locator_failed_count: p.record_locator_failed_count,
        record_locator_abandoned_count: p.record_locator_abandoned_count,
        record_locator_create_payment_count: p.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: p.record_locator_create_payment_failed_count
      }))
    ), g = $(() => a.data), v = $(() => ({
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
    })), f = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, y = (p, b) => {
      const _ = J(p), w = f(p, b);
      return `${_} (${w})`;
    }, x = $(() => {
      const p = [], b = [], _ = /* @__PURE__ */ new Set(), w = (ie) => {
        _.has(ie) || (p.push({ name: ie }), _.add(ie));
      };
      if (!g.value.total_checkin_initiated)
        return { nodes: p, links: b };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const S = g.value.total_checkin_initiated, M = g.value.total_record_locator_init, C = g.value.total_record_locator_started, D = g.value.total_record_locator_completed, I = g.value.total_record_locator_closed, F = g.value.total_record_locator_failed, L = g.value.total_record_locator_abandoned, R = g.value.total_record_locator_init_abandoned, P = g.value.total_checkin_pre_init_abandoned_error, j = g.value.total_checkin_pre_init_abandoned_voluntary, q = P != null || j != null, H = q ? Math.max(Number(P) || 0, 0) : 0, te = q ? Math.max(Number(j) || 0, 0) : 0, ne = g.value.total_record_locator_init_abandoned_error, re = g.value.total_record_locator_init_abandoned_voluntary, W = ne != null || re != null, X = W ? Math.max(Number(ne) || 0, 0) : 0, Q = W ? Math.max(Number(re) || 0, 0) : 0;
      if (M > 0) {
        const ie = Math.round(M / S * 100);
        b.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: M,
          label: `${M.toLocaleString()} (${ie}%)`
        });
      }
      const ce = S - M;
      if (q) {
        if (te > 0) {
          const ie = Math.round(
            te / S * 100
          );
          w("Abandoned (Init)"), b.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: te,
            label: `${te.toLocaleString()} (${ie}%)`
          });
        }
        if (H > 0) {
          const ie = Math.round(H / S * 100);
          w("Booking not retreived"), b.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: H,
            label: `${H.toLocaleString()} (${ie}%)`
          });
        }
      } else if (ce > 0) {
        const ie = Math.round(ce / S * 100);
        w("Abandoned (Init)"), b.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: ce,
          label: `${ce.toLocaleString()} (${ie}%)`
        });
      }
      if (C > 0) {
        const ie = Math.round(C / S * 100);
        b.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: C,
          label: `${C.toLocaleString()} (${ie}%)`
        });
      }
      if (W) {
        if (X > 0) {
          const ie = Math.round(X / S * 100);
          w("Error"), b.push({
            source: "Booking retrive",
            target: "Error",
            value: X,
            label: `${X.toLocaleString()} (${ie}%)`
          });
        }
        if (Q > 0) {
          const ie = Math.round(Q / S * 100);
          w("Abandoned (Started)"), b.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: Q,
            label: `${Q.toLocaleString()} (${ie}%)`
          });
        }
      } else if (R > 0) {
        const ie = Math.round(
          R / S * 100
        );
        w("Abandoned (Started)"), b.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: R,
          label: `${R.toLocaleString()} (${ie}%)`
        });
      }
      if (D > 0) {
        const ie = Math.round(
          D / C * 100
        );
        b.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: D,
          label: `${D.toLocaleString()} (${ie}%)`
        });
      }
      if (I > 0) {
        const ie = Math.round(
          I / C * 100
        );
        b.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: I,
          label: `${I.toLocaleString()} (${ie}%)`
        });
      }
      if (F > 0) {
        const ie = Math.round(
          F / C * 100
        );
        w("Checkin Failed"), b.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: F,
          label: `${F.toLocaleString()} (${ie}%)`
        });
      }
      if (L > 0) {
        const ie = Math.round(
          L / C * 100
        );
        w("Abandoned (Flow)"), b.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: L,
          label: `${L.toLocaleString()} (${ie}%)`
        });
      }
      return { nodes: p, links: b };
    });
    return t({ isDark: i }), (p, b) => (m(), Z(me, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            a.loading ? (m(), k("div", Xm, [...b[0] || (b[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Gm, [
              x.value.nodes.length > 0 ? (m(), k("section", Zm, [
                u("div", Qm, [
                  E(Nt, {
                    data: x.value,
                    height: "500px",
                    "node-colors": v.value,
                    "use-gradient": !1,
                    "node-gap": 30
                  }, null, 8, ["data", "node-colors"])
                ])
              ])) : V("", !0),
              l.value && l.value.length > 0 ? (m(), k("section", Jm, [
                u("div", e0, [
                  E(st, {
                    columns: d.value,
                    rows: h.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", t0, A(T(Ve)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-checkinInit": B(({ row: _ }) => [
                      u("span", n0, A(T(J)(_.checkin_initiated)), 1)
                    ]),
                    "cell-bookingRetrieve": B(({ row: _ }) => [
                      u("span", a0, A(y(
                        _.record_locator_init_count,
                        _.checkin_initiated
                      )), 1)
                    ]),
                    "cell-checkinStarted": B(({ row: _ }) => [
                      u("span", o0, A(T(J)(_.record_locator_started_count)), 1)
                    ]),
                    "cell-checkinCompleted": B(({ row: _ }) => [
                      u("span", s0, A(y(
                        _.record_locator_completed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinClosed": B(({ row: _ }) => [
                      u("span", i0, A(y(
                        _.record_locator_closed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-checkinFailed": B(({ row: _ }) => [
                      u("span", l0, A(y(
                        _.record_locator_failed_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-abandoned": B(({ row: _ }) => [
                      u("span", r0, A(y(
                        _.record_locator_abandoned_count,
                        _.record_locator_started_count
                      )), 1)
                    ]),
                    "cell-createPayment": B(({ row: _ }) => [
                      u("span", c0, A(T(J)(
                        _.record_locator_create_payment_count ?? 0
                      )), 1)
                    ]),
                    "cell-failedPayment": B(({ row: _ }) => [
                      u("span", d0, A(T(J)(
                        _.record_locator_create_payment_failed_count ?? 0
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["columns", "rows"])
                ])
              ])) : (m(), k("section", u0, [...b[1] || (b[1] = [
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
}), qi = /* @__PURE__ */ de(h0, [["__scopeId", "data-v-6dd73a19"]]), f0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, g0 = {
  key: "content",
  class: "card-body"
}, p0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, m0 = { class: "w-full min-w-0" }, b0 = { class: "segment-plain" }, v0 = { class: "segment-plain" }, y0 = { class: "segment-plain" }, _0 = { class: "percentage-value" }, x0 = { class: "percentage-value" }, k0 = { class: "percentage-value success" }, w0 = {
  key: 1,
  class: "empty-state"
}, C0 = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i } = _e(ye(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = $(
      () => a.data.map((g, v) => ({
        id: `segment-${v}-${g.departure_airport}-${g.arrival_airport}-${g.segment_init_count}-${g.segment_started_count}`,
        departure_airport: g.departure_airport,
        conexion_airport: g.conexion_airport,
        arrival_airport: g.arrival_airport,
        segment_init_count: g.segment_init_count,
        segment_started_count: g.segment_started_count,
        segment_completed_count: g.segment_completed_count,
        segment_closed_count: g.segment_closed_count
      }))
    ), c = (g, v) => !v || v === 0 || !g ? "0%" : `${Math.round(g / v * 100)}%`, d = (g) => !g || g === "None" ? "-" : String(g).trim().replace(/_[0-9]+$/i, ""), h = (g) => {
      const v = d(g?.departure_airport), f = d(g?.arrival_airport);
      return v === "-" || f === "-" ? !1 : v === f;
    };
    return t({ isDark: i }), (g, v) => (m(), Z(me, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", f0, [...v[0] || (v[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", g0, [
              a.data.length > 0 ? (m(), k("section", p0, [
                u("div", m0, [
                  E(st, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-departure": B(({ row: f }) => [
                      u("span", b0, A(d(f.departure_airport)), 1)
                    ]),
                    "cell-connection": B(({ row: f }) => [
                      u("span", {
                        class: G(["segment-plain", {
                          "segment-plain--muted": d(f.conexion_airport) === "-"
                        }])
                      }, A(d(f.conexion_airport)), 3)
                    ]),
                    "cell-arrival": B(({ row: f }) => [
                      u("span", v0, A(d(f.arrival_airport)), 1)
                    ]),
                    "cell-trip": B(({ row: f }) => [
                      u("span", y0, A(h(f) ? "Roundtrip" : "One way"), 1)
                    ]),
                    "cell-init": B(({ row: f }) => [
                      $e(A(T(J)(f.segment_init_count)), 1)
                    ]),
                    "cell-started": B(({ row: f }) => [
                      u("span", _0, A(c(
                        f.segment_started_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    "cell-completed": B(({ row: f }) => [
                      u("span", x0, A(c(
                        f.segment_completed_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    "cell-closed": B(({ row: f }) => [
                      u("span", k0, A(c(
                        f.segment_closed_count,
                        f.segment_init_count
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", w0, [...v[1] || (v[1] = [
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
}), Xi = /* @__PURE__ */ de(C0, [["__scopeId", "data-v-522b5823"]]), $0 = { class: "checkin-container__body" }, S0 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = $(() => n.loading || n.checkinLoading);
    $(() => n.loading || n.checkinMetricsLoading);
    const s = $(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = $(() => n.loading || n.segmentsLoading), l = $(() => n.recordLocatorData ?? n.checkinMetricsData);
    function r(h, g) {
      a("export", { source: h, format: g });
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
    return (h, g) => (m(), Z(me, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", $0, [
          e.showCheckin ? (m(), Z(Ui, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: g[0] || (g[0] = (v) => r("checkin", v))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : V("", !0),
          E(qi, {
            collapsible: !1,
            loading: s.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: g[1] || (g[1] = (v) => r("recordLocator", v))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          E(Xi, {
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
}), M0 = /* @__PURE__ */ de(S0, [["__scopeId", "data-v-d7fe32b0"]]), D0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, A0 = {
  key: "content",
  class: "card-body"
}, T0 = { class: "chart-section" }, B0 = { class: "chart-wrapper" }, L0 = {
  key: 1,
  class: "empty-chart"
}, F0 = { class: "payment-success-summary" }, P0 = {
  key: 0,
  class: "disruption-daily-section"
}, E0 = { class: "w-full min-w-0" }, I0 = { class: "font-medium text-center" }, R0 = { class: "text-center" }, O0 = { class: "text-center" }, V0 = { class: "percentage-text" }, z0 = { class: "text-center" }, N0 = { class: "abandoned-value" }, W0 = { class: "badges-container badges-wrap" }, j0 = { class: "badges-container badges-wrap" }, H0 = {
  key: 1,
  class: "empty-state"
}, Y0 = /* @__PURE__ */ ae({
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
    function n(p) {
      return p;
    }
    const a = e, o = t, s = (p) => {
      o("export", p);
    }, i = $(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (p, b) => new Date(p.date).getTime() - new Date(b.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], r = $(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = $(() => a.data?.total_payment_success || []), d = $(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map((b) => `${b.currency} ${g(b.total_value)}`).join(" · ");
    }), h = (p, b) => !b || b === 0 ? "0%" : `${Math.round(p / b * 100)}%`, g = (p) => Me(p), v = (p) => (p ?? []).reduce((b, _) => b + (_.count ?? 0), 0), f = (p) => typeof p.sell_success_count == "number" ? p.sell_success_count : v(p.payment_success_total), y = $(() => {
      const p = a.data, b = p.total_disruption_conversations || 0, _ = p.total_disruption_initiated || 0, w = p.total_voluntary || 0, S = p.total_involuntary || 0, M = p.total_accepted || 0, C = p.total_confirmed || 0, D = typeof p.total_sell_success == "number" ? p.total_sell_success : v(p.total_payment_success), I = p.total_sell_failed || 0, F = Math.max(0, b - _), L = Math.max(
        0,
        _ - w - S
      ), R = Math.max(0, S - M), P = Math.max(0, w - C), j = I, q = Math.max(0, C - D - j), H = (re, W) => {
        const X = W > 0 ? Math.round(re / W * 100) : 0;
        return `${re.toLocaleString()} (${X}%)`;
      }, te = [
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
      ], ne = [];
      return _ > 0 && ne.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: H(_, b)
      }), F > 0 && ne.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: F,
        label: H(F, b)
      }), w > 0 && ne.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: H(w, b)
      }), S > 0 && ne.push({
        source: "Started",
        target: "Involuntary",
        value: S,
        label: H(S, b)
      }), L > 0 && ne.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: H(L, b)
      }), M > 0 && ne.push({
        source: "Involuntary",
        target: "Accepted",
        value: M,
        label: H(M, b)
      }), R > 0 && ne.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: R,
        label: H(R, b)
      }), C > 0 && ne.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: H(C, b)
      }), P > 0 && ne.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: P,
        label: H(P, b)
      }), D > 0 && ne.push({
        source: "Confirmed",
        target: "Paid",
        value: D,
        label: H(D, b)
      }), j > 0 && ne.push({
        source: "Confirmed",
        target: "Rejected",
        value: j,
        label: H(j, b)
      }), q > 0 && ne.push({
        source: "Confirmed",
        target: "Not Paid",
        value: q,
        label: H(q, b)
      }), { nodes: te, links: ne };
    }), x = {
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
    return (p, b) => (m(), Z(me, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", D0, [...b[0] || (b[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", A0, [
              u("section", T0, [
                u("div", B0, [
                  y.value.nodes.length > 0 && y.value.links.length > 0 ? (m(), Z(Nt, {
                    key: 0,
                    data: y.value,
                    "node-colors": x,
                    height: "500px"
                  }, null, 8, ["data"])) : (m(), k("div", L0, [...b[1] || (b[1] = [
                    u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
                  ])]))
                ])
              ]),
              u("section", F0, [
                E(ue, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value && i.value.length > 0 ? (m(), k("section", P0, [
                b[2] || (b[2] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", E0, [
                  E(st, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: _ }) => [
                      u("span", I0, A(T(Ve)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": B(({ row: _ }) => [
                      u("span", R0, A(T(J)(Number(_.disruption_conversations))), 1)
                    ]),
                    "cell-started": B(({ row: _ }) => [
                      u("span", O0, [
                        $e(A(T(J)(Number(_.disruption_initiated_count))) + " ", 1),
                        u("span", V0, " (" + A(h(
                          Number(_.disruption_initiated_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-abandoned": B(({ row: _ }) => [
                      u("span", z0, [
                        u("span", N0, A(T(J)(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count)
                        )) + " (" + A(h(
                          Number(_.disruption_initiated_count) - Number(_.voluntary_count) - Number(_.involuntary_count),
                          Number(_.disruption_conversations)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-voluntary": B(({ row: _ }) => [
                      u("div", W0, [
                        (m(!0), k(ee, null, le([_], (w, S) => (m(), k(ee, { key: S }, [
                          E(He, {
                            color: "neutral",
                            outlined: !0
                          }, {
                            default: B(() => [
                              $e(" VOL " + A(T(J)(w.voluntary_count)) + " (" + A(h(
                                w.voluntary_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(He, { color: "success" }, {
                            default: B(() => [
                              $e(" Confirm " + A(T(J)(w.confirmed_count)) + " (" + A(h(
                                w.confirmed_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(He, { color: "warning" }, {
                            default: B(() => [
                              $e(" Not Confirm " + A(T(J)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(
                                w.voluntary_count - w.confirmed_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(He, { color: "danger" }, {
                            default: B(() => [
                              $e(" Reject " + A(T(J)(w.sell_failed_count)) + " (" + A(h(
                                w.sell_failed_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(He, { color: "orange" }, {
                            default: B(() => [
                              $e(" Not Paid " + A(T(J)(
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
                          E(He, {
                            color: "success",
                            outlined: !0
                          }, {
                            default: B(() => [
                              $e(" Finish " + A(T(J)(f(w))) + " (" + A(h(
                                f(w),
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          (m(!0), k(ee, null, le(w.payment_success_total || [], (M) => (m(), Z(He, {
                            key: `${w.date}-${M.currency}`,
                            color: "neutral"
                          }, {
                            default: B(() => [
                              $e(A(M.currency) + " " + A(g(M.total_value)), 1)
                            ]),
                            _: 2
                          }, 1024))), 128))
                        ], 64))), 128))
                      ])
                    ]),
                    "cell-involuntary": B(({ row: _ }) => [
                      u("div", j0, [
                        (m(!0), k(ee, null, le([_], (w, S) => (m(), k(ee, { key: S }, [
                          E(He, { color: "purple" }, {
                            default: B(() => [
                              $e(" INV " + A(T(J)(w.involuntary_count)) + " (" + A(h(
                                w.involuntary_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(He, { color: "danger" }, {
                            default: B(() => [
                              $e(" Human " + A(T(J)(w.involuntary_count - w.accepted_count)) + " (" + A(h(
                                w.involuntary_count - w.accepted_count,
                                w.disruption_conversations
                              )) + ") ", 1)
                            ]),
                            _: 2
                          }, 1024),
                          E(He, { color: "success" }, {
                            default: B(() => [
                              $e(" Accept " + A(T(J)(w.accepted_count)) + " (" + A(h(
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
              ])) : (m(), k("section", H0, [...b[3] || (b[3] = [
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
}), K0 = /* @__PURE__ */ de(Y0, [["__scopeId", "data-v-9dea57da"]]), U0 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, q0 = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, X0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, G0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Z0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, Q0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, J0 = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, i = ye(a, "theme"), { isDark: l } = _e(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
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
      const v = d.value, f = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, y = (b) => f > 0 ? (b / f * 100).toFixed(1) : "0.0", x = v.total_faq_events, p = x > 0 ? `${(v.total_documents_found / x * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(v.total_airline_information_retrieved)}%`,
          subvalue: `${J(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(v.total_booking_info_retrieved)}%`,
          subvalue: `${J(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(v.total_flight_status_retrieved)}%`,
          subvalue: `${J(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: J(v.total_documents_found),
          subvalue: p
        }
      ];
    }), g = (v) => {
      if (!v) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const f = v.faq_by_day || [];
      if (f.length > 0) {
        const y = f.map(
          (_) => Ve(_.date).format("MMM DD")
        ), x = f.map(
          (_) => _.airline_information_retrieved_count || 0
        ), p = f.map(
          (_) => _.flight_status_retrieved_count || 0
        ), b = f.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
          datasets: [
            {
              label: "Airline Information",
              data: x,
              borderColor: r.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: p,
              borderColor: r.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: b,
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
        g(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (v, f) => (m(), Z(me, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: G(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(ke, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (m(), k("div", U0, [...f[0] || (f[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", q0, [
                c.value.labels && c.value.labels.length ? (m(), k("section", X0, [
                  u("div", G0, [
                    E(ft, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", Z0, [
                    (m(!0), k(ee, null, le(h.value, (y) => (m(), Z(ue, {
                      key: y.name,
                      class: "min-w-0",
                      color: y.color,
                      title: y.label,
                      value: y.value,
                      subvalue: y.subvalue
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : (m(), k("section", Q0, [...f[1] || (f[1] = [
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
}), eb = /* @__PURE__ */ de(J0, [["__scopeId", "data-v-5d7a0066"]]), tb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, nb = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, ab = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ob = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, sb = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, ib = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, lb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, rb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, cb = { class: "max-w-[360px] px-4 text-center" }, db = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ub = /* @__PURE__ */ ae({
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
    }, o = e, s = n, i = (g) => {
      s("export", g);
    }, l = ye(o, "theme"), { isDark: r } = _e(l), c = $(() => {
      const g = o.data?.agents_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = /* @__PURE__ */ new Set();
      for (const p of Object.values(g))
        for (const b of Object.keys(p))
          f.add(b);
      const x = Array.from(f).map((p) => {
        const b = p.toLowerCase(), _ = a[b] || a[p] || "#94a3b8";
        return {
          label: p.charAt(0).toUpperCase() + p.slice(1).replace(/_/g, " "),
          data: v.map((w) => g[w]?.[p] || 0),
          borderColor: _
        };
      });
      return {
        labels: v.map((p) => Ve(p).format("MMM DD")),
        datasets: x
      };
    }), d = $(() => {
      const g = o.data?.agents_by_day || {}, v = {};
      for (const y of Object.values(g))
        for (const [x, p] of Object.entries(y))
          v[x] = (v[x] || 0) + p;
      const f = Object.values(v).reduce((y, x) => y + x, 0);
      return f === 0 ? [] : Object.entries(v).sort(([, y], [, x]) => x - y).map(([y, x]) => {
        const p = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: x,
          percentage: (x / f * 100).toFixed(1),
          color: a[p] || a[y] || "#94a3b8"
        };
      });
    }), h = $(() => d.value.slice(0, 4));
    return t({ isDark: r }), (g, v) => (m(), Z(me, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: G(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(ke, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              o.loading ? (m(), k("div", tb, [...v[0] || (v[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", nb, [
                c.value.labels && c.value.labels.length ? (m(), k("section", ab, [
                  u("div", ob, [
                    E(ft, {
                      data: c.value,
                      options: e.options,
                      theme: l.value
                    }, null, 8, ["data", "options", "theme"])
                  ]),
                  h.value.length ? (m(), k("div", sb, [
                    (m(!0), k(ee, null, le(h.value, (f) => (m(), Z(ue, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(J)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])) : V("", !0)
                ])) : d.value.length ? (m(), k("section", ib, [
                  u("div", lb, [
                    (m(!0), k(ee, null, le(h.value, (f) => (m(), Z(ue, {
                      key: f.name,
                      class: "min-w-0",
                      color: f.color,
                      title: f.label,
                      value: `${f.percentage}%`,
                      subvalue: `${T(J)(f.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ])
                ])) : V("", !0),
                d.value.length ? V("", !0) : (m(), k("section", rb, [
                  u("div", cb, [
                    u("div", db, [
                      E(T(Ge), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), hb = /* @__PURE__ */ de(ub, [["__scopeId", "data-v-299d9c3f"]]), fb = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, gb = {
  key: "content",
  class: "card-body"
}, pb = {
  key: 0,
  class: "chart-section"
}, mb = {
  key: 1,
  class: "empty-state"
}, bb = {
  key: 2,
  class: "comparison-section"
}, vb = { class: "comparison-grid" }, yb = /* @__PURE__ */ ae({
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
    }, o = [
      "#B0C4DE",
      "#C9A0F2",
      "#F5C26B",
      "#8BE8B0",
      "#F2A07A",
      "#7BA3E8"
    ], s = e, i = n, l = (f) => {
      i("export", f);
    }, { isDark: r } = _e(ye(s, "theme"));
    $(() => s.data?.total_sell_success ?? 0);
    const c = $(() => {
      const f = /* @__PURE__ */ new Set();
      for (const y of s.data?.sales_by_channel_by_day ?? [])
        for (const x of Object.keys(y.channels))
          f.add(x);
      return Array.from(f).sort();
    }), d = (f, y) => a[f.toLowerCase()] ?? o[y % o.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function g(f) {
      if (f.delta === null) return "No previous data";
      const y = J(f.previous), x = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${y})` : `${f.delta > 0 ? "↑" : "↓"} ${x} vs prev. period (${y})`;
    }
    const v = $(() => {
      const f = s.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const y = f.map((p) => Ve(p.date).format("MMM-DD")), x = c.value.map((p, b) => ({
        label: p,
        data: f.map((_) => _.channels[p] ?? 0),
        backgroundColor: d(p, b),
        borderRadius: 4
      }));
      return { labels: y, datasets: x };
    });
    return t({ isDark: r }), (f, y) => (m(), Z(me, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (m(), k("div", fb, [...y[0] || (y[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", gb, [
              v.value.labels.length > 0 ? (m(), k("section", pb, [
                E(yt, {
                  data: v.value,
                  stacked: !0
                }, null, 8, ["data"])
              ])) : (m(), k("section", mb, [...y[1] || (y[1] = [
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
              e.channelComparison.length > 0 ? (m(), k("section", bb, [
                u("div", vb, [
                  (m(!0), k(ee, null, le(e.channelComparison, (x, p) => (m(), Z(T(ue), {
                    key: x.channel,
                    color: d(x.channel, p),
                    title: h(x.channel),
                    value: T(J)(x.current),
                    subvalue: g(x)
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : V("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Gi = /* @__PURE__ */ de(yb, [["__scopeId", "data-v-b99f46a5"]]), _b = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, xb = {
  key: "content",
  class: "card-body"
}, kb = {
  key: 0,
  class: "chart-section"
}, wb = { class: "chart-wrapper" }, Cb = {
  key: 1,
  class: "empty-state"
}, $b = { class: "seller-value-cards" }, Sb = {
  key: 2,
  class: "seller-daily-section"
}, Mb = { class: "w-full min-w-0" }, Db = { class: "sl-cell font-medium" }, Ab = { class: "sl-cell text-center" }, Tb = { class: "sl-cell text-center" }, Bb = { class: "sl-cell text-center" }, Lb = { class: "sl-cell text-center" }, Fb = { class: "sl-cell text-center" }, Pb = { class: "sl-cell text-center success-value" }, Eb = {
  key: 0,
  class: "currency-cell-list"
}, Ib = {
  key: 1,
  class: "empty-cell"
}, Rb = { class: "sl-cell text-center success-value" }, Ob = { class: "sl-cell text-center" }, Vb = { class: "sl-cell text-center success-value" }, zb = {
  key: 0,
  class: "currency-cell-list"
}, Nb = {
  key: 1,
  class: "empty-cell"
}, Wb = { class: "sl-cell text-center success-value" }, jb = { class: "sl-cell text-center" }, Hb = { class: "sl-cell text-center success-value" }, Yb = {
  key: 0,
  class: "currency-cell-list"
}, Kb = { key: 1 }, Ub = {
  key: 0,
  class: "failed-reasons"
}, qb = { class: "reason-name" }, Xb = { class: "reason-count" }, Gb = {
  key: 1,
  class: "empty-cell"
}, Zb = /* @__PURE__ */ ae({
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
    function a(L) {
      return L;
    }
    const o = e, s = n, i = (L) => {
      s("export", L);
    }, { isDark: l } = _e(ye(o, "theme")), r = $(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const L = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((R) => {
        const P = L.findIndex(
          (j) => j.date === R.date
        );
        P !== -1 ? L[P] = { ...L[P], reasons: R.reasons } : L.push({
          date: R.date,
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
          reasons: R.reasons
        });
      }), L.sort(
        (R, P) => new Date(R.date).getTime() - new Date(P.date).getTime()
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
      () => r.value.map((L) => ({
        id: L.date,
        ...L
      }))
    ), h = $(() => o.sellerData), g = $(() => o.failedData), v = $(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), f = $(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), y = $(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), x = $(() => {
      const L = v.value;
      return L.length > 0 ? L.map(
        (R) => `${R.currency} ${Tt(R.total_value)}`
      ).join(" · ") : F(o.sellerData.total_value_sell_success);
    });
    function p(L) {
      return L.length > 0 ? L.map(
        (R) => `${R.currency} ${Tt(R.total_value)}`
      ).join(" · ") : "—";
    }
    const b = $(
      () => p(f.value)
    ), _ = $(
      () => p(y.value)
    ), w = $(() => {
      const {
        total_seller_conversations: L = 0,
        total_sell_started: R = 0,
        total_sell_booking_created: P = 0,
        total_sell_success: j = 0,
        total_sell_bank_transfer: q = 0,
        total_sell_cash_option: H = 0,
        total_sell_success_bank_transfer: te = 0,
        total_sell_success_cash: ne = 0
      } = h.value, { failed_by_reason_by_day: re = [] } = g.value;
      if (L === 0) return { nodes: [], links: [] };
      const W = Math.max(
        0,
        j - (te ?? 0) - (ne ?? 0)
      ), X = [
        { name: "Sell Initiated", value: L },
        { name: "Sell Started", value: R },
        { name: "Booking Created", value: P },
        { name: "Sell Success", value: W }
      ], Q = [], ce = L - R;
      if (ce > 0) {
        const Y = Math.round(ce / L * 100);
        X.push({ name: "Abandoned (Init)", value: ce }), Q.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: ce,
          label: `${ce.toLocaleString()} (${Y}%)`
        });
      }
      if (R > 0) {
        const Y = Math.round(R / L * 100);
        Q.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: R,
          label: `${R.toLocaleString()} (${Y}%)`
        });
      }
      const ie = re.reduce(
        (Y, z) => (z.reasons && Array.isArray(z.reasons) && z.reasons.forEach((N) => {
          const K = N.reason, he = N.failed_count;
          Y[K] = (Y[K] || 0) + he;
        }), Y),
        {}
      );
      if (P > 0) {
        const Y = Math.round(P / L * 100);
        Q.push({
          source: "Sell Started",
          target: "Booking Created",
          value: P,
          label: `${P.toLocaleString()} (${Y}%)`
        });
      }
      if (q > 0) {
        const Y = Math.round(q / L * 100);
        X.push({ name: "Bank Transfer", value: q }), Q.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: q,
          label: `${q.toLocaleString()} (${Y}%)`
        });
      }
      if (H > 0) {
        const Y = Math.round(H / L * 100);
        X.push({ name: "Cash Option", value: H }), Q.push({
          source: "Booking Created",
          target: "Cash Option",
          value: H,
          label: `${H.toLocaleString()} (${Y}%)`
        });
      }
      if (W > 0) {
        const Y = Math.round(W / L * 100);
        Q.push({
          source: "Booking Created",
          target: "Sell Success",
          value: W,
          label: `${W.toLocaleString()} (${Y}%)`
        });
      }
      if ((te ?? 0) > 0) {
        const Y = Math.round(
          (te ?? 0) / L * 100
        );
        X.push({
          name: "Bank Transfer Success",
          value: te ?? 0
        }), Q.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: te ?? 0,
          label: `${(te ?? 0).toLocaleString()} (${Y}%)`
        });
      }
      if ((ne ?? 0) > 0) {
        const Y = Math.round((ne ?? 0) / L * 100);
        X.push({ name: "Cash Option Success", value: ne ?? 0 }), Q.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: ne ?? 0,
          label: `${(ne ?? 0).toLocaleString()} (${Y}%)`
        });
      }
      const we = P - W - q - H;
      if (we > 0) {
        const Y = Math.round(we / L * 100);
        X.push({ name: "Failed at Completion", value: we }), Q.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: we,
          label: `${we.toLocaleString()} (${Y}%)`
        });
      }
      const be = R - P;
      if (be > 0) {
        const Y = Math.round(be / L * 100);
        X.push({ name: "Failed at Booking", value: be }), Q.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: be,
          label: `${be.toLocaleString()} (${Y}%)`
        });
      }
      if (Object.keys(ie).length > 0) {
        const Y = Object.values(ie).reduce(
          (N, K) => N + K,
          0
        ), z = be - Y;
        if (Object.entries(ie).filter(([, N]) => N > 0).sort(([, N], [, K]) => K - N).forEach(([N, K]) => {
          const he = Math.round(K / L * 100);
          X.push({ name: `Failed: ${N}`, value: K }), Q.push({
            source: "Failed at Booking",
            target: `Failed: ${N}`,
            value: K,
            label: `${K.toLocaleString()} (${he}%)`
          });
        }), z > 0) {
          const N = Math.round(z / L * 100);
          X.push({ name: "Failed: Without Reason", value: z }), Q.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: z,
            label: `${z.toLocaleString()} (${N}%)`
          });
        }
      }
      return { nodes: X, links: Q };
    }), S = {
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
    }, M = $(() => S), C = (L, R) => !R || R === 0 ? "0%" : `${Math.round(L / R * 100)}%`, D = (L, R) => {
      const P = J(L), j = C(L, R);
      return `${P} (${j})`;
    }, I = (L) => L == null ? 0 : typeof L == "number" ? L : Array.isArray(L) ? L.reduce((R, P) => R + (P.total_value || 0), 0) : 0, F = (L) => Tt(I(L));
    return t({ isDark: l }), (L, R) => (m(), Z(me, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (m(), k("div", _b, [...R[0] || (R[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", xb, [
              w.value.nodes.length > 0 ? (m(), k("section", kb, [
                u("div", wb, [
                  E(Nt, {
                    data: w.value,
                    "node-colors": M.value,
                    title: "",
                    height: "320px"
                  }, null, 8, ["data", "node-colors"])
                ])
              ])) : (m(), k("section", Cb, [...R[1] || (R[1] = [
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
              u("section", $b, [
                E(ue, {
                  class: "seller-value-card",
                  color: "var(--kiut-success)",
                  title: "Total Sales Value",
                  value: x.value
                }, null, 8, ["value"]),
                E(ue, {
                  class: "seller-value-card",
                  color: "#d97706",
                  title: "Bank Transfer Value",
                  value: b.value
                }, null, 8, ["value"]),
                E(ue, {
                  class: "seller-value-card",
                  color: "#ca8a04",
                  title: "Cash Option Value",
                  value: _.value
                }, null, 8, ["value"])
              ]),
              r.value && r.value.length > 0 ? (m(), k("section", Sb, [
                u("div", Mb, [
                  E(st, {
                    columns: c,
                    rows: d.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: P }) => [
                      u("span", Db, A(T(Ve)(String(P.date)).format("MMM DD")), 1)
                    ]),
                    "cell-sellInitiated": B(({ row: P }) => [
                      u("span", Ab, A(T(J)(Number(P.seller_conversations) || 0)), 1)
                    ]),
                    "cell-sellStarted": B(({ row: P }) => [
                      u("span", Tb, A(D(
                        P.sell_started_count,
                        P.seller_conversations || P.sell_started_count
                      )), 1)
                    ]),
                    "cell-getQuote": B(({ row: P }) => [
                      u("span", Bb, A(D(
                        P.sell_get_quote_count,
                        P.seller_conversations || P.sell_started_count
                      )), 1)
                    ]),
                    "cell-bookingCreated": B(({ row: P }) => [
                      u("span", Lb, A(D(
                        P.sell_booking_created_count,
                        P.seller_conversations || P.sell_started_count
                      )), 1)
                    ]),
                    "cell-bankTransfer": B(({ row: P }) => [
                      u("span", Fb, A(T(J)(Number(P.sell_bank_transfer_count) || 0)), 1)
                    ]),
                    "cell-btValue": B(({ row: P }) => [
                      u("span", Pb, [
                        Array.isArray(
                          P.daily_value_sell_success_bank_transfer
                        ) && P.daily_value_sell_success_bank_transfer.length > 0 ? (m(), k("div", Eb, [
                          (m(!0), k(ee, null, le(P.daily_value_sell_success_bank_transfer, (j) => (m(), k("span", {
                            key: `${P.date}-bt-success-${j.currency}`
                          }, A(j.currency) + " " + A(T(Tt)(j.total_value)), 1))), 128))
                        ])) : (m(), k("span", Ib, "-"))
                      ])
                    ]),
                    "cell-btSuccess": B(({ row: P }) => [
                      u("span", Rb, A(T(J)(
                        Number(
                          P.sell_success_bank_transfer_count
                        ) || 0
                      )), 1)
                    ]),
                    "cell-cashOption": B(({ row: P }) => [
                      u("span", Ob, A(T(J)(Number(P.sell_cash_option_count) || 0)), 1)
                    ]),
                    "cell-coValue": B(({ row: P }) => [
                      u("span", Vb, [
                        Array.isArray(
                          P.daily_value_sell_success_cash
                        ) && P.daily_value_sell_success_cash.length > 0 ? (m(), k("div", zb, [
                          (m(!0), k(ee, null, le(P.daily_value_sell_success_cash, (j) => (m(), k("span", {
                            key: `${P.date}-co-success-${j.currency}`
                          }, A(j.currency) + " " + A(T(Tt)(j.total_value)), 1))), 128))
                        ])) : (m(), k("span", Nb, "-"))
                      ])
                    ]),
                    "cell-cashSuccess": B(({ row: P }) => [
                      u("span", Wb, A(T(J)(
                        Number(P.sell_success_cash_count) || 0
                      )), 1)
                    ]),
                    "cell-sellSuccess": B(({ row: P }) => [
                      u("span", jb, A(D(
                        P.sell_success_count,
                        P.seller_conversations || P.sell_started_count
                      )), 1)
                    ]),
                    "cell-totalSalesValue": B(({ row: P }) => [
                      u("span", Hb, [
                        Array.isArray(P.daily_value_sell_success) && P.daily_value_sell_success.length > 0 ? (m(), k("div", Yb, [
                          (m(!0), k(ee, null, le(P.daily_value_sell_success, (j) => (m(), k("span", {
                            key: `${P.date}-${j.currency}`
                          }, A(j.currency) + " " + A(T(Tt)(j.total_value)), 1))), 128))
                        ])) : (m(), k("span", Kb, A(F(
                          P.daily_value_sell_success
                        )), 1))
                      ])
                    ]),
                    "cell-failed": B(({ row: P }) => [
                      (P.reasons || []).length > 0 ? (m(), k("div", Ub, [
                        (m(!0), k(ee, null, le(P.reasons || [], (j) => (m(), k("div", {
                          key: j.reason,
                          class: "failed-reason-item"
                        }, [
                          u("span", qb, A(j.reason) + ":", 1),
                          u("span", Xb, A(j.failed_count), 1)
                        ]))), 128))
                      ])) : (m(), k("div", Gb, "-"))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : V("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), Zi = /* @__PURE__ */ de(Zb, [["__scopeId", "data-v-24bbf22b"]]), Qb = { class: "seller-container__body" }, Jb = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = $(() => n.loading || n.sellerLoading), s = $(() => n.loading || n.salesByChannelLoading), i = $(() => n.exportLoading || n.sellerExportLoading), l = $(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (m(), Z(me, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", Qb, [
          E(Zi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          E(Gi, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: s.value,
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
}), ev = /* @__PURE__ */ de(Jb, [["__scopeId", "data-v-a9f0dfd2"]]), tv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, nv = {
  key: "content",
  class: "card-body"
}, av = {
  key: 0,
  class: "chart-section"
}, ov = {
  key: 1,
  class: "empty-state"
}, sv = { class: "empty-state-content" }, iv = { class: "empty-icon-wrapper" }, lv = /* @__PURE__ */ ae({
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
    }, { isDark: l, colors: r } = _e(ye(o, "theme")), c = $(() => {
      const g = (o.data?.top_agents || []).filter(
        (x) => x.agent_type?.toLowerCase() !== "triage"
      );
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const v = g.reduce(
        (x, p) => x + (Number(p.conversations) || 0),
        0
      ), f = g.map((x) => {
        const p = x.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), y = f.map((x) => `${x}80`);
      return {
        labels: g.map((x) => {
          const p = Number(x.conversations) || 0, b = v ? p / v * 100 : 0;
          return `${x.agent_type} - ${p.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: g.map((x) => x.conversations),
            backgroundColor: y,
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
              const g = (h.label || "").toString().split(" - ")[0], v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (x, p) => x + (Number(p) || 0),
                0
              ), y = f ? v / f * 100 : 0;
              return `${g}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, g) => (m(), Z(me, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", tv, [...g[0] || (g[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", nv, [
              c.value.labels && c.value.labels.length ? (m(), k("section", av, [
                E(ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])) : (m(), k("section", ov, [
                u("div", sv, [
                  u("div", iv, [
                    E(T(_p), { class: "empty-icon" })
                  ]),
                  g[1] || (g[1] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                  g[2] || (g[2] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
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
}), rv = /* @__PURE__ */ de(lv, [["__scopeId", "data-v-a52fe7ae"]]), cv = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, dv = {
  key: "content",
  class: "card-body"
}, uv = {
  key: 0,
  class: "payment-methods-section"
}, hv = { class: "payment-methods-grid" }, fv = {
  key: 1,
  class: "empty-state"
}, gv = { class: "empty-state-content" }, pv = { class: "empty-icon-wrapper" }, mv = {
  key: 2,
  class: "payment-method-daily-section"
}, bv = { class: "w-full min-w-0" }, vv = { class: "font-medium" }, yv = { class: "text-center" }, _v = { class: "text-center success-value" }, xv = {
  key: 0,
  class: "currency-cell-list"
}, kv = { class: "payment-tags" }, wv = { class: "tag-name" }, Cv = {
  key: 0,
  class: "tag-amount"
}, $v = {
  key: 1,
  class: "tag-amount"
}, Sv = { class: "tag-count" }, Mv = {
  key: 3,
  class: "empty-table-state"
}, Dv = "Not Registered", Av = /* @__PURE__ */ ae({
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
    const a = e, o = n, { isDark: s } = _e(ye(a, "theme")), i = oe(!1), l = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = $(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = $(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = $(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((C, D) => Ve(C.date).valueOf() - Ve(D.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], g = $(
      () => d.value.map((C) => ({
        id: C.date,
        date: C.date,
        total_count: C.total_count,
        total_amount: C.total_amount,
        total_amount_by_currency: C.total_amount_by_currency,
        payment_methods: C.payment_methods
      }))
    ), v = (C) => {
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
      const D = (C.payment_method_breakdown || []).map(
        (F) => ({
          payment_method: F.payment_method || "Unknown",
          total_amount: F.total_amount ?? 0,
          count: F.count ?? 0,
          total_amount_by_currency: F.total_amount_by_currency ?? []
        })
      ), I = (C.payment_method_by_day || []).map((F) => ({
        date: F.date || "",
        total_count: F.total_count ?? 0,
        total_amount: F.total_amount ?? 0,
        total_amount_by_currency: F.total_amount_by_currency ?? [],
        payment_methods: (F.payment_methods || []).map((L) => ({
          payment_method: L.payment_method || "Unknown",
          total_amount: L.total_amount ?? 0,
          count: L.count ?? 0,
          total_amount_by_currency: L.total_amount_by_currency ?? []
        }))
      }));
      return {
        airline_name: C.airline_name || a.airlineName,
        start_date: C.start_date || "",
        end_date: C.end_date || "",
        total_conversations: C.total_conversations ?? 0,
        total_amount: C.total_amount ?? 0,
        total_sell_usd: C.total_sell_usd,
        total_amount_by_currency: C.total_amount_by_currency ?? [],
        payment_method_breakdown: D,
        payment_method_by_day: I
      };
    }, f = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [C, D] = a.dates.map(
            (F) => Ve(F).format("YYYY-MM-DD")
          ), I = await a.fetchFunction(
            a.airlineName,
            C,
            D
          );
          l.value = v(I);
        } catch (C) {
          console.error("Error fetching payment method metrics:", C), l.value = v(null);
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
    ], x = (C) => !C || C.toLowerCase() === "unknown" ? Dv : C.replace(/_/g, " "), p = (C) => C == null ? "$0.00" : Me(C), b = (C) => {
      const D = C.total_amount_by_currency;
      return D && D.length > 0 ? D.map((I) => `${I.currency} ${p(I.total_value)}`).join(" · ") : p(C.total_amount);
    }, _ = (C) => C ? Ve(C).format("MMM DD") : "-", w = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), S = (C) => {
      o("export", C);
    };
    function M() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (i.value = !1, l.value = v(C));
    }
    return tt(() => {
      a.data ? M() : f();
    }), Fe(
      () => a.data,
      (C) => {
        C && M();
      },
      { deep: !0 }
    ), Fe(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: s }), (C, D) => (m(), Z(me, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value
    }, {
      headerExport: B(() => [
        e.enableExport && !i.value ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: S,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            i.value ? (m(), k("div", cv, [...D[0] || (D[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", dv, [
              r.value ? (m(), k("section", uv, [
                D[1] || (D[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
                u("div", hv, [
                  (m(!0), k(ee, null, le(l.value.payment_method_breakdown, (I, F) => (m(), Z(ue, {
                    key: I.payment_method,
                    class: "payment-method-card-item min-w-0",
                    color: y[F % y.length],
                    title: x(I.payment_method),
                    value: b(I),
                    subvalue: `${w(I.count)} ${w(I.count) === 1 ? "sale" : "sales"}`
                  }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                ])
              ])) : (m(), k("section", fv, [
                u("div", gv, [
                  u("div", pv, [
                    E(T(kp), { class: "empty-icon" })
                  ]),
                  D[2] || (D[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
                  D[3] || (D[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
                ])
              ])),
              c.value ? (m(), k("section", mv, [
                D[5] || (D[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
                u("div", bv, [
                  E(st, {
                    columns: h,
                    rows: g.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": B(({ row: I }) => [
                      u("span", vv, A(_(String(I.date))), 1)
                    ]),
                    "cell-totalSales": B(({ row: I }) => [
                      u("span", yv, A(T(J)(I.total_count ?? 0)), 1)
                    ]),
                    "cell-totalAmount": B(({ row: I }) => [
                      u("span", _v, [
                        Array.isArray(I.total_amount_by_currency) && I.total_amount_by_currency.length > 0 ? (m(), k("div", xv, [
                          (m(!0), k(ee, null, le(I.total_amount_by_currency, (F) => (m(), k("span", {
                            key: `${I.date}-${F.currency}`
                          }, A(F.currency) + " " + A(p(F.total_value)), 1))), 128))
                        ])) : (m(), k(ee, { key: 1 }, [
                          $e(A(p(Number(I.total_amount ?? 0))), 1)
                        ], 64))
                      ])
                    ]),
                    "cell-paymentMethods": B(({ row: I }) => [
                      u("div", kv, [
                        (m(!0), k(ee, null, le(Array.isArray(I.payment_methods) ? I.payment_methods : [], (F) => (m(), k("div", {
                          key: F.payment_method,
                          class: "payment-tag"
                        }, [
                          u("span", wv, A(x(F.payment_method)), 1),
                          D[4] || (D[4] = u("span", { class: "tag-separator" }, "•", -1)),
                          !F.total_amount_by_currency || F.total_amount_by_currency.length === 0 ? (m(), k("span", Cv, A(p(F.total_amount)), 1)) : (m(), k("span", $v, A(F.total_amount_by_currency.map(
                            (L) => `${L.currency} ${p(L.total_value)}`
                          ).join(" / ")), 1)),
                          u("span", Sv, "(" + A(w(F.count)) + ")", 1)
                        ]))), 128))
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : r.value ? (m(), k("div", Mv, [...D[6] || (D[6] = [
                u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
              ])])) : V("", !0)
            ]))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Tv = /* @__PURE__ */ de(Av, [["__scopeId", "data-v-0d6d2847"]]), Bv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Lv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Fv = {
  key: "title-content",
  class: "header-title-group"
}, Pv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Ev = {
  key: 0,
  class: "metric-label metric-label--header"
}, Iv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Rv = { key: "aside-content" }, Ov = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Vv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, zv = {
  key: "body-content",
  class: "highlight-inner"
}, Nv = { class: "card-body" }, Wv = { class: "metric-row" }, jv = {
  key: 0,
  class: "metric-prefix"
}, Hv = {
  key: 0,
  class: "metric-label"
}, Yv = /* @__PURE__ */ ae({
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
    const n = e, { isDark: a } = _e(ye(n, "theme")), o = $(() => n.labelPosition === "header"), s = $(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = $(() => {
      if (!s.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = $(() => {
      const c = i.value.toFixed(1);
      return i.value > 0 ? `+${c}%` : `${c}%`;
    }), r = $(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (m(), Z(me, {
      collapsible: !1,
      class: G([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": T(a),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: B(() => [
        E(ke, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Bv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (m(), k("div", Lv)) : V("", !0)
            ])) : (m(), k("div", Fv, [
              u("div", Pv, [
                Se(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (m(), k("span", Ev, A(e.label), 1)) : V("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: B(() => [
        E(ke, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Iv)) : (m(), k("div", Rv, [
              Se(c.$slots, "headerAside", {}, () => [
                s.value ? (m(), k("div", {
                  key: 0,
                  class: G(["change-badge", r.value])
                }, A(l.value), 3)) : V("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: B(() => [
        E(ke, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Ov, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? V("", !0) : (m(), k("div", Vv))
            ])) : (m(), k("div", zv, [
              u("div", Nv, [
                Se(c.$slots, "value", {}, () => [
                  u("div", Wv, [
                    e.prefix ? (m(), k("span", jv, A(e.prefix), 1)) : V("", !0),
                    u("span", {
                      class: G(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? V("", !0) : (m(), k("span", Hv, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), bt = /* @__PURE__ */ de(Yv, [["__scopeId", "data-v-291e9a9e"]]), Kv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Uv = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, qv = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, Xv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, Gv = ["checked", "aria-label"], Zv = ["aria-sort", "onClick"], Qv = {
  class: "kiut-table-sort-icon",
  "aria-hidden": "true"
}, Jv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, ey = ["checked", "aria-label", "onChange"], ty = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = oe(null);
    function s(S) {
      return `cell-${S}`;
    }
    function i(S) {
      return S === "center" ? "text-center" : S === "right" ? "text-right" : "text-left";
    }
    function l(S, M) {
      if (typeof n.rowKey == "function")
        return n.rowKey(S);
      const C = S[n.rowKey];
      return C != null ? String(C) : `__index_${M}`;
    }
    function r(S, M) {
      return S[M];
    }
    function c(S) {
      return S == null || typeof S == "object" ? "" : String(S);
    }
    function d(S, M) {
      return l(S, M);
    }
    const h = $(
      () => n.rows.map((S, M) => l(S, M))
    );
    function g(S, M) {
      const C = l(S, M);
      return n.selectedKeys.includes(C);
    }
    const v = $(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((S) => n.selectedKeys.includes(S))), f = $(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const S = h.value.filter((M) => n.selectedKeys.includes(M));
      return S.length > 0 && S.length < n.rows.length;
    });
    Fe(
      [f, v, () => n.selectable],
      async () => {
        await ze();
        const S = o.value;
        S && (S.indeterminate = f.value && !v.value);
      },
      { immediate: !0 }
    );
    function y() {
      if (n.selectable)
        if (v.value) {
          const S = n.selectedKeys.filter((M) => !h.value.includes(M));
          a("update:selectedKeys", S);
        } else {
          const S = new Set(n.selectedKeys);
          h.value.forEach((M) => S.add(M)), a("update:selectedKeys", [...S]);
        }
    }
    function x(S, M) {
      if (!n.selectable) return;
      const C = l(S, M);
      n.selectedKeys.includes(C) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((I) => I !== C)
      ) : a("update:selectedKeys", [...n.selectedKeys, C]);
    }
    function p(S, M) {
      const C = l(S, M);
      return `${n.ariaLabelSelectRow} ${C}`;
    }
    function b(S) {
      a("sort", S);
    }
    function _(S) {
      return n.sortKey !== S ? "↕" : n.sortDirection === "asc" ? "↑" : n.sortDirection === "desc" ? "↓" : "↕";
    }
    function w(S) {
      return n.sortKey !== S || !n.sortDirection ? "none" : n.sortDirection === "asc" ? "ascending" : "descending";
    }
    return (S, M) => (m(), k("div", Kv, [
      u("div", Uv, [
        u("table", {
          class: G([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", qv, [
              e.selectable ? (m(), k("th", Xv, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: v.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: y
                }, null, 40, Gv)
              ])) : V("", !0),
              (m(!0), k(ee, null, le(e.columns, (C) => (m(), k("th", {
                key: C.key,
                scope: "col",
                class: G([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(C.align),
                  C.headerClass ?? ""
                ])
              }, [
                C.sortable ? (m(), k("button", {
                  key: 0,
                  type: "button",
                  class: G(["kiut-table-sort-btn inline-flex items-center gap-1", i(C.align)]),
                  "aria-sort": w(C.key),
                  onClick: (D) => b(C.key)
                }, [
                  u("span", null, A(C.label), 1),
                  u("span", Qv, A(_(C.key)), 1)
                ], 10, Zv)) : (m(), k(ee, { key: 1 }, [
                  $e(A(C.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(ee, null, le(e.rows, (C, D) => (m(), k("tr", {
              key: d(C, D),
              class: "h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (m(), k("td", Jv, [
                u("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: g(C, D),
                  "aria-label": p(C, D),
                  onChange: (I) => x(C, D)
                }, null, 40, ey)
              ])) : V("", !0),
              (m(!0), k(ee, null, le(e.columns, (I) => (m(), k("td", {
                key: I.key,
                class: G([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(I.align),
                  I.cellClass ?? ""
                ])
              }, [
                Se(S.$slots, s(I.key), {
                  row: C,
                  column: I,
                  value: r(C, I.key)
                }, () => [
                  $e(A(c(r(C, I.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Qi = /* @__PURE__ */ de(ty, [["__scopeId", "data-v-2de39916"]]), ny = {
  class: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-4",
  "aria-hidden": "true"
}, ay = {
  class: "table-skeleton mt-6 w-full min-w-0",
  "aria-hidden": "true"
}, oy = { class: "table-skeleton__table" }, sy = {
  key: "content",
  class: "card-body"
}, iy = { class: "kpi-closed-value" }, ly = { class: "kpi-closed-value__main" }, ry = {
  key: 0,
  class: "kpi-closed-value__pct"
}, cy = { class: "flex justify-end" }, dy = { class: "table-section w-full min-w-0" }, uy = { class: "ah-cell name-cell" }, hy = { class: "ah-cell name-cell" }, fy = { class: "ah-cell email-cell" }, gy = { class: "ah-cell" }, py = { class: "ah-cell" }, my = { class: "ah-cell" }, by = {
  key: 2,
  class: "empty-state"
}, Jn = 6, vy = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (z) => {
      o("export", z);
    }, { isDark: i } = _e(ye(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(z) {
      const N = z?.trim() ?? "";
      return N.length > 0 && !l.has(N);
    }
    function c(z) {
      if (!r(z.agent_email)) return !1;
      const N = z.assigned_count ?? 0, K = z.closed_count ?? 0;
      return N > 0 || K > 0;
    }
    function d(z) {
      return (z.assigned_count ?? 0) + (z.closed_count ?? 0);
    }
    function h(z) {
      const N = z?.trim();
      return N || "—";
    }
    const g = $(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), v = $(() => g.value.length > 0), f = $(() => {
      const z = (a.data?.total_enqueued ?? 0) > 0;
      return v.value || z;
    }), y = oe("by_date"), x = oe("date"), p = oe("desc"), b = oe(!1), _ = Jn;
    Fe(y, (z) => {
      b.value = !1, z === "aggregated" ? (x.value = "name", p.value = "asc") : (x.value = "date", p.value = "desc");
    });
    function w(z, N) {
      return N == null ? null : N === 0 ? z > 0 ? 100 : 0 : (z - N) / N * 100;
    }
    function S(z) {
      const N = z.toFixed(1);
      return z > 0 ? `+${N}%` : `${N}%`;
    }
    function M(z, N = !1) {
      const K = N ? -z : z;
      return K > 0 ? "change-badge--up" : K < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function C(z, N) {
      if (z === null) return null;
      const K = w(z, N);
      return K === null ? null : {
        label: S(K),
        class: M(K, !0)
      };
    }
    const D = $(() => a.data?.total_enqueued ?? 0), I = $(() => a.data?.total_closed ?? 0), F = $(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), L = $(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), R = $(() => D.value <= 0 ? null : `(${(I.value / D.value * 100).toFixed(1)}%)`), P = $(
      () => C(
        F.value,
        a.previousAvgTimeToAssignSeconds
      )
    ), j = $(
      () => C(
        L.value,
        a.previousAvgConversationDurationSeconds
      )
    );
    function q(z, N) {
      return {
        id: `${z.date}-${z.agent_email}-${N}`,
        date: z.date,
        dateSort: new Date(z.date).getTime(),
        agent_name: z.agent_name ?? "",
        agent_email: z.agent_email,
        handled: d(z),
        avg_assignation_seconds: z.avg_time_to_assign_seconds ?? null,
        avg_resolution_seconds: z.avg_conversation_duration_seconds ?? null
      };
    }
    function H(z) {
      const N = /* @__PURE__ */ new Map();
      for (const K of z) {
        if (!c(K)) continue;
        const he = K.agent_email.trim();
        N.has(he) || N.set(he, {
          agent_name: K.agent_name?.trim() ?? "",
          agent_email: he,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const fe = N.get(he), ge = K.assigned_count ?? 0, Be = K.closed_count ?? 0;
        fe.handled += d(K), K.agent_name?.trim() && (fe.agent_name = K.agent_name.trim()), K.avg_time_to_assign_seconds != null && ge > 0 && (fe.assignSum += K.avg_time_to_assign_seconds * ge, fe.assignWeight += ge), K.avg_conversation_duration_seconds != null && Be > 0 && (fe.resolutionSum += K.avg_conversation_duration_seconds * Be, fe.resolutionWeight += Be);
      }
      return Array.from(N.values()).map((K, he) => ({
        id: `agg-${K.agent_email}-${he}`,
        agent_name: K.agent_name,
        agent_email: K.agent_email,
        handled: K.handled,
        avg_assignation_seconds: K.assignWeight > 0 ? K.assignSum / K.assignWeight : null,
        avg_resolution_seconds: K.resolutionWeight > 0 ? K.resolutionSum / K.resolutionWeight : null
      }));
    }
    const te = $(() => {
      const z = g.value;
      return y.value === "aggregated" ? H(z) : z.map(q);
    });
    function ne(z, N, K, he) {
      const fe = he === "asc" ? 1 : -1;
      let ge = 0;
      switch (K) {
        case "date":
          ge = (z.dateSort ?? 0) - (N.dateSort ?? 0);
          break;
        case "name":
          ge = (z.agent_name || "").localeCompare(N.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          ge = z.agent_email.localeCompare(N.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          ge = z.handled - N.handled;
          break;
        case "avgAssignation":
          ge = (z.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          ge = (z.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (ge !== 0) return ge * fe;
      if (y.value === "by_date" && K !== "date") {
        const Be = (N.dateSort ?? 0) - (z.dateSort ?? 0);
        if (Be !== 0) return Be;
      }
      return (z.agent_name || "").localeCompare(N.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const re = $(() => {
      const z = [...te.value];
      return z.sort((N, K) => ne(N, K, x.value, p.value)), z;
    }), W = $(() => {
      const z = [];
      return y.value === "by_date" && z.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), z.push(
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
      ), z;
    }), X = $(
      () => Math.max(0, re.value.length - Jn)
    ), Q = $(
      () => re.value.length > Jn
    ), ce = $(() => b.value || !Q.value ? re.value : re.value.slice(0, Jn));
    function ie(z) {
      const N = z;
      if (b.value = !1, x.value === N) {
        p.value = p.value === "asc" ? "desc" : "asc";
        return;
      }
      x.value = N, N === "date" ? p.value = "desc" : N === "name" || N === "email" ? p.value = "asc" : p.value = "desc";
    }
    const we = (z) => z == null ? "0" : J(z), be = (z) => {
      if (z == null)
        return "—";
      if (z < 60)
        return `${Math.round(z)}s`;
      const N = Math.round(z), K = Math.floor(N / 60), he = N % 60;
      if (K < 60)
        return `${K}m ${he}s`;
      const fe = Math.floor(K / 60), ge = K % 60;
      return `${fe}h ${ge}m`;
    }, Y = (z) => new Date(z).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (z, N) => (m(), Z(me, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", {
              key: "loading",
              class: G(["card-body loading-body", { "agent-human-conv--dark": T(i) }]),
              "aria-busy": "true",
              "aria-label": "Loading agent human conversations"
            }, [
              u("div", ny, [
                (m(), k(ee, null, le(4, (K) => E(bt, {
                  key: `kpi-skeleton-${K}`,
                  label: "Loading",
                  value: "",
                  "label-position": "header",
                  loading: !0,
                  theme: e.theme
                }, null, 8, ["theme"])), 64))
              ]),
              u("section", ay, [
                N[3] || (N[3] = u("div", { class: "table-skeleton__header" }, [
                  u("div", { class: "table-skeleton__titles" }, [
                    u("div", { class: "bm-skeleton-blink skeleton-section-title" }),
                    u("div", { class: "bm-skeleton-blink skeleton-section-subtitle" })
                  ]),
                  u("div", { class: "bm-skeleton-blink skeleton-table-select" })
                ], -1)),
                u("div", oy, [
                  N[2] || (N[2] = u("div", { class: "bm-skeleton-blink skeleton-table-head" }, null, -1)),
                  (m(!0), k(ee, null, le(T(_), (K) => (m(), k("div", {
                    key: `table-row-skeleton-${K}`,
                    class: "bm-skeleton-blink skeleton-table-row"
                  }))), 128))
                ]),
                N[4] || (N[4] = u("div", { class: "bm-skeleton-blink skeleton-view-more" }, null, -1))
              ])
            ], 2)) : (m(), k("div", sy, [
              f.value ? (m(), k("div", {
                key: 0,
                class: G(["grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-4", { "agent-human-conv--dark": T(i) }])
              }, [
                E(bt, {
                  label: "Conversations Opened",
                  "label-position": "header",
                  value: we(D.value),
                  theme: e.theme,
                  "current-value": D.value,
                  "previous-value": e.previousTotalEnqueued
                }, {
                  icon: B(() => [...N[5] || (N[5] = [
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
                E(bt, {
                  label: "Conversations Closed",
                  "label-position": "header",
                  value: we(I.value),
                  theme: e.theme,
                  "current-value": I.value,
                  "previous-value": e.previousTotalClosed
                }, {
                  icon: B(() => [...N[6] || (N[6] = [
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
                    u("div", iy, [
                      u("span", ly, A(we(I.value)), 1),
                      R.value ? (m(), k("span", ry, A(R.value), 1)) : V("", !0)
                    ])
                  ]),
                  _: 1
                }, 8, ["value", "theme", "current-value", "previous-value"]),
                E(bt, {
                  label: "Avg Time to Assign",
                  "label-position": "header",
                  value: be(F.value),
                  theme: e.theme,
                  "current-value": F.value ?? 0,
                  "previous-value": e.previousAvgTimeToAssignSeconds
                }, po({
                  icon: B(() => [
                    N[7] || (N[7] = u("svg", {
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
                  P.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: G(["duration-trend-badge", P.value.class])
                      }, A(P.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"]),
                E(bt, {
                  label: "Avg Resolution Time",
                  "label-position": "header",
                  value: be(L.value),
                  theme: e.theme,
                  "current-value": L.value ?? 0,
                  "previous-value": e.previousAvgConversationDurationSeconds
                }, po({
                  icon: B(() => [
                    N[8] || (N[8] = u("svg", {
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
                  j.value ? {
                    name: "headerAside",
                    fn: B(() => [
                      u("div", {
                        class: G(["duration-trend-badge", j.value.class])
                      }, A(j.value.label), 3)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["value", "theme", "current-value", "previous-value"])
              ], 2)) : V("", !0),
              v.value ? (m(), Z(me, {
                key: 1,
                class: "agent-table-section mt-6",
                title: "Conversations Managed by Agent",
                subtitle: "Daily performance per human agent",
                collapsible: !1
              }, {
                headerAside: B(() => [
                  u("div", cy, [
                    Xe(u("select", {
                      "onUpdate:modelValue": N[0] || (N[0] = (K) => y.value = K),
                      class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]"
                    }, [...N[9] || (N[9] = [
                      u("option", { value: "by_date" }, "By date", -1),
                      u("option", { value: "aggregated" }, "Aggregated", -1)
                    ])], 512), [
                      [Ys, y.value]
                    ])
                  ])
                ]),
                default: B(() => [
                  u("div", dy, [
                    E(Qi, {
                      columns: W.value,
                      rows: ce.value,
                      "sort-key": x.value,
                      "sort-direction": p.value,
                      "row-key": "id",
                      onSort: ie
                    }, {
                      "cell-date": B(({ row: K }) => [
                        u("span", uy, A(Y(String(K.date))), 1)
                      ]),
                      "cell-name": B(({ row: K }) => [
                        u("span", hy, A(h(K.agent_name)), 1)
                      ]),
                      "cell-email": B(({ row: K }) => [
                        u("span", fy, A(K.agent_email), 1)
                      ]),
                      "cell-handled": B(({ row: K }) => [
                        u("span", gy, A(we(Number(K.handled))), 1)
                      ]),
                      "cell-avgAssignation": B(({ row: K }) => [
                        u("span", py, A(be(
                          K.avg_assignation_seconds
                        )), 1)
                      ]),
                      "cell-avgResolution": B(({ row: K }) => [
                        u("span", my, A(be(
                          K.avg_resolution_seconds
                        )), 1)
                      ]),
                      _: 1
                    }, 8, ["columns", "rows", "sort-key", "sort-direction"]),
                    Q.value ? (m(), k("button", {
                      key: 0,
                      type: "button",
                      class: "view-more-btn",
                      onClick: N[1] || (N[1] = (K) => b.value = !b.value)
                    }, [
                      $e(A(b.value ? "View less" : `View more (${X.value} rows)`) + " ", 1),
                      (m(), k("svg", {
                        class: G([
                          "view-more-icon",
                          { "view-more-icon-rotated": b.value }
                        ]),
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        "aria-hidden": "true"
                      }, [...N[10] || (N[10] = [
                        u("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        }, null, -1)
                      ])], 2))
                    ])) : V("", !0)
                  ])
                ]),
                _: 1
              })) : f.value ? V("", !0) : (m(), k("div", by, [...N[11] || (N[11] = [
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
}), yy = /* @__PURE__ */ de(vy, [["__scopeId", "data-v-b5e9a668"]]), _y = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, xy = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, ky = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, wy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Cy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, $y = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Sy = { class: "max-w-[360px] px-4 text-center" }, My = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Vs = 5, Dy = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, i = ye(a, "theme"), { isDark: l } = _e(i), r = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = $(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = $(() => {
      const y = d.value.total_by_channel || {}, x = Object.values(y).reduce(
        (p, b) => p + b,
        0
      );
      return x === 0 ? [] : Object.entries(y).sort(([, p], [, b]) => b - p).map(([p, b]) => ({
        name: p,
        label: p.toUpperCase(),
        total: b,
        percentage: (b / x * 100).toFixed(1),
        color: r[p.toLowerCase()] || "#9ca3af"
      }));
    }), g = $(
      () => h.value.slice(0, Vs)
    ), v = $(() => {
      const y = Math.min(g.value.length, Vs);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), f = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = y.channels_by_day, p = Object.keys(x).sort();
      if (p.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const b = /* @__PURE__ */ new Set();
      for (const S of Object.values(x))
        for (const M of Object.keys(S))
          b.add(M);
      const w = Array.from(b).map((S) => {
        const M = S.toLowerCase(), C = r[M] || "#9ca3af";
        return {
          label: S.toUpperCase(),
          data: p.map((D) => x[D]?.[S] || 0),
          borderColor: C
        };
      });
      c.value = {
        labels: p.map((S) => Ve(S).format("MMM DD")),
        datasets: w
      };
    };
    return Fe(
      () => a.data,
      (y) => {
        f(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, x) => (m(), Z(me, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", {
          class: G(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(ke, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (m(), k("div", _y, [...x[0] || (x[0] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", xy, [
                c.value.labels && c.value.labels.length ? (m(), k("section", ky, [
                  u("div", wy, [
                    E(ft, {
                      data: c.value,
                      theme: i.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  g.value.length ? (m(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: xe(v.value)
                  }, [
                    (m(!0), k(ee, null, le(g.value, (p) => (m(), Z(ue, {
                      key: p.name,
                      class: "min-w-0",
                      color: p.color,
                      title: p.label,
                      value: `${p.percentage}%`,
                      subvalue: `${T(J)(p.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : V("", !0)
                ])) : h.value.length ? (m(), k("section", Cy, [
                  u("div", {
                    class: "grid w-full gap-3 md:gap-4",
                    style: xe(v.value)
                  }, [
                    (m(!0), k(ee, null, le(g.value, (p) => (m(), Z(ue, {
                      key: p.name,
                      class: "min-w-0",
                      color: p.color,
                      title: p.label,
                      value: `${p.percentage}%`,
                      subvalue: `${T(J)(p.total)} msgs`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)
                ])) : V("", !0),
                h.value.length ? V("", !0) : (m(), k("section", $y, [
                  u("div", Sy, [
                    u("div", My, [
                      E(T(Ge), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                    ]),
                    x[1] || (x[1] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                    x[2] || (x[2] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
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
}), Ay = /* @__PURE__ */ de(Dy, [["__scopeId", "data-v-de07e6c8"]]), Ty = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, By = {
  key: "content",
  class: "card-body"
}, Ly = { class: "chart-container" }, Fy = { class: "triage-table-block w-full min-w-0" }, Py = { class: "triage-row-label" }, Ey = {
  key: 1,
  class: "triage-count"
}, Iy = {
  key: 1,
  class: "triage-count"
}, Ry = {
  key: 1,
  class: "triage-count"
}, Oy = {
  key: 1,
  class: "triage-count"
}, Vy = {
  key: 1,
  class: "triage-count"
}, zy = {
  key: 1,
  class: "empty-state"
}, Ny = { class: "empty-state-content" }, Wy = { class: "empty-icon-wrapper" }, jy = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (_) => {
      o("export", _);
    }, { isDark: i, colors: l } = _e(
      ye(a, "theme")
    ), r = $(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [S, M] of Object.entries(_)) {
        const C = S.split("+").filter(Boolean);
        if (!C.includes("triage")) continue;
        const D = C.filter((I) => I !== "triage").length;
        D >= 4 ? w["4p"] += Number(M) || 0 : w[D] += Number(M) || 0;
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
    }), g = [
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
    }, y = (_) => _?.replace("80", "") || "#888888", x = $(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: y(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: y(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: y(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: y(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: y(f.c4p),
          borderWidth: 1
        }
      ]
    })), p = $(() => ({
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
    })), b = (_) => `${(Number(_) || 0).toFixed(0)}`;
    return t({ isDark: i }), (_, w) => (m(), Z(me, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Ty, [...w[0] || (w[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", By, [
              d.value ? (m(), k(ee, { key: 0 }, [
                u("div", Ly, [
                  E(yt, {
                    data: x.value,
                    options: p.value
                  }, null, 8, ["data", "options"])
                ]),
                E(ue, {
                  class: "w-full min-w-0",
                  title: "Total",
                  value: T(J)(c.value),
                  subvalue: "Conversations with triage"
                }, null, 8, ["value"]),
                u("div", Fy, [
                  E(st, {
                    columns: g,
                    rows: v.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-metric": B(({ row: S }) => [
                      u("span", Py, A(S.metric), 1)
                    ]),
                    "cell-b0": B(({ row: S }) => [
                      S.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: xe({ color: y(f.c0) })
                      }, A(b(Number(S.b0))) + "%", 5)) : (m(), k("span", Ey, A(T(J)(Number(S.b0))), 1))
                    ]),
                    "cell-b1": B(({ row: S }) => [
                      S.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: xe({ color: y(f.c1) })
                      }, A(b(Number(S.b1))) + "%", 5)) : (m(), k("span", Iy, A(T(J)(Number(S.b1))), 1))
                    ]),
                    "cell-b2": B(({ row: S }) => [
                      S.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: xe({ color: y(f.c2) })
                      }, A(b(Number(S.b2))) + "%", 5)) : (m(), k("span", Ry, A(T(J)(Number(S.b2))), 1))
                    ]),
                    "cell-b3": B(({ row: S }) => [
                      S.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: xe({ color: y(f.c3) })
                      }, A(b(Number(S.b3))) + "%", 5)) : (m(), k("span", Oy, A(T(J)(Number(S.b3))), 1))
                    ]),
                    "cell-b4p": B(({ row: S }) => [
                      S.id === "pct" ? (m(), k("span", {
                        key: 0,
                        class: "triage-pct",
                        style: xe({ color: y(f.c4p) })
                      }, A(b(Number(S.b4p))) + "%", 5)) : (m(), k("span", Vy, A(T(J)(Number(S.b4p))), 1))
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ], 64)) : (m(), k("div", zy, [
                u("div", Ny, [
                  u("div", Wy, [
                    E(T(Ge), { class: "empty-icon" })
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
}), Hy = /* @__PURE__ */ de(jy, [["__scopeId", "data-v-4610c1a9"]]), Yy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ky = {
  key: "content",
  class: "card-body"
}, Uy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, qy = { class: "pie-section" }, Xy = {
  key: 1,
  class: "empty-state"
}, Gy = /* @__PURE__ */ ae({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = [
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
      () => (n.data?.items || []).reduce((v, f) => v + f.count, 0)
    ), d = $(() => {
      const v = {};
      for (const f of n.data?.items || [])
        v[f.language] = (v[f.language] || 0) + f.count;
      return Object.entries(v).map(([f, y]) => ({ language: f, count: y })).sort((f, y) => y.count - f.count);
    }), h = $(() => ({
      labels: d.value.map((v) => l(v.language)),
      datasets: [
        {
          data: d.value.map((v) => v.count),
          backgroundColor: d.value.map(
            (v, f) => s[f % s.length] + "80"
          ),
          borderColor: d.value.map(
            (v, f) => s[f % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), g = $(() => ({
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
          titleFont: {
            family: "'Space Grotesk', sans-serif",
            size: 13,
            weight: 600
          },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (v) => {
              const f = v.raw || 0, y = c.value > 0 ? (f / c.value * 100).toFixed(1) : "0";
              return ` ${v.label}: ${f} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (v, f) => (m(), Z(me, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            n.loading ? (m(), k("div", Yy, [...f[0] || (f[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Ky, [
              r.value ? (m(), k("div", Uy, [
                u("section", qy, [
                  E(ma, {
                    data: h.value,
                    options: g.value
                  }, null, 8, ["data", "options"])
                ]),
                E(ue, {
                  class: "shrink-0",
                  title: "Total",
                  value: T(J)(c.value),
                  color: "#8b5cf6"
                }, null, 8, ["value"])
              ])) : (m(), k("section", Xy, [...f[1] || (f[1] = [
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
}), Zy = /* @__PURE__ */ de(Gy, [["__scopeId", "data-v-8743ba33"]]), Qy = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Jy = {
  key: "content",
  class: "card-body"
}, e1 = {
  key: 0,
  class: "guardrails-daily-section"
}, t1 = { class: "w-full min-w-0" }, n1 = { class: "font-medium" }, a1 = { class: "font-semibold" }, o1 = { class: "type-badges-row" }, s1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, i1 = {
  key: 1,
  class: "empty-state"
}, l1 = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i } = _e(ye(a, "theme")), l = $(
      () => a.data?.items && a.data.items.length > 0
    ), r = $(
      () => (a.data?.items || []).reduce((x, p) => x + p.count, 0)
    ), c = (x) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[x]] = (p[w[x]] || 0) + w.count;
      const b = Object.entries(p).sort((w, S) => S[1] - w[1]);
      if (b.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: b[0][0],
        pct: _ > 0 ? Math.round(b[0][1] / _ * 100) : 0
      };
    }, d = $(() => c("guardrail_type")), h = $(() => c("guardrail_action")), g = $(() => c("guardrail_source")), v = $(() => {
      const x = {};
      for (const p of a.data?.items || [])
        x[p.date] || (x[p.date] = {}), x[p.date][p.guardrail_type] = (x[p.date][p.guardrail_type] || 0) + p.count;
      return Object.entries(x).map(([p, b]) => ({
        date: p,
        total: Object.values(b).reduce((_, w) => _ + w, 0),
        types: Object.entries(b).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((p, b) => new Date(p.date).getTime() - new Date(b.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = $(
      () => v.value.map((x) => ({
        id: x.date,
        date: x.date,
        total: x.total,
        types: x.types
      }))
    );
    return t({ isDark: i }), (x, p) => (m(), Z(me, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", Qy, [...p[0] || (p[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", Jy, [
              l.value ? (m(), k(ee, { key: 0 }, [
                v.value.length > 0 ? (m(), k("section", e1, [
                  u("div", t1, [
                    E(st, {
                      columns: f,
                      rows: y.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-date": B(({ row: b }) => [
                        u("span", n1, A(T(Ve)(String(b.date)).format("MMM DD")), 1)
                      ]),
                      "cell-count": B(({ row: b }) => [
                        u("span", a1, A(T(J)(b.total)), 1)
                      ]),
                      "cell-types": B(({ row: b }) => [
                        u("div", o1, [
                          (m(!0), k(ee, null, le(b.types, (_) => (m(), k("span", {
                            key: _.type,
                            class: "type-count-badge"
                          }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : V("", !0),
                u("section", s1, [
                  E(ue, {
                    title: "Total Events",
                    value: T(J)(r.value)
                  }, null, 8, ["value"]),
                  E(ue, {
                    title: "Top type",
                    value: d.value.name,
                    subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  E(ue, {
                    title: "Top action",
                    value: h.value.name,
                    subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"]),
                  E(ue, {
                    title: "Top source",
                    value: g.value.name,
                    subvalue: g.value.pct > 0 ? `(${g.value.pct}%)` : void 0
                  }, null, 8, ["value", "subvalue"])
                ])
              ], 64)) : (m(), k("section", i1, [...p[1] || (p[1] = [
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
}), r1 = /* @__PURE__ */ de(l1, [["__scopeId", "data-v-80a28b15"]]), c1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, d1 = {
  key: "content",
  class: "card-body"
}, u1 = { class: "chart-section" }, h1 = { class: "chart-wrapper" }, f1 = {
  key: 1,
  class: "empty-chart"
}, g1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, p1 = {
  key: 0,
  class: "dn-failure-section"
}, m1 = { class: "w-full min-w-0" }, b1 = { class: "failure-reason" }, v1 = { class: "failure-count" }, y1 = { class: "impact-bar-container" }, _1 = { class: "impact-label" }, x1 = { class: "dn-trend-health-block flex flex-col gap-0" }, k1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, w1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, C1 = { class: "system-health" }, $1 = { class: "system-health-content" }, S1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, M1 = {
  key: 1,
  class: "empty-state"
}, D1 = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (M) => {
      o("export", M);
    }, { isDark: i, colors: l } = _e(ye(a, "theme")), r = $(() => {
      const M = a.data?.documentCounts?.items || [], C = a.data?.processingCounts?.items || [];
      return M.length > 0 || C.length > 0;
    }), c = $(() => {
      const M = a.data?.documentCounts?.items || [];
      return {
        processing_started: M.reduce((C, D) => C + D.processing_started, 0),
        processing_completed: M.reduce((C, D) => C + D.processing_completed, 0),
        processing_failed: M.reduce((C, D) => C + D.processing_failed, 0),
        row_count_total: M.reduce((C, D) => C + D.row_count_total, 0)
      };
    }), d = $(() => {
      const M = a.data?.processingCounts?.items || [];
      return {
        processing_started: M.reduce((C, D) => C + D.processing_started, 0),
        processing_success: M.reduce((C, D) => C + D.processing_success, 0),
        notification_sent: M.reduce((C, D) => C + D.notification_sent, 0),
        notification_failed: M.reduce((C, D) => C + D.notification_failed, 0),
        dq_phone: M.reduce((C, D) => C + D.dq_error_phone_not_found, 0),
        dq_flight: M.reduce((C, D) => C + D.dq_error_flight_not_found, 0),
        dq_booking: M.reduce((C, D) => C + D.dq_error_booking_not_found, 0),
        dq_other: M.reduce((C, D) => C + D.dq_error_other, 0),
        totalDqErrors: M.reduce(
          (C, D) => C + D.dq_error_phone_not_found + D.dq_error_flight_not_found + D.dq_error_booking_not_found + D.dq_error_other,
          0
        )
      };
    }), h = $(
      () => c.value.row_count_total || d.value.processing_started
    ), g = $(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), v = (M, C) => C ? `${Math.round(M / C * 100)}%` : "0%", f = $(() => {
      const M = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((C) => C.count > 0).sort((C, D) => D.count - C.count);
      return M.length > 0 ? M[0] : { reason: "None", count: 0 };
    }), y = $(() => {
      const M = h.value;
      return [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Flight not found", count: d.value.dq_flight },
        { reason: "Phone not found", count: d.value.dq_phone },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].map((C) => ({
        ...C,
        impactPct: M > 0 ? Math.round(C.count / M * 100) : 0
      }));
    }), x = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], p = $(
      () => y.value.map((M) => ({
        id: M.reason,
        reason: M.reason,
        count: M.count,
        impactPct: M.impactPct
      }))
    ), b = $(() => {
      const M = h.value, C = d.value.processing_success, D = Math.max(0, C - d.value.totalDqErrors), I = d.value.notification_sent, F = Math.max(0, M - C), L = d.value.totalDqErrors, R = Math.max(0, D - I), P = (H, te) => {
        const ne = te > 0 ? Math.round(H / te * 100) : 0;
        return `${H.toLocaleString()} (${ne}%)`;
      }, j = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], q = [];
      return C > 0 && q.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: C,
        label: P(C, M)
      }), F > 0 && q.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: F,
        label: P(F, M)
      }), D > 0 && q.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: D,
        label: P(D, M)
      }), L > 0 && q.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: L,
        label: P(L, M)
      }), I > 0 && q.push({
        source: "Contactable",
        target: "Notified",
        value: I,
        label: P(I, M)
      }), R > 0 && q.push({
        source: "Contactable",
        target: "Not Delivered",
        value: R,
        label: P(R, M)
      }), { nodes: j, links: q };
    }), _ = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = $(() => {
      const M = [...a.data?.processingCounts?.items || []].sort(
        (P, j) => new Date(P.date).getTime() - new Date(j.date).getTime()
      ), C = a.data?.documentCounts?.items || [], D = {};
      for (const P of C)
        D[P.date] = (D[P.date] || 0) + P.row_count_total;
      const I = [
        .../* @__PURE__ */ new Set([
          ...M.map((P) => P.date),
          ...C.map((P) => P.date)
        ])
      ].sort(), F = I.map((P) => Ve(P).format("MMM DD")), L = I.map((P) => {
        const j = M.find((te) => te.date === P), q = j?.notification_sent || 0, H = D[P] || j?.processing_started || 0;
        return H > 0 ? Math.round(q / H * 100) : 0;
      }), R = I.map((P) => M.find((q) => q.date === P)?.notification_sent || 0);
      return {
        labels: F,
        datasets: [
          {
            label: "Success Rate (%)",
            data: L,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: R,
            borderColor: "#10b981",
            yAxisID: "y1"
          }
        ]
      };
    }), S = $(() => ({
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
            label: (M) => M.datasetIndex === 0 ? ` Success Rate: ${M.raw}%` : ` Notifications: ${M.raw}`
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
            callback: (M) => `${M}%`
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
    return t({ isDark: i }), (M, C) => (m(), Z(me, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !a.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            e.loading ? (m(), k("div", c1, [...C[0] || (C[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", d1, [
              r.value ? (m(), k(ee, { key: 0 }, [
                u("section", u1, [
                  C[2] || (C[2] = u("div", { class: "chart-header" }, [
                    u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
                  ], -1)),
                  u("div", h1, [
                    b.value.nodes.length > 0 && b.value.links.length > 0 ? (m(), Z(Nt, {
                      key: 0,
                      data: b.value,
                      "node-colors": _,
                      height: "350px"
                    }, null, 8, ["data"])) : (m(), k("div", f1, [...C[1] || (C[1] = [
                      u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                    ])]))
                  ])
                ]),
                u("div", g1, [
                  E(ue, {
                    color: "#3b82f6",
                    title: "Total Records",
                    value: T(J)(c.value.row_count_total)
                  }, null, 8, ["value"]),
                  E(ue, {
                    color: "#8b5cf6",
                    title: "Passengers Affected",
                    value: T(J)(h.value)
                  }, null, 8, ["value"]),
                  E(ue, {
                    color: "#10b981",
                    title: "Successfully Notified",
                    value: T(J)(d.value.notification_sent),
                    subvalue: v(d.value.notification_sent, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  E(ue, {
                    color: "#ef4444",
                    title: "Not Notified",
                    value: T(J)(g.value),
                    subvalue: v(g.value, h.value)
                  }, null, 8, ["value", "subvalue"]),
                  E(ue, {
                    color: "#f59e0b",
                    title: "Main Failure Reason",
                    value: f.value.reason,
                    subvalue: f.value.count > 0 ? `${T(J)(f.value.count)} cases` : void 0
                  }, null, 8, ["value", "subvalue"])
                ]),
                y.value.length > 0 ? (m(), k("section", p1, [
                  C[3] || (C[3] = u("div", { class: "section-header" }, [
                    u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
                  ], -1)),
                  u("div", m1, [
                    E(st, {
                      columns: x,
                      rows: p.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, {
                      "cell-reason": B(({ row: D }) => [
                        u("span", b1, A(D.reason), 1)
                      ]),
                      "cell-count": B(({ row: D }) => [
                        u("span", v1, A(T(J)(D.count)), 1)
                      ]),
                      "cell-impact": B(({ row: D }) => [
                        u("div", y1, [
                          u("div", {
                            class: "impact-bar",
                            style: xe({ width: D.impactPct + "%" })
                          }, null, 4),
                          u("span", _1, A(D.impactPct) + "%", 1)
                        ])
                      ]),
                      _: 1
                    }, 8, ["rows"])
                  ])
                ])) : V("", !0),
                u("div", x1, [
                  w.value.labels.length > 0 ? (m(), k("section", k1, [
                    C[4] || (C[4] = u("div", { class: "chart-header" }, [
                      u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                    ], -1)),
                    u("div", w1, [
                      E(ft, {
                        data: w.value,
                        options: S.value,
                        theme: a.theme
                      }, null, 8, ["data", "options", "theme"])
                    ])
                  ])) : V("", !0),
                  u("details", C1, [
                    C[5] || (C[5] = u("summary", { class: "system-health-toggle" }, [
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
                      $e(" System Health Details ")
                    ], -1)),
                    u("div", $1, [
                      u("div", S1, [
                        E(ue, {
                          title: "Docs Started",
                          value: T(J)(c.value.processing_started)
                        }, null, 8, ["value"]),
                        E(ue, {
                          title: "Docs Completed",
                          value: T(J)(c.value.processing_completed)
                        }, null, 8, ["value"]),
                        E(ue, {
                          title: "Docs Failed",
                          value: T(J)(c.value.processing_failed)
                        }, null, 8, ["value"]),
                        E(ue, {
                          title: "Processing Started",
                          value: T(J)(d.value.processing_started)
                        }, null, 8, ["value"]),
                        E(ue, {
                          title: "Processing Success",
                          value: T(J)(d.value.processing_success)
                        }, null, 8, ["value"]),
                        E(ue, {
                          title: "Notification Failed",
                          value: T(J)(d.value.notification_failed)
                        }, null, 8, ["value"])
                      ])
                    ])
                  ])
                ])
              ], 64)) : (m(), k("section", M1, [...C[6] || (C[6] = [
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
}), A1 = /* @__PURE__ */ de(D1, [["__scopeId", "data-v-aff0a7ad"]]), T1 = /* @__PURE__ */ ae({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = $(() => J(n.totalConversations)), s = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (m(), Z(bt, {
      label: "Total Conversations",
      value: o.value,
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
}), B1 = /* @__PURE__ */ ae({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = $(() => `${n.csatP95.toFixed(1)}`), s = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (m(), Z(bt, {
      label: "CSAT P95",
      value: o.value,
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
}), L1 = /* @__PURE__ */ ae({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = $(() => `${n.csatPulse.toFixed(1)}%`), s = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (m(), Z(bt, {
      label: "CSAT Pulse",
      value: o.value,
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
}), F1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, P1 = { key: "content" }, E1 = {
  key: 0,
  class: "card-body"
}, I1 = { class: "chart-wrapper" }, R1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, O1 = {
  key: 1,
  class: "empty-state"
}, V1 = 500, z1 = 60, N1 = 80, W1 = {
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
    }, s = e, { isDark: i } = _e(ye(s, "theme")), l = $(() => s.data), r = $(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (c, d) => (m(), Z(me, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !s.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            s.loading ? (m(), k("div", F1, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", P1, [
              l.value && l.value.total_nps_responses > 0 ? (m(), k("div", E1, [
                u("div", I1, [
                  E(Ni, {
                    histogram: l.value.histogram || [],
                    "min-score": l.value.min_score || 0,
                    "max-score": l.value.max_score || 0,
                    "q1-score": l.value.q1_score || 0,
                    "median-score": l.value.median_score || 0,
                    "q3-score": l.value.q3_score || 0,
                    "average-score": l.value.average_score || 0,
                    "chart-width": r.value,
                    "chart-height": V1,
                    "chart-margin": z1,
                    "chart-bottom-margin": N1
                  }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
                ]),
                u("div", R1, [
                  E(ue, {
                    class: "min-w-0 flex-1",
                    title: "Responses",
                    value: String(l.value.total_nps_responses)
                  }, null, 8, ["value"]),
                  l.value.p95_score > 0 ? (m(), Z(ue, {
                    key: 0,
                    class: "min-w-0 flex-1",
                    title: "Percentile 95",
                    value: String(l.value.p95_score)
                  }, null, 8, ["value"])) : V("", !0)
                ])
              ])) : (m(), k("div", O1, [...d[1] || (d[1] = [
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
}, Ji = /* @__PURE__ */ de(W1, [["__scopeId", "data-v-62338982"]]), j1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, H1 = { key: "content" }, Y1 = {
  key: 0,
  class: "card-body"
}, K1 = {
  key: 1,
  class: "empty-state"
}, U1 = {
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
    }, o = e, s = $(() => o.data?.csat_p95_by_day || []), i = $(() => s.value.length > 0), l = $(() => ({
      labels: s.value.map((c) => Ve(c.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: s.value.map((c) => Number(c.p95_score || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), r = {
      scales: {
        y: {
          min: 0,
          max: 11,
          ticks: {
            callback: (c) => Number(c).toFixed(2)
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
    return (c, d) => (m(), Z(me, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT P95 by Date",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: B(() => [
        e.enableExport && !o.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            o.loading ? (m(), k("div", j1, [...d[0] || (d[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", H1, [
              i.value ? (m(), k("div", Y1, [
                E(ft, {
                  data: l.value,
                  options: r,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (m(), k("div", K1, [...d[1] || (d[1] = [
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
}, el = /* @__PURE__ */ de(U1, [["__scopeId", "data-v-800748a4"]]), q1 = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, X1 = { key: "content" }, G1 = {
  key: 0,
  class: "card-body"
}, Z1 = {
  key: 1,
  class: "empty-state"
}, Q1 = /* @__PURE__ */ ae({
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
    ), o = $(() => {
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
    return (i, l) => (m(), Z(me, {
      class: "nps-resolution-root h-full min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (m(), k("div", q1, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", X1, [
              a.value ? (m(), k("div", G1, [
                E(yt, {
                  data: o.value,
                  options: s,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (m(), k("div", Z1, [...l[1] || (l[1] = [
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
}), J1 = /* @__PURE__ */ de(Q1, [["__scopeId", "data-v-94bc19ef"]]), e_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, t_ = { key: "content" }, n_ = {
  key: 0,
  class: "card-body"
}, a_ = {
  key: 1,
  class: "empty-state"
}, o_ = /* @__PURE__ */ ae({
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
    const t = e, n = $(() => t.data?.csat_pulse_by_day || []), a = $(() => n.value.length > 0), o = $(() => ({
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
    })), s = {
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
    return (i, l) => (m(), Z(me, {
      class: "nps-pulse-root h-full min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: t.loading
    }, {
      default: B(() => [
        E(ke, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: B(() => [
            t.loading ? (m(), k("div", e_, [...l[0] || (l[0] = [
              u("div", {
                class: "flex-1 bm-skeleton-blink",
                "aria-hidden": "true"
              }, null, -1)
            ])])) : (m(), k("div", t_, [
              a.value ? (m(), k("div", n_, [
                E(ft, {
                  data: o.value,
                  options: s,
                  "uppercase-legend-labels": !0
                }, null, 8, ["data"])
              ])) : (m(), k("div", a_, [...l[1] || (l[1] = [
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
}), s_ = /* @__PURE__ */ de(o_, [["__scopeId", "data-v-a093b7a2"]]), i_ = { class: "nps-metrics-container" }, l_ = {
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
    const n = t, a = (l) => {
      n("export", l);
    }, o = e, s = $(() => o.showResolutionChart), i = $(() => o.showCsatPulseChart);
    return (l, r) => (m(), k("div", i_, [
      E(Ji, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      E(el, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      s.value ? (m(), Z(J1, {
        key: 0,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : V("", !0),
      i.value ? (m(), Z(s_, {
        key: 1,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : V("", !0)
    ]));
  }
}, tl = /* @__PURE__ */ de(l_, [["__scopeId", "data-v-101623e8"]]), r_ = { class: "csat-container__body" }, c_ = /* @__PURE__ */ ae({
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
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (m(), Z(me, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading
    }, {
      default: B(() => [
        u("div", r_, [
          E(tl, {
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
}), d_ = /* @__PURE__ */ de(c_, [["__scopeId", "data-v-71605c0e"]]), u_ = /* @__PURE__ */ ae({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = $(() => Tt(n.totalRevenue)), s = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (m(), Z(bt, {
      label: "AI Revenue",
      value: o.value,
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
}), h_ = { class: "flex justify-end" }, f_ = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, g_ = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, p_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, m_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, b_ = { class: "flex flex-wrap gap-4" }, v_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, y_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, __ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, x_ = { class: "truncate" }, k_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, w_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, C_ = /* @__PURE__ */ ae({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = ye(a, "theme"), { isDark: i } = _e(s), l = oe(a.breakdownBy), r = $(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), c = oe({
      labels: [],
      datasets: []
    }), d = oe([]), h = oe(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (p) => g[p % g.length], f = () => {
      o("changeBreakdown", l.value);
    }, y = (p) => {
      if (!p) return "";
      const _ = p.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return _ ? _.charAt(0).toUpperCase() + _.slice(1) : "";
    }, x = (p) => {
      if (l.value === "all") {
        const D = p?.escalations_by_day ?? [];
        if (!D.length) {
          c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
          return;
        }
        const I = [...D].sort((F, L) => F.date.localeCompare(L.date));
        c.value = {
          labels: I.map((F) => Ve(F.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: I.map(
                (F) => Number(F.escalation_rate_percentage || 0)
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
      const b = p?.breakdown_by_day ?? [], _ = p?.breakdown_items ?? [];
      if (!b.length) {
        c.value = { labels: [], datasets: [] }, d.value = [], h.value = [];
        return;
      }
      const w = [...b].sort(
        (D, I) => D.date.localeCompare(I.date)
      ), S = _.slice(0, 5).map((D) => D.key), M = w.map((D) => Ve(D.date).format("MMM DD")), C = S.map((D, I) => {
        const F = _.find((L) => L.key === D);
        return {
          label: y(F?.label || D),
          data: w.map((L) => {
            const R = L.items.find((P) => P.key === D);
            return Number(R?.percentage || 0);
          }),
          borderColor: v(I),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      c.value = {
        labels: M,
        datasets: C
      }, d.value = _.slice(0, 5).map((D, I) => ({
        key: D.key,
        label: y(D.label),
        percentage: Number(D.percentage || 0),
        color: v(I)
      })), h.value = _.slice(0, 5).map((D, I) => ({
        key: D.key,
        label: y(D.label),
        color: v(I)
      }));
    };
    return Fe(
      () => a.data,
      (p) => {
        x(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Fe(
      () => a.breakdownBy,
      (p) => {
        l.value = p, x(r.value);
      }
    ), t({ isDark: i }), (p, b) => (m(), Z(me, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: B(() => [
        u("div", h_, [
          Xe(u("select", {
            "onUpdate:modelValue": b[0] || (b[0] = (_) => l.value = _),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: f
          }, [...b[1] || (b[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1),
            u("option", { value: "channel" }, "By Channel", -1),
            u("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [Ys, l.value]
          ])
        ])
      ]),
      default: B(() => [
        u("div", {
          class: G(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          E(ke, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: B(() => [
              a.loading ? (m(), k("div", f_, [...b[2] || (b[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", g_, [
                c.value.labels && c.value.labels.length && c.value.datasets.length ? (m(), k("section", p_, [
                  u("div", m_, [
                    E(ft, {
                      data: c.value,
                      theme: s.value
                    }, null, 8, ["data", "theme"])
                  ]),
                  u("div", b_, [
                    (m(!0), k(ee, null, le(h.value, (_) => (m(), k("div", {
                      key: `legend-${_.key}`,
                      class: "inline-flex items-center gap-2 text-sm"
                    }, [
                      u("span", {
                        class: "inline-block h-2.5 w-2.5 rounded-full",
                        style: xe({ backgroundColor: _.color })
                      }, null, 4),
                      u("span", v_, A(_.label), 1)
                    ]))), 128))
                  ]),
                  u("div", y_, [
                    (m(!0), k(ee, null, le(d.value, (_) => (m(), k("div", {
                      key: `card-${_.key}`,
                      class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                    }, [
                      u("p", __, [
                        u("span", {
                          class: "inline-block h-2.5 w-2.5 rounded-full",
                          style: xe({ backgroundColor: _.color })
                        }, null, 4),
                        u("span", x_, A(_.label), 1)
                      ]),
                      u("p", k_, A(_.percentage.toFixed(1)) + "% ", 1)
                    ]))), 128))
                  ])
                ])) : (m(), k("section", w_, [...b[3] || (b[3] = [
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
}), $_ = /* @__PURE__ */ de(C_, [["__scopeId", "data-v-97430e89"]]), S_ = /* @__PURE__ */ ae({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = $(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = $(() => T(a.value?.isDark) ?? !1), i = $(() => T(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (m(), Z(bt, {
      label: "Human Escalations",
      value: o.value,
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
}), M_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, D_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, A_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, T_ = {
  key: 1,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, B_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, L_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, F_ = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, P_ = { class: "max-w-[360px] text-center" }, E_ = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, I_ = {
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
    const t = e, { isDark: n, colors: a } = _e(ye(t, "theme")), o = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = $(() => {
      const c = t.data ?? {}, d = c.daily, h = c.days, g = Array.isArray(d) && d.length > 0, v = Array.isArray(h) && h.length > 0 && Array.isArray(c.allocatedCostSeries) && c.allocatedCostSeries.length === h.length;
      let f = [];
      return g ? f = d : v && (f = h.map((y, x) => ({
        date: y,
        allocated_cost: c.allocatedCostSeries[x] ?? 0,
        aws_cost: c.awsCostSeries[x] ?? 0,
        airline_conversations: c.airlineConversationsSeries[x] ?? 0
      }))), {
        daily: f,
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
              return c.dataset.yAxisID === "y" ? d + Me(h) : d + String(h);
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
            callback: (c) => Me(c)
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
    return (c, d) => (m(), Z(me, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", M_, [
          e.loading ? (m(), k("div", D_, [
            u("div", A_, [
              (m(), k(ee, null, le(o, (h, g) => u("div", {
                key: g,
                class: G(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[g]]),
                style: xe({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            d[0] || (d[0] = u("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (m(), k("div", T_, [
            u("div", B_, [
              E(ft, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: r.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", L_, [
              E(ue, {
                color: T(a).primaryLight,
                title: "Total Allocated",
                value: T(Me)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              E(ue, {
                color: "#FF9900",
                title: "Total AWS",
                value: T(Me)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (m(), k("section", F_, [
            u("div", P_, [
              u("div", E_, [
                E(T(Ge), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, R_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, O_ = {
  key: 0,
  class: "card-body"
}, V_ = {
  key: 0,
  class: "chart-section"
}, z_ = { class: "chart-container" }, N_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, W_ = {
  key: 1,
  class: "empty-state"
}, j_ = { class: "empty-state-content" }, H_ = { class: "empty-icon-wrapper" }, Y_ = {
  key: 1,
  class: "loading-state"
}, mn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", zs = 10, K_ = /* @__PURE__ */ ae({
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
    const a = e, { isDark: o, colors: s } = _e(ye(a, "theme")), i = (f) => {
      const y = new Date(f), x = String(y.getDate()).padStart(2, "0"), p = String(y.getMonth() + 1).padStart(2, "0");
      return `${x}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.input_cost || 0), 0);
    }), c = $(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.output_cost || 0), 0);
    }), d = $(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.cache_read_cost || 0), 0);
    }), h = $(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((y, x) => y + (x.cache_write_cost || 0), 0);
    }), g = $(() => {
      const f = a.data?.costs_by_day || {}, y = Object.keys(f).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const x = y.map((b) => i(b)), p = [
        {
          label: "Input Cost",
          data: y.map((b) => f[b]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: y.map((b) => f[b]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: y.map((b) => f[b]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: y.map((b) => f[b]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: x,
        datasets: p
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
              family: mn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: zs,
            boxHeight: zs,
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
            family: mn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: mn,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(f) {
              let y = f.dataset.label || "";
              return y && (y += ": "), f.parsed.y !== null && (y += Me(f.parsed.y)), y;
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
            font: { family: mn, size: 12, weight: "500" },
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
            font: { family: mn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return Me(f);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (f, y) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", R_, [
          e.loading ? (m(), k("div", Y_, [...y[2] || (y[2] = [
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
          ])])) : (m(), k("div", O_, [
            g.value.labels && g.value.labels.length ? (m(), k("section", V_, [
              u("div", z_, [
                E(yt, {
                  data: g.value,
                  options: v.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", N_, [
                E(ue, {
                  title: "Total Cost",
                  value: T(Me)(e.data.total_cost)
                }, null, 8, ["value"]),
                E(ue, {
                  title: "Input Cost",
                  value: T(Me)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                E(ue, {
                  title: "Output Cost",
                  value: T(Me)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                E(ue, {
                  title: "Cache Read",
                  value: T(Me)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                E(ue, {
                  title: "Cache Write",
                  value: T(Me)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                E(ue, {
                  title: "Avg / Conv.",
                  value: T(Me)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", W_, [
              u("div", j_, [
                u("div", H_, [
                  E(T(Ge), { class: "empty-icon" })
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
}), U_ = /* @__PURE__ */ de(K_, [["__scopeId", "data-v-39a5448c"]]), q_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, X_ = {
  key: 0,
  class: "card-body"
}, G_ = {
  key: 0,
  class: "chart-section"
}, Z_ = { class: "chart-container" }, Q_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, J_ = {
  key: 1,
  class: "empty-state"
}, ex = { class: "empty-state-content" }, tx = { class: "empty-icon-wrapper" }, nx = {
  key: 1,
  class: "loading-state"
}, bn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ns = 10, ax = /* @__PURE__ */ ae({
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
    const a = e, { isDark: o, colors: s } = _e(ye(a, "theme")), i = (d) => {
      const h = new Date(d), g = String(h.getDate()).padStart(2, "0"), v = String(h.getMonth() + 1).padStart(2, "0");
      return `${g}-${v}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = $(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((f) => i(f)), v = [
        {
          label: "Input Tokens",
          data: h.map((f) => d[f]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => d[f]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => d[f]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => d[f]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: g,
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
              family: bn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: Ns,
            boxHeight: Ns,
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
            family: bn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: bn,
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
            font: { family: bn, size: 12, weight: "500" },
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
            font: { family: bn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", q_, [
          e.loading ? (m(), k("div", nx, [...h[2] || (h[2] = [
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
          ])])) : (m(), k("div", X_, [
            r.value.labels && r.value.labels.length ? (m(), k("section", G_, [
              u("div", Z_, [
                E(yt, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Q_, [
                E(ue, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: T(J)(e.data.total_tokens)
                }, null, 8, ["value"]),
                E(ue, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: T(J)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                E(ue, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: T(J)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                E(ue, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: T(J)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                E(ue, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: T(J)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (m(), k("section", J_, [
              u("div", ex, [
                u("div", tx, [
                  E(T(Ge), { class: "empty-icon" })
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
}), ox = /* @__PURE__ */ de(ax, [["__scopeId", "data-v-70c6f3c7"]]), sx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ix = {
  key: 0,
  class: "card-body"
}, lx = {
  key: 0,
  class: "chart-section"
}, rx = { class: "chart-container" }, cx = { class: "mt-4 w-full min-w-0" }, dx = {
  key: 1,
  class: "empty-state"
}, ux = { class: "empty-state-content" }, hx = { class: "empty-icon-wrapper" }, fx = {
  key: 1,
  class: "loading-state"
}, gx = /* @__PURE__ */ ae({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = $(
      () => J(n.data?.total_conversations ?? 0)
    ), l = $(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((v) => s(v)), g = [
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
        datasets: g
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
    return t({ isDark: a }), (c, d) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", sx, [
          e.loading ? (m(), k("div", fx, [...d[2] || (d[2] = [
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
          ])])) : (m(), k("div", ix, [
            l.value.labels && l.value.labels.length ? (m(), k("section", lx, [
              u("div", rx, [
                E(ft, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", cx, [
                E(ue, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", dx, [
              u("div", ux, [
                u("div", hx, [
                  E(T(Ge), { class: "empty-icon" })
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
}), px = /* @__PURE__ */ de(gx, [["__scopeId", "data-v-b33e8627"]]), mx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, bx = {
  key: 0,
  class: "card-body"
}, vx = {
  key: 0,
  class: "charts-grid"
}, yx = { class: "chart-section" }, _x = { class: "chart-container" }, xx = { class: "chart-section" }, kx = { class: "chart-container" }, wx = {
  key: 1,
  class: "empty-state"
}, Cx = { class: "empty-state-content" }, $x = { class: "empty-icon-wrapper" }, Sx = {
  key: 1,
  class: "loading-state"
}, Mx = /* @__PURE__ */ ae({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = $(() => n.data?.top_agents && n.data.top_agents.length > 0), i = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((g, v) => (v.total_cost || 0) - (g.total_cost || 0)) : []), l = $(() => n.data?.top_agents ? [...n.data.top_agents].sort((g, v) => (v.total_tokens || 0) - (g.total_tokens || 0)) : []), r = $(() => {
      const g = i.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: g.map((v) => v.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = $(() => {
      const g = l.value;
      return g.length === 0 ? { labels: [], datasets: [] } : {
        labels: g.map((v) => v.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: g.map((v) => v.total_tokens || 0),
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const v = g.label, f = n.data?.top_agents?.find((y) => y.agent_type === v);
              return f ? [
                `Total Cost: ${Me(f.total_cost)}`,
                `Input Cost: ${Me(f.total_input_tokens_cost)}`,
                `Output Cost: ${Me(f.total_output_tokens_cost)}`,
                `Cache Read: ${Me(f.total_read_tokens_cost)}`,
                `Cache Write: ${Me(f.total_write_tokens_cost)}`
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
            callback: function(g) {
              return Me(g);
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
            title: function(g) {
              return g[0]?.label || "";
            },
            label: function(g) {
              const v = g.label, f = n.data?.top_agents?.find((y) => y.agent_type === v);
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
            callback: function(g) {
              return g.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (g, v) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", mx, [
          e.loading ? (m(), k("div", Sx, [...v[4] || (v[4] = [
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
          ])])) : (m(), k("div", bx, [
            s.value ? (m(), k("div", vx, [
              u("section", yx, [
                v[0] || (v[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", _x, [
                  E(yt, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", xx, [
                v[1] || (v[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", kx, [
                  E(yt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (m(), k("section", wx, [
              u("div", Cx, [
                u("div", $x, [
                  E(T(Ge), { class: "empty-icon" })
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
}), Dx = /* @__PURE__ */ de(Mx, [["__scopeId", "data-v-a5014772"]]), Ax = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tx = {
  key: 0,
  class: "card-body"
}, Bx = {
  key: 0,
  class: "chart-section"
}, Lx = { class: "chart-container" }, Fx = {
  key: 1,
  class: "empty-state"
}, Px = { class: "empty-state-content" }, Ex = { class: "empty-icon-wrapper" }, Ix = {
  key: 1,
  class: "loading-state"
}, Rx = /* @__PURE__ */ ae({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = {
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
    ) : []), l = $(() => i.value.length > 0), r = $(() => i.value.reduce((h, g) => h + (g.conversations || 0), 0)), c = $(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const g = h.map((y) => {
        const x = y.agent_type?.toLowerCase();
        return (s[x] || "#a78bfa") + "80";
      }), v = h.map((y) => {
        const x = y.agent_type?.toLowerCase();
        return s[x] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const x = y.conversations || 0, p = r.value ? x / r.value * 100 : 0;
          return `${y.agent_type} - ${x.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: g,
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
              const g = (h.label || "").toString(), v = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((x, p) => x + (Number(p) || 0), 0), y = f ? v / f * 100 : 0;
              return `${g}: ${v.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, g) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Ax, [
          e.loading ? (m(), k("div", Ix, [...g[2] || (g[2] = [
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
          ])])) : (m(), k("div", Tx, [
            l.value ? (m(), k("section", Bx, [
              u("div", Lx, [
                E(ma, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), k("section", Fx, [
              u("div", Px, [
                u("div", Ex, [
                  E(T(Ge), { class: "empty-icon" })
                ]),
                g[0] || (g[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                g[1] || (g[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ox = /* @__PURE__ */ de(Rx, [["__scopeId", "data-v-14445b91"]]), Vx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, zx = {
  key: 0,
  class: "card-body"
}, Nx = {
  key: 0,
  class: "chart-section"
}, Wx = { class: "chart-container" }, jx = {
  key: 1,
  class: "empty-state"
}, Hx = { class: "empty-state-content" }, Yx = { class: "empty-icon-wrapper" }, Kx = {
  key: 1,
  class: "loading-state"
}, Ux = /* @__PURE__ */ ae({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = _e(ye(n, "theme")), s = (c) => {
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
        const x = [...c].sort((p, b) => p.date.localeCompare(b.date));
        return {
          labels: x.map((p) => s(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: x.map((p) => Number(p.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, v = Object.keys(d).filter((x) => h[x]).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const f = v.map((x) => s(x)), y = v.map((x) => {
        const p = d[x]?.total_cost || 0, b = h[x] || 0;
        return b > 0 ? p / b : 0;
      });
      return {
        labels: f,
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
              let d = c.dataset.label || "";
              return d && (d += ": "), c.parsed.y !== null && (d += Me(c.parsed.y)), d;
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
              return Me(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: B(() => [
        u("div", Vx, [
          e.loading ? (m(), k("div", Kx, [...d[2] || (d[2] = [
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
          ])])) : (m(), k("div", zx, [
            i.value ? (m(), k("section", Nx, [
              u("div", Wx, [
                E(ft, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), k("section", jx, [
              u("div", Hx, [
                u("div", Yx, [
                  E(T(Ge), { class: "empty-icon" })
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
}), qx = /* @__PURE__ */ de(Ux, [["__scopeId", "data-v-1e8204ea"]]);
function je() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const Xx = { class: "tabs text-sm" }, Gx = ["aria-label"], Zx = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], Qx = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, Jx = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = oe([]), s = `tabs-${je()}`, i = (f) => `${s}-tab-${f}`, l = $(
      () => n.items.map((f, y) => f.disabled ? -1 : y).filter((f) => f >= 0)
    );
    function r(f) {
      return f.value === n.modelValue;
    }
    function c(f) {
      const y = r(f), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${p} cursor-not-allowed opacity-40` : y ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(f, y) {
      f === y || n.items.find((p) => p.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: y }));
    }
    function h(f, y) {
      a("tab-click", { value: f.value, originalEvent: y }), !f.disabled && (d(f.value, n.modelValue), ze(() => {
        o.value[n.items.indexOf(f)]?.focus();
      }));
    }
    function g(f, y) {
      const x = n.items.length;
      if (x === 0) return 0;
      let p = f;
      for (let b = 0; b < x; b++)
        if (p = (p + y + x) % x, !n.items[p]?.disabled) return p;
      return f;
    }
    async function v(f, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let p = y;
      f.key === "ArrowLeft" ? p = g(y, -1) : f.key === "ArrowRight" ? p = g(y, 1) : f.key === "Home" ? p = l.value[0] ?? 0 : f.key === "End" && (p = l.value[l.value.length - 1] ?? y);
      const b = n.items[p];
      !b || b.disabled || (d(b.value, n.modelValue), await ze(), o.value[p]?.focus());
    }
    return (f, y) => (m(), k("div", Xx, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: G([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), k(ee, null, le(e.items, (x, p) => (m(), k("button", {
          id: i(x.value),
          key: x.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: o,
          type: "button",
          role: "tab",
          "aria-selected": r(x),
          "aria-disabled": x.disabled === !0,
          tabindex: r(x) ? 0 : -1,
          class: G(c(x)),
          onClick: (b) => h(x, b),
          onKeydown: (b) => v(b, p)
        }, [
          u("span", {
            class: G(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            x.icon ? (m(), Z(nn(x.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            u("span", Qx, A(x.label), 1)
          ], 2)
        ], 42, Zx))), 128))
      ], 10, Gx),
      f.$slots.default ? (m(), Z(ke, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: B(() => [
          (m(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            Se(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), nl = /* @__PURE__ */ de(Jx, [["__scopeId", "data-v-f9c367eb"]]), ek = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, tk = {
  key: 0,
  class: "loading-state"
}, nk = {
  key: 1,
  class: "card-body"
}, ak = {
  key: 0,
  class: "model-usage-table-block"
}, ok = { class: "w-full min-w-0" }, sk = {
  key: 1,
  class: "empty-state"
}, ik = { class: "empty-state-content" }, lk = { class: "empty-icon-wrapper" }, rk = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (f) => {
      o("export", f);
    }, { isDark: i } = _e(ye(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = oe("by_model"), c = $(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = $(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = $(
      () => Object.entries(c.value).map(([f, y]) => ({
        id: f,
        name: f,
        avgCost: v(y.avg_cost_per_message),
        avgTokens: g(y.avg_tokens_per_message),
        messageCount: g(y.message_count),
        totalCost: v(y.total_cost),
        totalTokens: g(y.total_tokens)
      }))
    ), g = (f) => f == null ? "0" : J(f), v = (f) => f == null ? "$0.00" : Me(f);
    return t({ isDark: i }), (f, y) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", ek, [
          e.loading ? (m(), k("div", tk, [...y[1] || (y[1] = [
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
          ])])) : (m(), k("div", nk, [
            E(nl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (x) => r.value = x),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: B(() => [
                c.value && Object.keys(c.value).length > 0 ? (m(), k("div", ak, [
                  u("div", ok, [
                    E(st, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (m(), k("div", sk, [
                  u("div", ik, [
                    u("div", lk, [
                      E(T(Ge), { class: "empty-icon" })
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
}), ck = /* @__PURE__ */ de(rk, [["__scopeId", "data-v-0c23d620"]]), dk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, uk = {
  key: 0,
  class: "loading-state"
}, hk = {
  key: 1,
  class: "card-body"
}, fk = {
  key: 0,
  class: "message-roles-table-block"
}, gk = { class: "w-full min-w-0" }, pk = {
  key: 1,
  class: "empty-state"
}, mk = { class: "empty-state-content" }, bk = { class: "empty-icon-wrapper" }, vk = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (y) => {
      o("export", y);
    }, { isDark: i } = _e(ye(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = $(() => a.data?.total_by_role || {}), d = $(
      () => l.map((y) => ({
        id: y,
        role: f(y),
        avgCost: v(c.value[y]?.avg_cost_per_message),
        avgTokens: g(c.value[y]?.avg_tokens_per_message),
        messageCount: g(c.value[y]?.message_count),
        totalCost: v(c.value[y]?.total_cost),
        totalTokens: g(c.value[y]?.total_tokens)
      }))
    ), h = $(() => Object.keys(c.value).length > 0), g = (y) => y == null ? "0" : J(y), v = (y) => y == null ? "$0.00" : Me(y), f = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, x) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", dk, [
          e.loading ? (m(), k("div", uk, [...x[0] || (x[0] = [
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
          ])])) : (m(), k("div", hk, [
            h.value ? (m(), k("div", fk, [
              u("div", gk, [
                E(st, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (m(), k("div", pk, [
              u("div", mk, [
                u("div", bk, [
                  E(T(Ge), { class: "empty-icon" })
                ]),
                x[1] || (x[1] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                x[2] || (x[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), yk = /* @__PURE__ */ de(vk, [["__scopeId", "data-v-362c0dbc"]]), _k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, xk = {
  key: 0,
  class: "card-body"
}, kk = {
  key: 0,
  class: "chart-section"
}, wk = { class: "chart-container" }, Ck = { class: "kpi-grid" }, $k = {
  key: 1,
  class: "empty-state"
}, Sk = { class: "empty-state-content" }, Mk = { class: "empty-icon-wrapper" }, Dk = {
  key: 1,
  class: "loading-state"
}, Ak = /* @__PURE__ */ ae({
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
    const a = e, o = n, s = (b) => {
      o("export", b);
    }, { isDark: i, colors: l } = _e(ye(a, "theme")), r = {
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
    }, c = (b) => b.agent_type || b.agent_id || b.agent_name || "", d = (b) => b.agent_name ? b.agent_name : c(b).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (b) => {
      const _ = c(b).toLowerCase();
      for (const [w, S] of Object.entries(r))
        if (_.includes(w))
          return S;
      return "#9ca3af";
    }, g = $(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), v = $(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : g.value.reduce((b, _) => b + _.conversations, 0)), f = $(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : g.value.reduce((b, _) => b + _.total_cost, 0)), y = $(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : v.value === 0 ? 0 : f.value / v.value), x = $(() => {
      const b = g.value;
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const _ = b.map((M) => d(M)), w = b.map((M) => M.avg_cost_per_conversation), S = b.map((M) => h(M));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: S.map((M) => `${M}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), p = $(() => a.options ? a.options : {
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
            label: function(b) {
              const _ = g.value[b.dataIndex];
              return [
                `Cost: ${Me(b.parsed.x)}`,
                `Conversations: ${J(_.conversations)}`,
                `Total Cost: ${Me(_.total_cost)}`
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
            callback: function(b) {
              return Me(b);
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
    return t({ isDark: i }), (b, _) => (m(), Z(me, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: B(() => [
        e.enableExport && !e.loading ? (m(), Z(T(Pe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: B(() => [
        u("div", _k, [
          e.loading ? (m(), k("div", Dk, [..._[2] || (_[2] = [
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
          ])])) : (m(), k("div", xk, [
            x.value.labels && x.value.labels.length ? (m(), k("section", kk, [
              u("div", wk, [
                E(yt, {
                  data: x.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Ck, [
                E(T(ue), {
                  title: "Total Agents",
                  value: String(g.value.length)
                }, null, 8, ["value"]),
                E(T(ue), {
                  title: "Total Conversations",
                  value: T(J)(v.value)
                }, null, 8, ["value"]),
                E(T(ue), {
                  title: "Total Cost",
                  value: T(Me)(f.value)
                }, null, 8, ["value"]),
                E(T(ue), {
                  title: "Avg Cost / Conv.",
                  value: T(Me)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", $k, [
              u("div", Sk, [
                u("div", Mk, [
                  E(T(Ge), { class: "empty-icon" })
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
}), Tk = /* @__PURE__ */ de(Ak, [["__scopeId", "data-v-49068ad7"]]);
function Bk(e, t) {
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
function Lk(e, t) {
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
const Fk = ["aria-label"], Pk = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, Ek = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Ik = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, Rk = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Ok = { class: "truncate" }, Vk = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, zk = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, Nk = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, Wk = ["aria-label", "onClick"], jk = ["aria-label", "onClick"], Hk = ["aria-label"], Yk = ["aria-label"], Kk = {
  key: 1,
  class: "space-y-2"
}, Uk = ["for"], qk = ["id", "placeholder", "onKeydown"], Xk = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Gk = ["aria-label"], Zk = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, Qk = ["checked", "onChange"], Jk = { class: "min-w-0 flex-1" }, e2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, t2 = { class: "flex flex-wrap items-end gap-2" }, n2 = { class: "min-w-[120px] flex-1" }, a2 = ["for"], o2 = ["id"], s2 = { class: "min-w-[120px] flex-1" }, i2 = ["for"], l2 = ["id"], r2 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = Na(), i = `${`kiut-filters-${je()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), g = oe(null), v = oe(""), f = oe([]), y = oe(""), x = oe(""), p = $(() => c.value ? n.filterDefinitions.find((O) => O.id === c.value) ?? null : null), b = $(() => {
      const O = p.value;
      if (O)
        return O.type === "text" ? v.value : O.type === "select" ? f.value : { start: y.value, end: x.value };
    });
    function _(O, U) {
      U && U instanceof HTMLElement ? r.set(O, U) : r.delete(O);
    }
    function w(O) {
      return n.modelValue[O];
    }
    function S(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((U) => typeof U == "string" && U.trim() !== "");
      if (typeof O == "string") {
        const U = O.trim();
        return U ? [U] : [];
      }
      return [];
    }
    function M(O, U) {
      if (U == null) return !0;
      if (O.type === "text") return String(U).trim() === "";
      if (O.type === "select") return S(U).length === 0;
      if (O.type === "dateRange") {
        const se = U;
        return !se?.start?.trim() || !se?.end?.trim();
      }
      return !0;
    }
    const C = $(
      () => n.filterDefinitions.some((O) => !M(O, w(O.id)))
    ), D = $(() => {
      const O = [];
      for (const U of n.filterDefinitions) {
        const se = w(U.id);
        if (!M(U, se)) {
          if (U.type === "text")
            O.push({ kind: "text", def: U, key: U.id });
          else if (U.type === "dateRange")
            O.push({ kind: "dateRange", def: U, key: U.id });
          else if (U.type === "select")
            for (const ve of S(se))
              O.push({
                kind: "select",
                def: U,
                optionValue: ve,
                key: `${U.id}::${ve}`
              });
        }
      }
      return O;
    });
    function I(O) {
      return O.type !== "select" ? 0 : S(w(O.id)).length;
    }
    function F(O) {
      const U = w(O.id), se = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${se}: ${String(U ?? "").trim()}`;
      if (O.type === "select") {
        const ul = S(U).map((fo) => O.options.find((hl) => hl.value === fo)?.label ?? fo);
        return `${se}: ${ul.join(", ")}`;
      }
      const ve = U, at = R(ve.start), At = R(ve.end);
      return `${se}: ${at} – ${At}`;
    }
    function L(O) {
      return O.kind === "text" || O.kind === "dateRange" ? F(O.def) : O.def.options.find((se) => se.value === O.optionValue)?.label ?? O.optionValue;
    }
    function R(O) {
      if (!O) return "";
      const U = Ve(O, "YYYY-MM-DD", !0);
      return U.isValid() ? U.format("L") : O;
    }
    function P(O) {
      const U = c.value === O.id && d.value, se = !M(O, w(O.id));
      return U || se ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function j(O) {
      return M(O, w(O.id)) ? he(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function q(O) {
      const U = w(O.id);
      if (O.type === "text") {
        v.value = U != null ? String(U) : "";
        return;
      }
      if (O.type === "select") {
        f.value = [...S(U)];
        return;
      }
      const se = U;
      y.value = se?.start?.trim() ?? "", x.value = se?.end?.trim() ?? "";
    }
    function H() {
      const O = p.value;
      if (!O || O.type !== "select") return;
      const U = { ...n.modelValue };
      f.value.length === 0 ? delete U[O.id] : U[O.id] = [...f.value], a("update:modelValue", U), a("change", U);
    }
    function te(O) {
      const U = f.value.indexOf(O);
      U >= 0 ? f.value = f.value.filter((se, ve) => ve !== U) : f.value = [...f.value, O], H();
    }
    function ne(O) {
      if (!O) return;
      g.value = O;
      const U = O.getBoundingClientRect(), se = 300;
      let ve = U.left;
      const at = window.innerWidth - se - 12;
      ve > at && (ve = Math.max(12, at)), ve < 12 && (ve = 12);
      const At = U.bottom + 8;
      h.value = {
        top: `${At}px`,
        left: `${ve}px`,
        width: `${Math.min(se, window.innerWidth - 24)}px`
      };
    }
    function re(O, U) {
      if (c.value === O.id && d.value) {
        ie();
        return;
      }
      d.value && c.value !== O.id && ie(), c.value = O.id, d.value = !0, q(O), ze().then(async () => {
        ne(U.currentTarget), await ze(), X();
      });
    }
    function W(O, U) {
      if (c.value === O.id && d.value) {
        ie();
        return;
      }
      d.value && c.value !== O.id && ie(), c.value = O.id, d.value = !0, q(O), ze().then(async () => {
        const se = r.get(O.id) ?? U.currentTarget;
        ne(se), await ze(), X();
      });
    }
    function X() {
      const O = l.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function Q() {
      d.value = !1, c.value = null, g.value = null;
    }
    function ce(O) {
      const U = p.value;
      if (!U) return;
      if (U.type === "text") {
        v.value = O != null ? String(O) : "";
        return;
      }
      if (U.type === "select") {
        f.value = Array.isArray(O) ? O.filter((ve) => typeof ve == "string") : S(O);
        return;
      }
      const se = O;
      y.value = se?.start?.trim() ?? "", x.value = se?.end?.trim() ?? "";
    }
    function ie() {
      const O = p.value;
      if (!O) return;
      if (O.type === "text") {
        const at = v.value.trim(), At = { ...n.modelValue };
        at === "" ? delete At[O.id] : At[O.id] = at, a("update:modelValue", At), a("change", At), Q();
        return;
      }
      if (O.type === "select") {
        H(), Q();
        return;
      }
      const U = y.value.trim(), se = x.value.trim(), ve = { ...n.modelValue };
      !U || !se || U > se ? delete ve[O.id] : ve[O.id] = { start: U, end: se }, a("update:modelValue", ve), a("change", ve), Q();
    }
    function we(O) {
      const U = { ...n.modelValue };
      delete U[O], a("update:modelValue", U), a("change", U), c.value === O && Q();
    }
    function be(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        we(O.def.id);
        return;
      }
      const U = { ...n.modelValue }, ve = S(U[O.def.id]).filter((at) => at !== O.optionValue);
      ve.length === 0 ? delete U[O.def.id] : U[O.def.id] = ve, a("update:modelValue", U), a("change", U), c.value === O.def.id && q(O.def);
    }
    function Y() {
      const O = {};
      a("update:modelValue", O), a("change", O), Q();
    }
    const z = $(() => {
      const O = p.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function N(O) {
      const U = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((at) => at.value === O.optionValue)?.label ?? O.optionValue} del filtro ${U}` : `Quitar filtro ${U}`;
    }
    function K(O) {
      const U = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const ve = O.def.options.find((at) => at.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${U}: ${ve}`;
      }
      return `Editar filtro ${U}`;
    }
    function he(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const fe = $(() => n.clearLabel);
    function ge(O) {
      if (!d.value || !l.value) return;
      const U = O.target;
      if (!(l.value.contains(U) || (U instanceof Element ? U : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const ve of r.values())
          if (ve?.contains(U)) return;
        ie();
      }
    }
    function Be(O) {
      O.key === "Escape" && d.value && (O.preventDefault(), Q());
    }
    function Re() {
      !d.value || !g.value || ne(g.value);
    }
    return tt(() => {
      document.addEventListener("mousedown", ge, !0), window.addEventListener("keydown", Be, !0), window.addEventListener("resize", Re);
    }), Hs(() => {
      document.removeEventListener("mousedown", ge, !0), window.removeEventListener("keydown", Be, !0), window.removeEventListener("resize", Re);
    }), Fe(
      () => n.modelValue,
      () => {
        const O = p.value;
        O && d.value && !o.panel && q(O);
      },
      { deep: !0 }
    ), (O, U) => (m(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", Pk, [
        u("span", Ek, A(e.label), 1),
        u("div", Ik, [
          (m(!0), k(ee, null, le(e.filterDefinitions, (se) => (m(), k("button", {
            key: `pill-${se.id}`,
            ref_for: !0,
            ref: (ve) => _(se.id, ve),
            type: "button",
            class: G(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", P(se)]),
            "aria-label": j(se),
            "aria-expanded": c.value === se.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === se.id ? i : void 0,
            onClick: (ve) => W(se, ve)
          }, [
            E(T(Bk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", Ok, A(se.label), 1),
            se.type === "select" && I(se) > 0 ? (m(), k("span", Vk, A(I(se)), 1)) : V("", !0)
          ], 10, Rk))), 128))
        ])
      ]),
      C.value ? (m(), k("div", zk, [
        u("div", Nk, [
          (m(!0), k(ee, null, le(D.value, (se) => (m(), k("div", {
            key: se.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": K(se),
              onClick: (ve) => re(se.def, ve)
            }, [
              Se(O.$slots, "formatChip", {
                filter: se.def,
                value: w(se.def.id),
                optionValue: se.kind === "select" ? se.optionValue : void 0
              }, () => [
                $e(A(L(se)), 1)
              ], !0)
            ], 8, Wk),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": N(se),
              onClick: (ve) => be(se)
            }, [
              E(T(Lk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, jk)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": fe.value,
          onClick: Y
        }, A(e.clearLabel), 9, Hk)
      ])) : V("", !0),
      (m(), Z(Wa, { to: "body" }, [
        c.value && d.value ? (m(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": z.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: xe(h.value),
          onKeydown: U[3] || (U[3] = ot(() => {
          }, ["stop"]))
        }, [
          p.value ? (m(), k(ee, { key: 0 }, [
            O.$slots.panel ? Se(O.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: ie,
              value: b.value,
              updateValue: ce
            }, void 0, !0) : (m(), k("div", Kk, [
              p.value.type === "text" ? (m(), k(ee, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(p.value.label), 9, Uk),
                Xe(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": U[0] || (U[0] = (se) => v.value = se),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: Sn(ot(ie, ["prevent"]), ["enter"])
                }, null, 40, qk), [
                  [qt, v.value]
                ])
              ], 64)) : p.value.type === "select" ? (m(), k(ee, { key: 1 }, [
                u("p", Xk, A(p.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), k(ee, null, le(p.value.options, (se) => (m(), k("li", {
                    key: se.value
                  }, [
                    u("label", Zk, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(se.value),
                        onChange: (ve) => te(se.value)
                      }, null, 40, Qk),
                      u("span", Jk, A(se.label), 1)
                    ])
                  ]))), 128))
                ], 8, Gk)
              ], 64)) : p.value.type === "dateRange" ? (m(), k(ee, { key: 2 }, [
                u("p", e2, A(p.value.label), 1),
                u("div", t2, [
                  u("div", n2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, a2),
                    Xe(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": U[1] || (U[1] = (se) => y.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, o2), [
                      [qt, y.value]
                    ])
                  ]),
                  u("div", s2, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, i2),
                    Xe(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": U[2] || (U[2] = (se) => x.value = se),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, l2), [
                      [qt, x.value]
                    ])
                  ])
                ])
              ], 64)) : V("", !0)
            ]))
          ], 64)) : V("", !0)
        ], 44, Yk)) : V("", !0)
      ]))
    ], 8, Fk));
  }
}), c2 = /* @__PURE__ */ de(r2, [["__scopeId", "data-v-f38e0100"]]), nt = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", dt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", d2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", _t = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", u2 = { class: "font-sans" }, h2 = ["for"], f2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], g2 = ["id"], p2 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = ua(), s = Ks("$pcForm", null), i = `kiut-input-text-${je()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? o.name ?? ""), d = oe(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (p) => {
        d.value = p ?? "";
      }
    ), tt(() => {
      s && c.value && s.register?.(c.value, {});
    }), ht(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), g = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function v(p) {
      const b = p.target.value;
      d.value = b, a("update:modelValue", b);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(p);
    }
    function f(p) {
      const b = s?.fields?.[c.value]?.props;
      b?.onChange && b.onChange(p);
    }
    function y(p) {
      const b = s?.fields?.[c.value]?.props;
      b?.onBlur && b.onBlur(p);
    }
    const x = $(() => {
      const { name: p, id: b, type: _, ...w } = o;
      return w;
    });
    return (p, b) => (m(), k("div", u2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: G(T(nt))
      }, A(e.label), 11, h2)) : V("", !0),
      u("input", ln(x.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [T(dt), g.value ? T(Dt) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": g.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: v,
        onChange: f,
        onBlur: y
      }), null, 16, f2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, g2)) : V("", !0)
    ]));
  }
}), m2 = { class: "font-sans" }, b2 = ["for"], v2 = { class: "relative" }, y2 = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], _2 = ["aria-label"], x2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, k2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, w2 = ["id"], C2 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = ua(), s = Ks("$pcForm", null), i = `kiut-input-password-${je()}`, l = $(() => n.id ?? i), r = $(() => `${l.value}-err`), c = $(() => n.name ?? o.name ?? ""), d = oe(!1), h = oe(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (b) => {
        b !== void 0 && b !== h.value && (h.value = b);
      }
    ), tt(() => {
      s && c.value && s.register?.(c.value, {});
    }), ht(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const g = $(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), v = $(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function f(b) {
      const _ = b.target.value;
      h.value = _, a("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(b);
    }
    function y(b) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(b);
    }
    function x(b) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(b);
    }
    const p = $(() => {
      const { name: b, id: _, ...w } = o;
      return w;
    });
    return (b, _) => (m(), k("div", m2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: G(T(nt))
      }, A(e.label), 11, b2)) : V("", !0),
      u("div", v2, [
        u("input", ln(p.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [T(dt), v.value ? T(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: g.value,
          "aria-invalid": v.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: f,
          onChange: y,
          onBlur: x
        }), null, 16, y2),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (m(), k("svg", k2, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (m(), k("svg", x2, [..._[1] || (_[1] = [
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
        ], 8, _2)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, w2)) : V("", !0)
    ]));
  }
}), $2 = { class: "font-sans" }, S2 = ["for"], M2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], D2 = ["id"], A2 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-input-textarea-${je()}`, s = $(() => n.id ?? o), i = $(() => `${s.value}-err`), l = $({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (m(), k("div", $2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: G(T(nt))
      }, A(e.label), 11, S2)) : V("", !0),
      Xe(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: G([T(d2), e.invalid ? T(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, M2), [
        [qt, l.value]
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, D2)) : V("", !0)
    ]));
  }
}), T2 = { class: "font-sans" }, B2 = ["for"], L2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], F2 = ["for"], P2 = ["title"], E2 = ["aria-label"], I2 = ["id"], R2 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-input-file-${je()}`, s = $(() => n.id ?? o), i = $(() => `${s.value}-err`), l = oe(null), r = $(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const v = h.target.files?.[0] ?? null;
      a("update:modelValue", v);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, g) => (m(), k("div", T2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: G(T(nt))
      }, A(e.label), 11, B2)) : V("", !0),
      u("div", {
        class: G([
          T(dt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? T(Dt) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        u("input", {
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
        }, null, 40, L2),
        u("label", {
          for: s.value,
          class: G(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          E(T(yp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          $e(" " + A(e.chooseLabel), 1)
        ], 10, F2),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, A(r.value), 9, P2),
        e.modelValue && !e.disabled ? (m(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          E(T(Ki), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, E2)) : V("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, I2)) : V("", !0)
    ]));
  }
}), O2 = { class: "font-sans" }, V2 = ["for"], z2 = { class: "relative" }, N2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], W2 = ["id"], j2 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-input-datetime-${je()}`, s = $(() => n.id ?? o), i = $(() => `${s.value}-err`), l = $(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (m(), k("div", O2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: G(T(nt))
      }, A(e.label), 11, V2)) : V("", !0),
      u("div", z2, [
        E(T(ho), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: G([
            T(dt),
            "pl-10",
            e.invalid ? T(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, N2)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, W2)) : V("", !0)
    ]));
  }
}), H2 = { class: "font-sans" }, Y2 = ["for"], K2 = { class: "relative" }, U2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], q2 = ["id"], X2 = /* @__PURE__ */ ae({
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
      const g = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!g) return null;
      const v = Number(g[1]), f = Number(g[2]);
      return !Number.isInteger(v) || !Number.isInteger(f) || v < 0 || v > 23 || f < 0 || f > 59 ? null : `${String(v).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${je()}`, l = $(() => o.id ?? i), r = $(() => `${l.value}-err`), c = $(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const g = h.target.value;
      s("update:modelValue", a(g));
    }
    return (h, g) => (m(), k("div", H2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: G(T(nt))
      }, A(e.label), 11, Y2)) : V("", !0),
      u("div", K2, [
        E(T(xp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: G([
            T(dt),
            "pl-10",
            e.invalid ? T(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, U2)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, q2)) : V("", !0)
    ]));
  }
}), G2 = { class: "font-sans" }, Z2 = ["for"], Q2 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, J2 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], ew = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, tw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, nw = { class: "min-w-0 text-left leading-snug" }, aw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, ow = { class: "min-w-0 text-right leading-snug" }, sw = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, iw = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, lw = ["id"], rw = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-input-range-${je()}`, s = $(() => n.id ?? o), i = $(() => `${s.value}-err`), l = $(() => {
      const v = [];
      return n.errorText && v.push(i.value), v.length ? v.join(" ") : void 0;
    }), r = $(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = $(() => !!(n.captionMin || n.captionMax)), d = $(() => {
      const { min: v, max: f, modelValue: y } = n;
      if (f === v) return 0;
      const x = (y - v) / (f - v);
      return Math.min(100, Math.max(0, x * 100));
    }), h = $(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function g(v) {
      const f = Number(v.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (v, f) => (m(), k("div", G2, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: G(T(nt))
      }, A(e.label), 11, Z2)) : V("", !0),
      u("div", {
        class: G(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), k("p", Q2, A(e.captionMax), 1)) : V("", !0),
        u("div", {
          class: G(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: xe(h.value)
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
            "aria-describedby": l.value,
            class: G([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: g
          }, null, 42, J2)
        ], 6),
        e.orientation === "horizontal" && r.value ? (m(), k("p", ew, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (m(), k("div", tw, [
          u("span", nw, A(e.captionMin), 1),
          u("span", aw, A(e.caption), 1),
          u("span", ow, A(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), k("p", sw, A(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (m(), k("p", iw, A(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, lw)) : V("", !0)
    ]));
  }
}), cw = /* @__PURE__ */ de(rw, [["__scopeId", "data-v-a1343418"]]), dw = { class: "font-sans" }, uw = ["for"], hw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], fw = ["id"], gw = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-input-number-${je()}`, s = $(() => n.id ?? o), i = $(() => `${s.value}-err`), l = $(() => {
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
      const g = Number(h);
      a("update:modelValue", Number.isNaN(g) ? null : g);
    }
    return (d, h) => (m(), k("div", dw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: G(T(nt))
      }, A(e.label), 11, uw)) : V("", !0),
      u("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: G([
          T(dt),
          e.invalid ? T(Dt) : "",
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
      }, null, 42, hw),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, fw)) : V("", !0)
    ]));
  }
}), pw = { class: "font-sans" }, mw = ["for"], bw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], vw = ["disabled"], yw = ["id"], _w = "#3b82f6", xw = "#aabbcc", kw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", ww = /* @__PURE__ */ ae({
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
    function n(f) {
      const y = f.trim(), x = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (x) return `#${x[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (p) {
        const [b, _, w] = p[1].split("");
        return `#${b}${b}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? _w;
    }
    const o = e, s = t, i = `kiut-input-color-${je()}`, l = $(() => o.id ?? i), r = $(() => `${l.value}-err`), c = $(() => a(o.modelValue)), d = oe(c.value), h = oe(!1);
    Fe(c, (f) => {
      h.value || (d.value = f);
    });
    function g(f) {
      const y = f.target, x = n(y.value);
      x && s("update:modelValue", x);
    }
    function v() {
      h.value = !1;
      const f = n(d.value);
      f ? (d.value = f, s("update:modelValue", f)) : d.value = c.value;
    }
    return Fe(d, (f) => {
      if (!h.value) return;
      const y = n(f);
      y && s("update:modelValue", y);
    }), (f, y) => (m(), k("div", pw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: l.value,
        class: G(T(nt))
      }, A(e.label), 11, mw)) : V("", !0),
      u("div", {
        class: G([
          kw,
          e.invalid ? T(Dt) : "",
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
          onInput: g
        }, null, 40, bw),
        e.showHexInput ? Xe((m(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (x) => d.value = x),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: xw,
          onFocus: y[1] || (y[1] = (x) => h.value = !0),
          onBlur: v
        }, null, 40, vw)), [
          [qt, d.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: r.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, yw)) : V("", !0)
    ]));
  }
});
function al(e, t) {
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
const Cw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], $w = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, Sw = ["placeholder", "aria-label"], Mw = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Dw = ["aria-selected", "onClick", "onMouseenter"], Aw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Tw = { class: "min-w-0 flex-1" }, ol = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-select-${je()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(null), h = oe(null), g = oe(null), v = oe(!1), f = oe(0), y = oe(""), x = oe({});
    function p() {
      const W = c.value;
      if (!W) return;
      const X = W.getBoundingClientRect();
      x.value = {
        top: `${X.bottom - 3}px`,
        left: `${X.left}px`,
        width: `${X.width}px`
      };
    }
    const b = $(() => n.options.filter((W) => !W.disabled)), _ = $(() => {
      if (!n.searchable) return b.value;
      const W = y.value.trim().toLowerCase();
      return W ? b.value.filter((X) => X.label.toLowerCase().includes(W)) : b.value;
    }), w = $(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), S = $(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((X) => X.value === n.modelValue)?.label ?? String(n.modelValue));
    function M(W) {
      return `${String(W.value)}-${W.label}`;
    }
    function C(W) {
      return n.modelValue === W.value;
    }
    function D(W, X) {
      const Q = C(W), ce = f.value === X;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        Q ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !Q && ce ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function I() {
      f.value = Math.max(
        0,
        _.value.findIndex((W) => W.value === n.modelValue)
      );
    }
    function F() {
      if (n.searchable) {
        g.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function L() {
      p(), y.value = "", I(), ze(() => F());
    }
    function R() {
      v.value = !1, y.value = "";
    }
    function P(W) {
      a("update:modelValue", W.value), R();
    }
    function j() {
      if (!n.disabled) {
        if (v.value) {
          R();
          return;
        }
        v.value = !0, L();
      }
    }
    function q(W) {
      W.stopPropagation(), !n.disabled && j();
    }
    function H(W) {
      if (!v.value) return;
      const X = W.target, Q = r.value, ce = d.value;
      Q && !Q.contains(X) && (!ce || !ce.contains(X)) && R();
    }
    function te(W) {
      n.disabled || (W.key === "ArrowDown" || W.key === "Enter" || W.key === " ") && (W.preventDefault(), v.value || (v.value = !0, L()));
    }
    function ne(W) {
      const X = _.value;
      if (W.key === "Escape") {
        W.preventDefault(), R();
        return;
      }
      if (W.key === "ArrowDown") {
        if (W.preventDefault(), X.length === 0) return;
        f.value = 0, h.value?.focus();
        return;
      }
      if (W.key === "ArrowUp") {
        if (W.preventDefault(), X.length === 0) return;
        f.value = X.length - 1, h.value?.focus();
        return;
      }
      if (W.key === "Enter") {
        W.preventDefault();
        const Q = X[f.value];
        Q && P(Q);
      }
    }
    function re(W) {
      const X = _.value;
      if (W.key === "Escape") {
        W.preventDefault(), R();
        return;
      }
      if (X.length !== 0) {
        if (W.key === "ArrowDown") {
          W.preventDefault(), f.value = Math.min(f.value + 1, X.length - 1);
          return;
        }
        if (W.key === "ArrowUp") {
          if (W.preventDefault(), f.value === 0 && n.searchable) {
            g.value?.focus();
            return;
          }
          f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (W.key === "Enter") {
          W.preventDefault();
          const Q = X[f.value];
          Q && P(Q);
        }
      }
    }
    return Fe(y, () => {
      f.value = 0;
    }), tt(() => {
      document.addEventListener("click", H);
    }), ht(() => {
      document.removeEventListener("click", H);
    }), (W, X) => (m(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: G(T(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(dt),
          "flex items-center justify-between gap-2 text-left",
          v.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": v.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: q,
        onKeydown: te
      }, [
        u("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(S.value), 3),
        E(T(ji), {
          class: G(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", v.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Cw),
      (m(), Z(Wa, { to: "body" }, [
        Xe(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: xe(x.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (m(), k("div", $w, [
            Xe(u("input", {
              ref_key: "searchInputRef",
              ref: g,
              "onUpdate:modelValue": X[0] || (X[0] = (Q) => y.value = Q),
              type: "search",
              class: G([T(dt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: X[1] || (X[1] = ot(() => {
              }, ["stop"])),
              onKeydown: ot(ne, ["stop"])
            }, null, 42, Sw), [
              [qt, y.value]
            ])
          ])) : V("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: ot(re, ["stop"])
          }, [
            _.value.length === 0 ? (m(), k("li", Mw, A(e.noResultsText), 1)) : V("", !0),
            (m(!0), k(ee, null, le(_.value, (Q, ce) => (m(), k("li", {
              key: M(Q),
              role: "option",
              "aria-selected": C(Q),
              class: G(D(Q, ce)),
              onClick: ot((ie) => P(Q), ["stop"]),
              onMouseenter: (ie) => f.value = ce
            }, [
              e.showOptionCheck ? (m(), k("span", Aw, [
                C(Q) ? (m(), Z(T(al), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ])) : V("", !0),
              u("span", Tw, A(Q.label), 1)
            ], 42, Dw))), 128))
          ], 544)
        ], 4), [
          [sn, v.value]
        ])
      ]))
    ], 512));
  }
}), Bw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Lw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Fw = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Pw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, Ew = { class: "truncate" }, Iw = ["aria-selected", "onClick", "onMouseenter"], Rw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Ow = { class: "min-w-0 flex-1" }, Vw = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-multiselect-${je()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(!1), h = oe(0), g = $(() => n.options.filter((F) => !F.disabled)), v = $(() => new Set(n.modelValue ?? [])), f = $(
      () => n.options.filter((F) => v.value.has(F.value))
    ), y = $(() => {
      const F = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", L = f.value.length;
      return L === 0 ? F : `${F}, ${L} seleccionada${L === 1 ? "" : "s"}`;
    });
    function x(F) {
      return `${String(F.value)}-${F.label}`;
    }
    function p(F) {
      return v.value.has(F.value);
    }
    function b(F, L) {
      const R = p(F), P = h.value === L;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        R ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !R && P ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(F) {
      const L = [...n.modelValue ?? []], R = L.indexOf(F.value);
      R >= 0 ? L.splice(R, 1) : L.push(F.value), a("update:modelValue", L);
    }
    function w() {
      const F = g.value;
      if (F.length === 0) {
        h.value = 0;
        return;
      }
      const L = v.value, R = F.findIndex((P) => L.has(P.value));
      h.value = R >= 0 ? R : 0;
    }
    function S() {
      n.disabled || (d.value = !d.value);
    }
    function M(F) {
      F.stopPropagation(), !n.disabled && (S(), d.value && (w(), ze(() => c.value?.focus())));
    }
    function C(F) {
      if (!d.value) return;
      const L = r.value;
      L && !L.contains(F.target) && (d.value = !1);
    }
    function D(F) {
      n.disabled || (F.key === "ArrowDown" || F.key === "Enter" || F.key === " ") && (F.preventDefault(), d.value || (d.value = !0, w(), ze(() => c.value?.focus())));
    }
    function I(F) {
      const L = g.value;
      if (L.length !== 0) {
        if (F.key === "Escape") {
          F.preventDefault(), d.value = !1;
          return;
        }
        if (F.key === "ArrowDown") {
          F.preventDefault(), h.value = Math.min(h.value + 1, L.length - 1);
          return;
        }
        if (F.key === "ArrowUp") {
          F.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (F.key === "Enter" || F.key === " ") {
          F.preventDefault();
          const R = L[h.value];
          R && _(R);
        }
      }
    }
    return tt(() => {
      document.addEventListener("click", C);
    }), ht(() => {
      document.removeEventListener("click", C);
    }), (F, L) => (m(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: G(T(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: G([
          T(dt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: M,
        onKeydown: D
      }, [
        u("div", Lw, [
          f.value.length === 0 ? (m(), k("span", Fw, A(e.placeholder), 1)) : (m(), k("div", Pw, [
            (m(!0), k(ee, null, le(f.value, (R) => (m(), k("span", {
              key: x(R),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", Ew, A(R.label), 1)
            ]))), 128))
          ]))
        ]),
        E(T(ji), {
          class: G(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Bw),
      Xe(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: ot(I, ["stop"])
      }, [
        (m(!0), k(ee, null, le(g.value, (R, P) => (m(), k("li", {
          key: x(R),
          role: "option",
          "aria-selected": p(R),
          class: G(b(R, P)),
          onClick: ot((j) => _(R), ["stop"]),
          onMouseenter: (j) => h.value = P
        }, [
          u("span", Rw, [
            p(R) ? (m(), Z(T(al), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          u("span", Ow, A(R.label), 1)
        ], 42, Iw))), 128))
      ], 544), [
        [sn, d.value]
      ])
    ], 512));
  }
}), zw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Nw = { class: "sr-only" }, Ww = /* @__PURE__ */ ae({
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
    return (s, i) => (m(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: G([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        Sn(ot(o, ["prevent", "stop"]), ["space"]),
        Sn(ot(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: G(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", Nw, A(e.ariaLabel), 1)
    ], 42, zw));
  }
}), jw = { class: "font-sans" }, Hw = ["for"], Yw = { class: "flex gap-2" }, Kw = { class: "w-[7.5rem] shrink-0" }, Uw = { class: "min-w-0 flex-1" }, qw = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Xw = ["id"], Gw = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = `kiut-phone-${je()}`, s = $(() => n.id ?? `${o}-num`), i = $(() => `${s.value}-err`), l = $({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = $({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (m(), k("div", jw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: G(T(nt))
      }, A(e.label), 11, Hw)) : V("", !0),
      u("div", Yw, [
        u("div", Kw, [
          E(ol, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", Uw, [
          Xe(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: G([T(dt), e.invalid ? T(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, qw), [
            [qt, r.value]
          ])
        ])
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: G(T(_t)),
        role: "alert"
      }, A(e.errorText), 11, Xw)) : V("", !0)
    ]));
  }
}), Zw = ["role", "aria-label"], Qw = { class: "flex flex-wrap gap-2" }, Jw = ["aria-checked", "role", "onClick"], e5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, t5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, n5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, a5 = /* @__PURE__ */ ae({
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
    const n = e, a = t, o = $(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function s(r) {
      return n.multiple ? o.value.includes(r.value) : n.modelValue === r.value;
    }
    function i(r) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        s(r) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
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
      u("div", Qw, [
        (m(!0), k(ee, null, le(e.items, (d) => (m(), k("button", {
          key: d.value,
          type: "button",
          class: G(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", e5, [
            s(d) ? (m(), k("span", t5)) : V("", !0)
          ]),
          d.dotColor ? (m(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: xe({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", n5, A(d.label), 1)
        ], 10, Jw))), 128))
      ])
    ], 8, Zw));
  }
}), o5 = ["aria-label"], s5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], i5 = { class: "truncate px-3 py-2 text-sm font-medium" }, l5 = /* @__PURE__ */ ae({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${je()}`, s = (y) => `${o}-seg-${y}`, i = oe([]);
    function l(y, x) {
      y instanceof HTMLButtonElement ? i.value[x] = y : i.value[x] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const x = r(y), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${p} cursor-not-allowed opacity-40` : x ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, x, p) {
      d(y), ze(() => i.value[x]?.focus());
    }
    const g = $(
      () => n.items.map((y, x) => y.disabled ? -1 : x).filter((y) => y >= 0)
    );
    function v(y, x) {
      const p = n.items.length;
      if (p === 0) return 0;
      let b = y;
      for (let _ = 0; _ < p; _++)
        if (b = (b + x + p) % p, !n.items[b]?.disabled) return b;
      return y;
    }
    function f(y, x) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const p = v(x, 1), b = n.items[p];
        b && d(b), ze(() => i.value[p]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const p = v(x, -1), b = n.items[p];
        b && d(b), ze(() => i.value[p]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const p = g.value[0];
        if (p !== void 0) {
          const b = n.items[p];
          b && d(b), ze(() => i.value[p]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const p = g.value[g.value.length - 1];
        if (p !== void 0) {
          const b = n.items[p];
          b && d(b), ze(() => i.value[p]?.focus());
        }
      }
    }
    return (y, x) => (m(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), k(ee, null, le(e.items, (p, b) => (m(), k("button", {
        id: s(p.value),
        key: p.value,
        ref_for: !0,
        ref: (_) => l(_, b),
        type: "button",
        role: "tab",
        "aria-selected": r(p),
        "aria-disabled": p.disabled === !0,
        tabindex: r(p) ? 0 : -1,
        class: G(c(p)),
        onClick: (_) => h(p, b),
        onKeydown: (_) => f(_, b)
      }, [
        u("span", i5, A(p.label), 1)
      ], 42, s5))), 128))
    ], 8, o5));
  }
}), r5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, c5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, d5 = {
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
}, u5 = {
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
}, h5 = [
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
function f5(e = "en") {
  return r5[e];
}
function sl(e = "en") {
  return h5.map((t) => ({ id: t, label: u5[e][t] }));
}
function g5(e = "en") {
  return "Presets";
}
sl("es");
function Ke(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function Je(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function Ee(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function St(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function En(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function p5(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ee(n);
}
function vn(e, t) {
  return p5(e, -t);
}
function m5(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function il(e, t = /* @__PURE__ */ new Date()) {
  const n = Ee(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = vn(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: vn(n, 6), end: n };
    case "last14":
      return { start: vn(n, 13), end: n };
    case "last30":
      return { start: vn(n, 29), end: n };
    case "last90":
      return { start: vn(n, 89), end: n };
    case "thisMonth":
      return { start: St(n), end: n };
    case "lastMonth": {
      const a = St(En(n, -1));
      return { start: a, end: m5(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function ll(e, t, n) {
  let a = Ee(e.start), o = Ee(e.end);
  if (t) {
    const s = Ee(Ke(t));
    Ot(a, s) && (a = s), Ot(o, s) && (o = s);
  }
  if (n) {
    const s = Ee(Ke(n));
    Ba(a, s) && (a = s), Ba(o, s) && (o = s);
  }
  return Ba(a, o) ? { start: o, end: a } : { start: a, end: o };
}
function b5(e, t, n = /* @__PURE__ */ new Date(), a, o) {
  if (!e.start || !e.end) return !1;
  const s = ll(il(t, n), a, o);
  return Je(s.start) === e.start && Je(s.end) === e.end;
}
function Rn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Et(e, t) {
  return Rn(e, t) === 0;
}
function Ot(e, t) {
  return Rn(e, t) < 0;
}
function Ba(e, t) {
  return Rn(e, t) > 0;
}
function rl(e, t) {
  return Rn(e, t) >= 0;
}
function cl(e, t) {
  return Rn(e, t) <= 0;
}
function dl(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function da(e, t = "en") {
  return `${c5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function It(e, t = "en") {
  return `${d5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const v5 = ["aria-expanded", "aria-labelledby", "aria-label"], y5 = ["onKeydown"], _5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, x5 = { class: "mb-4 flex items-center justify-between gap-2" }, k5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, w5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, C5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, $5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, S5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, M5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, D5 = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, A5 = { class: "grid grid-cols-7 gap-y-2 mt-2" }, T5 = ["disabled", "onClick"], B5 = "rounded-lg text-[#61616b]", L5 = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", F5 = "opacity-30", P5 = "bg-[#6b35e9] font-medium text-white", E5 = "bg-[#895af6] font-semibold text-white", I5 = /* @__PURE__ */ ae({
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
    const n = e, a = t, s = `${`kiut-drp-${je()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(St(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), g = $(() => {
      const L = St(d.value);
      return [L, En(L, 1)];
    }), v = $(() => n.ariaLabel ?? n.placeholder), f = $(() => {
      const L = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${L}` : `left-0 right-auto ${L}`;
    }), y = $(
      () => `${It(g.value[0])} – ${It(g.value[1])}`
    ), x = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const L = Ke(n.modelValue.start), R = Ke(n.modelValue.end);
      return `${da(L)} – ${da(R)}`;
    });
    function b(L, R) {
      return L.getMonth() === R.getMonth() && L.getFullYear() === R.getFullYear();
    }
    function _(L) {
      const R = Ee(L);
      if (n.minDate) {
        const P = Ee(Ke(n.minDate));
        if (Ot(R, P)) return !0;
      }
      if (n.maxDate) {
        const P = Ee(Ke(n.maxDate));
        if (Ot(P, R)) return !0;
      }
      return !1;
    }
    function w(L, R, P) {
      const j = Et(L, R), q = Et(L, P);
      if (j && q) return "rounded-lg";
      const H = j || L.getDay() === 0, te = q || L.getDay() === 6;
      return H && te ? "rounded-lg" : H ? "rounded-l-lg" : te ? "rounded-r-lg" : "rounded-none";
    }
    function S(L, R) {
      const P = b(R, L), j = _(R), q = n.modelValue.start ? Ee(Ke(n.modelValue.start)) : null, H = n.modelValue.end ? Ee(Ke(n.modelValue.end)) : null, te = Ee(R);
      if (j)
        return B5;
      let ne = L5;
      if (q && H && rl(te, q) && cl(te, H)) {
        const W = Et(te, q), X = Et(te, H);
        ne = `${w(te, q, H)} ${W || X ? E5 : P5}`;
      }
      return P || (ne = `${ne} ${F5}`), ne;
    }
    function M(L) {
      if (_(L)) return;
      const R = Ee(L);
      if (!c.value) {
        c.value = new Date(R), a("update:modelValue", { start: Je(R), end: Je(R) });
        return;
      }
      let j = Ee(c.value), q = new Date(R);
      Ot(q, j) && ([j, q] = [q, j]), a("update:modelValue", { start: Je(j), end: Je(q) }), c.value = null, r.value = !1;
    }
    function C(L) {
      d.value = En(d.value, L);
    }
    function D() {
      r.value = !1;
    }
    function I(L) {
      if (L?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = St(Ke(n.modelValue.start));
          } catch {
          }
        ze(() => l.value?.focus());
      }
    }
    function F(L) {
      if (!r.value) return;
      const R = i.value;
      R && !R.contains(L.target) && (r.value = !1);
    }
    return Fe(r, (L) => {
      L && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", F);
    }), ht(() => {
      document.removeEventListener("click", F);
    }), (L, R) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: G(T(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: G([
          T(dt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onFocus: I,
        onClick: I
      }, [
        E(T(ho), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(p.value), 3)
      ], 42, v5),
      Xe(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: G([
          f.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Sn(ot(D, ["stop"]), ["escape"])
      }, [
        u("div", _5, [
          u("div", x5, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: R[0] || (R[0] = (P) => C(-1))
            }, [
              E(T(Hi), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", k5, [
              u("span", w5, A(y.value), 1),
              u("div", C5, [
                u("span", $5, A(T(It)(g.value[0])), 1),
                u("span", S5, A(T(It)(g.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: R[1] || (R[1] = (P) => C(1))
            }, [
              E(T(Yi), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", M5, [
            (m(!0), k(ee, null, le(g.value, (P) => (m(), k("div", {
              key: `${P.getFullYear()}-${P.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", D5, [
                (m(), k(ee, null, le(x, (j) => u("span", { key: j }, A(j), 1)), 64))
              ]),
              u("div", A5, [
                (m(!0), k(ee, null, le(T(dl)(P), (j) => (m(), k("button", {
                  key: T(Je)(j),
                  type: "button",
                  disabled: _(j),
                  class: G(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", S(P, j)]),
                  onClick: (q) => M(j)
                }, A(j.getDate()), 11, T5))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, y5), [
        [sn, r.value]
      ])
    ], 512));
  }
}), R5 = ["aria-expanded", "aria-labelledby", "aria-label"], O5 = ["aria-label", "onKeydown"], V5 = { class: "flex flex-col sm:flex-row" }, z5 = ["aria-label"], N5 = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, W5 = { class: "flex flex-col gap-0.5" }, j5 = ["onClick"], H5 = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, Y5 = { class: "mb-4 flex items-center justify-between gap-2" }, K5 = ["aria-label"], U5 = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, q5 = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, X5 = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, G5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, Z5 = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, Q5 = ["aria-label"], J5 = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, eC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, tC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, nC = ["disabled", "onClick"], aC = "rounded-lg text-[#61616b]", oC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", sC = "opacity-30", iC = "bg-[#6b35e9] font-medium text-white", lC = "bg-[#895af6] font-semibold text-white", rC = /* @__PURE__ */ ae({
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
    const n = e, a = t, s = `${`kiut-dpp-${je()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(St(/* @__PURE__ */ new Date())), h = $(() => !!(n.modelValue.start && n.modelValue.end)), g = $(() => {
      const W = St(d.value);
      return [W, En(W, 1)];
    }), v = $(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), f = $(() => n.ariaLabel ?? v.value), y = $(() => sl(n.locale)), x = $(() => g5(n.locale)), p = $(() => f5(n.locale)), b = $(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = $(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = $(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), S = $(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), M = $(() => {
      const W = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${W}` : `left-0 right-auto ${W}`;
    }), C = $(
      () => `${It(g.value[0], n.locale)} – ${It(g.value[1], n.locale)}`
    ), D = $(() => {
      if (!n.modelValue.start || !n.modelValue.end) return v.value;
      const W = Ke(n.modelValue.start), X = Ke(n.modelValue.end);
      return `${da(W, n.locale)} – ${da(X, n.locale)}`;
    });
    function I(W, X) {
      return W.getMonth() === X.getMonth() && W.getFullYear() === X.getFullYear();
    }
    function F(W) {
      const X = Ee(W);
      if (n.minDate) {
        const Q = Ee(Ke(n.minDate));
        if (Ot(X, Q)) return !0;
      }
      if (n.maxDate) {
        const Q = Ee(Ke(n.maxDate));
        if (Ot(Q, X)) return !0;
      }
      return !1;
    }
    function L(W, X, Q) {
      const ce = Et(W, X), ie = Et(W, Q);
      if (ce && ie) return "rounded-lg";
      const we = ce || W.getDay() === 0, be = ie || W.getDay() === 6;
      return we && be ? "rounded-lg" : we ? "rounded-l-lg" : be ? "rounded-r-lg" : "rounded-none";
    }
    function R(W) {
      const X = b5(
        n.modelValue,
        W,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), Q = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return X ? `${Q} font-medium` : Q;
    }
    function P(W, X) {
      const Q = I(X, W), ce = F(X), ie = n.modelValue.start ? Ee(Ke(n.modelValue.start)) : null, we = n.modelValue.end ? Ee(Ke(n.modelValue.end)) : null, be = Ee(X);
      if (ce)
        return aC;
      let Y = oC;
      if (ie && we && rl(be, ie) && cl(be, we)) {
        const N = Et(be, ie), K = Et(be, we);
        Y = `${L(be, ie, we)} ${N || K ? lC : iC}`;
      }
      return Q || (Y = `${Y} ${sC}`), Y;
    }
    function j(W) {
      const X = ll(il(W), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: Je(X.start),
        end: Je(X.end)
      }), d.value = St(X.start), c.value = null, r.value = !1;
    }
    function q(W) {
      if (F(W)) return;
      const X = Ee(W);
      if (!c.value) {
        c.value = new Date(X), a("update:modelValue", { start: Je(X), end: Je(X) });
        return;
      }
      let ce = Ee(c.value), ie = new Date(X);
      Ot(ie, ce) && ([ce, ie] = [ie, ce]), a("update:modelValue", { start: Je(ce), end: Je(ie) }), c.value = null, r.value = !1;
    }
    function H(W) {
      d.value = En(d.value, W);
    }
    function te() {
      r.value = !1;
    }
    function ne(W) {
      if (W.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = St(Ke(n.modelValue.start));
        } catch {
        }
      ze(() => l.value?.focus());
    }
    function re(W) {
      if (!r.value) return;
      const X = i.value;
      X && !X.contains(W.target) && (r.value = !1);
    }
    return Fe(r, (W) => {
      W && (c.value = null);
    }), tt(() => {
      document.addEventListener("click", re);
    }), ht(() => {
      document.removeEventListener("click", re);
    }), (W, X) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: G(T(nt))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: G([
          T(dt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : f.value,
        onClick: ne
      }, [
        E(T(ho), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: G([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(D.value), 3)
      ], 10, R5),
      Xe(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": S.value,
        class: G([
          M.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Sn(ot(te, ["stop"]), ["escape"])
      }, [
        u("div", V5, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": b.value
          }, [
            u("p", N5, A(x.value), 1),
            u("ul", W5, [
              (m(!0), k(ee, null, le(y.value, (Q) => (m(), k("li", {
                key: Q.id
              }, [
                u("button", {
                  type: "button",
                  class: G(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", R(Q.id)]),
                  onClick: (ce) => j(Q.id)
                }, A(Q.label), 11, j5)
              ]))), 128))
            ])
          ], 8, z5),
          u("div", H5, [
            u("div", Y5, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: X[0] || (X[0] = (Q) => H(-1))
              }, [
                E(T(Hi), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, K5),
              u("div", U5, [
                u("span", q5, A(C.value), 1),
                u("div", X5, [
                  u("span", G5, A(T(It)(g.value[0], e.locale)), 1),
                  u("span", Z5, A(T(It)(g.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: X[1] || (X[1] = (Q) => H(1))
              }, [
                E(T(Yi), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, Q5)
            ]),
            u("div", J5, [
              (m(!0), k(ee, null, le(g.value, (Q) => (m(), k("div", {
                key: `${Q.getFullYear()}-${Q.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", eC, [
                  (m(!0), k(ee, null, le(p.value, (ce) => (m(), k("span", { key: ce }, A(ce), 1))), 128))
                ]),
                u("div", tC, [
                  (m(!0), k(ee, null, le(T(dl)(Q), (ce) => (m(), k("button", {
                    key: T(Je)(ce),
                    type: "button",
                    disabled: F(ce),
                    class: G(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", P(Q, ce)]),
                    onClick: (ie) => q(ce)
                  }, A(ce.getDate()), 11, nC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, O5), [
        [sn, r.value]
      ])
    ], 512));
  }
}), cC = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, dC = ["type", "disabled", "aria-label"], uC = {
  key: 1,
  class: "min-w-0 truncate"
}, hC = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, fC = ["type", "disabled", "aria-label"], gC = {
  key: 1,
  class: "min-w-0 truncate"
}, na = /* @__PURE__ */ ae({
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
    const t = e, n = ua(), a = $(() => !!t.tooltip?.trim()), o = $(() => t.variant === "action"), s = $(() => !o.value), i = $(() => {
      const d = n["aria-label"];
      if (typeof d == "string" && d.length > 0) return d;
      if (o.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = $(() => {
      const d = n.type;
      return d === "submit" || d === "reset" || d === "button" ? d : "button";
    }), r = $(() => {
      const { class: d, type: h, "aria-label": g, ...v } = n;
      return v;
    }), c = $(() => t.variant === "primary" ? [
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
    return (d, h) => a.value ? (m(), k("span", cC, [
      u("button", ln({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, T(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, r.value), [
        d.$slots.icon ? (m(), k("span", {
          key: 0,
          class: G(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          Se(d.$slots, "icon")
        ], 2)) : V("", !0),
        s.value ? (m(), k("span", uC, [
          Se(d.$slots, "default")
        ])) : V("", !0)
      ], 16, dC),
      u("span", hC, A(e.tooltip), 1)
    ])) : (m(), k("button", ln({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [c.value, T(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, r.value), [
      d.$slots.icon ? (m(), k("span", {
        key: 0,
        class: G(["inline-flex shrink-0", o.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        Se(d.$slots, "icon")
      ], 2)) : V("", !0),
      s.value ? (m(), k("span", gC, [
        Se(d.$slots, "default")
      ])) : V("", !0)
    ], 16, fC));
  }
}), pC = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, mC = { class: "min-w-0 flex-1 space-y-1" }, bC = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, vC = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, yC = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, _C = /* @__PURE__ */ ae({
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
    const n = e, a = t, s = `${`kiut-modal-${je()}`}-title`, i = oe(null);
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
    ), tt(() => {
      document.addEventListener("keydown", c);
    }), ht(() => {
      document.removeEventListener("keydown", c);
    }), (d, h) => (m(), Z(Wa, { to: "body" }, [
      E(ke, { name: "kiut-modal" }, {
        default: B(() => [
          e.modelValue ? (m(), k("div", pC, [
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
              "aria-labelledby": s,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = ot(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: G(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", mC, [
                  u("h2", {
                    id: s,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (m(), k("p", bC, A(e.subtitle), 1)) : V("", !0)
                ]),
                E(na, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: B(() => [
                    E(T(Ki), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              u("div", vC, [
                Se(d.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", yC, [
                E(na, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: B(() => [
                    $e(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                E(na, {
                  variant: "primary",
                  type: "button",
                  onClick: r
                }, {
                  default: B(() => [
                    $e(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : V("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), xC = /* @__PURE__ */ de(_C, [["__scopeId", "data-v-4ed7bb14"]]), kC = { class: "text-left font-['Inter',system-ui,sans-serif]" }, wC = {
  key: 0,
  class: ""
}, CC = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, $C = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, SC = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, MC = /* @__PURE__ */ ae({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Na(), n = $(() => {
      const a = !!t.filters, o = !!t.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (m(), k("section", kC, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (m(), k("header", wC, [
        a.$slots.description ? (m(), k("div", CC, [
          Se(a.$slots, "description")
        ])) : V("", !0),
        a.$slots.filters || a.$slots.actions ? (m(), k("div", {
          key: 1,
          class: G(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (m(), k("div", $C, [
            Se(a.$slots, "filters")
          ])) : V("", !0),
          a.$slots.actions ? (m(), k("div", SC, [
            Se(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0)
      ])) : V("", !0),
      a.$slots.content || a.$slots.default ? (m(), k("div", {
        key: 1,
        class: G({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        Se(a.$slots, "content", {}, () => [
          Se(a.$slots, "default")
        ])
      ], 2)) : V("", !0)
    ]));
  }
}), DC = { class: "flex flex-1 min-h-0" }, AC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, TC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, BC = ["aria-current", "data-has-active", "title", "onClick"], LC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, FC = { class: "px-4 py-4 shrink-0" }, PC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, EC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, IC = ["data-nav-id", "aria-current", "onClick"], RC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, OC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, VC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, zC = ["data-nav-id", "aria-current", "onClick"], NC = { class: "truncate text-[15px]" }, WC = ["aria-current", "data-has-active", "onClick"], jC = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, HC = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, YC = /* @__PURE__ */ ae({
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
    const n = oe(!1), a = e, o = t, s = ua(), { class: i, ...l } = s, r = oe(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    tt(() => {
      c(), window.addEventListener("resize", c);
    }), ht(() => {
      window.removeEventListener("resize", c);
    });
    const d = $(() => {
      const p = a.sections.find((b) => b.id === a.selectedSectionId);
      return p?.items?.length ? p : null;
    });
    function h(p) {
      return a.activePath ? a.activePath === p.path || a.activePath.startsWith(p.path + "/") : !1;
    }
    function g(p) {
      return p.items?.length ? p.items.some(h) : !a.activePath || !p.path ? !1 : a.activePath === p.path || a.activePath.startsWith(p.path + "/");
    }
    function v(p) {
      if (!p.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: p,
          item: { id: p.id, label: p.label, path: p.path }
        });
        return;
      }
      const b = a.selectedSectionId === p.id ? null : p.id;
      o("update:selectedSectionId", b);
    }
    function f(p, b) {
      o("navigate", { section: p, item: b });
    }
    function y() {
      o("update:selectedSectionId", null);
    }
    function x(p, b) {
      f(p, b), y();
    }
    return (p, b) => r.value ? (m(), k("div", ln({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      E(ke, { name: "ksn-overlay" }, {
        default: B(() => [
          d.value ? (m(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : V("", !0)
        ]),
        _: 1
      }),
      E(ke, { name: "ksn-sheet" }, {
        default: B(() => [
          d.value ? (m(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: xe({ paddingBottom: a.mobileBarHeight })
          }, [
            b[3] || (b[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", RC, [
              u("p", OC, A(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: y
              }, [...b[2] || (b[2] = [
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
            u("nav", VC, [
              (m(!0), k(ee, null, le(d.value.items, (_) => (m(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => x(d.value, _)
              }, [
                _.icon ? (m(), Z(nn(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : V("", !0),
                u("span", NC, A(_.label), 1)
              ], 8, zC))), 128))
            ])
          ], 4)) : V("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: xe({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (m(!0), k(ee, null, le(e.sections, (_) => (m(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": g(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => v(_)
        }, [
          e.selectedSectionId === _.id || g(_) ? (m(), k("span", jC)) : V("", !0),
          _.icon ? (m(), Z(nn(_.icon), {
            key: 1,
            class: "shrink-0",
            style: xe({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : V("", !0),
          u("span", HC, A(_.label), 1)
        ], 8, WC))), 128))
      ], 4)
    ], 16)) : (m(), k("aside", ln({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", DC, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: xe({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: b[0] || (b[0] = (_) => n.value = !0),
          onMouseleave: b[1] || (b[1] = (_) => n.value = !1)
        }, [
          p.$slots.logo ? (m(), k("div", AC, [
            Se(p.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : V("", !0),
          u("nav", TC, [
            (m(!0), k(ee, null, le(e.sections, (_) => (m(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": g(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => v(_)
            }, [
              _.icon ? (m(), Z(nn(_.icon), {
                key: 0,
                class: "shrink-0",
                style: xe({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: xe({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, BC))), 128))
          ]),
          p.$slots.footer ? (m(), k("div", LC, [
            Se(p.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        E(ke, { name: "ksn-sub" }, {
          default: B(() => [
            d.value ? (m(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: xe({ width: e.secondaryWidth })
            }, [
              u("div", FC, [
                u("p", PC, A(d.value.label), 1)
              ]),
              u("nav", EC, [
                (m(!0), k(ee, null, le(d.value.items, (_) => (m(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => f(d.value, _)
                }, [
                  _.icon ? (m(), Z(nn(_.icon), {
                    key: 0,
                    style: xe({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  u("span", {
                    class: "truncate",
                    style: xe({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, IC))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), KC = /* @__PURE__ */ de(YC, [["__scopeId", "data-v-e0ccb96c"]]), a$ = {
  install(e) {
    e.component("KiutChartBar", yt), e.component("KiutChartLine", ft), e.component("KiutPieChart", ma), e.component("KiutBoxplotChart", rf), e.component("KiutCandlestickChart", Xf), e.component("KiutHistogramChart", Ni), e.component("KiutSankeyChart", Nt), e.component("KiutAgentsPerDay", zp), e.component("KiutBookingManager", mm), e.component("KiutCheckin", Ui), e.component("KiutCheckinContainer", M0), e.component("KiutCheckinMetrics", qm), e.component("KiutCheckinSegments", Xi), e.component("KiutDisruption", K0), e.component("KiutFAQ", eb), e.component("KiutMessagesPerAgent", hb), e.component("KiutRecordLocator", qi), e.component("KiutSalesByChannel", Gi), e.component("KiutSeller", Zi), e.component("KiutSellerContainer", ev), e.component("KiutTopAgents", rv), e.component("KiutPaymentMethod", Tv), e.component("KiutAgentHumanConversations", yy), e.component("KiutChannelMetrics", Ay), e.component("KiutTriageCombinations", Hy), e.component("KiutSelectLanguage", Zy), e.component("KiutGuardrails", r1), e.component("KiutDisruptionNotifier", A1), e.component("KiutTotalConversationsCard", T1), e.component("KiutCsatP95Card", B1), e.component("KiutCsatPulseCard", L1), e.component("KiutCSATContainer", d_), e.component("KiutAiGeneratedRevenueCard", u_), e.component("KiutHumanEscalations", $_), e.component("KiutHumanEscalationsCard", S_), e.component("KiutNpsDailyMetrics", el), e.component("KiutNpsMetrics", tl), e.component("KiutNpsOverviewMetrics", Ji), e.component("KiutAWSCost", I_), e.component("KiutCostUsage", U_), e.component("KiutTokenUsage", ox), e.component("KiutConversationCount", px), e.component("KiutTopAgentsAnalysis", Dx), e.component("KiutTopAgentsPie", Ox), e.component("KiutDailyCostTrends", qx), e.component("KiutModelUsage", ck), e.component("KiutMessageRoles", yk), e.component("KiutCostPerConversations", Tk), e.component("Tabs", nl), e.component("Table", Qi), e.component("Filters", c2), e.component("InputText", p2), e.component("InputPassword", C2), e.component("InputTextarea", A2), e.component("InputFile", R2), e.component("InputDateTime", j2), e.component("InputTime", X2), e.component("InputRange", cw), e.component("InputNumber", gw), e.component("InputColorPicker", ww), e.component("Select", ol), e.component("MultiSelect", Vw), e.component("Toggle", Ww), e.component("InputPhone", Gw), e.component("SelectablePills", a5), e.component("SegmentedControl", l5), e.component("DateRangePicker", I5), e.component("DatePickerPresets", rC), e.component("Tag", He), e.component("Button", na), e.component("Modal", xC), e.component("Section", MC), e.component("KiutAppShellNavigation", KC);
  }
};
export {
  I_ as AWSCost,
  yy as AgentHumanConversations,
  zp as AgentsPerDay,
  u_ as AiGeneratedRevenueCard,
  KC as AppShellNavigation,
  mm as BookingManager,
  rf as BoxplotChart,
  na as Button,
  d_ as CSATContainer,
  Xf as CandlestickChart,
  Ay as ChannelMetrics,
  yt as ChartBar,
  ft as ChartLine,
  Ui as Checkin,
  M0 as CheckinContainer,
  qm as CheckinMetrics,
  Xi as CheckinSegments,
  px as ConversationCount,
  Tk as CostPerConversations,
  U_ as CostUsage,
  B1 as CsatP95Card,
  L1 as CsatPulseCard,
  qx as DailyCostTrends,
  rC as DatePickerPresets,
  I5 as DateRangePicker,
  K0 as Disruption,
  A1 as DisruptionNotifier,
  eb as FAQ,
  c2 as Filters,
  r1 as Guardrails,
  Ni as HistogramChart,
  $_ as HumanEscalations,
  S_ as HumanEscalationsCard,
  ww as InputColorPicker,
  j2 as InputDateTime,
  R2 as InputFile,
  gw as InputNumber,
  C2 as InputPassword,
  Gw as InputPhone,
  cw as InputRange,
  p2 as InputText,
  A2 as InputTextarea,
  X2 as InputTime,
  a$ as KiutUIPlugin,
  yk as MessageRoles,
  hb as MessagesPerAgent,
  xC as Modal,
  ck as ModelUsage,
  Vw as MultiSelect,
  el as NpsDailyMetrics,
  tl as NpsMetrics,
  Ji as NpsOverviewMetrics,
  Tv as PaymentMethod,
  ma as PieChart,
  qi as RecordLocator,
  Gi as SalesByChannel,
  Nt as SankeyChart,
  MC as Section,
  l5 as SegmentedControl,
  ol as Select,
  Zy as SelectLanguage,
  a5 as SelectablePills,
  Zi as Seller,
  ev as SellerContainer,
  Qi as Table,
  nl as Tabs,
  He as Tag,
  Ww as Toggle,
  ox as TokenUsage,
  rv as TopAgents,
  Dx as TopAgentsAnalysis,
  Ox as TopAgentsPie,
  T1 as TotalConversationsCard,
  Hy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
