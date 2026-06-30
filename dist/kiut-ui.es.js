import { defineComponent as le, shallowRef as si, h as Ve, ref as oe, onMounted as et, onUnmounted as dt, watch as Fe, toRaw as Ya, nextTick as He, version as Dl, isProxy as ii, computed as C, toRef as Se, openBlock as b, createElementBlock as k, createVNode as z, unref as P, createElementVNode as u, Fragment as se, renderList as fe, normalizeStyle as $e, normalizeClass as te, toDisplayString as D, createCommentVNode as V, onBeforeUnmount as li, createStaticVNode as Mo, useSlots as eo, renderSlot as _e, Transition as gt, withCtx as E, Comment as Tl, createBlock as ee, resolveDynamicComponent as St, createTextVNode as Te, Teleport as _n, withDirectives as nt, withModifiers as je, vModelText as ln, vShow as cn, createSlots as Do, vModelSelect as Al, mergeProps as xt, useAttrs as Ca, withKeys as zn, inject as ri } from "vue";
import * as To from "echarts/core";
import { TooltipComponent as Bl, TitleComponent as Ll } from "echarts/components";
import { SankeyChart as Pl } from "echarts/charts";
import { CanvasRenderer as Rl } from "echarts/renderers";
import Ke from "moment";
function Gn(e) {
  return e + 0.5 | 0;
}
const zt = (e, t, n) => Math.max(Math.min(e, n), t);
function Pn(e) {
  return zt(Gn(e * 2.55), 0, 255);
}
function Yt(e) {
  return zt(Gn(e * 255), 0, 255);
}
function Rt(e) {
  return zt(Gn(e / 2.55) / 100, 0, 1);
}
function Ao(e) {
  return zt(Gn(e * 100), 0, 100);
}
const ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ua = [..."0123456789ABCDEF"], El = (e) => Ua[e & 15], Il = (e) => Ua[(e & 240) >> 4] + Ua[e & 15], Qn = (e) => (e & 240) >> 4 === (e & 15), Fl = (e) => Qn(e.r) && Qn(e.g) && Qn(e.b) && Qn(e.a);
function Ol(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & ht[e[1]] * 17,
    g: 255 & ht[e[2]] * 17,
    b: 255 & ht[e[3]] * 17,
    a: t === 5 ? ht[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: ht[e[1]] << 4 | ht[e[2]],
    g: ht[e[3]] << 4 | ht[e[4]],
    b: ht[e[5]] << 4 | ht[e[6]],
    a: t === 9 ? ht[e[7]] << 4 | ht[e[8]] : 255
  })), n;
}
const Vl = (e, t) => e < 255 ? t(e) : "";
function zl(e) {
  var t = Fl(e) ? El : Il;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Vl(e.a, t) : void 0;
}
const Nl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ci(e, t, n) {
  const a = t * Math.min(n, 1 - n), o = (s, i = (s + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function Hl(e, t, n) {
  const a = (o, s = (o + e / 60) % 6) => n - n * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [a(5), a(3), a(1)];
}
function jl(e, t, n) {
  const a = ci(e, 1, 0.5);
  let o;
  for (t + n > 1 && (o = 1 / (t + n), t *= o, n *= o), o = 0; o < 3; o++)
    a[o] *= 1 - t - n, a[o] += t;
  return a;
}
function Wl(e, t, n, a, o) {
  return e === o ? (t - n) / a + (t < n ? 6 : 0) : t === o ? (n - e) / a + 2 : (e - t) / a + 4;
}
function to(e) {
  const n = e.r / 255, a = e.g / 255, o = e.b / 255, s = Math.max(n, a, o), i = Math.min(n, a, o), l = (s + i) / 2;
  let r, c, d;
  return s !== i && (d = s - i, c = l > 0.5 ? d / (2 - s - i) : d / (s + i), r = Wl(n, a, o, d, s), r = r * 60 + 0.5), [r | 0, c || 0, l];
}
function no(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Yt);
}
function ao(e, t, n) {
  return no(ci, e, t, n);
}
function Kl(e, t, n) {
  return no(jl, e, t, n);
}
function Yl(e, t, n) {
  return no(Hl, e, t, n);
}
function di(e) {
  return (e % 360 + 360) % 360;
}
function Ul(e) {
  const t = Nl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? Pn(+t[5]) : Yt(+t[5]));
  const o = di(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = Kl(o, s, i) : t[1] === "hsv" ? a = Yl(o, s, i) : a = ao(o, s, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function ql(e, t) {
  var n = to(e);
  n[0] = di(n[0] + t), n = ao(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Xl(e) {
  if (!e)
    return;
  const t = to(e), n = t[0], a = Ao(t[1]), o = Ao(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${o}%, ${Rt(e.a)})` : `hsl(${n}, ${a}%, ${o}%)`;
}
const Bo = {
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
}, Lo = {
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
function Gl() {
  const e = {}, t = Object.keys(Lo), n = Object.keys(Bo);
  let a, o, s, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], o = 0; o < n.length; o++)
      s = n[o], l = l.replace(s, Bo[s]);
    s = parseInt(Lo[i], 16), e[l] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Jn;
function Zl(e) {
  Jn || (Jn = Gl(), Jn.transparent = [0, 0, 0, 0]);
  const t = Jn[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Ql = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Jl(e) {
  const t = Ql.exec(e);
  let n = 255, a, o, s;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? Pn(i) : zt(i * 255, 0, 255);
    }
    return a = +t[1], o = +t[3], s = +t[5], a = 255 & (t[2] ? Pn(a) : zt(a, 0, 255)), o = 255 & (t[4] ? Pn(o) : zt(o, 0, 255)), s = 255 & (t[6] ? Pn(s) : zt(s, 0, 255)), {
      r: a,
      g: o,
      b: s,
      a: n
    };
  }
}
function er(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Rt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Ba = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, mn = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function tr(e, t, n) {
  const a = mn(Rt(e.r)), o = mn(Rt(e.g)), s = mn(Rt(e.b));
  return {
    r: Yt(Ba(a + n * (mn(Rt(t.r)) - a))),
    g: Yt(Ba(o + n * (mn(Rt(t.g)) - o))),
    b: Yt(Ba(s + n * (mn(Rt(t.b)) - s))),
    a: e.a + n * (t.a - e.a)
  };
}
function ea(e, t, n) {
  if (e) {
    let a = to(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = ao(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function ui(e, t) {
  return e && Object.assign(t || {}, e);
}
function Po(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Yt(e[3]))) : (t = ui(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Yt(t.a)), t;
}
function nr(e) {
  return e.charAt(0) === "r" ? Jl(e) : Ul(e);
}
class Nn {
  constructor(t) {
    if (t instanceof Nn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = Po(t) : n === "string" && (a = Ol(t) || Zl(t) || nr(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ui(this._rgb);
    return t && (t.a = Rt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Po(t);
  }
  rgbString() {
    return this._valid ? er(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? zl(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Xl(this._rgb) : void 0;
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
    return t && (this._rgb = tr(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Nn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Yt(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Gn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return ea(this._rgb, 2, t), this;
  }
  darken(t) {
    return ea(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ea(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ea(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return ql(this._rgb, t), this;
  }
}
function Bt() {
}
const ar = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Pe(e) {
  return e == null;
}
function qe(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Ae(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function pt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function wt(e, t) {
  return pt(e) ? e : t;
}
function we(e, t) {
  return typeof e > "u" ? t : e;
}
const or = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, hi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Ie(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Re(e, t, n, a) {
  let o, s, i;
  if (qe(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(n, e[o], o);
  else if (Ae(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(n, e[i[o]], i[o]);
}
function pa(e, t) {
  let n, a, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (o = e[n], s = t[n], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function ma(e) {
  if (qe(e))
    return e.map(ma);
  if (Ae(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let o = 0;
    for (; o < a; ++o)
      t[n[o]] = ma(e[n[o]]);
    return t;
  }
  return e;
}
function fi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function sr(e, t, n, a) {
  if (!fi(e))
    return;
  const o = t[e], s = n[e];
  Ae(o) && Ae(s) ? Hn(o, s, a) : t[e] = ma(s);
}
function Hn(e, t, n) {
  const a = qe(t) ? t : [
    t
  ], o = a.length;
  if (!Ae(e))
    return e;
  n = n || {};
  const s = n.merger || sr;
  let i;
  for (let l = 0; l < o; ++l) {
    if (i = a[l], !Ae(i))
      continue;
    const r = Object.keys(i);
    for (let c = 0, d = r.length; c < d; ++c)
      s(r[c], e, i, n);
  }
  return e;
}
function In(e, t) {
  return Hn(e, t, {
    merger: ir
  });
}
function ir(e, t, n) {
  if (!fi(e))
    return;
  const a = t[e], o = n[e];
  Ae(a) && Ae(o) ? In(a, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = ma(o));
}
const Ro = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function lr(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const o of t)
    a += o, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function rr(e) {
  const t = lr(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function dn(e, t) {
  return (Ro[t] || (Ro[t] = rr(t)))(e);
}
function oo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const jn = (e) => typeof e < "u", qt = (e) => typeof e == "function", Eo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function cr(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ee = Math.PI, Ne = 2 * Ee, dr = Ne + Ee, ba = Number.POSITIVE_INFINITY, ur = Ee / 180, Xe = Ee / 2, Jt = Ee / 4, Io = Ee * 2 / 3, gi = Math.log10, Dt = Math.sign;
function Fn(e, t, n) {
  return Math.abs(e - t) < n;
}
function Fo(e) {
  const t = Math.round(e);
  e = Fn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(gi(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function hr(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((o, s) => o - s).pop(), t;
}
function fr(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function Wn(e) {
  return !fr(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function gr(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function pr(e, t, n) {
  let a, o, s;
  for (a = 0, o = e.length; a < o; a++)
    s = e[a][n], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Et(e) {
  return e * (Ee / 180);
}
function mr(e) {
  return e * (180 / Ee);
}
function Oo(e) {
  if (!pt(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function pi(e, t) {
  const n = t.x - e.x, a = t.y - e.y, o = Math.sqrt(n * n + a * a);
  let s = Math.atan2(a, n);
  return s < -0.5 * Ee && (s += Ne), {
    angle: s,
    distance: o
  };
}
function qa(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function br(e, t) {
  return (e - t + dr) % Ne - Ee;
}
function vt(e) {
  return (e % Ne + Ne) % Ne;
}
function Kn(e, t, n, a) {
  const o = vt(e), s = vt(t), i = vt(n), l = vt(s - o), r = vt(i - o), c = vt(o - s), d = vt(o - i);
  return o === s || o === i || a && s === i || l > r && c < d;
}
function Qe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function vr(e) {
  return Qe(e, -32768, 32767);
}
function Nt(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function so(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, o = 0, s;
  for (; a - o > 1; )
    s = o + a >> 1, n(s) ? o = s : a = s;
  return {
    lo: o,
    hi: a
  };
}
const sn = (e, t, n, a) => so(e, n, a ? (o) => {
  const s = e[o][t];
  return s < n || s === n && e[o + 1][t] === n;
} : (o) => e[o][t] < n), yr = (e, t, n) => so(e, n, (a) => e[a][t] >= n);
function xr(e, t, n) {
  let a = 0, o = e.length;
  for (; a < o && e[a] < t; )
    a++;
  for (; o > a && e[o - 1] > n; )
    o--;
  return a > 0 || o < e.length ? e.slice(a, o) : e;
}
const mi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function _r(e, t) {
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
  }), mi.forEach((n) => {
    const a = "_onData" + oo(n), o = e[n];
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
function Vo(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, o = a.indexOf(t);
  o !== -1 && a.splice(o, 1), !(a.length > 0) && (mi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function bi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const vi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function yi(e, t) {
  let n = [], a = !1;
  return function(...o) {
    n = o, a || (a = !0, vi.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function kr(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const io = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ge = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, wr = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Cr(e, t, n) {
  const a = t.length;
  let o = 0, s = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: r } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: f, minDefined: m, maxDefined: g } = i.getUserBounds();
    if (m) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        sn(r, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : sn(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const y = r.slice(0, o + 1).reverse().findIndex((v) => !Pe(v[l.axis]));
        o -= Math.max(0, y);
      }
      o = Qe(o, 0, a - 1);
    }
    if (g) {
      let y = Math.max(
        // @ts-expect-error Need to type _parsed
        sn(r, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : sn(t, d, i.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const v = r.slice(y - 1).findIndex((p) => !Pe(p[l.axis]));
        y += Math.max(0, v);
      }
      s = Qe(y, o, a) - o;
    } else
      s = a - o;
  }
  return {
    start: o,
    count: s
  };
}
function $r(e) {
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
const ta = (e) => e === 0 || e === 1, zo = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ne / n)), No = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ne / n) + 1, On = {
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
  easeInSine: (e) => -Math.cos(e * Xe) + 1,
  easeOutSine: (e) => Math.sin(e * Xe),
  easeInOutSine: (e) => -0.5 * (Math.cos(Ee * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => ta(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => ta(e) ? e : zo(e, 0.075, 0.3),
  easeOutElastic: (e) => ta(e) ? e : No(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return ta(e) ? e : e < 0.5 ? 0.5 * zo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * No(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - On.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? On.easeInBounce(e * 2) * 0.5 : On.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function lo(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ho(e) {
  return lo(e) ? e : new Nn(e);
}
function La(e) {
  return lo(e) ? e : new Nn(e).saturate(0.5).darken(0.1).hexString();
}
const Sr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Mr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Dr(e) {
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
      properties: Mr
    },
    numbers: {
      type: "number",
      properties: Sr
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
function Tr(e) {
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
const jo = /* @__PURE__ */ new Map();
function Ar(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = jo.get(n);
  return a || (a = new Intl.NumberFormat(e, t), jo.set(n, a)), a;
}
function ro(e, t, n) {
  return Ar(t, n).format(e);
}
const Br = {
  values(e) {
    return qe(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let o, s = e;
    if (n.length > 1) {
      const c = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Lr(e, n);
    }
    const i = gi(Math.abs(s)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), r = {
      notation: o,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(r, this.options.ticks.format), ro(e, a, r);
  }
};
function Lr(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var xi = {
  formatters: Br
};
function Pr(e) {
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
      callback: xi.formatters.values,
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
const un = /* @__PURE__ */ Object.create(null), Xa = /* @__PURE__ */ Object.create(null);
function Vn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, o = n.length; a < o; ++a) {
    const s = n[a];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Pa(e, t, n) {
  return typeof t == "string" ? Hn(Vn(e, t), n) : Hn(Vn(e, ""), t);
}
class Rr {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, o) => La(o.backgroundColor), this.hoverBorderColor = (a, o) => La(o.borderColor), this.hoverColor = (a, o) => La(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Pa(this, t, n);
  }
  get(t) {
    return Vn(this, t);
  }
  describe(t, n) {
    return Pa(Xa, t, n);
  }
  override(t, n) {
    return Pa(un, t, n);
  }
  route(t, n, a, o) {
    const s = Vn(this, t), i = Vn(this, a), l = "_" + n;
    Object.defineProperties(s, {
      [l]: {
        value: s[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const r = this[l], c = i[o];
          return Ae(r) ? Object.assign({}, c, r) : we(r, c);
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
var We = /* @__PURE__ */ new Rr({
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
  Dr,
  Tr,
  Pr
]);
function Er(e) {
  return !e || Pe(e.size) || Pe(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Wo(e, t, n, a, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, n.push(o)), s > a && (a = s), a;
}
function en(e, t, n) {
  const a = e.currentDevicePixelRatio, o = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - o) * a) / a + o;
}
function Ko(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Ga(e, t, n, a) {
  _i(e, t, n, a, null);
}
function _i(e, t, n, a, o) {
  let s, i, l, r, c, d, h, f;
  const m = t.pointStyle, g = t.rotation, y = t.radius;
  let v = (g || 0) * ur;
  if (m && typeof m == "object" && (s = m.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(v), e.drawImage(m, -m.width / 2, -m.height / 2, m.width, m.height), e.restore();
    return;
  }
  if (!(isNaN(y) || y <= 0)) {
    switch (e.beginPath(), m) {
      // Default includes circle
      default:
        o ? e.ellipse(n, a, o / 2, y, 0, 0, Ne) : e.arc(n, a, y, 0, Ne), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : y, e.moveTo(n + Math.sin(v) * d, a - Math.cos(v) * y), v += Io, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * y), v += Io, e.lineTo(n + Math.sin(v) * d, a - Math.cos(v) * y), e.closePath();
        break;
      case "rectRounded":
        c = y * 0.516, r = y - c, i = Math.cos(v + Jt) * r, h = Math.cos(v + Jt) * (o ? o / 2 - c : r), l = Math.sin(v + Jt) * r, f = Math.sin(v + Jt) * (o ? o / 2 - c : r), e.arc(n - h, a - l, c, v - Ee, v - Xe), e.arc(n + f, a - i, c, v - Xe, v), e.arc(n + h, a + l, c, v, v + Xe), e.arc(n - f, a + i, c, v + Xe, v + Ee), e.closePath();
        break;
      case "rect":
        if (!g) {
          r = Math.SQRT1_2 * y, d = o ? o / 2 : r, e.rect(n - d, a - r, 2 * d, 2 * r);
          break;
        }
        v += Jt;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, l = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + f, a - i), e.lineTo(n + h, a + l), e.lineTo(n - f, a + i), e.closePath();
        break;
      case "crossRot":
        v += Jt;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, l = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "star":
        h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, l = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i), v += Jt, h = Math.cos(v) * (o ? o / 2 : y), i = Math.cos(v) * y, l = Math.sin(v) * y, f = Math.sin(v) * (o ? o / 2 : y), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + f, a - i), e.lineTo(n - f, a + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(v) * y, l = Math.sin(v) * y, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(v) * (o ? o / 2 : y), a + Math.sin(v) * y);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Yn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function co(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function uo(e) {
  e.restore();
}
function Ir(e, t, n, a, o) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (o === "middle") {
    const s = (t.x + n.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, n.y);
  } else o === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Fr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function Or(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Pe(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Vr(e, t, n, a, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(a), i = t - s.actualBoundingBoxLeft, l = t + s.actualBoundingBoxRight, r = n - s.actualBoundingBoxAscent, c = n + s.actualBoundingBoxDescent, d = o.strikethrough ? (r + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(l, d), e.stroke();
  }
}
function zr(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function Un(e, t, n, a, o, s = {}) {
  const i = qe(t) ? t : [
    t
  ], l = s.strokeWidth > 0 && s.strokeColor !== "";
  let r, c;
  for (e.save(), e.font = o.string, Or(e, s), r = 0; r < i.length; ++r)
    c = i[r], s.backdrop && zr(e, s.backdrop), l && (s.strokeColor && (e.strokeStyle = s.strokeColor), Pe(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, n, a, s.maxWidth)), e.fillText(c, n, a, s.maxWidth), Vr(e, n, a, c, s), a += Number(o.lineHeight);
  e.restore();
}
function va(e, t) {
  const { x: n, y: a, w: o, h: s, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * Ee, Ee, !0), e.lineTo(n, a + s - i.bottomLeft), e.arc(n + i.bottomLeft, a + s - i.bottomLeft, i.bottomLeft, Ee, Xe, !0), e.lineTo(n + o - i.bottomRight, a + s), e.arc(n + o - i.bottomRight, a + s - i.bottomRight, i.bottomRight, Xe, 0, !0), e.lineTo(n + o, a + i.topRight), e.arc(n + o - i.topRight, a + i.topRight, i.topRight, 0, -Xe, !0), e.lineTo(n + i.topLeft, a);
}
const Nr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Hr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function jr(e, t) {
  const n = ("" + e).match(Nr);
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
const Wr = (e) => +e || 0;
function ho(e, t) {
  const n = {}, a = Ae(t), o = a ? Object.keys(t) : t, s = Ae(e) ? a ? (i) => we(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    n[i] = Wr(s(i));
  return n;
}
function ki(e) {
  return ho(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function yn(e) {
  return ho(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function mt(e) {
  const t = ki(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Je(e, t) {
  e = e || {}, t = t || We.font;
  let n = we(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = we(e.style, t.style);
  a && !("" + a).match(Hr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const o = {
    family: we(e.family, t.family),
    lineHeight: jr(we(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: we(e.weight, t.weight),
    string: ""
  };
  return o.string = Er(o), o;
}
function na(e, t, n, a) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function Kr(e, t, n) {
  const { min: a, max: o } = e, s = hi(t, (o - a) / 2), i = (l, r) => n && l === 0 ? 0 : l + r;
  return {
    min: i(a, -Math.abs(s)),
    max: i(o, s)
  };
}
function fn(e, t) {
  return Object.assign(Object.create(e), t);
}
function fo(e, t = [
  ""
], n, a, o = () => e[0]) {
  const s = n || e;
  typeof a > "u" && (a = Si("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: a,
    _getTarget: o,
    override: (l) => fo([
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
      return Ci(l, r, () => Jr(r, t, e, l));
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
      return Uo(l).includes(r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return Uo(l);
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
function kn(e, t, n, a) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: wi(e, a),
    setContext: (s) => kn(e, s, n, a),
    override: (s) => kn(e.override(s), t, n, a)
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
      return Ci(s, i, () => Ur(s, i, l));
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
function wi(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: n,
    indexable: a,
    isScriptable: qt(n) ? n : () => n,
    isIndexable: qt(a) ? a : () => a
  };
}
const Yr = (e, t) => e ? e + oo(t) : t, go = (e, t) => Ae(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Ci(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function Ur(e, t, n) {
  const { _proxy: a, _context: o, _subProxy: s, _descriptors: i } = e;
  let l = a[t];
  return qt(l) && i.isScriptable(t) && (l = qr(t, l, e, n)), qe(l) && l.length && (l = Xr(t, l, e, i.isIndexable)), go(t, l) && (l = kn(l, o, s && s[t], i)), l;
}
function qr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let r = t(s, i || a);
  return l.delete(e), go(e, r) && (r = po(o._scopes, o, e, r)), r;
}
function Xr(e, t, n, a) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: l } = n;
  if (typeof s.index < "u" && a(e))
    return t[s.index % t.length];
  if (Ae(t[0])) {
    const r = t, c = o._scopes.filter((d) => d !== r);
    t = [];
    for (const d of r) {
      const h = po(c, o, e, d);
      t.push(kn(h, s, i && i[e], l));
    }
  }
  return t;
}
function $i(e, t, n) {
  return qt(e) ? e(t, n) : e;
}
const Gr = (e, t) => e === !0 ? t : typeof e == "string" ? dn(t, e) : void 0;
function Zr(e, t, n, a, o) {
  for (const s of t) {
    const i = Gr(n, s);
    if (i) {
      e.add(i);
      const l = $i(i._fallback, n, o);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function po(e, t, n, a) {
  const o = t._rootScopes, s = $i(t._fallback, n, a), i = [
    ...e,
    ...o
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let r = Yo(l, i, n, s || n, a);
  return r === null || typeof s < "u" && s !== n && (r = Yo(l, i, s, r, a), r === null) ? !1 : fo(Array.from(l), [
    ""
  ], o, s, () => Qr(t, n, a));
}
function Yo(e, t, n, a, o) {
  for (; n; )
    n = Zr(e, t, n, a, o);
  return n;
}
function Qr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const o = a[t];
  return qe(o) && Ae(n) ? n : o || {};
}
function Jr(e, t, n, a) {
  let o;
  for (const s of t)
    if (o = Si(Yr(s, e), n), typeof o < "u")
      return go(e, o) ? po(n, a, e, o) : o;
}
function Si(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function Uo(e) {
  let t = e._keys;
  return t || (t = e._keys = ec(e._scopes)), t;
}
function ec(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((o) => !o.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const tc = Number.EPSILON || 1e-14, wn = (e, t) => t < e.length && !e[t].skip && e[t], Mi = (e) => e === "x" ? "y" : "x";
function nc(e, t, n, a) {
  const o = e.skip ? t : e, s = t, i = n.skip ? t : n, l = qa(s, o), r = qa(i, s);
  let c = l / (l + r), d = r / (l + r);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = a * c, f = a * d;
  return {
    previous: {
      x: s.x - h * (i.x - o.x),
      y: s.y - h * (i.y - o.y)
    },
    next: {
      x: s.x + f * (i.x - o.x),
      y: s.y + f * (i.y - o.y)
    }
  };
}
function ac(e, t, n) {
  const a = e.length;
  let o, s, i, l, r, c = wn(e, 0);
  for (let d = 0; d < a - 1; ++d)
    if (r = c, c = wn(e, d + 1), !(!r || !c)) {
      if (Fn(t[d], 0, tc)) {
        n[d] = n[d + 1] = 0;
        continue;
      }
      o = n[d] / t[d], s = n[d + 1] / t[d], l = Math.pow(o, 2) + Math.pow(s, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[d] = o * i * t[d], n[d + 1] = s * i * t[d]);
    }
}
function oc(e, t, n = "x") {
  const a = Mi(n), o = e.length;
  let s, i, l, r = wn(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = l, l = r, r = wn(e, c + 1), !l)
      continue;
    const d = l[n], h = l[a];
    i && (s = (d - i[n]) / 3, l[`cp1${n}`] = d - s, l[`cp1${a}`] = h - s * t[c]), r && (s = (r[n] - d) / 3, l[`cp2${n}`] = d + s, l[`cp2${a}`] = h + s * t[c]);
  }
}
function sc(e, t = "x") {
  const n = Mi(t), a = e.length, o = Array(a).fill(0), s = Array(a);
  let i, l, r, c = wn(e, 0);
  for (i = 0; i < a; ++i)
    if (l = r, r = c, c = wn(e, i + 1), !!r) {
      if (c) {
        const d = c[t] - r[t];
        o[i] = d !== 0 ? (c[n] - r[n]) / d : 0;
      }
      s[i] = l ? c ? Dt(o[i - 1]) !== Dt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  ac(e, o, s), oc(e, s, t);
}
function aa(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function ic(e, t) {
  let n, a, o, s, i, l = Yn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = s, s = l, l = n < a - 1 && Yn(e[n + 1], t), s && (o = e[n], i && (o.cp1x = aa(o.cp1x, t.left, t.right), o.cp1y = aa(o.cp1y, t.top, t.bottom)), l && (o.cp2x = aa(o.cp2x, t.left, t.right), o.cp2y = aa(o.cp2y, t.top, t.bottom)));
}
function lc(e, t, n, a, o) {
  let s, i, l, r;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    sc(e, o);
  else {
    let c = a ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      l = e[s], r = nc(c, l, e[Math.min(s + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = r.previous.x, l.cp1y = r.previous.y, l.cp2x = r.next.x, l.cp2y = r.next.y, c = l;
  }
  t.capBezierPoints && ic(e, n);
}
function mo() {
  return typeof window < "u" && typeof document < "u";
}
function bo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function ya(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const $a = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function rc(e, t) {
  return $a(e).getPropertyValue(t);
}
const cc = [
  "top",
  "right",
  "bottom",
  "left"
];
function rn(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let o = 0; o < 4; o++) {
    const s = cc[o];
    a[s] = parseFloat(e[t + "-" + s + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const dc = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function uc(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: o, offsetY: s } = a;
  let i = !1, l, r;
  if (dc(o, s, e.target))
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
function an(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, o = $a(n), s = o.boxSizing === "border-box", i = rn(o, "padding"), l = rn(o, "border", "width"), { x: r, y: c, box: d } = uc(e, n), h = i.left + (d && l.left), f = i.top + (d && l.top);
  let { width: m, height: g } = t;
  return s && (m -= i.width + l.width, g -= i.height + l.height), {
    x: Math.round((r - h) / m * n.width / a),
    y: Math.round((c - f) / g * n.height / a)
  };
}
function hc(e, t, n) {
  let a, o;
  if (t === void 0 || n === void 0) {
    const s = e && bo(e);
    if (!s)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), l = $a(s), r = rn(l, "border", "width"), c = rn(l, "padding");
      t = i.width - c.width - r.width, n = i.height - c.height - r.height, a = ya(l.maxWidth, s, "clientWidth"), o = ya(l.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || ba,
    maxHeight: o || ba
  };
}
const Ht = (e) => Math.round(e * 10) / 10;
function fc(e, t, n, a) {
  const o = $a(e), s = rn(o, "margin"), i = ya(o.maxWidth, e, "clientWidth") || ba, l = ya(o.maxHeight, e, "clientHeight") || ba, r = hc(e, t, n);
  let { width: c, height: d } = r;
  if (o.boxSizing === "content-box") {
    const f = rn(o, "border", "width"), m = rn(o, "padding");
    c -= m.width + f.width, d -= m.height + f.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, a ? c / a : d - s.height), c = Ht(Math.min(c, i, r.maxWidth)), d = Ht(Math.min(d, l, r.maxHeight)), c && !d && (d = Ht(c / 2)), (t !== void 0 || n !== void 0) && a && r.height && d > r.height && (d = r.height, c = Ht(Math.floor(d * a))), {
    width: c,
    height: d
  };
}
function qo(e, t, n) {
  const a = t || 1, o = Ht(e.height * a), s = Ht(e.width * a);
  e.height = Ht(e.height), e.width = Ht(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = a, i.height = o, i.width = s, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const gc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    mo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Xo(e, t) {
  const n = rc(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function on(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function pc(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function mc(e, t, n, a) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = on(e, o, n), l = on(o, s, n), r = on(s, t, n), c = on(i, l, n), d = on(l, r, n);
  return on(c, d, n);
}
const bc = function(e, t) {
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
}, vc = function() {
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
function xn(e, t, n) {
  return e ? bc(t, n) : vc();
}
function Di(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function Ti(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Ai(e) {
  return e === "angle" ? {
    between: Kn,
    compare: br,
    normalize: vt
  } : {
    between: Nt,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Go({ start: e, end: t, count: n, loop: a, style: o }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: o
  };
}
function yc(e, t, n) {
  const { property: a, start: o, end: s } = n, { between: i, normalize: l } = Ai(a), r = t.length;
  let { start: c, end: d, loop: h } = e, f, m;
  if (h) {
    for (c += r, d += r, f = 0, m = r; f < m && i(l(t[c % r][a]), o, s); ++f)
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
function xc(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: o, end: s } = n, i = t.length, { compare: l, between: r, normalize: c } = Ai(a), { start: d, end: h, loop: f, style: m } = yc(e, t, n), g = [];
  let y = !1, v = null, p, x, _;
  const w = () => r(o, _, p) && l(o, _) !== 0, $ = () => l(s, p) === 0 || r(s, _, p), S = () => y || w(), M = () => !y || $();
  for (let O = d, H = d; O <= h; ++O)
    x = t[O % i], !x.skip && (p = c(x[a]), p !== _ && (y = r(p, o, s), v === null && S() && (v = l(p, o) === 0 ? O : H), v !== null && M() && (g.push(Go({
      start: v,
      end: O,
      loop: f,
      count: i,
      style: m
    })), v = null), H = O, _ = p));
  return v !== null && g.push(Go({
    start: v,
    end: h,
    loop: f,
    count: i,
    style: m
  })), g;
}
function _c(e, t) {
  const n = [], a = e.segments;
  for (let o = 0; o < a.length; o++) {
    const s = xc(a[o], e.points, t);
    s.length && n.push(...s);
  }
  return n;
}
function kc(e, t, n, a) {
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
function wc(e, t, n, a) {
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
function Cc(e, t) {
  const n = e.points, a = e.options.spanGaps, o = n.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: l } = kc(n, o, s, a);
  if (a === !0)
    return Zo(e, [
      {
        start: i,
        end: l,
        loop: s
      }
    ], n, t);
  const r = l < i ? l + o : l, c = !!e._fullLoop && i === 0 && l === o - 1;
  return Zo(e, wc(n, i, r, c), n, t);
}
function Zo(e, t, n, a) {
  return !a || !a.setContext || !n ? t : $c(e, t, n, a);
}
function $c(e, t, n, a) {
  const o = e._chart.getContext(), s = Qo(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, r = n.length, c = [];
  let d = s, h = t[0].start, f = h;
  function m(g, y, v, p) {
    const x = l ? -1 : 1;
    if (g !== y) {
      for (g += r; n[g % r].skip; )
        g -= x;
      for (; n[y % r].skip; )
        y += x;
      g % r !== y % r && (c.push({
        start: g % r,
        end: y % r,
        loop: v,
        style: p
      }), d = p, h = y % r);
    }
  }
  for (const g of t) {
    h = l ? h : g.start;
    let y = n[h % r], v;
    for (f = h + 1; f <= g.end; f++) {
      const p = n[f % r];
      v = Qo(a.setContext(fn(o, {
        type: "segment",
        p0: y,
        p1: p,
        p0DataIndex: (f - 1) % r,
        p1DataIndex: f % r,
        datasetIndex: i
      }))), Sc(v, d) && m(h, f - 1, g.loop, d), y = p, d = v;
    }
    h < f - 1 && m(h, f - 1, g.loop, d);
  }
  return c;
}
function Qo(e) {
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
function Sc(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(o, s) {
    return lo(s) ? (n.includes(s) || n.push(s), n.indexOf(s)) : s;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function oa(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Mc(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: oa(n, t, "left"),
    right: oa(n, t, "right"),
    top: oa(a, t, "top"),
    bottom: oa(a, t, "bottom")
  } : t;
}
function Dc(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = Mc(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class Tc {
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
    this._request || (this._running = !0, this._request = vi.call(window, () => {
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
var Lt = /* @__PURE__ */ new Tc();
const Jo = "transparent", Ac = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = Ho(e || Jo), o = a.valid && Ho(t || Jo);
    return o && o.valid ? o.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Bc {
  constructor(t, n, a, o) {
    const s = n[a];
    o = na([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = na([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || Ac[t.type || typeof i], this._easing = On[t.easing] || On.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = a - this._start, i = this._duration - s;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = na([
        t.to,
        n,
        o,
        t.from
      ]), this._from = na([
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
class Bi {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!Ae(t))
      return;
    const n = Object.keys(We.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Ae(s))
        return;
      const i = {};
      for (const l of n)
        i[l] = s[l];
      (qe(s.properties) && s.properties || [
        o
      ]).forEach((l) => {
        (l === o || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, o = Pc(t, a);
    if (!o)
      return [];
    const s = this._createAnimations(o, a);
    return a.$shared && Lc(t.options.$animations, a).then(() => {
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
      const f = a.get(c);
      if (h)
        if (f && h.active()) {
          h.update(f, d, l);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[c] = d;
        continue;
      }
      s[c] = h = new Bc(f, t, c, d), o.push(h);
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
      return Lt.add(this._chart, a), !0;
  }
}
function Lc(e, t) {
  const n = [], a = Object.keys(t);
  for (let o = 0; o < a.length; o++) {
    const s = e[a[o]];
    s && s.active() && n.push(s.wait());
  }
  return Promise.all(n);
}
function Pc(e, t) {
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
function es(e, t) {
  const n = e && e.options || {}, a = n.reverse, o = n.min === void 0 ? t : 0, s = n.max === void 0 ? t : 0;
  return {
    start: a ? s : o,
    end: a ? o : s
  };
}
function Rc(e, t, n) {
  if (n === !1)
    return !1;
  const a = es(e, n), o = es(t, n);
  return {
    top: o.end,
    right: a.end,
    bottom: o.start,
    left: a.start
  };
}
function Ec(e) {
  let t, n, a, o;
  return Ae(e) ? (t = e.top, n = e.right, a = e.bottom, o = e.left) : t = n = a = o = e, {
    top: t,
    right: n,
    bottom: a,
    left: o,
    disabled: e === !1
  };
}
function Li(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = a.length; o < s; ++o)
    n.push(a[o].index);
  return n;
}
function ts(e, t, n, a = {}) {
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
    c = e.values[r], pt(c) && (s || t === 0 || Dt(t) === Dt(c)) && (t += c);
  }
  return !d && !a.all ? 0 : t;
}
function Ic(e, t) {
  const { iScale: n, vScale: a } = t, o = n.axis === "x" ? "x" : "y", s = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let r, c, d;
  for (r = 0, c = i.length; r < c; ++r)
    d = i[r], l[r] = {
      [o]: d,
      [s]: e[d]
    };
  return l;
}
function Ra(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Fc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Oc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: o } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: o ? n : Number.POSITIVE_INFINITY
  };
}
function Vc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function ns(e, t, n, a) {
  for (const o of t.getMatchingVisibleMetas(a).reverse()) {
    const s = e[o.index];
    if (n && s > 0 || !n && s < 0)
      return o.index;
  }
  return null;
}
function as(e, t) {
  const { chart: n, _cachedMeta: a } = e, o = n._stacks || (n._stacks = {}), { iScale: s, vScale: i, index: l } = a, r = s.axis, c = i.axis, d = Fc(s, i, a), h = t.length;
  let f;
  for (let m = 0; m < h; ++m) {
    const g = t[m], { [r]: y, [c]: v } = g, p = g._stacks || (g._stacks = {});
    f = p[c] = Vc(o, d, y), f[l] = v, f._top = ns(f, i, !0, a.type), f._bottom = ns(f, i, !1, a.type);
    const x = f._visualValues || (f._visualValues = {});
    x[l] = v;
  }
}
function Ea(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function zc(e, t) {
  return fn(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Nc(e, t, n) {
  return fn(e, {
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
function $n(e, t) {
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
const Ia = (e) => e === "reset" || e === "none", os = (e, t) => t ? e : Object.assign({}, e), Hc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Li(n, !0),
  values: null
};
class Sa {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Ra(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && $n(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), o = (h, f, m, g) => h === "x" ? f : h === "r" ? g : m, s = n.xAxisID = we(a.xAxisID, Ea(t, "x")), i = n.yAxisID = we(a.yAxisID, Ea(t, "y")), l = n.rAxisID = we(a.rAxisID, Ea(t, "r")), r = n.indexAxis, c = n.iAxisID = o(r, s, i, l), d = n.vAxisID = o(r, i, s, l);
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
    this._data && Vo(this._data, this), t._stacked && $n(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (Ae(n)) {
      const o = this._cachedMeta;
      this._data = Ic(n, o);
    } else if (a !== n) {
      if (a) {
        Vo(a, this);
        const o = this._cachedMeta;
        $n(o), o._parsed = [];
      }
      n && Object.isExtensible(n) && _r(n, this), this._syncList = [], this._data = n;
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
    n._stacked = Ra(n.vScale, n), n.stack !== a.stack && (o = !0, $n(n), n.stack = a.stack), this._resyncElements(t), (o || s !== n._stacked) && (as(this, n._parsed), n._stacked = Ra(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: o } = this, { iScale: s, _stacked: i } = a, l = s.axis;
    let r = t === 0 && n === o.length ? !0 : a._sorted, c = t > 0 && a._parsed[t - 1], d, h, f;
    if (this._parsing === !1)
      a._parsed = o, a._sorted = !0, f = o;
    else {
      qe(o[t]) ? f = this.parseArrayData(a, o, t, n) : Ae(o[t]) ? f = this.parseObjectData(a, o, t, n) : f = this.parsePrimitiveData(a, o, t, n);
      const m = () => h[l] === null || c && h[l] < c[l];
      for (d = 0; d < n; ++d)
        a._parsed[d + t] = h = f[d], r && (m() && (r = !1), c = h);
      a._sorted = r;
    }
    i && as(this, f);
  }
  parsePrimitiveData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, l = s.axis, r = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let f, m, g;
    for (f = 0, m = o; f < m; ++f)
      g = f + a, h[f] = {
        [l]: d || s.parse(c[g], g),
        [r]: i.parse(n[g], g)
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
    let d, h, f, m;
    for (d = 0, h = o; d < h; ++d)
      f = d + a, m = n[f], c[d] = {
        x: s.parse(dn(m, l), f),
        y: i.parse(dn(m, r), f)
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
      keys: Li(o, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return ts(l, i, s.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, o) {
    const s = a[n.axis];
    let i = s === null ? NaN : s;
    const l = o && a._stacks[n.axis];
    o && l && (o.values = l, i = ts(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, o = a._parsed, s = a._sorted && t === a.iScale, i = o.length, l = this._getOtherScale(t), r = Hc(n, a, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Oc(l);
    let f, m;
    function g() {
      m = o[f];
      const y = m[l.axis];
      return !pt(m[t.axis]) || d > y || h < y;
    }
    for (f = 0; f < i && !(!g() && (this.updateRangeFromParsed(c, t, m, r), s)); ++f)
      ;
    if (s) {
      for (f = i - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, m, r);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let o, s, i;
    for (o = 0, s = n.length; o < s; ++o)
      i = n[o][t.axis], pt(i) && a.push(i);
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
    this.update(t || "default"), n._clip = Ec(we(this.options.clip, Rc(n.xScale, n.yScale, this.getMaxOverflow())));
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
      s = i.$context || (i.$context = Nc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = zc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!n, s.mode = a, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const o = n === "active", s = this._cachedDataOpts, i = t + "-" + n, l = s[i], r = this.enableOptionSharing && jn(a);
    if (l)
      return os(l, r);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), m = Object.keys(We.elements[t]), g = () => this.getContext(a, o, n), y = c.resolveNamedOptions(f, m, g, h);
    return y.$shared && (y.$shared = r, s[i] = Object.freeze(os(y, r))), y;
  }
  _resolveAnimations(t, n, a) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${n}`, l = s[i];
    if (l)
      return l;
    let r;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, n), f = d.getOptionScopes(this.getDataset(), h);
      r = d.createResolver(f, this.getContext(t, a, n));
    }
    const c = new Bi(o, r && r.animations);
    return r && r._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Ia(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), o = this._sharedOptions, s = this.getSharedOptions(a), i = this.includeOptions(n, s) || s !== o;
    return this.updateSharedOptions(s, n, a), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, n, a, o) {
    Ia(o) ? Object.assign(t, a) : this._resolveAnimations(n, o).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !Ia(n) && this._resolveAnimations(void 0, n).update(t, a);
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
      a._stacked && $n(a, o);
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
function jc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let o = 0, s = n.length; o < s; o++)
      a = a.concat(n[o].controller.getAllParsedValues(e));
    e._cache.$bar = bi(a.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function Wc(e) {
  const t = e.iScale, n = jc(t, e.type);
  let a = t._length, o, s, i, l;
  const r = () => {
    i === 32767 || i === -32768 || (jn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (o = 0, s = n.length; o < s; ++o)
    i = t.getPixelForValue(n[o]), r();
  for (l = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), r();
  return a;
}
function Kc(e, t, n, a) {
  const o = n.barThickness;
  let s, i;
  return Pe(o) ? (s = t.min * n.categoryPercentage, i = n.barPercentage) : (s = o * a, i = 1), {
    chunk: s / a,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function Yc(e, t, n, a) {
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
function Uc(e, t, n, a) {
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
function Pi(e, t, n, a) {
  return qe(e) ? Uc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function ss(e, t, n, a) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), l = o === s, r = [];
  let c, d, h, f;
  for (c = n, d = n + a; c < d; ++c)
    f = t[c], h = {}, h[o.axis] = l || o.parse(i[c], c), r.push(Pi(f, h, s, c));
  return r;
}
function Fa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function qc(e, t, n) {
  return e !== 0 ? Dt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Xc(e) {
  let t, n, a, o, s;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: o,
    bottom: s
  };
}
function Gc(e, t, n, a) {
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
  const { start: i, end: l, reverse: r, top: c, bottom: d } = Xc(e);
  o === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? o = c : (n._bottom || 0) === a ? o = d : (s[is(d, i, l, r)] = !0, o = c)), s[is(o, i, l, r)] = !0, e.borderSkipped = s;
}
function is(e, t, n, a) {
  return a ? (e = Zc(e, t, n), e = ls(e, n, t)) : e = ls(e, t, n), e;
}
function Zc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function ls(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Qc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Jc extends Sa {
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
    return ss(t, n, a, o);
  }
  parseArrayData(t, n, a, o) {
    return ss(t, n, a, o);
  }
  parseObjectData(t, n, a, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: r = "y" } = this._parsing, c = s.axis === "x" ? l : r, d = i.axis === "x" ? l : r, h = [];
    let f, m, g, y;
    for (f = a, m = a + o; f < m; ++f)
      y = n[f], g = {}, g[s.axis] = s.parse(dn(y, c), f), h.push(Pi(dn(y, d), g, i, f));
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
    const n = this._cachedMeta, { iScale: a, vScale: o } = n, s = this.getParsed(t), i = s._custom, l = Fa(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: l } } = this, r = l.getBasePixel(), c = l.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(n, o);
    for (let m = n; m < n + a; m++) {
      const g = this.getParsed(m), y = s || Pe(g[l.axis]) ? {
        base: r,
        head: r
      } : this._calculateBarValuePixels(m), v = this._calculateBarIndexPixels(m, d), p = (g._stacks || {})[l.axis], x = {
        horizontal: c,
        base: y.base,
        enableBorderRadius: !p || Fa(g._custom) || i === p._top || i === p._bottom,
        x: c ? y.head : v.center,
        y: c ? v.center : y.head,
        height: c ? v.size : Math.abs(y.size),
        width: c ? Math.abs(y.size) : v.size
      };
      f && (x.options = h || this.resolveDataElementOptions(m, t[m].active ? "active" : o));
      const _ = x.options || t[m].options;
      Gc(x, _, p, i), Qc(x, _, d.ratio), this.updateElement(t[m], m, x, o);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, o = a.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), r = l && l[a.axis], c = (d) => {
      const h = d._parsed.find((m) => m[a.axis] === r), f = h && h[d.vScale.axis];
      if (Pe(f) || isNaN(f))
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
      t[we(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || Wc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: o }, options: { base: s, minBarLength: i } } = this, l = s || 0, r = this.getParsed(t), c = r._custom, d = Fa(c);
    let h = r[n.axis], f = 0, m = a ? this.applyStack(n, r, a) : h, g, y;
    m !== h && (f = m - h, m = h), d && (h = c.barStart, m = c.barEnd - c.barStart, h !== 0 && Dt(h) !== Dt(c.barEnd) && (f = 0), f += h);
    const v = !Pe(s) && !d ? s : f;
    let p = n.getPixelForValue(v);
    if (this.chart.getDataVisibility(t) ? g = n.getPixelForValue(f + m) : g = p, y = g - p, Math.abs(y) < i) {
      y = qc(y, n, l) * i, h === l && (p -= y / 2);
      const x = n.getPixelForDecimal(0), _ = n.getPixelForDecimal(1), w = Math.min(x, _), $ = Math.max(x, _);
      p = Math.max(Math.min(p, $), w), g = p + y, a && !d && (r._stacks[n.axis]._visualValues[o] = n.getValueForPixel(g) - n.getValueForPixel(p));
    }
    if (p === n.getPixelForValue(l)) {
      const x = Dt(y) * n.getLineWidthForValue(l) / 2;
      p += x, y -= x;
    }
    return {
      size: y,
      base: p,
      head: g,
      center: g + y / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, o = this.options, s = o.skipNull, i = we(o.maxBarThickness, 1 / 0);
    let l, r;
    const c = this._getAxisCount();
    if (n.grouped) {
      const d = s ? this._getStackCount(t) : n.stackCount, h = o.barThickness === "flex" ? Yc(t, n, o, d * c) : Kc(t, n, o, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, m = this._getAxis().indexOf(we(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + m;
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
    const t = this._cachedMeta, n = t.vScale, a = t.data, o = a.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[n.axis] !== null && !a[s].hidden && a[s].draw(this._ctx);
  }
}
function ed(e, t, n) {
  let a = 1, o = 1, s = 0, i = 0;
  if (t < Ne) {
    const l = e, r = l + t, c = Math.cos(l), d = Math.sin(l), h = Math.cos(r), f = Math.sin(r), m = (_, w, $) => Kn(_, l, r, !0) ? 1 : Math.max(w, w * n, $, $ * n), g = (_, w, $) => Kn(_, l, r, !0) ? -1 : Math.min(w, w * n, $, $ * n), y = m(0, c, h), v = m(Xe, d, f), p = g(Ee, c, h), x = g(Ee + Xe, d, f);
    a = (y - p) / 2, o = (v - x) / 2, s = -(y + p) / 2, i = -(v + x) / 2;
  }
  return {
    ratioX: a,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class td extends Sa {
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
      if (Ae(a[t])) {
        const { key: r = "value" } = this._parsing;
        s = (c) => +dn(a[c], r);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return Et(this.options.rotation - 90);
  }
  _getCircumference() {
    return Et(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ne, n = -Ne;
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
    const n = this.chart, { chartArea: a } = n, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), r = Math.min(or(this.options.cutout, l), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: m, offsetX: g, offsetY: y } = ed(h, d, r), v = (a.width - i) / f, p = (a.height - i) / m, x = Math.max(Math.min(v, p) / 2, 0), _ = hi(this.options.radius, x), w = Math.max(_ * r, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * _, this.offsetY = y * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, n) {
    const a = this.options, o = this._cachedMeta, s = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / Ne);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", i = this.chart, l = i.chartArea, c = i.options.animation, d = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, f = s && c.animateScale, m = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: y, includeOptions: v } = this._getSharedOptions(n, o);
    let p = this._getRotation(), x;
    for (x = 0; x < n; ++x)
      p += this._circumference(x, s);
    for (x = n; x < n + a; ++x) {
      const _ = this._circumference(x, s), w = t[x], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: p,
        endAngle: p + _,
        circumference: _,
        outerRadius: g,
        innerRadius: m
      };
      v && ($.options = y || this.resolveDataElementOptions(x, w.active ? "active" : o)), p += _, this.updateElement(w, x, $, o);
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
    return n > 0 && !isNaN(t) ? Ne * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, o = a.data.labels || [], s = ro(n._parsed[t], a.options.locale);
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
    return Math.max(we(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class nd extends Sa {
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
    let { start: l, count: r } = Cr(n, o, i);
    this._drawStart = l, this._drawCount = r, $r(n) && (l = 0, r = o.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!s._decimated, a.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, l, r, t);
  }
  updateElements(t, n, a, o) {
    const s = o === "reset", { iScale: i, vScale: l, _stacked: r, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(n, o), f = i.axis, m = l.axis, { spanGaps: g, segment: y } = this.options, v = Wn(g) ? g : Number.POSITIVE_INFINITY, p = this.chart._animationsDisabled || s || o === "none", x = n + a, _ = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let $ = 0; $ < _; ++$) {
      const S = t[$], M = p ? S : {};
      if ($ < n || $ >= x) {
        M.skip = !0;
        continue;
      }
      const O = this.getParsed($), H = Pe(O[m]), A = M[f] = i.getPixelForValue(O[f], $), T = M[m] = s || H ? l.getBasePixel() : l.getPixelForValue(r ? this.applyStack(l, O, r) : O[m], $);
      M.skip = isNaN(A) || isNaN(T) || H, M.stop = $ > 0 && Math.abs(O[f] - w[f]) > v, y && (M.parsed = O, M.raw = c.data[$]), h && (M.options = d || this.resolveDataElementOptions($, S.active ? "active" : o)), p || this.updateElement(S, $, M, o), w = O;
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
class ad extends td {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function tn() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class vo {
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
    Object.assign(vo.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return tn();
  }
  parse() {
    return tn();
  }
  format() {
    return tn();
  }
  add() {
    return tn();
  }
  diff() {
    return tn();
  }
  startOf() {
    return tn();
  }
  endOf() {
    return tn();
  }
}
var od = {
  _date: vo
};
function sd(e, t, n, a) {
  const { controller: o, data: s, _sorted: i } = e, l = o._cachedMeta.iScale, r = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && s.length) {
    const c = l._reversePixels ? yr : sn;
    if (a) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const f = c(s, t, n - h), m = c(s, t, n + h);
          return {
            lo: f.lo,
            hi: m.hi
          };
        }
      }
    } else {
      const d = c(s, t, n);
      if (r) {
        const { vScale: h } = o._cachedMeta, { _parsed: f } = e, m = f.slice(0, d.lo + 1).reverse().findIndex((y) => !Pe(y[h.axis]));
        d.lo -= Math.max(0, m);
        const g = f.slice(d.hi).findIndex((y) => !Pe(y[h.axis]));
        d.hi += Math.max(0, g);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function Ma(e, t, n, a, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, r = s.length; l < r; ++l) {
    const { index: c, data: d } = s[l], { lo: h, hi: f } = sd(s[l], t, i, o);
    for (let m = h; m <= f; ++m) {
      const g = d[m];
      g.skip || a(g, c, m);
    }
  }
}
function id(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, o) {
    const s = t ? Math.abs(a.x - o.x) : 0, i = n ? Math.abs(a.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Oa(e, t, n, a, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Ma(e, n, t, function(l, r, c) {
    !o && !Yn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && s.push({
      element: l,
      datasetIndex: r,
      index: c
    });
  }, !0), s;
}
function ld(e, t, n, a) {
  let o = [];
  function s(i, l, r) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = pi(i, {
      x: t.x,
      y: t.y
    });
    Kn(h, c, d) && o.push({
      element: i,
      datasetIndex: l,
      index: r
    });
  }
  return Ma(e, n, t, s), o;
}
function rd(e, t, n, a, o, s) {
  let i = [];
  const l = id(n);
  let r = Number.POSITIVE_INFINITY;
  function c(d, h, f) {
    const m = d.inRange(t.x, t.y, o);
    if (a && !m)
      return;
    const g = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(g)) && !m)
      return;
    const v = l(t, g);
    v < r ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: f
      }
    ], r = v) : v === r && i.push({
      element: d,
      datasetIndex: h,
      index: f
    });
  }
  return Ma(e, n, t, c), i;
}
function Va(e, t, n, a, o, s) {
  return !s && !e.isPointInArea(t) ? [] : n === "r" && !a ? ld(e, t, n, o) : rd(e, t, n, a, o, s);
}
function rs(e, t, n, a, o) {
  const s = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return Ma(e, n, t, (r, c, d) => {
    r[i] && r[i](t[n], o) && (s.push({
      element: r,
      datasetIndex: c,
      index: d
    }), l = l || r.inRange(t.x, t.y, o));
  }), a && !l ? [] : s;
}
var cd = {
  modes: {
    index(e, t, n, a) {
      const o = an(t, e), s = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? Oa(e, o, s, a, i) : Va(e, o, s, !1, a, i), r = [];
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
      const o = an(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? Oa(e, o, s, a, i) : Va(e, o, s, !1, a, i);
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
      const o = an(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Oa(e, o, s, a, i);
    },
    nearest(e, t, n, a) {
      const o = an(t, e), s = n.axis || "xy", i = n.includeInvisible || !1;
      return Va(e, o, s, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const o = an(t, e);
      return rs(e, o, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const o = an(t, e);
      return rs(e, o, "y", n.intersect, a);
    }
  }
};
const Ri = [
  "left",
  "top",
  "right",
  "bottom"
];
function Sn(e, t) {
  return e.filter((n) => n.pos === t);
}
function cs(e, t) {
  return e.filter((n) => Ri.indexOf(n.pos) === -1 && n.box.axis === t);
}
function Mn(e, t) {
  return e.sort((n, a) => {
    const o = t ? a : n, s = t ? n : a;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function dd(e) {
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
function ud(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: o, stackWeight: s } = n;
    if (!a || !Ri.includes(o))
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
function hd(e, t) {
  const n = ud(e), { vBoxMaxWidth: a, hBoxMaxHeight: o } = t;
  let s, i, l;
  for (s = 0, i = e.length; s < i; ++s) {
    l = e[s];
    const { fullSize: r } = l.box, c = n[l.stack], d = c && l.stackWeight / c.weight;
    l.horizontal ? (l.width = d ? d * a : r && t.availableWidth, l.height = o) : (l.width = a, l.height = d ? d * o : r && t.availableHeight);
  }
  return n;
}
function fd(e) {
  const t = dd(e), n = Mn(t.filter((c) => c.box.fullSize), !0), a = Mn(Sn(t, "left"), !0), o = Mn(Sn(t, "right")), s = Mn(Sn(t, "top"), !0), i = Mn(Sn(t, "bottom")), l = cs(t, "x"), r = cs(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(s),
    rightAndBottom: o.concat(r).concat(i).concat(l),
    chartArea: Sn(t, "chartArea"),
    vertical: a.concat(o).concat(r),
    horizontal: s.concat(i).concat(l)
  };
}
function ds(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function Ei(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function gd(e, t, n, a) {
  const { pos: o, box: s } = n, i = e.maxPadding;
  if (!Ae(o)) {
    n.size && (e[o] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? s.height : s.width), n.size = h.size / h.count, e[o] += n.size;
  }
  s.getPadding && Ei(i, s.getPadding());
  const l = Math.max(0, t.outerWidth - ds(i, e, "left", "right")), r = Math.max(0, t.outerHeight - ds(i, e, "top", "bottom")), c = l !== e.w, d = r !== e.h;
  return e.w = l, e.h = r, n.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function pd(e) {
  const t = e.maxPadding;
  function n(a) {
    const o = Math.max(t[a] - e[a], 0);
    return e[a] += o, o;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function md(e, t) {
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
function Rn(e, t, n, a) {
  const o = [];
  let s, i, l, r, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    l = e[s], r = l.box, r.update(l.width || t.w, l.height || t.h, md(l.horizontal, t));
    const { same: h, other: f } = gd(t, n, l, a);
    c |= h && o.length, d = d || f, r.fullSize || o.push(l);
  }
  return c && Rn(o, t, n, a) || d;
}
function sa(e, t, n, a, o) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + o, e.width = a, e.height = o;
}
function us(e, t, n, a) {
  const o = n.padding;
  let { x: s, y: i } = t;
  for (const l of e) {
    const r = l.box, c = a[l.stack] || {
      placed: 0,
      weight: 1
    }, d = l.stackWeight / c.weight || 1;
    if (l.horizontal) {
      const h = t.w * d, f = c.size || r.height;
      jn(c.start) && (i = c.start), r.fullSize ? sa(r, o.left, i, n.outerWidth - o.right - o.left, f) : sa(r, t.left + c.placed, i, h, f), c.start = i, c.placed += h, i = r.bottom;
    } else {
      const h = t.h * d, f = c.size || r.width;
      jn(c.start) && (s = c.start), r.fullSize ? sa(r, s, o.top, f, n.outerHeight - o.bottom - o.top) : sa(r, s, t.top + c.placed, f, h), c.start = s, c.placed += h, s = r.right;
    }
  }
  t.x = s, t.y = i;
}
var ft = {
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
    const o = mt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(n - o.height, 0), l = fd(e.boxes), r = l.vertical, c = l.horizontal;
    Re(e.boxes, (y) => {
      typeof y.beforeLayout == "function" && y.beforeLayout();
    });
    const d = r.reduce((y, v) => v.box.options && v.box.options.display === !1 ? y : y + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, o);
    Ei(f, mt(a));
    const m = Object.assign({
      maxPadding: f,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), g = hd(r.concat(c), h);
    Rn(l.fullSize, m, h, g), Rn(r, m, h, g), Rn(c, m, h, g) && Rn(r, m, h, g), pd(m), us(l.leftAndTop, m, h, g), m.x += m.w, m.y += m.h, us(l.rightAndBottom, m, h, g), e.chartArea = {
      left: m.left,
      top: m.top,
      right: m.left + m.w,
      bottom: m.top + m.h,
      height: m.h,
      width: m.w
    }, Re(l.chartArea, (y) => {
      const v = y.box;
      Object.assign(v, e.chartArea), v.update(m.w, m.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Ii {
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
class bd extends Ii {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const fa = "$chartjs", vd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, hs = (e) => e === null || e === "";
function yd(e, t) {
  const n = e.style, a = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[fa] = {
    initial: {
      height: a,
      width: o,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", hs(o)) {
    const s = Xo(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (hs(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Xo(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Fi = gc ? {
  passive: !0
} : !1;
function xd(e, t, n) {
  e && e.addEventListener(t, n, Fi);
}
function _d(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Fi);
}
function kd(e, t) {
  const n = vd[e.type] || e.type, { x: a, y: o } = an(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: o !== void 0 ? o : null
  };
}
function xa(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function wd(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || xa(l.addedNodes, a), i = i && !xa(l.removedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Cd(e, t, n) {
  const a = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const l of s)
      i = i || xa(l.removedNodes, a), i = i && !xa(l.addedNodes, a);
    i && n();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const qn = /* @__PURE__ */ new Map();
let fs = 0;
function Oi() {
  const e = window.devicePixelRatio;
  e !== fs && (fs = e, qn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function $d(e, t) {
  qn.size || window.addEventListener("resize", Oi), qn.set(e, t);
}
function Sd(e) {
  qn.delete(e), qn.size || window.removeEventListener("resize", Oi);
}
function Md(e, t, n) {
  const a = e.canvas, o = a && bo(a);
  if (!o)
    return;
  const s = yi((l, r) => {
    const c = o.clientWidth;
    n(l, r), c < o.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const r = l[0], c = r.contentRect.width, d = r.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), $d(e, s), i;
}
function za(e, t, n) {
  n && n.disconnect(), t === "resize" && Sd(e);
}
function Dd(e, t, n) {
  const a = e.canvas, o = yi((s) => {
    e.ctx !== null && n(kd(s, e));
  }, e);
  return xd(a, t, o), o;
}
class Td extends Ii {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (yd(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[fa])
      return !1;
    const a = n[fa].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = a[s];
      Pe(i) ? n.removeAttribute(s) : n.setAttribute(s, i);
    });
    const o = a.style || {};
    return Object.keys(o).forEach((s) => {
      n.style[s] = o[s];
    }), n.width = n.width, delete n[fa], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: wd,
      detach: Cd,
      resize: Md
    }[n] || Dd;
    o[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), o = a[n];
    if (!o)
      return;
    ({
      attach: za,
      detach: za,
      resize: za
    }[n] || _d)(t, n, o), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, o) {
    return fc(t, n, a, o);
  }
  isAttached(t) {
    const n = t && bo(t);
    return !!(n && n.isConnected);
  }
}
function Ad(e) {
  return !mo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? bd : Td;
}
let Ft = class {
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
    return Wn(this.x) && Wn(this.y);
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
function Bd(e, t) {
  const n = e.options.ticks, a = Ld(e), o = Math.min(n.maxTicksLimit || a, a), s = n.major.enabled ? Rd(t) : [], i = s.length, l = s[0], r = s[i - 1], c = [];
  if (i > o)
    return Ed(t, c, s, i / o), c;
  const d = Pd(s, t, o);
  if (i > 0) {
    let h, f;
    const m = i > 1 ? Math.round((r - l) / (i - 1)) : null;
    for (ia(t, c, d, Pe(m) ? 0 : l - m, l), h = 0, f = i - 1; h < f; h++)
      ia(t, c, d, s[h], s[h + 1]);
    return ia(t, c, d, r, Pe(m) ? t.length : r + m), c;
  }
  return ia(t, c, d), c;
}
function Ld(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), o = e._maxLength / n;
  return Math.floor(Math.min(a, o));
}
function Pd(e, t, n) {
  const a = Id(e), o = t.length / n;
  if (!a)
    return Math.max(o, 1);
  const s = hr(a);
  for (let i = 0, l = s.length - 1; i < l; i++) {
    const r = s[i];
    if (r > o)
      return r;
  }
  return Math.max(o, 1);
}
function Rd(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function Ed(e, t, n, a) {
  let o = 0, s = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = n[o * a]);
}
function ia(e, t, n, a, o) {
  const s = we(a, 0), i = Math.min(we(o, e.length), e.length);
  let l = 0, r, c, d;
  for (n = Math.ceil(n), o && (r = o - a, n = r / Math.floor(r / n)), d = s; d < 0; )
    l++, d = Math.round(s + l * n);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), l++, d = Math.round(s + l * n));
}
function Id(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const Fd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, gs = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, ps = (e, t) => Math.min(t || e, e);
function ms(e, t) {
  const n = [], a = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += a)
    n.push(e[Math.floor(s)]);
  return n;
}
function Od(e, t, n) {
  const a = e.ticks.length, o = Math.min(t, a - 1), s = e._startPixel, i = e._endPixel, l = 1e-6;
  let r = e.getPixelForTick(o), c;
  if (!(n && (a === 1 ? c = Math.max(r - s, i - r) : t === 0 ? c = (e.getPixelForTick(1) - r) / 2 : c = (r - e.getPixelForTick(o - 1)) / 2, r += o < t ? c : -c, r < s - l || r > i + l)))
    return r;
}
function Vd(e, t) {
  Re(e, (n) => {
    const a = n.gc, o = a.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete n.data[a[s]];
      a.splice(0, o);
    }
  });
}
function Dn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function bs(e, t) {
  if (!e.display)
    return 0;
  const n = Je(e.font, t), a = mt(e.padding);
  return (qe(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function zd(e, t) {
  return fn(e, {
    scale: t,
    type: "scale"
  });
}
function Nd(e, t, n) {
  return fn(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function Hd(e, t, n) {
  let a = io(e);
  return (n && t !== "right" || !n && t === "right") && (a = Fd(a)), a;
}
function jd(e, t, n, a) {
  const { top: o, left: s, bottom: i, right: l, chart: r } = e, { chartArea: c, scales: d } = r;
  let h = 0, f, m, g;
  const y = i - o, v = l - s;
  if (e.isHorizontal()) {
    if (m = Ge(a, s, l), Ae(n)) {
      const p = Object.keys(n)[0], x = n[p];
      g = d[p].getPixelForValue(x) + y - t;
    } else n === "center" ? g = (c.bottom + c.top) / 2 + y - t : g = gs(e, n, t);
    f = l - s;
  } else {
    if (Ae(n)) {
      const p = Object.keys(n)[0], x = n[p];
      m = d[p].getPixelForValue(x) - v + t;
    } else n === "center" ? m = (c.left + c.right) / 2 - v + t : m = gs(e, n, t);
    g = Ge(a, i, o), h = n === "left" ? -Xe : Xe;
  }
  return {
    titleX: m,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class Cn extends Ft {
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
    return t = wt(t, Number.POSITIVE_INFINITY), n = wt(n, Number.NEGATIVE_INFINITY), a = wt(a, Number.POSITIVE_INFINITY), o = wt(o, Number.NEGATIVE_INFINITY), {
      min: wt(t, a),
      max: wt(n, o),
      minDefined: pt(t),
      maxDefined: pt(n)
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
      min: wt(n, wt(a, n)),
      max: wt(a, wt(n, a))
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
    Ie(this.options.beforeUpdate, [
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
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Kr(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const r = l < this.ticks.length;
    this._convertTicksToLabels(r ? ms(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Bd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, a;
    this.isHorizontal() ? (n = this.left, a = this.right) : (n = this.top, a = this.bottom, t = !t), this._startPixel = n, this._endPixel = a, this._reversePixels = t, this._length = a - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Ie(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Ie(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Ie(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Ie(this.options[t], [
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
    Ie(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let a, o, s;
    for (a = 0, o = t.length; a < o; a++)
      s = t[a], s.label = Ie(n.callback, [
        s.value,
        a,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Ie(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Ie(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, a = ps(this.ticks.length, t.ticks.maxTicksLimit), o = n.minRotation || 0, s = n.maxRotation;
    let i = o, l, r, c;
    if (!this._isVisible() || !n.display || o >= s || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, m = Qe(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : m / (a - 1), h + 6 > l && (l = m / (a - (t.offset ? 0.5 : 1)), r = this.maxHeight - Dn(t.grid) - n.padding - bs(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), i = mr(Math.min(Math.asin(Qe((d.highest.height + 6) / l, -1, 1)), Math.asin(Qe(r / c, -1, 1)) - Math.asin(Qe(f / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Ie(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Ie(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: a, title: o, grid: s } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const r = bs(o, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = Dn(s) + r) : (t.height = this.maxHeight, t.width = Dn(s) + r), a.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), m = a.padding * 2, g = Et(this.labelRotation), y = Math.cos(g), v = Math.sin(g);
        if (l) {
          const p = a.mirror ? 0 : v * h.width + y * f.height;
          t.height = Math.min(this.maxHeight, t.height + p + m);
        } else {
          const p = a.mirror ? 0 : y * h.width + v * f.height;
          t.width = Math.min(this.maxWidth, t.width + p + m);
        }
        this._calculatePadding(c, d, v, y);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, o) {
    const { ticks: { align: s, padding: i }, position: l } = this.options, r = this.labelRotation !== 0, c = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, m = 0;
      r ? c ? (f = o * t.width, m = a * n.height) : (f = a * t.height, m = o * n.width) : s === "start" ? m = n.width : s === "end" ? f = t.width : s !== "inner" && (f = t.width / 2, m = n.width / 2), this.paddingLeft = Math.max((f - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((m - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = n.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = n.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Ie(this.options.afterFit, [
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
      Pe(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = ms(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: o, _longestTextCache: s } = this, i = [], l = [], r = Math.floor(n / ps(n, a));
    let c = 0, d = 0, h, f, m, g, y, v, p, x, _, w, $;
    for (h = 0; h < n; h += r) {
      if (g = t[h].label, y = this._resolveTickFontOptions(h), o.font = v = y.string, p = s[v] = s[v] || {
        data: {},
        gc: []
      }, x = y.lineHeight, _ = w = 0, !Pe(g) && !qe(g))
        _ = Wo(o, p.data, p.gc, _, g), w = x;
      else if (qe(g))
        for (f = 0, m = g.length; f < m; ++f)
          $ = g[f], !Pe($) && !qe($) && (_ = Wo(o, p.data, p.gc, _, $), w += x);
      i.push(_), l.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    Vd(s, n);
    const S = i.indexOf(c), M = l.indexOf(d), O = (H) => ({
      width: i[H] || 0,
      height: l[H] || 0
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
    return vr(this._alignToPixels ? en(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = Nd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = zd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Et(this.labelRotation), a = Math.abs(Math.cos(n)), o = Math.abs(Math.sin(n)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = s ? s.widest.width + i : 0, r = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? r * a > l * o ? l / a : r / o : r * o < l * a ? r / a : l / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, o = this.options, { grid: s, position: i, border: l } = o, r = s.offset, c = this.isHorizontal(), h = this.ticks.length + (r ? 1 : 0), f = Dn(s), m = [], g = l.setContext(this.getContext()), y = g.display ? g.width : 0, v = y / 2, p = function(Z) {
      return en(a, Z, y);
    };
    let x, _, w, $, S, M, O, H, A, T, L, R;
    if (i === "top")
      x = p(this.bottom), M = this.bottom - f, H = x - v, T = p(t.top) + v, R = t.bottom;
    else if (i === "bottom")
      x = p(this.top), T = t.top, R = p(t.bottom) - v, M = x + v, H = this.top + f;
    else if (i === "left")
      x = p(this.right), S = this.right - f, O = x - v, A = p(t.left) + v, L = t.right;
    else if (i === "right")
      x = p(this.left), A = t.left, L = p(t.right) - v, S = x + v, O = this.left + f;
    else if (n === "x") {
      if (i === "center")
        x = p((t.top + t.bottom) / 2 + 0.5);
      else if (Ae(i)) {
        const Z = Object.keys(i)[0], ae = i[Z];
        x = p(this.chart.scales[Z].getPixelForValue(ae));
      }
      T = t.top, R = t.bottom, M = x + v, H = M + f;
    } else if (n === "y") {
      if (i === "center")
        x = p((t.left + t.right) / 2);
      else if (Ae(i)) {
        const Z = Object.keys(i)[0], ae = i[Z];
        x = p(this.chart.scales[Z].getPixelForValue(ae));
      }
      S = x - v, O = S - f, A = t.left, L = t.right;
    }
    const W = we(o.ticks.maxTicksLimit, h), Q = Math.max(1, Math.ceil(h / W));
    for (_ = 0; _ < h; _ += Q) {
      const Z = this.getContext(_), ae = s.setContext(Z), ue = l.setContext(Z), ge = ae.lineWidth, G = ae.color, B = ue.dash || [], j = ue.dashOffset, K = ae.tickWidth, re = ae.tickColor, xe = ae.tickBorderDash || [], De = ae.tickBorderDashOffset;
      w = Od(this, _, r), w !== void 0 && ($ = en(a, w, ge), c ? S = O = A = L = $ : M = H = T = R = $, m.push({
        tx1: S,
        ty1: M,
        tx2: O,
        ty2: H,
        x1: A,
        y1: T,
        x2: L,
        y2: R,
        width: ge,
        color: G,
        borderDash: B,
        borderDashOffset: j,
        tickWidth: K,
        tickColor: re,
        tickBorderDash: xe,
        tickBorderDashOffset: De
      }));
    }
    return this._ticksLength = h, this._borderValue = x, m;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: o, ticks: s } = a, i = this.isHorizontal(), l = this.ticks, { align: r, crossAlign: c, padding: d, mirror: h } = s, f = Dn(a.grid), m = f + d, g = h ? -d : m, y = -Et(this.labelRotation), v = [];
    let p, x, _, w, $, S, M, O, H, A, T, L, R = "middle";
    if (o === "top")
      S = this.bottom - g, M = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + g, M = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const Q = this._getYAxisLabelAlignment(f);
      M = Q.textAlign, $ = Q.x;
    } else if (o === "right") {
      const Q = this._getYAxisLabelAlignment(f);
      M = Q.textAlign, $ = Q.x;
    } else if (n === "x") {
      if (o === "center")
        S = (t.top + t.bottom) / 2 + m;
      else if (Ae(o)) {
        const Q = Object.keys(o)[0], Z = o[Q];
        S = this.chart.scales[Q].getPixelForValue(Z) + m;
      }
      M = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - m;
      else if (Ae(o)) {
        const Q = Object.keys(o)[0], Z = o[Q];
        $ = this.chart.scales[Q].getPixelForValue(Z);
      }
      M = this._getYAxisLabelAlignment(f).textAlign;
    }
    n === "y" && (r === "start" ? R = "top" : r === "end" && (R = "bottom"));
    const W = this._getLabelSizes();
    for (p = 0, x = l.length; p < x; ++p) {
      _ = l[p], w = _.label;
      const Q = s.setContext(this.getContext(p));
      O = this.getPixelForTick(p) + s.labelOffset, H = this._resolveTickFontOptions(p), A = H.lineHeight, T = qe(w) ? w.length : 1;
      const Z = T / 2, ae = Q.color, ue = Q.textStrokeColor, ge = Q.textStrokeWidth;
      let G = M;
      i ? ($ = O, M === "inner" && (p === x - 1 ? G = this.options.reverse ? "left" : "right" : p === 0 ? G = this.options.reverse ? "right" : "left" : G = "center"), o === "top" ? c === "near" || y !== 0 ? L = -T * A + A / 2 : c === "center" ? L = -W.highest.height / 2 - Z * A + A : L = -W.highest.height + A / 2 : c === "near" || y !== 0 ? L = A / 2 : c === "center" ? L = W.highest.height / 2 - Z * A : L = W.highest.height - T * A, h && (L *= -1), y !== 0 && !Q.showLabelBackdrop && ($ += A / 2 * Math.sin(y))) : (S = O, L = (1 - T) * A / 2);
      let B;
      if (Q.showLabelBackdrop) {
        const j = mt(Q.backdropPadding), K = W.heights[p], re = W.widths[p];
        let xe = L - j.top, De = 0 - j.left;
        switch (R) {
          case "middle":
            xe -= K / 2;
            break;
          case "bottom":
            xe -= K;
            break;
        }
        switch (M) {
          case "center":
            De -= re / 2;
            break;
          case "right":
            De -= re;
            break;
          case "inner":
            p === x - 1 ? De -= re : p > 0 && (De -= re / 2);
            break;
        }
        B = {
          left: De,
          top: xe,
          width: re + j.width,
          height: K + j.height,
          color: Q.backdropColor
        };
      }
      v.push({
        label: w,
        font: H,
        textOffset: L,
        options: {
          rotation: y,
          color: ae,
          strokeColor: ue,
          strokeWidth: ge,
          textAlign: G,
          textBaseline: R,
          translation: [
            $,
            S
          ],
          backdrop: B
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Et(this.labelRotation))
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
    let c, d, h, f;
    this.isHorizontal() ? (c = en(t, this.left, i) - i / 2, d = en(t, this.right, l) + l / 2, h = f = r) : (h = en(t, this.top, i) - i / 2, f = en(t, this.bottom, l) + l / 2, c = d = r), n.save(), n.lineWidth = s.width, n.strokeStyle = s.color, n.beginPath(), n.moveTo(c, h), n.lineTo(d, f), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, o = this._computeLabelArea();
    o && co(a, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const l = i.options, r = i.font, c = i.label, d = i.textOffset;
      Un(a, c, 0, d, r, l);
    }
    o && uo(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: o } } = this;
    if (!a.display)
      return;
    const s = Je(a.font), i = mt(a.padding), l = a.align;
    let r = s.lineHeight / 2;
    n === "bottom" || n === "center" || Ae(n) ? (r += i.bottom, qe(a.text) && (r += s.lineHeight * (a.text.length - 1))) : r += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: f } = jd(this, r, n, l);
    Un(t, a.text, 0, 0, s, {
      color: a.color,
      maxWidth: h,
      rotation: f,
      textAlign: Hd(l, n, o),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = we(t.grid && t.grid.z, -1), o = we(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Cn.prototype.draw ? [
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
    return Je(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class la {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    Yd(n) && (a = this.register(n));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, Wd(t, i, a), this.override && We.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, o = this.scope;
    a in n && delete n[a], o && a in We[o] && (delete We[o][a], this.override && delete un[a]);
  }
}
function Wd(e, t, n) {
  const a = Hn(/* @__PURE__ */ Object.create(null), [
    n ? We.get(n) : {},
    We.get(t),
    e.defaults
  ]);
  We.set(t, a), e.defaultRoutes && Kd(t, e.defaultRoutes), e.descriptors && We.describe(t, e.descriptors);
}
function Kd(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), o = a.pop(), s = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), r = i.join(".");
    We.route(s, o, r, l);
  });
}
function Yd(e) {
  return "id" in e && "defaults" in e;
}
class Ud {
  constructor() {
    this.controllers = new la(Sa, "datasets", !0), this.elements = new la(Ft, "elements"), this.plugins = new la(Object, "plugins"), this.scales = new la(Cn, "scales"), this._typedRegistries = [
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
      a || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Re(o, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const o = oo(t);
    Ie(a["before" + o], [], a), n[t](a), Ie(a["after" + o], [], a);
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
var $t = /* @__PURE__ */ new Ud();
class qd {
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
      if (Ie(l, r, i) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    Pe(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, o = we(a.options && a.options.plugins, {}), s = Xd(a);
    return o === !1 && !n ? [] : Zd(t, s, o, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, o = (s, i) => s.filter((l) => !i.some((r) => l.plugin.id === r.plugin.id));
    this._notify(o(n, a), t, "stop"), this._notify(o(a, n), t, "start");
  }
}
function Xd(e) {
  const t = {}, n = [], a = Object.keys($t.plugins.items);
  for (let s = 0; s < a.length; s++)
    n.push($t.getPlugin(a[s]));
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
function Gd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function Zd(e, { plugins: t, localIds: n }, a, o) {
  const s = [], i = e.getContext();
  for (const l of t) {
    const r = l.id, c = Gd(a[r], o);
    c !== null && s.push({
      plugin: l,
      options: Qd(e.config, {
        plugin: l,
        local: n[r]
      }, c, i)
    });
  }
  return s;
}
function Qd(e, { plugin: t, local: n }, a, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(a, s);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Za(e, t) {
  const n = We.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Jd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function eu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function vs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function tu(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Qa(e, ...t) {
  if (vs(e))
    return e;
  for (const n of t) {
    const a = n.axis || tu(n.position) || e.length > 1 && vs(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function ys(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function nu(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return ys(e, "x", n[0]) || ys(e, "y", n[0]);
  }
  return {};
}
function au(e, t) {
  const n = un[e.type] || {
    scales: {}
  }, a = t.scales || {}, o = Za(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!Ae(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const r = Qa(i, l, nu(i, e), We.scales[l.type]), c = eu(r, o), d = n.scales || {};
    s[i] = In(/* @__PURE__ */ Object.create(null), [
      {
        axis: r
      },
      l,
      d[r],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, r = i.indexAxis || Za(l, t), d = (un[l] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const f = Jd(h, r), m = i[f + "AxisID"] || f;
      s[m] = s[m] || /* @__PURE__ */ Object.create(null), In(s[m], [
        {
          axis: f
        },
        a[m],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const l = s[i];
    In(l, [
      We.scales[l.type],
      We.scale
    ]);
  }), s;
}
function Vi(e) {
  const t = e.options || (e.options = {});
  t.plugins = we(t.plugins, {}), t.scales = au(e, t);
}
function zi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function ou(e) {
  return e = e || {}, e.data = zi(e.data), Vi(e), e;
}
const xs = /* @__PURE__ */ new Map(), Ni = /* @__PURE__ */ new Set();
function ra(e, t) {
  let n = xs.get(e);
  return n || (n = t(), xs.set(e, n), Ni.add(n)), n;
}
const Tn = (e, t, n) => {
  const a = dn(t, n);
  a !== void 0 && e.add(a);
};
class su {
  constructor(t) {
    this._config = ou(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = zi(t);
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
    this.clearCache(), Vi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ra(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return ra(`${t}.transition.${n}`, () => [
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
    return ra(`${t}-${n}`, () => [
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
    return ra(`${a}-plugin-${n}`, () => [
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
      t && (r.add(t), d.forEach((h) => Tn(r, t, h))), d.forEach((h) => Tn(r, o, h)), d.forEach((h) => Tn(r, un[s] || {}, h)), d.forEach((h) => Tn(r, We, h)), d.forEach((h) => Tn(r, Xa, h));
    });
    const c = Array.from(r);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Ni.has(n) && i.set(n, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      un[n] || {},
      We.datasets[n] || {},
      {
        type: n
      },
      We,
      Xa
    ];
  }
  resolveNamedOptions(t, n, a, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = _s(this._resolverCache, t, o);
    let r = i;
    if (lu(i, n)) {
      s.$shared = !1, a = qt(a) ? a() : a;
      const c = this.createResolver(t, a, l);
      r = kn(i, a, c);
    }
    for (const c of n)
      s[c] = r[c];
    return s;
  }
  createResolver(t, n, a = [
    ""
  ], o) {
    const { resolver: s } = _s(this._resolverCache, t, a);
    return Ae(n) ? kn(s, n, void 0, o) : s;
  }
}
function _s(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const o = n.join();
  let s = a.get(o);
  return s || (s = {
    resolver: fo(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(o, s)), s;
}
const iu = (e) => Ae(e) && Object.getOwnPropertyNames(e).some((t) => qt(e[t]));
function lu(e, t) {
  const { isScriptable: n, isIndexable: a } = wi(e);
  for (const o of t) {
    const s = n(o), i = a(o), l = (i || s) && e[o];
    if (s && (qt(l) || iu(l)) || i && qe(l))
      return !0;
  }
  return !1;
}
var ru = "4.5.1";
const cu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ks(e, t) {
  return e === "top" || e === "bottom" || cu.indexOf(e) === -1 && t === "x";
}
function ws(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function Cs(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Ie(n && n.onComplete, [
    e
  ], t);
}
function du(e) {
  const t = e.chart, n = t.options.animation;
  Ie(n && n.onProgress, [
    e
  ], t);
}
function Hi(e) {
  return mo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const ga = {}, $s = (e) => {
  const t = Hi(e);
  return Object.values(ga).filter((n) => n.canvas === t).pop();
};
function uu(e, t, n) {
  const a = Object.keys(e);
  for (const o of a) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (n > 0 || s > t) && (e[s + n] = i);
    }
  }
}
function hu(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Xt = class {
  static defaults = We;
  static instances = ga;
  static overrides = un;
  static registry = $t;
  static version = ru;
  static getChart = $s;
  static register(...t) {
    $t.add(...t), Ss();
  }
  static unregister(...t) {
    $t.remove(...t), Ss();
  }
  constructor(t, n) {
    const a = this.config = new su(n), o = Hi(t), s = $s(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || Ad(o))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(o, i.aspectRatio), r = l && l.canvas, c = r && r.height, d = r && r.width;
    if (this.id = ar(), this.ctx = l, this.canvas = r, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new qd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = kr((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], ga[this.id] = this, !l || !r) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Lt.listen(this, "complete", Cs), Lt.listen(this, "progress", du), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: o, _aspectRatio: s } = this;
    return Pe(t) ? n && s ? s : o ? a / o : null : t;
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
    return $t;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : qo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Ko(this.canvas, this.ctx), this;
  }
  stop() {
    return Lt.stop(this), this;
  }
  resize(t, n) {
    Lt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, o = this.canvas, s = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, n, s), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, qo(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Ie(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(r) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Re(n, (a, o) => {
      a.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, o = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let s = [];
    n && (s = s.concat(Object.keys(n).map((i) => {
      const l = n[i], r = Qa(i, l), c = r === "r", d = r === "x";
      return {
        options: l,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(s, (i) => {
      const l = i.options, r = l.id, c = Qa(r, l), d = we(l.type, i.dtype);
      (l.position === void 0 || ks(l.position, c) !== ks(i.dposition)) && (l.position = i.dposition), o[r] = !0;
      let h = null;
      if (r in a && a[r].type === d)
        h = a[r];
      else {
        const f = $t.getScale(d);
        h = new f({
          id: r,
          type: d,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Re(o, (i, l) => {
      i || delete a[l];
    }), Re(a, (i) => {
      ft.configure(this, i, i.options), ft.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((o, s) => o.index - s.index), a > n) {
      for (let o = n; o < a; ++o)
        this._destroyDatasetMeta(o);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(ws("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = s.indexAxis || Za(l, this.options), i.order = s.order || 0, i.index = a, i.label = "" + s.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const r = $t.getController(l), { datasetElementType: c, dataElementType: d } = We.datasets[l];
        Object.assign(r, {
          dataElementType: $t.getElement(d),
          datasetElementType: c && $t.getElement(c)
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
      const { controller: h } = this.getDatasetMeta(c), f = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), o || Re(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(ws("z", "_idx"));
    const { _active: l, _lastEvent: r } = this;
    r ? this._eventHandler(r, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Re(this.scales, (t) => {
      ft.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!Eo(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: o, count: s } of n) {
      const i = a === "_removeElements" ? -s : s;
      uu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (s) => new Set(t.filter((i) => i[0] === s).map((i, l) => l + "," + i.splice(1).join(","))), o = a(0);
    for (let s = 1; s < n; s++)
      if (!Eo(o, a(s)))
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
    ft.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Re(this.boxes, (o) => {
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
        this._updateDataset(n, qt(t) ? t({
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
    }) !== !1 && (Lt.has(this) ? this.attached && !Lt.running(this) && Lt.start(this) : (this.draw(), Cs({
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
    }, o = Dc(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (o && co(n, o), t.controller.draw(), o && uo(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Yn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, o) {
    const s = cd.modes[n];
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
    return this.$context || (this.$context = fn(null, {
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
    jn(n) ? (s.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(s, {
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
    for (this.stop(), Lt.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Ko(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete ga[this.id], this.notifyPlugins("afterDestroy");
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
    Re(this.options.events, (s) => a(s, o));
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
    Re(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, n) => {
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
    !pa(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
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
    const { _active: o = [], options: s } = this, i = n, l = this._getActiveElements(t, o, a, i), r = cr(t), c = hu(t, this._lastEvent, a, r);
    a && (this._lastEvent = null, Ie(s.onHover, [
      t,
      l,
      this
    ], this), r && Ie(s.onClick, [
      t,
      l,
      this
    ], this));
    const d = !pa(l, o);
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
function Ss() {
  return Re(Xt.instances, (e) => e._plugins.invalidate());
}
function fu(e, t, n) {
  const { startAngle: a, x: o, y: s, outerRadius: i, innerRadius: l, options: r } = t, { borderWidth: c, borderJoinStyle: d } = r, h = Math.min(c / i, vt(a - n));
  if (e.beginPath(), e.arc(o, s, i - c / 2, a + h / 2, n - h / 2), l > 0) {
    const f = Math.min(c / l, vt(a - n));
    e.arc(o, s, l + c / 2, n - f / 2, a + f / 2, !0);
  } else {
    const f = Math.min(c / 2, i * vt(a - n));
    if (d === "round")
      e.arc(o, s, f, n - Ee / 2, a + Ee / 2, !0);
    else if (d === "bevel") {
      const m = 2 * f * f, g = -m * Math.cos(n + Ee / 2) + o, y = -m * Math.sin(n + Ee / 2) + s, v = m * Math.cos(a + Ee / 2) + o, p = m * Math.sin(a + Ee / 2) + s;
      e.lineTo(g, y), e.lineTo(v, p);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function gu(e, t, n) {
  const { startAngle: a, pixelMargin: o, x: s, y: i, outerRadius: l, innerRadius: r } = t;
  let c = o / l;
  e.beginPath(), e.arc(s, i, l, a - c, n + c), r > o ? (c = o / r, e.arc(s, i, r, n + c, a - c, !0)) : e.arc(s, i, o, n + Xe, a - Xe), e.closePath(), e.clip();
}
function pu(e) {
  return ho(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function mu(e, t, n, a) {
  const o = pu(e.options.borderRadius), s = (n - t) / 2, i = Math.min(s, a * t / 2), l = (r) => {
    const c = (n - Math.min(s, r)) * a / 2;
    return Qe(r, 0, Math.min(s, c));
  };
  return {
    outerStart: l(o.outerStart),
    outerEnd: l(o.outerEnd),
    innerStart: Qe(o.innerStart, 0, i),
    innerEnd: Qe(o.innerEnd, 0, i)
  };
}
function bn(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function _a(e, t, n, a, o, s) {
  const { x: i, y: l, startAngle: r, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + a + n - c, 0), f = d > 0 ? d + a + n + c : 0;
  let m = 0;
  const g = o - r;
  if (a) {
    const Q = d > 0 ? d - a : 0, Z = h > 0 ? h - a : 0, ae = (Q + Z) / 2, ue = ae !== 0 ? g * ae / (ae + a) : g;
    m = (g - ue) / 2;
  }
  const y = Math.max(1e-3, g * h - n / Ee) / h, v = (g - y) / 2, p = r + v + m, x = o - v - m, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: S } = mu(t, f, h, x - p), M = h - _, O = h - w, H = p + _ / M, A = x - w / O, T = f + $, L = f + S, R = p + $ / T, W = x - S / L;
  if (e.beginPath(), s) {
    const Q = (H + A) / 2;
    if (e.arc(i, l, h, H, Q), e.arc(i, l, h, Q, A), w > 0) {
      const ge = bn(O, A, i, l);
      e.arc(ge.x, ge.y, w, A, x + Xe);
    }
    const Z = bn(L, x, i, l);
    if (e.lineTo(Z.x, Z.y), S > 0) {
      const ge = bn(L, W, i, l);
      e.arc(ge.x, ge.y, S, x + Xe, W + Math.PI);
    }
    const ae = (x - S / f + (p + $ / f)) / 2;
    if (e.arc(i, l, f, x - S / f, ae, !0), e.arc(i, l, f, ae, p + $ / f, !0), $ > 0) {
      const ge = bn(T, R, i, l);
      e.arc(ge.x, ge.y, $, R + Math.PI, p - Xe);
    }
    const ue = bn(M, p, i, l);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const ge = bn(M, H, i, l);
      e.arc(ge.x, ge.y, _, p - Xe, H);
    }
  } else {
    e.moveTo(i, l);
    const Q = Math.cos(H) * h + i, Z = Math.sin(H) * h + l;
    e.lineTo(Q, Z);
    const ae = Math.cos(A) * h + i, ue = Math.sin(A) * h + l;
    e.lineTo(ae, ue);
  }
  e.closePath();
}
function bu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l } = t;
  let r = t.endAngle;
  if (s) {
    _a(e, t, n, a, r, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(l) || (r = i + (l % Ne || Ne));
  }
  return _a(e, t, n, a, r, o), e.fill(), r;
}
function vu(e, t, n, a, o) {
  const { fullCircles: s, startAngle: i, circumference: l, options: r } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: m } = r, g = r.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let y = t.endAngle;
  if (s) {
    _a(e, t, n, a, y, o);
    for (let v = 0; v < s; ++v)
      e.stroke();
    isNaN(l) || (y = i + (l % Ne || Ne));
  }
  g && gu(e, t, y), r.selfJoin && y - i >= Ee && m === 0 && d !== "miter" && fu(e, t, y), s || (_a(e, t, n, a, y, o), e.stroke());
}
class yu extends Ft {
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
    ], a), { angle: s, distance: i } = pi(o, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: r, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), f = (this.options.spacing + this.options.borderWidth) / 2, m = we(h, r - l), g = Kn(s, l, r) && l !== r, y = m >= Ne || g, v = Nt(i, c + f, d + f);
    return y && v;
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
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Ne ? Math.floor(a / Ne) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * o, Math.sin(l) * o);
    const r = 1 - Math.sin(Math.min(Ee, a || 0)), c = o * r;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, bu(t, this, c, s, i), vu(t, this, c, s, i), t.restore();
  }
}
function ji(e, t, n = t) {
  e.lineCap = we(n.borderCapStyle, t.borderCapStyle), e.setLineDash(we(n.borderDash, t.borderDash)), e.lineDashOffset = we(n.borderDashOffset, t.borderDashOffset), e.lineJoin = we(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = we(n.borderWidth, t.borderWidth), e.strokeStyle = we(n.borderColor, t.borderColor);
}
function xu(e, t, n) {
  e.lineTo(n.x, n.y);
}
function _u(e) {
  return e.stepped ? Ir : e.tension || e.cubicInterpolationMode === "monotone" ? Fr : xu;
}
function Wi(e, t, n = {}) {
  const a = e.length, { start: o = 0, end: s = a - 1 } = n, { start: i, end: l } = t, r = Math.max(o, i), c = Math.min(s, l), d = o < i && s < i || o > l && s > l;
  return {
    count: a,
    start: r,
    loop: t.loop,
    ilen: c < r && !d ? a + c - r : c - r
  };
}
function ku(e, t, n, a) {
  const { points: o, options: s } = t, { count: i, start: l, loop: r, ilen: c } = Wi(o, n, a), d = _u(s);
  let { move: h = !0, reverse: f } = a || {}, m, g, y;
  for (m = 0; m <= c; ++m)
    g = o[(l + (f ? c - m : m)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, y, g, f, s.stepped), y = g);
  return r && (g = o[(l + (f ? c : 0)) % i], d(e, y, g, f, s.stepped)), !!r;
}
function wu(e, t, n, a) {
  const o = t.points, { count: s, start: i, ilen: l } = Wi(o, n, a), { move: r = !0, reverse: c } = a || {};
  let d = 0, h = 0, f, m, g, y, v, p;
  const x = (w) => (i + (c ? l - w : w)) % s, _ = () => {
    y !== v && (e.lineTo(d, v), e.lineTo(d, y), e.lineTo(d, p));
  };
  for (r && (m = o[x(0)], e.moveTo(m.x, m.y)), f = 0; f <= l; ++f) {
    if (m = o[x(f)], m.skip)
      continue;
    const w = m.x, $ = m.y, S = w | 0;
    S === g ? ($ < y ? y = $ : $ > v && (v = $), d = (h * d + w) / ++h) : (_(), e.lineTo(w, $), g = S, h = 0, y = v = $), p = $;
  }
  _();
}
function Ja(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? wu : ku;
}
function Cu(e) {
  return e.stepped ? pc : e.tension || e.cubicInterpolationMode === "monotone" ? mc : on;
}
function $u(e, t, n, a) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, n, a) && o.closePath()), ji(e, t.options), e.stroke(o);
}
function Su(e, t, n, a) {
  const { segments: o, options: s } = t, i = Ja(t);
  for (const l of o)
    ji(e, s, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const Mu = typeof Path2D == "function";
function Du(e, t, n, a) {
  Mu && !t.options.segment ? $u(e, t, n, a) : Su(e, t, n, a);
}
class Tu extends Ft {
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
      lc(this._points, a, t, o, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Cc(this, this.options.segment));
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
    const a = this.options, o = t[n], s = this.points, i = _c(this, {
      property: n,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const l = [], r = Cu(a);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: f } = i[c], m = s[h], g = s[f];
      if (m === g) {
        l.push(m);
        continue;
      }
      const y = Math.abs((o - m[n]) / (g[n] - m[n])), v = r(m, g, y, a.stepped);
      v[n] = t[n], l.push(v);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return Ja(this)(t, this, n, a);
  }
  path(t, n, a) {
    const o = this.segments, s = Ja(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), Du(t, this, a, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Ms(e, t, n, a) {
  const o = e.options, { [n]: s } = e.getProps([
    n
  ], a);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Au extends Ft {
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
    return Ms(this, t, "x", n);
  }
  inYRange(t, n) {
    return Ms(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Yn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Ga(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Ki(e, t) {
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
function jt(e, t, n, a) {
  return e ? 0 : Qe(t, n, a);
}
function Bu(e, t, n) {
  const a = e.options.borderWidth, o = e.borderSkipped, s = ki(a);
  return {
    t: jt(o.top, s.top, 0, n),
    r: jt(o.right, s.right, 0, t),
    b: jt(o.bottom, s.bottom, 0, n),
    l: jt(o.left, s.left, 0, t)
  };
}
function Lu(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = yn(o), i = Math.min(t, n), l = e.borderSkipped, r = a || Ae(o);
  return {
    topLeft: jt(!r || l.top || l.left, s.topLeft, 0, i),
    topRight: jt(!r || l.top || l.right, s.topRight, 0, i),
    bottomLeft: jt(!r || l.bottom || l.left, s.bottomLeft, 0, i),
    bottomRight: jt(!r || l.bottom || l.right, s.bottomRight, 0, i)
  };
}
function Pu(e) {
  const t = Ki(e), n = t.right - t.left, a = t.bottom - t.top, o = Bu(e, n / 2, a / 2), s = Lu(e, n / 2, a / 2);
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
function Na(e, t, n, a) {
  const o = t === null, s = n === null, l = e && !(o && s) && Ki(e, a);
  return l && (o || Nt(t, l.left, l.right)) && (s || Nt(n, l.top, l.bottom));
}
function Ru(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Eu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Ha(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, o = e.y !== n.y ? -t : 0, s = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - o;
  return {
    x: e.x + a,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class Iu extends Ft {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: o } } = this, { inner: s, outer: i } = Pu(this), l = Ru(i.radius) ? va : Eu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), l(t, Ha(i, n, s)), t.clip(), l(t, Ha(s, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, Ha(s, n)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return Na(this, t, n, a);
  }
  inXRange(t, n) {
    return Na(this, t, null, n);
  }
  inYRange(t, n) {
    return Na(this, null, t, n);
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
const Ds = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, Fu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Ts extends Ft {
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
    let n = Ie(t.generateLabels, [
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
    const a = t.labels, o = Je(a.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: r } = Ds(a, s);
    let c, d;
    n.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, l, r) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, l, r) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + l;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let f = -1, m = -d;
    return this.legendItems.forEach((g, y) => {
      const v = a + n / 2 + s.measureText(g.text).width;
      (y === 0 || c[c.length - 1] + v + 2 * l > i) && (h += d, c[c.length - (y > 0 ? 0 : 1)] = 0, m += d, f++), r[y] = {
        left: 0,
        top: m,
        row: f,
        width: v,
        height: o
      }, c[c.length - 1] += v + l;
    }), h;
  }
  _fitCols(t, n, a, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: l } } } = this, r = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = l, f = 0, m = 0, g = 0, y = 0;
    return this.legendItems.forEach((v, p) => {
      const { itemWidth: x, itemHeight: _ } = Ou(a, n, s, v, o);
      p > 0 && m + _ + 2 * l > d && (h += f + l, c.push({
        width: f,
        height: m
      }), g += f + l, y++, f = m = 0), r[p] = {
        left: g,
        top: m,
        col: y,
        width: x,
        height: _
      }, f = Math.max(f, x), m += _ + l;
    }), h += f, c.push({
      width: f,
      height: m
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: o }, rtl: s } } = this, i = xn(s, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, r = Ge(a, this.left + o, this.right - this.lineWidths[l]);
      for (const c of n)
        l !== c.row && (l = c.row, r = Ge(a, this.left + o, this.right - this.lineWidths[l])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(r), c.width), r += c.width + o;
    } else {
      let l = 0, r = Ge(a, this.top + t + o, this.bottom - this.columnSizes[l].height);
      for (const c of n)
        c.col !== l && (l = c.col, r = Ge(a, this.top + t + o, this.bottom - this.columnSizes[l].height)), c.top = r, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), r += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      co(t, this), this._draw(), uo(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: o } = this, { align: s, labels: i } = t, l = We.color, r = xn(t.rtl, this.left, this.width), c = Je(i.font), { padding: d } = i, h = c.size, f = h / 2;
    let m;
    this.drawTitle(), o.textAlign = r.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: g, boxHeight: y, itemHeight: v } = Ds(i, h), p = function(S, M, O) {
      if (isNaN(g) || g <= 0 || isNaN(y) || y < 0)
        return;
      o.save();
      const H = we(O.lineWidth, 1);
      if (o.fillStyle = we(O.fillStyle, l), o.lineCap = we(O.lineCap, "butt"), o.lineDashOffset = we(O.lineDashOffset, 0), o.lineJoin = we(O.lineJoin, "miter"), o.lineWidth = H, o.strokeStyle = we(O.strokeStyle, l), o.setLineDash(we(O.lineDash, [])), i.usePointStyle) {
        const A = {
          radius: y * Math.SQRT2 / 2,
          pointStyle: O.pointStyle,
          rotation: O.rotation,
          borderWidth: H
        }, T = r.xPlus(S, g / 2), L = M + f;
        _i(o, A, T, L, i.pointStyleWidth && g);
      } else {
        const A = M + Math.max((h - y) / 2, 0), T = r.leftForLtr(S, g), L = yn(O.borderRadius);
        o.beginPath(), Object.values(L).some((R) => R !== 0) ? va(o, {
          x: T,
          y: A,
          w: g,
          h: y,
          radius: L
        }) : o.rect(T, A, g, y), o.fill(), H !== 0 && o.stroke();
      }
      o.restore();
    }, x = function(S, M, O) {
      Un(o, O.text, S, M + v / 2, c, {
        strikethrough: O.hidden,
        textAlign: r.textAlign(O.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? m = {
      x: Ge(s, this.left + d, this.right - a[0]),
      y: this.top + d + w,
      line: 0
    } : m = {
      x: this.left + d,
      y: Ge(s, this.top + w + d, this.bottom - n[0].height),
      line: 0
    }, Di(this.ctx, t.textDirection);
    const $ = v + d;
    this.legendItems.forEach((S, M) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const O = o.measureText(S.text).width, H = r.textAlign(S.textAlign || (S.textAlign = i.textAlign)), A = g + f + O;
      let T = m.x, L = m.y;
      r.setWidth(this.width), _ ? M > 0 && T + A + d > this.right && (L = m.y += $, m.line++, T = m.x = Ge(s, this.left + d, this.right - a[m.line])) : M > 0 && L + $ > this.bottom && (T = m.x = T + n[m.line].width + d, m.line++, L = m.y = Ge(s, this.top + w + d, this.bottom - n[m.line].height));
      const R = r.x(T);
      if (p(R, L, S), T = wr(H, T + g + f, _ ? T + A : this.right, t.rtl), x(r.x(T), L, S), _)
        m.x += A + d;
      else if (typeof S.text != "string") {
        const W = c.lineHeight;
        m.y += Yi(S, W) + d;
      } else
        m.y += $;
    }), Ti(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Je(n.font), o = mt(n.padding);
    if (!n.display)
      return;
    const s = xn(t.rtl, this.left, this.width), i = this.ctx, l = n.position, r = a.size / 2, c = o.top + r;
    let d, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, h = Ge(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((y, v) => Math.max(y, v.height), 0);
      d = c + Ge(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const m = Ge(l, h, h + f);
    i.textAlign = s.textAlign(io(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, Un(i, n.text, m, d, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Je(t.font), a = mt(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, o, s;
    if (Nt(t, this.left, this.right) && Nt(n, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, a = 0; a < s.length; ++a)
        if (o = s[a], Nt(t, o.left, o.left + o.width) && Nt(n, o.top, o.top + o.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!Nu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = Fu(o, a);
      o && !s && Ie(n.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = a, a && !s && Ie(n.onHover, [
        t,
        a,
        this
      ], this);
    } else a && Ie(n.onClick, [
      t,
      a,
      this
    ], this);
  }
}
function Ou(e, t, n, a, o) {
  const s = Vu(a, e, t, n), i = zu(o, a, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function Vu(e, t, n, a) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + n.size / 2 + a.measureText(o).width;
}
function zu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = Yi(t, n)), a;
}
function Yi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function Nu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var yo = {
  id: "legend",
  _element: Ts,
  start(e, t, n) {
    const a = e.legend = new Ts({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ft.configure(e, a, n), ft.addBox(e, a);
  },
  stop(e) {
    ft.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const a = e.legend;
    ft.configure(e, a, n), a.options = n;
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
          const c = r.controller.getStyle(n ? 0 : void 0), d = mt(c.borderWidth);
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
class Ui extends Ft {
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
    const o = qe(a.text) ? a.text.length : 1;
    this._padding = mt(a.padding);
    const s = o * Je(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: o, right: s, options: i } = this, l = i.align;
    let r = 0, c, d, h;
    return this.isHorizontal() ? (d = Ge(l, a, s), h = n + t, c = s - a) : (i.position === "left" ? (d = a + t, h = Ge(l, o, n), r = Ee * -0.5) : (d = s - t, h = Ge(l, n, o), r = Ee * 0.5), c = o - n), {
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
    const a = Je(n.font), s = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: r, rotation: c } = this._drawArgs(s);
    Un(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: r,
      rotation: c,
      textAlign: io(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function Hu(e, t) {
  const n = new Ui({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ft.configure(e, n, t), ft.addBox(e, n), e.titleBlock = n;
}
var qi = {
  id: "title",
  _element: Ui,
  start(e, t, n) {
    Hu(e, n);
  },
  stop(e) {
    const t = e.titleBlock;
    ft.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, n) {
    const a = e.titleBlock;
    ft.configure(e, a, n), a.options = n;
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
const En = {
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
        const c = r.getCenterPoint(), d = qa(t, c);
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
function Ct(e, t) {
  return t && (qe(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Pt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function ju(e, t) {
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
function As(e, t) {
  const n = e.chart.ctx, { body: a, footer: o, title: s } = e, { boxWidth: i, boxHeight: l } = t, r = Je(t.bodyFont), c = Je(t.titleFont), d = Je(t.footerFont), h = s.length, f = o.length, m = a.length, g = mt(t.padding);
  let y = g.height, v = 0, p = a.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (p += e.beforeBody.length + e.afterBody.length, h && (y += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), p) {
    const w = t.displayColors ? Math.max(l, r.lineHeight) : r.lineHeight;
    y += m * w + (p - m) * r.lineHeight + (p - 1) * t.bodySpacing;
  }
  f && (y += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const _ = function(w) {
    v = Math.max(v, n.measureText(w).width + x);
  };
  return n.save(), n.font = c.string, Re(e.title, _), n.font = r.string, Re(e.beforeBody.concat(e.afterBody), _), x = t.displayColors ? i + 2 + t.boxPadding : 0, Re(a, (w) => {
    Re(w.before, _), Re(w.lines, _), Re(w.after, _);
  }), x = 0, n.font = d.string, Re(e.footer, _), n.restore(), v += g.width, {
    width: v,
    height: y
  };
}
function Wu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function Ku(e, t, n, a) {
  const { x: o, width: s } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function Yu(e, t, n, a) {
  const { x: o, width: s } = n, { width: i, chartArea: { left: l, right: r } } = e;
  let c = "center";
  return a === "center" ? c = o <= (l + r) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), Ku(c, e, t, n) && (c = "center"), c;
}
function Bs(e, t, n) {
  const a = n.yAlign || t.yAlign || Wu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || Yu(e, t, n, a),
    yAlign: a
  };
}
function Uu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function qu(e, t, n) {
  let { y: a, height: o } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= o + n : a -= o / 2, a;
}
function Ls(e, t, n, a) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: l, yAlign: r } = n, c = o + s, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: m } = yn(i);
  let g = Uu(t, l);
  const y = qu(t, r, c);
  return r === "center" ? l === "left" ? g += c : l === "right" && (g -= c) : l === "left" ? g -= Math.max(d, f) + o : l === "right" && (g += Math.max(h, m) + o), {
    x: Qe(g, 0, a.width - t.width),
    y: Qe(y, 0, a.height - t.height)
  };
}
function ca(e, t, n) {
  const a = mt(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function Ps(e) {
  return Ct([], Pt(e));
}
function Xu(e, t, n) {
  return fn(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Rs(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Xi = {
  beforeTitle: Bt,
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
  afterTitle: Bt,
  beforeBody: Bt,
  beforeLabel: Bt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return Pe(n) || (t += n), t;
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
  afterLabel: Bt,
  afterBody: Bt,
  beforeFooter: Bt,
  footer: Bt,
  afterFooter: Bt
};
function ot(e, t, n, a) {
  const o = e[t].call(n, a);
  return typeof o > "u" ? Xi[t].call(n, a) : o;
}
class Es extends Ft {
  static positioners = En;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), o = a.enabled && n.options.animation && a.animations, s = new Bi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Xu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, o = ot(a, "beforeTitle", this, t), s = ot(a, "title", this, t), i = ot(a, "afterTitle", this, t);
    let l = [];
    return l = Ct(l, Pt(o)), l = Ct(l, Pt(s)), l = Ct(l, Pt(i)), l;
  }
  getBeforeBody(t, n) {
    return Ps(ot(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, o = [];
    return Re(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = Rs(a, s);
      Ct(i.before, Pt(ot(l, "beforeLabel", this, s))), Ct(i.lines, ot(l, "label", this, s)), Ct(i.after, Pt(ot(l, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, n) {
    return Ps(ot(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, o = ot(a, "beforeFooter", this, t), s = ot(a, "footer", this, t), i = ot(a, "afterFooter", this, t);
    let l = [];
    return l = Ct(l, Pt(o)), l = Ct(l, Pt(s)), l = Ct(l, Pt(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, o = [], s = [], i = [];
    let l = [], r, c;
    for (r = 0, c = n.length; r < c; ++r)
      l.push(ju(this.chart, n[r]));
    return t.filter && (l = l.filter((d, h, f) => t.filter(d, h, f, a))), t.itemSort && (l = l.sort((d, h) => t.itemSort(d, h, a))), Re(l, (d) => {
      const h = Rs(t.callbacks, d);
      o.push(ot(h, "labelColor", this, d)), s.push(ot(h, "labelPointStyle", this, d)), i.push(ot(h, "labelTextColor", this, d));
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
      const l = En[a.position].call(this, o, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const r = this._size = As(this, a), c = Object.assign({}, l, r), d = Bs(this.chart, a, c), h = Ls(a, c, d, this.chart);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: r, topRight: c, bottomLeft: d, bottomRight: h } = yn(l), { x: f, y: m } = t, { width: g, height: y } = n;
    let v, p, x, _, w, $;
    return s === "center" ? (w = m + y / 2, o === "left" ? (v = f, p = v - i, _ = w + i, $ = w - i) : (v = f + g, p = v + i, _ = w - i, $ = w + i), x = v) : (o === "left" ? p = f + Math.max(r, d) + i : o === "right" ? p = f + g - Math.max(c, h) - i : p = this.caretX, s === "top" ? (_ = m, w = _ - i, v = p - i, x = p + i) : (_ = m + y, w = _ + i, v = p + i, x = p - i), $ = _), {
      x1: v,
      x2: p,
      x3: x,
      y1: _,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, n, a) {
    const o = this.title, s = o.length;
    let i, l, r;
    if (s) {
      const c = xn(a.rtl, this.x, this.width);
      for (t.x = ca(this, a.titleAlign, a), n.textAlign = c.textAlign(a.titleAlign), n.textBaseline = "middle", i = Je(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, r = 0; r < s; ++r)
        n.fillText(o[r], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, r + 1 === s && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, o, s) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: r, boxWidth: c } = s, d = Je(s.bodyFont), h = ca(this, "left", s), f = o.x(h), m = r < d.lineHeight ? (d.lineHeight - r) / 2 : 0, g = n.y + m;
    if (s.usePointStyle) {
      const y = {
        radius: Math.min(c, r) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, v = o.leftForLtr(f, c) + c / 2, p = g + r / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Ga(t, y, v, p), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Ga(t, y, v, p);
    } else {
      t.lineWidth = Ae(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const y = o.leftForLtr(f, c), v = o.leftForLtr(o.xPlus(f, 1), c - 2), p = yn(i.borderRadius);
      Object.values(p).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, va(t, {
        x: y,
        y: g,
        w: c,
        h: r,
        radius: p
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), va(t, {
        x: v,
        y: g + 1,
        w: c - 2,
        h: r - 2,
        radius: p
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(y, g, c, r), t.strokeRect(y, g, c, r), t.fillStyle = i.backgroundColor, t.fillRect(v, g + 1, c - 2, r - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: l, boxHeight: r, boxWidth: c, boxPadding: d } = a, h = Je(a.bodyFont);
    let f = h.lineHeight, m = 0;
    const g = xn(a.rtl, this.x, this.width), y = function(O) {
      n.fillText(O, g.x(t.x + m), t.y + f / 2), t.y += f + s;
    }, v = g.textAlign(i);
    let p, x, _, w, $, S, M;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = ca(this, v, a), n.fillStyle = a.bodyColor, Re(this.beforeBody, y), m = l && v !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, S = o.length; w < S; ++w) {
      for (p = o[w], x = this.labelTextColors[w], n.fillStyle = x, Re(p.before, y), _ = p.lines, l && _.length && (this._drawColorBox(n, t, w, g, a), f = Math.max(h.lineHeight, r)), $ = 0, M = _.length; $ < M; ++$)
        y(_[$]), f = h.lineHeight;
      Re(p.after, y);
    }
    m = 0, f = h.lineHeight, Re(this.afterBody, y), t.y -= s;
  }
  drawFooter(t, n, a) {
    const o = this.footer, s = o.length;
    let i, l;
    if (s) {
      const r = xn(a.rtl, this.x, this.width);
      for (t.x = ca(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = r.textAlign(a.footerAlign), n.textBaseline = "middle", i = Je(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < s; ++l)
        n.fillText(o[l], r.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, o) {
    const { xAlign: s, yAlign: i } = this, { x: l, y: r } = t, { width: c, height: d } = a, { topLeft: h, topRight: f, bottomLeft: m, bottomRight: g } = yn(o.cornerRadius);
    n.fillStyle = o.backgroundColor, n.strokeStyle = o.borderColor, n.lineWidth = o.borderWidth, n.beginPath(), n.moveTo(l + h, r), i === "top" && this.drawCaret(t, n, a, o), n.lineTo(l + c - f, r), n.quadraticCurveTo(l + c, r, l + c, r + f), i === "center" && s === "right" && this.drawCaret(t, n, a, o), n.lineTo(l + c, r + d - g), n.quadraticCurveTo(l + c, r + d, l + c - g, r + d), i === "bottom" && this.drawCaret(t, n, a, o), n.lineTo(l + m, r + d), n.quadraticCurveTo(l, r + d, l, r + d - m), i === "center" && s === "left" && this.drawCaret(t, n, a, o), n.lineTo(l, r + h), n.quadraticCurveTo(l, r, l + h, r), n.closePath(), n.fill(), o.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, o = a && a.x, s = a && a.y;
    if (o || s) {
      const i = En[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = As(this, t), r = Object.assign({}, i, this._size), c = Bs(n, t, r), d = Ls(t, r, c, n);
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
    const i = mt(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(s, t, o, n), Di(t, n.textDirection), s.y += i.top, this.drawTitle(s, t, n), this.drawBody(s, t, n), this.drawFooter(s, t, n), Ti(t, n.textDirection), t.restore());
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
    }), s = !pa(a, o), i = this._positionChanged(o, n);
    (s || i) && (this._active = o, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, n, a), l = this._positionChanged(i, t), r = n || !pa(i, s) || l;
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
    const { caretX: a, caretY: o, options: s } = this, i = En[s.position].call(this, t, n);
    return i !== !1 && (a !== i.x || o !== i.y);
  }
}
var xo = {
  id: "tooltip",
  _element: Es,
  positioners: En,
  afterInit(e, t, n) {
    n && (e.tooltip = new Es({
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
    callbacks: Xi
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
const Gu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function Zu(e, t, n, a) {
  const o = e.indexOf(t);
  if (o === -1)
    return Gu(e, t, n, a);
  const s = e.lastIndexOf(t);
  return o !== s ? n : o;
}
const Qu = (e, t) => e === null ? null : Qe(Math.round(e), 0, t);
function Is(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Gi extends Cn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Is
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
    if (Pe(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : Zu(a, t, we(n, t), this._addedLabels), Qu(n, a.length - 1);
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
    return Is.call(this, t);
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
function Ju(e, t) {
  const n = [], { bounds: o, step: s, min: i, max: l, precision: r, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, m = s || 1, g = d - 1, { min: y, max: v } = t, p = !Pe(i), x = !Pe(l), _ = !Pe(c), w = (v - y) / (h + 1);
  let $ = Fo((v - y) / g / m) * m, S, M, O, H;
  if ($ < 1e-14 && !p && !x)
    return [
      {
        value: y
      },
      {
        value: v
      }
    ];
  H = Math.ceil(v / $) - Math.floor(y / $), H > g && ($ = Fo(H * $ / g / m) * m), Pe(r) || (S = Math.pow(10, r), $ = Math.ceil($ * S) / S), o === "ticks" ? (M = Math.floor(y / $) * $, O = Math.ceil(v / $) * $) : (M = y, O = v), p && x && s && gr((l - i) / s, $ / 1e3) ? (H = Math.round(Math.min((l - i) / $, d)), $ = (l - i) / H, M = i, O = l) : _ ? (M = p ? i : M, O = x ? l : O, H = c - 1, $ = (O - M) / H) : (H = (O - M) / $, Fn(H, Math.round(H), $ / 1e3) ? H = Math.round(H) : H = Math.ceil(H));
  const A = Math.max(Oo($), Oo(M));
  S = Math.pow(10, Pe(r) ? A : r), M = Math.round(M * S) / S, O = Math.round(O * S) / S;
  let T = 0;
  for (p && (f && M !== i ? (n.push({
    value: i
  }), M < i && T++, Fn(Math.round((M + T * $) * S) / S, i, Fs(i, w, e)) && T++) : M < i && T++); T < H; ++T) {
    const L = Math.round((M + T * $) * S) / S;
    if (x && L > l)
      break;
    n.push({
      value: L
    });
  }
  return x && f && O !== l ? n.length && Fn(n[n.length - 1].value, l, Fs(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!x || O === l) && n.push({
    value: O
  }), n;
}
function Fs(e, t, { horizontal: n, minRotation: a }) {
  const o = Et(a), s = (n ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class eh extends Cn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return Pe(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (r) => o = n ? o : r, l = (r) => s = a ? s : r;
    if (t) {
      const r = Dt(o), c = Dt(s);
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
    }, s = this._range || this, i = Ju(o, s);
    return t.bounds === "ticks" && pr(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return ro(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Zi extends eh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: xi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = pt(t) ? t : 0, this.max = pt(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = Et(this.options.ticks.minRotation), o = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Da = {
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
}, lt = /* @__PURE__ */ Object.keys(Da);
function Os(e, t) {
  return e - t;
}
function Vs(e, t) {
  if (Pe(t))
    return null;
  const n = e._adapter, { parser: a, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), pt(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (o && (i = o === "week" && (Wn(s) || s === !0) ? n.startOf(i, "isoWeek", s) : n.startOf(i, o)), +i);
}
function zs(e, t, n, a) {
  const o = lt.length;
  for (let s = lt.indexOf(e); s < o - 1; ++s) {
    const i = Da[lt[s]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return lt[s];
  }
  return lt[o - 1];
}
function th(e, t, n, a, o) {
  for (let s = lt.length - 1; s >= lt.indexOf(n); s--) {
    const i = lt[s];
    if (Da[i].common && e._adapter.diff(o, a, i) >= t - 1)
      return i;
  }
  return lt[n ? lt.indexOf(n) : 0];
}
function nh(e) {
  for (let t = lt.indexOf(e) + 1, n = lt.length; t < n; ++t)
    if (Da[lt[t]].common)
      return lt[t];
}
function Ns(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: o } = so(n, t), s = n[a] >= t ? n[a] : n[o];
    e[s] = !0;
  }
}
function ah(e, t, n, a) {
  const o = e._adapter, s = +o.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, r;
  for (l = s; l <= i; l = +o.add(l, 1, a))
    r = n[l], r >= 0 && (t[r].major = !0);
  return t;
}
function Hs(e, t, n) {
  const a = [], o = {}, s = t.length;
  let i, l;
  for (i = 0; i < s; ++i)
    l = t[i], o[l] = i, a.push({
      value: l,
      major: !1
    });
  return s === 0 || !n ? a : ah(e, a, o, n);
}
class js extends Cn {
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
    const a = t.time || (t.time = {}), o = this._adapter = new od._date(t.adapters.date);
    o.init(n), In(a.displayFormats, o.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Vs(this, t);
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
    (!i || !l) && (r(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && r(this.getMinMax(!1))), o = pt(o) && !isNaN(o) ? o : +n.startOf(Date.now(), a), s = pt(s) && !isNaN(s) ? s : +n.endOf(Date.now(), a) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, l = xr(o, s, i);
    return this._unit = n.unit || (a.autoSkip ? zs(n.minUnit, this.min, this.max, this._getLabelCapacity(s)) : th(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : nh(this._unit), this.initOffsets(o), t.reverse && l.reverse(), Hs(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - o : n = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = s : a = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Qe(n, 0, i), a = Qe(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, o = this.options, s = o.time, i = s.unit || zs(s.minUnit, n, a, this._getLabelCapacity(n)), l = we(o.ticks.stepSize, 1), r = i === "week" ? s.isoWeekday : !1, c = Wn(r) || r === !0, d = {};
    let h = n, f, m;
    if (c && (h = +t.startOf(h, "isoWeek", r)), h = +t.startOf(h, c ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const g = o.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, m = 0; f < a; f = +t.add(f, l, i), m++)
      Ns(d, f, g);
    return (f === a || o.bounds === "ticks" || m === 1) && Ns(d, f, g), Object.keys(d).sort(Os).map((y) => +y);
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
      return Ie(i, [
        t,
        n,
        a
      ], this);
    const l = s.time.displayFormats, r = this._unit, c = this._majorUnit, d = r && l[r], h = c && l[c], f = a[n], m = c && h && f && f.major;
    return this._adapter.format(t, o || (m ? h : d));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, o = Et(this.isHorizontal() ? n.maxRotation : n.minRotation), s = Math.cos(o), i = Math.sin(o), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * s + l * i,
      h: a * i + l * s
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, o = a[n.unit] || a.millisecond, s = this._tickFormatFunction(t, 0, Hs(this, [
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
      t.push(Vs(this, o[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return bi(t.sort(Os));
  }
}
function da(e, t, n) {
  let a = 0, o = e.length - 1, s, i, l, r;
  n ? (t >= e[a].pos && t <= e[o].pos && ({ lo: a, hi: o } = sn(e, "pos", t)), { pos: s, time: l } = e[a], { pos: i, time: r } = e[o]) : (t >= e[a].time && t <= e[o].time && ({ lo: a, hi: o } = sn(e, "time", t)), { time: s, pos: l } = e[a], { time: i, pos: r } = e[o]);
  const c = i - s;
  return c ? l + (r - l) * (t - s) / c : l;
}
class H$ extends js {
  static id = "timeseries";
  static defaults = js.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = da(n, this.min), this._tableRange = da(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (da(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return da(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Qi = {
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
}, oh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, sh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Qi,
  ...oh
}, ih = Dl[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function vn(e) {
  return ii(e) ? Ya(e) : e;
}
function lh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ii(t) ? new Proxy(e, {}) : e;
}
function rh(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ji(e, t) {
  e.labels = t;
}
function el(e, t, n) {
  const a = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[n] === o[n]);
    return !s || !o.data || a.includes(s) ? {
      ...o
    } : (a.push(s), Object.assign(s, o), s);
  });
}
function ch(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ji(n, e.labels), el(n, e.datasets, t), n;
}
const dh = le({
  props: sh,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const o = oe(null), s = si(null);
    n({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: m } = e, g = ch(d, m), y = lh(g, d);
      s.value = new Xt(o.value, {
        type: c,
        data: y,
        options: {
          ...h
        },
        plugins: f
      });
    }, l = () => {
      const c = Ya(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, r = (c) => {
      c.update(e.updateMode);
    };
    return et(i), dt(l), Fe([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, f] = c, [m, g] = d;
      const y = Ya(s.value);
      if (!y)
        return;
      let v = !1;
      if (h) {
        const p = vn(h), x = vn(m);
        p && p !== x && (rh(y, p), v = !0);
      }
      if (f) {
        const p = vn(f.labels), x = vn(g.labels), _ = vn(f.datasets), w = vn(g.datasets);
        p !== x && (Ji(y.config.data, p), v = !0), _ && _ !== w && (el(y.config.data, _, e.datasetIdKey), v = !0);
      }
      v && He(() => {
        r(y);
      });
    }, {
      deep: !0
    }), () => Ve("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: o
    }, [
      Ve("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function _o(e, t) {
  return Xt.register(t), le({
    props: Qi,
    setup(n, a) {
      let { expose: o } = a;
      const s = si(null), i = (l) => {
        s.value = l?.chart;
      };
      return o({
        chart: s
      }), () => Ve(dh, ih({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const uh = /* @__PURE__ */ _o("bar", Jc), hh = /* @__PURE__ */ _o("line", nd), fh = /* @__PURE__ */ _o("pie", ad), Ws = {
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
}, Ks = {
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
}, gh = [
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
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Ks : Ws), l = () => {
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
  return et(() => {
    l();
  }), dt(() => {
    r();
  }), e && Fe(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ws,
    darkColors: Ks,
    chartSeriesColors: gh
  };
}
const ka = 5, ko = 8, ph = /^x\d*$/, mh = /^y\d*$/;
function tl(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const o of Object.keys(a)) {
    const s = a[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, l = i.ticks, r = l && typeof l == "object" ? { ...l } : {};
    if (ph.test(o) && (r.maxTicksLimit = ko, r.autoSkip = !0, r.minRotation = 0, r.maxRotation = 0, r.autoSkipPadding = r.autoSkipPadding ?? 8), mh.test(o))
      if (Array.isArray(r.values) && r.values.length > 0)
        r.maxTicksLimit = r.values.length;
      else if (r.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(r.stepSize);
        d > c && h > 0 ? r.maxTicksLimit = Math.floor((d - c) / h) + 1 : r.maxTicksLimit = ka;
      } else
        r.maxTicksLimit = ka;
    i.ticks = r, a[o] = i;
  }
  return t.scales = a, t;
}
const st = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", bh = ["titleFont", "bodyFont", "footerFont"];
function nl(e, t = st) {
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
      for (const r of bh) {
        const c = l[r];
        c && typeof c == "object" && (l[r] = { ...c, family: t });
      }
      o.tooltip = l;
    }
    n.plugins = o;
  }
  return n;
}
const vh = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ys = 10, yh = /* @__PURE__ */ le({
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
    Xt.register(Gi, Zi, Iu, qi, xo, yo), Xt.defaults.font.family = st;
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data), i = (d) => typeof d == "string" ? d.charAt(0).toUpperCase() + d.slice(1).toLowerCase() : d, l = (d) => typeof d != "string" ? d : n.uppercaseLegendLabels ? d.toUpperCase() : i(d);
    function r(d, h) {
      if (h == null) return d;
      if (Array.isArray(h) || typeof h != "object" || d == null || Array.isArray(d) || typeof d != "object") return h;
      const f = { ...d };
      for (const m of Object.keys(h)) {
        const g = h[m];
        g !== void 0 && (f[m] = r(d[m], g));
      }
      return f;
    }
    const c = C(() => {
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
              boxWidth: Ys,
              boxHeight: Ys,
              usePointStyle: !1,
              generateLabels: function(f) {
                return f.data.datasets.map((g, y) => {
                  const v = Array.isArray(g.backgroundColor) ? g.backgroundColor[0] : g.backgroundColor, p = Array.isArray(g.borderColor) ? g.borderColor[0] : g.borderColor, x = typeof p == "string" && p.length > 0 ? p : typeof v == "string" && v.length > 0 ? v : o.value.textSecondary;
                  return {
                    text: l(g.label || ""),
                    fillStyle: typeof v == "string" ? v : x,
                    strokeStyle: x,
                    lineWidth: 0,
                    fontColor: x,
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
              title: function(f) {
                return f.length > 0 ? String(i(f[0].label)) : "";
              },
              label: function(f) {
                let m = String(i(f.dataset.label || ""));
                return m && (m += ": "), f.parsed.y !== null && (m += f.parsed.y), m;
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
            stacked: n.stacked || !1,
            grid: {
              color: o.value.gridLines
            },
            ticks: {
              maxTicksLimit: ka,
              font: {
                family: st,
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
            stacked: n.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: ko,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
                size: 12,
                weight: "500"
              },
              color: o.value.textSecondary,
              padding: 8,
              callback: function(f) {
                const m = this.getLabelForValue(f);
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
      }, h = n.options ? r(d, n.options) : d;
      return nl(
        tl(h)
      );
    });
    return t({ isDark: a }), (d, h) => (b(), k("div", vh, [
      z(P(uh), {
        data: s.value,
        options: c.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, Tt = /* @__PURE__ */ me(yh, [["__scopeId", "data-v-2a91c92d"]]), xh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, _h = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, kh = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, wh = ["aria-pressed", "aria-label", "onClick"], Ch = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, $h = /* @__PURE__ */ le({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Xt.register(
      Gi,
      Zi,
      Au,
      Tu,
      qi,
      xo,
      yo
    ), Xt.defaults.font.family = st;
    const a = oe(null), { isDark: o, colors: s } = Me(Se(n, "theme")), i = C(() => s.value.bgCard), l = C(() => {
      const v = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((p) => {
          const x = p.borderColor, _ = Array.isArray(x) ? x[0] : x, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = p.pointBackgroundColor !== void 0 ? p.pointBackgroundColor : v, S = p.pointHoverBackgroundColor !== void 0 ? p.pointHoverBackgroundColor : $, M = p.pointBorderWidth ?? 2, O = p.pointHoverBorderWidth ?? M;
          return {
            ...p,
            fill: p.fill ?? !1,
            clip: p.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: S,
            pointBorderColor: p.pointBorderColor ?? w,
            pointHoverBorderColor: p.pointHoverBorderColor ?? w,
            pointBorderWidth: M,
            pointHoverBorderWidth: O
          };
        })
      };
    }), r = (v) => typeof v == "string" ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v, c = (v) => typeof v != "string" ? v : n.uppercaseLegendLabels ? v.toUpperCase() : r(v);
    function d(v) {
      const p = v.borderColor, x = Array.isArray(p) ? p[0] : p;
      return typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
    }
    const h = C(
      () => l.value.datasets.map((v, p) => ({
        key: `${v.label ?? "dataset"}-${p}`,
        label: c(v.label || ""),
        color: d(v)
      }))
    ), f = oe([]);
    Fe(
      () => l.value.datasets.length,
      (v) => {
        const p = Array.from({ length: v }, (x, _) => f.value[_] ?? !0);
        f.value = p;
      },
      { immediate: !0 }
    );
    function m(v) {
      const x = a.value?.chart;
      if (!x || v < 0 || v >= x.data.datasets.length) return;
      const _ = !x.isDatasetVisible(v);
      x.setDatasetVisibility(v, _), f.value[v] = _, x.update();
    }
    function g(v, p) {
      if (p == null) return v;
      if (Array.isArray(p) || typeof p != "object" || v == null || Array.isArray(v) || typeof v != "object") return p;
      const x = { ...v };
      for (const _ of Object.keys(p)) {
        const w = p[_];
        w !== void 0 && (x[_] = g(v[_], w));
      }
      return x;
    }
    const y = C(() => {
      const v = {
        font: {
          family: st
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
              color: s.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: ko,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: st,
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
              maxTicksLimit: ka,
              font: {
                family: st,
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
      }, p = n.options ? g(v, n.options) : v;
      return nl(
        tl(p)
      );
    });
    return t({ isDark: o }), (v, p) => (b(), k("div", xh, [
      u("div", _h, [
        z(P(hh), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: y.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (b(), k("ul", kh, [
        (b(!0), k(se, null, fe(h.value, (x, _) => (b(), k("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: te(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", f.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: $e({ color: x.color }),
            "aria-pressed": f.value[_] !== !1,
            "aria-label": `${x.label}. ${f.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => m(_)
          }, [
            u("span", Ch, [
              p[0] || (p[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: $e({ borderColor: x.color })
              }, null, 4),
              p[1] || (p[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, D(x.label), 1)
          ], 14, wh)
        ]))), 128))
      ])) : V("", !0)
    ]));
  }
}), _t = /* @__PURE__ */ me($h, [["__scopeId", "data-v-426e23d5"]]), Sh = { class: "chart-container" }, Mh = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Dh = /* @__PURE__ */ le({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Xt.register(yu, xo, yo);
    const { isDark: a, colors: o } = Me(Se(n, "theme")), s = n.data, i = (r) => typeof r == "string" ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : r, l = C(() => n.options ? n.options : {
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
              family: Mh,
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
                const m = r.getDatasetMeta(0).controller.getStyle(h), y = c.datasets[0].data[h], v = typeof m.backgroundColor == "string" && m.backgroundColor.length > 0 ? m.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${y}`,
                  fillStyle: m.backgroundColor,
                  strokeStyle: m.borderColor,
                  lineWidth: m.borderWidth,
                  lineDash: m.borderDash,
                  lineDashOffset: m.borderDashOffset,
                  lineJoin: m.borderJoinStyle,
                  fontColor: v,
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
              const c = r.label || "", d = r.parsed || 0, h = r.dataset.data.reduce((m, g) => m + g, 0), f = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${f}%)`;
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
    return t({ isDark: a }), (r, c) => (b(), k("div", Sh, [
      z(P(fh), {
        data: P(s),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Ta = /* @__PURE__ */ me(Dh, [["__scopeId", "data-v-0f7806d6"]]), Th = { class: "chart-container" }, Ah = ["viewBox"], Bh = ["transform"], Lh = ["x", "width", "fill", "stroke"], Ph = ["fill"], Rh = ["x1", "y1", "x2", "y2", "stroke"], Eh = ["points", "fill"], Ih = ["x1", "y1", "x2", "y2", "stroke"], Fh = ["x", "y", "fill"], Oh = ["x1", "y1", "x2", "y2", "stroke"], Vh = ["points", "fill"], zh = ["transform"], Nh = ["y1", "y2"], Hh = ["y1", "y2"], jh = ["y1", "y2"], Wh = ["y1", "y2"], Kh = ["y", "height"], Yh = ["y1", "y2"], Uh = ["y1", "y2"], qh = ["y1", "y2"], Xh = ["y1", "y2"], Gh = ["y", "height"], Zh = ["cy", "stroke", "onMouseenter"], Qh = ["cy", "stroke", "onMouseenter"], Jh = ["cy", "stroke", "onMouseenter"], ef = ["cy", "stroke", "onMouseenter"], tf = ["y1", "y2", "onMouseenter"], nf = ["y1", "y2", "onMouseenter"], af = ["x", "y", "fill"], of = ["x", "y", "fill"], sf = ["transform"], lf = { transform: "translate(-200, 0)" }, rf = ["stroke"], cf = ["fill"], df = { transform: "translate(-130, 0)" }, uf = ["stroke"], hf = ["fill"], ff = { transform: "translate(-60, 0)" }, gf = ["stroke"], pf = ["fill"], mf = { transform: "translate(10, 0)" }, bf = ["stroke"], vf = ["fill"], yf = { transform: "translate(80, 0)" }, xf = ["fill"], _f = { transform: "translate(150, 0)" }, kf = ["fill"], wf = /* @__PURE__ */ le({
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
    const n = e, { isDark: a } = Me(Se(n, "theme")), o = C(() => ({
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
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, l = (f, m) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const y = g.getBoundingClientRect(), v = g.createSVGPoint();
      v.x = f.clientX - y.left, v.y = f.clientY - y.top, s.value = {
        visible: !0,
        x: v.x,
        y: v.y - 20,
        text: m
      };
    }, r = (f) => {
      if (s.value.visible) {
        const m = f.currentTarget, g = m.getBoundingClientRect(), y = m.createSVGPoint();
        y.x = f.clientX - g.left, y.y = f.clientY - g.top, s.value.x = y.x, s.value.y = y.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const f = [], g = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let y = 1; y <= 10; y++) {
        const v = y, p = (v - 1) / 9, x = n.chartMargin + g - p * g;
        f.push({ value: v, y: x });
      }
      return f;
    });
    return t({ isDark: a }), (f, m) => (b(), k("div", Th, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: $e(`min-height: ${e.chartHeight}px;`),
        onMousemove: r,
        onMouseleave: c
      }, [
        s.value.visible ? (b(), k("g", {
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
          }, null, 8, Lh),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, D(s.value.text), 9, Ph)
        ], 8, Bh)) : V("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Rh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Eh),
        (b(!0), k(se, null, fe(h.value, (g, y) => (b(), k(se, { key: y }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Ih),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(g.value), 9, Fh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Oh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, Vh),
        (b(!0), k(se, null, fe(e.boxplotData, (g, y) => (b(), k(se, { key: y }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (b(), k(se, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Nh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Hh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, jh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Wh),
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
              }, null, 8, Kh)
            ], 64)) : (b(), k(se, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Yh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Uh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, qh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Xh),
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
              }, null, 8, Gh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Zh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Qh),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Jh),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (v) => l(v, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, ef),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, tf),
            g.averageY ? (b(), k("line", {
              key: 2,
              x1: -24,
              y1: g.averageY,
              x2: 24,
              y2: g.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (v) => l(v, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, nf)) : V("", !0)
          ], 8, zh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(i(g.label)), 9, af),
          g.responseCount ? (b(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(g.responseCount), 9, of)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", lf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, rf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, cf)
          ]),
          u("g", df, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, uf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, hf)
          ]),
          u("g", ff, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, gf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, pf)
          ]),
          u("g", mf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, bf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, vf)
          ]),
          u("g", yf, [
            m[0] || (m[0] = u("line", {
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
            }, " Avg ", 8, xf)
          ]),
          u("g", _f, [
            m[1] || (m[1] = u("line", {
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
            }, " Median ", 8, kf)
          ])
        ], 8, sf)) : V("", !0)
      ], 44, Ah))
    ]));
  }
}), Cf = /* @__PURE__ */ me(wf, [["__scopeId", "data-v-9ac5c075"]]), $f = { class: "chart-container" }, Sf = ["viewBox"], Mf = ["x1", "y1", "x2", "y2", "stroke"], Df = ["points", "fill"], Tf = ["x1", "y1", "x2", "y2", "stroke"], Af = ["x1", "y1", "x2", "y2", "stroke"], Bf = ["x", "y", "fill"], Lf = ["x", "y", "fill", "transform"], Pf = ["x1", "y1", "x2", "y2", "stroke"], Rf = ["points", "fill"], Ef = ["transform"], If = ["y1", "y2", "stroke", "onMouseenter"], Ff = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Of = ["x1", "y1", "x2", "y2", "onMouseenter"], Vf = ["x1", "y1", "x2", "y2", "onMouseenter"], zf = ["cy", "stroke", "onMouseenter"], Nf = ["cy", "stroke", "onMouseenter"], Hf = ["x", "y", "fill"], jf = ["x", "y", "fill"], Wf = ["transform"], Kf = { transform: "translate(-180, 0)" }, Yf = ["stroke"], Uf = ["fill"], qf = { transform: "translate(-120, 0)" }, Xf = ["fill"], Gf = { transform: "translate(-60, 0)" }, Zf = ["fill"], Qf = { transform: "translate(0, 0)" }, Jf = ["stroke"], eg = ["fill"], tg = { transform: "translate(60, 0)" }, ng = ["fill"], ag = { transform: "translate(130, 0)" }, og = ["fill"], sg = ["transform"], ig = ["x", "y", "width", "height", "fill", "stroke"], lg = ["y", "fill"], rg = ["y", "fill"], ua = 10, cg = 14, ja = 13, Us = 4, qs = 12, dg = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = ua + ja + Us + qs + ua, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(x, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * _ * $);
    }
    function r(x, _) {
      return Math.max(
        l(x.length, ja, !0),
        l(_.length, qs, !1),
        52
      ) + cg * 2;
    }
    function c(x, _, w, $) {
      const S = w / 2, M = 6, O = Math.min(
        Math.max(x, S + M),
        n.chartWidth - S - M
      ), H = M + $ + 10, A = n.chartHeight - M + 10, T = Math.min(Math.max(_, H), A);
      return { x: O, y: T };
    }
    const d = C(() => ({
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
    }), f = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, m = (x, _, w) => {
      const $ = x.currentTarget.closest("svg");
      if (!$) return;
      const S = $.getBoundingClientRect(), M = $.createSVGPoint();
      M.x = x.clientX - S.left, M.y = x.clientY - S.top;
      let O = f(_.label), H = "";
      switch (w) {
        case "body":
          H = `Q1: ${_.q1.toFixed(1)} | Q3: ${_.q3.toFixed(1)}`;
          break;
        case "wick":
          H = `Min: ${_.low.toFixed(1)} | Max: ${_.high.toFixed(1)}`;
          break;
        case "median":
          H = `Median: ${_.median.toFixed(1)}`;
          break;
        case "average":
          H = `Average: ${_.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          H = `Min: ${_.low.toFixed(1)}`;
          break;
        case "max":
          H = `Max: ${_.high.toFixed(1)}`;
          break;
      }
      const A = r(O, H), T = s;
      let L = M.x, R = M.y - 20;
      const W = c(L, R, A, T);
      L = W.x, R = W.y, h.value = {
        visible: !0,
        x: L,
        y: R,
        title: O,
        text: H,
        width: A,
        height: T
      };
    }, g = (x) => {
      if (h.value.visible) {
        const _ = x.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = x.clientX - w.left, $.y = x.clientY - w.top;
        let S = $.x, M = $.y - 20;
        const O = c(S, M, h.value.width, h.value.height);
        h.value.x = O.x, h.value.y = O.y;
      }
    }, y = () => {
      h.value.visible = !1;
    }, v = () => {
      h.value.visible = !1;
    }, p = C(() => {
      const x = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const S = $, M = (S - 1) / 9, O = n.chartMargin + w - M * w;
        x.push({ value: S, y: O });
      }
      return x;
    });
    return t({ isDark: a }), (x, _) => (b(), k("div", $f, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: $e(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
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
        }, null, 8, Mf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Df),
        (b(!0), k(se, null, fe(p.value, (w, $) => (b(), k("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Tf))), 128)),
        (b(!0), k(se, null, fe(p.value, (w, $) => (b(), k(se, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Af),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(w.value), 9, Bf)
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
        }, D(f(e.yAxisLabel)), 9, Lf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Pf),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Rf),
        (b(!0), k(se, null, fe(e.candlestickData, (w, $) => (b(), k(se, { key: $ }, [
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
              onMouseenter: (S) => m(S, w, "wick"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, If),
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
              onMouseenter: (S) => m(S, w, "body"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Ff),
            w.medianY ? (b(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (S) => m(S, w, "median"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Of)) : V("", !0),
            w.averageY ? (b(), k("line", {
              key: 1,
              x1: -e.candleWidth / 2,
              y1: w.averageY,
              x2: e.candleWidth / 2,
              y2: w.averageY,
              stroke: "#f97316",
              "stroke-width": "3",
              "stroke-dasharray": "6,4",
              class: "hover-line",
              onMouseenter: (S) => m(S, w, "average"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Vf)) : V("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => m(S, w, "min"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, zf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (S) => m(S, w, "max"),
              onMouseleave: v,
              style: { cursor: "pointer" }
            }, null, 40, Nf)
          ], 8, Ef),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(f(w.label)), 9, Hf),
          w.responseCount ? (b(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + D(w.responseCount), 9, jf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Kf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, Uf)
          ]),
          u("g", qf, [
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
            }, " Q1 ", 8, Xf)
          ]),
          u("g", Gf, [
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
            }, " Q3 ", 8, Zf)
          ]),
          u("g", Qf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Jf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, eg)
          ]),
          u("g", tg, [
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
            }, " Avg ", 8, ng)
          ]),
          u("g", ag, [
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
            }, " Median ", 8, og)
          ])
        ], 8, Wf)) : V("", !0),
        h.value.visible ? (b(), k("g", {
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
          }, null, 8, ig),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ua,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, lg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ua + ja + Us,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, rg)
        ], 8, sg)) : V("", !0)
      ], 44, Sf))
    ]));
  }
}), ug = /* @__PURE__ */ me(dg, [["__scopeId", "data-v-22efd66d"]]), hg = ["viewBox"], fg = ["x1", "y1", "x2", "y2", "stroke"], gg = ["x1", "y1", "x2", "y2", "stroke"], pg = ["points", "fill"], mg = ["x1", "y1", "x2", "y2", "stroke"], bg = ["x", "y", "fill"], vg = ["x", "y", "fill", "transform"], yg = ["x1", "y1", "x2", "y2", "stroke"], xg = ["points", "fill"], _g = ["x1", "y1", "x2", "y2", "stroke"], kg = ["x", "y", "fill"], wg = ["x", "y", "fill"], Cg = ["d"], $g = ["x", "y", "width", "height", "onMouseenter"], Sg = ["x1", "y1", "x2", "y2"], Mg = ["x", "y"], Dg = ["x1", "y1", "x2", "y2"], Tg = ["x", "y"], Ag = ["x1", "y1", "x2", "y2"], Bg = ["x", "y"], Lg = ["x1", "y1", "x2", "y2"], Pg = ["x", "y"], Rg = ["x1", "y1", "x2", "y2"], Eg = ["x", "y"], Ig = ["x1", "y1", "x2", "y2"], Fg = ["x", "y"], Og = ["transform"], Vg = { transform: "translate(-220, 0)" }, zg = ["fill"], Ng = { transform: "translate(-140, 0)" }, Hg = ["fill"], jg = { transform: "translate(-80, 0)" }, Wg = ["fill"], Kg = { transform: "translate(-20, 0)" }, Yg = ["fill"], Ug = { transform: "translate(60, 0)" }, qg = ["fill"], Xg = { transform: "translate(130, 0)" }, Gg = ["fill"], Zg = { transform: "translate(180, 0)" }, Qg = ["fill"], Jg = ["transform"], ep = ["x", "y", "width", "height", "fill", "stroke"], tp = ["y", "fill"], np = ["y", "fill"], ha = 10, ap = 14, Wa = 13, Xs = 12, Gs = 4, op = /* @__PURE__ */ le({
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
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = ha + Wa + Gs + Xs + ha, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(X, Y, J) {
      const de = J ? 0.6 : 0.535;
      return Math.ceil(Math.max(X, 1) * Y * de);
    }
    function r(X, Y) {
      return Math.max(
        l(X.length, Wa, !0),
        l(Y.length, Xs, !1),
        52
      ) + ap * 2;
    }
    function c(X, Y, J, de) {
      const pe = J / 2, I = 6, q = Math.min(
        Math.max(X, pe + I),
        n.chartWidth - pe - I
      ), ne = I + de + 10, he = n.chartHeight - I + 10, be = Math.min(Math.max(Y, ne), he);
      return { x: q, y: be };
    }
    const d = C(() => ({
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
    }), f = C(
      () => n.chartMarginRight ?? n.chartMargin
    ), m = C(() => n.chartMargin + n.plotInset), g = C(
      () => n.chartWidth - f.value - n.plotInset
    ), y = C(() => Math.max(g.value - m.value, 1)), v = C(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), p = C(() => y.value / 10 * 0.52);
    function x(X) {
      if (X < 1 || X > 10) return null;
      const Y = y.value / 10;
      return m.value + (X - 0.5) * Y;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (X, Y) => {
        const J = Y + 1, de = x(J);
        return de === null ? null : { score: J, x: de };
      }).filter((X) => X !== null)
    ), w = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const X = Math.max(...n.histogram.map((J) => J.count || 0), 1), Y = Math.max(1, Math.ceil(X * 0.2));
      return X + Y;
    }), $ = C(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const X = n.averageScore || 0;
      let Y = 0, J = 0;
      if (n.histogram.forEach((pe) => {
        const I = pe.count || 0;
        Y += I;
        const q = pe.score - X;
        J += I * (q * q);
      }), Y === 0) return 1;
      const de = J / Y;
      return Math.sqrt(de) || 1;
    }), S = (X, Y, J) => {
      if (J === 0) return 0;
      const de = 1 / (J * Math.sqrt(2 * Math.PI)), pe = -0.5 * Math.pow((X - Y) / J, 2);
      return de * Math.exp(pe);
    }, M = C(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && $.value === 0) return null;
      const X = n.averageScore, Y = $.value, J = 100, pe = Math.max(...n.histogram.map((he) => he.count || 0), 1) / w.value * v.value;
      if (pe <= 0) return null;
      let I = 0;
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), ke = S(be, X, Y);
        ke > I && (I = ke);
      }
      if (I <= 0) return null;
      const q = pe / I, ne = [];
      for (let he = 0; he <= J; he++) {
        const be = 1 + 9 * (he / J), ke = S(be, X, Y) * q, Be = x(be);
        if (Be !== null) {
          const tt = n.chartHeight - n.chartBottomMargin - ke;
          ne.push(`${he === 0 ? "M" : "L"} ${Be} ${tt}`);
        }
      }
      return ne.join(" ");
    }), O = C(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const X = y.value / 10;
      return n.histogram.map((Y) => {
        const J = Number(Y.score);
        if (!Number.isFinite(J) || J < 1 || J > 10)
          return null;
        const de = m.value + (J - 0.5) * X, pe = Y.count > 0 ? Y.count / w.value * v.value : 0, I = n.chartHeight - n.chartBottomMargin - pe;
        return {
          score: J,
          count: Y.count,
          x: de,
          y: I,
          height: pe
        };
      }).filter((Y) => Y !== null);
    }), H = C(() => x(n.minScore)), A = C(() => x(n.maxScore)), T = C(() => x(n.q1Score)), L = C(() => x(n.medianScore)), R = C(() => x(n.q3Score)), W = C(() => x(n.averageScore)), Q = C(() => n.minScore), Z = C(() => n.maxScore), ae = C(() => n.q1Score), ue = C(() => n.medianScore), ge = C(() => n.q3Score), G = C(() => n.averageScore), B = C(() => {
      const X = [], Y = n.chartMargin - 8, J = 18;
      T.value !== null && X.push({
        x: T.value,
        y: Y,
        value: n.q1Score,
        label: `Q1: ${ae.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && X.push({
        x: L.value,
        y: Y - J,
        value: n.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), W.value !== null && X.push({
        x: W.value,
        y: Y - J,
        value: n.averageScore,
        label: `Avg: ${G.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), R.value !== null && X.push({
        x: R.value,
        y: Y,
        value: n.q3Score,
        label: `Q3: ${ge.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), X.sort((I, q) => (I.x || 0) - (q.x || 0));
      const de = [[], [], []];
      X.forEach((I) => {
        if (I.x === null) return;
        let q = -1;
        for (let ne = 0; ne < de.length; ne++) {
          let he = !1;
          for (const be of de[ne]) {
            if (be.x === null) continue;
            const ke = Math.abs(I.x - be.x), Be = (I.width + be.width) / 2 + 10;
            if (ke < Be) {
              he = !0;
              break;
            }
          }
          if (!he) {
            q = ne;
            break;
          }
        }
        q === -1 && (q = de.length - 1), I.y = Y - q * J, de[q].push(I);
      });
      const pe = 15;
      return X.forEach((I) => {
        I.y < pe && (I.y = pe);
      }), X;
    }), j = (X) => B.value.find((J) => J.id === X)?.y || n.chartMargin - 10, K = C(() => {
      const X = [];
      for (let J = 0; J <= 5; J++) {
        const de = Math.round(w.value / 5 * J), pe = n.chartHeight - n.chartBottomMargin - J / 5 * v.value;
        X.push({ value: de, y: pe });
      }
      return X;
    });
    function re(X, Y, J) {
      const de = X.createSVGPoint();
      de.x = Y, de.y = J;
      const pe = X.getScreenCTM();
      if (!pe) {
        const q = X.getBoundingClientRect();
        return { x: Y - q.left, y: J - q.top };
      }
      const I = de.matrixTransform(pe.inverse());
      return { x: I.x, y: I.y };
    }
    const xe = (X, Y) => {
      n.interactive && F(X, Y);
    }, De = () => {
      n.interactive && ce();
    }, F = (X, Y) => {
      const J = X.currentTarget.closest("svg");
      if (!J) return;
      const { x: de, y: pe } = re(J, X.clientX, X.clientY), I = `Score: ${Y.score}`, q = `Count: ${Number(Y.count ?? 0).toLocaleString()}`, ne = r(I, q), he = s, be = typeof Y?.x == "number" ? Y.x : de;
      let ke = pe - 20;
      const Be = c(be, ke, ne, he);
      h.value = {
        visible: !0,
        x: Be.x,
        y: Be.y,
        title: I,
        text: q,
        width: ne,
        height: he,
        anchorX: typeof Y?.x == "number" ? Y.x : null
      };
    }, N = (X) => {
      if (n.interactive && h.value.visible) {
        const Y = X.currentTarget, { x: J, y: de } = re(Y, X.clientX, X.clientY), pe = h.value.anchorX, I = pe != null && Number.isFinite(pe) ? pe : J;
        let q = de - 20;
        const ne = c(I, q, h.value.width, h.value.height);
        h.value.x = ne.x, h.value.y = ne.y;
      }
    }, U = () => {
      ce();
    }, ce = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (X, Y) => (b(), k("div", {
      class: te(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: $e(`min-height: ${e.chartHeight}px;`),
        onMousemove: N,
        onMouseleave: U
      }, [
        Y[7] || (Y[7] = u("defs", null, [
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
        (b(!0), k(se, null, fe(K.value, (J, de) => (b(), k("line", {
          key: `grid-${de}`,
          x1: m.value,
          y1: J.y,
          x2: g.value,
          y2: J.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, fg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, gg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, pg),
        (b(!0), k(se, null, fe(K.value, (J, de) => (b(), k(se, {
          key: `y-tick-${de}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: J.y,
            x2: e.chartMargin,
            y2: J.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, mg),
          u("text", {
            x: e.chartMargin - 12,
            y: J.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, D(J.value), 9, bg)
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
        }, " Count ", 8, vg),
        u("line", {
          x1: m.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, yg),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, xg),
        (b(!0), k(se, null, fe(_.value, (J) => (b(), k(se, {
          key: `tick-${J.score}`
        }, [
          u("line", {
            x1: J.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: J.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, _g),
          u("text", {
            x: J.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, D(J.score), 9, kg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, wg),
        M.value ? (b(), k("path", {
          key: 0,
          d: M.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Cg)) : V("", !0),
        (b(!0), k(se, null, fe(O.value, (J, de) => (b(), k("rect", {
          key: `bar-${de}`,
          x: J.x - p.value / 2,
          y: J.y,
          width: p.value,
          height: J.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (pe) => xe(pe, J),
          onMouseleave: De,
          style: $e({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, $g))), 128)),
        e.showStatLabels && H.value ? (b(), k("line", {
          key: 1,
          x1: H.value,
          y1: e.chartMargin,
          x2: H.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Sg)) : V("", !0),
        e.showStatLabels && H.value ? (b(), k("text", {
          key: 2,
          x: H.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + D(Q.value.toFixed(1)), 9, Mg)) : V("", !0),
        e.showStatLabels && T.value ? (b(), k("line", {
          key: 3,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Dg)) : V("", !0),
        e.showStatLabels && T.value ? (b(), k("text", {
          key: 4,
          x: T.value,
          y: j("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + D(ae.value.toFixed(1)), 9, Tg)) : V("", !0),
        e.showStatLabels && L.value ? (b(), k("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Ag)) : V("", !0),
        e.showStatLabels && L.value ? (b(), k("text", {
          key: 6,
          x: L.value,
          y: j("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + D(ue.value.toFixed(1)), 9, Bg)) : V("", !0),
        e.showStatLabels && W.value ? (b(), k("line", {
          key: 7,
          x1: W.value,
          y1: e.chartMargin,
          x2: W.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Lg)) : V("", !0),
        e.showStatLabels && W.value ? (b(), k("text", {
          key: 8,
          x: W.value,
          y: j("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + D(G.value.toFixed(1)), 9, Pg)) : V("", !0),
        e.showStatLabels && R.value ? (b(), k("line", {
          key: 9,
          x1: R.value,
          y1: e.chartMargin,
          x2: R.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Rg)) : V("", !0),
        e.showStatLabels && R.value ? (b(), k("text", {
          key: 10,
          x: R.value,
          y: j("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + D(ge.value.toFixed(1)), 9, Eg)) : V("", !0),
        e.showStatLabels && A.value ? (b(), k("line", {
          key: 11,
          x1: A.value,
          y1: e.chartMargin,
          x2: A.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ig)) : V("", !0),
        e.showStatLabels && A.value ? (b(), k("text", {
          key: 12,
          x: A.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + D(Z.value.toFixed(1)), 9, Fg)) : V("", !0),
        e.showLegend ? (b(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Vg, [
            Y[0] || (Y[0] = u("line", {
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
            }, " Gaussian ", 8, zg)
          ]),
          u("g", Ng, [
            Y[1] || (Y[1] = u("line", {
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
            }, " Min ", 8, Hg)
          ]),
          u("g", jg, [
            Y[2] || (Y[2] = u("line", {
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
            }, " Q1 ", 8, Wg)
          ]),
          u("g", Kg, [
            Y[3] || (Y[3] = u("line", {
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
            }, " Median ", 8, Yg)
          ]),
          u("g", Ug, [
            Y[4] || (Y[4] = u("line", {
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
            }, " Avg ", 8, qg)
          ]),
          u("g", Xg, [
            Y[5] || (Y[5] = u("line", {
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
            }, " Q3 ", 8, Gg)
          ]),
          u("g", Zg, [
            Y[6] || (Y[6] = u("line", {
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
            }, " Max ", 8, Qg)
          ])
        ], 8, Og)) : V("", !0),
        e.interactive && h.value.visible ? (b(), k("g", {
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
          }, null, 8, ep),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ha,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.title), 9, tp),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + ha + Wa + Gs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, D(h.value.text), 9, np)
        ], 8, Jg)) : V("", !0)
      ], 44, hg))
    ], 2));
  }
}), al = /* @__PURE__ */ me(op, [["__scopeId", "data-v-8f9da805"]]), sp = 639, ol = 1024;
function Zs(e) {
  return e < 640 ? "mobile" : e <= ol ? "tablet" : "desktop";
}
function ip() {
  const e = oe(
    typeof window > "u" ? "desktop" : Zs(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Zs(window.innerWidth));
  };
  let n = null, a = null, o = null, s = null;
  et(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${sp}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${ol}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, n.addEventListener("change", s), a.addEventListener("change", s), o.addEventListener("change", s));
  }), dt(() => {
    !s || !n || !a || !o || (n.removeEventListener("change", s), a.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), l = C(() => e.value === "tablet"), r = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: r
  };
}
const lp = { class: "chart-container" }, rp = {
  key: 0,
  class: "loading-state loading-overlay"
}, nn = 12, cp = /* @__PURE__ */ le({
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
    To.use([Bl, Ll, Pl, Rl]);
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), { breakpoint: s } = ip(), i = oe(null), l = oe(!0), r = oe(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "4%", bottom: "4%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, f = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, m = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, y = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, v = C(() => {
      const F = s.value;
      return F === "mobile" ? {
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
      } : F === "tablet" ? {
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
    }), p = (F) => {
      const N = F.replace(/_/g, " ").replace(/\s+/g, " ").trim(), U = N.match(/^Failed:\s*(.+)$/i);
      return U ? `Failed:
${U[1].trim()}` : N;
    }, x = (F, N) => {
      const U = F.trim();
      if (!U || N < 1 || U.length <= N) return U;
      const ce = [];
      let X = 0;
      for (; X < U.length; ) {
        const Y = Math.min(X + N, U.length);
        if (Y >= U.length) {
          const pe = U.slice(X).trim();
          pe && ce.push(pe);
          break;
        }
        const J = U.slice(X, Y), de = J.lastIndexOf(" ");
        if (de > 0)
          for (ce.push(U.slice(X, X + de).trim()), X += de; X < U.length && U[X] === " "; ) X += 1;
        else
          ce.push(J), X = Y;
      }
      return ce.join(`
`);
    }, _ = (F, N) => {
      const U = F.trim();
      return !U || N < 1 ? F : U.split(`
`).map((ce) => x(ce.trim(), N)).filter(Boolean).join(`
`);
    }, w = (F) => F.status ? F.status : g.test(F.name) ? "abandon" : y.test(F.name) ? "error" : "success", $ = (F) => F.originalValue ?? F.value, S = (F, N) => {
      const U = new Set(N.map((X) => X.target)), ce = F.filter((X) => !U.has(X.name));
      for (const X of ce) {
        if (typeof X.value == "number" && X.value > 0) return X.value;
        const Y = N.filter((J) => J.source === X.name);
        if (Y.length > 0)
          return Y.reduce((J, de) => J + $(de), 0);
      }
      return N.reduce((X, Y) => Math.max(X, $(Y)), 0);
    }, M = (F, N, U) => {
      if (U && typeof U.value == "number") return U.value;
      const ce = N.filter((Y) => Y.target === F);
      return ce.length > 0 ? ce.reduce((Y, J) => Y + $(J), 0) : N.filter((Y) => Y.source === F).reduce((Y, J) => Y + $(J), 0);
    }, O = (F, N) => {
      const U = /* @__PURE__ */ new Map(), ce = new Set(N.map((Y) => Y.target)), X = F.filter((Y) => !ce.has(Y.name)).map((Y) => ({ name: Y.name, depth: 0 }));
      for (; X.length > 0; ) {
        const { name: Y, depth: J } = X.shift(), de = U.get(Y);
        if (!(de !== void 0 && de >= J)) {
          U.set(Y, J);
          for (const pe of N)
            pe.source === Y && X.push({ name: pe.target, depth: J + 1 });
        }
      }
      for (const Y of F)
        U.has(Y.name) || U.set(Y.name, 0);
      return U;
    }, H = (F, N) => {
      const U = /* @__PURE__ */ new Map(), ce = new Set(N.map((de) => de.target)), X = F.filter((de) => !ce.has(de.name));
      let Y = 0;
      const J = (de) => {
        let pe = de;
        for (; pe && !U.has(pe); )
          U.set(pe, Y), Y += 1, pe = N.filter(
            (q) => q.source === pe && w({ name: q.target }) === "success"
          ).sort((q, ne) => $(ne) - $(q))[0]?.target;
      };
      return X.forEach((de) => J(de.name)), U;
    }, A = (F, N, U) => {
      const ce = w(F);
      if (ce === "success" && U.has(F.name))
        return U.get(F.name);
      if (ce === "success") {
        const X = N.filter((J) => J.target === F.name);
        return 200 + (X.length ? Math.min(
          ...X.map(
            (J) => U.has(J.source) ? (U.get(J.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ce === "abandon" ? 1e3 : 2e3;
    }, T = (F, N) => {
      const U = O(F, N), ce = H(F, N);
      return [...F].sort((X, Y) => {
        const J = U.get(X.name) ?? 0, de = U.get(Y.name) ?? 0;
        if (J !== de) return J - de;
        const pe = m[w(X)], I = m[w(Y)];
        if (pe !== I) return pe - I;
        const q = A(X, N, ce), ne = A(Y, N, ce);
        return q !== ne ? q - ne : X.name.localeCompare(Y.name);
      });
    }, L = (F, N, U, ce) => {
      const Y = _(F, ce).split(`
`), J = N * 0.58, pe = Math.max(...Y.map((q) => q.length), 1) * J, I = Y.length * U;
      return {
        lines: Y,
        width: pe,
        height: I,
        nodeWidth: pe + nn * 2
      };
    }, R = (F, N) => N ? `${(F / N * 100).toFixed(1)}%` : "0.0%", W = (F, N, U, ce, X) => {
      if (typeof F.label == "string" && F.label)
        return _(p(F.label), X);
      const Y = _(p(F.name), X);
      if (N === "success" && U > 0) {
        const J = M(F.name, ce, F), de = R(J, U);
        return `${Y}
(${de})`;
      }
      return Y;
    }, Q = (F, N = 0) => {
      if (N > 0) return N;
      const U = F.match(/^(\d+(?:\.\d+)?)px$/);
      if (U) return Number(U[1]);
      const ce = F.match(/^(\d+(?:\.\d+)?)vh$/);
      return ce && typeof window < "u" ? Number(ce[1]) / 100 * window.innerHeight : 500;
    }, Z = (F, N, U, ce, X) => {
      if (!N.length || !F.length || X <= 0) return F;
      const Y = F.map((be) => ({ ...be })), J = U.labelLineHeight || Math.round(U.labelFontSize * 1.25), de = Math.max(4, U.labelCharsPerLine), pe = Math.max(ce * 0.88, 260), I = O(N, Y), q = /* @__PURE__ */ new Map();
      N.forEach((be) => {
        const ke = I.get(be.name) ?? 0;
        q.set(ke, (q.get(ke) ?? 0) + 1);
      });
      const ne = (be) => {
        const Be = N.find((Qt) => Qt.name === be)?.displayLabel || be, ut = L(Be, U.labelFontSize, J, de).height + nn * 2, Zt = I.get(be) ?? 0, kt = q.get(Zt) ?? 1, pn = (Math.max(kt, 1) - 1) * U.nodeGap / Math.max(kt, 1), Aa = Math.max(pe - pn, ut);
        return Math.max(1, ut / Aa * X);
      }, he = (be) => {
        const ke = Y.filter((Be) => Be.target === be);
        return ke.length > 0 ? ke.reduce((Be, tt) => Be + tt.value, 0) : Y.filter((Be) => Be.source === be).reduce((Be, tt) => Be + tt.value, 0);
      };
      for (let be = 0; be < 16; be += 1) {
        let ke = !1;
        for (const Be of N) {
          const tt = ne(Be.name), ut = he(Be.name);
          if (ut >= tt) continue;
          const Zt = Y.filter((Qt) => Qt.target === Be.name), kt = Y.filter((Qt) => Qt.source === Be.name), pn = Zt.length > 0 ? Zt : kt;
          if (pn.length === 0) continue;
          const Aa = tt / Math.max(ut, 1e-6);
          pn.forEach((Qt) => {
            Qt.value *= Aa;
          }), ke = !0;
        }
        if (!ke) break;
      }
      return Y;
    }, ae = (F, N, U) => {
      const ce = S(F, N), X = T(F, N), Y = U.labelLineHeight || Math.round(U.labelFontSize * 1.25), J = Math.max(4, U.labelCharsPerLine);
      let de = U.nodeWidth;
      const pe = [], I = X.map((ne, he) => {
        const be = w(ne), ke = W(
          ne,
          be,
          ce,
          N,
          J
        );
        pe.push(ke);
        const Be = L(ke, U.labelFontSize, Y, J);
        U.orient === "vertical" ? de = Math.max(de, Be.height + nn * 2) : de = Math.max(de, Be.nodeWidth);
        const tt = n.nodeColors[ne.name] || f[be] || ue[he % ue.length], ut = Math.max(Math.ceil(Be.nodeWidth - nn * 2), 48);
        return {
          ...ne,
          displayLabel: ke,
          label: {
            width: ut,
            overflow: "none",
            lineHeight: Y,
            fontSize: U.labelFontSize
          },
          itemStyle: {
            color: tt,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let q = { ...U.contentMargins };
      if (U.orient === "vertical") {
        const ne = Math.max(
          ...pe.map(
            (be) => L(be, U.labelFontSize, Y, J).width
          ),
          0
        ), he = typeof q.right == "number" ? q.right : 10;
        q = {
          ...q,
          right: Math.max(he, ne + nn + U.labelDistance)
        };
      }
      return { nodes: I, maxNodeWidth: de, contentMargins: q, originTotal: ce };
    }, ue = [
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
    ], ge = () => {
      const F = n.data.links.filter(
        (X) => X.source && X.target && typeof X.value == "number"
      ), N = Math.max(...F.map((X) => X.value), 1), U = Math.max(1, N * 0.01), ce = F.map((X) => ({
        ...X,
        originalValue: X.value,
        value: X.value < N * 0.01 ? U : X.value
      }));
      return {
        nodes: n.data.nodes.filter((X) => X.name),
        links: ce
      };
    }, G = (F) => (N) => {
      const U = N.dataType === "node", ce = o.value.tooltipText, X = a.value ? "#d1d5db" : "#e2e8f0";
      if (U) {
        const I = F.filter((he) => he.target === N.name), q = F.filter((he) => he.source === N.name), ne = I.length > 0 ? I.reduce((he, be) => he + (be.originalValue || be.value), 0) : q.reduce((he, be) => he + (be.originalValue || be.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ce};">${N.name}</div><div style="color: ${X}; font-size: 12px;">Count: ${ne.toLocaleString()}</div>`;
      }
      const Y = N.data?.source || N.source || "Unknown", J = N.data?.target || N.target || "Unknown", de = N.data?.originalValue || N.data?.value || N.value || 0, pe = N.data?.label || `${de.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ce};">${Y} → ${J}</div><div style="color: ${X}; font-size: 12px;">Flow: ${pe}</div>`;
    }, B = () => {
      if (!c || !n.data.nodes?.length || !n.data.links?.length) return;
      const F = v.value, N = a.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", U = a.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ce = a.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", X = F.labelPosition === "inside" ? "#ffffff" : a.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: Y, links: J } = ge(), { nodes: de, maxNodeWidth: pe, contentMargins: I, originTotal: q } = ae(
          Y,
          J,
          F
        ), ne = Q(n.height, i.value?.clientHeight ?? 0), he = Z(
          J,
          de,
          {
            labelFontSize: F.labelFontSize,
            labelLineHeight: F.labelLineHeight || Math.round(F.labelFontSize * 1.25),
            labelCharsPerLine: F.labelCharsPerLine,
            nodeGap: F.nodeGap
          },
          ne,
          q
        ), be = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: G(he),
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
              data: de,
              links: he,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: U,
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
                position: F.labelPosition,
                color: X,
                fontWeight: 700,
                fontSize: F.labelFontSize,
                lineHeight: F.labelLineHeight || Math.round(F.labelFontSize * 1.25),
                padding: nn,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...F.orient === "horizontal" ? { width: Math.max(pe - nn * 2, 48), overflow: "none" } : F.labelWrap && F.labelTextWidth > 0 ? { width: F.labelTextWidth, overflow: "none" } : {},
                ...F.labelDistance > 0 ? { distance: F.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ke) => ke.data?.displayLabel || ke.name || ""
              },
              edgeLabel: F.edgeLabelShow ? {
                show: !0,
                fontSize: F.edgeLabelFontSize,
                color: ce,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ke) => {
                  if (ke.data?.label) return ke.data.label;
                  const Be = ke.data?.originalValue ?? ke.value ?? 0, tt = ke.data?.source ?? ke.source, ut = he.filter((kt) => kt.source === tt).reduce((kt, pn) => kt + $(pn), 0), Zt = R(Be, ut);
                  return `${Number(Be).toLocaleString()} (${Zt})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: F.nodeGap,
              nodeWidth: pe,
              layoutIterations: h.node.iterations,
              orient: F.orient,
              draggable: !1,
              ...I
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(be), c.resize();
      } catch (Y) {
        console.error("Error setting Sankey chart options:", Y), r.value = !0;
      }
    }, j = async () => {
      if (i.value)
        try {
          c = To.init(i.value), B(), window.addEventListener("resize", xe);
        } catch (F) {
          console.error("Error initializing Sankey chart:", F), r.value = !0;
        } finally {
          l.value = !1;
        }
    }, K = () => {
      const F = i.value;
      return !!(F && F.clientWidth > 0 && F.clientHeight > 0);
    }, re = async () => {
      if (await He(), K()) return j();
      await new Promise((F) => {
        const N = i.value;
        if (!N) {
          F();
          return;
        }
        d = new ResizeObserver(() => {
          K() && (d?.disconnect(), d = null, j().then(F));
        }), d.observe(N);
      });
    }, xe = () => c?.resize(), De = () => {
      window.removeEventListener("resize", xe), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return et(() => re()), li(De), Fe(() => n.data, B, { deep: !0 }), Fe(a, B), Fe(s, B), t({ isDark: a }), (F, N) => (b(), k("div", lp, [
      r.value ? (b(), k("div", {
        key: 0,
        class: "error-state",
        style: $e({ height: e.height })
      }, [...N[0] || (N[0] = [
        Mo('<div class="error-content" data-v-b04b208a><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b04b208a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b04b208a></path></svg><p class="error-title" data-v-b04b208a>Chart could not be loaded</p><p class="error-description" data-v-b04b208a>Please check the data format.</p></div>', 1)
      ])], 4)) : (b(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: $e({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        l.value ? (b(), k("div", rp, [...N[1] || (N[1] = [
          Mo('<div class="loading-container" data-v-b04b208a><div class="sankey-loader" data-v-b04b208a><div class="flow flow-1" data-v-b04b208a></div><div class="flow flow-2" data-v-b04b208a></div><div class="flow flow-3" data-v-b04b208a></div><div class="flow flow-4" data-v-b04b208a></div></div><p class="loading-text" data-v-b04b208a>Loading Sankey diagram...</p></div>', 1)
        ])])) : V("", !0)
      ], 4))
    ]));
  }
}), Gt = /* @__PURE__ */ me(cp, [["__scopeId", "data-v-b04b208a"]]), dp = ["open"], up = { class: "card-header metric-collapsible__summary" }, hp = { class: "header-content metric-header-content" }, fp = { class: "metric-header-content__main" }, gp = { class: "metric-header-content__text" }, pp = { class: "metric-header-content__loaded" }, mp = {
  key: 0,
  class: "card-title"
}, bp = {
  key: 0,
  class: "card-subtitle"
}, vp = {
  key: 0,
  class: "metric-header-content__export"
}, yp = {
  key: 0,
  class: "cmc-header-aside"
}, xp = {
  key: 0,
  class: "chart-metric-container__body"
}, _p = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, kp = { key: "body-content" }, wp = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Cp = { class: "card-header" }, $p = { class: "header-content metric-header-content" }, Sp = { class: "metric-header-content__main" }, Mp = { class: "metric-header-content__text" }, Dp = { class: "metric-header-content__loaded" }, Tp = {
  key: 0,
  class: "card-title"
}, Ap = {
  key: 0,
  class: "card-subtitle"
}, Bp = {
  key: 0,
  class: "metric-header-content__export"
}, Lp = {
  key: 0,
  class: "cmc-header-aside"
}, Pp = {
  key: 0,
  class: "chart-metric-container__body"
}, Rp = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Ep = { key: "body-content" }, Ip = /* @__PURE__ */ le({
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
    const n = e, a = t, o = oe(n.defaultOpen), s = oe(n.defaultOpen), i = eo();
    function l(f) {
      return f.some((m) => {
        if (m.type === Tl) return !1;
        if (m.type === Text) {
          const g = m.children;
          return typeof g == "string" && g.trim().length > 0;
        }
        return !!m.type;
      });
    }
    const r = C(() => n.collapsible ? n.lazyMount ? s.value : o.value : !0), c = C(() => n.loading && r.value), d = C(() => {
      if (n.collapsible && !o.value) return !1;
      const f = i.headerExport;
      return f ? l(f()) : !1;
    });
    Fe(
      () => n.defaultOpen,
      (f) => {
        n.collapsible && (o.value = f, f && (s.value = !0));
      }
    );
    function h(f) {
      const m = f.currentTarget;
      if (m?.tagName !== "DETAILS") return;
      const g = o.value, y = m.open;
      if (o.value = y, y && !g) {
        const v = !s.value;
        s.value = !0, v && a("open");
      }
      a("toggle", y);
    }
    return (f, m) => e.collapsible ? (b(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: o.value,
      onToggle: h
    }, [
      u("summary", up, [
        u("div", hp, [
          u("div", fp, [
            u("div", gp, [
              u("div", pp, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (b(), k("h3", mp, D(e.title), 1)) : V("", !0)
                ], !0),
                e.subtitle ? (b(), k("p", bp, D(e.subtitle), 1)) : V("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (b(), k("div", vp, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          f.$slots.headerAside ? (b(), k("div", yp, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ]),
        m[0] || (m[0] = u("svg", {
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
      r.value ? (b(), k("div", xp, [
        z(gt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            c.value ? (b(), k("div", _p, [
              _e(f.$slots, "loading", {}, () => [
                m[1] || (m[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (b(), k("div", kp, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : V("", !0)
    ], 40, dp)) : (b(), k("div", wp, [
      u("div", Cp, [
        u("div", $p, [
          u("div", Sp, [
            u("div", Mp, [
              u("div", Dp, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (b(), k("h3", Tp, D(e.title), 1)) : V("", !0)
                ], !0),
                e.subtitle ? (b(), k("p", Ap, D(e.subtitle), 1)) : V("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (b(), k("div", Bp, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          f.$slots.headerAside ? (b(), k("div", Lp, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ])
      ]),
      r.value ? (b(), k("div", Pp, [
        z(gt, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            c.value ? (b(), k("div", Rp, [
              _e(f.$slots, "loading", {}, () => [
                m[2] || (m[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (b(), k("div", Ep, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : V("", !0)
    ]));
  }
}), Ce = /* @__PURE__ */ me(Ip, [["__scopeId", "data-v-46090b42"]]);
function Fp(e, t) {
  return b(), k("svg", {
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
function wo(e, t) {
  return b(), k("svg", {
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
function at(e, t) {
  return b(), k("svg", {
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
function Op(e, t) {
  return b(), k("svg", {
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
function hn(e, t) {
  return b(), k("svg", {
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
function sl(e, t) {
  return b(), k("svg", {
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
function il(e, t) {
  return b(), k("svg", {
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
function Vp(e, t) {
  return b(), k("svg", {
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
function zp(e, t) {
  return b(), k("svg", {
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
function Qs(e, t) {
  return b(), k("svg", {
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
function Js(e, t) {
  return b(), k("svg", {
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
function Np(e, t) {
  return b(), k("svg", {
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
function Hp(e, t) {
  return b(), k("svg", {
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
function jp(e, t) {
  return b(), k("svg", {
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
function ll(e, t) {
  return b(), k("svg", {
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
const Wp = {
  key: 0,
  class: "footer-divider"
}, Kp = {
  key: 0,
  class: "export-label"
}, Yp = { class: "export-buttons" }, Up = ["disabled"], qp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Xp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Gp = ["disabled"], Zp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Qp = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Jp = /* @__PURE__ */ le({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = C(() => n.variant === "footer" ? "footer" : "div"), s = C(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (r) => n.formats.includes(r), l = (r) => {
      n.loading || a("export", r);
    };
    return (r, c) => (b(), ee(St(o.value), {
      class: te(s.value)
    }, {
      default: E(() => [
        e.variant === "footer" ? (b(), k("div", Wp)) : V("", !0),
        u("div", {
          class: te(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (b(), k("span", Kp, "Export")) : V("", !0),
          u("div", Yp, [
            i("pdf") ? (b(), k("button", {
              key: 0,
              type: "button",
              class: te(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => l("pdf"))
            }, [
              e.loading ? (b(), k("svg", qp, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", Xp, [...c[3] || (c[3] = [
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
            ], 10, Up)) : V("", !0),
            i("csv") ? (b(), k("button", {
              key: 1,
              type: "button",
              class: te(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => l("csv"))
            }, [
              e.loading ? (b(), k("svg", Zp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", Qp, [...c[6] || (c[6] = [
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
            ], 10, Gp)) : V("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Oe = /* @__PURE__ */ me(Jp, [["__scopeId", "data-v-ebfab47f"]]), em = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, tm = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, nm = { class: "w-full shrink-0 sm:pr-2" }, am = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, om = { class: "max-w-[360px] text-center" }, sm = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, im = /* @__PURE__ */ le({
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
    }, o = e, s = n, i = (f) => {
      s("export", f);
    }, l = Se(o, "theme"), r = Se(o, "options"), { isDark: c } = Me(l), d = (f) => {
      const m = new Date(f), g = String(m.getDate()).padStart(2, "0"), y = String(m.getMonth() + 1).padStart(2, "0");
      return `${g}-${y}`;
    }, h = C(() => {
      const f = o.data?.agents_by_day || {}, m = Object.keys(f).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const g = m.map((_) => d(_)), y = /* @__PURE__ */ new Set();
      for (const _ of Object.values(f))
        for (const w of Object.keys(_))
          y.add(w);
      const v = Array.from(y), p = (_) => _, x = v.map((_) => ({
        label: _,
        data: m.map((w) => f[w]?.[_] || 0),
        backgroundColor: `${a[_] || "#94a3b8"}80`,
        borderColor: p(a[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (f, m) => (b(), ee(Ce, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", em, [
          z(gt, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: E(() => [
              h.value.labels && h.value.labels.length ? (b(), k("section", tm, [
                u("div", nm, [
                  z(Tt, {
                    data: h.value,
                    stacked: !0,
                    theme: l.value,
                    options: r.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (b(), k("section", am, [
                u("div", om, [
                  u("div", sm, [
                    z(P(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  m[0] || (m[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  m[1] || (m[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), lm = /* @__PURE__ */ me(im, [["__scopeId", "data-v-f8d0ec91"]]), gn = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", ve = (e, t) => `${e.toLocaleString()} (${gn(e, t)})`, rm = { class: "flex w-full min-w-0 justify-center" }, cm = { class: "flex max-w-full min-w-0 items-center gap-2" }, dm = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, um = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, hm = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, fm = /* @__PURE__ */ le({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (b(), k("div", {
      class: te(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", rm, [
        u("div", cm, [
          e.color ? (b(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: $e({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", dm, D(e.title), 1)
        ])
      ]),
      u("p", um, D(e.value), 1),
      e.subvalue ? (b(), k("p", hm, D(e.subvalue), 1)) : V("", !0)
    ], 2));
  }
}), ye = /* @__PURE__ */ me(fm, [["__scopeId", "data-v-0d546967"]]), rl = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function cl(e, t) {
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
const gm = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ue = /* @__PURE__ */ le({
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
    const t = e, n = C(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = C(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), o = C(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), s = C(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = C(
      () => cl(t.color, t.outlined)
    );
    return (l, r) => n.value ? (b(), k("span", {
      key: 0,
      role: "status",
      class: te(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (b(), k("span", gm, [...r[0] || (r[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      u("span", {
        class: te(["min-w-0 flex-1 text-center", s.value])
      }, D(a.value), 3)
    ], 2)) : (b(), k("span", {
      key: 1,
      class: te([P(rl), i.value])
    }, [
      _e(l.$slots, "default", {}, () => [
        Te(D(e.label), 1)
      ])
    ], 2));
  }
}), ie = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Le = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Vt = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, pm = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, mm = { class: "overflow-x-auto" }, bm = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, vm = ["aria-sort", "onClick"], ym = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, xm = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, _m = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, km = /* @__PURE__ */ le({
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
    const n = e, a = t, o = oe(!1), s = "—";
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
    function d(w, $) {
      if (typeof n.rowKey == "function")
        return n.rowKey(w);
      const S = w[n.rowKey];
      return typeof S == "string" || typeof S == "number" ? S : $;
    }
    function h(w, $) {
      return d(w, $);
    }
    function f(w) {
      return n.sortKey === w && n.sortDirection != null;
    }
    function m(w) {
      a("sort", w);
    }
    function g(w) {
      return f(w) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const y = C(() => n.rows?.length ?? 0), v = C(() => y.value > n.maxVisibleRows), p = C(() => Math.max(0, y.value - n.maxVisibleRows)), x = C(() => n.rows?.length ? o.value || !v.value ? n.rows : n.rows.slice(0, n.maxVisibleRows) : []), _ = C(
      () => n.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (w, $) => (b(), k("div", pm, [
      u("div", mm, [
        u("table", bm, [
          u("thead", null, [
            u("tr", null, [
              (b(!0), k(se, null, fe(e.columns, (S) => (b(), k("th", {
                key: S.key,
                scope: "col",
                class: te(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [l(S.align), S.headerClass]])
              }, [
                S.sortable ? (b(), k("button", {
                  key: 0,
                  type: "button",
                  class: te(["kiut-table-sort-btn inline-flex items-center gap-1", l(S.align)]),
                  "aria-sort": g(S.key),
                  onClick: (M) => m(S.key)
                }, [
                  u("span", null, D(S.label), 1),
                  u("span", ym, [
                    f(S.key) ? (b(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (b(), k("span", xm, "↑")) : e.sortDirection === "desc" ? (b(), k("span", _m, "↓")) : V("", !0)
                    ], 64)) : (b(), k(se, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, vm)) : (b(), k(se, { key: 1 }, [
                  Te(D(S.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (b(!0), k(se, null, fe(x.value, (S, M) => (b(), k("tr", {
              key: h(S, M)
            }, [
              (b(!0), k(se, null, fe(e.columns, (O) => (b(), k("td", {
                key: `${M}-${O.key}`,
                class: te(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [l(O.align), O.cellClass]])
              }, [
                _e(w.$slots, r(O.key), {
                  row: S,
                  column: O,
                  value: c(S, O.key)
                }, () => [
                  Te(D(i(c(S, O.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      v.value ? (b(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (S) => o.value = !o.value)
      }, [
        Te(D(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (b(), k("svg", {
          class: te(["view-more-icon", { "view-more-icon-rotated": o.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...$[3] || ($[3] = [
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
}), rt = /* @__PURE__ */ me(km, [["__scopeId", "data-v-22a97a18"]]), wm = {
  key: "error",
  class: "error-state"
}, Cm = { class: "error-content" }, $m = { class: "error-description" }, Sm = {
  key: "content",
  class: "card-body"
}, Mm = { class: "chart-section" }, Dm = { class: "chart-wrapper" }, Tm = { class: "payment-success-summary" }, Am = {
  key: 0,
  class: "booking-daily-section"
}, Bm = { class: "w-full min-w-0" }, Lm = { class: "font-medium" }, Pm = { class: "percentage-text" }, Rm = { class: "badges-container" }, Em = {
  key: 0,
  class: "badges-container"
}, Im = {
  key: 1,
  class: "percentage-text"
}, Fm = { class: "badges-container" }, Om = {
  key: 1,
  class: "empty-state"
}, Vm = /* @__PURE__ */ le({
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
    function n(p) {
      return p;
    }
    const a = e, o = t, s = (p) => {
      o("export", p);
    }, i = C(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (p, x) => new Date(p.date).getTime() - new Date(x.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], r = C(
      () => i.value.map((p) => ({
        id: p.date,
        ...p
      }))
    ), c = C(() => a.data?.total_payment_success_value || []), d = C(() => {
      const p = c.value;
      return p.length === 0 ? g(0) : p.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (p) => p.payment_success_value || [], f = (p) => typeof p.payment_success_count == "number" ? p.payment_success_count : (p.payment_success_value || []).reduce(
      (x, _) => x + (_.count || 0),
      0
    ), m = (p) => Le(p), g = (p) => p == null ? "0" : Vt(p);
    C(() => (a.data?.total_payment_success_value || []).reduce(
      (p, x) => p + (x.total_value || 0),
      0
    ));
    const y = C(() => {
      const p = a.data, x = p.total_booking_initiated || 0, _ = p.total_booking_started || 0, w = p.total_payment_initiated || 0, $ = p.total_not_found || 0, S = p.total_cancelled || 0, M = p.total_no_pending_balance || 0, O = p.total_errors || 0, H = typeof p.total_payment_success == "number" ? p.total_payment_success : (p.total_payment_success_value || []).reduce(
        (Z, ae) => Z + (ae.count || 0),
        0
      ), A = p.total_payment_failed || 0, T = Math.max(0, x - _), L = Math.max(
        0,
        _ - w - $ - S - M - O
      ), R = (Z, ae) => ve(Z, ae), W = [
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
      ], Q = [];
      return _ > 0 && Q.push({
        source: "Initiated",
        target: "Started",
        value: _,
        label: R(_, x)
      }), T > 0 && Q.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: R(T, x)
      }), w > 0 && Q.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: R(w, _)
      }), $ > 0 && Q.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: R($, _)
      }), S > 0 && Q.push({
        source: "Started",
        target: "Cancelled",
        value: S,
        label: R(S, _)
      }), M > 0 && Q.push({
        source: "Started",
        target: "No Pending Balance",
        value: M,
        label: R(M, _)
      }), O > 0 && Q.push({
        source: "Started",
        target: "Errors",
        value: O,
        label: R(O, _)
      }), L > 0 && Q.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: R(L, _)
      }), H > 0 && Q.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: H,
        label: R(H, w)
      }), A > 0 && Q.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: A,
        label: R(A, w)
      }), { nodes: W, links: Q };
    }), v = (p, x) => gn(p, x);
    return (p, x) => (b(), ee(Ce, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: x[0] || (x[0] = (_) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading && !a.error ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        z(gt, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            a.error ? (b(), k("div", wm, [
              u("div", Cm, [
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
                u("p", $m, D(a.error), 1)
              ])
            ])) : (b(), k("div", Sm, [
              u("section", Mm, [
                u("div", Dm, [
                  z(Gt, {
                    data: y.value,
                    height: "500px",
                    "use-gradient": !1,
                    "node-gap": 24
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Tm, [
                z(ye, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (b(), k("section", Am, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Bm, [
                  z(rt, {
                    columns: l,
                    rows: r.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": E(({ row: _ }) => [
                      u("span", Lm, D(P(Ke)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": E(({ row: _ }) => [
                      u("span", null, D(P(ie)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": E(({ row: _ }) => [
                      u("span", null, [
                        Te(D(P(ie)(Number(_.booking_started_count))) + " ", 1),
                        u("span", Pm, " (" + D(v(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": E(({ row: _ }) => [
                      u("span", null, D(P(ie)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": E(({ row: _ }) => [
                      u("div", Rm, [
                        z(Ue, { color: "success" }, {
                          default: E(() => [
                            Te(" Success: " + D(P(ie)(
                              f(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ue, { color: "danger" }, {
                          default: E(() => [
                            Te(" Failed: " + D(P(ie)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": E(({ row: _ }) => [
                      h(_).length > 0 ? (b(), k("div", Em, [
                        (b(!0), k(se, null, fe(h(
                          _
                        ), (w) => (b(), k("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, D(w.currency) + " " + D(m(w.total_value)), 1))), 128))
                      ])) : (b(), k("span", Im, "N/A"))
                    ]),
                    "cell-outcomes": E(({ row: _ }) => [
                      u("div", Fm, [
                        z(Ue, { color: "danger" }, {
                          default: E(() => [
                            Te(" Not Found: " + D(_.not_found_count ? P(ie)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ue, { color: "warning" }, {
                          default: E(() => [
                            Te(" Cancelled: " + D(_.cancelled_count ? P(ie)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ue, { color: "orange" }, {
                          default: E(() => [
                            Te(" No Balance: " + D(_.no_pending_balance_count ? P(ie)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        z(Ue, { color: "danger" }, {
                          default: E(() => [
                            Te(" Errors: " + D(_.error_count ? P(ie)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (b(), k("section", Om, [...x[4] || (x[4] = [
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
}), zm = /* @__PURE__ */ me(Vm, [["__scopeId", "data-v-b053e988"]]), Nm = { class: "card-body" }, Hm = {
  key: 0,
  class: "chart-section"
}, jm = { class: "chart-wrapper" }, Wm = {
  key: 1,
  class: "checkin-daily-section"
}, Km = { class: "w-full min-w-0" }, Ym = { class: "font-medium" }, Um = { class: "cell-success" }, qm = { class: "cell-danger" }, Xm = {
  key: 0,
  class: "reasons-list"
}, Gm = { class: "reason-name" }, Zm = { class: "reason-count" }, Qm = {
  key: 1,
  class: "no-reasons"
}, Jm = {
  key: 2,
  class: "empty-state"
}, e0 = {
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
    const n = t, a = (w) => {
      n("export", w);
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
    }, d = C(
      () => o.showPaymentLinks ? [...r, c] : r
    ), h = C(
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
    ), f = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.checkin_by_day) && w.checkin_by_day.length > 0 || (w.total_checkin_initiated ?? 0) > 0) ? { ...s, ...w } : o.checkinData ?? s;
    }), m = C(() => {
      const w = o.data;
      return w && (Array.isArray(w.failed_by_step_by_day) && w.failed_by_step_by_day.length > 0 || Array.isArray(w.unrecovered_by_step) && w.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: w.total_checkin_failed ?? 0,
        total_checkin_unrecovered: w.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: w.failed_by_step_by_day ?? [],
        unrecovered_by_step: w.unrecovered_by_step ?? [],
        unrecovered_by_day: w.unrecovered_by_day ?? []
      } : o.failedData ?? i;
    }), g = (w, $) => !$ || $ === 0 ? "0.0%" : gn(w, $), y = (w, $) => {
      const S = ie(w), M = g(w, $);
      return `${S} (${M})`;
    }, v = (w) => w.reduce(($, S) => $ + S.failed_count, 0), p = C(() => {
      const w = [], $ = [];
      if (!f.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      w.push({ name: "Checkin Init" }), w.push({ name: "Booking retrive" }), w.push({ name: "Booking retrive success" }), w.push({ name: "Number of Passengers" }), w.push({ name: "Completed" }), w.push({ name: "Closed with BP" });
      const S = f.value.total_checkin_initiated, M = f.value.total_checkin_init, O = f.value.total_checkin_init_abandoned, H = M - O, A = f.value.total_checkin_started, T = f.value.total_checkin_completed, L = f.value.total_checkin_closed, R = m.value.unrecovered_by_step || [], W = R.reduce(
        (ue, ge) => ue + ge.count,
        0
      );
      M > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: M,
        label: ve(M, S)
      });
      const Q = S - M;
      Q > 0 && (w.push({ name: "Abandoned (Init)", status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Q,
        label: ve(Q, S)
      })), O > 0 && (w.push({ name: "Abandoned (Started)", status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: O,
        label: ve(O, S)
      })), H > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: H,
        label: ve(H, S)
      }), A > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: A,
        label: ve(A, S)
      }), T > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: T,
        label: ve(T, A)
      }), R.length > 0 && W > 0 && (w.push({ name: "Unrecovered", status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: W,
        label: ve(W, A)
      }), R.forEach((ue) => {
        const G = ue.step_name.replace(/_/g, " ").split(" ").map((B) => B.charAt(0).toUpperCase() + B.slice(1)).join(" ");
        w.push({ name: G, status: "error" }), $.push({
          source: "Unrecovered",
          target: G,
          value: ue.count,
          label: ve(ue.count, A)
        });
      }));
      const Z = A - (T + W);
      Z > 0 && (w.push({ name: "Abandoned (Flow)", status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: Z,
        label: ve(Z, A)
      }));
      const ae = T - L;
      return ae > 0 && (w.push({ name: "BP Error", status: "error" }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ae,
        label: ve(ae, A)
      })), L > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: L,
        label: ve(L, A)
      }), { nodes: w, links: $ };
    }), x = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const w = f.value.checkin_by_day || [], $ = m.value.failed_by_step_by_day || [], S = x();
      if (w.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...w].map((M) => {
        const O = $.find(
          (A) => A.date === M.date
        ), H = S.find(
          (A) => A.date === M.date
        );
        return {
          ...M,
          failed_steps: O?.steps || [],
          record_locator_create_payment_count: M.record_locator_create_payment_count ?? H?.record_locator_create_payment_count ?? 0
        };
      }), l.value.sort((M, O) => new Date(M.date) - new Date(O.date));
    };
    return Fe(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (b(), ee(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", Nm, [
          p.value.nodes.length > 0 ? (b(), k("section", Hm, [
            u("div", jm, [
              z(Gt, {
                data: p.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : V("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", Wm, [
            u("div", Km, [
              z(rt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: S }) => [
                  u("span", Ym, D(P(Ke)(String(S.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: S }) => [
                  u("span", null, D(P(ie)(S.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: S }) => [
                  u("span", null, D(y(
                    S.checkin_init_count,
                    S.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": E(({ row: S }) => [
                  u("span", null, D(P(ie)(S.checkin_started_count)), 1)
                ]),
                "cell-completed": E(({ row: S }) => [
                  u("span", null, D(y(
                    S.checkin_completed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: S }) => [
                  u("span", Um, D(y(
                    S.checkin_closed_count,
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: S }) => [
                  u("span", qm, D(y(
                    v(S.failed_steps),
                    S.checkin_started_count
                  )), 1)
                ]),
                "cell-reasons": E(({ row: S }) => [
                  S.failed_steps && S.failed_steps.length > 0 ? (b(), k("div", Xm, [
                    (b(!0), k(se, null, fe(S.failed_steps, (M) => (b(), k("div", {
                      key: M.step_name,
                      class: "reason-item"
                    }, [
                      u("span", Gm, D(M.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", Zm, D(M.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Qm, "-"))
                ]),
                "cell-createPayment": E(({ row: S }) => [
                  u("span", null, D(P(ie)(S.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (b(), k("section", Jm, [...$[0] || ($[0] = [
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
}, dl = /* @__PURE__ */ me(e0, [["__scopeId", "data-v-d623189e"]]), t0 = { class: "card-body" }, n0 = {
  key: 0,
  class: "sankey-section"
}, a0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, o0 = { class: "w-full min-w-0" }, s0 = { class: "font-medium whitespace-nowrap" }, i0 = { class: "cell-success" }, l0 = { class: "cell-danger" }, r0 = {
  key: 0,
  class: "reasons-list"
}, c0 = { class: "reason-name" }, d0 = { class: "reason-count" }, u0 = {
  key: 1,
  class: "no-reasons"
}, h0 = {
  key: 2,
  class: "empty-state"
}, f0 = { class: "empty-state-content" }, g0 = { class: "empty-icon-wrapper" }, p0 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), l = (v) => v == null ? "0" : v.toLocaleString(), r = (v) => {
      const [p, x, _] = v.split("-").map(Number);
      return Ke([p, x - 1, _]).format("MMM DD");
    }, c = (v) => v.replace(/_/g, " ").replace(/\b\w/g, (p) => p.toUpperCase()), d = (v, p) => gn(v, p), h = (v, p) => {
      const x = v || 0, _ = p || 0, w = l(x), $ = d(x, _);
      return `${w} (${$})`;
    }, f = C(() => {
      const v = a.checkinData?.record_locator_by_day || [], p = a.failedData?.failed_by_step_by_day || [], x = a.failedData?.unrecovered_by_day || [];
      return v.map((w) => {
        const $ = p.find((M) => M.date === w.date), S = x.find(
          (M) => M.date === w.date
        );
        return {
          ...w,
          failed_steps: $?.steps || [],
          unrecovered_count: S?.unrecovered_count || 0
        };
      }).sort(
        (w, $) => new Date(w.date).getTime() - new Date($.date).getTime()
      );
    }), m = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = C(
      () => f.value.map((v) => ({
        id: v.date,
        date: v.date,
        checkin_initiated: v.checkin_initiated,
        record_locator_init_count: v.record_locator_init_count,
        record_locator_started_count: v.record_locator_started_count,
        record_locator_completed_count: v.record_locator_completed_count,
        record_locator_closed_count: v.record_locator_closed_count,
        unrecovered_count: v.unrecovered_count,
        failed_steps: v.failed_steps
      }))
    ), y = C(() => {
      const v = [], p = [], x = /* @__PURE__ */ new Set(), _ = (De) => {
        x.has(De) || (v.push({ name: De }), x.add(De));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: v, links: p };
      _("Checkin Init"), _("Booking Retrieval"), _("Booking Retrieved"), _("Completed"), _("Closed with BP");
      const w = a.checkinData.total_checkin_initiated || 0, $ = a.checkinData.total_record_locator_init || 0, S = a.checkinData.total_record_locator_init_abandoned || 0, M = a.checkinData.total_checkin_pre_init_abandoned_error, O = a.checkinData.total_checkin_pre_init_abandoned_voluntary, H = M != null || O != null, A = H ? Math.max(Number(M) || 0, 0) : 0, T = H ? Math.max(Number(O) || 0, 0) : 0, L = a.checkinData.total_record_locator_init_abandoned_error, R = a.checkinData.total_record_locator_init_abandoned_voluntary, W = L != null || R != null, Q = W ? Math.max(Number(L) || 0, 0) : 0, Z = W ? Math.max(Number(R) || 0, 0) : 0, ae = W ? Math.max(S - Q - Z, 0) : S, ue = $ - S, ge = a.checkinData.total_record_locator_started || 0, G = a.checkinData.total_record_locator_completed || 0, B = a.checkinData.total_record_locator_closed || 0, j = a.checkinData.total_record_locator_unrecovered || 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: $,
        label: ve($, w)
      });
      const K = w - $;
      H ? (T > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: T,
        label: ve(T, w)
      })), A > 0 && (_("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: A,
        label: ve(A, w)
      }))) : K > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: ve(K, w)
      })), W ? (Q > 0 && (_("Error"), p.push({
        source: "Booking Retrieval",
        target: "Error",
        value: Q,
        label: ve(Q, w)
      })), Z > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: Z,
        label: ve(Z, w)
      })), ae > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ae,
        label: ve(ae, w)
      }))) : S > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: S,
        label: ve(S, w)
      })), ue > 0 && p.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: ue,
        label: ve(ue, w)
      }), G > 0 && p.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: G,
        label: ve(G, ge)
      }), j > 0 && (_("Errors"), p.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: j,
        label: ve(j, ge)
      }));
      const re = ge - (G + j);
      re > 0 && (_("Abandoned (Flow)"), p.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: re,
        label: ve(re, ge)
      }));
      const xe = G - B;
      return xe > 0 && (_("BP Error"), p.push({
        source: "Completed",
        target: "BP Error",
        value: xe,
        label: ve(xe, ge)
      })), B > 0 && p.push({
        source: "Completed",
        target: "Closed with BP",
        value: B,
        label: ve(B, ge)
      }), { nodes: v, links: p };
    });
    return t({ isDark: i }), (v, p) => (b(), ee(Ce, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", t0, [
          y.value.nodes.length > 0 ? (b(), k("div", n0, [
            z(Gt, {
              data: y.value,
              height: "500px",
              "use-gradient": !1,
              "node-gap": 24
            }, null, 8, ["data"])
          ])) : V("", !0),
          f.value && f.value.length > 0 ? (b(), k("div", a0, [
            u("div", o0, [
              z(rt, {
                columns: m,
                rows: g.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: x }) => [
                  u("span", s0, D(r(String(x.date))), 1)
                ]),
                "cell-checkinInit": E(({ row: x }) => [
                  u("span", null, D(l(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": E(({ row: x }) => [
                  u("span", null, D(h(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": E(({ row: x }) => [
                  u("span", null, D(h(
                    x.record_locator_started_count,
                    x.record_locator_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: x }) => [
                  u("span", null, D(h(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: x }) => [
                  u("span", i0, D(h(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-failed": E(({ row: x }) => [
                  u("span", l0, D(h(
                    x.unrecovered_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-reasons": E(({ row: x }) => [
                  Array.isArray(x.failed_steps) && x.failed_steps.length > 0 ? (b(), k("div", r0, [
                    (b(!0), k(se, null, fe(x.failed_steps, (_) => (b(), k("div", {
                      key: _.step_name,
                      class: "reason-item"
                    }, [
                      u("span", c0, D(c(_.step_name)) + ":", 1),
                      u("span", d0, D(_.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", u0, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("div", h0, [
            u("div", f0, [
              u("div", g0, [
                z(P(at), { class: "empty-icon" })
              ]),
              p[0] || (p[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              p[1] || (p[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), m0 = /* @__PURE__ */ me(p0, [["__scopeId", "data-v-70c373c1"]]), b0 = { class: "card-body" }, v0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, y0 = { class: "w-full min-w-0" }, x0 = { class: "segment-plain" }, _0 = { class: "segment-plain" }, k0 = { class: "segment-plain" }, w0 = { class: "percentage-value" }, C0 = { class: "percentage-value" }, $0 = { class: "percentage-value success" }, S0 = {
  key: 1,
  class: "empty-state"
}, M0 = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (f) => {
      o("export", f);
    }, { isDark: i } = Me(Se(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], r = C(
      () => a.data.map((f, m) => ({
        id: `segment-${m}-${f.departure_airport}-${f.arrival_airport}-${f.segment_init_count}-${f.segment_started_count}`,
        departure_airport: f.departure_airport,
        conexion_airport: f.conexion_airport,
        arrival_airport: f.arrival_airport,
        segment_init_count: f.segment_init_count,
        segment_started_count: f.segment_started_count,
        segment_completed_count: f.segment_completed_count,
        segment_closed_count: f.segment_closed_count
      }))
    ), c = (f, m) => !m || m === 0 || !f ? "0%" : `${Math.round(f / m * 100)}%`, d = (f) => !f || f === "None" ? "-" : String(f).trim().replace(/_[0-9]+$/i, ""), h = (f) => {
      const m = d(f?.departure_airport), g = d(f?.arrival_airport);
      return m === "-" || g === "-" ? !1 : m === g;
    };
    return t({ isDark: i }), (f, m) => (b(), ee(Ce, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", b0, [
          a.data.length > 0 ? (b(), k("section", v0, [
            u("div", y0, [
              z(rt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": E(({ row: g }) => [
                  u("span", x0, D(d(g.departure_airport)), 1)
                ]),
                "cell-connection": E(({ row: g }) => [
                  u("span", {
                    class: te(["segment-plain", {
                      "segment-plain--muted": d(g.conexion_airport) === "-"
                    }])
                  }, D(d(g.conexion_airport)), 3)
                ]),
                "cell-arrival": E(({ row: g }) => [
                  u("span", _0, D(d(g.arrival_airport)), 1)
                ]),
                "cell-trip": E(({ row: g }) => [
                  u("span", k0, D(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": E(({ row: g }) => [
                  Te(D(P(ie)(g.segment_init_count)), 1)
                ]),
                "cell-started": E(({ row: g }) => [
                  u("span", w0, D(c(
                    g.segment_started_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-completed": E(({ row: g }) => [
                  u("span", C0, D(c(
                    g.segment_completed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-closed": E(({ row: g }) => [
                  u("span", $0, D(c(
                    g.segment_closed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", S0, [...m[0] || (m[0] = [
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
}), ul = /* @__PURE__ */ me(M0, [["__scopeId", "data-v-b8704d3c"]]), D0 = { class: "checkin-container__body" }, T0 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = C(
      () => n.loading ? !1 : n.checkinLoading
    ), s = C(
      () => n.loading ? !1 : n.segmentsLoading
    );
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
    return (c, d) => (b(), ee(Ce, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[1] || (d[1] = (h) => a("open"))
    }, {
      default: E(() => [
        u("div", D0, [
          e.showCheckin ? (b(), ee(dl, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: o.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            "show-payment-links": e.showPaymentLinks,
            onExport: d[0] || (d[0] = (h) => i("checkin", h))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "show-payment-links"])) : V("", !0),
          z(ul, {
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
}), A0 = /* @__PURE__ */ me(T0, [["__scopeId", "data-v-cf0fe2d3"]]), B0 = { class: "card-body" }, L0 = { class: "chart-section" }, P0 = { class: "chart-wrapper" }, R0 = {
  key: 1,
  class: "empty-chart"
}, E0 = { class: "payment-success-summary" }, I0 = {
  key: 0,
  class: "disruption-daily-section"
}, F0 = { class: "w-full min-w-0" }, O0 = { class: "font-medium text-center" }, V0 = { class: "text-center" }, z0 = { class: "text-center" }, N0 = { class: "percentage-text" }, H0 = { class: "text-center" }, j0 = { class: "abandoned-value" }, W0 = { class: "badges-container badges-wrap" }, K0 = { class: "badges-container badges-wrap" }, Y0 = {
  key: 1,
  class: "empty-state"
}, U0 = /* @__PURE__ */ le({
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
    function n(v) {
      return v;
    }
    const a = e, o = t, s = (v) => {
      o("export", v);
    }, i = C(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (v, p) => new Date(v.date).getTime() - new Date(p.date).getTime()
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
    ), c = C(() => a.data?.total_payment_success || []), d = C(() => {
      const v = c.value;
      return v.length === 0 ? f(0) : v.map((p) => `${p.currency} ${f(p.total_value)}`).join(" · ");
    }), h = (v, p) => gn(v, p), f = (v) => Le(v), m = (v) => (v ?? []).reduce((p, x) => p + (x.count ?? 0), 0), g = (v) => typeof v.sell_success_count == "number" ? v.sell_success_count : m(v.payment_success_total), y = C(() => {
      const v = a.data, p = v.total_disruption_conversations || 0, x = v.total_disruption_initiated || 0, _ = v.total_voluntary || 0, w = v.total_involuntary || 0, $ = v.total_accepted || 0, S = v.total_confirmed || 0, M = typeof v.total_sell_success == "number" ? v.total_sell_success : m(v.total_payment_success), O = v.total_sell_failed || 0, H = Math.max(0, p - x), A = Math.max(
        0,
        x - _ - w
      ), T = Math.max(0, w - $), L = Math.max(0, _ - S), R = O, W = Math.max(0, S - M - R), Q = (ue, ge) => ve(ue, ge), Z = [
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
      ], ae = [];
      return x > 0 && ae.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: Q(x, p)
      }), H > 0 && ae.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: H,
        label: Q(H, p)
      }), _ > 0 && ae.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: Q(_, p)
      }), w > 0 && ae.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: Q(w, p)
      }), A > 0 && ae.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: A,
        label: Q(A, p)
      }), $ > 0 && ae.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: Q($, p)
      }), T > 0 && ae.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: T,
        label: Q(T, p)
      }), S > 0 && ae.push({
        source: "Voluntary",
        target: "Confirmed",
        value: S,
        label: Q(S, p)
      }), L > 0 && ae.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: Q(L, p)
      }), M > 0 && ae.push({
        source: "Confirmed",
        target: "Paid",
        value: M,
        label: Q(M, p)
      }), R > 0 && ae.push({
        source: "Confirmed",
        target: "Rejected",
        value: R,
        label: Q(R, p)
      }), W > 0 && ae.push({
        source: "Confirmed",
        target: "Not Paid",
        value: W,
        label: Q(W, p)
      }), { nodes: Z, links: ae };
    });
    return (v, p) => (b(), ee(Ce, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: p[0] || (p[0] = (x) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", B0, [
          u("section", L0, [
            u("div", P0, [
              y.value.nodes.length > 0 && y.value.links.length > 0 ? (b(), ee(Gt, {
                key: 0,
                data: y.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])) : (b(), k("div", R0, [...p[1] || (p[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", E0, [
            z(ye, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (b(), k("section", I0, [
            p[2] || (p[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", F0, [
              z(rt, {
                columns: l,
                rows: r.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: x }) => [
                  u("span", O0, D(P(Ke)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": E(({ row: x }) => [
                  u("span", V0, D(P(ie)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": E(({ row: x }) => [
                  u("span", z0, [
                    Te(D(P(ie)(Number(x.disruption_initiated_count))) + " ", 1),
                    u("span", N0, " (" + D(h(
                      Number(x.disruption_initiated_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": E(({ row: x }) => [
                  u("span", H0, [
                    u("span", j0, D(P(ie)(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                    )) + " (" + D(h(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": E(({ row: x }) => [
                  u("div", W0, [
                    (b(!0), k(se, null, fe([x], (_, w) => (b(), k(se, { key: w }, [
                      z(Ue, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Te(" VOL " + D(P(ie)(_.voluntary_count)) + " (" + D(h(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ue, { color: "success" }, {
                        default: E(() => [
                          Te(" Confirm " + D(P(ie)(_.confirmed_count)) + " (" + D(h(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ue, { color: "warning" }, {
                        default: E(() => [
                          Te(" Not Confirm " + D(P(ie)(_.voluntary_count - _.confirmed_count)) + " (" + D(h(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ue, { color: "danger" }, {
                        default: E(() => [
                          Te(" Reject " + D(P(ie)(_.sell_failed_count)) + " (" + D(h(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ue, { color: "orange" }, {
                        default: E(() => [
                          Te(" Not Paid " + D(P(ie)(
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
                      z(Ue, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: E(() => [
                          Te(" Finish " + D(P(ie)(g(_))) + " (" + D(h(
                            g(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (b(!0), k(se, null, fe(_.payment_success_total || [], ($) => (b(), ee(Ue, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: E(() => [
                          Te(D($.currency) + " " + D(f($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": E(({ row: x }) => [
                  u("div", K0, [
                    (b(!0), k(se, null, fe([x], (_, w) => (b(), k(se, { key: w }, [
                      z(Ue, { color: "purple" }, {
                        default: E(() => [
                          Te(" INV " + D(P(ie)(_.involuntary_count)) + " (" + D(h(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ue, { color: "danger" }, {
                        default: E(() => [
                          Te(" Human " + D(P(ie)(_.involuntary_count - _.accepted_count)) + " (" + D(h(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      z(Ue, { color: "success" }, {
                        default: E(() => [
                          Te(" Accept " + D(P(ie)(_.accepted_count)) + " (" + D(h(
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
          ])) : (b(), k("section", Y0, [...p[3] || (p[3] = [
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
}), q0 = /* @__PURE__ */ me(U0, [["__scopeId", "data-v-ffc4fd8a"]]), X0 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, G0 = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Z0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Q0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, J0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, eb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, tb = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (m) => {
      o("export", m);
    }, i = Se(a, "theme"), { isDark: l } = Me(i), r = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = C(
      () => a.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = C(() => {
      const m = d.value, g = m.total_airline_information_retrieved + m.total_booking_info_retrieved + m.total_flight_status_retrieved, y = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", v = m.total_faq_events, p = v > 0 ? `${(m.total_documents_found / v * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: r.airline_information,
          value: `${y(m.total_airline_information_retrieved)}%`,
          subvalue: `${ie(m.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: r.booking_info,
          value: `${y(m.total_booking_info_retrieved)}%`,
          subvalue: `${ie(m.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: r.flight_status,
          value: `${y(m.total_flight_status_retrieved)}%`,
          subvalue: `${ie(m.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: ie(m.total_documents_found),
          subvalue: p
        }
      ];
    }), f = (m) => {
      if (!m) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = m.faq_by_day || [];
      if (g.length > 0) {
        const y = g.map(
          (_) => Ke(_.date).format("MMM DD")
        ), v = g.map(
          (_) => _.airline_information_retrieved_count || 0
        ), p = g.map(
          (_) => _.flight_status_retrieved_count || 0
        ), x = g.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: y,
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
              data: p,
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
    return Fe(
      () => a.data,
      (m) => {
        f(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (m, g) => (b(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", X0, [
          u("div", G0, [
            c.value.labels && c.value.labels.length ? (b(), k("section", Z0, [
              u("div", Q0, [
                z(_t, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", J0, [
                (b(!0), k(se, null, fe(h.value, (y) => (b(), ee(ye, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: y.value,
                  subvalue: y.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (b(), k("section", eb, [...g[0] || (g[0] = [
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
}), nb = /* @__PURE__ */ me(tb, [["__scopeId", "data-v-b6ea961f"]]), ab = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ob = { class: "w-full shrink-0 flex min-h-0 flex-col" }, sb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ib = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, lb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, rb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, cb = { class: "max-w-[360px] px-4 text-center" }, db = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ub = /* @__PURE__ */ le({
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
    }, o = e, s = n, i = (m) => {
      s("export", m);
    }, l = Se(o, "theme"), { isDark: r } = Me(l), c = C(() => {
      const m = o.data?.agents_by_day || {}, g = Object.keys(m).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const y = /* @__PURE__ */ new Set();
      for (const x of Object.values(m))
        for (const _ of Object.keys(x))
          y.add(_);
      const p = Array.from(y).map((x) => {
        const _ = x.toLowerCase(), w = a[_] || a[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: g.map(($) => m[$]?.[x] || 0),
          borderColor: w
        };
      });
      return {
        labels: g.map((x) => Ke(x).format("MMM DD")),
        datasets: p
      };
    }), d = C(() => {
      const m = o.data?.agents_by_day || {}, g = {};
      for (const v of Object.values(m))
        for (const [p, x] of Object.entries(v))
          g[p] = (g[p] || 0) + x;
      const y = Object.values(g).reduce((v, p) => v + p, 0);
      return y === 0 ? [] : Object.entries(g).sort(([, v], [, p]) => p - v).map(([v, p]) => {
        const x = v.toLowerCase();
        return {
          name: v,
          label: v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, " "),
          total: p,
          percentage: (p / y * 100).toFixed(1),
          color: a[x] || a[v] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), f = C(() => {
      const m = h.value.length;
      if (!(m <= 0))
        return { gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))` };
    });
    return t({ isDark: r }), (m, g) => (b(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", ab, [
          u("div", ob, [
            c.value.labels && c.value.labels.length ? (b(), k("section", sb, [
              u("div", ib, [
                z(_t, {
                  data: c.value,
                  options: e.options,
                  theme: l.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (b(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: $e(f.value)
              }, [
                (b(!0), k(se, null, fe(h.value, (y) => (b(), ee(ye, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${P(ie)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : d.value.length ? (b(), k("section", lb, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: $e(f.value)
              }, [
                (b(!0), k(se, null, fe(h.value, (y) => (b(), ee(ye, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${P(ie)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : V("", !0),
            d.value.length ? V("", !0) : (b(), k("section", rb, [
              u("div", cb, [
                u("div", db, [
                  z(P(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                g[0] || (g[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                g[1] || (g[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), hb = /* @__PURE__ */ me(ub, [["__scopeId", "data-v-932f6fac"]]), fb = { class: "card-body" }, gb = {
  key: 0,
  class: "chart-section"
}, pb = { class: "chart-wrapper" }, mb = {
  key: 1,
  class: "record-locator-daily-section"
}, bb = { class: "w-full min-w-0" }, vb = { class: "cell-plain font-medium" }, yb = { class: "cell-plain text-center" }, xb = { class: "cell-plain text-center" }, _b = { class: "cell-plain text-center" }, kb = { class: "cell-plain text-center" }, wb = { class: "cell-plain text-center success-value" }, Cb = { class: "cell-plain text-center failed-value" }, $b = { class: "cell-plain text-center warning-value" }, Sb = { class: "cell-plain text-center" }, Mb = { class: "cell-plain text-center failed-value" }, Db = {
  key: 2,
  class: "empty-state"
}, Tb = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (v) => {
      o("export", v);
    }, { isDark: i } = Me(Se(a, "theme")), l = C(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (v, p) => new Date(v.date).getTime() - new Date(p.date).getTime()
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
    ], d = C(
      () => a.isAvianca ? [...r, ...c] : r
    ), h = C(
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
    ), f = C(() => a.data), m = (v, p) => gn(v, p), g = (v, p) => {
      const x = ie(v), _ = m(v, p);
      return `${x} (${_})`;
    }, y = C(() => {
      const v = [], p = [], x = /* @__PURE__ */ new Set(), _ = (K) => {
        x.has(K) || (v.push({ name: K }), x.add(K));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: v, links: p };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = f.value.total_checkin_initiated, $ = f.value.total_record_locator_init, S = f.value.total_record_locator_started, M = f.value.total_record_locator_completed, O = f.value.total_record_locator_closed, H = f.value.total_record_locator_failed, A = f.value.total_record_locator_abandoned, T = f.value.total_record_locator_init_abandoned, L = f.value.total_checkin_pre_init_abandoned_error, R = f.value.total_checkin_pre_init_abandoned_voluntary, W = L != null || R != null, Q = W ? Math.max(Number(L) || 0, 0) : 0, Z = W ? Math.max(Number(R) || 0, 0) : 0, ae = f.value.total_record_locator_init_abandoned_error, ue = f.value.total_record_locator_init_abandoned_voluntary, ge = ae != null || ue != null, G = ge ? Math.max(Number(ae) || 0, 0) : 0, B = ge ? Math.max(Number(ue) || 0, 0) : 0;
      $ > 0 && p.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: ve($, w)
      });
      const j = w - $;
      return W ? (Z > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: Z,
        label: ve(Z, w)
      })), Q > 0 && (_("Booking not retreived"), p.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: Q,
        label: ve(Q, w)
      }))) : j > 0 && (_("Abandoned (Init)"), p.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: j,
        label: ve(j, w)
      })), S > 0 && p.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: S,
        label: ve(S, w)
      }), ge ? (G > 0 && (_("Error"), p.push({
        source: "Booking retrive",
        target: "Error",
        value: G,
        label: ve(G, w)
      })), B > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: B,
        label: ve(B, w)
      }))) : T > 0 && (_("Abandoned (Started)"), p.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: ve(T, w)
      })), M > 0 && p.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: M,
        label: ve(M, S)
      }), O > 0 && p.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: O,
        label: ve(O, S)
      }), H > 0 && (_("Checkin Failed"), p.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: H,
        label: ve(H, S)
      })), A > 0 && (_("Abandoned (Flow)"), p.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: A,
        label: ve(A, S)
      })), { nodes: v, links: p };
    });
    return t({ isDark: i }), (v, p) => (b(), ee(Ce, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: a.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", fb, [
          y.value.nodes.length > 0 ? (b(), k("section", gb, [
            u("div", pb, [
              z(Gt, {
                data: y.value,
                height: "500px",
                "use-gradient": !1,
                "node-gap": 24
              }, null, 8, ["data"])
            ])
          ])) : V("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", mb, [
            u("div", bb, [
              z(rt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: x }) => [
                  u("span", vb, D(P(Ke)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": E(({ row: x }) => [
                  u("span", yb, D(P(ie)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": E(({ row: x }) => [
                  u("span", xb, D(g(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": E(({ row: x }) => [
                  u("span", _b, D(P(ie)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": E(({ row: x }) => [
                  u("span", kb, D(g(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": E(({ row: x }) => [
                  u("span", wb, D(g(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": E(({ row: x }) => [
                  u("span", Cb, D(g(
                    x.record_locator_failed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": E(({ row: x }) => [
                  u("span", $b, D(g(
                    x.record_locator_abandoned_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": E(({ row: x }) => [
                  u("span", Sb, D(P(ie)(
                    x.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": E(({ row: x }) => [
                  u("span", Mb, D(P(ie)(
                    x.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (b(), k("section", Db, [...p[0] || (p[0] = [
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
}), Ab = /* @__PURE__ */ me(Tb, [["__scopeId", "data-v-68053ff9"]]), Bb = { class: "card-body" }, Lb = {
  key: 0,
  class: "chart-section"
}, Pb = {
  key: 1,
  class: "empty-state"
}, Rb = {
  key: 2,
  class: "comparison-section"
}, Eb = { class: "comparison-grid" }, Ib = /* @__PURE__ */ le({
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
    ], s = e, i = n, l = (g) => {
      i("export", g);
    }, { isDark: r } = Me(Se(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const y of s.data?.sales_by_channel_by_day ?? [])
        for (const v of Object.keys(y.channels))
          g.add(v);
      return Array.from(g).sort();
    }), d = (g, y) => a[g.toLowerCase()] ?? o[y % o.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function f(g) {
      if (g.delta === null) return "No previous data";
      const y = ie(g.previous), v = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${y})` : `${g.delta > 0 ? "↑" : "↓"} ${v} vs prev. period (${y})`;
    }
    const m = C(() => {
      const g = s.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const y = g.map((p) => Ke(p.date).format("MMM-DD")), v = c.value.map((p, x) => ({
        label: p,
        data: g.map((_) => _.channels[p] ?? 0),
        backgroundColor: d(p, x),
        borderRadius: 4
      }));
      return { labels: y, datasets: v };
    });
    return t({ isDark: r }), (g, y) => (b(), ee(Ce, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", Bb, [
          m.value.labels.length > 0 ? (b(), k("section", Lb, [
            z(Tt, {
              data: m.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (b(), k("section", Pb, [...y[0] || (y[0] = [
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
          e.channelComparison.length > 0 ? (b(), k("section", Rb, [
            u("div", Eb, [
              (b(!0), k(se, null, fe(e.channelComparison, (v, p) => (b(), ee(P(ye), {
                key: v.channel,
                color: d(v.channel, p),
                title: h(v.channel),
                value: P(ie)(v.current),
                subvalue: f(v)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), hl = /* @__PURE__ */ me(Ib, [["__scopeId", "data-v-4879d791"]]), Fb = { class: "card-body" }, Ob = {
  key: 0,
  class: "chart-section"
}, Vb = { class: "chart-wrapper" }, zb = {
  key: 1,
  class: "empty-state"
}, Nb = { class: "seller-value-cards" }, Hb = {
  key: 2,
  class: "seller-daily-section"
}, jb = { class: "w-full min-w-0" }, Wb = { class: "sl-cell font-medium" }, Kb = { class: "sl-cell text-center" }, Yb = { class: "sl-cell text-center" }, Ub = { class: "sl-cell text-center" }, qb = { class: "sl-cell text-center" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center success-value" }, Zb = {
  key: 0,
  class: "currency-cell-list"
}, Qb = {
  key: 1,
  class: "empty-cell"
}, Jb = { class: "sl-cell text-center success-value" }, ev = { class: "sl-cell text-center" }, tv = { class: "sl-cell text-center success-value" }, nv = {
  key: 0,
  class: "currency-cell-list"
}, av = {
  key: 1,
  class: "empty-cell"
}, ov = { class: "sl-cell text-center success-value" }, sv = { class: "sl-cell text-center" }, iv = { class: "sl-cell text-center success-value" }, lv = {
  key: 0,
  class: "currency-cell-list"
}, rv = { key: 1 }, cv = {
  key: 0,
  class: "failed-reasons"
}, dv = { class: "reason-name" }, uv = { class: "reason-count" }, hv = {
  key: 1,
  class: "empty-cell"
}, fv = /* @__PURE__ */ le({
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
    function a(T) {
      return T;
    }
    const o = e, s = n, i = (T) => {
      s("export", T);
    }, { isDark: l } = Me(Se(o, "theme")), r = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const T = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((L) => {
        const R = T.findIndex(
          (W) => W.date === L.date
        );
        R !== -1 ? T[R] = { ...T[R], reasons: L.reasons } : T.push({
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
      }), T.sort(
        (L, R) => new Date(L.date).getTime() - new Date(R.date).getTime()
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
    ], d = C(
      () => r.value.map((T) => ({
        id: T.date,
        ...T
      }))
    ), h = C(() => o.sellerData), f = C(() => o.failedData), m = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), y = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), v = C(() => {
      const T = m.value;
      return T.length > 0 ? T.map(
        (L) => `${L.currency} ${Vt(L.total_value)}`
      ).join(" · ") : A(o.sellerData.total_value_sell_success);
    });
    function p(T) {
      return T.length > 0 ? T.map(
        (L) => `${L.currency} ${Vt(L.total_value)}`
      ).join(" · ") : "—";
    }
    const x = C(
      () => p(g.value)
    ), _ = C(
      () => p(y.value)
    ), w = (T) => T.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), $ = (T) => `Failed:
${w(T)}`, S = C(() => {
      const {
        total_seller_conversations: T = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: R = 0,
        total_sell_success: W = 0,
        total_sell_bank_transfer: Q = 0,
        total_sell_cash_option: Z = 0,
        total_sell_success_bank_transfer: ae = 0,
        total_sell_success_cash: ue = 0
      } = h.value, { failed_by_reason_by_day: ge = [] } = f.value;
      if (T === 0) return { nodes: [], links: [] };
      const G = Math.max(
        0,
        W - (ae ?? 0) - (ue ?? 0)
      ), B = [
        { name: "Sell Initiated", value: T, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: R, status: "success" },
        { name: "Sell Success", value: G, status: "success" }
      ], j = [], K = T - L;
      K > 0 && (B.push({
        name: "Abandoned (Init)",
        value: K,
        status: "abandon"
      }), j.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: K,
        label: ve(K, T)
      })), L > 0 && j.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: ve(L, T)
      });
      const re = ge.reduce(
        (F, N) => (N.reasons && Array.isArray(N.reasons) && N.reasons.forEach((U) => {
          const ce = U.reason, X = U.failed_count;
          F[ce] = (F[ce] || 0) + X;
        }), F),
        {}
      );
      R > 0 && j.push({
        source: "Sell Started",
        target: "Booking Created",
        value: R,
        label: ve(R, T)
      }), Q > 0 && (B.push({ name: "Bank Transfer", value: Q, status: "success" }), j.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: Q,
        label: ve(Q, T)
      })), Z > 0 && (B.push({ name: "Cash Option", value: Z, status: "success" }), j.push({
        source: "Booking Created",
        target: "Cash Option",
        value: Z,
        label: ve(Z, T)
      })), G > 0 && j.push({
        source: "Booking Created",
        target: "Sell Success",
        value: G,
        label: ve(G, T)
      }), (ae ?? 0) > 0 && (B.push({
        name: "Bank Transfer Success",
        value: ae ?? 0,
        status: "success"
      }), j.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ae ?? 0,
        label: ve(ae ?? 0, T)
      })), (ue ?? 0) > 0 && (B.push({
        name: "Cash Option Success",
        value: ue ?? 0,
        status: "success"
      }), j.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: ue ?? 0,
        label: ve(ue ?? 0, T)
      }));
      const xe = R - G - Q - Z;
      xe > 0 && (B.push({
        name: "Failed at Completion",
        value: xe,
        status: "error"
      }), j.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: xe,
        label: ve(xe, T)
      }));
      const De = L - R;
      if (De > 0 && (B.push({
        name: "Failed at Booking",
        value: De,
        status: "error"
      }), j.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: De,
        label: ve(De, T)
      })), Object.keys(re).length > 0) {
        const F = Object.values(re).reduce(
          (U, ce) => U + ce,
          0
        ), N = De - F;
        Object.entries(re).filter(([, U]) => U > 0).sort(([, U], [, ce]) => ce - U).forEach(([U, ce]) => {
          const X = `Failed: ${U}`;
          B.push({
            name: X,
            value: ce,
            status: "error",
            label: $(U)
          }), j.push({
            source: "Failed at Booking",
            target: X,
            value: ce,
            label: ve(ce, T)
          });
        }), N > 0 && (B.push({
          name: "Failed: Without Reason",
          value: N,
          status: "error",
          label: `Failed:
Without Reason`
        }), j.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: N,
          label: ve(N, T)
        }));
      }
      return { nodes: B, links: j };
    }), M = (T, L) => gn(T, L), O = (T, L) => {
      const R = ie(T), W = M(T, L);
      return `${R} (${W})`;
    }, H = (T) => T == null ? 0 : typeof T == "number" ? T : Array.isArray(T) ? T.reduce((L, R) => L + (R.total_value || 0), 0) : 0, A = (T) => Vt(H(T));
    return t({ isDark: l }), (T, L) => (b(), ee(Ce, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", Fb, [
          S.value.nodes.length > 0 ? (b(), k("section", Ob, [
            u("div", Vb, [
              z(Gt, {
                data: S.value,
                height: "560px"
              }, null, 8, ["data"])
            ])
          ])) : (b(), k("section", zb, [...L[0] || (L[0] = [
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
          u("section", Nb, [
            z(ye, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: v.value
            }, null, 8, ["value"]),
            z(ye, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: x.value
            }, null, 8, ["value"]),
            z(ye, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: _.value
            }, null, 8, ["value"])
          ]),
          r.value && r.value.length > 0 ? (b(), k("section", Hb, [
            u("div", jb, [
              z(rt, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: R }) => [
                  u("span", Wb, D(P(Ke)(String(R.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": E(({ row: R }) => [
                  u("span", Kb, D(P(ie)(Number(R.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": E(({ row: R }) => [
                  u("span", Yb, D(O(
                    R.sell_started_count,
                    R.seller_conversations || R.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": E(({ row: R }) => [
                  u("span", Ub, D(O(
                    R.sell_get_quote_count,
                    R.seller_conversations || R.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": E(({ row: R }) => [
                  u("span", qb, D(O(
                    R.sell_booking_created_count,
                    R.seller_conversations || R.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": E(({ row: R }) => [
                  u("span", Xb, D(P(ie)(Number(R.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": E(({ row: R }) => [
                  u("span", Gb, [
                    Array.isArray(
                      R.daily_value_sell_success_bank_transfer
                    ) && R.daily_value_sell_success_bank_transfer.length > 0 ? (b(), k("div", Zb, [
                      (b(!0), k(se, null, fe(R.daily_value_sell_success_bank_transfer, (W) => (b(), k("span", {
                        key: `${R.date}-bt-success-${W.currency}`
                      }, D(W.currency) + " " + D(P(Vt)(W.total_value)), 1))), 128))
                    ])) : (b(), k("span", Qb, "-"))
                  ])
                ]),
                "cell-btSuccess": E(({ row: R }) => [
                  u("span", Jb, D(P(ie)(
                    Number(
                      R.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": E(({ row: R }) => [
                  u("span", ev, D(P(ie)(Number(R.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": E(({ row: R }) => [
                  u("span", tv, [
                    Array.isArray(
                      R.daily_value_sell_success_cash
                    ) && R.daily_value_sell_success_cash.length > 0 ? (b(), k("div", nv, [
                      (b(!0), k(se, null, fe(R.daily_value_sell_success_cash, (W) => (b(), k("span", {
                        key: `${R.date}-co-success-${W.currency}`
                      }, D(W.currency) + " " + D(P(Vt)(W.total_value)), 1))), 128))
                    ])) : (b(), k("span", av, "-"))
                  ])
                ]),
                "cell-cashSuccess": E(({ row: R }) => [
                  u("span", ov, D(P(ie)(
                    Number(R.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": E(({ row: R }) => [
                  u("span", sv, D(O(
                    R.sell_success_count,
                    R.seller_conversations || R.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": E(({ row: R }) => [
                  u("span", iv, [
                    Array.isArray(R.daily_value_sell_success) && R.daily_value_sell_success.length > 0 ? (b(), k("div", lv, [
                      (b(!0), k(se, null, fe(R.daily_value_sell_success, (W) => (b(), k("span", {
                        key: `${R.date}-${W.currency}`
                      }, D(W.currency) + " " + D(P(Vt)(W.total_value)), 1))), 128))
                    ])) : (b(), k("span", rv, D(A(
                      R.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": E(({ row: R }) => [
                  (R.reasons || []).length > 0 ? (b(), k("div", cv, [
                    (b(!0), k(se, null, fe(R.reasons || [], (W) => (b(), k("div", {
                      key: W.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", dv, D(W.reason) + ":", 1),
                      u("span", uv, D(W.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", hv, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), fl = /* @__PURE__ */ me(fv, [["__scopeId", "data-v-bdae6055"]]), gv = { class: "seller-container__body" }, pv = /* @__PURE__ */ le({
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
  emits: ["open", "export"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = C(
      () => n.loading ? !1 : n.sellerLoading
    ), s = C(
      () => n.loading ? !1 : n.salesByChannelLoading
    ), i = C(() => n.exportLoading || n.sellerExportLoading), l = C(() => n.exportLoading || n.salesByChannelExportLoading);
    function r(c, d) {
      a("export", { source: c, format: d });
    }
    return (c, d) => (b(), ee(Ce, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[2] || (d[2] = (h) => a("open"))
    }, {
      default: E(() => [
        u("div", gv, [
          z(fl, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => r("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          z(hl, {
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
}), mv = /* @__PURE__ */ me(pv, [["__scopeId", "data-v-bd0ec4ff"]]), bv = { class: "card-body" }, vv = {
  key: 0,
  class: "chart-section"
}, yv = {
  key: 1,
  class: "empty-state"
}, xv = { class: "empty-state-content" }, _v = { class: "empty-icon-wrapper" }, kv = /* @__PURE__ */ le({
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
    }, { isDark: l, colors: r } = Me(Se(o, "theme")), c = C(() => {
      const f = (o.data?.top_agents || []).filter(
        (v) => v.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const m = f.reduce(
        (v, p) => v + (Number(p.conversations) || 0),
        0
      ), g = f.map((v) => {
        const p = v.agent_type?.toLowerCase();
        return a[p] || "#94a3b8";
      }), y = g.map((v) => `${v}80`);
      return {
        labels: f.map((v) => {
          const p = Number(v.conversations) || 0, x = m ? p / m * 100 : 0;
          return `${v.agent_type} - ${p.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((v) => v.conversations),
            backgroundColor: y,
            borderColor: g,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => o.options ? o.options : {
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
              const f = (h.label || "").toString().split(" - ")[0], m = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (v, p) => v + (Number(p) || 0),
                0
              ), y = g ? m / g * 100 : 0;
              return `${f}: ${m.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, f) => (b(), ee(Ce, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", bv, [
          c.value.labels && c.value.labels.length ? (b(), k("section", vv, [
            z(Ta, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (b(), k("section", yv, [
            u("div", xv, [
              u("div", _v, [
                z(P(Op), { class: "empty-icon" })
              ]),
              f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
              f[1] || (f[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), wv = /* @__PURE__ */ me(kv, [["__scopeId", "data-v-08639fed"]]), Cv = { class: "card-body" }, $v = {
  key: 0,
  class: "payment-methods-section"
}, Sv = { class: "payment-methods-grid" }, Mv = {
  key: 1,
  class: "empty-state"
}, Dv = { class: "empty-state-content" }, Tv = { class: "empty-icon-wrapper" }, Av = {
  key: 2,
  class: "payment-method-daily-section"
}, Bv = { class: "w-full min-w-0" }, Lv = { class: "font-medium" }, Pv = { class: "text-center" }, Rv = { class: "text-center success-value" }, Ev = {
  key: 0,
  class: "currency-cell-list"
}, Iv = { class: "payment-tags" }, Fv = { class: "tag-name" }, Ov = {
  key: 0,
  class: "tag-amount"
}, Vv = {
  key: 1,
  class: "tag-amount"
}, zv = { class: "tag-count" }, Nv = {
  key: 3,
  class: "empty-table-state"
}, Hv = "Not Registered", jv = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, { isDark: s } = Me(Se(a, "theme")), i = oe(!1), l = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), r = C(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), c = C(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), d = C(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((M, O) => Ke(M.date).valueOf() - Ke(O.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], f = C(
      () => d.value.map((M) => ({
        id: M.date,
        date: M.date,
        total_count: M.total_count,
        total_amount: M.total_amount,
        total_amount_by_currency: M.total_amount_by_currency,
        payment_methods: M.payment_methods
      }))
    ), m = (M) => {
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
        (A) => ({
          payment_method: A.payment_method || "Unknown",
          total_amount: A.total_amount ?? 0,
          count: A.count ?? 0,
          total_amount_by_currency: A.total_amount_by_currency ?? []
        })
      ), H = (M.payment_method_by_day || []).map((A) => ({
        date: A.date || "",
        total_count: A.total_count ?? 0,
        total_amount: A.total_amount ?? 0,
        total_amount_by_currency: A.total_amount_by_currency ?? [],
        payment_methods: (A.payment_methods || []).map((T) => ({
          payment_method: T.payment_method || "Unknown",
          total_amount: T.total_amount ?? 0,
          count: T.count ?? 0,
          total_amount_by_currency: T.total_amount_by_currency ?? []
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
        payment_method_by_day: H
      };
    }, g = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [M, O] = a.dates.map(
            (A) => Ke(A).format("YYYY-MM-DD")
          ), H = await a.fetchFunction(
            a.airlineName,
            M,
            O
          );
          l.value = m(H);
        } catch (M) {
          console.error("Error fetching payment method metrics:", M), l.value = m(null);
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
    ], v = (M) => !M || M.toLowerCase() === "unknown" ? Hv : M.replace(/_/g, " "), p = (M) => M == null ? "$0.00" : Le(M), x = (M) => {
      const O = M.total_amount_by_currency;
      return O && O.length > 0 ? O.map((H) => `${H.currency} ${p(H.total_value)}`).join(" · ") : p(M.total_amount);
    }, _ = (M) => M ? Ke(M).format("MMM DD") : "-", w = (M) => M == null || Number.isNaN(Number(M)) ? 0 : Number(M), $ = (M) => {
      o("export", M);
    };
    function S() {
      const M = a.data;
      M && (Array.isArray(M.payment_method_breakdown) && M.payment_method_breakdown.length > 0 || Array.isArray(M.payment_method_by_day) && M.payment_method_by_day.length > 0) && (i.value = !1, l.value = m(M));
    }
    return et(() => {
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
    ), t({ isDark: s }), (M, O) => (b(), ee(Ce, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: O[0] || (O[0] = (H) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !i.value ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", Cv, [
          r.value ? (b(), k("section", $v, [
            O[1] || (O[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Sv, [
              (b(!0), k(se, null, fe(l.value.payment_method_breakdown, (H, A) => (b(), ee(ye, {
                key: H.payment_method,
                class: "payment-method-card-item min-w-0",
                color: y[A % y.length],
                title: v(H.payment_method),
                value: x(H),
                subvalue: `${w(H.count)} ${w(H.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (b(), k("section", Mv, [
            u("div", Dv, [
              u("div", Tv, [
                z(P(zp), { class: "empty-icon" })
              ]),
              O[2] || (O[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              O[3] || (O[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (b(), k("section", Av, [
            O[5] || (O[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", Bv, [
              z(rt, {
                columns: h,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": E(({ row: H }) => [
                  u("span", Lv, D(_(String(H.date))), 1)
                ]),
                "cell-totalSales": E(({ row: H }) => [
                  u("span", Pv, D(P(ie)(H.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": E(({ row: H }) => [
                  u("span", Rv, [
                    Array.isArray(H.total_amount_by_currency) && H.total_amount_by_currency.length > 0 ? (b(), k("div", Ev, [
                      (b(!0), k(se, null, fe(H.total_amount_by_currency, (A) => (b(), k("span", {
                        key: `${H.date}-${A.currency}`
                      }, D(A.currency) + " " + D(p(A.total_value)), 1))), 128))
                    ])) : (b(), k(se, { key: 1 }, [
                      Te(D(p(Number(H.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": E(({ row: H }) => [
                  u("div", Iv, [
                    (b(!0), k(se, null, fe(Array.isArray(H.payment_methods) ? H.payment_methods : [], (A) => (b(), k("div", {
                      key: A.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", Fv, D(v(A.payment_method)), 1),
                      O[4] || (O[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !A.total_amount_by_currency || A.total_amount_by_currency.length === 0 ? (b(), k("span", Ov, D(p(A.total_amount)), 1)) : (b(), k("span", Vv, D(A.total_amount_by_currency.map(
                        (T) => `${T.currency} ${p(T.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", zv, "(" + D(w(A.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : r.value ? (b(), k("div", Nv, [...O[6] || (O[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Wv = /* @__PURE__ */ me(jv, [["__scopeId", "data-v-168637eb"]]), Kv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Yv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Uv = {
  key: "title-content",
  class: "header-title-group"
}, qv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Xv = {
  key: 0,
  class: "metric-label metric-label--header"
}, Gv = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, Zv = { key: "aside-content" }, Qv = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, Jv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, ey = {
  key: "body-content",
  class: "highlight-inner"
}, ty = { class: "card-body" }, ny = { class: "metric-row" }, ay = {
  key: 0,
  class: "metric-prefix"
}, oy = {
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
    const n = e, { isDark: a } = Me(Se(n, "theme")), o = C(() => n.labelPosition === "header"), s = C(
      () => n.previousValue !== null && n.previousValue !== void 0
    ), i = C(() => {
      if (!s.value) return 0;
      const c = n.previousValue;
      return c === 0 ? n.currentValue > 0 ? 100 : 0 : (n.currentValue - c) / c * 100;
    }), l = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), r = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (c, d) => (b(), ee(Ce, {
      collapsible: !1,
      class: te([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": P(a),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: E(() => [
        z(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (b(), k("div", Kv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (b(), k("div", Yv)) : V("", !0)
            ])) : (b(), k("div", Uv, [
              u("div", qv, [
                _e(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (b(), k("span", Xv, D(e.label), 1)) : V("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: E(() => [
        z(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (b(), k("div", Gv)) : (b(), k("div", Zv, [
              _e(c.$slots, "headerAside", {}, () => [
                s.value ? (b(), k("div", {
                  key: 0,
                  class: te(["change-badge", r.value])
                }, D(l.value), 3)) : V("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: E(() => [
        z(gt, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: E(() => [
            e.loading ? (b(), k("div", Qv, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? V("", !0) : (b(), k("div", Jv))
            ])) : (b(), k("div", ey, [
              u("div", ty, [
                _e(c.$slots, "value", {}, () => [
                  u("div", ny, [
                    e.prefix ? (b(), k("span", ay, D(e.prefix), 1)) : V("", !0),
                    u("span", {
                      class: te(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, D(e.value), 3)
                  ])
                ], !0),
                o.value ? V("", !0) : (b(), k("span", oy, D(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), Mt = /* @__PURE__ */ me(sy, [["__scopeId", "data-v-c81268f4"]]);
function Co(e, t) {
  return b(), k("svg", {
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
function Ye() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ct = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", bt = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", iy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Ot = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", ly = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], ry = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, cy = ["placeholder", "aria-label"], dy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, uy = ["aria-selected", "onClick", "onMouseenter"], hy = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, fy = { class: "min-w-0 flex-1" }, $o = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-select-${Ye()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(null), h = oe(null), f = oe(null), m = oe(!1), g = oe(0), y = oe(""), v = oe({});
    function p() {
      const G = c.value;
      if (!G) return;
      const B = G.getBoundingClientRect();
      v.value = {
        top: `${B.bottom - 3}px`,
        left: `${B.left}px`,
        width: `${B.width}px`
      };
    }
    const x = C(() => n.options.filter((G) => !G.disabled)), _ = C(() => {
      if (!n.searchable) return x.value;
      const G = y.value.trim().toLowerCase();
      return G ? x.value.filter((B) => B.label.toLowerCase().includes(G)) : x.value;
    }), w = C(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), $ = C(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((B) => B.value === n.modelValue)?.label ?? String(n.modelValue));
    function S(G) {
      return `${String(G.value)}-${G.label}`;
    }
    function M(G) {
      return n.modelValue === G.value;
    }
    function O(G, B) {
      const j = M(G), K = g.value === B;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        j ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !j && K ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function H() {
      g.value = Math.max(
        0,
        _.value.findIndex((G) => G.value === n.modelValue)
      );
    }
    function A() {
      if (n.searchable) {
        f.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function T() {
      p(), y.value = "", H(), He(() => A());
    }
    function L() {
      m.value = !1, y.value = "";
    }
    function R(G) {
      a("update:modelValue", G.value), L();
    }
    function W() {
      if (!n.disabled) {
        if (m.value) {
          L();
          return;
        }
        m.value = !0, T();
      }
    }
    function Q(G) {
      G.stopPropagation(), !n.disabled && W();
    }
    function Z(G) {
      if (!m.value) return;
      const B = G.target, j = r.value, K = d.value;
      j && !j.contains(B) && (!K || !K.contains(B)) && L();
    }
    function ae(G) {
      n.disabled || (G.key === "ArrowDown" || G.key === "Enter" || G.key === " ") && (G.preventDefault(), m.value || (m.value = !0, T()));
    }
    function ue(G) {
      const B = _.value;
      if (G.key === "Escape") {
        G.preventDefault(), L();
        return;
      }
      if (G.key === "ArrowDown") {
        if (G.preventDefault(), B.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (G.key === "ArrowUp") {
        if (G.preventDefault(), B.length === 0) return;
        g.value = B.length - 1, h.value?.focus();
        return;
      }
      if (G.key === "Enter") {
        G.preventDefault();
        const j = B[g.value];
        j && R(j);
      }
    }
    function ge(G) {
      const B = _.value;
      if (G.key === "Escape") {
        G.preventDefault(), L();
        return;
      }
      if (B.length !== 0) {
        if (G.key === "ArrowDown") {
          G.preventDefault(), g.value = Math.min(g.value + 1, B.length - 1);
          return;
        }
        if (G.key === "ArrowUp") {
          if (G.preventDefault(), g.value === 0 && n.searchable) {
            f.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (G.key === "Enter") {
          G.preventDefault();
          const j = B[g.value];
          j && R(j);
        }
      }
    }
    return Fe(y, () => {
      g.value = 0;
    }), et(() => {
      document.addEventListener("click", Z);
    }), dt(() => {
      document.removeEventListener("click", Z);
    }), (G, B) => (b(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: te(P(ct))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: te([
          P(bt),
          "flex items-center justify-between gap-2 text-left",
          m.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": m.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: Q,
        onKeydown: ae
      }, [
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, D($.value), 3),
        z(P(hn), {
          class: te(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", m.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, ly),
      (b(), ee(_n, { to: "body" }, [
        nt(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: $e(v.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (b(), k("div", ry, [
            nt(u("input", {
              ref_key: "searchInputRef",
              ref: f,
              "onUpdate:modelValue": B[0] || (B[0] = (j) => y.value = j),
              type: "search",
              class: te([P(bt), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: B[1] || (B[1] = je(() => {
              }, ["stop"])),
              onKeydown: je(ue, ["stop"])
            }, null, 42, cy), [
              [ln, y.value]
            ])
          ])) : V("", !0),
          u("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: je(ge, ["stop"])
          }, [
            _.value.length === 0 ? (b(), k("li", dy, D(e.noResultsText), 1)) : V("", !0),
            (b(!0), k(se, null, fe(_.value, (j, K) => (b(), k("li", {
              key: S(j),
              role: "option",
              "aria-selected": M(j),
              class: te(O(j, K)),
              onClick: je((re) => R(j), ["stop"]),
              onMouseenter: (re) => g.value = K
            }, [
              e.showOptionCheck ? (b(), k("span", hy, [
                M(j) ? (b(), ee(P(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ])) : V("", !0),
              u("span", fy, D(j.label), 1)
            ], 42, uy))), 128))
          ], 544)
        ], 4), [
          [cn, m.value]
        ])
      ]))
    ], 512));
  }
}), gy = { class: "card-body" }, py = { class: "kpi-closed-value" }, my = { class: "kpi-closed-value__main" }, by = {
  key: 0,
  class: "kpi-closed-value__pct"
}, vy = { class: "table-view-select flex justify-end" }, yy = { class: "table-section w-full min-w-0" }, xy = { class: "cell-plain" }, _y = { class: "cell-plain" }, ky = { class: "cell-plain cell-plain--muted" }, wy = { class: "cell-plain" }, Cy = { class: "cell-plain" }, $y = { class: "cell-plain" }, Sy = {
  key: 2,
  class: "empty-state"
}, My = 6, Dy = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = (F) => {
      o("export", F);
    }, { isDark: i } = Me(Se(a, "theme")), l = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function r(F) {
      const N = F?.trim() ?? "";
      return N.length > 0 && !l.has(N);
    }
    function c(F) {
      if (!r(F.agent_email)) return !1;
      const N = F.assigned_count ?? 0, U = F.closed_count ?? 0;
      return N > 0 || U > 0;
    }
    function d(F) {
      return F.closed_count ?? 0;
    }
    function h(F) {
      const N = F?.trim();
      return N || "—";
    }
    const f = C(
      () => (a.data?.agents_by_day ?? []).filter(c)
    ), m = C(() => f.value.length > 0), g = C(() => {
      const F = (a.data?.total_enqueued ?? 0) > 0;
      return m.value || F;
    }), y = oe("by_date"), v = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], p = oe("date"), x = oe("desc");
    Fe(y, (F) => {
      F === "aggregated" ? (p.value = "name", x.value = "asc") : (p.value = "date", x.value = "desc");
    });
    function _(F, N) {
      return N == null ? null : N === 0 ? F > 0 ? 100 : 0 : (F - N) / N * 100;
    }
    function w(F) {
      const N = F.toFixed(1);
      return F > 0 ? `+${N}%` : `${N}%`;
    }
    function $(F, N = !1) {
      const U = N ? -F : F;
      return U > 0 ? "change-badge--up" : U < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function S(F, N) {
      if (F === null) return null;
      const U = _(F, N);
      return U === null ? null : {
        label: w(U),
        class: $(U, !0)
      };
    }
    function M(F) {
      if (F == null || F === "") return null;
      if (typeof F == "number")
        return Number.isFinite(F) ? F : null;
      const N = F.trim();
      if (!N) return null;
      if (N.includes(":")) {
        const ce = N.split(":").map(Number);
        return ce.length !== 3 || ce.some(isNaN) ? null : ce[0] * 3600 + ce[1] * 60 + ce[2];
      }
      const U = Number(N);
      return Number.isFinite(U) ? U : null;
    }
    function O(F) {
      const N = Math.round(F), U = Math.floor(N / 3600), ce = Math.floor(N % 3600 / 60), X = N % 60;
      return `${String(U).padStart(2, "0")}:${String(ce).padStart(2, "0")}:${String(X).padStart(2, "0")}`;
    }
    function H(F) {
      const N = M(F);
      return N === null ? "—" : typeof F == "string" && F.includes(":") ? F.trim() : O(N);
    }
    const A = C(() => a.data?.total_enqueued ?? 0), T = C(() => a.data?.total_closed ?? 0), L = C(
      () => a.data?.avg_time_to_assign_seconds ?? null
    ), R = C(
      () => a.data?.avg_conversation_duration_seconds ?? null
    ), W = C(() => A.value <= 0 ? null : `(${(T.value / A.value * 100).toFixed(1)}%)`), Q = C(
      () => S(
        M(L.value),
        a.previousAvgTimeToAssignSeconds
      )
    ), Z = C(
      () => S(
        M(R.value),
        a.previousAvgConversationDurationSeconds
      )
    );
    function ae(F, N) {
      return {
        id: `${F.date}-${F.agent_email}-${N}`,
        date: F.date,
        dateSort: new Date(F.date).getTime(),
        agent_name: F.agent_name ?? "",
        agent_email: F.agent_email,
        handled: d(F),
        avg_assignation_seconds: M(F.avg_time_to_assign_seconds),
        avg_resolution_seconds: M(F.avg_conversation_duration_seconds),
        avg_assignation_display: H(F.avg_time_to_assign_seconds),
        avg_resolution_display: H(F.avg_conversation_duration_seconds)
      };
    }
    function ue(F) {
      const N = /* @__PURE__ */ new Map();
      for (const U of F) {
        if (!c(U)) continue;
        const ce = U.agent_email.trim();
        N.has(ce) || N.set(ce, {
          agent_name: U.agent_name?.trim() ?? "",
          agent_email: ce,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const X = N.get(ce), Y = U.assigned_count ?? 0, J = U.closed_count ?? 0;
        X.handled += d(U), U.agent_name?.trim() && (X.agent_name = U.agent_name.trim());
        const de = M(U.avg_time_to_assign_seconds);
        de !== null && Y > 0 && (X.assignSum += de * Y, X.assignWeight += Y);
        const pe = M(U.avg_conversation_duration_seconds);
        pe !== null && J > 0 && (X.resolutionSum += pe * J, X.resolutionWeight += J);
      }
      return Array.from(N.values()).map((U, ce) => {
        const X = U.assignWeight > 0 ? U.assignSum / U.assignWeight : null, Y = U.resolutionWeight > 0 ? U.resolutionSum / U.resolutionWeight : null;
        return {
          id: `agg-${U.agent_email}-${ce}`,
          agent_name: U.agent_name,
          agent_email: U.agent_email,
          handled: U.handled,
          avg_assignation_seconds: X,
          avg_resolution_seconds: Y,
          avg_assignation_display: X !== null ? O(X) : "—",
          avg_resolution_display: Y !== null ? O(Y) : "—"
        };
      });
    }
    const ge = C(() => {
      const F = f.value;
      return y.value === "aggregated" ? ue(F) : F.map(ae);
    });
    function G(F, N, U, ce) {
      const X = ce === "asc" ? 1 : -1;
      let Y = 0;
      switch (U) {
        case "date":
          Y = (F.dateSort ?? 0) - (N.dateSort ?? 0);
          break;
        case "name":
          Y = (F.agent_name || "").localeCompare(N.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          Y = F.agent_email.localeCompare(N.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          Y = F.handled - N.handled;
          break;
        case "avgAssignation":
          Y = (F.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          Y = (F.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (N.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (Y !== 0) return Y * X;
      if (y.value === "by_date" && U !== "date") {
        const J = (N.dateSort ?? 0) - (F.dateSort ?? 0);
        if (J !== 0) return J;
      }
      return (F.agent_name || "").localeCompare(N.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const B = C(() => {
      const F = [...ge.value];
      return F.sort((N, U) => G(N, U, p.value, x.value)), F;
    }), j = C(
      () => B.value
    ), K = C(() => {
      const F = [];
      return y.value === "by_date" && F.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), F.push(
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
      ), F;
    });
    function re(F) {
      const N = F;
      if (p.value === N) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      p.value = N, N === "date" ? x.value = "desc" : N === "name" || N === "email" ? x.value = "asc" : x.value = "desc";
    }
    const xe = (F) => F == null ? "0" : ie(F), De = (F) => new Date(F).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (F, N) => (b(), ee(Ce, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: N[1] || (N[1] = (U) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", gy, [
          g.value ? (b(), k("div", {
            key: 0,
            class: te(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": P(i) }])
          }, [
            z(Mt, {
              label: "Conversations Opened",
              "label-position": "header",
              value: xe(A.value),
              theme: e.theme,
              "current-value": A.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: E(() => [...N[2] || (N[2] = [
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
            z(Mt, {
              label: "Conversations Closed",
              "label-position": "header",
              value: xe(T.value),
              theme: e.theme,
              "current-value": T.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: E(() => [...N[3] || (N[3] = [
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
                u("div", py, [
                  u("span", my, D(xe(T.value)), 1),
                  W.value ? (b(), k("span", by, D(W.value), 1)) : V("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            z(Mt, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: H(L.value),
              theme: e.theme,
              "current-value": M(L.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Do({
              icon: E(() => [
                N[4] || (N[4] = u("svg", {
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
              Q.value ? {
                name: "headerAside",
                fn: E(() => [
                  u("div", {
                    class: te(["duration-trend-badge", Q.value.class])
                  }, D(Q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            z(Mt, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: H(R.value),
              theme: e.theme,
              "current-value": M(R.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Do({
              icon: E(() => [
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
              Z.value ? {
                name: "headerAside",
                fn: E(() => [
                  u("div", {
                    class: te(["duration-trend-badge", Z.value.class])
                  }, D(Z.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : V("", !0),
          m.value ? (b(), ee(Ce, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: E(() => [
              u("div", vy, [
                z($o, {
                  modelValue: y.value,
                  "onUpdate:modelValue": N[0] || (N[0] = (U) => y.value = U),
                  options: v,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: E(() => [
              u("div", yy, [
                (b(), ee(rt, {
                  key: `${y.value}-${p.value}-${x.value}`,
                  columns: K.value,
                  rows: j.value,
                  "sort-key": p.value,
                  "sort-direction": x.value,
                  "max-visible-rows": My,
                  "row-key": "id",
                  onSort: re
                }, {
                  "cell-date": E(({ row: U }) => [
                    u("span", xy, D(De(String(U.date))), 1)
                  ]),
                  "cell-name": E(({ row: U }) => [
                    u("span", _y, D(h(U.agent_name)), 1)
                  ]),
                  "cell-email": E(({ row: U }) => [
                    u("span", ky, D(U.agent_email), 1)
                  ]),
                  "cell-handled": E(({ row: U }) => [
                    u("span", wy, D(xe(Number(U.handled))), 1)
                  ]),
                  "cell-avgAssignation": E(({ row: U }) => [
                    u("span", Cy, D(U.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": E(({ row: U }) => [
                    u("span", $y, D(U.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : g.value ? V("", !0) : (b(), k("div", Sy, [...N[6] || (N[6] = [
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
}), Ty = /* @__PURE__ */ me(Dy, [["__scopeId", "data-v-837b41e7"]]), Ay = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, By = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ly = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Py = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ry = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ey = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Iy = { class: "max-w-[360px] px-4 text-center" }, Fy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ei = 5, Oy = /* @__PURE__ */ le({
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
    }, i = Se(a, "theme"), { isDark: l } = Me(i), r = {
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
    }), d = C(
      () => a.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const y = d.value.total_by_channel || {}, v = Object.values(y).reduce(
        (p, x) => p + x,
        0
      );
      return v === 0 ? [] : Object.entries(y).sort(([, p], [, x]) => x - p).map(([p, x]) => ({
        name: p,
        label: p.toUpperCase(),
        total: x,
        percentage: (x / v * 100).toFixed(1),
        color: r[p.toLowerCase()] || "#9ca3af"
      }));
    }), f = C(
      () => h.value.slice(0, ei)
    ), m = C(() => {
      const y = Math.min(f.value.length, ei);
      if (!(y <= 0))
        return { gridTemplateColumns: `repeat(${y}, minmax(0, 1fr))` };
    }), g = (y) => {
      if (!y || !y.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const v = y.channels_by_day, p = Object.keys(v).sort();
      if (p.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const $ of Object.values(v))
        for (const S of Object.keys($))
          x.add(S);
      const w = Array.from(x).map(($) => {
        const S = $.toLowerCase(), M = r[S] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: p.map((O) => v[O]?.[$] || 0),
          borderColor: M
        };
      });
      c.value = {
        labels: p.map(($) => Ke($).format("MMM DD")),
        datasets: w
      };
    };
    return Fe(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: l }), (y, v) => (b(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: a.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", Ay, [
          u("div", By, [
            c.value.labels && c.value.labels.length ? (b(), k("section", Ly, [
              u("div", Py, [
                z(_t, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (b(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: $e(m.value)
              }, [
                (b(!0), k(se, null, fe(f.value, (p) => (b(), ee(ye, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${P(ie)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : h.value.length ? (b(), k("section", Ry, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: $e(m.value)
              }, [
                (b(!0), k(se, null, fe(f.value, (p) => (b(), ee(ye, {
                  key: p.name,
                  class: "min-w-0",
                  color: p.color,
                  title: p.label,
                  value: `${p.percentage}%`,
                  subvalue: `${P(ie)(p.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : V("", !0),
            h.value.length ? V("", !0) : (b(), k("section", Ey, [
              u("div", Iy, [
                u("div", Fy, [
                  z(P(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[0] || (v[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                v[1] || (v[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Vy = /* @__PURE__ */ me(Oy, [["__scopeId", "data-v-d3f89004"]]), zy = { class: "card-body" }, Ny = { class: "chart-container" }, Hy = { class: "triage-table-block w-full min-w-0" }, jy = { class: "triage-row-label" }, Wy = {
  key: 1,
  class: "triage-count"
}, Ky = {
  key: 1,
  class: "triage-count"
}, Yy = {
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
  class: "empty-state"
}, Gy = { class: "empty-state-content" }, Zy = { class: "empty-icon-wrapper" }, Qy = /* @__PURE__ */ le({
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
    }, { isDark: i, colors: l } = Me(
      Se(a, "theme")
    ), r = C(() => {
      const _ = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, S] of Object.entries(_)) {
        const M = $.split("+").filter(Boolean);
        if (!M.includes("triage")) continue;
        const O = M.filter((H) => H !== "triage").length;
        O >= 4 ? w["4p"] += Number(S) || 0 : w[O] += Number(S) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = r.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), d = C(() => Object.keys(a.data?.combinations || {}).length > 0), h = C(() => {
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
    }), f = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], m = C(() => {
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
    }, y = (_) => _?.replace("80", "") || "#888888", v = C(() => ({
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
    })), p = C(() => ({
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
    return t({ isDark: i }), (_, w) => (b(), ee(Ce, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", zy, [
          d.value ? (b(), k(se, { key: 0 }, [
            u("div", Ny, [
              z(Tt, {
                data: v.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            z(ye, {
              class: "w-full min-w-0",
              title: "Total",
              value: P(ie)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", Hy, [
              z(rt, {
                columns: f,
                rows: m.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": E(({ row: $ }) => [
                  u("span", jy, D($.metric), 1)
                ]),
                "cell-b0": E(({ row: $ }) => [
                  $.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: y(g.c0) })
                  }, D(x(Number($.b0))) + "%", 5)) : (b(), k("span", Wy, D(P(ie)(Number($.b0))), 1))
                ]),
                "cell-b1": E(({ row: $ }) => [
                  $.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: y(g.c1) })
                  }, D(x(Number($.b1))) + "%", 5)) : (b(), k("span", Ky, D(P(ie)(Number($.b1))), 1))
                ]),
                "cell-b2": E(({ row: $ }) => [
                  $.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: y(g.c2) })
                  }, D(x(Number($.b2))) + "%", 5)) : (b(), k("span", Yy, D(P(ie)(Number($.b2))), 1))
                ]),
                "cell-b3": E(({ row: $ }) => [
                  $.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: y(g.c3) })
                  }, D(x(Number($.b3))) + "%", 5)) : (b(), k("span", Uy, D(P(ie)(Number($.b3))), 1))
                ]),
                "cell-b4p": E(({ row: $ }) => [
                  $.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: $e({ color: y(g.c4p) })
                  }, D(x(Number($.b4p))) + "%", 5)) : (b(), k("span", qy, D(P(ie)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (b(), k("div", Xy, [
            u("div", Gy, [
              u("div", Zy, [
                z(P(at), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = u("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = u("p", { class: "empty-description" }, " No intent distribution data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Jy = /* @__PURE__ */ me(Qy, [["__scopeId", "data-v-be7d2c0c"]]), e1 = { class: "card-body" }, t1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, n1 = { class: "pie-section" }, a1 = {
  key: 1,
  class: "empty-state"
}, o1 = /* @__PURE__ */ le({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = [
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
    }, l = (m) => i[m]?.label || m.toUpperCase(), r = C(
      () => n.data?.items && n.data.items.length > 0
    ), c = C(
      () => (n.data?.items || []).reduce((m, g) => m + g.count, 0)
    ), d = C(() => {
      const m = {};
      for (const g of n.data?.items || [])
        m[g.language] = (m[g.language] || 0) + g.count;
      return Object.entries(m).map(([g, y]) => ({ language: g, count: y })).sort((g, y) => y.count - g.count);
    }), h = C(() => ({
      labels: d.value.map((m) => l(m.language)),
      datasets: [
        {
          data: d.value.map((m) => m.count),
          backgroundColor: d.value.map(
            (m, g) => s[g % s.length] + "80"
          ),
          borderColor: d.value.map(
            (m, g) => s[g % s.length]
          ),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    })), f = C(() => ({
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
            label: (m) => {
              const g = m.raw || 0, y = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${m.label}: ${g} (${y}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (m, g) => (b(), ee(Ce, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: n.loading
    }, {
      default: E(() => [
        u("div", e1, [
          r.value ? (b(), k("div", t1, [
            u("section", n1, [
              z(Ta, {
                data: h.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ]),
            z(ye, {
              class: "shrink-0",
              title: "Total",
              value: P(ie)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (b(), k("section", a1, [...g[0] || (g[0] = [
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
}), s1 = /* @__PURE__ */ me(o1, [["__scopeId", "data-v-9385c088"]]), i1 = { class: "card-body" }, l1 = {
  key: 0,
  class: "guardrails-daily-section"
}, r1 = { class: "w-full min-w-0" }, c1 = { class: "font-medium" }, d1 = { class: "font-semibold" }, u1 = { class: "type-badges-row" }, h1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, f1 = {
  key: 1,
  class: "empty-state"
}, g1 = /* @__PURE__ */ le({
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
    }, { isDark: i } = Me(Se(a, "theme")), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), r = C(
      () => (a.data?.items || []).reduce((v, p) => v + p.count, 0)
    ), c = (v) => {
      const p = {};
      for (const w of a.data?.items || [])
        p[w[v]] = (p[w[v]] || 0) + w.count;
      const x = Object.entries(p).sort((w, $) => $[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const _ = r.value;
      return {
        name: x[0][0],
        pct: _ > 0 ? Math.round(x[0][1] / _ * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), f = C(() => c("guardrail_source")), m = C(() => {
      const v = {};
      for (const p of a.data?.items || [])
        v[p.date] || (v[p.date] = {}), v[p.date][p.guardrail_type] = (v[p.date][p.guardrail_type] || 0) + p.count;
      return Object.entries(v).map(([p, x]) => ({
        date: p,
        total: Object.values(x).reduce((_, w) => _ + w, 0),
        types: Object.entries(x).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((p, x) => new Date(p.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], y = C(
      () => m.value.map((v) => ({
        id: v.date,
        date: v.date,
        total: v.total,
        types: v.types
      }))
    );
    return t({ isDark: i }), (v, p) => (b(), ee(Ce, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", i1, [
          l.value ? (b(), k(se, { key: 0 }, [
            m.value.length > 0 ? (b(), k("section", l1, [
              u("div", r1, [
                z(rt, {
                  columns: g,
                  rows: y.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": E(({ row: x }) => [
                    u("span", c1, D(P(Ke)(String(x.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": E(({ row: x }) => [
                    u("span", d1, D(P(ie)(x.total)), 1)
                  ]),
                  "cell-types": E(({ row: x }) => [
                    u("div", u1, [
                      (b(!0), k(se, null, fe(x.types, (_) => (b(), k("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, D(_.type) + " (" + D(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            u("section", h1, [
              z(ye, {
                title: "Total Events",
                value: P(ie)(r.value)
              }, null, 8, ["value"]),
              z(ye, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                title: "Top source",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (b(), k("section", f1, [...p[0] || (p[0] = [
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
}), p1 = /* @__PURE__ */ me(g1, [["__scopeId", "data-v-c042ede0"]]), m1 = { class: "card-body" }, b1 = { class: "chart-section" }, v1 = { class: "chart-wrapper" }, y1 = {
  key: 1,
  class: "empty-chart"
}, x1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, _1 = {
  key: 0,
  class: "dn-failure-section"
}, k1 = { class: "w-full min-w-0" }, w1 = { class: "failure-reason" }, C1 = { class: "failure-count" }, $1 = { class: "impact-bar-container" }, S1 = { class: "impact-label" }, M1 = { class: "dn-trend-health-block flex flex-col gap-0" }, D1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, T1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, A1 = { class: "system-health" }, B1 = { class: "system-health-content" }, L1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, P1 = {
  key: 1,
  class: "empty-state"
}, R1 = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = ($) => {
      o("export", $);
    }, { isDark: i, colors: l } = Me(Se(a, "theme")), r = C(() => {
      const $ = a.data?.documentCounts?.items || [], S = a.data?.processingCounts?.items || [];
      return $.length > 0 || S.length > 0;
    }), c = C(() => {
      const $ = a.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_completed: $.reduce((S, M) => S + M.processing_completed, 0),
        processing_failed: $.reduce((S, M) => S + M.processing_failed, 0),
        row_count_total: $.reduce((S, M) => S + M.row_count_total, 0)
      };
    }), d = C(() => {
      const $ = a.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((S, M) => S + M.processing_started, 0),
        processing_success: $.reduce((S, M) => S + M.processing_success, 0),
        notification_sent: $.reduce((S, M) => S + M.notification_sent, 0),
        notification_failed: $.reduce((S, M) => S + M.notification_failed, 0),
        dq_phone: $.reduce((S, M) => S + M.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((S, M) => S + M.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((S, M) => S + M.dq_error_booking_not_found, 0),
        dq_other: $.reduce((S, M) => S + M.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (S, M) => S + M.dq_error_phone_not_found + M.dq_error_flight_not_found + M.dq_error_booking_not_found + M.dq_error_other,
          0
        )
      };
    }), h = C(
      () => c.value.row_count_total || d.value.processing_started
    ), f = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), m = ($, S) => S ? `${Math.round($ / S * 100)}%` : "0%", g = C(() => {
      const $ = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((S) => S.count > 0).sort((S, M) => M.count - S.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), y = C(() => {
      const $ = h.value;
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
        impactPct: $ > 0 ? Math.round(S.count / $ * 100) : 0
      }));
    }), v = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], p = C(
      () => y.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), x = C(() => {
      const $ = h.value, S = d.value.processing_success, M = Math.max(0, S - d.value.totalDqErrors), O = d.value.notification_sent, H = Math.max(0, $ - S), A = d.value.totalDqErrors, T = Math.max(0, M - O), L = (Q, Z) => ve(Q, Z), R = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], W = [];
      return S > 0 && W.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: S,
        label: L(S, $)
      }), H > 0 && W.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: H,
        label: L(H, $)
      }), M > 0 && W.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: M,
        label: L(M, $)
      }), A > 0 && W.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: A,
        label: L(A, $)
      }), O > 0 && W.push({
        source: "Contactable",
        target: "Notified",
        value: O,
        label: L(O, $)
      }), T > 0 && W.push({
        source: "Contactable",
        target: "Not Delivered",
        value: T,
        label: L(T, $)
      }), { nodes: R, links: W };
    }), _ = C(() => {
      const $ = [...a.data?.processingCounts?.items || []].sort(
        (L, R) => new Date(L.date).getTime() - new Date(R.date).getTime()
      ), S = a.data?.documentCounts?.items || [], M = {};
      for (const L of S)
        M[L.date] = (M[L.date] || 0) + L.row_count_total;
      const O = [
        .../* @__PURE__ */ new Set([
          ...$.map((L) => L.date),
          ...S.map((L) => L.date)
        ])
      ].sort(), H = O.map((L) => Ke(L).format("MMM DD")), A = O.map((L) => {
        const R = $.find((Z) => Z.date === L), W = R?.notification_sent || 0, Q = M[L] || R?.processing_started || 0;
        return Q > 0 ? Math.round(W / Q * 100) : 0;
      }), T = O.map((L) => $.find((W) => W.date === L)?.notification_sent || 0);
      return {
        labels: H,
        datasets: [
          {
            label: "Success Rate (%)",
            data: A,
            borderColor: "#8b5cf6",
            yAxisID: "y"
          },
          {
            label: "Notifications Sent",
            data: T,
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
    return t({ isDark: i }), ($, S) => (b(), ee(Ce, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: S[0] || (S[0] = (M) => o("open"))
    }, {
      headerExport: E(() => [
        e.enableExport && !a.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", m1, [
          r.value ? (b(), k(se, { key: 0 }, [
            u("section", b1, [
              S[2] || (S[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", v1, [
                x.value.nodes.length > 0 && x.value.links.length > 0 ? (b(), ee(Gt, {
                  key: 0,
                  data: x.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 24
                }, null, 8, ["data"])) : (b(), k("div", y1, [...S[1] || (S[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", x1, [
              z(ye, {
                color: "#3b82f6",
                title: "Total Records",
                value: P(ie)(c.value.row_count_total)
              }, null, 8, ["value"]),
              z(ye, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: P(ie)(h.value)
              }, null, 8, ["value"]),
              z(ye, {
                color: "#10b981",
                title: "Successfully Notified",
                value: P(ie)(d.value.notification_sent),
                subvalue: m(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                color: "#ef4444",
                title: "Not Notified",
                value: P(ie)(f.value),
                subvalue: m(f.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              z(ye, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${P(ie)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            y.value.length > 0 ? (b(), k("section", _1, [
              S[3] || (S[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", k1, [
                z(rt, {
                  columns: v,
                  rows: p.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": E(({ row: M }) => [
                    u("span", w1, D(M.reason), 1)
                  ]),
                  "cell-count": E(({ row: M }) => [
                    u("span", C1, D(P(ie)(M.count)), 1)
                  ]),
                  "cell-impact": E(({ row: M }) => [
                    u("div", $1, [
                      u("div", {
                        class: "impact-bar",
                        style: $e({ width: M.impactPct + "%" })
                      }, null, 4),
                      u("span", S1, D(M.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            u("div", M1, [
              _.value.labels.length > 0 ? (b(), k("section", D1, [
                S[4] || (S[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", T1, [
                  z(_t, {
                    data: _.value,
                    options: w.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : V("", !0),
              u("details", A1, [
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
                  Te(" System Health Details ")
                ], -1)),
                u("div", B1, [
                  u("div", L1, [
                    z(ye, {
                      title: "Docs Started",
                      value: P(ie)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Docs Completed",
                      value: P(ie)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Docs Failed",
                      value: P(ie)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Processing Started",
                      value: P(ie)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Processing Success",
                      value: P(ie)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    z(ye, {
                      title: "Notification Failed",
                      value: P(ie)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (b(), k("section", P1, [...S[6] || (S[6] = [
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
}), E1 = /* @__PURE__ */ me(R1, [["__scopeId", "data-v-3b9202b7"]]), I1 = /* @__PURE__ */ le({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => ie(n.totalConversations)), s = C(() => P(a.value?.isDark) ?? !1), i = C(() => P(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), ee(Mt, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), F1 = /* @__PURE__ */ le({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${n.csatP95.toFixed(1)}`), s = C(() => P(a.value?.isDark) ?? !1), i = C(() => P(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), ee(Mt, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), O1 = /* @__PURE__ */ le({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${n.csatPulse.toFixed(1)}%`), s = C(() => P(a.value?.isDark) ?? !1), i = C(() => P(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), ee(Mt, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), V1 = {
  key: 0,
  class: "card-body"
}, z1 = { class: "chart-wrapper" }, N1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, H1 = {
  key: 1,
  class: "empty-state"
}, j1 = 520, W1 = 300, K1 = 40, Y1 = 48, U1 = 48, q1 = {
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
    const a = n, o = (r) => {
      a("export", r);
    }, s = e, { isDark: i } = Me(Se(s, "theme")), l = C(() => s.data);
    return t({ isDark: i }), (r, c) => (b(), ee(Ce, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !s.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        l.value && l.value.total_nps_responses > 0 ? (b(), k("div", V1, [
          u("div", z1, [
            z(al, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": j1,
              "chart-height": W1,
              "chart-margin": K1,
              "chart-margin-right": Y1,
              "chart-bottom-margin": U1,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", N1, [
            z(ye, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (b(), ee(ye, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : V("", !0)
          ])
        ])) : (b(), k("div", H1, [...c[0] || (c[0] = [
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
}, gl = /* @__PURE__ */ me(q1, [["__scopeId", "data-v-e98fe9b2"]]), X1 = {
  key: 0,
  class: "card-body"
}, G1 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Z1 = {
  key: 1,
  class: "empty-state"
}, Q1 = {
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
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), l = C(() => ({
      labels: s.value.map((c) => Ke(c.date).format("DD-MM-YYYY")),
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
    return (c, d) => (b(), ee(Ce, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        i.value ? (b(), k("div", X1, [
          u("div", G1, [
            z(_t, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (b(), k("div", Z1, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, pl = /* @__PURE__ */ me(Q1, [["__scopeId", "data-v-5207cfa7"]]), J1 = {
  key: 0,
  class: "card-body"
}, ex = {
  key: 1,
  class: "empty-state"
}, tx = /* @__PURE__ */ le({
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
    const t = e, n = C(
      () => t.data?.resolution_breakdown || []
    ), a = C(
      () => n.value.some((i) => Number(i.count || 0) > 0)
    ), o = C(() => {
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
    return (i, l) => (b(), ee(Ce, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: E(() => [
        a.value ? (b(), k("div", J1, [
          z(Tt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", ex, [...l[0] || (l[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), nx = /* @__PURE__ */ me(tx, [["__scopeId", "data-v-6849ef24"]]), ax = {
  key: 0,
  class: "card-body"
}, ox = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, sx = {
  key: 1,
  class: "empty-state"
}, ix = /* @__PURE__ */ le({
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
    const n = t, a = (c) => {
      n("export", c);
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
    return (c, d) => (b(), ee(Ce, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !o.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: a
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        i.value ? (b(), k("div", ax, [
          u("div", ox, [
            z(_t, {
              data: l.value,
              options: r,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (b(), k("div", sx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), lx = /* @__PURE__ */ me(ix, [["__scopeId", "data-v-72955d9a"]]), rx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, cx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, ml = {
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
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), l = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), r = C(() => l.value > 0), c = C(
      () => l.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (b(), k("div", rx, [
      u("div", cx, [
        z(gl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"]),
        z(pl, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      r.value ? (b(), k("div", {
        key: 0,
        class: te(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (b(), ee(nx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : V("", !0),
        i.value ? (b(), ee(lx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: a
        }, null, 8, ["data", "loading", "enable-export"])) : V("", !0)
      ], 2)) : V("", !0)
    ]));
  }
}, dx = { class: "csat-container__body" }, ux = /* @__PURE__ */ le({
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
    const n = t;
    function a(o) {
      n("export", { source: "npsMetrics", format: o });
    }
    return (o, s) => (b(), ee(Ce, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => n("open"))
    }, {
      default: E(() => [
        u("div", dx, [
          z(ml, {
            data: e.data,
            "enable-export": e.enableExport,
            "show-resolution-chart": e.showResolutionChart,
            "show-csat-pulse-chart": e.showCsatPulseChart,
            onExport: a
          }, null, 8, ["data", "enable-export", "show-resolution-chart", "show-csat-pulse-chart"])
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), hx = /* @__PURE__ */ me(ux, [["__scopeId", "data-v-37178ba1"]]), fx = /* @__PURE__ */ le({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => Vt(n.totalRevenue)), s = C(() => P(a.value?.isDark) ?? !1), i = C(() => P(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), ee(Mt, {
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
      icon: E(() => [...r[0] || (r[0] = [
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
}), ti = 1, gx = /* @__PURE__ */ le({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), { isDark: o } = Me(Se(n, "theme")), s = C(() => n.totalConversations * ti), i = C(() => n.previousTotalConversations === null || n.previousTotalConversations === void 0 ? null : n.previousTotalConversations * ti), l = C(() => ie(s.value)), r = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!r.value) return 0;
      const f = i.value;
      return f === 0 ? s.value > 0 ? 100 : 0 : (s.value - f) / f * 100;
    }), d = C(() => {
      const f = c.value.toFixed(1);
      return c.value > 0 ? `+${f}%` : `${f}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (f, m) => (b(), ee(Mt, {
      label: "Cost",
      value: l.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...m[0] || (m[0] = [
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
        r.value ? (b(), k("div", {
          key: 0,
          class: te(["change-badge", h.value, { "change-badge--dark": P(o) }])
        }, D(d.value), 3)) : V("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), px = /* @__PURE__ */ me(gx, [["__scopeId", "data-v-411e0735"]]), mx = { class: "flex justify-end" }, bx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, vx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, yx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, xx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, _x = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, kx = /* @__PURE__ */ le({
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
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = (w) => {
      o("export", w);
    }, i = Se(a, "theme"), { isDark: l } = Me(i), r = oe(a.breakdownBy), c = C(() => a.data ?? {
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
    }), h = oe([]), f = C(() => {
      const w = h.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), m = oe(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], y = (w) => g[w % g.length], v = {
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
    }, p = () => {
      o("changeBreakdown", r.value);
    }, x = (w) => {
      if (!w) return "";
      const S = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, _ = (w) => {
      if (r.value === "all") {
        const T = w?.escalations_by_day ?? [];
        if (!T.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
          return;
        }
        const L = [...T].sort((R, W) => R.date.localeCompare(W.date));
        d.value = {
          labels: L.map((R) => Ke(R.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: L.map(
                (R) => Number(R.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], m.value = [];
        return;
      }
      const $ = w?.breakdown_by_day ?? [], S = w?.breakdown_items ?? [];
      if (!$.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], m.value = [];
        return;
      }
      const M = [...$].sort(
        (T, L) => T.date.localeCompare(L.date)
      ), O = S.slice(0, 5).map((T) => T.key), H = M.map((T) => Ke(T.date).format("MMM DD")), A = O.map((T, L) => {
        const R = S.find((W) => W.key === T);
        return {
          label: x(R?.label || T),
          data: M.map((W) => {
            const Q = W.items.find((Z) => Z.key === T);
            return Number(Q?.percentage || 0);
          }),
          borderColor: y(L),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: H,
        datasets: A
      }, h.value = S.slice(0, 5).map((T, L) => ({
        key: T.key,
        label: x(T.label),
        percentage: Number(T.percentage || 0),
        color: y(L)
      })), m.value = S.slice(0, 5).map((T, L) => ({
        key: T.key,
        label: x(T.label),
        color: y(L)
      }));
    };
    return Fe(
      () => a.data,
      (w) => {
        _(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Fe(
      () => a.breakdownBy,
      (w) => {
        r.value = w, _(c.value);
      }
    ), t({ isDark: l }), (w, $) => (b(), ee(Ce, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      headerAside: E(() => [
        u("div", mx, [
          nt(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (S) => r.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: p
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [Al, r.value]
          ])
        ])
      ]),
      default: E(() => [
        u("div", bx, [
          u("div", vx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (b(), k("section", yx, [
              u("div", xx, [
                z(_t, {
                  data: d.value,
                  options: v,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (b(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: $e(f.value)
              }, [
                (b(!0), k(se, null, fe(h.value, (S) => (b(), ee(ye, {
                  key: `card-${S.key}`,
                  class: "min-w-0",
                  color: S.color,
                  title: S.label,
                  value: `${S.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : V("", !0)
            ])) : (b(), k("section", _x, [...$[2] || ($[2] = [
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
}), wx = /* @__PURE__ */ me(kx, [["__scopeId", "data-v-b18e0ebd"]]), Cx = /* @__PURE__ */ le({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, a = oe(null), o = C(() => `${Number(n.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => P(a.value?.isDark) ?? !1), i = C(() => P(a.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (l, r) => (b(), ee(Mt, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: a
    }, {
      icon: E(() => [...r[0] || (r[0] = [
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
}), $x = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Sx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Mx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, Dx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Tx = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Ax = { class: "max-w-[360px] text-center" }, Bx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Lx = {
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
    const t = e, { isDark: n, colors: a } = Me(Se(t, "theme")), o = C(() => {
      const l = t.data ?? {}, r = l.daily, c = l.days, d = Array.isArray(r) && r.length > 0, h = Array.isArray(c) && c.length > 0 && Array.isArray(l.allocatedCostSeries) && l.allocatedCostSeries.length === c.length;
      let f = [];
      return d ? f = r : h && (f = c.map((m, g) => ({
        date: m,
        allocated_cost: l.allocatedCostSeries[g] ?? 0,
        aws_cost: l.awsCostSeries[g] ?? 0,
        airline_conversations: l.airlineConversationsSeries[g] ?? 0
      }))), {
        daily: f,
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
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
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
          backgroundColor: a.value.tooltipBg,
          titleColor: a.value.tooltipText,
          bodyColor: a.value.tooltipText,
          borderColor: a.value.tooltipBorder,
          borderWidth: 1,
          cornerRadius: 12,
          displayColors: !0,
          usePointStyle: !0,
          callbacks: {
            label(l) {
              const r = l.dataset.label ? `${l.dataset.label}: ` : "", c = l.parsed.y;
              return l.dataset.yAxisID === "y" ? r + Le(c) : r + String(c);
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
            callback: (l) => Le(l)
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
    return (l, r) => (b(), ee(Ce, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", $x, [
          o.value.daily.length > 0 ? (b(), k("div", Sx, [
            u("div", Mx, [
              z(_t, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", Dx, [
              z(ye, {
                color: P(a).primaryLight,
                title: "Total Allocated",
                value: P(Le)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              z(ye, {
                color: "#FF9900",
                title: "Total AWS",
                value: P(Le)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (b(), k("section", Tx, [
            u("div", Ax, [
              u("div", Bx, [
                z(P(at), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              r[0] || (r[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " Sin datos de costos ", -1)),
              r[1] || (r[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["title", "loading"]));
  }
}, Px = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Rx = { class: "card-body" }, Ex = {
  key: 0,
  class: "chart-section"
}, Ix = { class: "chart-container" }, Fx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Ox = {
  key: 1,
  class: "empty-state"
}, Vx = { class: "empty-state-content" }, zx = { class: "empty-icon-wrapper" }, An = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ni = 10, Nx = /* @__PURE__ */ le({
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
    const a = e, { isDark: o, colors: s } = Me(Se(a, "theme")), i = (g) => {
      const y = new Date(g), v = String(y.getDate()).padStart(2, "0"), p = String(y.getMonth() + 1).padStart(2, "0");
      return `${v}-${p}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.input_cost || 0), 0);
    }), c = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.output_cost || 0), 0);
    }), d = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = a.data?.costs_by_day || {};
      return Object.values(g).reduce((y, v) => y + (v.cache_write_cost || 0), 0);
    }), f = C(() => {
      const g = a.data?.costs_by_day || {}, y = Object.keys(g).sort();
      if (y.length === 0)
        return { labels: [], datasets: [] };
      const v = y.map((x) => i(x)), p = [
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
        labels: v,
        datasets: p
      };
    }), m = C(() => a.options ? a.options : {
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
              family: An,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ni,
            boxHeight: ni,
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
            family: An,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: An,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let y = g.dataset.label || "";
              return y && (y += ": "), g.parsed.y !== null && (y += Le(g.parsed.y)), y;
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
            font: { family: An, size: 12, weight: "500" },
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
            font: { family: An, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Le(g);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (g, y) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Px, [
          u("div", Rx, [
            f.value.labels && f.value.labels.length ? (b(), k("section", Ex, [
              u("div", Ix, [
                z(Tt, {
                  data: f.value,
                  options: m.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Fx, [
                z(ye, {
                  title: "Total Cost",
                  value: P(Le)(e.data.total_cost)
                }, null, 8, ["value"]),
                z(ye, {
                  title: "Input Cost",
                  value: P(Le)(r.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Output Cost",
                  value: P(Le)(c.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Cache Read",
                  value: P(Le)(d.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Cache Write",
                  value: P(Le)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                z(ye, {
                  title: "Avg / Conv.",
                  value: P(Le)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Ox, [
              u("div", Vx, [
                u("div", zx, [
                  z(P(at), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                y[1] || (y[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Hx = /* @__PURE__ */ me(Nx, [["__scopeId", "data-v-e1c4a95b"]]), jx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Wx = { class: "card-body" }, Kx = {
  key: 0,
  class: "chart-section"
}, Yx = { class: "chart-container" }, Ux = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, qx = {
  key: 1,
  class: "empty-state"
}, Xx = { class: "empty-state-content" }, Gx = { class: "empty-icon-wrapper" }, Bn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ai = 10, Zx = /* @__PURE__ */ le({
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
    const a = e, { isDark: o, colors: s } = Me(Se(a, "theme")), i = (d) => {
      const h = new Date(d), f = String(h.getDate()).padStart(2, "0"), m = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${m}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, r = C(() => {
      const d = a.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((g) => i(g)), m = [
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
        labels: f,
        datasets: m
      };
    }), c = C(() => a.options ? a.options : {
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
              family: Bn,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: ai,
            boxHeight: ai,
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
            family: Bn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Bn,
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
            font: { family: Bn, size: 12, weight: "500" },
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
            font: { family: Bn, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", jx, [
          u("div", Wx, [
            r.value.labels && r.value.labels.length ? (b(), k("section", Kx, [
              u("div", Yx, [
                z(Tt, {
                  data: r.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Ux, [
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: P(ie)(e.data.total_tokens)
                }, null, 8, ["value"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: P(ie)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: P(ie)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: P(ie)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                z(ye, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: P(ie)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (b(), k("section", qx, [
              u("div", Xx, [
                u("div", Gx, [
                  z(P(at), { class: "empty-icon" })
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
}), Qx = /* @__PURE__ */ me(Zx, [["__scopeId", "data-v-554d3cda"]]), Jx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, e_ = { class: "card-body" }, t_ = {
  key: 0,
  class: "chart-section"
}, n_ = { class: "chart-container" }, a_ = { class: "mt-4 w-full min-w-0" }, o_ = {
  key: 1,
  class: "empty-state"
}, s_ = { class: "empty-state-content" }, i_ = { class: "empty-icon-wrapper" }, l_ = /* @__PURE__ */ le({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => ie(n.data?.total_conversations ?? 0)
    ), l = C(() => {
      const c = n.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((m) => s(m)), f = [
        {
          label: "Conversations",
          data: d.map((m) => c[m] || 0),
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
        datasets: f
      };
    }), r = C(() => n.options ? n.options : {
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
    return t({ isDark: a }), (c, d) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", Jx, [
          u("div", e_, [
            l.value.labels && l.value.labels.length ? (b(), k("section", t_, [
              u("div", n_, [
                z(_t, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", a_, [
                z(ye, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", o_, [
              u("div", s_, [
                u("div", i_, [
                  z(P(at), { class: "empty-icon" })
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
}), r_ = /* @__PURE__ */ me(l_, [["__scopeId", "data-v-311f443a"]]), c_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, d_ = { class: "card-body" }, u_ = {
  key: 0,
  class: "charts-grid"
}, h_ = { class: "chart-section" }, f_ = { class: "chart-container" }, g_ = { class: "chart-section" }, p_ = { class: "chart-container" }, m_ = {
  key: 1,
  class: "empty-state"
}, b_ = { class: "empty-state-content" }, v_ = { class: "empty-icon-wrapper" }, y_ = /* @__PURE__ */ le({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = C(() => n.data?.top_agents && n.data.top_agents.length > 0), i = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, m) => (m.total_cost || 0) - (f.total_cost || 0)) : []), l = C(() => n.data?.top_agents ? [...n.data.top_agents].sort((f, m) => (m.total_tokens || 0) - (f.total_tokens || 0)) : []), r = C(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((m) => m.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((m) => m.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const f = l.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((m) => m.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((m) => m.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => n.options ? n.options : {
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const m = f.label, g = n.data?.top_agents?.find((y) => y.agent_type === m);
              return g ? [
                `Total Cost: ${Le(g.total_cost)}`,
                `Input Cost: ${Le(g.total_input_tokens_cost)}`,
                `Output Cost: ${Le(g.total_output_tokens_cost)}`,
                `Cache Read: ${Le(g.total_read_tokens_cost)}`,
                `Cache Write: ${Le(g.total_write_tokens_cost)}`
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
            callback: function(f) {
              return Le(f);
            }
          }
        }
      }
    }), h = C(() => n.options ? n.options : {
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const m = f.label, g = n.data?.top_agents?.find((y) => y.agent_type === m);
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
            callback: function(f) {
              return f.toLocaleString();
            }
          }
        }
      }
    });
    return t({ isDark: a }), (f, m) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", c_, [
          u("div", d_, [
            s.value ? (b(), k("div", u_, [
              u("section", h_, [
                m[0] || (m[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", f_, [
                  z(Tt, {
                    data: r.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", g_, [
                m[1] || (m[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", p_, [
                  z(Tt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (b(), k("section", m_, [
              u("div", b_, [
                u("div", v_, [
                  z(P(at), { class: "empty-icon" })
                ]),
                m[2] || (m[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                m[3] || (m[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), x_ = /* @__PURE__ */ me(y_, [["__scopeId", "data-v-bb4ae132"]]), __ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, k_ = { class: "card-body" }, w_ = {
  key: 0,
  class: "chart-section"
}, C_ = { class: "chart-container" }, $_ = {
  key: 1,
  class: "empty-state"
}, S_ = { class: "empty-state-content" }, M_ = { class: "empty-icon-wrapper" }, D_ = /* @__PURE__ */ le({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = C(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = C(() => i.value.length > 0), r = C(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return (s[v] || "#a78bfa") + "80";
      }), m = h.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return s[v] || "#a78bfa";
      });
      return {
        labels: h.map((y) => {
          const v = y.conversations || 0, p = r.value ? v / r.value * 100 : 0;
          return `${y.agent_type} - ${v.toLocaleString()} (${p.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((y) => y.conversations || 0),
            backgroundColor: f,
            borderColor: m,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => n.options ? n.options : {
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
              const f = (h.label || "").toString(), m = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((v, p) => v + (Number(p) || 0), 0), y = g ? m / g * 100 : 0;
              return `${f}: ${m.toLocaleString()} (${y.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, f) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", __, [
          u("div", k_, [
            l.value ? (b(), k("section", w_, [
              u("div", C_, [
                z(Ta, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", $_, [
              u("div", S_, [
                u("div", M_, [
                  z(P(at), { class: "empty-icon" })
                ]),
                f[0] || (f[0] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                f[1] || (f[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), T_ = /* @__PURE__ */ me(D_, [["__scopeId", "data-v-74c924dc"]]), A_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, B_ = { class: "card-body" }, L_ = {
  key: 0,
  class: "chart-section"
}, P_ = { class: "chart-container" }, R_ = {
  key: 1,
  class: "empty-state"
}, E_ = { class: "empty-state-content" }, I_ = { class: "empty-icon-wrapper" }, F_ = /* @__PURE__ */ le({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: o } = Me(Se(n, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), l = C(() => {
      const c = n.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const v = [...c].sort((p, x) => p.date.localeCompare(x.date));
        return {
          labels: v.map((p) => s(p.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: v.map((p) => Number(p.value) || 0),
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
      const d = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, m = Object.keys(d).filter((v) => h[v]).sort();
      if (m.length === 0)
        return { labels: [], datasets: [] };
      const g = m.map((v) => s(v)), y = m.map((v) => {
        const p = d[v]?.total_cost || 0, x = h[v] || 0;
        return x > 0 ? p / x : 0;
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
    }), r = C(() => n.options ? n.options : {
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
              return d && (d += ": "), c.parsed.y !== null && (d += Le(c.parsed.y)), d;
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
              return Le(c);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (c, d) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: E(() => [
        u("div", A_, [
          u("div", B_, [
            i.value ? (b(), k("section", L_, [
              u("div", P_, [
                z(_t, {
                  data: l.value,
                  options: r.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", R_, [
              u("div", E_, [
                u("div", I_, [
                  z(P(at), { class: "empty-icon" })
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
}), O_ = /* @__PURE__ */ me(F_, [["__scopeId", "data-v-ae6c48b1"]]), V_ = { class: "tabs text-sm" }, z_ = ["aria-label"], N_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], H_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, j_ = /* @__PURE__ */ le({
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
    const n = e, a = t, o = oe([]), s = `tabs-${Ye()}`, i = (g) => `${s}-tab-${g}`, l = C(
      () => n.items.map((g, y) => g.disabled ? -1 : y).filter((g) => g >= 0)
    );
    function r(g) {
      return g.value === n.modelValue;
    }
    function c(g) {
      const y = r(g), p = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${p} cursor-not-allowed opacity-40` : y ? `${p} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${p} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, y) {
      g === y || n.items.find((p) => p.value === g)?.disabled || (a("update:modelValue", g), a("change", { value: g, previousValue: y }));
    }
    function h(g, y) {
      a("tab-click", { value: g.value, originalEvent: y }), !g.disabled && (d(g.value, n.modelValue), He(() => {
        o.value[n.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, y) {
      const v = n.items.length;
      if (v === 0) return 0;
      let p = g;
      for (let x = 0; x < v; x++)
        if (p = (p + y + v) % v, !n.items[p]?.disabled) return p;
      return g;
    }
    async function m(g, y) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let p = y;
      g.key === "ArrowLeft" ? p = f(y, -1) : g.key === "ArrowRight" ? p = f(y, 1) : g.key === "Home" ? p = l.value[0] ?? 0 : g.key === "End" && (p = l.value[l.value.length - 1] ?? y);
      const x = n.items[p];
      !x || x.disabled || (d(x.value, n.modelValue), await He(), o.value[p]?.focus());
    }
    return (g, y) => (b(), k("div", V_, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: te([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (b(!0), k(se, null, fe(e.items, (v, p) => (b(), k("button", {
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
          class: te(c(v)),
          onClick: (x) => h(v, x),
          onKeydown: (x) => m(x, p)
        }, [
          u("span", {
            class: te(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            v.icon ? (b(), ee(St(v.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            u("span", H_, D(v.label), 1)
          ], 2)
        ], 42, N_))), 128))
      ], 10, z_),
      g.$slots.default ? (b(), ee(gt, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: E(() => [
          (b(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            _e(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), bl = /* @__PURE__ */ me(j_, [["__scopeId", "data-v-f9c367eb"]]), W_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, K_ = { class: "card-body" }, Y_ = {
  key: 0,
  class: "model-usage-table-block"
}, U_ = { class: "w-full min-w-0" }, q_ = {
  key: 1,
  class: "empty-state"
}, X_ = { class: "empty-state-content" }, G_ = { class: "empty-icon-wrapper" }, Z_ = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (g) => {
      o("export", g);
    }, { isDark: i } = Me(Se(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], r = oe("by_model"), c = C(() => r.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: r.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([g, y]) => ({
        id: g,
        name: g,
        avgCost: m(y.avg_cost_per_message),
        avgTokens: f(y.avg_tokens_per_message),
        messageCount: f(y.message_count),
        totalCost: m(y.total_cost),
        totalTokens: f(y.total_tokens)
      }))
    ), f = (g) => g == null ? "0" : ie(g), m = (g) => g == null ? "$0.00" : Le(g);
    return t({ isDark: i }), (g, y) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", W_, [
          u("div", K_, [
            z(bl, {
              modelValue: r.value,
              "onUpdate:modelValue": y[0] || (y[0] = (v) => r.value = v),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: E(() => [
                c.value && Object.keys(c.value).length > 0 ? (b(), k("div", Y_, [
                  u("div", U_, [
                    z(rt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (b(), k("div", q_, [
                  u("div", X_, [
                    u("div", G_, [
                      z(P(at), { class: "empty-icon" })
                    ]),
                    y[1] || (y[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    y[2] || (y[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Q_ = /* @__PURE__ */ me(Z_, [["__scopeId", "data-v-48a6cc07"]]), J_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ek = { class: "card-body" }, tk = {
  key: 0,
  class: "message-roles-table-block"
}, nk = { class: "w-full min-w-0" }, ak = {
  key: 1,
  class: "empty-state"
}, ok = { class: "empty-state-content" }, sk = { class: "empty-icon-wrapper" }, ik = /* @__PURE__ */ le({
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
    }, { isDark: i } = Me(Se(a, "theme")), l = ["assistant", "system", "user"], r = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => a.data?.total_by_role || {}), d = C(
      () => l.map((y) => ({
        id: y,
        role: g(y),
        avgCost: m(c.value[y]?.avg_cost_per_message),
        avgTokens: f(c.value[y]?.avg_tokens_per_message),
        messageCount: f(c.value[y]?.message_count),
        totalCost: m(c.value[y]?.total_cost),
        totalTokens: f(c.value[y]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), f = (y) => y == null ? "0" : ie(y), m = (y) => y == null ? "$0.00" : Le(y), g = (y) => y.charAt(0).toUpperCase() + y.slice(1);
    return t({ isDark: i }), (y, v) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", J_, [
          u("div", ek, [
            h.value ? (b(), k("div", tk, [
              u("div", nk, [
                z(rt, {
                  columns: r,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (b(), k("div", ak, [
              u("div", ok, [
                u("div", sk, [
                  z(P(at), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = u("p", { class: "empty-title" }, "No message role data available", -1)),
                v[1] || (v[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), lk = /* @__PURE__ */ me(ik, [["__scopeId", "data-v-d38e854e"]]), rk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ck = { class: "card-body" }, dk = {
  key: 0,
  class: "chart-section"
}, uk = { class: "chart-container" }, hk = { class: "kpi-grid" }, fk = {
  key: 1,
  class: "empty-state"
}, gk = { class: "empty-state-content" }, pk = { class: "empty-icon-wrapper" }, mk = /* @__PURE__ */ le({
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
    const a = e, o = n, s = (x) => {
      o("export", x);
    }, { isDark: i, colors: l } = Me(Se(a, "theme")), r = {
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
      for (const [w, $] of Object.entries(r))
        if (_.includes(w))
          return $;
      return "#9ca3af";
    }, f = C(() => [...a.data?.top_agents || []].sort((_, w) => w.avg_cost_per_conversation - _.avg_cost_per_conversation)), m = C(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : f.value.reduce((x, _) => x + _.conversations, 0)), g = C(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : f.value.reduce((x, _) => x + _.total_cost, 0)), y = C(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : m.value === 0 ? 0 : g.value / m.value), v = C(() => {
      const x = f.value;
      if (x.length === 0)
        return { labels: [], datasets: [] };
      const _ = x.map((S) => d(S)), w = x.map((S) => S.avg_cost_per_conversation), $ = x.map((S) => h(S));
      return {
        labels: _,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: $.map((S) => `${S}80`),
            borderColor: $,
            borderWidth: 1
          }
        ]
      };
    }), p = C(() => a.options ? a.options : {
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
              const _ = f.value[x.dataIndex];
              return [
                `Cost: ${Le(x.parsed.x)}`,
                `Conversations: ${ie(_.conversations)}`,
                `Total Cost: ${Le(_.total_cost)}`
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
              return Le(x);
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
    return t({ isDark: i }), (x, _) => (b(), ee(Ce, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: E(() => [
        e.enableExport && !e.loading ? (b(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: E(() => [
        u("div", rk, [
          u("div", ck, [
            v.value.labels && v.value.labels.length ? (b(), k("section", dk, [
              u("div", uk, [
                z(Tt, {
                  data: v.value,
                  options: p.value
                }, null, 8, ["data", "options"])
              ]),
              u("footer", hk, [
                z(P(ye), {
                  title: "Total Agents",
                  value: String(f.value.length)
                }, null, 8, ["value"]),
                z(P(ye), {
                  title: "Total Conversations",
                  value: P(ie)(m.value)
                }, null, 8, ["value"]),
                z(P(ye), {
                  title: "Total Cost",
                  value: P(Le)(g.value)
                }, null, 8, ["value"]),
                z(P(ye), {
                  title: "Avg Cost / Conv.",
                  value: P(Le)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", fk, [
              u("div", gk, [
                u("div", pk, [
                  z(P(at), { class: "empty-icon" })
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
}), bk = /* @__PURE__ */ me(mk, [["__scopeId", "data-v-34c6a73a"]]);
function So(e, t) {
  const n = e[t];
  return Array.isArray(n) ? n.filter(
    (a) => a !== null && typeof a == "object" && !Array.isArray(a)
  ) : [];
}
function vl(e, t) {
  const { childrenKey: n, sortKey: a, sortDirection: o, compare: s } = t;
  return [...e].sort((i, l) => s(i, l, a, o)).map((i) => {
    const l = So(i, n);
    return l.length === 0 ? i : {
      ...i,
      [n]: vl(l, t)
    };
  });
}
function yl(e, t, n = 0, a = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: l, maxDepth: r } = t, c = [];
  return e.forEach((d, h) => {
    const f = l(d, o + h), m = So(d, s), g = m.length > 0, y = i.has(f);
    c.push({
      row: d,
      key: f,
      depth: n,
      hasChildren: g,
      isExpanded: y,
      parentKey: a
    }), g && y && (r === void 0 || n < r) && c.push(
      ...yl(m, t, n + 1, f, 0)
    );
  }), c;
}
function xl(e, t, n = 0, a = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, l = [];
  return e.forEach((r, c) => {
    const d = s(r, a + c), h = So(r, o), f = h.length > 0, m = {
      depth: n,
      isChild: n > 0,
      hasChildren: f
    };
    (i?.(r, m) ?? !0) && l.push(d), h.length > 0 && l.push(
      ...xl(h, t, n + 1, 0)
    );
  }), l;
}
const vk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, yk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, xk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, _k = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, kk = ["checked", "aria-label"], wk = ["aria-sort", "onClick"], Ck = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, $k = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Sk = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Mk = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, Dk = ["checked", "aria-label", "onChange"], Tk = ["aria-expanded", "aria-label", "onClick"], Ak = ["aria-expanded", "aria-label", "onClick"], Bk = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, Lk = { class: "min-w-0 flex-1" }, Pk = /* @__PURE__ */ le({
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
    const n = e, a = t, o = oe(null), s = oe([...n.defaultExpandedKeys]), i = C({
      get() {
        return n.expandedKeys ?? s.value;
      },
      set(B) {
        s.value = B, a("update:expandedKeys", B);
      }
    }), l = C(
      () => new Set(i.value)
    ), r = C(
      () => n.expandColumnKey ?? n.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: n.childrenKey,
      expandedKeys: l.value,
      resolveRowKey: g,
      maxDepth: n.maxDepth
    })), d = C(() => {
      const { sortKey: B, sortDirection: j, sortCompare: K, rows: re } = n;
      return !B || !j || !K ? re : n.expandable ? vl(re, {
        childrenKey: n.childrenKey,
        sortKey: B,
        sortDirection: j,
        compare: K
      }) : [...re].sort((xe, De) => K(xe, De, B, j));
    }), h = C(() => n.expandable ? yl(d.value, c.value) : d.value.map((B, j) => ({
      row: B,
      key: g(B, j),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function f(B) {
      return `cell-${B}`;
    }
    function m(B) {
      return B === "center" ? "text-center" : B === "right" ? "text-right" : "text-left";
    }
    function g(B, j) {
      if (typeof n.rowKey == "function")
        return n.rowKey(B);
      const K = B[n.rowKey];
      return K != null ? String(K) : `__index_${j}`;
    }
    function y(B, j) {
      return B[j];
    }
    function v(B) {
      return B == null || typeof B == "object" ? "" : String(B);
    }
    function p(B) {
      return n.expandable && B === r.value;
    }
    function x(B) {
      return B.hasChildren || (n.isRowExpandable?.(B.row) ?? !1);
    }
    function _(B, j) {
      return {
        row: B.row,
        column: j,
        value: y(B.row, j.key),
        depth: B.depth,
        isChild: B.depth > 0,
        hasChildren: B.hasChildren,
        expanded: B.isExpanded
      };
    }
    function w(B) {
      if (!x(B)) return;
      const j = new Set(i.value);
      j.has(B.key) ? (j.delete(B.key), a("collapse", B.key, B.row)) : (n.singleExpand && j.clear(), j.add(B.key), a("expand", B.key, B.row)), i.value = [...j];
    }
    function $(B) {
      return {
        depth: B.depth,
        isChild: B.depth > 0,
        hasChildren: B.hasChildren
      };
    }
    function S(B, j) {
      return n.isRowSelectable?.(B, j) ?? !0;
    }
    function M(B) {
      return S(B.row, $(B));
    }
    function O(B) {
      return n.selectable && x(B) && !M(B);
    }
    function H(B) {
      return x(B) && !O(B);
    }
    function A(B) {
      return H(B) ? !1 : B.depth > 0 ? !0 : n.selectable && !x(B);
    }
    const T = C(() => {
      const { isRowSelectable: B } = n;
      return n.expandable ? xl(d.value, {
        childrenKey: n.childrenKey,
        resolveRowKey: g,
        isRowSelectable: B
      }) : d.value.map((j, K) => ({
        row: j,
        key: g(j, K),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: j, context: K }) => S(j, K)).map(({ key: j }) => j);
    });
    function L(B) {
      const j = String(B);
      return n.selectedKeys.some((K) => String(K) === j);
    }
    const R = C(() => !n.selectable || T.value.length === 0 ? !1 : T.value.every(
      (B) => n.selectedKeys.some((j) => String(j) === String(B))
    )), W = C(() => {
      if (!n.selectable || T.value.length === 0) return !1;
      const B = T.value.filter(
        (j) => n.selectedKeys.some((K) => String(K) === String(j))
      );
      return B.length > 0 && B.length < T.value.length;
    });
    Fe(
      [W, R, () => n.selectable],
      async () => {
        await He();
        const B = o.value;
        B && (B.indeterminate = W.value && !R.value);
      },
      { immediate: !0 }
    );
    function Q() {
      if (n.selectable)
        if (R.value) {
          const B = new Set(
            T.value.map((K) => String(K))
          ), j = n.selectedKeys.filter(
            (K) => !B.has(String(K))
          );
          a("update:selectedKeys", j);
        } else {
          const B = new Set(n.selectedKeys.map((j) => String(j)));
          T.value.forEach((j) => B.add(String(j))), a("update:selectedKeys", [...B]);
        }
    }
    function Z(B) {
      if (!n.selectable) return;
      const j = String(B), K = h.value.find((xe) => String(xe.key) === j);
      if (K && !M(K) || !K && !T.value.some((xe) => String(xe) === j))
        return;
      n.selectedKeys.some((xe) => String(xe) === j) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((xe) => String(xe) !== j)
      ) : a("update:selectedKeys", [...n.selectedKeys, j]);
    }
    function ae(B) {
      return `${n.ariaLabelSelectRow} ${B}`;
    }
    function ue(B) {
      a("sort", B);
    }
    function ge(B) {
      return n.sortKey === B && n.sortDirection != null;
    }
    function G(B) {
      return ge(B) ? n.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (B, j) => (b(), k("div", vk, [
      u("div", yk, [
        u("table", {
          class: te([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", xk, [
              e.selectable ? (b(), k("th", _k, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: R.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: Q
                }, null, 40, kk)
              ])) : V("", !0),
              (b(!0), k(se, null, fe(e.columns, (K) => (b(), k("th", {
                key: K.key,
                scope: "col",
                class: te([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  p(K.key) && e.selectable ? "!pl-0" : "",
                  m(K.align),
                  K.headerClass ?? ""
                ])
              }, [
                K.sortable ? (b(), k("button", {
                  key: 0,
                  type: "button",
                  class: te(["kiut-table-sort-btn inline-flex items-center gap-1", m(K.align)]),
                  "aria-sort": G(K.key),
                  onClick: (re) => ue(K.key)
                }, [
                  u("span", null, D(K.label), 1),
                  u("span", Ck, [
                    ge(K.key) ? (b(), k(se, { key: 0 }, [
                      e.sortDirection === "asc" ? (b(), k("span", $k, "↑")) : e.sortDirection === "desc" ? (b(), k("span", Sk, "↓")) : V("", !0)
                    ], 64)) : (b(), k(se, { key: 1 }, [
                      j[0] || (j[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      j[1] || (j[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, wk)) : (b(), k(se, { key: 1 }, [
                  Te(D(K.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (b(!0), k(se, null, fe(h.value, (K) => (b(), k("tr", {
              key: K.key,
              class: te([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                K.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (b(), k("td", Mk, [
                M(K) ? (b(), k("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L(K.key),
                  "aria-label": ae(K.key),
                  onChange: (re) => Z(K.key)
                }, null, 40, Dk)) : O(K) ? (b(), k("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": K.isExpanded,
                  "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: je((re) => w(K), ["stop"])
                }, [
                  z(P(hn), {
                    class: te(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, Tk)) : V("", !0)
              ])) : V("", !0),
              (b(!0), k(se, null, fe(e.columns, (re) => (b(), k("td", {
                key: re.key,
                class: te([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  p(re.key) ? "pl-0 pr-2" : "px-2",
                  m(re.align),
                  re.cellClass ?? ""
                ])
              }, [
                p(re.key) ? (b(), k("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: $e({ paddingLeft: `${K.depth * 1.25}rem` })
                }, [
                  _e(B.$slots, "row-expand", {
                    row: K.row,
                    expanded: K.isExpanded,
                    hasChildren: K.hasChildren,
                    depth: K.depth,
                    toggle: () => w(K)
                  }, () => [
                    H(K) ? (b(), k("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": K.isExpanded,
                      "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: je((xe) => w(K), ["stop"])
                    }, [
                      z(P(hn), {
                        class: te(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Ak)) : A(K) ? (b(), k("span", Bk)) : V("", !0)
                  ], !0),
                  u("div", Lk, [
                    _e(B.$slots, f(re.key), xt({ ref_for: !0 }, _(K, re)), () => [
                      Te(D(v(y(K.row, re.key))), 1)
                    ], !0)
                  ])
                ], 4)) : _e(B.$slots, f(re.key), xt({
                  key: 1,
                  ref_for: !0
                }, _(K, re)), () => [
                  Te(D(v(y(K.row, re.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), Rk = /* @__PURE__ */ me(Pk, [["__scopeId", "data-v-b3104817"]]), oi = /* @__PURE__ */ le({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (a, o) => (b(), k("svg", {
      class: te(["inline-flex shrink-0 animate-spin", n.value]),
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
}), Ek = ["disabled", "aria-expanded", "aria-label"], Ik = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, Fk = { class: "min-w-0 truncate" }, Ok = ["disabled", "onClick", "onMouseenter"], Vk = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, zk = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Nk = { class: "min-w-0 flex-1 text-left" }, Hk = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, jk = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Wk = ["disabled", "aria-expanded", "aria-label"], Kk = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, Yk = ["disabled", "onClick", "onMouseenter"], Uk = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, qk = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, Xk = { class: "min-w-0 flex-1 text-left" }, Gk = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, Zk = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Qk = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, Jk = ["type", "disabled", "aria-busy", "aria-label"], e2 = {
  key: 2,
  class: "min-w-0 truncate"
}, t2 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, n2 = ["type", "disabled", "aria-busy", "aria-label"], a2 = {
  key: 2,
  class: "min-w-0 truncate"
}, yt = /* @__PURE__ */ le({
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
    const n = e, a = t, o = Ca(), s = C(
      () => !!n.tooltip?.trim() && n.variant !== "dropdown" && n.variant !== "split"
    ), i = C(() => n.variant === "dropdown"), l = C(() => n.variant === "split"), r = C(() => n.variant === "action"), c = C(() => !r.value && !l.value), d = C(() => n.disabled || n.loading), h = C(
      () => n.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), f = C(() => {
      const B = o["aria-label"];
      if (typeof B == "string" && B.length > 0) return B;
      if ((r.value || l.value) && n.tooltip?.trim()) return n.tooltip.trim();
    }), m = C(() => {
      const B = o.type;
      return B === "submit" || B === "reset" || B === "button" ? B : "button";
    }), g = C(() => {
      const { class: B, type: j, "aria-label": K, ...re } = o;
      return re;
    }), y = C(() => n.variant === "primary" || n.variant === "dropdown" ? [
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
    ]), v = `kiut-button-menu-${Ye()}`, p = `${v}-btn`, x = `${v}-menu`, _ = oe(null), w = oe(null), $ = oe(null), S = oe(!1), M = oe(0), O = oe({}), H = C(() => n.options.filter((B) => !B.disabled));
    function A(B) {
      return `${B.value}-${B.label}`;
    }
    function T() {
      const B = w.value;
      if (!B) return;
      const j = B.getBoundingClientRect(), K = {
        top: `${j.bottom - 3}px`,
        minWidth: `max(${j.width}px, ${n.menuMinWidth})`
      };
      n.menuAlign === "right" ? (K.right = `${window.innerWidth - j.right}px`, K.left = "auto") : (K.left = `${j.left}px`, K.right = "auto"), O.value = K;
    }
    function L(B) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        M.value === B ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function R() {
      S.value = !1;
    }
    function W() {
      T(), M.value = 0, He(() => $.value?.focus());
    }
    function Q() {
      if (!n.disabled) {
        if (S.value) {
          R();
          return;
        }
        S.value = !0, W();
      }
    }
    function Z(B) {
      B.disabled || (a("select", B), R());
    }
    function ae(B) {
      B.stopPropagation(), Q();
    }
    function ue(B) {
      if (!S.value) return;
      const j = B.target, K = _.value, re = $.value;
      K && !K.contains(j) && (!re || !re.contains(j)) && R();
    }
    function ge(B) {
      n.disabled || (B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), S.value || (S.value = !0, W()));
    }
    function G(B) {
      const j = H.value;
      if (B.key === "Escape") {
        B.preventDefault(), R(), w.value?.focus();
        return;
      }
      if (j.length !== 0) {
        if (B.key === "ArrowDown") {
          B.preventDefault(), M.value = Math.min(M.value + 1, j.length - 1);
          return;
        }
        if (B.key === "ArrowUp") {
          B.preventDefault(), M.value = Math.max(M.value - 1, 0);
          return;
        }
        if (B.key === "Enter" || B.key === " ") {
          B.preventDefault();
          const K = j[M.value];
          K && Z(K);
        }
      }
    }
    return et(() => {
      document.addEventListener("click", ue);
    }), dt(() => {
      document.removeEventListener("click", ue);
    }), (B, j) => i.value ? (b(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", xt({
        ref_key: "buttonRef",
        ref: w,
        id: p,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, P(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ae,
        onKeydown: ge
      }), [
        B.$slots.icon ? (b(), k("span", Ik, [
          _e(B.$slots, "icon")
        ])) : V("", !0),
        u("span", Fk, [
          _e(B.$slots, "default")
        ]),
        z(P(hn), {
          class: te(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", S.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Ek),
      (b(), ee(_n, { to: "body" }, [
        nt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: $e(O.value),
          onKeydown: je(G, ["stop"])
        }, [
          (b(!0), k(se, null, fe(H.value, (K, re) => (b(), k("button", {
            key: A(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: te(L(re)),
            onClick: je((xe) => Z(K), ["stop"]),
            onMouseenter: (xe) => M.value = re
          }, [
            K.icon ? (b(), k("span", Vk, [
              (b(), ee(St(K.icon), { class: "h-5 w-5" }))
            ])) : (b(), k("span", zk)),
            u("span", Nk, [
              u("span", Hk, D(K.label), 1),
              K.description ? (b(), k("span", jk, D(K.description), 1)) : V("", !0)
            ])
          ], 42, Ok))), 128))
        ], 36), [
          [cn, S.value]
        ])
      ]))
    ], 512)) : l.value ? (b(), k("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", xt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [y.value, P(o).class]],
        disabled: e.disabled,
        "aria-expanded": S.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ae,
        onKeydown: ge
      }), [
        B.$slots.icon ? (b(), k("span", Kk, [
          _e(B.$slots, "icon")
        ])) : V("", !0)
      ], 16, Wk),
      (b(), ee(_n, { to: "body" }, [
        nt(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: $e(O.value),
          onKeydown: je(G, ["stop"])
        }, [
          (b(!0), k(se, null, fe(H.value, (K, re) => (b(), k("button", {
            key: A(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: te(L(re)),
            onClick: je((xe) => Z(K), ["stop"]),
            onMouseenter: (xe) => M.value = re
          }, [
            K.icon ? (b(), k("span", Uk, [
              (b(), ee(St(K.icon), { class: "h-5 w-5" }))
            ])) : (b(), k("span", qk)),
            u("span", Xk, [
              u("span", Gk, D(K.label), 1),
              K.description ? (b(), k("span", Zk, D(K.description), 1)) : V("", !0)
            ])
          ], 42, Yk))), 128))
        ], 36), [
          [cn, S.value]
        ])
      ]))
    ], 512)) : s.value ? (b(), k("span", Qk, [
      u("button", xt({
        type: m.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, P(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": f.value
      }, g.value), [
        e.loading ? (b(), ee(oi, {
          key: 0,
          compact: r.value
        }, null, 8, ["compact"])) : B.$slots.icon ? (b(), k("span", {
          key: 1,
          class: te(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          _e(B.$slots, "icon")
        ], 2)) : V("", !0),
        c.value ? (b(), k("span", e2, [
          _e(B.$slots, "default")
        ])) : V("", !0)
      ], 16, Jk),
      u("span", t2, D(e.tooltip), 1)
    ])) : (b(), k("button", xt({
      key: 3,
      type: m.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, y.value, P(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": f.value
    }, g.value), [
      e.loading ? (b(), ee(oi, {
        key: 0,
        compact: r.value
      }, null, 8, ["compact"])) : B.$slots.icon ? (b(), k("span", {
        key: 1,
        class: te(["inline-flex shrink-0", r.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        _e(B.$slots, "icon")
      ], 2)) : V("", !0),
      c.value ? (b(), k("span", a2, [
        _e(B.$slots, "default")
      ])) : V("", !0)
    ], 16, n2));
  }
}), o2 = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], s2 = { class: "sr-only" }, _l = /* @__PURE__ */ le({
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
    return (s, i) => (b(), k("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: te([
        "relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        zn(je(o, ["prevent", "stop"]), ["space"]),
        zn(je(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: te(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", s2, D(e.ariaLabel), 1)
    ], 42, o2));
  }
}), i2 = {
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
  toggleActive: "Activar o desactivar"
}, l2 = [
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
], j$ = [
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
], r2 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, c2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, d2 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, u2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, h2 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, f2 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, g2 = ["aria-expanded", "aria-label", "onClick"], p2 = { class: "min-w-0 flex-1" }, m2 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, b2 = ["colspan"], v2 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, y2 = {
  key: 0,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, x2 = {
  key: 1,
  class: "space-y-2"
}, _2 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, k2 = ["title"], w2 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, C2 = { class: "ml-auto flex shrink-0 items-center gap-2" }, $2 = /* @__PURE__ */ le({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => l2 },
    rowKey: { type: [String, Function], default: "id" },
    expandedKeys: { default: void 0 },
    defaultExpandedKeys: { default: () => [] },
    singleExpand: { type: Boolean, default: !1 },
    expandColumnKey: { default: void 0 },
    labels: { default: () => ({}) }
  },
  emits: ["update:expandedKeys", "expand", "collapse", "view", "run", "edit", "delete", "createDraft", "toggleActive", "viewVersion", "createDraftFromVersion"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = oe([...n.defaultExpandedKeys]), s = C({
      get() {
        return n.expandedKeys ?? o.value;
      },
      set(A) {
        o.value = A, a("update:expandedKeys", A);
      }
    }), i = C(() => ({
      ...i2,
      ...n.labels
    })), l = C(
      () => n.expandColumnKey ?? n.columns[0]?.key ?? ""
    ), r = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(A) {
      return `cell-${A}`;
    }
    function d(A, T, L) {
      return {
        row: A,
        column: T,
        index: L,
        expanded: y(A, L)
      };
    }
    function h(A) {
      const T = A.key;
      return A.label ? A.label : T in i.value ? i.value[T] : A.key;
    }
    function f(A) {
      return A === "center" ? "text-center" : A === "right" ? "text-right" : "text-left";
    }
    function m(A) {
      return A === l.value;
    }
    function g(A, T) {
      if (typeof n.rowKey == "function")
        return n.rowKey(A);
      const L = A[n.rowKey];
      return L != null ? String(L) : `__index_${T}`;
    }
    function y(A, T) {
      return s.value.includes(g(A, T));
    }
    function v(A, T) {
      const L = g(A, T), R = new Set(s.value);
      R.has(L) ? (R.delete(L), a("collapse", L, A)) : (n.singleExpand && R.clear(), R.add(L), a("expand", L, A)), s.value = [...R];
    }
    function p(A) {
      return A.type ?? A.key;
    }
    function x(A) {
      return r[A] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function _(A) {
      return A === "published" ? "success" : "warning";
    }
    function w(A) {
      const T = A instanceof Date ? A : new Date(A);
      return Number.isNaN(T.getTime()) ? String(A) : T.toLocaleDateString("es-ES");
    }
    function $(A) {
      const T = A instanceof Date ? A : new Date(A);
      return Number.isNaN(T.getTime()) ? String(A) : T.toLocaleString("es-ES");
    }
    function S(A) {
      return Ve("div", { class: "min-w-0" }, [
        Ve(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          A.name
        ),
        A.description ? Ve(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          A.description
        ) : null
      ]);
    }
    function M(A) {
      return A.method ? Ve(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            x(A.method)
          ]
        },
        A.method
      ) : null;
    }
    function O(A, T) {
      const L = T.actions ?? ["view", "edit"], R = [];
      for (const W of L)
        W === "view" ? R.push(
          Ve(
            yt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => a("view", A)
            },
            { icon: () => Ve(Js, { class: "h-4 w-4" }) }
          )
        ) : W === "run" ? R.push(
          Ve(
            yt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => a("run", A)
            },
            { icon: () => Ve(Hp, { class: "h-4 w-4" }) }
          )
        ) : W === "edit" ? R.push(
          Ve(
            yt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => a("edit", A)
            },
            { icon: () => Ve(Np, { class: "h-4 w-4" }) }
          )
        ) : W === "createDraft" ? R.push(
          Ve(
            yt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => a("createDraft", A)
            },
            { icon: () => Ve(Qs, { class: "h-4 w-4" }) }
          )
        ) : W === "delete" && R.push(
          Ve(
            yt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => a("delete", A)
            },
            { icon: () => Ve(jp, { class: "h-4 w-4" }) }
          )
        );
      return Ve(
        "div",
        { class: "flex items-center justify-end gap-1" },
        R
      );
    }
    function H(A, T, L) {
      switch (p(T)) {
        case "name":
          return S(A);
        case "method":
          return M(A);
        case "url":
          return A.url ? Ve(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: A.url
            },
            A.url
          ) : null;
        case "status":
          return Ve(
            Ue,
            { color: _(A.status), outlined: !1 },
            () => A.status
          );
        case "version":
          return Ve("span", {}, A.version);
        case "updated":
          return Ve(
            "span",
            { class: "whitespace-nowrap text-xs" },
            w(A.updatedAt)
          );
        case "active":
          return Ve(_l, {
            modelValue: A.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (W) => a("toggleActive", A, W)
          });
        case "actions":
          return O(A, T);
        default:
          return Ve("span", {}, String(A[T.key] ?? ""));
      }
    }
    return (A, T) => (b(), k("div", r2, [
      u("div", c2, [
        u("table", d2, [
          u("thead", null, [
            u("tr", u2, [
              (b(!0), k(se, null, fe(e.columns, (L) => (b(), k("th", {
                key: L.key,
                scope: "col",
                class: te([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  f(L.align),
                  L.headerClass ?? ""
                ])
              }, D(h(L)), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (b(!0), k(se, null, fe(e.rows, (L, R) => (b(), k(se, {
              key: g(L, R)
            }, [
              u("tr", h2, [
                (b(!0), k(se, null, fe(e.columns, (W) => (b(), k("td", {
                  key: W.key,
                  class: te([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    f(W.align),
                    W.cellClass ?? ""
                  ])
                }, [
                  _e(A.$slots, c(W.key), xt({ ref_for: !0 }, d(L, W, R)), () => [
                    m(W.key) ? (b(), k("div", f2, [
                      u("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": y(L, R),
                        "aria-label": y(L, R) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (Q) => v(L, R)
                      }, [
                        z(P(hn), {
                          class: te(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !y(L, R) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, g2),
                      u("div", p2, [
                        (b(), ee(St(() => H(L, W))))
                      ])
                    ])) : (b(), ee(St(() => H(L, W)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              y(L, R) ? (b(), k("tr", m2, [
                u("td", {
                  colspan: e.columns.length,
                  class: "px-4 pb-4 pt-1"
                }, [
                  u("h4", v2, D(i.value.historialTitle), 1),
                  L.versions?.length ? (b(), k("div", x2, [
                    (b(!0), k(se, null, fe(L.versions, (W) => (b(), k("div", {
                      key: W.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      _e(A.$slots, "history-item", {
                        version: W,
                        row: L
                      }, () => [
                        z(Ue, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: E(() => [
                            Te(D(W.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        u("span", _2, D(W.version), 1),
                        W.method ? (b(), k("span", {
                          key: 0,
                          class: te(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", x(W.method)])
                        }, D(W.method), 3)) : V("", !0),
                        W.url ? (b(), k("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: W.url
                        }, D(W.url), 9, k2)) : V("", !0),
                        u("span", w2, D($(W.updatedAt)), 1)
                      ], !0),
                      u("div", C2, [
                        _e(A.$slots, "history-actions", {
                          version: W,
                          row: L
                        }, () => [
                          z(yt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => a("viewVersion", W, L)
                          }, {
                            icon: E(() => [
                              z(P(Js), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Te(" " + D(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          z(yt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (Q) => a("createDraftFromVersion", W, L)
                          }, {
                            icon: E(() => [
                              z(P(Qs), { class: "h-4 w-4" })
                            ]),
                            default: E(() => [
                              Te(" " + D(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (b(), k("p", y2, D(i.value.emptyHistory), 1))
                ], 8, b2)
              ])) : V("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), S2 = /* @__PURE__ */ me($2, [["__scopeId", "data-v-acb95669"]]);
function M2(e, t) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function D2(e, t) {
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const T2 = ["aria-label"], A2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, B2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, L2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, P2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], R2 = { class: "truncate" }, E2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, I2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, F2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, O2 = ["aria-label", "onClick"], V2 = ["aria-label", "onClick"], z2 = ["aria-label"], N2 = ["aria-label"], H2 = {
  key: 1,
  class: "space-y-2"
}, j2 = ["for"], W2 = ["id", "placeholder", "onKeydown"], K2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Y2 = ["aria-label"], U2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, q2 = ["checked", "onChange"], X2 = { class: "min-w-0 flex-1" }, G2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Z2 = { class: "flex flex-wrap items-end gap-2" }, Q2 = { class: "min-w-[120px] flex-1" }, J2 = ["for"], ew = ["id"], tw = { class: "min-w-[120px] flex-1" }, nw = ["for"], aw = ["id"], ow = /* @__PURE__ */ le({
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
    const n = e, a = t, o = eo(), i = `${`kiut-filters-${Ye()}`}-panel`, l = oe(null), r = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), f = oe(null), m = oe(""), g = oe([]), y = oe(""), v = oe(""), p = C(() => c.value ? n.filterDefinitions.find((I) => I.id === c.value) ?? null : null), x = C(() => {
      const I = p.value;
      if (I)
        return I.type === "text" ? m.value : I.type === "select" ? g.value : { start: y.value, end: v.value };
    });
    function _(I, q) {
      q && q instanceof HTMLElement ? r.set(I, q) : r.delete(I);
    }
    function w(I) {
      return n.modelValue[I];
    }
    function $(I) {
      if (I == null) return [];
      if (Array.isArray(I))
        return I.filter((q) => typeof q == "string" && q.trim() !== "");
      if (typeof I == "string") {
        const q = I.trim();
        return q ? [q] : [];
      }
      return [];
    }
    function S(I, q) {
      if (q == null) return !0;
      if (I.type === "text") return String(q).trim() === "";
      if (I.type === "select") return $(q).length === 0;
      if (I.type === "dateRange") {
        const ne = q;
        return !ne?.start?.trim() || !ne?.end?.trim();
      }
      return !0;
    }
    const M = C(
      () => n.filterDefinitions.some((I) => !S(I, w(I.id)))
    ), O = C(() => {
      const I = [];
      for (const q of n.filterDefinitions) {
        const ne = w(q.id);
        if (!S(q, ne)) {
          if (q.type === "text")
            I.push({ kind: "text", def: q, key: q.id });
          else if (q.type === "dateRange")
            I.push({ kind: "dateRange", def: q, key: q.id });
          else if (q.type === "select")
            for (const he of $(ne))
              I.push({
                kind: "select",
                def: q,
                optionValue: he,
                key: `${q.id}::${he}`
              });
        }
      }
      return I;
    });
    function H(I) {
      return I.type !== "select" ? 0 : $(w(I.id)).length;
    }
    function A(I) {
      const q = w(I.id), ne = I.label.replace(/^\+\s*/, "");
      if (I.type === "text") return `${ne}: ${String(q ?? "").trim()}`;
      if (I.type === "select") {
        const tt = $(q).map((ut) => I.options.find((kt) => kt.value === ut)?.label ?? ut);
        return `${ne}: ${tt.join(", ")}`;
      }
      const he = q, be = L(he.start), ke = L(he.end);
      return `${ne}: ${be} – ${ke}`;
    }
    function T(I) {
      return I.kind === "text" || I.kind === "dateRange" ? A(I.def) : I.def.options.find((ne) => ne.value === I.optionValue)?.label ?? I.optionValue;
    }
    function L(I) {
      if (!I) return "";
      const q = Ke(I, "YYYY-MM-DD", !0);
      return q.isValid() ? q.format("L") : I;
    }
    function R(I) {
      const q = c.value === I.id && d.value, ne = !S(I, w(I.id));
      return q || ne ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function W(I) {
      return S(I, w(I.id)) ? X(I) : `Editar filtro ${I.label.replace(/^\+\s*/, "")}`;
    }
    function Q(I) {
      const q = w(I.id);
      if (I.type === "text") {
        m.value = q != null ? String(q) : "";
        return;
      }
      if (I.type === "select") {
        g.value = [...$(q)];
        return;
      }
      const ne = q;
      y.value = ne?.start?.trim() ?? "", v.value = ne?.end?.trim() ?? "";
    }
    function Z() {
      const I = p.value;
      if (!I || I.type !== "select") return;
      const q = { ...n.modelValue };
      g.value.length === 0 ? delete q[I.id] : q[I.id] = [...g.value], a("update:modelValue", q), a("change", q);
    }
    function ae(I) {
      const q = g.value.indexOf(I);
      q >= 0 ? g.value = g.value.filter((ne, he) => he !== q) : g.value = [...g.value, I], Z();
    }
    function ue(I) {
      if (!I) return;
      f.value = I;
      const q = I.getBoundingClientRect(), ne = 300;
      let he = q.left;
      const be = window.innerWidth - ne - 12;
      he > be && (he = Math.max(12, be)), he < 12 && (he = 12);
      const ke = q.bottom + 8;
      h.value = {
        top: `${ke}px`,
        left: `${he}px`,
        width: `${Math.min(ne, window.innerWidth - 24)}px`
      };
    }
    function ge(I, q) {
      if (c.value === I.id && d.value) {
        re();
        return;
      }
      d.value && c.value !== I.id && re(), c.value = I.id, d.value = !0, Q(I), He().then(async () => {
        ue(q.currentTarget), await He(), B();
      });
    }
    function G(I, q) {
      if (c.value === I.id && d.value) {
        re();
        return;
      }
      d.value && c.value !== I.id && re(), c.value = I.id, d.value = !0, Q(I), He().then(async () => {
        const ne = r.get(I.id) ?? q.currentTarget;
        ue(ne), await He(), B();
      });
    }
    function B() {
      const I = l.value;
      if (!I) return;
      I.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function j() {
      d.value = !1, c.value = null, f.value = null;
    }
    function K(I) {
      const q = p.value;
      if (!q) return;
      if (q.type === "text") {
        m.value = I != null ? String(I) : "";
        return;
      }
      if (q.type === "select") {
        g.value = Array.isArray(I) ? I.filter((he) => typeof he == "string") : $(I);
        return;
      }
      const ne = I;
      y.value = ne?.start?.trim() ?? "", v.value = ne?.end?.trim() ?? "";
    }
    function re() {
      const I = p.value;
      if (!I) return;
      if (I.type === "text") {
        const be = m.value.trim(), ke = { ...n.modelValue };
        be === "" ? delete ke[I.id] : ke[I.id] = be, a("update:modelValue", ke), a("change", ke), j();
        return;
      }
      if (I.type === "select") {
        Z(), j();
        return;
      }
      const q = y.value.trim(), ne = v.value.trim(), he = { ...n.modelValue };
      !q || !ne || q > ne ? delete he[I.id] : he[I.id] = { start: q, end: ne }, a("update:modelValue", he), a("change", he), j();
    }
    function xe(I) {
      const q = { ...n.modelValue };
      delete q[I], a("update:modelValue", q), a("change", q), c.value === I && j();
    }
    function De(I) {
      if (I.kind === "text" || I.kind === "dateRange") {
        xe(I.def.id);
        return;
      }
      const q = { ...n.modelValue }, he = $(q[I.def.id]).filter((be) => be !== I.optionValue);
      he.length === 0 ? delete q[I.def.id] : q[I.def.id] = he, a("update:modelValue", q), a("change", q), c.value === I.def.id && Q(I.def);
    }
    function F() {
      const I = {};
      a("update:modelValue", I), a("change", I), j();
    }
    const N = C(() => {
      const I = p.value;
      return I ? `Editar filtro: ${I.label}` : "Filtro";
    });
    function U(I) {
      const q = I.def.label.replace(/^\+\s*/, "");
      return I.kind === "select" ? `Quitar ${I.def.options.find((be) => be.value === I.optionValue)?.label ?? I.optionValue} del filtro ${q}` : `Quitar filtro ${q}`;
    }
    function ce(I) {
      const q = I.def.label.replace(/^\+\s*/, "");
      if (I.kind === "select") {
        const he = I.def.options.find((be) => be.value === I.optionValue)?.label ?? I.optionValue;
        return `Editar filtro ${q}: ${he}`;
      }
      return `Editar filtro ${q}`;
    }
    function X(I) {
      return `Añadir filtro ${I.label.replace(/^\+\s*/, "")}`;
    }
    const Y = C(() => n.clearLabel);
    function J(I) {
      if (!d.value || !l.value) return;
      const q = I.target;
      if (!(l.value.contains(q) || (q instanceof Element ? q : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const he of r.values())
          if (he?.contains(q)) return;
        re();
      }
    }
    function de(I) {
      I.key === "Escape" && d.value && (I.preventDefault(), j());
    }
    function pe() {
      !d.value || !f.value || ue(f.value);
    }
    return et(() => {
      document.addEventListener("mousedown", J, !0), window.addEventListener("keydown", de, !0), window.addEventListener("resize", pe);
    }), li(() => {
      document.removeEventListener("mousedown", J, !0), window.removeEventListener("keydown", de, !0), window.removeEventListener("resize", pe);
    }), Fe(
      () => n.modelValue,
      () => {
        const I = p.value;
        I && d.value && !o.panel && Q(I);
      },
      { deep: !0 }
    ), (I, q) => (b(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", A2, [
        u("span", B2, D(e.label), 1),
        u("div", L2, [
          (b(!0), k(se, null, fe(e.filterDefinitions, (ne) => (b(), k("button", {
            key: `pill-${ne.id}`,
            ref_for: !0,
            ref: (he) => _(ne.id, he),
            type: "button",
            class: te(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", R(ne)]),
            "aria-label": W(ne),
            "aria-expanded": c.value === ne.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ne.id ? i : void 0,
            onClick: (he) => G(ne, he)
          }, [
            z(P(M2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", R2, D(ne.label), 1),
            ne.type === "select" && H(ne) > 0 ? (b(), k("span", E2, D(H(ne)), 1)) : V("", !0)
          ], 10, P2))), 128))
        ])
      ]),
      M.value ? (b(), k("div", I2, [
        u("div", F2, [
          (b(!0), k(se, null, fe(O.value, (ne) => (b(), k("div", {
            key: ne.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ce(ne),
              onClick: (he) => ge(ne.def, he)
            }, [
              _e(I.$slots, "formatChip", {
                filter: ne.def,
                value: w(ne.def.id),
                optionValue: ne.kind === "select" ? ne.optionValue : void 0
              }, () => [
                Te(D(T(ne)), 1)
              ], !0)
            ], 8, O2),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": U(ne),
              onClick: (he) => De(ne)
            }, [
              z(P(D2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, V2)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": Y.value,
          onClick: F
        }, D(e.clearLabel), 9, z2)
      ])) : V("", !0),
      (b(), ee(_n, { to: "body" }, [
        c.value && d.value ? (b(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": N.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: $e(h.value),
          onKeydown: q[3] || (q[3] = je(() => {
          }, ["stop"]))
        }, [
          p.value ? (b(), k(se, { key: 0 }, [
            I.$slots.panel ? _e(I.$slots, "panel", {
              key: 0,
              filter: p.value,
              close: re,
              value: x.value,
              updateValue: K
            }, void 0, !0) : (b(), k("div", H2, [
              p.value.type === "text" ? (b(), k(se, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, D(p.value.label), 9, j2),
                nt(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": q[0] || (q[0] = (ne) => m.value = ne),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: p.value.placeholder ?? "…",
                  onKeydown: zn(je(re, ["prevent"]), ["enter"])
                }, null, 40, W2), [
                  [ln, m.value]
                ])
              ], 64)) : p.value.type === "select" ? (b(), k(se, { key: 1 }, [
                u("p", K2, D(p.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": p.value.label,
                  "aria-multiselectable": !0
                }, [
                  (b(!0), k(se, null, fe(p.value.options, (ne) => (b(), k("li", {
                    key: ne.value
                  }, [
                    u("label", U2, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(ne.value),
                        onChange: (he) => ae(ne.value)
                      }, null, 40, q2),
                      u("span", X2, D(ne.label), 1)
                    ])
                  ]))), 128))
                ], 8, Y2)
              ], 64)) : p.value.type === "dateRange" ? (b(), k(se, { key: 2 }, [
                u("p", G2, D(p.value.label), 1),
                u("div", Z2, [
                  u("div", Q2, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, J2),
                    nt(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": q[1] || (q[1] = (ne) => y.value = ne),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, ew), [
                      [ln, y.value]
                    ])
                  ]),
                  u("div", tw, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, nw),
                    nt(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": q[2] || (q[2] = (ne) => v.value = ne),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, aw), [
                      [ln, v.value]
                    ])
                  ])
                ])
              ], 64)) : V("", !0)
            ]))
          ], 64)) : V("", !0)
        ], 44, N2)) : V("", !0)
      ]))
    ], 8, T2));
  }
}), sw = /* @__PURE__ */ me(ow, [["__scopeId", "data-v-f38e0100"]]), iw = { class: "font-sans" }, lw = ["for"], rw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], cw = ["id"], dw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = Ca(), s = ri("$pcForm", null), i = `kiut-input-text-${Ye()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = oe(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (p) => {
        d.value = p ?? "";
      }
    ), et(() => {
      s && c.value && s.register?.(c.value, {});
    }), dt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), f = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function m(p) {
      const x = p.target.value;
      d.value = x, a("update:modelValue", x);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(p);
    }
    function g(p) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(p);
    }
    function y(p) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(p);
    }
    const v = C(() => {
      const { name: p, id: x, type: _, ...w } = o;
      return w;
    });
    return (p, x) => (b(), k("div", iw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: te(P(ct))
      }, D(e.label), 11, lw)) : V("", !0),
      u("input", xt(v.value, {
        id: l.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [P(bt), f.value ? P(Ot) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": f.value ? "true" : void 0,
        "aria-describedby": e.errorText ? r.value : void 0,
        onInput: m,
        onChange: g,
        onBlur: y
      }), null, 16, rw),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, cw)) : V("", !0)
    ]));
  }
}), uw = { class: "font-sans" }, hw = ["for"], fw = { class: "relative" }, gw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], pw = ["aria-label"], mw = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, bw = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, vw = ["id"], yw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = Ca(), s = ri("$pcForm", null), i = `kiut-input-password-${Ye()}`, l = C(() => n.id ?? i), r = C(() => `${l.value}-err`), c = C(() => n.name ?? o.name ?? ""), d = oe(!1), h = oe(n.modelValue ?? "");
    Fe(
      () => n.modelValue,
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), et(() => {
      s && c.value && s.register?.(c.value, {});
    }), dt(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), m = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? n.invalid ?? !1 : n.invalid ?? !1);
    function g(x) {
      const _ = x.target.value;
      h.value = _, a("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function y(x) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(x);
    }
    function v(x) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(x);
    }
    const p = C(() => {
      const { name: x, id: _, ...w } = o;
      return w;
    });
    return (x, _) => (b(), k("div", uw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: te(P(ct))
      }, D(e.label), 11, hw)) : V("", !0),
      u("div", fw, [
        u("input", xt(p.value, {
          id: l.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [P(bt), m.value ? P(Ot) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": m.value ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: g,
          onChange: y,
          onBlur: v
        }), null, 16, gw),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (b(), k("svg", bw, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (b(), k("svg", mw, [..._[1] || (_[1] = [
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
        ], 8, pw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, vw)) : V("", !0)
    ]));
  }
}), xw = { class: "font-sans" }, _w = ["for"], kw = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], ww = ["id"], Cw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-textarea-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue,
      set: (r) => a("update:modelValue", r)
    });
    return (r, c) => (b(), k("div", xw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: te(P(ct))
      }, D(e.label), 11, _w)) : V("", !0),
      nt(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => l.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: te([P(iy), e.invalid ? P(Ot) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, kw), [
        [ln, l.value]
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, ww)) : V("", !0)
    ]));
  }
}), $w = { class: "font-sans" }, Sw = ["for"], Mw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Dw = ["for"], Tw = ["title"], Aw = ["aria-label"], Bw = ["id"], Lw = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-file-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = oe(null), r = C(() => n.modelValue?.name ?? n.placeholder);
    function c(h) {
      const m = h.target.files?.[0] ?? null;
      a("update:modelValue", m);
    }
    function d() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, f) => (b(), k("div", $w, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: te(P(ct))
      }, D(e.label), 11, Sw)) : V("", !0),
      u("div", {
        class: te([
          P(bt),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? P(Ot) : "",
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
        }, null, 40, Mw),
        u("label", {
          for: s.value,
          class: te(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          z(P(Fp), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Te(" " + D(e.chooseLabel), 1)
        ], 10, Dw),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: r.value || void 0
        }, D(r.value), 9, Tw),
        e.modelValue && !e.disabled ? (b(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: d
        }, [
          z(P(ll), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, Aw)) : V("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, Bw)) : V("", !0)
    ]));
  }
}), Pw = { class: "font-sans" }, Rw = ["for"], Ew = { class: "relative" }, Iw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Fw = ["id"], Ow = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-datetime-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => n.modelValue ?? "");
    function r(c) {
      const d = c.target.value;
      a("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (b(), k("div", Pw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: te(P(ct))
      }, D(e.label), 11, Rw)) : V("", !0),
      u("div", Ew, [
        z(P(wo), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: te([
            P(bt),
            "pl-10",
            e.invalid ? P(Ot) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: r
        }, null, 42, Iw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, Fw)) : V("", !0)
    ]));
  }
}), Vw = { class: "font-sans" }, zw = ["for"], Nw = { class: "relative" }, Hw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], jw = ["id"], Ww = /* @__PURE__ */ le({
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
      const f = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!f) return null;
      const m = Number(f[1]), g = Number(f[2]);
      return !Number.isInteger(m) || !Number.isInteger(g) || m < 0 || m > 23 || g < 0 || g > 59 ? null : `${String(m).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const o = e, s = t, i = `kiut-input-time-${Ye()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : n(o.modelValue) ?? "");
    function d(h) {
      const f = h.target.value;
      s("update:modelValue", a(f));
    }
    return (h, f) => (b(), k("div", Vw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: te(P(ct))
      }, D(e.label), 11, zw)) : V("", !0),
      u("div", Nw, [
        z(P(Vp), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: l.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: te([
            P(bt),
            "pl-10",
            e.invalid ? P(Ot) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? r.value : void 0,
          onInput: d
        }, null, 42, Hw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, jw)) : V("", !0)
    ]));
  }
}), Kw = { class: "font-sans" }, Yw = ["for"], Uw = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, qw = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], Xw = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Gw = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Zw = { class: "min-w-0 text-left leading-snug" }, Qw = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Jw = { class: "min-w-0 text-right leading-snug" }, e5 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, t5 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, n5 = ["id"], a5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-range-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      const m = [];
      return n.errorText && m.push(i.value), m.length ? m.join(" ") : void 0;
    }), r = C(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), c = C(() => !!(n.captionMin || n.captionMax)), d = C(() => {
      const { min: m, max: g, modelValue: y } = n;
      if (g === m) return 0;
      const v = (y - m) / (g - m);
      return Math.min(100, Math.max(0, v * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function f(m) {
      const g = Number(m.target.value);
      a("update:modelValue", Number.isNaN(g) ? n.min : g);
    }
    return (m, g) => (b(), k("div", Kw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: te(P(ct))
      }, D(e.label), 11, Yw)) : V("", !0),
      u("div", {
        class: te(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (b(), k("p", Uw, D(e.captionMax), 1)) : V("", !0),
        u("div", {
          class: te(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: $e(h.value)
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
            class: te([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: f
          }, null, 42, qw)
        ], 6),
        e.orientation === "horizontal" && r.value ? (b(), k("p", Xw, D(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (b(), k("div", Gw, [
          u("span", Zw, D(e.captionMin), 1),
          u("span", Qw, D(e.caption), 1),
          u("span", Jw, D(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (b(), k("p", e5, D(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (b(), k("p", t5, D(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, n5)) : V("", !0)
    ]));
  }
}), o5 = /* @__PURE__ */ me(a5, [["__scopeId", "data-v-a1343418"]]), s5 = { class: "font-sans" }, i5 = ["for"], l5 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], r5 = ["id"], c5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-input-number-${Ye()}`, s = C(() => n.id ?? o), i = C(() => `${s.value}-err`), l = C(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), r = C(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const f = Number(h);
      a("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (d, h) => (b(), k("div", s5, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: te(P(ct))
      }, D(e.label), 11, i5)) : V("", !0),
      u("input", {
        id: s.value,
        value: r.value,
        type: "number",
        onInput: c,
        class: te([
          P(bt),
          e.invalid ? P(Ot) : "",
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
      }, null, 42, l5),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, r5)) : V("", !0)
    ]));
  }
}), d5 = { class: "font-sans" }, u5 = ["for"], h5 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], f5 = ["disabled"], g5 = ["id"], p5 = "#3b82f6", m5 = "#aabbcc", b5 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", v5 = /* @__PURE__ */ le({
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
      const y = g.trim(), v = /^#?([0-9a-fA-F]{6})$/.exec(y);
      if (v) return `#${v[1].toLowerCase()}`;
      const p = /^#?([0-9a-fA-F]{3})$/.exec(y);
      if (p) {
        const [x, _, w] = p[1].split("");
        return `#${x}${x}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(g) {
      return n(g) ?? p5;
    }
    const o = e, s = t, i = `kiut-input-color-${Ye()}`, l = C(() => o.id ?? i), r = C(() => `${l.value}-err`), c = C(() => a(o.modelValue)), d = oe(c.value), h = oe(!1);
    Fe(c, (g) => {
      h.value || (d.value = g);
    });
    function f(g) {
      const y = g.target, v = n(y.value);
      v && s("update:modelValue", v);
    }
    function m() {
      h.value = !1;
      const g = n(d.value);
      g ? (d.value = g, s("update:modelValue", g)) : d.value = c.value;
    }
    return Fe(d, (g) => {
      if (!h.value) return;
      const y = n(g);
      y && s("update:modelValue", y);
    }), (g, y) => (b(), k("div", d5, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: te(P(ct))
      }, D(e.label), 11, u5)) : V("", !0),
      u("div", {
        class: te([
          b5,
          e.invalid ? P(Ot) : "",
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
          onInput: f
        }, null, 40, h5),
        e.showHexInput ? nt((b(), k("input", {
          key: 0,
          "onUpdate:modelValue": y[0] || (y[0] = (v) => d.value = v),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: m5,
          onFocus: y[1] || (y[1] = (v) => h.value = !0),
          onBlur: m
        }, null, 40, f5)), [
          [ln, d.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: r.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, g5)) : V("", !0)
    ]));
  }
}), y5 = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], x5 = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, _5 = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, k5 = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, w5 = { class: "truncate" }, C5 = ["aria-selected", "onClick", "onMouseenter"], $5 = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, S5 = { class: "min-w-0 flex-1" }, M5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-multiselect-${Ye()}`, s = `${o}-label`, i = `${o}-btn`, l = `${o}-listbox`, r = oe(null), c = oe(null), d = oe(!1), h = oe(0), f = C(() => n.options.filter((A) => !A.disabled)), m = C(() => new Set(n.modelValue ?? [])), g = C(
      () => n.options.filter((A) => m.value.has(A.value))
    ), y = C(() => {
      const A = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", T = g.value.length;
      return T === 0 ? A : `${A}, ${T} seleccionada${T === 1 ? "" : "s"}`;
    });
    function v(A) {
      return `${String(A.value)}-${A.label}`;
    }
    function p(A) {
      return m.value.has(A.value);
    }
    function x(A, T) {
      const L = p(A), R = h.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && R ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(A) {
      const T = [...n.modelValue ?? []], L = T.indexOf(A.value);
      L >= 0 ? T.splice(L, 1) : T.push(A.value), a("update:modelValue", T);
    }
    function w() {
      const A = f.value;
      if (A.length === 0) {
        h.value = 0;
        return;
      }
      const T = m.value, L = A.findIndex((R) => T.has(R.value));
      h.value = L >= 0 ? L : 0;
    }
    function $() {
      n.disabled || (d.value = !d.value);
    }
    function S(A) {
      A.stopPropagation(), !n.disabled && ($(), d.value && (w(), He(() => c.value?.focus())));
    }
    function M(A) {
      if (!d.value) return;
      const T = r.value;
      T && !T.contains(A.target) && (d.value = !1);
    }
    function O(A) {
      n.disabled || (A.key === "ArrowDown" || A.key === "Enter" || A.key === " ") && (A.preventDefault(), d.value || (d.value = !0, w(), He(() => c.value?.focus())));
    }
    function H(A) {
      const T = f.value;
      if (T.length !== 0) {
        if (A.key === "Escape") {
          A.preventDefault(), d.value = !1;
          return;
        }
        if (A.key === "ArrowDown") {
          A.preventDefault(), h.value = Math.min(h.value + 1, T.length - 1);
          return;
        }
        if (A.key === "ArrowUp") {
          A.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (A.key === "Enter" || A.key === " ") {
          A.preventDefault();
          const L = T[h.value];
          L && _(L);
        }
      }
    }
    return et(() => {
      document.addEventListener("click", M);
    }), dt(() => {
      document.removeEventListener("click", M);
    }), (A, T) => (b(), k("div", {
      ref_key: "rootRef",
      ref: r,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: te(P(ct))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: te([
          P(bt),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : y.value,
        onClick: S,
        onKeydown: O
      }, [
        u("div", x5, [
          g.value.length === 0 ? (b(), k("span", _5, D(e.placeholder), 1)) : (b(), k("div", k5, [
            (b(!0), k(se, null, fe(g.value, (L) => (b(), k("span", {
              key: v(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", w5, D(L.label), 1)
            ]))), 128))
          ]))
        ]),
        z(P(hn), {
          class: te(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, y5),
      nt(u("ul", {
        id: l,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: je(H, ["stop"])
      }, [
        (b(!0), k(se, null, fe(f.value, (L, R) => (b(), k("li", {
          key: v(L),
          role: "option",
          "aria-selected": p(L),
          class: te(x(L, R)),
          onClick: je((W) => _(L), ["stop"]),
          onMouseenter: (W) => h.value = R
        }, [
          u("span", $5, [
            p(L) ? (b(), ee(P(Co), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          u("span", S5, D(L.label), 1)
        ], 42, C5))), 128))
      ], 544), [
        [cn, d.value]
      ])
    ], 512));
  }
}), D5 = { class: "font-sans" }, T5 = ["for"], A5 = { class: "flex gap-2" }, B5 = { class: "w-[7.5rem] shrink-0" }, L5 = { class: "min-w-0 flex-1" }, P5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], R5 = ["id"], E5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = `kiut-phone-${Ye()}`, s = C(() => n.id ?? `${o}-num`), i = C(() => `${s.value}-err`), l = C({
      get: () => n.modelValue.prefix,
      set: (c) => a("update:modelValue", { ...n.modelValue, prefix: c })
    }), r = C({
      get: () => n.modelValue.number,
      set: (c) => a("update:modelValue", { ...n.modelValue, number: c })
    });
    return (c, d) => (b(), k("div", D5, [
      e.label ? (b(), k("label", {
        key: 0,
        for: s.value,
        class: te(P(ct))
      }, D(e.label), 11, T5)) : V("", !0),
      u("div", A5, [
        u("div", B5, [
          z($o, {
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", L5, [
          nt(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => r.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: te([P(bt), e.invalid ? P(Ot) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, P5), [
            [ln, r.value]
          ])
        ])
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: te(P(At)),
        role: "alert"
      }, D(e.errorText), 11, R5)) : V("", !0)
    ]));
  }
}), I5 = ["role", "aria-label"], F5 = { class: "flex flex-wrap gap-2" }, O5 = ["aria-checked", "role", "onClick"], V5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, z5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, N5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, H5 = /* @__PURE__ */ le({
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
    const n = e, a = t, o = C(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
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
    return (r, c) => (b(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", F5, [
        (b(!0), k(se, null, fe(e.items, (d) => (b(), k("button", {
          key: d.value,
          type: "button",
          class: te(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(d)
        }, [
          u("span", V5, [
            s(d) ? (b(), k("span", z5)) : V("", !0)
          ]),
          d.dotColor ? (b(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: $e({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", N5, D(d.label), 1)
        ], 10, O5))), 128))
      ])
    ], 8, I5));
  }
}), j5 = ["aria-label"], W5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], K5 = { class: "truncate px-3 py-2 text-sm font-medium" }, Y5 = /* @__PURE__ */ le({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = `kiut-seg-${Ye()}`, s = (y) => `${o}-seg-${y}`, i = oe([]);
    function l(y, v) {
      y instanceof HTMLButtonElement ? i.value[v] = y : i.value[v] = null;
    }
    function r(y) {
      return y.value === n.modelValue;
    }
    function c(y) {
      const v = r(y), p = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return y.disabled ? `${p} cursor-not-allowed opacity-40` : v ? `${p} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${p} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(y) {
      y.disabled || y.value !== n.modelValue && a("update:modelValue", y.value);
    }
    function h(y, v, p) {
      d(y), He(() => i.value[v]?.focus());
    }
    const f = C(
      () => n.items.map((y, v) => y.disabled ? -1 : v).filter((y) => y >= 0)
    );
    function m(y, v) {
      const p = n.items.length;
      if (p === 0) return 0;
      let x = y;
      for (let _ = 0; _ < p; _++)
        if (x = (x + v + p) % p, !n.items[x]?.disabled) return x;
      return y;
    }
    function g(y, v) {
      if (y.key === "ArrowRight" || y.key === "ArrowDown") {
        y.preventDefault();
        const p = m(v, 1), x = n.items[p];
        x && d(x), He(() => i.value[p]?.focus());
      } else if (y.key === "ArrowLeft" || y.key === "ArrowUp") {
        y.preventDefault();
        const p = m(v, -1), x = n.items[p];
        x && d(x), He(() => i.value[p]?.focus());
      } else if (y.key === "Home") {
        y.preventDefault();
        const p = f.value[0];
        if (p !== void 0) {
          const x = n.items[p];
          x && d(x), He(() => i.value[p]?.focus());
        }
      } else if (y.key === "End") {
        y.preventDefault();
        const p = f.value[f.value.length - 1];
        if (p !== void 0) {
          const x = n.items[p];
          x && d(x), He(() => i.value[p]?.focus());
        }
      }
    }
    return (y, v) => (b(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (b(!0), k(se, null, fe(e.items, (p, x) => (b(), k("button", {
        id: s(p.value),
        key: p.value,
        ref_for: !0,
        ref: (_) => l(_, x),
        type: "button",
        role: "tab",
        "aria-selected": r(p),
        "aria-disabled": p.disabled === !0,
        tabindex: r(p) ? 0 : -1,
        class: te(c(p)),
        onClick: (_) => h(p, x),
        onKeydown: (_) => g(_, x)
      }, [
        u("span", K5, D(p.label), 1)
      ], 42, W5))), 128))
    ], 8, j5));
  }
}), U5 = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, q5 = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, X5 = {
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
}, G5 = {
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
}, Z5 = [
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
function Q5(e = "en") {
  return U5[e];
}
function kl(e = "en") {
  return Z5.map((t) => ({ id: t, label: G5[e][t] }));
}
function J5(e = "en") {
  return "Presets";
}
kl("es");
function Ze(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function it(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ze(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function It(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Xn(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function eC(e, t) {
  const n = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return ze(n);
}
function Ln(e, t) {
  return eC(e, -t);
}
function tC(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function wl(e, t = /* @__PURE__ */ new Date()) {
  const n = ze(t);
  switch (e) {
    case "today":
      return { start: n, end: n };
    case "yesterday": {
      const a = Ln(n, 1);
      return { start: a, end: a };
    }
    case "last7":
      return { start: Ln(n, 6), end: n };
    case "last14":
      return { start: Ln(n, 13), end: n };
    case "last30":
      return { start: Ln(n, 29), end: n };
    case "last90":
      return { start: Ln(n, 89), end: n };
    case "thisMonth":
      return { start: It(n), end: n };
    case "lastMonth": {
      const a = It(Xn(n, -1));
      return { start: a, end: tC(a) };
    }
    case "yearToDate":
      return { start: new Date(n.getFullYear(), 0, 1), end: n };
  }
}
function Cl(e, t, n) {
  let a = ze(e.start), o = ze(e.end);
  if (t) {
    const s = ze(Ze(t));
    Ut(a, s) && (a = s), Ut(o, s) && (o = s);
  }
  if (n) {
    const s = ze(Ze(n));
    Ka(a, s) && (a = s), Ka(o, s) && (o = s);
  }
  return Ka(a, o) ? { start: o, end: a } : { start: a, end: o };
}
function nC(e, t, n = /* @__PURE__ */ new Date(), a, o) {
  if (!e.start || !e.end) return !1;
  const s = Cl(wl(t, n), a, o);
  return it(s.start) === e.start && it(s.end) === e.end;
}
function Zn(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Wt(e, t) {
  return Zn(e, t) === 0;
}
function Ut(e, t) {
  return Zn(e, t) < 0;
}
function Ka(e, t) {
  return Zn(e, t) > 0;
}
function $l(e, t) {
  return Zn(e, t) >= 0;
}
function Sl(e, t) {
  return Zn(e, t) <= 0;
}
function Ml(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), o = new Date(a);
  o.setDate(a.getDate() - a.getDay());
  const s = [], i = new Date(o);
  for (let l = 0; l < 42; l++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function wa(e, t = "en") {
  return `${q5[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Kt(e, t = "en") {
  return `${X5[t][e.getMonth()]} ${e.getFullYear()}`;
}
const aC = ["aria-expanded", "aria-labelledby", "aria-label"], oC = ["onKeydown"], sC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, iC = { class: "mb-4 flex items-center justify-between gap-2" }, lC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, rC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, cC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, dC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, uC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, hC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, fC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, gC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, pC = ["disabled", "onClick"], mC = "rounded-lg text-[#61616b]", bC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", vC = "opacity-30", yC = "bg-[#6b35e9] font-medium text-white", xC = "bg-[#895af6] font-semibold text-white", _C = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `${`kiut-drp-${Ye()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(It(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), f = C(() => {
      const T = It(d.value);
      return [T, Xn(T, 1)];
    }), m = C(() => n.ariaLabel ?? n.placeholder), g = C(() => {
      const T = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${T}` : `left-0 right-auto ${T}`;
    }), y = C(
      () => `${Kt(f.value[0])} – ${Kt(f.value[1])}`
    ), v = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], p = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const T = Ze(n.modelValue.start), L = Ze(n.modelValue.end);
      return `${wa(T)} – ${wa(L)}`;
    });
    function x(T, L) {
      return T.getMonth() === L.getMonth() && T.getFullYear() === L.getFullYear();
    }
    function _(T) {
      const L = ze(T);
      if (n.minDate) {
        const R = ze(Ze(n.minDate));
        if (Ut(L, R)) return !0;
      }
      if (n.maxDate) {
        const R = ze(Ze(n.maxDate));
        if (Ut(R, L)) return !0;
      }
      return !1;
    }
    function w(T, L, R) {
      const W = Wt(T, L), Q = Wt(T, R);
      if (W && Q) return "rounded-lg";
      const Z = W || T.getDay() === 0, ae = Q || T.getDay() === 6;
      return Z && ae ? "rounded-lg" : Z ? "rounded-l-lg" : ae ? "rounded-r-lg" : "rounded-none";
    }
    function $(T, L) {
      const R = x(L, T), W = _(L), Q = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, Z = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, ae = ze(L);
      if (W)
        return mC;
      let ue = bC;
      if (Q && Z && $l(ae, Q) && Sl(ae, Z)) {
        const G = Wt(ae, Q), B = Wt(ae, Z);
        ue = `${w(ae, Q, Z)} ${G || B ? xC : yC}`;
      }
      return R || (ue = `${ue} ${vC}`), ue;
    }
    function S(T) {
      if (_(T)) return;
      const L = ze(T);
      if (!c.value) {
        c.value = new Date(L), a("update:modelValue", { start: it(L), end: it(L) });
        return;
      }
      let W = ze(c.value), Q = new Date(L);
      Ut(Q, W) && ([W, Q] = [Q, W]), a("update:modelValue", { start: it(W), end: it(Q) }), c.value = null, r.value = !1;
    }
    function M(T) {
      d.value = Xn(d.value, T);
    }
    function O() {
      r.value = !1;
    }
    function H(T) {
      if (T?.stopPropagation(), !r.value) {
        if (r.value = !0, c.value = null, n.modelValue.start)
          try {
            d.value = It(Ze(n.modelValue.start));
          } catch {
          }
        He(() => l.value?.focus());
      }
    }
    function A(T) {
      if (!r.value) return;
      const L = i.value;
      L && !L.contains(T.target) && (r.value = !1);
    }
    return Fe(r, (T) => {
      T && (c.value = null);
    }), et(() => {
      document.addEventListener("click", A);
    }), dt(() => {
      document.removeEventListener("click", A);
    }), (T, L) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: te(P(ct))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: te([
          P(bt),
          "flex w-full items-center gap-2 text-left",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : m.value,
        onFocus: H,
        onClick: H
      }, [
        z(P(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, D(p.value), 3)
      ], 42, aC),
      nt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: te([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: zn(je(O, ["stop"]), ["escape"])
      }, [
        u("div", sC, [
          u("div", iC, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (R) => M(-1))
            }, [
              z(P(sl), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", lC, [
              u("span", rC, D(y.value), 1),
              u("div", cC, [
                u("span", dC, D(P(Kt)(f.value[0])), 1),
                u("span", uC, D(P(Kt)(f.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (R) => M(1))
            }, [
              z(P(il), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", hC, [
            (b(!0), k(se, null, fe(f.value, (R) => (b(), k("div", {
              key: `${R.getFullYear()}-${R.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", fC, [
                (b(), k(se, null, fe(v, (W) => u("span", { key: W }, D(W), 1)), 64))
              ]),
              u("div", gC, [
                (b(!0), k(se, null, fe(P(Ml)(R), (W) => (b(), k("button", {
                  key: P(it)(W),
                  type: "button",
                  disabled: _(W),
                  class: te(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(R, W)]),
                  onClick: (Q) => S(W)
                }, D(W.getDate()), 11, pC))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, oC), [
        [cn, r.value]
      ])
    ], 512));
  }
}), kC = ["aria-expanded", "aria-labelledby", "aria-label"], wC = ["aria-label", "onKeydown"], CC = { class: "flex flex-col sm:flex-row" }, $C = ["aria-label"], SC = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, MC = { class: "flex flex-col gap-0.5" }, DC = ["onClick"], TC = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, AC = { class: "mb-4 flex items-center justify-between gap-2" }, BC = ["aria-label"], LC = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, PC = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, RC = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, EC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, IC = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, FC = ["aria-label"], OC = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, VC = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, zC = { class: "grid grid-cols-7 gap-y-2 mt-2" }, NC = ["disabled", "onClick"], HC = "rounded-lg text-[#61616b]", jC = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", WC = "opacity-30", KC = "bg-[#6b35e9] font-medium text-white", YC = "bg-[#895af6] font-semibold text-white", UC = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `${`kiut-dpp-${Ye()}`}-lbl`, i = oe(null), l = oe(null), r = oe(!1), c = oe(null), d = oe(It(/* @__PURE__ */ new Date())), h = C(() => !!(n.modelValue.start && n.modelValue.end)), f = C(() => {
      const G = It(d.value);
      return [G, Xn(G, 1)];
    }), m = C(
      () => n.placeholder ?? (n.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => n.ariaLabel ?? m.value), y = C(() => kl(n.locale)), v = C(() => J5(n.locale)), p = C(() => Q5(n.locale)), x = C(
      () => n.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => n.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => n.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => n.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), S = C(() => {
      const G = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return n.panelAlign === "end" ? `right-0 left-auto ${G}` : `left-0 right-auto ${G}`;
    }), M = C(
      () => `${Kt(f.value[0], n.locale)} – ${Kt(f.value[1], n.locale)}`
    ), O = C(() => {
      if (!n.modelValue.start || !n.modelValue.end) return m.value;
      const G = Ze(n.modelValue.start), B = Ze(n.modelValue.end);
      return `${wa(G, n.locale)} – ${wa(B, n.locale)}`;
    });
    function H(G, B) {
      return G.getMonth() === B.getMonth() && G.getFullYear() === B.getFullYear();
    }
    function A(G) {
      const B = ze(G);
      if (n.minDate) {
        const j = ze(Ze(n.minDate));
        if (Ut(B, j)) return !0;
      }
      if (n.maxDate) {
        const j = ze(Ze(n.maxDate));
        if (Ut(j, B)) return !0;
      }
      return !1;
    }
    function T(G, B, j) {
      const K = Wt(G, B), re = Wt(G, j);
      if (K && re) return "rounded-lg";
      const xe = K || G.getDay() === 0, De = re || G.getDay() === 6;
      return xe && De ? "rounded-lg" : xe ? "rounded-l-lg" : De ? "rounded-r-lg" : "rounded-none";
    }
    function L(G) {
      const B = nC(
        n.modelValue,
        G,
        /* @__PURE__ */ new Date(),
        n.minDate,
        n.maxDate
      ), j = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return B ? `${j} font-medium` : j;
    }
    function R(G, B) {
      const j = H(B, G), K = A(B), re = n.modelValue.start ? ze(Ze(n.modelValue.start)) : null, xe = n.modelValue.end ? ze(Ze(n.modelValue.end)) : null, De = ze(B);
      if (K)
        return HC;
      let F = jC;
      if (re && xe && $l(De, re) && Sl(De, xe)) {
        const U = Wt(De, re), ce = Wt(De, xe);
        F = `${T(De, re, xe)} ${U || ce ? YC : KC}`;
      }
      return j || (F = `${F} ${WC}`), F;
    }
    function W(G) {
      const B = Cl(wl(G), n.minDate, n.maxDate);
      a("update:modelValue", {
        start: it(B.start),
        end: it(B.end)
      }), d.value = It(B.start), c.value = null, r.value = !1;
    }
    function Q(G) {
      if (A(G)) return;
      const B = ze(G);
      if (!c.value) {
        c.value = new Date(B), a("update:modelValue", { start: it(B), end: it(B) });
        return;
      }
      let K = ze(c.value), re = new Date(B);
      Ut(re, K) && ([K, re] = [re, K]), a("update:modelValue", { start: it(K), end: it(re) }), c.value = null, r.value = !1;
    }
    function Z(G) {
      d.value = Xn(d.value, G);
    }
    function ae() {
      r.value = !1;
    }
    function ue(G) {
      if (G.stopPropagation(), r.value) {
        r.value = !1;
        return;
      }
      if (r.value = !0, c.value = null, n.modelValue.start)
        try {
          d.value = It(Ze(n.modelValue.start));
        } catch {
        }
      He(() => l.value?.focus());
    }
    function ge(G) {
      if (!r.value) return;
      const B = i.value;
      B && !B.contains(G.target) && (r.value = !1);
    }
    return Fe(r, (G) => {
      G && (c.value = null);
    }), et(() => {
      document.addEventListener("click", ge);
    }), dt(() => {
      document.removeEventListener("click", ge);
    }), (G, B) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: s,
        class: te(P(ct))
      }, D(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: te([
          P(bt),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          r.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": r.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: ue
      }, [
        z(P(wo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: te([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, D(O.value), 3)
      ], 10, kC),
      nt(u("div", {
        ref_key: "panelRef",
        ref: l,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: te([
          S.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: zn(je(ae, ["stop"]), ["escape"])
      }, [
        u("div", CC, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", SC, D(v.value), 1),
            u("ul", MC, [
              (b(!0), k(se, null, fe(y.value, (j) => (b(), k("li", {
                key: j.id
              }, [
                u("button", {
                  type: "button",
                  class: te(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(j.id)]),
                  onClick: (K) => W(j.id)
                }, D(j.label), 11, DC)
              ]))), 128))
            ])
          ], 8, $C),
          u("div", TC, [
            u("div", AC, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: B[0] || (B[0] = (j) => Z(-1))
              }, [
                z(P(sl), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, BC),
              u("div", LC, [
                u("span", PC, D(M.value), 1),
                u("div", RC, [
                  u("span", EC, D(P(Kt)(f.value[0], e.locale)), 1),
                  u("span", IC, D(P(Kt)(f.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: B[1] || (B[1] = (j) => Z(1))
              }, [
                z(P(il), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, FC)
            ]),
            u("div", OC, [
              (b(!0), k(se, null, fe(f.value, (j) => (b(), k("div", {
                key: `${j.getFullYear()}-${j.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", VC, [
                  (b(!0), k(se, null, fe(p.value, (K) => (b(), k("span", { key: K }, D(K), 1))), 128))
                ]),
                u("div", zC, [
                  (b(!0), k(se, null, fe(P(Ml)(j), (K) => (b(), k("button", {
                    key: P(it)(K),
                    type: "button",
                    disabled: A(K),
                    class: te(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", R(j, K)]),
                    onClick: (re) => Q(K)
                  }, D(K.getDate()), 11, NC))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, wC), [
        [cn, r.value]
      ])
    ], 512));
  }
}), qC = ["disabled", "aria-expanded", "aria-label"], XC = { class: "min-w-0 flex-1 truncate" }, GC = ["aria-selected", "onClick", "onMouseenter"], ZC = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, QC = { class: "min-w-0 flex-1" }, JC = /* @__PURE__ */ le({
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
    const n = e, a = t, s = `${`kiut-tag-select-${Ye()}`}-listbox`, i = oe(null), l = oe(null), r = oe(null), c = oe(null), d = oe(!1), h = oe(0), f = oe({}), m = C(() => n.options.filter((Z) => !Z.disabled)), g = C(
      () => n.options.find((Z) => Z.value === n.modelValue) ?? null
    ), y = C(() => g.value?.color ?? "neutral"), v = C(
      () => cl(y.value, n.outlined)
    ), p = C(() => g.value ? g.value.label : n.modelValue !== null && n.modelValue !== void 0 && n.modelValue !== "" ? String(n.modelValue) : m.value[0]?.label ?? "Seleccionar…"), x = C(
      () => n.ariaLabel ?? `Estado: ${p.value}`
    );
    function _() {
      const Z = l.value;
      if (!Z) return;
      const ae = Z.getBoundingClientRect();
      f.value = {
        top: `${ae.bottom + 4}px`,
        left: `${ae.left}px`,
        minWidth: `${ae.width}px`
      };
    }
    function w(Z) {
      return `${String(Z.value)}-${Z.label}`;
    }
    function $(Z) {
      return n.modelValue === Z.value;
    }
    function S(Z, ae) {
      const ue = $(Z), ge = h.value === ae;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && ge ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function M() {
      h.value = Math.max(
        0,
        m.value.findIndex((Z) => Z.value === n.modelValue)
      );
    }
    function O() {
      _(), M(), He(() => c.value?.focus());
    }
    function H() {
      d.value = !1;
    }
    function A(Z) {
      a("update:modelValue", Z.value), H();
    }
    function T() {
      if (!n.disabled) {
        if (d.value) {
          H();
          return;
        }
        d.value = !0, O();
      }
    }
    function L(Z) {
      Z.stopPropagation(), !n.disabled && T();
    }
    function R(Z) {
      if (!d.value) return;
      const ae = Z.target, ue = i.value, ge = r.value;
      ue && !ue.contains(ae) && (!ge || !ge.contains(ae)) && H();
    }
    function W(Z) {
      n.disabled || (Z.key === "ArrowDown" || Z.key === "Enter" || Z.key === " ") && (Z.preventDefault(), d.value || (d.value = !0, O()));
    }
    function Q(Z) {
      const ae = m.value;
      if (Z.key === "Escape") {
        Z.preventDefault(), H(), l.value?.focus();
        return;
      }
      if (ae.length !== 0) {
        if (Z.key === "ArrowDown") {
          Z.preventDefault(), h.value = Math.min(h.value + 1, ae.length - 1);
          return;
        }
        if (Z.key === "ArrowUp") {
          Z.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (Z.key === "Enter") {
          Z.preventDefault();
          const ue = ae[h.value];
          ue && A(ue);
        }
      }
    }
    return et(() => {
      document.addEventListener("click", R);
    }), dt(() => {
      document.removeEventListener("click", R);
    }), (Z, ae) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: l,
        type: "button",
        disabled: e.disabled,
        class: te([
          P(rl),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          v.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": x.value,
        onClick: L,
        onKeydown: W
      }, [
        u("span", XC, D(p.value), 1),
        z(P(hn), {
          class: te(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, qC),
      (b(), ee(_n, { to: "body" }, [
        nt(u("div", {
          ref_key: "panelRef",
          ref: r,
          style: $e(f.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          u("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: je(Q, ["stop"])
          }, [
            (b(!0), k(se, null, fe(m.value, (ue, ge) => (b(), k("li", {
              key: w(ue),
              role: "option",
              "aria-selected": $(ue),
              class: te(S(ue, ge)),
              onClick: je((G) => A(ue), ["stop"]),
              onMouseenter: (G) => h.value = ge
            }, [
              u("span", ZC, [
                $(ue) ? (b(), ee(P(Co), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ]),
              u("span", QC, D(ue.label), 1)
            ], 42, GC))), 128))
          ], 544)
        ], 4), [
          [cn, d.value]
        ])
      ]))
    ], 512));
  }
}), e$ = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, t$ = ["id"], n$ = { class: "min-w-0 flex-1 space-y-1" }, a$ = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, o$ = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, s$ = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, i$ = /* @__PURE__ */ le({
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
    const n = e, a = C(() => ({ maxWidth: `${n.width}px` })), o = t, i = `${`kiut-modal-${Ye()}`}-title`, l = oe(null);
    function r() {
      n.loading || (o("cancel"), o("update:modelValue", !1));
    }
    function c() {
      o("confirm");
    }
    function d(h) {
      if (n.modelValue && h.key === "Escape") {
        if (n.loading) return;
        h.preventDefault(), r();
      }
    }
    return Fe(
      () => n.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          l.value?.focus({ preventScroll: !0 });
        });
      }
    ), et(() => {
      document.addEventListener("keydown", d);
    }), dt(() => {
      document.removeEventListener("keydown", d);
    }), (h, f) => (b(), ee(_n, { to: "body" }, [
      z(gt, { name: "kiut-modal" }, {
        default: E(() => [
          e.modelValue ? (b(), k("div", e$, [
            u("div", {
              class: "absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60",
              "aria-hidden": "true",
              onClick: r
            }),
            u("div", {
              id: e.id,
              ref_key: "panelRef",
              ref: l,
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": i,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              style: $e(a.value),
              onClick: f[0] || (f[0] = je(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: te(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", n$, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, D(e.title), 1),
                  e.subtitle ? (b(), k("p", a$, D(e.subtitle), 1)) : V("", !0)
                ]),
                z(yt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: r
                }, {
                  icon: E(() => [
                    z(P(ll), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", o$, [
                _e(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", s$, [
                z(yt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: r
                }, {
                  default: E(() => [
                    Te(D(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                z(yt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: E(() => [
                    Te(D(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, t$)
          ])) : V("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), l$ = /* @__PURE__ */ me(i$, [["__scopeId", "data-v-9134bb89"]]), r$ = { class: "text-left font-['Inter',system-ui,sans-serif]" }, c$ = {
  key: 0,
  class: ""
}, d$ = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, u$ = { class: "flex min-w-0 flex-1 items-center" }, h$ = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, f$ = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, g$ = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, p$ = /* @__PURE__ */ le({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = eo(), n = C(() => {
      const a = !!t.filters, o = !!t.actions;
      return a && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (a, o) => (b(), k("section", r$, [
      a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions ? (b(), k("header", c$, [
        a.$slots.description ? (b(), k("div", d$, [
          _e(a.$slots, "description")
        ])) : V("", !0),
        a.$slots.tabs ? (b(), k("div", {
          key: 1,
          class: te(["flex flex-wrap items-center gap-2", a.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", u$, [
            _e(a.$slots, "tabs")
          ]),
          a.$slots.actions && !a.$slots.filters ? (b(), k("div", h$, [
            _e(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0),
        a.$slots.filters || a.$slots.actions && !a.$slots.tabs ? (b(), k("div", {
          key: 2,
          class: te([
            "flex flex-wrap gap-2 items-center",
            a.$slots.tabs ? "mt-2" : "",
            n.value
          ])
        }, [
          a.$slots.filters ? (b(), k("div", f$, [
            _e(a.$slots, "filters")
          ])) : V("", !0),
          a.$slots.actions ? (b(), k("div", g$, [
            _e(a.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0)
      ])) : V("", !0),
      a.$slots.content || a.$slots.default ? (b(), k("div", {
        key: 1,
        class: te({
          "mt-6": a.$slots.description || a.$slots.tabs || a.$slots.filters || a.$slots.actions
        })
      }, [
        _e(a.$slots, "content", {}, () => [
          _e(a.$slots, "default")
        ])
      ], 2)) : V("", !0)
    ]));
  }
}), m$ = { class: "flex flex-1 min-h-0" }, b$ = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, v$ = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, y$ = ["aria-current", "data-has-active", "title", "onClick"], x$ = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, _$ = { class: "px-4 py-4 shrink-0" }, k$ = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, w$ = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, C$ = ["data-nav-id", "aria-current", "onClick"], $$ = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, S$ = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, M$ = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, D$ = ["data-nav-id", "aria-current", "onClick"], T$ = { class: "truncate text-[15px]" }, A$ = ["aria-current", "data-has-active", "onClick"], B$ = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, L$ = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, P$ = /* @__PURE__ */ le({
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
    const n = oe(!1), a = e, o = t, s = Ca(), { class: i, ...l } = s, r = oe(!1);
    function c() {
      typeof window > "u" || (r.value = window.innerWidth < a.mobileBreakpoint);
    }
    et(() => {
      c(), window.addEventListener("resize", c);
    }), dt(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const p = a.sections.find((x) => x.id === a.selectedSectionId);
      return p?.items?.length ? p : null;
    });
    function h(p) {
      return a.activePath ? a.activePath === p.path || a.activePath.startsWith(p.path + "/") : !1;
    }
    function f(p) {
      return p.items?.length ? p.items.some(h) : !a.activePath || !p.path ? !1 : a.activePath === p.path || a.activePath.startsWith(p.path + "/");
    }
    function m(p) {
      if (!p.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: p,
          item: { id: p.id, label: p.label, path: p.path }
        });
        return;
      }
      const x = a.selectedSectionId === p.id ? null : p.id;
      o("update:selectedSectionId", x);
    }
    function g(p, x) {
      o("navigate", { section: p, item: x });
    }
    function y() {
      o("update:selectedSectionId", null);
    }
    function v(p, x) {
      g(p, x), y();
    }
    return (p, x) => r.value ? (b(), k("div", xt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      z(gt, { name: "ksn-overlay" }, {
        default: E(() => [
          d.value ? (b(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: y
          })) : V("", !0)
        ]),
        _: 1
      }),
      z(gt, { name: "ksn-sheet" }, {
        default: E(() => [
          d.value ? (b(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: $e({ paddingBottom: a.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", $$, [
              u("p", S$, D(d.value.label), 1),
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
            u("nav", M$, [
              (b(!0), k(se, null, fe(d.value.items, (_) => (b(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => v(d.value, _)
              }, [
                _.icon ? (b(), ee(St(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : V("", !0),
                u("span", T$, D(_.label), 1)
              ], 8, D$))), 128))
            ])
          ], 4)) : V("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: $e({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (b(!0), k(se, null, fe(e.sections, (_) => (b(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": f(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => m(_)
        }, [
          e.selectedSectionId === _.id || f(_) ? (b(), k("span", B$)) : V("", !0),
          _.icon ? (b(), ee(St(_.icon), {
            key: 1,
            class: "shrink-0",
            style: $e({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : V("", !0),
          u("span", L$, D(_.label), 1)
        ], 8, A$))), 128))
      ], 4)
    ], 16)) : (b(), k("aside", xt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      u("div", m$, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: $e({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (_) => n.value = !0),
          onMouseleave: x[1] || (x[1] = (_) => n.value = !1)
        }, [
          p.$slots.logo ? (b(), k("div", b$, [
            _e(p.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : V("", !0),
          u("nav", v$, [
            (b(!0), k(se, null, fe(e.sections, (_) => (b(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": f(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => m(_)
            }, [
              _.icon ? (b(), ee(St(_.icon), {
                key: 0,
                class: "shrink-0",
                style: $e({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: $e({ fontSize: e.primaryFontSize })
              }, D(_.label), 5)
            ], 8, y$))), 128))
          ]),
          p.$slots.footer ? (b(), k("div", x$, [
            _e(p.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        z(gt, { name: "ksn-sub" }, {
          default: E(() => [
            d.value ? (b(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: $e({ width: e.secondaryWidth })
            }, [
              u("div", _$, [
                u("p", k$, D(d.value.label), 1)
              ]),
              u("nav", w$, [
                (b(!0), k(se, null, fe(d.value.items, (_) => (b(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, _)
                }, [
                  _.icon ? (b(), ee(St(_.icon), {
                    key: 0,
                    style: $e({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  u("span", {
                    class: "truncate",
                    style: $e({ fontSize: e.secondaryFontSize })
                  }, D(_.label), 5)
                ], 8, C$))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), R$ = /* @__PURE__ */ me(P$, [["__scopeId", "data-v-e0ccb96c"]]), W$ = {
  install(e) {
    e.component("KiutChartBar", Tt), e.component("KiutChartLine", _t), e.component("KiutPieChart", Ta), e.component("KiutBoxplotChart", Cf), e.component("KiutCandlestickChart", ug), e.component("KiutHistogramChart", al), e.component("KiutSankeyChart", Gt), e.component("KiutAgentsPerDay", lm), e.component("KiutBookingManager", zm), e.component("KiutCheckin", dl), e.component("KiutCheckinContainer", A0), e.component("KiutCheckinMetrics", m0), e.component("KiutCheckinSegments", ul), e.component("KiutDisruption", q0), e.component("KiutFAQ", nb), e.component("KiutMessagesPerAgent", hb), e.component("KiutRecordLocator", Ab), e.component("KiutSalesByChannel", hl), e.component("KiutSeller", fl), e.component("KiutSellerContainer", mv), e.component("KiutTopAgents", wv), e.component("KiutPaymentMethod", Wv), e.component("KiutAgentHumanConversations", Ty), e.component("KiutChannelMetrics", Vy), e.component("KiutTriageCombinations", Jy), e.component("KiutSelectLanguage", s1), e.component("KiutGuardrails", p1), e.component("KiutDisruptionNotifier", E1), e.component("KiutTotalConversationsCard", I1), e.component("KiutCsatP95Card", F1), e.component("KiutCsatPulseCard", O1), e.component("KiutCSATContainer", hx), e.component("KiutAiGeneratedRevenueCard", fx), e.component("KiutCostCard", px), e.component("KiutHumanEscalations", wx), e.component("KiutHumanEscalationsCard", Cx), e.component("KiutNpsDailyMetrics", pl), e.component("KiutNpsMetrics", ml), e.component("KiutNpsOverviewMetrics", gl), e.component("KiutAWSCost", Lx), e.component("KiutCostUsage", Hx), e.component("KiutTokenUsage", Qx), e.component("KiutConversationCount", r_), e.component("KiutTopAgentsAnalysis", x_), e.component("KiutTopAgentsPie", T_), e.component("KiutDailyCostTrends", O_), e.component("KiutModelUsage", Q_), e.component("KiutMessageRoles", lk), e.component("KiutCostPerConversations", bk), e.component("Tabs", bl), e.component("Table", Rk), e.component("TableVersions", S2), e.component("Filters", sw), e.component("InputText", dw), e.component("InputPassword", yw), e.component("InputTextarea", Cw), e.component("InputFile", Lw), e.component("InputDateTime", Ow), e.component("InputTime", Ww), e.component("InputRange", o5), e.component("InputNumber", c5), e.component("InputColorPicker", v5), e.component("Select", $o), e.component("MultiSelect", M5), e.component("Toggle", _l), e.component("InputPhone", E5), e.component("SelectablePills", H5), e.component("SegmentedControl", Y5), e.component("DateRangePicker", _C), e.component("DatePickerPresets", UC), e.component("Tag", Ue), e.component("TagSelect", JC), e.component("Button", yt), e.component("Modal", l$), e.component("Section", p$), e.component("KiutAppShellNavigation", R$);
  }
};
export {
  Lx as AWSCost,
  Ty as AgentHumanConversations,
  lm as AgentsPerDay,
  fx as AiGeneratedRevenueCard,
  R$ as AppShellNavigation,
  zm as BookingManager,
  Cf as BoxplotChart,
  yt as Button,
  hx as CSATContainer,
  ug as CandlestickChart,
  Vy as ChannelMetrics,
  Tt as ChartBar,
  _t as ChartLine,
  dl as Checkin,
  A0 as CheckinContainer,
  m0 as CheckinMetrics,
  ul as CheckinSegments,
  r_ as ConversationCount,
  px as CostCard,
  bk as CostPerConversations,
  Hx as CostUsage,
  F1 as CsatP95Card,
  O1 as CsatPulseCard,
  i2 as DEFAULT_TABLE_VERSIONS_LABELS,
  O_ as DailyCostTrends,
  UC as DatePickerPresets,
  _C as DateRangePicker,
  q0 as Disruption,
  E1 as DisruptionNotifier,
  l2 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  nb as FAQ,
  sw as Filters,
  p1 as Guardrails,
  al as HistogramChart,
  wx as HumanEscalations,
  Cx as HumanEscalationsCard,
  v5 as InputColorPicker,
  Ow as InputDateTime,
  Lw as InputFile,
  c5 as InputNumber,
  yw as InputPassword,
  E5 as InputPhone,
  o5 as InputRange,
  dw as InputText,
  Cw as InputTextarea,
  Ww as InputTime,
  W$ as KiutUIPlugin,
  lk as MessageRoles,
  hb as MessagesPerAgent,
  l$ as Modal,
  Q_ as ModelUsage,
  M5 as MultiSelect,
  pl as NpsDailyMetrics,
  ml as NpsMetrics,
  gl as NpsOverviewMetrics,
  Wv as PaymentMethod,
  Ta as PieChart,
  j$ as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Ab as RecordLocator,
  hl as SalesByChannel,
  Gt as SankeyChart,
  p$ as Section,
  Y5 as SegmentedControl,
  $o as Select,
  s1 as SelectLanguage,
  H5 as SelectablePills,
  fl as Seller,
  mv as SellerContainer,
  Rk as Table,
  S2 as TableVersions,
  bl as Tabs,
  Ue as Tag,
  JC as TagSelect,
  _l as Toggle,
  Qx as TokenUsage,
  wv as TopAgents,
  x_ as TopAgentsAnalysis,
  T_ as TopAgentsPie,
  I1 as TotalConversationsCard,
  Jy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
