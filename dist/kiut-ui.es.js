import { defineComponent as Q, shallowRef as Io, h as Ca, ref as ot, onMounted as ie, onUnmounted as Le, watch as Pt, toRaw as $a, nextTick as zt, version as Ji, isProxy as Ro, computed as M, toRef as ht, openBlock as b, createElementBlock as k, createVNode as V, unref as F, createElementVNode as r, Fragment as U, renderList as st, normalizeStyle as gt, normalizeClass as H, toDisplayString as A, createCommentVNode as O, onBeforeUnmount as Oo, createStaticVNode as ss, withDirectives as Gt, vShow as vn, useSlots as Fa, renderSlot as St, Comment as tl, createBlock as Y, resolveDynamicComponent as Xe, withCtx as P, createTextVNode as _t, vModelSelect as el, Transition as fn, Teleport as Pa, withModifiers as te, withKeys as Kn, vModelText as De, useAttrs as Vo, mergeProps as Un } from "vue";
import * as os from "echarts/core";
import { TooltipComponent as nl, TitleComponent as al } from "echarts/components";
import { SankeyChart as sl } from "echarts/charts";
import { CanvasRenderer as ol } from "echarts/renderers";
import It from "moment";
function Mn(e) {
  return e + 0.5 | 0;
}
const Ce = (e, t, n) => Math.max(Math.min(e, n), t);
function dn(e) {
  return Ce(Mn(e * 2.55), 0, 255);
}
function Ae(e) {
  return Ce(Mn(e * 255), 0, 255);
}
function be(e) {
  return Ce(Mn(e / 2.55) / 100, 0, 1);
}
function is(e) {
  return Ce(Mn(e * 100), 0, 100);
}
const Jt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Sa = [..."0123456789ABCDEF"], il = (e) => Sa[e & 15], ll = (e) => Sa[(e & 240) >> 4] + Sa[e & 15], Dn = (e) => (e & 240) >> 4 === (e & 15), rl = (e) => Dn(e.r) && Dn(e.g) && Dn(e.b) && Dn(e.a);
function cl(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Jt[e[1]] * 17,
    g: 255 & Jt[e[2]] * 17,
    b: 255 & Jt[e[3]] * 17,
    a: t === 5 ? Jt[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Jt[e[1]] << 4 | Jt[e[2]],
    g: Jt[e[3]] << 4 | Jt[e[4]],
    b: Jt[e[5]] << 4 | Jt[e[6]],
    a: t === 9 ? Jt[e[7]] << 4 | Jt[e[8]] : 255
  })), n;
}
const dl = (e, t) => e < 255 ? t(e) : "";
function ul(e) {
  var t = rl(e) ? il : ll;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + dl(e.a, t) : void 0;
}
const hl = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function zo(e, t, n) {
  const a = t * Math.min(n, 1 - n), s = (o, i = (o + e / 30) % 12) => n - a * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [s(0), s(8), s(4)];
}
function fl(e, t, n) {
  const a = (s, o = (s + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [a(5), a(3), a(1)];
}
function gl(e, t, n) {
  const a = zo(e, 1, 0.5);
  let s;
  for (t + n > 1 && (s = 1 / (t + n), t *= s, n *= s), s = 0; s < 3; s++)
    a[s] *= 1 - t - n, a[s] += t;
  return a;
}
function pl(e, t, n, a, s) {
  return e === s ? (t - n) / a + (t < n ? 6 : 0) : t === s ? (n - e) / a + 2 : (e - t) / a + 4;
}
function Ea(e) {
  const n = e.r / 255, a = e.g / 255, s = e.b / 255, o = Math.max(n, a, s), i = Math.min(n, a, s), l = (o + i) / 2;
  let c, d, u;
  return o !== i && (u = o - i, d = l > 0.5 ? u / (2 - o - i) : u / (o + i), c = pl(n, a, s, u, o), c = c * 60 + 0.5), [c | 0, d || 0, l];
}
function Ia(e, t, n, a) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, a)).map(Ae);
}
function Ra(e, t, n) {
  return Ia(zo, e, t, n);
}
function ml(e, t, n) {
  return Ia(gl, e, t, n);
}
function bl(e, t, n) {
  return Ia(fl, e, t, n);
}
function No(e) {
  return (e % 360 + 360) % 360;
}
function vl(e) {
  const t = hl.exec(e);
  let n = 255, a;
  if (!t)
    return;
  t[5] !== a && (n = t[6] ? dn(+t[5]) : Ae(+t[5]));
  const s = No(+t[2]), o = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? a = ml(s, o, i) : t[1] === "hsv" ? a = bl(s, o, i) : a = Ra(s, o, i), {
    r: a[0],
    g: a[1],
    b: a[2],
    a: n
  };
}
function yl(e, t) {
  var n = Ea(e);
  n[0] = No(n[0] + t), n = Ra(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function _l(e) {
  if (!e)
    return;
  const t = Ea(e), n = t[0], a = is(t[1]), s = is(t[2]);
  return e.a < 255 ? `hsla(${n}, ${a}%, ${s}%, ${be(e.a)})` : `hsl(${n}, ${a}%, ${s}%)`;
}
const ls = {
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
}, rs = {
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
function xl() {
  const e = {}, t = Object.keys(rs), n = Object.keys(ls);
  let a, s, o, i, l;
  for (a = 0; a < t.length; a++) {
    for (i = l = t[a], s = 0; s < n.length; s++)
      o = n[s], l = l.replace(o, ls[o]);
    o = parseInt(rs[i], 16), e[l] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let An;
function kl(e) {
  An || (An = xl(), An.transparent = [0, 0, 0, 0]);
  const t = An[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const wl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Cl(e) {
  const t = wl.exec(e);
  let n = 255, a, s, o;
  if (t) {
    if (t[7] !== a) {
      const i = +t[7];
      n = t[8] ? dn(i) : Ce(i * 255, 0, 255);
    }
    return a = +t[1], s = +t[3], o = +t[5], a = 255 & (t[2] ? dn(a) : Ce(a, 0, 255)), s = 255 & (t[4] ? dn(s) : Ce(s, 0, 255)), o = 255 & (t[6] ? dn(o) : Ce(o, 0, 255)), {
      r: a,
      g: s,
      b: o,
      a: n
    };
  }
}
function $l(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${be(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const la = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, Ke = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Sl(e, t, n) {
  const a = Ke(be(e.r)), s = Ke(be(e.g)), o = Ke(be(e.b));
  return {
    r: Ae(la(a + n * (Ke(be(t.r)) - a))),
    g: Ae(la(s + n * (Ke(be(t.g)) - s))),
    b: Ae(la(o + n * (Ke(be(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Tn(e, t, n) {
  if (e) {
    let a = Ea(e);
    a[t] = Math.max(0, Math.min(a[t] + a[t] * n, t === 0 ? 360 : 1)), a = Ra(a), e.r = a[0], e.g = a[1], e.b = a[2];
  }
}
function jo(e, t) {
  return e && Object.assign(t || {}, e);
}
function cs(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Ae(e[3]))) : (t = jo(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Ae(t.a)), t;
}
function Ml(e) {
  return e.charAt(0) === "r" ? Cl(e) : vl(e);
}
class yn {
  constructor(t) {
    if (t instanceof yn)
      return t;
    const n = typeof t;
    let a;
    n === "object" ? a = cs(t) : n === "string" && (a = cl(t) || kl(t) || Ml(t)), this._rgb = a, this._valid = !!a;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = jo(this._rgb);
    return t && (t.a = be(t.a)), t;
  }
  set rgb(t) {
    this._rgb = cs(t);
  }
  rgbString() {
    return this._valid ? $l(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? ul(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? _l(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const a = this.rgb, s = t.rgb;
      let o;
      const i = n === o ? 0.5 : n, l = 2 * i - 1, c = a.a - s.a, d = ((l * c === -1 ? l : (l + c) / (1 + l * c)) + 1) / 2;
      o = 1 - d, a.r = 255 & d * a.r + o * s.r + 0.5, a.g = 255 & d * a.g + o * s.g + 0.5, a.b = 255 & d * a.b + o * s.b + 0.5, a.a = i * a.a + (1 - i) * s.a, this.rgb = a;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Sl(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new yn(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Ae(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = Mn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Tn(this._rgb, 2, t), this;
  }
  darken(t) {
    return Tn(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Tn(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Tn(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return yl(this._rgb, t), this;
  }
}
function ge() {
}
const Dl = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function wt(e) {
  return e == null;
}
function Rt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function xt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ne(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function re(e, t) {
  return ne(e) ? e : t;
}
function pt(e, t) {
  return typeof e > "u" ? t : e;
}
const Al = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Wo = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Dt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function Ct(e, t, n, a) {
  let s, o, i;
  if (Rt(e))
    for (o = e.length, s = 0; s < o; s++)
      t.call(n, e[s], s);
  else if (xt(e))
    for (i = Object.keys(e), o = i.length, s = 0; s < o; s++)
      t.call(n, e[i[s]], i[s]);
}
function qn(e, t) {
  let n, a, s, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, a = e.length; n < a; ++n)
    if (s = e[n], o = t[n], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function Xn(e) {
  if (Rt(e))
    return e.map(Xn);
  if (xt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), a = n.length;
    let s = 0;
    for (; s < a; ++s)
      t[n[s]] = Xn(e[n[s]]);
    return t;
  }
  return e;
}
function Ho(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Tl(e, t, n, a) {
  if (!Ho(e))
    return;
  const s = t[e], o = n[e];
  xt(s) && xt(o) ? _n(s, o, a) : t[e] = Xn(o);
}
function _n(e, t, n) {
  const a = Rt(t) ? t : [
    t
  ], s = a.length;
  if (!xt(e))
    return e;
  n = n || {};
  const o = n.merger || Tl;
  let i;
  for (let l = 0; l < s; ++l) {
    if (i = a[l], !xt(i))
      continue;
    const c = Object.keys(i);
    for (let d = 0, u = c.length; d < u; ++d)
      o(c[d], e, i, n);
  }
  return e;
}
function gn(e, t) {
  return _n(e, t, {
    merger: Bl
  });
}
function Bl(e, t, n) {
  if (!Ho(e))
    return;
  const a = t[e], s = n[e];
  xt(a) && xt(s) ? gn(a, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Xn(s));
}
const ds = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Ll(e) {
  const t = e.split("."), n = [];
  let a = "";
  for (const s of t)
    a += s, a.endsWith("\\") ? a = a.slice(0, -1) + "." : (n.push(a), a = "");
  return n;
}
function Fl(e) {
  const t = Ll(e);
  return (n) => {
    for (const a of t) {
      if (a === "")
        break;
      n = n && n[a];
    }
    return n;
  };
}
function We(e, t) {
  return (ds[t] || (ds[t] = Fl(t)))(e);
}
function Oa(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const xn = (e) => typeof e < "u", Te = (e) => typeof e == "function", us = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Pl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const $t = Math.PI, Bt = 2 * $t, El = Bt + $t, Gn = Number.POSITIVE_INFINITY, Il = $t / 180, Ot = $t / 2, Ee = $t / 4, hs = $t * 2 / 3, Yo = Math.log10, ue = Math.sign;
function pn(e, t, n) {
  return Math.abs(e - t) < n;
}
function fs(e) {
  const t = Math.round(e);
  e = pn(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Yo(e))), a = e / n;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 5 ? 5 : 10) * n;
}
function Rl(e) {
  const t = [], n = Math.sqrt(e);
  let a;
  for (a = 1; a < n; a++)
    e % a === 0 && (t.push(a), t.push(e / a));
  return n === (n | 0) && t.push(n), t.sort((s, o) => s - o).pop(), t;
}
function Ol(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function kn(e) {
  return !Ol(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Vl(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function zl(e, t, n) {
  let a, s, o;
  for (a = 0, s = e.length; a < s; a++)
    o = e[a][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function ve(e) {
  return e * ($t / 180);
}
function Nl(e) {
  return e * (180 / $t);
}
function gs(e) {
  if (!ne(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Ko(e, t) {
  const n = t.x - e.x, a = t.y - e.y, s = Math.sqrt(n * n + a * a);
  let o = Math.atan2(a, n);
  return o < -0.5 * $t && (o += Bt), {
    angle: o,
    distance: s
  };
}
function Ma(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function jl(e, t) {
  return (e - t + El) % Bt - $t;
}
function oe(e) {
  return (e % Bt + Bt) % Bt;
}
function wn(e, t, n, a) {
  const s = oe(e), o = oe(t), i = oe(n), l = oe(o - s), c = oe(i - s), d = oe(s - o), u = oe(s - i);
  return s === o || s === i || a && o === i || l > c && d < u;
}
function Wt(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Wl(e) {
  return Wt(e, -32768, 32767);
}
function $e(e, t, n, a = 1e-6) {
  return e >= Math.min(t, n) - a && e <= Math.max(t, n) + a;
}
function Va(e, t, n) {
  n = n || ((i) => e[i] < t);
  let a = e.length - 1, s = 0, o;
  for (; a - s > 1; )
    o = s + a >> 1, n(o) ? s = o : a = o;
  return {
    lo: s,
    hi: a
  };
}
const Ne = (e, t, n, a) => Va(e, n, a ? (s) => {
  const o = e[s][t];
  return o < n || o === n && e[s + 1][t] === n;
} : (s) => e[s][t] < n), Hl = (e, t, n) => Va(e, n, (a) => e[a][t] >= n);
function Yl(e, t, n) {
  let a = 0, s = e.length;
  for (; a < s && e[a] < t; )
    a++;
  for (; s > a && e[s - 1] > n; )
    s--;
  return a > 0 || s < e.length ? e.slice(a, s) : e;
}
const Uo = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Kl(e, t) {
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
  }), Uo.forEach((n) => {
    const a = "_onData" + Oa(n), s = e[n];
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
function ps(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const a = n.listeners, s = a.indexOf(t);
  s !== -1 && a.splice(s, 1), !(a.length > 0) && (Uo.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function qo(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Xo = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function Go(e, t) {
  let n = [], a = !1;
  return function(...s) {
    n = s, a || (a = !0, Xo.call(window, () => {
      a = !1, e.apply(t, n);
    }));
  };
}
function Ul(e, t) {
  let n;
  return function(...a) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, a)) : e.apply(this, a), t;
  };
}
const za = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", jt = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, ql = (e, t, n, a) => e === (a ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function Xl(e, t, n) {
  const a = t.length;
  let s = 0, o = a;
  if (e._sorted) {
    const { iScale: i, vScale: l, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, u = i.axis, { min: h, max: p, minDefined: _, maxDefined: f } = i.getUserBounds();
    if (_) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Ne(c, u, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? a : Ne(t, u, i.getPixelForValue(h)).lo
      ), d) {
        const v = c.slice(0, s + 1).reverse().findIndex((x) => !wt(x[l.axis]));
        s -= Math.max(0, v);
      }
      s = Wt(s, 0, a - 1);
    }
    if (f) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        Ne(c, i.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ne(t, u, i.getPixelForValue(p), !0).hi + 1
      );
      if (d) {
        const x = c.slice(v - 1).findIndex((m) => !wt(m[l.axis]));
        v += Math.max(0, x);
      }
      o = Wt(v, s, a) - s;
    } else
      o = a - s;
  }
  return {
    start: s,
    count: o
  };
}
function Gl(e) {
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
const Bn = (e) => e === 0 || e === 1, ms = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Bt / n)), bs = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Bt / n) + 1, mn = {
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
  easeInSine: (e) => -Math.cos(e * Ot) + 1,
  easeOutSine: (e) => Math.sin(e * Ot),
  easeInOutSine: (e) => -0.5 * (Math.cos($t * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => Bn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Bn(e) ? e : ms(e, 0.075, 0.3),
  easeOutElastic: (e) => Bn(e) ? e : bs(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Bn(e) ? e : e < 0.5 ? 0.5 * ms(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * bs(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - mn.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? mn.easeInBounce(e * 2) * 0.5 : mn.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Na(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function vs(e) {
  return Na(e) ? e : new yn(e);
}
function ra(e) {
  return Na(e) ? e : new yn(e).saturate(0.5).darken(0.1).hexString();
}
const Zl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Ql = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Jl(e) {
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
      properties: Ql
    },
    numbers: {
      type: "number",
      properties: Zl
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
function tr(e) {
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
const ys = /* @__PURE__ */ new Map();
function er(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let a = ys.get(n);
  return a || (a = new Intl.NumberFormat(e, t), ys.set(n, a)), a;
}
function ja(e, t, n) {
  return er(t, n).format(e);
}
const nr = {
  values(e) {
    return Rt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const a = this.chart.options.locale;
    let s, o = e;
    if (n.length > 1) {
      const d = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (d < 1e-4 || d > 1e15) && (s = "scientific"), o = ar(e, n);
    }
    const i = Yo(Math.abs(o)), l = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), c = {
      notation: s,
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return Object.assign(c, this.options.ticks.format), ja(e, a, c);
  }
};
function ar(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Zo = {
  formatters: nr
};
function sr(e) {
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
      callback: Zo.formatters.values,
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
const He = /* @__PURE__ */ Object.create(null), Da = /* @__PURE__ */ Object.create(null);
function bn(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let a = 0, s = n.length; a < s; ++a) {
    const o = n[a];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function ca(e, t, n) {
  return typeof t == "string" ? _n(bn(e, t), n) : _n(bn(e, ""), t);
}
class or {
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
    }, this.hover = {}, this.hoverBackgroundColor = (a, s) => ra(s.backgroundColor), this.hoverBorderColor = (a, s) => ra(s.borderColor), this.hoverColor = (a, s) => ra(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return ca(this, t, n);
  }
  get(t) {
    return bn(this, t);
  }
  describe(t, n) {
    return ca(Da, t, n);
  }
  override(t, n) {
    return ca(He, t, n);
  }
  route(t, n, a, s) {
    const o = bn(this, t), i = bn(this, a), l = "_" + n;
    Object.defineProperties(o, {
      [l]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const c = this[l], d = i[s];
          return xt(c) ? Object.assign({}, d, c) : pt(c, d);
        },
        set(c) {
          this[l] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Ft = /* @__PURE__ */ new or({
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
  Jl,
  tr,
  sr
]);
function ir(e) {
  return !e || wt(e.size) || wt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function _s(e, t, n, a, s) {
  let o = t[s];
  return o || (o = t[s] = e.measureText(s).width, n.push(s)), o > a && (a = o), a;
}
function Ie(e, t, n) {
  const a = e.currentDevicePixelRatio, s = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - s) * a) / a + s;
}
function xs(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Aa(e, t, n, a) {
  Qo(e, t, n, a, null);
}
function Qo(e, t, n, a, s) {
  let o, i, l, c, d, u, h, p;
  const _ = t.pointStyle, f = t.rotation, v = t.radius;
  let x = (f || 0) * Il;
  if (_ && typeof _ == "object" && (o = _.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, a), e.rotate(x), e.drawImage(_, -_.width / 2, -_.height / 2, _.width, _.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), _) {
      // Default includes circle
      default:
        s ? e.ellipse(n, a, s / 2, v, 0, 0, Bt) : e.arc(n, a, v, 0, Bt), e.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : v, e.moveTo(n + Math.sin(x) * u, a - Math.cos(x) * v), x += hs, e.lineTo(n + Math.sin(x) * u, a - Math.cos(x) * v), x += hs, e.lineTo(n + Math.sin(x) * u, a - Math.cos(x) * v), e.closePath();
        break;
      case "rectRounded":
        d = v * 0.516, c = v - d, i = Math.cos(x + Ee) * c, h = Math.cos(x + Ee) * (s ? s / 2 - d : c), l = Math.sin(x + Ee) * c, p = Math.sin(x + Ee) * (s ? s / 2 - d : c), e.arc(n - h, a - l, d, x - $t, x - Ot), e.arc(n + p, a - i, d, x - Ot, x), e.arc(n + h, a + l, d, x, x + Ot), e.arc(n - p, a + i, d, x + Ot, x + $t), e.closePath();
        break;
      case "rect":
        if (!f) {
          c = Math.SQRT1_2 * v, u = s ? s / 2 : c, e.rect(n - u, a - c, 2 * u, 2 * c);
          break;
        }
        x += Ee;
      /* falls through */
      case "rectRot":
        h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + p, a - i), e.lineTo(n + h, a + l), e.lineTo(n - p, a + i), e.closePath();
        break;
      case "crossRot":
        x += Ee;
      /* falls through */
      case "cross":
        h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "star":
        h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i), x += Ee, h = Math.cos(x) * (s ? s / 2 : v), i = Math.cos(x) * v, l = Math.sin(x) * v, p = Math.sin(x) * (s ? s / 2 : v), e.moveTo(n - h, a - l), e.lineTo(n + h, a + l), e.moveTo(n + p, a - i), e.lineTo(n - p, a + i);
        break;
      case "line":
        i = s ? s / 2 : Math.cos(x) * v, l = Math.sin(x) * v, e.moveTo(n - i, a - l), e.lineTo(n + i, a + l);
        break;
      case "dash":
        e.moveTo(n, a), e.lineTo(n + Math.cos(x) * (s ? s / 2 : v), a + Math.sin(x) * v);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Cn(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Wa(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Ha(e) {
  e.restore();
}
function lr(e, t, n, a, s) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (s === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else s === "after" != !!a ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function rr(e, t, n, a) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(a ? t.cp1x : t.cp2x, a ? t.cp1y : t.cp2y, a ? n.cp2x : n.cp1x, a ? n.cp2y : n.cp1y, n.x, n.y);
}
function cr(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), wt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function dr(e, t, n, a, s) {
  if (s.strikethrough || s.underline) {
    const o = e.measureText(a), i = t - o.actualBoundingBoxLeft, l = t + o.actualBoundingBoxRight, c = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, u = s.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(i, u), e.lineTo(l, u), e.stroke();
  }
}
function ur(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function $n(e, t, n, a, s, o = {}) {
  const i = Rt(t) ? t : [
    t
  ], l = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = s.string, cr(e, o), c = 0; c < i.length; ++c)
    d = i[c], o.backdrop && ur(e, o.backdrop), l && (o.strokeColor && (e.strokeStyle = o.strokeColor), wt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, a, o.maxWidth)), e.fillText(d, n, a, o.maxWidth), dr(e, n, a, d, o), a += Number(s.lineHeight);
  e.restore();
}
function Zn(e, t) {
  const { x: n, y: a, w: s, h: o, radius: i } = t;
  e.arc(n + i.topLeft, a + i.topLeft, i.topLeft, 1.5 * $t, $t, !0), e.lineTo(n, a + o - i.bottomLeft), e.arc(n + i.bottomLeft, a + o - i.bottomLeft, i.bottomLeft, $t, Ot, !0), e.lineTo(n + s - i.bottomRight, a + o), e.arc(n + s - i.bottomRight, a + o - i.bottomRight, i.bottomRight, Ot, 0, !0), e.lineTo(n + s, a + i.topRight), e.arc(n + s - i.topRight, a + i.topRight, i.topRight, 0, -Ot, !0), e.lineTo(n + i.topLeft, a);
}
const hr = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, fr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function gr(e, t) {
  const n = ("" + e).match(hr);
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
const pr = (e) => +e || 0;
function Ya(e, t) {
  const n = {}, a = xt(t), s = a ? Object.keys(t) : t, o = xt(e) ? a ? (i) => pt(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of s)
    n[i] = pr(o(i));
  return n;
}
function Jo(e) {
  return Ya(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ge(e) {
  return Ya(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ae(e) {
  const t = Jo(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Ht(e, t) {
  e = e || {}, t = t || Ft.font;
  let n = pt(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let a = pt(e.style, t.style);
  a && !("" + a).match(fr) && (console.warn('Invalid font style specified: "' + a + '"'), a = void 0);
  const s = {
    family: pt(e.family, t.family),
    lineHeight: gr(pt(e.lineHeight, t.lineHeight), n),
    size: n,
    style: a,
    weight: pt(e.weight, t.weight),
    string: ""
  };
  return s.string = ir(s), s;
}
function Ln(e, t, n, a) {
  let s, o, i;
  for (s = 0, o = e.length; s < o; ++s)
    if (i = e[s], i !== void 0 && i !== void 0)
      return i;
}
function mr(e, t, n) {
  const { min: a, max: s } = e, o = Wo(t, (s - a) / 2), i = (l, c) => n && l === 0 ? 0 : l + c;
  return {
    min: i(a, -Math.abs(o)),
    max: i(s, o)
  };
}
function Ye(e, t) {
  return Object.assign(Object.create(e), t);
}
function Ka(e, t = [
  ""
], n, a, s = () => e[0]) {
  const o = n || e;
  typeof a > "u" && (a = ai("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: a,
    _getTarget: s,
    override: (l) => Ka([
      l,
      ...e
    ], t, o, a)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(l, c) {
      return delete l[c], delete l._keys, delete e[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(l, c) {
      return ei(l, c, () => Cr(c, t, e, l));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(l, c) {
      return Reflect.getOwnPropertyDescriptor(l._scopes[0], c);
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
    has(l, c) {
      return ws(l).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(l) {
      return ws(l);
    },
    /**
    * A trap for setting property values.
    */
    set(l, c, d) {
      const u = l._storage || (l._storage = s());
      return l[c] = u[c] = d, delete l._keys, !0;
    }
  });
}
function Qe(e, t, n, a) {
  const s = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ti(e, a),
    setContext: (o) => Qe(e, o, n, a),
    override: (o) => Qe(e.override(o), t, n, a)
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
      return ei(o, i, () => vr(o, i, l));
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
function ti(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: a = t.indexable, _allKeys: s = t.allKeys } = e;
  return {
    allKeys: s,
    scriptable: n,
    indexable: a,
    isScriptable: Te(n) ? n : () => n,
    isIndexable: Te(a) ? a : () => a
  };
}
const br = (e, t) => e ? e + Oa(t) : t, Ua = (e, t) => xt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ei(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const a = n();
  return e[t] = a, a;
}
function vr(e, t, n) {
  const { _proxy: a, _context: s, _subProxy: o, _descriptors: i } = e;
  let l = a[t];
  return Te(l) && i.isScriptable(t) && (l = yr(t, l, e, n)), Rt(l) && l.length && (l = _r(t, l, e, i.isIndexable)), Ua(t, l) && (l = Qe(l, s, o && o[t], i)), l;
}
function yr(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _stack: l } = n;
  if (l.has(e))
    throw new Error("Recursion detected: " + Array.from(l).join("->") + "->" + e);
  l.add(e);
  let c = t(o, i || a);
  return l.delete(e), Ua(e, c) && (c = qa(s._scopes, s, e, c)), c;
}
function _r(e, t, n, a) {
  const { _proxy: s, _context: o, _subProxy: i, _descriptors: l } = n;
  if (typeof o.index < "u" && a(e))
    return t[o.index % t.length];
  if (xt(t[0])) {
    const c = t, d = s._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = qa(d, s, e, u);
      t.push(Qe(h, o, i && i[e], l));
    }
  }
  return t;
}
function ni(e, t, n) {
  return Te(e) ? e(t, n) : e;
}
const xr = (e, t) => e === !0 ? t : typeof e == "string" ? We(t, e) : void 0;
function kr(e, t, n, a, s) {
  for (const o of t) {
    const i = xr(n, o);
    if (i) {
      e.add(i);
      const l = ni(i._fallback, n, s);
      if (typeof l < "u" && l !== n && l !== a)
        return l;
    } else if (i === !1 && typeof a < "u" && n !== a)
      return null;
  }
  return !1;
}
function qa(e, t, n, a) {
  const s = t._rootScopes, o = ni(t._fallback, n, a), i = [
    ...e,
    ...s
  ], l = /* @__PURE__ */ new Set();
  l.add(a);
  let c = ks(l, i, n, o || n, a);
  return c === null || typeof o < "u" && o !== n && (c = ks(l, i, o, c, a), c === null) ? !1 : Ka(Array.from(l), [
    ""
  ], s, o, () => wr(t, n, a));
}
function ks(e, t, n, a, s) {
  for (; n; )
    n = kr(e, t, n, a, s);
  return n;
}
function wr(e, t, n) {
  const a = e._getTarget();
  t in a || (a[t] = {});
  const s = a[t];
  return Rt(s) && xt(n) ? n : s || {};
}
function Cr(e, t, n, a) {
  let s;
  for (const o of t)
    if (s = ai(br(o, e), n), typeof s < "u")
      return Ua(e, s) ? qa(n, a, e, s) : s;
}
function ai(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const a = n[e];
    if (typeof a < "u")
      return a;
  }
}
function ws(e) {
  let t = e._keys;
  return t || (t = e._keys = $r(e._scopes)), t;
}
function $r(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const a of Object.keys(n).filter((s) => !s.startsWith("_")))
      t.add(a);
  return Array.from(t);
}
const Sr = Number.EPSILON || 1e-14, Je = (e, t) => t < e.length && !e[t].skip && e[t], si = (e) => e === "x" ? "y" : "x";
function Mr(e, t, n, a) {
  const s = e.skip ? t : e, o = t, i = n.skip ? t : n, l = Ma(o, s), c = Ma(i, o);
  let d = l / (l + c), u = c / (l + c);
  d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
  const h = a * d, p = a * u;
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
function Dr(e, t, n) {
  const a = e.length;
  let s, o, i, l, c, d = Je(e, 0);
  for (let u = 0; u < a - 1; ++u)
    if (c = d, d = Je(e, u + 1), !(!c || !d)) {
      if (pn(t[u], 0, Sr)) {
        n[u] = n[u + 1] = 0;
        continue;
      }
      s = n[u] / t[u], o = n[u + 1] / t[u], l = Math.pow(s, 2) + Math.pow(o, 2), !(l <= 9) && (i = 3 / Math.sqrt(l), n[u] = s * i * t[u], n[u + 1] = o * i * t[u]);
    }
}
function Ar(e, t, n = "x") {
  const a = si(n), s = e.length;
  let o, i, l, c = Je(e, 0);
  for (let d = 0; d < s; ++d) {
    if (i = l, l = c, c = Je(e, d + 1), !l)
      continue;
    const u = l[n], h = l[a];
    i && (o = (u - i[n]) / 3, l[`cp1${n}`] = u - o, l[`cp1${a}`] = h - o * t[d]), c && (o = (c[n] - u) / 3, l[`cp2${n}`] = u + o, l[`cp2${a}`] = h + o * t[d]);
  }
}
function Tr(e, t = "x") {
  const n = si(t), a = e.length, s = Array(a).fill(0), o = Array(a);
  let i, l, c, d = Je(e, 0);
  for (i = 0; i < a; ++i)
    if (l = c, c = d, d = Je(e, i + 1), !!c) {
      if (d) {
        const u = d[t] - c[t];
        s[i] = u !== 0 ? (d[n] - c[n]) / u : 0;
      }
      o[i] = l ? d ? ue(s[i - 1]) !== ue(s[i]) ? 0 : (s[i - 1] + s[i]) / 2 : s[i - 1] : s[i];
    }
  Dr(e, s, o), Ar(e, o, t);
}
function Fn(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Br(e, t) {
  let n, a, s, o, i, l = Cn(e[0], t);
  for (n = 0, a = e.length; n < a; ++n)
    i = o, o = l, l = n < a - 1 && Cn(e[n + 1], t), o && (s = e[n], i && (s.cp1x = Fn(s.cp1x, t.left, t.right), s.cp1y = Fn(s.cp1y, t.top, t.bottom)), l && (s.cp2x = Fn(s.cp2x, t.left, t.right), s.cp2y = Fn(s.cp2y, t.top, t.bottom)));
}
function Lr(e, t, n, a, s) {
  let o, i, l, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Tr(e, s);
  else {
    let d = a ? e[e.length - 1] : e[0];
    for (o = 0, i = e.length; o < i; ++o)
      l = e[o], c = Mr(d, l, e[Math.min(o + 1, i - (a ? 0 : 1)) % i], t.tension), l.cp1x = c.previous.x, l.cp1y = c.previous.y, l.cp2x = c.next.x, l.cp2y = c.next.y, d = l;
  }
  t.capBezierPoints && Br(e, n);
}
function Xa() {
  return typeof window < "u" && typeof document < "u";
}
function Ga(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Qn(e, t, n) {
  let a;
  return typeof e == "string" ? (a = parseInt(e, 10), e.indexOf("%") !== -1 && (a = a / 100 * t.parentNode[n])) : a = e, a;
}
const ea = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Fr(e, t) {
  return ea(e).getPropertyValue(t);
}
const Pr = [
  "top",
  "right",
  "bottom",
  "left"
];
function je(e, t, n) {
  const a = {};
  n = n ? "-" + n : "";
  for (let s = 0; s < 4; s++) {
    const o = Pr[s];
    a[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return a.width = a.left + a.right, a.height = a.top + a.bottom, a;
}
const Er = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Ir(e, t) {
  const n = e.touches, a = n && n.length ? n[0] : e, { offsetX: s, offsetY: o } = a;
  let i = !1, l, c;
  if (Er(s, o, e.target))
    l = s, c = o;
  else {
    const d = t.getBoundingClientRect();
    l = a.clientX - d.left, c = a.clientY - d.top, i = !0;
  }
  return {
    x: l,
    y: c,
    box: i
  };
}
function Ve(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: a } = t, s = ea(n), o = s.boxSizing === "border-box", i = je(s, "padding"), l = je(s, "border", "width"), { x: c, y: d, box: u } = Ir(e, n), h = i.left + (u && l.left), p = i.top + (u && l.top);
  let { width: _, height: f } = t;
  return o && (_ -= i.width + l.width, f -= i.height + l.height), {
    x: Math.round((c - h) / _ * n.width / a),
    y: Math.round((d - p) / f * n.height / a)
  };
}
function Rr(e, t, n) {
  let a, s;
  if (t === void 0 || n === void 0) {
    const o = e && Ga(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const i = o.getBoundingClientRect(), l = ea(o), c = je(l, "border", "width"), d = je(l, "padding");
      t = i.width - d.width - c.width, n = i.height - d.height - c.height, a = Qn(l.maxWidth, o, "clientWidth"), s = Qn(l.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: a || Gn,
    maxHeight: s || Gn
  };
}
const Se = (e) => Math.round(e * 10) / 10;
function Or(e, t, n, a) {
  const s = ea(e), o = je(s, "margin"), i = Qn(s.maxWidth, e, "clientWidth") || Gn, l = Qn(s.maxHeight, e, "clientHeight") || Gn, c = Rr(e, t, n);
  let { width: d, height: u } = c;
  if (s.boxSizing === "content-box") {
    const p = je(s, "border", "width"), _ = je(s, "padding");
    d -= _.width + p.width, u -= _.height + p.height;
  }
  return d = Math.max(0, d - o.width), u = Math.max(0, a ? d / a : u - o.height), d = Se(Math.min(d, i, c.maxWidth)), u = Se(Math.min(u, l, c.maxHeight)), d && !u && (u = Se(d / 2)), (t !== void 0 || n !== void 0) && a && c.height && u > c.height && (u = c.height, d = Se(Math.floor(u * a))), {
    width: d,
    height: u
  };
}
function Cs(e, t, n) {
  const a = t || 1, s = Se(e.height * a), o = Se(e.width * a);
  e.height = Se(e.height), e.width = Se(e.width);
  const i = e.canvas;
  return i.style && (n || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== a || i.height !== s || i.width !== o ? (e.currentDevicePixelRatio = a, i.height = s, i.width = o, e.ctx.setTransform(a, 0, 0, a, 0, 0), !0) : !1;
}
const Vr = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    Xa() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function $s(e, t) {
  const n = Fr(e, t), a = n && n.match(/^(\d+)(\.\d+)?px$/);
  return a ? +a[1] : void 0;
}
function ze(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function zr(e, t, n, a) {
  return {
    x: e.x + n * (t.x - e.x),
    y: a === "middle" ? n < 0.5 ? e.y : t.y : a === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Nr(e, t, n, a) {
  const s = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, i = ze(e, s, n), l = ze(s, o, n), c = ze(o, t, n), d = ze(i, l, n), u = ze(l, c, n);
  return ze(d, u, n);
}
const jr = function(e, t) {
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
}, Wr = function() {
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
function Ze(e, t, n) {
  return e ? jr(t, n) : Wr();
}
function oi(e, t) {
  let n, a;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, a = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = a);
}
function ii(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function li(e) {
  return e === "angle" ? {
    between: wn,
    compare: jl,
    normalize: oe
  } : {
    between: $e,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Ss({ start: e, end: t, count: n, loop: a, style: s }) {
  return {
    start: e % n,
    end: t % n,
    loop: a && (t - e + 1) % n === 0,
    style: s
  };
}
function Hr(e, t, n) {
  const { property: a, start: s, end: o } = n, { between: i, normalize: l } = li(a), c = t.length;
  let { start: d, end: u, loop: h } = e, p, _;
  if (h) {
    for (d += c, u += c, p = 0, _ = c; p < _ && i(l(t[d % c][a]), s, o); ++p)
      d--, u--;
    d %= c, u %= c;
  }
  return u < d && (u += c), {
    start: d,
    end: u,
    loop: h,
    style: e.style
  };
}
function Yr(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: a, start: s, end: o } = n, i = t.length, { compare: l, between: c, normalize: d } = li(a), { start: u, end: h, loop: p, style: _ } = Hr(e, t, n), f = [];
  let v = !1, x = null, m, g, y;
  const w = () => c(s, y, m) && l(s, y) !== 0, S = () => l(o, m) === 0 || c(o, y, m), D = () => v || w(), C = () => !v || S();
  for (let $ = u, B = u; $ <= h; ++$)
    g = t[$ % i], !g.skip && (m = d(g[a]), m !== y && (v = c(m, s, o), x === null && D() && (x = l(m, s) === 0 ? $ : B), x !== null && C() && (f.push(Ss({
      start: x,
      end: $,
      loop: p,
      count: i,
      style: _
    })), x = null), B = $, y = m));
  return x !== null && f.push(Ss({
    start: x,
    end: h,
    loop: p,
    count: i,
    style: _
  })), f;
}
function Kr(e, t) {
  const n = [], a = e.segments;
  for (let s = 0; s < a.length; s++) {
    const o = Yr(a[s], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function Ur(e, t, n, a) {
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
function qr(e, t, n, a) {
  const s = e.length, o = [];
  let i = t, l = e[t], c;
  for (c = t + 1; c <= n; ++c) {
    const d = e[c % s];
    d.skip || d.stop ? l.skip || (a = !1, o.push({
      start: t % s,
      end: (c - 1) % s,
      loop: a
    }), t = i = d.stop ? c : null) : (i = c, l.skip && (t = c)), l = d;
  }
  return i !== null && o.push({
    start: t % s,
    end: i % s,
    loop: a
  }), o;
}
function Xr(e, t) {
  const n = e.points, a = e.options.spanGaps, s = n.length;
  if (!s)
    return [];
  const o = !!e._loop, { start: i, end: l } = Ur(n, s, o, a);
  if (a === !0)
    return Ms(e, [
      {
        start: i,
        end: l,
        loop: o
      }
    ], n, t);
  const c = l < i ? l + s : l, d = !!e._fullLoop && i === 0 && l === s - 1;
  return Ms(e, qr(n, i, c, d), n, t);
}
function Ms(e, t, n, a) {
  return !a || !a.setContext || !n ? t : Gr(e, t, n, a);
}
function Gr(e, t, n, a) {
  const s = e._chart.getContext(), o = Ds(e.options), { _datasetIndex: i, options: { spanGaps: l } } = e, c = n.length, d = [];
  let u = o, h = t[0].start, p = h;
  function _(f, v, x, m) {
    const g = l ? -1 : 1;
    if (f !== v) {
      for (f += c; n[f % c].skip; )
        f -= g;
      for (; n[v % c].skip; )
        v += g;
      f % c !== v % c && (d.push({
        start: f % c,
        end: v % c,
        loop: x,
        style: m
      }), u = m, h = v % c);
    }
  }
  for (const f of t) {
    h = l ? h : f.start;
    let v = n[h % c], x;
    for (p = h + 1; p <= f.end; p++) {
      const m = n[p % c];
      x = Ds(a.setContext(Ye(s, {
        type: "segment",
        p0: v,
        p1: m,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: i
      }))), Zr(x, u) && _(h, p - 1, f.loop, u), v = m, u = x;
    }
    h < p - 1 && _(h, p - 1, f.loop, u);
  }
  return d;
}
function Ds(e) {
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
function Zr(e, t) {
  if (!t)
    return !1;
  const n = [], a = function(s, o) {
    return Na(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, a) !== JSON.stringify(t, a);
}
function Pn(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Qr(e, t) {
  const { xScale: n, yScale: a } = e;
  return n && a ? {
    left: Pn(n, t, "left"),
    right: Pn(n, t, "right"),
    top: Pn(a, t, "top"),
    bottom: Pn(a, t, "bottom")
  } : t;
}
function Jr(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const a = Qr(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : a.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : a.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : a.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : a.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
class tc {
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
    this._request || (this._running = !0, this._request = Xo.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((a, s) => {
      if (!a.running || !a.items.length)
        return;
      const o = a.items;
      let i = o.length - 1, l = !1, c;
      for (; i >= 0; --i)
        c = o[i], c._active ? (c._total > a.duration && (a.duration = c._total), c.tick(t), l = !0) : (o[i] = o[o.length - 1], o.pop());
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
var pe = /* @__PURE__ */ new tc();
const As = "transparent", ec = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const a = vs(e || As), s = a.valid && vs(t || As);
    return s && s.valid ? s.mix(a, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class nc {
  constructor(t, n, a, s) {
    const o = n[a];
    s = Ln([
      t.to,
      s,
      o,
      t.from
    ]);
    const i = Ln([
      t.from,
      o,
      s
    ]);
    this._active = !0, this._fn = t.fn || ec[t.type || typeof i], this._easing = mn[t.easing] || mn.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = a, this._from = i, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, a) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = a - this._start, i = this._duration - o;
      this._start = a, this._duration = Math.floor(Math.max(i, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Ln([
        t.to,
        n,
        s,
        t.from
      ]), this._from = Ln([
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
    let c;
    if (this._active = o !== l && (i || n < a), !this._active) {
      this._target[s] = l, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[s] = o;
      return;
    }
    c = n / a % 2, c = i && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[s] = this._fn(o, l, c);
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
class ri {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!xt(t))
      return;
    const n = Object.keys(Ft.animation), a = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const o = t[s];
      if (!xt(o))
        return;
      const i = {};
      for (const l of n)
        i[l] = o[l];
      (Rt(o.properties) && o.properties || [
        s
      ]).forEach((l) => {
        (l === s || !a.has(l)) && a.set(l, i);
      });
    });
  }
  _animateOptions(t, n) {
    const a = n.options, s = sc(t, a);
    if (!s)
      return [];
    const o = this._createAnimations(s, a);
    return a.$shared && ac(t.options.$animations, a).then(() => {
      t.options = a;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const a = this._properties, s = [], o = t.$animations || (t.$animations = {}), i = Object.keys(n), l = Date.now();
    let c;
    for (c = i.length - 1; c >= 0; --c) {
      const d = i[c];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        s.push(...this._animateOptions(t, n));
        continue;
      }
      const u = n[d];
      let h = o[d];
      const p = a.get(d);
      if (h)
        if (p && h.active()) {
          h.update(p, u, l);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        t[d] = u;
        continue;
      }
      o[d] = h = new nc(p, t, d, u), s.push(h);
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
      return pe.add(this._chart, a), !0;
  }
}
function ac(e, t) {
  const n = [], a = Object.keys(t);
  for (let s = 0; s < a.length; s++) {
    const o = e[a[s]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function sc(e, t) {
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
function Ts(e, t) {
  const n = e && e.options || {}, a = n.reverse, s = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: a ? o : s,
    end: a ? s : o
  };
}
function oc(e, t, n) {
  if (n === !1)
    return !1;
  const a = Ts(e, n), s = Ts(t, n);
  return {
    top: s.end,
    right: a.end,
    bottom: s.start,
    left: a.start
  };
}
function ic(e) {
  let t, n, a, s;
  return xt(e) ? (t = e.top, n = e.right, a = e.bottom, s = e.left) : t = n = a = s = e, {
    top: t,
    right: n,
    bottom: a,
    left: s,
    disabled: e === !1
  };
}
function ci(e, t) {
  const n = [], a = e._getSortedDatasetMetas(t);
  let s, o;
  for (s = 0, o = a.length; s < o; ++s)
    n.push(a[s].index);
  return n;
}
function Bs(e, t, n, a = {}) {
  const s = e.keys, o = a.mode === "single";
  let i, l, c, d;
  if (t === null)
    return;
  let u = !1;
  for (i = 0, l = s.length; i < l; ++i) {
    if (c = +s[i], c === n) {
      if (u = !0, a.all)
        continue;
      break;
    }
    d = e.values[c], ne(d) && (o || t === 0 || ue(t) === ue(d)) && (t += d);
  }
  return !u && !a.all ? 0 : t;
}
function lc(e, t) {
  const { iScale: n, vScale: a } = t, s = n.axis === "x" ? "x" : "y", o = a.axis === "x" ? "x" : "y", i = Object.keys(e), l = new Array(i.length);
  let c, d, u;
  for (c = 0, d = i.length; c < d; ++c)
    u = i[c], l[c] = {
      [s]: u,
      [o]: e[u]
    };
  return l;
}
function da(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function rc(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function cc(e) {
  const { min: t, max: n, minDefined: a, maxDefined: s } = e.getUserBounds();
  return {
    min: a ? t : Number.NEGATIVE_INFINITY,
    max: s ? n : Number.POSITIVE_INFINITY
  };
}
function dc(e, t, n) {
  const a = e[t] || (e[t] = {});
  return a[n] || (a[n] = {});
}
function Ls(e, t, n, a) {
  for (const s of t.getMatchingVisibleMetas(a).reverse()) {
    const o = e[s.index];
    if (n && o > 0 || !n && o < 0)
      return s.index;
  }
  return null;
}
function Fs(e, t) {
  const { chart: n, _cachedMeta: a } = e, s = n._stacks || (n._stacks = {}), { iScale: o, vScale: i, index: l } = a, c = o.axis, d = i.axis, u = rc(o, i, a), h = t.length;
  let p;
  for (let _ = 0; _ < h; ++_) {
    const f = t[_], { [c]: v, [d]: x } = f, m = f._stacks || (f._stacks = {});
    p = m[d] = dc(s, u, v), p[l] = x, p._top = Ls(p, i, !0, a.type), p._bottom = Ls(p, i, !1, a.type);
    const g = p._visualValues || (p._visualValues = {});
    g[l] = x;
  }
}
function ua(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((a) => n[a].axis === t).shift();
}
function uc(e, t) {
  return Ye(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function hc(e, t, n) {
  return Ye(e, {
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
function en(e, t) {
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
const ha = (e) => e === "reset" || e === "none", Ps = (e, t) => t ? e : Object.assign({}, e), fc = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: ci(n, !0),
  values: null
};
class na {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = da(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && en(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, a = this.getDataset(), s = (h, p, _, f) => h === "x" ? p : h === "r" ? f : _, o = n.xAxisID = pt(a.xAxisID, ua(t, "x")), i = n.yAxisID = pt(a.yAxisID, ua(t, "y")), l = n.rAxisID = pt(a.rAxisID, ua(t, "r")), c = n.indexAxis, d = n.iAxisID = s(c, o, i, l), u = n.vAxisID = s(c, i, o, l);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(i), n.rScale = this.getScaleForId(l), n.iScale = this.getScaleForId(d), n.vScale = this.getScaleForId(u);
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
    this._data && ps(this._data, this), t._stacked && en(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), a = this._data;
    if (xt(n)) {
      const s = this._cachedMeta;
      this._data = lc(n, s);
    } else if (a !== n) {
      if (a) {
        ps(a, this);
        const s = this._cachedMeta;
        en(s), s._parsed = [];
      }
      n && Object.isExtensible(n) && Kl(n, this), this._syncList = [], this._data = n;
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
    n._stacked = da(n.vScale, n), n.stack !== a.stack && (s = !0, en(n), n.stack = a.stack), this._resyncElements(t), (s || o !== n._stacked) && (Fs(this, n._parsed), n._stacked = da(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), a = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(a, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: a, _data: s } = this, { iScale: o, _stacked: i } = a, l = o.axis;
    let c = t === 0 && n === s.length ? !0 : a._sorted, d = t > 0 && a._parsed[t - 1], u, h, p;
    if (this._parsing === !1)
      a._parsed = s, a._sorted = !0, p = s;
    else {
      Rt(s[t]) ? p = this.parseArrayData(a, s, t, n) : xt(s[t]) ? p = this.parseObjectData(a, s, t, n) : p = this.parsePrimitiveData(a, s, t, n);
      const _ = () => h[l] === null || d && h[l] < d[l];
      for (u = 0; u < n; ++u)
        a._parsed[u + t] = h = p[u], c && (_() && (c = !1), d = h);
      a._sorted = c;
    }
    i && Fs(this, p);
  }
  parsePrimitiveData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, l = o.axis, c = i.axis, d = o.getLabels(), u = o === i, h = new Array(s);
    let p, _, f;
    for (p = 0, _ = s; p < _; ++p)
      f = p + a, h[p] = {
        [l]: u || o.parse(d[f], f),
        [c]: i.parse(n[f], f)
      };
    return h;
  }
  parseArrayData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, l = new Array(s);
    let c, d, u, h;
    for (c = 0, d = s; c < d; ++c)
      u = c + a, h = n[u], l[c] = {
        x: o.parse(h[0], u),
        y: i.parse(h[1], u)
      };
    return l;
  }
  parseObjectData(t, n, a, s) {
    const { xScale: o, yScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(s);
    let u, h, p, _;
    for (u = 0, h = s; u < h; ++u)
      p = u + a, _ = n[p], d[u] = {
        x: o.parse(We(_, l), p),
        y: i.parse(We(_, c), p)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, a) {
    const s = this.chart, o = this._cachedMeta, i = n[t.axis], l = {
      keys: ci(s, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Bs(l, i, o.index, {
      mode: a
    });
  }
  updateRangeFromParsed(t, n, a, s) {
    const o = a[n.axis];
    let i = o === null ? NaN : o;
    const l = s && a._stacks[n.axis];
    s && l && (s.values = l, i = Bs(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, n) {
    const a = this._cachedMeta, s = a._parsed, o = a._sorted && t === a.iScale, i = s.length, l = this._getOtherScale(t), c = fc(n, a, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = cc(l);
    let p, _;
    function f() {
      _ = s[p];
      const v = _[l.axis];
      return !ne(_[t.axis]) || u > v || h < v;
    }
    for (p = 0; p < i && !(!f() && (this.updateRangeFromParsed(d, t, _, c), o)); ++p)
      ;
    if (o) {
      for (p = i - 1; p >= 0; --p)
        if (!f()) {
          this.updateRangeFromParsed(d, t, _, c);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, a = [];
    let s, o, i;
    for (s = 0, o = n.length; s < o; ++s)
      i = n[s][t.axis], ne(i) && a.push(i);
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
    this.update(t || "default"), n._clip = ic(pt(this.options.clip, oc(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, a = this._cachedMeta, s = a.data || [], o = n.chartArea, i = [], l = this._drawStart || 0, c = this._drawCount || s.length - l, d = this.options.drawActiveElementsOnTop;
    let u;
    for (a.dataset && a.dataset.draw(t, o, l, c), u = l; u < l + c; ++u) {
      const h = s[u];
      h.hidden || (h.active && d ? i.push(h) : h.draw(t, o));
    }
    for (u = 0; u < i.length; ++u)
      i[u].draw(t, o);
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
      o = i.$context || (i.$context = hc(this.getContext(), t, i)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = uc(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = a, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", a) {
    const s = n === "active", o = this._cachedDataOpts, i = t + "-" + n, l = o[i], c = this.enableOptionSharing && xn(a);
    if (l)
      return Ps(l, c);
    const d = this.chart.config, u = d.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], p = d.getOptionScopes(this.getDataset(), u), _ = Object.keys(Ft.elements[t]), f = () => this.getContext(a, s, n), v = d.resolveNamedOptions(p, _, f, h);
    return v.$shared && (v.$shared = c, o[i] = Object.freeze(Ps(v, c))), v;
  }
  _resolveAnimations(t, n, a) {
    const s = this.chart, o = this._cachedDataOpts, i = `animation-${n}`, l = o[i];
    if (l)
      return l;
    let c;
    if (s.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, n), p = u.getOptionScopes(this.getDataset(), h);
      c = u.createResolver(p, this.getContext(t, a, n));
    }
    const d = new ri(s, c && c.animations);
    return c && c._cacheable && (o[i] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || ha(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const a = this.resolveDataElementOptions(t, n), s = this._sharedOptions, o = this.getSharedOptions(a), i = this.includeOptions(n, o) || o !== s;
    return this.updateSharedOptions(o, n, a), {
      sharedOptions: o,
      includeOptions: i
    };
  }
  updateElement(t, n, a, s) {
    ha(s) ? Object.assign(t, a) : this._resolveAnimations(n, s).update(t, a);
  }
  updateSharedOptions(t, n, a) {
    t && !ha(n) && this._resolveAnimations(void 0, n).update(t, a);
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
    for (const [l, c, d] of this._syncList)
      this[l](c, d);
    this._syncList = [];
    const s = a.length, o = n.length, i = Math.min(o, s);
    i && this.parse(0, i), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(t, n, a = !0) {
    const s = this._cachedMeta, o = s.data, i = t + n;
    let l;
    const c = (d) => {
      for (d.length += n, l = d.length - 1; l >= i; l--)
        d[l] = d[l - n];
    };
    for (c(o), l = t; l < i; ++l)
      o[l] = new this.dataElementType();
    this._parsing && c(s._parsed), this.parse(t, n), a && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, a, s) {
  }
  _removeElements(t, n) {
    const a = this._cachedMeta;
    if (this._parsing) {
      const s = a._parsed.splice(t, n);
      a._stacked && en(a, s);
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
function gc(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let a = [];
    for (let s = 0, o = n.length; s < o; s++)
      a = a.concat(n[s].controller.getAllParsedValues(e));
    e._cache.$bar = qo(a.sort((s, o) => s - o));
  }
  return e._cache.$bar;
}
function pc(e) {
  const t = e.iScale, n = gc(t, e.type);
  let a = t._length, s, o, i, l;
  const c = () => {
    i === 32767 || i === -32768 || (xn(l) && (a = Math.min(a, Math.abs(i - l) || a)), l = i);
  };
  for (s = 0, o = n.length; s < o; ++s)
    i = t.getPixelForValue(n[s]), c();
  for (l = void 0, s = 0, o = t.ticks.length; s < o; ++s)
    i = t.getPixelForTick(s), c();
  return a;
}
function mc(e, t, n, a) {
  const s = n.barThickness;
  let o, i;
  return wt(s) ? (o = t.min * n.categoryPercentage, i = n.barPercentage) : (o = s * a, i = 1), {
    chunk: o / a,
    ratio: i,
    start: t.pixels[e] - o / 2
  };
}
function bc(e, t, n, a) {
  const s = t.pixels, o = s[e];
  let i = e > 0 ? s[e - 1] : null, l = e < s.length - 1 ? s[e + 1] : null;
  const c = n.categoryPercentage;
  i === null && (i = o - (l === null ? t.end - t.start : l - o)), l === null && (l = o + o - i);
  const d = o - (o - Math.min(i, l)) / 2 * c;
  return {
    chunk: Math.abs(l - i) / 2 * c / a,
    ratio: n.barPercentage,
    start: d
  };
}
function vc(e, t, n, a) {
  const s = n.parse(e[0], a), o = n.parse(e[1], a), i = Math.min(s, o), l = Math.max(s, o);
  let c = i, d = l;
  Math.abs(i) > Math.abs(l) && (c = l, d = i), t[n.axis] = d, t._custom = {
    barStart: c,
    barEnd: d,
    start: s,
    end: o,
    min: i,
    max: l
  };
}
function di(e, t, n, a) {
  return Rt(e) ? vc(e, t, n, a) : t[n.axis] = n.parse(e, a), t;
}
function Es(e, t, n, a) {
  const s = e.iScale, o = e.vScale, i = s.getLabels(), l = s === o, c = [];
  let d, u, h, p;
  for (d = n, u = n + a; d < u; ++d)
    p = t[d], h = {}, h[s.axis] = l || s.parse(i[d], d), c.push(di(p, h, o, d));
  return c;
}
function fa(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function yc(e, t, n) {
  return e !== 0 ? ue(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function _c(e) {
  let t, n, a, s, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", a = "right") : (t = e.base < e.y, n = "bottom", a = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: n,
    end: a,
    reverse: t,
    top: s,
    bottom: o
  };
}
function xc(e, t, n, a) {
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
  const { start: i, end: l, reverse: c, top: d, bottom: u } = _c(e);
  s === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === a ? s = d : (n._bottom || 0) === a ? s = u : (o[Is(u, i, l, c)] = !0, s = d)), o[Is(s, i, l, c)] = !0, e.borderSkipped = o;
}
function Is(e, t, n, a) {
  return a ? (e = kc(e, t, n), e = Rs(e, n, t)) : e = Rs(e, t, n), e;
}
function kc(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function Rs(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function wc(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Cc extends na {
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
    return Es(t, n, a, s);
  }
  parseArrayData(t, n, a, s) {
    return Es(t, n, a, s);
  }
  parseObjectData(t, n, a, s) {
    const { iScale: o, vScale: i } = t, { xAxisKey: l = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? l : c, u = i.axis === "x" ? l : c, h = [];
    let p, _, f, v;
    for (p = a, _ = a + s; p < _; ++p)
      v = n[p], f = {}, f[o.axis] = o.parse(We(v, d), p), h.push(di(We(v, u), f, i, p));
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
    const n = this._cachedMeta, { iScale: a, vScale: s } = n, o = this.getParsed(t), i = o._custom, l = fa(i) ? "[" + i.start + ", " + i.end + "]" : "" + s.getLabelForValue(o[s.axis]);
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
    const o = s === "reset", { index: i, _cachedMeta: { vScale: l } } = this, c = l.getBasePixel(), d = l.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(n, s);
    for (let _ = n; _ < n + a; _++) {
      const f = this.getParsed(_), v = o || wt(f[l.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(_), x = this._calculateBarIndexPixels(_, u), m = (f._stacks || {})[l.axis], g = {
        horizontal: d,
        base: v.base,
        enableBorderRadius: !m || fa(f._custom) || i === m._top || i === m._bottom,
        x: d ? v.head : x.center,
        y: d ? x.center : v.head,
        height: d ? x.size : Math.abs(v.size),
        width: d ? Math.abs(v.size) : x.size
      };
      p && (g.options = h || this.resolveDataElementOptions(_, t[_].active ? "active" : s));
      const y = g.options || t[_].options;
      xc(g, y, m, i), wc(g, y, u.ratio), this.updateElement(t[_], _, g, s);
    }
  }
  _getStacks(t, n) {
    const { iScale: a } = this._cachedMeta, s = a.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), o = a.options.stacked, i = [], l = this._cachedMeta.controller.getParsed(n), c = l && l[a.axis], d = (u) => {
      const h = u._parsed.find((_) => _[a.axis] === c), p = h && h[u.vScale.axis];
      if (wt(p) || isNaN(p))
        return !0;
    };
    for (const u of s)
      if (!(n !== void 0 && d(u)) && ((o === !1 || i.indexOf(u.stack) === -1 || o === void 0 && u.stack === void 0) && i.push(u.stack), u.index === t))
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
      t[pt(this.chart.options.indexAxis === "x" ? a.xAxisID : a.yAxisID, n)] = !0;
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
      min: l || pc(n),
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
    const { _cachedMeta: { vScale: n, _stacked: a, index: s }, options: { base: o, minBarLength: i } } = this, l = o || 0, c = this.getParsed(t), d = c._custom, u = fa(d);
    let h = c[n.axis], p = 0, _ = a ? this.applyStack(n, c, a) : h, f, v;
    _ !== h && (p = _ - h, _ = h), u && (h = d.barStart, _ = d.barEnd - d.barStart, h !== 0 && ue(h) !== ue(d.barEnd) && (p = 0), p += h);
    const x = !wt(o) && !u ? o : p;
    let m = n.getPixelForValue(x);
    if (this.chart.getDataVisibility(t) ? f = n.getPixelForValue(p + _) : f = m, v = f - m, Math.abs(v) < i) {
      v = yc(v, n, l) * i, h === l && (m -= v / 2);
      const g = n.getPixelForDecimal(0), y = n.getPixelForDecimal(1), w = Math.min(g, y), S = Math.max(g, y);
      m = Math.max(Math.min(m, S), w), f = m + v, a && !u && (c._stacks[n.axis]._visualValues[s] = n.getValueForPixel(f) - n.getValueForPixel(m));
    }
    if (m === n.getPixelForValue(l)) {
      const g = ue(v) * n.getLineWidthForValue(l) / 2;
      m += g, v -= g;
    }
    return {
      size: v,
      base: m,
      head: f,
      center: f + v / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const a = n.scale, s = this.options, o = s.skipNull, i = pt(s.maxBarThickness, 1 / 0);
    let l, c;
    const d = this._getAxisCount();
    if (n.grouped) {
      const u = o ? this._getStackCount(t) : n.stackCount, h = s.barThickness === "flex" ? bc(t, n, s, u * d) : mc(t, n, s, u * d), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, _ = this._getAxis().indexOf(pt(p, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + _;
      l = h.start + h.chunk * f + h.chunk / 2, c = Math.min(i, h.chunk * h.ratio);
    } else
      l = a.getPixelForValue(this.getParsed(t)[a.axis], t), c = Math.min(i, n.min * n.ratio);
    return {
      base: l - c / 2,
      head: l + c / 2,
      center: l,
      size: c
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, a = t.data, s = a.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[n.axis] !== null && !a[o].hidden && a[o].draw(this._ctx);
  }
}
function $c(e, t, n) {
  let a = 1, s = 1, o = 0, i = 0;
  if (t < Bt) {
    const l = e, c = l + t, d = Math.cos(l), u = Math.sin(l), h = Math.cos(c), p = Math.sin(c), _ = (y, w, S) => wn(y, l, c, !0) ? 1 : Math.max(w, w * n, S, S * n), f = (y, w, S) => wn(y, l, c, !0) ? -1 : Math.min(w, w * n, S, S * n), v = _(0, d, h), x = _(Ot, u, p), m = f($t, d, h), g = f($t + Ot, u, p);
    a = (v - m) / 2, s = (x - g) / 2, o = -(v + m) / 2, i = -(x + g) / 2;
  }
  return {
    ratioX: a,
    ratioY: s,
    offsetX: o,
    offsetY: i
  };
}
class Sc extends na {
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
            return n.labels.length && n.datasets.length ? n.labels.map((c, d) => {
              const h = t.getDatasetMeta(0).controller.getStyle(d);
              return {
                text: c,
                fillStyle: h.backgroundColor,
                fontColor: o,
                hidden: !t.getDataVisibility(d),
                lineDash: h.borderDash,
                lineDashOffset: h.borderDashOffset,
                lineJoin: h.borderJoinStyle,
                lineWidth: h.borderWidth,
                strokeStyle: h.borderColor,
                textAlign: s,
                pointStyle: a,
                borderRadius: i && (l || h.borderRadius),
                index: d
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
      let o = (c) => +a[c];
      if (xt(a[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +We(a[d], c);
      }
      let i, l;
      for (i = t, l = t + n; i < l; ++i)
        s._parsed[i] = o(i);
    }
  }
  _getRotation() {
    return ve(this.options.rotation - 90);
  }
  _getCircumference() {
    return ve(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Bt, n = -Bt;
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
    const n = this.chart, { chartArea: a } = n, s = this._cachedMeta, o = s.data, i = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, l = Math.max((Math.min(a.width, a.height) - i) / 2, 0), c = Math.min(Al(this.options.cutout, l), 1), d = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: _, offsetX: f, offsetY: v } = $c(h, u, c), x = (a.width - i) / p, m = (a.height - i) / _, g = Math.max(Math.min(x, m) / 2, 0), y = Wo(this.options.radius, g), w = Math.max(y * c, 0), S = (y - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * y, this.offsetY = v * y, s.total = this.calculateTotal(), this.outerRadius = y - S * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - S * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const a = this.options, s = this._cachedMeta, o = this._getCircumference();
    return n && a.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / Bt);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", i = this.chart, l = i.chartArea, d = i.options.animation, u = (l.left + l.right) / 2, h = (l.top + l.bottom) / 2, p = o && d.animateScale, _ = p ? 0 : this.innerRadius, f = p ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: x } = this._getSharedOptions(n, s);
    let m = this._getRotation(), g;
    for (g = 0; g < n; ++g)
      m += this._circumference(g, o);
    for (g = n; g < n + a; ++g) {
      const y = this._circumference(g, o), w = t[g], S = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: m,
        endAngle: m + y,
        circumference: y,
        outerRadius: f,
        innerRadius: _
      };
      x && (S.options = v || this.resolveDataElementOptions(g, w.active ? "active" : s)), m += y, this.updateElement(w, g, S, s);
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
    return n > 0 && !isNaN(t) ? Bt * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, a = this.chart, s = a.data.labels || [], o = ja(n._parsed[t], a.options.locale);
    return {
      label: s[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const a = this.chart;
    let s, o, i, l, c;
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
      c = l.resolveDataElementOptions(s), c.borderAlign !== "inner" && (n = Math.max(n, c.borderWidth || 0, c.hoverBorderWidth || 0));
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
    return Math.max(pt(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class Mc extends na {
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
    let { start: l, count: c } = Xl(n, s, i);
    this._drawStart = l, this._drawCount = c, Gl(n) && (l = 0, c = s.length), a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!o._decimated, a.points = s;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(a, void 0, {
      animated: !i,
      options: d
    }, t), this.updateElements(s, l, c, t);
  }
  updateElements(t, n, a, s) {
    const o = s === "reset", { iScale: i, vScale: l, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: u, includeOptions: h } = this._getSharedOptions(n, s), p = i.axis, _ = l.axis, { spanGaps: f, segment: v } = this.options, x = kn(f) ? f : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || o || s === "none", g = n + a, y = t.length;
    let w = n > 0 && this.getParsed(n - 1);
    for (let S = 0; S < y; ++S) {
      const D = t[S], C = m ? D : {};
      if (S < n || S >= g) {
        C.skip = !0;
        continue;
      }
      const $ = this.getParsed(S), B = wt($[_]), T = C[p] = i.getPixelForValue($[p], S), L = C[_] = o || B ? l.getBasePixel() : l.getPixelForValue(c ? this.applyStack(l, $, c) : $[_], S);
      C.skip = isNaN(T) || isNaN(L) || B, C.stop = S > 0 && Math.abs($[p] - w[p]) > x, v && (C.parsed = $, C.raw = d.data[S]), h && (C.options = u || this.resolveDataElementOptions(S, D.active ? "active" : s)), m || this.updateElement(D, S, C, s), w = $;
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
class Dc extends Sc {
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
class Za {
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
    Object.assign(Za.prototype, t);
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
var Ac = {
  _date: Za
};
function Tc(e, t, n, a) {
  const { controller: s, data: o, _sorted: i } = e, l = s._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (l && t === l.axis && t !== "r" && i && o.length) {
    const d = l._reversePixels ? Hl : Ne;
    if (a) {
      if (s._sharedOptions) {
        const u = o[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const p = d(o, t, n - h), _ = d(o, t, n + h);
          return {
            lo: p.lo,
            hi: _.hi
          };
        }
      }
    } else {
      const u = d(o, t, n);
      if (c) {
        const { vScale: h } = s._cachedMeta, { _parsed: p } = e, _ = p.slice(0, u.lo + 1).reverse().findIndex((v) => !wt(v[h.axis]));
        u.lo -= Math.max(0, _);
        const f = p.slice(u.hi).findIndex((v) => !wt(v[h.axis]));
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
function aa(e, t, n, a, s) {
  const o = e.getSortedVisibleDatasetMetas(), i = n[t];
  for (let l = 0, c = o.length; l < c; ++l) {
    const { index: d, data: u } = o[l], { lo: h, hi: p } = Tc(o[l], t, i, s);
    for (let _ = h; _ <= p; ++_) {
      const f = u[_];
      f.skip || a(f, d, _);
    }
  }
}
function Bc(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(a, s) {
    const o = t ? Math.abs(a.x - s.x) : 0, i = n ? Math.abs(a.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(i, 2));
  };
}
function ga(e, t, n, a, s) {
  const o = [];
  return !s && !e.isPointInArea(t) || aa(e, n, t, function(l, c, d) {
    !s && !Cn(l, e.chartArea, 0) || l.inRange(t.x, t.y, a) && o.push({
      element: l,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function Lc(e, t, n, a) {
  let s = [];
  function o(i, l, c) {
    const { startAngle: d, endAngle: u } = i.getProps([
      "startAngle",
      "endAngle"
    ], a), { angle: h } = Ko(i, {
      x: t.x,
      y: t.y
    });
    wn(h, d, u) && s.push({
      element: i,
      datasetIndex: l,
      index: c
    });
  }
  return aa(e, n, t, o), s;
}
function Fc(e, t, n, a, s, o) {
  let i = [];
  const l = Bc(n);
  let c = Number.POSITIVE_INFINITY;
  function d(u, h, p) {
    const _ = u.inRange(t.x, t.y, s);
    if (a && !_)
      return;
    const f = u.getCenterPoint(s);
    if (!(!!o || e.isPointInArea(f)) && !_)
      return;
    const x = l(t, f);
    x < c ? (i = [
      {
        element: u,
        datasetIndex: h,
        index: p
      }
    ], c = x) : x === c && i.push({
      element: u,
      datasetIndex: h,
      index: p
    });
  }
  return aa(e, n, t, d), i;
}
function pa(e, t, n, a, s, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !a ? Lc(e, t, n, s) : Fc(e, t, n, a, s, o);
}
function Os(e, t, n, a, s) {
  const o = [], i = n === "x" ? "inXRange" : "inYRange";
  let l = !1;
  return aa(e, n, t, (c, d, u) => {
    c[i] && c[i](t[n], s) && (o.push({
      element: c,
      datasetIndex: d,
      index: u
    }), l = l || c.inRange(t.x, t.y, s));
  }), a && !l ? [] : o;
}
var Pc = {
  modes: {
    index(e, t, n, a) {
      const s = Ve(t, e), o = n.axis || "x", i = n.includeInvisible || !1, l = n.intersect ? ga(e, s, o, a, i) : pa(e, s, o, !1, a, i), c = [];
      return l.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const u = l[0].index, h = d.data[u];
        h && !h.skip && c.push({
          element: h,
          datasetIndex: d.index,
          index: u
        });
      }), c) : [];
    },
    dataset(e, t, n, a) {
      const s = Ve(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      let l = n.intersect ? ga(e, s, o, a, i) : pa(e, s, o, !1, a, i);
      if (l.length > 0) {
        const c = l[0].datasetIndex, d = e.getDatasetMeta(c).data;
        l = [];
        for (let u = 0; u < d.length; ++u)
          l.push({
            element: d[u],
            datasetIndex: c,
            index: u
          });
      }
      return l;
    },
    point(e, t, n, a) {
      const s = Ve(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return ga(e, s, o, a, i);
    },
    nearest(e, t, n, a) {
      const s = Ve(t, e), o = n.axis || "xy", i = n.includeInvisible || !1;
      return pa(e, s, o, n.intersect, a, i);
    },
    x(e, t, n, a) {
      const s = Ve(t, e);
      return Os(e, s, "x", n.intersect, a);
    },
    y(e, t, n, a) {
      const s = Ve(t, e);
      return Os(e, s, "y", n.intersect, a);
    }
  }
};
const ui = [
  "left",
  "top",
  "right",
  "bottom"
];
function nn(e, t) {
  return e.filter((n) => n.pos === t);
}
function Vs(e, t) {
  return e.filter((n) => ui.indexOf(n.pos) === -1 && n.box.axis === t);
}
function an(e, t) {
  return e.sort((n, a) => {
    const s = t ? a : n, o = t ? n : a;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function Ec(e) {
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
function Ic(e) {
  const t = {};
  for (const n of e) {
    const { stack: a, pos: s, stackWeight: o } = n;
    if (!a || !ui.includes(s))
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
function Rc(e, t) {
  const n = Ic(e), { vBoxMaxWidth: a, hBoxMaxHeight: s } = t;
  let o, i, l;
  for (o = 0, i = e.length; o < i; ++o) {
    l = e[o];
    const { fullSize: c } = l.box, d = n[l.stack], u = d && l.stackWeight / d.weight;
    l.horizontal ? (l.width = u ? u * a : c && t.availableWidth, l.height = s) : (l.width = a, l.height = u ? u * s : c && t.availableHeight);
  }
  return n;
}
function Oc(e) {
  const t = Ec(e), n = an(t.filter((d) => d.box.fullSize), !0), a = an(nn(t, "left"), !0), s = an(nn(t, "right")), o = an(nn(t, "top"), !0), i = an(nn(t, "bottom")), l = Vs(t, "x"), c = Vs(t, "y");
  return {
    fullSize: n,
    leftAndTop: a.concat(o),
    rightAndBottom: s.concat(c).concat(i).concat(l),
    chartArea: nn(t, "chartArea"),
    vertical: a.concat(s).concat(c),
    horizontal: o.concat(i).concat(l)
  };
}
function zs(e, t, n, a) {
  return Math.max(e[n], t[n]) + Math.max(e[a], t[a]);
}
function hi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Vc(e, t, n, a) {
  const { pos: s, box: o } = n, i = e.maxPadding;
  if (!xt(s)) {
    n.size && (e[s] -= n.size);
    const h = a[n.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, n.horizontal ? o.height : o.width), n.size = h.size / h.count, e[s] += n.size;
  }
  o.getPadding && hi(i, o.getPadding());
  const l = Math.max(0, t.outerWidth - zs(i, e, "left", "right")), c = Math.max(0, t.outerHeight - zs(i, e, "top", "bottom")), d = l !== e.w, u = c !== e.h;
  return e.w = l, e.h = c, n.horizontal ? {
    same: d,
    other: u
  } : {
    same: u,
    other: d
  };
}
function zc(e) {
  const t = e.maxPadding;
  function n(a) {
    const s = Math.max(t[a] - e[a], 0);
    return e[a] += s, s;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Nc(e, t) {
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
function un(e, t, n, a) {
  const s = [];
  let o, i, l, c, d, u;
  for (o = 0, i = e.length, d = 0; o < i; ++o) {
    l = e[o], c = l.box, c.update(l.width || t.w, l.height || t.h, Nc(l.horizontal, t));
    const { same: h, other: p } = Vc(t, n, l, a);
    d |= h && s.length, u = u || p, c.fullSize || s.push(l);
  }
  return d && un(s, t, n, a) || u;
}
function En(e, t, n, a, s) {
  e.top = n, e.left = t, e.right = t + a, e.bottom = n + s, e.width = a, e.height = s;
}
function Ns(e, t, n, a) {
  const s = n.padding;
  let { x: o, y: i } = t;
  for (const l of e) {
    const c = l.box, d = a[l.stack] || {
      placed: 0,
      weight: 1
    }, u = l.stackWeight / d.weight || 1;
    if (l.horizontal) {
      const h = t.w * u, p = d.size || c.height;
      xn(d.start) && (i = d.start), c.fullSize ? En(c, s.left, i, n.outerWidth - s.right - s.left, p) : En(c, t.left + d.placed, i, h, p), d.start = i, d.placed += h, i = c.bottom;
    } else {
      const h = t.h * u, p = d.size || c.width;
      xn(d.start) && (o = d.start), c.fullSize ? En(c, o, s.top, p, n.outerHeight - s.bottom - s.top) : En(c, o, t.top + d.placed, p, h), d.start = o, d.placed += h, o = c.right;
    }
  }
  t.x = o, t.y = i;
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
    const s = ae(e.options.layout.padding), o = Math.max(t - s.width, 0), i = Math.max(n - s.height, 0), l = Oc(e.boxes), c = l.vertical, d = l.horizontal;
    Ct(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const u = c.reduce((v, x) => x.box.options && x.box.options.display === !1 ? v : v + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: s,
      availableWidth: o,
      availableHeight: i,
      vBoxMaxWidth: o / 2 / u,
      hBoxMaxHeight: i / 2
    }), p = Object.assign({}, s);
    hi(p, ae(a));
    const _ = Object.assign({
      maxPadding: p,
      w: o,
      h: i,
      x: s.left,
      y: s.top
    }, s), f = Rc(c.concat(d), h);
    un(l.fullSize, _, h, f), un(c, _, h, f), un(d, _, h, f) && un(c, _, h, f), zc(_), Ns(l.leftAndTop, _, h, f), _.x += _.w, _.y += _.h, Ns(l.rightAndBottom, _, h, f), e.chartArea = {
      left: _.left,
      top: _.top,
      right: _.left + _.w,
      bottom: _.top + _.h,
      height: _.h,
      width: _.w
    }, Ct(l.chartArea, (v) => {
      const x = v.box;
      Object.assign(x, e.chartArea), x.update(_.w, _.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class fi {
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
class jc extends fi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Wn = "$chartjs", Wc = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, js = (e) => e === null || e === "";
function Hc(e, t) {
  const n = e.style, a = e.getAttribute("height"), s = e.getAttribute("width");
  if (e[Wn] = {
    initial: {
      height: a,
      width: s,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", js(s)) {
    const o = $s(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (js(a))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = $s(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const gi = Vr ? {
  passive: !0
} : !1;
function Yc(e, t, n) {
  e && e.addEventListener(t, n, gi);
}
function Kc(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, gi);
}
function Uc(e, t) {
  const n = Wc[e.type] || e.type, { x: a, y: s } = Ve(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: a !== void 0 ? a : null,
    y: s !== void 0 ? s : null
  };
}
function Jn(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function qc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || Jn(l.addedNodes, a), i = i && !Jn(l.removedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Xc(e, t, n) {
  const a = e.canvas, s = new MutationObserver((o) => {
    let i = !1;
    for (const l of o)
      i = i || Jn(l.removedNodes, a), i = i && !Jn(l.addedNodes, a);
    i && n();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const Sn = /* @__PURE__ */ new Map();
let Ws = 0;
function pi() {
  const e = window.devicePixelRatio;
  e !== Ws && (Ws = e, Sn.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function Gc(e, t) {
  Sn.size || window.addEventListener("resize", pi), Sn.set(e, t);
}
function Zc(e) {
  Sn.delete(e), Sn.size || window.removeEventListener("resize", pi);
}
function Qc(e, t, n) {
  const a = e.canvas, s = a && Ga(a);
  if (!s)
    return;
  const o = Go((l, c) => {
    const d = s.clientWidth;
    n(l, c), d < s.clientWidth && n();
  }, window), i = new ResizeObserver((l) => {
    const c = l[0], d = c.contentRect.width, u = c.contentRect.height;
    d === 0 && u === 0 || o(d, u);
  });
  return i.observe(s), Gc(e, o), i;
}
function ma(e, t, n) {
  n && n.disconnect(), t === "resize" && Zc(e);
}
function Jc(e, t, n) {
  const a = e.canvas, s = Go((o) => {
    e.ctx !== null && n(Uc(o, e));
  }, e);
  return Yc(a, t, s), s;
}
class td extends fi {
  acquireContext(t, n) {
    const a = t && t.getContext && t.getContext("2d");
    return a && a.canvas === t ? (Hc(t, n), a) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Wn])
      return !1;
    const a = n[Wn].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const i = a[o];
      wt(i) ? n.removeAttribute(o) : n.setAttribute(o, i);
    });
    const s = a.style || {};
    return Object.keys(s).forEach((o) => {
      n.style[o] = s[o];
    }), n.width = n.width, delete n[Wn], !0;
  }
  addEventListener(t, n, a) {
    this.removeEventListener(t, n);
    const s = t.$proxies || (t.$proxies = {}), i = {
      attach: qc,
      detach: Xc,
      resize: Qc
    }[n] || Jc;
    s[n] = i(t, n, a);
  }
  removeEventListener(t, n) {
    const a = t.$proxies || (t.$proxies = {}), s = a[n];
    if (!s)
      return;
    ({
      attach: ma,
      detach: ma,
      resize: ma
    }[n] || Kc)(t, n, s), a[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, a, s) {
    return Or(t, n, a, s);
  }
  isAttached(t) {
    const n = t && Ga(t);
    return !!(n && n.isConnected);
  }
}
function ed(e) {
  return !Xa() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? jc : td;
}
let ye = class {
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
    return kn(this.x) && kn(this.y);
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
function nd(e, t) {
  const n = e.options.ticks, a = ad(e), s = Math.min(n.maxTicksLimit || a, a), o = n.major.enabled ? od(t) : [], i = o.length, l = o[0], c = o[i - 1], d = [];
  if (i > s)
    return id(t, d, o, i / s), d;
  const u = sd(o, t, s);
  if (i > 0) {
    let h, p;
    const _ = i > 1 ? Math.round((c - l) / (i - 1)) : null;
    for (In(t, d, u, wt(_) ? 0 : l - _, l), h = 0, p = i - 1; h < p; h++)
      In(t, d, u, o[h], o[h + 1]);
    return In(t, d, u, c, wt(_) ? t.length : c + _), d;
  }
  return In(t, d, u), d;
}
function ad(e) {
  const t = e.options.offset, n = e._tickSize(), a = e._length / n + (t ? 0 : 1), s = e._maxLength / n;
  return Math.floor(Math.min(a, s));
}
function sd(e, t, n) {
  const a = ld(e), s = t.length / n;
  if (!a)
    return Math.max(s, 1);
  const o = Rl(a);
  for (let i = 0, l = o.length - 1; i < l; i++) {
    const c = o[i];
    if (c > s)
      return c;
  }
  return Math.max(s, 1);
}
function od(e) {
  const t = [];
  let n, a;
  for (n = 0, a = e.length; n < a; n++)
    e[n].major && t.push(n);
  return t;
}
function id(e, t, n, a) {
  let s = 0, o = n[0], i;
  for (a = Math.ceil(a), i = 0; i < e.length; i++)
    i === o && (t.push(e[i]), s++, o = n[s * a]);
}
function In(e, t, n, a, s) {
  const o = pt(a, 0), i = Math.min(pt(s, e.length), e.length);
  let l = 0, c, d, u;
  for (n = Math.ceil(n), s && (c = s - a, n = c / Math.floor(c / n)), u = o; u < 0; )
    l++, u = Math.round(o + l * n);
  for (d = Math.max(o, 0); d < i; d++)
    d === u && (t.push(e[d]), l++, u = Math.round(o + l * n));
}
function ld(e) {
  const t = e.length;
  let n, a;
  if (t < 2)
    return !1;
  for (a = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== a)
      return !1;
  return a;
}
const rd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, Hs = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Ys = (e, t) => Math.min(t || e, e);
function Ks(e, t) {
  const n = [], a = e.length / t, s = e.length;
  let o = 0;
  for (; o < s; o += a)
    n.push(e[Math.floor(o)]);
  return n;
}
function cd(e, t, n) {
  const a = e.ticks.length, s = Math.min(t, a - 1), o = e._startPixel, i = e._endPixel, l = 1e-6;
  let c = e.getPixelForTick(s), d;
  if (!(n && (a === 1 ? d = Math.max(c - o, i - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(s - 1)) / 2, c += s < t ? d : -d, c < o - l || c > i + l)))
    return c;
}
function dd(e, t) {
  Ct(e, (n) => {
    const a = n.gc, s = a.length / 2;
    let o;
    if (s > t) {
      for (o = 0; o < s; ++o)
        delete n.data[a[o]];
      a.splice(0, s);
    }
  });
}
function sn(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Us(e, t) {
  if (!e.display)
    return 0;
  const n = Ht(e.font, t), a = ae(e.padding);
  return (Rt(e.text) ? e.text.length : 1) * n.lineHeight + a.height;
}
function ud(e, t) {
  return Ye(e, {
    scale: t,
    type: "scale"
  });
}
function hd(e, t, n) {
  return Ye(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function fd(e, t, n) {
  let a = za(e);
  return (n && t !== "right" || !n && t === "right") && (a = rd(a)), a;
}
function gd(e, t, n, a) {
  const { top: s, left: o, bottom: i, right: l, chart: c } = e, { chartArea: d, scales: u } = c;
  let h = 0, p, _, f;
  const v = i - s, x = l - o;
  if (e.isHorizontal()) {
    if (_ = jt(a, o, l), xt(n)) {
      const m = Object.keys(n)[0], g = n[m];
      f = u[m].getPixelForValue(g) + v - t;
    } else n === "center" ? f = (d.bottom + d.top) / 2 + v - t : f = Hs(e, n, t);
    p = l - o;
  } else {
    if (xt(n)) {
      const m = Object.keys(n)[0], g = n[m];
      _ = u[m].getPixelForValue(g) - x + t;
    } else n === "center" ? _ = (d.left + d.right) / 2 - x + t : _ = Hs(e, n, t);
    f = jt(a, i, s), h = n === "left" ? -Ot : Ot;
  }
  return {
    titleX: _,
    titleY: f,
    maxWidth: p,
    rotation: h
  };
}
class tn extends ye {
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
    return t = re(t, Number.POSITIVE_INFINITY), n = re(n, Number.NEGATIVE_INFINITY), a = re(a, Number.POSITIVE_INFINITY), s = re(s, Number.NEGATIVE_INFINITY), {
      min: re(t, a),
      max: re(n, s),
      minDefined: ne(t),
      maxDefined: ne(n)
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
    for (let c = 0, d = l.length; c < d; ++c)
      i = l[c].controller.getMinMax(this, t), s || (n = Math.min(n, i.min)), o || (a = Math.max(a, i.max));
    return n = o && n > a ? a : n, a = s && n > a ? n : a, {
      min: re(n, re(a, n)),
      max: re(a, re(n, a))
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
    const { beginAtZero: s, grace: o, ticks: i } = this.options, l = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = a = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, a), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + a.left + a.right : this.height + a.top + a.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = mr(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = l < this.ticks.length;
    this._convertTicksToLabels(c ? Ks(this.ticks, l) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = nd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    let a, s, o;
    for (a = 0, s = t.length; a < s; a++)
      o = t[a], o.label = Dt(n.callback, [
        o.value,
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
    const t = this.options, n = t.ticks, a = Ys(this.ticks.length, t.ticks.maxTicksLimit), s = n.minRotation || 0, o = n.maxRotation;
    let i = s, l, c, d;
    if (!this._isVisible() || !n.display || s >= o || a <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, p = u.highest.height, _ = Wt(this.chart.width - h, 0, this.maxWidth);
    l = t.offset ? this.maxWidth / a : _ / (a - 1), h + 6 > l && (l = _ / (a - (t.offset ? 0.5 : 1)), c = this.maxHeight - sn(t.grid) - n.padding - Us(t.title, this.chart.options.font), d = Math.sqrt(h * h + p * p), i = Nl(Math.min(Math.asin(Wt((u.highest.height + 6) / l, -1, 1)), Math.asin(Wt(c / d, -1, 1)) - Math.asin(Wt(p / d, -1, 1)))), i = Math.max(s, Math.min(o, i))), this.labelRotation = i;
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
    }, { chart: n, options: { ticks: a, title: s, grid: o } } = this, i = this._isVisible(), l = this.isHorizontal();
    if (i) {
      const c = Us(s, n.options.font);
      if (l ? (t.width = this.maxWidth, t.height = sn(o) + c) : (t.height = this.maxHeight, t.width = sn(o) + c), a.display && this.ticks.length) {
        const { first: d, last: u, widest: h, highest: p } = this._getLabelSizes(), _ = a.padding * 2, f = ve(this.labelRotation), v = Math.cos(f), x = Math.sin(f);
        if (l) {
          const m = a.mirror ? 0 : x * h.width + v * p.height;
          t.height = Math.min(this.maxHeight, t.height + m + _);
        } else {
          const m = a.mirror ? 0 : v * h.width + x * p.height;
          t.width = Math.min(this.maxWidth, t.width + m + _);
        }
        this._calculatePadding(d, u, x, v);
      }
    }
    this._handleMargins(), l ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, a, s) {
    const { ticks: { align: o, padding: i }, position: l } = this.options, c = this.labelRotation !== 0, d = l !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, _ = 0;
      c ? d ? (p = s * t.width, _ = a * n.height) : (p = a * t.height, _ = s * n.width) : o === "start" ? _ = n.width : o === "end" ? p = t.width : o !== "inner" && (p = t.width / 2, _ = n.width / 2), this.paddingLeft = Math.max((p - u + i) * this.width / (this.width - u), 0), this.paddingRight = Math.max((_ - h + i) * this.width / (this.width - h), 0);
    } else {
      let u = n.height / 2, h = t.height / 2;
      o === "start" ? (u = 0, h = t.height) : o === "end" && (u = n.height, h = 0), this.paddingTop = u + i, this.paddingBottom = h + i;
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
      wt(t[n].label) && (t.splice(n, 1), a--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let a = this.ticks;
      n < a.length && (a = Ks(a, n)), this._labelSizes = t = this._computeLabelSizes(a, a.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, a) {
    const { ctx: s, _longestTextCache: o } = this, i = [], l = [], c = Math.floor(n / Ys(n, a));
    let d = 0, u = 0, h, p, _, f, v, x, m, g, y, w, S;
    for (h = 0; h < n; h += c) {
      if (f = t[h].label, v = this._resolveTickFontOptions(h), s.font = x = v.string, m = o[x] = o[x] || {
        data: {},
        gc: []
      }, g = v.lineHeight, y = w = 0, !wt(f) && !Rt(f))
        y = _s(s, m.data, m.gc, y, f), w = g;
      else if (Rt(f))
        for (p = 0, _ = f.length; p < _; ++p)
          S = f[p], !wt(S) && !Rt(S) && (y = _s(s, m.data, m.gc, y, S), w += g);
      i.push(y), l.push(w), d = Math.max(y, d), u = Math.max(w, u);
    }
    dd(o, n);
    const D = i.indexOf(d), C = l.indexOf(u), $ = (B) => ({
      width: i[B] || 0,
      height: l[B] || 0
    });
    return {
      first: $(0),
      last: $(n - 1),
      widest: $(D),
      highest: $(C),
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
    return Wl(this._alignToPixels ? Ie(this.chart, n, 0) : n);
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
      return a.$context || (a.$context = hd(this.getContext(), t, a));
    }
    return this.$context || (this.$context = ud(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = ve(this.labelRotation), a = Math.abs(Math.cos(n)), s = Math.abs(Math.sin(n)), o = this._getLabelSizes(), i = t.autoSkipPadding || 0, l = o ? o.widest.width + i : 0, c = o ? o.highest.height + i : 0;
    return this.isHorizontal() ? c * a > l * s ? l / a : c / s : c * s < l * a ? c / a : l / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, a = this.chart, s = this.options, { grid: o, position: i, border: l } = s, c = o.offset, d = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), p = sn(o), _ = [], f = l.setContext(this.getContext()), v = f.display ? f.width : 0, x = v / 2, m = function(N) {
      return Ie(a, N, v);
    };
    let g, y, w, S, D, C, $, B, T, L, E, I;
    if (i === "top")
      g = m(this.bottom), C = this.bottom - p, B = g - x, L = m(t.top) + x, I = t.bottom;
    else if (i === "bottom")
      g = m(this.top), L = t.top, I = m(t.bottom) - x, C = g + x, B = this.top + p;
    else if (i === "left")
      g = m(this.right), D = this.right - p, $ = g - x, T = m(t.left) + x, E = t.right;
    else if (i === "right")
      g = m(this.left), T = t.left, E = m(t.right) - x, D = g + x, $ = this.left + p;
    else if (n === "x") {
      if (i === "center")
        g = m((t.top + t.bottom) / 2 + 0.5);
      else if (xt(i)) {
        const N = Object.keys(i)[0], tt = i[N];
        g = m(this.chart.scales[N].getPixelForValue(tt));
      }
      L = t.top, I = t.bottom, C = g + x, B = C + p;
    } else if (n === "y") {
      if (i === "center")
        g = m((t.left + t.right) / 2);
      else if (xt(i)) {
        const N = Object.keys(i)[0], tt = i[N];
        g = m(this.chart.scales[N].getPixelForValue(tt));
      }
      D = g - x, $ = D - p, T = t.left, E = t.right;
    }
    const W = pt(s.ticks.maxTicksLimit, h), K = Math.max(1, Math.ceil(h / W));
    for (y = 0; y < h; y += K) {
      const N = this.getContext(y), tt = o.setContext(N), et = l.setContext(N), ct = tt.lineWidth, q = tt.color, nt = et.dash || [], at = et.dashOffset, yt = tt.tickWidth, lt = tt.tickColor, Et = tt.tickBorderDash || [], At = tt.tickBorderDashOffset;
      w = cd(this, y, c), w !== void 0 && (S = Ie(a, w, ct), d ? D = $ = T = E = S : C = B = L = I = S, _.push({
        tx1: D,
        ty1: C,
        tx2: $,
        ty2: B,
        x1: T,
        y1: L,
        x2: E,
        y2: I,
        width: ct,
        color: q,
        borderDash: nt,
        borderDashOffset: at,
        tickWidth: yt,
        tickColor: lt,
        tickBorderDash: Et,
        tickBorderDashOffset: At
      }));
    }
    return this._ticksLength = h, this._borderValue = g, _;
  }
  _computeLabelItems(t) {
    const n = this.axis, a = this.options, { position: s, ticks: o } = a, i = this.isHorizontal(), l = this.ticks, { align: c, crossAlign: d, padding: u, mirror: h } = o, p = sn(a.grid), _ = p + u, f = h ? -u : _, v = -ve(this.labelRotation), x = [];
    let m, g, y, w, S, D, C, $, B, T, L, E, I = "middle";
    if (s === "top")
      D = this.bottom - f, C = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      D = this.top + f, C = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const K = this._getYAxisLabelAlignment(p);
      C = K.textAlign, S = K.x;
    } else if (s === "right") {
      const K = this._getYAxisLabelAlignment(p);
      C = K.textAlign, S = K.x;
    } else if (n === "x") {
      if (s === "center")
        D = (t.top + t.bottom) / 2 + _;
      else if (xt(s)) {
        const K = Object.keys(s)[0], N = s[K];
        D = this.chart.scales[K].getPixelForValue(N) + _;
      }
      C = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (s === "center")
        S = (t.left + t.right) / 2 - _;
      else if (xt(s)) {
        const K = Object.keys(s)[0], N = s[K];
        S = this.chart.scales[K].getPixelForValue(N);
      }
      C = this._getYAxisLabelAlignment(p).textAlign;
    }
    n === "y" && (c === "start" ? I = "top" : c === "end" && (I = "bottom"));
    const W = this._getLabelSizes();
    for (m = 0, g = l.length; m < g; ++m) {
      y = l[m], w = y.label;
      const K = o.setContext(this.getContext(m));
      $ = this.getPixelForTick(m) + o.labelOffset, B = this._resolveTickFontOptions(m), T = B.lineHeight, L = Rt(w) ? w.length : 1;
      const N = L / 2, tt = K.color, et = K.textStrokeColor, ct = K.textStrokeWidth;
      let q = C;
      i ? (S = $, C === "inner" && (m === g - 1 ? q = this.options.reverse ? "left" : "right" : m === 0 ? q = this.options.reverse ? "right" : "left" : q = "center"), s === "top" ? d === "near" || v !== 0 ? E = -L * T + T / 2 : d === "center" ? E = -W.highest.height / 2 - N * T + T : E = -W.highest.height + T / 2 : d === "near" || v !== 0 ? E = T / 2 : d === "center" ? E = W.highest.height / 2 - N * T : E = W.highest.height - L * T, h && (E *= -1), v !== 0 && !K.showLabelBackdrop && (S += T / 2 * Math.sin(v))) : (D = $, E = (1 - L) * T / 2);
      let nt;
      if (K.showLabelBackdrop) {
        const at = ae(K.backdropPadding), yt = W.heights[m], lt = W.widths[m];
        let Et = E - at.top, At = 0 - at.left;
        switch (I) {
          case "middle":
            Et -= yt / 2;
            break;
          case "bottom":
            Et -= yt;
            break;
        }
        switch (C) {
          case "center":
            At -= lt / 2;
            break;
          case "right":
            At -= lt;
            break;
          case "inner":
            m === g - 1 ? At -= lt : m > 0 && (At -= lt / 2);
            break;
        }
        nt = {
          left: At,
          top: Et,
          width: lt + at.width,
          height: yt + at.height,
          color: K.backdropColor
        };
      }
      x.push({
        label: w,
        font: B,
        textOffset: E,
        options: {
          rotation: v,
          color: tt,
          strokeColor: et,
          strokeWidth: ct,
          textAlign: q,
          textBaseline: I,
          translation: [
            S,
            D
          ],
          backdrop: nt
        }
      });
    }
    return x;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-ve(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return n.align === "start" ? s = "left" : n.align === "end" ? s = "right" : n.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: a, mirror: s, padding: o } } = this.options, i = this._getLabelSizes(), l = t + o, c = i.widest.width;
    let d, u;
    return n === "left" ? s ? (u = this.right + o, a === "near" ? d = "left" : a === "center" ? (d = "center", u += c / 2) : (d = "right", u += c)) : (u = this.right - l, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= c / 2) : (d = "left", u = this.left)) : n === "right" ? s ? (u = this.left + o, a === "near" ? d = "right" : a === "center" ? (d = "center", u -= c / 2) : (d = "left", u -= c)) : (u = this.left + l, a === "near" ? d = "left" : a === "center" ? (d = "center", u += c / 2) : (d = "right", u = this.right)) : d = "right", {
      textAlign: d,
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
    const l = (c, d, u) => {
      !u.width || !u.color || (a.save(), a.lineWidth = u.width, a.strokeStyle = u.color, a.setLineDash(u.borderDash || []), a.lineDashOffset = u.borderDashOffset, a.beginPath(), a.moveTo(c.x, c.y), a.lineTo(d.x, d.y), a.stroke(), a.restore());
    };
    if (n.display)
      for (o = 0, i = s.length; o < i; ++o) {
        const c = s[o];
        n.drawOnChartArea && l({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), n.drawTicks && l({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: a, grid: s } } = this, o = a.setContext(this.getContext()), i = a.display ? o.width : 0;
    if (!i)
      return;
    const l = s.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let d, u, h, p;
    this.isHorizontal() ? (d = Ie(t, this.left, i) - i / 2, u = Ie(t, this.right, l) + l / 2, h = p = c) : (h = Ie(t, this.top, i) - i / 2, p = Ie(t, this.bottom, l) + l / 2, d = u = c), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, h), n.lineTo(u, p), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const a = this.ctx, s = this._computeLabelArea();
    s && Wa(a, s);
    const o = this.getLabelItems(t);
    for (const i of o) {
      const l = i.options, c = i.font, d = i.label, u = i.textOffset;
      $n(a, d, 0, u, c, l);
    }
    s && Ha(a);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: a, reverse: s } } = this;
    if (!a.display)
      return;
    const o = Ht(a.font), i = ae(a.padding), l = a.align;
    let c = o.lineHeight / 2;
    n === "bottom" || n === "center" || xt(n) ? (c += i.bottom, Rt(a.text) && (c += o.lineHeight * (a.text.length - 1))) : c += i.top;
    const { titleX: d, titleY: u, maxWidth: h, rotation: p } = gd(this, c, n, l);
    $n(t, a.text, 0, 0, o, {
      color: a.color,
      maxWidth: h,
      rotation: p,
      textAlign: fd(l, n, s),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, a = pt(t.grid && t.grid.z, -1), s = pt(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== tn.prototype.draw ? [
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
    return Ht(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Rn {
  constructor(t, n, a) {
    this.type = t, this.scope = n, this.override = a, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let a;
    bd(n) && (a = this.register(n));
    const s = this.items, o = t.id, i = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in s || (s[o] = t, pd(t, i, a), this.override && Ft.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, a = t.id, s = this.scope;
    a in n && delete n[a], s && a in Ft[s] && (delete Ft[s][a], this.override && delete He[a]);
  }
}
function pd(e, t, n) {
  const a = _n(/* @__PURE__ */ Object.create(null), [
    n ? Ft.get(n) : {},
    Ft.get(t),
    e.defaults
  ]);
  Ft.set(t, a), e.defaultRoutes && md(t, e.defaultRoutes), e.descriptors && Ft.describe(t, e.descriptors);
}
function md(e, t) {
  Object.keys(t).forEach((n) => {
    const a = n.split("."), s = a.pop(), o = [
      e
    ].concat(a).join("."), i = t[n].split("."), l = i.pop(), c = i.join(".");
    Ft.route(o, s, c, l);
  });
}
function bd(e) {
  return "id" in e && "defaults" in e;
}
class vd {
  constructor() {
    this.controllers = new Rn(na, "datasets", !0), this.elements = new Rn(ye, "elements"), this.plugins = new Rn(Object, "plugins"), this.scales = new Rn(tn, "scales"), this._typedRegistries = [
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
      a || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : Ct(s, (i) => {
        const l = a || this._getRegistryForType(i);
        this._exec(t, l, i);
      });
    });
  }
  _exec(t, n, a) {
    const s = Oa(t);
    Dt(a["before" + s], [], a), n[t](a), Dt(a["after" + s], [], a);
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
var de = /* @__PURE__ */ new vd();
class yd {
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
      const i = o.plugin, l = i[a], c = [
        n,
        s,
        o.options
      ];
      if (Dt(l, c, i) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    wt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const a = t && t.config, s = pt(a.options && a.options.plugins, {}), o = _d(a);
    return s === !1 && !n ? [] : kd(t, o, s, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], a = this._cache, s = (o, i) => o.filter((l) => !i.some((c) => l.plugin.id === c.plugin.id));
    this._notify(s(n, a), t, "stop"), this._notify(s(a, n), t, "start");
  }
}
function _d(e) {
  const t = {}, n = [], a = Object.keys(de.plugins.items);
  for (let o = 0; o < a.length; o++)
    n.push(de.getPlugin(a[o]));
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
function xd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function kd(e, { plugins: t, localIds: n }, a, s) {
  const o = [], i = e.getContext();
  for (const l of t) {
    const c = l.id, d = xd(a[c], s);
    d !== null && o.push({
      plugin: l,
      options: wd(e.config, {
        plugin: l,
        local: n[c]
      }, d, i)
    });
  }
  return o;
}
function wd(e, { plugin: t, local: n }, a, s) {
  const o = e.pluginScopeKeys(t), i = e.getOptionScopes(a, o);
  return n && t.defaults && i.push(t.defaults), e.createResolver(i, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ta(e, t) {
  const n = Ft.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function Cd(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function $d(e, t) {
  return e === t ? "_index_" : "_value_";
}
function qs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Sd(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Ba(e, ...t) {
  if (qs(e))
    return e;
  for (const n of t) {
    const a = n.axis || Sd(n.position) || e.length > 1 && qs(e[0].toLowerCase());
    if (a)
      return a;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Xs(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function Md(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((a) => a.xAxisID === e || a.yAxisID === e);
    if (n.length)
      return Xs(e, "x", n[0]) || Xs(e, "y", n[0]);
  }
  return {};
}
function Dd(e, t) {
  const n = He[e.type] || {
    scales: {}
  }, a = t.scales || {}, s = Ta(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(a).forEach((i) => {
    const l = a[i];
    if (!xt(l))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (l._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const c = Ba(i, l, Md(i, e), Ft.scales[l.type]), d = $d(c, s), u = n.scales || {};
    o[i] = gn(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      l,
      u[c],
      u[d]
    ]);
  }), e.data.datasets.forEach((i) => {
    const l = i.type || e.type, c = i.indexAxis || Ta(l, t), u = (He[l] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const p = Cd(h, c), _ = i[p + "AxisID"] || p;
      o[_] = o[_] || /* @__PURE__ */ Object.create(null), gn(o[_], [
        {
          axis: p
        },
        a[_],
        u[h]
      ]);
    });
  }), Object.keys(o).forEach((i) => {
    const l = o[i];
    gn(l, [
      Ft.scales[l.type],
      Ft.scale
    ]);
  }), o;
}
function mi(e) {
  const t = e.options || (e.options = {});
  t.plugins = pt(t.plugins, {}), t.scales = Dd(e, t);
}
function bi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Ad(e) {
  return e = e || {}, e.data = bi(e.data), mi(e), e;
}
const Gs = /* @__PURE__ */ new Map(), vi = /* @__PURE__ */ new Set();
function On(e, t) {
  let n = Gs.get(e);
  return n || (n = t(), Gs.set(e, n), vi.add(n)), n;
}
const on = (e, t, n) => {
  const a = We(t, n);
  a !== void 0 && e.add(a);
};
class Td {
  constructor(t) {
    this._config = Ad(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = bi(t);
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
    this.clearCache(), mi(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return On(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return On(`${t}.transition.${n}`, () => [
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
    return On(`${t}-${n}`, () => [
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
    return On(`${a}-plugin-${n}`, () => [
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
    const c = /* @__PURE__ */ new Set();
    n.forEach((u) => {
      t && (c.add(t), u.forEach((h) => on(c, t, h))), u.forEach((h) => on(c, s, h)), u.forEach((h) => on(c, He[o] || {}, h)), u.forEach((h) => on(c, Ft, h)), u.forEach((h) => on(c, Da, h));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), vi.has(n) && i.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      He[n] || {},
      Ft.datasets[n] || {},
      {
        type: n
      },
      Ft,
      Da
    ];
  }
  resolveNamedOptions(t, n, a, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: i, subPrefixes: l } = Zs(this._resolverCache, t, s);
    let c = i;
    if (Ld(i, n)) {
      o.$shared = !1, a = Te(a) ? a() : a;
      const d = this.createResolver(t, a, l);
      c = Qe(i, a, d);
    }
    for (const d of n)
      o[d] = c[d];
    return o;
  }
  createResolver(t, n, a = [
    ""
  ], s) {
    const { resolver: o } = Zs(this._resolverCache, t, a);
    return xt(n) ? Qe(o, n, void 0, s) : o;
  }
}
function Zs(e, t, n) {
  let a = e.get(t);
  a || (a = /* @__PURE__ */ new Map(), e.set(t, a));
  const s = n.join();
  let o = a.get(s);
  return o || (o = {
    resolver: Ka(t, n),
    subPrefixes: n.filter((l) => !l.toLowerCase().includes("hover"))
  }, a.set(s, o)), o;
}
const Bd = (e) => xt(e) && Object.getOwnPropertyNames(e).some((t) => Te(e[t]));
function Ld(e, t) {
  const { isScriptable: n, isIndexable: a } = ti(e);
  for (const s of t) {
    const o = n(s), i = a(s), l = (i || o) && e[s];
    if (o && (Te(l) || Bd(l)) || i && Rt(l))
      return !0;
  }
  return !1;
}
var Fd = "4.5.1";
const Pd = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Qs(e, t) {
  return e === "top" || e === "bottom" || Pd.indexOf(e) === -1 && t === "x";
}
function Js(e, t) {
  return function(n, a) {
    return n[e] === a[e] ? n[t] - a[t] : n[e] - a[e];
  };
}
function to(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Dt(n && n.onComplete, [
    e
  ], t);
}
function Ed(e) {
  const t = e.chart, n = t.options.animation;
  Dt(n && n.onProgress, [
    e
  ], t);
}
function yi(e) {
  return Xa() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Hn = {}, eo = (e) => {
  const t = yi(e);
  return Object.values(Hn).filter((n) => n.canvas === t).pop();
};
function Id(e, t, n) {
  const a = Object.keys(e);
  for (const s of a) {
    const o = +s;
    if (o >= t) {
      const i = e[s];
      delete e[s], (n > 0 || o > t) && (e[o + n] = i);
    }
  }
}
function Rd(e, t, n, a) {
  return !n || e.type === "mouseout" ? null : a ? t : e;
}
let Be = class {
  static defaults = Ft;
  static instances = Hn;
  static overrides = He;
  static registry = de;
  static version = Fd;
  static getChart = eo;
  static register(...t) {
    de.add(...t), no();
  }
  static unregister(...t) {
    de.remove(...t), no();
  }
  constructor(t, n) {
    const a = this.config = new Td(n), s = yi(t), o = eo(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const i = a.createResolver(a.chartOptionScopes(), this.getContext());
    this.platform = new (a.platform || ed(s))(), this.platform.updateConfig(a);
    const l = this.platform.acquireContext(s, i.aspectRatio), c = l && l.canvas, d = c && c.height, u = c && c.width;
    if (this.id = Dl(), this.ctx = l, this.canvas = c, this.width = u, this.height = d, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new yd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ul((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], Hn[this.id] = this, !l || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    pe.listen(this, "complete", to), pe.listen(this, "progress", Ed), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: a, height: s, _aspectRatio: o } = this;
    return wt(t) ? n && o ? o : s ? a / s : null : t;
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
    return de;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Cs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return xs(this.canvas, this.ctx), this;
  }
  stop() {
    return pe.stop(this), this;
  }
  resize(t, n) {
    pe.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const a = this.options, s = this.canvas, o = a.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(s, t, n, o), l = a.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Cs(this, l, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Dt(a.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    Ct(n, (a, s) => {
      a.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, a = this.scales, s = Object.keys(a).reduce((i, l) => (i[l] = !1, i), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((i) => {
      const l = n[i], c = Ba(i, l), d = c === "r", u = c === "x";
      return {
        options: l,
        dposition: d ? "chartArea" : u ? "bottom" : "left",
        dtype: d ? "radialLinear" : u ? "category" : "linear"
      };
    }))), Ct(o, (i) => {
      const l = i.options, c = l.id, d = Ba(c, l), u = pt(l.type, i.dtype);
      (l.position === void 0 || Qs(l.position, d) !== Qs(i.dposition)) && (l.position = i.dposition), s[c] = !0;
      let h = null;
      if (c in a && a[c].type === u)
        h = a[c];
      else {
        const p = de.getScale(u);
        h = new p({
          id: c,
          type: u,
          ctx: this.ctx,
          chart: this
        }), a[h.id] = h;
      }
      h.init(l, t);
    }), Ct(s, (i, l) => {
      i || delete a[l];
    }), Ct(a, (i) => {
      ee.configure(this, i, i.options), ee.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, a = t.length;
    if (t.sort((s, o) => s.index - o.index), a > n) {
      for (let s = n; s < a; ++s)
        this._destroyDatasetMeta(s);
      t.splice(n, a - n);
    }
    this._sortedMetasets = t.slice(0).sort(Js("order", "index"));
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
      if (i.type && i.type !== l && (this._destroyDatasetMeta(a), i = this.getDatasetMeta(a)), i.type = l, i.indexAxis = o.indexAxis || Ta(l, this.options), i.order = o.order || 0, i.index = a, i.label = "" + o.label, i.visible = this.isDatasetVisible(a), i.controller)
        i.controller.updateIndex(a), i.controller.linkScales();
      else {
        const c = de.getController(l), { datasetElementType: d, dataElementType: u } = Ft.datasets[l];
        Object.assign(c, {
          dataElementType: de.getElement(u),
          datasetElementType: d && de.getElement(d)
        }), i.controller = new c(this, a), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Ct(this.data.datasets, (t, n) => {
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
    for (let d = 0, u = this.data.datasets.length; d < u; d++) {
      const { controller: h } = this.getDatasetMeta(d), p = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(p), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = a.layout.autoPadding ? i : 0, this._updateLayout(i), s || Ct(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Js("z", "_idx"));
    const { _active: l, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : l.length && this._updateHoverStyles(l, l, !0), this.render();
  }
  _updateScales() {
    Ct(this.scales, (t) => {
      ee.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), a = new Set(t.events);
    (!us(n, a) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: a, start: s, count: o } of n) {
      const i = a === "_removeElements" ? -o : o;
      Id(t, s, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, a = (o) => new Set(t.filter((i) => i[0] === o).map((i, l) => l + "," + i.splice(1).join(","))), s = a(0);
    for (let o = 1; o < n; o++)
      if (!us(s, a(o)))
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
    ee.update(this, this.width, this.height, t);
    const n = this.chartArea, a = n.width <= 0 || n.height <= 0;
    this._layers = [], Ct(this.boxes, (s) => {
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
        this._updateDataset(n, Te(t) ? t({
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
    }) !== !1 && (pe.has(this) ? this.attached && !pe.running(this) && pe.start(this) : (this.draw(), to({
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
    }, s = Jr(this, t);
    this.notifyPlugins("beforeDatasetDraw", a) !== !1 && (s && Wa(n, s), t.controller.draw(), s && Ha(n), a.cancelable = !1, this.notifyPlugins("afterDatasetDraw", a));
  }
  isPointInArea(t) {
    return Cn(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, a, s) {
    const o = Pc.modes[n];
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
    return this.$context || (this.$context = Ye(null, {
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
    xn(n) ? (o.data[n].hidden = !a, this.update()) : (this.setDatasetVisibility(t, a), i.update(o, {
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
    for (this.stop(), pe.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), xs(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Hn[this.id], this.notifyPlugins("afterDestroy");
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
    Ct(this.options.events, (o) => a(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, a = (c, d) => {
      n.addEventListener(this, c, d), t[c] = d;
    }, s = (c, d) => {
      t[c] && (n.removeEventListener(this, c, d), delete t[c]);
    }, o = (c, d) => {
      this.canvas && this.resize(c, d);
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
    Ct(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, Ct(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, a) {
    const s = a ? "set" : "remove";
    let o, i, l, c;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), l = 0, c = t.length; l < c; ++l) {
      i = t[l];
      const d = i && this.getDatasetMeta(i.datasetIndex).controller;
      d && d[s + "HoverStyle"](i.element, i.datasetIndex, i.index);
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
    !qn(a, n) && (this._active = a, this._lastEvent = null, this._updateHoverStyles(a, n));
  }
  notifyPlugins(t, n, a) {
    return this._plugins.notify(this, t, n, a);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, a) {
    const s = this.options.hover, o = (c, d) => c.filter((u) => !d.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), i = o(n, t), l = a ? t : o(t, n);
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
    const { _active: s = [], options: o } = this, i = n, l = this._getActiveElements(t, s, a, i), c = Pl(t), d = Rd(t, this._lastEvent, a, c);
    a && (this._lastEvent = null, Dt(o.onHover, [
      t,
      l,
      this
    ], this), c && Dt(o.onClick, [
      t,
      l,
      this
    ], this));
    const u = !qn(l, s);
    return (u || n) && (this._active = l, this._updateHoverStyles(l, s, n)), this._lastEvent = d, u;
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
function no() {
  return Ct(Be.instances, (e) => e._plugins.invalidate());
}
function Od(e, t, n) {
  const { startAngle: a, x: s, y: o, outerRadius: i, innerRadius: l, options: c } = t, { borderWidth: d, borderJoinStyle: u } = c, h = Math.min(d / i, oe(a - n));
  if (e.beginPath(), e.arc(s, o, i - d / 2, a + h / 2, n - h / 2), l > 0) {
    const p = Math.min(d / l, oe(a - n));
    e.arc(s, o, l + d / 2, n - p / 2, a + p / 2, !0);
  } else {
    const p = Math.min(d / 2, i * oe(a - n));
    if (u === "round")
      e.arc(s, o, p, n - $t / 2, a + $t / 2, !0);
    else if (u === "bevel") {
      const _ = 2 * p * p, f = -_ * Math.cos(n + $t / 2) + s, v = -_ * Math.sin(n + $t / 2) + o, x = _ * Math.cos(a + $t / 2) + s, m = _ * Math.sin(a + $t / 2) + o;
      e.lineTo(f, v), e.lineTo(x, m);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function Vd(e, t, n) {
  const { startAngle: a, pixelMargin: s, x: o, y: i, outerRadius: l, innerRadius: c } = t;
  let d = s / l;
  e.beginPath(), e.arc(o, i, l, a - d, n + d), c > s ? (d = s / c, e.arc(o, i, c, n + d, a - d, !0)) : e.arc(o, i, s, n + Ot, a - Ot), e.closePath(), e.clip();
}
function zd(e) {
  return Ya(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Nd(e, t, n, a) {
  const s = zd(e.options.borderRadius), o = (n - t) / 2, i = Math.min(o, a * t / 2), l = (c) => {
    const d = (n - Math.min(o, c)) * a / 2;
    return Wt(c, 0, Math.min(o, d));
  };
  return {
    outerStart: l(s.outerStart),
    outerEnd: l(s.outerEnd),
    innerStart: Wt(s.innerStart, 0, i),
    innerEnd: Wt(s.innerEnd, 0, i)
  };
}
function Ue(e, t, n, a) {
  return {
    x: n + e * Math.cos(t),
    y: a + e * Math.sin(t)
  };
}
function ta(e, t, n, a, s, o) {
  const { x: i, y: l, startAngle: c, pixelMargin: d, innerRadius: u } = t, h = Math.max(t.outerRadius + a + n - d, 0), p = u > 0 ? u + a + n + d : 0;
  let _ = 0;
  const f = s - c;
  if (a) {
    const K = u > 0 ? u - a : 0, N = h > 0 ? h - a : 0, tt = (K + N) / 2, et = tt !== 0 ? f * tt / (tt + a) : f;
    _ = (f - et) / 2;
  }
  const v = Math.max(1e-3, f * h - n / $t) / h, x = (f - v) / 2, m = c + x + _, g = s - x - _, { outerStart: y, outerEnd: w, innerStart: S, innerEnd: D } = Nd(t, p, h, g - m), C = h - y, $ = h - w, B = m + y / C, T = g - w / $, L = p + S, E = p + D, I = m + S / L, W = g - D / E;
  if (e.beginPath(), o) {
    const K = (B + T) / 2;
    if (e.arc(i, l, h, B, K), e.arc(i, l, h, K, T), w > 0) {
      const ct = Ue($, T, i, l);
      e.arc(ct.x, ct.y, w, T, g + Ot);
    }
    const N = Ue(E, g, i, l);
    if (e.lineTo(N.x, N.y), D > 0) {
      const ct = Ue(E, W, i, l);
      e.arc(ct.x, ct.y, D, g + Ot, W + Math.PI);
    }
    const tt = (g - D / p + (m + S / p)) / 2;
    if (e.arc(i, l, p, g - D / p, tt, !0), e.arc(i, l, p, tt, m + S / p, !0), S > 0) {
      const ct = Ue(L, I, i, l);
      e.arc(ct.x, ct.y, S, I + Math.PI, m - Ot);
    }
    const et = Ue(C, m, i, l);
    if (e.lineTo(et.x, et.y), y > 0) {
      const ct = Ue(C, B, i, l);
      e.arc(ct.x, ct.y, y, m - Ot, B);
    }
  } else {
    e.moveTo(i, l);
    const K = Math.cos(B) * h + i, N = Math.sin(B) * h + l;
    e.lineTo(K, N);
    const tt = Math.cos(T) * h + i, et = Math.sin(T) * h + l;
    e.lineTo(tt, et);
  }
  e.closePath();
}
function jd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l } = t;
  let c = t.endAngle;
  if (o) {
    ta(e, t, n, a, c, s);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(l) || (c = i + (l % Bt || Bt));
  }
  return ta(e, t, n, a, c, s), e.fill(), c;
}
function Wd(e, t, n, a, s) {
  const { fullCircles: o, startAngle: i, circumference: l, options: c } = t, { borderWidth: d, borderJoinStyle: u, borderDash: h, borderDashOffset: p, borderRadius: _ } = c, f = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(h || []), e.lineDashOffset = p, f ? (e.lineWidth = d * 2, e.lineJoin = u || "round") : (e.lineWidth = d, e.lineJoin = u || "bevel");
  let v = t.endAngle;
  if (o) {
    ta(e, t, n, a, v, s);
    for (let x = 0; x < o; ++x)
      e.stroke();
    isNaN(l) || (v = i + (l % Bt || Bt));
  }
  f && Vd(e, t, v), c.selfJoin && v - i >= $t && _ === 0 && u !== "miter" && Od(e, t, v), o || (ta(e, t, n, a, v, s), e.stroke());
}
class Hd extends ye {
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
    ], a), { angle: o, distance: i } = Ko(s, {
      x: t,
      y: n
    }), { startAngle: l, endAngle: c, innerRadius: d, outerRadius: u, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], a), p = (this.options.spacing + this.options.borderWidth) / 2, _ = pt(h, c - l), f = wn(o, l, c) && l !== c, v = _ >= Bt || f, x = $e(i, d + p, u + p);
    return v && x;
  }
  getCenterPoint(t) {
    const { x: n, y: a, startAngle: s, endAngle: o, innerRadius: i, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], t), { offset: c, spacing: d } = this.options, u = (s + o) / 2, h = (i + l + d + c) / 2;
    return {
      x: n + Math.cos(u) * h,
      y: a + Math.sin(u) * h
    };
  }
  tooltipPosition(t) {
    return this.getCenterPoint(t);
  }
  draw(t) {
    const { options: n, circumference: a } = this, s = (n.offset || 0) / 4, o = (n.spacing || 0) / 2, i = n.circular;
    if (this.pixelMargin = n.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = a > Bt ? Math.floor(a / Bt) : 0, a === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const l = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(l) * s, Math.sin(l) * s);
    const c = 1 - Math.sin(Math.min($t, a || 0)), d = s * c;
    t.fillStyle = n.backgroundColor, t.strokeStyle = n.borderColor, jd(t, this, d, o, i), Wd(t, this, d, o, i), t.restore();
  }
}
function _i(e, t, n = t) {
  e.lineCap = pt(n.borderCapStyle, t.borderCapStyle), e.setLineDash(pt(n.borderDash, t.borderDash)), e.lineDashOffset = pt(n.borderDashOffset, t.borderDashOffset), e.lineJoin = pt(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = pt(n.borderWidth, t.borderWidth), e.strokeStyle = pt(n.borderColor, t.borderColor);
}
function Yd(e, t, n) {
  e.lineTo(n.x, n.y);
}
function Kd(e) {
  return e.stepped ? lr : e.tension || e.cubicInterpolationMode === "monotone" ? rr : Yd;
}
function xi(e, t, n = {}) {
  const a = e.length, { start: s = 0, end: o = a - 1 } = n, { start: i, end: l } = t, c = Math.max(s, i), d = Math.min(o, l), u = s < i && o < i || s > l && o > l;
  return {
    count: a,
    start: c,
    loop: t.loop,
    ilen: d < c && !u ? a + d - c : d - c
  };
}
function Ud(e, t, n, a) {
  const { points: s, options: o } = t, { count: i, start: l, loop: c, ilen: d } = xi(s, n, a), u = Kd(o);
  let { move: h = !0, reverse: p } = a || {}, _, f, v;
  for (_ = 0; _ <= d; ++_)
    f = s[(l + (p ? d - _ : _)) % i], !f.skip && (h ? (e.moveTo(f.x, f.y), h = !1) : u(e, v, f, p, o.stepped), v = f);
  return c && (f = s[(l + (p ? d : 0)) % i], u(e, v, f, p, o.stepped)), !!c;
}
function qd(e, t, n, a) {
  const s = t.points, { count: o, start: i, ilen: l } = xi(s, n, a), { move: c = !0, reverse: d } = a || {};
  let u = 0, h = 0, p, _, f, v, x, m;
  const g = (w) => (i + (d ? l - w : w)) % o, y = () => {
    v !== x && (e.lineTo(u, x), e.lineTo(u, v), e.lineTo(u, m));
  };
  for (c && (_ = s[g(0)], e.moveTo(_.x, _.y)), p = 0; p <= l; ++p) {
    if (_ = s[g(p)], _.skip)
      continue;
    const w = _.x, S = _.y, D = w | 0;
    D === f ? (S < v ? v = S : S > x && (x = S), u = (h * u + w) / ++h) : (y(), e.lineTo(w, S), f = D, h = 0, v = x = S), m = S;
  }
  y();
}
function La(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? qd : Ud;
}
function Xd(e) {
  return e.stepped ? zr : e.tension || e.cubicInterpolationMode === "monotone" ? Nr : ze;
}
function Gd(e, t, n, a) {
  let s = t._path;
  s || (s = t._path = new Path2D(), t.path(s, n, a) && s.closePath()), _i(e, t.options), e.stroke(s);
}
function Zd(e, t, n, a) {
  const { segments: s, options: o } = t, i = La(t);
  for (const l of s)
    _i(e, o, l.style), e.beginPath(), i(e, t, l, {
      start: n,
      end: n + a - 1
    }) && e.closePath(), e.stroke();
}
const Qd = typeof Path2D == "function";
function Jd(e, t, n, a) {
  Qd && !t.options.segment ? Gd(e, t, n, a) : Zd(e, t, n, a);
}
class tu extends ye {
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
      Lr(this._points, a, t, s, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Xr(this, this.options.segment));
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
    const a = this.options, s = t[n], o = this.points, i = Kr(this, {
      property: n,
      start: s,
      end: s
    });
    if (!i.length)
      return;
    const l = [], c = Xd(a);
    let d, u;
    for (d = 0, u = i.length; d < u; ++d) {
      const { start: h, end: p } = i[d], _ = o[h], f = o[p];
      if (_ === f) {
        l.push(_);
        continue;
      }
      const v = Math.abs((s - _[n]) / (f[n] - _[n])), x = c(_, f, v, a.stepped);
      x[n] = t[n], l.push(x);
    }
    return l.length === 1 ? l[0] : l;
  }
  pathSegment(t, n, a) {
    return La(this)(t, this, n, a);
  }
  path(t, n, a) {
    const s = this.segments, o = La(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), Jd(t, this, a, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function ao(e, t, n, a) {
  const s = e.options, { [n]: o } = e.getProps([
    n
  ], a);
  return Math.abs(t - o) < s.radius + s.hitRadius;
}
class eu extends ye {
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
    return ao(this, t, "x", n);
  }
  inYRange(t, n) {
    return ao(this, t, "y", n);
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
    this.skip || a.radius < 0.1 || !Cn(this, n, this.size(a) / 2) || (t.strokeStyle = a.borderColor, t.lineWidth = a.borderWidth, t.fillStyle = a.backgroundColor, Aa(t, a, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function ki(e, t) {
  const { x: n, y: a, base: s, width: o, height: i } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let l, c, d, u, h;
  return e.horizontal ? (h = i / 2, l = Math.min(n, s), c = Math.max(n, s), d = a - h, u = a + h) : (h = o / 2, l = n - h, c = n + h, d = Math.min(a, s), u = Math.max(a, s)), {
    left: l,
    top: d,
    right: c,
    bottom: u
  };
}
function Me(e, t, n, a) {
  return e ? 0 : Wt(t, n, a);
}
function nu(e, t, n) {
  const a = e.options.borderWidth, s = e.borderSkipped, o = Jo(a);
  return {
    t: Me(s.top, o.top, 0, n),
    r: Me(s.right, o.right, 0, t),
    b: Me(s.bottom, o.bottom, 0, n),
    l: Me(s.left, o.left, 0, t)
  };
}
function au(e, t, n) {
  const { enableBorderRadius: a } = e.getProps([
    "enableBorderRadius"
  ]), s = e.options.borderRadius, o = Ge(s), i = Math.min(t, n), l = e.borderSkipped, c = a || xt(s);
  return {
    topLeft: Me(!c || l.top || l.left, o.topLeft, 0, i),
    topRight: Me(!c || l.top || l.right, o.topRight, 0, i),
    bottomLeft: Me(!c || l.bottom || l.left, o.bottomLeft, 0, i),
    bottomRight: Me(!c || l.bottom || l.right, o.bottomRight, 0, i)
  };
}
function su(e) {
  const t = ki(e), n = t.right - t.left, a = t.bottom - t.top, s = nu(e, n / 2, a / 2), o = au(e, n / 2, a / 2);
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
function ba(e, t, n, a) {
  const s = t === null, o = n === null, l = e && !(s && o) && ki(e, a);
  return l && (s || $e(t, l.left, l.right)) && (o || $e(n, l.top, l.bottom));
}
function ou(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function iu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function va(e, t, n = {}) {
  const a = e.x !== n.x ? -t : 0, s = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - a, i = (e.y + e.h !== n.y + n.h ? t : 0) - s;
  return {
    x: e.x + a,
    y: e.y + s,
    w: e.w + o,
    h: e.h + i,
    radius: e.radius
  };
}
class lu extends ye {
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
    const { inflateAmount: n, options: { borderColor: a, backgroundColor: s } } = this, { inner: o, outer: i } = su(this), l = ou(i.radius) ? Zn : iu;
    t.save(), (i.w !== o.w || i.h !== o.h) && (t.beginPath(), l(t, va(i, n, o)), t.clip(), l(t, va(o, -n, i)), t.fillStyle = a, t.fill("evenodd")), t.beginPath(), l(t, va(o, n)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, n, a) {
    return ba(this, t, n, a);
  }
  inXRange(t, n) {
    return ba(this, t, null, n);
  }
  inYRange(t, n) {
    return ba(this, null, t, n);
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
const so = (e, t) => {
  let { boxHeight: n = t, boxWidth: a = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), a = e.pointStyleWidth || Math.min(a, t)), {
    boxWidth: a,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, ru = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class oo extends ye {
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
    t.filter && (n = n.filter((a) => t.filter(a, this.chart.data))), t.sort && (n = n.sort((a, s) => t.sort(a, s, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const a = t.labels, s = Ht(a.font), o = s.size, i = this._computeTitleHeight(), { boxWidth: l, itemHeight: c } = so(a, o);
    let d, u;
    n.font = s.string, this.isHorizontal() ? (d = this.maxWidth, u = this._fitRows(i, o, l, c) + 10) : (u = this.maxHeight, d = this._fitCols(i, s, l, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, a, s) {
    const { ctx: o, maxWidth: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], u = s + l;
    let h = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let p = -1, _ = -u;
    return this.legendItems.forEach((f, v) => {
      const x = a + n / 2 + o.measureText(f.text).width;
      (v === 0 || d[d.length - 1] + x + 2 * l > i) && (h += u, d[d.length - (v > 0 ? 0 : 1)] = 0, _ += u, p++), c[v] = {
        left: 0,
        top: _,
        row: p,
        width: x,
        height: s
      }, d[d.length - 1] += x + l;
    }), h;
  }
  _fitCols(t, n, a, s) {
    const { ctx: o, maxHeight: i, options: { labels: { padding: l } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], u = i - t;
    let h = l, p = 0, _ = 0, f = 0, v = 0;
    return this.legendItems.forEach((x, m) => {
      const { itemWidth: g, itemHeight: y } = cu(a, n, o, x, s);
      m > 0 && _ + y + 2 * l > u && (h += p + l, d.push({
        width: p,
        height: _
      }), f += p + l, v++, p = _ = 0), c[m] = {
        left: f,
        top: _,
        col: v,
        width: g,
        height: y
      }, p = Math.max(p, g), _ += y + l;
    }), h += p, d.push({
      width: p,
      height: _
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: a, labels: { padding: s }, rtl: o } } = this, i = Ze(o, this.left, this.width);
    if (this.isHorizontal()) {
      let l = 0, c = jt(a, this.left + s, this.right - this.lineWidths[l]);
      for (const d of n)
        l !== d.row && (l = d.row, c = jt(a, this.left + s, this.right - this.lineWidths[l])), d.top += this.top + t + s, d.left = i.leftForLtr(i.x(c), d.width), c += d.width + s;
    } else {
      let l = 0, c = jt(a, this.top + t + s, this.bottom - this.columnSizes[l].height);
      for (const d of n)
        d.col !== l && (l = d.col, c = jt(a, this.top + t + s, this.bottom - this.columnSizes[l].height)), d.top = c, d.left += this.left + s, d.left = i.leftForLtr(i.x(d.left), d.width), c += d.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Wa(t, this), this._draw(), Ha(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: a, ctx: s } = this, { align: o, labels: i } = t, l = Ft.color, c = Ze(t.rtl, this.left, this.width), d = Ht(i.font), { padding: u } = i, h = d.size, p = h / 2;
    let _;
    this.drawTitle(), s.textAlign = c.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = d.string;
    const { boxWidth: f, boxHeight: v, itemHeight: x } = so(i, h), m = function(D, C, $) {
      if (isNaN(f) || f <= 0 || isNaN(v) || v < 0)
        return;
      s.save();
      const B = pt($.lineWidth, 1);
      if (s.fillStyle = pt($.fillStyle, l), s.lineCap = pt($.lineCap, "butt"), s.lineDashOffset = pt($.lineDashOffset, 0), s.lineJoin = pt($.lineJoin, "miter"), s.lineWidth = B, s.strokeStyle = pt($.strokeStyle, l), s.setLineDash(pt($.lineDash, [])), i.usePointStyle) {
        const T = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: $.pointStyle,
          rotation: $.rotation,
          borderWidth: B
        }, L = c.xPlus(D, f / 2), E = C + p;
        Qo(s, T, L, E, i.pointStyleWidth && f);
      } else {
        const T = C + Math.max((h - v) / 2, 0), L = c.leftForLtr(D, f), E = Ge($.borderRadius);
        s.beginPath(), Object.values(E).some((I) => I !== 0) ? Zn(s, {
          x: L,
          y: T,
          w: f,
          h: v,
          radius: E
        }) : s.rect(L, T, f, v), s.fill(), B !== 0 && s.stroke();
      }
      s.restore();
    }, g = function(D, C, $) {
      $n(s, $.text, D, C + x / 2, d, {
        strikethrough: $.hidden,
        textAlign: c.textAlign($.textAlign)
      });
    }, y = this.isHorizontal(), w = this._computeTitleHeight();
    y ? _ = {
      x: jt(o, this.left + u, this.right - a[0]),
      y: this.top + u + w,
      line: 0
    } : _ = {
      x: this.left + u,
      y: jt(o, this.top + w + u, this.bottom - n[0].height),
      line: 0
    }, oi(this.ctx, t.textDirection);
    const S = x + u;
    this.legendItems.forEach((D, C) => {
      s.strokeStyle = D.fontColor, s.fillStyle = D.fontColor;
      const $ = s.measureText(D.text).width, B = c.textAlign(D.textAlign || (D.textAlign = i.textAlign)), T = f + p + $;
      let L = _.x, E = _.y;
      c.setWidth(this.width), y ? C > 0 && L + T + u > this.right && (E = _.y += S, _.line++, L = _.x = jt(o, this.left + u, this.right - a[_.line])) : C > 0 && E + S > this.bottom && (L = _.x = L + n[_.line].width + u, _.line++, E = _.y = jt(o, this.top + w + u, this.bottom - n[_.line].height));
      const I = c.x(L);
      if (m(I, E, D), L = ql(B, L + f + p, y ? L + T : this.right, t.rtl), g(c.x(L), E, D), y)
        _.x += T + u;
      else if (typeof D.text != "string") {
        const W = d.lineHeight;
        _.y += wi(D, W) + u;
      } else
        _.y += S;
    }), ii(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, a = Ht(n.font), s = ae(n.padding);
    if (!n.display)
      return;
    const o = Ze(t.rtl, this.left, this.width), i = this.ctx, l = n.position, c = a.size / 2, d = s.top + c;
    let u, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), u = this.top + d, h = jt(t.align, h, this.right - p);
    else {
      const f = this.columnSizes.reduce((v, x) => Math.max(v, x.height), 0);
      u = d + jt(t.align, this.top, this.bottom - f - t.labels.padding - this._computeTitleHeight());
    }
    const _ = jt(l, h, h + p);
    i.textAlign = o.textAlign(za(l)), i.textBaseline = "middle", i.strokeStyle = n.color, i.fillStyle = n.color, i.font = a.string, $n(i, n.text, _, u, a);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Ht(t.font), a = ae(t.padding);
    return t.display ? n.lineHeight + a.height : 0;
  }
  _getLegendItemAt(t, n) {
    let a, s, o;
    if ($e(t, this.left, this.right) && $e(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, a = 0; a < o.length; ++a)
        if (s = o[a], $e(t, s.left, s.left + s.width) && $e(n, s.top, s.top + s.height))
          return this.legendItems[a];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!hu(t.type, n))
      return;
    const a = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, o = ru(s, a);
      s && !o && Dt(n.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = a, a && !o && Dt(n.onHover, [
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
function cu(e, t, n, a, s) {
  const o = du(a, e, t, n), i = uu(s, a, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: i
  };
}
function du(e, t, n, a) {
  let s = e.text;
  return s && typeof s != "string" && (s = s.reduce((o, i) => o.length > i.length ? o : i)), t + n.size / 2 + a.measureText(s).width;
}
function uu(e, t, n) {
  let a = e;
  return typeof t.text != "string" && (a = wi(t, n)), a;
}
function wi(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function hu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var Qa = {
  id: "legend",
  _element: oo,
  start(e, t, n) {
    const a = e.legend = new oo({
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
        return e._getSortedDatasetMetas().map((c) => {
          const d = c.controller.getStyle(n ? 0 : void 0), u = ae(d.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !c.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: a || d.pointStyle,
            rotation: d.rotation,
            textAlign: s || d.textAlign,
            borderRadius: i && (l || d.borderRadius),
            datasetIndex: c.index
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
class Ci extends ye {
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
    const s = Rt(a.text) ? a.text.length : 1;
    this._padding = ae(a.padding);
    const o = s * Ht(a.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: n, left: a, bottom: s, right: o, options: i } = this, l = i.align;
    let c = 0, d, u, h;
    return this.isHorizontal() ? (u = jt(l, a, o), h = n + t, d = o - a) : (i.position === "left" ? (u = a + t, h = jt(l, s, n), c = $t * -0.5) : (u = o - t, h = jt(l, n, s), c = $t * 0.5), d = s - n), {
      titleX: u,
      titleY: h,
      maxWidth: d,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, n = this.options;
    if (!n.display)
      return;
    const a = Ht(n.font), o = a.lineHeight / 2 + this._padding.top, { titleX: i, titleY: l, maxWidth: c, rotation: d } = this._drawArgs(o);
    $n(t, n.text, 0, 0, a, {
      color: n.color,
      maxWidth: c,
      rotation: d,
      textAlign: za(n.align),
      textBaseline: "middle",
      translation: [
        i,
        l
      ]
    });
  }
}
function fu(e, t) {
  const n = new Ci({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  ee.configure(e, n, t), ee.addBox(e, n), e.titleBlock = n;
}
var $i = {
  id: "title",
  _element: Ci,
  start(e, t, n) {
    fu(e, n);
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
const hn = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, a = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const l = e[t].element;
      if (l && l.hasValue()) {
        const c = l.tooltipPosition();
        a.add(c.x), s += c.y, ++o;
      }
    }
    return o === 0 || a.size === 0 ? !1 : {
      x: [
        ...a
      ].reduce((l, c) => l + c) / a.size,
      y: s / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, a = t.y, s = Number.POSITIVE_INFINITY, o, i, l;
    for (o = 0, i = e.length; o < i; ++o) {
      const c = e[o].element;
      if (c && c.hasValue()) {
        const d = c.getCenterPoint(), u = Ma(t, d);
        u < s && (s = u, l = c);
      }
    }
    if (l) {
      const c = l.tooltipPosition();
      n = c.x, a = c.y;
    }
    return {
      x: n,
      y: a
    };
  }
};
function ce(e, t) {
  return t && (Rt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function me(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function gu(e, t) {
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
function io(e, t) {
  const n = e.chart.ctx, { body: a, footer: s, title: o } = e, { boxWidth: i, boxHeight: l } = t, c = Ht(t.bodyFont), d = Ht(t.titleFont), u = Ht(t.footerFont), h = o.length, p = s.length, _ = a.length, f = ae(t.padding);
  let v = f.height, x = 0, m = a.reduce((w, S) => w + S.before.length + S.lines.length + S.after.length, 0);
  if (m += e.beforeBody.length + e.afterBody.length, h && (v += h * d.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), m) {
    const w = t.displayColors ? Math.max(l, c.lineHeight) : c.lineHeight;
    v += _ * w + (m - _) * c.lineHeight + (m - 1) * t.bodySpacing;
  }
  p && (v += t.footerMarginTop + p * u.lineHeight + (p - 1) * t.footerSpacing);
  let g = 0;
  const y = function(w) {
    x = Math.max(x, n.measureText(w).width + g);
  };
  return n.save(), n.font = d.string, Ct(e.title, y), n.font = c.string, Ct(e.beforeBody.concat(e.afterBody), y), g = t.displayColors ? i + 2 + t.boxPadding : 0, Ct(a, (w) => {
    Ct(w.before, y), Ct(w.lines, y), Ct(w.after, y);
  }), g = 0, n.font = u.string, Ct(e.footer, y), n.restore(), x += f.width, {
    width: x,
    height: v
  };
}
function pu(e, t) {
  const { y: n, height: a } = t;
  return n < a / 2 ? "top" : n > e.height - a / 2 ? "bottom" : "center";
}
function mu(e, t, n, a) {
  const { x: s, width: o } = a, i = n.caretSize + n.caretPadding;
  if (e === "left" && s + o + i > t.width || e === "right" && s - o - i < 0)
    return !0;
}
function bu(e, t, n, a) {
  const { x: s, width: o } = n, { width: i, chartArea: { left: l, right: c } } = e;
  let d = "center";
  return a === "center" ? d = s <= (l + c) / 2 ? "left" : "right" : s <= o / 2 ? d = "left" : s >= i - o / 2 && (d = "right"), mu(d, e, t, n) && (d = "center"), d;
}
function lo(e, t, n) {
  const a = n.yAlign || t.yAlign || pu(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || bu(e, t, n, a),
    yAlign: a
  };
}
function vu(e, t) {
  let { x: n, width: a } = e;
  return t === "right" ? n -= a : t === "center" && (n -= a / 2), n;
}
function yu(e, t, n) {
  let { y: a, height: s } = e;
  return t === "top" ? a += n : t === "bottom" ? a -= s + n : a -= s / 2, a;
}
function ro(e, t, n, a) {
  const { caretSize: s, caretPadding: o, cornerRadius: i } = e, { xAlign: l, yAlign: c } = n, d = s + o, { topLeft: u, topRight: h, bottomLeft: p, bottomRight: _ } = Ge(i);
  let f = vu(t, l);
  const v = yu(t, c, d);
  return c === "center" ? l === "left" ? f += d : l === "right" && (f -= d) : l === "left" ? f -= Math.max(u, p) + s : l === "right" && (f += Math.max(h, _) + s), {
    x: Wt(f, 0, a.width - t.width),
    y: Wt(v, 0, a.height - t.height)
  };
}
function Vn(e, t, n) {
  const a = ae(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - a.right : e.x + a.left;
}
function co(e) {
  return ce([], me(e));
}
function _u(e, t, n) {
  return Ye(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function uo(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const Si = {
  beforeTitle: ge,
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
  afterTitle: ge,
  beforeBody: ge,
  beforeLabel: ge,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return wt(n) || (t += n), t;
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
  afterLabel: ge,
  afterBody: ge,
  beforeFooter: ge,
  footer: ge,
  afterFooter: ge
};
function Ut(e, t, n, a) {
  const s = e[t].call(n, a);
  return typeof s > "u" ? Si[t].call(n, a) : s;
}
class ho extends ye {
  static positioners = hn;
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
    const n = this.chart, a = this.options.setContext(this.getContext()), s = a.enabled && n.options.animation && a.animations, o = new ri(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = _u(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: a } = n, s = Ut(a, "beforeTitle", this, t), o = Ut(a, "title", this, t), i = Ut(a, "afterTitle", this, t);
    let l = [];
    return l = ce(l, me(s)), l = ce(l, me(o)), l = ce(l, me(i)), l;
  }
  getBeforeBody(t, n) {
    return co(Ut(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: a } = n, s = [];
    return Ct(t, (o) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, l = uo(a, o);
      ce(i.before, me(Ut(l, "beforeLabel", this, o))), ce(i.lines, Ut(l, "label", this, o)), ce(i.after, me(Ut(l, "afterLabel", this, o))), s.push(i);
    }), s;
  }
  getAfterBody(t, n) {
    return co(Ut(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: a } = n, s = Ut(a, "beforeFooter", this, t), o = Ut(a, "footer", this, t), i = Ut(a, "afterFooter", this, t);
    let l = [];
    return l = ce(l, me(s)), l = ce(l, me(o)), l = ce(l, me(i)), l;
  }
  _createItems(t) {
    const n = this._active, a = this.chart.data, s = [], o = [], i = [];
    let l = [], c, d;
    for (c = 0, d = n.length; c < d; ++c)
      l.push(gu(this.chart, n[c]));
    return t.filter && (l = l.filter((u, h, p) => t.filter(u, h, p, a))), t.itemSort && (l = l.sort((u, h) => t.itemSort(u, h, a))), Ct(l, (u) => {
      const h = uo(t.callbacks, u);
      s.push(Ut(h, "labelColor", this, u)), o.push(Ut(h, "labelPointStyle", this, u)), i.push(Ut(h, "labelTextColor", this, u));
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
      const l = hn[a.position].call(this, s, this._eventPosition);
      i = this._createItems(a), this.title = this.getTitle(i, a), this.beforeBody = this.getBeforeBody(i, a), this.body = this.getBody(i, a), this.afterBody = this.getAfterBody(i, a), this.footer = this.getFooter(i, a);
      const c = this._size = io(this, a), d = Object.assign({}, l, c), u = lo(this.chart, a, d), h = ro(a, d, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: c.width,
        height: c.height,
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
    const { xAlign: s, yAlign: o } = this, { caretSize: i, cornerRadius: l } = a, { topLeft: c, topRight: d, bottomLeft: u, bottomRight: h } = Ge(l), { x: p, y: _ } = t, { width: f, height: v } = n;
    let x, m, g, y, w, S;
    return o === "center" ? (w = _ + v / 2, s === "left" ? (x = p, m = x - i, y = w + i, S = w - i) : (x = p + f, m = x + i, y = w - i, S = w + i), g = x) : (s === "left" ? m = p + Math.max(c, u) + i : s === "right" ? m = p + f - Math.max(d, h) - i : m = this.caretX, o === "top" ? (y = _, w = y - i, x = m - i, g = m + i) : (y = _ + v, w = y + i, x = m + i, g = m - i), S = y), {
      x1: x,
      x2: m,
      x3: g,
      y1: y,
      y2: w,
      y3: S
    };
  }
  drawTitle(t, n, a) {
    const s = this.title, o = s.length;
    let i, l, c;
    if (o) {
      const d = Ze(a.rtl, this.x, this.width);
      for (t.x = Vn(this, a.titleAlign, a), n.textAlign = d.textAlign(a.titleAlign), n.textBaseline = "middle", i = Ht(a.titleFont), l = a.titleSpacing, n.fillStyle = a.titleColor, n.font = i.string, c = 0; c < o; ++c)
        n.fillText(s[c], d.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + l, c + 1 === o && (t.y += a.titleMarginBottom - l);
    }
  }
  _drawColorBox(t, n, a, s, o) {
    const i = this.labelColors[a], l = this.labelPointStyles[a], { boxHeight: c, boxWidth: d } = o, u = Ht(o.bodyFont), h = Vn(this, "left", o), p = s.x(h), _ = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, f = n.y + _;
    if (o.usePointStyle) {
      const v = {
        radius: Math.min(d, c) / 2,
        pointStyle: l.pointStyle,
        rotation: l.rotation,
        borderWidth: 1
      }, x = s.leftForLtr(p, d) + d / 2, m = f + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Aa(t, v, x, m), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Aa(t, v, x, m);
    } else {
      t.lineWidth = xt(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const v = s.leftForLtr(p, d), x = s.leftForLtr(s.xPlus(p, 1), d - 2), m = Ge(i.borderRadius);
      Object.values(m).some((g) => g !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, Zn(t, {
        x: v,
        y: f,
        w: d,
        h: c,
        radius: m
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), Zn(t, {
        x,
        y: f + 1,
        w: d - 2,
        h: c - 2,
        radius: m
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(v, f, d, c), t.strokeRect(v, f, d, c), t.fillStyle = i.backgroundColor, t.fillRect(x, f + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[a];
  }
  drawBody(t, n, a) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: i, displayColors: l, boxHeight: c, boxWidth: d, boxPadding: u } = a, h = Ht(a.bodyFont);
    let p = h.lineHeight, _ = 0;
    const f = Ze(a.rtl, this.x, this.width), v = function($) {
      n.fillText($, f.x(t.x + _), t.y + p / 2), t.y += p + o;
    }, x = f.textAlign(i);
    let m, g, y, w, S, D, C;
    for (n.textAlign = i, n.textBaseline = "middle", n.font = h.string, t.x = Vn(this, x, a), n.fillStyle = a.bodyColor, Ct(this.beforeBody, v), _ = l && x !== "right" ? i === "center" ? d / 2 + u : d + 2 + u : 0, w = 0, D = s.length; w < D; ++w) {
      for (m = s[w], g = this.labelTextColors[w], n.fillStyle = g, Ct(m.before, v), y = m.lines, l && y.length && (this._drawColorBox(n, t, w, f, a), p = Math.max(h.lineHeight, c)), S = 0, C = y.length; S < C; ++S)
        v(y[S]), p = h.lineHeight;
      Ct(m.after, v);
    }
    _ = 0, p = h.lineHeight, Ct(this.afterBody, v), t.y -= o;
  }
  drawFooter(t, n, a) {
    const s = this.footer, o = s.length;
    let i, l;
    if (o) {
      const c = Ze(a.rtl, this.x, this.width);
      for (t.x = Vn(this, a.footerAlign, a), t.y += a.footerMarginTop, n.textAlign = c.textAlign(a.footerAlign), n.textBaseline = "middle", i = Ht(a.footerFont), n.fillStyle = a.footerColor, n.font = i.string, l = 0; l < o; ++l)
        n.fillText(s[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + a.footerSpacing;
    }
  }
  drawBackground(t, n, a, s) {
    const { xAlign: o, yAlign: i } = this, { x: l, y: c } = t, { width: d, height: u } = a, { topLeft: h, topRight: p, bottomLeft: _, bottomRight: f } = Ge(s.cornerRadius);
    n.fillStyle = s.backgroundColor, n.strokeStyle = s.borderColor, n.lineWidth = s.borderWidth, n.beginPath(), n.moveTo(l + h, c), i === "top" && this.drawCaret(t, n, a, s), n.lineTo(l + d - p, c), n.quadraticCurveTo(l + d, c, l + d, c + p), i === "center" && o === "right" && this.drawCaret(t, n, a, s), n.lineTo(l + d, c + u - f), n.quadraticCurveTo(l + d, c + u, l + d - f, c + u), i === "bottom" && this.drawCaret(t, n, a, s), n.lineTo(l + _, c + u), n.quadraticCurveTo(l, c + u, l, c + u - _), i === "center" && o === "left" && this.drawCaret(t, n, a, s), n.lineTo(l, c + h), n.quadraticCurveTo(l, c, l + h, c), n.closePath(), n.fill(), s.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, a = this.$animations, s = a && a.x, o = a && a.y;
    if (s || o) {
      const i = hn[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const l = this._size = io(this, t), c = Object.assign({}, i, this._size), d = lo(n, t, c), u = ro(t, c, d, n);
      (s._to !== u.x || o._to !== u.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = l.width, this.height = l.height, this.caretX = i.x, this.caretY = i.y, this._resolveAnimations().update(this, u));
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
    const i = ae(n.padding), l = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && l && (t.save(), t.globalAlpha = a, this.drawBackground(o, t, s, n), oi(t, n.textDirection), o.y += i.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), ii(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const a = this._active, s = t.map(({ datasetIndex: l, index: c }) => {
      const d = this.chart.getDatasetMeta(l);
      if (!d)
        throw new Error("Cannot find a dataset at index " + l);
      return {
        datasetIndex: l,
        element: d.data[c],
        index: c
      };
    }), o = !qn(a, s), i = this._positionChanged(s, n);
    (o || i) && (this._active = s, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, a = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], i = this._getActiveElements(t, o, n, a), l = this._positionChanged(i, t), c = n || !qn(i, o) || l;
    return c && (this._active = i, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), c;
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
    const { caretX: a, caretY: s, options: o } = this, i = hn[o.position].call(this, t, n);
    return i !== !1 && (a !== i.x || s !== i.y);
  }
}
var Ja = {
  id: "tooltip",
  _element: ho,
  positioners: hn,
  afterInit(e, t, n) {
    n && (e.tooltip = new ho({
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
    callbacks: Si
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
const xu = (e, t, n, a) => (typeof t == "string" ? (n = e.push(t) - 1, a.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function ku(e, t, n, a) {
  const s = e.indexOf(t);
  if (s === -1)
    return xu(e, t, n, a);
  const o = e.lastIndexOf(t);
  return s !== o ? n : s;
}
const wu = (e, t) => e === null ? null : Wt(Math.round(e), 0, t);
function fo(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Mi extends tn {
  static id = "category";
  static defaults = {
    ticks: {
      callback: fo
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
    if (wt(t))
      return null;
    const a = this.getLabels();
    return n = isFinite(n) && a[n] === t ? n : ku(a, t, pt(n, t), this._addedLabels), wu(n, a.length - 1);
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
    return fo.call(this, t);
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
function Cu(e, t) {
  const n = [], { bounds: s, step: o, min: i, max: l, precision: c, count: d, maxTicks: u, maxDigits: h, includeBounds: p } = e, _ = o || 1, f = u - 1, { min: v, max: x } = t, m = !wt(i), g = !wt(l), y = !wt(d), w = (x - v) / (h + 1);
  let S = fs((x - v) / f / _) * _, D, C, $, B;
  if (S < 1e-14 && !m && !g)
    return [
      {
        value: v
      },
      {
        value: x
      }
    ];
  B = Math.ceil(x / S) - Math.floor(v / S), B > f && (S = fs(B * S / f / _) * _), wt(c) || (D = Math.pow(10, c), S = Math.ceil(S * D) / D), s === "ticks" ? (C = Math.floor(v / S) * S, $ = Math.ceil(x / S) * S) : (C = v, $ = x), m && g && o && Vl((l - i) / o, S / 1e3) ? (B = Math.round(Math.min((l - i) / S, u)), S = (l - i) / B, C = i, $ = l) : y ? (C = m ? i : C, $ = g ? l : $, B = d - 1, S = ($ - C) / B) : (B = ($ - C) / S, pn(B, Math.round(B), S / 1e3) ? B = Math.round(B) : B = Math.ceil(B));
  const T = Math.max(gs(S), gs(C));
  D = Math.pow(10, wt(c) ? T : c), C = Math.round(C * D) / D, $ = Math.round($ * D) / D;
  let L = 0;
  for (m && (p && C !== i ? (n.push({
    value: i
  }), C < i && L++, pn(Math.round((C + L * S) * D) / D, i, go(i, w, e)) && L++) : C < i && L++); L < B; ++L) {
    const E = Math.round((C + L * S) * D) / D;
    if (g && E > l)
      break;
    n.push({
      value: E
    });
  }
  return g && p && $ !== l ? n.length && pn(n[n.length - 1].value, l, go(l, w, e)) ? n[n.length - 1].value = l : n.push({
    value: l
  }) : (!g || $ === l) && n.push({
    value: $
  }), n;
}
function go(e, t, { horizontal: n, minRotation: a }) {
  const s = ve(a), o = (n ? Math.sin(s) : Math.cos(s)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / o, i);
}
class $u extends tn {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return wt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: a } = this.getUserBounds();
    let { min: s, max: o } = this;
    const i = (c) => s = n ? s : c, l = (c) => o = a ? o : c;
    if (t) {
      const c = ue(s), d = ue(o);
      c < 0 && d < 0 ? l(0) : c > 0 && d > 0 && i(0);
    }
    if (s === o) {
      let c = o === 0 ? 1 : Math.abs(o * 0.05);
      l(o + c), t || i(s - c);
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
    }, o = this._range || this, i = Cu(s, o);
    return t.bounds === "ticks" && zl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return ja(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Di extends $u {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: Zo.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ne(t) ? t : 0, this.max = ne(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, a = ve(this.options.ticks.minRotation), s = (t ? Math.sin(a) : Math.cos(a)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const sa = {
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
}, Xt = /* @__PURE__ */ Object.keys(sa);
function po(e, t) {
  return e - t;
}
function mo(e, t) {
  if (wt(t))
    return null;
  const n = e._adapter, { parser: a, round: s, isoWeekday: o } = e._parseOpts;
  let i = t;
  return typeof a == "function" && (i = a(i)), ne(i) || (i = typeof a == "string" ? n.parse(i, a) : n.parse(i)), i === null ? null : (s && (i = s === "week" && (kn(o) || o === !0) ? n.startOf(i, "isoWeek", o) : n.startOf(i, s)), +i);
}
function bo(e, t, n, a) {
  const s = Xt.length;
  for (let o = Xt.indexOf(e); o < s - 1; ++o) {
    const i = sa[Xt[o]], l = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((n - t) / (l * i.size)) <= a)
      return Xt[o];
  }
  return Xt[s - 1];
}
function Su(e, t, n, a, s) {
  for (let o = Xt.length - 1; o >= Xt.indexOf(n); o--) {
    const i = Xt[o];
    if (sa[i].common && e._adapter.diff(s, a, i) >= t - 1)
      return i;
  }
  return Xt[n ? Xt.indexOf(n) : 0];
}
function Mu(e) {
  for (let t = Xt.indexOf(e) + 1, n = Xt.length; t < n; ++t)
    if (sa[Xt[t]].common)
      return Xt[t];
}
function vo(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: a, hi: s } = Va(n, t), o = n[a] >= t ? n[a] : n[s];
    e[o] = !0;
  }
}
function Du(e, t, n, a) {
  const s = e._adapter, o = +s.startOf(t[0].value, a), i = t[t.length - 1].value;
  let l, c;
  for (l = o; l <= i; l = +s.add(l, 1, a))
    c = n[l], c >= 0 && (t[c].major = !0);
  return t;
}
function yo(e, t, n) {
  const a = [], s = {}, o = t.length;
  let i, l;
  for (i = 0; i < o; ++i)
    l = t[i], s[l] = i, a.push({
      value: l,
      major: !1
    });
  return o === 0 || !n ? a : Du(e, a, s, n);
}
class _o extends tn {
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
    const a = t.time || (t.time = {}), s = this._adapter = new Ac._date(t.adapters.date);
    s.init(n), gn(a.displayFormats, s.formats()), this._parseOpts = {
      parser: a.parser,
      round: a.round,
      isoWeekday: a.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : mo(this, t);
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
    function c(d) {
      !i && !isNaN(d.min) && (s = Math.min(s, d.min)), !l && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!i || !l) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), s = ne(s) && !isNaN(s) ? s : +n.startOf(Date.now(), a), o = ne(o) && !isNaN(o) ? o : +n.endOf(Date.now(), a) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
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
    const o = this.min, i = this.max, l = Yl(s, o, i);
    return this._unit = n.unit || (a.autoSkip ? bo(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Su(this, l.length, n.minUnit, this.min, this.max)), this._majorUnit = !a.major.enabled || this._unit === "year" ? void 0 : Mu(this._unit), this.initOffsets(s), t.reverse && l.reverse(), yo(this, l, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, a = 0, s, o;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - s : n = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? a = o : a = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    n = Wt(n, 0, i), a = Wt(a, 0, i), this._offsets = {
      start: n,
      end: a,
      factor: 1 / (n + 1 + a)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, a = this.max, s = this.options, o = s.time, i = o.unit || bo(o.minUnit, n, a, this._getLabelCapacity(n)), l = pt(s.ticks.stepSize, 1), c = i === "week" ? o.isoWeekday : !1, d = kn(c) || c === !0, u = {};
    let h = n, p, _;
    if (d && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, d ? "day" : i), t.diff(a, n, i) > 1e5 * l)
      throw new Error(n + " and " + a + " are too far apart with stepSize of " + l + " " + i);
    const f = s.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, _ = 0; p < a; p = +t.add(p, l, i), _++)
      vo(u, p, f);
    return (p === a || s.bounds === "ticks" || _ === 1) && vo(u, p, f), Object.keys(u).sort(po).map((v) => +v);
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
      return Dt(i, [
        t,
        n,
        a
      ], this);
    const l = o.time.displayFormats, c = this._unit, d = this._majorUnit, u = c && l[c], h = d && l[d], p = a[n], _ = d && h && p && p.major;
    return this._adapter.format(t, s || (_ ? h : u));
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
    const n = this.options.ticks, a = this.ctx.measureText(t).width, s = ve(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(s), i = Math.sin(s), l = this._resolveTickFontOptions(0).size;
    return {
      w: a * o + l * i,
      h: a * i + l * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, a = n.displayFormats, s = a[n.unit] || a.millisecond, o = this._tickFormatFunction(t, 0, yo(this, [
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
      t.push(mo(this, s[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return qo(t.sort(po));
  }
}
function zn(e, t, n) {
  let a = 0, s = e.length - 1, o, i, l, c;
  n ? (t >= e[a].pos && t <= e[s].pos && ({ lo: a, hi: s } = Ne(e, "pos", t)), { pos: o, time: l } = e[a], { pos: i, time: c } = e[s]) : (t >= e[a].time && t <= e[s].time && ({ lo: a, hi: s } = Ne(e, "time", t)), { time: o, pos: l } = e[a], { time: i, pos: c } = e[s]);
  const d = i - o;
  return d ? l + (c - l) * (t - o) / d : l;
}
class MC extends _o {
  static id = "timeseries";
  static defaults = _o.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = zn(n, this.min), this._tableRange = zn(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: a } = this, s = [], o = [];
    let i, l, c, d, u;
    for (i = 0, l = t.length; i < l; ++i)
      d = t[i], d >= n && d <= a && s.push(d);
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
      u = s[i + 1], c = s[i - 1], d = s[i], Math.round((u + c) / 2) !== d && o.push({
        time: d,
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
    return (zn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, a = this.getDecimalForPixel(t) / n.factor - n.end;
    return zn(this._table, a * this._tableRange + this._minPos, !0);
  }
}
const Ai = {
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
}, Au = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, Tu = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...Ai,
  ...Au
}, Bu = Ji[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function qe(e) {
  return Ro(e) ? $a(e) : e;
}
function Lu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return Ro(t) ? new Proxy(e, {}) : e;
}
function Fu(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ti(e, t) {
  e.labels = t;
}
function Bi(e, t, n) {
  const a = [];
  e.datasets = t.map((s) => {
    const o = e.datasets.find((i) => i[n] === s[n]);
    return !o || !s.data || a.includes(o) ? {
      ...s
    } : (a.push(o), Object.assign(o, s), o);
  });
}
function Pu(e, t) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ti(n, e.labels), Bi(n, e.datasets, t), n;
}
const Eu = Q({
  props: Tu,
  setup(e, t) {
    let { expose: n, slots: a } = t;
    const s = ot(null), o = Io(null);
    n({
      chart: o
    });
    const i = () => {
      if (!s.value) return;
      const { type: d, data: u, options: h, plugins: p, datasetIdKey: _ } = e, f = Pu(u, _), v = Lu(f, u);
      o.value = new Be(s.value, {
        type: d,
        data: v,
        options: {
          ...h
        },
        plugins: p
      });
    }, l = () => {
      const d = $a(o.value);
      d && (e.destroyDelay > 0 ? setTimeout(() => {
        d.destroy(), o.value = null;
      }, e.destroyDelay) : (d.destroy(), o.value = null));
    }, c = (d) => {
      d.update(e.updateMode);
    };
    return ie(i), Le(l), Pt([
      () => e.options,
      () => e.data
    ], (d, u) => {
      let [h, p] = d, [_, f] = u;
      const v = $a(o.value);
      if (!v)
        return;
      let x = !1;
      if (h) {
        const m = qe(h), g = qe(_);
        m && m !== g && (Fu(v, m), x = !0);
      }
      if (p) {
        const m = qe(p.labels), g = qe(f.labels), y = qe(p.datasets), w = qe(f.datasets);
        m !== g && (Ti(v.config.data, m), x = !0), y && y !== w && (Bi(v.config.data, y, e.datasetIdKey), x = !0);
      }
      x && zt(() => {
        c(v);
      });
    }, {
      deep: !0
    }), () => Ca("canvas", {
      role: "img",
      "aria-label": e.ariaLabel,
      "aria-describedby": e.ariaDescribedby,
      ref: s
    }, [
      Ca("p", {}, [
        a.default ? a.default() : ""
      ])
    ]);
  }
});
function ts(e, t) {
  return Be.register(t), Q({
    props: Ai,
    setup(n, a) {
      let { expose: s } = a;
      const o = Io(null), i = (l) => {
        o.value = l?.chart;
      };
      return s({
        chart: o
      }), () => Ca(Eu, Bu({
        ref: i
      }, {
        type: e,
        ...n
      }));
    }
  });
}
const Iu = /* @__PURE__ */ ts("bar", Cc), Ru = /* @__PURE__ */ ts("line", Mc), Ou = /* @__PURE__ */ ts("pie", Dc), xo = {
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
}, ko = {
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
}, Vu = [
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
function ft(e) {
  const t = ot("light");
  let n = null;
  const a = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", s = M(() => e?.value ? e.value : t.value), o = M(() => s.value === "dark"), i = M(() => o.value ? ko : xo), l = () => {
    typeof document > "u" || (t.value = a(), n = new MutationObserver((d) => {
      for (const u of d)
        u.attributeName === "class" && (t.value = a());
    }), n.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    }));
  }, c = () => {
    n && (n.disconnect(), n = null);
  };
  return ie(() => {
    l();
  }), Le(() => {
    c();
  }), e && Pt(e, () => {
  }), {
    isDark: o,
    currentTheme: s,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: xo,
    darkColors: ko,
    chartSeriesColors: Vu
  };
}
const es = 5, ns = 8, zu = /^x\d*$/, Nu = /^y\d*$/;
function Li(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, n = t.scales;
  if (!n || typeof n != "object") return t;
  const a = { ...n };
  for (const s of Object.keys(a)) {
    const o = a[s];
    if (!o || typeof o != "object") continue;
    const i = { ...o }, l = i.ticks, c = l && typeof l == "object" ? { ...l } : {};
    zu.test(s) && (c.maxTicksLimit = ns, c.autoSkip = !0, c.minRotation = 0, c.maxRotation = 0, c.autoSkipPadding = c.autoSkipPadding ?? 8), Nu.test(s) && (c.maxTicksLimit = es), i.ticks = c, a[s] = i;
  }
  return t.scales = a, t;
}
const qt = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ju = ["titleFont", "bodyFont", "footerFont"];
function Fi(e, t = qt) {
  if (!e || typeof e != "object") return e;
  const n = { ...e }, a = typeof n.font == "object" && n.font !== null ? n.font : {};
  if (n.font = { ...a, family: t }, n.scales && typeof n.scales == "object") {
    const s = { ...n.scales };
    for (const o of Object.keys(s)) {
      const i = s[o];
      if (!i || typeof i != "object") continue;
      const l = { ...i }, c = l.ticks;
      if (c && typeof c == "object") {
        const u = { ...c }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, l.ticks = u;
      }
      const d = l.title;
      if (d && typeof d == "object") {
        const u = { ...d }, h = typeof u.font == "object" && u.font !== null ? u.font : {};
        u.font = { ...h, family: t }, l.title = u;
      }
      s[o] = l;
    }
    n.scales = s;
  }
  if (n.plugins && typeof n.plugins == "object") {
    const s = { ...n.plugins }, o = s.legend;
    if (o && typeof o == "object") {
      const l = { ...o }, c = l.labels;
      if (c && typeof c == "object") {
        const d = { ...c }, u = typeof d.font == "object" && d.font !== null ? d.font : {};
        d.font = { ...u, family: t }, l.labels = d;
      }
      s.legend = l;
    }
    const i = s.tooltip;
    if (i && typeof i == "object") {
      const l = { ...i };
      for (const c of ju) {
        const d = l[c];
        d && typeof d == "object" && (l[c] = { ...d, family: t });
      }
      s.tooltip = l;
    }
    n.plugins = s;
  }
  return n;
}
const Wu = { class: "relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, wo = 10, Hu = /* @__PURE__ */ Q({
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
    Be.register(Mi, Di, lu, $i, Ja, Qa), Be.defaults.font.family = qt;
    const { isDark: a, colors: s } = ft(ht(n, "theme")), o = M(() => n.data), i = (u) => typeof u == "string" ? u.charAt(0).toUpperCase() + u.slice(1).toLowerCase() : u, l = (u) => typeof u != "string" ? u : n.uppercaseLegendLabels ? u.toUpperCase() : i(u);
    function c(u, h) {
      if (h == null) return u;
      if (Array.isArray(h) || typeof h != "object" || u == null || Array.isArray(u) || typeof u != "object") return h;
      const p = { ...u };
      for (const _ of Object.keys(h)) {
        const f = h[_];
        f !== void 0 && (p[_] = c(u[_], f));
      }
      return p;
    }
    const d = M(() => {
      const u = {
        font: {
          family: qt
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
                family: qt,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: wo,
              boxHeight: wo,
              usePointStyle: !1,
              generateLabels: function(p) {
                return p.data.datasets.map((f, v) => {
                  const x = Array.isArray(f.backgroundColor) ? f.backgroundColor[0] : f.backgroundColor, m = Array.isArray(f.borderColor) ? f.borderColor[0] : f.borderColor, g = typeof m == "string" && m.length > 0 ? m : typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
                  return {
                    text: l(f.label || ""),
                    fillStyle: typeof x == "string" ? x : g,
                    strokeStyle: g,
                    lineWidth: 0,
                    fontColor: g,
                    hidden: !p.isDatasetVisible(v),
                    index: v,
                    datasetIndex: v
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
              family: qt,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: qt,
              size: 12,
              weight: "500"
            },
            boxPadding: 6,
            callbacks: {
              title: function(p) {
                return p.length > 0 ? String(i(p[0].label)) : "";
              },
              label: function(p) {
                let _ = String(i(p.dataset.label || ""));
                return _ && (_ += ": "), p.parsed.y !== null && (_ += p.parsed.y), _;
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
              maxTicksLimit: es,
              font: {
                family: qt,
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
              maxTicksLimit: ns,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: qt,
                size: 12,
                weight: "500"
              },
              color: s.value.textSecondary,
              padding: 8,
              callback: function(p) {
                const _ = this.getLabelForValue(p);
                return i(_);
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
      }, h = n.options ? c(u, n.options) : u;
      return Fi(
        Li(h)
      );
    });
    return t({ isDark: a }), (u, h) => (b(), k("div", Wu, [
      V(F(Iu), {
        data: o.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), it = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, he = /* @__PURE__ */ it(Hu, [["__scopeId", "data-v-ee7ca6f2"]]), Yu = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Ku = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Uu = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, qu = ["aria-pressed", "aria-label", "onClick"], Xu = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Gu = /* @__PURE__ */ Q({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Be.register(
      Mi,
      Di,
      eu,
      tu,
      $i,
      Ja,
      Qa
    ), Be.defaults.font.family = qt;
    const a = ot(null), { isDark: s, colors: o } = ft(ht(n, "theme")), i = M(() => o.value.bgCard), l = M(() => {
      const x = i.value;
      return {
        labels: n.data.labels,
        datasets: n.data.datasets.map((m) => {
          const g = m.borderColor, y = Array.isArray(g) ? g[0] : g, w = typeof y == "string" && y.length > 0 ? y : o.value.textSecondary, S = m.pointBackgroundColor !== void 0 ? m.pointBackgroundColor : x, D = m.pointHoverBackgroundColor !== void 0 ? m.pointHoverBackgroundColor : S, C = m.pointBorderWidth ?? 2, $ = m.pointHoverBorderWidth ?? C;
          return {
            ...m,
            fill: m.fill ?? !1,
            pointBackgroundColor: S,
            pointHoverBackgroundColor: D,
            pointBorderColor: m.pointBorderColor ?? w,
            pointHoverBorderColor: m.pointHoverBorderColor ?? w,
            pointBorderWidth: C,
            pointHoverBorderWidth: $
          };
        })
      };
    }), c = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, d = (x) => typeof x != "string" ? x : n.uppercaseLegendLabels ? x.toUpperCase() : c(x);
    function u(x) {
      const m = x.borderColor, g = Array.isArray(m) ? m[0] : m;
      return typeof g == "string" && g.length > 0 ? g : o.value.textSecondary;
    }
    const h = M(
      () => l.value.datasets.map((x, m) => ({
        key: `${x.label ?? "dataset"}-${m}`,
        label: d(x.label || ""),
        color: u(x)
      }))
    ), p = ot([]);
    Pt(
      () => l.value.datasets.length,
      (x) => {
        const m = Array.from({ length: x }, (g, y) => p.value[y] ?? !0);
        p.value = m;
      },
      { immediate: !0 }
    );
    function _(x) {
      const g = a.value?.chart;
      if (!g || x < 0 || x >= g.data.datasets.length) return;
      const y = !g.isDatasetVisible(x);
      g.setDatasetVisibility(x, y), p.value[x] = y, g.update();
    }
    function f(x, m) {
      if (m == null) return x;
      if (Array.isArray(m) || typeof m != "object" || x == null || Array.isArray(x) || typeof x != "object") return m;
      const g = { ...x };
      for (const y of Object.keys(m)) {
        const w = m[y];
        w !== void 0 && (g[y] = f(x[y], w));
      }
      return g;
    }
    const v = M(() => {
      const x = {
        font: {
          family: qt
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
              family: qt,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: qt,
              size: 13
            },
            callbacks: {
              title: function(y) {
                return y.length > 0 ? String(c(y[0].label)) : "";
              },
              label: function(y) {
                let w = String(c(y.dataset.label || ""));
                return w && (w += ": "), y.parsed.y !== null && (w += y.parsed.y), w;
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
              maxTicksLimit: ns,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: qt,
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
              maxTicksLimit: es,
              font: {
                family: qt,
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
      }, m = n.options ? f(x, n.options) : x;
      return Fi(
        Li(m)
      );
    });
    return t({ isDark: s }), (x, m) => (b(), k("div", Yu, [
      r("div", Ku, [
        V(F(Ru), {
          ref_key: "lineChartRef",
          ref: a,
          data: l.value,
          options: v.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (b(), k("ul", Uu, [
        (b(!0), k(U, null, st(h.value, (g, y) => (b(), k("li", {
          key: g.key,
          role: "listitem"
        }, [
          r("button", {
            type: "button",
            class: H(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", p.value[y] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: gt({ color: g.color }),
            "aria-pressed": p.value[y] !== !1,
            "aria-label": `${g.label}. ${p.value[y] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => _(y)
          }, [
            r("span", Xu, [
              m[0] || (m[0] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              r("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: gt({ borderColor: g.color })
              }, null, 4),
              m[1] || (m[1] = r("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            r("span", null, A(g.label), 1)
          ], 14, qu)
        ]))), 128))
      ])) : O("", !0)
    ]));
  }
}), le = /* @__PURE__ */ it(Gu, [["__scopeId", "data-v-fc764ffb"]]), Zu = { class: "chart-container" }, Qu = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Ju = /* @__PURE__ */ Q({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    Be.register(Hd, Ja, Qa);
    const { isDark: a, colors: s } = ft(ht(n, "theme")), o = n.data, i = (c) => typeof c == "string" ? c.charAt(0).toUpperCase() + c.slice(1).toLowerCase() : c, l = M(() => n.options ? n.options : {
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
              family: Qu,
              size: 13,
              weight: 500
            },
            padding: 16,
            boxWidth: 14,
            boxHeight: 14,
            borderRadius: 4,
            usePointStyle: !0,
            pointStyle: "circle",
            generateLabels: function(c) {
              const d = c.data;
              return d.labels.length && d.datasets.length ? d.labels.map((u, h) => {
                const _ = c.getDatasetMeta(0).controller.getStyle(h), v = d.datasets[0].data[h], x = typeof _.backgroundColor == "string" && _.backgroundColor.length > 0 ? _.backgroundColor : s.value.textSecondary;
                return {
                  text: `${i(u)}: ${v}`,
                  fillStyle: _.backgroundColor,
                  strokeStyle: _.borderColor,
                  lineWidth: _.borderWidth,
                  lineDash: _.borderDash,
                  lineDashOffset: _.borderDashOffset,
                  lineJoin: _.borderJoinStyle,
                  fontColor: x,
                  hidden: !c.getDataVisibility(h),
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
            title: function(c) {
              return c.length > 0 ? String(i(c[0].label)) : "";
            },
            label: function(c) {
              const d = c.label || "", u = c.parsed || 0, h = c.dataset.data.reduce((_, f) => _ + f, 0), p = (u / h * 100).toFixed(1);
              return `${i(d)}: ${u} (${p}%)`;
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
    return t({ isDark: a }), (c, d) => (b(), k("div", Zu, [
      V(F(Ou), {
        data: F(o),
        options: l.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), oa = /* @__PURE__ */ it(Ju, [["__scopeId", "data-v-0f7806d6"]]), th = { class: "chart-container" }, eh = ["viewBox"], nh = ["transform"], ah = ["x", "width", "fill", "stroke"], sh = ["fill"], oh = ["x1", "y1", "x2", "y2", "stroke"], ih = ["points", "fill"], lh = ["x1", "y1", "x2", "y2", "stroke"], rh = ["x", "y", "fill"], ch = ["x1", "y1", "x2", "y2", "stroke"], dh = ["points", "fill"], uh = ["transform"], hh = ["y1", "y2"], fh = ["y1", "y2"], gh = ["y1", "y2"], ph = ["y1", "y2"], mh = ["y", "height"], bh = ["y1", "y2"], vh = ["y1", "y2"], yh = ["y1", "y2"], _h = ["y1", "y2"], xh = ["y", "height"], kh = ["cy", "stroke", "onMouseenter"], wh = ["cy", "stroke", "onMouseenter"], Ch = ["cy", "stroke", "onMouseenter"], $h = ["cy", "stroke", "onMouseenter"], Sh = ["y1", "y2", "onMouseenter"], Mh = ["y1", "y2", "onMouseenter"], Dh = ["x", "y", "fill"], Ah = ["x", "y", "fill"], Th = ["transform"], Bh = { transform: "translate(-200, 0)" }, Lh = ["stroke"], Fh = ["fill"], Ph = { transform: "translate(-130, 0)" }, Eh = ["stroke"], Ih = ["fill"], Rh = { transform: "translate(-60, 0)" }, Oh = ["stroke"], Vh = ["fill"], zh = { transform: "translate(10, 0)" }, Nh = ["stroke"], jh = ["fill"], Wh = { transform: "translate(80, 0)" }, Hh = ["fill"], Yh = { transform: "translate(150, 0)" }, Kh = ["fill"], Uh = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a } = ft(ht(n, "theme")), s = M(() => ({
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
    }), i = (p) => typeof p == "string" ? p.charAt(0).toUpperCase() + p.slice(1).toLowerCase() : p, l = (p, _) => {
      const f = p.currentTarget.closest("svg");
      if (!f) return;
      const v = f.getBoundingClientRect(), x = f.createSVGPoint();
      x.x = p.clientX - v.left, x.y = p.clientY - v.top, o.value = {
        visible: !0,
        x: x.x,
        y: x.y - 20,
        text: _
      };
    }, c = (p) => {
      if (o.value.visible) {
        const _ = p.currentTarget, f = _.getBoundingClientRect(), v = _.createSVGPoint();
        v.x = p.clientX - f.left, v.y = p.clientY - f.top, o.value.x = v.x, o.value.y = v.y - 20;
      }
    }, d = () => {
      o.value.visible = !1;
    }, u = () => {
      o.value.visible = !1;
    }, h = M(() => {
      const p = [], f = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const x = v, m = (x - 1) / 9, g = n.chartMargin + f - m * f;
        p.push({ value: x, y: g });
      }
      return p;
    });
    return t({ isDark: a }), (p, _) => (b(), k("div", th, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: c,
        onMouseleave: d
      }, [
        o.value.visible ? (b(), k("g", {
          key: 0,
          transform: `translate(${o.value.x}, ${o.value.y})`
        }, [
          r("rect", {
            x: -(o.value.text.length * 6 + 10),
            y: -16,
            width: o.value.text.length * 12 + 20,
            height: "24",
            fill: s.value.tooltipBg,
            rx: "6",
            stroke: s.value.tooltipBorder,
            "stroke-width": "1"
          }, null, 8, ah),
          r("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: s.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(o.value.text), 9, sh)
        ], 8, nh)) : O("", !0),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, oh),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: s.value.axis
        }, null, 8, ih),
        (b(!0), k(U, null, st(h.value, (f, v) => (b(), k(U, { key: v }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: f.y,
            x2: e.chartMargin,
            y2: f.y,
            stroke: s.value.tickLine,
            "stroke-width": "1"
          }, null, 8, lh),
          r("text", {
            x: e.chartMargin - 12,
            y: f.y + 4,
            "text-anchor": "end",
            fill: s.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(f.value), 9, rh)
        ], 64))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: s.value.axis,
          "stroke-width": "2"
        }, null, 8, ch),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: s.value.axis
        }, null, 8, dh),
        (b(!0), k(U, null, st(e.boxplotData, (f, v) => (b(), k(U, { key: v }, [
          r("g", {
            transform: `translate(${f.centerX}, 0)`
          }, [
            f.isTotal ? (b(), k(U, { key: 0 }, [
              r("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, hh),
              r("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, fh),
              r("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, gh),
              r("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, ph),
              r("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#8b5cf6",
                "fill-opacity": "0.15",
                stroke: "#8b5cf6",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, mh)
            ], 64)) : (b(), k(U, { key: 1 }, [
              r("line", {
                x1: 0,
                y1: f.minY,
                x2: 0,
                y2: f.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, bh),
              r("line", {
                x1: 0,
                y1: f.q3Y,
                x2: 0,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, vh),
              r("line", {
                x1: -18,
                y1: f.minY,
                x2: 18,
                y2: f.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, yh),
              r("line", {
                x1: -18,
                y1: f.maxY,
                x2: 18,
                y2: f.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, _h),
              r("rect", {
                x: -24,
                y: f.q3Y,
                width: "48",
                height: f.q1Y - f.q3Y,
                fill: "#C67DFF",
                "fill-opacity": "0.15",
                stroke: "#C67DFF",
                "stroke-width": "2.5",
                rx: "4"
              }, null, 8, xh)
            ], 64)),
            r("circle", {
              cx: 0,
              cy: f.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Min: ${f.min.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, kh),
            r("circle", {
              cx: 0,
              cy: f.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Q1: ${f.q1.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, wh),
            r("circle", {
              cx: 0,
              cy: f.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Q3: ${f.q3.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Ch),
            r("circle", {
              cx: 0,
              cy: f.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (x) => l(x, `Max: ${f.max.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, $h),
            r("line", {
              x1: -24,
              y1: f.medianY,
              x2: 24,
              y2: f.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (x) => l(x, `Median: ${f.median.toFixed(1)}`),
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Sh),
            f.averageY ? (b(), k("line", {
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
              onMouseleave: u,
              style: { cursor: "pointer" }
            }, null, 40, Mh)) : O("", !0)
          ], 8, uh),
          r("text", {
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: s.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(f.label)), 9, Dh),
          f.responseCount ? (b(), k("text", {
            key: 0,
            x: f.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: s.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(f.responseCount), 9, Ah)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", Bh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Lh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Fh)
          ]),
          r("g", Ph, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Eh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, Ih)
          ]),
          r("g", Rh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Oh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, Vh)
          ]),
          r("g", zh, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: s.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Nh),
            r("text", {
              x: "10",
              y: "4",
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, jh)
          ]),
          r("g", Wh, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Avg ", 8, Hh)
          ]),
          r("g", Yh, [
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
              fill: s.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Median ", 8, Kh)
          ])
        ], 8, Th)) : O("", !0)
      ], 44, eh))
    ]));
  }
}), qh = /* @__PURE__ */ it(Uh, [["__scopeId", "data-v-9ac5c075"]]), Xh = { class: "chart-container" }, Gh = ["viewBox"], Zh = ["x1", "y1", "x2", "y2", "stroke"], Qh = ["points", "fill"], Jh = ["x1", "y1", "x2", "y2", "stroke"], tf = ["x1", "y1", "x2", "y2", "stroke"], ef = ["x", "y", "fill"], nf = ["x", "y", "fill", "transform"], af = ["x1", "y1", "x2", "y2", "stroke"], sf = ["points", "fill"], of = ["transform"], lf = ["y1", "y2", "stroke", "onMouseenter"], rf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], cf = ["x1", "y1", "x2", "y2", "onMouseenter"], df = ["x1", "y1", "x2", "y2", "onMouseenter"], uf = ["cy", "stroke", "onMouseenter"], hf = ["cy", "stroke", "onMouseenter"], ff = ["x", "y", "fill"], gf = ["x", "y", "fill"], pf = ["transform"], mf = { transform: "translate(-180, 0)" }, bf = ["stroke"], vf = ["fill"], yf = { transform: "translate(-120, 0)" }, _f = ["fill"], xf = { transform: "translate(-60, 0)" }, kf = ["fill"], wf = { transform: "translate(0, 0)" }, Cf = ["stroke"], $f = ["fill"], Sf = { transform: "translate(60, 0)" }, Mf = ["fill"], Df = { transform: "translate(130, 0)" }, Af = ["fill"], Tf = ["transform"], Bf = ["x", "y", "width", "height", "fill", "stroke"], Lf = ["y", "fill"], Ff = ["y", "fill"], Nn = 10, Pf = 14, ya = 13, Co = 4, $o = 12, Ef = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = Nn + ya + Co + $o + Nn, i = M(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(g, y, w) {
      const S = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(g, 1) * y * S);
    }
    function c(g, y) {
      return Math.max(
        l(g.length, ya, !0),
        l(y.length, $o, !1),
        52
      ) + Pf * 2;
    }
    function d(g, y, w, S) {
      const D = w / 2, C = 6, $ = Math.min(
        Math.max(g, D + C),
        n.chartWidth - D - C
      ), B = C + S + 10, T = n.chartHeight - C + 10, L = Math.min(Math.max(y, B), T);
      return { x: $, y: L };
    }
    const u = M(() => ({
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
    })), h = ot({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), p = (g) => typeof g == "string" ? g.charAt(0).toUpperCase() + g.slice(1).toLowerCase() : g, _ = (g, y, w) => {
      const S = g.currentTarget.closest("svg");
      if (!S) return;
      const D = S.getBoundingClientRect(), C = S.createSVGPoint();
      C.x = g.clientX - D.left, C.y = g.clientY - D.top;
      let $ = p(y.label), B = "";
      switch (w) {
        case "body":
          B = `Q1: ${y.q1.toFixed(1)} | Q3: ${y.q3.toFixed(1)}`;
          break;
        case "wick":
          B = `Min: ${y.low.toFixed(1)} | Max: ${y.high.toFixed(1)}`;
          break;
        case "median":
          B = `Median: ${y.median.toFixed(1)}`;
          break;
        case "average":
          B = `Average: ${y.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          B = `Min: ${y.low.toFixed(1)}`;
          break;
        case "max":
          B = `Max: ${y.high.toFixed(1)}`;
          break;
      }
      const T = c($, B), L = o;
      let E = C.x, I = C.y - 20;
      const W = d(E, I, T, L);
      E = W.x, I = W.y, h.value = {
        visible: !0,
        x: E,
        y: I,
        title: $,
        text: B,
        width: T,
        height: L
      };
    }, f = (g) => {
      if (h.value.visible) {
        const y = g.currentTarget, w = y.getBoundingClientRect(), S = y.createSVGPoint();
        S.x = g.clientX - w.left, S.y = g.clientY - w.top;
        let D = S.x, C = S.y - 20;
        const $ = d(D, C, h.value.width, h.value.height);
        h.value.x = $.x, h.value.y = $.y;
      }
    }, v = () => {
      h.value.visible = !1;
    }, x = () => {
      h.value.visible = !1;
    }, m = M(() => {
      const g = [], w = n.chartHeight - n.chartMargin - n.chartBottomMargin;
      for (let S = 1; S <= 10; S++) {
        const D = S, C = (D - 1) / 9, $ = n.chartMargin + w - C * w;
        g.push({ value: D, y: $ });
      }
      return g;
    });
    return t({ isDark: a }), (g, y) => (b(), k("div", Xh, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: gt(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: f,
        onMouseleave: v
      }, [
        y[4] || (y[4] = r("defs", null, [
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
        }, null, 8, Zh),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, Qh),
        (b(!0), k(U, null, st(m.value, (w, S) => (b(), k("line", {
          key: `grid-${S}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Jh))), 128)),
        (b(!0), k(U, null, st(m.value, (w, S) => (b(), k(U, { key: S }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, tf),
          r("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, ef)
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
        }, A(p(e.yAxisLabel)), 9, nf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, af),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, sf),
        (b(!0), k(U, null, st(e.candlestickData, (w, S) => (b(), k(U, { key: S }, [
          r("g", {
            transform: `translate(${w.centerX}, 0)`
          }, [
            r("line", {
              x1: 0,
              y1: w.highY,
              x2: 0,
              y2: w.lowY,
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              class: "hover-line",
              onMouseenter: (D) => _(D, w, "wick"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, lf),
            r("rect", {
              x: -e.candleWidth / 2,
              y: Math.min(w.q1Y, w.q3Y) - (Math.abs(w.q3Y - w.q1Y) < 4 ? 4 : 0),
              width: e.candleWidth,
              height: Math.max(8, Math.abs(w.q3Y - w.q1Y)),
              fill: w.isTotal ? "rgba(139, 92, 246, 0.15)" : "rgba(198, 125, 255, 0.15)",
              stroke: w.isTotal ? "#8b5cf6" : "#C67DFF",
              "stroke-width": "2.5",
              rx: "4",
              class: "hover-rect",
              onMouseenter: (D) => _(D, w, "body"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, rf),
            w.medianY ? (b(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (D) => _(D, w, "median"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, cf)) : O("", !0),
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
              onMouseenter: (D) => _(D, w, "average"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, df)) : O("", !0),
            r("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => _(D, w, "min"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, uf),
            r("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => _(D, w, "max"),
              onMouseleave: x,
              style: { cursor: "pointer" }
            }, null, 40, hf)
          ], 8, of),
          r("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(p(w.label)), 9, ff),
          w.responseCount ? (b(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: u.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, gf)) : O("", !0)
        ], 64))), 128)),
        e.showLegend ? (b(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          r("g", mf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, bf),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, vf)
          ]),
          r("g", yf, [
            y[0] || (y[0] = r("rect", {
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
            }, " Q1 ", 8, _f)
          ]),
          r("g", xf, [
            y[1] || (y[1] = r("rect", {
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
            }, " Q3 ", 8, kf)
          ]),
          r("g", wf, [
            r("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: u.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Cf),
            r("text", {
              x: "10",
              y: "4",
              fill: u.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, $f)
          ]),
          r("g", Sf, [
            y[2] || (y[2] = r("line", {
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
            }, " Avg ", 8, Mf)
          ]),
          r("g", Df, [
            y[3] || (y[3] = r("line", {
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
            }, " Median ", 8, Af)
          ])
        ], 8, pf)) : O("", !0),
        h.value.visible ? (b(), k("g", {
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
          }, null, 8, Bf),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Nn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Lf),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + Nn + ya + Co,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Ff)
        ], 8, Tf)) : O("", !0)
      ], 44, Gh))
    ]));
  }
}), If = /* @__PURE__ */ it(Ef, [["__scopeId", "data-v-22efd66d"]]), Rf = ["viewBox"], Of = ["x1", "y1", "x2", "y2", "stroke"], Vf = ["x1", "y1", "x2", "y2", "stroke"], zf = ["points", "fill"], Nf = ["x1", "y1", "x2", "y2", "stroke"], jf = ["x", "y", "fill"], Wf = ["x", "y", "fill", "transform"], Hf = ["x1", "y1", "x2", "y2", "stroke"], Yf = ["points", "fill"], Kf = ["x1", "y1", "x2", "y2", "stroke"], Uf = ["x", "y", "fill"], qf = ["x", "y", "fill"], Xf = ["d"], Gf = ["x", "y", "width", "height", "onMouseenter"], Zf = ["x1", "y1", "x2", "y2"], Qf = ["x", "y"], Jf = ["x1", "y1", "x2", "y2"], tg = ["x", "y"], eg = ["x1", "y1", "x2", "y2"], ng = ["x", "y"], ag = ["x1", "y1", "x2", "y2"], sg = ["x", "y"], og = ["x1", "y1", "x2", "y2"], ig = ["x", "y"], lg = ["x1", "y1", "x2", "y2"], rg = ["x", "y"], cg = ["transform"], dg = { transform: "translate(-220, 0)" }, ug = ["fill"], hg = { transform: "translate(-140, 0)" }, fg = ["fill"], gg = { transform: "translate(-80, 0)" }, pg = ["fill"], mg = { transform: "translate(-20, 0)" }, bg = ["fill"], vg = { transform: "translate(60, 0)" }, yg = ["fill"], _g = { transform: "translate(130, 0)" }, xg = ["fill"], kg = { transform: "translate(180, 0)" }, wg = ["fill"], Cg = ["transform"], $g = ["x", "y", "width", "height", "fill", "stroke"], Sg = ["y", "fill"], Mg = ["y", "fill"], jn = 10, Dg = 14, _a = 13, So = 12, Mo = 4, Ag = /* @__PURE__ */ Q({
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
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = jn + _a + Mo + So + jn, i = M(() => ({
      bg: s.value.tooltipBg,
      border: s.value.tooltipBorder,
      text: s.value.tooltipText,
      secondary: a.value ? "#d1d5db" : "#e2e8f0"
    }));
    function l(z, Z, J) {
      const dt = J ? 0.6 : 0.535;
      return Math.ceil(Math.max(z, 1) * Z * dt);
    }
    function c(z, Z) {
      return Math.max(
        l(z.length, _a, !0),
        l(Z.length, So, !1),
        52
      ) + Dg * 2;
    }
    function d(z, Z, J, dt) {
      const bt = J / 2, vt = 6, Mt = Math.min(
        Math.max(z, bt + vt),
        n.chartWidth - bt - vt
      ), Vt = vt + dt + 10, Lt = n.chartHeight - vt + 10, R = Math.min(Math.max(Z, Vt), Lt);
      return { x: Mt, y: R };
    }
    const u = M(() => ({
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
    })), h = ot({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0,
      /** Centro SVG X de la barra activa; fija tooltip horizontal sobre la columna correcta cuando el SVG escala por CSS */
      anchorX: null
    }), p = M(() => n.chartWidth - n.chartMargin * 2), _ = M(() => n.chartHeight - n.chartMargin - n.chartBottomMargin), f = M(() => p.value / 10 * 0.6), v = M(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const z = Math.max(...n.histogram.map((J) => J.count || 0), 1), Z = Math.max(1, Math.ceil(z * 0.2));
      return z + Z;
    }), x = M(() => {
      if (!n.histogram || n.histogram.length === 0) return 1;
      const z = n.averageScore || 0;
      let Z = 0, J = 0;
      if (n.histogram.forEach((bt) => {
        const vt = bt.count || 0;
        Z += vt;
        const Mt = bt.score - z;
        J += vt * (Mt * Mt);
      }), Z === 0) return 1;
      const dt = J / Z;
      return Math.sqrt(dt) || 1;
    }), m = (z, Z, J) => {
      if (J === 0) return 0;
      const dt = 1 / (J * Math.sqrt(2 * Math.PI)), bt = -0.5 * Math.pow((z - Z) / J, 2);
      return dt * Math.exp(bt);
    }, g = M(() => {
      if (!n.histogram || n.histogram.length === 0 || n.averageScore === 0 && x.value === 0) return null;
      const z = n.averageScore, Z = x.value, J = 100, bt = Math.max(...n.histogram.map((Lt) => Lt.count || 0), 1) / v.value * _.value;
      if (bt <= 0) return null;
      let vt = 0;
      for (let Lt = 0; Lt <= J; Lt++) {
        const R = 1 + 9 * (Lt / J), j = m(R, z, Z);
        j > vt && (vt = j);
      }
      if (vt <= 0) return null;
      const Mt = bt / vt, Vt = [];
      for (let Lt = 0; Lt <= J; Lt++) {
        const R = 1 + 9 * (Lt / J), j = m(R, z, Z) * Mt, G = w(R);
        if (G !== null) {
          const mt = n.chartHeight - n.chartBottomMargin - j;
          Vt.push(`${Lt === 0 ? "M" : "L"} ${G} ${mt}`);
        }
      }
      return Vt.join(" ");
    }), y = M(() => {
      if (!n.histogram || n.histogram.length === 0) return [];
      const z = p.value / 10;
      return n.histogram.map((Z, J) => {
        const dt = n.chartMargin + (J + 0.5) * z, bt = Z.count > 0 ? Z.count / v.value * _.value : 0, vt = n.chartHeight - n.chartBottomMargin - bt;
        return {
          score: Z.score,
          count: Z.count,
          x: dt,
          y: vt,
          height: bt
        };
      });
    }), w = (z) => {
      if (z < 1 || z > 10) return null;
      const Z = p.value / 10;
      return n.chartMargin + (z - 0.5) * Z;
    }, S = M(() => w(n.minScore)), D = M(() => w(n.maxScore)), C = M(() => w(n.q1Score)), $ = M(() => w(n.medianScore)), B = M(() => w(n.q3Score)), T = M(() => w(n.averageScore)), L = M(() => n.minScore), E = M(() => n.maxScore), I = M(() => n.q1Score), W = M(() => n.medianScore), K = M(() => n.q3Score), N = M(() => n.averageScore), tt = M(() => {
      const z = [], Z = n.chartMargin - 8, J = 18;
      C.value !== null && z.push({
        x: C.value,
        y: Z,
        value: n.q1Score,
        label: `Q1: ${I.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), $.value !== null && z.push({
        x: $.value,
        y: Z - J,
        value: n.medianScore,
        label: `Median: ${W.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), T.value !== null && z.push({
        x: T.value,
        y: Z - J,
        value: n.averageScore,
        label: `Avg: ${N.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && z.push({
        x: B.value,
        y: Z,
        value: n.q3Score,
        label: `Q3: ${K.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), z.sort((vt, Mt) => (vt.x || 0) - (Mt.x || 0));
      const dt = [[], [], []];
      z.forEach((vt) => {
        if (vt.x === null) return;
        let Mt = -1;
        for (let Vt = 0; Vt < dt.length; Vt++) {
          let Lt = !1;
          for (const R of dt[Vt]) {
            if (R.x === null) continue;
            const j = Math.abs(vt.x - R.x), G = (vt.width + R.width) / 2 + 10;
            if (j < G) {
              Lt = !0;
              break;
            }
          }
          if (!Lt) {
            Mt = Vt;
            break;
          }
        }
        Mt === -1 && (Mt = dt.length - 1), vt.y = Z - Mt * J, dt[Mt].push(vt);
      });
      const bt = 15;
      return z.forEach((vt) => {
        vt.y < bt && (vt.y = bt);
      }), z;
    }), et = (z) => tt.value.find((J) => J.id === z)?.y || n.chartMargin - 10, ct = M(() => {
      const z = [];
      for (let J = 0; J <= 5; J++) {
        const dt = Math.round(v.value / 5 * J), bt = n.chartHeight - n.chartBottomMargin - J / 5 * _.value;
        z.push({ value: dt, y: bt });
      }
      return z;
    });
    function q(z, Z, J) {
      const dt = z.createSVGPoint();
      dt.x = Z, dt.y = J;
      const bt = z.getScreenCTM();
      if (!bt) {
        const Mt = z.getBoundingClientRect();
        return { x: Z - Mt.left, y: J - Mt.top };
      }
      const vt = dt.matrixTransform(bt.inverse());
      return { x: vt.x, y: vt.y };
    }
    const nt = (z, Z) => {
      n.interactive && yt(z, Z);
    }, at = () => {
      n.interactive && At();
    }, yt = (z, Z) => {
      const J = z.currentTarget.closest("svg");
      if (!J) return;
      const { x: dt, y: bt } = q(J, z.clientX, z.clientY), vt = `Score: ${Z.score}`, Mt = `Count: ${Number(Z.count ?? 0).toLocaleString()}`, Vt = c(vt, Mt), Lt = o, R = typeof Z?.x == "number" ? Z.x : dt;
      let j = bt - 20;
      const G = d(R, j, Vt, Lt);
      h.value = {
        visible: !0,
        x: G.x,
        y: G.y,
        title: vt,
        text: Mt,
        width: Vt,
        height: Lt,
        anchorX: typeof Z?.x == "number" ? Z.x : null
      };
    }, lt = (z) => {
      if (n.interactive && h.value.visible) {
        const Z = z.currentTarget, { x: J, y: dt } = q(Z, z.clientX, z.clientY), bt = h.value.anchorX, vt = bt != null && Number.isFinite(bt) ? bt : J;
        let Mt = dt - 20;
        const Vt = d(vt, Mt, h.value.width, h.value.height);
        h.value.x = Vt.x, h.value.y = Vt.y;
      }
    }, Et = () => {
      At();
    }, At = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: a }), (z, Z) => (b(), k("div", {
      class: H(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (b(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: gt(`min-height: ${e.chartHeight}px;`),
        onMousemove: lt,
        onMouseleave: Et
      }, [
        Z[7] || (Z[7] = r("defs", null, [
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
        (b(!0), k(U, null, st(ct.value, (J, dt) => (b(), k("line", {
          key: `grid-${dt}`,
          x1: e.chartMargin,
          y1: J.y,
          x2: e.chartWidth - e.chartMargin,
          y2: J.y,
          stroke: u.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Of))), 128)),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Vf),
        r("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: u.value.axis
        }, null, 8, zf),
        (b(!0), k(U, null, st(ct.value, (J, dt) => (b(), k(U, {
          key: `y-tick-${dt}`
        }, [
          r("line", {
            x1: e.chartMargin - 6,
            y1: J.y,
            x2: e.chartMargin,
            y2: J.y,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Nf),
          r("text", {
            x: e.chartMargin - 12,
            y: J.y + 4,
            "text-anchor": "end",
            fill: u.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.value), 9, jf)
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
        }, " Count ", 8, Wf),
        r("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: u.value.axis,
          "stroke-width": "2"
        }, null, 8, Hf),
        r("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: u.value.axis
        }, null, 8, Yf),
        (b(!0), k(U, null, st(y.value, (J, dt) => (b(), k(U, {
          key: `tick-${dt}`
        }, [
          r("line", {
            x1: J.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: J.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: u.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Kf),
          r("text", {
            x: J.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: u.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(J.score), 9, Uf)
        ], 64))), 128)),
        r("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: u.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, qf),
        g.value ? (b(), k("path", {
          key: 0,
          d: g.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Xf)) : O("", !0),
        (b(!0), k(U, null, st(y.value, (J, dt) => (b(), k("rect", {
          key: `bar-${dt}`,
          x: J.x - f.value / 2,
          y: J.y,
          width: f.value,
          height: J.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (bt) => nt(bt, J),
          onMouseleave: at,
          style: gt({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Gf))), 128)),
        S.value ? (b(), k("line", {
          key: 1,
          x1: S.value,
          y1: e.chartMargin,
          x2: S.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Zf)) : O("", !0),
        S.value ? (b(), k("text", {
          key: 2,
          x: S.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(L.value.toFixed(1)), 9, Qf)) : O("", !0),
        C.value ? (b(), k("line", {
          key: 3,
          x1: C.value,
          y1: e.chartMargin,
          x2: C.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Jf)) : O("", !0),
        C.value ? (b(), k("text", {
          key: 4,
          x: C.value,
          y: et("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(I.value.toFixed(1)), 9, tg)) : O("", !0),
        $.value ? (b(), k("line", {
          key: 5,
          x1: $.value,
          y1: e.chartMargin,
          x2: $.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, eg)) : O("", !0),
        $.value ? (b(), k("text", {
          key: 6,
          x: $.value,
          y: et("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(W.value.toFixed(1)), 9, ng)) : O("", !0),
        T.value ? (b(), k("line", {
          key: 7,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, ag)) : O("", !0),
        T.value ? (b(), k("text", {
          key: 8,
          x: T.value,
          y: et("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(N.value.toFixed(1)), 9, sg)) : O("", !0),
        B.value ? (b(), k("line", {
          key: 9,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, og)) : O("", !0),
        B.value ? (b(), k("text", {
          key: 10,
          x: B.value,
          y: et("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(K.value.toFixed(1)), 9, ig)) : O("", !0),
        D.value ? (b(), k("line", {
          key: 11,
          x1: D.value,
          y1: e.chartMargin,
          x2: D.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, lg)) : O("", !0),
        D.value ? (b(), k("text", {
          key: 12,
          x: D.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(E.value.toFixed(1)), 9, rg)) : O("", !0),
        e.showLegend ? (b(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          r("g", dg, [
            Z[0] || (Z[0] = r("line", {
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
            }, " Gaussian ", 8, ug)
          ]),
          r("g", hg, [
            Z[1] || (Z[1] = r("line", {
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
            }, " Min ", 8, fg)
          ]),
          r("g", gg, [
            Z[2] || (Z[2] = r("line", {
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
            }, " Q1 ", 8, pg)
          ]),
          r("g", mg, [
            Z[3] || (Z[3] = r("line", {
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
            }, " Median ", 8, bg)
          ]),
          r("g", vg, [
            Z[4] || (Z[4] = r("line", {
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
            }, " Avg ", 8, yg)
          ]),
          r("g", _g, [
            Z[5] || (Z[5] = r("line", {
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
            }, " Q3 ", 8, xg)
          ]),
          r("g", kg, [
            Z[6] || (Z[6] = r("line", {
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
            }, " Max ", 8, wg)
          ])
        ], 8, cg)) : O("", !0),
        e.interactive && h.value.visible ? (b(), k("g", {
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
          }, null, 8, $g),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + jn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, Sg),
          r("text", {
            x: "0",
            y: -h.value.height - 10 + jn + _a + Mo,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, Mg)
        ], 8, Cg)) : O("", !0)
      ], 44, Rf))
    ], 2));
  }
}), Pi = /* @__PURE__ */ it(Ag, [["__scopeId", "data-v-a1e39e34"]]), Tg = 639, Ei = 1024;
function Do(e) {
  return e < 640 ? "mobile" : e <= Ei ? "tablet" : "desktop";
}
function Bg() {
  const e = ot(
    typeof window > "u" ? "desktop" : Do(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Do(window.innerWidth));
  };
  let n = null, a = null, s = null, o = null;
  ie(() => {
    typeof window > "u" || (t(), n = window.matchMedia(`(max-width: ${Tg}px)`), a = window.matchMedia(`(min-width: 640px) and (max-width: ${Ei}px)`), s = window.matchMedia("(min-width: 1025px)"), o = () => {
      t();
    }, n.addEventListener("change", o), a.addEventListener("change", o), s.addEventListener("change", o));
  }), Le(() => {
    !o || !n || !a || !s || (n.removeEventListener("change", o), a.removeEventListener("change", o), s.removeEventListener("change", o));
  });
  const i = M(() => e.value === "mobile"), l = M(() => e.value === "tablet"), c = M(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: l,
    isDesktop: c
  };
}
const Lg = { class: "chart-container" }, Fg = {
  key: 1,
  class: "chart-wrapper"
}, Pg = /* @__PURE__ */ Q({
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
    os.use([nl, al, sl, ol]);
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), { breakpoint: o } = Bg(), i = ot(null), l = ot(!0), c = ot(!1);
    let d = null;
    const u = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "2%", right: "2%", top: "2%", bottom: "2%" },
      node: { width: 70, gap: 20, align: "left", iterations: 64 },
      style: {
        shadowBlur: 4,
        shadowColor: "rgba(139, 92, 246, 0.15)"
      }
    }, h = M(() => {
      const D = o.value;
      return D === "mobile" ? {
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
      } : D === "tablet" ? {
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
    }), p = (D, C) => {
      const $ = D.trim();
      if (!$ || C < 1) return D;
      if ($.length <= C) return $;
      const B = [];
      let T = 0;
      for (; T < $.length; ) {
        const L = Math.min(T + C, $.length);
        if (L >= $.length) {
          const W = $.slice(T).trim();
          W && B.push(W);
          break;
        }
        const E = $.slice(T, L), I = E.lastIndexOf(" ");
        if (I > 0)
          for (B.push($.slice(T, T + I).trim()), T += I; T < $.length && $[T] === " "; ) T += 1;
        else
          B.push(E), T = L;
      }
      return B.join(`
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
    ], f = () => {
      const D = n.data.links.filter(
        (T) => T.source && T.target && typeof T.value == "number"
      ), C = Math.max(...D.map((T) => T.value), 1), $ = Math.max(1, C * 0.01), B = D.map((T) => ({
        ...T,
        originalValue: T.value,
        value: T.value < C * 0.01 ? $ : T.value
      }));
      return {
        nodes: n.data.nodes.filter((T) => T.name),
        links: B
      };
    }, v = (D) => D.map((C, $) => ({
      ...C,
      itemStyle: {
        color: n.nodeColors[C.name] || _[$ % _.length],
        borderRadius: 8
      }
    })), x = (D) => (C) => {
      const $ = C.dataType === "node", B = s.value.tooltipText, T = a.value ? "#d1d5db" : "#e2e8f0";
      if ($) {
        const K = D.filter((et) => et.target === C.name), N = D.filter((et) => et.source === C.name), tt = K.length > 0 ? K.reduce((et, ct) => et + (ct.originalValue || ct.value), 0) : N.reduce((et, ct) => et + (ct.originalValue || ct.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${B};">${C.name}</div><div style="color: ${T}; font-size: 12px;">Count: ${tt.toLocaleString()}</div>`;
      }
      const L = C.data?.source || C.source || "Unknown", E = C.data?.target || C.target || "Unknown", I = C.data?.originalValue || C.data?.value || C.value || 0, W = C.data?.label || `${I.toLocaleString()}`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${B};">${L} → ${E}</div><div style="color: ${T}; font-size: 12px;">Flow: ${W}</div>`;
    }, m = () => {
      if (!d || !n.data.nodes?.length || !n.data.links?.length) return;
      const D = h.value, C = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)", $ = a.value ? "rgb(34, 34, 45)" : "rgb(240, 240, 242)";
      try {
        const { nodes: B, links: T } = f(), L = v(B), E = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: x(T),
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
              data: L,
              links: T,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: $,
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
              itemStyle: u.style,
              label: {
                show: !0,
                position: D.labelPosition,
                /** Dark: external labels (e.g. mobile `right`) use light text; inside nodes stay dark for contrast on pastel bars. */
                color: D.labelPosition === "right" && a.value ? s.value.textPrimary : "#0f172a",
                fontWeight: 600,
                fontSize: D.labelFontSize,
                ...D.labelWrap && D.labelLineHeight > 0 ? { lineHeight: D.labelLineHeight } : {},
                ...D.labelWrap && D.labelTextWidth > 0 ? { width: D.labelTextWidth, overflow: "none" } : {},
                ...D.labelDistance > 0 ? { distance: D.labelDistance } : {},
                fontFamily: "'DM Sans', sans-serif",
                formatter: (I) => {
                  const W = I.name || "";
                  if (D.labelWrap)
                    return p(W, Math.max(4, D.labelCharsPerLine));
                  const K = D.labelMaxChars;
                  return W.length > K ? `${W.substring(0, K)}...` : W;
                }
              },
              edgeLabel: D.edgeLabelShow ? {
                show: !0,
                fontSize: D.edgeLabelFontSize,
                color: s.value.textSecondary,
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                formatter: (I) => {
                  const W = I.data?.originalValue || I.value || 0;
                  return I.data?.label || `${W.toLocaleString()}`;
                }
              } : { show: !1 },
              nodeAlign: u.node.align,
              nodeGap: D.nodeGap,
              nodeWidth: D.nodeWidth,
              layoutIterations: u.node.iterations,
              orient: D.orient,
              draggable: !1,
              ...D.contentMargins
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: u.animation.duration,
          animationEasing: u.animation.easing
        };
        d.setOption(E), d.resize();
      } catch (B) {
        console.error("Error setting Sankey chart options:", B), c.value = !0;
      }
    }, g = async () => {
      if (i.value)
        try {
          d = os.init(i.value), m(), window.addEventListener("resize", w);
        } catch (D) {
          console.error("Error initializing Sankey chart:", D), c.value = !0;
        } finally {
          l.value = !1;
        }
    }, y = async (D = 40) => {
      await zt();
      for (let C = 0; C < D; C++) {
        if (i.value?.clientWidth && i.value.clientWidth > 0 && i.value?.clientHeight && i.value.clientHeight > 0)
          return await g();
        await new Promise(($) => setTimeout($, 50));
      }
      await g(), setTimeout(w, 50);
    }, w = () => d?.resize(), S = () => {
      window.removeEventListener("resize", w), d && (d.dispose(), d = null);
    };
    return ie(() => i.value && y()), Oo(S), Pt(() => n.data, m, { deep: !0 }), Pt(a, m), Pt(o, m), t({ isDark: a }), (D, C) => (b(), k("div", Lg, [
      c.value ? (b(), k("div", {
        key: 0,
        class: "error-state",
        style: gt({ height: e.height })
      }, [...C[0] || (C[0] = [
        ss('<div class="error-content" data-v-eb927194><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb927194><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-eb927194></path></svg><p class="error-title" data-v-eb927194>Chart could not be loaded</p><p class="error-description" data-v-eb927194>Please check the data format.</p></div>', 1)
      ])], 4)) : (b(), k("div", Fg, [
        Gt(r("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content",
          style: gt({ height: e.height })
        }, null, 4), [
          [vn, !l.value]
        ]),
        Gt(r("div", {
          class: "loading-state",
          style: gt({ height: e.height })
        }, [...C[1] || (C[1] = [
          ss('<div class="loading-container" data-v-eb927194><div class="sankey-loader" data-v-eb927194><div class="flow flow-1" data-v-eb927194></div><div class="flow flow-2" data-v-eb927194></div><div class="flow flow-3" data-v-eb927194></div><div class="flow flow-4" data-v-eb927194></div></div><p class="loading-text" data-v-eb927194>Loading Sankey diagram...</p></div>', 1)
        ])], 4), [
          [vn, l.value]
        ])
      ]))
    ]));
  }
}), Fe = /* @__PURE__ */ it(Pg, [["__scopeId", "data-v-eb927194"]]), Eg = ["open"], Ig = { class: "card-header metric-collapsible__summary" }, Rg = { class: "header-content metric-header-content" }, Og = { class: "metric-header-content__main" }, Vg = { class: "metric-header-content__text" }, zg = {
  key: 0,
  class: "card-title"
}, Ng = {
  key: 0,
  class: "card-subtitle"
}, jg = {
  key: 0,
  class: "metric-header-content__export"
}, Wg = {
  key: 0,
  class: "cmc-header-aside"
}, Hg = { class: "chart-metric-container__body" }, Yg = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Kg = { class: "card-header" }, Ug = { class: "header-content metric-header-content" }, qg = { class: "metric-header-content__main" }, Xg = { class: "metric-header-content__text" }, Gg = {
  key: 0,
  class: "card-title"
}, Zg = {
  key: 0,
  class: "card-subtitle"
}, Qg = {
  key: 0,
  class: "metric-header-content__export"
}, Jg = {
  key: 0,
  class: "cmc-header-aside"
}, tp = { class: "chart-metric-container__body" }, ep = /* @__PURE__ */ Q({
  __name: "ChartMetricContainer",
  props: {
    title: { default: "" },
    subtitle: {},
    collapsible: { type: Boolean, default: !0 },
    defaultOpen: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = ot(t.defaultOpen), a = Fa();
    function s(l) {
      return l.some((c) => {
        if (c.type === tl) return !1;
        if (c.type === Text) {
          const d = c.children;
          return typeof d == "string" && d.trim().length > 0;
        }
        return !!c.type;
      });
    }
    const o = M(() => {
      if (t.collapsible && !n.value) return !1;
      const l = a.headerExport;
      return l ? s(l()) : !1;
    });
    Pt(
      () => t.defaultOpen,
      (l) => {
        t.collapsible && (n.value = l);
      }
    );
    function i(l) {
      const c = l.currentTarget;
      c?.tagName === "DETAILS" && (n.value = c.open);
    }
    return (l, c) => e.collapsible ? (b(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: n.value,
      onToggle: i
    }, [
      r("summary", Ig, [
        r("div", Rg, [
          r("div", Og, [
            r("div", Vg, [
              St(l.$slots, "title", {}, () => [
                e.title ? (b(), k("h3", zg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (b(), k("p", Ng, A(e.subtitle), 1)) : O("", !0),
              St(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (b(), k("div", jg, [
              St(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", Wg, [
            St(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ]),
        c[0] || (c[0] = r("svg", {
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
      r("div", Hg, [
        St(l.$slots, "default", {}, void 0, !0)
      ])
    ], 40, Eg)) : (b(), k("div", Yg, [
      r("div", Kg, [
        r("div", Ug, [
          r("div", qg, [
            r("div", Xg, [
              St(l.$slots, "title", {}, () => [
                e.title ? (b(), k("h3", Gg, A(e.title), 1)) : O("", !0)
              ], !0),
              e.subtitle ? (b(), k("p", Zg, A(e.subtitle), 1)) : O("", !0),
              St(l.$slots, "headerAppend", {}, void 0, !0)
            ]),
            o.value ? (b(), k("div", Qg, [
              St(l.$slots, "headerExport", {}, void 0, !0)
            ])) : O("", !0)
          ]),
          l.$slots.headerAside ? (b(), k("div", Jg, [
            St(l.$slots, "headerAside", {}, void 0, !0)
          ])) : O("", !0)
        ])
      ]),
      r("div", tp, [
        St(l.$slots, "default", {}, void 0, !0)
      ])
    ]));
  }
}), ut = /* @__PURE__ */ it(ep, [["__scopeId", "data-v-3c4aac03"]]);
function np(e, t) {
  return b(), k("svg", {
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
function Ii(e, t) {
  return b(), k("svg", {
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
function Kt(e, t) {
  return b(), k("svg", {
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
function ap(e, t) {
  return b(), k("svg", {
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
function Ri(e, t) {
  return b(), k("svg", {
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
function sp(e, t) {
  return b(), k("svg", {
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
function op(e, t) {
  return b(), k("svg", {
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
function ip(e, t) {
  return b(), k("svg", {
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
function lp(e, t) {
  return b(), k("svg", {
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
function Oi(e, t) {
  return b(), k("svg", {
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
}, gp = ["disabled"], pp = {
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
}, bp = /* @__PURE__ */ Q({
  __name: "FooterExport",
  props: {
    formats: { default: () => ["pdf", "csv"] },
    loading: { type: Boolean, default: !1 },
    variant: { default: "footer" }
  },
  emits: ["export"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = M(() => n.variant === "footer" ? "footer" : "div"), o = M(
      () => n.variant === "footer" ? "chart-footer" : "chart-export-inline"
    ), i = (c) => n.formats.includes(c), l = (c) => {
      n.loading || a("export", c);
    };
    return (c, d) => (b(), Y(Xe(s.value), {
      class: H(o.value)
    }, {
      default: P(() => [
        e.variant === "footer" ? (b(), k("div", rp)) : O("", !0),
        r("div", {
          class: H(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (b(), k("span", cp, "Export")) : O("", !0),
          r("div", dp, [
            i("pdf") ? (b(), k("button", {
              key: 0,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: d[0] || (d[0] = (u) => l("pdf"))
            }, [
              e.loading ? (b(), k("svg", hp, [...d[2] || (d[2] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", fp, [...d[3] || (d[3] = [
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
              d[4] || (d[4] = r("span", null, "PDF", -1))
            ], 10, up)) : O("", !0),
            i("csv") ? (b(), k("button", {
              key: 1,
              type: "button",
              class: H(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: d[1] || (d[1] = (u) => l("csv"))
            }, [
              e.loading ? (b(), k("svg", pp, [...d[5] || (d[5] = [
                r("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                r("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (b(), k("svg", mp, [...d[6] || (d[6] = [
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
              d[7] || (d[7] = r("span", null, "CSV", -1))
            ], 10, gp)) : O("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Tt = /* @__PURE__ */ it(bp, [["__scopeId", "data-v-33a9d528"]]), vp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, yp = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, _p = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, xp = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, kp = { class: "w-full shrink-0 sm:pr-2" }, wp = {
  key: 2,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Cp = { class: "max-w-[360px] text-center" }, $p = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Sp = /* @__PURE__ */ Q({
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
    }, s = e, o = n, i = (f) => {
      o("export", f);
    }, l = [30, 50, 70, 50, 40], c = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], d = ht(s, "theme"), u = ht(s, "options"), { isDark: h } = ft(d), p = (f) => {
      const v = new Date(f), x = String(v.getDate()).padStart(2, "0"), m = String(v.getMonth() + 1).padStart(2, "0");
      return `${x}-${m}`;
    }, _ = M(() => {
      const f = s.data?.agents_by_day || {}, v = Object.keys(f).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const x = v.map((S) => p(S)), m = /* @__PURE__ */ new Set();
      for (const S of Object.values(f))
        for (const D of Object.keys(S))
          m.add(D);
      const g = Array.from(m), y = (S) => S, w = g.map((S) => ({
        label: S,
        data: v.map((D) => f[D]?.[S] || 0),
        backgroundColor: `${a[S] || "#94a3b8"}80`,
        borderColor: y(a[S] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: x,
        datasets: w
      };
    });
    return t({ isDark: h }), (f, v) => (b(), Y(ut, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", vp, [
          e.loading ? (b(), k("div", yp, [
            r("div", _p, [
              (b(), k(U, null, st(l, (x, m) => r("div", {
                key: m,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", c[m]]),
                style: gt({ height: `${x}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : _.value.labels && _.value.labels.length ? (b(), k("section", xp, [
            r("div", kp, [
              V(he, {
                data: _.value,
                stacked: !0,
                theme: d.value,
                options: u.value
              }, null, 8, ["data", "theme", "options"])
            ])
          ])) : (b(), k("section", wp, [
            r("div", Cp, [
              r("div", $p, [
                V(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
              ]),
              v[1] || (v[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
              v[2] || (v[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Mp = { class: "flex w-full min-w-0 justify-center" }, Dp = { class: "flex max-w-full min-w-0 items-center gap-2" }, Ap = { class: "min-w-0 truncate text-[12px] leading-normal" }, Tp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, Bp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, Lp = /* @__PURE__ */ Q({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, n) => (b(), k("div", {
      class: H(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      r("div", Mp, [
        r("div", Dp, [
          e.color ? (b(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: gt({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", Ap, A(e.title), 1)
        ])
      ]),
      r("p", Tp, A(e.value), 1),
      e.subvalue ? (b(), k("p", Bp, A(e.subvalue), 1)) : O("", !0)
    ], 2));
  }
}), rt = /* @__PURE__ */ it(Lp, [["__scopeId", "data-v-945ff8fb"]]), Fp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Nt = /* @__PURE__ */ Q({
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
    const t = e, n = M(
      () => t.statusLive === !0 || t.statusLive === !1
    ), a = M(
      () => t.statusLive === !0 ? t.labelConnected : t.labelDisconnected
    ), s = M(() => t.statusLive === !0 ? [
      "border border-emerald-200 bg-emerald-50",
      "dark:border-emerald-800/80 dark:bg-emerald-950/40"
    ] : [
      "border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90"
    ]), o = M(() => t.statusLive === !0 ? "text-emerald-700 dark:text-emerald-300" : "text-[color:var(--kiut-text-primary)] dark:text-slate-300"), i = M(() => {
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
    return (l, c) => n.value ? (b(), k("span", {
      key: 0,
      role: "status",
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", s.value])
    }, [
      e.statusLive === !0 ? (b(), k("span", Fp, [...c[0] || (c[0] = [
        r("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        r("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : O("", !0),
      r("span", {
        class: H(["min-w-0 flex-1 text-center", o.value])
      }, A(a.value), 3)
    ], 2)) : (b(), k("span", {
      key: 1,
      class: H(["inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight", i.value])
    }, [
      St(l.$slots, "default", {}, () => [
        _t(A(e.label), 1)
      ])
    ], 2));
  }
}), X = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), kt = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), we = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), n = e < 0 ? "-" : "";
  return t >= 1e6 ? `${n}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${n}${(t / 1e3).toFixed(1)}K` : `${n}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, Pp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, Ep = { class: "overflow-x-auto" }, Ip = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, Rp = /* @__PURE__ */ Q({
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
    const t = e, n = ot(!1), a = "—";
    function s(v) {
      return v == null || v === "" ? a : String(v);
    }
    function o(v) {
      return v === "center" ? "text-center" : v === "right" ? "text-right" : "text-left";
    }
    function i(v) {
      return `cell-${v}`;
    }
    function l(v, x) {
      return v[x];
    }
    function c(v, x) {
      if (typeof t.rowKey == "function")
        return t.rowKey(v);
      const m = v[t.rowKey];
      return typeof m == "string" || typeof m == "number" ? m : x;
    }
    function d(v, x) {
      return c(v, x);
    }
    const u = M(() => t.rows?.length ?? 0), h = M(() => u.value > t.maxVisibleRows), p = M(() => Math.max(0, u.value - t.maxVisibleRows)), _ = M(() => t.rows?.length ? n.value || !h.value ? t.rows : t.rows.slice(0, t.maxVisibleRows) : []), f = M(
      () => t.viewMoreLabel.replace(/\{count\}/g, String(p.value))
    );
    return (v, x) => (b(), k("div", Pp, [
      r("div", Ep, [
        r("table", Ip, [
          r("thead", null, [
            r("tr", null, [
              (b(!0), k(U, null, st(e.columns, (m) => (b(), k("th", {
                key: m.key,
                scope: "col",
                class: H(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [o(m.align), m.headerClass]])
              }, A(m.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (b(!0), k(U, null, st(_.value, (m, g) => (b(), k("tr", {
              key: d(m, g)
            }, [
              (b(!0), k(U, null, st(e.columns, (y) => (b(), k("td", {
                key: `${g}-${y.key}`,
                class: H(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [o(y.align), y.cellClass]])
              }, [
                St(v.$slots, i(y.key), {
                  row: m,
                  column: y,
                  value: l(m, y.key)
                }, () => [
                  _t(A(s(l(m, y.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      h.value ? (b(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: x[0] || (x[0] = (m) => n.value = !n.value)
      }, [
        _t(A(n.value ? e.viewLessLabel : f.value) + " ", 1),
        (b(), k("svg", {
          class: H(["view-more-icon", { "view-more-icon-rotated": n.value }]),
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
          "aria-hidden": "true"
        }, [...x[1] || (x[1] = [
          r("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M19 9l-7 7-7-7"
          }, null, -1)
        ])], 2))
      ])) : O("", !0)
    ]));
  }
}), Qt = /* @__PURE__ */ it(Rp, [["__scopeId", "data-v-58cfdc5e"]]), Op = {
  key: 0,
  class: "loading-state"
}, Vp = {
  key: 1,
  class: "error-state"
}, zp = { class: "error-content" }, Np = { class: "error-description" }, jp = {
  key: 2,
  class: "card-body"
}, Wp = { class: "chart-section" }, Hp = { class: "chart-wrapper" }, Yp = { class: "payment-success-summary" }, Kp = {
  key: 0,
  class: "booking-daily-section"
}, Up = { class: "w-full min-w-0" }, qp = { class: "font-medium" }, Xp = { class: "percentage-text" }, Gp = { class: "badges-container" }, Zp = {
  key: 0,
  class: "badges-container"
}, Qp = {
  key: 1,
  class: "percentage-text"
}, Jp = { class: "badges-container" }, tm = {
  key: 1,
  class: "empty-state"
}, em = /* @__PURE__ */ Q({
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
    function n(g) {
      return g;
    }
    const a = e, s = t, o = (g) => {
      s("export", g);
    }, i = M(() => a.data?.booking_manager_by_day ? [...a.data.booking_manager_by_day].sort(
      (g, y) => new Date(g.date).getTime() - new Date(y.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], c = M(
      () => i.value.map((g) => ({
        id: g.date,
        ...g
      }))
    ), d = M(() => a.data?.total_payment_success_value || []), u = M(() => {
      const g = d.value;
      return g.length === 0 ? f(0) : g.map((y) => `${y.currency} ${f(y.total_value)}`).join(" · ");
    }), h = (g) => g.payment_success_value || [], p = (g) => typeof g.payment_success_count == "number" ? g.payment_success_count : (g.payment_success_value || []).reduce((y, w) => y + (w.count || 0), 0), _ = (g) => kt(g), f = (g) => g == null ? "0" : we(g);
    M(() => (a.data?.total_payment_success_value || []).reduce((g, y) => g + (y.total_value || 0), 0));
    const v = M(() => {
      const g = a.data, y = g.total_booking_initiated || 0, w = g.total_booking_started || 0, S = g.total_payment_initiated || 0, D = g.total_not_found || 0, C = g.total_cancelled || 0, $ = g.total_no_pending_balance || 0, B = g.total_errors || 0, T = typeof g.total_payment_success == "number" ? g.total_payment_success : (g.total_payment_success_value || []).reduce((tt, et) => tt + (et.count || 0), 0), L = g.total_payment_failed || 0, E = Math.max(0, y - w), I = Math.max(0, w - S - D - C - $ - B), W = (tt, et) => {
        const ct = et > 0 ? Math.round(tt / et * 100) : 0;
        return `${X(tt)} (${ct}%)`;
      }, K = [
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
      ], N = [];
      return w > 0 && N.push({
        source: "Initiated",
        target: "Started",
        value: w,
        label: W(w, y)
      }), E > 0 && N.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: E,
        label: W(E, y)
      }), S > 0 && N.push({
        source: "Started",
        target: "Payment Initiated",
        value: S,
        label: W(S, w)
      }), D > 0 && N.push({
        source: "Started",
        target: "Not Found",
        value: D,
        label: W(D, w)
      }), C > 0 && N.push({
        source: "Started",
        target: "Cancelled",
        value: C,
        label: W(C, w)
      }), $ > 0 && N.push({
        source: "Started",
        target: "No Pending Balance",
        value: $,
        label: W($, w)
      }), B > 0 && N.push({
        source: "Started",
        target: "Errors",
        value: B,
        label: W(B, w)
      }), I > 0 && N.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: W(I, w)
      }), T > 0 && N.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: T,
        label: W(T, S)
      }), L > 0 && N.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: L,
        label: W(L, S)
      }), { nodes: K, links: N };
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
    }, m = (g, y) => !y || y === 0 ? "0%" : `${Math.round(g / y * 100)}%`;
    return (g, y) => (b(), Y(ut, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis"
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading && !a.error ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        a.loading ? (b(), k("div", Op, [...y[0] || (y[0] = [
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
        ])])) : a.error ? (b(), k("div", Vp, [
          r("div", zp, [
            y[1] || (y[1] = r("div", { class: "error-icon-wrapper" }, [
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
            y[2] || (y[2] = r("p", { class: "error-title" }, "Error loading data", -1)),
            r("p", Np, A(a.error), 1)
          ])
        ])) : (b(), k("div", jp, [
          r("section", Wp, [
            r("div", Hp, [
              V(Fe, {
                data: v.value,
                "node-colors": x,
                height: "500px",
                "node-gap": 15
              }, null, 8, ["data"])
            ])
          ]),
          r("section", Yp, [
            V(rt, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value.length > 0 ? (b(), k("section", Kp, [
            y[3] || (y[3] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", Up, [
              V(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: w }) => [
                  r("span", qp, A(F(It)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: w }) => [
                  r("span", null, A(F(X)(Number(w.booking_initiated_count))), 1)
                ]),
                "cell-started": P(({ row: w }) => [
                  r("span", null, [
                    _t(A(F(X)(Number(w.booking_started_count))) + " ", 1),
                    r("span", Xp, " (" + A(m(Number(w.booking_started_count), Number(w.booking_initiated_count))) + ") ", 1)
                  ])
                ]),
                "cell-paymentInitiated": P(({ row: w }) => [
                  r("span", null, A(F(X)(Number(w.payment_initiated_count))), 1)
                ]),
                "cell-paymentResults": P(({ row: w }) => [
                  r("div", Gp, [
                    V(Nt, { color: "success" }, {
                      default: P(() => [
                        _t(" Success: " + A(F(X)(p(w))), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Nt, { color: "danger" }, {
                      default: P(() => [
                        _t(" Failed: " + A(F(X)(Number(w.payment_failed_count) || 0)), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                "cell-paymentValue": P(({ row: w }) => [
                  h(w).length > 0 ? (b(), k("div", Zp, [
                    (b(!0), k(U, null, st(h(w), (S) => (b(), k("span", {
                      key: `${w.date}-${S.currency}`,
                      class: "badge badge-currency"
                    }, A(S.currency) + " " + A(_(S.total_value)), 1))), 128))
                  ])) : (b(), k("span", Qp, "N/A"))
                ]),
                "cell-outcomes": P(({ row: w }) => [
                  r("div", Jp, [
                    V(Nt, { color: "danger" }, {
                      default: P(() => [
                        _t(" Not Found: " + A(w.not_found_count ? F(X)(Number(w.not_found_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Nt, { color: "warning" }, {
                      default: P(() => [
                        _t(" Cancelled: " + A(w.cancelled_count ? F(X)(Number(w.cancelled_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Nt, { color: "orange" }, {
                      default: P(() => [
                        _t(" No Balance: " + A(w.no_pending_balance_count ? F(X)(Number(w.no_pending_balance_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024),
                    V(Nt, { color: "danger" }, {
                      default: P(() => [
                        _t(" Errors: " + A(w.error_count ? F(X)(Number(w.error_count)) : "N/A"), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", tm, [...y[4] || (y[4] = [
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
      _: 1
    }));
  }
}), nm = /* @__PURE__ */ it(em, [["__scopeId", "data-v-37b8c59e"]]), am = {
  key: 0,
  class: "loading-state"
}, sm = {
  key: 1,
  class: "card-body"
}, om = {
  key: 0,
  class: "chart-section"
}, im = { class: "chart-wrapper" }, lm = {
  key: 1,
  class: "checkin-daily-section"
}, rm = { class: "w-full min-w-0" }, cm = { class: "font-medium" }, dm = { class: "cell-success" }, um = { class: "cell-danger" }, hm = {
  key: 0,
  class: "reasons-list"
}, fm = { class: "reason-name" }, gm = { class: "reason-count" }, pm = {
  key: 1,
  class: "no-reasons"
}, mm = {
  key: 2,
  class: "empty-state"
}, bm = {
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
    const n = t, a = (g) => {
      n("export", g);
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
    }, l = ot([]), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "passengers", label: "Number of Passengers", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Failed (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], d = M(
      () => (l.value || []).map((g) => ({
        id: g.date,
        date: g.date,
        checkin_initiated_count: g.checkin_initiated_count,
        checkin_init_count: g.checkin_init_count,
        checkin_started_count: g.checkin_started_count,
        checkin_completed_count: g.checkin_completed_count,
        checkin_closed_count: g.checkin_closed_count,
        failed_steps: g.failed_steps
      }))
    ), u = M(() => {
      const g = s.data;
      return g && (Array.isArray(g.checkin_by_day) && g.checkin_by_day.length > 0 || (g.total_checkin_initiated ?? 0) > 0) ? { ...o, ...g } : s.checkinData ?? o;
    }), h = M(() => {
      const g = s.data;
      return g && (Array.isArray(g.failed_by_step_by_day) && g.failed_by_step_by_day.length > 0 || Array.isArray(g.unrecovered_by_step) && g.unrecovered_by_step.length > 0) ? {
        ...i,
        total_checkin_failed: g.total_checkin_failed ?? 0,
        total_checkin_unrecovered: g.total_checkin_unrecovered ?? 0,
        failed_by_step_by_day: g.failed_by_step_by_day ?? [],
        unrecovered_by_step: g.unrecovered_by_step ?? [],
        unrecovered_by_day: g.unrecovered_by_day ?? []
      } : s.failedData ?? i;
    }), p = M(() => {
      const g = {
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
        const D = w.step_name.replace(/_/g, " ").split(" ").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" "), C = {
          "Get Seatmap": "#DC2626",
          "Save Missing Info": "#F87171",
          "Checkin Segments": "#EF4444",
          "Assign Seat": "#F87171"
        };
        g[D] = C[D] || "#DC2626";
      }), g;
    }), _ = (g, y) => !y || y === 0 ? "0%" : `${Math.round(g / y * 100)}%`, f = (g, y) => {
      const w = X(g), S = _(g, y);
      return `${w} (${S})`;
    }, v = (g) => g.reduce((y, w) => y + w.failed_count, 0), x = M(() => {
      const g = [], y = [];
      if (!u.value.total_checkin_initiated)
        return { nodes: g, links: y };
      g.push({ name: "Checkin Init" }), g.push({ name: "Booking retrive" }), g.push({ name: "Booking retrive success" }), g.push({ name: "Number of Passengers" }), g.push({ name: "Completed" }), g.push({ name: "Closed with BP" });
      const w = u.value.total_checkin_initiated, S = u.value.total_checkin_init, D = u.value.total_checkin_init_abandoned, C = S - D, $ = u.value.total_checkin_started, B = u.value.total_checkin_completed, T = u.value.total_checkin_closed, L = h.value.unrecovered_by_step || [], E = L.reduce((N, tt) => N + tt.count, 0);
      if (S > 0) {
        const N = Math.round(S / w * 100);
        y.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: S,
          label: `${S.toLocaleString()} (${N}%)`
        });
      }
      const I = w - S;
      if (I > 0) {
        const N = Math.round(I / w * 100);
        g.push({ name: "Abandoned (Init)" }), y.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: I,
          label: `${I.toLocaleString()} (${N}%)`
        });
      }
      if (D > 0) {
        const N = Math.round(D / w * 100);
        g.push({ name: "Abandoned (Started)" }), y.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: D,
          label: `${D.toLocaleString()} (${N}%)`
        });
      }
      if (C > 0) {
        const N = Math.round(C / w * 100);
        y.push({
          source: "Booking retrive",
          target: "Booking retrive success",
          value: C,
          label: `${C.toLocaleString()} (${N}%)`
        });
      }
      if ($ > 0) {
        const N = Math.round($ / w * 100);
        y.push({
          source: "Booking retrive success",
          target: "Number of Passengers",
          value: $,
          label: `${$.toLocaleString()} (${N}%)`
        });
      }
      if (B > 0) {
        const N = Math.round(B / $ * 100);
        y.push({
          source: "Number of Passengers",
          target: "Completed",
          value: B,
          label: `${B.toLocaleString()} (${N}%)`
        });
      }
      if (L.length > 0 && E > 0) {
        g.push({ name: "Unrecovered" });
        const N = Math.round(E / $ * 100);
        y.push({
          source: "Number of Passengers",
          target: "Unrecovered",
          value: E,
          label: `${E.toLocaleString()} (${N}%)`
        }), L.forEach((tt) => {
          const ct = tt.step_name.replace(/_/g, " ").split(" ").map((nt) => nt.charAt(0).toUpperCase() + nt.slice(1)).join(" "), q = Math.round(tt.count / $ * 100);
          g.push({ name: ct }), y.push({
            source: "Unrecovered",
            target: ct,
            value: tt.count,
            label: `${tt.count.toLocaleString()} (${q}%)`
          });
        });
      }
      const W = $ - (B + E);
      if (W > 0) {
        const N = Math.round(W / $ * 100);
        g.push({ name: "Abandoned (Flow)" }), y.push({
          source: "Number of Passengers",
          target: "Abandoned (Flow)",
          value: W,
          label: `${W.toLocaleString()} (${N}%)`
        });
      }
      const K = B - T;
      if (K > 0) {
        const N = Math.round(K / $ * 100);
        g.push({ name: "BP Error" }), y.push({
          source: "Completed",
          target: "BP Error",
          value: K,
          label: `${K.toLocaleString()} (${N}%)`
        });
      }
      if (T > 0) {
        const N = Math.round(T / $ * 100);
        y.push({
          source: "Completed",
          target: "Closed with BP",
          value: T,
          label: `${T.toLocaleString()} (${N}%)`
        });
      }
      return { nodes: g, links: y };
    }), m = () => {
      const g = u.value.checkin_by_day || [], y = h.value.failed_by_step_by_day || [];
      if (g.length === 0) {
        l.value = [];
        return;
      }
      l.value = [...g].map((w) => {
        const S = y.find(
          (D) => D.date === w.date
        );
        return {
          ...w,
          failed_steps: S?.steps || []
        };
      }), l.value.sort((w, S) => new Date(w.date) - new Date(S.date));
    };
    return Pt(
      [() => s.data, () => s.checkinData, () => s.failedData],
      () => {
        m();
      },
      { deep: !0, immediate: !0 }
    ), (g, y) => (b(), Y(ut, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        s.loading ? (b(), k("div", am, [...y[0] || (y[0] = [
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
        ])])) : (b(), k("div", sm, [
          x.value.nodes.length > 0 ? (b(), k("section", om, [
            r("div", im, [
              V(Fe, {
                data: x.value,
                height: "500px",
                "node-colors": p.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", lm, [
            r("div", rm, [
              V(Qt, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: w }) => [
                  r("span", cm, A(F(It)(String(w.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: w }) => [
                  r("span", null, A(F(X)(w.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: w }) => [
                  r("span", null, A(f(w.checkin_init_count, w.checkin_initiated_count)), 1)
                ]),
                "cell-passengers": P(({ row: w }) => [
                  r("span", null, A(F(X)(w.checkin_started_count)), 1)
                ]),
                "cell-completed": P(({ row: w }) => [
                  r("span", null, A(f(w.checkin_completed_count, w.checkin_started_count)), 1)
                ]),
                "cell-closed": P(({ row: w }) => [
                  r("span", dm, A(f(w.checkin_closed_count, w.checkin_started_count)), 1)
                ]),
                "cell-failed": P(({ row: w }) => [
                  r("span", um, A(f(v(w.failed_steps), w.checkin_started_count)), 1)
                ]),
                "cell-reasons": P(({ row: w }) => [
                  w.failed_steps && w.failed_steps.length > 0 ? (b(), k("div", hm, [
                    (b(!0), k(U, null, st(w.failed_steps, (S) => (b(), k("div", {
                      key: S.step_name,
                      class: "reason-item"
                    }, [
                      r("span", fm, A(S.step_name.replace(/_/g, " ")) + ":", 1),
                      r("span", gm, A(S.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", pm, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", mm, [...y[1] || (y[1] = [
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
      _: 1
    }, 8, ["collapsible", "default-open"]));
  }
}, Vi = /* @__PURE__ */ it(bm, [["__scopeId", "data-v-54e40783"]]), vm = {
  key: 0,
  class: "loading-state"
}, ym = {
  key: 1,
  class: "card-body"
}, _m = {
  key: 0,
  class: "sankey-section"
}, xm = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, km = { class: "w-full min-w-0" }, wm = { class: "font-medium whitespace-nowrap" }, Cm = { class: "cell-success" }, $m = { class: "cell-danger" }, Sm = {
  key: 0,
  class: "reasons-list"
}, Mm = { class: "reason-name" }, Dm = { class: "reason-count" }, Am = {
  key: 1,
  class: "no-reasons"
}, Tm = {
  key: 2,
  class: "empty-state"
}, Bm = { class: "empty-state-content" }, Lm = { class: "empty-icon-wrapper" }, Fm = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = ft(ht(a, "theme")), l = (m) => m == null ? "0" : m.toLocaleString(), c = (m) => {
      const [g, y, w] = m.split("-").map(Number);
      return It([g, y - 1, w]).format("MMM DD");
    }, d = (m) => m.replace(/_/g, " ").replace(/\b\w/g, (g) => g.toUpperCase()), u = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, h = (m, g) => {
      const y = m || 0, w = g || 0, S = l(y), D = u(y, w);
      return `${S} (${D})`;
    }, p = M(() => ({
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
    })), _ = M(() => {
      const m = a.checkinData?.record_locator_by_day || [], g = a.failedData?.failed_by_step_by_day || [], y = a.failedData?.unrecovered_by_day || [];
      return m.map((S) => {
        const D = g.find(($) => $.date === S.date), C = y.find(($) => $.date === S.date);
        return {
          ...S,
          failed_steps: D?.steps || [],
          unrecovered_count: C?.unrecovered_count || 0
        };
      }).sort((S, D) => new Date(S.date).getTime() - new Date(D.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], v = M(
      () => _.value.map((m) => ({
        id: m.date,
        date: m.date,
        checkin_initiated: m.checkin_initiated,
        record_locator_init_count: m.record_locator_init_count,
        record_locator_started_count: m.record_locator_started_count,
        record_locator_completed_count: m.record_locator_completed_count,
        record_locator_closed_count: m.record_locator_closed_count,
        unrecovered_count: m.unrecovered_count,
        failed_steps: m.failed_steps
      }))
    ), x = M(() => {
      const m = [], g = [], y = /* @__PURE__ */ new Set(), w = (z) => {
        y.has(z) || (m.push({ name: z }), y.add(z));
      };
      if (!a.checkinData?.total_checkin_initiated)
        return { nodes: m, links: g };
      w("Checkin Init"), w("Booking Retrieval"), w("Booking Retrieved"), w("Completed"), w("Closed with BP");
      const S = a.checkinData.total_checkin_initiated || 0, D = a.checkinData.total_record_locator_init || 0, C = a.checkinData.total_record_locator_init_abandoned || 0, $ = a.checkinData.total_checkin_pre_init_abandoned_error, B = a.checkinData.total_checkin_pre_init_abandoned_voluntary, T = $ != null || B != null, L = T ? Math.max(Number($) || 0, 0) : 0, E = T ? Math.max(Number(B) || 0, 0) : 0, I = a.checkinData.total_record_locator_init_abandoned_error, W = a.checkinData.total_record_locator_init_abandoned_voluntary, K = I != null || W != null, N = K ? Math.max(Number(I) || 0, 0) : 0, tt = K ? Math.max(Number(W) || 0, 0) : 0, et = K ? Math.max(C - N - tt, 0) : C, ct = D - C, q = a.checkinData.total_record_locator_started || 0, nt = a.checkinData.total_record_locator_completed || 0, at = a.checkinData.total_record_locator_closed || 0, yt = a.checkinData.total_record_locator_unrecovered || 0;
      if (D > 0) {
        const z = Math.round(D / S * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking Retrieval",
          value: D,
          label: `${D.toLocaleString()} (${z}%)`
        });
      }
      const lt = S - D;
      if (T) {
        if (E > 0) {
          const z = Math.round(E / S * 100);
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: E,
            label: `${E.toLocaleString()} (${z}%)`
          });
        }
        if (L > 0) {
          const z = Math.round(L / S * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: L,
            label: `${L.toLocaleString()} (${z}%)`
          });
        }
      } else if (lt > 0) {
        const z = Math.round(lt / S * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: lt,
          label: `${lt.toLocaleString()} (${z}%)`
        });
      }
      if (K) {
        if (N > 0) {
          const z = Math.round(N / S * 100);
          w("Error"), g.push({
            source: "Booking Retrieval",
            target: "Error",
            value: N,
            label: `${N.toLocaleString()} (${z}%)`
          });
        }
        if (tt > 0) {
          const z = Math.round(tt / S * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: tt,
            label: `${tt.toLocaleString()} (${z}%)`
          });
        }
        if (et > 0) {
          const z = Math.round(et / S * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking Retrieval",
            target: "Abandoned (Started)",
            value: et,
            label: `${et.toLocaleString()} (${z}%)`
          });
        }
      } else if (C > 0) {
        const z = Math.round(C / S * 100);
        w("Abandoned (Started)"), g.push({
          source: "Booking Retrieval",
          target: "Abandoned (Started)",
          value: C,
          label: `${C.toLocaleString()} (${z}%)`
        });
      }
      if (ct > 0) {
        const z = Math.round(ct / S * 100);
        g.push({
          source: "Booking Retrieval",
          target: "Booking Retrieved",
          value: ct,
          label: `${ct.toLocaleString()} (${z}%)`
        });
      }
      if (nt > 0) {
        const z = Math.round(nt / q * 100);
        g.push({
          source: "Booking Retrieved",
          target: "Completed",
          value: nt,
          label: `${nt.toLocaleString()} (${z}%)`
        });
      }
      if (yt > 0) {
        w("Errors");
        const z = Math.round(yt / q * 100);
        g.push({
          source: "Booking Retrieved",
          target: "Errors",
          value: yt,
          label: `${yt.toLocaleString()} (${z}%)`
        });
      }
      const Et = q - (nt + yt);
      if (Et > 0) {
        const z = Math.round(Et / q * 100);
        w("Abandoned (Flow)"), g.push({
          source: "Booking Retrieved",
          target: "Abandoned (Flow)",
          value: Et,
          label: `${Et.toLocaleString()} (${z}%)`
        });
      }
      const At = nt - at;
      if (At > 0) {
        const z = Math.round(At / q * 100);
        w("BP Error"), g.push({
          source: "Completed",
          target: "BP Error",
          value: At,
          label: `${At.toLocaleString()} (${z}%)`
        });
      }
      if (at > 0) {
        const z = Math.round(at / q * 100);
        g.push({
          source: "Completed",
          target: "Closed with BP",
          value: at,
          label: `${at.toLocaleString()} (${z}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return t({ isDark: i }), (m, g) => (b(), Y(ut, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        e.loading ? (b(), k("div", vm, [...g[0] || (g[0] = [
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
        ])])) : (b(), k("div", ym, [
          x.value.nodes.length > 0 ? (b(), k("div", _m, [
            V(Fe, {
              data: x.value,
              height: "500px",
              "node-colors": p.value,
              "use-gradient": !1,
              "node-gap": 30
            }, null, 8, ["data", "node-colors"])
          ])) : O("", !0),
          _.value && _.value.length > 0 ? (b(), k("div", xm, [
            r("div", km, [
              V(Qt, {
                columns: f,
                rows: v.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: y }) => [
                  r("span", wm, A(c(String(y.date))), 1)
                ]),
                "cell-checkinInit": P(({ row: y }) => [
                  r("span", null, A(l(y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": P(({ row: y }) => [
                  r("span", null, A(h(y.record_locator_init_count, y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieved": P(({ row: y }) => [
                  r("span", null, A(h(y.record_locator_started_count, y.record_locator_init_count)), 1)
                ]),
                "cell-completed": P(({ row: y }) => [
                  r("span", null, A(h(y.record_locator_completed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-closed": P(({ row: y }) => [
                  r("span", Cm, A(h(y.record_locator_closed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-failed": P(({ row: y }) => [
                  r("span", $m, A(h(y.unrecovered_count, y.record_locator_started_count)), 1)
                ]),
                "cell-reasons": P(({ row: y }) => [
                  Array.isArray(y.failed_steps) && y.failed_steps.length > 0 ? (b(), k("div", Sm, [
                    (b(!0), k(U, null, st(y.failed_steps, (w) => (b(), k("div", {
                      key: w.step_name,
                      class: "reason-item"
                    }, [
                      r("span", Mm, A(d(w.step_name)) + ":", 1),
                      r("span", Dm, A(w.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Am, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("div", Tm, [
            r("div", Bm, [
              r("div", Lm, [
                V(F(Kt), { class: "empty-icon" })
              ]),
              g[1] || (g[1] = r("p", { class: "empty-title" }, "No check-in data available", -1)),
              g[2] || (g[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see check-in metrics.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Pm = /* @__PURE__ */ it(Fm, [["__scopeId", "data-v-00f07618"]]), Em = {
  key: 0,
  class: "loading-state"
}, Im = {
  key: 1,
  class: "card-body"
}, Rm = {
  key: 0,
  class: "chart-section"
}, Om = { class: "chart-wrapper" }, Vm = {
  key: 1,
  class: "record-locator-daily-section"
}, zm = { class: "w-full min-w-0" }, Nm = { class: "cell-plain font-medium" }, jm = { class: "cell-plain text-center" }, Wm = { class: "cell-plain text-center" }, Hm = { class: "cell-plain text-center" }, Ym = { class: "cell-plain text-center" }, Km = { class: "cell-plain text-center success-value" }, Um = { class: "cell-plain text-center failed-value" }, qm = { class: "cell-plain text-center warning-value" }, Xm = { class: "cell-plain text-center" }, Gm = { class: "cell-plain text-center failed-value" }, Zm = {
  key: 2,
  class: "empty-state"
}, Qm = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (m) => {
      s("export", m);
    }, { isDark: i } = ft(ht(a, "theme")), l = M(() => a.data?.record_locator_by_day ? [...a.data.record_locator_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), c = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieve", label: "Booking Retrieve (%)", align: "center" },
      { key: "checkinStarted", label: "Checkin Started", align: "center" },
      { key: "checkinCompleted", label: "Checkin Completed (%)", align: "center" },
      { key: "checkinClosed", label: "Checkin Closed (%)", align: "center" },
      { key: "checkinFailed", label: "Checkin Failed (%)", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" }
    ], d = [
      { key: "createPayment", label: "Create Payment", align: "center" },
      { key: "failedPayment", label: "Failed Payment", align: "center" }
    ], u = M(
      () => a.isAvianca ? [...c, ...d] : c
    ), h = M(
      () => l.value.map((m) => ({
        id: m.date,
        date: m.date,
        checkin_initiated: m.checkin_initiated,
        record_locator_init_count: m.record_locator_init_count,
        record_locator_started_count: m.record_locator_started_count,
        record_locator_completed_count: m.record_locator_completed_count,
        record_locator_closed_count: m.record_locator_closed_count,
        record_locator_failed_count: m.record_locator_failed_count,
        record_locator_abandoned_count: m.record_locator_abandoned_count,
        record_locator_create_payment_count: m.record_locator_create_payment_count,
        record_locator_create_payment_failed_count: m.record_locator_create_payment_failed_count
      }))
    ), p = M(() => a.data), _ = M(() => ({
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
    })), f = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, v = (m, g) => {
      const y = X(m), w = f(m, g);
      return `${y} (${w})`;
    }, x = M(() => {
      const m = [], g = [], y = /* @__PURE__ */ new Set(), w = (lt) => {
        y.has(lt) || (m.push({ name: lt }), y.add(lt));
      };
      if (!p.value.total_checkin_initiated)
        return { nodes: m, links: g };
      w("Checkin Init"), w("Booking retrive"), w("Checkin Started"), w("Checkin Completed"), w("Checkin Closed");
      const S = p.value.total_checkin_initiated, D = p.value.total_record_locator_init, C = p.value.total_record_locator_started, $ = p.value.total_record_locator_completed, B = p.value.total_record_locator_closed, T = p.value.total_record_locator_failed, L = p.value.total_record_locator_abandoned, E = p.value.total_record_locator_init_abandoned, I = p.value.total_checkin_pre_init_abandoned_error, W = p.value.total_checkin_pre_init_abandoned_voluntary, K = I != null || W != null, N = K ? Math.max(Number(I) || 0, 0) : 0, tt = K ? Math.max(Number(W) || 0, 0) : 0, et = p.value.total_record_locator_init_abandoned_error, ct = p.value.total_record_locator_init_abandoned_voluntary, q = et != null || ct != null, nt = q ? Math.max(Number(et) || 0, 0) : 0, at = q ? Math.max(Number(ct) || 0, 0) : 0;
      if (D > 0) {
        const lt = Math.round(D / S * 100);
        g.push({
          source: "Checkin Init",
          target: "Booking retrive",
          value: D,
          label: `${D.toLocaleString()} (${lt}%)`
        });
      }
      const yt = S - D;
      if (K) {
        if (tt > 0) {
          const lt = Math.round(tt / S * 100);
          w("Abandoned (Init)"), g.push({
            source: "Checkin Init",
            target: "Abandoned (Init)",
            value: tt,
            label: `${tt.toLocaleString()} (${lt}%)`
          });
        }
        if (N > 0) {
          const lt = Math.round(N / S * 100);
          w("Booking not retreived"), g.push({
            source: "Checkin Init",
            target: "Booking not retreived",
            value: N,
            label: `${N.toLocaleString()} (${lt}%)`
          });
        }
      } else if (yt > 0) {
        const lt = Math.round(yt / S * 100);
        w("Abandoned (Init)"), g.push({
          source: "Checkin Init",
          target: "Abandoned (Init)",
          value: yt,
          label: `${yt.toLocaleString()} (${lt}%)`
        });
      }
      if (C > 0) {
        const lt = Math.round(C / S * 100);
        g.push({
          source: "Booking retrive",
          target: "Checkin Started",
          value: C,
          label: `${C.toLocaleString()} (${lt}%)`
        });
      }
      if (q) {
        if (nt > 0) {
          const lt = Math.round(nt / S * 100);
          w("Error"), g.push({
            source: "Booking retrive",
            target: "Error",
            value: nt,
            label: `${nt.toLocaleString()} (${lt}%)`
          });
        }
        if (at > 0) {
          const lt = Math.round(at / S * 100);
          w("Abandoned (Started)"), g.push({
            source: "Booking retrive",
            target: "Abandoned (Started)",
            value: at,
            label: `${at.toLocaleString()} (${lt}%)`
          });
        }
      } else if (E > 0) {
        const lt = Math.round(E / S * 100);
        w("Abandoned (Started)"), g.push({
          source: "Booking retrive",
          target: "Abandoned (Started)",
          value: E,
          label: `${E.toLocaleString()} (${lt}%)`
        });
      }
      if ($ > 0) {
        const lt = Math.round($ / C * 100);
        g.push({
          source: "Checkin Started",
          target: "Checkin Completed",
          value: $,
          label: `${$.toLocaleString()} (${lt}%)`
        });
      }
      if (B > 0) {
        const lt = Math.round(B / C * 100);
        g.push({
          source: "Checkin Completed",
          target: "Checkin Closed",
          value: B,
          label: `${B.toLocaleString()} (${lt}%)`
        });
      }
      if (T > 0) {
        const lt = Math.round(T / C * 100);
        w("Checkin Failed"), g.push({
          source: "Checkin Started",
          target: "Checkin Failed",
          value: T,
          label: `${T.toLocaleString()} (${lt}%)`
        });
      }
      if (L > 0) {
        const lt = Math.round(L / C * 100);
        w("Abandoned (Flow)"), g.push({
          source: "Checkin Started",
          target: "Abandoned (Flow)",
          value: L,
          label: `${L.toLocaleString()} (${lt}%)`
        });
      }
      return { nodes: m, links: g };
    });
    return t({ isDark: i }), (m, g) => (b(), Y(ut, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        a.loading ? (b(), k("div", Em, [...g[0] || (g[0] = [
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
        ])])) : (b(), k("div", Im, [
          x.value.nodes.length > 0 ? (b(), k("section", Rm, [
            r("div", Om, [
              V(Fe, {
                data: x.value,
                height: "500px",
                "node-colors": _.value,
                "use-gradient": !1,
                "node-gap": 30
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : O("", !0),
          l.value && l.value.length > 0 ? (b(), k("section", Vm, [
            r("div", zm, [
              V(Qt, {
                columns: u.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: y }) => [
                  r("span", Nm, A(F(It)(String(y.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": P(({ row: y }) => [
                  r("span", jm, A(F(X)(y.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": P(({ row: y }) => [
                  r("span", Wm, A(v(y.record_locator_init_count, y.checkin_initiated)), 1)
                ]),
                "cell-checkinStarted": P(({ row: y }) => [
                  r("span", Hm, A(F(X)(y.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": P(({ row: y }) => [
                  r("span", Ym, A(v(y.record_locator_completed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-checkinClosed": P(({ row: y }) => [
                  r("span", Km, A(v(y.record_locator_closed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-checkinFailed": P(({ row: y }) => [
                  r("span", Um, A(v(y.record_locator_failed_count, y.record_locator_started_count)), 1)
                ]),
                "cell-abandoned": P(({ row: y }) => [
                  r("span", qm, A(v(y.record_locator_abandoned_count, y.record_locator_started_count)), 1)
                ]),
                "cell-createPayment": P(({ row: y }) => [
                  r("span", Xm, A(F(X)(y.record_locator_create_payment_count ?? 0)), 1)
                ]),
                "cell-failedPayment": P(({ row: y }) => [
                  r("span", Gm, A(F(X)(y.record_locator_create_payment_failed_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (b(), k("section", Zm, [...g[1] || (g[1] = [
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
      _: 1
    }, 8, ["collapsible"]));
  }
}), zi = /* @__PURE__ */ it(Qm, [["__scopeId", "data-v-5d48fcb3"]]), Jm = {
  key: 0,
  class: "loading-state"
}, t0 = {
  key: 1,
  class: "card-body"
}, e0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, n0 = { class: "w-full min-w-0" }, a0 = { class: "segment-plain" }, s0 = { class: "segment-plain" }, o0 = { class: "segment-plain" }, i0 = { class: "percentage-value" }, l0 = { class: "percentage-value" }, r0 = { class: "percentage-value success" }, c0 = {
  key: 1,
  class: "empty-state"
}, d0 = /* @__PURE__ */ Q({
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
    }, { isDark: i } = ft(ht(a, "theme")), l = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], c = M(
      () => a.data.map((p, _) => ({
        id: `segment-${_}-${p.departure_airport}-${p.arrival_airport}-${p.segment_init_count}-${p.segment_started_count}`,
        departure_airport: p.departure_airport,
        conexion_airport: p.conexion_airport,
        arrival_airport: p.arrival_airport,
        segment_init_count: p.segment_init_count,
        segment_started_count: p.segment_started_count,
        segment_completed_count: p.segment_completed_count,
        segment_closed_count: p.segment_closed_count
      }))
    ), d = (p, _) => !_ || _ === 0 || !p ? "0%" : `${Math.round(p / _ * 100)}%`, u = (p) => !p || p === "None" ? "-" : String(p).trim().replace(/_[0-9]+$/i, ""), h = (p) => {
      const _ = u(p?.departure_airport), f = u(p?.arrival_airport);
      return _ === "-" || f === "-" ? !1 : _ === f;
    };
    return t({ isDark: i }), (p, _) => (b(), Y(ut, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        a.loading ? (b(), k("div", Jm, [..._[0] || (_[0] = [
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
        ])])) : (b(), k("div", t0, [
          a.data.length > 0 ? (b(), k("section", e0, [
            r("div", n0, [
              V(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": P(({ row: f }) => [
                  r("span", a0, A(u(f.departure_airport)), 1)
                ]),
                "cell-connection": P(({ row: f }) => [
                  r("span", {
                    class: H(["segment-plain", {
                      "segment-plain--muted": u(f.conexion_airport) === "-"
                    }])
                  }, A(u(f.conexion_airport)), 3)
                ]),
                "cell-arrival": P(({ row: f }) => [
                  r("span", s0, A(u(f.arrival_airport)), 1)
                ]),
                "cell-trip": P(({ row: f }) => [
                  r("span", o0, A(h(f) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": P(({ row: f }) => [
                  _t(A(F(X)(f.segment_init_count)), 1)
                ]),
                "cell-started": P(({ row: f }) => [
                  r("span", i0, A(d(f.segment_started_count, f.segment_init_count)), 1)
                ]),
                "cell-completed": P(({ row: f }) => [
                  r("span", l0, A(d(f.segment_completed_count, f.segment_init_count)), 1)
                ]),
                "cell-closed": P(({ row: f }) => [
                  r("span", r0, A(d(f.segment_closed_count, f.segment_init_count)), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", c0, [..._[1] || (_[1] = [
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
      _: 1
    }, 8, ["collapsible", "default-open"]));
  }
}), Ni = /* @__PURE__ */ it(d0, [["__scopeId", "data-v-b6fca91a"]]), u0 = { class: "checkin-container__body" }, h0 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = M(() => n.loading || n.checkinLoading);
    M(() => n.loading || n.checkinMetricsLoading);
    const o = M(() => n.loading || n.recordLocatorLoading || n.checkinMetricsLoading), i = M(() => n.loading || n.segmentsLoading), l = M(() => n.recordLocatorData ?? n.checkinMetricsData);
    function c(h, p) {
      a("export", { source: h, format: p });
    }
    function d(h) {
      return typeof h == "object" && h !== null && "source" in h;
    }
    function u(h) {
      if (d(h)) {
        a("export", h);
        return;
      }
      c("checkinSegments", h);
    }
    return (h, p) => (b(), Y(ut, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows, metrics by record locator and segment breakdown.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", u0, [
          e.showCheckin ? (b(), Y(Vi, {
            key: 0,
            class: "w-full min-h-0",
            collapsible: !1,
            "initially-open": e.childrenInitiallyOpen,
            loading: s.value,
            "checkin-data": e.checkinData,
            "failed-data": e.checkinFailedData,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[0] || (p[0] = (_) => c("checkin", _))
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading"])) : O("", !0),
          V(zi, {
            collapsible: !1,
            loading: o.value,
            data: l.value,
            "is-avianca": e.isAvianca,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": e.exportLoading,
            onExport: p[1] || (p[1] = (_) => c("recordLocator", _))
          }, null, 8, ["loading", "data", "is-avianca", "theme", "enable-export", "export-loading"]),
          V(Ni, {
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
}), f0 = /* @__PURE__ */ it(h0, [["__scopeId", "data-v-90d88bae"]]), g0 = {
  key: 0,
  class: "loading-state"
}, p0 = {
  key: 1,
  class: "card-body"
}, m0 = { class: "chart-section" }, b0 = { class: "chart-wrapper" }, v0 = {
  key: 1,
  class: "empty-chart"
}, y0 = { class: "payment-success-summary" }, _0 = {
  key: 0,
  class: "disruption-daily-section"
}, x0 = { class: "w-full min-w-0" }, k0 = { class: "font-medium text-center" }, w0 = { class: "text-center" }, C0 = { class: "text-center" }, $0 = { class: "percentage-text" }, S0 = { class: "text-center" }, M0 = { class: "abandoned-value" }, D0 = { class: "badges-container badges-wrap" }, A0 = { class: "badges-container badges-wrap" }, T0 = {
  key: 1,
  class: "empty-state"
}, B0 = /* @__PURE__ */ Q({
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
    function n(m) {
      return m;
    }
    const a = e, s = t, o = (m) => {
      s("export", m);
    }, i = M(() => a.data?.disruption_by_day ? [...a.data.disruption_by_day].sort(
      (m, g) => new Date(m.date).getTime() - new Date(g.date).getTime()
    ) : []), l = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], c = M(
      () => i.value.map((m) => ({
        id: m.date,
        ...m
      }))
    ), d = M(() => a.data?.total_payment_success || []), u = M(() => {
      const m = d.value;
      return m.length === 0 ? p(0) : m.map((g) => `${g.currency} ${p(g.total_value)}`).join(" · ");
    }), h = (m, g) => !g || g === 0 ? "0%" : `${Math.round(m / g * 100)}%`, p = (m) => kt(m), _ = (m) => (m ?? []).reduce((g, y) => g + (y.count ?? 0), 0), f = (m) => typeof m.sell_success_count == "number" ? m.sell_success_count : _(m.payment_success_total), v = M(() => {
      const m = a.data, g = m.total_disruption_conversations || 0, y = m.total_disruption_initiated || 0, w = m.total_voluntary || 0, S = m.total_involuntary || 0, D = m.total_accepted || 0, C = m.total_confirmed || 0, $ = typeof m.total_sell_success == "number" ? m.total_sell_success : _(m.total_payment_success), B = m.total_sell_failed || 0, T = Math.max(0, g - y), L = Math.max(0, y - w - S), E = Math.max(0, S - D), I = Math.max(0, w - C), W = B, K = Math.max(0, C - $ - W), N = (ct, q) => {
        const nt = q > 0 ? Math.round(ct / q * 100) : 0;
        return `${ct.toLocaleString()} (${nt}%)`;
      }, tt = [
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
      ], et = [];
      return y > 0 && et.push({
        source: "Initiated",
        target: "Started",
        value: y,
        label: N(y, g)
      }), T > 0 && et.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: T,
        label: N(T, g)
      }), w > 0 && et.push({
        source: "Started",
        target: "Voluntary",
        value: w,
        label: N(w, g)
      }), S > 0 && et.push({
        source: "Started",
        target: "Involuntary",
        value: S,
        label: N(S, g)
      }), L > 0 && et.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: N(L, g)
      }), D > 0 && et.push({
        source: "Involuntary",
        target: "Accepted",
        value: D,
        label: N(D, g)
      }), E > 0 && et.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: E,
        label: N(E, g)
      }), C > 0 && et.push({
        source: "Voluntary",
        target: "Confirmed",
        value: C,
        label: N(C, g)
      }), I > 0 && et.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: I,
        label: N(I, g)
      }), $ > 0 && et.push({
        source: "Confirmed",
        target: "Paid",
        value: $,
        label: N($, g)
      }), W > 0 && et.push({
        source: "Confirmed",
        target: "Rejected",
        value: W,
        label: N(W, g)
      }), K > 0 && et.push({
        source: "Confirmed",
        target: "Not Paid",
        value: K,
        label: N(K, g)
      }), { nodes: tt, links: et };
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
    return (m, g) => (b(), Y(ut, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking"
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        a.loading ? (b(), k("div", g0, [...g[0] || (g[0] = [
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
        ])])) : (b(), k("div", p0, [
          r("section", m0, [
            r("div", b0, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (b(), Y(Fe, {
                key: 0,
                data: v.value,
                "node-colors": x,
                height: "500px"
              }, null, 8, ["data"])) : (b(), k("div", v0, [...g[1] || (g[1] = [
                r("p", { class: "empty-chart-text" }, "No disruption data available for visualization", -1)
              ])]))
            ])
          ]),
          r("section", y0, [
            V(rt, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: u.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (b(), k("section", _0, [
            g[2] || (g[2] = r("div", { class: "section-header" }, [
              r("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            r("div", x0, [
              V(Qt, {
                columns: l,
                rows: c.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: y }) => [
                  r("span", k0, A(F(It)(String(y.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": P(({ row: y }) => [
                  r("span", w0, A(F(X)(Number(y.disruption_conversations))), 1)
                ]),
                "cell-started": P(({ row: y }) => [
                  r("span", C0, [
                    _t(A(F(X)(Number(y.disruption_initiated_count))) + " ", 1),
                    r("span", $0, " (" + A(h(Number(y.disruption_initiated_count), Number(y.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": P(({ row: y }) => [
                  r("span", S0, [
                    r("span", M0, A(F(X)(Number(y.disruption_initiated_count) - Number(y.voluntary_count) - Number(y.involuntary_count))) + " (" + A(h(Number(y.disruption_initiated_count) - Number(y.voluntary_count) - Number(y.involuntary_count), Number(y.disruption_conversations))) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": P(({ row: y }) => [
                  r("div", D0, [
                    (b(!0), k(U, null, st([y], (w, S) => (b(), k(U, { key: S }, [
                      V(Nt, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: P(() => [
                          _t(" VOL " + A(F(X)(w.voluntary_count)) + " (" + A(h(w.voluntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, { color: "success" }, {
                        default: P(() => [
                          _t(" Confirm " + A(F(X)(w.confirmed_count)) + " (" + A(h(w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, { color: "warning" }, {
                        default: P(() => [
                          _t(" Not Confirm " + A(F(X)(w.voluntary_count - w.confirmed_count)) + " (" + A(h(w.voluntary_count - w.confirmed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, { color: "danger" }, {
                        default: P(() => [
                          _t(" Reject " + A(F(X)(w.sell_failed_count)) + " (" + A(h(w.sell_failed_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, { color: "orange" }, {
                        default: P(() => [
                          _t(" Not Paid " + A(F(X)(Math.max(0, w.confirmed_count - f(w) - w.sell_failed_count))) + " (" + A(h(Math.max(0, w.confirmed_count - f(w) - w.sell_failed_count), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: P(() => [
                          _t(" Finish " + A(F(X)(f(w))) + " (" + A(h(f(w), w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (b(!0), k(U, null, st(w.payment_success_total || [], (D) => (b(), Y(Nt, {
                        key: `${w.date}-${D.currency}`,
                        color: "neutral"
                      }, {
                        default: P(() => [
                          _t(A(D.currency) + " " + A(p(D.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": P(({ row: y }) => [
                  r("div", A0, [
                    (b(!0), k(U, null, st([y], (w, S) => (b(), k(U, { key: S }, [
                      V(Nt, { color: "purple" }, {
                        default: P(() => [
                          _t(" INV " + A(F(X)(w.involuntary_count)) + " (" + A(h(w.involuntary_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, { color: "danger" }, {
                        default: P(() => [
                          _t(" Human " + A(F(X)(w.involuntary_count - w.accepted_count)) + " (" + A(h(w.involuntary_count - w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      V(Nt, { color: "success" }, {
                        default: P(() => [
                          _t(" Accept " + A(F(X)(w.accepted_count)) + " (" + A(h(w.accepted_count, w.disruption_conversations)) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (b(), k("section", T0, [...g[3] || (g[3] = [
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
      _: 1
    }));
  }
}), L0 = /* @__PURE__ */ it(B0, [["__scopeId", "data-v-c9b67dfc"]]), F0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, P0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, E0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, I0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, R0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, O0 = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, V0 = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (v) => {
      i("export", v);
    }, c = ht(o, "theme"), { isDark: d } = ft(c), u = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, h = ot({ labels: [], datasets: [] }), p = M(
      () => o.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), _ = M(() => {
      const v = p.value, x = v.total_airline_information_retrieved + v.total_booking_info_retrieved + v.total_flight_status_retrieved, m = (w) => x > 0 ? (w / x * 100).toFixed(1) : "0.0", g = v.total_faq_events, y = g > 0 ? `${(v.total_documents_found / g * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: u.airline_information,
          value: `${m(v.total_airline_information_retrieved)}%`,
          subvalue: `${X(v.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: u.booking_info,
          value: `${m(v.total_booking_info_retrieved)}%`,
          subvalue: `${X(v.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: u.flight_status,
          value: `${m(v.total_flight_status_retrieved)}%`,
          subvalue: `${X(v.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: X(v.total_documents_found),
          subvalue: y
        }
      ];
    }), f = (v) => {
      if (!v) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const x = v.faq_by_day || [];
      if (x.length > 0) {
        const m = x.map((S) => It(S.date).format("MMM DD")), g = x.map((S) => S.airline_information_retrieved_count || 0), y = x.map((S) => S.flight_status_retrieved_count || 0), w = x.map((S) => S.booking_info_retrieved_count || 0);
        h.value = {
          labels: m,
          datasets: [
            {
              label: "Airline Information",
              data: g,
              borderColor: u.airline_information,
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              fill: !0
            },
            {
              label: "Flight Status",
              data: y,
              borderColor: u.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: w,
              borderColor: u.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        h.value = { labels: [], datasets: [] };
    };
    return Pt(
      () => o.data,
      (v) => {
        f(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: d }), (v, x) => (b(), Y(ut, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (b(), k("div", F0, [
            r("div", P0, [
              (b(), k(U, null, st(a, (m, g) => r("div", {
                key: g,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[g]]),
                style: gt({ height: `${m}%` })
              }, null, 6)), 64))
            ]),
            x[0] || (x[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading FAQ metrics... ", -1))
          ])) : (b(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), k("section", E0, [
              r("div", I0, [
                V(le, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", R0, [
                (b(!0), k(U, null, st(_.value, (m) => (b(), Y(rt, {
                  key: m.name,
                  class: "min-w-0",
                  color: m.color,
                  title: m.label,
                  value: m.value,
                  subvalue: m.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (b(), k("section", O0, [...x[1] || (x[1] = [
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
      _: 1
    }));
  }
}), z0 = /* @__PURE__ */ it(V0, [["__scopeId", "data-v-791a0ba7"]]), N0 = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, j0 = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, W0 = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, H0 = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Y0 = {
  key: 0,
  class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4"
}, K0 = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, U0 = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, q0 = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, X0 = { class: "max-w-[360px] px-4 text-center" }, G0 = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Z0 = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = e, l = n, c = (f) => {
      l("export", f);
    }, d = ht(i, "theme"), { isDark: u } = ft(d), h = M(() => {
      const f = i.data?.agents_by_day || {}, v = Object.keys(f).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const x = /* @__PURE__ */ new Set();
      for (const y of Object.values(f))
        for (const w of Object.keys(y))
          x.add(w);
      const g = Array.from(x).map((y) => {
        const w = y.toLowerCase(), S = o[w] || o[y] || "#94a3b8";
        return {
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          data: v.map((D) => f[D]?.[y] || 0),
          borderColor: S
        };
      });
      return {
        labels: v.map((y) => It(y).format("MMM DD")),
        datasets: g
      };
    }), p = M(() => {
      const f = i.data?.agents_by_day || {}, v = {};
      for (const m of Object.values(f))
        for (const [g, y] of Object.entries(m))
          v[g] = (v[g] || 0) + y;
      const x = Object.values(v).reduce((m, g) => m + g, 0);
      return x === 0 ? [] : Object.entries(v).sort(([, m], [, g]) => g - m).map(([m, g]) => {
        const y = m.toLowerCase();
        return {
          name: m,
          label: m.charAt(0).toUpperCase() + m.slice(1).replace(/_/g, " "),
          total: g,
          percentage: (g / x * 100).toFixed(1),
          color: o[y] || o[m] || "#94a3b8"
        };
      });
    }), _ = M(() => p.value.slice(0, 4));
    return t({ isDark: u }), (f, v) => (b(), Y(ut, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !i.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: c
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", i.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          i.loading ? (b(), k("div", N0, [
            r("div", j0, [
              (b(), k(U, null, st(a, (x, m) => r("div", {
                key: m,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[m]]),
                style: gt({ height: `${x}%` })
              }, null, 6)), 64))
            ]),
            v[0] || (v[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading agent metrics... ", -1))
          ])) : (b(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), k("section", W0, [
              r("div", H0, [
                V(le, {
                  data: h.value,
                  options: e.options,
                  theme: d.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              _.value.length ? (b(), k("div", Y0, [
                (b(!0), k(U, null, st(_.value, (x) => (b(), Y(rt, {
                  key: x.name,
                  class: "min-w-0",
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${F(X)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])) : O("", !0)
            ])) : p.value.length ? (b(), k("section", K0, [
              r("div", U0, [
                (b(!0), k(U, null, st(_.value, (x) => (b(), Y(rt, {
                  key: x.name,
                  class: "min-w-0",
                  color: x.color,
                  title: x.label,
                  value: `${x.percentage}%`,
                  subvalue: `${F(X)(x.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : O("", !0),
            p.value.length ? O("", !0) : (b(), k("section", q0, [
              r("div", X0, [
                r("div", G0, [
                  V(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                v[1] || (v[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agent interactions data ", -1)),
                v[2] || (v[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see agent interaction trends. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), Q0 = /* @__PURE__ */ it(Z0, [["__scopeId", "data-v-443fc360"]]), J0 = {
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
}, sb = { class: "comparison-grid" }, ob = /* @__PURE__ */ Q({
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
    }, s = ["#B0C4DE", "#C9A0F2", "#F5C26B", "#8BE8B0", "#F2A07A", "#7BA3E8"], o = e, i = n, l = (f) => {
      i("export", f);
    }, { isDark: c } = ft(ht(o, "theme"));
    M(() => o.data?.total_sell_success ?? 0);
    const d = M(() => {
      const f = /* @__PURE__ */ new Set();
      for (const v of o.data?.sales_by_channel_by_day ?? [])
        for (const x of Object.keys(v.channels))
          f.add(x);
      return Array.from(f).sort();
    }), u = (f, v) => a[f.toLowerCase()] ?? s[v % s.length];
    function h(f) {
      return f.replace(/_/g, " ").toUpperCase();
    }
    function p(f) {
      if (f.delta === null) return "No previous data";
      const v = X(f.previous), x = `${Math.abs(f.delta).toFixed(1)}%`;
      return f.delta === 0 ? `0.0% vs prev. period (${v})` : `${f.delta > 0 ? "↑" : "↓"} ${x} vs prev. period (${v})`;
    }
    const _ = M(() => {
      const f = o.data?.sales_by_channel_by_day ?? [];
      if (f.length === 0) return { labels: [], datasets: [] };
      const v = f.map((m) => It(m.date).format("MMM-DD")), x = d.value.map((m, g) => ({
        label: m,
        data: f.map((y) => y.channels[m] ?? 0),
        backgroundColor: u(m, g),
        borderRadius: 4
      }));
      return { labels: v, datasets: x };
    });
    return t({ isDark: c }), (f, v) => (b(), Y(ut, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: l,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        o.loading ? (b(), k("div", J0, [...v[0] || (v[0] = [
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
        ])])) : (b(), k("div", tb, [
          _.value.labels.length > 0 ? (b(), k("section", eb, [
            V(he, {
              data: _.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (b(), k("section", nb, [...v[1] || (v[1] = [
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
          e.channelComparison.length > 0 ? (b(), k("section", ab, [
            r("div", sb, [
              (b(!0), k(U, null, st(e.channelComparison, (x, m) => (b(), Y(F(rt), {
                key: x.channel,
                color: u(x.channel, m),
                title: h(x.channel),
                value: F(X)(x.current),
                subvalue: p(x)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), ji = /* @__PURE__ */ it(ob, [["__scopeId", "data-v-1896c562"]]), ib = {
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
}, wb = { class: "sl-cell text-center success-value" }, Cb = { class: "sl-cell text-center" }, $b = { class: "sl-cell text-center success-value" }, Sb = {
  key: 0,
  class: "currency-cell-list"
}, Mb = {
  key: 1,
  class: "empty-cell"
}, Db = { class: "sl-cell text-center success-value" }, Ab = { class: "sl-cell text-center" }, Tb = { class: "sl-cell text-center success-value" }, Bb = {
  key: 0,
  class: "currency-cell-list"
}, Lb = { key: 1 }, Fb = {
  key: 0,
  class: "failed-reasons"
}, Pb = { class: "reason-name" }, Eb = { class: "reason-count" }, Ib = {
  key: 1,
  class: "empty-cell"
}, Rb = /* @__PURE__ */ Q({
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
    const s = e, o = n, i = (L) => {
      o("export", L);
    }, { isDark: l } = ft(ht(s, "theme")), c = M(() => {
      if (!s.sellerData?.seller_by_day) return [];
      const L = [...s.sellerData.seller_by_day];
      return s.failedData?.failed_by_reason_by_day && s.failedData.failed_by_reason_by_day.forEach((E) => {
        const I = L.findIndex((W) => W.date === E.date);
        I !== -1 ? L[I] = { ...L[I], reasons: E.reasons } : L.push({
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
      }), L.sort((E, I) => new Date(E.date).getTime() - new Date(I.date).getTime());
    }), d = [
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
    ], u = M(
      () => c.value.map((L) => ({
        id: L.date,
        ...L
      }))
    ), h = M(() => s.sellerData), p = M(() => s.failedData), _ = M(
      () => Array.isArray(s.sellerData.total_value_sell_success) ? s.sellerData.total_value_sell_success : []
    ), f = M(
      () => Array.isArray(s.sellerData.total_value_sell_bank_transfer) ? s.sellerData.total_value_sell_bank_transfer : []
    ), v = M(
      () => Array.isArray(s.sellerData.total_value_sell_cash_option) ? s.sellerData.total_value_sell_cash_option : []
    ), x = M(() => {
      const L = _.value;
      return L.length > 0 ? L.map((E) => `${E.currency} ${we(E.total_value)}`).join(" · ") : T(s.sellerData.total_value_sell_success);
    });
    function m(L) {
      return L.length > 0 ? L.map((E) => `${E.currency} ${we(E.total_value)}`).join(" · ") : "—";
    }
    const g = M(
      () => m(f.value)
    ), y = M(
      () => m(v.value)
    ), w = M(() => {
      const {
        total_seller_conversations: L = 0,
        total_sell_started: E = 0,
        total_sell_booking_created: I = 0,
        total_sell_success: W = 0,
        total_sell_bank_transfer: K = 0,
        total_sell_cash_option: N = 0,
        total_sell_success_bank_transfer: tt = 0,
        total_sell_success_cash: et = 0
      } = h.value, { failed_by_reason_by_day: ct = [] } = p.value;
      if (L === 0) return { nodes: [], links: [] };
      const q = Math.max(0, W - (tt ?? 0) - (et ?? 0)), nt = [
        { name: "Sell Initiated", value: L },
        { name: "Sell Started", value: E },
        { name: "Booking Created", value: I },
        { name: "Sell Success", value: q }
      ], at = [], yt = L - E;
      if (yt > 0) {
        const z = Math.round(yt / L * 100);
        nt.push({ name: "Abandoned (Init)", value: yt }), at.push({
          source: "Sell Initiated",
          target: "Abandoned (Init)",
          value: yt,
          label: `${yt.toLocaleString()} (${z}%)`
        });
      }
      if (E > 0) {
        const z = Math.round(E / L * 100);
        at.push({
          source: "Sell Initiated",
          target: "Sell Started",
          value: E,
          label: `${E.toLocaleString()} (${z}%)`
        });
      }
      const lt = ct.reduce((z, Z) => (Z.reasons && Array.isArray(Z.reasons) && Z.reasons.forEach((J) => {
        const dt = J.reason, bt = J.failed_count;
        z[dt] = (z[dt] || 0) + bt;
      }), z), {});
      if (I > 0) {
        const z = Math.round(I / L * 100);
        at.push({
          source: "Sell Started",
          target: "Booking Created",
          value: I,
          label: `${I.toLocaleString()} (${z}%)`
        });
      }
      if (K > 0) {
        const z = Math.round(K / L * 100);
        nt.push({ name: "Bank Transfer", value: K }), at.push({
          source: "Booking Created",
          target: "Bank Transfer",
          value: K,
          label: `${K.toLocaleString()} (${z}%)`
        });
      }
      if (N > 0) {
        const z = Math.round(N / L * 100);
        nt.push({ name: "Cash Option", value: N }), at.push({
          source: "Booking Created",
          target: "Cash Option",
          value: N,
          label: `${N.toLocaleString()} (${z}%)`
        });
      }
      if (q > 0) {
        const z = Math.round(q / L * 100);
        at.push({
          source: "Booking Created",
          target: "Sell Success",
          value: q,
          label: `${q.toLocaleString()} (${z}%)`
        });
      }
      if ((tt ?? 0) > 0) {
        const z = Math.round((tt ?? 0) / L * 100);
        nt.push({ name: "Bank Transfer Success", value: tt ?? 0 }), at.push({
          source: "Bank Transfer",
          target: "Bank Transfer Success",
          value: tt ?? 0,
          label: `${(tt ?? 0).toLocaleString()} (${z}%)`
        });
      }
      if ((et ?? 0) > 0) {
        const z = Math.round((et ?? 0) / L * 100);
        nt.push({ name: "Cash Option Success", value: et ?? 0 }), at.push({
          source: "Cash Option",
          target: "Cash Option Success",
          value: et ?? 0,
          label: `${(et ?? 0).toLocaleString()} (${z}%)`
        });
      }
      const Et = I - q - K - N;
      if (Et > 0) {
        const z = Math.round(Et / L * 100);
        nt.push({ name: "Failed at Completion", value: Et }), at.push({
          source: "Booking Created",
          target: "Failed at Completion",
          value: Et,
          label: `${Et.toLocaleString()} (${z}%)`
        });
      }
      const At = E - I;
      if (At > 0) {
        const z = Math.round(At / L * 100);
        nt.push({ name: "Failed at Booking", value: At }), at.push({
          source: "Sell Started",
          target: "Failed at Booking",
          value: At,
          label: `${At.toLocaleString()} (${z}%)`
        });
      }
      if (Object.keys(lt).length > 0) {
        const z = Object.values(lt).reduce((J, dt) => J + dt, 0), Z = At - z;
        if (Object.entries(lt).filter(([, J]) => J > 0).sort(([, J], [, dt]) => dt - J).forEach(([J, dt]) => {
          const bt = Math.round(dt / L * 100);
          nt.push({ name: `Failed: ${J}`, value: dt }), at.push({
            source: "Failed at Booking",
            target: `Failed: ${J}`,
            value: dt,
            label: `${dt.toLocaleString()} (${bt}%)`
          });
        }), Z > 0) {
          const J = Math.round(Z / L * 100);
          nt.push({ name: "Failed: Without Reason", value: Z }), at.push({
            source: "Failed at Booking",
            target: "Failed: Without Reason",
            value: Z,
            label: `${Z.toLocaleString()} (${J}%)`
          });
        }
      }
      return { nodes: nt, links: at };
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
    }, D = M(() => S), C = (L, E) => !E || E === 0 ? "0%" : `${Math.round(L / E * 100)}%`, $ = (L, E) => {
      const I = X(L), W = C(L, E);
      return `${I} (${W})`;
    }, B = (L) => L == null ? 0 : typeof L == "number" ? L : Array.isArray(L) ? L.reduce((E, I) => E + (I.total_value || 0), 0) : 0, T = (L) => we(B(L));
    return t({ isDark: l }), (L, E) => (b(), Y(ut, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        s.loading ? (b(), k("div", ib, [...E[0] || (E[0] = [
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
        ])])) : (b(), k("div", lb, [
          w.value.nodes.length > 0 ? (b(), k("section", rb, [
            r("div", cb, [
              V(Fe, {
                data: w.value,
                "node-colors": D.value,
                title: "",
                height: "320px"
              }, null, 8, ["data", "node-colors"])
            ])
          ])) : (b(), k("section", db, [...E[1] || (E[1] = [
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
            V(rt, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: x.value
            }, null, 8, ["value"]),
            V(rt, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: g.value
            }, null, 8, ["value"]),
            V(rt, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: y.value
            }, null, 8, ["value"])
          ]),
          c.value && c.value.length > 0 ? (b(), k("section", hb, [
            r("div", fb, [
              V(Qt, {
                columns: d,
                rows: u.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: I }) => [
                  r("span", gb, A(F(It)(String(I.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": P(({ row: I }) => [
                  r("span", pb, A(F(X)(Number(I.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": P(({ row: I }) => [
                  r("span", mb, A($(I.sell_started_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-getQuote": P(({ row: I }) => [
                  r("span", bb, A($(I.sell_get_quote_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-bookingCreated": P(({ row: I }) => [
                  r("span", vb, A($(I.sell_booking_created_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-bankTransfer": P(({ row: I }) => [
                  r("span", yb, A(F(X)(Number(I.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": P(({ row: I }) => [
                  r("span", _b, [
                    Array.isArray(I.daily_value_sell_success_bank_transfer) && I.daily_value_sell_success_bank_transfer.length > 0 ? (b(), k("div", xb, [
                      (b(!0), k(U, null, st(I.daily_value_sell_success_bank_transfer, (W) => (b(), k("span", {
                        key: `${I.date}-bt-success-${W.currency}`
                      }, A(W.currency) + " " + A(F(we)(W.total_value)), 1))), 128))
                    ])) : (b(), k("span", kb, "-"))
                  ])
                ]),
                "cell-btSuccess": P(({ row: I }) => [
                  r("span", wb, A(F(X)(Number(I.sell_success_bank_transfer_count) || 0)), 1)
                ]),
                "cell-cashOption": P(({ row: I }) => [
                  r("span", Cb, A(F(X)(Number(I.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": P(({ row: I }) => [
                  r("span", $b, [
                    Array.isArray(I.daily_value_sell_success_cash) && I.daily_value_sell_success_cash.length > 0 ? (b(), k("div", Sb, [
                      (b(!0), k(U, null, st(I.daily_value_sell_success_cash, (W) => (b(), k("span", {
                        key: `${I.date}-co-success-${W.currency}`
                      }, A(W.currency) + " " + A(F(we)(W.total_value)), 1))), 128))
                    ])) : (b(), k("span", Mb, "-"))
                  ])
                ]),
                "cell-cashSuccess": P(({ row: I }) => [
                  r("span", Db, A(F(X)(Number(I.sell_success_cash_count) || 0)), 1)
                ]),
                "cell-sellSuccess": P(({ row: I }) => [
                  r("span", Ab, A($(I.sell_success_count, I.seller_conversations || I.sell_started_count)), 1)
                ]),
                "cell-totalSalesValue": P(({ row: I }) => [
                  r("span", Tb, [
                    Array.isArray(I.daily_value_sell_success) && I.daily_value_sell_success.length > 0 ? (b(), k("div", Bb, [
                      (b(!0), k(U, null, st(I.daily_value_sell_success, (W) => (b(), k("span", {
                        key: `${I.date}-${W.currency}`
                      }, A(W.currency) + " " + A(F(we)(W.total_value)), 1))), 128))
                    ])) : (b(), k("span", Lb, A(T(I.daily_value_sell_success)), 1))
                  ])
                ]),
                "cell-failed": P(({ row: I }) => [
                  (I.reasons || []).length > 0 ? (b(), k("div", Fb, [
                    (b(!0), k(U, null, st(I.reasons || [], (W) => (b(), k("div", {
                      key: W.reason,
                      class: "failed-reason-item"
                    }, [
                      r("span", Pb, A(W.reason) + ":", 1),
                      r("span", Eb, A(W.failed_count), 1)
                    ]))), 128))
                  ])) : (b(), k("div", Ib, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : O("", !0)
        ]))
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), Wi = /* @__PURE__ */ it(Rb, [["__scopeId", "data-v-ac189380"]]), Ob = { class: "seller-container__body" }, Vb = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = M(() => n.loading || n.sellerLoading), o = M(() => n.loading || n.salesByChannelLoading), i = M(() => n.exportLoading || n.sellerExportLoading), l = M(() => n.exportLoading || n.salesByChannelExportLoading);
    function c(d, u) {
      a("export", { source: d, format: u });
    }
    return (d, u) => (b(), Y(ut, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", Ob, [
          V(Wi, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: s.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: u[0] || (u[0] = (h) => c("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          V(ji, {
            "initially-open": e.childrenInitiallyOpen,
            data: e.salesByChannelData,
            "channel-comparison": e.channelComparison,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": l.value,
            onExport: u[1] || (u[1] = (h) => c("salesByChannel", h))
          }, null, 8, ["initially-open", "data", "channel-comparison", "loading", "theme", "enable-export", "export-loading"])
        ])
      ]),
      _: 1
    }, 8, ["default-open"]));
  }
}), zb = /* @__PURE__ */ it(Vb, [["__scopeId", "data-v-878fdbc6"]]), Nb = {
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
}, Ub = /* @__PURE__ */ Q({
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
    }, { isDark: l, colors: c } = ft(ht(s, "theme")), d = M(() => {
      const p = (s.data?.top_agents || []).filter(
        (x) => x.agent_type?.toLowerCase() !== "triage"
      );
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const _ = p.reduce(
        (x, m) => x + (Number(m.conversations) || 0),
        0
      ), f = p.map((x) => {
        const m = x.agent_type?.toLowerCase();
        return a[m] || "#94a3b8";
      }), v = f.map((x) => `${x}80`);
      return {
        labels: p.map((x) => {
          const m = Number(x.conversations) || 0, g = _ ? m / _ * 100 : 0;
          return `${x.agent_type} - ${m.toLocaleString()} (${g.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: p.map((x) => x.conversations),
            backgroundColor: v,
            borderColor: f,
            borderWidth: 2
          }
        ]
      };
    }), u = M(() => s.options ? s.options : {
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
            color: c.value.textSecondary
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: c.value.tooltipBg,
          titleColor: c.value.tooltipText,
          bodyColor: c.value.tooltipText,
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
              const p = (h.label || "").toString().split(" - ")[0], _ = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce(
                (x, m) => x + (Number(m) || 0),
                0
              ), v = f ? _ / f * 100 : 0;
              return `${p}: ${_.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: l }), (h, p) => (b(), Y(ut, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        e.loading ? (b(), k("div", Kb, [...p[2] || (p[2] = [
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
        ])])) : (b(), k("div", Nb, [
          d.value.labels && d.value.labels.length ? (b(), k("section", jb, [
            V(oa, {
              data: d.value,
              options: u.value
            }, null, 8, ["data", "options"])
          ])) : (b(), k("section", Wb, [
            r("div", Hb, [
              r("div", Yb, [
                V(F(ap), { class: "empty-icon" })
              ]),
              p[0] || (p[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
              p[1] || (p[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent interaction trends.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), qb = /* @__PURE__ */ it(Ub, [["__scopeId", "data-v-bd0d1b11"]]), Xb = {
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
}, av = { class: "w-full min-w-0" }, sv = { class: "font-medium" }, ov = { class: "text-center" }, iv = { class: "text-center success-value" }, lv = {
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
}, gv = "Not Registered", pv = /* @__PURE__ */ Q({
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
    const a = e, s = n, { isDark: o } = ft(ht(a, "theme")), i = ot(!1), l = ot({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), c = M(() => l.value.payment_method_breakdown && l.value.payment_method_breakdown.length > 0), d = M(() => l.value.payment_method_by_day && l.value.payment_method_by_day.length > 0), u = M(() => !l.value.payment_method_by_day || l.value.payment_method_by_day.length === 0 ? [] : [...l.value.payment_method_by_day].sort((C, $) => It(C.date).valueOf() - It($.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], p = M(
      () => u.value.map((C) => ({
        id: C.date,
        date: C.date,
        total_count: C.total_count,
        total_amount: C.total_amount,
        total_amount_by_currency: C.total_amount_by_currency,
        payment_methods: C.payment_methods
      }))
    ), _ = (C) => {
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
      const $ = (C.payment_method_breakdown || []).map((T) => ({
        payment_method: T.payment_method || "Unknown",
        total_amount: T.total_amount ?? 0,
        count: T.count ?? 0,
        total_amount_by_currency: T.total_amount_by_currency ?? []
      })), B = (C.payment_method_by_day || []).map((T) => ({
        date: T.date || "",
        total_count: T.total_count ?? 0,
        total_amount: T.total_amount ?? 0,
        total_amount_by_currency: T.total_amount_by_currency ?? [],
        payment_methods: (T.payment_methods || []).map((L) => ({
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
        payment_method_breakdown: $,
        payment_method_by_day: B
      };
    }, f = async () => {
      if (!(!a.fetchFunction || !a.dates || a.dates.length < 2 || !a.airlineName)) {
        i.value = !0;
        try {
          const [C, $] = a.dates.map((T) => It(T).format("YYYY-MM-DD")), B = await a.fetchFunction(a.airlineName, C, $);
          l.value = _(B);
        } catch (C) {
          console.error("Error fetching payment method metrics:", C), l.value = _(null);
        } finally {
          i.value = !1;
        }
      }
    }, v = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e", "#06b6d4"], x = (C) => !C || C.toLowerCase() === "unknown" ? gv : C.replace(/_/g, " "), m = (C) => C == null ? "$0.00" : kt(C), g = (C) => {
      const $ = C.total_amount_by_currency;
      return $ && $.length > 0 ? $.map((B) => `${B.currency} ${m(B.total_value)}`).join(" · ") : m(C.total_amount);
    }, y = (C) => C ? It(C).format("MMM DD") : "-", w = (C) => C == null || Number.isNaN(Number(C)) ? 0 : Number(C), S = (C) => {
      s("export", C);
    };
    function D() {
      const C = a.data;
      C && (Array.isArray(C.payment_method_breakdown) && C.payment_method_breakdown.length > 0 || Array.isArray(C.payment_method_by_day) && C.payment_method_by_day.length > 0) && (i.value = !1, l.value = _(C));
    }
    return ie(() => {
      a.data ? D() : f();
    }), Pt(
      () => a.data,
      (C) => {
        C && D();
      },
      { deep: !0 }
    ), Pt(
      () => a.dates,
      (C) => {
        a.data || C && C[0] && C[1] && f();
      },
      { deep: !0 }
    ), t({ isDark: o }), (C, $) => (b(), Y(ut, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method"
    }, {
      headerExport: P(() => [
        e.enableExport && !i.value ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: S,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        i.value ? (b(), k("div", Xb, [...$[0] || ($[0] = [
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
        ])])) : (b(), k("div", Gb, [
          c.value ? (b(), k("section", Zb, [
            $[1] || ($[1] = r("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            r("div", Qb, [
              (b(!0), k(U, null, st(l.value.payment_method_breakdown, (B, T) => (b(), Y(rt, {
                key: B.payment_method,
                class: "payment-method-card-item min-w-0",
                color: v[T % v.length],
                title: x(B.payment_method),
                value: g(B),
                subvalue: `${w(B.count)} ${w(B.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (b(), k("section", Jb, [
            r("div", tv, [
              r("div", ev, [
                V(F(lp), { class: "empty-icon" })
              ]),
              $[2] || ($[2] = r("p", { class: "empty-title" }, "No payment data available", -1)),
              $[3] || ($[3] = r("p", { class: "empty-description" }, "No payment method data found for the selected period. Try adjusting the date range.", -1))
            ])
          ])),
          d.value ? (b(), k("section", nv, [
            $[5] || ($[5] = r("p", { class: "section-label" }, "Daily Breakdown", -1)),
            r("div", av, [
              V(Qt, {
                columns: h,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": P(({ row: B }) => [
                  r("span", sv, A(y(String(B.date))), 1)
                ]),
                "cell-totalSales": P(({ row: B }) => [
                  r("span", ov, A(F(X)(B.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": P(({ row: B }) => [
                  r("span", iv, [
                    Array.isArray(B.total_amount_by_currency) && B.total_amount_by_currency.length > 0 ? (b(), k("div", lv, [
                      (b(!0), k(U, null, st(B.total_amount_by_currency, (T) => (b(), k("span", {
                        key: `${B.date}-${T.currency}`
                      }, A(T.currency) + " " + A(m(T.total_value)), 1))), 128))
                    ])) : (b(), k(U, { key: 1 }, [
                      _t(A(m(Number(B.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": P(({ row: B }) => [
                  r("div", rv, [
                    (b(!0), k(U, null, st(Array.isArray(B.payment_methods) ? B.payment_methods : [], (T) => (b(), k("div", {
                      key: T.payment_method,
                      class: "payment-tag"
                    }, [
                      r("span", cv, A(x(T.payment_method)), 1),
                      $[4] || ($[4] = r("span", { class: "tag-separator" }, "•", -1)),
                      !T.total_amount_by_currency || T.total_amount_by_currency.length === 0 ? (b(), k("span", dv, A(m(T.total_amount)), 1)) : (b(), k("span", uv, A(T.total_amount_by_currency.map((L) => `${L.currency} ${m(L.total_value)}`).join(" / ")), 1)),
                      r("span", hv, "(" + A(w(T.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : c.value ? (b(), k("div", fv, [...$[6] || ($[6] = [
            r("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : O("", !0)
        ]))
      ]),
      _: 1
    }));
  }
}), mv = /* @__PURE__ */ it(pv, [["__scopeId", "data-v-87045b37"]]), bv = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, vv = { class: "overflow-x-auto" }, yv = { class: "kiut-table w-full min-w-[640px] border-collapse text-left text-sm" }, _v = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, xv = {
  key: 0,
  scope: "col",
  class: "w-12 px-4 py-3 text-center align-middle"
}, kv = ["checked", "aria-label"], wv = {
  key: 0,
  class: "w-12 bg-transparent px-4 py-3 text-center align-middle"
}, Cv = ["checked", "aria-label", "onChange"], $v = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = ot(null);
    function o(g) {
      return `cell-${g}`;
    }
    function i(g) {
      return g === "center" ? "text-center" : g === "right" ? "text-right" : "text-left";
    }
    function l(g, y) {
      if (typeof n.rowKey == "function")
        return n.rowKey(g);
      const w = g[n.rowKey];
      return w != null ? String(w) : `__index_${y}`;
    }
    function c(g, y) {
      return g[y];
    }
    function d(g) {
      return g == null || typeof g == "object" ? "" : String(g);
    }
    function u(g, y) {
      return l(g, y);
    }
    const h = M(() => n.rows.map((g, y) => l(g, y)));
    function p(g, y) {
      const w = l(g, y);
      return n.selectedKeys.includes(w);
    }
    const _ = M(() => !n.selectable || n.rows.length === 0 ? !1 : h.value.every((g) => n.selectedKeys.includes(g))), f = M(() => {
      if (!n.selectable || n.rows.length === 0) return !1;
      const g = h.value.filter((y) => n.selectedKeys.includes(y));
      return g.length > 0 && g.length < n.rows.length;
    });
    Pt(
      [f, _, () => n.selectable],
      async () => {
        await zt();
        const g = s.value;
        g && (g.indeterminate = f.value && !_.value);
      },
      { immediate: !0 }
    );
    function v() {
      if (n.selectable)
        if (_.value) {
          const g = n.selectedKeys.filter((y) => !h.value.includes(y));
          a("update:selectedKeys", g);
        } else {
          const g = new Set(n.selectedKeys);
          h.value.forEach((y) => g.add(y)), a("update:selectedKeys", [...g]);
        }
    }
    function x(g, y) {
      if (!n.selectable) return;
      const w = l(g, y);
      n.selectedKeys.includes(w) ? a(
        "update:selectedKeys",
        n.selectedKeys.filter((D) => D !== w)
      ) : a("update:selectedKeys", [...n.selectedKeys, w]);
    }
    function m(g, y) {
      const w = l(g, y);
      return `${n.ariaLabelSelectRow} ${w}`;
    }
    return (g, y) => (b(), k("div", bv, [
      r("div", vv, [
        r("table", yv, [
          r("thead", null, [
            r("tr", _v, [
              e.selectable ? (b(), k("th", xv, [
                r("input", {
                  ref_key: "selectAllRef",
                  ref: s,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: _.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: v
                }, null, 40, kv)
              ])) : O("", !0),
              (b(!0), k(U, null, st(e.columns, (w) => (b(), k("th", {
                key: w.key,
                scope: "col",
                class: H([
                  "px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  i(w.align),
                  w.headerClass ?? ""
                ])
              }, A(w.label), 3))), 128))
            ])
          ]),
          r("tbody", null, [
            (b(!0), k(U, null, st(e.rows, (w, S) => (b(), k("tr", {
              key: u(w, S),
              class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            }, [
              e.selectable ? (b(), k("td", wv, [
                r("input", {
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: p(w, S),
                  "aria-label": m(w, S),
                  onChange: (D) => x(w, S)
                }, null, 40, Cv)
              ])) : O("", !0),
              (b(!0), k(U, null, st(e.columns, (D) => (b(), k("td", {
                key: D.key,
                class: H([
                  "bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                  i(D.align),
                  D.cellClass ?? ""
                ])
              }, [
                St(g.$slots, o(D.key), {
                  row: w,
                  column: D,
                  value: c(w, D.key)
                }, () => [
                  _t(A(d(c(w, D.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Hi = /* @__PURE__ */ it($v, [["__scopeId", "data-v-95fc0bc9"]]), Sv = {
  key: 0,
  class: "loading-state"
}, Mv = {
  key: 1,
  class: "card-body"
}, Dv = { class: "summary-cards" }, Av = {
  key: 0,
  class: "summary-card enqueued-card"
}, Tv = { class: "summary-card-content" }, Bv = { class: "card-content enqueued-content" }, Lv = { class: "card-value enqueued-value" }, Fv = { class: "summary-card assigned-card" }, Pv = { class: "summary-card-content" }, Ev = { class: "card-content" }, Iv = { class: "card-value assigned-value" }, Rv = { class: "card-content" }, Ov = { class: "card-value assigned-value" }, Vv = { class: "summary-card closed-card" }, zv = { class: "summary-card-content" }, Nv = { class: "card-content" }, jv = { class: "card-value closed-value" }, Wv = { class: "card-content" }, Hv = { class: "card-value closed-value" }, Yv = {
  key: 0,
  class: "agents-section"
}, Kv = { class: "date-header" }, Uv = { class: "date-title" }, qv = { class: "date-stats" }, Xv = {
  key: 0,
  class: "stat-item enqueued-stat"
}, Gv = { class: "stat-value" }, Zv = { class: "stat-item assigned-stat" }, Qv = { class: "stat-value" }, Jv = { class: "stat-value" }, ty = { class: "stat-item closed-stat" }, ey = { class: "stat-value" }, ny = { class: "stat-value" }, ay = { class: "w-full min-w-0" }, sy = { class: "ah-cell name-cell" }, oy = { class: "ah-cell email-cell" }, iy = { class: "metric-cell-content" }, ly = { class: "badge assigned-badge" }, ry = { class: "metric-cell-avg" }, cy = { class: "metric-cell-content" }, dy = { class: "badge closed-badge" }, uy = { class: "metric-cell-avg" }, hy = ["onClick"], fy = {
  key: 1,
  class: "empty-state"
}, xa = 3, gy = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = ($) => {
      s("export", $);
    }, { isDark: i } = ft(ht(a, "theme")), l = M(() => {
      const $ = a.data?.agents_by_day && a.data.agents_by_day.length > 0, B = (a.data?.total_enqueued ?? 0) > 0;
      return $ || B;
    }), c = M(() => {
      if (!l.value) return {};
      const $ = {};
      for (const L of a.data.agents_by_day)
        $[L.date] || ($[L.date] = []), $[L.date].push(L);
      const B = Object.keys($).sort((L, E) => new Date(L).getTime() - new Date(E).getTime()), T = {};
      for (const L of B)
        T[L] = $[L];
      return T;
    }), d = ot({});
    function u($) {
      d.value = {
        ...d.value,
        [$]: !d.value[$]
      };
    }
    function h($, B) {
      return d.value[$] ? B : B.slice(0, xa);
    }
    function p($) {
      return Math.max(0, $.length - xa);
    }
    function _($) {
      return $.length > xa;
    }
    const f = [
      { key: "agentName", label: "Agent Name", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "assigned", label: "Assigned (AVG time to assign)", align: "center" },
      { key: "closed", label: "Closed (AVG time to close)", align: "center" }
    ];
    function v($, B) {
      return h($, B).map((T, L) => ({
        id: `${$}-${T.agent_email}-${L}`,
        agent_name: T.agent_name,
        agent_email: T.agent_email,
        assigned_count: T.assigned_count,
        closed_count: T.closed_count,
        avg_time_to_assign_seconds: T.avg_time_to_assign_seconds,
        avg_conversation_duration_seconds: T.avg_conversation_duration_seconds
      }));
    }
    const x = ($) => $ == null ? "0" : X($), m = ($) => {
      if ($ == null)
        return "AVG";
      if ($ < 60)
        return `${Math.round($)}s`;
      const B = Math.round($), T = Math.floor(B / 60), L = B % 60;
      if (T < 60)
        return `${T}m ${L}s`;
      const E = Math.floor(T / 60), I = T % 60;
      return `${E}h ${I}m`;
    }, g = ($) => {
      const B = new Date($), T = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return B.toLocaleDateString("en-US", T);
    }, y = ($) => $[0]?.day_total_enqueued ?? 0, w = ($) => $[0]?.day_total_assigned ?? 0, S = ($) => $[0]?.day_total_closed ?? 0, D = ($) => $[0]?.day_avg_time_to_assign_seconds ?? null, C = ($) => $[0]?.day_avg_conversation_duration_seconds ?? null;
    return t({ isDark: i }), ($, B) => (b(), Y(ut, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent"
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        e.loading ? (b(), k("div", Sv, [...B[0] || (B[0] = [
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
        ])])) : (b(), k("div", Mv, [
          r("div", Dv, [
            e.data.total_enqueued ? (b(), k("div", Av, [
              B[2] || (B[2] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Tv, [
                r("div", Bv, [
                  B[1] || (B[1] = r("p", { class: "card-label" }, "Total Enqueued", -1)),
                  r("p", Lv, A(x(e.data.total_enqueued)), 1)
                ])
              ])
            ])) : O("", !0),
            r("div", Fv, [
              B[5] || (B[5] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", Pv, [
                r("div", Ev, [
                  B[3] || (B[3] = r("p", { class: "card-label" }, "Total Assigned", -1)),
                  r("p", Iv, A(x(e.data.total_assigned)), 1)
                ]),
                r("div", Rv, [
                  B[4] || (B[4] = r("p", { class: "card-label" }, "AVG time to assign", -1)),
                  r("p", Ov, A(m(e.data.avg_time_to_assign_seconds)), 1)
                ])
              ])
            ]),
            r("div", Vv, [
              B[8] || (B[8] = r("div", { class: "card-decoration" }, null, -1)),
              r("div", zv, [
                r("div", Nv, [
                  B[6] || (B[6] = r("p", { class: "card-label" }, "Total Closed", -1)),
                  r("p", jv, A(x(e.data.total_closed)), 1)
                ]),
                r("div", Wv, [
                  B[7] || (B[7] = r("p", { class: "card-label" }, "AVG time to close", -1)),
                  r("p", Hv, A(m(e.data.avg_conversation_duration_seconds)), 1)
                ])
              ])
            ])
          ]),
          l.value ? (b(), k("div", Yv, [
            (b(!0), k(U, null, st(c.value, (T, L) => (b(), k("div", {
              key: L,
              class: "date-group"
            }, [
              r("div", Kv, [
                r("h4", Uv, A(g(L)), 1),
                r("div", qv, [
                  y(T) ? (b(), k("span", Xv, [
                    r("span", Gv, A(x(y(T))), 1),
                    B[9] || (B[9] = _t(" Enqueued ", -1))
                  ])) : O("", !0),
                  r("span", Zv, [
                    r("span", Qv, A(x(w(T))), 1),
                    B[10] || (B[10] = _t(" Assigned ", -1)),
                    r("span", Jv, A(m(D(T))), 1)
                  ]),
                  r("span", ty, [
                    r("span", ey, A(x(S(T))), 1),
                    B[11] || (B[11] = _t(" Closed ", -1)),
                    r("span", ny, A(m(C(T))), 1)
                  ])
                ])
              ]),
              r("div", ay, [
                V(Hi, {
                  columns: f,
                  rows: v(String(L), T),
                  "row-key": "id"
                }, {
                  "cell-agentName": P(({ row: E }) => [
                    r("span", sy, A(E.agent_name || "-"), 1)
                  ]),
                  "cell-email": P(({ row: E }) => [
                    r("span", oy, A(E.agent_email), 1)
                  ]),
                  "cell-assigned": P(({ row: E }) => [
                    r("div", iy, [
                      r("span", ly, A(x(Number(E.assigned_count))), 1),
                      r("span", ry, A(m(Number(E.avg_time_to_assign_seconds))), 1)
                    ])
                  ]),
                  "cell-closed": P(({ row: E }) => [
                    r("div", cy, [
                      r("span", dy, A(x(Number(E.closed_count))), 1),
                      r("span", uy, A(m(Number(E.avg_conversation_duration_seconds))), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ]),
              _(T) ? (b(), k("button", {
                key: 0,
                type: "button",
                class: "view-more-btn",
                onClick: (E) => u(String(L))
              }, [
                _t(A(d.value[L] ? "View less" : `View more (${p(T)} rows)`) + " ", 1),
                (b(), k("svg", {
                  class: H(["view-more-icon", { "view-more-icon-rotated": d.value[L] }]),
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [...B[12] || (B[12] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  }, null, -1)
                ])], 2))
              ], 8, hy)) : O("", !0)
            ]))), 128))
          ])) : (b(), k("div", fy, [...B[13] || (B[13] = [
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
      _: 1
    }));
  }
}), py = /* @__PURE__ */ it(gy, [["__scopeId", "data-v-e74dc150"]]), my = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, by = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, vy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, yy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, _y = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, xy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ky = { class: "max-w-[360px] px-4 text-center" }, wy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, Ao = 5, Cy = /* @__PURE__ */ Q({
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
    const a = [30, 50, 70, 50, 40], s = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], o = e, i = n, l = (m) => {
      i("export", m);
    }, c = ht(o, "theme"), { isDark: d } = ft(c), u = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, h = ot({ labels: [], datasets: [] }), p = M(
      () => o.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), _ = M(() => {
      const m = p.value.total_by_channel || {}, g = Object.values(m).reduce((y, w) => y + w, 0);
      return g === 0 ? [] : Object.entries(m).sort(([, y], [, w]) => w - y).map(([y, w]) => ({
        name: y,
        label: y.toUpperCase(),
        total: w,
        percentage: (w / g * 100).toFixed(1),
        color: u[y.toLowerCase()] || "#9ca3af"
      }));
    }), f = M(() => _.value.slice(0, Ao)), v = M(() => {
      const m = Math.min(f.value.length, Ao);
      if (!(m <= 0))
        return { gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))` };
    }), x = (m) => {
      if (!m || !m.channels_by_day) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const g = m.channels_by_day, y = Object.keys(g).sort();
      if (y.length === 0) {
        h.value = { labels: [], datasets: [] };
        return;
      }
      const w = /* @__PURE__ */ new Set();
      for (const C of Object.values(g))
        for (const $ of Object.keys(C))
          w.add($);
      const D = Array.from(w).map((C) => {
        const $ = C.toLowerCase(), B = u[$] || "#9ca3af";
        return {
          label: C.toUpperCase(),
          data: y.map((T) => g[T]?.[C] || 0),
          borderColor: B
        };
      });
      h.value = {
        labels: y.map((C) => It(C).format("MMM DD")),
        datasets: D
      };
    };
    return Pt(
      () => o.data,
      (m) => {
        x(m ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: d }), (m, g) => (b(), Y(ut, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Channel",
      subtitle: "Responses sent by AI agents",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: l
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", o.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          o.loading ? (b(), k("div", my, [
            r("div", by, [
              (b(), k(U, null, st(a, (y, w) => r("div", {
                key: w,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", s[w]]),
                style: gt({ height: `${y}%` })
              }, null, 6)), 64))
            ]),
            g[0] || (g[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading channel metrics... ", -1))
          ])) : (b(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length ? (b(), k("section", vy, [
              r("div", yy, [
                V(le, {
                  data: h.value,
                  theme: c.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (b(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: gt(v.value)
              }, [
                (b(!0), k(U, null, st(f.value, (y) => (b(), Y(rt, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${F(X)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : O("", !0)
            ])) : _.value.length ? (b(), k("section", _y, [
              r("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: gt(v.value)
              }, [
                (b(!0), k(U, null, st(f.value, (y) => (b(), Y(rt, {
                  key: y.name,
                  class: "min-w-0",
                  color: y.color,
                  title: y.label,
                  value: `${y.percentage}%`,
                  subvalue: `${F(X)(y.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : O("", !0),
            _.value.length ? O("", !0) : (b(), k("section", xy, [
              r("div", ky, [
                r("div", wy, [
                  V(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                g[1] || (g[1] = r("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                g[2] || (g[2] = r("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ], 64))
        ], 2)
      ]),
      _: 1
    }));
  }
}), $y = /* @__PURE__ */ it(Cy, [["__scopeId", "data-v-a464c58f"]]), Sy = {
  key: 0,
  class: "card-body"
}, My = { class: "chart-container" }, Dy = { class: "triage-table-block w-full min-w-0" }, Ay = { class: "triage-row-label" }, Ty = {
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
}, Py = {
  key: 1,
  class: "triage-count"
}, Ey = {
  key: 1,
  class: "empty-state"
}, Iy = { class: "empty-state-content" }, Ry = { class: "empty-icon-wrapper" }, Oy = {
  key: 1,
  class: "loading-state"
}, Vy = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (y) => {
      s("export", y);
    }, { isDark: i, colors: l } = ft(ht(a, "theme")), c = M(() => {
      const y = a.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [S, D] of Object.entries(y)) {
        const C = S.split("+").filter(Boolean);
        if (!C.includes("triage")) continue;
        const $ = C.filter((B) => B !== "triage").length;
        $ >= 4 ? w["4p"] += Number(D) || 0 : w[$] += Number(D) || 0;
      }
      return w;
    }), d = M(() => {
      const y = c.value;
      return y[0] + y[1] + y[2] + y[3] + y["4p"] || 0;
    }), u = M(() => Object.keys(a.data?.combinations || {}).length > 0), h = M(() => {
      const y = d.value;
      if (!y) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = c.value;
      return {
        pct0: w[0] / y * 100,
        pct1: w[1] / y * 100,
        pct2: w[2] / y * 100,
        pct3: w[3] / y * 100,
        pct4p: w["4p"] / y * 100
      };
    }), p = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], _ = M(() => {
      const y = h.value, w = c.value;
      return [
        {
          id: "pct",
          metric: "% of total",
          b0: y.pct0,
          b1: y.pct1,
          b2: y.pct2,
          b3: y.pct3,
          b4p: y.pct4p
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
    }, v = (y) => y?.replace("80", "") || "#888888", x = M(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: f.c0,
          borderColor: v(f.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: f.c1,
          borderColor: v(f.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: f.c2,
          borderColor: v(f.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: f.c3,
          borderColor: v(f.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: f.c4p,
          borderColor: v(f.c4p),
          borderWidth: 1
        }
      ]
    })), m = M(() => ({
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
            label: (y) => `${y.dataset.label} intent(s): ${Number(y.raw || 0).toFixed(0)}%`
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
    })), g = (y) => `${(Number(y) || 0).toFixed(0)}`;
    return t({ isDark: i }), (y, w) => (b(), Y(ut, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        e.loading ? (b(), k("div", Oy, [...w[2] || (w[2] = [
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
        ])])) : (b(), k("div", Sy, [
          u.value ? (b(), k(U, { key: 0 }, [
            r("div", My, [
              V(he, {
                data: x.value,
                options: m.value
              }, null, 8, ["data", "options"])
            ]),
            V(rt, {
              class: "w-full min-w-0",
              title: "Total",
              value: F(X)(d.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            r("div", Dy, [
              V(Qt, {
                columns: p,
                rows: _.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": P(({ row: S }) => [
                  r("span", Ay, A(S.metric), 1)
                ]),
                "cell-b0": P(({ row: S }) => [
                  S.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: v(f.c0) })
                  }, A(g(Number(S.b0))) + "%", 5)) : (b(), k("span", Ty, A(F(X)(Number(S.b0))), 1))
                ]),
                "cell-b1": P(({ row: S }) => [
                  S.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: v(f.c1) })
                  }, A(g(Number(S.b1))) + "%", 5)) : (b(), k("span", By, A(F(X)(Number(S.b1))), 1))
                ]),
                "cell-b2": P(({ row: S }) => [
                  S.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: v(f.c2) })
                  }, A(g(Number(S.b2))) + "%", 5)) : (b(), k("span", Ly, A(F(X)(Number(S.b2))), 1))
                ]),
                "cell-b3": P(({ row: S }) => [
                  S.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: v(f.c3) })
                  }, A(g(Number(S.b3))) + "%", 5)) : (b(), k("span", Fy, A(F(X)(Number(S.b3))), 1))
                ]),
                "cell-b4p": P(({ row: S }) => [
                  S.id === "pct" ? (b(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: gt({ color: v(f.c4p) })
                  }, A(g(Number(S.b4p))) + "%", 5)) : (b(), k("span", Py, A(F(X)(Number(S.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (b(), k("div", Ey, [
            r("div", Iy, [
              r("div", Ry, [
                V(F(Kt), { class: "empty-icon" })
              ]),
              w[0] || (w[0] = r("p", { class: "empty-title" }, "No triage combinations data", -1)),
              w[1] || (w[1] = r("p", { class: "empty-description" }, "No intent distribution data found for the selected period. Try adjusting the date range.", -1))
            ])
          ]))
        ]))
      ]),
      _: 1
    }));
  }
}), zy = /* @__PURE__ */ it(Vy, [["__scopeId", "data-v-d684dd65"]]), Ny = {
  key: 0,
  class: "loading-state"
}, jy = {
  key: 1,
  class: "card-body"
}, Wy = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, Hy = { class: "pie-section" }, Yy = {
  key: 1,
  class: "empty-state"
}, Ky = /* @__PURE__ */ Q({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = [
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
    }, l = (_) => i[_]?.label || _.toUpperCase(), c = M(
      () => n.data?.items && n.data.items.length > 0
    ), d = M(
      () => (n.data?.items || []).reduce((_, f) => _ + f.count, 0)
    ), u = M(() => {
      const _ = {};
      for (const f of n.data?.items || [])
        _[f.language] = (_[f.language] || 0) + f.count;
      return Object.entries(_).map(([f, v]) => ({ language: f, count: v })).sort((f, v) => v.count - f.count);
    }), h = M(() => ({
      labels: u.value.map((_) => l(_.language)),
      datasets: [{
        data: u.value.map((_) => _.count),
        backgroundColor: u.value.map((_, f) => o[f % o.length] + "80"),
        borderColor: u.value.map((_, f) => o[f % o.length]),
        borderWidth: 2,
        hoverOffset: 6
      }]
    })), p = M(() => ({
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
          titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 },
          bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
          callbacks: {
            label: (_) => {
              const f = _.raw || 0, v = d.value > 0 ? (f / d.value * 100).toFixed(1) : "0";
              return ` ${_.label}: ${f} (${v}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: a }), (_, f) => (b(), Y(ut, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1
    }, {
      default: P(() => [
        n.loading ? (b(), k("div", Ny, [...f[0] || (f[0] = [
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
        ])])) : (b(), k("div", jy, [
          c.value ? (b(), k("div", Wy, [
            r("section", Hy, [
              V(oa, {
                data: h.value,
                options: p.value
              }, null, 8, ["data", "options"])
            ]),
            V(rt, {
              class: "shrink-0",
              title: "Total",
              value: F(X)(d.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (b(), k("section", Yy, [...f[1] || (f[1] = [
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
}), Uy = /* @__PURE__ */ it(Ky, [["__scopeId", "data-v-8c32a3b3"]]), qy = {
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
}, a1 = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (x) => {
      s("export", x);
    }, { isDark: i } = ft(ht(a, "theme")), l = M(
      () => a.data?.items && a.data.items.length > 0
    ), c = M(
      () => (a.data?.items || []).reduce((x, m) => x + m.count, 0)
    ), d = (x) => {
      const m = {};
      for (const w of a.data?.items || [])
        m[w[x]] = (m[w[x]] || 0) + w.count;
      const g = Object.entries(m).sort((w, S) => S[1] - w[1]);
      if (g.length === 0) return { name: "—", pct: 0 };
      const y = c.value;
      return {
        name: g[0][0],
        pct: y > 0 ? Math.round(g[0][1] / y * 100) : 0
      };
    }, u = M(() => d("guardrail_type")), h = M(() => d("guardrail_action")), p = M(() => d("guardrail_source")), _ = M(() => {
      const x = {};
      for (const m of a.data?.items || [])
        x[m.date] || (x[m.date] = {}), x[m.date][m.guardrail_type] = (x[m.date][m.guardrail_type] || 0) + m.count;
      return Object.entries(x).map(([m, g]) => ({
        date: m,
        total: Object.values(g).reduce((y, w) => y + w, 0),
        types: Object.entries(g).map(([y, w]) => ({ type: y, count: w })).sort((y, w) => w.count - y.count)
      })).sort((m, g) => new Date(m.date).getTime() - new Date(g.date).getTime());
    }), f = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], v = M(
      () => _.value.map((x) => ({
        id: x.date,
        date: x.date,
        total: x.total,
        types: x.types
      }))
    );
    return t({ isDark: i }), (x, m) => (b(), Y(ut, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        a.loading ? (b(), k("div", qy, [...m[0] || (m[0] = [
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
        ])])) : (b(), k("div", Xy, [
          l.value ? (b(), k(U, { key: 0 }, [
            _.value.length > 0 ? (b(), k("section", Gy, [
              r("div", Zy, [
                V(Qt, {
                  columns: f,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": P(({ row: g }) => [
                    r("span", Qy, A(F(It)(String(g.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": P(({ row: g }) => [
                    r("span", Jy, A(F(X)(g.total)), 1)
                  ]),
                  "cell-types": P(({ row: g }) => [
                    r("div", t1, [
                      (b(!0), k(U, null, st(g.types, (y) => (b(), k("span", {
                        key: y.type,
                        class: "type-count-badge"
                      }, A(y.type) + " (" + A(y.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("section", e1, [
              V(rt, {
                title: "Total Events",
                value: F(X)(c.value)
              }, null, 8, ["value"]),
              V(rt, {
                title: "Top type",
                value: u.value.name,
                subvalue: u.value.pct > 0 ? `(${u.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              V(rt, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              V(rt, {
                title: "Top source",
                value: p.value.name,
                subvalue: p.value.pct > 0 ? `(${p.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (b(), k("section", n1, [...m[1] || (m[1] = [
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
      _: 1
    }));
  }
}), s1 = /* @__PURE__ */ it(a1, [["__scopeId", "data-v-88422424"]]), o1 = {
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
}, C1 = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (D) => {
      s("export", D);
    }, { isDark: i, colors: l } = ft(ht(a, "theme")), c = M(() => {
      const D = a.data?.documentCounts?.items || [], C = a.data?.processingCounts?.items || [];
      return D.length > 0 || C.length > 0;
    }), d = M(() => {
      const D = a.data?.documentCounts?.items || [];
      return {
        processing_started: D.reduce((C, $) => C + $.processing_started, 0),
        processing_completed: D.reduce((C, $) => C + $.processing_completed, 0),
        processing_failed: D.reduce((C, $) => C + $.processing_failed, 0),
        row_count_total: D.reduce((C, $) => C + $.row_count_total, 0)
      };
    }), u = M(() => {
      const D = a.data?.processingCounts?.items || [];
      return {
        processing_started: D.reduce((C, $) => C + $.processing_started, 0),
        processing_success: D.reduce((C, $) => C + $.processing_success, 0),
        notification_sent: D.reduce((C, $) => C + $.notification_sent, 0),
        notification_failed: D.reduce((C, $) => C + $.notification_failed, 0),
        dq_phone: D.reduce((C, $) => C + $.dq_error_phone_not_found, 0),
        dq_flight: D.reduce((C, $) => C + $.dq_error_flight_not_found, 0),
        dq_booking: D.reduce((C, $) => C + $.dq_error_booking_not_found, 0),
        dq_other: D.reduce((C, $) => C + $.dq_error_other, 0),
        totalDqErrors: D.reduce((C, $) => C + $.dq_error_phone_not_found + $.dq_error_flight_not_found + $.dq_error_booking_not_found + $.dq_error_other, 0)
      };
    }), h = M(() => d.value.row_count_total || u.value.processing_started), p = M(() => Math.max(0, h.value - u.value.notification_sent)), _ = (D, C) => C ? `${Math.round(D / C * 100)}%` : "0%", f = M(() => {
      const D = [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].filter((C) => C.count > 0).sort((C, $) => $.count - C.count);
      return D.length > 0 ? D[0] : { reason: "None", count: 0 };
    }), v = M(() => {
      const D = h.value;
      return [
        { reason: "Booking not found", count: u.value.dq_booking },
        { reason: "Flight not found", count: u.value.dq_flight },
        { reason: "Phone not found", count: u.value.dq_phone },
        { reason: "Notification failed", count: u.value.notification_failed },
        { reason: "Other", count: u.value.dq_other }
      ].map((C) => ({
        ...C,
        impactPct: D > 0 ? Math.round(C.count / D * 100) : 0
      }));
    }), x = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], m = M(
      () => v.value.map((D) => ({
        id: D.reason,
        reason: D.reason,
        count: D.count,
        impactPct: D.impactPct
      }))
    ), g = M(() => {
      const D = h.value, C = u.value.processing_success, $ = Math.max(0, C - u.value.totalDqErrors), B = u.value.notification_sent, T = Math.max(0, D - C), L = u.value.totalDqErrors, E = Math.max(0, $ - B), I = (N, tt) => {
        const et = tt > 0 ? Math.round(N / tt * 100) : 0;
        return `${N.toLocaleString()} (${et}%)`;
      }, W = [
        { name: "Records Detected" },
        { name: "Valid Reservations" },
        { name: "Invalid / Unprocessed" },
        { name: "Contactable" },
        { name: "Data Quality Issues" },
        { name: "Notified" },
        { name: "Not Delivered" }
      ], K = [];
      return C > 0 && K.push({ source: "Records Detected", target: "Valid Reservations", value: C, label: I(C, D) }), T > 0 && K.push({ source: "Records Detected", target: "Invalid / Unprocessed", value: T, label: I(T, D) }), $ > 0 && K.push({ source: "Valid Reservations", target: "Contactable", value: $, label: I($, D) }), L > 0 && K.push({ source: "Valid Reservations", target: "Data Quality Issues", value: L, label: I(L, D) }), B > 0 && K.push({ source: "Contactable", target: "Notified", value: B, label: I(B, D) }), E > 0 && K.push({ source: "Contactable", target: "Not Delivered", value: E, label: I(E, D) }), { nodes: W, links: K };
    }), y = {
      "Records Detected": "#DBEAFE",
      "Valid Reservations": "#D1FAE5",
      "Invalid / Unprocessed": "#FEE2E2",
      Contactable: "#BBF7D0",
      "Data Quality Issues": "#FED7AA",
      Notified: "#86EFAC",
      "Not Delivered": "#FCA5A5"
    }, w = M(() => {
      const D = [...a.data?.processingCounts?.items || []].sort(
        (I, W) => new Date(I.date).getTime() - new Date(W.date).getTime()
      ), C = a.data?.documentCounts?.items || [], $ = {};
      for (const I of C)
        $[I.date] = ($[I.date] || 0) + I.row_count_total;
      const B = [.../* @__PURE__ */ new Set([...D.map((I) => I.date), ...C.map((I) => I.date)])].sort(), T = B.map((I) => It(I).format("MMM DD")), L = B.map((I) => {
        const W = D.find((tt) => tt.date === I), K = W?.notification_sent || 0, N = $[I] || W?.processing_started || 0;
        return N > 0 ? Math.round(K / N * 100) : 0;
      }), E = B.map((I) => D.find((K) => K.date === I)?.notification_sent || 0);
      return {
        labels: T,
        datasets: [
          {
            label: "Success Rate (%)",
            data: L,
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
    }), S = M(() => ({
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
            label: (D) => D.datasetIndex === 0 ? ` Success Rate: ${D.raw}%` : ` Notifications: ${D.raw}`
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
            callback: (D) => `${D}%`
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
    return t({ isDark: i }), (D, C) => (b(), Y(ut, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis"
    }, {
      headerExport: P(() => [
        e.enableExport && !a.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        a.loading ? (b(), k("div", o1, [...C[0] || (C[0] = [
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
        ])])) : (b(), k("div", i1, [
          c.value ? (b(), k(U, { key: 0 }, [
            r("section", l1, [
              C[2] || (C[2] = r("div", { class: "chart-header" }, [
                r("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              r("div", r1, [
                g.value.nodes.length > 0 && g.value.links.length > 0 ? (b(), Y(Fe, {
                  key: 0,
                  data: g.value,
                  "node-colors": y,
                  height: "350px"
                }, null, 8, ["data"])) : (b(), k("div", c1, [...C[1] || (C[1] = [
                  r("p", { class: "empty-chart-text" }, "No processing data available for visualization", -1)
                ])]))
              ])
            ]),
            r("div", d1, [
              V(rt, {
                color: "#3b82f6",
                title: "Total Records",
                value: F(X)(d.value.row_count_total)
              }, null, 8, ["value"]),
              V(rt, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: F(X)(h.value)
              }, null, 8, ["value"]),
              V(rt, {
                color: "#10b981",
                title: "Successfully Notified",
                value: F(X)(u.value.notification_sent),
                subvalue: _(u.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              V(rt, {
                color: "#ef4444",
                title: "Not Notified",
                value: F(X)(p.value),
                subvalue: _(p.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              V(rt, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: f.value.reason,
                subvalue: f.value.count > 0 ? `${F(X)(f.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            v.value.length > 0 ? (b(), k("section", u1, [
              C[3] || (C[3] = r("div", { class: "section-header" }, [
                r("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              r("div", h1, [
                V(Qt, {
                  columns: x,
                  rows: m.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": P(({ row: $ }) => [
                    r("span", f1, A($.reason), 1)
                  ]),
                  "cell-count": P(({ row: $ }) => [
                    r("span", g1, A(F(X)($.count)), 1)
                  ]),
                  "cell-impact": P(({ row: $ }) => [
                    r("div", p1, [
                      r("div", {
                        class: "impact-bar",
                        style: gt({ width: $.impactPct + "%" })
                      }, null, 4),
                      r("span", m1, A($.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : O("", !0),
            r("div", b1, [
              w.value.labels.length > 0 ? (b(), k("section", v1, [
                C[4] || (C[4] = r("div", { class: "chart-header" }, [
                  r("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                r("div", y1, [
                  V(le, {
                    data: w.value,
                    options: S.value,
                    theme: a.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : O("", !0),
              r("details", _1, [
                C[5] || (C[5] = r("summary", { class: "system-health-toggle" }, [
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
                  _t(" System Health Details ")
                ], -1)),
                r("div", x1, [
                  r("div", k1, [
                    V(rt, {
                      title: "Docs Started",
                      value: F(X)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    V(rt, {
                      title: "Docs Completed",
                      value: F(X)(d.value.processing_completed)
                    }, null, 8, ["value"]),
                    V(rt, {
                      title: "Docs Failed",
                      value: F(X)(d.value.processing_failed)
                    }, null, 8, ["value"]),
                    V(rt, {
                      title: "Processing Started",
                      value: F(X)(u.value.processing_started)
                    }, null, 8, ["value"]),
                    V(rt, {
                      title: "Processing Success",
                      value: F(X)(u.value.processing_success)
                    }, null, 8, ["value"]),
                    V(rt, {
                      title: "Notification Failed",
                      value: F(X)(u.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (b(), k("section", w1, [...C[6] || (C[6] = [
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
      _: 1
    }));
  }
}), $1 = /* @__PURE__ */ it(C1, [["__scopeId", "data-v-b99a7ade"]]), S1 = { class: "highlight-inner" }, M1 = {
  key: 0,
  class: "loading-state"
}, D1 = {
  key: 1,
  class: "card-body"
}, A1 = { class: "metric-value" }, T1 = /* @__PURE__ */ Q({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ft(ht(n, "theme")), s = M(() => X(n.totalConversations)), o = M(
      () => n.previousTotalConversations !== null && n.previousTotalConversations !== void 0
    ), i = M(() => {
      if (!o.value) return 0;
      const d = n.previousTotalConversations;
      return d === 0 ? n.totalConversations > 0 ? 100 : 0 : (n.totalConversations - d) / d * 100;
    }), l = M(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), Y(ut, {
      title: "",
      collapsible: !1,
      class: H(["total-conv-metric", "w-full", { "total-conv-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
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
      headerAside: P(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: P(() => [
        r("div", S1, [
          e.loading ? (b(), k("div", M1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", D1, [
            r("span", A1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "Total Conversations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), B1 = /* @__PURE__ */ it(T1, [["__scopeId", "data-v-f7e693e9"]]), L1 = { class: "highlight-inner" }, F1 = {
  key: 0,
  class: "loading-state"
}, P1 = {
  key: 1,
  class: "card-body"
}, E1 = { class: "metric-value" }, I1 = /* @__PURE__ */ Q({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ft(ht(n, "theme")), s = M(() => `${n.csatP95.toFixed(1)}`), o = M(
      () => n.previousCsatP95 !== null && n.previousCsatP95 !== void 0
    ), i = M(() => {
      if (!o.value) return 0;
      const d = n.previousCsatP95;
      return d === 0 ? n.csatP95 > 0 ? 100 : 0 : (n.csatP95 - d) / d * 100;
    }), l = M(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), Y(ut, {
      collapsible: !1,
      class: H(["csat-p95-metric", "w-full", { "csat-p95-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
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
      headerAside: P(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: P(() => [
        r("div", L1, [
          e.loading ? (b(), k("div", F1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", P1, [
            r("span", E1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT P95", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), R1 = /* @__PURE__ */ it(I1, [["__scopeId", "data-v-86f3d7c7"]]), O1 = { class: "highlight-inner" }, V1 = {
  key: 0,
  class: "loading-state"
}, z1 = {
  key: 1,
  class: "card-body"
}, N1 = { class: "metric-value" }, j1 = /* @__PURE__ */ Q({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ft(ht(n, "theme")), s = M(() => `${n.csatPulse.toFixed(1)}%`), o = M(() => n.previousCsatPulse !== null && n.previousCsatPulse !== void 0), i = M(() => {
      if (!o.value) return 0;
      const d = n.previousCsatPulse;
      return d === 0 ? n.csatPulse > 0 ? 100 : 0 : (n.csatPulse - d) / Math.abs(d) * 100;
    }), l = M(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), Y(ut, {
      collapsible: !1,
      class: H(["csat-pulse-metric", "w-full", { "csat-pulse-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
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
                d: "M3 12h3l2-6 4 12 3-8 2 2h4"
              })
            ])
          ])
        ], -1)
      ])]),
      headerAside: P(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: P(() => [
        r("div", O1, [
          e.loading ? (b(), k("div", V1, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", z1, [
            r("span", N1, A(s.value), 1),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "CSAT Pulse", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), W1 = /* @__PURE__ */ it(j1, [["__scopeId", "data-v-77fbe3a3"]]), H1 = {
  key: 0,
  class: "loading-state"
}, Y1 = {
  key: 1,
  class: "card-body"
}, K1 = { class: "chart-wrapper" }, U1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, q1 = {
  key: 2,
  class: "empty-state"
}, X1 = 500, G1 = 60, Z1 = 80, Q1 = {
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
    const a = n, s = (d) => {
      a("export", d);
    }, o = e, { isDark: i } = ft(ht(o, "theme")), l = M(() => o.data), c = M(() => Math.max(600, window.innerWidth * 0.85));
    return t({ isDark: i }), (d, u) => (b(), Y(ut, {
      class: "nps-overview-root h-full min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !o.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        o.loading ? (b(), k("div", H1, [...u[0] || (u[0] = [
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
        ])])) : l.value && l.value.total_nps_responses > 0 ? (b(), k("div", Y1, [
          r("div", K1, [
            V(Pi, {
              histogram: l.value.histogram || [],
              "min-score": l.value.min_score || 0,
              "max-score": l.value.max_score || 0,
              "q1-score": l.value.q1_score || 0,
              "median-score": l.value.median_score || 0,
              "q3-score": l.value.q3_score || 0,
              "average-score": l.value.average_score || 0,
              "chart-width": c.value,
              "chart-height": X1,
              "chart-margin": G1,
              "chart-bottom-margin": Z1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score", "chart-width"])
          ]),
          r("div", U1, [
            V(rt, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(l.value.total_nps_responses)
            }, null, 8, ["value"]),
            l.value.p95_score > 0 ? (b(), Y(rt, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(l.value.p95_score)
            }, null, 8, ["value"])) : O("", !0)
          ])
        ])) : (b(), k("div", q1, [...u[1] || (u[1] = [
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
      _: 1
    }));
  }
}, Yi = /* @__PURE__ */ it(Q1, [["__scopeId", "data-v-9076e01c"]]), J1 = {
  key: 0,
  class: "loading-state"
}, t_ = {
  key: 1,
  class: "card-body"
}, e_ = {
  key: 2,
  class: "empty-state"
}, n_ = {
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
    const n = t, a = (d) => {
      n("export", d);
    }, s = e, o = M(() => s.data?.csat_p95_by_day || []), i = M(() => o.value.length > 0), l = M(() => ({
      labels: o.value.map((d) => It(d.date).format("DD-MM-YYYY")),
      datasets: [
        {
          label: "CSAT P95",
          data: o.value.map((d) => Number(d.p95_score || 0)),
          borderColor: "#7C3AED",
          pointBorderColor: "#7C3AED",
          pointBackgroundColor: "#FFFFFF",
          tension: 0.25
        }
      ]
    })), c = {
      scales: {
        y: {
          min: 0,
          max: 11,
          ticks: {
            callback: (d) => Number(d).toFixed(2)
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (d) => d.parsed.y.toFixed(2)
          }
        }
      }
    };
    return (d, u) => (b(), Y(ut, {
      class: "nps-daily-root h-full min-h-0",
      title: "CSAT P95 by Date",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !s.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: a,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        s.loading ? (b(), k("div", J1, [...u[0] || (u[0] = [
          r("p", { class: "loading-text" }, "Loading daily CSAT P95...", -1)
        ])])) : i.value ? (b(), k("div", t_, [
          V(le, {
            data: l.value,
            options: c,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", e_, [...u[1] || (u[1] = [
          r("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          r("p", { class: "empty-description" }, "No CSAT P95 points were found for the selected date range.", -1)
        ])]))
      ]),
      _: 1
    }));
  }
}, Ki = /* @__PURE__ */ it(n_, [["__scopeId", "data-v-bab6b204"]]), a_ = {
  key: 0,
  class: "loading-state"
}, s_ = {
  key: 1,
  class: "card-body"
}, o_ = {
  key: 2,
  class: "empty-state"
}, i_ = /* @__PURE__ */ Q({
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
    const t = e, n = M(() => t.data?.resolution_breakdown || []), a = M(() => n.value.some((i) => Number(i.count || 0) > 0)), s = M(() => {
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
    return (i, l) => (b(), Y(ut, {
      class: "nps-resolution-root h-full min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1
    }, {
      default: P(() => [
        t.loading ? (b(), k("div", a_, [...l[0] || (l[0] = [
          r("p", { class: "loading-text" }, "Loading resolution data...", -1)
        ])])) : a.value ? (b(), k("div", s_, [
          V(he, {
            data: s.value,
            options: o,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", o_, [...l[1] || (l[1] = [
          r("p", { class: "empty-title" }, "No resolution answers available", -1),
          r("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }));
  }
}), l_ = /* @__PURE__ */ it(i_, [["__scopeId", "data-v-4ebea197"]]), r_ = {
  key: 0,
  class: "loading-state"
}, c_ = {
  key: 1,
  class: "card-body"
}, d_ = {
  key: 2,
  class: "empty-state"
}, u_ = /* @__PURE__ */ Q({
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
    const t = e, n = M(() => t.data?.csat_pulse_by_day || []), a = M(() => n.value.length > 0), s = M(() => ({
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
    return (i, l) => (b(), Y(ut, {
      class: "nps-pulse-root h-full min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1
    }, {
      default: P(() => [
        t.loading ? (b(), k("div", r_, [...l[0] || (l[0] = [
          r("p", { class: "loading-text" }, "Loading CSAT Pulse trend...", -1)
        ])])) : a.value ? (b(), k("div", c_, [
          V(le, {
            data: s.value,
            options: o,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (b(), k("div", d_, [...l[1] || (l[1] = [
          r("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          r("p", { class: "empty-description" }, "No CSAT pulse points were found for the selected date range.", -1)
        ])]))
      ]),
      _: 1
    }));
  }
}), h_ = /* @__PURE__ */ it(u_, [["__scopeId", "data-v-ba9603d9"]]), f_ = { class: "nps-metrics-container" }, g_ = {
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
    }, s = e, o = M(() => s.showResolutionChart), i = M(() => s.showCsatPulseChart);
    return (l, c) => (b(), k("div", f_, [
      V(Yi, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      V(Ki, {
        data: e.data,
        loading: e.loading,
        "enable-export": e.enableExport,
        onExport: a
      }, null, 8, ["data", "loading", "enable-export"]),
      o.value ? (b(), Y(l_, {
        key: 0,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : O("", !0),
      i.value ? (b(), Y(h_, {
        key: 1,
        data: e.data,
        loading: e.loading
      }, null, 8, ["data", "loading"])) : O("", !0)
    ]));
  }
}, Ui = /* @__PURE__ */ it(g_, [["__scopeId", "data-v-101623e8"]]), p_ = { class: "csat-container__body" }, m_ = /* @__PURE__ */ Q({
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
    return (s, o) => (b(), Y(ut, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen
    }, {
      default: P(() => [
        r("div", p_, [
          V(Ui, {
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
    }, 8, ["default-open"]));
  }
}), b_ = /* @__PURE__ */ it(m_, [["__scopeId", "data-v-a04cdc67"]]), v_ = { class: "highlight-inner" }, y_ = {
  key: 0,
  class: "loading-state"
}, __ = {
  key: 1,
  class: "card-body"
}, x_ = { class: "metric-row" }, k_ = { class: "metric-currency" }, w_ = { class: "metric-value" }, C_ = /* @__PURE__ */ Q({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a } = ft(ht(n, "theme")), s = M(() => we(n.totalRevenue)), o = M(
      () => n.previousTotalRevenue !== null && n.previousTotalRevenue !== void 0
    ), i = M(() => {
      if (!o.value) return 0;
      const d = n.previousTotalRevenue;
      return d === 0 ? n.totalRevenue > 0 ? 100 : 0 : (n.totalRevenue - d) / d * 100;
    }), l = M(() => {
      const d = i.value.toFixed(1);
      return i.value > 0 ? `+${d}% vs prev.` : `${d}% vs prev.`;
    }), c = M(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: a, changePercent: i }), (d, u) => (b(), Y(ut, {
      collapsible: !1,
      class: H(["ai-revenue-metric", "w-full", { "ai-revenue-metric--dark": F(a) }])
    }, {
      title: P(() => [...u[0] || (u[0] = [
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
      headerAside: P(() => [
        !e.loading && o.value ? (b(), k("div", {
          key: 0,
          class: H(["change-badge", c.value])
        }, A(l.value), 3)) : O("", !0)
      ]),
      default: P(() => [
        r("div", v_, [
          e.loading ? (b(), k("div", y_, [...u[1] || (u[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", __, [
            r("div", x_, [
              r("span", k_, A(n.currencyCode), 1),
              r("span", w_, A(s.value), 1)
            ]),
            u[2] || (u[2] = r("span", { class: "metric-label" }, "AI Revenue", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), $_ = /* @__PURE__ */ it(C_, [["__scopeId", "data-v-6a1564d6"]]), S_ = { class: "flex justify-end" }, M_ = {
  key: 0,
  class: "flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
}, D_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, A_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, T_ = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, B_ = { class: "flex flex-wrap gap-4" }, L_ = { class: "text-[var(--kiut-text-primary,#111827)]" }, F_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5" }, P_ = { class: "flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]" }, E_ = { class: "truncate" }, I_ = { class: "mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]" }, R_ = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, O_ = /* @__PURE__ */ Q({
  __name: "HumanEscalations",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, o = [30, 50, 70, 50, 40], i = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], l = ht(a, "theme"), { isDark: c } = ft(l), d = ot(a.breakdownBy), u = M(() => a.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), h = ot({ labels: [], datasets: [] }), p = ot([]), _ = ot([]), f = ["#3b82f6", "#f59e0b", "#06b6d4", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"], v = (y) => f[y % f.length], x = () => {
      s("changeBreakdown", d.value);
    }, m = (y) => {
      if (!y) return "";
      const S = y.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return S ? S.charAt(0).toUpperCase() + S.slice(1) : "";
    }, g = (y) => {
      if (d.value === "all") {
        const T = y?.escalations_by_day ?? [];
        if (!T.length) {
          h.value = { labels: [], datasets: [] }, p.value = [], _.value = [];
          return;
        }
        const L = [...T].sort((E, I) => E.date.localeCompare(I.date));
        h.value = {
          labels: L.map((E) => It(E.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: L.map((E) => Number(E.escalation_rate_percentage || 0)),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, p.value = [], _.value = [];
        return;
      }
      const w = y?.breakdown_by_day ?? [], S = y?.breakdown_items ?? [];
      if (!w.length) {
        h.value = { labels: [], datasets: [] }, p.value = [], _.value = [];
        return;
      }
      const D = [...w].sort((T, L) => T.date.localeCompare(L.date)), C = S.slice(0, 5).map((T) => T.key), $ = D.map((T) => It(T.date).format("MMM DD")), B = C.map((T, L) => {
        const E = S.find((I) => I.key === T);
        return {
          label: m(E?.label || T),
          data: D.map((I) => {
            const W = I.items.find((K) => K.key === T);
            return Number(W?.percentage || 0);
          }),
          borderColor: v(L),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      h.value = {
        labels: $,
        datasets: B
      }, p.value = S.slice(0, 5).map((T, L) => ({
        key: T.key,
        label: m(T.label),
        percentage: Number(T.percentage || 0),
        color: v(L)
      })), _.value = S.slice(0, 5).map((T, L) => ({
        key: T.key,
        label: m(T.label),
        color: v(L)
      }));
    };
    return Pt(
      () => a.data,
      (y) => {
        g(y ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Pt(
      () => a.breakdownBy,
      (y) => {
        d.value = y, g(u.value);
      }
    ), t({ isDark: c }), (y, w) => (b(), Y(ut, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1
    }, {
      headerAside: P(() => [
        r("div", S_, [
          Gt(r("select", {
            "onUpdate:modelValue": w[0] || (w[0] = (S) => d.value = S),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: x
          }, [...w[1] || (w[1] = [
            r("option", { value: "all" }, "All", -1),
            r("option", { value: "agent" }, "By Agent", -1),
            r("option", { value: "channel" }, "By Channel", -1),
            r("option", { value: "agent_channel" }, "By Agent/Channel", -1)
          ])], 544), [
            [el, d.value]
          ])
        ])
      ]),
      default: P(() => [
        r("div", {
          class: H(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", a.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          a.loading ? (b(), k("div", M_, [
            r("div", D_, [
              (b(), k(U, null, st(o, (S, D) => r("div", {
                key: D,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70", i[D]]),
                style: gt({ height: `${S}%` })
              }, null, 6)), 64))
            ]),
            w[2] || (w[2] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading human escalations... ", -1))
          ])) : (b(), k(U, { key: 1 }, [
            h.value.labels && h.value.labels.length && h.value.datasets.length ? (b(), k("section", A_, [
              r("div", T_, [
                V(le, {
                  data: h.value,
                  theme: l.value
                }, null, 8, ["data", "theme"])
              ]),
              r("div", B_, [
                (b(!0), k(U, null, st(_.value, (S) => (b(), k("div", {
                  key: `legend-${S.key}`,
                  class: "inline-flex items-center gap-2 text-sm"
                }, [
                  r("span", {
                    class: "inline-block h-2.5 w-2.5 rounded-full",
                    style: gt({ backgroundColor: S.color })
                  }, null, 4),
                  r("span", L_, A(S.label), 1)
                ]))), 128))
              ]),
              r("div", F_, [
                (b(!0), k(U, null, st(p.value, (S) => (b(), k("div", {
                  key: `card-${S.key}`,
                  class: "rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
                }, [
                  r("p", P_, [
                    r("span", {
                      class: "inline-block h-2.5 w-2.5 rounded-full",
                      style: gt({ backgroundColor: S.color })
                    }, null, 4),
                    r("span", E_, A(S.label), 1)
                  ]),
                  r("p", I_, A(S.percentage.toFixed(1)) + "% ", 1)
                ]))), 128))
              ])
            ])) : (b(), k("section", R_, [...w[3] || (w[3] = [
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
}), V_ = /* @__PURE__ */ it(O_, [["__scopeId", "data-v-809d3c8c"]]), z_ = { class: "highlight-inner" }, N_ = {
  key: 0,
  class: "loading-state"
}, j_ = {
  key: 1,
  class: "card-body"
}, W_ = { class: "metric-value" }, H_ = /* @__PURE__ */ Q({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e) {
    const t = e, { isDark: n } = ft(ht(t, "theme")), a = M(() => `${Number(t.escalationRatePercentage || 0).toFixed(2)}%`), s = M(
      () => t.previousEscalationRatePercentage !== null && t.previousEscalationRatePercentage !== void 0
    ), o = M(() => {
      if (!s.value) return 0;
      const c = t.previousEscalationRatePercentage;
      return c === 0 ? t.escalationRatePercentage > 0 ? 100 : 0 : (t.escalationRatePercentage - c) / c * 100;
    }), i = M(() => {
      const c = o.value.toFixed(1);
      return o.value > 0 ? `+${c}% vs prev.` : `${c}% vs prev.`;
    }), l = M(() => o.value > 0 ? "change-badge--up" : o.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return (c, d) => (b(), Y(ut, {
      collapsible: !1,
      class: H(["human-escalations-metric", "w-full", { "human-escalations-metric--dark": F(n) }])
    }, {
      title: P(() => [...d[0] || (d[0] = [
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
      headerAside: P(() => [
        !e.loading && s.value ? (b(), k("div", {
          key: 0,
          class: H(["change-badge", l.value])
        }, A(i.value), 3)) : O("", !0)
      ]),
      default: P(() => [
        r("div", z_, [
          e.loading ? (b(), k("div", N_, [...d[1] || (d[1] = [
            r("div", { class: "shimmer shimmer-value" }, null, -1),
            r("div", { class: "shimmer shimmer-label" }, null, -1)
          ])])) : (b(), k("div", j_, [
            r("span", W_, A(a.value), 1),
            d[2] || (d[2] = r("span", { class: "metric-label" }, "Human Escalations", -1))
          ]))
        ])
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Y_ = /* @__PURE__ */ it(H_, [["__scopeId", "data-v-a4480f29"]]), K_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, U_ = {
  key: 0,
  class: "flex min-h-[320px] flex-col items-center justify-center px-4"
}, q_ = { class: "mb-6 flex h-[100px] items-end justify-center gap-2.5" }, X_ = {
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
    const t = e, { isDark: n, colors: a } = ft(ht(t, "theme")), s = [30, 50, 70, 50, 40], o = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]"], i = M(() => {
      const d = t.data ?? {}, u = d.daily, h = d.days, p = Array.isArray(u) && u.length > 0, _ = Array.isArray(h) && h.length > 0 && Array.isArray(d.allocatedCostSeries) && d.allocatedCostSeries.length === h.length;
      let f = [];
      return p ? f = u : _ && (f = h.map((v, x) => ({
        date: v,
        allocated_cost: d.allocatedCostSeries[x] ?? 0,
        aws_cost: d.awsCostSeries[x] ?? 0,
        airline_conversations: d.airlineConversationsSeries[x] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: d.total_allocated_cost ?? d.totalAllocated ?? 0,
        total_cost: d.total_cost ?? d.total ?? 0,
        total_conversations: d.total_conversations ?? d.totalConversations ?? 0,
        total_airline_conversations: d.total_airline_conversations ?? d.totalAirlineConversations ?? 0,
        airline_name: d.airline_name
      };
    }), l = M(() => {
      const d = i.value.daily;
      return {
        labels: d.map((h) => h.date),
        datasets: [
          {
            label: "Allocated Cost",
            data: d.map((h) => h.allocated_cost),
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
            data: d.map((h) => h.aws_cost),
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
            data: d.map((h) => h.airline_conversations),
            borderColor: a.value.info,
            backgroundColor: n.value ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            yAxisID: "y1"
          }
        ]
      };
    }), c = M(() => ({
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
            label(d) {
              const u = d.dataset.label ? `${d.dataset.label}: ` : "", h = d.parsed.y;
              return d.dataset.yAxisID === "y" ? u + kt(h) : u + String(h);
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
            callback: (d) => kt(d)
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
    return (d, u) => (b(), Y(ut, {
      title: i.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", K_, [
          e.loading ? (b(), k("div", U_, [
            r("div", q_, [
              (b(), k(U, null, st(s, (h, p) => r("div", {
                key: p,
                class: H(["w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 dark:from-violet-500 dark:via-violet-400 dark:to-violet-300", o[p]]),
                style: gt({ height: `${h}%` })
              }, null, 6)), 64))
            ]),
            u[0] || (u[0] = r("p", { class: "animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]" }, " Loading chart data... ", -1))
          ])) : i.value.daily.length > 0 ? (b(), k("div", X_, [
            r("div", G_, [
              V(le, {
                class: "h-full min-h-0 w-full",
                data: l.value,
                options: c.value
              }, null, 8, ["data", "options"])
            ]),
            r("div", Z_, [
              V(rt, {
                color: F(a).primaryLight,
                title: "Total Allocated",
                value: F(kt)(i.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              V(rt, {
                color: "#FF9900",
                title: "Total AWS",
                value: F(kt)(i.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (b(), k("section", Q_, [
            r("div", J_, [
              r("div", tx, [
                V(F(Kt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, sx = {
  key: 0,
  class: "chart-section"
}, ox = { class: "chart-container" }, ix = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, lx = {
  key: 1,
  class: "empty-state"
}, rx = { class: "empty-state-content" }, cx = { class: "empty-icon-wrapper" }, dx = {
  key: 1,
  class: "loading-state"
}, ln = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", To = 10, ux = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = ft(ht(a, "theme")), i = (f) => {
      const v = new Date(f), x = String(v.getDate()).padStart(2, "0"), m = String(v.getMonth() + 1).padStart(2, "0");
      return `${x}-${m}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((v, x) => v + (x.input_cost || 0), 0);
    }), d = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((v, x) => v + (x.output_cost || 0), 0);
    }), u = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((v, x) => v + (x.cache_read_cost || 0), 0);
    }), h = M(() => {
      const f = a.data?.costs_by_day || {};
      return Object.values(f).reduce((v, x) => v + (x.cache_write_cost || 0), 0);
    }), p = M(() => {
      const f = a.data?.costs_by_day || {}, v = Object.keys(f).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const x = v.map((g) => i(g)), m = [
        {
          label: "Input Cost",
          data: v.map((g) => f[g]?.input_cost || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: v.map((g) => f[g]?.output_cost || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: v.map((g) => f[g]?.cache_read_cost || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: v.map((g) => f[g]?.cache_write_cost || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: x,
        datasets: m
      };
    }), _ = M(() => a.options ? a.options : {
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
              family: ln,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: To,
            boxHeight: To,
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
            family: ln,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: ln,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(f) {
              let v = f.dataset.label || "";
              return v && (v += ": "), f.parsed.y !== null && (v += kt(f.parsed.y)), v;
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
            font: { family: ln, size: 12, weight: "500" },
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
            font: { family: ln, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8,
            callback: function(f) {
              return kt(f);
            }
          }
        }
      }
    });
    return t({ isDark: s }), (f, v) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", nx, [
          e.loading ? (b(), k("div", dx, [...v[2] || (v[2] = [
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
          ])])) : (b(), k("div", ax, [
            p.value.labels && p.value.labels.length ? (b(), k("section", sx, [
              r("div", ox, [
                V(he, {
                  data: p.value,
                  options: _.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", ix, [
                V(rt, {
                  title: "Total Cost",
                  value: F(kt)(e.data.total_cost)
                }, null, 8, ["value"]),
                V(rt, {
                  title: "Input Cost",
                  value: F(kt)(c.value),
                  color: l.input
                }, null, 8, ["value", "color"]),
                V(rt, {
                  title: "Output Cost",
                  value: F(kt)(d.value),
                  color: l.output
                }, null, 8, ["value", "color"]),
                V(rt, {
                  title: "Cache Read",
                  value: F(kt)(u.value),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                V(rt, {
                  title: "Cache Write",
                  value: F(kt)(h.value),
                  color: l.cache_write
                }, null, 8, ["value", "color"]),
                V(rt, {
                  title: "Avg / Conv.",
                  value: F(kt)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", lx, [
              r("div", rx, [
                r("div", cx, [
                  V(F(Kt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = r("p", { class: "empty-title" }, "No cost usage data", -1)),
                v[1] || (v[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), hx = /* @__PURE__ */ it(ux, [["__scopeId", "data-v-39a5448c"]]), fx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gx = {
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
}, rn = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Bo = 10, kx = /* @__PURE__ */ Q({
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
    const a = e, { isDark: s, colors: o } = ft(ht(a, "theme")), i = (u) => {
      const h = new Date(u), p = String(h.getDate()).padStart(2, "0"), _ = String(h.getMonth() + 1).padStart(2, "0");
      return `${p}-${_}`;
    }, l = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, c = M(() => {
      const u = a.data?.tokens_by_day || {}, h = Object.keys(u).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((f) => i(f)), _ = [
        {
          label: "Input Tokens",
          data: h.map((f) => u[f]?.input_tokens || 0),
          backgroundColor: `${l.input}80`,
          borderColor: l.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((f) => u[f]?.output_tokens || 0),
          backgroundColor: `${l.output}80`,
          borderColor: l.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((f) => u[f]?.cache_read_tokens || 0),
          backgroundColor: `${l.cache_read}80`,
          borderColor: l.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((f) => u[f]?.cache_write_tokens || 0),
          backgroundColor: `${l.cache_write}80`,
          borderColor: l.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: p,
        datasets: _
      };
    }), d = M(() => a.options ? a.options : {
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
              family: rn,
              size: 13,
              weight: "500"
            },
            color: o.value.textSecondary,
            padding: 12,
            boxWidth: Bo,
            boxHeight: Bo,
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
            family: rn,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: rn,
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
            font: { family: rn, size: 12, weight: "500" },
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
            font: { family: rn, size: 12, weight: "500" },
            color: o.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: s }), (u, h) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", fx, [
          e.loading ? (b(), k("div", xx, [...h[2] || (h[2] = [
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
          ])])) : (b(), k("div", gx, [
            c.value.labels && c.value.labels.length ? (b(), k("section", px, [
              r("div", mx, [
                V(he, {
                  data: c.value,
                  options: d.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              r("footer", bx, [
                V(rt, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: F(X)(e.data.total_tokens)
                }, null, 8, ["value"]),
                V(rt, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: F(X)(e.data.total_input_tokens),
                  color: l.input
                }, null, 8, ["value", "color"]),
                V(rt, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: F(X)(e.data.total_output_tokens),
                  color: l.output
                }, null, 8, ["value", "color"]),
                V(rt, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: F(X)(e.data.total_cache_read_tokens),
                  color: l.cache_read
                }, null, 8, ["value", "color"]),
                V(rt, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: F(X)(e.data.total_cache_write_tokens),
                  color: l.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (b(), k("section", vx, [
              r("div", yx, [
                r("div", _x, [
                  V(F(Kt), { class: "empty-icon" })
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
}), wx = /* @__PURE__ */ it(kx, [["__scopeId", "data-v-70c6f3c7"]]), Cx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, $x = {
  key: 0,
  class: "card-body"
}, Sx = {
  key: 0,
  class: "chart-section"
}, Mx = { class: "chart-container" }, Dx = { class: "mt-4 w-full min-w-0" }, Ax = {
  key: 1,
  class: "empty-state"
}, Tx = { class: "empty-state-content" }, Bx = { class: "empty-icon-wrapper" }, Lx = {
  key: 1,
  class: "loading-state"
}, Fx = /* @__PURE__ */ Q({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = M(
      () => X(n.data?.total_conversations ?? 0)
    ), l = M(() => {
      const d = n.data?.conversations_by_day || {}, u = Object.keys(d).sort();
      if (u.length === 0)
        return { labels: [], datasets: [] };
      const h = u.map((_) => o(_)), p = [
        {
          label: "Conversations",
          data: u.map((_) => d[_] || 0),
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
    }), c = M(() => n.options ? n.options : {
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
            label: function(d) {
              let u = d.dataset.label || "";
              return u && (u += ": "), d.parsed.y !== null && (u += d.parsed.y), u;
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
    return t({ isDark: a }), (d, u) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", Cx, [
          e.loading ? (b(), k("div", Lx, [...u[2] || (u[2] = [
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
          ])])) : (b(), k("div", $x, [
            l.value.labels && l.value.labels.length ? (b(), k("section", Sx, [
              r("div", Mx, [
                V(le, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ]),
              r("div", Dx, [
                V(rt, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Ax, [
              r("div", Tx, [
                r("div", Bx, [
                  V(F(Kt), { class: "empty-icon" })
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
}), Px = /* @__PURE__ */ it(Fx, [["__scopeId", "data-v-b33e8627"]]), Ex = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ix = {
  key: 0,
  class: "card-body"
}, Rx = {
  key: 0,
  class: "charts-grid"
}, Ox = { class: "chart-section" }, Vx = { class: "chart-container" }, zx = { class: "chart-section" }, Nx = { class: "chart-container" }, jx = {
  key: 1,
  class: "empty-state"
}, Wx = { class: "empty-state-content" }, Hx = { class: "empty-icon-wrapper" }, Yx = {
  key: 1,
  class: "loading-state"
}, Kx = /* @__PURE__ */ Q({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = M(() => n.data?.top_agents && n.data.top_agents.length > 0), i = M(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, _) => (_.total_cost || 0) - (p.total_cost || 0)) : []), l = M(() => n.data?.top_agents ? [...n.data.top_agents].sort((p, _) => (_.total_tokens || 0) - (p.total_tokens || 0)) : []), c = M(() => {
      const p = i.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: p.map((_) => _.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), d = M(() => {
      const p = l.value;
      return p.length === 0 ? { labels: [], datasets: [] } : {
        labels: p.map((_) => _.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: p.map((_) => _.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), u = M(() => n.options ? n.options : {
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
              const _ = p.label, f = n.data?.top_agents?.find((v) => v.agent_type === _);
              return f ? [
                `Total Cost: ${kt(f.total_cost)}`,
                `Input Cost: ${kt(f.total_input_tokens_cost)}`,
                `Output Cost: ${kt(f.total_output_tokens_cost)}`,
                `Cache Read: ${kt(f.total_read_tokens_cost)}`,
                `Cache Write: ${kt(f.total_write_tokens_cost)}`
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
              return kt(p);
            }
          }
        }
      }
    }), h = M(() => n.options ? n.options : {
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
              const _ = p.label, f = n.data?.top_agents?.find((v) => v.agent_type === _);
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
    return t({ isDark: a }), (p, _) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", Ex, [
          e.loading ? (b(), k("div", Yx, [..._[4] || (_[4] = [
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
          ])])) : (b(), k("div", Ix, [
            o.value ? (b(), k("div", Rx, [
              r("section", Ox, [
                _[0] || (_[0] = r("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                r("div", Vx, [
                  V(he, {
                    data: c.value,
                    options: u.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              r("section", zx, [
                _[1] || (_[1] = r("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                r("div", Nx, [
                  V(he, {
                    data: d.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (b(), k("section", jx, [
              r("div", Wx, [
                r("div", Hx, [
                  V(F(Kt), { class: "empty-icon" })
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
}), Ux = /* @__PURE__ */ it(Kx, [["__scopeId", "data-v-a5014772"]]), qx = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Xx = {
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
}, nk = /* @__PURE__ */ Q({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, i = M(() => n.data?.top_agents ? n.data.top_agents.filter(
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), l = M(() => i.value.length > 0), c = M(() => i.value.reduce((h, p) => h + (p.conversations || 0), 0)), d = M(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const p = h.map((v) => {
        const x = v.agent_type?.toLowerCase();
        return (o[x] || "#a78bfa") + "80";
      }), _ = h.map((v) => {
        const x = v.agent_type?.toLowerCase();
        return o[x] || "#a78bfa";
      });
      return {
        labels: h.map((v) => {
          const x = v.conversations || 0, m = c.value ? x / c.value * 100 : 0;
          return `${v.agent_type} - ${x.toLocaleString()} (${m.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((v) => v.conversations || 0),
            backgroundColor: p,
            borderColor: _,
            borderWidth: 2
          }
        ]
      };
    }), u = M(() => n.options ? n.options : {
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
              const p = (h.label || "").toString(), _ = Number(h.parsed) || 0, f = (h.dataset.data || []).reduce((x, m) => x + (Number(m) || 0), 0), v = f ? _ / f * 100 : 0;
              return `${p}: ${_.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: a }), (h, p) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", qx, [
          e.loading ? (b(), k("div", ek, [...p[2] || (p[2] = [
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
          ])])) : (b(), k("div", Xx, [
            l.value ? (b(), k("section", Gx, [
              r("div", Zx, [
                V(oa, {
                  data: d.value,
                  options: u.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", Qx, [
              r("div", Jx, [
                r("div", tk, [
                  V(F(Kt), { class: "empty-icon" })
                ]),
                p[0] || (p[0] = r("p", { class: "empty-title" }, "No top agents data", -1)),
                p[1] || (p[1] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), ak = /* @__PURE__ */ it(nk, [["__scopeId", "data-v-14445b91"]]), sk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ok = {
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
}, hk = /* @__PURE__ */ Q({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const n = e, { isDark: a, colors: s } = ft(ht(n, "theme")), o = (d) => {
      const u = new Date(d), h = String(u.getDate()).padStart(2, "0");
      return `${String(u.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = M(() => {
      const d = n.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(d) && d.length > 0)
        return !0;
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {};
      return Object.keys(u).length > 0 && Object.keys(h).length > 0;
    }), l = M(() => {
      const d = n.costData?.daily_mean_cost_per_conversation || [];
      if (d.length > 0) {
        const x = [...d].sort((m, g) => m.date.localeCompare(g.date));
        return {
          labels: x.map((m) => o(m.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: x.map((m) => Number(m.value) || 0),
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
      const u = n.costData?.costs_by_day || {}, h = n.conversationData?.conversations_by_day || {}, _ = Object.keys(u).filter((x) => h[x]).sort();
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const f = _.map((x) => o(x)), v = _.map((x) => {
        const m = u[x]?.total_cost || 0, g = h[x] || 0;
        return g > 0 ? m / g : 0;
      });
      return {
        labels: f,
        datasets: [
          {
            label: "Mean USD/conv",
            data: v,
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
    }), c = M(() => n.options ? n.options : {
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
            label: function(d) {
              let u = d.dataset.label || "";
              return u && (u += ": "), d.parsed.y !== null && (u += kt(d.parsed.y)), u;
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
            callback: function(d) {
              return kt(d);
            }
          }
        }
      }
    });
    return t({ isDark: a }), (d, u) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1
    }, {
      default: P(() => [
        r("div", sk, [
          e.loading ? (b(), k("div", uk, [...u[2] || (u[2] = [
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
          ])])) : (b(), k("div", ok, [
            i.value ? (b(), k("section", ik, [
              r("div", lk, [
                V(le, {
                  data: l.value,
                  options: c.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (b(), k("section", rk, [
              r("div", ck, [
                r("div", dk, [
                  V(F(Kt), { class: "empty-icon" })
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
}), fk = /* @__PURE__ */ it(hk, [["__scopeId", "data-v-1e8204ea"]]);
function Yt() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const gk = { class: "tabs text-sm" }, pk = ["aria-label"], mk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], bk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, vk = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = ot([]), o = `tabs-${Yt()}`, i = (f) => `${o}-tab-${f}`, l = M(
      () => n.items.map((f, v) => f.disabled ? -1 : v).filter((f) => f >= 0)
    );
    function c(f) {
      return f.value === n.modelValue;
    }
    function d(f) {
      const v = c(f), m = `${n.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return f.disabled ? `${m} cursor-not-allowed opacity-40` : v ? `${m} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${m} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function u(f, v) {
      f === v || n.items.find((m) => m.value === f)?.disabled || (a("update:modelValue", f), a("change", { value: f, previousValue: v }));
    }
    function h(f, v) {
      a("tab-click", { value: f.value, originalEvent: v }), !f.disabled && (u(f.value, n.modelValue), zt(() => {
        s.value[n.items.indexOf(f)]?.focus();
      }));
    }
    function p(f, v) {
      const x = n.items.length;
      if (x === 0) return 0;
      let m = f;
      for (let g = 0; g < x; g++)
        if (m = (m + v + x) % x, !n.items[m]?.disabled) return m;
      return f;
    }
    async function _(f, v) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(f.key)) return;
      f.preventDefault();
      let m = v;
      f.key === "ArrowLeft" ? m = p(v, -1) : f.key === "ArrowRight" ? m = p(v, 1) : f.key === "Home" ? m = l.value[0] ?? 0 : f.key === "End" && (m = l.value[l.value.length - 1] ?? v);
      const g = n.items[m];
      !g || g.disabled || (u(g.value, n.modelValue), await zt(), s.value[m]?.focus());
    }
    return (f, v) => (b(), k("div", gk, [
      r("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: H([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (b(!0), k(U, null, st(e.items, (x, m) => (b(), k("button", {
          id: i(x.value),
          key: x.value,
          ref_for: !0,
          ref_key: "tabRefs",
          ref: s,
          type: "button",
          role: "tab",
          "aria-selected": c(x),
          "aria-disabled": x.disabled === !0,
          tabindex: c(x) ? 0 : -1,
          class: H(d(x)),
          onClick: (g) => h(x, g),
          onKeydown: (g) => _(g, m)
        }, [
          r("span", {
            class: H(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            x.icon ? (b(), Y(Xe(x.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : O("", !0),
            r("span", bk, A(x.label), 1)
          ], 2)
        ], 42, mk))), 128))
      ], 10, pk),
      f.$slots.default ? (b(), Y(fn, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: P(() => [
          (b(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            St(f.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : O("", !0)
    ]));
  }
}), qi = /* @__PURE__ */ it(vk, [["__scopeId", "data-v-f9c367eb"]]), yk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, _k = {
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
}, $k = { class: "empty-state-content" }, Sk = { class: "empty-icon-wrapper" }, Mk = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (f) => {
      s("export", f);
    }, { isDark: i } = ft(ht(a, "theme")), l = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], c = ot("by_model"), d = M(() => c.value === "by_model" ? a.data?.total_by_model || {} : a.data?.total_by_provider || {}), u = M(() => [
      { key: "name", label: c.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = M(
      () => Object.entries(d.value).map(([f, v]) => ({
        id: f,
        name: f,
        avgCost: _(v.avg_cost_per_message),
        avgTokens: p(v.avg_tokens_per_message),
        messageCount: p(v.message_count),
        totalCost: _(v.total_cost),
        totalTokens: p(v.total_tokens)
      }))
    ), p = (f) => f == null ? "0" : X(f), _ = (f) => f == null ? "$0.00" : kt(f);
    return t({ isDark: i }), (f, v) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", yk, [
          e.loading ? (b(), k("div", _k, [...v[1] || (v[1] = [
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
          ])])) : (b(), k("div", xk, [
            V(qi, {
              modelValue: c.value,
              "onUpdate:modelValue": v[0] || (v[0] = (x) => c.value = x),
              items: l,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: P(() => [
                d.value && Object.keys(d.value).length > 0 ? (b(), k("div", kk, [
                  r("div", wk, [
                    V(Qt, {
                      columns: u.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (b(), k("div", Ck, [
                  r("div", $k, [
                    r("div", Sk, [
                      V(F(Kt), { class: "empty-icon" })
                    ]),
                    v[2] || (v[2] = r("p", { class: "empty-title" }, "No model usage data available", -1)),
                    v[3] || (v[3] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Dk = /* @__PURE__ */ it(Mk, [["__scopeId", "data-v-0c23d620"]]), Ak = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Tk = {
  key: 0,
  class: "loading-state"
}, Bk = {
  key: 1,
  class: "card-body"
}, Lk = {
  key: 0,
  class: "message-roles-table-block"
}, Fk = { class: "w-full min-w-0" }, Pk = {
  key: 1,
  class: "empty-state"
}, Ek = { class: "empty-state-content" }, Ik = { class: "empty-icon-wrapper" }, Rk = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (v) => {
      s("export", v);
    }, { isDark: i } = ft(ht(a, "theme")), l = ["assistant", "system", "user"], c = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], d = M(() => a.data?.total_by_role || {}), u = M(
      () => l.map((v) => ({
        id: v,
        role: f(v),
        avgCost: _(d.value[v]?.avg_cost_per_message),
        avgTokens: p(d.value[v]?.avg_tokens_per_message),
        messageCount: p(d.value[v]?.message_count),
        totalCost: _(d.value[v]?.total_cost),
        totalTokens: p(d.value[v]?.total_tokens)
      }))
    ), h = M(() => Object.keys(d.value).length > 0), p = (v) => v == null ? "0" : X(v), _ = (v) => v == null ? "$0.00" : kt(v), f = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, x) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", Ak, [
          e.loading ? (b(), k("div", Tk, [...x[0] || (x[0] = [
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
          ])])) : (b(), k("div", Bk, [
            h.value ? (b(), k("div", Lk, [
              r("div", Fk, [
                V(Qt, {
                  columns: c,
                  rows: u.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (b(), k("div", Pk, [
              r("div", Ek, [
                r("div", Ik, [
                  V(F(Kt), { class: "empty-icon" })
                ]),
                x[1] || (x[1] = r("p", { class: "empty-title" }, "No message role data available", -1)),
                x[2] || (x[2] = r("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see message role metrics.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Ok = /* @__PURE__ */ it(Rk, [["__scopeId", "data-v-362c0dbc"]]), Vk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, zk = {
  key: 0,
  class: "card-body"
}, Nk = {
  key: 0,
  class: "chart-section"
}, jk = { class: "chart-container" }, Wk = { class: "kpi-grid" }, Hk = {
  key: 1,
  class: "empty-state"
}, Yk = { class: "empty-state-content" }, Kk = { class: "empty-icon-wrapper" }, Uk = {
  key: 1,
  class: "loading-state"
}, qk = /* @__PURE__ */ Q({
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
    const a = e, s = n, o = (g) => {
      s("export", g);
    }, { isDark: i, colors: l } = ft(ht(a, "theme")), c = {
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
    }, d = (g) => g.agent_type || g.agent_id || g.agent_name || "", u = (g) => g.agent_name ? g.agent_name : d(g).split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (g) => {
      const y = d(g).toLowerCase();
      for (const [w, S] of Object.entries(c))
        if (y.includes(w))
          return S;
      return "#9ca3af";
    }, p = M(() => [...a.data?.top_agents || []].sort((y, w) => w.avg_cost_per_conversation - y.avg_cost_per_conversation)), _ = M(() => a.data?.total_conversations !== void 0 ? Number(a.data.total_conversations) || 0 : p.value.reduce((g, y) => g + y.conversations, 0)), f = M(() => a.data?.total_cost !== void 0 ? Number(a.data.total_cost) || 0 : p.value.reduce((g, y) => g + y.total_cost, 0)), v = M(() => a.data?.overall_avg_cost_per_conversation !== void 0 ? Number(a.data.overall_avg_cost_per_conversation) || 0 : _.value === 0 ? 0 : f.value / _.value), x = M(() => {
      const g = p.value;
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const y = g.map((D) => u(D)), w = g.map((D) => D.avg_cost_per_conversation), S = g.map((D) => h(D));
      return {
        labels: y,
        datasets: [
          {
            label: "USD per conversation",
            data: w,
            backgroundColor: S.map((D) => `${D}80`),
            borderColor: S,
            borderWidth: 1
          }
        ]
      };
    }), m = M(() => a.options ? a.options : {
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
            label: function(g) {
              const y = p.value[g.dataIndex];
              return [
                `Cost: ${kt(g.parsed.x)}`,
                `Conversations: ${X(y.conversations)}`,
                `Total Cost: ${kt(y.total_cost)}`
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
            callback: function(g) {
              return kt(g);
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
    return t({ isDark: i }), (g, y) => (b(), Y(ut, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1
    }, {
      headerExport: P(() => [
        e.enableExport && !e.loading ? (b(), Y(F(Tt), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : O("", !0)
      ]),
      default: P(() => [
        r("div", Vk, [
          e.loading ? (b(), k("div", Uk, [...y[2] || (y[2] = [
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
          ])])) : (b(), k("div", zk, [
            x.value.labels && x.value.labels.length ? (b(), k("section", Nk, [
              r("div", jk, [
                V(he, {
                  data: x.value,
                  options: m.value
                }, null, 8, ["data", "options"])
              ]),
              r("footer", Wk, [
                V(F(rt), {
                  title: "Total Agents",
                  value: String(p.value.length)
                }, null, 8, ["value"]),
                V(F(rt), {
                  title: "Total Conversations",
                  value: F(X)(_.value)
                }, null, 8, ["value"]),
                V(F(rt), {
                  title: "Total Cost",
                  value: F(kt)(f.value)
                }, null, 8, ["value"]),
                V(F(rt), {
                  title: "Avg Cost / Conv.",
                  value: F(kt)(v.value)
                }, null, 8, ["value"])
              ])
            ])) : (b(), k("section", Hk, [
              r("div", Yk, [
                r("div", Kk, [
                  V(F(Kt), { class: "empty-icon" })
                ]),
                y[0] || (y[0] = r("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                y[1] || (y[1] = r("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), Xk = /* @__PURE__ */ it(qk, [["__scopeId", "data-v-49068ad7"]]);
function Gk(e, t) {
  return b(), k("svg", {
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
  return b(), k("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    r("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const Qk = ["aria-label"], Jk = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, t2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, e2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, n2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], a2 = { class: "truncate" }, s2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, o2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, i2 = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, l2 = ["aria-label", "onClick"], r2 = ["aria-label", "onClick"], c2 = ["aria-label"], d2 = ["aria-label"], u2 = {
  key: 1,
  class: "space-y-2"
}, h2 = ["for"], f2 = ["id", "placeholder", "onKeydown"], g2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, p2 = ["aria-label"], m2 = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, b2 = ["checked", "onChange"], v2 = { class: "min-w-0 flex-1" }, y2 = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, _2 = { class: "flex flex-wrap items-end gap-2" }, x2 = { class: "min-w-[120px] flex-1" }, k2 = ["for"], w2 = ["id"], C2 = { class: "min-w-[120px] flex-1" }, $2 = ["for"], S2 = ["id"], M2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = Fa(), i = `${`kiut-filters-${Yt()}`}-panel`, l = ot(null), c = /* @__PURE__ */ new Map(), d = ot(null), u = ot(!1), h = ot({}), p = ot(null), _ = ot(""), f = ot([]), v = ot(""), x = ot(""), m = M(() => d.value ? n.filterDefinitions.find((R) => R.id === d.value) ?? null : null), g = M(() => {
      const R = m.value;
      if (R)
        return R.type === "text" ? _.value : R.type === "select" ? f.value : { start: v.value, end: x.value };
    });
    function y(R, j) {
      j && j instanceof HTMLElement ? c.set(R, j) : c.delete(R);
    }
    function w(R) {
      return n.modelValue[R];
    }
    function S(R) {
      if (R == null) return [];
      if (Array.isArray(R))
        return R.filter((j) => typeof j == "string" && j.trim() !== "");
      if (typeof R == "string") {
        const j = R.trim();
        return j ? [j] : [];
      }
      return [];
    }
    function D(R, j) {
      if (j == null) return !0;
      if (R.type === "text") return String(j).trim() === "";
      if (R.type === "select") return S(j).length === 0;
      if (R.type === "dateRange") {
        const G = j;
        return !G?.start?.trim() || !G?.end?.trim();
      }
      return !0;
    }
    const C = M(
      () => n.filterDefinitions.some((R) => !D(R, w(R.id)))
    ), $ = M(() => {
      const R = [];
      for (const j of n.filterDefinitions) {
        const G = w(j.id);
        if (!D(j, G)) {
          if (j.type === "text")
            R.push({ kind: "text", def: j, key: j.id });
          else if (j.type === "dateRange")
            R.push({ kind: "dateRange", def: j, key: j.id });
          else if (j.type === "select")
            for (const mt of S(G))
              R.push({
                kind: "select",
                def: j,
                optionValue: mt,
                key: `${j.id}::${mt}`
              });
        }
      }
      return R;
    });
    function B(R) {
      return R.type !== "select" ? 0 : S(w(R.id)).length;
    }
    function T(R) {
      const j = w(R.id), G = R.label.replace(/^\+\s*/, "");
      if (R.type === "text") return `${G}: ${String(j ?? "").trim()}`;
      if (R.type === "select") {
        const Zi = S(j).map((as) => R.options.find((Qi) => Qi.value === as)?.label ?? as);
        return `${G}: ${Zi.join(", ")}`;
      }
      const mt = j, Zt = E(mt.start), xe = E(mt.end);
      return `${G}: ${Zt} – ${xe}`;
    }
    function L(R) {
      return R.kind === "text" || R.kind === "dateRange" ? T(R.def) : R.def.options.find((G) => G.value === R.optionValue)?.label ?? R.optionValue;
    }
    function E(R) {
      if (!R) return "";
      const j = It(R, "YYYY-MM-DD", !0);
      return j.isValid() ? j.format("L") : R;
    }
    function I(R) {
      const j = d.value === R.id && u.value, G = !D(R, w(R.id));
      return j || G ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function W(R) {
      return D(R, w(R.id)) ? bt(R) : `Editar filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    function K(R) {
      const j = w(R.id);
      if (R.type === "text") {
        _.value = j != null ? String(j) : "";
        return;
      }
      if (R.type === "select") {
        f.value = [...S(j)];
        return;
      }
      const G = j;
      v.value = G?.start?.trim() ?? "", x.value = G?.end?.trim() ?? "";
    }
    function N() {
      const R = m.value;
      if (!R || R.type !== "select") return;
      const j = { ...n.modelValue };
      f.value.length === 0 ? delete j[R.id] : j[R.id] = [...f.value], a("update:modelValue", j), a("change", j);
    }
    function tt(R) {
      const j = f.value.indexOf(R);
      j >= 0 ? f.value = f.value.filter((G, mt) => mt !== j) : f.value = [...f.value, R], N();
    }
    function et(R) {
      if (!R) return;
      p.value = R;
      const j = R.getBoundingClientRect(), G = 300;
      let mt = j.left;
      const Zt = window.innerWidth - G - 12;
      mt > Zt && (mt = Math.max(12, Zt)), mt < 12 && (mt = 12);
      const xe = j.bottom + 8;
      h.value = {
        top: `${xe}px`,
        left: `${mt}px`,
        width: `${Math.min(G, window.innerWidth - 24)}px`
      };
    }
    function ct(R, j) {
      if (d.value === R.id && u.value) {
        lt();
        return;
      }
      u.value && d.value !== R.id && lt(), d.value = R.id, u.value = !0, K(R), zt().then(async () => {
        et(j.currentTarget), await zt(), nt();
      });
    }
    function q(R, j) {
      if (d.value === R.id && u.value) {
        lt();
        return;
      }
      u.value && d.value !== R.id && lt(), d.value = R.id, u.value = !0, K(R), zt().then(async () => {
        const G = c.get(R.id) ?? j.currentTarget;
        et(G), await zt(), nt();
      });
    }
    function nt() {
      const R = l.value;
      if (!R) return;
      R.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function at() {
      u.value = !1, d.value = null, p.value = null;
    }
    function yt(R) {
      const j = m.value;
      if (!j) return;
      if (j.type === "text") {
        _.value = R != null ? String(R) : "";
        return;
      }
      if (j.type === "select") {
        f.value = Array.isArray(R) ? R.filter((mt) => typeof mt == "string") : S(R);
        return;
      }
      const G = R;
      v.value = G?.start?.trim() ?? "", x.value = G?.end?.trim() ?? "";
    }
    function lt() {
      const R = m.value;
      if (!R) return;
      if (R.type === "text") {
        const Zt = _.value.trim(), xe = { ...n.modelValue };
        Zt === "" ? delete xe[R.id] : xe[R.id] = Zt, a("update:modelValue", xe), a("change", xe), at();
        return;
      }
      if (R.type === "select") {
        N(), at();
        return;
      }
      const j = v.value.trim(), G = x.value.trim(), mt = { ...n.modelValue };
      !j || !G || j > G ? delete mt[R.id] : mt[R.id] = { start: j, end: G }, a("update:modelValue", mt), a("change", mt), at();
    }
    function Et(R) {
      const j = { ...n.modelValue };
      delete j[R], a("update:modelValue", j), a("change", j), d.value === R && at();
    }
    function At(R) {
      if (R.kind === "text" || R.kind === "dateRange") {
        Et(R.def.id);
        return;
      }
      const j = { ...n.modelValue }, mt = S(j[R.def.id]).filter((Zt) => Zt !== R.optionValue);
      mt.length === 0 ? delete j[R.def.id] : j[R.def.id] = mt, a("update:modelValue", j), a("change", j), d.value === R.def.id && K(R.def);
    }
    function z() {
      const R = {};
      a("update:modelValue", R), a("change", R), at();
    }
    const Z = M(() => {
      const R = m.value;
      return R ? `Editar filtro: ${R.label}` : "Filtro";
    });
    function J(R) {
      const j = R.def.label.replace(/^\+\s*/, "");
      return R.kind === "select" ? `Quitar ${R.def.options.find((Zt) => Zt.value === R.optionValue)?.label ?? R.optionValue} del filtro ${j}` : `Quitar filtro ${j}`;
    }
    function dt(R) {
      const j = R.def.label.replace(/^\+\s*/, "");
      if (R.kind === "select") {
        const mt = R.def.options.find((Zt) => Zt.value === R.optionValue)?.label ?? R.optionValue;
        return `Editar filtro ${j}: ${mt}`;
      }
      return `Editar filtro ${j}`;
    }
    function bt(R) {
      return `Añadir filtro ${R.label.replace(/^\+\s*/, "")}`;
    }
    const vt = M(() => n.clearLabel);
    function Mt(R) {
      if (!u.value || !l.value) return;
      const j = R.target;
      if (!(l.value.contains(j) || (j instanceof Element ? j : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const mt of c.values())
          if (mt?.contains(j)) return;
        lt();
      }
    }
    function Vt(R) {
      R.key === "Escape" && u.value && (R.preventDefault(), at());
    }
    function Lt() {
      !u.value || !p.value || et(p.value);
    }
    return ie(() => {
      document.addEventListener("mousedown", Mt, !0), window.addEventListener("keydown", Vt, !0), window.addEventListener("resize", Lt);
    }), Oo(() => {
      document.removeEventListener("mousedown", Mt, !0), window.removeEventListener("keydown", Vt, !0), window.removeEventListener("resize", Lt);
    }), Pt(
      () => n.modelValue,
      () => {
        const R = m.value;
        R && u.value && !s.panel && K(R);
      },
      { deep: !0 }
    ), (R, j) => (b(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      r("div", Jk, [
        r("span", t2, A(e.label), 1),
        r("div", e2, [
          (b(!0), k(U, null, st(e.filterDefinitions, (G) => (b(), k("button", {
            key: `pill-${G.id}`,
            ref_for: !0,
            ref: (mt) => y(G.id, mt),
            type: "button",
            class: H(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", I(G)]),
            "aria-label": W(G),
            "aria-expanded": d.value === G.id,
            "aria-haspopup": !0,
            "aria-controls": d.value === G.id ? i : void 0,
            onClick: (mt) => q(G, mt)
          }, [
            V(F(Gk), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            r("span", a2, A(G.label), 1),
            G.type === "select" && B(G) > 0 ? (b(), k("span", s2, A(B(G)), 1)) : O("", !0)
          ], 10, n2))), 128))
        ])
      ]),
      C.value ? (b(), k("div", o2, [
        r("div", i2, [
          (b(!0), k(U, null, st($.value, (G) => (b(), k("div", {
            key: G.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            r("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": dt(G),
              onClick: (mt) => ct(G.def, mt)
            }, [
              St(R.$slots, "formatChip", {
                filter: G.def,
                value: w(G.def.id),
                optionValue: G.kind === "select" ? G.optionValue : void 0
              }, () => [
                _t(A(L(G)), 1)
              ], !0)
            ], 8, l2),
            r("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": J(G),
              onClick: (mt) => At(G)
            }, [
              V(F(Zk), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, r2)
          ]))), 128))
        ]),
        r("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": vt.value,
          onClick: z
        }, A(e.clearLabel), 9, c2)
      ])) : O("", !0),
      (b(), Y(Pa, { to: "body" }, [
        d.value && u.value ? (b(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: l,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": Z.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: gt(h.value),
          onKeydown: j[3] || (j[3] = te(() => {
          }, ["stop"]))
        }, [
          m.value ? (b(), k(U, { key: 0 }, [
            R.$slots.panel ? St(R.$slots, "panel", {
              key: 0,
              filter: m.value,
              close: lt,
              value: g.value,
              updateValue: yt
            }, void 0, !0) : (b(), k("div", u2, [
              m.value.type === "text" ? (b(), k(U, { key: 0 }, [
                r("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(m.value.label), 9, h2),
                Gt(r("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": j[0] || (j[0] = (G) => _.value = G),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: m.value.placeholder ?? "…",
                  onKeydown: Kn(te(lt, ["prevent"]), ["enter"])
                }, null, 40, f2), [
                  [De, _.value]
                ])
              ], 64)) : m.value.type === "select" ? (b(), k(U, { key: 1 }, [
                r("p", g2, A(m.value.label), 1),
                r("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": m.value.label,
                  "aria-multiselectable": !0
                }, [
                  (b(!0), k(U, null, st(m.value.options, (G) => (b(), k("li", {
                    key: G.value
                  }, [
                    r("label", m2, [
                      r("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: f.value.includes(G.value),
                        onChange: (mt) => tt(G.value)
                      }, null, 40, b2),
                      r("span", v2, A(G.label), 1)
                    ])
                  ]))), 128))
                ], 8, p2)
              ], 64)) : m.value.type === "dateRange" ? (b(), k(U, { key: 2 }, [
                r("p", y2, A(m.value.label), 1),
                r("div", _2, [
                  r("div", x2, [
                    r("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, k2),
                    Gt(r("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": j[1] || (j[1] = (G) => v.value = G),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, w2), [
                      [De, v.value]
                    ])
                  ]),
                  r("div", C2, [
                    r("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, $2),
                    Gt(r("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": j[2] || (j[2] = (G) => x.value = G),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, S2), [
                      [De, x.value]
                    ])
                  ])
                ])
              ], 64)) : O("", !0)
            ]))
          ], 64)) : O("", !0)
        ], 44, d2)) : O("", !0)
      ]))
    ], 8, Qk));
  }
}), D2 = /* @__PURE__ */ it(M2, [["__scopeId", "data-v-f38e0100"]]), se = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", fe = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", A2 = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Pe = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", _e = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", T2 = { class: "font-sans" }, B2 = ["for"], L2 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], F2 = ["id"], P2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-text-${Yt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M({
      get: () => n.modelValue,
      set: (c) => a("update:modelValue", c)
    });
    return (c, d) => (b(), k("div", T2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, B2)) : O("", !0),
      Gt(r("input", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
        type: "text",
        autocomplete: "off",
        class: H([F(fe), e.invalid ? F(Pe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, L2), [
        [De, l.value]
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, F2)) : O("", !0)
    ]));
  }
}), E2 = { class: "font-sans" }, I2 = ["for"], R2 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], O2 = ["id"], V2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-textarea-${Yt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M({
      get: () => n.modelValue,
      set: (c) => a("update:modelValue", c)
    });
    return (c, d) => (b(), k("div", E2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, I2)) : O("", !0),
      Gt(r("textarea", {
        id: o.value,
        "onUpdate:modelValue": d[0] || (d[0] = (u) => l.value = u),
        rows: e.rows,
        autocomplete: "off",
        class: H([F(A2), e.invalid ? F(Pe) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, R2), [
        [De, l.value]
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, O2)) : O("", !0)
    ]));
  }
}), z2 = { class: "font-sans" }, N2 = ["for"], j2 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], W2 = ["for"], H2 = ["title"], Y2 = ["aria-label"], K2 = ["id"], U2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-file-${Yt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = ot(null), c = M(() => n.modelValue?.name ?? n.placeholder);
    function d(h) {
      const _ = h.target.files?.[0] ?? null;
      a("update:modelValue", _);
    }
    function u() {
      a("update:modelValue", null), l.value && (l.value.value = "");
    }
    return (h, p) => (b(), k("div", z2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, N2)) : O("", !0),
      r("div", {
        class: H([
          F(fe),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? F(Pe) : "",
          e.disabled ? "pointer-events-none" : ""
        ])
      }, [
        r("input", {
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
          onChange: d
        }, null, 40, j2),
        r("label", {
          for: o.value,
          class: H(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          V(F(np), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          _t(" " + A(e.chooseLabel), 1)
        ], 10, W2),
        r("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: c.value || void 0
        }, A(c.value), 9, H2),
        e.modelValue && !e.disabled ? (b(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: u
        }, [
          V(F(Oi), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, Y2)) : O("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, K2)) : O("", !0)
    ]));
  }
}), q2 = { class: "font-sans" }, X2 = ["for"], G2 = { class: "relative" }, Z2 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], Q2 = ["id"], J2 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-datetime-${Yt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M(() => n.modelValue ?? "");
    function c(d) {
      const u = d.target.value;
      a("update:modelValue", u === "" ? null : u);
    }
    return (d, u) => (b(), k("div", q2, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, X2)) : O("", !0),
      r("div", G2, [
        V(F(Ii), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: o.value,
          value: l.value,
          type: "datetime-local",
          autocomplete: "off",
          class: H([
            F(fe),
            "pl-10",
            e.invalid ? F(Pe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: c
        }, null, 42, Z2)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, Q2)) : O("", !0)
    ]));
  }
}), tw = { class: "font-sans" }, ew = ["for"], nw = { class: "relative" }, aw = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], sw = ["id"], ow = /* @__PURE__ */ Q({
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
      const _ = Number(p[1]), f = Number(p[2]);
      return !Number.isInteger(_) || !Number.isInteger(f) || _ < 0 || _ > 23 || f < 0 || f > 59 ? null : `${String(_).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    }
    function a(h) {
      return h === "" ? null : n(h);
    }
    const s = e, o = t, i = `kiut-input-time-${Yt()}`, l = M(() => s.id ?? i), c = M(() => `${l.value}-err`), d = M(() => s.modelValue == null || s.modelValue === "" ? "" : n(s.modelValue) ?? "");
    function u(h) {
      const p = h.target.value;
      o("update:modelValue", a(p));
    }
    return (h, p) => (b(), k("div", tw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: H(F(se))
      }, A(e.label), 11, ew)) : O("", !0),
      r("div", nw, [
        V(F(ip), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("input", {
          id: l.value,
          value: d.value,
          type: "time",
          autocomplete: "off",
          class: H([
            F(fe),
            "pl-10",
            e.invalid ? F(Pe) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          onInput: u
        }, null, 42, aw)
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: c.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, sw)) : O("", !0)
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
}, bw = ["id"], vw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-range-${Yt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M(() => {
      const _ = [];
      return n.errorText && _.push(i.value), _.length ? _.join(" ") : void 0;
    }), c = M(
      () => !!(n.caption && !n.captionMin && !n.captionMax)
    ), d = M(() => !!(n.captionMin || n.captionMax)), u = M(() => {
      const { min: _, max: f, modelValue: v } = n;
      if (f === _) return 0;
      const x = (v - _) / (f - _);
      return Math.min(100, Math.max(0, x * 100));
    }), h = M(() => ({
      "--kiut-range-fill": `${u.value}%`,
      "--kiut-range-length": n.trackLength
    }));
    function p(_) {
      const f = Number(_.target.value);
      a("update:modelValue", Number.isNaN(f) ? n.min : f);
    }
    return (_, f) => (b(), k("div", iw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, lw)) : O("", !0),
      r("div", {
        class: H(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (b(), k("p", rw, A(e.captionMax), 1)) : O("", !0),
        r("div", {
          class: H(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: gt(h.value)
        }, [
          r("input", {
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
            class: H([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: p
          }, null, 42, cw)
        ], 6),
        e.orientation === "horizontal" && c.value ? (b(), k("p", dw, A(e.caption), 1)) : e.orientation === "horizontal" && d.value ? (b(), k("div", uw, [
          r("span", hw, A(e.captionMin), 1),
          r("span", fw, A(e.caption), 1),
          r("span", gw, A(e.captionMax), 1)
        ])) : O("", !0),
        e.orientation === "vertical" && e.captionMin ? (b(), k("p", pw, A(e.captionMin), 1)) : O("", !0),
        e.orientation === "vertical" && e.caption ? (b(), k("p", mw, A(e.caption), 1)) : O("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, bw)) : O("", !0)
    ]));
  }
}), yw = /* @__PURE__ */ it(vw, [["__scopeId", "data-v-a1343418"]]), _w = { class: "font-sans" }, xw = ["for"], kw = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], ww = ["id"], Cw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-input-number-${Yt()}`, o = M(() => n.id ?? s), i = M(() => `${o.value}-err`), l = M(() => {
      switch (n.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), c = M(
      () => n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)
    );
    function d(u) {
      const h = u.target.value;
      if (h === "") {
        a("update:modelValue", null);
        return;
      }
      const p = Number(h);
      a("update:modelValue", Number.isNaN(p) ? null : p);
    }
    return (u, h) => (b(), k("div", _w, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, xw)) : O("", !0),
      r("input", {
        id: o.value,
        value: c.value,
        type: "number",
        onInput: d,
        class: H([
          F(fe),
          e.invalid ? F(Pe) : "",
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
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, ww)) : O("", !0)
    ]));
  }
}), $w = { class: "font-sans" }, Sw = ["for"], Mw = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], Dw = ["disabled"], Aw = ["id"], Tw = "#3b82f6", Bw = "#aabbcc", Lw = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", Fw = /* @__PURE__ */ Q({
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
      const v = f.trim(), x = /^#?([0-9a-fA-F]{6})$/.exec(v);
      if (x) return `#${x[1].toLowerCase()}`;
      const m = /^#?([0-9a-fA-F]{3})$/.exec(v);
      if (m) {
        const [g, y, w] = m[1].split("");
        return `#${g}${g}${y}${y}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function a(f) {
      return n(f) ?? Tw;
    }
    const s = e, o = t, i = `kiut-input-color-${Yt()}`, l = M(() => s.id ?? i), c = M(() => `${l.value}-err`), d = M(() => a(s.modelValue)), u = ot(d.value), h = ot(!1);
    Pt(d, (f) => {
      h.value || (u.value = f);
    });
    function p(f) {
      const v = f.target, x = n(v.value);
      x && o("update:modelValue", x);
    }
    function _() {
      h.value = !1;
      const f = n(u.value);
      f ? (u.value = f, o("update:modelValue", f)) : u.value = d.value;
    }
    return Pt(u, (f) => {
      if (!h.value) return;
      const v = n(f);
      v && o("update:modelValue", v);
    }), (f, v) => (b(), k("div", $w, [
      e.label ? (b(), k("label", {
        key: 0,
        for: l.value,
        class: H(F(se))
      }, A(e.label), 11, Sw)) : O("", !0),
      r("div", {
        class: H([
          Lw,
          e.invalid ? F(Pe) : "",
          e.disabled ? "cursor-not-allowed opacity-50" : ""
        ])
      }, [
        r("input", {
          id: l.value,
          type: "color",
          value: d.value,
          disabled: e.disabled,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? c.value : void 0,
          class: "h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80",
          onInput: p
        }, null, 40, Mw),
        e.showHexInput ? Gt((b(), k("input", {
          key: 0,
          "onUpdate:modelValue": v[0] || (v[0] = (x) => u.value = x),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Bw,
          onFocus: v[1] || (v[1] = (x) => h.value = !0),
          onBlur: _
        }, null, 40, Dw)), [
          [De, u.value]
        ]) : O("", !0)
      ], 2),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: c.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, Aw)) : O("", !0)
    ]));
  }
});
function Xi(e, t) {
  return b(), k("svg", {
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
const Pw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], Ew = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, Iw = ["placeholder", "aria-label"], Rw = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Ow = ["aria-selected", "onClick", "onMouseenter"], Vw = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, zw = { class: "min-w-0 flex-1" }, Gi = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-select-${Yt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = ot(null), d = ot(null), u = ot(null), h = ot(null), p = ot(null), _ = ot(!1), f = ot(0), v = ot(""), x = ot({});
    function m() {
      const q = d.value;
      if (!q) return;
      const nt = q.getBoundingClientRect();
      x.value = {
        top: `${nt.bottom - 3}px`,
        left: `${nt.left}px`,
        width: `${nt.width}px`
      };
    }
    const g = M(() => n.options.filter((q) => !q.disabled)), y = M(() => {
      if (!n.searchable) return g.value;
      const q = v.value.trim().toLowerCase();
      return q ? g.value.filter((nt) => nt.label.toLowerCase().includes(q)) : g.value;
    }), w = M(
      () => n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opción"
    ), S = M(() => n.modelValue === null || n.modelValue === void 0 || n.modelValue === "" ? n.placeholder : n.options.find((nt) => nt.value === n.modelValue)?.label ?? String(n.modelValue));
    function D(q) {
      return `${String(q.value)}-${q.label}`;
    }
    function C(q) {
      return n.modelValue === q.value;
    }
    function $(q, nt) {
      const at = C(q), yt = f.value === nt;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        at ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !at && yt ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      f.value = Math.max(
        0,
        y.value.findIndex((q) => q.value === n.modelValue)
      );
    }
    function T() {
      if (n.searchable) {
        p.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function L() {
      m(), v.value = "", B(), zt(() => T());
    }
    function E() {
      _.value = !1, v.value = "";
    }
    function I(q) {
      a("update:modelValue", q.value), E();
    }
    function W() {
      if (!n.disabled) {
        if (_.value) {
          E();
          return;
        }
        _.value = !0, L();
      }
    }
    function K(q) {
      q.stopPropagation(), !n.disabled && W();
    }
    function N(q) {
      if (!_.value) return;
      const nt = q.target, at = c.value, yt = u.value;
      at && !at.contains(nt) && (!yt || !yt.contains(nt)) && E();
    }
    function tt(q) {
      n.disabled || (q.key === "ArrowDown" || q.key === "Enter" || q.key === " ") && (q.preventDefault(), _.value || (_.value = !0, L()));
    }
    function et(q) {
      const nt = y.value;
      if (q.key === "Escape") {
        q.preventDefault(), E();
        return;
      }
      if (q.key === "ArrowDown") {
        if (q.preventDefault(), nt.length === 0) return;
        f.value = 0, h.value?.focus();
        return;
      }
      if (q.key === "ArrowUp") {
        if (q.preventDefault(), nt.length === 0) return;
        f.value = nt.length - 1, h.value?.focus();
        return;
      }
      if (q.key === "Enter") {
        q.preventDefault();
        const at = nt[f.value];
        at && I(at);
      }
    }
    function ct(q) {
      const nt = y.value;
      if (q.key === "Escape") {
        q.preventDefault(), E();
        return;
      }
      if (nt.length !== 0) {
        if (q.key === "ArrowDown") {
          q.preventDefault(), f.value = Math.min(f.value + 1, nt.length - 1);
          return;
        }
        if (q.key === "ArrowUp") {
          if (q.preventDefault(), f.value === 0 && n.searchable) {
            p.value?.focus();
            return;
          }
          f.value = Math.max(f.value - 1, 0);
          return;
        }
        if (q.key === "Enter") {
          q.preventDefault();
          const at = nt[f.value];
          at && I(at);
        }
      }
    }
    return Pt(v, () => {
      f.value = 0;
    }), ie(() => {
      document.addEventListener("click", N);
    }), Le(() => {
      document.removeEventListener("click", N);
    }), (q, nt) => (b(), k("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: H(F(se))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        ref_key: "buttonRef",
        ref: d,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(fe),
          "flex items-center justify-between gap-2 text-left",
          _.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": _.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: K,
        onKeydown: tt
      }, [
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(S.value), 3),
        V(F(Ri), {
          class: H(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", _.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Pw),
      (b(), Y(Pa, { to: "body" }, [
        Gt(r("div", {
          ref_key: "panelRef",
          ref: u,
          style: gt(x.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (b(), k("div", Ew, [
            Gt(r("input", {
              ref_key: "searchInputRef",
              ref: p,
              "onUpdate:modelValue": nt[0] || (nt[0] = (at) => v.value = at),
              type: "search",
              class: H([F(fe), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: nt[1] || (nt[1] = te(() => {
              }, ["stop"])),
              onKeydown: te(et, ["stop"])
            }, null, 42, Iw), [
              [De, v.value]
            ])
          ])) : O("", !0),
          r("ul", {
            id: l,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: te(ct, ["stop"])
          }, [
            y.value.length === 0 ? (b(), k("li", Rw, A(e.noResultsText), 1)) : O("", !0),
            (b(!0), k(U, null, st(y.value, (at, yt) => (b(), k("li", {
              key: D(at),
              role: "option",
              "aria-selected": C(at),
              class: H($(at, yt)),
              onClick: te((lt) => I(at), ["stop"]),
              onMouseenter: (lt) => f.value = yt
            }, [
              e.showOptionCheck ? (b(), k("span", Vw, [
                C(at) ? (b(), Y(F(Xi), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : O("", !0)
              ])) : O("", !0),
              r("span", zw, A(at.label), 1)
            ], 42, Ow))), 128))
          ], 544)
        ], 4), [
          [vn, _.value]
        ])
      ]))
    ], 512));
  }
}), Nw = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], jw = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, Ww = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, Hw = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, Yw = { class: "truncate" }, Kw = ["aria-selected", "onClick", "onMouseenter"], Uw = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, qw = { class: "min-w-0 flex-1" }, Xw = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-multiselect-${Yt()}`, o = `${s}-label`, i = `${s}-btn`, l = `${s}-listbox`, c = ot(null), d = ot(null), u = ot(!1), h = ot(0), p = M(() => n.options.filter((T) => !T.disabled)), _ = M(() => new Set(n.modelValue ?? [])), f = M(
      () => n.options.filter((T) => _.value.has(T.value))
    ), v = M(() => {
      const T = n.ariaLabelTrigger ?? n.placeholder ?? "Seleccionar opciones", L = f.value.length;
      return L === 0 ? T : `${T}, ${L} seleccionada${L === 1 ? "" : "s"}`;
    });
    function x(T) {
      return `${String(T.value)}-${T.label}`;
    }
    function m(T) {
      return _.value.has(T.value);
    }
    function g(T, L) {
      const E = m(T), I = h.value === L;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        E ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !E && I ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function y(T) {
      const L = [...n.modelValue ?? []], E = L.indexOf(T.value);
      E >= 0 ? L.splice(E, 1) : L.push(T.value), a("update:modelValue", L);
    }
    function w() {
      const T = p.value;
      if (T.length === 0) {
        h.value = 0;
        return;
      }
      const L = _.value, E = T.findIndex((I) => L.has(I.value));
      h.value = E >= 0 ? E : 0;
    }
    function S() {
      n.disabled || (u.value = !u.value);
    }
    function D(T) {
      T.stopPropagation(), !n.disabled && (S(), u.value && (w(), zt(() => d.value?.focus())));
    }
    function C(T) {
      if (!u.value) return;
      const L = c.value;
      L && !L.contains(T.target) && (u.value = !1);
    }
    function $(T) {
      n.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), u.value || (u.value = !0, w(), zt(() => d.value?.focus())));
    }
    function B(T) {
      const L = p.value;
      if (L.length !== 0) {
        if (T.key === "Escape") {
          T.preventDefault(), u.value = !1;
          return;
        }
        if (T.key === "ArrowDown") {
          T.preventDefault(), h.value = Math.min(h.value + 1, L.length - 1);
          return;
        }
        if (T.key === "ArrowUp") {
          T.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (T.key === "Enter" || T.key === " ") {
          T.preventDefault();
          const E = L[h.value];
          E && y(E);
        }
      }
    }
    return ie(() => {
      document.addEventListener("click", C);
    }), Le(() => {
      document.removeEventListener("click", C);
    }), (T, L) => (b(), k("div", {
      ref_key: "rootRef",
      ref: c,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: H(F(se))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: H([
          F(fe),
          "flex items-start justify-between gap-2 text-left",
          u.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": u.value,
        "aria-haspopup": "listbox",
        "aria-controls": l,
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: D,
        onKeydown: $
      }, [
        r("div", jw, [
          f.value.length === 0 ? (b(), k("span", Ww, A(e.placeholder), 1)) : (b(), k("div", Hw, [
            (b(!0), k(U, null, st(f.value, (E) => (b(), k("span", {
              key: x(E),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              r("span", Yw, A(E.label), 1)
            ]))), 128))
          ]))
        ]),
        V(F(Ri), {
          class: H(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", u.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, Nw),
      Gt(r("ul", {
        id: l,
        ref_key: "listRef",
        ref: d,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: te(B, ["stop"])
      }, [
        (b(!0), k(U, null, st(p.value, (E, I) => (b(), k("li", {
          key: x(E),
          role: "option",
          "aria-selected": m(E),
          class: H(g(E, I)),
          onClick: te((W) => y(E), ["stop"]),
          onMouseenter: (W) => h.value = I
        }, [
          r("span", Uw, [
            m(E) ? (b(), Y(F(Xi), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : O("", !0)
          ]),
          r("span", qw, A(E.label), 1)
        ], 42, Kw))), 128))
      ], 544), [
        [vn, u.value]
      ])
    ], 512));
  }
}), Gw = ["id", "aria-checked", "aria-disabled", "disabled", "onKeydown"], Zw = { class: "sr-only" }, Qw = /* @__PURE__ */ Q({
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
    return (o, i) => (b(), k("button", {
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
      onClick: s,
      onKeydown: [
        Kn(te(s, ["prevent", "stop"]), ["space"]),
        Kn(te(s, ["prevent"]), ["enter"])
      ]
    }, [
      r("span", {
        class: H(["pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", e.modelValue ? "translate-x-7" : "translate-x-0"]),
        "aria-hidden": "true"
      }, null, 2),
      r("span", Zw, A(e.ariaLabel), 1)
    ], 42, Gw));
  }
}), Jw = { class: "font-sans" }, t5 = ["for"], e5 = { class: "flex gap-2" }, n5 = { class: "w-[7.5rem] shrink-0" }, a5 = { class: "min-w-0 flex-1" }, s5 = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], o5 = ["id"], i5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = `kiut-phone-${Yt()}`, o = M(() => n.id ?? `${s}-num`), i = M(() => `${o.value}-err`), l = M({
      get: () => n.modelValue.prefix,
      set: (d) => a("update:modelValue", { ...n.modelValue, prefix: d })
    }), c = M({
      get: () => n.modelValue.number,
      set: (d) => a("update:modelValue", { ...n.modelValue, number: d })
    });
    return (d, u) => (b(), k("div", Jw, [
      e.label ? (b(), k("label", {
        key: 0,
        for: o.value,
        class: H(F(se))
      }, A(e.label), 11, t5)) : O("", !0),
      r("div", e5, [
        r("div", n5, [
          V(Gi, {
            modelValue: l.value,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => l.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        r("div", a5, [
          Gt(r("input", {
            id: o.value,
            "onUpdate:modelValue": u[1] || (u[1] = (h) => c.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: H([F(fe), e.invalid ? F(Pe) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, s5), [
            [De, c.value]
          ])
        ])
      ]),
      e.errorText ? (b(), k("p", {
        key: 1,
        id: i.value,
        class: H(F(_e)),
        role: "alert"
      }, A(e.errorText), 11, o5)) : O("", !0)
    ]));
  }
}), l5 = ["role", "aria-label"], r5 = { class: "flex flex-wrap gap-2" }, c5 = ["aria-checked", "role", "onClick"], d5 = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, u5 = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, h5 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, f5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, s = M(() => n.multiple ? Array.isArray(n.modelValue) ? n.modelValue : [] : []);
    function o(c) {
      return n.multiple ? s.value.includes(c.value) : n.modelValue === c.value;
    }
    function i(c) {
      return [
        "inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        o(c) ? "border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30" : "border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]"
      ];
    }
    function l(c) {
      if (n.multiple) {
        const d = Array.isArray(n.modelValue) ? [...n.modelValue] : [], u = d.indexOf(c.value);
        u >= 0 ? d.splice(u, 1) : d.push(c.value), a("update:modelValue", d);
        return;
      }
      a("update:modelValue", c.value);
    }
    return (c, d) => (b(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      r("div", r5, [
        (b(!0), k(U, null, st(e.items, (u) => (b(), k("button", {
          key: u.value,
          type: "button",
          class: H(i(u)),
          "aria-checked": o(u),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => l(u)
        }, [
          r("span", d5, [
            o(u) ? (b(), k("span", u5)) : O("", !0)
          ]),
          u.dotColor ? (b(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: gt({ backgroundColor: u.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : O("", !0),
          r("span", h5, A(u.label), 1)
        ], 10, c5))), 128))
      ])
    ], 8, l5));
  }
}), g5 = ["aria-label"], p5 = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], m5 = { class: "truncate px-3 py-2 text-sm font-medium" }, b5 = /* @__PURE__ */ Q({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `kiut-seg-${Yt()}`, o = (v) => `${s}-seg-${v}`, i = ot([]);
    function l(v, x) {
      v instanceof HTMLButtonElement ? i.value[x] = v : i.value[x] = null;
    }
    function c(v) {
      return v.value === n.modelValue;
    }
    function d(v) {
      const x = c(v), m = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return v.disabled ? `${m} cursor-not-allowed opacity-40` : x ? `${m} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${m} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function u(v) {
      v.disabled || v.value !== n.modelValue && a("update:modelValue", v.value);
    }
    function h(v, x, m) {
      u(v), zt(() => i.value[x]?.focus());
    }
    const p = M(
      () => n.items.map((v, x) => v.disabled ? -1 : x).filter((v) => v >= 0)
    );
    function _(v, x) {
      const m = n.items.length;
      if (m === 0) return 0;
      let g = v;
      for (let y = 0; y < m; y++)
        if (g = (g + x + m) % m, !n.items[g]?.disabled) return g;
      return v;
    }
    function f(v, x) {
      if (v.key === "ArrowRight" || v.key === "ArrowDown") {
        v.preventDefault();
        const m = _(x, 1), g = n.items[m];
        g && u(g), zt(() => i.value[m]?.focus());
      } else if (v.key === "ArrowLeft" || v.key === "ArrowUp") {
        v.preventDefault();
        const m = _(x, -1), g = n.items[m];
        g && u(g), zt(() => i.value[m]?.focus());
      } else if (v.key === "Home") {
        v.preventDefault();
        const m = p.value[0];
        if (m !== void 0) {
          const g = n.items[m];
          g && u(g), zt(() => i.value[m]?.focus());
        }
      } else if (v.key === "End") {
        v.preventDefault();
        const m = p.value[p.value.length - 1];
        if (m !== void 0) {
          const g = n.items[m];
          g && u(g), zt(() => i.value[m]?.focus());
        }
      }
    }
    return (v, x) => (b(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (b(!0), k(U, null, st(e.items, (m, g) => (b(), k("button", {
        id: o(m.value),
        key: m.value,
        ref_for: !0,
        ref: (y) => l(y, g),
        type: "button",
        role: "tab",
        "aria-selected": c(m),
        "aria-disabled": m.disabled === !0,
        tabindex: c(m) ? 0 : -1,
        class: H(d(m)),
        onClick: (y) => h(m, g),
        onKeydown: (y) => f(y, g)
      }, [
        r("span", m5, A(m.label), 1)
      ], 42, p5))), 128))
    ], 8, g5));
  }
});
function Oe(e) {
  const [t, n, a] = e.split("-").map(Number);
  return new Date(t, n - 1, a);
}
function cn(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${a}`;
}
function ke(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function ka(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function Lo(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function ia(e, t) {
  const n = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return n < a ? -1 : n > a ? 1 : 0;
}
function Fo(e, t) {
  return ia(e, t) === 0;
}
function wa(e, t) {
  return ia(e, t) < 0;
}
function v5(e, t) {
  return ia(e, t) >= 0;
}
function y5(e, t) {
  return ia(e, t) <= 0;
}
function _5(e) {
  const t = e.getFullYear(), n = e.getMonth(), a = new Date(t, n, 1), s = new Date(a);
  s.setDate(a.getDate() - a.getDay());
  const o = [], i = new Date(s);
  for (let l = 0; l < 42; l++)
    o.push(new Date(i)), i.setDate(i.getDate() + 1);
  return o;
}
const x5 = [
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
], k5 = [
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
function Po(e) {
  return `${x5[e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Eo(e) {
  return `${k5[e.getMonth()]} ${e.getFullYear()}`;
}
const w5 = ["aria-expanded", "aria-labelledby", "aria-label"], C5 = ["onKeydown"], $5 = { class: "mb-4 flex items-center justify-between gap-2" }, S5 = { class: "flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, M5 = { class: "min-w-0 truncate" }, D5 = { class: "min-w-0 truncate" }, A5 = { class: "flex flex-col gap-6 sm:flex-row sm:gap-8" }, T5 = { class: "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, B5 = { class: "grid grid-cols-7 gap-y-1" }, L5 = ["disabled", "onClick"], F5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, o = `${`kiut-drp-${Yt()}`}-lbl`, i = ot(null), l = ot(null), c = ot(!1), d = ot(null), u = ot(ka(/* @__PURE__ */ new Date())), h = M(() => {
      const $ = ka(u.value);
      return [$, Lo($, 1)];
    }), p = M(() => n.ariaLabel ?? n.placeholder), _ = M(
      () => n.panelAlign === "end" ? "right-0 left-auto" : "left-0 right-auto"
    ), f = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], v = M(() => {
      if (!n.modelValue.start || !n.modelValue.end) return n.placeholder;
      const $ = Oe(n.modelValue.start), B = Oe(n.modelValue.end);
      return `${Po($)} – ${Po(B)}`;
    });
    function x($, B) {
      return $.getMonth() === B.getMonth() && $.getFullYear() === B.getFullYear();
    }
    function m($) {
      const B = ke($);
      if (n.minDate) {
        const T = ke(Oe(n.minDate));
        if (wa(B, T)) return !0;
      }
      if (n.maxDate) {
        const T = ke(Oe(n.maxDate));
        if (wa(T, B)) return !0;
      }
      return !1;
    }
    function g($, B) {
      const T = x(B, $), L = n.modelValue.start ? ke(Oe(n.modelValue.start)) : null, E = n.modelValue.end ? ke(Oe(n.modelValue.end)) : null, I = ke(B), W = T ? "text-[color:var(--kiut-text-primary)] dark:text-slate-100" : "text-slate-400 dark:text-slate-500";
      if (!L || !E)
        return `${W} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
      const K = v5(I, L) && y5(I, E), N = Fo(I, L), tt = Fo(I, E);
      return N || tt ? "bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm" : K ? `${W} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40` : `${W} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
    }
    function y($) {
      if (m($)) return;
      const B = ke($);
      if (!d.value) {
        d.value = new Date(B), a("update:modelValue", { start: cn(B), end: cn(B) });
        return;
      }
      let L = ke(d.value), E = new Date(B);
      wa(E, L) && ([L, E] = [E, L]), a("update:modelValue", { start: cn(L), end: cn(E) }), d.value = null, c.value = !1;
    }
    function w($) {
      u.value = Lo(u.value, $);
    }
    function S() {
      c.value = !1;
    }
    function D($) {
      if ($?.stopPropagation(), !c.value) {
        if (c.value = !0, d.value = null, n.modelValue.start)
          try {
            u.value = ka(Oe(n.modelValue.start));
          } catch {
          }
        zt(() => l.value?.focus());
      }
    }
    function C($) {
      if (!c.value) return;
      const B = i.value;
      B && !B.contains($.target) && (c.value = !1);
    }
    return Pt(c, ($) => {
      $ && (d.value = null);
    }), ie(() => {
      document.addEventListener("click", C);
    }), Le(() => {
      document.removeEventListener("click", C);
    }), ($, B) => (b(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (b(), k("label", {
        key: 0,
        id: o,
        class: H(F(se))
      }, A(e.label), 3)) : O("", !0),
      r("button", {
        type: "button",
        class: H([F(fe), "flex w-full items-center gap-2 text-left"]),
        "aria-expanded": c.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? o : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onFocus: D,
        onClick: D
      }, [
        V(F(Ii), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        r("span", {
          class: H([
            "min-w-0 flex-1 truncate",
            !e.modelValue.start || !e.modelValue.end ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A(v.value), 3)
      ], 42, w5),
      Gt(r("div", {
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
        onKeydown: Kn(te(S, ["stop"]), ["escape"])
      }, [
        r("div", $5, [
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes anterior",
            onClick: B[0] || (B[0] = (T) => w(-1))
          }, [
            V(F(sp), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ]),
          r("div", S5, [
            r("span", M5, A(F(Eo)(h.value[0])), 1),
            r("span", D5, A(F(Eo)(h.value[1])), 1)
          ]),
          r("button", {
            type: "button",
            class: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]",
            "aria-label": "Mes siguiente",
            onClick: B[1] || (B[1] = (T) => w(1))
          }, [
            V(F(op), {
              class: "h-5 w-5",
              "aria-hidden": "true"
            })
          ])
        ]),
        r("div", A5, [
          (b(!0), k(U, null, st(h.value, (T) => (b(), k("div", {
            key: `${T.getFullYear()}-${T.getMonth()}`,
            class: "min-w-0 flex-1"
          }, [
            r("div", T5, [
              (b(), k(U, null, st(f, (L) => r("span", { key: L }, A(L), 1)), 64))
            ]),
            r("div", B5, [
              (b(!0), k(U, null, st(F(_5)(T), (L) => (b(), k("button", {
                key: F(cn)(L),
                type: "button",
                disabled: m(L),
                class: H(["relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", g(T, L)]),
                onClick: (E) => y(L)
              }, A(L.getDate()), 11, L5))), 128))
            ])
          ]))), 128))
        ])
      ], 42, C5), [
        [vn, c.value]
      ])
    ], 512));
  }
}), P5 = {
  key: 0,
  class: "group relative inline-flex shrink-0"
}, E5 = ["type", "disabled", "aria-label"], I5 = {
  key: 1,
  class: "min-w-0 truncate"
}, R5 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, O5 = ["type", "disabled", "aria-label"], V5 = {
  key: 1,
  class: "min-w-0 truncate"
}, Yn = /* @__PURE__ */ Q({
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
    const t = e, n = Vo(), a = M(() => !!t.tooltip?.trim()), s = M(() => t.variant === "action"), o = M(() => !s.value), i = M(() => {
      const u = n["aria-label"];
      if (typeof u == "string" && u.length > 0) return u;
      if (s.value && t.tooltip?.trim()) return t.tooltip.trim();
    }), l = M(() => {
      const u = n.type;
      return u === "submit" || u === "reset" || u === "button" ? u : "button";
    }), c = M(() => {
      const { class: u, type: h, "aria-label": p, ..._ } = n;
      return _;
    }), d = M(() => t.variant === "primary" ? [
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
    return (u, h) => a.value ? (b(), k("span", P5, [
      r("button", Un({
        type: l.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, F(n).class]],
        disabled: e.disabled,
        "aria-label": i.value
      }, c.value), [
        u.$slots.icon ? (b(), k("span", {
          key: 0,
          class: H(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          St(u.$slots, "icon")
        ], 2)) : O("", !0),
        o.value ? (b(), k("span", I5, [
          St(u.$slots, "default")
        ])) : O("", !0)
      ], 16, E5),
      r("span", R5, A(e.tooltip), 1)
    ])) : (b(), k("button", Un({
      key: 1,
      type: l.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [d.value, F(n).class]],
      disabled: e.disabled,
      "aria-label": i.value
    }, c.value), [
      u.$slots.icon ? (b(), k("span", {
        key: 0,
        class: H(["inline-flex shrink-0", s.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        St(u.$slots, "icon")
      ], 2)) : O("", !0),
      o.value ? (b(), k("span", V5, [
        St(u.$slots, "default")
      ])) : O("", !0)
    ], 16, O5));
  }
}), z5 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, N5 = { class: "min-w-0 flex-1 space-y-1" }, j5 = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, W5 = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, H5 = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, Y5 = /* @__PURE__ */ Q({
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
    const n = e, a = t, o = `${`kiut-modal-${Yt()}`}-title`, i = ot(null);
    function l() {
      a("cancel"), a("update:modelValue", !1);
    }
    function c() {
      a("confirm");
    }
    function d(u) {
      n.modelValue && u.key === "Escape" && (u.preventDefault(), l());
    }
    return Pt(
      () => n.modelValue,
      (u) => {
        u && requestAnimationFrame(() => {
          i.value?.focus({ preventScroll: !0 });
        });
      }
    ), ie(() => {
      document.addEventListener("keydown", d);
    }), Le(() => {
      document.removeEventListener("keydown", d);
    }), (u, h) => (b(), Y(Pa, { to: "body" }, [
      V(fn, { name: "kiut-modal" }, {
        default: P(() => [
          e.modelValue ? (b(), k("div", z5, [
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
              "aria-labelledby": o,
              tabindex: "-1",
              class: "kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40",
              onClick: h[0] || (h[0] = te(() => {
              }, ["stop"]))
            }, [
              r("header", {
                class: H(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                r("div", N5, [
                  r("h2", {
                    id: o,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (b(), k("p", j5, A(e.subtitle), 1)) : O("", !0)
                ]),
                V(Yn, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  onClick: l
                }, {
                  icon: P(() => [
                    V(F(Oi), { class: "h-5 w-5" })
                  ]),
                  _: 1
                })
              ], 2),
              r("div", W5, [
                St(u.$slots, "default", {}, void 0, !0)
              ]),
              r("footer", H5, [
                V(Yn, {
                  variant: "secondary",
                  type: "button",
                  onClick: l
                }, {
                  default: P(() => [
                    _t(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }),
                V(Yn, {
                  variant: "primary",
                  type: "button",
                  onClick: c
                }, {
                  default: P(() => [
                    _t(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                })
              ])
            ], 512)
          ])) : O("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), K5 = /* @__PURE__ */ it(Y5, [["__scopeId", "data-v-4ed7bb14"]]), U5 = { class: "text-left font-['Inter',system-ui,sans-serif]" }, q5 = {
  key: 0,
  class: ""
}, X5 = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, G5 = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, Z5 = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, Q5 = /* @__PURE__ */ Q({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = Fa(), n = M(() => {
      const a = !!t.filters, s = !!t.actions;
      return a && s ? "justify-between" : s ? "justify-end" : "";
    });
    return (a, s) => (b(), k("section", U5, [
      a.$slots.description || a.$slots.filters || a.$slots.actions ? (b(), k("header", q5, [
        a.$slots.description ? (b(), k("div", X5, [
          St(a.$slots, "description")
        ])) : O("", !0),
        a.$slots.filters || a.$slots.actions ? (b(), k("div", {
          key: 1,
          class: H(["flex flex-wrap gap-2 items-center", n.value])
        }, [
          a.$slots.filters ? (b(), k("div", G5, [
            St(a.$slots, "filters")
          ])) : O("", !0),
          a.$slots.actions ? (b(), k("div", Z5, [
            St(a.$slots, "actions")
          ])) : O("", !0)
        ], 2)) : O("", !0)
      ])) : O("", !0),
      a.$slots.content || a.$slots.default ? (b(), k("div", {
        key: 1,
        class: H({
          "mt-6": a.$slots.description || a.$slots.filters || a.$slots.actions
        })
      }, [
        St(a.$slots, "content", {}, () => [
          St(a.$slots, "default")
        ])
      ], 2)) : O("", !0)
    ]));
  }
}), J5 = { class: "flex flex-1 min-h-0" }, tC = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, eC = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, nC = ["aria-current", "data-has-active", "title", "onClick"], aC = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, sC = { class: "px-4 py-4 shrink-0" }, oC = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, iC = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, lC = ["data-nav-id", "aria-current", "onClick"], rC = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, cC = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, dC = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, uC = ["data-nav-id", "aria-current", "onClick"], hC = { class: "truncate text-[15px]" }, fC = ["aria-current", "data-has-active", "onClick"], gC = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, pC = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, mC = /* @__PURE__ */ Q({
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
    const n = ot(!1), a = e, s = t, o = Vo(), { class: i, ...l } = o, c = ot(!1);
    function d() {
      typeof window > "u" || (c.value = window.innerWidth < a.mobileBreakpoint);
    }
    ie(() => {
      d(), window.addEventListener("resize", d);
    }), Le(() => {
      window.removeEventListener("resize", d);
    });
    const u = M(() => {
      const m = a.sections.find((g) => g.id === a.selectedSectionId);
      return m?.items?.length ? m : null;
    });
    function h(m) {
      return a.activePath ? a.activePath === m.path || a.activePath.startsWith(m.path + "/") : !1;
    }
    function p(m) {
      return m.items?.length ? m.items.some(h) : !a.activePath || !m.path ? !1 : a.activePath === m.path || a.activePath.startsWith(m.path + "/");
    }
    function _(m) {
      if (!m.items?.length) {
        s("update:selectedSectionId", null), s("navigate", {
          section: m,
          item: { id: m.id, label: m.label, path: m.path }
        });
        return;
      }
      const g = a.selectedSectionId === m.id ? null : m.id;
      s("update:selectedSectionId", g);
    }
    function f(m, g) {
      s("navigate", { section: m, item: g });
    }
    function v() {
      s("update:selectedSectionId", null);
    }
    function x(m, g) {
      f(m, g), v();
    }
    return (m, g) => c.value ? (b(), k("div", Un({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      V(fn, { name: "ksn-overlay" }, {
        default: P(() => [
          u.value ? (b(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: v
          })) : O("", !0)
        ]),
        _: 1
      }),
      V(fn, { name: "ksn-sheet" }, {
        default: P(() => [
          u.value ? (b(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: gt({ paddingBottom: a.mobileBarHeight })
          }, [
            g[3] || (g[3] = r("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              r("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            r("div", rC, [
              r("p", cC, A(u.value.label), 1),
              r("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: v
              }, [...g[2] || (g[2] = [
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
            r("nav", dC, [
              (b(!0), k(U, null, st(u.value.items, (y) => (b(), k("button", {
                key: y.id,
                type: "button",
                "data-nav-id": y.id,
                "aria-current": h(y) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => x(u.value, y)
              }, [
                y.icon ? (b(), Y(Xe(y.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : O("", !0),
                r("span", hC, A(y.label), 1)
              ], 8, uC))), 128))
            ])
          ], 4)) : O("", !0)
        ]),
        _: 1
      }),
      r("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: gt({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (b(!0), k(U, null, st(e.sections, (y) => (b(), k("button", {
          key: y.id,
          type: "button",
          "aria-current": e.selectedSectionId === y.id ? "true" : void 0,
          "data-has-active": p(y) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => _(y)
        }, [
          e.selectedSectionId === y.id || p(y) ? (b(), k("span", gC)) : O("", !0),
          y.icon ? (b(), Y(Xe(y.icon), {
            key: 1,
            class: "shrink-0",
            style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : O("", !0),
          r("span", pC, A(y.label), 1)
        ], 8, fC))), 128))
      ], 4)
    ], 16)) : (b(), k("aside", Un({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, l), [
      r("div", J5, [
        r("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: gt({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: g[0] || (g[0] = (y) => n.value = !0),
          onMouseleave: g[1] || (g[1] = (y) => n.value = !1)
        }, [
          m.$slots.logo ? (b(), k("div", tC, [
            St(m.$slots, "logo", { expanded: n.value }, void 0, !0)
          ])) : O("", !0),
          r("nav", eC, [
            (b(!0), k(U, null, st(e.sections, (y) => (b(), k("button", {
              key: y.id,
              type: "button",
              "aria-current": e.selectedSectionId === y.id ? "true" : void 0,
              "data-has-active": p(y) ? "true" : void 0,
              title: y.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => _(y)
            }, [
              y.icon ? (b(), Y(Xe(y.icon), {
                key: 0,
                class: "shrink-0",
                style: gt({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : O("", !0),
              r("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: gt({ fontSize: e.primaryFontSize })
              }, A(y.label), 5)
            ], 8, nC))), 128))
          ]),
          m.$slots.footer ? (b(), k("div", aC, [
            St(m.$slots, "footer", { expanded: n.value }, void 0, !0)
          ])) : O("", !0)
        ], 36),
        V(fn, { name: "ksn-sub" }, {
          default: P(() => [
            u.value ? (b(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: gt({ width: e.secondaryWidth })
            }, [
              r("div", sC, [
                r("p", oC, A(u.value.label), 1)
              ]),
              r("nav", iC, [
                (b(!0), k(U, null, st(u.value.items, (y) => (b(), k("button", {
                  key: y.id,
                  type: "button",
                  "data-nav-id": y.id,
                  "aria-current": h(y) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => f(u.value, y)
                }, [
                  y.icon ? (b(), Y(Xe(y.icon), {
                    key: 0,
                    style: gt({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : O("", !0),
                  r("span", {
                    class: "truncate",
                    style: gt({ fontSize: e.secondaryFontSize })
                  }, A(y.label), 5)
                ], 8, lC))), 128))
              ])
            ], 4)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), bC = /* @__PURE__ */ it(mC, [["__scopeId", "data-v-e0ccb96c"]]), DC = {
  install(e) {
    e.component("KiutChartBar", he), e.component("KiutChartLine", le), e.component("KiutPieChart", oa), e.component("KiutBoxplotChart", qh), e.component("KiutCandlestickChart", If), e.component("KiutHistogramChart", Pi), e.component("KiutSankeyChart", Fe), e.component("KiutAgentsPerDay", Sp), e.component("KiutBookingManager", nm), e.component("KiutCheckin", Vi), e.component("KiutCheckinContainer", f0), e.component("KiutCheckinMetrics", Pm), e.component("KiutCheckinSegments", Ni), e.component("KiutDisruption", L0), e.component("KiutFAQ", z0), e.component("KiutMessagesPerAgent", Q0), e.component("KiutRecordLocator", zi), e.component("KiutSalesByChannel", ji), e.component("KiutSeller", Wi), e.component("KiutSellerContainer", zb), e.component("KiutTopAgents", qb), e.component("KiutPaymentMethod", mv), e.component("KiutAgentHumanConversations", py), e.component("KiutChannelMetrics", $y), e.component("KiutTriageCombinations", zy), e.component("KiutSelectLanguage", Uy), e.component("KiutGuardrails", s1), e.component("KiutDisruptionNotifier", $1), e.component("KiutTotalConversationsCard", B1), e.component("KiutCsatP95Card", R1), e.component("KiutCsatPulseCard", W1), e.component("KiutCSATContainer", b_), e.component("KiutAiGeneratedRevenueCard", $_), e.component("KiutHumanEscalations", V_), e.component("KiutHumanEscalationsCard", Y_), e.component("KiutNpsDailyMetrics", Ki), e.component("KiutNpsMetrics", Ui), e.component("KiutNpsOverviewMetrics", Yi), e.component("KiutAWSCost", ex), e.component("KiutCostUsage", hx), e.component("KiutTokenUsage", wx), e.component("KiutConversationCount", Px), e.component("KiutTopAgentsAnalysis", Ux), e.component("KiutTopAgentsPie", ak), e.component("KiutDailyCostTrends", fk), e.component("KiutModelUsage", Dk), e.component("KiutMessageRoles", Ok), e.component("KiutCostPerConversations", Xk), e.component("Tabs", qi), e.component("Table", Hi), e.component("Filters", D2), e.component("InputText", P2), e.component("InputTextarea", V2), e.component("InputFile", U2), e.component("InputDateTime", J2), e.component("InputTime", ow), e.component("InputRange", yw), e.component("InputNumber", Cw), e.component("InputColorPicker", Fw), e.component("Select", Gi), e.component("MultiSelect", Xw), e.component("Toggle", Qw), e.component("InputPhone", i5), e.component("SelectablePills", f5), e.component("SegmentedControl", b5), e.component("DateRangePicker", F5), e.component("Tag", Nt), e.component("Button", Yn), e.component("Modal", K5), e.component("Section", Q5), e.component("KiutAppShellNavigation", bC);
  }
};
export {
  ex as AWSCost,
  py as AgentHumanConversations,
  Sp as AgentsPerDay,
  $_ as AiGeneratedRevenueCard,
  bC as AppShellNavigation,
  nm as BookingManager,
  qh as BoxplotChart,
  Yn as Button,
  b_ as CSATContainer,
  If as CandlestickChart,
  $y as ChannelMetrics,
  he as ChartBar,
  le as ChartLine,
  Vi as Checkin,
  f0 as CheckinContainer,
  Pm as CheckinMetrics,
  Ni as CheckinSegments,
  Px as ConversationCount,
  Xk as CostPerConversations,
  hx as CostUsage,
  R1 as CsatP95Card,
  W1 as CsatPulseCard,
  fk as DailyCostTrends,
  F5 as DateRangePicker,
  L0 as Disruption,
  $1 as DisruptionNotifier,
  z0 as FAQ,
  D2 as Filters,
  s1 as Guardrails,
  Pi as HistogramChart,
  V_ as HumanEscalations,
  Y_ as HumanEscalationsCard,
  Fw as InputColorPicker,
  J2 as InputDateTime,
  U2 as InputFile,
  Cw as InputNumber,
  i5 as InputPhone,
  yw as InputRange,
  P2 as InputText,
  V2 as InputTextarea,
  ow as InputTime,
  DC as KiutUIPlugin,
  Ok as MessageRoles,
  Q0 as MessagesPerAgent,
  K5 as Modal,
  Dk as ModelUsage,
  Xw as MultiSelect,
  Ki as NpsDailyMetrics,
  Ui as NpsMetrics,
  Yi as NpsOverviewMetrics,
  mv as PaymentMethod,
  oa as PieChart,
  zi as RecordLocator,
  ji as SalesByChannel,
  Fe as SankeyChart,
  Q5 as Section,
  b5 as SegmentedControl,
  Gi as Select,
  Uy as SelectLanguage,
  f5 as SelectablePills,
  Wi as Seller,
  zb as SellerContainer,
  Hi as Table,
  qi as Tabs,
  Nt as Tag,
  Qw as Toggle,
  wx as TokenUsage,
  qb as TopAgents,
  Ux as TopAgentsAnalysis,
  ak as TopAgentsPie,
  B1 as TotalConversationsCard,
  zy as TriageCombinations
};
//# sourceMappingURL=kiut-ui.es.js.map
