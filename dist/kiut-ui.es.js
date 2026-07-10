import { defineComponent as ce, shallowRef as ii, h as Ve, ref as oe, onMounted as Ze, onUnmounted as ct, watch as Ee, toRaw as Kn, nextTick as je, version as Lr, isProxy as ri, computed as C, toRef as Me, openBlock as m, createElementBlock as k, normalizeStyle as Ce, createVNode as N, unref as P, createElementVNode as u, Fragment as re, renderList as ge, normalizeClass as Z, toDisplayString as A, createCommentVNode as F, onBeforeUnmount as li, createStaticVNode as Yn, useSlots as ao, renderSlot as _e, Transition as ut, withCtx as R, Comment as Pr, createBlock as ee, resolveDynamicComponent as $t, createTextVNode as Ae, Teleport as la, withDirectives as Ge, withModifiers as Fe, vModelText as Wt, vShow as Ut, createSlots as Ao, vModelSelect as ci, mergeProps as ft, useAttrs as Xa, withKeys as Oa, inject as di } from "vue";
import * as To from "echarts/core";
import { TooltipComponent as Ir, TitleComponent as Er } from "echarts/components";
import { SankeyChart as Rr } from "echarts/charts";
import { CanvasRenderer as Fr } from "echarts/renderers";
import We from "moment";
function Ga(e) {
  return e + 0.5 | 0;
}
const Ot = (e, t, a) => Math.max(Math.min(e, a), t);
function Ba(e) {
  return Ot(Ga(e * 2.55), 0, 255);
}
function Kt(e) {
  return Ot(Ga(e * 255), 0, 255);
}
function Pt(e) {
  return Ot(Ga(e / 2.55) / 100, 0, 1);
}
function Bo(e) {
  return Ot(Ga(e * 100), 0, 100);
}
const ht = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Un = [..."0123456789ABCDEF"], Or = (e) => Un[e & 15], Vr = (e) => Un[(e & 240) >> 4] + Un[e & 15], Qa = (e) => (e & 240) >> 4 === (e & 15), zr = (e) => Qa(e.r) && Qa(e.g) && Qa(e.b) && Qa(e.a);
function Nr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & ht[e[1]] * 17,
    g: 255 & ht[e[2]] * 17,
    b: 255 & ht[e[3]] * 17,
    a: t === 5 ? ht[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: ht[e[1]] << 4 | ht[e[2]],
    g: ht[e[3]] << 4 | ht[e[4]],
    b: ht[e[5]] << 4 | ht[e[6]],
    a: t === 9 ? ht[e[7]] << 4 | ht[e[8]] : 255
  })), a;
}
const jr = (e, t) => e < 255 ? t(e) : "";
function Hr(e) {
  var t = zr(e) ? Or : Vr;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + jr(e.a, t) : void 0;
}
const Wr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ui(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function Kr(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function Yr(e, t, a) {
  const n = ui(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function Ur(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function no(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), r = (s + i) / 2;
  let l, c, d;
  return s !== i && (d = s - i, c = r > 0.5 ? d / (2 - s - i) : d / (s + i), l = Ur(a, n, o, d, s), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function oo(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Kt);
}
function so(e, t, a) {
  return oo(ui, e, t, a);
}
function qr(e, t, a) {
  return oo(Yr, e, t, a);
}
function Xr(e, t, a) {
  return oo(Kr, e, t, a);
}
function hi(e) {
  return (e % 360 + 360) % 360;
}
function Gr(e) {
  const t = Wr.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Ba(+t[5]) : Kt(+t[5]));
  const o = hi(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = qr(o, s, i) : t[1] === "hsv" ? n = Xr(o, s, i) : n = so(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function Zr(e, t) {
  var a = no(e);
  a[0] = hi(a[0] + t), a = so(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function Qr(e) {
  if (!e)
    return;
  const t = no(e), a = t[0], n = Bo(t[1]), o = Bo(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Pt(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const Lo = {
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
}, Po = {
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
function Jr() {
  const e = {}, t = Object.keys(Po), a = Object.keys(Lo);
  let n, o, s, i, r;
  for (n = 0; n < t.length; n++) {
    for (i = r = t[n], o = 0; o < a.length; o++)
      s = a[o], r = r.replace(s, Lo[s]);
    s = parseInt(Po[i], 16), e[r] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Ja;
function el(e) {
  Ja || (Ja = Jr(), Ja.transparent = [0, 0, 0, 0]);
  const t = Ja[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const tl = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function al(e) {
  const t = tl.exec(e);
  let a = 255, n, o, s;
  if (t) {
    if (t[7] !== n) {
      const i = +t[7];
      a = t[8] ? Ba(i) : Ot(i * 255, 0, 255);
    }
    return n = +t[1], o = +t[3], s = +t[5], n = 255 & (t[2] ? Ba(n) : Ot(n, 0, 255)), o = 255 & (t[4] ? Ba(o) : Ot(o, 0, 255)), s = 255 & (t[6] ? Ba(s) : Ot(s, 0, 255)), {
      r: n,
      g: o,
      b: s,
      a
    };
  }
}
function nl(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Pt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Tn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ga = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function ol(e, t, a) {
  const n = ga(Pt(e.r)), o = ga(Pt(e.g)), s = ga(Pt(e.b));
  return {
    r: Kt(Tn(n + a * (ga(Pt(t.r)) - n))),
    g: Kt(Tn(o + a * (ga(Pt(t.g)) - o))),
    b: Kt(Tn(s + a * (ga(Pt(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function en(e, t, a) {
  if (e) {
    let n = no(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = so(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function fi(e, t) {
  return e && Object.assign(t || {}, e);
}
function Io(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Kt(e[3]))) : (t = fi(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Kt(t.a)), t;
}
function sl(e) {
  return e.charAt(0) === "r" ? al(e) : Gr(e);
}
class Va {
  constructor(t) {
    if (t instanceof Va)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Io(t) : a === "string" && (n = Nr(t) || el(t) || sl(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = fi(this._rgb);
    return t && (t.a = Pt(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Io(t);
  }
  rgbString() {
    return this._valid ? nl(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Hr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Qr(this._rgb) : void 0;
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
    return t && (this._rgb = ol(this._rgb, t._rgb, a)), this;
  }
  clone() {
    return new Va(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = Kt(t), this;
  }
  clearer(t) {
    const a = this._rgb;
    return a.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, a = Ga(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return en(this._rgb, 2, t), this;
  }
  darken(t) {
    return en(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return en(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return en(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Zr(this._rgb, t), this;
  }
}
function Tt() {
}
const il = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function Le(e) {
  return e == null;
}
function qe(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function Te(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function mt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function _t(e, t) {
  return mt(e) ? e : t;
}
function Se(e, t) {
  return typeof e > "u" ? t : e;
}
const rl = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, gi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Re(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Pe(e, t, a, n) {
  let o, s, i;
  if (qe(e))
    for (s = e.length, o = 0; o < s; o++)
      t.call(a, e[o], o);
  else if (Te(e))
    for (i = Object.keys(e), s = i.length, o = 0; o < s; o++)
      t.call(a, e[i[o]], i[o]);
}
function pn(e, t) {
  let a, n, o, s;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (a = 0, n = e.length; a < n; ++a)
    if (o = e[a], s = t[a], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function bn(e) {
  if (qe(e))
    return e.map(bn);
  if (Te(e)) {
    const t = /* @__PURE__ */ Object.create(null), a = Object.keys(e), n = a.length;
    let o = 0;
    for (; o < n; ++o)
      t[a[o]] = bn(e[a[o]]);
    return t;
  }
  return e;
}
function mi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function ll(e, t, a, n) {
  if (!mi(e))
    return;
  const o = t[e], s = a[e];
  Te(o) && Te(s) ? za(o, s, n) : t[e] = bn(s);
}
function za(e, t, a) {
  const n = qe(t) ? t : [
    t
  ], o = n.length;
  if (!Te(e))
    return e;
  a = a || {};
  const s = a.merger || ll;
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
function Ia(e, t) {
  return za(e, t, {
    merger: cl
  });
}
function cl(e, t, a) {
  if (!mi(e))
    return;
  const n = t[e], o = a[e];
  Te(n) && Te(o) ? Ia(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = bn(o));
}
const Eo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function dl(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function ul(e) {
  const t = dl(e);
  return (a) => {
    for (const n of t) {
      if (n === "")
        break;
      a = a && a[n];
    }
    return a;
  };
}
function ca(e, t) {
  return (Eo[t] || (Eo[t] = ul(t)))(e);
}
function io(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Na = (e) => typeof e < "u", qt = (e) => typeof e == "function", Ro = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function hl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Ie = Math.PI, He = 2 * Ie, fl = He + Ie, vn = Number.POSITIVE_INFINITY, gl = Ie / 180, Xe = Ie / 2, ea = Ie / 4, Fo = Ie * 2 / 3, pi = Math.log10, Mt = Math.sign;
function Ea(e, t, a) {
  return Math.abs(e - t) < a;
}
function Oo(e) {
  const t = Math.round(e);
  e = Ea(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(pi(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function ml(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function pl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function ja(e) {
  return !pl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function bl(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function vl(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function It(e) {
  return e * (Ie / 180);
}
function yl(e) {
  return e * (180 / Ie);
}
function Vo(e) {
  if (!mt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function bi(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Ie && (s += He), {
    angle: s,
    distance: o
  };
}
function qn(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function xl(e, t) {
  return (e - t + fl) % He - Ie;
}
function yt(e) {
  return (e % He + He) % He;
}
function Ha(e, t, a, n) {
  const o = yt(e), s = yt(t), i = yt(a), r = yt(s - o), l = yt(i - o), c = yt(o - s), d = yt(o - i);
  return o === s || o === i || n && s === i || r > l && c < d;
}
function et(e, t, a) {
  return Math.max(t, Math.min(a, e));
}
function kl(e) {
  return et(e, -32768, 32767);
}
function Vt(e, t, a, n = 1e-6) {
  return e >= Math.min(t, a) - n && e <= Math.max(t, a) + n;
}
function ro(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ia = (e, t, a, n) => ro(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), _l = (e, t, a) => ro(e, a, (n) => e[n][t] >= a);
function wl(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const vi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Cl(e, t) {
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
  }), vi.forEach((a) => {
    const n = "_onData" + io(a), o = e[a];
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
function zo(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (vi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function yi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const xi = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ki(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, xi.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function $l(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const lo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Qe = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Sl = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Ml(e, t, a) {
  const n = t.length;
  let o = 0, s = n;
  if (e._sorted) {
    const { iScale: i, vScale: r, _parsed: l } = e, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, d = i.axis, { min: h, max: f, minDefined: p, maxDefined: g } = i.getUserBounds();
    if (p) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        ia(l, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? n : ia(t, d, i.getPixelForValue(h)).lo
      ), c) {
        const v = l.slice(0, o + 1).reverse().findIndex((y) => !Le(y[r.axis]));
        o -= Math.max(0, v);
      }
      o = et(o, 0, n - 1);
    }
    if (g) {
      let v = Math.max(
        // @ts-expect-error Need to type _parsed
        ia(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ia(t, d, i.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const y = l.slice(v - 1).findIndex((b) => !Le(b[r.axis]));
        v += Math.max(0, y);
      }
      s = et(v, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function Dl(e) {
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
const tn = (e) => e === 0 || e === 1, No = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * He / a)), jo = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * He / a) + 1, Ra = {
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
  easeInOutSine: (e) => -0.5 * (Math.cos(Ie * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => tn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => tn(e) ? e : No(e, 0.075, 0.3),
  easeOutElastic: (e) => tn(e) ? e : jo(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return tn(e) ? e : e < 0.5 ? 0.5 * No(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * jo(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ra.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ra.easeInBounce(e * 2) * 0.5 : Ra.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function co(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Ho(e) {
  return co(e) ? e : new Va(e);
}
function Bn(e) {
  return co(e) ? e : new Va(e).saturate(0.5).darken(0.1).hexString();
}
const Al = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Tl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Bl(e) {
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
      properties: Tl
    },
    numbers: {
      type: "number",
      properties: Al
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
function Ll(e) {
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
const Wo = /* @__PURE__ */ new Map();
function Pl(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = Wo.get(a);
  return n || (n = new Intl.NumberFormat(e, t), Wo.set(a, n)), n;
}
function uo(e, t, a) {
  return Pl(t, a).format(e);
}
const Il = {
  values(e) {
    return qe(e) ? e : "" + e;
  },
  numeric(e, t, a) {
    if (e === 0)
      return "0";
    const n = this.chart.options.locale;
    let o, s = e;
    if (a.length > 1) {
      const c = Math.max(Math.abs(a[0].value), Math.abs(a[a.length - 1].value));
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = El(e, a);
    }
    const i = pi(Math.abs(s)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: o,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), uo(e, n, l);
  }
};
function El(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var _i = {
  formatters: Il
};
function Rl(e) {
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
      callback: _i.formatters.values,
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
const da = /* @__PURE__ */ Object.create(null), Xn = /* @__PURE__ */ Object.create(null);
function Fa(e, t) {
  if (!t)
    return e;
  const a = t.split(".");
  for (let n = 0, o = a.length; n < o; ++n) {
    const s = a[n];
    e = e[s] || (e[s] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ln(e, t, a) {
  return typeof t == "string" ? za(Fa(e, t), a) : za(Fa(e, ""), t);
}
class Fl {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => Bn(o.backgroundColor), this.hoverBorderColor = (n, o) => Bn(o.borderColor), this.hoverColor = (n, o) => Bn(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return Ln(this, t, a);
  }
  get(t) {
    return Fa(this, t);
  }
  describe(t, a) {
    return Ln(Xn, t, a);
  }
  override(t, a) {
    return Ln(da, t, a);
  }
  route(t, a, n, o) {
    const s = Fa(this, t), i = Fa(this, n), r = "_" + a;
    Object.defineProperties(s, {
      [r]: {
        value: s[a],
        writable: !0
      },
      [a]: {
        enumerable: !0,
        get() {
          const l = this[r], c = i[o];
          return Te(l) ? Object.assign({}, c, l) : Se(l, c);
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
var Ke = /* @__PURE__ */ new Fl({
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
  Bl,
  Ll,
  Rl
]);
function Ol(e) {
  return !e || Le(e.size) || Le(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Ko(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ta(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function Yo(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Gn(e, t, a, n) {
  wi(e, t, a, n, null);
}
function wi(e, t, a, n, o) {
  let s, i, r, l, c, d, h, f;
  const p = t.pointStyle, g = t.rotation, v = t.radius;
  let y = (g || 0) * gl;
  if (p && typeof p == "object" && (s = p.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(y), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(v) || v <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, v, 0, 0, He) : e.arc(a, n, v, 0, He), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : v, e.moveTo(a + Math.sin(y) * d, n - Math.cos(y) * v), y += Fo, e.lineTo(a + Math.sin(y) * d, n - Math.cos(y) * v), y += Fo, e.lineTo(a + Math.sin(y) * d, n - Math.cos(y) * v), e.closePath();
        break;
      case "rectRounded":
        c = v * 0.516, l = v - c, i = Math.cos(y + ea) * l, h = Math.cos(y + ea) * (o ? o / 2 - c : l), r = Math.sin(y + ea) * l, f = Math.sin(y + ea) * (o ? o / 2 - c : l), e.arc(a - h, n - r, c, y - Ie, y - Xe), e.arc(a + f, n - i, c, y - Xe, y), e.arc(a + h, n + r, c, y, y + Xe), e.arc(a - f, n + i, c, y + Xe, y + Ie), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * v, d = o ? o / 2 : l, e.rect(a - d, n - l, 2 * d, 2 * l);
          break;
        }
        y += ea;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(a - h, n - r), e.lineTo(a + f, n - i), e.lineTo(a + h, n + r), e.lineTo(a - f, n + i), e.closePath();
        break;
      case "crossRot":
        y += ea;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + f, n - i), e.lineTo(a - f, n + i);
        break;
      case "star":
        h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + f, n - i), e.lineTo(a - f, n + i), y += ea, h = Math.cos(y) * (o ? o / 2 : v), i = Math.cos(y) * v, r = Math.sin(y) * v, f = Math.sin(y) * (o ? o / 2 : v), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + f, n - i), e.lineTo(a - f, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(y) * v, r = Math.sin(y) * v, e.moveTo(a - i, n - r), e.lineTo(a + i, n + r);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(y) * (o ? o / 2 : v), n + Math.sin(y) * v);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function Wa(e, t, a) {
  return a = a || 0.5, !t || e && e.x > t.left - a && e.x < t.right + a && e.y > t.top - a && e.y < t.bottom + a;
}
function ho(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function fo(e) {
  e.restore();
}
function Vl(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function zl(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function Nl(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Le(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function jl(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, r = t + s.actualBoundingBoxRight, l = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, d = o.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(r, d), e.stroke();
  }
}
function Hl(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Ka(e, t, a, n, o, s = {}) {
  const i = qe(t) ? t : [
    t
  ], r = s.strokeWidth > 0 && s.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = o.string, Nl(e, s), l = 0; l < i.length; ++l)
    c = i[l], s.backdrop && Hl(e, s.backdrop), r && (s.strokeColor && (e.strokeStyle = s.strokeColor), Le(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), jl(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function yn(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Ie, Ie, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Ie, Xe, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Xe, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Xe, !0), e.lineTo(a + i.topLeft, n);
}
const Wl = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Kl = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Yl(e, t) {
  const a = ("" + e).match(Wl);
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
const Ul = (e) => +e || 0;
function go(e, t) {
  const a = {}, n = Te(t), o = n ? Object.keys(t) : t, s = Te(e) ? n ? (i) => Se(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = Ul(s(i));
  return a;
}
function Ci(e) {
  return go(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ba(e) {
  return go(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function pt(e) {
  const t = Ci(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function tt(e, t) {
  e = e || {}, t = t || Ke.font;
  let a = Se(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = Se(e.style, t.style);
  n && !("" + n).match(Kl) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: Se(e.family, t.family),
    lineHeight: Yl(Se(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: Se(e.weight, t.weight),
    string: ""
  };
  return o.string = Ol(o), o;
}
function an(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function ql(e, t, a) {
  const { min: n, max: o } = e, s = gi(t, (o - n) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ua(e, t) {
  return Object.assign(Object.create(e), t);
}
function mo(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Di("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (r) => mo([
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
      return Si(r, l, () => ac(l, t, e, r));
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
      return qo(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return qo(r);
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
function ya(e, t, a, n) {
  const o = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: a,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: $i(e, n),
    setContext: (s) => ya(e, s, a, n),
    override: (s) => ya(e.override(s), t, a, n)
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
      return Si(s, i, () => Gl(s, i, r));
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
function $i(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: a = t.scriptable, _indexable: n = t.indexable, _allKeys: o = t.allKeys } = e;
  return {
    allKeys: o,
    scriptable: a,
    indexable: n,
    isScriptable: qt(a) ? a : () => a,
    isIndexable: qt(n) ? n : () => n
  };
}
const Xl = (e, t) => e ? e + io(t) : t, po = (e, t) => Te(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Si(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function Gl(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let r = n[t];
  return qt(r) && i.isScriptable(t) && (r = Zl(t, r, e, a)), qe(r) && r.length && (r = Ql(t, r, e, i.isIndexable)), po(t, r) && (r = ya(r, o, s && s[t], i)), r;
}
function Zl(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(s, i || n);
  return r.delete(e), po(e, l) && (l = bo(o._scopes, o, e, l)), l;
}
function Ql(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: r } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Te(t[0])) {
    const l = t, c = o._scopes.filter((d) => d !== l);
    t = [];
    for (const d of l) {
      const h = bo(c, o, e, d);
      t.push(ya(h, s, i && i[e], r));
    }
  }
  return t;
}
function Mi(e, t, a) {
  return qt(e) ? e(t, a) : e;
}
const Jl = (e, t) => e === !0 ? t : typeof e == "string" ? ca(t, e) : void 0;
function ec(e, t, a, n, o) {
  for (const s of t) {
    const i = Jl(a, s);
    if (i) {
      e.add(i);
      const r = Mi(i._fallback, a, o);
      if (typeof r < "u" && r !== a && r !== n)
        return r;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function bo(e, t, a, n) {
  const o = t._rootScopes, s = Mi(t._fallback, a, n), i = [
    ...e,
    ...o
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = Uo(r, i, a, s || a, n);
  return l === null || typeof s < "u" && s !== a && (l = Uo(r, i, s, l, n), l === null) ? !1 : mo(Array.from(r), [
    ""
  ], o, s, () => tc(t, a, n));
}
function Uo(e, t, a, n, o) {
  for (; a; )
    a = ec(e, t, a, n, o);
  return a;
}
function tc(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return qe(o) && Te(a) ? a : o || {};
}
function ac(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Di(Xl(s, e), a), typeof o < "u")
      return po(e, o) ? bo(a, n, e, o) : o;
}
function Di(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function qo(e) {
  let t = e._keys;
  return t || (t = e._keys = nc(e._scopes)), t;
}
function nc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const oc = Number.EPSILON || 1e-14, xa = (e, t) => t < e.length && !e[t].skip && e[t], Ai = (e) => e === "x" ? "y" : "x";
function sc(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, r = qn(s, o), l = qn(i, s);
  let c = r / (r + l), d = l / (r + l);
  c = isNaN(c) ? 0 : c, d = isNaN(d) ? 0 : d;
  const h = n * c, f = n * d;
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
function ic(e, t, a) {
  const n = e.length;
  let o, s, i, r, l, c = xa(e, 0);
  for (let d = 0; d < n - 1; ++d)
    if (l = c, c = xa(e, d + 1), !(!l || !c)) {
      if (Ea(t[d], 0, oc)) {
        a[d] = a[d + 1] = 0;
        continue;
      }
      o = a[d] / t[d], s = a[d + 1] / t[d], r = Math.pow(o, 2) + Math.pow(s, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[d] = o * i * t[d], a[d + 1] = s * i * t[d]);
    }
}
function rc(e, t, a = "x") {
  const n = Ai(a), o = e.length;
  let s, i, r, l = xa(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = r, r = l, l = xa(e, c + 1), !r)
      continue;
    const d = r[a], h = r[n];
    i && (s = (d - i[a]) / 3, r[`cp1${a}`] = d - s, r[`cp1${n}`] = h - s * t[c]), l && (s = (l[a] - d) / 3, r[`cp2${a}`] = d + s, r[`cp2${n}`] = h + s * t[c]);
  }
}
function lc(e, t = "x") {
  const a = Ai(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, r, l, c = xa(e, 0);
  for (i = 0; i < n; ++i)
    if (r = l, l = c, c = xa(e, i + 1), !!l) {
      if (c) {
        const d = c[t] - l[t];
        o[i] = d !== 0 ? (c[a] - l[a]) / d : 0;
      }
      s[i] = r ? c ? Mt(o[i - 1]) !== Mt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  ic(e, o, s), rc(e, s, t);
}
function nn(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function cc(e, t) {
  let a, n, o, s, i, r = Wa(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = r, r = a < n - 1 && Wa(e[a + 1], t), s && (o = e[a], i && (o.cp1x = nn(o.cp1x, t.left, t.right), o.cp1y = nn(o.cp1y, t.top, t.bottom)), r && (o.cp2x = nn(o.cp2x, t.left, t.right), o.cp2y = nn(o.cp2y, t.top, t.bottom)));
}
function dc(e, t, a, n, o) {
  let s, i, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    lc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      r = e[s], l = sc(c, r, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && cc(e, a);
}
function vo() {
  return typeof window < "u" && typeof document < "u";
}
function yo(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function xn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Cn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function uc(e, t) {
  return Cn(e).getPropertyValue(t);
}
const hc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ra(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = hc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const fc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function gc(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, r, l;
  if (fc(o, s, e.target))
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
function oa(e, t) {
  if ("native" in e)
    return e;
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Cn(a), s = o.boxSizing === "border-box", i = ra(o, "padding"), r = ra(o, "border", "width"), { x: l, y: c, box: d } = gc(e, a), h = i.left + (d && r.left), f = i.top + (d && r.top);
  let { width: p, height: g } = t;
  return s && (p -= i.width + r.width, g -= i.height + r.height), {
    x: Math.round((l - h) / p * a.width / n),
    y: Math.round((c - f) / g * a.height / n)
  };
}
function mc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && yo(e);
    if (!s)
      t = e.clientWidth, a = e.clientHeight;
    else {
      const i = s.getBoundingClientRect(), r = Cn(s), l = ra(r, "border", "width"), c = ra(r, "padding");
      t = i.width - c.width - l.width, a = i.height - c.height - l.height, n = xn(r.maxWidth, s, "clientWidth"), o = xn(r.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: t,
    height: a,
    maxWidth: n || vn,
    maxHeight: o || vn
  };
}
const zt = (e) => Math.round(e * 10) / 10;
function pc(e, t, a, n) {
  const o = Cn(e), s = ra(o, "margin"), i = xn(o.maxWidth, e, "clientWidth") || vn, r = xn(o.maxHeight, e, "clientHeight") || vn, l = mc(e, t, a);
  let { width: c, height: d } = l;
  if (o.boxSizing === "content-box") {
    const f = ra(o, "border", "width"), p = ra(o, "padding");
    c -= p.width + f.width, d -= p.height + f.height;
  }
  return c = Math.max(0, c - s.width), d = Math.max(0, n ? c / n : d - s.height), c = zt(Math.min(c, i, l.maxWidth)), d = zt(Math.min(d, r, l.maxHeight)), c && !d && (d = zt(c / 2)), (t !== void 0 || a !== void 0) && n && l.height && d > l.height && (d = l.height, c = zt(Math.floor(d * n))), {
    width: c,
    height: d
  };
}
function Xo(e, t, a) {
  const n = t || 1, o = zt(e.height * n), s = zt(e.width * n);
  e.height = zt(e.height), e.width = zt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const bc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    vo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Go(e, t) {
  const a = uc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function sa(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function vc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function yc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = sa(e, o, a), r = sa(o, s, a), l = sa(s, t, a), c = sa(i, r, a), d = sa(r, l, a);
  return sa(c, d, a);
}
const xc = function(e, t) {
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
}, kc = function() {
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
function va(e, t, a) {
  return e ? xc(t, a) : kc();
}
function Ti(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Bi(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Li(e) {
  return e === "angle" ? {
    between: Ha,
    compare: xl,
    normalize: yt
  } : {
    between: Vt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function Zo({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function _c(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: r } = Li(n), l = t.length;
  let { start: c, end: d, loop: h } = e, f, p;
  if (h) {
    for (c += l, d += l, f = 0, p = l; f < p && i(r(t[c % l][n]), o, s); ++f)
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
function wc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: r, between: l, normalize: c } = Li(n), { start: d, end: h, loop: f, style: p } = _c(e, t, a), g = [];
  let v = !1, y = null, b, x, _;
  const w = () => l(o, _, b) && r(o, _) !== 0, $ = () => r(s, b) === 0 || l(s, _, b), D = () => v || w(), S = () => !v || $();
  for (let I = d, V = d; I <= h; ++I)
    x = t[I % i], !x.skip && (b = c(x[n]), b !== _ && (v = l(b, o, s), y === null && D() && (y = r(b, o) === 0 ? I : V), y !== null && S() && (g.push(Zo({
      start: y,
      end: I,
      loop: f,
      count: i,
      style: p
    })), y = null), V = I, _ = b));
  return y !== null && g.push(Zo({
    start: y,
    end: h,
    loop: f,
    count: i,
    style: p
  })), g;
}
function Cc(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = wc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function $c(e, t, a, n) {
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
function Sc(e, t, a, n) {
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
function Mc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: r } = $c(a, o, s, n);
  if (n === !0)
    return Qo(e, [
      {
        start: i,
        end: r,
        loop: s
      }
    ], a, t);
  const l = r < i ? r + o : r, c = !!e._fullLoop && i === 0 && r === o - 1;
  return Qo(e, Sc(a, i, l, c), a, t);
}
function Qo(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Dc(e, t, a, n);
}
function Dc(e, t, a, n) {
  const o = e._chart.getContext(), s = Jo(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, c = [];
  let d = s, h = t[0].start, f = h;
  function p(g, v, y, b) {
    const x = r ? -1 : 1;
    if (g !== v) {
      for (g += l; a[g % l].skip; )
        g -= x;
      for (; a[v % l].skip; )
        v += x;
      g % l !== v % l && (c.push({
        start: g % l,
        end: v % l,
        loop: y,
        style: b
      }), d = b, h = v % l);
    }
  }
  for (const g of t) {
    h = r ? h : g.start;
    let v = a[h % l], y;
    for (f = h + 1; f <= g.end; f++) {
      const b = a[f % l];
      y = Jo(n.setContext(ua(o, {
        type: "segment",
        p0: v,
        p1: b,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), Ac(y, d) && p(h, f - 1, g.loop, d), v = b, d = y;
    }
    h < f - 1 && p(h, f - 1, g.loop, d);
  }
  return c;
}
function Jo(e) {
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
function Ac(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return co(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function on(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Tc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: on(a, t, "left"),
    right: on(a, t, "right"),
    top: on(n, t, "top"),
    bottom: on(n, t, "bottom")
  } : t;
}
function Bc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Tc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Lc {
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
    this._request || (this._running = !0, this._request = xi.call(window, () => {
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
var Bt = /* @__PURE__ */ new Lc();
const es = "transparent", Pc = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = Ho(e || es), o = n.valid && Ho(t || es);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Ic {
  constructor(t, a, n, o) {
    const s = a[n];
    o = an([
      t.to,
      o,
      s,
      t.from
    ]);
    const i = an([
      t.from,
      s,
      o
    ]);
    this._active = !0, this._fn = t.fn || Pc[t.type || typeof i], this._easing = Ra[t.easing] || Ra.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, a, n) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = n - this._start, i = this._duration - s;
      this._start = n, this._duration = Math.floor(Math.max(i, t.duration)), this._total += s, this._loop = !!t.loop, this._to = an([
        t.to,
        a,
        o,
        t.from
      ]), this._from = an([
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
class Pi {
  constructor(t, a) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(a);
  }
  configure(t) {
    if (!Te(t))
      return;
    const a = Object.keys(Ke.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((o) => {
      const s = t[o];
      if (!Te(s))
        return;
      const i = {};
      for (const r of a)
        i[r] = s[r];
      (qe(s.properties) && s.properties || [
        o
      ]).forEach((r) => {
        (r === o || !n.has(r)) && n.set(r, i);
      });
    });
  }
  _animateOptions(t, a) {
    const n = a.options, o = Rc(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Ec(t.options.$animations, n).then(() => {
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
      const f = n.get(c);
      if (h)
        if (f && h.active()) {
          h.update(f, d, r);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[c] = d;
        continue;
      }
      s[c] = h = new Ic(f, t, c, d), o.push(h);
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
      return Bt.add(this._chart, n), !0;
  }
}
function Ec(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function Rc(e, t) {
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
function ts(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function Fc(e, t, a) {
  if (a === !1)
    return !1;
  const n = ts(e, a), o = ts(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function Oc(e) {
  let t, a, n, o;
  return Te(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Ii(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function as(e, t, a, n = {}) {
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
    c = e.values[l], mt(c) && (s || t === 0 || Mt(t) === Mt(c)) && (t += c);
  }
  return !d && !n.all ? 0 : t;
}
function Vc(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, c, d;
  for (l = 0, c = i.length; l < c; ++l)
    d = i[l], r[l] = {
      [o]: d,
      [s]: e[d]
    };
  return r;
}
function Pn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function zc(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function Nc(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function jc(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function ns(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function os(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: r } = n, l = s.axis, c = i.axis, d = zc(s, i, n), h = t.length;
  let f;
  for (let p = 0; p < h; ++p) {
    const g = t[p], { [l]: v, [c]: y } = g, b = g._stacks || (g._stacks = {});
    f = b[c] = jc(o, d, v), f[r] = y, f._top = ns(f, i, !0, n.type), f._bottom = ns(f, i, !1, n.type);
    const x = f._visualValues || (f._visualValues = {});
    x[r] = y;
  }
}
function In(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function Hc(e, t) {
  return ua(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Wc(e, t, a) {
  return ua(e, {
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
function wa(e, t) {
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
const En = (e) => e === "reset" || e === "none", ss = (e, t) => t ? e : Object.assign({}, e), Kc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Ii(a, !0),
  values: null
};
class $n {
  static defaults = {};
  static datasetElementType = null;
  static dataElementType = null;
  constructor(t, a) {
    this.chart = t, this._ctx = t.ctx, this.index = a, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Pn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && wa(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (h, f, p, g) => h === "x" ? f : h === "r" ? g : p, s = a.xAxisID = Se(n.xAxisID, In(t, "x")), i = a.yAxisID = Se(n.yAxisID, In(t, "y")), r = a.rAxisID = Se(n.rAxisID, In(t, "r")), l = a.indexAxis, c = a.iAxisID = o(l, s, i, r), d = a.vAxisID = o(l, i, s, r);
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
    this._data && zo(this._data, this), t._stacked && wa(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Te(a)) {
      const o = this._cachedMeta;
      this._data = Vc(a, o);
    } else if (n !== a) {
      if (n) {
        zo(n, this);
        const o = this._cachedMeta;
        wa(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && Cl(a, this), this._syncList = [], this._data = a;
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
    a._stacked = Pn(a.vScale, a), a.stack !== n.stack && (o = !0, wa(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (os(this, a._parsed), a._stacked = Pn(a.vScale, a));
  }
  configure() {
    const t = this.chart.config, a = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), a, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, a) {
    const { _cachedMeta: n, _data: o } = this, { iScale: s, _stacked: i } = n, r = s.axis;
    let l = t === 0 && a === o.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], d, h, f;
    if (this._parsing === !1)
      n._parsed = o, n._sorted = !0, f = o;
    else {
      qe(o[t]) ? f = this.parseArrayData(n, o, t, a) : Te(o[t]) ? f = this.parseObjectData(n, o, t, a) : f = this.parsePrimitiveData(n, o, t, a);
      const p = () => h[r] === null || c && h[r] < c[r];
      for (d = 0; d < a; ++d)
        n._parsed[d + t] = h = f[d], l && (p() && (l = !1), c = h);
      n._sorted = l;
    }
    i && os(this, f);
  }
  parsePrimitiveData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, r = s.axis, l = i.axis, c = s.getLabels(), d = s === i, h = new Array(o);
    let f, p, g;
    for (f = 0, p = o; f < p; ++f)
      g = f + n, h[f] = {
        [r]: d || s.parse(c[g], g),
        [l]: i.parse(a[g], g)
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
    let d, h, f, p;
    for (d = 0, h = o; d < h; ++d)
      f = d + n, p = a[f], c[d] = {
        x: s.parse(ca(p, r), f),
        y: i.parse(ca(p, l), f)
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
      keys: Ii(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return as(r, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const r = o && n._stacks[a.axis];
    o && r && (o.values = r, i = as(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, r = this._getOtherScale(t), l = Kc(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = Nc(r);
    let f, p;
    function g() {
      p = o[f];
      const v = p[r.axis];
      return !mt(p[t.axis]) || d > v || h < v;
    }
    for (f = 0; f < i && !(!g() && (this.updateRangeFromParsed(c, t, p, l), s)); ++f)
      ;
    if (s) {
      for (f = i - 1; f >= 0; --f)
        if (!g()) {
          this.updateRangeFromParsed(c, t, p, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const a = this._cachedMeta._parsed, n = [];
    let o, s, i;
    for (o = 0, s = a.length; o < s; ++o)
      i = a[o][t.axis], mt(i) && n.push(i);
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
    this.update(t || "default"), a._clip = Oc(Se(this.options.clip, Fc(a.xScale, a.yScale, this.getMaxOverflow())));
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
      s = i.$context || (i.$context = Wc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = Hc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!a, s.mode = n, s;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, a) {
    return this._resolveElementOptions(this.dataElementType.id, a, t);
  }
  _resolveElementOptions(t, a = "default", n) {
    const o = a === "active", s = this._cachedDataOpts, i = t + "-" + a, r = s[i], l = this.enableOptionSharing && Na(n);
    if (r)
      return ss(r, l);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), p = Object.keys(Ke.elements[t]), g = () => this.getContext(n, o, a), v = c.resolveNamedOptions(f, p, g, h);
    return v.$shared && (v.$shared = l, s[i] = Object.freeze(ss(v, l))), v;
  }
  _resolveAnimations(t, a, n) {
    const o = this.chart, s = this._cachedDataOpts, i = `animation-${a}`, r = s[i];
    if (r)
      return r;
    let l;
    if (o.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, a), f = d.getOptionScopes(this.getDataset(), h);
      l = d.createResolver(f, this.getContext(t, n, a));
    }
    const c = new Pi(o, l && l.animations);
    return l && l._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || En(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    En(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !En(a) && this._resolveAnimations(void 0, a).update(t, n);
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
      n._stacked && wa(n, o);
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
function Yc(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = yi(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function Uc(e) {
  const t = e.iScale, a = Yc(t, e.type);
  let n = t._length, o, s, i, r;
  const l = () => {
    i === 32767 || i === -32768 || (Na(r) && (n = Math.min(n, Math.abs(i - r) || n)), r = i);
  };
  for (o = 0, s = a.length; o < s; ++o)
    i = t.getPixelForValue(a[o]), l();
  for (r = void 0, o = 0, s = t.ticks.length; o < s; ++o)
    i = t.getPixelForTick(o), l();
  return n;
}
function qc(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Le(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function Xc(e, t, a, n) {
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
function Gc(e, t, a, n) {
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
function Ei(e, t, a, n) {
  return qe(e) ? Gc(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function is(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), r = o === s, l = [];
  let c, d, h, f;
  for (c = a, d = a + n; c < d; ++c)
    f = t[c], h = {}, h[o.axis] = r || o.parse(i[c], c), l.push(Ei(f, h, s, c));
  return l;
}
function Rn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Zc(e, t, a) {
  return e !== 0 ? Mt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function Qc(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function Jc(e, t, a, n) {
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
  const { start: i, end: r, reverse: l, top: c, bottom: d } = Qc(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = d : (s[rs(d, i, r, l)] = !0, o = c)), s[rs(o, i, r, l)] = !0, e.borderSkipped = s;
}
function rs(e, t, a, n) {
  return n ? (e = ed(e, t, a), e = ls(e, a, t)) : e = ls(e, t, a), e;
}
function ed(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function ls(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function td(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class ad extends $n {
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
    return is(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return is(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = s.axis === "x" ? r : l, d = i.axis === "x" ? r : l, h = [];
    let f, p, g, v;
    for (f = n, p = n + o; f < p; ++f)
      v = a[f], g = {}, g[s.axis] = s.parse(ca(v, c), f), h.push(Ei(ca(v, d), g, i, f));
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
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, r = Rn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
    const s = o === "reset", { index: i, _cachedMeta: { vScale: r } } = this, l = r.getBasePixel(), c = r.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(a, o);
    for (let p = a; p < a + n; p++) {
      const g = this.getParsed(p), v = s || Le(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), y = this._calculateBarIndexPixels(p, d), b = (g._stacks || {})[r.axis], x = {
        horizontal: c,
        base: v.base,
        enableBorderRadius: !b || Rn(g._custom) || i === b._top || i === b._bottom,
        x: c ? v.head : y.center,
        y: c ? y.center : v.head,
        height: c ? y.size : Math.abs(v.size),
        width: c ? Math.abs(v.size) : y.size
      };
      f && (x.options = h || this.resolveDataElementOptions(p, t[p].active ? "active" : o));
      const _ = x.options || t[p].options;
      Jc(x, _, b, i), td(x, _, d.ratio), this.updateElement(t[p], p, x, o);
    }
  }
  _getStacks(t, a) {
    const { iScale: n } = this._cachedMeta, o = n.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), s = n.options.stacked, i = [], r = this._cachedMeta.controller.getParsed(a), l = r && r[n.axis], c = (d) => {
      const h = d._parsed.find((p) => p[n.axis] === l), f = h && h[d.vScale.axis];
      if (Le(f) || isNaN(f))
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
      t[Se(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, a)] = !0;
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
      min: r || Uc(a),
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
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, r = s || 0, l = this.getParsed(t), c = l._custom, d = Rn(c);
    let h = l[a.axis], f = 0, p = n ? this.applyStack(a, l, n) : h, g, v;
    p !== h && (f = p - h, p = h), d && (h = c.barStart, p = c.barEnd - c.barStart, h !== 0 && Mt(h) !== Mt(c.barEnd) && (f = 0), f += h);
    const y = !Le(s) && !d ? s : f;
    let b = a.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? g = a.getPixelForValue(f + p) : g = b, v = g - b, Math.abs(v) < i) {
      v = Zc(v, a, r) * i, h === r && (b -= v / 2);
      const x = a.getPixelForDecimal(0), _ = a.getPixelForDecimal(1), w = Math.min(x, _), $ = Math.max(x, _);
      b = Math.max(Math.min(b, $), w), g = b + v, n && !d && (l._stacks[a.axis]._visualValues[o] = a.getValueForPixel(g) - a.getValueForPixel(b));
    }
    if (b === a.getPixelForValue(r)) {
      const x = Mt(v) * a.getLineWidthForValue(r) / 2;
      b += x, v -= x;
    }
    return {
      size: v,
      base: b,
      head: g,
      center: g + v / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = Se(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (a.grouped) {
      const d = s ? this._getStackCount(t) : a.stackCount, h = o.barThickness === "flex" ? Xc(t, a, o, d * c) : qc(t, a, o, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(Se(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + p;
      r = h.start + h.chunk * g + h.chunk / 2, l = Math.min(i, h.chunk * h.ratio);
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
function nd(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < He) {
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), h = Math.cos(l), f = Math.sin(l), p = (_, w, $) => Ha(_, r, l, !0) ? 1 : Math.max(w, w * a, $, $ * a), g = (_, w, $) => Ha(_, r, l, !0) ? -1 : Math.min(w, w * a, $, $ * a), v = p(0, c, h), y = p(Xe, d, f), b = g(Ie, c, h), x = g(Ie + Xe, d, f);
    n = (v - b) / 2, o = (y - x) / 2, s = -(v + b) / 2, i = -(y + x) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class od extends $n {
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
        s = (c) => +ca(n[c], l);
      }
      let i, r;
      for (i = t, r = t + a; i < r; ++i)
        o._parsed[i] = s(i);
    }
  }
  _getRotation() {
    return It(this.options.rotation - 90);
  }
  _getCircumference() {
    return It(this.options.circumference);
  }
  _getRotationExtents() {
    let t = He, a = -He;
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(rl(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: p, offsetX: g, offsetY: v } = nd(h, d, l), y = (n.width - i) / f, b = (n.height - i) / p, x = Math.max(Math.min(y, b) / 2, 0), _ = gi(this.options.radius, x), w = Math.max(_ * l, 0), $ = (_ - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * _, this.offsetY = v * _, o.total = this.calculateTotal(), this.outerRadius = _ - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / He);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, d = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = s && c.animateScale, p = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: v, includeOptions: y } = this._getSharedOptions(a, o);
    let b = this._getRotation(), x;
    for (x = 0; x < a; ++x)
      b += this._circumference(x, s);
    for (x = a; x < a + n; ++x) {
      const _ = this._circumference(x, s), w = t[x], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: b,
        endAngle: b + _,
        circumference: _,
        outerRadius: g,
        innerRadius: p
      };
      y && ($.options = v || this.resolveDataElementOptions(x, w.active ? "active" : o)), b += _, this.updateElement(w, x, $, o);
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
    return a > 0 && !isNaN(t) ? He * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = uo(a._parsed[t], n.options.locale);
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
    return Math.max(Se(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
class sd extends $n {
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
    let { start: r, count: l } = Ml(a, o, i);
    this._drawStart = r, this._drawCount = l, Dl(a) && (r = 0, l = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, r, l, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(a, o), f = i.axis, p = r.axis, { spanGaps: g, segment: v } = this.options, y = ja(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || s || o === "none", x = a + n, _ = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < _; ++$) {
      const D = t[$], S = b ? D : {};
      if ($ < a || $ >= x) {
        S.skip = !0;
        continue;
      }
      const I = this.getParsed($), V = Le(I[p]), O = S[f] = i.getPixelForValue(I[f], $), M = S[p] = s || V ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, I, l) : I[p], $);
      S.skip = isNaN(O) || isNaN(M) || V, S.stop = $ > 0 && Math.abs(I[f] - w[f]) > y, v && (S.parsed = I, S.raw = c.data[$]), h && (S.options = d || this.resolveDataElementOptions($, D.active ? "active" : o)), b || this.updateElement(D, $, S, o), w = I;
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
class id extends od {
  static id = "pie";
  static defaults = {
    cutout: 0,
    rotation: 0,
    circumference: 360,
    radius: "100%"
  };
}
function aa() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class xo {
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
    Object.assign(xo.prototype, t);
  }
  options;
  constructor(t) {
    this.options = t || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return aa();
  }
  parse() {
    return aa();
  }
  format() {
    return aa();
  }
  add() {
    return aa();
  }
  diff() {
    return aa();
  }
  startOf() {
    return aa();
  }
  endOf() {
    return aa();
  }
}
var rd = {
  _date: xo
};
function ld(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, r = o._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && s.length) {
    const c = r._reversePixels ? _l : ia;
    if (n) {
      if (o._sharedOptions) {
        const d = s[0], h = typeof d.getRange == "function" && d.getRange(t);
        if (h) {
          const f = c(s, t, a - h), p = c(s, t, a + h);
          return {
            lo: f.lo,
            hi: p.hi
          };
        }
      }
    } else {
      const d = c(s, t, a);
      if (l) {
        const { vScale: h } = o._cachedMeta, { _parsed: f } = e, p = f.slice(0, d.lo + 1).reverse().findIndex((v) => !Le(v[h.axis]));
        d.lo -= Math.max(0, p);
        const g = f.slice(d.hi).findIndex((v) => !Le(v[h.axis]));
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
function Sn(e, t, a, n, o) {
  const s = e.getSortedVisibleDatasetMetas(), i = a[t];
  for (let r = 0, l = s.length; r < l; ++r) {
    const { index: c, data: d } = s[r], { lo: h, hi: f } = ld(s[r], t, i, o);
    for (let p = h; p <= f; ++p) {
      const g = d[p];
      g.skip || n(g, c, p);
    }
  }
}
function cd(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function Fn(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Sn(e, a, t, function(r, l, c) {
    !o && !Wa(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && s.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), s;
}
function dd(e, t, a, n) {
  let o = [];
  function s(i, r, l) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: h } = bi(i, {
      x: t.x,
      y: t.y
    });
    Ha(h, c, d) && o.push({
      element: i,
      datasetIndex: r,
      index: l
    });
  }
  return Sn(e, a, t, s), o;
}
function ud(e, t, a, n, o, s) {
  let i = [];
  const r = cd(a);
  let l = Number.POSITIVE_INFINITY;
  function c(d, h, f) {
    const p = d.inRange(t.x, t.y, o);
    if (n && !p)
      return;
    const g = d.getCenterPoint(o);
    if (!(!!s || e.isPointInArea(g)) && !p)
      return;
    const y = r(t, g);
    y < l ? (i = [
      {
        element: d,
        datasetIndex: h,
        index: f
      }
    ], l = y) : y === l && i.push({
      element: d,
      datasetIndex: h,
      index: f
    });
  }
  return Sn(e, a, t, c), i;
}
function On(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? dd(e, t, a, o) : ud(e, t, a, n, o, s);
}
function cs(e, t, a, n, o) {
  const s = [], i = a === "x" ? "inXRange" : "inYRange";
  let r = !1;
  return Sn(e, a, t, (l, c, d) => {
    l[i] && l[i](t[a], o) && (s.push({
      element: l,
      datasetIndex: c,
      index: d
    }), r = r || l.inRange(t.x, t.y, o));
  }), n && !r ? [] : s;
}
var hd = {
  modes: {
    index(e, t, a, n) {
      const o = oa(t, e), s = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? Fn(e, o, s, n, i) : On(e, o, s, !1, n, i), l = [];
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
      const o = oa(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      let r = a.intersect ? Fn(e, o, s, n, i) : On(e, o, s, !1, n, i);
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
      const o = oa(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Fn(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = oa(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return On(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = oa(t, e);
      return cs(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = oa(t, e);
      return cs(e, o, "y", a.intersect, n);
    }
  }
};
const Ri = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ca(e, t) {
  return e.filter((a) => a.pos === t);
}
function ds(e, t) {
  return e.filter((a) => Ri.indexOf(a.pos) === -1 && a.box.axis === t);
}
function $a(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function fd(e) {
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
function gd(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !Ri.includes(o))
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
function md(e, t) {
  const a = gd(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, r;
  for (s = 0, i = e.length; s < i; ++s) {
    r = e[s];
    const { fullSize: l } = r.box, c = a[r.stack], d = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = d ? d * n : l && t.availableWidth, r.height = o) : (r.width = n, r.height = d ? d * o : l && t.availableHeight);
  }
  return a;
}
function pd(e) {
  const t = fd(e), a = $a(t.filter((c) => c.box.fullSize), !0), n = $a(Ca(t, "left"), !0), o = $a(Ca(t, "right")), s = $a(Ca(t, "top"), !0), i = $a(Ca(t, "bottom")), r = ds(t, "x"), l = ds(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(l).concat(i).concat(r),
    chartArea: Ca(t, "chartArea"),
    vertical: n.concat(o).concat(l),
    horizontal: s.concat(i).concat(r)
  };
}
function us(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function Fi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function bd(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Te(o)) {
    a.size && (e[o] -= a.size);
    const h = n[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? s.height : s.width), a.size = h.size / h.count, e[o] += a.size;
  }
  s.getPadding && Fi(i, s.getPadding());
  const r = Math.max(0, t.outerWidth - us(i, e, "left", "right")), l = Math.max(0, t.outerHeight - us(i, e, "top", "bottom")), c = r !== e.w, d = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function vd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function yd(e, t) {
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
function La(e, t, a, n) {
  const o = [];
  let s, i, r, l, c, d;
  for (s = 0, i = e.length, c = 0; s < i; ++s) {
    r = e[s], l = r.box, l.update(r.width || t.w, r.height || t.h, yd(r.horizontal, t));
    const { same: h, other: f } = bd(t, a, r, n);
    c |= h && o.length, d = d || f, l.fullSize || o.push(r);
  }
  return c && La(o, t, a, n) || d;
}
function sn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function hs(e, t, a, n) {
  const o = a.padding;
  let { x: s, y: i } = t;
  for (const r of e) {
    const l = r.box, c = n[r.stack] || {
      placed: 0,
      weight: 1
    }, d = r.stackWeight / c.weight || 1;
    if (r.horizontal) {
      const h = t.w * d, f = c.size || l.height;
      Na(c.start) && (i = c.start), l.fullSize ? sn(l, o.left, i, a.outerWidth - o.right - o.left, f) : sn(l, t.left + c.placed, i, h, f), c.start = i, c.placed += h, i = l.bottom;
    } else {
      const h = t.h * d, f = c.size || l.width;
      Na(c.start) && (s = c.start), l.fullSize ? sn(l, s, o.top, f, a.outerHeight - o.bottom - o.top) : sn(l, s, t.top + c.placed, f, h), c.start = s, c.placed += h, s = l.right;
    }
  }
  t.x = s, t.y = i;
}
var gt = {
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
    const o = pt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), r = pd(e.boxes), l = r.vertical, c = r.horizontal;
    Pe(e.boxes, (v) => {
      typeof v.beforeLayout == "function" && v.beforeLayout();
    });
    const d = l.reduce((v, y) => y.box.options && y.box.options.display === !1 ? v : v + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, o);
    Fi(f, pt(n));
    const p = Object.assign({
      maxPadding: f,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), g = md(l.concat(c), h);
    La(r.fullSize, p, h, g), La(l, p, h, g), La(c, p, h, g) && La(l, p, h, g), vd(p), hs(r.leftAndTop, p, h, g), p.x += p.w, p.y += p.h, hs(r.rightAndBottom, p, h, g), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, Pe(r.chartArea, (v) => {
      const y = v.box;
      Object.assign(y, e.chartArea), y.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Oi {
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
class xd extends Oi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const gn = "$chartjs", kd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, fs = (e) => e === null || e === "";
function _d(e, t) {
  const a = e.style, n = e.getAttribute("height"), o = e.getAttribute("width");
  if (e[gn] = {
    initial: {
      height: n,
      width: o,
      style: {
        display: a.display,
        height: a.height,
        width: a.width
      }
    }
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", fs(o)) {
    const s = Go(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (fs(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Go(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const Vi = bc ? {
  passive: !0
} : !1;
function wd(e, t, a) {
  e && e.addEventListener(t, a, Vi);
}
function Cd(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, Vi);
}
function $d(e, t) {
  const a = kd[e.type] || e.type, { x: n, y: o } = oa(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function kn(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Sd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || kn(r.addedNodes, n), i = i && !kn(r.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Md(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || kn(r.removedNodes, n), i = i && !kn(r.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Ya = /* @__PURE__ */ new Map();
let gs = 0;
function zi() {
  const e = window.devicePixelRatio;
  e !== gs && (gs = e, Ya.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Dd(e, t) {
  Ya.size || window.addEventListener("resize", zi), Ya.set(e, t);
}
function Ad(e) {
  Ya.delete(e), Ya.size || window.removeEventListener("resize", zi);
}
function Td(e, t, a) {
  const n = e.canvas, o = n && yo(n);
  if (!o)
    return;
  const s = ki((r, l) => {
    const c = o.clientWidth;
    a(r, l), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, d = l.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), Dd(e, s), i;
}
function Vn(e, t, a) {
  a && a.disconnect(), t === "resize" && Ad(e);
}
function Bd(e, t, a) {
  const n = e.canvas, o = ki((s) => {
    e.ctx !== null && a($d(s, e));
  }, e);
  return wd(n, t, o), o;
}
class Ld extends Oi {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (_d(t, a), n) : null;
  }
  releaseContext(t) {
    const a = t.canvas;
    if (!a[gn])
      return !1;
    const n = a[gn].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const i = n[s];
      Le(i) ? a.removeAttribute(s) : a.setAttribute(s, i);
    });
    const o = n.style || {};
    return Object.keys(o).forEach((s) => {
      a.style[s] = o[s];
    }), a.width = a.width, delete a[gn], !0;
  }
  addEventListener(t, a, n) {
    this.removeEventListener(t, a);
    const o = t.$proxies || (t.$proxies = {}), i = {
      attach: Sd,
      detach: Md,
      resize: Td
    }[a] || Bd;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: Vn,
      detach: Vn,
      resize: Vn
    }[a] || Cd)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return pc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && yo(t);
    return !!(a && a.isConnected);
  }
}
function Pd(e) {
  return !vo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? xd : Ld;
}
let Rt = class {
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
    return ja(this.x) && ja(this.y);
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
function Id(e, t) {
  const a = e.options.ticks, n = Ed(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? Fd(t) : [], i = s.length, r = s[0], l = s[i - 1], c = [];
  if (i > o)
    return Od(t, c, s, i / o), c;
  const d = Rd(s, t, o);
  if (i > 0) {
    let h, f;
    const p = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (rn(t, c, d, Le(p) ? 0 : r - p, r), h = 0, f = i - 1; h < f; h++)
      rn(t, c, d, s[h], s[h + 1]);
    return rn(t, c, d, l, Le(p) ? t.length : l + p), c;
  }
  return rn(t, c, d), c;
}
function Ed(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function Rd(e, t, a) {
  const n = Vd(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = ml(n);
  for (let i = 0, r = s.length - 1; i < r; i++) {
    const l = s[i];
    if (l > o)
      return l;
  }
  return Math.max(o, 1);
}
function Fd(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function Od(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function rn(e, t, a, n, o) {
  const s = Se(n, 0), i = Math.min(Se(o, e.length), e.length);
  let r = 0, l, c, d;
  for (a = Math.ceil(a), o && (l = o - n, a = l / Math.floor(l / a)), d = s; d < 0; )
    r++, d = Math.round(s + r * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), r++, d = Math.round(s + r * a));
}
function Vd(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const zd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ms = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, ps = (e, t) => Math.min(t || e, e);
function bs(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function Nd(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(l - s, i - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(o - 1)) / 2, l += o < t ? c : -c, l < s - r || l > i + r)))
    return l;
}
function jd(e, t) {
  Pe(e, (a) => {
    const n = a.gc, o = n.length / 2;
    let s;
    if (o > t) {
      for (s = 0; s < o; ++s)
        delete a.data[n[s]];
      n.splice(0, o);
    }
  });
}
function Sa(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function vs(e, t) {
  if (!e.display)
    return 0;
  const a = tt(e.font, t), n = pt(e.padding);
  return (qe(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function Hd(e, t) {
  return ua(e, {
    scale: t,
    type: "scale"
  });
}
function Wd(e, t, a) {
  return ua(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function Kd(e, t, a) {
  let n = lo(e);
  return (a && t !== "right" || !a && t === "right") && (n = zd(n)), n;
}
function Yd(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: d } = l;
  let h = 0, f, p, g;
  const v = i - o, y = r - s;
  if (e.isHorizontal()) {
    if (p = Qe(n, s, r), Te(a)) {
      const b = Object.keys(a)[0], x = a[b];
      g = d[b].getPixelForValue(x) + v - t;
    } else a === "center" ? g = (c.bottom + c.top) / 2 + v - t : g = ms(e, a, t);
    f = r - s;
  } else {
    if (Te(a)) {
      const b = Object.keys(a)[0], x = a[b];
      p = d[b].getPixelForValue(x) - y + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - y + t : p = ms(e, a, t);
    g = Qe(n, i, o), h = a === "left" ? -Xe : Xe;
  }
  return {
    titleX: p,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class ka extends Rt {
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
    return t = _t(t, Number.POSITIVE_INFINITY), a = _t(a, Number.NEGATIVE_INFINITY), n = _t(n, Number.POSITIVE_INFINITY), o = _t(o, Number.NEGATIVE_INFINITY), {
      min: _t(t, n),
      max: _t(a, o),
      minDefined: mt(t),
      maxDefined: mt(a)
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
      min: _t(a, _t(n, a)),
      max: _t(n, _t(a, n))
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
  update(t, a, n) {
    const { beginAtZero: o, grace: s, ticks: i } = this.options, r = i.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = a, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = ql(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? bs(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Id(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
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
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = Re(a.callback, [
        s.value,
        n,
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
    const t = this.options, a = t.ticks, n = ps(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, r, l, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, p = et(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : p / (n - 1), h + 6 > r && (r = p / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - Sa(t.grid) - a.padding - vs(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), i = yl(Math.min(Math.asin(et((d.highest.height + 6) / r, -1, 1)), Math.asin(et(l / c, -1, 1)) - Math.asin(et(f / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
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
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = vs(o, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Sa(s) + l) : (t.height = this.maxHeight, t.width = Sa(s) + l), n.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), p = n.padding * 2, g = It(this.labelRotation), v = Math.cos(g), y = Math.sin(g);
        if (r) {
          const b = n.mirror ? 0 : y * h.width + v * f.height;
          t.height = Math.min(this.maxHeight, t.height + b + p);
        } else {
          const b = n.mirror ? 0 : v * h.width + y * f.height;
          t.width = Math.min(this.maxWidth, t.width + b + p);
        }
        this._calculatePadding(c, d, y, v);
      }
    }
    this._handleMargins(), r ? (this.width = this._length = a.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = a.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, a, n, o) {
    const { ticks: { align: s, padding: i }, position: r } = this.options, l = this.labelRotation !== 0, c = r !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, p = 0;
      l ? c ? (f = o * t.width, p = n * a.height) : (f = n * t.height, p = o * a.width) : s === "start" ? p = a.width : s === "end" ? f = t.width : s !== "inner" && (f = t.width / 2, p = a.width / 2), this.paddingLeft = Math.max((f - d + i) * this.width / (this.width - d), 0), this.paddingRight = Math.max((p - h + i) * this.width / (this.width - h), 0);
    } else {
      let d = a.height / 2, h = t.height / 2;
      s === "start" ? (d = 0, h = t.height) : s === "end" && (d = a.height, h = 0), this.paddingTop = d + i, this.paddingBottom = h + i;
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
      Le(t[a].label) && (t.splice(a, 1), n--, a--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const a = this.options.ticks.sampleSize;
      let n = this.ticks;
      a < n.length && (n = bs(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], r = [], l = Math.floor(a / ps(a, n));
    let c = 0, d = 0, h, f, p, g, v, y, b, x, _, w, $;
    for (h = 0; h < a; h += l) {
      if (g = t[h].label, v = this._resolveTickFontOptions(h), o.font = y = v.string, b = s[y] = s[y] || {
        data: {},
        gc: []
      }, x = v.lineHeight, _ = w = 0, !Le(g) && !qe(g))
        _ = Ko(o, b.data, b.gc, _, g), w = x;
      else if (qe(g))
        for (f = 0, p = g.length; f < p; ++f)
          $ = g[f], !Le($) && !qe($) && (_ = Ko(o, b.data, b.gc, _, $), w += x);
      i.push(_), r.push(w), c = Math.max(_, c), d = Math.max(w, d);
    }
    jd(s, a);
    const D = i.indexOf(c), S = r.indexOf(d), I = (V) => ({
      width: i[V] || 0,
      height: r[V] || 0
    });
    return {
      first: I(0),
      last: I(a - 1),
      widest: I(D),
      highest: I(S),
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
    return kl(this._alignToPixels ? ta(this.chart, a, 0) : a);
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
      return n.$context || (n.$context = Wd(this.getContext(), t, n));
    }
    return this.$context || (this.$context = Hd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = It(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = s ? s.widest.width + i : 0, l = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? l * n > r * o ? r / n : l / o : l * o < r * n ? l / n : r / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = Sa(s), p = [], g = r.setContext(this.getContext()), v = g.display ? g.width : 0, y = v / 2, b = function(q) {
      return ta(n, q, v);
    };
    let x, _, w, $, D, S, I, V, O, M, B, T;
    if (i === "top")
      x = b(this.bottom), S = this.bottom - f, V = x - y, M = b(t.top) + y, T = t.bottom;
    else if (i === "bottom")
      x = b(this.top), M = t.top, T = b(t.bottom) - y, S = x + y, V = this.top + f;
    else if (i === "left")
      x = b(this.right), D = this.right - f, I = x - y, O = b(t.left) + y, B = t.right;
    else if (i === "right")
      x = b(this.left), O = t.left, B = b(t.right) - y, D = x + y, I = this.left + f;
    else if (a === "x") {
      if (i === "center")
        x = b((t.top + t.bottom) / 2 + 0.5);
      else if (Te(i)) {
        const q = Object.keys(i)[0], ae = i[q];
        x = b(this.chart.scales[q].getPixelForValue(ae));
      }
      M = t.top, T = t.bottom, S = x + y, V = S + f;
    } else if (a === "y") {
      if (i === "center")
        x = b((t.left + t.right) / 2);
      else if (Te(i)) {
        const q = Object.keys(i)[0], ae = i[q];
        x = b(this.chart.scales[q].getPixelForValue(ae));
      }
      D = x - y, I = D - f, O = t.left, B = t.right;
    }
    const z = Se(o.ticks.maxTicksLimit, h), H = Math.max(1, Math.ceil(h / z));
    for (_ = 0; _ < h; _ += H) {
      const q = this.getContext(_), ae = s.setContext(q), ue = r.setContext(q), me = ae.lineWidth, U = ae.color, L = ue.dash || [], K = ue.dashOffset, Y = ae.tickWidth, le = ae.tickColor, ve = ae.tickBorderDash || [], Q = ae.tickBorderDashOffset;
      w = Nd(this, _, l), w !== void 0 && ($ = ta(n, w, me), c ? D = I = O = B = $ : S = V = M = T = $, p.push({
        tx1: D,
        ty1: S,
        tx2: I,
        ty2: V,
        x1: O,
        y1: M,
        x2: B,
        y2: T,
        width: me,
        color: U,
        borderDash: L,
        borderDashOffset: K,
        tickWidth: Y,
        tickColor: le,
        tickBorderDash: ve,
        tickBorderDashOffset: Q
      }));
    }
    return this._ticksLength = h, this._borderValue = x, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: h } = s, f = Sa(n.grid), p = f + d, g = h ? -d : p, v = -It(this.labelRotation), y = [];
    let b, x, _, w, $, D, S, I, V, O, M, B, T = "middle";
    if (o === "top")
      D = this.bottom - g, S = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      D = this.top + g, S = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const H = this._getYAxisLabelAlignment(f);
      S = H.textAlign, $ = H.x;
    } else if (o === "right") {
      const H = this._getYAxisLabelAlignment(f);
      S = H.textAlign, $ = H.x;
    } else if (a === "x") {
      if (o === "center")
        D = (t.top + t.bottom) / 2 + p;
      else if (Te(o)) {
        const H = Object.keys(o)[0], q = o[H];
        D = this.chart.scales[H].getPixelForValue(q) + p;
      }
      S = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - p;
      else if (Te(o)) {
        const H = Object.keys(o)[0], q = o[H];
        $ = this.chart.scales[H].getPixelForValue(q);
      }
      S = this._getYAxisLabelAlignment(f).textAlign;
    }
    a === "y" && (l === "start" ? T = "top" : l === "end" && (T = "bottom"));
    const z = this._getLabelSizes();
    for (b = 0, x = r.length; b < x; ++b) {
      _ = r[b], w = _.label;
      const H = s.setContext(this.getContext(b));
      I = this.getPixelForTick(b) + s.labelOffset, V = this._resolveTickFontOptions(b), O = V.lineHeight, M = qe(w) ? w.length : 1;
      const q = M / 2, ae = H.color, ue = H.textStrokeColor, me = H.textStrokeWidth;
      let U = S;
      i ? ($ = I, S === "inner" && (b === x - 1 ? U = this.options.reverse ? "left" : "right" : b === 0 ? U = this.options.reverse ? "right" : "left" : U = "center"), o === "top" ? c === "near" || v !== 0 ? B = -M * O + O / 2 : c === "center" ? B = -z.highest.height / 2 - q * O + O : B = -z.highest.height + O / 2 : c === "near" || v !== 0 ? B = O / 2 : c === "center" ? B = z.highest.height / 2 - q * O : B = z.highest.height - M * O, h && (B *= -1), v !== 0 && !H.showLabelBackdrop && ($ += O / 2 * Math.sin(v))) : (D = I, B = (1 - M) * O / 2);
      let L;
      if (H.showLabelBackdrop) {
        const K = pt(H.backdropPadding), Y = z.heights[b], le = z.widths[b];
        let ve = B - K.top, Q = 0 - K.left;
        switch (T) {
          case "middle":
            ve -= Y / 2;
            break;
          case "bottom":
            ve -= Y;
            break;
        }
        switch (S) {
          case "center":
            Q -= le / 2;
            break;
          case "right":
            Q -= le;
            break;
          case "inner":
            b === x - 1 ? Q -= le : b > 0 && (Q -= le / 2);
            break;
        }
        L = {
          left: Q,
          top: ve,
          width: le + K.width,
          height: Y + K.height,
          color: H.backdropColor
        };
      }
      y.push({
        label: w,
        font: V,
        textOffset: B,
        options: {
          rotation: v,
          color: ae,
          strokeColor: ue,
          strokeWidth: me,
          textAlign: U,
          textBaseline: T,
          translation: [
            $,
            D
          ],
          backdrop: L
        }
      });
    }
    return y;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-It(this.labelRotation))
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
    let c, d, h, f;
    this.isHorizontal() ? (c = ta(t, this.left, i) - i / 2, d = ta(t, this.right, r) + r / 2, h = f = l) : (h = ta(t, this.top, i) - i / 2, f = ta(t, this.bottom, r) + r / 2, c = d = l), a.save(), a.lineWidth = s.width, a.strokeStyle = s.color, a.beginPath(), a.moveTo(c, h), a.lineTo(d, f), a.stroke(), a.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, o = this._computeLabelArea();
    o && ho(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const r = i.options, l = i.font, c = i.label, d = i.textOffset;
      Ka(n, c, 0, d, l, r);
    }
    o && fo(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = tt(n.font), i = pt(n.padding), r = n.align;
    let l = s.lineHeight / 2;
    a === "bottom" || a === "center" || Te(a) ? (l += i.bottom, qe(n.text) && (l += s.lineHeight * (n.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: f } = Yd(this, l, a, r);
    Ka(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: h,
      rotation: f,
      textAlign: Kd(r, a, o),
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
    const t = this.options, a = t.ticks && t.ticks.z || 0, n = Se(t.grid && t.grid.z, -1), o = Se(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== ka.prototype.draw ? [
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
    return tt(a.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ln {
  constructor(t, a, n) {
    this.type = t, this.scope = a, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const a = Object.getPrototypeOf(t);
    let n;
    Xd(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, Ud(t, i, n), this.override && Ke.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ke[o] && (delete Ke[o][n], this.override && delete da[n]);
  }
}
function Ud(e, t, a) {
  const n = za(/* @__PURE__ */ Object.create(null), [
    a ? Ke.get(a) : {},
    Ke.get(t),
    e.defaults
  ]);
  Ke.set(t, n), e.defaultRoutes && qd(t, e.defaultRoutes), e.descriptors && Ke.describe(t, e.descriptors);
}
function qd(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    Ke.route(s, o, l, r);
  });
}
function Xd(e) {
  return "id" in e && "defaults" in e;
}
class Gd {
  constructor() {
    this.controllers = new ln($n, "datasets", !0), this.elements = new ln(Rt, "elements"), this.plugins = new ln(Object, "plugins"), this.scales = new ln(ka, "scales"), this._typedRegistries = [
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
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Pe(o, (i) => {
        const r = n || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = io(t);
    Re(n["before" + o], [], n), a[t](n), Re(n["after" + o], [], n);
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
var Ct = /* @__PURE__ */ new Gd();
class Zd {
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
      if (Re(r, l, i) === !1 && o.cancelable)
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
    const a = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), a;
  }
  _createDescriptors(t, a) {
    const n = t && t.config, o = Se(n.options && n.options.plugins, {}), s = Qd(n);
    return o === !1 && !a ? [] : eu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function Qd(e) {
  const t = {}, a = [], n = Object.keys(Ct.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push(Ct.getPlugin(n[s]));
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
function Jd(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function eu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, c = Jd(n[l], o);
    c !== null && s.push({
      plugin: r,
      options: tu(e.config, {
        plugin: r,
        local: a[l]
      }, c, i)
    });
  }
  return s;
}
function tu(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Zn(e, t) {
  const a = Ke.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function au(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function nu(e, t) {
  return e === t ? "_index_" : "_value_";
}
function ys(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function ou(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Qn(e, ...t) {
  if (ys(e))
    return e;
  for (const a of t) {
    const n = a.axis || ou(a.position) || e.length > 1 && ys(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function xs(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function su(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return xs(e, "x", a[0]) || xs(e, "y", a[0]);
  }
  return {};
}
function iu(e, t) {
  const a = da[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = Zn(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const r = n[i];
    if (!Te(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = Qn(i, r, su(i, e), Ke.scales[r.type]), c = nu(l, o), d = a.scales || {};
    s[i] = Ia(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      d[l],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Zn(r, t), d = (da[r] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const f = au(h, l), p = i[f + "AxisID"] || f;
      s[p] = s[p] || /* @__PURE__ */ Object.create(null), Ia(s[p], [
        {
          axis: f
        },
        n[p],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const r = s[i];
    Ia(r, [
      Ke.scales[r.type],
      Ke.scale
    ]);
  }), s;
}
function Ni(e) {
  const t = e.options || (e.options = {});
  t.plugins = Se(t.plugins, {}), t.scales = iu(e, t);
}
function ji(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function ru(e) {
  return e = e || {}, e.data = ji(e.data), Ni(e), e;
}
const ks = /* @__PURE__ */ new Map(), Hi = /* @__PURE__ */ new Set();
function cn(e, t) {
  let a = ks.get(e);
  return a || (a = t(), ks.set(e, a), Hi.add(a)), a;
}
const Ma = (e, t, a) => {
  const n = ca(t, a);
  n !== void 0 && e.add(n);
};
class lu {
  constructor(t) {
    this._config = ru(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = ji(t);
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
    this.clearCache(), Ni(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return cn(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, a) {
    return cn(`${t}.transition.${a}`, () => [
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
    return cn(`${t}-${a}`, () => [
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
    return cn(`${n}-plugin-${a}`, () => [
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
      t && (l.add(t), d.forEach((h) => Ma(l, t, h))), d.forEach((h) => Ma(l, o, h)), d.forEach((h) => Ma(l, da[s] || {}, h)), d.forEach((h) => Ma(l, Ke, h)), d.forEach((h) => Ma(l, Xn, h));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Hi.has(a) && i.set(a, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: a } = this;
    return [
      t,
      da[a] || {},
      Ke.datasets[a] || {},
      {
        type: a
      },
      Ke,
      Xn
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = _s(this._resolverCache, t, o);
    let l = i;
    if (du(i, a)) {
      s.$shared = !1, n = qt(n) ? n() : n;
      const c = this.createResolver(t, n, r);
      l = ya(i, n, c);
    }
    for (const c of a)
      s[c] = l[c];
    return s;
  }
  createResolver(t, a, n = [
    ""
  ], o) {
    const { resolver: s } = _s(this._resolverCache, t, n);
    return Te(a) ? ya(s, a, void 0, o) : s;
  }
}
function _s(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: mo(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const cu = (e) => Te(e) && Object.getOwnPropertyNames(e).some((t) => qt(e[t]));
function du(e, t) {
  const { isScriptable: a, isIndexable: n } = $i(e);
  for (const o of t) {
    const s = a(o), i = n(o), r = (i || s) && e[o];
    if (s && (qt(r) || cu(r)) || i && qe(r))
      return !0;
  }
  return !1;
}
var uu = "4.5.1";
const hu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ws(e, t) {
  return e === "top" || e === "bottom" || hu.indexOf(e) === -1 && t === "x";
}
function Cs(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function $s(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), Re(a && a.onComplete, [
    e
  ], t);
}
function fu(e) {
  const t = e.chart, a = t.options.animation;
  Re(a && a.onProgress, [
    e
  ], t);
}
function Wi(e) {
  return vo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const mn = {}, Ss = (e) => {
  const t = Wi(e);
  return Object.values(mn).filter((a) => a.canvas === t).pop();
};
function gu(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function mu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let Xt = class {
  static defaults = Ke;
  static instances = mn;
  static overrides = da;
  static registry = Ct;
  static version = uu;
  static getChart = Ss;
  static register(...t) {
    Ct.add(...t), Ms();
  }
  static unregister(...t) {
    Ct.remove(...t), Ms();
  }
  constructor(t, a) {
    const n = this.config = new lu(a), o = Wi(t), s = Ss(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Pd(o))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(o, i.aspectRatio), l = r && r.canvas, c = l && l.height, d = l && l.width;
    if (this.id = il(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Zd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = $l((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], mn[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Bt.listen(this, "complete", $s), Bt.listen(this, "progress", fu), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: a }, width: n, height: o, _aspectRatio: s } = this;
    return Le(t) ? a && s ? s : o ? n / o : null : t;
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
    return Ct;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Xo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Yo(this.canvas, this.ctx), this;
  }
  stop() {
    return Bt.stop(this), this;
  }
  resize(t, a) {
    Bt.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: a
    } : this._resize(t, a);
  }
  _resize(t, a) {
    const n = this.options, o = this.canvas, s = n.maintainAspectRatio && this.aspectRatio, i = this.platform.getMaximumSize(o, t, a, s), r = n.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Xo(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Re(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Pe(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, r) => (i[r] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const r = a[i], l = Qn(i, r), c = l === "r", d = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Pe(s, (i) => {
      const r = i.options, l = r.id, c = Qn(l, r), d = Se(r.type, i.dtype);
      (r.position === void 0 || ws(r.position, c) !== ws(i.dposition)) && (r.position = i.dposition), o[l] = !0;
      let h = null;
      if (l in n && n[l].type === d)
        h = n[l];
      else {
        const f = Ct.getScale(d);
        h = new f({
          id: l,
          type: d,
          ctx: this.ctx,
          chart: this
        }), n[h.id] = h;
      }
      h.init(r, t);
    }), Pe(o, (i, r) => {
      i || delete n[r];
    }), Pe(n, (i) => {
      gt.configure(this, i, i.options), gt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((o, s) => o.index - s.index), n > a) {
      for (let o = a; o < n; ++o)
        this._destroyDatasetMeta(o);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort(Cs("order", "index"));
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = r, i.indexAxis = s.indexAxis || Zn(r, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const l = Ct.getController(r), { datasetElementType: c, dataElementType: d } = Ke.datasets[r];
        Object.assign(l, {
          dataElementType: Ct.getElement(d),
          datasetElementType: c && Ct.getElement(c)
        }), i.controller = new l(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Pe(this.data.datasets, (t, a) => {
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
      const { controller: h } = this.getDatasetMeta(c), f = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(f), i = Math.max(+h.getMaxOverflow(), i);
    }
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Pe(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Cs("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Pe(this.scales, (t) => {
      gt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Ro(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      gu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, r) => r + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!Ro(o, n(s)))
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
    gt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], Pe(this.boxes, (o) => {
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
        this._updateDataset(a, qt(t) ? t({
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
    }) !== !1 && (Bt.has(this) ? this.attached && !Bt.running(this) && Bt.start(this) : (this.draw(), $s({
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
    }, o = Bc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && ho(a, o), t.controller.draw(), o && fo(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Wa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = hd.modes[a];
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
    return this.$context || (this.$context = ua(null, {
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
    Na(a) ? (s.data[a].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), i.update(s, {
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
    for (this.stop(), Bt.remove(this), t = 0, a = this.data.datasets.length; t < a; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: a } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Yo(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete mn[this.id], this.notifyPlugins("afterDestroy");
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
    Pe(this.options.events, (s) => n(s, o));
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
    Pe(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Pe(this._responsiveListeners, (t, a) => {
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
    !pn(n, a) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, a));
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
    const { _active: o = [], options: s } = this, i = a, r = this._getActiveElements(t, o, n, i), l = hl(t), c = mu(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, Re(s.onHover, [
      t,
      r,
      this
    ], this), l && Re(s.onClick, [
      t,
      r,
      this
    ], this));
    const d = !pn(r, o);
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
function Ms() {
  return Pe(Xt.instances, (e) => e._plugins.invalidate());
}
function pu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, h = Math.min(c / i, yt(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + h / 2, a - h / 2), r > 0) {
    const f = Math.min(c / r, yt(n - a));
    e.arc(o, s, r + c / 2, a - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, i * yt(n - a));
    if (d === "round")
      e.arc(o, s, f, a - Ie / 2, n + Ie / 2, !0);
    else if (d === "bevel") {
      const p = 2 * f * f, g = -p * Math.cos(a + Ie / 2) + o, v = -p * Math.sin(a + Ie / 2) + s, y = p * Math.cos(n + Ie / 2) + o, b = p * Math.sin(n + Ie / 2) + s;
      e.lineTo(g, v), e.lineTo(y, b);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function bu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: r, innerRadius: l } = t;
  let c = o / r;
  e.beginPath(), e.arc(s, i, r, n - c, a + c), l > o ? (c = o / l, e.arc(s, i, l, a + c, n - c, !0)) : e.arc(s, i, o, a + Xe, n - Xe), e.closePath(), e.clip();
}
function vu(e) {
  return go(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function yu(e, t, a, n) {
  const o = vu(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), r = (l) => {
    const c = (a - Math.min(s, l)) * n / 2;
    return et(l, 0, Math.min(s, c));
  };
  return {
    outerStart: r(o.outerStart),
    outerEnd: r(o.outerEnd),
    innerStart: et(o.innerStart, 0, i),
    innerEnd: et(o.innerEnd, 0, i)
  };
}
function ma(e, t, a, n) {
  return {
    x: a + e * Math.cos(t),
    y: n + e * Math.sin(t)
  };
}
function _n(e, t, a, n, o, s) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + n + a - c, 0), f = d > 0 ? d + n + a + c : 0;
  let p = 0;
  const g = o - l;
  if (n) {
    const H = d > 0 ? d - n : 0, q = h > 0 ? h - n : 0, ae = (H + q) / 2, ue = ae !== 0 ? g * ae / (ae + n) : g;
    p = (g - ue) / 2;
  }
  const v = Math.max(1e-3, g * h - a / Ie) / h, y = (g - v) / 2, b = l + y + p, x = o - y - p, { outerStart: _, outerEnd: w, innerStart: $, innerEnd: D } = yu(t, f, h, x - b), S = h - _, I = h - w, V = b + _ / S, O = x - w / I, M = f + $, B = f + D, T = b + $ / M, z = x - D / B;
  if (e.beginPath(), s) {
    const H = (V + O) / 2;
    if (e.arc(i, r, h, V, H), e.arc(i, r, h, H, O), w > 0) {
      const me = ma(I, O, i, r);
      e.arc(me.x, me.y, w, O, x + Xe);
    }
    const q = ma(B, x, i, r);
    if (e.lineTo(q.x, q.y), D > 0) {
      const me = ma(B, z, i, r);
      e.arc(me.x, me.y, D, x + Xe, z + Math.PI);
    }
    const ae = (x - D / f + (b + $ / f)) / 2;
    if (e.arc(i, r, f, x - D / f, ae, !0), e.arc(i, r, f, ae, b + $ / f, !0), $ > 0) {
      const me = ma(M, T, i, r);
      e.arc(me.x, me.y, $, T + Math.PI, b - Xe);
    }
    const ue = ma(S, b, i, r);
    if (e.lineTo(ue.x, ue.y), _ > 0) {
      const me = ma(S, V, i, r);
      e.arc(me.x, me.y, _, b - Xe, V);
    }
  } else {
    e.moveTo(i, r);
    const H = Math.cos(V) * h + i, q = Math.sin(V) * h + r;
    e.lineTo(H, q);
    const ae = Math.cos(O) * h + i, ue = Math.sin(O) * h + r;
    e.lineTo(ae, ue);
  }
  e.closePath();
}
function xu(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (s) {
    _n(e, t, a, n, l, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % He || He));
  }
  return _n(e, t, a, n, l, o), e.fill(), l;
}
function ku(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: p } = l, g = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let v = t.endAngle;
  if (s) {
    _n(e, t, a, n, v, o);
    for (let y = 0; y < s; ++y)
      e.stroke();
    isNaN(r) || (v = i + (r % He || He));
  }
  g && bu(e, t, v), l.selfJoin && v - i >= Ie && p === 0 && d !== "miter" && pu(e, t, v), s || (_n(e, t, a, n, v, o), e.stroke());
}
class _u extends Rt {
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
    ], n), { angle: s, distance: i } = bi(o, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), f = (this.options.spacing + this.options.borderWidth) / 2, p = Se(h, l - r), g = Ha(s, r, l) && r !== l, v = p >= He || g, y = Vt(i, c + f, d + f);
    return v && y;
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
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > He ? Math.floor(n / He) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * o, Math.sin(r) * o);
    const l = 1 - Math.sin(Math.min(Ie, n || 0)), c = o * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, xu(t, this, c, s, i), ku(t, this, c, s, i), t.restore();
  }
}
function Ki(e, t, a = t) {
  e.lineCap = Se(a.borderCapStyle, t.borderCapStyle), e.setLineDash(Se(a.borderDash, t.borderDash)), e.lineDashOffset = Se(a.borderDashOffset, t.borderDashOffset), e.lineJoin = Se(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = Se(a.borderWidth, t.borderWidth), e.strokeStyle = Se(a.borderColor, t.borderColor);
}
function wu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function Cu(e) {
  return e.stepped ? Vl : e.tension || e.cubicInterpolationMode === "monotone" ? zl : wu;
}
function Yi(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: r } = t, l = Math.max(o, i), c = Math.min(s, r), d = o < i && s < i || o > r && s > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !d ? n + c - l : c - l
  };
}
function $u(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: r, loop: l, ilen: c } = Yi(o, a, n), d = Cu(s);
  let { move: h = !0, reverse: f } = n || {}, p, g, v;
  for (p = 0; p <= c; ++p)
    g = o[(r + (f ? c - p : p)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, v, g, f, s.stepped), v = g);
  return l && (g = o[(r + (f ? c : 0)) % i], d(e, v, g, f, s.stepped)), !!l;
}
function Su(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: r } = Yi(o, a, n), { move: l = !0, reverse: c } = n || {};
  let d = 0, h = 0, f, p, g, v, y, b;
  const x = (w) => (i + (c ? r - w : w)) % s, _ = () => {
    v !== y && (e.lineTo(d, y), e.lineTo(d, v), e.lineTo(d, b));
  };
  for (l && (p = o[x(0)], e.moveTo(p.x, p.y)), f = 0; f <= r; ++f) {
    if (p = o[x(f)], p.skip)
      continue;
    const w = p.x, $ = p.y, D = w | 0;
    D === g ? ($ < v ? v = $ : $ > y && (y = $), d = (h * d + w) / ++h) : (_(), e.lineTo(w, $), g = D, h = 0, v = y = $), b = $;
  }
  _();
}
function Jn(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Su : $u;
}
function Mu(e) {
  return e.stepped ? vc : e.tension || e.cubicInterpolationMode === "monotone" ? yc : sa;
}
function Du(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), Ki(e, t.options), e.stroke(o);
}
function Au(e, t, a, n) {
  const { segments: o, options: s } = t, i = Jn(t);
  for (const r of o)
    Ki(e, s, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Tu = typeof Path2D == "function";
function Bu(e, t, a, n) {
  Tu && !t.options.segment ? Du(e, t, a, n) : Au(e, t, a, n);
}
class Lu extends Rt {
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
      dc(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Mc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = Cc(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const r = [], l = Mu(n);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: f } = i[c], p = s[h], g = s[f];
      if (p === g) {
        r.push(p);
        continue;
      }
      const v = Math.abs((o - p[a]) / (g[a] - p[a])), y = l(p, g, v, n.stepped);
      y[a] = t[a], r.push(y);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, n) {
    return Jn(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = Jn(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), Bu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function Ds(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Pu extends Rt {
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
    return Ds(this, t, "x", a);
  }
  inYRange(t, a) {
    return Ds(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Wa(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Gn(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function Ui(e, t) {
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
function Nt(e, t, a, n) {
  return e ? 0 : et(t, a, n);
}
function Iu(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = Ci(n);
  return {
    t: Nt(o.top, s.top, 0, a),
    r: Nt(o.right, s.right, 0, t),
    b: Nt(o.bottom, s.bottom, 0, a),
    l: Nt(o.left, s.left, 0, t)
  };
}
function Eu(e, t, a) {
  const { enableBorderRadius: n } = e.getProps([
    "enableBorderRadius"
  ]), o = e.options.borderRadius, s = ba(o), i = Math.min(t, a), r = e.borderSkipped, l = n || Te(o);
  return {
    topLeft: Nt(!l || r.top || r.left, s.topLeft, 0, i),
    topRight: Nt(!l || r.top || r.right, s.topRight, 0, i),
    bottomLeft: Nt(!l || r.bottom || r.left, s.bottomLeft, 0, i),
    bottomRight: Nt(!l || r.bottom || r.right, s.bottomRight, 0, i)
  };
}
function Ru(e) {
  const t = Ui(e), a = t.right - t.left, n = t.bottom - t.top, o = Iu(e, a / 2, n / 2), s = Eu(e, a / 2, n / 2);
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
function zn(e, t, a, n) {
  const o = t === null, s = a === null, r = e && !(o && s) && Ui(e, n);
  return r && (o || Vt(t, r.left, r.right)) && (s || Vt(a, r.top, r.bottom));
}
function Fu(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Ou(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Nn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class Vu extends Rt {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = Ru(this), r = Fu(i.radius) ? yn : Ou;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), r(t, Nn(i, a, s)), t.clip(), r(t, Nn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, Nn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return zn(this, t, a, n);
  }
  inXRange(t, a) {
    return zn(this, t, null, a);
  }
  inYRange(t, a) {
    return zn(this, null, t, a);
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
const As = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, zu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Ts extends Rt {
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
    let a = Re(t.generateLabels, [
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
    const n = t.labels, o = tt(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = As(n, s);
    let c, d;
    a.font = o.string, this.isHorizontal() ? (c = this.maxWidth, d = this._fitRows(i, s, r, l) + 10) : (d = this.maxHeight, c = this._fitCols(i, o, r, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(d, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, a, n, o) {
    const { ctx: s, maxWidth: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], d = o + r;
    let h = t;
    s.textAlign = "left", s.textBaseline = "middle";
    let f = -1, p = -d;
    return this.legendItems.forEach((g, v) => {
      const y = n + a / 2 + s.measureText(g.text).width;
      (v === 0 || c[c.length - 1] + y + 2 * r > i) && (h += d, c[c.length - (v > 0 ? 0 : 1)] = 0, p += d, f++), l[v] = {
        left: 0,
        top: p,
        row: f,
        width: y,
        height: o
      }, c[c.length - 1] += y + r;
    }), h;
  }
  _fitCols(t, a, n, o) {
    const { ctx: s, maxHeight: i, options: { labels: { padding: r } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], d = i - t;
    let h = r, f = 0, p = 0, g = 0, v = 0;
    return this.legendItems.forEach((y, b) => {
      const { itemWidth: x, itemHeight: _ } = Nu(n, a, s, y, o);
      b > 0 && p + _ + 2 * r > d && (h += f + r, c.push({
        width: f,
        height: p
      }), g += f + r, v++, f = p = 0), l[b] = {
        left: g,
        top: p,
        col: v,
        width: x,
        height: _
      }, f = Math.max(f, x), p += _ + r;
    }), h += f, c.push({
      width: f,
      height: p
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: a, options: { align: n, labels: { padding: o }, rtl: s } } = this, i = va(s, this.left, this.width);
    if (this.isHorizontal()) {
      let r = 0, l = Qe(n, this.left + o, this.right - this.lineWidths[r]);
      for (const c of a)
        r !== c.row && (r = c.row, l = Qe(n, this.left + o, this.right - this.lineWidths[r])), c.top += this.top + t + o, c.left = i.leftForLtr(i.x(l), c.width), l += c.width + o;
    } else {
      let r = 0, l = Qe(n, this.top + t + o, this.bottom - this.columnSizes[r].height);
      for (const c of a)
        c.col !== r && (r = c.col, l = Qe(n, this.top + t + o, this.bottom - this.columnSizes[r].height)), c.top = l, c.left += this.left + o, c.left = i.leftForLtr(i.x(c.left), c.width), l += c.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      ho(t, this), this._draw(), fo(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, r = Ke.color, l = va(t.rtl, this.left, this.width), c = tt(i.font), { padding: d } = i, h = c.size, f = h / 2;
    let p;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: g, boxHeight: v, itemHeight: y } = As(i, h), b = function(D, S, I) {
      if (isNaN(g) || g <= 0 || isNaN(v) || v < 0)
        return;
      o.save();
      const V = Se(I.lineWidth, 1);
      if (o.fillStyle = Se(I.fillStyle, r), o.lineCap = Se(I.lineCap, "butt"), o.lineDashOffset = Se(I.lineDashOffset, 0), o.lineJoin = Se(I.lineJoin, "miter"), o.lineWidth = V, o.strokeStyle = Se(I.strokeStyle, r), o.setLineDash(Se(I.lineDash, [])), i.usePointStyle) {
        const O = {
          radius: v * Math.SQRT2 / 2,
          pointStyle: I.pointStyle,
          rotation: I.rotation,
          borderWidth: V
        }, M = l.xPlus(D, g / 2), B = S + f;
        wi(o, O, M, B, i.pointStyleWidth && g);
      } else {
        const O = S + Math.max((h - v) / 2, 0), M = l.leftForLtr(D, g), B = ba(I.borderRadius);
        o.beginPath(), Object.values(B).some((T) => T !== 0) ? yn(o, {
          x: M,
          y: O,
          w: g,
          h: v,
          radius: B
        }) : o.rect(M, O, g, v), o.fill(), V !== 0 && o.stroke();
      }
      o.restore();
    }, x = function(D, S, I) {
      Ka(o, I.text, D, S + y / 2, c, {
        strikethrough: I.hidden,
        textAlign: l.textAlign(I.textAlign)
      });
    }, _ = this.isHorizontal(), w = this._computeTitleHeight();
    _ ? p = {
      x: Qe(s, this.left + d, this.right - n[0]),
      y: this.top + d + w,
      line: 0
    } : p = {
      x: this.left + d,
      y: Qe(s, this.top + w + d, this.bottom - a[0].height),
      line: 0
    }, Ti(this.ctx, t.textDirection);
    const $ = y + d;
    this.legendItems.forEach((D, S) => {
      o.strokeStyle = D.fontColor, o.fillStyle = D.fontColor;
      const I = o.measureText(D.text).width, V = l.textAlign(D.textAlign || (D.textAlign = i.textAlign)), O = g + f + I;
      let M = p.x, B = p.y;
      l.setWidth(this.width), _ ? S > 0 && M + O + d > this.right && (B = p.y += $, p.line++, M = p.x = Qe(s, this.left + d, this.right - n[p.line])) : S > 0 && B + $ > this.bottom && (M = p.x = M + a[p.line].width + d, p.line++, B = p.y = Qe(s, this.top + w + d, this.bottom - a[p.line].height));
      const T = l.x(M);
      if (b(T, B, D), M = Sl(V, M + g + f, _ ? M + O : this.right, t.rtl), x(l.x(M), B, D), _)
        p.x += O + d;
      else if (typeof D.text != "string") {
        const z = c.lineHeight;
        p.y += qi(D, z) + d;
      } else
        p.y += $;
    }), Bi(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = tt(a.font), o = pt(a.padding);
    if (!a.display)
      return;
    const s = va(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = o.top + l;
    let d, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, h = Qe(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((v, y) => Math.max(v, y.height), 0);
      d = c + Qe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const p = Qe(r, h, h + f);
    i.textAlign = s.textAlign(lo(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ka(i, a.text, p, d, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = tt(t.font), n = pt(t.padding);
    return t.display ? a.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, a) {
    let n, o, s;
    if (Vt(t, this.left, this.right) && Vt(a, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, n = 0; n < s.length; ++n)
        if (o = s[n], Vt(t, o.left, o.left + o.width) && Vt(a, o.top, o.top + o.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const a = this.options;
    if (!Wu(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = zu(o, n);
      o && !s && Re(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && Re(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && Re(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function Nu(e, t, a, n, o) {
  const s = ju(n, e, t, a), i = Hu(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function ju(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function Hu(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = qi(t, a)), n;
}
function qi(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function Wu(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var ko = {
  id: "legend",
  _element: Ts,
  start(e, t, a) {
    const n = e.legend = new Ts({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    gt.configure(e, n, a), gt.addBox(e, n);
  },
  stop(e) {
    gt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    gt.configure(e, n, a), n.options = a;
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
          const c = l.controller.getStyle(a ? 0 : void 0), d = pt(c.borderWidth);
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
class Xi extends Rt {
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
    const o = qe(n.text) ? n.text.length : 1;
    this._padding = pt(n.padding);
    const s = o * tt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: a, left: n, bottom: o, right: s, options: i } = this, r = i.align;
    let l = 0, c, d, h;
    return this.isHorizontal() ? (d = Qe(r, n, s), h = a + t, c = s - n) : (i.position === "left" ? (d = n + t, h = Qe(r, o, a), l = Ie * -0.5) : (d = s - t, h = Qe(r, a, o), l = Ie * 0.5), c = o - a), {
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
    const n = tt(a.font), s = n.lineHeight / 2 + this._padding.top, { titleX: i, titleY: r, maxWidth: l, rotation: c } = this._drawArgs(s);
    Ka(t, a.text, 0, 0, n, {
      color: a.color,
      maxWidth: l,
      rotation: c,
      textAlign: lo(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function Ku(e, t) {
  const a = new Xi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  gt.configure(e, a, t), gt.addBox(e, a), e.titleBlock = a;
}
var Gi = {
  id: "title",
  _element: Xi,
  start(e, t, a) {
    Ku(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    gt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    gt.configure(e, n, a), n.options = a;
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
const Pa = {
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
        const c = l.getCenterPoint(), d = qn(t, c);
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
function wt(e, t) {
  return t && (qe(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Lt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Yu(e, t) {
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
function Bs(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = tt(t.bodyFont), c = tt(t.titleFont), d = tt(t.footerFont), h = s.length, f = o.length, p = n.length, g = pt(t.padding);
  let v = g.height, y = 0, b = n.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (b += e.beforeBody.length + e.afterBody.length, h && (v += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const w = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    v += p * w + (b - p) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  f && (v += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const _ = function(w) {
    y = Math.max(y, a.measureText(w).width + x);
  };
  return a.save(), a.font = c.string, Pe(e.title, _), a.font = l.string, Pe(e.beforeBody.concat(e.afterBody), _), x = t.displayColors ? i + 2 + t.boxPadding : 0, Pe(n, (w) => {
    Pe(w.before, _), Pe(w.lines, _), Pe(w.after, _);
  }), x = 0, a.font = d.string, Pe(e.footer, _), a.restore(), y += g.width, {
    width: y,
    height: v
  };
}
function Uu(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function qu(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function Xu(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = o <= (r + l) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), qu(c, e, t, a) && (c = "center"), c;
}
function Ls(e, t, a) {
  const n = a.yAlign || t.yAlign || Uu(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Xu(e, t, a, n),
    yAlign: n
  };
}
function Gu(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function Zu(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Ps(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, c = o + s, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: p } = ba(i);
  let g = Gu(t, r);
  const v = Zu(t, l, c);
  return l === "center" ? r === "left" ? g += c : r === "right" && (g -= c) : r === "left" ? g -= Math.max(d, f) + o : r === "right" && (g += Math.max(h, p) + o), {
    x: et(g, 0, n.width - t.width),
    y: et(v, 0, n.height - t.height)
  };
}
function dn(e, t, a) {
  const n = pt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Is(e) {
  return wt([], Lt(e));
}
function Qu(e, t, a) {
  return ua(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Es(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Zi = {
  beforeTitle: Tt,
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
  afterTitle: Tt,
  beforeBody: Tt,
  beforeLabel: Tt,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const a = e.formattedValue;
    return Le(a) || (t += a), t;
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
  afterLabel: Tt,
  afterBody: Tt,
  beforeFooter: Tt,
  footer: Tt,
  afterFooter: Tt
};
function st(e, t, a, n) {
  const o = e[t].call(a, n);
  return typeof o > "u" ? Zi[t].call(a, n) : o;
}
class Rs extends Rt {
  static positioners = Pa;
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new Pi(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Qu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = st(n, "beforeTitle", this, t), s = st(n, "title", this, t), i = st(n, "afterTitle", this, t);
    let r = [];
    return r = wt(r, Lt(o)), r = wt(r, Lt(s)), r = wt(r, Lt(i)), r;
  }
  getBeforeBody(t, a) {
    return Is(st(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Pe(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Es(n, s);
      wt(i.before, Lt(st(r, "beforeLabel", this, s))), wt(i.lines, st(r, "label", this, s)), wt(i.after, Lt(st(r, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Is(st(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = st(n, "beforeFooter", this, t), s = st(n, "footer", this, t), i = st(n, "afterFooter", this, t);
    let r = [];
    return r = wt(r, Lt(o)), r = wt(r, Lt(s)), r = wt(r, Lt(i)), r;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let r = [], l, c;
    for (l = 0, c = a.length; l < c; ++l)
      r.push(Yu(this.chart, a[l]));
    return t.filter && (r = r.filter((d, h, f) => t.filter(d, h, f, n))), t.itemSort && (r = r.sort((d, h) => t.itemSort(d, h, n))), Pe(r, (d) => {
      const h = Es(t.callbacks, d);
      o.push(st(h, "labelColor", this, d)), s.push(st(h, "labelPointStyle", this, d)), i.push(st(h, "labelTextColor", this, d));
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
      const r = Pa[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const l = this._size = Bs(this, n), c = Object.assign({}, r, l), d = Ls(this.chart, n, c), h = Ps(n, c, d, this.chart);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: h } = ba(r), { x: f, y: p } = t, { width: g, height: v } = a;
    let y, b, x, _, w, $;
    return s === "center" ? (w = p + v / 2, o === "left" ? (y = f, b = y - i, _ = w + i, $ = w - i) : (y = f + g, b = y + i, _ = w - i, $ = w + i), x = y) : (o === "left" ? b = f + Math.max(l, d) + i : o === "right" ? b = f + g - Math.max(c, h) - i : b = this.caretX, s === "top" ? (_ = p, w = _ - i, y = b - i, x = b + i) : (_ = p + v, w = _ + i, y = b + i, x = b - i), $ = _), {
      x1: y,
      x2: b,
      x3: x,
      y1: _,
      y2: w,
      y3: $
    };
  }
  drawTitle(t, a, n) {
    const o = this.title, s = o.length;
    let i, r, l;
    if (s) {
      const c = va(n.rtl, this.x, this.width);
      for (t.x = dn(this, n.titleAlign, n), a.textAlign = c.textAlign(n.titleAlign), a.textBaseline = "middle", i = tt(n.titleFont), r = n.titleSpacing, a.fillStyle = n.titleColor, a.font = i.string, l = 0; l < s; ++l)
        a.fillText(o[l], c.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + r, l + 1 === s && (t.y += n.titleMarginBottom - r);
    }
  }
  _drawColorBox(t, a, n, o, s) {
    const i = this.labelColors[n], r = this.labelPointStyles[n], { boxHeight: l, boxWidth: c } = s, d = tt(s.bodyFont), h = dn(this, "left", s), f = o.x(h), p = l < d.lineHeight ? (d.lineHeight - l) / 2 : 0, g = a.y + p;
    if (s.usePointStyle) {
      const v = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = o.leftForLtr(f, c) + c / 2, b = g + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Gn(t, v, y, b), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Gn(t, v, y, b);
    } else {
      t.lineWidth = Te(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const v = o.leftForLtr(f, c), y = o.leftForLtr(o.xPlus(f, 1), c - 2), b = ba(i.borderRadius);
      Object.values(b).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, yn(t, {
        x: v,
        y: g,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), yn(t, {
        x: y,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(v, g, c, l), t.strokeRect(v, g, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = n, h = tt(n.bodyFont);
    let f = h.lineHeight, p = 0;
    const g = va(n.rtl, this.x, this.width), v = function(I) {
      a.fillText(I, g.x(t.x + p), t.y + f / 2), t.y += f + s;
    }, y = g.textAlign(i);
    let b, x, _, w, $, D, S;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = dn(this, y, n), a.fillStyle = n.bodyColor, Pe(this.beforeBody, v), p = r && y !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, D = o.length; w < D; ++w) {
      for (b = o[w], x = this.labelTextColors[w], a.fillStyle = x, Pe(b.before, v), _ = b.lines, r && _.length && (this._drawColorBox(a, t, w, g, n), f = Math.max(h.lineHeight, l)), $ = 0, S = _.length; $ < S; ++$)
        v(_[$]), f = h.lineHeight;
      Pe(b.after, v);
    }
    p = 0, f = h.lineHeight, Pe(this.afterBody, v), t.y -= s;
  }
  drawFooter(t, a, n) {
    const o = this.footer, s = o.length;
    let i, r;
    if (s) {
      const l = va(n.rtl, this.x, this.width);
      for (t.x = dn(this, n.footerAlign, n), t.y += n.footerMarginTop, a.textAlign = l.textAlign(n.footerAlign), a.textBaseline = "middle", i = tt(n.footerFont), a.fillStyle = n.footerColor, a.font = i.string, r = 0; r < s; ++r)
        a.fillText(o[r], l.x(t.x), t.y + i.lineHeight / 2), t.y += i.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, a, n, o) {
    const { xAlign: s, yAlign: i } = this, { x: r, y: l } = t, { width: c, height: d } = n, { topLeft: h, topRight: f, bottomLeft: p, bottomRight: g } = ba(o.cornerRadius);
    a.fillStyle = o.backgroundColor, a.strokeStyle = o.borderColor, a.lineWidth = o.borderWidth, a.beginPath(), a.moveTo(r + h, l), i === "top" && this.drawCaret(t, a, n, o), a.lineTo(r + c - f, l), a.quadraticCurveTo(r + c, l, r + c, l + f), i === "center" && s === "right" && this.drawCaret(t, a, n, o), a.lineTo(r + c, l + d - g), a.quadraticCurveTo(r + c, l + d, r + c - g, l + d), i === "bottom" && this.drawCaret(t, a, n, o), a.lineTo(r + p, l + d), a.quadraticCurveTo(r, l + d, r, l + d - p), i === "center" && s === "left" && this.drawCaret(t, a, n, o), a.lineTo(r, l + h), a.quadraticCurveTo(r, l, r + h, l), a.closePath(), a.fill(), o.borderWidth > 0 && a.stroke();
  }
  _updateAnimationTarget(t) {
    const a = this.chart, n = this.$animations, o = n && n.x, s = n && n.y;
    if (o || s) {
      const i = Pa[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = Bs(this, t), l = Object.assign({}, i, this._size), c = Ls(a, t, l), d = Ps(t, l, c, a);
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
    const i = pt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Ti(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Bi(t, a.textDirection), t.restore());
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
    }), s = !pn(n, o), i = this._positionChanged(o, a);
    (s || i) && (this._active = o, this._eventPosition = a, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, a, n = !0) {
    if (a && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], i = this._getActiveElements(t, s, a, n), r = this._positionChanged(i, t), l = a || !pn(i, s) || r;
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
    const { caretX: n, caretY: o, options: s } = this, i = Pa[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var _o = {
  id: "tooltip",
  _element: Rs,
  positioners: Pa,
  afterInit(e, t, a) {
    a && (e.tooltip = new Rs({
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
    callbacks: Zi
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
const Ju = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function eh(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return Ju(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const th = (e, t) => e === null ? null : et(Math.round(e), 0, t);
function Fs(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Qi extends ka {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Fs
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
    if (Le(t))
      return null;
    const n = this.getLabels();
    return a = isFinite(a) && n[a] === t ? a : eh(n, t, Se(a, t), this._addedLabels), th(a, n.length - 1);
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
    return Fs.call(this, t);
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
function ah(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, p = s || 1, g = d - 1, { min: v, max: y } = t, b = !Le(i), x = !Le(r), _ = !Le(c), w = (y - v) / (h + 1);
  let $ = Oo((y - v) / g / p) * p, D, S, I, V;
  if ($ < 1e-14 && !b && !x)
    return [
      {
        value: v
      },
      {
        value: y
      }
    ];
  V = Math.ceil(y / $) - Math.floor(v / $), V > g && ($ = Oo(V * $ / g / p) * p), Le(l) || (D = Math.pow(10, l), $ = Math.ceil($ * D) / D), o === "ticks" ? (S = Math.floor(v / $) * $, I = Math.ceil(y / $) * $) : (S = v, I = y), b && x && s && bl((r - i) / s, $ / 1e3) ? (V = Math.round(Math.min((r - i) / $, d)), $ = (r - i) / V, S = i, I = r) : _ ? (S = b ? i : S, I = x ? r : I, V = c - 1, $ = (I - S) / V) : (V = (I - S) / $, Ea(V, Math.round(V), $ / 1e3) ? V = Math.round(V) : V = Math.ceil(V));
  const O = Math.max(Vo($), Vo(S));
  D = Math.pow(10, Le(l) ? O : l), S = Math.round(S * D) / D, I = Math.round(I * D) / D;
  let M = 0;
  for (b && (f && S !== i ? (a.push({
    value: i
  }), S < i && M++, Ea(Math.round((S + M * $) * D) / D, i, Os(i, w, e)) && M++) : S < i && M++); M < V; ++M) {
    const B = Math.round((S + M * $) * D) / D;
    if (x && B > r)
      break;
    a.push({
      value: B
    });
  }
  return x && f && I !== r ? a.length && Ea(a[a.length - 1].value, r, Os(r, w, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!x || I === r) && a.push({
    value: I
  }), a;
}
function Os(e, t, { horizontal: a, minRotation: n }) {
  const o = It(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class nh extends ka {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, a) {
    return Le(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: a, maxDefined: n } = this.getUserBounds();
    let { min: o, max: s } = this;
    const i = (l) => o = a ? o : l, r = (l) => s = n ? s : l;
    if (t) {
      const l = Mt(o), c = Mt(s);
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
    }, s = this._range || this, i = ah(o, s);
    return t.bounds === "ticks" && vl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return uo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Ji extends nh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: _i.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = mt(t) ? t : 0, this.max = mt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = It(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(a / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
const Mn = {
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
}, lt = /* @__PURE__ */ Object.keys(Mn);
function Vs(e, t) {
  return e - t;
}
function zs(e, t) {
  if (Le(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), mt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (ja(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function Ns(e, t, a, n) {
  const o = lt.length;
  for (let s = lt.indexOf(e); s < o - 1; ++s) {
    const i = Mn[lt[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return lt[s];
  }
  return lt[o - 1];
}
function oh(e, t, a, n, o) {
  for (let s = lt.length - 1; s >= lt.indexOf(a); s--) {
    const i = lt[s];
    if (Mn[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return lt[a ? lt.indexOf(a) : 0];
}
function sh(e) {
  for (let t = lt.indexOf(e) + 1, a = lt.length; t < a; ++t)
    if (Mn[lt[t]].common)
      return lt[t];
}
function js(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = ro(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function ih(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let r, l;
  for (r = s; r <= i; r = +o.add(r, 1, n))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Hs(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, r;
  for (i = 0; i < s; ++i)
    r = t[i], o[r] = i, n.push({
      value: r,
      major: !1
    });
  return s === 0 || !a ? n : ih(e, n, o, a);
}
class Ws extends ka {
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
    const n = t.time || (t.time = {}), o = this._adapter = new rd._date(t.adapters.date);
    o.init(a), Ia(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : zs(this, t);
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
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), o = mt(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = mt(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, r = wl(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? Ns(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : oh(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : sh(this._unit), this.initOffsets(o), t.reverse && r.reverse(), Hs(this, r, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let a = 0, n = 0, o, s;
    this.options.offset && t.length && (o = this.getDecimalForValue(t[0]), t.length === 1 ? a = 1 - o : a = (this.getDecimalForValue(t[1]) - o) / 2, s = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = s : n = (s - this.getDecimalForValue(t[t.length - 2])) / 2);
    const i = t.length < 3 ? 0.5 : 0.25;
    a = et(a, 0, i), n = et(n, 0, i), this._offsets = {
      start: a,
      end: n,
      factor: 1 / (a + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || Ns(s.minUnit, a, n, this._getLabelCapacity(a)), r = Se(o.ticks.stepSize, 1), l = i === "week" ? s.isoWeekday : !1, c = ja(l) || l === !0, d = {};
    let h = a, f, p;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : i), t.diff(n, a, i) > 1e5 * r)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + r + " " + i);
    const g = o.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, p = 0; f < n; f = +t.add(f, r, i), p++)
      js(d, f, g);
    return (f === n || o.bounds === "ticks" || p === 1) && js(d, f, g), Object.keys(d).sort(Vs).map((v) => +v);
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
      return Re(i, [
        t,
        a,
        n
      ], this);
    const r = s.time.displayFormats, l = this._unit, c = this._majorUnit, d = l && r[l], h = c && r[c], f = n[a], p = c && h && f && f.major;
    return this._adapter.format(t, o || (p ? h : d));
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = It(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + r * i,
      h: n * i + r * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, Hs(this, [
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
      t.push(zs(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return yi(t.sort(Vs));
  }
}
function un(e, t, a) {
  let n = 0, o = e.length - 1, s, i, r, l;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ia(e, "pos", t)), { pos: s, time: r } = e[n], { pos: i, time: l } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ia(e, "time", t)), { time: s, pos: r } = e[n], { time: i, pos: l } = e[o]);
  const c = i - s;
  return c ? r + (l - r) * (t - s) / c : r;
}
class US extends Ws {
  static id = "timeseries";
  static defaults = Ws.defaults;
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), a = this._table = this.buildLookupTable(t);
    this._minPos = un(a, this.min), this._tableRange = un(a, this.max) - this._minPos, super.initOffsets(t);
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
    return (un(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const a = this._offsets, n = this.getDecimalForPixel(t) / a.factor - a.end;
    return un(this._table, n * this._tableRange + this._minPos, !0);
  }
}
const er = {
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
}, rh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, lh = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...er,
  ...rh
}, ch = Lr[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function pa(e) {
  return ri(e) ? Kn(e) : e;
}
function dh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return ri(t) ? new Proxy(e, {}) : e;
}
function uh(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function tr(e, t) {
  e.labels = t;
}
function ar(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function hh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return tr(a, e.labels), ar(a, e.datasets, t), a;
}
const fh = ce({
  props: lh,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = oe(null), s = ii(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: p } = e, g = hh(d, p), v = dh(g, d);
      s.value = new Xt(o.value, {
        type: c,
        data: v,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const c = Kn(s.value);
      c && (e.destroyDelay > 0 ? setTimeout(() => {
        c.destroy(), s.value = null;
      }, e.destroyDelay) : (c.destroy(), s.value = null));
    }, l = (c) => {
      c.update(e.updateMode);
    };
    return Ze(i), ct(r), Ee([
      () => e.options,
      () => e.data
    ], (c, d) => {
      let [h, f] = c, [p, g] = d;
      const v = Kn(s.value);
      if (!v)
        return;
      let y = !1;
      if (h) {
        const b = pa(h), x = pa(p);
        b && b !== x && (uh(v, b), y = !0);
      }
      if (f) {
        const b = pa(f.labels), x = pa(g.labels), _ = pa(f.datasets), w = pa(g.datasets);
        b !== x && (tr(v.config.data, b), y = !0), _ && _ !== w && (ar(v.config.data, _, e.datasetIdKey), y = !0);
      }
      y && je(() => {
        l(v);
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
        n.default ? n.default() : ""
      ])
    ]);
  }
});
function wo(e, t) {
  return Xt.register(t), ce({
    props: er,
    setup(a, n) {
      let { expose: o } = n;
      const s = ii(null), i = (r) => {
        s.value = r?.chart;
      };
      return o({
        chart: s
      }), () => Ve(fh, ch({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const gh = /* @__PURE__ */ wo("bar", ad), mh = /* @__PURE__ */ wo("line", sd), ph = /* @__PURE__ */ wo("pie", id), Ks = {
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
}, Ys = {
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
}, bh = [
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
function De(e) {
  const t = oe("light");
  let a = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Ys : Ks), r = () => {
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
  return Ze(() => {
    r();
  }), ct(() => {
    l();
  }), e && Ee(e, () => {
  }), {
    isDark: s,
    currentTheme: o,
    colors: i,
    detectedTheme: t,
    // Export color constants for direct access if needed
    lightColors: Ks,
    darkColors: Ys,
    chartSeriesColors: bh
  };
}
const Ua = 5, Co = 8, vh = /^x\d*$/, yh = /^y\d*$/;
function nr(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (vh.test(o) && (l.maxTicksLimit = Co, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), yh.test(o)) {
      if (i.type === "category") {
        i.ticks = l, n[o] = i;
        continue;
      }
      if (Array.isArray(l.values) && l.values.length > 0)
        l.maxTicksLimit = l.values.length;
      else if (l.stepSize != null) {
        const c = Number(i.min ?? i.suggestedMin ?? 0), d = Number(i.max ?? i.suggestedMax ?? 0), h = Number(l.stepSize);
        d > c && h > 0 ? l.maxTicksLimit = Math.floor((d - c) / h) + 1 : l.maxTicksLimit = Ua;
      } else
        l.maxTicksLimit = Ua;
    }
    i.ticks = l, n[o] = i;
  }
  return t.scales = n, t;
}
const it = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", xh = ["titleFont", "bodyFont", "footerFont"];
function or(e, t = it) {
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
      for (const l of xh) {
        const c = r[l];
        c && typeof c == "object" && (r[l] = { ...c, family: t });
      }
      o.tooltip = r;
    }
    a.plugins = o;
  }
  return a;
}
const Us = 10, kh = /* @__PURE__ */ ce({
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
    Xt.register(Qi, Ji, Vu, Gi, _o, ko), Xt.defaults.font.family = it;
    const { isDark: n, colors: o } = De(Me(a, "theme")), s = C(() => a.data), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f) => typeof f != "string" ? f : a.uppercaseLegendLabels ? f.toUpperCase() : i(f), l = (f, p) => f.length <= p ? f : `${f.slice(0, Math.max(1, p - 1))}…`;
    function c(f, p) {
      if (p == null) return f;
      if (Array.isArray(p) || typeof p != "object" || f == null || Array.isArray(f) || typeof f != "object") return p;
      const g = { ...f };
      for (const v of Object.keys(p)) {
        const y = p[v];
        y !== void 0 && (g[v] = c(f[v], y));
      }
      return g;
    }
    const d = C(() => {
      const f = {
        font: {
          family: it
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
                family: it,
                size: 13,
                weight: "500"
              },
              padding: 12,
              boxWidth: Us,
              boxHeight: Us,
              usePointStyle: !1,
              generateLabels: function(g) {
                return g.data.datasets.map((y, b) => {
                  const x = Array.isArray(y.backgroundColor) ? y.backgroundColor[0] : y.backgroundColor, _ = Array.isArray(y.borderColor) ? y.borderColor[0] : y.borderColor, w = typeof _ == "string" && _.length > 0 ? _ : typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
                  return {
                    text: r(y.label || ""),
                    fillStyle: typeof x == "string" ? x : w,
                    strokeStyle: w,
                    lineWidth: 0,
                    fontColor: w,
                    hidden: !g.isDatasetVisible(b),
                    index: b,
                    datasetIndex: b
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
              family: it,
              size: 13,
              weight: "600"
            },
            bodyFont: {
              family: it,
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
                v && (v += ": ");
                const b = (g.chart?.options?.indexAxis ?? "x") === "y" ? g.parsed.x : g.parsed.y;
                return b != null && (v += b), v;
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
              maxTicksLimit: Ua,
              font: {
                family: it,
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
            display: !0,
            stacked: a.stacked || !1,
            offset: !0,
            grid: {
              color: o.value.gridLines,
              lineWidth: 1,
              drawTicks: !1
            },
            ticks: {
              maxTicksLimit: Co,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: it,
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
      }, p = a.options ? c(f, a.options) : f;
      if (p.indexAxis === "y") {
        p.scales = p.scales ?? {}, p.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...p.scales.x
        };
        const { beginAtZero: g, ticks: v, ...y } = p.scales.y ?? {}, b = a.data.labels?.length ?? 0, x = a.categoryLabelMaxLength ?? 20;
        p.scales.y = {
          type: "category",
          ...y,
          ticks: {
            ...v,
            autoSkip: !1,
            maxTicksLimit: b > 0 ? b : Ua,
            callback: function(_) {
              const w = this.getLabelForValue(_), $ = typeof w == "string" ? w : String(w ?? "");
              return l($, x);
            }
          }
        };
      }
      return or(
        nr(p)
      );
    }), h = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (f, p) => (m(), k("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: Ce({ height: `${h.value}px` })
    }, [
      N(P(gh), {
        data: s.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), be = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, kt = /* @__PURE__ */ be(kh, [["__scopeId", "data-v-1d64fb88"]]), _h = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, wh = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, Ch = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, $h = ["aria-pressed", "aria-label", "onClick"], Sh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Mh = /* @__PURE__ */ ce({
  __name: "ChartLine",
  props: {
    data: {},
    options: {},
    uppercaseLegendLabels: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Xt.register(
      Qi,
      Ji,
      Pu,
      Lu,
      Gi,
      _o,
      ko
    ), Xt.defaults.font.family = it;
    const n = oe(null), { isDark: o, colors: s } = De(Me(a, "theme")), i = C(() => s.value.bgCard), r = C(() => {
      const y = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((b) => {
          const x = b.borderColor, _ = Array.isArray(x) ? x[0] : x, w = typeof _ == "string" && _.length > 0 ? _ : s.value.textSecondary, $ = b.pointBackgroundColor !== void 0 ? b.pointBackgroundColor : y, D = b.pointHoverBackgroundColor !== void 0 ? b.pointHoverBackgroundColor : $, S = b.pointBorderWidth ?? 2, I = b.pointHoverBorderWidth ?? S;
          return {
            ...b,
            fill: b.fill ?? !1,
            clip: b.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: D,
            pointBorderColor: b.pointBorderColor ?? w,
            pointHoverBorderColor: b.pointHoverBorderColor ?? w,
            pointBorderWidth: S,
            pointHoverBorderWidth: I
          };
        })
      };
    }), l = (y) => typeof y == "string" ? y.charAt(0).toUpperCase() + y.slice(1).toLowerCase() : y, c = (y) => typeof y != "string" ? y : a.uppercaseLegendLabels ? y.toUpperCase() : l(y);
    function d(y) {
      const b = y.borderColor, x = Array.isArray(b) ? b[0] : b;
      return typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
    }
    const h = C(
      () => r.value.datasets.map((y, b) => ({
        key: `${y.label ?? "dataset"}-${b}`,
        label: c(y.label || ""),
        color: d(y)
      }))
    ), f = oe([]);
    Ee(
      () => r.value.datasets.length,
      (y) => {
        const b = Array.from({ length: y }, (x, _) => f.value[_] ?? !0);
        f.value = b;
      },
      { immediate: !0 }
    );
    function p(y) {
      const x = n.value?.chart;
      if (!x || y < 0 || y >= x.data.datasets.length) return;
      const _ = !x.isDatasetVisible(y);
      x.setDatasetVisibility(y, _), f.value[y] = _, x.update();
    }
    function g(y, b) {
      if (b == null) return y;
      if (Array.isArray(b) || typeof b != "object" || y == null || Array.isArray(y) || typeof y != "object") return b;
      const x = { ...y };
      for (const _ of Object.keys(b)) {
        const w = b[_];
        w !== void 0 && (x[_] = g(y[_], w));
      }
      return x;
    }
    const v = C(() => {
      const y = {
        font: {
          family: it
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
              family: it,
              size: 14,
              weight: "600"
            },
            bodyFont: {
              family: it,
              size: 13
            },
            callbacks: {
              title: function(_) {
                return _.length > 0 ? String(l(_[0].label)) : "";
              },
              label: function(_) {
                let w = String(l(_.dataset.label || ""));
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
              maxTicksLimit: Co,
              autoSkip: !0,
              autoSkipPadding: 8,
              minRotation: 0,
              maxRotation: 0,
              font: {
                family: it,
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
              maxTicksLimit: Ua,
              font: {
                family: it,
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
      }, b = a.options ? g(y, a.options) : y;
      return or(
        nr(b)
      );
    });
    return t({ isDark: o }), (y, b) => (m(), k("div", _h, [
      u("div", wh, [
        N(P(mh), {
          ref_key: "lineChartRef",
          ref: n,
          data: r.value,
          options: v.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (m(), k("ul", Ch, [
        (m(!0), k(re, null, ge(h.value, (x, _) => (m(), k("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: Z(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", f.value[_] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Ce({ color: x.color }),
            "aria-pressed": f.value[_] !== !1,
            "aria-label": `${x.label}. ${f.value[_] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => p(_)
          }, [
            u("span", Sh, [
              b[0] || (b[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Ce({ borderColor: x.color })
              }, null, 4),
              b[1] || (b[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(x.label), 1)
          ], 14, $h)
        ]))), 128))
      ])) : F("", !0)
    ]));
  }
}), bt = /* @__PURE__ */ be(Mh, [["__scopeId", "data-v-426e23d5"]]), Dh = { class: "chart-container" }, Ah = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Th = /* @__PURE__ */ ce({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Xt.register(_u, _o, ko);
    const { isDark: n, colors: o } = De(Me(a, "theme")), s = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = C(() => a.options ? a.options : {
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
              family: Ah,
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
                const p = l.getDatasetMeta(0).controller.getStyle(h), v = c.datasets[0].data[h], y = typeof p.backgroundColor == "string" && p.backgroundColor.length > 0 ? p.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${v}`,
                  fillStyle: p.backgroundColor,
                  strokeStyle: p.borderColor,
                  lineWidth: p.borderWidth,
                  lineDash: p.borderDash,
                  lineDashOffset: p.borderDashOffset,
                  lineJoin: p.borderJoinStyle,
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
              const c = l.label || "", d = l.parsed || 0, h = l.dataset.data.reduce((p, g) => p + g, 0), f = (d / h * 100).toFixed(1);
              return `${i(c)}: ${d} (${f}%)`;
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
    return t({ isDark: n }), (l, c) => (m(), k("div", Dh, [
      N(P(ph), {
        data: P(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Dn = /* @__PURE__ */ be(Th, [["__scopeId", "data-v-0f7806d6"]]), Bh = { class: "chart-container" }, Lh = ["viewBox"], Ph = ["transform"], Ih = ["x", "width", "fill", "stroke"], Eh = ["fill"], Rh = ["x1", "y1", "x2", "y2", "stroke"], Fh = ["points", "fill"], Oh = ["x1", "y1", "x2", "y2", "stroke"], Vh = ["x", "y", "fill"], zh = ["x1", "y1", "x2", "y2", "stroke"], Nh = ["points", "fill"], jh = ["transform"], Hh = ["y1", "y2"], Wh = ["y1", "y2"], Kh = ["y1", "y2"], Yh = ["y1", "y2"], Uh = ["y", "height"], qh = ["y1", "y2"], Xh = ["y1", "y2"], Gh = ["y1", "y2"], Zh = ["y1", "y2"], Qh = ["y", "height"], Jh = ["cy", "stroke", "onMouseenter"], ef = ["cy", "stroke", "onMouseenter"], tf = ["cy", "stroke", "onMouseenter"], af = ["cy", "stroke", "onMouseenter"], nf = ["y1", "y2", "onMouseenter"], of = ["y1", "y2", "onMouseenter"], sf = ["x", "y", "fill"], rf = ["x", "y", "fill"], lf = ["transform"], cf = { transform: "translate(-200, 0)" }, df = ["stroke"], uf = ["fill"], hf = { transform: "translate(-130, 0)" }, ff = ["stroke"], gf = ["fill"], mf = { transform: "translate(-60, 0)" }, pf = ["stroke"], bf = ["fill"], vf = { transform: "translate(10, 0)" }, yf = ["stroke"], xf = ["fill"], kf = { transform: "translate(80, 0)" }, _f = ["fill"], wf = { transform: "translate(150, 0)" }, Cf = ["fill"], $f = /* @__PURE__ */ ce({
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
    const a = e, { isDark: n } = De(Me(a, "theme")), o = C(() => ({
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
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, p) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const v = g.getBoundingClientRect(), y = g.createSVGPoint();
      y.x = f.clientX - v.left, y.y = f.clientY - v.top, s.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: p
      };
    }, l = (f) => {
      if (s.value.visible) {
        const p = f.currentTarget, g = p.getBoundingClientRect(), v = p.createSVGPoint();
        v.x = f.clientX - g.left, v.y = f.clientY - g.top, s.value.x = v.x, s.value.y = v.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const f = [], g = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let v = 1; v <= 10; v++) {
        const y = v, b = (y - 1) / 9, x = a.chartMargin + g - b * g;
        f.push({ value: y, y: x });
      }
      return f;
    });
    return t({ isDark: n }), (f, p) => (m(), k("div", Bh, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
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
          }, null, 8, Ih),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Eh)
        ], 8, Ph)) : F("", !0),
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
        }, null, 8, Fh),
        (m(!0), k(re, null, ge(h.value, (g, v) => (m(), k(re, { key: v }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Oh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(g.value), 9, Vh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, zh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, Nh),
        (m(!0), k(re, null, ge(e.boxplotData, (g, v) => (m(), k(re, { key: v }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (m(), k(re, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Hh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Kh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Yh),
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
              }, null, 8, Uh)
            ], 64)) : (m(), k(re, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, qh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Xh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Gh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Zh),
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
              }, null, 8, Qh)
            ], 64)),
            u("circle", {
              cx: 0,
              cy: g.minY,
              r: "6",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Min: ${g.min.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, Jh),
            u("circle", {
              cx: 0,
              cy: g.q1Y,
              r: "6",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q1: ${g.q1.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, ef),
            u("circle", {
              cx: 0,
              cy: g.q3Y,
              r: "6",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Q3: ${g.q3.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, tf),
            u("circle", {
              cx: 0,
              cy: g.maxY,
              r: "6",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (y) => r(y, `Max: ${g.max.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, af),
            u("line", {
              x1: -24,
              y1: g.medianY,
              x2: 24,
              y2: g.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3.5",
              class: "hover-line",
              onMouseenter: (y) => r(y, `Median: ${g.median.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, nf),
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
              onMouseenter: (y) => r(y, `Avg: ${g.average.toFixed(1)}`),
              onMouseleave: d,
              style: { cursor: "pointer" }
            }, null, 40, of)) : F("", !0)
          ], 8, jh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(g.label)), 9, sf),
          g.responseCount ? (m(), k("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(g.responseCount), 9, rf)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), k("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", cf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, df),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, uf)
          ]),
          u("g", hf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ff),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q1 ", 8, gf)
          ]),
          u("g", mf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, pf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Q3 ", 8, bf)
          ]),
          u("g", vf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, yf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, xf)
          ]),
          u("g", kf, [
            p[0] || (p[0] = u("line", {
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
            }, " Avg ", 8, _f)
          ]),
          u("g", wf, [
            p[1] || (p[1] = u("line", {
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
            }, " Median ", 8, Cf)
          ])
        ], 8, lf)) : F("", !0)
      ], 44, Lh))
    ]));
  }
}), Sf = /* @__PURE__ */ be($f, [["__scopeId", "data-v-9ac5c075"]]), Mf = { class: "chart-container" }, Df = ["viewBox"], Af = ["x1", "y1", "x2", "y2", "stroke"], Tf = ["points", "fill"], Bf = ["x1", "y1", "x2", "y2", "stroke"], Lf = ["x1", "y1", "x2", "y2", "stroke"], Pf = ["x", "y", "fill"], If = ["x", "y", "fill", "transform"], Ef = ["x1", "y1", "x2", "y2", "stroke"], Rf = ["points", "fill"], Ff = ["transform"], Of = ["y1", "y2", "stroke", "onMouseenter"], Vf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], zf = ["x1", "y1", "x2", "y2", "onMouseenter"], Nf = ["x1", "y1", "x2", "y2", "onMouseenter"], jf = ["cy", "stroke", "onMouseenter"], Hf = ["cy", "stroke", "onMouseenter"], Wf = ["x", "y", "fill"], Kf = ["x", "y", "fill"], Yf = ["transform"], Uf = { transform: "translate(-180, 0)" }, qf = ["stroke"], Xf = ["fill"], Gf = { transform: "translate(-120, 0)" }, Zf = ["fill"], Qf = { transform: "translate(-60, 0)" }, Jf = ["fill"], eg = { transform: "translate(0, 0)" }, tg = ["stroke"], ag = ["fill"], ng = { transform: "translate(60, 0)" }, og = ["fill"], sg = { transform: "translate(130, 0)" }, ig = ["fill"], rg = ["transform"], lg = ["x", "y", "width", "height", "fill", "stroke"], cg = ["y", "fill"], dg = ["y", "fill"], hn = 10, ug = 14, jn = 13, qs = 4, Xs = 12, hg = /* @__PURE__ */ ce({
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
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = hn + jn + qs + Xs + hn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(x, _, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * _ * $);
    }
    function l(x, _) {
      return Math.max(
        r(x.length, jn, !0),
        r(_.length, Xs, !1),
        52
      ) + ug * 2;
    }
    function c(x, _, w, $) {
      const D = w / 2, S = 6, I = Math.min(
        Math.max(x, D + S),
        a.chartWidth - D - S
      ), V = S + $ + 10, O = a.chartHeight - S + 10, M = Math.min(Math.max(_, V), O);
      return { x: I, y: M };
    }
    const d = C(() => ({
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
    }), f = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, p = (x, _, w) => {
      const $ = x.currentTarget.closest("svg");
      if (!$) return;
      const D = $.getBoundingClientRect(), S = $.createSVGPoint();
      S.x = x.clientX - D.left, S.y = x.clientY - D.top;
      let I = f(_.label), V = "";
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
      const O = l(I, V), M = s;
      let B = S.x, T = S.y - 20;
      const z = c(B, T, O, M);
      B = z.x, T = z.y, h.value = {
        visible: !0,
        x: B,
        y: T,
        title: I,
        text: V,
        width: O,
        height: M
      };
    }, g = (x) => {
      if (h.value.visible) {
        const _ = x.currentTarget, w = _.getBoundingClientRect(), $ = _.createSVGPoint();
        $.x = x.clientX - w.left, $.y = x.clientY - w.top;
        let D = $.x, S = $.y - 20;
        const I = c(D, S, h.value.width, h.value.height);
        h.value.x = I.x, h.value.y = I.y;
      }
    }, v = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, b = C(() => {
      const x = [], w = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const D = $, S = (D - 1) / 9, I = a.chartMargin + w - S * w;
        x.push({ value: D, y: I });
      }
      return x;
    });
    return t({ isDark: n }), (x, _) => (m(), k("div", Mf, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Ce(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: v
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
        }, null, 8, Af),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Tf),
        (m(!0), k(re, null, ge(b.value, (w, $) => (m(), k("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Bf))), 128)),
        (m(!0), k(re, null, ge(b.value, (w, $) => (m(), k(re, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Lf),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, Pf)
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
        }, A(f(e.yAxisLabel)), 9, If),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, Ef),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Rf),
        (m(!0), k(re, null, ge(e.candlestickData, (w, $) => (m(), k(re, { key: $ }, [
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
              onMouseenter: (D) => p(D, w, "wick"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Of),
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
              onMouseenter: (D) => p(D, w, "body"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Vf),
            w.medianY ? (m(), k("line", {
              key: 0,
              x1: -e.candleWidth / 2,
              y1: w.medianY,
              x2: e.candleWidth / 2,
              y2: w.medianY,
              stroke: "#8b5cf6",
              "stroke-width": "3",
              class: "hover-line",
              onMouseenter: (D) => p(D, w, "median"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, zf)) : F("", !0),
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
              onMouseenter: (D) => p(D, w, "average"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Nf)) : F("", !0),
            u("circle", {
              cx: 0,
              cy: w.lowY,
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => p(D, w, "min"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, jf),
            u("circle", {
              cx: 0,
              cy: w.highY,
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "2",
              class: "hover-circle",
              onMouseenter: (D) => p(D, w, "max"),
              onMouseleave: y,
              style: { cursor: "pointer" }
            }, null, 40, Hf)
          ], 8, Ff),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(f(w.label)), 9, Wf),
          w.responseCount ? (m(), k("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Kf)) : F("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), k("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", Uf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, qf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Xf)
          ]),
          u("g", Gf, [
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
            }, " Q1 ", 8, Zf)
          ]),
          u("g", Qf, [
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
            }, " Q3 ", 8, Jf)
          ]),
          u("g", eg, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, tg),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, ag)
          ]),
          u("g", ng, [
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
            }, " Avg ", 8, og)
          ]),
          u("g", sg, [
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
            }, " Median ", 8, ig)
          ])
        ], 8, Yf)) : F("", !0),
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
          }, null, 8, lg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + hn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, cg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + hn + jn + qs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, dg)
        ], 8, rg)) : F("", !0)
      ], 44, Df))
    ]));
  }
}), fg = /* @__PURE__ */ be(hg, [["__scopeId", "data-v-22efd66d"]]), gg = ["viewBox"], mg = ["x1", "y1", "x2", "y2", "stroke"], pg = ["x1", "y1", "x2", "y2", "stroke"], bg = ["points", "fill"], vg = ["x1", "y1", "x2", "y2", "stroke"], yg = ["x", "y", "fill"], xg = ["x", "y", "fill", "transform"], kg = ["x1", "y1", "x2", "y2", "stroke"], _g = ["points", "fill"], wg = ["x1", "y1", "x2", "y2", "stroke"], Cg = ["x", "y", "fill"], $g = ["x", "y", "fill"], Sg = ["d"], Mg = ["x", "y", "width", "height", "onMouseenter"], Dg = ["x1", "y1", "x2", "y2"], Ag = ["x", "y"], Tg = ["x1", "y1", "x2", "y2"], Bg = ["x", "y"], Lg = ["x1", "y1", "x2", "y2"], Pg = ["x", "y"], Ig = ["x1", "y1", "x2", "y2"], Eg = ["x", "y"], Rg = ["x1", "y1", "x2", "y2"], Fg = ["x", "y"], Og = ["x1", "y1", "x2", "y2"], Vg = ["x", "y"], zg = ["transform"], Ng = { transform: "translate(-220, 0)" }, jg = ["fill"], Hg = { transform: "translate(-140, 0)" }, Wg = ["fill"], Kg = { transform: "translate(-80, 0)" }, Yg = ["fill"], Ug = { transform: "translate(-20, 0)" }, qg = ["fill"], Xg = { transform: "translate(60, 0)" }, Gg = ["fill"], Zg = { transform: "translate(130, 0)" }, Qg = ["fill"], Jg = { transform: "translate(180, 0)" }, em = ["fill"], tm = ["transform"], am = ["x", "y", "width", "height", "fill", "stroke"], nm = ["y", "fill"], om = ["y", "fill"], fn = 10, sm = 14, Hn = 13, Gs = 12, Zs = 4, im = /* @__PURE__ */ ce({
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
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = fn + Hn + Zs + Gs + fn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(X, J, ne) {
      const fe = ne ? 0.6 : 0.535;
      return Math.ceil(Math.max(X, 1) * J * fe);
    }
    function l(X, J) {
      return Math.max(
        r(X.length, Hn, !0),
        r(J.length, Gs, !1),
        52
      ) + sm * 2;
    }
    function c(X, J, ne, fe) {
      const xe = ne / 2, E = 6, G = Math.min(
        Math.max(X, xe + E),
        a.chartWidth - xe - E
      ), ie = E + fe + 10, he = a.chartHeight - E + 10, ye = Math.min(Math.max(J, ie), he);
      return { x: G, y: ye };
    }
    const d = C(() => ({
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
    }), f = C(
      () => a.chartMarginRight ?? a.chartMargin
    ), p = C(() => a.chartMargin + a.plotInset), g = C(
      () => a.chartWidth - f.value - a.plotInset
    ), v = C(() => Math.max(g.value - p.value, 1)), y = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), b = C(() => v.value / 10 * 0.52);
    function x(X) {
      if (X < 1 || X > 10) return null;
      const J = v.value / 10;
      return p.value + (X - 0.5) * J;
    }
    const _ = C(
      () => Array.from({ length: 10 }, (X, J) => {
        const ne = J + 1, fe = x(ne);
        return fe === null ? null : { score: ne, x: fe };
      }).filter((X) => X !== null)
    ), w = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const X = Math.max(...a.histogram.map((ne) => ne.count || 0), 1), J = Math.max(1, Math.ceil(X * 0.2));
      return X + J;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const X = a.averageScore || 0;
      let J = 0, ne = 0;
      if (a.histogram.forEach((xe) => {
        const E = xe.count || 0;
        J += E;
        const G = xe.score - X;
        ne += E * (G * G);
      }), J === 0) return 1;
      const fe = ne / J;
      return Math.sqrt(fe) || 1;
    }), D = (X, J, ne) => {
      if (ne === 0) return 0;
      const fe = 1 / (ne * Math.sqrt(2 * Math.PI)), xe = -0.5 * Math.pow((X - J) / ne, 2);
      return fe * Math.exp(xe);
    }, S = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const X = a.averageScore, J = $.value, ne = 100, xe = Math.max(...a.histogram.map((he) => he.count || 0), 1) / w.value * y.value;
      if (xe <= 0) return null;
      let E = 0;
      for (let he = 0; he <= ne; he++) {
        const ye = 1 + 9 * (he / ne), we = D(ye, X, J);
        we > E && (E = we);
      }
      if (E <= 0) return null;
      const G = xe / E, ie = [];
      for (let he = 0; he <= ne; he++) {
        const ye = 1 + 9 * (he / ne), we = D(ye, X, J) * G, Ye = x(ye);
        if (Ye !== null) {
          const vt = a.chartHeight - a.chartBottomMargin - we;
          ie.push(`${he === 0 ? "M" : "L"} ${Ye} ${vt}`);
        }
      }
      return ie.join(" ");
    }), I = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const X = v.value / 10;
      return a.histogram.map((J) => {
        const ne = Number(J.score);
        if (!Number.isFinite(ne) || ne < 1 || ne > 10)
          return null;
        const fe = p.value + (ne - 0.5) * X, xe = J.count > 0 ? J.count / w.value * y.value : 0, E = a.chartHeight - a.chartBottomMargin - xe;
        return {
          score: ne,
          count: J.count,
          x: fe,
          y: E,
          height: xe
        };
      }).filter((J) => J !== null);
    }), V = C(() => x(a.minScore)), O = C(() => x(a.maxScore)), M = C(() => x(a.q1Score)), B = C(() => x(a.medianScore)), T = C(() => x(a.q3Score)), z = C(() => x(a.averageScore)), H = C(() => a.minScore), q = C(() => a.maxScore), ae = C(() => a.q1Score), ue = C(() => a.medianScore), me = C(() => a.q3Score), U = C(() => a.averageScore), L = C(() => {
      const X = [], J = a.chartMargin - 8, ne = 18;
      M.value !== null && X.push({
        x: M.value,
        y: J,
        value: a.q1Score,
        label: `Q1: ${ae.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), B.value !== null && X.push({
        x: B.value,
        y: J - ne,
        value: a.medianScore,
        label: `Median: ${ue.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), z.value !== null && X.push({
        x: z.value,
        y: J - ne,
        value: a.averageScore,
        label: `Avg: ${U.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), T.value !== null && X.push({
        x: T.value,
        y: J,
        value: a.q3Score,
        label: `Q3: ${me.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), X.sort((E, G) => (E.x || 0) - (G.x || 0));
      const fe = [[], [], []];
      X.forEach((E) => {
        if (E.x === null) return;
        let G = -1;
        for (let ie = 0; ie < fe.length; ie++) {
          let he = !1;
          for (const ye of fe[ie]) {
            if (ye.x === null) continue;
            const we = Math.abs(E.x - ye.x), Ye = (E.width + ye.width) / 2 + 10;
            if (we < Ye) {
              he = !0;
              break;
            }
          }
          if (!he) {
            G = ie;
            break;
          }
        }
        G === -1 && (G = fe.length - 1), E.y = J - G * ne, fe[G].push(E);
      });
      const xe = 15;
      return X.forEach((E) => {
        E.y < xe && (E.y = xe);
      }), X;
    }), K = (X) => L.value.find((ne) => ne.id === X)?.y || a.chartMargin - 10, Y = C(() => {
      const X = [];
      for (let ne = 0; ne <= 5; ne++) {
        const fe = Math.round(w.value / 5 * ne), xe = a.chartHeight - a.chartBottomMargin - ne / 5 * y.value;
        X.push({ value: fe, y: xe });
      }
      return X;
    });
    function le(X, J, ne) {
      const fe = X.createSVGPoint();
      fe.x = J, fe.y = ne;
      const xe = X.getScreenCTM();
      if (!xe) {
        const G = X.getBoundingClientRect();
        return { x: J - G.left, y: ne - G.top };
      }
      const E = fe.matrixTransform(xe.inverse());
      return { x: E.x, y: E.y };
    }
    const ve = (X, J) => {
      a.interactive && W(X, J);
    }, Q = () => {
      a.interactive && se();
    }, W = (X, J) => {
      const ne = X.currentTarget.closest("svg");
      if (!ne) return;
      const { x: fe, y: xe } = le(ne, X.clientX, X.clientY), E = `Score: ${J.score}`, G = `Count: ${Number(J.count ?? 0).toLocaleString()}`, ie = l(E, G), he = s, ye = typeof J?.x == "number" ? J.x : fe;
      let we = xe - 20;
      const Ye = c(ye, we, ie, he);
      h.value = {
        visible: !0,
        x: Ye.x,
        y: Ye.y,
        title: E,
        text: G,
        width: ie,
        height: he,
        anchorX: typeof J?.x == "number" ? J.x : null
      };
    }, j = (X) => {
      if (a.interactive && h.value.visible) {
        const J = X.currentTarget, { x: ne, y: fe } = le(J, X.clientX, X.clientY), xe = h.value.anchorX, E = xe != null && Number.isFinite(xe) ? xe : ne;
        let G = fe - 20;
        const ie = c(E, G, h.value.width, h.value.height);
        h.value.x = ie.x, h.value.y = ie.y;
      }
    }, te = () => {
      se();
    }, se = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: n }), (X, J) => (m(), k("div", {
      class: Z(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (m(), k("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: j,
        onMouseleave: te
      }, [
        J[7] || (J[7] = u("defs", null, [
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
        (m(!0), k(re, null, ge(Y.value, (ne, fe) => (m(), k("line", {
          key: `grid-${fe}`,
          x1: p.value,
          y1: ne.y,
          x2: g.value,
          y2: ne.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, mg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, pg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, bg),
        (m(!0), k(re, null, ge(Y.value, (ne, fe) => (m(), k(re, {
          key: `y-tick-${fe}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: ne.y,
            x2: e.chartMargin,
            y2: ne.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, vg),
          u("text", {
            x: e.chartMargin - 12,
            y: ne.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(ne.value), 9, yg)
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
        }, " Count ", 8, xg),
        u("line", {
          x1: p.value,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: g.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, kg),
        u("polygon", {
          points: `${g.value - 4},${e.chartHeight - e.chartBottomMargin - 4} ${g.value - 4},${e.chartHeight - e.chartBottomMargin + 4} ${g.value},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, _g),
        (m(!0), k(re, null, ge(_.value, (ne) => (m(), k(re, {
          key: `tick-${ne.score}`
        }, [
          u("line", {
            x1: ne.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: ne.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, wg),
          u("text", {
            x: ne.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(ne.score), 9, Cg)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, $g),
        S.value ? (m(), k("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Sg)) : F("", !0),
        (m(!0), k(re, null, ge(I.value, (ne, fe) => (m(), k("rect", {
          key: `bar-${fe}`,
          x: ne.x - b.value / 2,
          y: ne.y,
          width: b.value,
          height: ne.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (xe) => ve(xe, ne),
          onMouseleave: Q,
          style: Ce({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Mg))), 128)),
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
        }, null, 8, Dg)) : F("", !0),
        e.showStatLabels && V.value ? (m(), k("text", {
          key: 2,
          x: V.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(H.value.toFixed(1)), 9, Ag)) : F("", !0),
        e.showStatLabels && M.value ? (m(), k("line", {
          key: 3,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Tg)) : F("", !0),
        e.showStatLabels && M.value ? (m(), k("text", {
          key: 4,
          x: M.value,
          y: K("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(ae.value.toFixed(1)), 9, Bg)) : F("", !0),
        e.showStatLabels && B.value ? (m(), k("line", {
          key: 5,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Lg)) : F("", !0),
        e.showStatLabels && B.value ? (m(), k("text", {
          key: 6,
          x: B.value,
          y: K("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(ue.value.toFixed(1)), 9, Pg)) : F("", !0),
        e.showStatLabels && z.value ? (m(), k("line", {
          key: 7,
          x1: z.value,
          y1: e.chartMargin,
          x2: z.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Ig)) : F("", !0),
        e.showStatLabels && z.value ? (m(), k("text", {
          key: 8,
          x: z.value,
          y: K("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(U.value.toFixed(1)), 9, Eg)) : F("", !0),
        e.showStatLabels && T.value ? (m(), k("line", {
          key: 9,
          x1: T.value,
          y1: e.chartMargin,
          x2: T.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Rg)) : F("", !0),
        e.showStatLabels && T.value ? (m(), k("text", {
          key: 10,
          x: T.value,
          y: K("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(me.value.toFixed(1)), 9, Fg)) : F("", !0),
        e.showStatLabels && O.value ? (m(), k("line", {
          key: 11,
          x1: O.value,
          y1: e.chartMargin,
          x2: O.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Og)) : F("", !0),
        e.showStatLabels && O.value ? (m(), k("text", {
          key: 12,
          x: O.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(q.value.toFixed(1)), 9, Vg)) : F("", !0),
        e.showLegend ? (m(), k("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", Ng, [
            J[0] || (J[0] = u("line", {
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
            }, " Gaussian ", 8, jg)
          ]),
          u("g", Hg, [
            J[1] || (J[1] = u("line", {
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
            }, " Min ", 8, Wg)
          ]),
          u("g", Kg, [
            J[2] || (J[2] = u("line", {
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
            }, " Q1 ", 8, Yg)
          ]),
          u("g", Ug, [
            J[3] || (J[3] = u("line", {
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
            }, " Median ", 8, qg)
          ]),
          u("g", Xg, [
            J[4] || (J[4] = u("line", {
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
            }, " Avg ", 8, Gg)
          ]),
          u("g", Zg, [
            J[5] || (J[5] = u("line", {
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
            }, " Q3 ", 8, Qg)
          ]),
          u("g", Jg, [
            J[6] || (J[6] = u("line", {
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
            }, " Max ", 8, em)
          ])
        ], 8, zg)) : F("", !0),
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
          }, null, 8, am),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + fn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, nm),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + fn + Hn + Zs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, om)
        ], 8, tm)) : F("", !0)
      ], 44, gg))
    ], 2));
  }
}), sr = /* @__PURE__ */ be(im, [["__scopeId", "data-v-8f9da805"]]), rm = 639, ir = 1024;
function Qs(e) {
  return e < 640 ? "mobile" : e <= ir ? "tablet" : "desktop";
}
function lm() {
  const e = oe(
    typeof window > "u" ? "desktop" : Qs(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Qs(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Ze(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${rm}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${ir}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
      t();
    }, a.addEventListener("change", s), n.addEventListener("change", s), o.addEventListener("change", s));
  }), ct(() => {
    !s || !a || !n || !o || (a.removeEventListener("change", s), n.removeEventListener("change", s), o.removeEventListener("change", s));
  });
  const i = C(() => e.value === "mobile"), r = C(() => e.value === "tablet"), l = C(() => e.value === "desktop");
  return {
    breakpoint: e,
    isMobile: i,
    isTablet: r,
    isDesktop: l
  };
}
const cm = { class: "chart-container" }, dm = {
  key: 0,
  class: "loading-state loading-overlay"
}, na = 12, um = /* @__PURE__ */ ce({
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
    To.use([Ir, Er, Rr, Fr]);
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), { breakpoint: s } = lm(), i = oe(null), r = oe(!0), l = oe(!1);
    let c = null, d = null;
    const h = {
      animation: { duration: 1e3, easing: "cubicOut" },
      margins: { left: "3%", right: "8%", top: "2%", bottom: "2%" },
      node: { width: 88, gap: 24, align: "left", iterations: 0 },
      style: {
        shadowBlur: 0,
        shadowColor: "transparent"
      }
    }, f = {
      success: "#66BB6A",
      abandon: "#FFA726",
      error: "#EF5350"
    }, p = {
      success: 0,
      abandon: 1,
      error: 2
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, v = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, y = C(() => {
      const Q = s.value;
      return Q === "mobile" ? {
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
      } : Q === "tablet" ? {
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
    }), b = (Q) => {
      const W = Q.replace(/_/g, " ").replace(/\s+/g, " ").trim(), j = W.match(/^Failed:\s*(.+)$/i);
      return j ? `Failed:
${j[1].trim()}` : W;
    }, x = (Q, W) => {
      const j = Q.trim();
      if (!j || W < 1 || j.length <= W) return j;
      const te = [];
      let se = 0;
      for (; se < j.length; ) {
        const X = Math.min(se + W, j.length);
        if (X >= j.length) {
          const fe = j.slice(se).trim();
          fe && te.push(fe);
          break;
        }
        const J = j.slice(se, X), ne = J.lastIndexOf(" ");
        if (ne > 0)
          for (te.push(j.slice(se, se + ne).trim()), se += ne; se < j.length && j[se] === " "; ) se += 1;
        else
          te.push(J), se = X;
      }
      return te.join(`
`);
    }, _ = (Q, W) => {
      const j = Q.trim();
      return !j || W < 1 ? Q : j.split(`
`).map((te) => x(te.trim(), W)).filter(Boolean).join(`
`);
    }, w = (Q) => Q.status ? Q.status : g.test(Q.name) ? "abandon" : v.test(Q.name) ? "error" : "success", $ = (Q) => Q.originalValue ?? Q.value, D = (Q, W) => {
      const j = new Set(W.map((se) => se.target)), te = Q.filter((se) => !j.has(se.name));
      for (const se of te) {
        if (typeof se.value == "number" && se.value > 0) return se.value;
        const X = W.filter((J) => J.source === se.name);
        if (X.length > 0)
          return X.reduce((J, ne) => J + $(ne), 0);
      }
      return W.reduce((se, X) => Math.max(se, $(X)), 0);
    }, S = (Q, W) => {
      const j = /* @__PURE__ */ new Map(), te = new Set(W.map((X) => X.target)), se = Q.filter((X) => !te.has(X.name)).map((X) => ({ name: X.name, depth: 0 }));
      for (; se.length > 0; ) {
        const { name: X, depth: J } = se.shift(), ne = j.get(X);
        if (!(ne !== void 0 && ne >= J)) {
          j.set(X, J);
          for (const fe of W)
            fe.source === X && se.push({ name: fe.target, depth: J + 1 });
        }
      }
      for (const X of Q)
        j.has(X.name) || j.set(X.name, 0);
      return j;
    }, I = (Q, W) => {
      const j = /* @__PURE__ */ new Map(), te = new Set(W.map((ne) => ne.target)), se = Q.filter((ne) => !te.has(ne.name));
      let X = 0;
      const J = (ne) => {
        let fe = ne;
        for (; fe && !j.has(fe); )
          j.set(fe, X), X += 1, fe = W.filter(
            (E) => E.source === fe && w({ name: E.target }) === "success"
          ).sort((E, G) => $(G) - $(E))[0]?.target;
      };
      return se.forEach((ne) => J(ne.name)), j;
    }, V = (Q, W, j) => {
      const te = w(Q);
      if (te === "success" && j.has(Q.name))
        return j.get(Q.name);
      if (te === "success") {
        const se = W.filter((J) => J.target === Q.name);
        return 200 + (se.length ? Math.min(
          ...se.map(
            (J) => j.has(J.source) ? (j.get(J.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return te === "abandon" ? 1e3 : 2e3;
    }, O = (Q, W) => {
      const j = S(Q, W), te = I(Q, W);
      return [...Q].sort((se, X) => {
        const J = j.get(se.name) ?? 0, ne = j.get(X.name) ?? 0;
        if (J !== ne) return J - ne;
        const fe = p[w(se)], xe = p[w(X)];
        if (fe !== xe) return fe - xe;
        const E = V(se, W, te), G = V(X, W, te);
        if (E !== G) return E - G;
        const ie = typeof se.order == "number" ? se.order : Number.MAX_SAFE_INTEGER, he = typeof X.order == "number" ? X.order : Number.MAX_SAFE_INTEGER;
        return ie !== he ? ie - he : se.name.localeCompare(X.name);
      });
    }, M = (Q, W, j, te) => {
      const X = _(Q, te).split(`
`), J = W * 0.58, fe = Math.max(...X.map((E) => E.length), 1) * J, xe = X.length * j;
      return {
        lines: X,
        width: fe,
        height: xe,
        nodeWidth: fe + na * 2
      };
    }, B = (Q, W) => W ? `${(Q / W * 100).toFixed(1)}%` : "0.0%", T = (Q, W) => typeof Q.label == "string" && Q.label ? _(b(Q.label), W) : _(b(Q.name), W), z = (Q, W = 0) => {
      if (W > 0) return W;
      const j = Q.match(/^(\d+(?:\.\d+)?)px$/);
      if (j) return Number(j[1]);
      const te = Q.match(/^(\d+(?:\.\d+)?)vh$/);
      return te && typeof window < "u" ? Number(te[1]) / 100 * window.innerHeight : 500;
    }, H = (Q, W, j, te, se) => {
      if (!W.length || !Q.length || se <= 0) return Q;
      const X = Q.map((he) => ({ ...he })), J = j.labelLineHeight || Math.round(j.labelFontSize * 1.25), ne = Math.max(4, j.labelCharsPerLine), fe = Math.max(te * 0.88, 260), xe = S(W, X), E = /* @__PURE__ */ new Map();
      W.forEach((he) => {
        const ye = xe.get(he.name) ?? 0;
        E.set(ye, (E.get(ye) ?? 0) + 1);
      });
      const G = (he) => {
        const we = W.find((Jt) => Jt.name === he)?.displayLabel || he, vt = M(we, j.labelFontSize, J, ne).height + na * 2, Qt = xe.get(he) ?? 0, _a = E.get(Qt) ?? 1, fa = (Math.max(_a, 1) - 1) * j.nodeGap / Math.max(_a, 1), An = Math.max(fe - fa, vt);
        return Math.max(1, vt / An * se);
      }, ie = (he) => {
        const ye = X.filter((we) => we.target === he);
        return ye.length > 0 ? ye.reduce((we, Ye) => we + Ye.value, 0) : X.filter((we) => we.source === he).reduce((we, Ye) => we + Ye.value, 0);
      };
      for (let he = 0; he < 16; he += 1) {
        let ye = !1;
        for (const we of W) {
          const Ye = G(we.name), vt = ie(we.name);
          if (vt >= Ye) continue;
          const Qt = X.filter((Jt) => Jt.target === we.name), _a = X.filter((Jt) => Jt.source === we.name), fa = Qt.length > 0 ? Qt : _a;
          if (fa.length === 0) continue;
          const An = Ye / Math.max(vt, 1e-6);
          fa.forEach((Jt) => {
            Jt.value *= An;
          }), ye = !0;
        }
        if (!ye) break;
      }
      return X;
    }, q = (Q, W, j) => {
      const te = D(Q, W), se = O(Q, W), X = j.labelLineHeight || Math.round(j.labelFontSize * 1.25), J = Math.max(4, j.labelCharsPerLine);
      let ne = j.nodeWidth;
      const fe = [], xe = se.map((G, ie) => {
        const he = w(G), ye = T(G, J);
        fe.push(ye);
        const we = M(ye, j.labelFontSize, X, J);
        j.orient === "vertical" ? ne = Math.max(ne, we.height + na * 2) : ne = Math.max(ne, we.nodeWidth);
        const Ye = a.nodeColors[G.name] || f[he] || ae[ie % ae.length], vt = Math.max(Math.ceil(we.nodeWidth - na * 2), 48);
        return {
          ...G,
          displayLabel: ye,
          label: {
            width: vt,
            overflow: "none",
            lineHeight: X,
            fontSize: j.labelFontSize
          },
          itemStyle: {
            color: Ye,
            borderRadius: 4,
            borderWidth: 0,
            shadowBlur: 0,
            shadowColor: "transparent"
          }
        };
      });
      let E = { ...j.contentMargins };
      if (j.orient === "vertical") {
        const G = Math.max(
          ...fe.map(
            (he) => M(he, j.labelFontSize, X, J).width
          ),
          0
        ), ie = typeof E.right == "number" ? E.right : 10;
        E = {
          ...E,
          right: Math.max(ie, G + na + j.labelDistance)
        };
      }
      return { nodes: xe, maxNodeWidth: ne, contentMargins: E, originTotal: te };
    }, ae = [
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
    ], ue = () => {
      const Q = a.data.links.filter(
        (se) => se.source && se.target && typeof se.value == "number"
      ), W = Math.max(...Q.map((se) => se.value), 1), j = Math.max(1, W * 0.01), te = Q.map((se) => ({
        ...se,
        originalValue: se.value,
        value: se.value < W * 0.01 ? j : se.value
      }));
      return {
        nodes: a.data.nodes.filter((se) => se.name),
        links: te
      };
    }, me = (Q, W) => (j) => {
      const te = j.dataType === "node", se = o.value.tooltipText, X = n.value ? "#d1d5db" : "#e2e8f0";
      if (te) {
        const G = Q.filter((ye) => ye.target === j.name), ie = Q.filter((ye) => ye.source === j.name), he = G.length > 0 ? G.reduce((ye, we) => ye + (we.originalValue || we.value), 0) : ie.reduce((ye, we) => ye + (we.originalValue || we.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${se};">${j.name}</div><div style="color: ${X}; font-size: 12px;">Count: ${he.toLocaleString()}</div>`;
      }
      const J = j.data?.source || j.source || "Unknown", ne = j.data?.target || j.target || "Unknown", fe = Number(j.data?.originalValue ?? j.data?.value ?? j.value ?? 0), xe = B(fe, W), E = `${fe.toLocaleString()} (${xe})`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${se};">${J} → ${ne}</div><div style="color: ${X}; font-size: 12px;">Flow: ${E}</div>`;
    }, U = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const Q = y.value, W = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", j = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", te = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", se = Q.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: X, links: J } = ue(), { nodes: ne, maxNodeWidth: fe, contentMargins: xe, originTotal: E } = q(
          X,
          J,
          Q
        ), G = z(a.height, i.value?.clientHeight ?? 0), ie = H(
          J,
          ne,
          {
            labelFontSize: Q.labelFontSize,
            labelLineHeight: Q.labelLineHeight || Math.round(Q.labelFontSize * 1.25),
            labelCharsPerLine: Q.labelCharsPerLine,
            nodeGap: Q.nodeGap
          },
          G,
          E
        ), he = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: me(ie, E),
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
              data: ne,
              links: ie,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: j,
                  opacity: 1
                }
              },
              lineStyle: {
                color: W,
                curveness: 0.5,
                opacity: 1
              },
              itemStyle: {
                ...h.style,
                borderWidth: 0
              },
              label: {
                show: !0,
                position: Q.labelPosition,
                color: se,
                fontWeight: 700,
                fontSize: Q.labelFontSize,
                lineHeight: Q.labelLineHeight || Math.round(Q.labelFontSize * 1.25),
                padding: na,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...Q.orient === "horizontal" ? { width: Math.max(fe - na * 2, 48), overflow: "none" } : Q.labelWrap && Q.labelTextWidth > 0 ? { width: Q.labelTextWidth, overflow: "none" } : {},
                ...Q.labelDistance > 0 ? { distance: Q.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ye) => ye.data?.displayLabel || ye.name || ""
              },
              edgeLabel: Q.edgeLabelShow ? {
                show: !0,
                fontSize: Q.edgeLabelFontSize,
                color: te,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ye) => {
                  const we = Number(ye.data?.originalValue ?? ye.value ?? 0), Ye = B(we, E);
                  return `${we.toLocaleString()} (${Ye})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: Q.nodeGap,
              nodeWidth: fe,
              layoutIterations: h.node.iterations,
              orient: Q.orient,
              draggable: !1,
              ...xe
            }
          ],
          backgroundColor: "transparent",
          animation: !0,
          animationDuration: h.animation.duration,
          animationEasing: h.animation.easing
        };
        c.setOption(he), c.resize();
      } catch (X) {
        console.error("Error setting Sankey chart options:", X), l.value = !0;
      }
    }, L = async () => {
      if (i.value)
        try {
          c = To.init(i.value), U(), window.addEventListener("resize", le);
        } catch (Q) {
          console.error("Error initializing Sankey chart:", Q), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, K = () => {
      const Q = i.value;
      return !!(Q && Q.clientWidth > 0 && Q.clientHeight > 0);
    }, Y = async () => {
      if (await je(), K()) return L();
      await new Promise((Q) => {
        const W = i.value;
        if (!W) {
          Q();
          return;
        }
        d = new ResizeObserver(() => {
          K() && (d?.disconnect(), d = null, L().then(Q));
        }), d.observe(W);
      });
    }, le = () => c?.resize(), ve = () => {
      window.removeEventListener("resize", le), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Ze(() => Y()), li(ve), Ee(() => a.data, U, { deep: !0 }), Ee(n, U), Ee(s, U), t({ isDark: n }), (Q, W) => (m(), k("div", cm, [
      l.value ? (m(), k("div", {
        key: 0,
        class: "error-state",
        style: Ce({ height: e.height })
      }, [...W[0] || (W[0] = [
        Yn('<div class="error-content" data-v-05d0f97f><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-05d0f97f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-05d0f97f></path></svg><p class="error-title" data-v-05d0f97f>Chart could not be loaded</p><p class="error-description" data-v-05d0f97f>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), k("div", {
        key: 1,
        class: "chart-wrapper",
        style: Ce({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (m(), k("div", dm, [...W[1] || (W[1] = [
          Yn('<div class="loading-container" data-v-05d0f97f><div class="sankey-loader" data-v-05d0f97f><div class="flow flow-1" data-v-05d0f97f></div><div class="flow flow-2" data-v-05d0f97f></div><div class="flow flow-3" data-v-05d0f97f></div><div class="flow flow-4" data-v-05d0f97f></div></div><p class="loading-text" data-v-05d0f97f>Loading Sankey diagram...</p></div>', 1)
        ])])) : F("", !0)
      ], 4))
    ]));
  }
}), Zt = /* @__PURE__ */ be(um, [["__scopeId", "data-v-05d0f97f"]]), hm = ["open"], fm = { class: "card-header metric-collapsible__summary" }, gm = { class: "header-content metric-header-content" }, mm = { class: "metric-header-content__main" }, pm = { class: "metric-header-content__text" }, bm = { class: "metric-header-content__loaded" }, vm = {
  key: 0,
  class: "card-title"
}, ym = {
  key: 0,
  class: "card-subtitle"
}, xm = {
  key: 0,
  class: "metric-header-content__export"
}, km = {
  key: 0,
  class: "cmc-header-aside"
}, _m = {
  key: 0,
  class: "chart-metric-container__body"
}, wm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Cm = { key: "body-content" }, $m = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Sm = { class: "card-header" }, Mm = { class: "header-content metric-header-content" }, Dm = { class: "metric-header-content__main" }, Am = { class: "metric-header-content__text" }, Tm = { class: "metric-header-content__loaded" }, Bm = {
  key: 0,
  class: "card-title"
}, Lm = {
  key: 0,
  class: "card-subtitle"
}, Pm = {
  key: 0,
  class: "metric-header-content__export"
}, Im = {
  key: 0,
  class: "cmc-header-aside"
}, Em = {
  key: 0,
  class: "chart-metric-container__body"
}, Rm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Fm = { key: "body-content" }, Om = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = oe(a.defaultOpen), s = oe(a.defaultOpen), i = ao();
    function r(f) {
      return f.some((p) => {
        if (p.type === Pr) return !1;
        if (p.type === Text) {
          const g = p.children;
          return typeof g == "string" && g.trim().length > 0;
        }
        return !!p.type;
      });
    }
    const l = C(() => a.collapsible ? a.lazyMount ? s.value : o.value : !0), c = C(() => a.loading && l.value), d = C(() => {
      if (a.collapsible && !o.value) return !1;
      const f = i.headerExport;
      return f ? r(f()) : !1;
    });
    Ee(
      () => a.defaultOpen,
      (f) => {
        a.collapsible && (o.value = f, f && (s.value = !0));
      }
    );
    function h(f) {
      const p = f.currentTarget;
      if (p?.tagName !== "DETAILS") return;
      const g = o.value, v = p.open;
      if (o.value = v, v && !g) {
        const y = !s.value;
        s.value = !0, y && n("open");
      }
      n("toggle", v);
    }
    return (f, p) => e.collapsible ? (m(), k("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: o.value,
      onToggle: h
    }, [
      u("summary", fm, [
        u("div", gm, [
          u("div", mm, [
            u("div", pm, [
              u("div", bm, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (m(), k("h3", vm, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (m(), k("p", ym, A(e.subtitle), 1)) : F("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (m(), k("div", xm, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          f.$slots.headerAside ? (m(), k("div", km, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
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
      l.value ? (m(), k("div", _m, [
        N(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            c.value ? (m(), k("div", wm, [
              _e(f.$slots, "loading", {}, () => [
                p[1] || (p[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), k("div", Cm, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ], 40, hm)) : (m(), k("div", $m, [
      u("div", Sm, [
        u("div", Mm, [
          u("div", Dm, [
            u("div", Am, [
              u("div", Tm, [
                _e(f.$slots, "title", {}, () => [
                  e.title ? (m(), k("h3", Bm, A(e.title), 1)) : F("", !0)
                ], !0),
                e.subtitle ? (m(), k("p", Lm, A(e.subtitle), 1)) : F("", !0),
                _e(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (m(), k("div", Pm, [
              _e(f.$slots, "headerExport", {}, void 0, !0)
            ])) : F("", !0)
          ]),
          f.$slots.headerAside ? (m(), k("div", Im, [
            _e(f.$slots, "headerAside", {}, void 0, !0)
          ])) : F("", !0)
        ])
      ]),
      l.value ? (m(), k("div", Em, [
        N(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            c.value ? (m(), k("div", Rm, [
              _e(f.$slots, "loading", {}, () => [
                p[2] || (p[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), k("div", Fm, [
              _e(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : F("", !0)
    ]));
  }
}), $e = /* @__PURE__ */ be(Om, [["__scopeId", "data-v-46090b42"]]);
function Vm(e, t) {
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
      d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    })
  ]);
}
function eo(e, t) {
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
function $o(e, t) {
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
function zm(e, t) {
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
function Gt(e, t) {
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
function rr(e, t) {
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
function lr(e, t) {
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
function Nm(e, t) {
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
function jm(e, t) {
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
function Js(e, t) {
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
      d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
    })
  ]);
}
function Hm(e, t) {
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
      d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    })
  ]);
}
function ei(e, t) {
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
      d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    }),
    u("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    })
  ]);
}
function Wm(e, t) {
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
      d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
    })
  ]);
}
function Km(e, t) {
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
      d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    })
  ]);
}
function Ym(e, t) {
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
      d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    })
  ]);
}
function Um(e, t) {
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
      d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    })
  ]);
}
function to(e, t) {
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
const qm = {
  key: 0,
  class: "footer-divider"
}, Xm = {
  key: 0,
  class: "export-label"
}, Gm = { class: "export-buttons" }, Zm = ["disabled"], Qm = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, Jm = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, ep = ["disabled"], tp = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, ap = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, np = /* @__PURE__ */ ce({
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
    ), i = (l) => a.formats.includes(l), r = (l) => {
      a.loading || n("export", l);
    };
    return (l, c) => (m(), ee($t(o.value), {
      class: Z(s.value)
    }, {
      default: R(() => [
        e.variant === "footer" ? (m(), k("div", qm)) : F("", !0),
        u("div", {
          class: Z(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (m(), k("span", Xm, "Export")) : F("", !0),
          u("div", Gm, [
            i("pdf") ? (m(), k("button", {
              key: 0,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => r("pdf"))
            }, [
              e.loading ? (m(), k("svg", Qm, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), k("svg", Jm, [...c[3] || (c[3] = [
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
            ], 10, Zm)) : F("", !0),
            i("csv") ? (m(), k("button", {
              key: 1,
              type: "button",
              class: Z(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => r("csv"))
            }, [
              e.loading ? (m(), k("svg", tp, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), k("svg", ap, [...c[6] || (c[6] = [
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
            ], 10, ep)) : F("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Oe = /* @__PURE__ */ be(np, [["__scopeId", "data-v-ebfab47f"]]), op = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, sp = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, ip = { class: "w-full shrink-0 sm:pr-2" }, rp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, lp = { class: "max-w-[360px] text-center" }, cp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, dp = /* @__PURE__ */ ce({
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
    }, o = e, s = a, i = (f) => {
      s("export", f);
    }, r = Me(o, "theme"), l = Me(o, "options"), { isDark: c } = De(r), d = (f) => {
      const p = new Date(f), g = String(p.getDate()).padStart(2, "0"), v = String(p.getMonth() + 1).padStart(2, "0");
      return `${g}-${v}`;
    }, h = C(() => {
      const f = o.data?.agents_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.map((_) => d(_)), v = /* @__PURE__ */ new Set();
      for (const _ of Object.values(f))
        for (const w of Object.keys(_))
          v.add(w);
      const y = Array.from(v), b = (_) => _, x = y.map((_) => ({
        label: _,
        data: p.map((w) => f[w]?.[_] || 0),
        backgroundColor: `${n[_] || "#94a3b8"}80`,
        borderColor: b(n[_] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (f, p) => (m(), ee($e, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", op, [
          N(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: R(() => [
              h.value.labels && h.value.labels.length ? (m(), k("section", sp, [
                u("div", ip, [
                  N(kt, {
                    data: h.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (m(), k("section", rp, [
                u("div", lp, [
                  u("div", cp, [
                    N(P(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                  ]),
                  p[0] || (p[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No agents data per day ", -1)),
                  p[1] || (p[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " Try adjusting the date range or check your filters to see daily agent interactions. ", -1))
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
}), up = /* @__PURE__ */ be(dp, [["__scopeId", "data-v-f8d0ec91"]]), ha = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", pe = (e, t) => `${e.toLocaleString()} (${ha(e, t)})`, hp = { class: "flex w-full min-w-0 justify-center" }, fp = { class: "flex max-w-full min-w-0 items-center gap-2" }, gp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, mp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, pp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, bp = /* @__PURE__ */ ce({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (m(), k("div", {
      class: Z(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", hp, [
        u("div", fp, [
          e.color ? (m(), k("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Ce({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          u("span", gp, A(e.title), 1)
        ])
      ]),
      u("p", mp, A(e.value), 1),
      e.subvalue ? (m(), k("p", pp, A(e.subvalue), 1)) : F("", !0)
    ], 2));
  }
}), ke = /* @__PURE__ */ be(bp, [["__scopeId", "data-v-0d546967"]]), cr = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function dr(e, t) {
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
const vp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ue = /* @__PURE__ */ ce({
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
      () => dr(t.color, t.outlined)
    );
    return (r, l) => a.value ? (m(), k("span", {
      key: 0,
      role: "status",
      class: Z(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (m(), k("span", vp, [...l[0] || (l[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : F("", !0),
      u("span", {
        class: Z(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (m(), k("span", {
      key: 1,
      class: Z([P(cr), i.value])
    }, [
      _e(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), de = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Be = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Ft = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, yp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, xp = { class: "overflow-x-auto" }, kp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, _p = ["aria-sort", "onClick"], wp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, Cp = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, $p = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Sp = /* @__PURE__ */ ce({
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
    function r(w) {
      return w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left";
    }
    function l(w) {
      return `cell-${w}`;
    }
    function c(w, $) {
      return w[$];
    }
    function d(w, $) {
      if (typeof a.rowKey == "function")
        return a.rowKey(w);
      const D = w[a.rowKey];
      return typeof D == "string" || typeof D == "number" ? D : $;
    }
    function h(w, $) {
      return d(w, $);
    }
    function f(w) {
      return a.sortKey === w && a.sortDirection != null;
    }
    function p(w) {
      n("sort", w);
    }
    function g(w) {
      return f(w) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    const v = C(() => a.rows?.length ?? 0), y = C(() => v.value > a.maxVisibleRows), b = C(() => Math.max(0, v.value - a.maxVisibleRows)), x = C(() => a.rows?.length ? o.value || !y.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), _ = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(b.value))
    );
    return (w, $) => (m(), k("div", yp, [
      u("div", xp, [
        u("table", kp, [
          u("thead", null, [
            u("tr", null, [
              (m(!0), k(re, null, ge(e.columns, (D) => (m(), k("th", {
                key: D.key,
                scope: "col",
                class: Z(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(D.align), D.headerClass]])
              }, [
                D.sortable ? (m(), k("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", r(D.align)]),
                  "aria-sort": g(D.key),
                  onClick: (S) => p(D.key)
                }, [
                  u("span", null, A(D.label), 1),
                  u("span", wp, [
                    f(D.key) ? (m(), k(re, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), k("span", Cp, "↑")) : e.sortDirection === "desc" ? (m(), k("span", $p, "↓")) : F("", !0)
                    ], 64)) : (m(), k(re, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, _p)) : (m(), k(re, { key: 1 }, [
                  Ae(A(D.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(re, null, ge(x.value, (D, S) => (m(), k("tr", {
              key: h(D, S)
            }, [
              (m(!0), k(re, null, ge(e.columns, (I) => (m(), k("td", {
                key: `${S}-${I.key}`,
                class: Z(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(I.align), I.cellClass]])
              }, [
                _e(w.$slots, l(I.key), {
                  row: D,
                  column: I,
                  value: c(D, I.key)
                }, () => [
                  Ae(A(i(c(D, I.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      y.value ? (m(), k("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (D) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : _.value) + " ", 1),
        (m(), k("svg", {
          class: Z(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
      ])) : F("", !0)
    ]));
  }
}), dt = /* @__PURE__ */ be(Sp, [["__scopeId", "data-v-22a97a18"]]), Mp = {
  key: "error",
  class: "error-state"
}, Dp = { class: "error-content" }, Ap = { class: "error-description" }, Tp = {
  key: "content",
  class: "card-body"
}, Bp = { class: "chart-section" }, Lp = { class: "chart-wrapper" }, Pp = { class: "payment-success-summary" }, Ip = {
  key: 0,
  class: "booking-daily-section"
}, Ep = { class: "w-full min-w-0" }, Rp = { class: "font-medium" }, Fp = { class: "percentage-text" }, Op = { class: "badges-container" }, Vp = {
  key: 0,
  class: "badges-container"
}, zp = {
  key: 1,
  class: "percentage-text"
}, Np = { class: "badges-container" }, jp = {
  key: 1,
  class: "empty-state"
}, Hp = /* @__PURE__ */ ce({
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
    function a(b) {
      return b;
    }
    const n = e, o = t, s = (b) => {
      o("export", b);
    }, i = C(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (b, x) => new Date(b.date).getTime() - new Date(x.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], l = C(
      () => i.value.map((b) => ({
        id: b.date,
        ...b
      }))
    ), c = C(() => n.data?.total_payment_success_value || []), d = C(() => {
      const b = c.value;
      return b.length === 0 ? g(0) : b.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (b) => b.payment_success_value || [], f = (b) => typeof b.payment_success_count == "number" ? b.payment_success_count : (b.payment_success_value || []).reduce(
      (x, _) => x + (_.count || 0),
      0
    ), p = (b) => Be(b), g = (b) => b == null ? "0" : Ft(b);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (b, x) => b + (x.total_value || 0),
      0
    ));
    const v = C(() => {
      const b = n.data, x = b.total_booking_initiated || 0, _ = b.total_booking_started || 0, w = b.total_payment_initiated || 0, $ = b.total_not_found || 0, D = b.total_cancelled || 0, S = b.total_no_pending_balance || 0, I = b.total_errors || 0, V = typeof b.total_payment_success == "number" ? b.total_payment_success : (b.total_payment_success_value || []).reduce(
        (q, ae) => q + (ae.count || 0),
        0
      ), O = b.total_payment_failed || 0, M = Math.max(0, x - _), B = Math.max(
        0,
        _ - w - $ - D - S - I
      ), T = (q, ae) => pe(q, ae), z = [
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
        label: T(_, x)
      }), M > 0 && H.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: M,
        label: T(M, x)
      }), w > 0 && H.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: T(w, x)
      }), $ > 0 && H.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: T($, x)
      }), D > 0 && H.push({
        source: "Started",
        target: "Cancelled",
        value: D,
        label: T(D, x)
      }), S > 0 && H.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: T(S, x)
      }), I > 0 && H.push({
        source: "Started",
        target: "Errors",
        value: I,
        label: T(I, x)
      }), B > 0 && H.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: B,
        label: T(B, x)
      }), V > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: V,
        label: T(V, x)
      }), O > 0 && H.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: O,
        label: T(O, x)
      }), { nodes: z, links: H };
    }), y = (b, x) => ha(b, x);
    return (b, x) => (m(), ee($e, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: x[0] || (x[0] = (_) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading && !n.error ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        N(ut, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            n.error ? (m(), k("div", Mp, [
              u("div", Dp, [
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
                u("p", Ap, A(n.error), 1)
              ])
            ])) : (m(), k("div", Tp, [
              u("section", Bp, [
                u("div", Lp, [
                  N(Zt, {
                    data: v.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Pp, [
                N(ke, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (m(), k("section", Ip, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Ep, [
                  N(dt, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": R(({ row: _ }) => [
                      u("span", Rp, A(P(We)(String(_.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": R(({ row: _ }) => [
                      u("span", null, A(P(de)(Number(_.booking_initiated_count))), 1)
                    ]),
                    "cell-started": R(({ row: _ }) => [
                      u("span", null, [
                        Ae(A(P(de)(Number(_.booking_started_count))) + " ", 1),
                        u("span", Fp, " (" + A(y(
                          Number(_.booking_started_count),
                          Number(_.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": R(({ row: _ }) => [
                      u("span", null, A(P(de)(Number(_.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": R(({ row: _ }) => [
                      u("div", Op, [
                        N(Ue, { color: "success" }, {
                          default: R(() => [
                            Ae(" Success: " + A(P(de)(
                              f(_)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "danger" }, {
                          default: R(() => [
                            Ae(" Failed: " + A(P(de)(Number(_.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": R(({ row: _ }) => [
                      h(_).length > 0 ? (m(), k("div", Vp, [
                        (m(!0), k(re, null, ge(h(
                          _
                        ), (w) => (m(), k("span", {
                          key: `${_.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, A(w.currency) + " " + A(p(w.total_value)), 1))), 128))
                      ])) : (m(), k("span", zp, "N/A"))
                    ]),
                    "cell-outcomes": R(({ row: _ }) => [
                      u("div", Np, [
                        N(Ue, { color: "danger" }, {
                          default: R(() => [
                            Ae(" Not Found: " + A(_.not_found_count ? P(de)(Number(_.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "warning" }, {
                          default: R(() => [
                            Ae(" Cancelled: " + A(_.cancelled_count ? P(de)(Number(_.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "orange" }, {
                          default: R(() => [
                            Ae(" No Balance: " + A(_.no_pending_balance_count ? P(de)(Number(_.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        N(Ue, { color: "danger" }, {
                          default: R(() => [
                            Ae(" Errors: " + A(_.error_count ? P(de)(Number(_.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), k("section", jp, [...x[4] || (x[4] = [
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
}), Wp = /* @__PURE__ */ be(Hp, [["__scopeId", "data-v-d68eddff"]]), Kp = { class: "card-body" }, Yp = {
  key: 0,
  class: "chart-section"
}, Up = { class: "chart-wrapper" }, qp = {
  key: 1,
  class: "checkin-daily-section"
}, Xp = { class: "w-full min-w-0" }, Gp = { class: "font-medium" }, Zp = { class: "cell-success" }, Qp = { class: "cell-danger" }, Jp = {
  key: 0,
  class: "reasons-list"
}, e0 = { class: "reason-name" }, t0 = { class: "reason-count" }, a0 = {
  key: 1,
  class: "no-reasons"
}, n0 = {
  key: 2,
  class: "empty-state"
}, o0 = {
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
    }, d = C(
      () => o.showPaymentLinks ? [...l, c] : l
    ), h = C(
      () => (r.value || []).map((w) => ({
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
    }), g = (w, $) => !$ || $ === 0 ? "0.0%" : ha(w, $), v = (w, $) => {
      const D = de(w), S = g(w, $);
      return `${D} (${S})`;
    }, y = (w) => w.reduce(($, D) => $ + D.failed_count, 0), b = C(() => {
      const w = [], $ = [], D = /* @__PURE__ */ new Set(), S = (X, J = {}) => {
        D.has(X) || (w.push({ name: X, ...J }), D.add(X));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      S("Checkin Init", { value: f.value.total_checkin_initiated }), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const I = f.value.total_checkin_initiated, V = f.value.total_checkin_init, O = f.value.total_checkin_init_abandoned || 0, M = f.value.total_checkin_pre_init_abandoned_error, B = f.value.total_checkin_pre_init_abandoned_voluntary, T = M != null || B != null, z = T ? Math.max(Number(M) || 0, 0) : 0, H = T ? Math.max(Number(B) || 0, 0) : 0, q = f.value.total_checkin_init_abandoned_error, ae = f.value.total_checkin_init_abandoned_voluntary, ue = q != null || ae != null, me = ue ? Math.max(Number(q) || 0, 0) : 0, U = ue ? Math.max(Number(ae) || 0, 0) : 0, L = ue ? Math.max(O - me - U, 0) : O, K = V - O, Y = f.value.total_checkin_started, le = f.value.total_checkin_completed, ve = f.value.total_checkin_closed, Q = p.value.unrecovered_by_step || [], W = Q.reduce(
        (X, J) => X + J.count,
        0
      );
      V > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: V,
        label: pe(V, I)
      });
      const j = I - V;
      T ? (H > 0 && (S("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: pe(H, I)
      })), z > 0 && (S("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: z,
        label: pe(z, I)
      }))) : j > 0 && (S("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: j,
        label: pe(j, I)
      })), ue ? (me > 0 && (S("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: me,
        label: pe(me, I)
      })), U > 0 && (S("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: U,
        label: pe(U, I)
      })), L > 0 && (S("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: pe(L, I)
      }))) : O > 0 && (S("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: O,
        label: pe(O, I)
      })), K > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: K,
        label: pe(K, I)
      }), Y > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: Y,
        label: pe(Y, I)
      }), le > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: le,
        label: pe(le, I)
      }), Q.length > 0 && W > 0 && (S("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: W,
        label: pe(W, I)
      }), Q.forEach((X, J) => {
        const fe = X.step_name.replace(/_/g, " ").split(" ").map((xe) => xe.charAt(0).toUpperCase() + xe.slice(1)).join(" ");
        S(fe, { status: "error", order: J + 1 }), $.push({
          source: "Unrecovered",
          target: fe,
          value: X.count,
          label: pe(X.count, I)
        });
      }));
      const te = Y - (le + W);
      te > 0 && (S("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: te,
        label: pe(te, I)
      }));
      const se = le - ve;
      return se > 0 && (S("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: se,
        label: pe(se, I)
      })), ve > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: ve,
        label: pe(ve, I)
      }), { nodes: w, links: $ };
    }), x = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, _ = () => {
      const w = f.value.checkin_by_day || [], $ = p.value.failed_by_step_by_day || [], D = x();
      if (w.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...w].map((S) => {
        const I = $.find(
          (O) => O.date === S.date
        ), V = D.find(
          (O) => O.date === S.date
        );
        return {
          ...S,
          failed_steps: I?.steps || [],
          record_locator_create_payment_count: S.record_locator_create_payment_count ?? V?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((S, I) => new Date(S.date) - new Date(I.date));
    };
    return Ee(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        _();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (m(), ee($e, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", Kp, [
          b.value.nodes.length > 0 ? (m(), k("section", Yp, [
            u("div", Up, [
              N(Zt, {
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          r.value && r.value.length > 0 ? (m(), k("section", qp, [
            u("div", Xp, [
              N(dt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: D }) => [
                  u("span", Gp, A(P(We)(String(D.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": R(({ row: D }) => [
                  u("span", null, A(P(de)(D.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": R(({ row: D }) => [
                  u("span", null, A(v(
                    D.checkin_init_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": R(({ row: D }) => [
                  u("span", null, A(P(de)(D.checkin_started_count)), 1)
                ]),
                "cell-completed": R(({ row: D }) => [
                  u("span", null, A(v(
                    D.checkin_completed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": R(({ row: D }) => [
                  u("span", Zp, A(v(
                    D.checkin_closed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": R(({ row: D }) => [
                  u("span", Qp, A(v(
                    y(D.failed_steps),
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": R(({ row: D }) => [
                  D.failed_steps && D.failed_steps.length > 0 ? (m(), k("div", Jp, [
                    (m(!0), k(re, null, ge(D.failed_steps, (S) => (m(), k("div", {
                      key: S.step_name,
                      class: "reason-item"
                    }, [
                      u("span", e0, A(S.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", t0, A(S.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), k("div", a0, "-"))
                ]),
                "cell-createPayment": R(({ row: D }) => [
                  u("span", null, A(P(de)(D.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), k("section", n0, [...$[0] || ($[0] = [
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
}, ur = /* @__PURE__ */ be(o0, [["__scopeId", "data-v-ae5fc0f7"]]), s0 = { class: "card-body" }, i0 = {
  key: 0,
  class: "sankey-section"
}, r0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, l0 = { class: "w-full min-w-0" }, c0 = { class: "font-medium whitespace-nowrap" }, d0 = { class: "cell-success" }, u0 = { class: "cell-danger" }, h0 = {
  key: 0,
  class: "reasons-list"
}, f0 = { class: "reason-name" }, g0 = { class: "reason-count" }, m0 = {
  key: 1,
  class: "no-reasons"
}, p0 = {
  key: 2,
  class: "empty-state"
}, b0 = { class: "empty-state-content" }, v0 = { class: "empty-icon-wrapper" }, y0 = /* @__PURE__ */ ce({
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
    exportLoading: { type: Boolean, default: !1 },
    isAvianca: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (x) => {
      o("export", x);
    }, { isDark: i } = De(Me(n, "theme")), r = (x) => x == null ? "0" : x.toLocaleString(), l = (x) => {
      const [_, w, $] = x.split("-").map(Number);
      return We([_, w - 1, $]).format("MMM DD");
    }, c = (x) => x.replace(/_/g, " ").replace(/\b\w/g, (_) => _.toUpperCase()), d = (x, _) => ha(x, _), h = (x, _) => {
      const w = x || 0, $ = _ || 0, D = r(w), S = d(w, $);
      return `${D} (${S})`;
    }, f = C(() => {
      const x = n.checkinData?.record_locator_by_day || [], _ = n.failedData?.failed_by_step_by_day || [], w = n.failedData?.unrecovered_by_day || [];
      return x.map((D) => {
        const S = _.find((V) => V.date === D.date), I = w.find(
          (V) => V.date === D.date
        );
        return {
          ...D,
          failed_steps: S?.steps || [],
          unrecovered_count: I?.unrecovered_count || 0
        };
      }).sort(
        (D, S) => new Date(D.date).getTime() - new Date(S.date).getTime()
      );
    }), p = [
      { key: "date", label: "Date", align: "center" },
      { key: "checkinInit", label: "Checkin Init", align: "center" },
      { key: "bookingRetrieval", label: "Booking Retrieval (%)", align: "center" },
      { key: "bookingRetrieved", label: "Booking Retrieved", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed with BP (%)", align: "center" },
      { key: "failed", label: "Errors (%)", align: "center" },
      { key: "reasons", label: "Failed (Reasons)", align: "left" }
    ], g = {
      key: "createPayment",
      label: "Create Payment",
      align: "center"
    }, v = C(
      () => n.isAvianca ? [...p, g] : p
    ), y = C(
      () => f.value.map((x) => ({
        id: x.date,
        date: x.date,
        checkin_initiated: x.checkin_initiated,
        record_locator_init_count: x.record_locator_init_count,
        record_locator_started_count: x.record_locator_started_count,
        record_locator_completed_count: x.record_locator_completed_count,
        record_locator_closed_count: x.record_locator_closed_count,
        unrecovered_count: x.unrecovered_count,
        failed_steps: x.failed_steps,
        record_locator_create_payment_count: x.record_locator_create_payment_count
      }))
    ), b = C(() => {
      const x = [], _ = [], w = /* @__PURE__ */ new Set(), $ = (j, te = {}) => {
        w.has(j) || (x.push({ name: j, ...te }), w.add(j));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: x, links: _ };
      const D = n.checkinData.total_checkin_initiated || 0;
      $("Checkin Init", { value: D }), $("Booking Retrieval"), $("Booking Retrieved"), $("Completed"), $("Closed with BP");
      const S = n.checkinData.total_record_locator_init || 0, I = n.checkinData.total_record_locator_init_abandoned || 0, V = n.checkinData.total_checkin_pre_init_abandoned_error, O = n.checkinData.total_checkin_pre_init_abandoned_voluntary, M = V != null || O != null, B = M ? Math.max(Number(V) || 0, 0) : 0, T = M ? Math.max(Number(O) || 0, 0) : 0, z = n.checkinData.total_record_locator_init_abandoned_error, H = n.checkinData.total_record_locator_init_abandoned_voluntary, q = z != null || H != null, ae = q ? Math.max(Number(z) || 0, 0) : 0, ue = q ? Math.max(Number(H) || 0, 0) : 0, me = q ? Math.max(I - ae - ue, 0) : I, U = S - I, L = n.checkinData.total_record_locator_started || 0, K = n.checkinData.total_record_locator_completed || 0, Y = n.checkinData.total_record_locator_closed || 0, le = n.checkinData.total_record_locator_unrecovered || 0;
      S > 0 && _.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: S,
        label: pe(S, D)
      });
      const ve = D - S;
      M ? (T > 0 && ($("Abandoned (Init)"), _.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: T,
        label: pe(T, D)
      })), B > 0 && ($("Booking not retreived"), _.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: B,
        label: pe(B, D)
      }))) : ve > 0 && ($("Abandoned (Init)"), _.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ve,
        label: pe(ve, D)
      })), q ? (ae > 0 && ($("Error"), _.push({
        source: "Booking Retrieval",
        target: "Error",
        value: ae,
        label: pe(ae, D)
      })), ue > 0 && ($("Abandoned (Started)"), _.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: ue,
        label: pe(ue, D)
      })), me > 0 && ($("Abandoned (Started)"), _.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: me,
        label: pe(me, D)
      }))) : I > 0 && ($("Abandoned (Started)"), _.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: I,
        label: pe(I, D)
      })), U > 0 && _.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: U,
        label: pe(U, D)
      }), K > 0 && _.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: K,
        label: pe(K, D)
      }), le > 0 && ($("Errors"), _.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: le,
        label: pe(le, D)
      }));
      const Q = L - (K + le);
      Q > 0 && ($("Abandoned (Flow)"), _.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: Q,
        label: pe(Q, D)
      }));
      const W = K - Y;
      return W > 0 && ($("BP Error"), _.push({
        source: "Completed",
        target: "BP Error",
        value: W,
        label: pe(W, D)
      })), Y > 0 && _.push({
        source: "Completed",
        target: "Closed with BP",
        value: Y,
        label: pe(Y, D)
      }), { nodes: x, links: _ };
    });
    return t({ isDark: i }), (x, _) => (m(), ee($e, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", s0, [
          b.value.nodes.length > 0 ? (m(), k("div", i0, [
            N(Zt, {
              data: b.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : F("", !0),
          f.value && f.value.length > 0 ? (m(), k("div", r0, [
            u("div", l0, [
              N(dt, {
                columns: v.value,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: w }) => [
                  u("span", c0, A(l(String(w.date))), 1)
                ]),
                "cell-checkinInit": R(({ row: w }) => [
                  u("span", null, A(r(w.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": R(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_init_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": R(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_started_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": R(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_completed_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": R(({ row: w }) => [
                  u("span", d0, A(h(
                    w.record_locator_closed_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": R(({ row: w }) => [
                  u("span", u0, A(h(
                    w.unrecovered_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": R(({ row: w }) => [
                  u("span", null, A(r(
                    w.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": R(({ row: w }) => [
                  Array.isArray(w.failed_steps) && w.failed_steps.length > 0 ? (m(), k("div", h0, [
                    (m(!0), k(re, null, ge(w.failed_steps, ($) => (m(), k("div", {
                      key: $.step_name,
                      class: "reason-item"
                    }, [
                      u("span", f0, A(c($.step_name)) + ":", 1),
                      u("span", g0, A($.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), k("div", m0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), k("div", p0, [
            u("div", b0, [
              u("div", v0, [
                N(P(nt), { class: "empty-icon" })
              ]),
              _[0] || (_[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              _[1] || (_[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), x0 = /* @__PURE__ */ be(y0, [["__scopeId", "data-v-c78464fc"]]), k0 = { class: "card-body" }, _0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, w0 = { class: "w-full min-w-0" }, C0 = { class: "segment-plain" }, $0 = { class: "segment-plain" }, S0 = { class: "segment-plain" }, M0 = { class: "percentage-value" }, D0 = { class: "percentage-value" }, A0 = { class: "percentage-value success" }, T0 = {
  key: 1,
  class: "empty-state"
}, B0 = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (f) => {
      o("export", f);
    }, { isDark: i } = De(Me(n, "theme")), r = [
      { key: "departure", label: "Departure", align: "center" },
      { key: "connection", label: "Connection", align: "center" },
      { key: "arrival", label: "Arrival", align: "center" },
      { key: "trip", label: "Trip", align: "center" },
      { key: "init", label: "Init", align: "center" },
      { key: "started", label: "Started (%)", align: "center" },
      { key: "completed", label: "Completed (%)", align: "center" },
      { key: "closed", label: "Closed (%)", align: "center" }
    ], l = C(
      () => n.data.map((f, p) => ({
        id: `segment-${p}-${f.departure_airport}-${f.arrival_airport}-${f.segment_init_count}-${f.segment_started_count}`,
        departure_airport: f.departure_airport,
        conexion_airport: f.conexion_airport,
        arrival_airport: f.arrival_airport,
        segment_init_count: f.segment_init_count,
        segment_started_count: f.segment_started_count,
        segment_completed_count: f.segment_completed_count,
        segment_closed_count: f.segment_closed_count
      }))
    ), c = (f, p) => !p || p === 0 || !f ? "0%" : `${Math.round(f / p * 100)}%`, d = (f) => !f || f === "None" ? "-" : String(f).trim().replace(/_[0-9]+$/i, ""), h = (f) => {
      const p = d(f?.departure_airport), g = d(f?.arrival_airport);
      return p === "-" || g === "-" ? !1 : p === g;
    };
    return t({ isDark: i }), (f, p) => (m(), ee($e, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", k0, [
          n.data.length > 0 ? (m(), k("section", _0, [
            u("div", w0, [
              N(dt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": R(({ row: g }) => [
                  u("span", C0, A(d(g.departure_airport)), 1)
                ]),
                "cell-connection": R(({ row: g }) => [
                  u("span", {
                    class: Z(["segment-plain", {
                      "segment-plain--muted": d(g.conexion_airport) === "-"
                    }])
                  }, A(d(g.conexion_airport)), 3)
                ]),
                "cell-arrival": R(({ row: g }) => [
                  u("span", $0, A(d(g.arrival_airport)), 1)
                ]),
                "cell-trip": R(({ row: g }) => [
                  u("span", S0, A(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": R(({ row: g }) => [
                  Ae(A(P(de)(g.segment_init_count)), 1)
                ]),
                "cell-started": R(({ row: g }) => [
                  u("span", M0, A(c(
                    g.segment_started_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-completed": R(({ row: g }) => [
                  u("span", D0, A(c(
                    g.segment_completed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-closed": R(({ row: g }) => [
                  u("span", A0, A(c(
                    g.segment_closed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (m(), k("section", T0, [...p[0] || (p[0] = [
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
}), hr = /* @__PURE__ */ be(B0, [["__scopeId", "data-v-b8704d3c"]]), L0 = { class: "checkin-container__body" }, P0 = /* @__PURE__ */ ce({
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
    return (c, d) => (m(), ee($e, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[1] || (d[1] = (h) => n("open"))
    }, {
      default: R(() => [
        u("div", L0, [
          e.showCheckin ? (m(), ee(ur, {
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
          }, null, 8, ["initially-open", "loading", "checkin-data", "failed-data", "enable-export", "export-loading", "show-payment-links"])) : F("", !0),
          N(hr, {
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
}), I0 = /* @__PURE__ */ be(P0, [["__scopeId", "data-v-cf0fe2d3"]]), E0 = { class: "card-body" }, R0 = { class: "chart-section" }, F0 = { class: "chart-wrapper" }, O0 = {
  key: 1,
  class: "empty-chart"
}, V0 = { class: "payment-success-summary" }, z0 = {
  key: 0,
  class: "disruption-daily-section"
}, N0 = { class: "w-full min-w-0" }, j0 = { class: "font-medium text-center" }, H0 = { class: "text-center" }, W0 = { class: "text-center" }, K0 = { class: "percentage-text" }, Y0 = { class: "text-center" }, U0 = { class: "abandoned-value" }, q0 = { class: "badges-container badges-wrap" }, X0 = { class: "badges-container badges-wrap" }, G0 = {
  key: 1,
  class: "empty-state"
}, Z0 = /* @__PURE__ */ ce({
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
    }, i = C(() => n.data?.disruption_by_day ? [...n.data.disruption_by_day].sort(
      (y, b) => new Date(y.date).getTime() - new Date(b.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "abandoned", label: "Abandoned (%)", align: "center" },
      { key: "voluntary", label: "Voluntary", align: "left" },
      { key: "involuntary", label: "Involuntary", align: "left" }
    ], l = C(
      () => i.value.map((y) => ({
        id: y.date,
        ...y
      }))
    ), c = C(() => n.data?.total_payment_success || []), d = C(() => {
      const y = c.value;
      return y.length === 0 ? f(0) : y.map((b) => `${b.currency} ${f(b.total_value)}`).join(" · ");
    }), h = (y, b) => ha(y, b), f = (y) => Be(y), p = (y) => (y ?? []).reduce((b, x) => b + (x.count ?? 0), 0), g = (y) => typeof y.sell_success_count == "number" ? y.sell_success_count : p(y.payment_success_total), v = C(() => {
      const y = n.data, b = y.total_disruption_conversations || 0, x = y.total_disruption_initiated || 0, _ = y.total_voluntary || 0, w = y.total_involuntary || 0, $ = y.total_accepted || 0, D = y.total_confirmed || 0, S = typeof y.total_sell_success == "number" ? y.total_sell_success : p(y.total_payment_success), I = y.total_sell_failed || 0, V = Math.max(0, b - x), O = Math.max(
        0,
        x - _ - w
      ), M = Math.max(0, w - $), B = Math.max(0, _ - D), T = I, z = Math.max(0, D - S - T), H = (ue, me) => pe(ue, me), q = [
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
        label: H(x, b)
      }), V > 0 && ae.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: V,
        label: H(V, b)
      }), _ > 0 && ae.push({
        source: "Started",
        target: "Voluntary",
        value: _,
        label: H(_, b)
      }), w > 0 && ae.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: H(w, b)
      }), O > 0 && ae.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: O,
        label: H(O, b)
      }), $ > 0 && ae.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: H($, b)
      }), M > 0 && ae.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: M,
        label: H(M, b)
      }), D > 0 && ae.push({
        source: "Voluntary",
        target: "Confirmed",
        value: D,
        label: H(D, b)
      }), B > 0 && ae.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: B,
        label: H(B, b)
      }), S > 0 && ae.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: H(S, b)
      }), T > 0 && ae.push({
        source: "Confirmed",
        target: "Rejected",
        value: T,
        label: H(T, b)
      }), z > 0 && ae.push({
        source: "Confirmed",
        target: "Not Paid",
        value: z,
        label: H(z, b)
      }), { nodes: q, links: ae };
    });
    return (y, b) => (m(), ee($e, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: b[0] || (b[0] = (x) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", E0, [
          u("section", R0, [
            u("div", F0, [
              v.value.nodes.length > 0 && v.value.links.length > 0 ? (m(), ee(Zt, {
                key: 0,
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (m(), k("div", O0, [...b[1] || (b[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", V0, [
            N(ke, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (m(), k("section", z0, [
            b[2] || (b[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", N0, [
              N(dt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: x }) => [
                  u("span", j0, A(P(We)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": R(({ row: x }) => [
                  u("span", H0, A(P(de)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": R(({ row: x }) => [
                  u("span", W0, [
                    Ae(A(P(de)(Number(x.disruption_initiated_count))) + " ", 1),
                    u("span", K0, " (" + A(h(
                      Number(x.disruption_initiated_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": R(({ row: x }) => [
                  u("span", Y0, [
                    u("span", U0, A(P(de)(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                    )) + " (" + A(h(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": R(({ row: x }) => [
                  u("div", q0, [
                    (m(!0), k(re, null, ge([x], (_, w) => (m(), k(re, { key: w }, [
                      N(Ue, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: R(() => [
                          Ae(" VOL " + A(P(de)(_.voluntary_count)) + " (" + A(h(
                            _.voluntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "success" }, {
                        default: R(() => [
                          Ae(" Confirm " + A(P(de)(_.confirmed_count)) + " (" + A(h(
                            _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "warning" }, {
                        default: R(() => [
                          Ae(" Not Confirm " + A(P(de)(_.voluntary_count - _.confirmed_count)) + " (" + A(h(
                            _.voluntary_count - _.confirmed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "danger" }, {
                        default: R(() => [
                          Ae(" Reject " + A(P(de)(_.sell_failed_count)) + " (" + A(h(
                            _.sell_failed_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "orange" }, {
                        default: R(() => [
                          Ae(" Not Paid " + A(P(de)(
                            Math.max(
                              0,
                              _.confirmed_count - g(_) - _.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              _.confirmed_count - g(_) - _.sell_failed_count
                            ),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: R(() => [
                          Ae(" Finish " + A(P(de)(g(_))) + " (" + A(h(
                            g(_),
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (m(!0), k(re, null, ge(_.payment_success_total || [], ($) => (m(), ee(Ue, {
                        key: `${_.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: R(() => [
                          Ae(A($.currency) + " " + A(f($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": R(({ row: x }) => [
                  u("div", X0, [
                    (m(!0), k(re, null, ge([x], (_, w) => (m(), k(re, { key: w }, [
                      N(Ue, { color: "purple" }, {
                        default: R(() => [
                          Ae(" INV " + A(P(de)(_.involuntary_count)) + " (" + A(h(
                            _.involuntary_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "danger" }, {
                        default: R(() => [
                          Ae(" Human " + A(P(de)(_.involuntary_count - _.accepted_count)) + " (" + A(h(
                            _.involuntary_count - _.accepted_count,
                            _.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      N(Ue, { color: "success" }, {
                        default: R(() => [
                          Ae(" Accept " + A(P(de)(_.accepted_count)) + " (" + A(h(
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
          ])) : (m(), k("section", G0, [...b[3] || (b[3] = [
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
}), Q0 = /* @__PURE__ */ be(Z0, [["__scopeId", "data-v-033e517a"]]), J0 = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, eb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, tb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ab = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, nb = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, ob = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, sb = /* @__PURE__ */ ce({
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
    }, i = Me(n, "theme"), { isDark: r } = De(i), l = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = oe({
      labels: [],
      datasets: []
    }), d = C(
      () => n.data ?? {
        total_faq_events: 0,
        total_documents_found: 0,
        total_airline_information_retrieved: 0,
        total_booking_info_retrieved: 0,
        total_flight_status_retrieved: 0,
        faq_by_day: []
      }
    ), h = C(() => {
      const p = d.value, g = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, v = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", y = p.total_faq_events, b = y > 0 ? `${(p.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${v(p.total_airline_information_retrieved)}%`,
          subvalue: `${de(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${v(p.total_booking_info_retrieved)}%`,
          subvalue: `${de(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${v(p.total_flight_status_retrieved)}%`,
          subvalue: `${de(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: de(p.total_documents_found),
          subvalue: b
        }
      ];
    }), f = (p) => {
      if (!p) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = p.faq_by_day || [];
      if (g.length > 0) {
        const v = g.map(
          (_) => We(_.date).format("MMM DD")
        ), y = g.map(
          (_) => _.airline_information_retrieved_count || 0
        ), b = g.map(
          (_) => _.flight_status_retrieved_count || 0
        ), x = g.map(
          (_) => _.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: v,
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
              data: b,
              borderColor: l.flight_status,
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              fill: !0
            },
            {
              label: "Booking Information",
              data: x,
              borderColor: l.booking_info,
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: !0
            }
          ]
        };
      } else
        c.value = { labels: [], datasets: [] };
    };
    return Ee(
      () => n.data,
      (p) => {
        f(p ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (p, g) => (m(), ee($e, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", J0, [
          u("div", eb, [
            c.value.labels && c.value.labels.length ? (m(), k("section", tb, [
              u("div", ab, [
                N(bt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", nb, [
                (m(!0), k(re, null, ge(h.value, (v) => (m(), ee(ke, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: v.value,
                  subvalue: v.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (m(), k("section", ob, [...g[0] || (g[0] = [
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
}), ib = /* @__PURE__ */ be(sb, [["__scopeId", "data-v-b6ea961f"]]), rb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, lb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, cb = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, db = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ub = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, hb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, fb = { class: "max-w-[360px] px-4 text-center" }, gb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, mb = /* @__PURE__ */ ce({
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
    }, o = e, s = a, i = (p) => {
      s("export", p);
    }, r = Me(o, "theme"), { isDark: l } = De(r), c = C(() => {
      const p = o.data?.agents_by_day || {}, g = Object.keys(p).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const v = /* @__PURE__ */ new Set();
      for (const x of Object.values(p))
        for (const _ of Object.keys(x))
          v.add(_);
      const b = Array.from(v).map((x) => {
        const _ = x.toLowerCase(), w = n[_] || n[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: g.map(($) => p[$]?.[x] || 0),
          borderColor: w
        };
      });
      return {
        labels: g.map((x) => We(x).format("MMM DD")),
        datasets: b
      };
    }), d = C(() => {
      const p = o.data?.agents_by_day || {}, g = {};
      for (const y of Object.values(p))
        for (const [b, x] of Object.entries(y))
          g[b] = (g[b] || 0) + x;
      const v = Object.values(g).reduce((y, b) => y + b, 0);
      return v === 0 ? [] : Object.entries(g).sort(([, y], [, b]) => b - y).map(([y, b]) => {
        const x = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: b,
          percentage: (b / v * 100).toFixed(1),
          color: n[x] || n[y] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), f = C(() => {
      const p = h.value.length;
      if (!(p <= 0))
        return { gridTemplateColumns: `repeat(${p}, minmax(0, 1fr))` };
    });
    return t({ isDark: l }), (p, g) => (m(), ee($e, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", rb, [
          u("div", lb, [
            c.value.labels && c.value.labels.length ? (m(), k("section", cb, [
              u("div", db, [
                N(bt, {
                  data: c.value,
                  options: e.options,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (m(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(f.value)
              }, [
                (m(!0), k(re, null, ge(h.value, (v) => (m(), ee(ke, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${P(de)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : d.value.length ? (m(), k("section", ub, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(f.value)
              }, [
                (m(!0), k(re, null, ge(h.value, (v) => (m(), ee(ke, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${P(de)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            d.value.length ? F("", !0) : (m(), k("section", hb, [
              u("div", fb, [
                u("div", gb, [
                  N(P(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), pb = /* @__PURE__ */ be(mb, [["__scopeId", "data-v-932f6fac"]]), bb = { class: "card-body" }, vb = {
  key: 0,
  class: "chart-section"
}, yb = { class: "chart-wrapper" }, xb = {
  key: 1,
  class: "record-locator-daily-section"
}, kb = { class: "w-full min-w-0" }, _b = { class: "cell-plain font-medium" }, wb = { class: "cell-plain text-center" }, Cb = { class: "cell-plain text-center" }, $b = { class: "cell-plain text-center" }, Sb = { class: "cell-plain text-center" }, Mb = { class: "cell-plain text-center success-value" }, Db = { class: "cell-plain text-center failed-value" }, Ab = { class: "cell-plain text-center warning-value" }, Tb = { class: "cell-plain text-center" }, Bb = { class: "cell-plain text-center failed-value" }, Lb = {
  key: 2,
  class: "empty-state"
}, Pb = /* @__PURE__ */ ce({
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
    }, { isDark: i } = De(Me(n, "theme")), r = C(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
      (y, b) => new Date(y.date).getTime() - new Date(b.date).getTime()
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
    ], d = C(
      () => n.isAvianca ? [...l, ...c] : l
    ), h = C(
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
    ), f = C(() => n.data), p = (y, b) => ha(y, b), g = (y, b) => {
      const x = de(y), _ = p(y, b);
      return `${x} (${_})`;
    }, v = C(() => {
      const y = [], b = [], x = /* @__PURE__ */ new Set(), _ = (Y) => {
        x.has(Y) || (y.push({ name: Y }), x.add(Y));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: y, links: b };
      _("Checkin Init"), _("Booking retrive"), _("Checkin Started"), _("Checkin Completed"), _("Checkin Closed");
      const w = f.value.total_checkin_initiated, $ = f.value.total_record_locator_init, D = f.value.total_record_locator_started, S = f.value.total_record_locator_completed, I = f.value.total_record_locator_closed, V = f.value.total_record_locator_failed, O = f.value.total_record_locator_abandoned, M = f.value.total_record_locator_init_abandoned, B = f.value.total_checkin_pre_init_abandoned_error, T = f.value.total_checkin_pre_init_abandoned_voluntary, z = B != null || T != null, H = z ? Math.max(Number(B) || 0, 0) : 0, q = z ? Math.max(Number(T) || 0, 0) : 0, ae = f.value.total_record_locator_init_abandoned_error, ue = f.value.total_record_locator_init_abandoned_voluntary, me = ae != null || ue != null, U = me ? Math.max(Number(ae) || 0, 0) : 0, L = me ? Math.max(Number(ue) || 0, 0) : 0;
      $ > 0 && b.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: pe($, w)
      });
      const K = w - $;
      return z ? (q > 0 && (_("Abandoned (Init)"), b.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: q,
        label: pe(q, w)
      })), H > 0 && (_("Booking not retreived"), b.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: H,
        label: pe(H, w)
      }))) : K > 0 && (_("Abandoned (Init)"), b.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: K,
        label: pe(K, w)
      })), D > 0 && b.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: D,
        label: pe(D, w)
      }), me ? (U > 0 && (_("Error"), b.push({
        source: "Booking retrive",
        target: "Error",
        value: U,
        label: pe(U, w)
      })), L > 0 && (_("Abandoned (Started)"), b.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: L,
        label: pe(L, w)
      }))) : M > 0 && (_("Abandoned (Started)"), b.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: M,
        label: pe(M, w)
      })), S > 0 && b.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: pe(S, w)
      }), I > 0 && b.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: I,
        label: pe(I, w)
      }), V > 0 && (_("Checkin Failed"), b.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: V,
        label: pe(V, w)
      })), O > 0 && (_("Abandoned (Flow)"), b.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: O,
        label: pe(O, w)
      })), { nodes: y, links: b };
    });
    return t({ isDark: i }), (y, b) => (m(), ee($e, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", bb, [
          v.value.nodes.length > 0 ? (m(), k("section", vb, [
            u("div", yb, [
              N(Zt, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : F("", !0),
          r.value && r.value.length > 0 ? (m(), k("section", xb, [
            u("div", kb, [
              N(dt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: x }) => [
                  u("span", _b, A(P(We)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": R(({ row: x }) => [
                  u("span", wb, A(P(de)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": R(({ row: x }) => [
                  u("span", Cb, A(g(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": R(({ row: x }) => [
                  u("span", $b, A(P(de)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": R(({ row: x }) => [
                  u("span", Sb, A(g(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": R(({ row: x }) => [
                  u("span", Mb, A(g(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": R(({ row: x }) => [
                  u("span", Db, A(g(
                    x.record_locator_failed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": R(({ row: x }) => [
                  u("span", Ab, A(g(
                    x.record_locator_abandoned_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": R(({ row: x }) => [
                  u("span", Tb, A(P(de)(
                    x.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": R(({ row: x }) => [
                  u("span", Bb, A(P(de)(
                    x.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), k("section", Lb, [...b[0] || (b[0] = [
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
}), Ib = /* @__PURE__ */ be(Pb, [["__scopeId", "data-v-f904c66a"]]), Eb = { class: "card-body" }, Rb = {
  key: 0,
  class: "chart-section"
}, Fb = {
  key: 1,
  class: "empty-state"
}, Ob = {
  key: 2,
  class: "comparison-section"
}, Vb = { class: "comparison-grid" }, zb = /* @__PURE__ */ ce({
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
    ], s = e, i = a, r = (g) => {
      i("export", g);
    }, { isDark: l } = De(Me(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const v of s.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(v.channels))
          g.add(y);
      return Array.from(g).sort();
    }), d = (g, v) => n[g.toLowerCase()] ?? o[v % o.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function f(g) {
      if (g.delta === null) return "No previous data";
      const v = de(g.previous), y = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${v})` : `${g.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${v})`;
    }
    const p = C(() => {
      const g = s.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const v = g.map((b) => We(b.date).format("MMM-DD")), y = c.value.map((b, x) => ({
        label: b,
        data: g.map((_) => _.channels[b] ?? 0),
        backgroundColor: d(b, x),
        borderRadius: 4
      }));
      return { labels: v, datasets: y };
    });
    return t({ isDark: l }), (g, v) => (m(), ee($e, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !s.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", Eb, [
          p.value.labels.length > 0 ? (m(), k("section", Rb, [
            N(kt, {
              data: p.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (m(), k("section", Fb, [...v[0] || (v[0] = [
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
          e.channelComparison.length > 0 ? (m(), k("section", Ob, [
            u("div", Vb, [
              (m(!0), k(re, null, ge(e.channelComparison, (y, b) => (m(), ee(P(ke), {
                key: y.channel,
                color: d(y.channel, b),
                title: h(y.channel),
                value: P(de)(y.current),
                subvalue: f(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), fr = /* @__PURE__ */ be(zb, [["__scopeId", "data-v-4879d791"]]), Nb = { class: "card-body" }, jb = {
  key: 0,
  class: "chart-section"
}, Hb = { class: "chart-wrapper" }, Wb = {
  key: 1,
  class: "empty-state"
}, Kb = { class: "seller-value-cards" }, Yb = {
  key: 2,
  class: "seller-daily-section"
}, Ub = { class: "w-full min-w-0" }, qb = { class: "sl-cell font-medium" }, Xb = { class: "sl-cell text-center" }, Gb = { class: "sl-cell text-center" }, Zb = { class: "sl-cell text-center" }, Qb = { class: "sl-cell text-center" }, Jb = { class: "sl-cell text-center" }, ev = { class: "sl-cell text-center success-value" }, tv = {
  key: 0,
  class: "currency-cell-list"
}, av = {
  key: 1,
  class: "empty-cell"
}, nv = { class: "sl-cell text-center success-value" }, ov = { class: "sl-cell text-center" }, sv = { class: "sl-cell text-center success-value" }, iv = {
  key: 0,
  class: "currency-cell-list"
}, rv = {
  key: 1,
  class: "empty-cell"
}, lv = { class: "sl-cell text-center success-value" }, cv = { class: "sl-cell text-center" }, dv = { class: "sl-cell text-center success-value" }, uv = {
  key: 0,
  class: "currency-cell-list"
}, hv = { key: 1 }, fv = {
  key: 0,
  class: "failed-reasons"
}, gv = { class: "reason-name" }, mv = { class: "reason-count" }, pv = {
  key: 1,
  class: "empty-cell"
}, bv = /* @__PURE__ */ ce({
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
  setup(e, { expose: t, emit: a }) {
    function n(M) {
      return M;
    }
    const o = e, s = a, i = (M) => {
      s("export", M);
    }, { isDark: r } = De(Me(o, "theme")), l = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const M = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((B) => {
        const T = M.findIndex(
          (z) => z.date === B.date
        );
        T !== -1 ? M[T] = { ...M[T], reasons: B.reasons } : M.push({
          date: B.date,
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
          reasons: B.reasons
        });
      }), M.sort(
        (B, T) => new Date(B.date).getTime() - new Date(T.date).getTime()
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
      () => l.value.map((M) => ({
        id: M.date,
        ...M
      }))
    ), h = C(() => o.sellerData), f = C(() => o.failedData), p = C(
      () => Array.isArray(o.sellerData.total_value_sell_success) ? o.sellerData.total_value_sell_success : []
    ), g = C(
      () => Array.isArray(o.sellerData.total_value_sell_bank_transfer) ? o.sellerData.total_value_sell_bank_transfer : []
    ), v = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), y = C(() => {
      const M = p.value;
      return M.length > 0 ? M.map(
        (B) => `${B.currency} ${Ft(B.total_value)}`
      ).join(" · ") : O(o.sellerData.total_value_sell_success);
    });
    function b(M) {
      return M.length > 0 ? M.map(
        (B) => `${B.currency} ${Ft(B.total_value)}`
      ).join(" · ") : "—";
    }
    const x = C(
      () => b(g.value)
    ), _ = C(
      () => b(v.value)
    ), w = (M) => M.replace(/_/g, " ").replace(/\b\w/g, (B) => B.toUpperCase()), $ = (M) => `Failed:
${w(M)}`, D = C(() => {
      const {
        total_seller_conversations: M = 0,
        total_sell_started: B = 0,
        total_sell_booking_created: T = 0,
        total_sell_success: z = 0,
        total_sell_bank_transfer: H = 0,
        total_sell_cash_option: q = 0,
        total_sell_success_bank_transfer: ae = 0,
        total_sell_success_cash: ue = 0
      } = h.value, { failed_by_reason_by_day: me = [] } = f.value;
      if (M === 0) return { nodes: [], links: [] };
      const U = Math.max(
        0,
        z - (ae ?? 0) - (ue ?? 0)
      ), L = [
        { name: "Sell Initiated", value: M, status: "success" },
        { name: "Sell Started", value: B, status: "success" },
        { name: "Booking Created", value: T, status: "success" },
        { name: "Sell Success", value: U, status: "success" }
      ], K = [], Y = M - B;
      Y > 0 && (L.push({
        name: "Abandoned (Init)",
        value: Y,
        status: "abandon"
      }), K.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: Y,
        label: pe(Y, M)
      })), B > 0 && K.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: B,
        label: pe(B, M)
      });
      const le = me.reduce(
        (W, j) => (j.reasons && Array.isArray(j.reasons) && j.reasons.forEach((te) => {
          const se = te.reason, X = te.failed_count;
          W[se] = (W[se] || 0) + X;
        }), W),
        {}
      );
      T > 0 && K.push({
        source: "Sell Started",
        target: "Booking Created",
        value: T,
        label: pe(T, M)
      }), H > 0 && (L.push({ name: "Bank Transfer", value: H, status: "success" }), K.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: H,
        label: pe(H, M)
      })), q > 0 && (L.push({ name: "Cash Option", value: q, status: "success" }), K.push({
        source: "Booking Created",
        target: "Cash Option",
        value: q,
        label: pe(q, M)
      })), U > 0 && K.push({
        source: "Booking Created",
        target: "Sell Success",
        value: U,
        label: pe(U, M)
      }), (ae ?? 0) > 0 && (L.push({
        name: "Bank Transfer Success",
        value: ae ?? 0,
        status: "success"
      }), K.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ae ?? 0,
        label: pe(ae ?? 0, M)
      })), (ue ?? 0) > 0 && (L.push({
        name: "Cash Option Success",
        value: ue ?? 0,
        status: "success"
      }), K.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: ue ?? 0,
        label: pe(ue ?? 0, M)
      }));
      const ve = T - U - H - q;
      ve > 0 && (L.push({
        name: "Failed at Completion",
        value: ve,
        status: "error"
      }), K.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: ve,
        label: pe(ve, M)
      }));
      const Q = B - T;
      if (Q > 0 && (L.push({
        name: "Failed at Booking",
        value: Q,
        status: "error"
      }), K.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: Q,
        label: pe(Q, M)
      })), Object.keys(le).length > 0) {
        const W = Object.values(le).reduce(
          (te, se) => te + se,
          0
        ), j = Q - W;
        Object.entries(le).filter(([, te]) => te > 0).sort(([, te], [, se]) => se - te).forEach(([te, se]) => {
          const X = `Failed: ${te}`;
          L.push({
            name: X,
            value: se,
            status: "error",
            label: $(te)
          }), K.push({
            source: "Failed at Booking",
            target: X,
            value: se,
            label: pe(se, M)
          });
        }), j > 0 && (L.push({
          name: "Failed: Without Reason",
          value: j,
          status: "error",
          label: `Failed:
Without Reason`
        }), K.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: j,
          label: pe(j, M)
        }));
      }
      return { nodes: L, links: K };
    }), S = (M, B) => ha(M, B), I = (M, B) => {
      const T = de(M), z = S(M, B);
      return `${T} (${z})`;
    }, V = (M) => M == null ? 0 : typeof M == "number" ? M : Array.isArray(M) ? M.reduce((B, T) => B + (T.total_value || 0), 0) : 0, O = (M) => Ft(V(M));
    return t({ isDark: r }), (M, B) => (m(), ee($e, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", Nb, [
          D.value.nodes.length > 0 ? (m(), k("section", jb, [
            u("div", Hb, [
              N(Zt, {
                data: D.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (m(), k("section", Wb, [...B[0] || (B[0] = [
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
          u("section", Kb, [
            N(ke, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            N(ke, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: x.value
            }, null, 8, ["value"]),
            N(ke, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: _.value
            }, null, 8, ["value"])
          ]),
          l.value && l.value.length > 0 ? (m(), k("section", Yb, [
            u("div", Ub, [
              N(dt, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: T }) => [
                  u("span", qb, A(P(We)(String(T.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": R(({ row: T }) => [
                  u("span", Xb, A(P(de)(Number(T.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": R(({ row: T }) => [
                  u("span", Gb, A(I(
                    T.sell_started_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": R(({ row: T }) => [
                  u("span", Zb, A(I(
                    T.sell_get_quote_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": R(({ row: T }) => [
                  u("span", Qb, A(I(
                    T.sell_booking_created_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": R(({ row: T }) => [
                  u("span", Jb, A(P(de)(Number(T.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": R(({ row: T }) => [
                  u("span", ev, [
                    Array.isArray(
                      T.daily_value_sell_success_bank_transfer
                    ) && T.daily_value_sell_success_bank_transfer.length > 0 ? (m(), k("div", tv, [
                      (m(!0), k(re, null, ge(T.daily_value_sell_success_bank_transfer, (z) => (m(), k("span", {
                        key: `${T.date}-bt-success-${z.currency}`
                      }, A(z.currency) + " " + A(P(Ft)(z.total_value)), 1))), 128))
                    ])) : (m(), k("span", av, "-"))
                  ])
                ]),
                "cell-btSuccess": R(({ row: T }) => [
                  u("span", nv, A(P(de)(
                    Number(
                      T.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": R(({ row: T }) => [
                  u("span", ov, A(P(de)(Number(T.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": R(({ row: T }) => [
                  u("span", sv, [
                    Array.isArray(
                      T.daily_value_sell_success_cash
                    ) && T.daily_value_sell_success_cash.length > 0 ? (m(), k("div", iv, [
                      (m(!0), k(re, null, ge(T.daily_value_sell_success_cash, (z) => (m(), k("span", {
                        key: `${T.date}-co-success-${z.currency}`
                      }, A(z.currency) + " " + A(P(Ft)(z.total_value)), 1))), 128))
                    ])) : (m(), k("span", rv, "-"))
                  ])
                ]),
                "cell-cashSuccess": R(({ row: T }) => [
                  u("span", lv, A(P(de)(
                    Number(T.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": R(({ row: T }) => [
                  u("span", cv, A(I(
                    T.sell_success_count,
                    T.seller_conversations || T.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": R(({ row: T }) => [
                  u("span", dv, [
                    Array.isArray(T.daily_value_sell_success) && T.daily_value_sell_success.length > 0 ? (m(), k("div", uv, [
                      (m(!0), k(re, null, ge(T.daily_value_sell_success, (z) => (m(), k("span", {
                        key: `${T.date}-${z.currency}`
                      }, A(z.currency) + " " + A(P(Ft)(z.total_value)), 1))), 128))
                    ])) : (m(), k("span", hv, A(O(
                      T.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": R(({ row: T }) => [
                  (T.reasons || []).length > 0 ? (m(), k("div", fv, [
                    (m(!0), k(re, null, ge(T.reasons || [], (z) => (m(), k("div", {
                      key: z.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", gv, A(z.reason) + ":", 1),
                      u("span", mv, A(z.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), k("div", pv, "-"))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), gr = /* @__PURE__ */ be(bv, [["__scopeId", "data-v-f823c802"]]), vv = { class: "seller-container__body" }, yv = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = C(
      () => a.loading ? !1 : a.sellerLoading
    ), s = C(
      () => a.loading ? !1 : a.salesByChannelLoading
    ), i = C(() => a.exportLoading || a.sellerExportLoading), r = C(() => a.exportLoading || a.salesByChannelExportLoading);
    function l(c, d) {
      n("export", { source: c, format: d });
    }
    return (c, d) => (m(), ee($e, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[2] || (d[2] = (h) => n("open"))
    }, {
      default: R(() => [
        u("div", vv, [
          N(gr, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => l("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          N(fr, {
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
}), xv = /* @__PURE__ */ be(yv, [["__scopeId", "data-v-bd0ec4ff"]]), kv = { class: "card-body" }, _v = {
  key: 0,
  class: "chart-section"
}, wv = {
  key: 1,
  class: "empty-state"
}, Cv = { class: "empty-state-content" }, $v = { class: "empty-icon-wrapper" }, Sv = /* @__PURE__ */ ce({
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
    }, { isDark: r, colors: l } = De(Me(o, "theme")), c = C(() => {
      const f = (o.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.reduce(
        (y, b) => y + (Number(b.conversations) || 0),
        0
      ), g = f.map((y) => {
        const b = y.agent_type?.toLowerCase();
        return n[b] || "#94a3b8";
      }), v = g.map((y) => `${y}80`);
      return {
        labels: f.map((y) => {
          const b = Number(y.conversations) || 0, x = p ? b / p * 100 : 0;
          return `${y.agent_type} - ${b.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((y) => y.conversations),
            backgroundColor: v,
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
              const f = (h.label || "").toString().split(" - ")[0], p = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce(
                (y, b) => y + (Number(b) || 0),
                0
              ), v = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (m(), ee($e, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", kv, [
          c.value.labels && c.value.labels.length ? (m(), k("section", _v, [
            N(Dn, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (m(), k("section", wv, [
            u("div", Cv, [
              u("div", $v, [
                N(P(zm), { class: "empty-icon" })
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
}), Mv = /* @__PURE__ */ be(Sv, [["__scopeId", "data-v-08639fed"]]), Dv = { class: "card-body" }, Av = {
  key: 0,
  class: "payment-methods-section"
}, Tv = { class: "payment-methods-grid" }, Bv = {
  key: 1,
  class: "empty-state"
}, Lv = { class: "empty-state-content" }, Pv = { class: "empty-icon-wrapper" }, Iv = {
  key: 2,
  class: "payment-method-daily-section"
}, Ev = { class: "w-full min-w-0" }, Rv = { class: "font-medium" }, Fv = { class: "text-center" }, Ov = { class: "text-center success-value" }, Vv = {
  key: 0,
  class: "currency-cell-list"
}, zv = { class: "payment-tags" }, Nv = { class: "tag-name" }, jv = {
  key: 0,
  class: "tag-amount"
}, Hv = {
  key: 1,
  class: "tag-amount"
}, Wv = { class: "tag-count" }, Kv = {
  key: 3,
  class: "empty-table-state"
}, Yv = "Not Registered", Uv = /* @__PURE__ */ ce({
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
    const n = e, o = a, { isDark: s } = De(Me(n, "theme")), i = oe(!1), r = oe({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), d = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((S, I) => We(S.date).valueOf() - We(I.date).valueOf())), h = [
      { key: "date", label: "Date", align: "left" },
      { key: "totalSales", label: "Total Sales", align: "center" },
      { key: "totalAmount", label: "Total Amount", align: "center" },
      { key: "paymentMethods", label: "Payment Methods", align: "left" }
    ], f = C(
      () => d.value.map((S) => ({
        id: S.date,
        date: S.date,
        total_count: S.total_count,
        total_amount: S.total_amount,
        total_amount_by_currency: S.total_amount_by_currency,
        payment_methods: S.payment_methods
      }))
    ), p = (S) => {
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
      const I = (S.payment_method_breakdown || []).map(
        (O) => ({
          payment_method: O.payment_method || "Unknown",
          total_amount: O.total_amount ?? 0,
          count: O.count ?? 0,
          total_amount_by_currency: O.total_amount_by_currency ?? []
        })
      ), V = (S.payment_method_by_day || []).map((O) => ({
        date: O.date || "",
        total_count: O.total_count ?? 0,
        total_amount: O.total_amount ?? 0,
        total_amount_by_currency: O.total_amount_by_currency ?? [],
        payment_methods: (O.payment_methods || []).map((M) => ({
          payment_method: M.payment_method || "Unknown",
          total_amount: M.total_amount ?? 0,
          count: M.count ?? 0,
          total_amount_by_currency: M.total_amount_by_currency ?? []
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
        payment_method_breakdown: I,
        payment_method_by_day: V
      };
    }, g = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [S, I] = n.dates.map(
            (O) => We(O).format("YYYY-MM-DD")
          ), V = await n.fetchFunction(
            n.airlineName,
            S,
            I
          );
          r.value = p(V);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), r.value = p(null);
        } finally {
          i.value = !1;
        }
      }
    }, v = [
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#f59e0b",
      "#f43f5e",
      "#06b6d4"
    ], y = (S) => !S || S.toLowerCase() === "unknown" ? Yv : S.replace(/_/g, " "), b = (S) => S == null ? "$0.00" : Be(S), x = (S) => {
      const I = S.total_amount_by_currency;
      return I && I.length > 0 ? I.map((V) => `${V.currency} ${b(V.total_value)}`).join(" · ") : b(S.total_amount);
    }, _ = (S) => S ? We(S).format("MMM DD") : "-", w = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), $ = (S) => {
      o("export", S);
    };
    function D() {
      const S = n.data;
      S && (Array.isArray(S.payment_method_breakdown) && S.payment_method_breakdown.length > 0 || Array.isArray(S.payment_method_by_day) && S.payment_method_by_day.length > 0) && (i.value = !1, r.value = p(S));
    }
    return Ze(() => {
      n.data ? D() : g();
    }), Ee(
      () => n.data,
      (S) => {
        S && D();
      },
      { deep: !0 }
    ), Ee(
      () => n.dates,
      (S) => {
        n.data || S && S[0] && S[1] && g();
      },
      { deep: !0 }
    ), t({ isDark: s }), (S, I) => (m(), ee($e, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: I[0] || (I[0] = (V) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !i.value ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", Dv, [
          l.value ? (m(), k("section", Av, [
            I[1] || (I[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Tv, [
              (m(!0), k(re, null, ge(r.value.payment_method_breakdown, (V, O) => (m(), ee(ke, {
                key: V.payment_method,
                class: "payment-method-card-item min-w-0",
                color: v[O % v.length],
                title: y(V.payment_method),
                value: x(V),
                subvalue: `${w(V.count)} ${w(V.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (m(), k("section", Bv, [
            u("div", Lv, [
              u("div", Pv, [
                N(P(jm), { class: "empty-icon" })
              ]),
              I[2] || (I[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              I[3] || (I[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (m(), k("section", Iv, [
            I[5] || (I[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", Ev, [
              N(dt, {
                columns: h,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": R(({ row: V }) => [
                  u("span", Rv, A(_(String(V.date))), 1)
                ]),
                "cell-totalSales": R(({ row: V }) => [
                  u("span", Fv, A(P(de)(V.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": R(({ row: V }) => [
                  u("span", Ov, [
                    Array.isArray(V.total_amount_by_currency) && V.total_amount_by_currency.length > 0 ? (m(), k("div", Vv, [
                      (m(!0), k(re, null, ge(V.total_amount_by_currency, (O) => (m(), k("span", {
                        key: `${V.date}-${O.currency}`
                      }, A(O.currency) + " " + A(b(O.total_value)), 1))), 128))
                    ])) : (m(), k(re, { key: 1 }, [
                      Ae(A(b(Number(V.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": R(({ row: V }) => [
                  u("div", zv, [
                    (m(!0), k(re, null, ge(Array.isArray(V.payment_methods) ? V.payment_methods : [], (O) => (m(), k("div", {
                      key: O.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", Nv, A(y(O.payment_method)), 1),
                      I[4] || (I[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !O.total_amount_by_currency || O.total_amount_by_currency.length === 0 ? (m(), k("span", jv, A(b(O.total_amount)), 1)) : (m(), k("span", Hv, A(O.total_amount_by_currency.map(
                        (M) => `${M.currency} ${b(M.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", Wv, "(" + A(w(O.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (m(), k("div", Kv, [...I[6] || (I[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : F("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), qv = /* @__PURE__ */ be(Uv, [["__scopeId", "data-v-168637eb"]]), Xv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Gv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Zv = {
  key: "title-content",
  class: "header-title-group"
}, Qv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, Jv = {
  key: 0,
  class: "metric-label metric-label--header"
}, ey = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, ty = { key: "aside-content" }, ay = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, ny = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, oy = {
  key: "body-content",
  class: "highlight-inner"
}, sy = { class: "card-body" }, iy = { class: "metric-row" }, ry = {
  key: 0,
  class: "metric-prefix"
}, ly = {
  key: 0,
  class: "metric-label"
}, cy = /* @__PURE__ */ ce({
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
    const a = e, { isDark: n } = De(Me(a, "theme")), o = C(() => a.labelPosition === "header"), s = C(
      () => a.previousValue !== null && a.previousValue !== void 0
    ), i = C(() => {
      if (!s.value) return 0;
      const c = a.previousValue;
      return c === 0 ? a.currentValue > 0 ? 100 : 0 : (a.currentValue - c) / c * 100;
    }), r = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, d) => (m(), ee($e, {
      collapsible: !1,
      class: Z([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": P(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: R(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            e.loading ? (m(), k("div", Xv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (m(), k("div", Gv)) : F("", !0)
            ])) : (m(), k("div", Zv, [
              u("div", Qv, [
                _e(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (m(), k("span", Jv, A(e.label), 1)) : F("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: R(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            e.loading ? (m(), k("div", ey)) : (m(), k("div", ty, [
              _e(c.$slots, "headerAside", {}, () => [
                s.value ? (m(), k("div", {
                  key: 0,
                  class: Z(["change-badge", l.value])
                }, A(r.value), 3)) : F("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: R(() => [
        N(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: R(() => [
            e.loading ? (m(), k("div", ay, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? F("", !0) : (m(), k("div", ny))
            ])) : (m(), k("div", oy, [
              u("div", sy, [
                _e(c.$slots, "value", {}, () => [
                  u("div", iy, [
                    e.prefix ? (m(), k("span", ry, A(e.prefix), 1)) : F("", !0),
                    u("span", {
                      class: Z(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? F("", !0) : (m(), k("span", ly, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), St = /* @__PURE__ */ be(cy, [["__scopeId", "data-v-c81268f4"]]);
function So(e, t) {
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
function ze() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ot = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", at = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", dy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", uy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], hy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, fy = ["placeholder", "aria-label"], gy = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, my = ["aria-selected", "onClick", "onMouseenter"], py = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, by = { class: "min-w-0 flex-1" }, Mo = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-select-${ze()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = oe(null), c = oe(null), d = oe(null), h = oe(null), f = oe(null), p = oe(!1), g = oe(0), v = oe(""), y = oe({});
    function b() {
      const U = c.value;
      if (!U) return;
      const L = U.getBoundingClientRect();
      y.value = {
        top: `${L.bottom - 3}px`,
        left: `${L.left}px`,
        width: `${L.width}px`
      };
    }
    const x = C(() => a.options.filter((U) => !U.disabled)), _ = C(() => {
      if (!a.searchable) return x.value;
      const U = v.value.trim().toLowerCase();
      return U ? x.value.filter((L) => L.label.toLowerCase().includes(U)) : x.value;
    }), w = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), $ = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((L) => L.value === a.modelValue)?.label ?? String(a.modelValue));
    function D(U) {
      return `${String(U.value)}-${U.label}`;
    }
    function S(U) {
      return a.modelValue === U.value;
    }
    function I(U, L) {
      const K = S(U), Y = g.value === L;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        K ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !K && Y ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function V() {
      g.value = Math.max(
        0,
        _.value.findIndex((U) => U.value === a.modelValue)
      );
    }
    function O() {
      if (a.searchable) {
        f.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function M() {
      b(), v.value = "", V(), je(() => O());
    }
    function B() {
      p.value = !1, v.value = "";
    }
    function T(U) {
      n("update:modelValue", U.value), B();
    }
    function z() {
      if (!a.disabled) {
        if (p.value) {
          B();
          return;
        }
        p.value = !0, M();
      }
    }
    function H(U) {
      U.stopPropagation(), !a.disabled && z();
    }
    function q(U) {
      if (!p.value) return;
      const L = U.target, K = l.value, Y = d.value;
      K && !K.contains(L) && (!Y || !Y.contains(L)) && B();
    }
    function ae(U) {
      a.disabled || (U.key === "ArrowDown" || U.key === "Enter" || U.key === " ") && (U.preventDefault(), p.value || (p.value = !0, M()));
    }
    function ue(U) {
      const L = _.value;
      if (U.key === "Escape") {
        U.preventDefault(), B();
        return;
      }
      if (U.key === "ArrowDown") {
        if (U.preventDefault(), L.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (U.key === "ArrowUp") {
        if (U.preventDefault(), L.length === 0) return;
        g.value = L.length - 1, h.value?.focus();
        return;
      }
      if (U.key === "Enter") {
        U.preventDefault();
        const K = L[g.value];
        K && T(K);
      }
    }
    function me(U) {
      const L = _.value;
      if (U.key === "Escape") {
        U.preventDefault(), B();
        return;
      }
      if (L.length !== 0) {
        if (U.key === "ArrowDown") {
          U.preventDefault(), g.value = Math.min(g.value + 1, L.length - 1);
          return;
        }
        if (U.key === "ArrowUp") {
          if (U.preventDefault(), g.value === 0 && a.searchable) {
            f.value?.focus();
            return;
          }
          g.value = Math.max(g.value - 1, 0);
          return;
        }
        if (U.key === "Enter") {
          U.preventDefault();
          const K = L[g.value];
          K && T(K);
        }
      }
    }
    return Ee(v, () => {
      g.value = 0;
    }), Ze(() => {
      document.addEventListener("click", q);
    }), ct(() => {
      document.removeEventListener("click", q);
    }), (U, L) => (m(), k("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: Z(P(ot))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          P(at),
          "flex items-center justify-between gap-2 text-left",
          p.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": p.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: H,
        onKeydown: ae
      }, [
        u("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A($.value), 3),
        N(P(Gt), {
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", p.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, uy),
      (m(), ee(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: Ce(y.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (m(), k("div", hy, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: f,
              "onUpdate:modelValue": L[0] || (L[0] = (K) => v.value = K),
              type: "search",
              class: Z([P(at), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: L[1] || (L[1] = Fe(() => {
              }, ["stop"])),
              onKeydown: Fe(ue, ["stop"])
            }, null, 42, fy), [
              [Wt, v.value]
            ])
          ])) : F("", !0),
          u("ul", {
            id: r,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: Fe(me, ["stop"])
          }, [
            _.value.length === 0 ? (m(), k("li", gy, A(e.noResultsText), 1)) : F("", !0),
            (m(!0), k(re, null, ge(_.value, (K, Y) => (m(), k("li", {
              key: D(K),
              role: "option",
              "aria-selected": S(K),
              class: Z(I(K, Y)),
              onClick: Fe((le) => T(K), ["stop"]),
              onMouseenter: (le) => g.value = Y
            }, [
              e.showOptionCheck ? (m(), k("span", py, [
                S(K) ? (m(), ee(P(So), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ])) : F("", !0),
              u("span", by, A(K.label), 1)
            ], 42, my))), 128))
          ], 544)
        ], 4), [
          [Ut, p.value]
        ])
      ]))
    ], 512));
  }
}), vy = { class: "card-body" }, yy = { class: "kpi-closed-value" }, xy = { class: "kpi-closed-value__main" }, ky = {
  key: 0,
  class: "kpi-closed-value__pct"
}, _y = { class: "table-view-select flex justify-end" }, wy = { class: "table-section w-full min-w-0" }, Cy = { class: "cell-plain" }, $y = { class: "cell-plain" }, Sy = { class: "cell-plain cell-plain--muted" }, My = { class: "cell-plain" }, Dy = { class: "cell-plain" }, Ay = { class: "cell-plain" }, Ty = {
  key: 2,
  class: "empty-state"
}, By = 6, Ly = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (W) => {
      o("export", W);
    }, { isDark: i } = De(Me(n, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(W) {
      const j = W?.trim() ?? "";
      return j.length > 0 && !r.has(j);
    }
    function c(W) {
      if (!l(W.agent_email)) return !1;
      const j = W.assigned_count ?? 0, te = W.closed_count ?? 0;
      return j > 0 || te > 0;
    }
    function d(W) {
      return W.closed_count ?? 0;
    }
    function h(W) {
      const j = W?.trim();
      return j || "—";
    }
    const f = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), p = C(() => f.value.length > 0), g = C(() => {
      const W = (n.data?.total_enqueued ?? 0) > 0;
      return p.value || W;
    }), v = oe("by_date"), y = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], b = oe("date"), x = oe("desc");
    Ee(v, (W) => {
      W === "aggregated" ? (b.value = "name", x.value = "asc") : (b.value = "date", x.value = "desc");
    });
    function _(W, j) {
      return j == null ? null : j === 0 ? W > 0 ? 100 : 0 : (W - j) / j * 100;
    }
    function w(W) {
      const j = W.toFixed(1);
      return W > 0 ? `+${j}%` : `${j}%`;
    }
    function $(W, j = !1) {
      const te = j ? -W : W;
      return te > 0 ? "change-badge--up" : te < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function D(W, j) {
      if (W === null) return null;
      const te = _(W, j);
      return te === null ? null : {
        label: w(te),
        class: $(te, !0)
      };
    }
    function S(W) {
      if (W == null || W === "") return null;
      if (typeof W == "number")
        return Number.isFinite(W) ? W : null;
      const j = W.trim();
      if (!j) return null;
      if (j.includes(":")) {
        const se = j.split(":").map(Number);
        return se.length !== 3 || se.some(isNaN) ? null : se[0] * 3600 + se[1] * 60 + se[2];
      }
      const te = Number(j);
      return Number.isFinite(te) ? te : null;
    }
    function I(W) {
      const j = Math.round(W), te = Math.floor(j / 3600), se = Math.floor(j % 3600 / 60), X = j % 60;
      return `${String(te).padStart(2, "0")}:${String(se).padStart(2, "0")}:${String(X).padStart(2, "0")}`;
    }
    function V(W) {
      const j = S(W);
      return j === null ? "—" : typeof W == "string" && W.includes(":") ? W.trim() : I(j);
    }
    const O = C(() => n.data?.total_enqueued ?? 0), M = C(() => n.data?.total_closed ?? 0), B = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), T = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), z = C(() => O.value <= 0 ? null : `(${(M.value / O.value * 100).toFixed(1)}%)`), H = C(
      () => D(
        S(B.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), q = C(
      () => D(
        S(T.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function ae(W, j) {
      return {
        id: `${W.date}-${W.agent_email}-${j}`,
        date: W.date,
        dateSort: new Date(W.date).getTime(),
        agent_name: W.agent_name ?? "",
        agent_email: W.agent_email,
        handled: d(W),
        avg_assignation_seconds: S(W.avg_time_to_assign_seconds),
        avg_resolution_seconds: S(W.avg_conversation_duration_seconds),
        avg_assignation_display: V(W.avg_time_to_assign_seconds),
        avg_resolution_display: V(W.avg_conversation_duration_seconds)
      };
    }
    function ue(W) {
      const j = /* @__PURE__ */ new Map();
      for (const te of W) {
        if (!c(te)) continue;
        const se = te.agent_email.trim();
        j.has(se) || j.set(se, {
          agent_name: te.agent_name?.trim() ?? "",
          agent_email: se,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const X = j.get(se), J = te.assigned_count ?? 0, ne = te.closed_count ?? 0;
        X.handled += d(te), te.agent_name?.trim() && (X.agent_name = te.agent_name.trim());
        const fe = S(te.avg_time_to_assign_seconds);
        fe !== null && J > 0 && (X.assignSum += fe * J, X.assignWeight += J);
        const xe = S(te.avg_conversation_duration_seconds);
        xe !== null && ne > 0 && (X.resolutionSum += xe * ne, X.resolutionWeight += ne);
      }
      return Array.from(j.values()).map((te, se) => {
        const X = te.assignWeight > 0 ? te.assignSum / te.assignWeight : null, J = te.resolutionWeight > 0 ? te.resolutionSum / te.resolutionWeight : null;
        return {
          id: `agg-${te.agent_email}-${se}`,
          agent_name: te.agent_name,
          agent_email: te.agent_email,
          handled: te.handled,
          avg_assignation_seconds: X,
          avg_resolution_seconds: J,
          avg_assignation_display: X !== null ? I(X) : "—",
          avg_resolution_display: J !== null ? I(J) : "—"
        };
      });
    }
    const me = C(() => {
      const W = f.value;
      return v.value === "aggregated" ? ue(W) : W.map(ae);
    });
    function U(W, j, te, se) {
      const X = se === "asc" ? 1 : -1;
      let J = 0;
      switch (te) {
        case "date":
          J = (W.dateSort ?? 0) - (j.dateSort ?? 0);
          break;
        case "name":
          J = (W.agent_name || "").localeCompare(j.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          J = W.agent_email.localeCompare(j.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          J = W.handled - j.handled;
          break;
        case "avgAssignation":
          J = (W.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (j.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          J = (W.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (j.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (J !== 0) return J * X;
      if (v.value === "by_date" && te !== "date") {
        const ne = (j.dateSort ?? 0) - (W.dateSort ?? 0);
        if (ne !== 0) return ne;
      }
      return (W.agent_name || "").localeCompare(j.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const L = C(() => {
      const W = [...me.value];
      return W.sort((j, te) => U(j, te, b.value, x.value)), W;
    }), K = C(
      () => L.value
    ), Y = C(() => {
      const W = [];
      return v.value === "by_date" && W.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), W.push(
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
      ), W;
    });
    function le(W) {
      const j = W;
      if (b.value === j) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      b.value = j, j === "date" ? x.value = "desc" : j === "name" || j === "email" ? x.value = "asc" : x.value = "desc";
    }
    const ve = (W) => W == null ? "0" : de(W), Q = (W) => new Date(W).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (W, j) => (m(), ee($e, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: j[1] || (j[1] = (te) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", vy, [
          g.value ? (m(), k("div", {
            key: 0,
            class: Z(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": P(i) }])
          }, [
            N(St, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ve(O.value),
              theme: e.theme,
              "current-value": O.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: R(() => [...j[2] || (j[2] = [
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
            N(St, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ve(M.value),
              theme: e.theme,
              "current-value": M.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: R(() => [...j[3] || (j[3] = [
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
              value: R(() => [
                u("div", yy, [
                  u("span", xy, A(ve(M.value)), 1),
                  z.value ? (m(), k("span", ky, A(z.value), 1)) : F("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            N(St, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: V(B.value),
              theme: e.theme,
              "current-value": S(B.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, Ao({
              icon: R(() => [
                j[4] || (j[4] = u("svg", {
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
                fn: R(() => [
                  u("div", {
                    class: Z(["duration-trend-badge", H.value.class])
                  }, A(H.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            N(St, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: V(T.value),
              theme: e.theme,
              "current-value": S(T.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, Ao({
              icon: R(() => [
                j[5] || (j[5] = u("svg", {
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
              q.value ? {
                name: "headerAside",
                fn: R(() => [
                  u("div", {
                    class: Z(["duration-trend-badge", q.value.class])
                  }, A(q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : F("", !0),
          p.value ? (m(), ee($e, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: R(() => [
              u("div", _y, [
                N(Mo, {
                  modelValue: v.value,
                  "onUpdate:modelValue": j[0] || (j[0] = (te) => v.value = te),
                  options: y,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: R(() => [
              u("div", wy, [
                (m(), ee(dt, {
                  key: `${v.value}-${b.value}-${x.value}`,
                  columns: Y.value,
                  rows: K.value,
                  "sort-key": b.value,
                  "sort-direction": x.value,
                  "max-visible-rows": By,
                  "row-key": "id",
                  onSort: le
                }, {
                  "cell-date": R(({ row: te }) => [
                    u("span", Cy, A(Q(String(te.date))), 1)
                  ]),
                  "cell-name": R(({ row: te }) => [
                    u("span", $y, A(h(te.agent_name)), 1)
                  ]),
                  "cell-email": R(({ row: te }) => [
                    u("span", Sy, A(te.agent_email), 1)
                  ]),
                  "cell-handled": R(({ row: te }) => [
                    u("span", My, A(ve(Number(te.handled))), 1)
                  ]),
                  "cell-avgAssignation": R(({ row: te }) => [
                    u("span", Dy, A(te.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": R(({ row: te }) => [
                    u("span", Ay, A(te.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : g.value ? F("", !0) : (m(), k("div", Ty, [...j[6] || (j[6] = [
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
}), Py = /* @__PURE__ */ be(Ly, [["__scopeId", "data-v-837b41e7"]]), Iy = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ey = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Ry = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Fy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Oy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Vy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, zy = { class: "max-w-[360px] px-4 text-center" }, Ny = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ti = 5, jy = /* @__PURE__ */ ce({
  __name: "ChannelMetrics",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  emits: ["export"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, i = Me(n, "theme"), { isDark: r } = De(i), l = {
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
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const v = d.value.total_by_channel || {}, y = Object.values(v).reduce(
        (b, x) => b + x,
        0
      );
      return y === 0 ? [] : Object.entries(v).sort(([, b], [, x]) => x - b).map(([b, x]) => ({
        name: b,
        label: b.toUpperCase(),
        total: x,
        percentage: (x / y * 100).toFixed(1),
        color: l[b.toLowerCase()] || "#9ca3af"
      }));
    }), f = C(
      () => h.value.slice(0, ti)
    ), p = C(() => {
      const v = Math.min(f.value.length, ti);
      if (!(v <= 0))
        return { gridTemplateColumns: `repeat(${v}, minmax(0, 1fr))` };
    }), g = (v) => {
      if (!v || !v.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const y = v.channels_by_day, b = Object.keys(y).sort();
      if (b.length === 0) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const x = /* @__PURE__ */ new Set();
      for (const $ of Object.values(y))
        for (const D of Object.keys($))
          x.add(D);
      const w = Array.from(x).map(($) => {
        const D = $.toLowerCase(), S = l[D] || "#9ca3af";
        return {
          label: $.toUpperCase(),
          data: b.map((I) => y[I]?.[$] || 0),
          borderColor: S
        };
      });
      c.value = {
        labels: b.map(($) => We($).format("MMM DD")),
        datasets: w
      };
    };
    return Ee(
      () => n.data,
      (v) => {
        g(v ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (v, y) => (m(), ee($e, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", Iy, [
          u("div", Ey, [
            c.value.labels && c.value.labels.length ? (m(), k("section", Ry, [
              u("div", Fy, [
                N(bt, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (m(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(p.value)
              }, [
                (m(!0), k(re, null, ge(f.value, (b) => (m(), ee(ke, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: `${b.percentage}%`,
                  subvalue: `${P(de)(b.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : F("", !0)
            ])) : h.value.length ? (m(), k("section", Oy, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(p.value)
              }, [
                (m(!0), k(re, null, ge(f.value, (b) => (m(), ee(ke, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: `${b.percentage}%`,
                  subvalue: `${P(de)(b.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : F("", !0),
            h.value.length ? F("", !0) : (m(), k("section", Vy, [
              u("div", zy, [
                u("div", Ny, [
                  N(P(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
                ]),
                y[0] || (y[0] = u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No channel metrics data available ", -1)),
                y[1] || (y[1] = u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No channel data found for the selected period. Try adjusting the date range. ", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Hy = /* @__PURE__ */ be(jy, [["__scopeId", "data-v-d3f89004"]]), Wy = { class: "card-body" }, Ky = { class: "chart-container" }, Yy = { class: "triage-table-block w-full min-w-0" }, Uy = { class: "triage-row-label" }, qy = {
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
  class: "triage-count"
}, Qy = {
  key: 1,
  class: "triage-count"
}, Jy = {
  key: 1,
  class: "empty-state"
}, e1 = { class: "empty-state-content" }, t1 = { class: "empty-icon-wrapper" }, a1 = /* @__PURE__ */ ce({
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
    }, { isDark: i, colors: r } = De(
      Me(n, "theme")
    ), l = C(() => {
      const _ = n.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, D] of Object.entries(_)) {
        const S = $.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const I = S.filter((V) => V !== "triage").length;
        I >= 4 ? w["4p"] += Number(D) || 0 : w[I] += Number(D) || 0;
      }
      return w;
    }), c = C(() => {
      const _ = l.value;
      return _[0] + _[1] + _[2] + _[3] + _["4p"] || 0;
    }), d = C(() => Object.keys(n.data?.combinations || {}).length > 0), h = C(() => {
      const _ = c.value;
      if (!_) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = l.value;
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
    ], p = C(() => {
      const _ = h.value, w = l.value;
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
    }, v = (_) => _?.replace("80", "") || "#888888", y = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: v(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: v(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: v(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: v(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: v(g.c4p),
          borderWidth: 1
        }
      ]
    })), b = C(() => ({
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
    return t({ isDark: i }), (_, w) => (m(), ee($e, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", Wy, [
          d.value ? (m(), k(re, { key: 0 }, [
            u("div", Ky, [
              N(kt, {
                data: y.value,
                options: b.value
              }, null, 8, ["data", "options"])
            ]),
            N(ke, {
              class: "w-full min-w-0",
              title: "Total",
              value: P(de)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", Yy, [
              N(dt, {
                columns: f,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": R(({ row: $ }) => [
                  u("span", Uy, A($.metric), 1)
                ]),
                "cell-b0": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(g.c0) })
                  }, A(x(Number($.b0))) + "%", 5)) : (m(), k("span", qy, A(P(de)(Number($.b0))), 1))
                ]),
                "cell-b1": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(g.c1) })
                  }, A(x(Number($.b1))) + "%", 5)) : (m(), k("span", Xy, A(P(de)(Number($.b1))), 1))
                ]),
                "cell-b2": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(g.c2) })
                  }, A(x(Number($.b2))) + "%", 5)) : (m(), k("span", Gy, A(P(de)(Number($.b2))), 1))
                ]),
                "cell-b3": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(g.c3) })
                  }, A(x(Number($.b3))) + "%", 5)) : (m(), k("span", Zy, A(P(de)(Number($.b3))), 1))
                ]),
                "cell-b4p": R(({ row: $ }) => [
                  $.id === "pct" ? (m(), k("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: v(g.c4p) })
                  }, A(x(Number($.b4p))) + "%", 5)) : (m(), k("span", Qy, A(P(de)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (m(), k("div", Jy, [
            u("div", e1, [
              u("div", t1, [
                N(P(nt), { class: "empty-icon" })
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
}), n1 = /* @__PURE__ */ be(a1, [["__scopeId", "data-v-be7d2c0c"]]), o1 = { class: "card-body" }, s1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, i1 = { class: "pie-section" }, r1 = {
  key: 1,
  class: "empty-state"
}, l1 = /* @__PURE__ */ ce({
  __name: "SelectLanguage",
  props: {
    data: { default: () => ({ items: [] }) },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 },
    enableExport: { type: Boolean, default: !1 },
    exportLoading: { type: Boolean, default: !1 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = [
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
    }, r = (p) => i[p]?.label || p.toUpperCase(), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((p, g) => p + g.count, 0)
    ), d = C(() => {
      const p = {};
      for (const g of a.data?.items || [])
        p[g.language] = (p[g.language] || 0) + g.count;
      return Object.entries(p).map(([g, v]) => ({ language: g, count: v })).sort((g, v) => v.count - g.count);
    }), h = C(() => ({
      labels: d.value.map((p) => r(p.language)),
      datasets: [
        {
          data: d.value.map((p) => p.count),
          backgroundColor: d.value.map(
            (p, g) => s[g % s.length] + "80"
          ),
          borderColor: d.value.map(
            (p, g) => s[g % s.length]
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
              const g = p.raw || 0, v = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${g} (${v}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (p, g) => (m(), ee($e, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: R(() => [
        u("div", o1, [
          l.value ? (m(), k("div", s1, [
            u("section", i1, [
              N(Dn, {
                data: h.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ]),
            N(ke, {
              class: "shrink-0",
              title: "Total",
              value: P(de)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (m(), k("section", r1, [...g[0] || (g[0] = [
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
}), c1 = /* @__PURE__ */ be(l1, [["__scopeId", "data-v-9385c088"]]), d1 = { class: "card-body" }, u1 = {
  key: 0,
  class: "guardrails-daily-section"
}, h1 = { class: "w-full min-w-0" }, f1 = { class: "font-medium" }, g1 = { class: "font-semibold" }, m1 = { class: "type-badges-row" }, p1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, b1 = {
  key: 1,
  class: "empty-state"
}, v1 = /* @__PURE__ */ ce({
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
    }, { isDark: i } = De(Me(n, "theme")), r = C(
      () => n.data?.items && n.data.items.length > 0
    ), l = C(
      () => (n.data?.items || []).reduce((y, b) => y + b.count, 0)
    ), c = (y) => {
      const b = {};
      for (const w of n.data?.items || [])
        b[w[y]] = (b[w[y]] || 0) + w.count;
      const x = Object.entries(b).sort((w, $) => $[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const _ = l.value;
      return {
        name: x[0][0],
        pct: _ > 0 ? Math.round(x[0][1] / _ * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), f = C(() => c("guardrail_source")), p = C(() => {
      const y = {};
      for (const b of n.data?.items || [])
        y[b.date] || (y[b.date] = {}), y[b.date][b.guardrail_type] = (y[b.date][b.guardrail_type] || 0) + b.count;
      return Object.entries(y).map(([b, x]) => ({
        date: b,
        total: Object.values(x).reduce((_, w) => _ + w, 0),
        types: Object.entries(x).map(([_, w]) => ({ type: _, count: w })).sort((_, w) => w.count - _.count)
      })).sort((b, x) => new Date(b.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], v = C(
      () => p.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, b) => (m(), ee($e, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", d1, [
          r.value ? (m(), k(re, { key: 0 }, [
            p.value.length > 0 ? (m(), k("section", u1, [
              u("div", h1, [
                N(dt, {
                  columns: g,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": R(({ row: x }) => [
                    u("span", f1, A(P(We)(String(x.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": R(({ row: x }) => [
                    u("span", g1, A(P(de)(x.total)), 1)
                  ]),
                  "cell-types": R(({ row: x }) => [
                    u("div", m1, [
                      (m(!0), k(re, null, ge(x.types, (_) => (m(), k("span", {
                        key: _.type,
                        class: "type-count-badge"
                      }, A(_.type) + " (" + A(_.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            u("section", p1, [
              N(ke, {
                title: "Total Events",
                value: P(de)(l.value)
              }, null, 8, ["value"]),
              N(ke, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(ke, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              N(ke, {
                title: "Top source",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (m(), k("section", b1, [...b[0] || (b[0] = [
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
}), y1 = /* @__PURE__ */ be(v1, [["__scopeId", "data-v-c042ede0"]]), x1 = { class: "card-body" }, k1 = { class: "chart-section" }, _1 = { class: "chart-wrapper" }, w1 = {
  key: 1,
  class: "empty-chart"
}, C1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, $1 = {
  key: 0,
  class: "dn-failure-section"
}, S1 = { class: "w-full min-w-0" }, M1 = { class: "failure-reason" }, D1 = { class: "failure-count" }, A1 = { class: "impact-bar-container" }, T1 = { class: "impact-label" }, B1 = { class: "dn-trend-health-block flex flex-col gap-0" }, L1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, P1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, I1 = { class: "system-health" }, E1 = { class: "system-health-content" }, R1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, F1 = {
  key: 1,
  class: "empty-state"
}, O1 = /* @__PURE__ */ ce({
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
    }, { isDark: i, colors: r } = De(Me(n, "theme")), l = C(() => {
      const $ = n.data?.documentCounts?.items || [], D = n.data?.processingCounts?.items || [];
      return $.length > 0 || D.length > 0;
    }), c = C(() => {
      const $ = n.data?.documentCounts?.items || [];
      return {
        processing_started: $.reduce((D, S) => D + S.processing_started, 0),
        processing_completed: $.reduce((D, S) => D + S.processing_completed, 0),
        processing_failed: $.reduce((D, S) => D + S.processing_failed, 0),
        row_count_total: $.reduce((D, S) => D + S.row_count_total, 0)
      };
    }), d = C(() => {
      const $ = n.data?.processingCounts?.items || [];
      return {
        processing_started: $.reduce((D, S) => D + S.processing_started, 0),
        processing_success: $.reduce((D, S) => D + S.processing_success, 0),
        notification_sent: $.reduce((D, S) => D + S.notification_sent, 0),
        notification_failed: $.reduce((D, S) => D + S.notification_failed, 0),
        dq_phone: $.reduce((D, S) => D + S.dq_error_phone_not_found, 0),
        dq_flight: $.reduce((D, S) => D + S.dq_error_flight_not_found, 0),
        dq_booking: $.reduce((D, S) => D + S.dq_error_booking_not_found, 0),
        dq_other: $.reduce((D, S) => D + S.dq_error_other, 0),
        totalDqErrors: $.reduce(
          (D, S) => D + S.dq_error_phone_not_found + S.dq_error_flight_not_found + S.dq_error_booking_not_found + S.dq_error_other,
          0
        )
      };
    }), h = C(
      () => c.value.row_count_total || d.value.processing_started
    ), f = C(
      () => Math.max(0, h.value - d.value.notification_sent)
    ), p = ($, D) => D ? `${Math.round($ / D * 100)}%` : "0%", g = C(() => {
      const $ = [
        { reason: "Booking not found", count: d.value.dq_booking },
        { reason: "Phone not found", count: d.value.dq_phone },
        { reason: "Flight not found", count: d.value.dq_flight },
        {
          reason: "Notification failed",
          count: d.value.notification_failed
        },
        { reason: "Other", count: d.value.dq_other }
      ].filter((D) => D.count > 0).sort((D, S) => S.count - D.count);
      return $.length > 0 ? $[0] : { reason: "None", count: 0 };
    }), v = C(() => {
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
      ].map((D) => ({
        ...D,
        impactPct: $ > 0 ? Math.round(D.count / $ * 100) : 0
      }));
    }), y = [
      { key: "reason", label: "Reason", align: "left" },
      { key: "count", label: "Count", align: "center" },
      { key: "impact", label: "Impact", align: "center" }
    ], b = C(
      () => v.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), x = C(() => {
      const $ = h.value, D = d.value.processing_success, S = Math.max(0, D - d.value.totalDqErrors), I = d.value.notification_sent, V = Math.max(0, $ - D), O = d.value.totalDqErrors, M = Math.max(0, S - I), B = (H, q) => pe(H, q), T = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], z = [];
      return D > 0 && z.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: D,
        label: B(D, $)
      }), V > 0 && z.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: V,
        label: B(V, $)
      }), S > 0 && z.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: B(S, $)
      }), O > 0 && z.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: O,
        label: B(O, $)
      }), I > 0 && z.push({
        source: "Contactable",
        target: "Notified",
        value: I,
        label: B(I, $)
      }), M > 0 && z.push({
        source: "Contactable",
        target: "Not Delivered",
        value: M,
        label: B(M, $)
      }), { nodes: T, links: z };
    }), _ = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (B, T) => new Date(B.date).getTime() - new Date(T.date).getTime()
      ), D = n.data?.documentCounts?.items || [], S = {};
      for (const B of D)
        S[B.date] = (S[B.date] || 0) + B.row_count_total;
      const I = [
        .../* @__PURE__ */ new Set([
          ...$.map((B) => B.date),
          ...D.map((B) => B.date)
        ])
      ].sort(), V = I.map((B) => We(B).format("MMM DD")), O = I.map((B) => {
        const T = $.find((q) => q.date === B), z = T?.notification_sent || 0, H = S[B] || T?.processing_started || 0;
        return H > 0 ? Math.round(z / H * 100) : 0;
      }), M = I.map((B) => $.find((z) => z.date === B)?.notification_sent || 0);
      return {
        labels: V,
        datasets: [
          {
            label: "Success Rate (%)",
            data: O,
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
          backgroundColor: r.value.tooltipBg,
          titleColor: r.value.tooltipText,
          bodyColor: r.value.textSecondary,
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
            callback: ($) => `${$}%`
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
    return t({ isDark: i }), ($, D) => (m(), ee($e, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: D[0] || (D[0] = (S) => o("open"))
    }, {
      headerExport: R(() => [
        e.enableExport && !n.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", x1, [
          l.value ? (m(), k(re, { key: 0 }, [
            u("section", k1, [
              D[2] || (D[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", _1, [
                x.value.nodes.length > 0 && x.value.links.length > 0 ? (m(), ee(Zt, {
                  key: 0,
                  data: x.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (m(), k("div", w1, [...D[1] || (D[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", C1, [
              N(ke, {
                color: "#3b82f6",
                title: "Total Records",
                value: P(de)(c.value.row_count_total)
              }, null, 8, ["value"]),
              N(ke, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: P(de)(h.value)
              }, null, 8, ["value"]),
              N(ke, {
                color: "#10b981",
                title: "Successfully Notified",
                value: P(de)(d.value.notification_sent),
                subvalue: p(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(ke, {
                color: "#ef4444",
                title: "Not Notified",
                value: P(de)(f.value),
                subvalue: p(f.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              N(ke, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${P(de)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            v.value.length > 0 ? (m(), k("section", $1, [
              D[3] || (D[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", S1, [
                N(dt, {
                  columns: y,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": R(({ row: S }) => [
                    u("span", M1, A(S.reason), 1)
                  ]),
                  "cell-count": R(({ row: S }) => [
                    u("span", D1, A(P(de)(S.count)), 1)
                  ]),
                  "cell-impact": R(({ row: S }) => [
                    u("div", A1, [
                      u("div", {
                        class: "impact-bar",
                        style: Ce({ width: S.impactPct + "%" })
                      }, null, 4),
                      u("span", T1, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : F("", !0),
            u("div", B1, [
              _.value.labels.length > 0 ? (m(), k("section", L1, [
                D[4] || (D[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", P1, [
                  N(bt, {
                    data: _.value,
                    options: w.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : F("", !0),
              u("details", I1, [
                D[5] || (D[5] = u("summary", { class: "system-health-toggle" }, [
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
                u("div", E1, [
                  u("div", R1, [
                    N(ke, {
                      title: "Docs Started",
                      value: P(de)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    N(ke, {
                      title: "Docs Completed",
                      value: P(de)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    N(ke, {
                      title: "Docs Failed",
                      value: P(de)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    N(ke, {
                      title: "Processing Started",
                      value: P(de)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    N(ke, {
                      title: "Processing Success",
                      value: P(de)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    N(ke, {
                      title: "Notification Failed",
                      value: P(de)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (m(), k("section", F1, [...D[6] || (D[6] = [
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
}), V1 = /* @__PURE__ */ be(O1, [["__scopeId", "data-v-2342d485"]]), z1 = /* @__PURE__ */ ce({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => de(a.totalConversations)), s = C(() => P(n.value?.isDark) ?? !1), i = C(() => P(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(St, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), N1 = /* @__PURE__ */ ce({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => P(n.value?.isDark) ?? !1), i = C(() => P(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(St, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), j1 = /* @__PURE__ */ ce({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => P(n.value?.isDark) ?? !1), i = C(() => P(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(St, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
}), H1 = {
  key: 0,
  class: "card-body"
}, W1 = { class: "chart-wrapper" }, K1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, Y1 = {
  key: 1,
  class: "empty-state"
}, U1 = 520, q1 = 300, X1 = 40, G1 = 48, Z1 = 48, Q1 = {
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
    }, s = e, { isDark: i } = De(Me(s, "theme")), r = C(() => s.data);
    return t({ isDark: i }), (l, c) => (m(), ee($e, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !s.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        r.value && r.value.total_nps_responses > 0 ? (m(), k("div", H1, [
          u("div", W1, [
            N(sr, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": U1,
              "chart-height": q1,
              "chart-margin": X1,
              "chart-margin-right": G1,
              "chart-bottom-margin": Z1,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", K1, [
            N(ke, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (m(), ee(ke, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : F("", !0)
          ])
        ])) : (m(), k("div", Y1, [...c[0] || (c[0] = [
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
}, mr = /* @__PURE__ */ be(Q1, [["__scopeId", "data-v-e98fe9b2"]]), J1 = {
  key: 0,
  class: "card-body"
}, ex = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, tx = {
  key: 1,
  class: "empty-state"
}, ax = {
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
    }, o = e, s = C(() => o.data?.csat_p95_by_day || []), i = C(() => s.value.length > 0), r = C(() => ({
      labels: s.value.map((c) => We(c.date).format("DD-MM-YYYY")),
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
    return (c, d) => (m(), ee($e, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        i.value ? (m(), k("div", J1, [
          u("div", ex, [
            N(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), k("div", tx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, pr = /* @__PURE__ */ be(ax, [["__scopeId", "data-v-5207cfa7"]]), nx = {
  key: 0,
  class: "card-body"
}, ox = {
  key: 1,
  class: "empty-state"
}, sx = /* @__PURE__ */ ce({
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
    return (i, r) => (m(), ee($e, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: R(() => [
        n.value ? (m(), k("div", nx, [
          N(kt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (m(), k("div", ox, [...r[0] || (r[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ix = /* @__PURE__ */ be(sx, [["__scopeId", "data-v-6849ef24"]]), rx = {
  key: 0,
  class: "card-body"
}, lx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, cx = {
  key: 1,
  class: "empty-state"
}, dx = /* @__PURE__ */ ce({
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
    }, o = e, s = C(() => o.data?.csat_pulse_by_day || []), i = C(() => s.value.length > 0), r = C(() => ({
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
    return (c, d) => (m(), ee($e, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !o.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        i.value ? (m(), k("div", rx, [
          u("div", lx, [
            N(bt, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), k("div", cx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ux = /* @__PURE__ */ be(dx, [["__scopeId", "data-v-72955d9a"]]), hx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, fx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, br = {
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
    }, o = e, s = C(() => o.showResolutionChart), i = C(() => o.showCsatPulseChart), r = C(
      () => (s.value ? 1 : 0) + (i.value ? 1 : 0)
    ), l = C(() => r.value > 0), c = C(
      () => r.value > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
    );
    return (d, h) => (m(), k("div", hx, [
      u("div", fx, [
        N(mr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        N(pr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      l.value ? (m(), k("div", {
        key: 0,
        class: Z(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (m(), ee(ix, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : F("", !0),
        i.value ? (m(), ee(ux, {
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
}, gx = { class: "csat-container__body" }, mx = /* @__PURE__ */ ce({
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
    return (o, s) => (m(), ee($e, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: R(() => [
        u("div", gx, [
          N(br, {
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
}), px = /* @__PURE__ */ be(mx, [["__scopeId", "data-v-37178ba1"]]), bx = /* @__PURE__ */ ce({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => Ft(a.totalRevenue)), s = C(() => P(n.value?.isDark) ?? !1), i = C(() => P(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(St, {
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
      icon: R(() => [...l[0] || (l[0] = [
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
}), vx = { class: "flex items-center gap-2 justify-end flex-wrap" }, yx = {
  key: 0,
  class: "flex rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] p-[3px] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)]"
}, xx = ["onClick"], kx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, _x = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, wx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Cx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, $x = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Sx = /* @__PURE__ */ ce({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = Me(n, "theme"), { isDark: i, colors: r } = De(s), l = oe(n.breakdownBy), c = oe("local"), d = C(() => n.data?.currency ?? "USD"), h = C(
      () => c.value === "usd" ? "USD" : d.value
    ), f = C(() => [
      { value: "local", label: d.value },
      { value: "usd", label: "USD" }
    ]), p = C(() => l.value === "payment_method"), g = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], v = (B) => g[B % g.length], y = (B) => {
      if (!B) return "0";
      const T = Math.abs(B);
      return T >= 1e6 ? (B / 1e6).toFixed(2) + "M" : T >= 1e5 ? (B / 1e3).toFixed(1) + "K" : Math.round(B).toLocaleString();
    }, b = (B) => !B || B === "unknown" ? "Unknown" : B.split(/[_|]/).map((T) => T ? T.charAt(0).toUpperCase() + T.slice(1) : "").join(" "), x = oe({
      labels: [],
      datasets: []
    }), _ = oe([]), w = C(() => {
      const B = Math.min(_.value.length, 5);
      if (!(B <= 0))
        return { gridTemplateColumns: `repeat(${B}, minmax(0, 1fr))` };
    }), $ = (B) => {
      const T = B?.ai_revenue_by_day ?? [], z = B?.breakdown ?? [];
      if (!T.length) {
        x.value = { labels: [], datasets: [] }, _.value = [];
        return;
      }
      const H = [...T].sort((U, L) => U.date.localeCompare(L.date)), q = H.map((U) => We(U.date).format("MMM DD")), ae = c.value === "usd" ? "ai_revenue_usd" : "ai_revenue";
      if (l.value === "all") {
        x.value = {
          labels: q,
          datasets: [
            {
              label: `Revenue (${h.value})`,
              data: H.map((U) => Number(U[ae] ?? 0)),
              borderColor: g[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: g[0],
              pointBorderWidth: 2
            }
          ]
        }, _.value = [];
        return;
      }
      const me = z.slice(0, 7).map((U) => U.key).map((U, L) => {
        const K = v(L), Y = H.map((le) => {
          const ve = (le.breakdown ?? {})[U];
          return ve ? Number(ve[ae] ?? 0) : 0;
        });
        return p.value ? {
          label: b(U),
          data: Y,
          backgroundColor: K,
          borderColor: K,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: b(U),
          data: Y,
          borderColor: K,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: K,
          pointBorderWidth: 2
        };
      });
      x.value = { labels: q, datasets: me }, _.value = z.slice(0, 5).map((U, L) => {
        const K = c.value === "usd" ? U.total_usd : U.total;
        return {
          key: U.key,
          label: b(U.key),
          amount: `${h.value} ${y(K)}`,
          percentage: Number(U.percentage ?? 0),
          color: v(L)
        };
      });
    }, D = C(() => ({
      callback: (B) => `${h.value} ${y(Number(B))}`,
      color: r.value.textSecondary,
      padding: 8
    })), S = C(() => ({
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: r.value.textSecondary, padding: 8 }
    })), I = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: D.value
    })), V = C(() => ({
      scales: {
        x: S.value,
        y: I.value
      }
    })), O = C(() => ({
      scales: {
        x: { ...S.value, stacked: !0 },
        y: { ...I.value, stacked: !0 }
      }
    }));
    Ee(
      () => n.data,
      (B) => {
        B && (c.value = B.currency === "USD" ? "usd" : "local"), $(B ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ee(
      () => n.breakdownBy,
      (B) => {
        l.value = B, $(n.data ?? null);
      }
    ), Ee(c, () => {
      $(n.data ?? null);
    });
    const M = () => {
      o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (B, T) => (m(), ee($e, {
      class: "w-full min-h-0 self-start",
      title: "AI Generated Revenue",
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: R(() => [
        u("div", vx, [
          Ge(u("select", {
            "onUpdate:modelValue": T[0] || (T[0] = (z) => l.value = z),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: M
          }, [...T[1] || (T[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "payment_method" }, "Payment Method", -1),
            u("option", { value: "agent_type" }, "Agent Type", -1),
            u("option", { value: "channel" }, "Channel", -1),
            u("option", { value: "channel_and_agent" }, "Channel & Agent", -1)
          ])], 544), [
            [ci, l.value]
          ]),
          d.value !== "USD" ? (m(), k("div", yx, [
            (m(!0), k(re, null, ge(f.value, (z) => (m(), k("button", {
              key: z.value,
              class: Z([
                "rounded-[9px] px-3 py-1 text-xs font-medium transition-all",
                c.value === z.value ? "bg-white shadow-sm text-[var(--kiut-text-primary,#111827)] font-semibold dark:bg-[#1f2937] dark:text-[var(--kiut-text-primary,#f9fafb)]" : "text-[var(--kiut-text-secondary,#6b7280)] dark:text-[var(--kiut-text-secondary,#9ca3af)]"
              ]),
              onClick: (H) => c.value = z.value
            }, A(z.label), 11, xx))), 128))
          ])) : F("", !0)
        ])
      ]),
      default: R(() => [
        u("div", {
          class: Z(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          N(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: R(() => [
              n.loading ? (m(), k("div", kx, [...T[2] || (T[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), k("div", _x, [
                x.value.labels && x.value.labels.length && x.value.datasets.length ? (m(), k("section", wx, [
                  u("div", Cx, [
                    p.value ? (m(), ee(kt, {
                      key: 0,
                      data: x.value,
                      options: O.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (m(), ee(bt, {
                      key: 1,
                      data: x.value,
                      options: V.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  _.value.length ? (m(), k("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(w.value)
                  }, [
                    (m(!0), k(re, null, ge(_.value, (z) => (m(), ee(ke, {
                      key: `card-${z.key}`,
                      class: "min-w-0",
                      color: z.color,
                      title: z.label,
                      value: z.amount,
                      subvalue: `${z.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : F("", !0)
                ])) : (m(), k("section", $x, [...T[3] || (T[3] = [
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
    }, 8, ["loading"]));
  }
}), Mx = /* @__PURE__ */ be(Sx, [["__scopeId", "data-v-953987bf"]]), ai = 1, Dx = /* @__PURE__ */ ce({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), { isDark: o } = De(Me(a, "theme")), s = C(() => a.totalConversations * ai), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * ai), r = C(() => de(s.value)), l = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!l.value) return 0;
      const f = i.value;
      return f === 0 ? s.value > 0 ? 100 : 0 : (s.value - f) / f * 100;
    }), d = C(() => {
      const f = c.value.toFixed(1);
      return c.value > 0 ? `+${f}%` : `${f}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (f, p) => (m(), ee(St, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: R(() => [...p[0] || (p[0] = [
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
      headerAside: R(() => [
        l.value ? (m(), k("div", {
          key: 0,
          class: Z(["change-badge", h.value, { "change-badge--dark": P(o) }])
        }, A(d.value), 3)) : F("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Ax = /* @__PURE__ */ be(Dx, [["__scopeId", "data-v-411e0735"]]), Tx = { class: "flex justify-end" }, Bx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Lx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Px = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ix = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Ex = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Rx = /* @__PURE__ */ ce({
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
    }, i = Me(n, "theme"), { isDark: r } = De(i), l = oe(n.breakdownBy), c = C(() => n.data ?? {
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
    }), p = oe(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], v = (w) => g[w % g.length], y = {
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
    }, b = () => {
      o("changeBreakdown", l.value);
    }, x = (w) => {
      if (!w) return "";
      const D = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return D ? D.charAt(0).toUpperCase() + D.slice(1) : "";
    }, _ = (w) => {
      if (l.value === "all") {
        const M = w?.escalations_by_day ?? [];
        if (!M.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], p.value = [];
          return;
        }
        const B = [...M].sort((T, z) => T.date.localeCompare(z.date));
        d.value = {
          labels: B.map((T) => We(T.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: B.map(
                (T) => Number(T.escalation_rate_percentage || 0)
              ),
              borderColor: "#8b5cf6",
              backgroundColor: "transparent",
              fill: !1,
              tension: 0.35
            }
          ]
        }, h.value = [], p.value = [];
        return;
      }
      const $ = w?.breakdown_by_day ?? [], D = w?.breakdown_items ?? [];
      if (!$.length) {
        d.value = { labels: [], datasets: [] }, h.value = [], p.value = [];
        return;
      }
      const S = [...$].sort(
        (M, B) => M.date.localeCompare(B.date)
      ), I = D.slice(0, 5).map((M) => M.key), V = S.map((M) => We(M.date).format("MMM DD")), O = I.map((M, B) => {
        const T = D.find((z) => z.key === M);
        return {
          label: x(T?.label || M),
          data: S.map((z) => {
            const H = z.items.find((q) => q.key === M);
            return Number(H?.percentage || 0);
          }),
          borderColor: v(B),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: V,
        datasets: O
      }, h.value = D.slice(0, 5).map((M, B) => ({
        key: M.key,
        label: x(M.label),
        percentage: Number(M.percentage || 0),
        color: v(B)
      })), p.value = D.slice(0, 5).map((M, B) => ({
        key: M.key,
        label: x(M.label),
        color: v(B)
      }));
    };
    return Ee(
      () => n.data,
      (w) => {
        _(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ee(
      () => n.breakdownBy,
      (w) => {
        l.value = w, _(c.value);
      }
    ), t({ isDark: r }), (w, $) => (m(), ee($e, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      headerAside: R(() => [
        u("div", Tx, [
          Ge(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (D) => l.value = D),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: b
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [ci, l.value]
          ])
        ])
      ]),
      default: R(() => [
        u("div", Bx, [
          u("div", Lx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (m(), k("section", Px, [
              u("div", Ix, [
                N(bt, {
                  data: d.value,
                  options: y,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (m(), k("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(f.value)
              }, [
                (m(!0), k(re, null, ge(h.value, (D) => (m(), ee(ke, {
                  key: `card-${D.key}`,
                  class: "min-w-0",
                  color: D.color,
                  title: D.label,
                  value: `${D.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : F("", !0)
            ])) : (m(), k("section", Ex, [...$[2] || ($[2] = [
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
}), Fx = /* @__PURE__ */ be(Rx, [["__scopeId", "data-v-b18e0ebd"]]), Ox = /* @__PURE__ */ ce({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = oe(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => P(n.value?.isDark) ?? !1), i = C(() => P(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ee(St, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: R(() => [...l[0] || (l[0] = [
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
  class: "flex w-full shrink-0 flex-col min-h-0"
}, Nx = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, jx = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, Hx = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, Wx = { class: "max-w-[360px] text-center" }, Kx = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, Yx = {
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
    const t = e, { isDark: a, colors: n } = De(Me(t, "theme")), o = C(() => {
      const r = t.data ?? {}, l = r.daily, c = r.days, d = Array.isArray(l) && l.length > 0, h = Array.isArray(c) && c.length > 0 && Array.isArray(r.allocatedCostSeries) && r.allocatedCostSeries.length === c.length;
      let f = [];
      return d ? f = l : h && (f = c.map((p, g) => ({
        date: p,
        allocated_cost: r.allocatedCostSeries[g] ?? 0,
        aws_cost: r.awsCostSeries[g] ?? 0,
        airline_conversations: r.airlineConversationsSeries[g] ?? 0
      }))), {
        daily: f,
        total_allocated_cost: r.total_allocated_cost ?? r.totalAllocated ?? 0,
        total_cost: r.total_cost ?? r.total ?? 0,
        total_conversations: r.total_conversations ?? r.totalConversations ?? 0,
        total_airline_conversations: r.total_airline_conversations ?? r.totalAirlineConversations ?? 0,
        airline_name: r.airline_name
      };
    }), s = C(() => {
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
            label(r) {
              const l = r.dataset.label ? `${r.dataset.label}: ` : "", c = r.parsed.y;
              return r.dataset.yAxisID === "y" ? l + Be(c) : l + String(c);
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
            callback: (r) => Be(r)
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
    return (r, l) => (m(), ee($e, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", Vx, [
          o.value.daily.length > 0 ? (m(), k("div", zx, [
            u("div", Nx, [
              N(bt, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", jx, [
              N(ke, {
                color: P(n).primaryLight,
                title: "Total Allocated",
                value: P(Be)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              N(ke, {
                color: "#FF9900",
                title: "Total AWS",
                value: P(Be)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (m(), k("section", Hx, [
            u("div", Wx, [
              u("div", Kx, [
                N(P(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, Ux = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, qx = { class: "card-body" }, Xx = {
  key: 0,
  class: "chart-section"
}, Gx = { class: "chart-container" }, Zx = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, Qx = {
  key: 1,
  class: "empty-state"
}, Jx = { class: "empty-state-content" }, ek = { class: "empty-icon-wrapper" }, Da = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", ni = 10, tk = /* @__PURE__ */ ce({
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
    const n = e, { isDark: o, colors: s } = De(Me(n, "theme")), i = (g) => {
      const v = new Date(g), y = String(v.getDate()).padStart(2, "0"), b = String(v.getMonth() + 1).padStart(2, "0");
      return `${y}-${b}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.input_cost || 0), 0);
    }), c = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.output_cost || 0), 0);
    }), d = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((v, y) => v + (y.cache_write_cost || 0), 0);
    }), f = C(() => {
      const g = n.data?.costs_by_day || {}, v = Object.keys(g).sort();
      if (v.length === 0)
        return { labels: [], datasets: [] };
      const y = v.map((x) => i(x)), b = [
        {
          label: "Input Cost",
          data: v.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: v.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: v.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: v.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: b
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
              family: Da,
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
            family: Da,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Da,
            size: 12,
            weight: "500"
          },
          callbacks: {
            label: function(g) {
              let v = g.dataset.label || "";
              return v && (v += ": "), g.parsed.y !== null && (v += Be(g.parsed.y)), v;
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
            font: { family: Da, size: 12, weight: "500" },
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
            font: { family: Da, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8,
            callback: function(g) {
              return Be(g);
            }
          }
        }
      }
    });
    return t({ isDark: o }), (g, v) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", Ux, [
          u("div", qx, [
            f.value.labels && f.value.labels.length ? (m(), k("section", Xx, [
              u("div", Gx, [
                N(kt, {
                  data: f.value,
                  options: p.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", Zx, [
                N(ke, {
                  title: "Total Cost",
                  value: P(Be)(e.data.total_cost)
                }, null, 8, ["value"]),
                N(ke, {
                  title: "Input Cost",
                  value: P(Be)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(ke, {
                  title: "Output Cost",
                  value: P(Be)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(ke, {
                  title: "Cache Read",
                  value: P(Be)(d.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(ke, {
                  title: "Cache Write",
                  value: P(Be)(h.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                N(ke, {
                  title: "Avg / Conv.",
                  value: P(Be)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", Qx, [
              u("div", Jx, [
                u("div", ek, [
                  N(P(nt), { class: "empty-icon" })
                ]),
                v[0] || (v[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                v[1] || (v[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), ak = /* @__PURE__ */ be(tk, [["__scopeId", "data-v-e1c4a95b"]]), nk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ok = { class: "card-body" }, sk = {
  key: 0,
  class: "chart-section"
}, ik = { class: "chart-container" }, rk = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, lk = {
  key: 1,
  class: "empty-state"
}, ck = { class: "empty-state-content" }, dk = { class: "empty-icon-wrapper" }, Aa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", oi = 10, uk = /* @__PURE__ */ ce({
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
    const n = e, { isDark: o, colors: s } = De(Me(n, "theme")), i = (d) => {
      const h = new Date(d), f = String(h.getDate()).padStart(2, "0"), p = String(h.getMonth() + 1).padStart(2, "0");
      return `${f}-${p}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const d = n.data?.tokens_by_day || {}, h = Object.keys(d).sort();
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((g) => i(g)), p = [
        {
          label: "Input Tokens",
          data: h.map((g) => d[g]?.input_tokens || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Tokens",
          data: h.map((g) => d[g]?.output_tokens || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read",
          data: h.map((g) => d[g]?.cache_read_tokens || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write",
          data: h.map((g) => d[g]?.cache_write_tokens || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: f,
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
              family: Aa,
              size: 13,
              weight: "500"
            },
            color: s.value.textSecondary,
            padding: 12,
            boxWidth: oi,
            boxHeight: oi,
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
            family: Aa,
            size: 13,
            weight: "600"
          },
          bodyFont: {
            family: Aa,
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
            font: { family: Aa, size: 12, weight: "500" },
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
            font: { family: Aa, size: 12, weight: "500" },
            color: s.value.textSecondary,
            padding: 8
          }
        }
      }
    });
    return t({ isDark: o }), (d, h) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", nk, [
          u("div", ok, [
            l.value.labels && l.value.labels.length ? (m(), k("section", sk, [
              u("div", ik, [
                N(kt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", rk, [
                N(ke, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: P(de)(e.data.total_tokens)
                }, null, 8, ["value"]),
                N(ke, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: P(de)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                N(ke, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: P(de)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                N(ke, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: P(de)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                N(ke, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: P(de)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (m(), k("section", lk, [
              u("div", ck, [
                u("div", dk, [
                  N(P(nt), { class: "empty-icon" })
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
}), hk = /* @__PURE__ */ be(uk, [["__scopeId", "data-v-554d3cda"]]), fk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gk = { class: "card-body" }, mk = {
  key: 0,
  class: "chart-section"
}, pk = { class: "chart-container" }, bk = { class: "mt-4 w-full min-w-0" }, vk = {
  key: 1,
  class: "empty-state"
}, yk = { class: "empty-state-content" }, xk = { class: "empty-icon-wrapper" }, kk = /* @__PURE__ */ ce({
  __name: "ConversationCount",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(
      () => de(a.data?.total_conversations ?? 0)
    ), r = C(() => {
      const c = a.data?.conversations_by_day || {}, d = Object.keys(c).sort();
      if (d.length === 0)
        return { labels: [], datasets: [] };
      const h = d.map((p) => s(p)), f = [
        {
          label: "Conversations",
          data: d.map((p) => c[p] || 0),
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
    }), l = C(() => a.options ? a.options : {
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
    return t({ isDark: n }), (c, d) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", fk, [
          u("div", gk, [
            r.value.labels && r.value.labels.length ? (m(), k("section", mk, [
              u("div", pk, [
                N(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", bk, [
                N(ke, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", vk, [
              u("div", yk, [
                u("div", xk, [
                  N(P(nt), { class: "empty-icon" })
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
}), _k = /* @__PURE__ */ be(kk, [["__scopeId", "data-v-311f443a"]]), wk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Ck = { class: "card-body" }, $k = {
  key: 0,
  class: "charts-grid"
}, Sk = { class: "chart-section" }, Mk = { class: "chart-container" }, Dk = { class: "chart-section" }, Ak = { class: "chart-container" }, Tk = {
  key: 1,
  class: "empty-state"
}, Bk = { class: "empty-state-content" }, Lk = { class: "empty-icon-wrapper" }, Pk = /* @__PURE__ */ ce({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((f, p) => (p.total_cost || 0) - (f.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((f, p) => (p.total_tokens || 0) - (f.total_tokens || 0)) : []), l = C(() => {
      const f = i.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((p) => p.agent_type),
        datasets: [
          {
            label: "Total Cost",
            data: f.map((p) => p.total_cost || 0),
            backgroundColor: "#a78bfa80",
            borderColor: "#a78bfa",
            borderWidth: 1
          }
        ]
      };
    }), c = C(() => {
      const f = r.value;
      return f.length === 0 ? { labels: [], datasets: [] } : {
        labels: f.map((p) => p.agent_type),
        datasets: [
          {
            label: "Total Tokens",
            data: f.map((p) => p.total_tokens || 0),
            backgroundColor: "#f59e0b80",
            borderColor: "#f59e0b",
            borderWidth: 1
          }
        ]
      };
    }), d = C(() => a.options ? a.options : {
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const p = f.label, g = a.data?.top_agents?.find((v) => v.agent_type === p);
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
              return Be(f);
            }
          }
        }
      }
    }), h = C(() => a.options ? a.options : {
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
            title: function(f) {
              return f[0]?.label || "";
            },
            label: function(f) {
              const p = f.label, g = a.data?.top_agents?.find((v) => v.agent_type === p);
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
    return t({ isDark: n }), (f, p) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", wk, [
          u("div", Ck, [
            s.value ? (m(), k("div", $k, [
              u("section", Sk, [
                p[0] || (p[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", Mk, [
                  N(kt, {
                    data: l.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", Dk, [
                p[1] || (p[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", Ak, [
                  N(kt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (m(), k("section", Tk, [
              u("div", Bk, [
                u("div", Lk, [
                  N(P(nt), { class: "empty-icon" })
                ]),
                p[2] || (p[2] = u("p", { class: "empty-title" }, "No top agents data", -1)),
                p[3] || (p[3] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see agent analysis.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Ik = /* @__PURE__ */ be(Pk, [["__scopeId", "data-v-bb4ae132"]]), Ek = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Rk = { class: "card-body" }, Fk = {
  key: 0,
  class: "chart-section"
}, Ok = { class: "chart-container" }, Vk = {
  key: 1,
  class: "empty-state"
}, zk = { class: "empty-state-content" }, Nk = { class: "empty-icon-wrapper" }, jk = /* @__PURE__ */ ce({
  __name: "TopAgents",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = {
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
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), l = C(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return (s[y] || "#a78bfa") + "80";
      }), p = h.map((v) => {
        const y = v.agent_type?.toLowerCase();
        return s[y] || "#a78bfa";
      });
      return {
        labels: h.map((v) => {
          const y = v.conversations || 0, b = l.value ? y / l.value * 100 : 0;
          return `${v.agent_type} - ${y.toLocaleString()} (${b.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((v) => v.conversations || 0),
            backgroundColor: f,
            borderColor: p,
            borderWidth: 2
          }
        ]
      };
    }), d = C(() => a.options ? a.options : {
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
              const f = (h.label || "").toString(), p = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((y, b) => y + (Number(b) || 0), 0), v = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${v.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, f) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", Ek, [
          u("div", Rk, [
            r.value ? (m(), k("section", Fk, [
              u("div", Ok, [
                N(Dn, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), k("section", Vk, [
              u("div", zk, [
                u("div", Nk, [
                  N(P(nt), { class: "empty-icon" })
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
}), Hk = /* @__PURE__ */ be(jk, [["__scopeId", "data-v-74c924dc"]]), Wk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Kk = { class: "card-body" }, Yk = {
  key: 0,
  class: "chart-section"
}, Uk = { class: "chart-container" }, qk = {
  key: 1,
  class: "empty-state"
}, Xk = { class: "empty-state-content" }, Gk = { class: "empty-icon-wrapper" }, Zk = /* @__PURE__ */ ce({
  __name: "DailyCostTrends",
  props: {
    costData: { default: () => ({}) },
    conversationData: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = De(Me(a, "theme")), s = (c) => {
      const d = new Date(c), h = String(d.getDate()).padStart(2, "0");
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${h}`;
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), r = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const y = [...c].sort((b, x) => b.date.localeCompare(x.date));
        return {
          labels: y.map((b) => s(b.date)),
          datasets: [
            {
              label: "Mean USD/conv",
              data: y.map((b) => Number(b.value) || 0),
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
      const d = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, p = Object.keys(d).filter((y) => h[y]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.map((y) => s(y)), v = p.map((y) => {
        const b = d[y]?.total_cost || 0, x = h[y] || 0;
        return x > 0 ? b / x : 0;
      });
      return {
        labels: g,
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
    }), l = C(() => a.options ? a.options : {
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
              return d && (d += ": "), c.parsed.y !== null && (d += Be(c.parsed.y)), d;
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
              return Be(c);
            }
          }
        }
      }
    });
    return t({ isDark: n }), (c, d) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: R(() => [
        u("div", Wk, [
          u("div", Kk, [
            i.value ? (m(), k("section", Yk, [
              u("div", Uk, [
                N(bt, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), k("section", qk, [
              u("div", Xk, [
                u("div", Gk, [
                  N(P(nt), { class: "empty-icon" })
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
}), Qk = /* @__PURE__ */ be(Zk, [["__scopeId", "data-v-ae6c48b1"]]), Jk = { class: "tabs text-sm" }, e_ = ["aria-label"], t_ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], a_ = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, n_ = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = oe([]), s = `tabs-${ze()}`, i = (g) => `${s}-tab-${g}`, r = C(
      () => a.items.map((g, v) => g.disabled ? -1 : v).filter((g) => g >= 0)
    );
    function l(g) {
      return g.value === a.modelValue;
    }
    function c(g) {
      const v = l(g), b = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${b} cursor-not-allowed opacity-40` : v ? `${b} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${b} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, v) {
      g === v || a.items.find((b) => b.value === g)?.disabled || (n("update:modelValue", g), n("change", { value: g, previousValue: v }));
    }
    function h(g, v) {
      n("tab-click", { value: g.value, originalEvent: v }), !g.disabled && (d(g.value, a.modelValue), je(() => {
        o.value[a.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, v) {
      const y = a.items.length;
      if (y === 0) return 0;
      let b = g;
      for (let x = 0; x < y; x++)
        if (b = (b + v + y) % y, !a.items[b]?.disabled) return b;
      return g;
    }
    async function p(g, v) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let b = v;
      g.key === "ArrowLeft" ? b = f(v, -1) : g.key === "ArrowRight" ? b = f(v, 1) : g.key === "Home" ? b = r.value[0] ?? 0 : g.key === "End" && (b = r.value[r.value.length - 1] ?? v);
      const x = a.items[b];
      !x || x.disabled || (d(x.value, a.modelValue), await je(), o.value[b]?.focus());
    }
    return (g, v) => (m(), k("div", Jk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: Z([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), k(re, null, ge(e.items, (y, b) => (m(), k("button", {
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
          class: Z(c(y)),
          onClick: (x) => h(y, x),
          onKeydown: (x) => p(x, b)
        }, [
          u("span", {
            class: Z(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (m(), ee($t(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : F("", !0),
            u("span", a_, A(y.label), 1)
          ], 2)
        ], 42, t_))), 128))
      ], 10, e_),
      g.$slots.default ? (m(), ee(ut, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: R(() => [
          (m(), k("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            _e(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : F("", !0)
    ]));
  }
}), vr = /* @__PURE__ */ be(n_, [["__scopeId", "data-v-f9c367eb"]]), o_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, s_ = { class: "card-body" }, i_ = {
  key: 0,
  class: "model-usage-table-block"
}, r_ = { class: "w-full min-w-0" }, l_ = {
  key: 1,
  class: "empty-state"
}, c_ = { class: "empty-state-content" }, d_ = { class: "empty-icon-wrapper" }, u_ = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (g) => {
      o("export", g);
    }, { isDark: i } = De(Me(n, "theme")), r = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], l = oe("by_model"), c = C(() => l.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([g, v]) => ({
        id: g,
        name: g,
        avgCost: p(v.avg_cost_per_message),
        avgTokens: f(v.avg_tokens_per_message),
        messageCount: f(v.message_count),
        totalCost: p(v.total_cost),
        totalTokens: f(v.total_tokens)
      }))
    ), f = (g) => g == null ? "0" : de(g), p = (g) => g == null ? "$0.00" : Be(g);
    return t({ isDark: i }), (g, v) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", o_, [
          u("div", s_, [
            N(vr, {
              modelValue: l.value,
              "onUpdate:modelValue": v[0] || (v[0] = (y) => l.value = y),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: R(() => [
                c.value && Object.keys(c.value).length > 0 ? (m(), k("div", i_, [
                  u("div", r_, [
                    N(dt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (m(), k("div", l_, [
                  u("div", c_, [
                    u("div", d_, [
                      N(P(nt), { class: "empty-icon" })
                    ]),
                    v[1] || (v[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    v[2] || (v[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), h_ = /* @__PURE__ */ be(u_, [["__scopeId", "data-v-48a6cc07"]]), f_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, g_ = { class: "card-body" }, m_ = {
  key: 0,
  class: "message-roles-table-block"
}, p_ = { class: "w-full min-w-0" }, b_ = {
  key: 1,
  class: "empty-state"
}, v_ = { class: "empty-state-content" }, y_ = { class: "empty-icon-wrapper" }, x_ = /* @__PURE__ */ ce({
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
    const n = e, o = a, s = (v) => {
      o("export", v);
    }, { isDark: i } = De(Me(n, "theme")), r = ["assistant", "system", "user"], l = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => n.data?.total_by_role || {}), d = C(
      () => r.map((v) => ({
        id: v,
        role: g(v),
        avgCost: p(c.value[v]?.avg_cost_per_message),
        avgTokens: f(c.value[v]?.avg_tokens_per_message),
        messageCount: f(c.value[v]?.message_count),
        totalCost: p(c.value[v]?.total_cost),
        totalTokens: f(c.value[v]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), f = (v) => v == null ? "0" : de(v), p = (v) => v == null ? "$0.00" : Be(v), g = (v) => v.charAt(0).toUpperCase() + v.slice(1);
    return t({ isDark: i }), (v, y) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", f_, [
          u("div", g_, [
            h.value ? (m(), k("div", m_, [
              u("div", p_, [
                N(dt, {
                  columns: l,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (m(), k("div", b_, [
              u("div", v_, [
                u("div", y_, [
                  N(P(nt), { class: "empty-icon" })
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
}), k_ = /* @__PURE__ */ be(x_, [["__scopeId", "data-v-d38e854e"]]), __ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, w_ = { class: "card-body" }, C_ = {
  key: 0,
  class: "chart-section"
}, $_ = { class: "chart-container" }, S_ = { class: "kpi-grid" }, M_ = {
  key: 1,
  class: "empty-state"
}, D_ = { class: "empty-state-content" }, A_ = { class: "empty-icon-wrapper" }, T_ = 40, B_ = 230, L_ = /* @__PURE__ */ ce({
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
    }, { isDark: i, colors: r } = De(Me(n, "theme")), l = {
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
    }, c = (_) => _.agent_type || _.agent_id || _.agent_name || "", d = (_) => _.agent_name ? _.agent_name : c(_).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (_) => {
      const w = c(_).toLowerCase();
      for (const [$, D] of Object.entries(l))
        if (w.includes($))
          return D;
      return "#9ca3af";
    }, f = C(() => [...n.data?.top_agents || []].sort((w, $) => $.avg_cost_per_conversation - w.avg_cost_per_conversation)), p = C(
      () => Math.max(B_, f.value.length * T_ + 32)
    ), g = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : f.value.reduce((_, w) => _ + w.conversations, 0)), v = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : f.value.reduce((_, w) => _ + w.total_cost, 0)), y = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : g.value === 0 ? 0 : v.value / g.value), b = C(() => {
      const _ = f.value;
      if (_.length === 0)
        return { labels: [], datasets: [] };
      const w = _.map((S) => d(S)), $ = _.map((S) => S.avg_cost_per_conversation), D = _.map((S) => h(S));
      return {
        labels: w,
        datasets: [
          {
            label: "USD per conversation",
            data: $,
            backgroundColor: D.map((S) => `${S}80`),
            borderColor: D,
            borderWidth: 1
          }
        ]
      };
    }), x = C(() => n.options ? n.options : {
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
            title: function(_) {
              const w = f.value[_[0]?.dataIndex];
              return w ? d(w) : "";
            },
            label: function(_) {
              const w = f.value[_.dataIndex];
              return [
                `Cost: ${Be(_.parsed.x)}`,
                `Conversations: ${de(w.conversations)}`,
                `Total Cost: ${Be(w.total_cost)}`
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
            callback: function(_) {
              return Be(_);
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
    return t({ isDark: i }), (_, w) => (m(), ee($e, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: R(() => [
        e.enableExport && !e.loading ? (m(), ee(P(Oe), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : F("", !0)
      ]),
      default: R(() => [
        u("div", __, [
          u("div", w_, [
            b.value.labels && b.value.labels.length ? (m(), k("section", C_, [
              u("div", $_, [
                N(kt, {
                  data: b.value,
                  options: x.value,
                  "height-px": p.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              u("footer", S_, [
                N(P(ke), {
                  title: "Total Agents",
                  value: String(f.value.length)
                }, null, 8, ["value"]),
                N(P(ke), {
                  title: "Total Conversations",
                  value: P(de)(g.value)
                }, null, 8, ["value"]),
                N(P(ke), {
                  title: "Total Cost",
                  value: P(Be)(v.value)
                }, null, 8, ["value"]),
                N(P(ke), {
                  title: "Avg Cost / Conv.",
                  value: P(Be)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (m(), k("section", M_, [
              u("div", D_, [
                u("div", A_, [
                  N(P(nt), { class: "empty-icon" })
                ]),
                w[0] || (w[0] = u("p", { class: "empty-title" }, "No cost per conversation data", -1)),
                w[1] || (w[1] = u("p", { class: "empty-description" }, "No agent data found for the selected period. Try adjusting the date range.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), P_ = /* @__PURE__ */ be(L_, [["__scopeId", "data-v-65f2d154"]]);
function Do(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function yr(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, r) => s(i, r, n, o)).map((i) => {
    const r = Do(i, a);
    return r.length === 0 ? i : {
      ...i,
      [a]: yr(r, t)
    };
  });
}
function xr(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: r, maxDepth: l } = t, c = [];
  return e.forEach((d, h) => {
    const f = r(d, o + h), p = Do(d, s), g = p.length > 0, v = i.has(f);
    c.push({
      row: d,
      key: f,
      depth: a,
      hasChildren: g,
      isExpanded: v,
      parentKey: n
    }), g && v && (l === void 0 || a < l) && c.push(
      ...xr(p, t, a + 1, f, 0)
    );
  }), c;
}
function kr(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const d = s(l, n + c), h = Do(l, o), f = h.length > 0, p = {
      depth: a,
      isChild: a > 0,
      hasChildren: f
    };
    (i?.(l, p) ?? !0) && r.push(d), h.length > 0 && r.push(
      ...kr(h, t, a + 1, 0)
    );
  }), r;
}
const I_ = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, E_ = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, R_ = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, F_ = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, O_ = ["checked", "aria-label"], V_ = ["aria-sort", "onClick"], z_ = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, N_ = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, j_ = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, H_ = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, W_ = ["checked", "aria-label", "onChange"], K_ = ["aria-expanded", "aria-label", "onClick"], Y_ = ["aria-expanded", "aria-label", "onClick"], U_ = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, q_ = { class: "min-w-0 flex-1" }, X_ = /* @__PURE__ */ ce({
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
    }), r = C(
      () => new Set(i.value)
    ), l = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), c = C(() => ({
      childrenKey: a.childrenKey,
      expandedKeys: r.value,
      resolveRowKey: g,
      maxDepth: a.maxDepth
    })), d = C(() => {
      const { sortKey: L, sortDirection: K, sortCompare: Y, rows: le } = a;
      return !L || !K || !Y ? le : a.expandable ? yr(le, {
        childrenKey: a.childrenKey,
        sortKey: L,
        sortDirection: K,
        compare: Y
      }) : [...le].sort((ve, Q) => Y(ve, Q, L, K));
    }), h = C(() => a.expandable ? xr(d.value, c.value) : d.value.map((L, K) => ({
      row: L,
      key: g(L, K),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function f(L) {
      return `cell-${L}`;
    }
    function p(L) {
      return L === "center" ? "text-center" : L === "right" ? "text-right" : "text-left";
    }
    function g(L, K) {
      if (typeof a.rowKey == "function")
        return a.rowKey(L);
      const Y = L[a.rowKey];
      return Y != null ? String(Y) : `__index_${K}`;
    }
    function v(L, K) {
      return L[K];
    }
    function y(L) {
      return L == null || typeof L == "object" ? "" : String(L);
    }
    function b(L) {
      return a.expandable && L === l.value;
    }
    function x(L) {
      return L.hasChildren || (a.isRowExpandable?.(L.row) ?? !1);
    }
    function _(L, K) {
      return {
        row: L.row,
        column: K,
        value: v(L.row, K.key),
        depth: L.depth,
        isChild: L.depth > 0,
        hasChildren: L.hasChildren,
        expanded: L.isExpanded
      };
    }
    function w(L) {
      if (!x(L)) return;
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
    function D(L, K) {
      return a.isRowSelectable?.(L, K) ?? !0;
    }
    function S(L) {
      return D(L.row, $(L));
    }
    function I(L) {
      return a.selectable && x(L) && !S(L);
    }
    function V(L) {
      return x(L) && !I(L);
    }
    function O(L) {
      return V(L) ? !1 : L.depth > 0 ? !0 : a.selectable && !x(L);
    }
    const M = C(() => {
      const { isRowSelectable: L } = a;
      return a.expandable ? kr(d.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: g,
        isRowSelectable: L
      }) : d.value.map((K, Y) => ({
        row: K,
        key: g(K, Y),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: K, context: Y }) => D(K, Y)).map(({ key: K }) => K);
    });
    function B(L) {
      const K = String(L);
      return a.selectedKeys.some((Y) => String(Y) === K);
    }
    const T = C(() => !a.selectable || M.value.length === 0 ? !1 : M.value.every(
      (L) => a.selectedKeys.some((K) => String(K) === String(L))
    )), z = C(() => {
      if (!a.selectable || M.value.length === 0) return !1;
      const L = M.value.filter(
        (K) => a.selectedKeys.some((Y) => String(Y) === String(K))
      );
      return L.length > 0 && L.length < M.value.length;
    });
    Ee(
      [z, T, () => a.selectable],
      async () => {
        await je();
        const L = o.value;
        L && (L.indeterminate = z.value && !T.value);
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
    function q(L) {
      if (!a.selectable) return;
      const K = String(L), Y = h.value.find((ve) => String(ve.key) === K);
      if (Y && !S(Y) || !Y && !M.value.some((ve) => String(ve) === K))
        return;
      a.selectedKeys.some((ve) => String(ve) === K) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((ve) => String(ve) !== K)
      ) : n("update:selectedKeys", [...a.selectedKeys, K]);
    }
    function ae(L) {
      return `${a.ariaLabelSelectRow} ${L}`;
    }
    function ue(L) {
      n("sort", L);
    }
    function me(L) {
      return a.sortKey === L && a.sortDirection != null;
    }
    function U(L) {
      return me(L) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (L, K) => (m(), k("div", I_, [
      u("div", E_, [
        u("table", {
          class: Z([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", R_, [
              e.selectable ? (m(), k("th", F_, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: T.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: H
                }, null, 40, O_)
              ])) : F("", !0),
              (m(!0), k(re, null, ge(e.columns, (Y) => (m(), k("th", {
                key: Y.key,
                scope: "col",
                class: Z([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  b(Y.key) && e.selectable ? "!pl-0" : "",
                  p(Y.align),
                  Y.headerClass ?? ""
                ])
              }, [
                Y.sortable ? (m(), k("button", {
                  key: 0,
                  type: "button",
                  class: Z(["kiut-table-sort-btn inline-flex items-center gap-1", p(Y.align)]),
                  "aria-sort": U(Y.key),
                  onClick: (le) => ue(Y.key)
                }, [
                  u("span", null, A(Y.label), 1),
                  u("span", z_, [
                    me(Y.key) ? (m(), k(re, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), k("span", N_, "↑")) : e.sortDirection === "desc" ? (m(), k("span", j_, "↓")) : F("", !0)
                    ], 64)) : (m(), k(re, { key: 1 }, [
                      K[0] || (K[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      K[1] || (K[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, V_)) : (m(), k(re, { key: 1 }, [
                  Ae(A(Y.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(re, null, ge(h.value, (Y) => (m(), k("tr", {
              key: Y.key,
              class: Z([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                Y.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (m(), k("td", H_, [
                S(Y) ? (m(), k("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B(Y.key),
                  "aria-label": ae(Y.key),
                  onChange: (le) => q(Y.key)
                }, null, 40, W_)) : I(Y) ? (m(), k("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": Y.isExpanded,
                  "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Fe((le) => w(Y), ["stop"])
                }, [
                  N(P(Gt), {
                    class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, K_)) : F("", !0)
              ])) : F("", !0),
              (m(!0), k(re, null, ge(e.columns, (le) => (m(), k("td", {
                key: le.key,
                class: Z([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  b(le.key) ? "pl-0 pr-2" : "px-2",
                  p(le.align),
                  le.cellClass ?? ""
                ])
              }, [
                b(le.key) ? (m(), k("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: Ce({ paddingLeft: `${Y.depth * 1.25}rem` })
                }, [
                  _e(L.$slots, "row-expand", {
                    row: Y.row,
                    expanded: Y.isExpanded,
                    hasChildren: Y.hasChildren,
                    depth: Y.depth,
                    toggle: () => w(Y)
                  }, () => [
                    V(Y) ? (m(), k("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": Y.isExpanded,
                      "aria-label": Y.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Fe((ve) => w(Y), ["stop"])
                    }, [
                      N(P(Gt), {
                        class: Z(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !Y.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, Y_)) : O(Y) ? (m(), k("span", U_)) : F("", !0)
                  ], !0),
                  u("div", q_, [
                    _e(L.$slots, f(le.key), ft({ ref_for: !0 }, _(Y, le)), () => [
                      Ae(A(y(v(Y.row, le.key))), 1)
                    ], !0)
                  ])
                ], 4)) : _e(L.$slots, f(le.key), ft({
                  key: 1,
                  ref_for: !0
                }, _(Y, le)), () => [
                  Ae(A(y(v(Y.row, le.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), G_ = /* @__PURE__ */ be(X_, [["__scopeId", "data-v-b3104817"]]), si = /* @__PURE__ */ ce({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (m(), k("svg", {
      class: Z(["inline-flex shrink-0 animate-spin", a.value]),
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
}), Z_ = ["disabled", "aria-expanded", "aria-label"], Q_ = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, J_ = { class: "min-w-0 truncate" }, e2 = ["disabled", "onClick", "onMouseenter"], t2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, a2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, n2 = { class: "min-w-0 flex-1 text-left" }, o2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, s2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, i2 = ["disabled", "aria-expanded", "aria-label"], r2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, l2 = ["disabled", "onClick", "onMouseenter"], c2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, d2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, u2 = { class: "min-w-0 flex-1 text-left" }, h2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, f2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, g2 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, m2 = ["type", "disabled", "aria-busy", "aria-label"], p2 = {
  key: 2,
  class: "min-w-0 truncate"
}, b2 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, v2 = ["type", "disabled", "aria-busy", "aria-label"], y2 = {
  key: 2,
  class: "min-w-0 truncate"
}, xt = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = Xa(), s = C(
      () => !!a.tooltip?.trim() && a.variant !== "dropdown" && a.variant !== "split"
    ), i = C(() => a.variant === "dropdown"), r = C(() => a.variant === "split"), l = C(() => a.variant === "action"), c = C(() => !l.value && !r.value), d = C(() => a.disabled || a.loading), h = C(
      () => a.loading ? "cursor-wait disabled:pointer-events-none" : "disabled:pointer-events-none disabled:opacity-45"
    ), f = C(() => {
      const L = o["aria-label"];
      if (typeof L == "string" && L.length > 0) return L;
      if ((l.value || r.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), p = C(() => {
      const L = o.type;
      return L === "submit" || L === "reset" || L === "button" ? L : "button";
    }), g = C(() => {
      const { class: L, type: K, "aria-label": Y, ...le } = o;
      return le;
    }), v = C(() => a.variant === "primary" || a.variant === "dropdown" ? [
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
    ]), y = `kiut-button-menu-${ze()}`, b = `${y}-btn`, x = `${y}-menu`, _ = oe(null), w = oe(null), $ = oe(null), D = oe(!1), S = oe(0), I = oe({}), V = C(() => a.options.filter((L) => !L.disabled));
    function O(L) {
      return `${L.value}-${L.label}`;
    }
    function M() {
      const L = w.value;
      if (!L) return;
      const K = L.getBoundingClientRect(), Y = {
        top: `${K.bottom - 3}px`,
        minWidth: `max(${K.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (Y.right = `${window.innerWidth - K.right}px`, Y.left = "auto") : (Y.left = `${K.left}px`, Y.right = "auto"), I.value = Y;
    }
    function B(L) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        S.value === L ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function T() {
      D.value = !1;
    }
    function z() {
      M(), S.value = 0, je(() => $.value?.focus());
    }
    function H() {
      if (!a.disabled) {
        if (D.value) {
          T();
          return;
        }
        D.value = !0, z();
      }
    }
    function q(L) {
      L.disabled || (n("select", L), T());
    }
    function ae(L) {
      L.stopPropagation(), H();
    }
    function ue(L) {
      if (!D.value) return;
      const K = L.target, Y = _.value, le = $.value;
      Y && !Y.contains(K) && (!le || !le.contains(K)) && T();
    }
    function me(L) {
      a.disabled || (L.key === "ArrowDown" || L.key === "Enter" || L.key === " ") && (L.preventDefault(), D.value || (D.value = !0, z()));
    }
    function U(L) {
      const K = V.value;
      if (L.key === "Escape") {
        L.preventDefault(), T(), w.value?.focus();
        return;
      }
      if (K.length !== 0) {
        if (L.key === "ArrowDown") {
          L.preventDefault(), S.value = Math.min(S.value + 1, K.length - 1);
          return;
        }
        if (L.key === "ArrowUp") {
          L.preventDefault(), S.value = Math.max(S.value - 1, 0);
          return;
        }
        if (L.key === "Enter" || L.key === " ") {
          L.preventDefault();
          const Y = K[S.value];
          Y && q(Y);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", ue);
    }), ct(() => {
      document.removeEventListener("click", ue);
    }), (L, K) => i.value ? (m(), k("div", {
      key: 0,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", ft({
        ref_key: "buttonRef",
        ref: w,
        id: b,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, P(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ae,
        onKeydown: me
      }), [
        L.$slots.icon ? (m(), k("span", Q_, [
          _e(L.$slots, "icon")
        ])) : F("", !0),
        u("span", J_, [
          _e(L.$slots, "default")
        ]),
        N(P(Gt), {
          class: Z(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", D.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, Z_),
      (m(), ee(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(I.value),
          onKeydown: Fe(U, ["stop"])
        }, [
          (m(!0), k(re, null, ge(V.value, (Y, le) => (m(), k("button", {
            key: O(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(B(le)),
            onClick: Fe((ve) => q(Y), ["stop"]),
            onMouseenter: (ve) => S.value = le
          }, [
            Y.icon ? (m(), k("span", t2, [
              (m(), ee($t(Y.icon), { class: "h-5 w-5" }))
            ])) : (m(), k("span", a2)),
            u("span", n2, [
              u("span", o2, A(Y.label), 1),
              Y.description ? (m(), k("span", s2, A(Y.description), 1)) : F("", !0)
            ])
          ], 42, e2))), 128))
        ], 36), [
          [Ut, D.value]
        ])
      ]))
    ], 512)) : r.value ? (m(), k("div", {
      key: 1,
      ref_key: "rootRef",
      ref: _,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", ft({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [v.value, P(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ae,
        onKeydown: me
      }), [
        L.$slots.icon ? (m(), k("span", r2, [
          _e(L.$slots, "icon")
        ])) : F("", !0)
      ], 16, i2),
      (m(), ee(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(I.value),
          onKeydown: Fe(U, ["stop"])
        }, [
          (m(!0), k(re, null, ge(V.value, (Y, le) => (m(), k("button", {
            key: O(Y),
            type: "button",
            role: "menuitem",
            disabled: Y.disabled,
            class: Z(B(le)),
            onClick: Fe((ve) => q(Y), ["stop"]),
            onMouseenter: (ve) => S.value = le
          }, [
            Y.icon ? (m(), k("span", c2, [
              (m(), ee($t(Y.icon), { class: "h-5 w-5" }))
            ])) : (m(), k("span", d2)),
            u("span", u2, [
              u("span", h2, A(Y.label), 1),
              Y.description ? (m(), k("span", f2, A(Y.description), 1)) : F("", !0)
            ])
          ], 42, l2))), 128))
        ], 36), [
          [Ut, D.value]
        ])
      ]))
    ], 512)) : s.value ? (m(), k("span", g2, [
      u("button", ft({
        type: p.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, v.value, P(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": f.value
      }, g.value), [
        e.loading ? (m(), ee(si, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : L.$slots.icon ? (m(), k("span", {
          key: 1,
          class: Z(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          _e(L.$slots, "icon")
        ], 2)) : F("", !0),
        c.value ? (m(), k("span", p2, [
          _e(L.$slots, "default")
        ])) : F("", !0)
      ], 16, m2),
      u("span", b2, A(e.tooltip), 1)
    ])) : (m(), k("button", ft({
      key: 3,
      type: p.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, v.value, P(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": f.value
    }, g.value), [
      e.loading ? (m(), ee(si, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : L.$slots.icon ? (m(), k("span", {
        key: 1,
        class: Z(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        _e(L.$slots, "icon")
      ], 2)) : F("", !0),
      c.value ? (m(), k("span", y2, [
        _e(L.$slots, "default")
      ])) : F("", !0)
    ], 16, v2));
  }
}), x2 = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], k2 = { class: "sr-only" }, _r = /* @__PURE__ */ ce({
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
    return (s, i) => (m(), k("button", {
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
        Oa(Fe(o, ["prevent", "stop"]), ["space"]),
        Oa(Fe(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: Z(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", k2, A(e.ariaLabel), 1)
    ], 42, x2));
  }
}), _2 = {
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
}, w2 = [
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
], qS = [
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
], C2 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, $2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, S2 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, M2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, D2 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, A2 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, T2 = ["aria-expanded", "aria-label", "onClick"], B2 = { class: "min-w-0 flex-1" }, L2 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, P2 = ["colspan"], I2 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, E2 = ["aria-label"], R2 = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, F2 = {
  key: 2,
  class: "space-y-2"
}, O2 = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, V2 = ["title"], z2 = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, N2 = { class: "ml-auto flex shrink-0 items-center gap-2" }, j2 = /* @__PURE__ */ ce({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => w2 },
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
      ..._2,
      ...a.labels
    })), r = C(
      () => a.expandColumnKey ?? a.columns[0]?.key ?? ""
    ), l = {
      GET: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      PUT: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      PATCH: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      DELETE: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    };
    function c(M) {
      return `cell-${M}`;
    }
    function d(M, B, T) {
      return {
        row: M,
        column: B,
        index: T,
        expanded: v(M, T)
      };
    }
    function h(M) {
      const B = M.key;
      return M.label ? M.label : B in i.value ? i.value[B] : M.key;
    }
    function f(M) {
      return M === "center" ? "text-center" : M === "right" ? "text-right" : "text-left";
    }
    function p(M) {
      return M === r.value;
    }
    function g(M, B) {
      if (typeof a.rowKey == "function")
        return a.rowKey(M);
      const T = M[a.rowKey];
      return T != null ? String(T) : `__index_${B}`;
    }
    function v(M, B) {
      return s.value.includes(g(M, B));
    }
    function y(M) {
      return M.versionsLoading === !0;
    }
    function b(M, B) {
      const T = g(M, B), z = new Set(s.value);
      z.has(T) ? (z.delete(T), n("collapse", T, M)) : (a.singleExpand && z.clear(), z.add(T), n("expand", T, M)), s.value = [...z];
    }
    function x(M) {
      return M.type ?? M.key;
    }
    function _(M) {
      return l[M] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function w(M) {
      return M === "published" ? "success" : "warning";
    }
    function $(M) {
      const B = M instanceof Date ? M : new Date(M);
      return Number.isNaN(B.getTime()) ? String(M) : B.toLocaleDateString("es-ES");
    }
    function D(M) {
      const B = M instanceof Date ? M : new Date(M);
      return Number.isNaN(B.getTime()) ? String(M) : B.toLocaleString("es-ES");
    }
    function S(M) {
      return Ve("div", { class: "min-w-0" }, [
        Ve(
          "p",
          { class: "truncate font-medium text-[color:var(--kiut-text-primary)]" },
          M.name
        ),
        M.description ? Ve(
          "p",
          { class: "truncate text-xs text-[color:var(--kiut-text-muted)]" },
          M.description
        ) : null
      ]);
    }
    function I(M) {
      return M.method ? Ve(
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
    function V(M, B) {
      const T = B.actions ?? ["view", "edit"], z = [];
      for (const H of T)
        H === "view" ? z.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", M)
            },
            { icon: () => Ve(ei, { class: "h-4 w-4" }) }
          )
        ) : H === "run" ? z.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", M)
            },
            { icon: () => Ve(Ym, { class: "h-4 w-4" }) }
          )
        ) : H === "edit" ? z.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", M)
            },
            { icon: () => Ve(Km, { class: "h-4 w-4" }) }
          )
        ) : H === "createDraft" ? z.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", M)
            },
            { icon: () => Ve(Js, { class: "h-4 w-4" }) }
          )
        ) : H === "delete" && z.push(
          Ve(
            xt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", M)
            },
            { icon: () => Ve(Um, { class: "h-4 w-4" }) }
          )
        );
      return Ve(
        "div",
        { class: "flex items-center justify-end gap-1" },
        z
      );
    }
    function O(M, B, T) {
      switch (x(B)) {
        case "name":
          return S(M);
        case "method":
          return I(M);
        case "url":
          return M.url ? Ve(
            "span",
            {
              class: "block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
              title: M.url
            },
            M.url
          ) : null;
        case "status":
          return Ve(
            Ue,
            { color: w(M.status), outlined: !1 },
            () => M.status
          );
        case "version":
          return Ve("span", {}, M.version);
        case "updated":
          return Ve(
            "span",
            { class: "whitespace-nowrap text-xs" },
            $(M.updatedAt)
          );
        case "active":
          return Ve(_r, {
            modelValue: M.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (H) => n("toggleActive", M, H)
          });
        case "actions":
          return V(M, B);
        default:
          return Ve("span", {}, String(M[B.key] ?? ""));
      }
    }
    return (M, B) => (m(), k("div", C2, [
      u("div", $2, [
        u("table", S2, [
          u("thead", null, [
            u("tr", M2, [
              (m(!0), k(re, null, ge(e.columns, (T) => (m(), k("th", {
                key: T.key,
                scope: "col",
                class: Z([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  f(T.align),
                  T.headerClass ?? ""
                ])
              }, A(h(T)), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), k(re, null, ge(e.rows, (T, z) => (m(), k(re, {
              key: g(T, z)
            }, [
              u("tr", D2, [
                (m(!0), k(re, null, ge(e.columns, (H) => (m(), k("td", {
                  key: H.key,
                  class: Z([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    f(H.align),
                    H.cellClass ?? ""
                  ])
                }, [
                  _e(M.$slots, c(H.key), ft({ ref_for: !0 }, d(T, H, z)), () => [
                    p(H.key) ? (m(), k("div", A2, [
                      u("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": v(T, z),
                        "aria-label": v(T, z) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (q) => b(T, z)
                      }, [
                        N(P(Gt), {
                          class: Z(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !v(T, z) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, T2),
                      u("div", B2, [
                        (m(), ee($t(() => O(T, H))))
                      ])
                    ])) : (m(), ee($t(() => O(T, H)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              v(T, z) ? (m(), k("tr", L2, [
                u("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  u("h4", I2, A(i.value.historialTitle), 1),
                  y(T) ? (m(), k("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (m(!0), k(re, null, ge(e.historySkeletonCount, (H) => (m(), k("div", {
                      key: H,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...B[0] || (B[0] = [
                      Yn('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, E2)) : T.versions?.length ? (m(), k("div", F2, [
                    (m(!0), k(re, null, ge(T.versions, (H) => (m(), k("div", {
                      key: H.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      _e(M.$slots, "history-item", {
                        version: H,
                        row: T
                      }, () => [
                        N(Ue, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: R(() => [
                            Ae(A(H.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        u("span", O2, A(H.version), 1),
                        H.method ? (m(), k("span", {
                          key: 0,
                          class: Z(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", _(H.method)])
                        }, A(H.method), 3)) : F("", !0),
                        H.url ? (m(), k("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: H.url
                        }, A(H.url), 9, V2)) : F("", !0),
                        u("span", z2, A(D(H.updatedAt)), 1)
                      ], !0),
                      u("div", N2, [
                        _e(M.$slots, "history-actions", {
                          version: H,
                          row: T
                        }, () => [
                          N(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (q) => n("viewVersion", H, T)
                          }, {
                            icon: R(() => [
                              N(P(ei), { class: "h-4 w-4" })
                            ]),
                            default: R(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          N(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (q) => n("createDraftFromVersion", H, T)
                          }, {
                            icon: R(() => [
                              N(P(Js), { class: "h-4 w-4" })
                            ]),
                            default: R(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (m(), k("p", R2, A(i.value.emptyHistory), 1))
                ], 8, P2)
              ])) : F("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), H2 = /* @__PURE__ */ be(j2, [["__scopeId", "data-v-177ecafb"]]);
function W2(e, t) {
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
function K2(e, t) {
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
const Y2 = ["aria-label"], U2 = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, q2 = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, X2 = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, G2 = ["aria-label", "aria-expanded", "aria-controls", "onClick"], Z2 = { class: "truncate" }, Q2 = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, J2 = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, ew = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, tw = ["aria-label", "onClick"], aw = ["aria-label", "onClick"], nw = ["aria-label"], ow = ["aria-label"], sw = {
  key: 1,
  class: "space-y-2"
}, iw = ["for"], rw = ["id", "placeholder", "onKeydown"], lw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, cw = ["aria-label"], dw = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, uw = ["checked", "onChange"], hw = { class: "min-w-0 flex-1" }, fw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, gw = { class: "flex flex-wrap items-end gap-2" }, mw = { class: "min-w-[120px] flex-1" }, pw = ["for"], bw = ["id"], vw = { class: "min-w-[120px] flex-1" }, yw = ["for"], xw = ["id"], kw = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = ao(), i = `${`kiut-filters-${ze()}`}-panel`, r = oe(null), l = /* @__PURE__ */ new Map(), c = oe(null), d = oe(!1), h = oe({}), f = oe(null), p = oe(""), g = oe([]), v = oe(""), y = oe(""), b = C(() => c.value ? a.filterDefinitions.find((E) => E.id === c.value) ?? null : null), x = C(() => {
      const E = b.value;
      if (E)
        return E.type === "text" ? p.value : E.type === "select" ? g.value : { start: v.value, end: y.value };
    });
    function _(E, G) {
      G && G instanceof HTMLElement ? l.set(E, G) : l.delete(E);
    }
    function w(E) {
      return a.modelValue[E];
    }
    function $(E) {
      if (E == null) return [];
      if (Array.isArray(E))
        return E.filter((G) => typeof G == "string" && G.trim() !== "");
      if (typeof E == "string") {
        const G = E.trim();
        return G ? [G] : [];
      }
      return [];
    }
    function D(E, G) {
      if (G == null) return !0;
      if (E.type === "text") return String(G).trim() === "";
      if (E.type === "select") return $(G).length === 0;
      if (E.type === "dateRange") {
        const ie = G;
        return !ie?.start?.trim() || !ie?.end?.trim();
      }
      return !0;
    }
    const S = C(
      () => a.filterDefinitions.some((E) => !D(E, w(E.id)))
    ), I = C(() => {
      const E = [];
      for (const G of a.filterDefinitions) {
        const ie = w(G.id);
        if (!D(G, ie)) {
          if (G.type === "text")
            E.push({ kind: "text", def: G, key: G.id });
          else if (G.type === "dateRange")
            E.push({ kind: "dateRange", def: G, key: G.id });
          else if (G.type === "select")
            for (const he of $(ie))
              E.push({
                kind: "select",
                def: G,
                optionValue: he,
                key: `${G.id}::${he}`
              });
        }
      }
      return E;
    });
    function V(E) {
      return E.type !== "select" ? 0 : $(w(E.id)).length;
    }
    function O(E) {
      const G = w(E.id), ie = E.label.replace(/^\+\s*/, "");
      if (E.type === "text") return `${ie}: ${String(G ?? "").trim()}`;
      if (E.type === "select") {
        const vt = $(G).map((Qt) => E.options.find((fa) => fa.value === Qt)?.label ?? Qt);
        return `${ie}: ${vt.join(", ")}`;
      }
      const he = G, ye = B(he.start), we = B(he.end);
      return `${ie}: ${ye} – ${we}`;
    }
    function M(E) {
      return E.kind === "text" || E.kind === "dateRange" ? O(E.def) : E.def.options.find((ie) => ie.value === E.optionValue)?.label ?? E.optionValue;
    }
    function B(E) {
      if (!E) return "";
      const G = We(E, "YYYY-MM-DD", !0);
      return G.isValid() ? G.format("L") : E;
    }
    function T(E) {
      const G = c.value === E.id && d.value, ie = !D(E, w(E.id));
      return G || ie ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function z(E) {
      return D(E, w(E.id)) ? X(E) : `Editar filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    function H(E) {
      const G = w(E.id);
      if (E.type === "text") {
        p.value = G != null ? String(G) : "";
        return;
      }
      if (E.type === "select") {
        g.value = [...$(G)];
        return;
      }
      const ie = G;
      v.value = ie?.start?.trim() ?? "", y.value = ie?.end?.trim() ?? "";
    }
    function q() {
      const E = b.value;
      if (!E || E.type !== "select") return;
      const G = { ...a.modelValue };
      g.value.length === 0 ? delete G[E.id] : G[E.id] = [...g.value], n("update:modelValue", G), n("change", G);
    }
    function ae(E) {
      const G = g.value.indexOf(E);
      G >= 0 ? g.value = g.value.filter((ie, he) => he !== G) : g.value = [...g.value, E], q();
    }
    function ue(E) {
      if (!E) return;
      f.value = E;
      const G = E.getBoundingClientRect(), ie = 300;
      let he = G.left;
      const ye = window.innerWidth - ie - 12;
      he > ye && (he = Math.max(12, ye)), he < 12 && (he = 12);
      const we = G.bottom + 8;
      h.value = {
        top: `${we}px`,
        left: `${he}px`,
        width: `${Math.min(ie, window.innerWidth - 24)}px`
      };
    }
    function me(E, G) {
      if (c.value === E.id && d.value) {
        le();
        return;
      }
      d.value && c.value !== E.id && le(), c.value = E.id, d.value = !0, H(E), je().then(async () => {
        ue(G.currentTarget), await je(), L();
      });
    }
    function U(E, G) {
      if (c.value === E.id && d.value) {
        le();
        return;
      }
      d.value && c.value !== E.id && le(), c.value = E.id, d.value = !0, H(E), je().then(async () => {
        const ie = l.get(E.id) ?? G.currentTarget;
        ue(ie), await je(), L();
      });
    }
    function L() {
      const E = r.value;
      if (!E) return;
      E.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function K() {
      d.value = !1, c.value = null, f.value = null;
    }
    function Y(E) {
      const G = b.value;
      if (!G) return;
      if (G.type === "text") {
        p.value = E != null ? String(E) : "";
        return;
      }
      if (G.type === "select") {
        g.value = Array.isArray(E) ? E.filter((he) => typeof he == "string") : $(E);
        return;
      }
      const ie = E;
      v.value = ie?.start?.trim() ?? "", y.value = ie?.end?.trim() ?? "";
    }
    function le() {
      const E = b.value;
      if (!E) return;
      if (E.type === "text") {
        const ye = p.value.trim(), we = { ...a.modelValue };
        ye === "" ? delete we[E.id] : we[E.id] = ye, n("update:modelValue", we), n("change", we), K();
        return;
      }
      if (E.type === "select") {
        q(), K();
        return;
      }
      const G = v.value.trim(), ie = y.value.trim(), he = { ...a.modelValue };
      !G || !ie || G > ie ? delete he[E.id] : he[E.id] = { start: G, end: ie }, n("update:modelValue", he), n("change", he), K();
    }
    function ve(E) {
      const G = { ...a.modelValue };
      delete G[E], n("update:modelValue", G), n("change", G), c.value === E && K();
    }
    function Q(E) {
      if (E.kind === "text" || E.kind === "dateRange") {
        ve(E.def.id);
        return;
      }
      const G = { ...a.modelValue }, he = $(G[E.def.id]).filter((ye) => ye !== E.optionValue);
      he.length === 0 ? delete G[E.def.id] : G[E.def.id] = he, n("update:modelValue", G), n("change", G), c.value === E.def.id && H(E.def);
    }
    function W() {
      const E = {};
      n("update:modelValue", E), n("change", E), K();
    }
    const j = C(() => {
      const E = b.value;
      return E ? `Editar filtro: ${E.label}` : "Filtro";
    });
    function te(E) {
      const G = E.def.label.replace(/^\+\s*/, "");
      return E.kind === "select" ? `Quitar ${E.def.options.find((ye) => ye.value === E.optionValue)?.label ?? E.optionValue} del filtro ${G}` : `Quitar filtro ${G}`;
    }
    function se(E) {
      const G = E.def.label.replace(/^\+\s*/, "");
      if (E.kind === "select") {
        const he = E.def.options.find((ye) => ye.value === E.optionValue)?.label ?? E.optionValue;
        return `Editar filtro ${G}: ${he}`;
      }
      return `Editar filtro ${G}`;
    }
    function X(E) {
      return `Añadir filtro ${E.label.replace(/^\+\s*/, "")}`;
    }
    const J = C(() => a.clearLabel);
    function ne(E) {
      if (!d.value || !r.value) return;
      const G = E.target;
      if (!(r.value.contains(G) || (G instanceof Element ? G : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const he of l.values())
          if (he?.contains(G)) return;
        le();
      }
    }
    function fe(E) {
      E.key === "Escape" && d.value && (E.preventDefault(), K());
    }
    function xe() {
      !d.value || !f.value || ue(f.value);
    }
    return Ze(() => {
      document.addEventListener("mousedown", ne, !0), window.addEventListener("keydown", fe, !0), window.addEventListener("resize", xe);
    }), li(() => {
      document.removeEventListener("mousedown", ne, !0), window.removeEventListener("keydown", fe, !0), window.removeEventListener("resize", xe);
    }), Ee(
      () => a.modelValue,
      () => {
        const E = b.value;
        E && d.value && !o.panel && H(E);
      },
      { deep: !0 }
    ), (E, G) => (m(), k("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", U2, [
        u("span", q2, A(e.label), 1),
        u("div", X2, [
          (m(!0), k(re, null, ge(e.filterDefinitions, (ie) => (m(), k("button", {
            key: `pill-${ie.id}`,
            ref_for: !0,
            ref: (he) => _(ie.id, he),
            type: "button",
            class: Z(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", T(ie)]),
            "aria-label": z(ie),
            "aria-expanded": c.value === ie.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === ie.id ? i : void 0,
            onClick: (he) => U(ie, he)
          }, [
            N(P(W2), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", Z2, A(ie.label), 1),
            ie.type === "select" && V(ie) > 0 ? (m(), k("span", Q2, A(V(ie)), 1)) : F("", !0)
          ], 10, G2))), 128))
        ])
      ]),
      S.value ? (m(), k("div", J2, [
        u("div", ew, [
          (m(!0), k(re, null, ge(I.value, (ie) => (m(), k("div", {
            key: ie.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": se(ie),
              onClick: (he) => me(ie.def, he)
            }, [
              _e(E.$slots, "formatChip", {
                filter: ie.def,
                value: w(ie.def.id),
                optionValue: ie.kind === "select" ? ie.optionValue : void 0
              }, () => [
                Ae(A(M(ie)), 1)
              ], !0)
            ], 8, tw),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": te(ie),
              onClick: (he) => Q(ie)
            }, [
              N(P(K2), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, aw)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": J.value,
          onClick: W
        }, A(e.clearLabel), 9, nw)
      ])) : F("", !0),
      (m(), ee(la, { to: "body" }, [
        c.value && d.value ? (m(), k("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": j.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Ce(h.value),
          onKeydown: G[3] || (G[3] = Fe(() => {
          }, ["stop"]))
        }, [
          b.value ? (m(), k(re, { key: 0 }, [
            E.$slots.panel ? _e(E.$slots, "panel", {
              key: 0,
              filter: b.value,
              close: le,
              value: x.value,
              updateValue: Y
            }, void 0, !0) : (m(), k("div", sw, [
              b.value.type === "text" ? (m(), k(re, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(b.value.label), 9, iw),
                Ge(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": G[0] || (G[0] = (ie) => p.value = ie),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: b.value.placeholder ?? "…",
                  onKeydown: Oa(Fe(le, ["prevent"]), ["enter"])
                }, null, 40, rw), [
                  [Wt, p.value]
                ])
              ], 64)) : b.value.type === "select" ? (m(), k(re, { key: 1 }, [
                u("p", lw, A(b.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": b.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), k(re, null, ge(b.value.options, (ie) => (m(), k("li", {
                    key: ie.value
                  }, [
                    u("label", dw, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(ie.value),
                        onChange: (he) => ae(ie.value)
                      }, null, 40, uw),
                      u("span", hw, A(ie.label), 1)
                    ])
                  ]))), 128))
                ], 8, cw)
              ], 64)) : b.value.type === "dateRange" ? (m(), k(re, { key: 2 }, [
                u("p", fw, A(b.value.label), 1),
                u("div", gw, [
                  u("div", mw, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, pw),
                    Ge(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": G[1] || (G[1] = (ie) => v.value = ie),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, bw), [
                      [Wt, v.value]
                    ])
                  ]),
                  u("div", vw, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, yw),
                    Ge(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": G[2] || (G[2] = (ie) => y.value = ie),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, xw), [
                      [Wt, y.value]
                    ])
                  ])
                ])
              ], 64)) : F("", !0)
            ]))
          ], 64)) : F("", !0)
        ], 44, ow)) : F("", !0)
      ]))
    ], 8, Y2));
  }
}), _w = /* @__PURE__ */ be(kw, [["__scopeId", "data-v-f38e0100"]]), ww = { class: "font-sans" }, Cw = ["for"], $w = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], Sw = ["id"], wr = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = Xa(), s = di("$pcForm", null), i = `kiut-input-text-${ze()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), d = oe(a.modelValue ?? "");
    Ee(
      () => a.modelValue,
      (b) => {
        d.value = b ?? "";
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), ct(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), f = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function p(b) {
      const x = b.target.value;
      d.value = x, n("update:modelValue", x);
      const _ = s?.fields?.[c.value]?.props;
      _?.onInput && _.onInput(b);
    }
    function g(b) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(b);
    }
    function v(b) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(b);
    }
    const y = C(() => {
      const { name: b, id: x, type: _, ...w } = o;
      return w;
    });
    return (b, x) => (m(), k("div", ww, [
      e.label ? (m(), k("label", {
        key: 0,
        for: r.value,
        class: Z(P(ot))
      }, A(e.label), 11, Cw)) : F("", !0),
      u("input", ft(y.value, {
        id: r.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [P(at), f.value ? P(Dt) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": f.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l.value : void 0,
        onInput: p,
        onChange: g,
        onBlur: v
      }), null, 16, $w),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: l.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, Sw)) : F("", !0)
    ]));
  }
}), Mw = { class: "font-sans" }, Dw = ["for"], Aw = { class: "relative" }, Tw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], Bw = ["aria-label"], Lw = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Pw = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Iw = ["id"], Ew = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = Xa(), s = di("$pcForm", null), i = `kiut-input-password-${ze()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), d = oe(!1), h = oe(a.modelValue ?? "");
    Ee(
      () => a.modelValue,
      (x) => {
        x !== void 0 && x !== h.value && (h.value = x);
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), ct(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const f = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? h.value : h.value), p = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function g(x) {
      const _ = x.target.value;
      h.value = _, n("update:modelValue", _);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function v(x) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onChange && _.onChange(x);
    }
    function y(x) {
      const _ = s?.fields?.[c.value]?.props;
      _?.onBlur && _.onBlur(x);
    }
    const b = C(() => {
      const { name: x, id: _, ...w } = o;
      return w;
    });
    return (x, _) => (m(), k("div", Mw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: r.value,
        class: Z(P(ot))
      }, A(e.label), 11, Dw)) : F("", !0),
      u("div", Aw, [
        u("input", ft(b.value, {
          id: r.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [P(at), p.value ? P(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": p.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: g,
          onChange: v,
          onBlur: y
        }), null, 16, Tw),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: _[0] || (_[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (m(), k("svg", Pw, [..._[2] || (_[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (m(), k("svg", Lw, [..._[1] || (_[1] = [
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
        ], 8, Bw)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: l.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, Iw)) : F("", !0)
    ]));
  }
}), Rw = { class: "font-sans" }, Fw = ["for"], Ow = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], Vw = ["id"], zw = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-textarea-${ze()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (m(), k("div", Rw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: Z(P(ot))
      }, A(e.label), 11, Fw)) : F("", !0),
      Ge(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: Z([P(dy), e.invalid ? P(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, Ow), [
        [Wt, r.value]
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, Vw)) : F("", !0)
    ]));
  }
}), Nw = { class: "font-sans" }, jw = ["for"], Hw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Ww = ["for"], Kw = ["title"], Yw = ["aria-label"], Uw = {
  key: 2,
  class: "space-y-3"
}, qw = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], Xw = ["for"], Gw = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, Zw = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Qw = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, Jw = { class: "flex items-start gap-2" }, e5 = { class: "min-w-0 flex-1 space-y-2" }, t5 = { class: "flex items-center gap-2" }, a5 = ["title"], n5 = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, o5 = ["aria-label", "onClick"], s5 = ["id"], i5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-file-${ze()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = oe(null), l = C(
      () => a.multiple ? null : a.modelValue
    ), c = C(() => {
      if (!a.multiple) return [];
      const S = a.modelValue;
      return Array.isArray(S) ? S : [];
    }), d = C(
      () => l.value?.name ?? a.placeholder
    ), h = C(
      () => a.multiple && c.value.length >= a.maxFiles
    ), f = C(() => c.value.length === 0 ? a.placeholder : c.value.length === 1 ? c.value[0].file.name : `${c.value.length} archivos seleccionados`);
    function p(S) {
      return a.showDescriptions && a.submitted && a.requireDescriptions && S.description.trim() === "";
    }
    function g(S) {
      return S < 1024 ? `${S} B` : S < 1024 * 1024 ? `${(S / 1024).toFixed(1)} KB` : `${(S / (1024 * 1024)).toFixed(1)} MB`;
    }
    function v(S) {
      return {
        id: `file-${ze()}`,
        file: S,
        description: ""
      };
    }
    function y(S, I) {
      return S.some(
        (V) => V.file.name === I.name && V.file.size === I.size && V.file.lastModified === I.lastModified
      );
    }
    function b() {
      r.value && (r.value.value = "");
    }
    function x(S) {
      const V = S.target.files?.[0] ?? null;
      n("update:modelValue", V);
    }
    function _(S) {
      const I = S.target, V = Array.from(I.files ?? []);
      if (V.length === 0) return;
      const O = [...c.value];
      for (const M of V) {
        if (O.length >= a.maxFiles) break;
        y(O, M) || O.push(v(M));
      }
      n("update:modelValue", O), b();
    }
    function w() {
      n("update:modelValue", null), b();
    }
    function $(S) {
      n(
        "update:modelValue",
        c.value.filter((I) => I.id !== S)
      );
    }
    function D(S, I) {
      n(
        "update:modelValue",
        c.value.map(
          (V) => V.id === S ? { ...V, description: I } : V
        )
      );
    }
    return (S, I) => (m(), k("div", Nw, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: Z(P(ot))
      }, A(e.label), 11, jw)) : F("", !0),
      e.multiple ? (m(), k("div", Uw, [
        u("div", {
          class: Z([
            P(at),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? P(Dt) : "",
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
            onChange: _
          }, null, 40, qw),
          u("label", {
            for: s.value,
            class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || h.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            N(P(eo), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, Xw),
          u("span", Gw, A(f.value), 1),
          e.filesCountLabel ? (m(), k("span", Zw, A(e.filesCountLabel), 1)) : F("", !0)
        ], 2),
        c.value.length > 0 ? (m(), k("ul", Qw, [
          (m(!0), k(re, null, ge(c.value, (V) => (m(), k("li", {
            key: V.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            u("div", Jw, [
              N(P(Hm), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              u("div", e5, [
                u("div", t5, [
                  u("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: V.file.name
                  }, A(V.file.name), 9, a5),
                  u("span", n5, A(g(V.file.size)), 1),
                  e.disabled ? F("", !0) : (m(), k("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (O) => $(V.id)
                  }, [
                    N(P(to), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, o5))
                ]),
                e.showDescriptions ? (m(), ee(wr, {
                  key: 0,
                  "model-value": V.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: p(V),
                  "error-text": p(V) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (O) => D(V.id, O)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : F("", !0)
              ])
            ])
          ]))), 128))
        ])) : F("", !0)
      ])) : (m(), k("div", {
        key: 1,
        class: Z([
          P(at),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? P(Dt) : "",
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
          onChange: x
        }, null, 40, Hw),
        u("label", {
          for: s.value,
          class: Z(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          N(P(eo), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, Ww),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, Kw),
        l.value && !e.disabled ? (m(), k("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: w
        }, [
          N(P(to), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, Yw)) : F("", !0)
      ], 2)),
      e.errorText ? (m(), k("p", {
        key: 3,
        id: i.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, s5)) : F("", !0)
    ]));
  }
}), r5 = ["for"], l5 = { class: "flex w-full min-w-0 items-center gap-3" }, c5 = ["for", "aria-label"], d5 = ["src"], u5 = ["id", "accept", "disabled"], h5 = ["id", "value", "placeholder", "disabled"], f5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = oe(!1), s = oe(null), i = `kiut-image-upload-circle-${ze()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), d = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), h = C(() => !a.disabled && !a.loading);
    Ee(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function f(g) {
      const v = g.target, y = v.files?.[0];
      y && n("select", y), v.value = "";
    }
    function p(g) {
      n("update:modelValue", g.target.value);
    }
    return (g, v) => (m(), k("div", ft({ class: "font-sans flex w-full flex-col gap-2" }, g.$attrs), [
      e.label ? (m(), k("label", {
        key: 0,
        for: r.value,
        class: Z(P(ot))
      }, A(e.label), 11, r5)) : F("", !0),
      u("div", l5, [
        u("label", {
          for: r.value,
          class: Z(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            h.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (m(), k("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: v[0] || (v[0] = (y) => o.value = !0)
          }, null, 40, d5)) : e.loading ? (m(), ee(P(Vm), {
            key: 1,
            class: Z([d.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (m(), ee(P(eo), {
            key: 2,
            class: Z([d.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, c5),
        u("input", {
          id: r.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: f
        }, null, 40, u5),
        e.showUrlInput ? (m(), k("div", {
          key: 0,
          class: Z(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          u("input", {
            id: l.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: Z([P(at), "w-full min-w-0"]),
            onInput: p
          }, null, 42, h5)
        ], 2)) : F("", !0)
      ])
    ], 16));
  }
}), g5 = { class: "font-sans" }, m5 = ["for"], p5 = { class: "relative" }, b5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], v5 = ["id"], y5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-datetime-${ze()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => a.modelValue ?? "");
    function l(c) {
      const d = c.target.value;
      n("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (m(), k("div", g5, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: Z(P(ot))
      }, A(e.label), 11, m5)) : F("", !0),
      u("div", p5, [
        N(P($o), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: Z([
            P(at),
            "pl-10",
            e.invalid ? P(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, b5)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, v5)) : F("", !0)
    ]));
  }
}), x5 = { class: "font-sans" }, k5 = ["for"], _5 = { class: "relative" }, w5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], C5 = ["id"], $5 = /* @__PURE__ */ ce({
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
      const f = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(h.trim());
      if (!f) return null;
      const p = Number(f[1]), g = Number(f[2]);
      return !Number.isInteger(p) || !Number.isInteger(g) || p < 0 || p > 23 || g < 0 || g > 59 ? null : `${String(p).padStart(2, "0")}:${String(g).padStart(2, "0")}`;
    }
    function n(h) {
      return h === "" ? null : a(h);
    }
    const o = e, s = t, i = `kiut-input-time-${ze()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function d(h) {
      const f = h.target.value;
      s("update:modelValue", n(f));
    }
    return (h, f) => (m(), k("div", x5, [
      e.label ? (m(), k("label", {
        key: 0,
        for: r.value,
        class: Z(P(ot))
      }, A(e.label), 11, k5)) : F("", !0),
      u("div", _5, [
        N(P(Nm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: Z([
            P(at),
            "pl-10",
            e.invalid ? P(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: d
        }, null, 42, w5)
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: l.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, C5)) : F("", !0)
    ]));
  }
}), S5 = { class: "font-sans" }, M5 = ["for"], D5 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, A5 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], T5 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, B5 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, L5 = { class: "min-w-0 text-left leading-snug" }, P5 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, I5 = { class: "min-w-0 text-right leading-snug" }, E5 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, R5 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, F5 = ["id"], O5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-range-${ze()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
      const p = [];
      return a.errorText && p.push(i.value), p.length ? p.join(" ") : void 0;
    }), l = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), d = C(() => {
      const { min: p, max: g, modelValue: v } = a;
      if (g === p) return 0;
      const y = (v - p) / (g - p);
      return Math.min(100, Math.max(0, y * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function f(p) {
      const g = Number(p.target.value);
      n("update:modelValue", Number.isNaN(g) ? a.min : g);
    }
    return (p, g) => (m(), k("div", S5, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: Z(P(ot))
      }, A(e.label), 11, M5)) : F("", !0),
      u("div", {
        class: Z(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), k("p", D5, A(e.captionMax), 1)) : F("", !0),
        u("div", {
          class: Z(["flex items-center justify-center", [
            e.orientation === "vertical" ? "order-2 h-[var(--kiut-range-length)] w-11 shrink-0" : "order-none w-full py-1"
          ]]),
          style: Ce(h.value)
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
            class: Z([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: f
          }, null, 42, A5)
        ], 6),
        e.orientation === "horizontal" && l.value ? (m(), k("p", T5, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (m(), k("div", B5, [
          u("span", L5, A(e.captionMin), 1),
          u("span", P5, A(e.caption), 1),
          u("span", I5, A(e.captionMax), 1)
        ])) : F("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), k("p", E5, A(e.captionMin), 1)) : F("", !0),
        e.orientation === "vertical" && e.caption ? (m(), k("p", R5, A(e.caption), 1)) : F("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, F5)) : F("", !0)
    ]));
  }
}), V5 = /* @__PURE__ */ be(O5, [["__scopeId", "data-v-ce7263e4"]]), z5 = { class: "font-sans" }, N5 = ["for"], j5 = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], H5 = ["id"], W5 = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-input-number-${ze()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
      switch (a.align) {
        case "start":
          return "text-start";
        case "end":
          return "text-end";
        default:
          return "text-center";
      }
    }), l = C(
      () => a.modelValue === null || a.modelValue === void 0 ? "" : String(a.modelValue)
    );
    function c(d) {
      const h = d.target.value;
      if (h === "") {
        n("update:modelValue", null);
        return;
      }
      const f = Number(h);
      n("update:modelValue", Number.isNaN(f) ? null : f);
    }
    return (d, h) => (m(), k("div", z5, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: Z(P(ot))
      }, A(e.label), 11, N5)) : F("", !0),
      u("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: Z([
          P(at),
          e.invalid ? P(Dt) : "",
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
      }, null, 42, j5),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, H5)) : F("", !0)
    ]));
  }
}), K5 = { class: "font-sans" }, Y5 = ["for"], U5 = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], q5 = ["disabled"], X5 = ["id"], G5 = "#3b82f6", Z5 = "#aabbcc", Q5 = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", J5 = /* @__PURE__ */ ce({
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
    function a(g) {
      const v = g.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(v);
      if (y) return `#${y[1].toLowerCase()}`;
      const b = /^#?([0-9a-fA-F]{3})$/.exec(v);
      if (b) {
        const [x, _, w] = b[1].split("");
        return `#${x}${x}${_}${_}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function n(g) {
      return a(g) ?? G5;
    }
    const o = e, s = t, i = `kiut-input-color-${ze()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => n(o.modelValue)), d = oe(c.value), h = oe(!1);
    Ee(c, (g) => {
      h.value || (d.value = g);
    });
    function f(g) {
      const v = g.target, y = a(v.value);
      y && s("update:modelValue", y);
    }
    function p() {
      h.value = !1;
      const g = a(d.value);
      g ? (d.value = g, s("update:modelValue", g)) : d.value = c.value;
    }
    return Ee(d, (g) => {
      if (!h.value) return;
      const v = a(g);
      v && s("update:modelValue", v);
    }), (g, v) => (m(), k("div", K5, [
      e.label ? (m(), k("label", {
        key: 0,
        for: r.value,
        class: Z(P(ot))
      }, A(e.label), 11, Y5)) : F("", !0),
      u("div", {
        class: Z([
          Q5,
          e.invalid ? P(Dt) : "",
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
          onInput: f
        }, null, 40, U5),
        e.showHexInput ? Ge((m(), k("input", {
          key: 0,
          "onUpdate:modelValue": v[0] || (v[0] = (y) => d.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: Z5,
          onFocus: v[1] || (v[1] = (y) => h.value = !0),
          onBlur: p
        }, null, 40, q5)), [
          [Wt, d.value]
        ]) : F("", !0)
      ], 2),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: l.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, X5)) : F("", !0)
    ]));
  }
}), Cr = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, $r = [
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
function eC(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function tC(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (r) => s || eC(r, n)
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
function XS(e) {
  const t = {
    ...Cr,
    ...e
  };
  return $r.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function aC(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function nC(e, t) {
  return `${e}${t}`;
}
const oC = ["disabled", "aria-expanded", "aria-label"], sC = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, iC = {
  key: 0,
  class: "truncate text-sm"
}, rC = ["aria-label"], lC = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, cC = ["disabled", "placeholder", "aria-label"], dC = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, uC = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, hC = { class: "grid grid-cols-8 gap-0.5" }, fC = ["disabled", "aria-label", "onClick"], gC = { class: "text-[1.35rem] leading-none" }, mC = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, pC = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, bC = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-emoji-picker-${ze()}`, s = `${o}-btn`, i = `${o}-panel`, r = oe(null), l = oe(null), c = oe(null), d = oe(null), h = oe(!1), f = oe(""), p = oe({}), g = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), v = C(() => ({
      ...Cr,
      ...a.categoryLabels
    })), y = C(() => new Set(aC(a.draft))), b = C(() => {
      if (a.categories?.length) {
        const T = f.value.trim().toLowerCase();
        return T ? a.categories.map((z) => ({
          ...z,
          emojis: z.emojis.filter((H) => H.includes(T) || z.label.toLowerCase().includes(T) ? !0 : z.id.toLowerCase().includes(T))
        })).filter((z) => z.emojis.length > 0) : a.categories;
      }
      return tC(
        $r,
        v.value,
        f.value
      );
    });
    function x() {
      const T = l.value;
      if (!T) return;
      const z = T.getBoundingClientRect(), H = 320, q = 8, ae = 8;
      let ue = z.right - H;
      ue < ae && (ue = z.left), ue + H > window.innerWidth - ae && (ue = Math.max(ae, window.innerWidth - H - ae));
      const me = Math.max(160, z.top - q - ae);
      p.value = {
        bottom: `${window.innerHeight - z.top + q}px`,
        left: `${ue}px`,
        width: `${H}px`,
        maxHeight: `${me}px`
      };
    }
    function _(T) {
      const z = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return y.value.has(T) ? `${z} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : z;
    }
    function w(T) {
      if (a.disabled) return;
      const z = nC(a.draft ?? "", T);
      n("update:draft", z), n("select", T);
    }
    function $() {
      f.value = "", n("open"), je(() => {
        x(), d.value?.focus();
      });
    }
    function D() {
      h.value && (h.value = !1, f.value = "", n("close"), l.value?.focus());
    }
    function S() {
      if (!a.disabled) {
        if (h.value) {
          D();
          return;
        }
        h.value = !0, $();
      }
    }
    function I(T) {
      T.stopPropagation(), S();
    }
    function V(T) {
      if (!h.value) return;
      const z = T.target, H = r.value, q = c.value;
      H && !H.contains(z) && (!q || !q.contains(z)) && D();
    }
    function O(T) {
      a.disabled || ((T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), h.value || (h.value = !0, $())), T.key === "Escape" && h.value && (T.preventDefault(), D()));
    }
    function M(T) {
      T.key === "Escape" && (T.preventDefault(), D());
    }
    function B() {
      h.value && x();
    }
    return Ze(() => {
      document.addEventListener("click", V), window.addEventListener("resize", B), window.addEventListener("scroll", B, !0);
    }), ct(() => {
      document.removeEventListener("click", V), window.removeEventListener("resize", B), window.removeEventListener("scroll", B, !0);
    }), (T, z) => (m(), k("div", {
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
        class: Z([
          P(at),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": g.value,
        onClick: I,
        onKeydown: O
      }, [
        u("span", sC, [
          _e(T.$slots, "icon", {}, () => [
            N(P(Wm), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (m(), k("span", iC, A(e.triggerLabel), 1)) : F("", !0),
        e.triggerLabel ? (m(), ee(P(Gt), {
          key: 1,
          class: Z(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : F("", !0)
      ], 42, oC),
      (m(), ee(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: Ce(p.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: z[2] || (z[2] = Fe(() => {
          }, ["stop"])),
          onKeydown: Fe(M, ["stop"])
        }, [
          u("div", lC, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: d,
              "onUpdate:modelValue": z[0] || (z[0] = (H) => f.value = H),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: z[1] || (z[1] = Fe(() => {
              }, ["stop"]))
            }, null, 8, cC), [
              [Wt, f.value]
            ])
          ]),
          u("div", dC, [
            b.value.length > 0 ? (m(!0), k(re, { key: 0 }, ge(b.value, (H) => (m(), k("section", {
              key: H.id
            }, [
              u("h3", uC, A(H.label), 1),
              u("div", hC, [
                (m(!0), k(re, null, ge(H.emojis, (q) => (m(), k("button", {
                  key: `${H.id}-${q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${q} to input`,
                  class: Z(_(q)),
                  onClick: Fe((ae) => w(q), ["stop"])
                }, [
                  u("span", gC, A(q), 1)
                ], 10, fC))), 128))
              ])
            ]))), 128)) : (m(), k("p", mC, A(e.emptySearchText), 1))
          ]),
          e.hint ? (m(), k("p", pC, A(e.hint), 1)) : F("", !0)
        ], 44, rC), [
          [Ut, h.value]
        ])
      ]))
    ], 512));
  }
}), vC = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], yC = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, xC = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, kC = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, _C = { class: "truncate" }, wC = ["aria-selected", "onClick", "onMouseenter"], CC = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, $C = { class: "min-w-0 flex-1" }, SC = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-multiselect-${ze()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = oe(null), c = oe(null), d = oe(!1), h = oe(0), f = C(() => a.options.filter((O) => !O.disabled)), p = C(() => new Set(a.modelValue ?? [])), g = C(
      () => a.options.filter((O) => p.value.has(O.value))
    ), v = C(() => {
      const O = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", M = g.value.length;
      return M === 0 ? O : `${O}, ${M} seleccionada${M === 1 ? "" : "s"}`;
    });
    function y(O) {
      return `${String(O.value)}-${O.label}`;
    }
    function b(O) {
      return p.value.has(O.value);
    }
    function x(O, M) {
      const B = b(O), T = h.value === M;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        B ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !B && T ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function _(O) {
      const M = [...a.modelValue ?? []], B = M.indexOf(O.value);
      B >= 0 ? M.splice(B, 1) : M.push(O.value), n("update:modelValue", M);
    }
    function w() {
      const O = f.value;
      if (O.length === 0) {
        h.value = 0;
        return;
      }
      const M = p.value, B = O.findIndex((T) => M.has(T.value));
      h.value = B >= 0 ? B : 0;
    }
    function $() {
      a.disabled || (d.value = !d.value);
    }
    function D(O) {
      O.stopPropagation(), !a.disabled && ($(), d.value && (w(), je(() => c.value?.focus())));
    }
    function S(O) {
      if (!d.value) return;
      const M = l.value;
      M && !M.contains(O.target) && (d.value = !1);
    }
    function I(O) {
      a.disabled || (O.key === "ArrowDown" || O.key === "Enter" || O.key === " ") && (O.preventDefault(), d.value || (d.value = !0, w(), je(() => c.value?.focus())));
    }
    function V(O) {
      const M = f.value;
      if (M.length !== 0) {
        if (O.key === "Escape") {
          O.preventDefault(), d.value = !1;
          return;
        }
        if (O.key === "ArrowDown") {
          O.preventDefault(), h.value = Math.min(h.value + 1, M.length - 1);
          return;
        }
        if (O.key === "ArrowUp") {
          O.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (O.key === "Enter" || O.key === " ") {
          O.preventDefault();
          const B = M[h.value];
          B && _(B);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", S);
    }), ct(() => {
      document.removeEventListener("click", S);
    }), (O, M) => (m(), k("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: Z(P(ot))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: Z([
          P(at),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : v.value,
        onClick: D,
        onKeydown: I
      }, [
        u("div", yC, [
          g.value.length === 0 ? (m(), k("span", xC, A(e.placeholder), 1)) : (m(), k("div", kC, [
            (m(!0), k(re, null, ge(g.value, (B) => (m(), k("span", {
              key: y(B),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", _C, A(B.label), 1)
            ]))), 128))
          ]))
        ]),
        N(P(Gt), {
          class: Z(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, vC),
      Ge(u("ul", {
        id: r,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Fe(V, ["stop"])
      }, [
        (m(!0), k(re, null, ge(f.value, (B, T) => (m(), k("li", {
          key: y(B),
          role: "option",
          "aria-selected": b(B),
          class: Z(x(B, T)),
          onClick: Fe((z) => _(B), ["stop"]),
          onMouseenter: (z) => h.value = T
        }, [
          u("span", CC, [
            b(B) ? (m(), ee(P(So), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : F("", !0)
          ]),
          u("span", $C, A(B.label), 1)
        ], 42, wC))), 128))
      ], 544), [
        [Ut, d.value]
      ])
    ], 512));
  }
}), MC = { class: "font-sans" }, DC = ["for"], AC = { class: "flex gap-2" }, TC = { class: "w-[7.5rem] shrink-0" }, BC = { class: "min-w-0 flex-1" }, LC = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], PC = ["id"], IC = /* @__PURE__ */ ce({
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
    const a = e, n = t, o = `kiut-phone-${ze()}`, s = C(() => a.id ?? `${o}-num`), i = C(() => `${s.value}-err`), r = C({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), l = C({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, d) => (m(), k("div", MC, [
      e.label ? (m(), k("label", {
        key: 0,
        for: s.value,
        class: Z(P(ot))
      }, A(e.label), 11, DC)) : F("", !0),
      u("div", AC, [
        u("div", TC, [
          N(Mo, {
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", BC, [
          Ge(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: Z([P(at), e.invalid ? P(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, LC), [
            [Wt, l.value]
          ])
        ])
      ]),
      e.errorText ? (m(), k("p", {
        key: 1,
        id: i.value,
        class: Z(P(At)),
        role: "alert"
      }, A(e.errorText), 11, PC)) : F("", !0)
    ]));
  }
}), EC = ["role", "aria-label"], RC = { class: "flex flex-wrap gap-2" }, FC = ["aria-checked", "role", "onClick"], OC = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, VC = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, zC = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, NC = /* @__PURE__ */ ce({
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
    return (l, c) => (m(), k("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", RC, [
        (m(!0), k(re, null, ge(e.items, (d) => (m(), k("button", {
          key: d.value,
          type: "button",
          class: Z(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(d)
        }, [
          u("span", OC, [
            s(d) ? (m(), k("span", VC)) : F("", !0)
          ]),
          d.dotColor ? (m(), k("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Ce({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : F("", !0),
          u("span", zC, A(d.label), 1)
        ], 10, FC))), 128))
      ])
    ], 8, EC));
  }
}), jC = ["aria-label"], HC = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], WC = { class: "truncate px-3 py-2 text-sm font-medium" }, KC = /* @__PURE__ */ ce({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${ze()}`, s = (v) => `${o}-seg-${v}`, i = oe([]);
    function r(v, y) {
      v instanceof HTMLButtonElement ? i.value[y] = v : i.value[y] = null;
    }
    function l(v) {
      return v.value === a.modelValue;
    }
    function c(v) {
      const y = l(v), b = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return v.disabled ? `${b} cursor-not-allowed opacity-40` : y ? `${b} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${b} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(v) {
      v.disabled || v.value !== a.modelValue && n("update:modelValue", v.value);
    }
    function h(v, y, b) {
      d(v), je(() => i.value[y]?.focus());
    }
    const f = C(
      () => a.items.map((v, y) => v.disabled ? -1 : y).filter((v) => v >= 0)
    );
    function p(v, y) {
      const b = a.items.length;
      if (b === 0) return 0;
      let x = v;
      for (let _ = 0; _ < b; _++)
        if (x = (x + y + b) % b, !a.items[x]?.disabled) return x;
      return v;
    }
    function g(v, y) {
      if (v.key === "ArrowRight" || v.key === "ArrowDown") {
        v.preventDefault();
        const b = p(y, 1), x = a.items[b];
        x && d(x), je(() => i.value[b]?.focus());
      } else if (v.key === "ArrowLeft" || v.key === "ArrowUp") {
        v.preventDefault();
        const b = p(y, -1), x = a.items[b];
        x && d(x), je(() => i.value[b]?.focus());
      } else if (v.key === "Home") {
        v.preventDefault();
        const b = f.value[0];
        if (b !== void 0) {
          const x = a.items[b];
          x && d(x), je(() => i.value[b]?.focus());
        }
      } else if (v.key === "End") {
        v.preventDefault();
        const b = f.value[f.value.length - 1];
        if (b !== void 0) {
          const x = a.items[b];
          x && d(x), je(() => i.value[b]?.focus());
        }
      }
    }
    return (v, y) => (m(), k("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), k(re, null, ge(e.items, (b, x) => (m(), k("button", {
        id: s(b.value),
        key: b.value,
        ref_for: !0,
        ref: (_) => r(_, x),
        type: "button",
        role: "tab",
        "aria-selected": l(b),
        "aria-disabled": b.disabled === !0,
        tabindex: l(b) ? 0 : -1,
        class: Z(c(b)),
        onClick: (_) => h(b, x),
        onKeydown: (_) => g(_, x)
      }, [
        u("span", WC, A(b.label), 1)
      ], 42, HC))), 128))
    ], 8, jC));
  }
}), YC = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, UC = {
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
  return YC[e];
}
function Sr(e = "en") {
  return GC.map((t) => ({ id: t, label: XC[e][t] }));
}
function QC(e = "en") {
  return "Presets";
}
Sr("es");
function Je(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function rt(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function Ne(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Et(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function qa(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function JC(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return Ne(a);
}
function Ta(e, t) {
  return JC(e, -t);
}
function e$(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Mr(e, t = /* @__PURE__ */ new Date()) {
  const a = Ne(t);
  switch (e) {
    case "today":
      return { start: a, end: a };
    case "yesterday": {
      const n = Ta(a, 1);
      return { start: n, end: n };
    }
    case "last7":
      return { start: Ta(a, 6), end: a };
    case "last14":
      return { start: Ta(a, 13), end: a };
    case "last30":
      return { start: Ta(a, 29), end: a };
    case "last90":
      return { start: Ta(a, 89), end: a };
    case "thisMonth":
      return { start: Et(a), end: a };
    case "lastMonth": {
      const n = Et(qa(a, -1));
      return { start: n, end: e$(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Dr(e, t, a) {
  let n = Ne(e.start), o = Ne(e.end);
  if (t) {
    const s = Ne(Je(t));
    Yt(n, s) && (n = s), Yt(o, s) && (o = s);
  }
  if (a) {
    const s = Ne(Je(a));
    Wn(n, s) && (n = s), Wn(o, s) && (o = s);
  }
  return Wn(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function t$(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Dr(Mr(t, a), n, o);
  return rt(s.start) === e.start && rt(s.end) === e.end;
}
function Za(e, t) {
  const a = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), n = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
  return a < n ? -1 : a > n ? 1 : 0;
}
function jt(e, t) {
  return Za(e, t) === 0;
}
function Yt(e, t) {
  return Za(e, t) < 0;
}
function Wn(e, t) {
  return Za(e, t) > 0;
}
function Ar(e, t) {
  return Za(e, t) >= 0;
}
function Tr(e, t) {
  return Za(e, t) <= 0;
}
function Br(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function wn(e, t = "en") {
  return `${UC[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Ht(e, t = "en") {
  return `${qC[t][e.getMonth()]} ${e.getFullYear()}`;
}
const a$ = ["aria-expanded", "aria-labelledby", "aria-label"], n$ = ["onKeydown"], o$ = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, s$ = { class: "mb-4 flex items-center justify-between gap-2" }, i$ = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, r$ = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, l$ = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, c$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, d$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, u$ = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, h$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, f$ = { class: "grid grid-cols-7 gap-y-2 mt-2" }, g$ = ["disabled", "onClick"], m$ = "rounded-lg text-[#61616b]", p$ = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", b$ = "opacity-30", v$ = "bg-[#6b35e9] font-medium text-white", y$ = "bg-[#895af6] font-semibold text-white", x$ = /* @__PURE__ */ ce({
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
    const a = e, n = t, s = `${`kiut-drp-${ze()}`}-lbl`, i = oe(null), r = oe(null), l = oe(!1), c = oe(null), d = oe(Et(/* @__PURE__ */ new Date())), h = C(() => !!(a.modelValue.start && a.modelValue.end)), f = C(() => {
      const M = Et(d.value);
      return [M, qa(M, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), g = C(() => {
      const M = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${M}` : `left-0 right-auto ${M}`;
    }), v = C(
      () => `${Ht(f.value[0])} – ${Ht(f.value[1])}`
    ), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], b = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const M = Je(a.modelValue.start), B = Je(a.modelValue.end);
      return `${wn(M)} – ${wn(B)}`;
    });
    function x(M, B) {
      return M.getMonth() === B.getMonth() && M.getFullYear() === B.getFullYear();
    }
    function _(M) {
      const B = Ne(M);
      if (a.minDate) {
        const T = Ne(Je(a.minDate));
        if (Yt(B, T)) return !0;
      }
      if (a.maxDate) {
        const T = Ne(Je(a.maxDate));
        if (Yt(T, B)) return !0;
      }
      return !1;
    }
    function w(M, B, T) {
      const z = jt(M, B), H = jt(M, T);
      if (z && H) return "rounded-lg";
      const q = z || M.getDay() === 0, ae = H || M.getDay() === 6;
      return q && ae ? "rounded-lg" : q ? "rounded-l-lg" : ae ? "rounded-r-lg" : "rounded-none";
    }
    function $(M, B) {
      const T = x(B, M), z = _(B), H = a.modelValue.start ? Ne(Je(a.modelValue.start)) : null, q = a.modelValue.end ? Ne(Je(a.modelValue.end)) : null, ae = Ne(B);
      if (z)
        return m$;
      let ue = p$;
      if (H && q && Ar(ae, H) && Tr(ae, q)) {
        const U = jt(ae, H), L = jt(ae, q);
        ue = `${w(ae, H, q)} ${U || L ? y$ : v$}`;
      }
      return T || (ue = `${ue} ${b$}`), ue;
    }
    function D(M) {
      if (_(M)) return;
      const B = Ne(M);
      if (!c.value) {
        c.value = new Date(B), n("update:modelValue", { start: rt(B), end: rt(B) });
        return;
      }
      let z = Ne(c.value), H = new Date(B);
      Yt(H, z) && ([z, H] = [H, z]), n("update:modelValue", { start: rt(z), end: rt(H) }), c.value = null, l.value = !1;
    }
    function S(M) {
      d.value = qa(d.value, M);
    }
    function I() {
      l.value = !1;
    }
    function V(M) {
      if (M?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, a.modelValue.start)
          try {
            d.value = Et(Je(a.modelValue.start));
          } catch {
          }
        je(() => r.value?.focus());
      }
    }
    function O(M) {
      if (!l.value) return;
      const B = i.value;
      B && !B.contains(M.target) && (l.value = !1);
    }
    return Ee(l, (M) => {
      M && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", O);
    }), ct(() => {
      document.removeEventListener("click", O);
    }), (M, B) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: Z(P(ot))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        type: "button",
        class: Z([
          P(at),
          "flex w-full items-center gap-2 text-left",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onFocus: V,
        onClick: V
      }, [
        N(P($o), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(b.value), 3)
      ], 42, a$),
      Ge(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: Z([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Oa(Fe(I, ["stop"]), ["escape"])
      }, [
        u("div", o$, [
          u("div", s$, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: B[0] || (B[0] = (T) => S(-1))
            }, [
              N(P(rr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", i$, [
              u("span", r$, A(v.value), 1),
              u("div", l$, [
                u("span", c$, A(P(Ht)(f.value[0])), 1),
                u("span", d$, A(P(Ht)(f.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: B[1] || (B[1] = (T) => S(1))
            }, [
              N(P(lr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", u$, [
            (m(!0), k(re, null, ge(f.value, (T) => (m(), k("div", {
              key: `${T.getFullYear()}-${T.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", h$, [
                (m(), k(re, null, ge(y, (z) => u("span", { key: z }, A(z), 1)), 64))
              ]),
              u("div", f$, [
                (m(!0), k(re, null, ge(P(Br)(T), (z) => (m(), k("button", {
                  key: P(rt)(z),
                  type: "button",
                  disabled: _(z),
                  class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(T, z)]),
                  onClick: (H) => D(z)
                }, A(z.getDate()), 11, g$))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, n$), [
        [Ut, l.value]
      ])
    ], 512));
  }
}), k$ = ["aria-expanded", "aria-labelledby", "aria-label"], _$ = ["aria-label", "onKeydown"], w$ = { class: "flex flex-col sm:flex-row" }, C$ = ["aria-label"], $$ = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, S$ = { class: "flex flex-col gap-0.5" }, M$ = ["onClick"], D$ = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, A$ = { class: "mb-4 flex items-center justify-between gap-2" }, T$ = ["aria-label"], B$ = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, L$ = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, P$ = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, I$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, E$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, R$ = ["aria-label"], F$ = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, O$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, V$ = { class: "grid grid-cols-7 gap-y-2 mt-2" }, z$ = ["disabled", "onClick"], N$ = "rounded-lg text-[#61616b]", j$ = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", H$ = "opacity-30", W$ = "bg-[#6b35e9] font-medium text-white", K$ = "bg-[#895af6] font-semibold text-white", Y$ = /* @__PURE__ */ ce({
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
    const a = e, n = t, s = `${`kiut-dpp-${ze()}`}-lbl`, i = oe(null), r = oe(null), l = oe(!1), c = oe(null), d = oe(Et(/* @__PURE__ */ new Date())), h = C(() => !!(a.modelValue.start && a.modelValue.end)), f = C(() => {
      const U = Et(d.value);
      return [U, qa(U, 1)];
    }), p = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => a.ariaLabel ?? p.value), v = C(() => Sr(a.locale)), y = C(() => QC(a.locale)), b = C(() => ZC(a.locale)), x = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), _ = C(
      () => a.locale === "es" ? "Mes anterior" : "Previous month"
    ), w = C(
      () => a.locale === "es" ? "Mes siguiente" : "Next month"
    ), $ = C(
      () => a.locale === "es" ? "Calendario de rango con preajustes" : "Date range calendar with presets"
    ), D = C(() => {
      const U = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${U}` : `left-0 right-auto ${U}`;
    }), S = C(
      () => `${Ht(f.value[0], a.locale)} – ${Ht(f.value[1], a.locale)}`
    ), I = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return p.value;
      const U = Je(a.modelValue.start), L = Je(a.modelValue.end);
      return `${wn(U, a.locale)} – ${wn(L, a.locale)}`;
    });
    function V(U, L) {
      return U.getMonth() === L.getMonth() && U.getFullYear() === L.getFullYear();
    }
    function O(U) {
      const L = Ne(U);
      if (a.minDate) {
        const K = Ne(Je(a.minDate));
        if (Yt(L, K)) return !0;
      }
      if (a.maxDate) {
        const K = Ne(Je(a.maxDate));
        if (Yt(K, L)) return !0;
      }
      return !1;
    }
    function M(U, L, K) {
      const Y = jt(U, L), le = jt(U, K);
      if (Y && le) return "rounded-lg";
      const ve = Y || U.getDay() === 0, Q = le || U.getDay() === 6;
      return ve && Q ? "rounded-lg" : ve ? "rounded-l-lg" : Q ? "rounded-r-lg" : "rounded-none";
    }
    function B(U) {
      const L = t$(
        a.modelValue,
        U,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), K = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return L ? `${K} font-medium` : K;
    }
    function T(U, L) {
      const K = V(L, U), Y = O(L), le = a.modelValue.start ? Ne(Je(a.modelValue.start)) : null, ve = a.modelValue.end ? Ne(Je(a.modelValue.end)) : null, Q = Ne(L);
      if (Y)
        return N$;
      let W = j$;
      if (le && ve && Ar(Q, le) && Tr(Q, ve)) {
        const te = jt(Q, le), se = jt(Q, ve);
        W = `${M(Q, le, ve)} ${te || se ? K$ : W$}`;
      }
      return K || (W = `${W} ${H$}`), W;
    }
    function z(U) {
      const L = Dr(Mr(U), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: rt(L.start),
        end: rt(L.end)
      }), d.value = Et(L.start), c.value = null, l.value = !1;
    }
    function H(U) {
      if (O(U)) return;
      const L = Ne(U);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: rt(L), end: rt(L) });
        return;
      }
      let Y = Ne(c.value), le = new Date(L);
      Yt(le, Y) && ([Y, le] = [le, Y]), n("update:modelValue", { start: rt(Y), end: rt(le) }), c.value = null, l.value = !1;
    }
    function q(U) {
      d.value = qa(d.value, U);
    }
    function ae() {
      l.value = !1;
    }
    function ue(U) {
      if (U.stopPropagation(), l.value) {
        l.value = !1;
        return;
      }
      if (l.value = !0, c.value = null, a.modelValue.start)
        try {
          d.value = Et(Je(a.modelValue.start));
        } catch {
        }
      je(() => r.value?.focus());
    }
    function me(U) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(U.target) && (l.value = !1);
    }
    return Ee(l, (U) => {
      U && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", me);
    }), ct(() => {
      document.removeEventListener("click", me);
    }), (U, L) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), k("label", {
        key: 0,
        id: s,
        class: Z(P(ot))
      }, A(e.label), 3)) : F("", !0),
      u("button", {
        type: "button",
        class: Z([
          P(at),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: ue
      }, [
        N(P($o), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: Z([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(I.value), 3)
      ], 10, k$),
      Ge(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: Z([
          D.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Oa(Fe(ae, ["stop"]), ["escape"])
      }, [
        u("div", w$, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", $$, A(y.value), 1),
            u("ul", S$, [
              (m(!0), k(re, null, ge(v.value, (K) => (m(), k("li", {
                key: K.id
              }, [
                u("button", {
                  type: "button",
                  class: Z(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", B(K.id)]),
                  onClick: (Y) => z(K.id)
                }, A(K.label), 11, M$)
              ]))), 128))
            ])
          ], 8, C$),
          u("div", D$, [
            u("div", A$, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": _.value,
                onClick: L[0] || (L[0] = (K) => q(-1))
              }, [
                N(P(rr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, T$),
              u("div", B$, [
                u("span", L$, A(S.value), 1),
                u("div", P$, [
                  u("span", I$, A(P(Ht)(f.value[0], e.locale)), 1),
                  u("span", E$, A(P(Ht)(f.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: L[1] || (L[1] = (K) => q(1))
              }, [
                N(P(lr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, R$)
            ]),
            u("div", F$, [
              (m(!0), k(re, null, ge(f.value, (K) => (m(), k("div", {
                key: `${K.getFullYear()}-${K.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", O$, [
                  (m(!0), k(re, null, ge(b.value, (Y) => (m(), k("span", { key: Y }, A(Y), 1))), 128))
                ]),
                u("div", V$, [
                  (m(!0), k(re, null, ge(P(Br)(K), (Y) => (m(), k("button", {
                    key: P(rt)(Y),
                    type: "button",
                    disabled: O(Y),
                    class: Z(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", T(K, Y)]),
                    onClick: (le) => H(Y)
                  }, A(Y.getDate()), 11, z$))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, _$), [
        [Ut, l.value]
      ])
    ], 512));
  }
}), U$ = ["disabled", "aria-expanded", "aria-label"], q$ = { class: "min-w-0 flex-1 truncate" }, X$ = ["aria-selected", "onClick", "onMouseenter"], G$ = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, Z$ = { class: "min-w-0 flex-1" }, Q$ = /* @__PURE__ */ ce({
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
    const a = e, n = t, s = `${`kiut-tag-select-${ze()}`}-listbox`, i = oe(null), r = oe(null), l = oe(null), c = oe(null), d = oe(!1), h = oe(0), f = oe({}), p = C(() => a.options.filter((q) => !q.disabled)), g = C(
      () => a.options.find((q) => q.value === a.modelValue) ?? null
    ), v = C(() => g.value?.color ?? "neutral"), y = C(
      () => dr(v.value, a.outlined)
    ), b = C(() => g.value ? g.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : p.value[0]?.label ?? "Seleccionar…"), x = C(
      () => a.ariaLabel ?? `Estado: ${b.value}`
    );
    function _() {
      const q = r.value;
      if (!q) return;
      const ae = q.getBoundingClientRect();
      f.value = {
        top: `${ae.bottom + 4}px`,
        left: `${ae.left}px`,
        minWidth: `${ae.width}px`
      };
    }
    function w(q) {
      return `${String(q.value)}-${q.label}`;
    }
    function $(q) {
      return a.modelValue === q.value;
    }
    function D(q, ae) {
      const ue = $(q), me = h.value === ae;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        ue ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !ue && me ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S() {
      h.value = Math.max(
        0,
        p.value.findIndex((q) => q.value === a.modelValue)
      );
    }
    function I() {
      _(), S(), je(() => c.value?.focus());
    }
    function V() {
      d.value = !1;
    }
    function O(q) {
      n("update:modelValue", q.value), V();
    }
    function M() {
      if (!a.disabled) {
        if (d.value) {
          V();
          return;
        }
        d.value = !0, I();
      }
    }
    function B(q) {
      q.stopPropagation(), !a.disabled && M();
    }
    function T(q) {
      if (!d.value) return;
      const ae = q.target, ue = i.value, me = l.value;
      ue && !ue.contains(ae) && (!me || !me.contains(ae)) && V();
    }
    function z(q) {
      a.disabled || (q.key === "ArrowDown" || q.key === "Enter" || q.key === " ") && (q.preventDefault(), d.value || (d.value = !0, I()));
    }
    function H(q) {
      const ae = p.value;
      if (q.key === "Escape") {
        q.preventDefault(), V(), r.value?.focus();
        return;
      }
      if (ae.length !== 0) {
        if (q.key === "ArrowDown") {
          q.preventDefault(), h.value = Math.min(h.value + 1, ae.length - 1);
          return;
        }
        if (q.key === "ArrowUp") {
          q.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (q.key === "Enter") {
          q.preventDefault();
          const ue = ae[h.value];
          ue && O(ue);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", T);
    }), ct(() => {
      document.removeEventListener("click", T);
    }), (q, ae) => (m(), k("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: r,
        type: "button",
        disabled: e.disabled,
        class: Z([
          P(cr),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          y.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": x.value,
        onClick: B,
        onKeydown: z
      }, [
        u("span", q$, A(b.value), 1),
        N(P(Gt), {
          class: Z(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, U$),
      (m(), ee(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: l,
          style: Ce(f.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          u("ul", {
            id: s,
            ref_key: "listRef",
            ref: c,
            role: "listbox",
            tabindex: "-1",
            onKeydown: Fe(H, ["stop"])
          }, [
            (m(!0), k(re, null, ge(p.value, (ue, me) => (m(), k("li", {
              key: w(ue),
              role: "option",
              "aria-selected": $(ue),
              class: Z(D(ue, me)),
              onClick: Fe((U) => O(ue), ["stop"]),
              onMouseenter: (U) => h.value = me
            }, [
              u("span", G$, [
                $(ue) ? (m(), ee(P(So), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : F("", !0)
              ]),
              u("span", Z$, A(ue.label), 1)
            ], 42, X$))), 128))
          ], 544)
        ], 4), [
          [Ut, d.value]
        ])
      ]))
    ], 512));
  }
}), J$ = ["aria-label"], eS = { class: "flex flex-col gap-1" }, tS = { class: "flex flex-row gap-3 items-center" }, aS = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, nS = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, oS = /* @__PURE__ */ ce({
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
    const t = Xa(), a = e, n = {
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
    }, o = C(() => n[a.variant]);
    return (s, i) => (m(), k("div", {
      role: "region",
      "aria-label": e.title,
      class: Z([
        o.value.container,
        P(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      s.$slots.icon ? (m(), k("div", {
        key: 0,
        class: Z([
          o.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        u("span", {
          class: Z([
            o.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          _e(s.$slots, "icon")
        ], 2)
      ], 2)) : F("", !0),
      u("div", eS, [
        u("h1", {
          class: Z([o.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        u("span", {
          class: Z([o.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        u("div", tS, [
          a.date_start ? (m(), k("div", aS, [
            s.$slots.icon_date ? (m(), k("span", {
              key: 0,
              class: Z([
                o.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              _e(s.$slots, "icon_date")
            ], 2)) : F("", !0),
            a.subtitle_date_start ? (m(), k("span", {
              key: 1,
              class: Z([o.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : F("", !0),
            u("span", {
              class: Z([o.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : F("", !0),
          a.date_final ? (m(), k("div", nS, [
            s.$slots.icon_date ? (m(), k("span", {
              key: 0,
              class: Z([
                o.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              _e(s.$slots, "icon_date")
            ], 2)) : F("", !0),
            a.subtitle_date_final ? (m(), k("span", {
              key: 1,
              class: Z([o.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : F("", !0),
            u("span", {
              class: Z([o.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : F("", !0)
        ])
      ])
    ], 10, J$));
  }
}), sS = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, iS = ["id"], rS = { class: "min-w-0 flex-1 space-y-1" }, lS = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, cS = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, dS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, uS = /* @__PURE__ */ ce({
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
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${ze()}`}-title`, r = oe(null);
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
    return Ee(
      () => a.modelValue,
      (h) => {
        h && requestAnimationFrame(() => {
          r.value?.focus({ preventScroll: !0 });
        });
      }
    ), Ze(() => {
      document.addEventListener("keydown", d);
    }), ct(() => {
      document.removeEventListener("keydown", d);
    }), (h, f) => (m(), ee(la, { to: "body" }, [
      N(ut, { name: "kiut-modal" }, {
        default: R(() => [
          e.modelValue ? (m(), k("div", sS, [
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
              style: Ce(n.value),
              onClick: f[0] || (f[0] = Fe(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: Z(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", rS, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (m(), k("p", lS, A(e.subtitle), 1)) : F("", !0)
                ]),
                N(xt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: R(() => [
                    N(P(to), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", cS, [
                _e(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", dS, [
                N(xt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: R(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                N(xt, {
                  variant: "primary",
                  type: "button",
                  loading: e.loading,
                  onClick: c
                }, {
                  default: R(() => [
                    Ae(A(e.confirmLabel), 1)
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ], 12, iS)
          ])) : F("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), hS = /* @__PURE__ */ be(uS, [["__scopeId", "data-v-9134bb89"]]), fS = { class: "text-left font-['Inter',system-ui,sans-serif]" }, gS = {
  key: 0,
  class: ""
}, mS = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, pS = { class: "flex min-w-0 flex-1 items-center" }, bS = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, vS = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, yS = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, xS = /* @__PURE__ */ ce({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = ao(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (m(), k("section", fS, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (m(), k("header", gS, [
        n.$slots.description ? (m(), k("div", mS, [
          _e(n.$slots, "description")
        ])) : F("", !0),
        n.$slots.tabs ? (m(), k("div", {
          key: 1,
          class: Z(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", pS, [
            _e(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (m(), k("div", bS, [
            _e(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (m(), k("div", {
          key: 2,
          class: Z([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (m(), k("div", vS, [
            _e(n.$slots, "filters")
          ])) : F("", !0),
          n.$slots.actions ? (m(), k("div", yS, [
            _e(n.$slots, "actions")
          ])) : F("", !0)
        ], 2)) : F("", !0)
      ])) : F("", !0),
      n.$slots.content || n.$slots.default ? (m(), k("div", {
        key: 1,
        class: Z({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        _e(n.$slots, "content", {}, () => [
          _e(n.$slots, "default")
        ])
      ], 2)) : F("", !0)
    ]));
  }
}), kS = { class: "flex flex-1 min-h-0" }, _S = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, wS = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, CS = ["aria-current", "data-has-active", "title", "onClick"], $S = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, SS = { class: "px-4 py-4 shrink-0" }, MS = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, DS = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, AS = ["data-nav-id", "aria-current", "onClick"], TS = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, BS = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, LS = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, PS = ["data-nav-id", "aria-current", "onClick"], IS = { class: "truncate text-[15px]" }, ES = ["aria-current", "data-has-active", "onClick"], RS = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, FS = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, OS = /* @__PURE__ */ ce({
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
    const a = oe(!1), n = e, o = t, s = Xa(), { class: i, ...r } = s, l = oe(!1);
    function c() {
      typeof window > "u" || (l.value = window.innerWidth < n.mobileBreakpoint);
    }
    Ze(() => {
      c(), window.addEventListener("resize", c);
    }), ct(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const b = n.sections.find((x) => x.id === n.selectedSectionId);
      return b?.items?.length ? b : null;
    });
    function h(b) {
      return n.activePath ? n.activePath === b.path || n.activePath.startsWith(b.path + "/") : !1;
    }
    function f(b) {
      return b.items?.length ? b.items.some(h) : !n.activePath || !b.path ? !1 : n.activePath === b.path || n.activePath.startsWith(b.path + "/");
    }
    function p(b) {
      if (!b.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: b,
          item: { id: b.id, label: b.label, path: b.path }
        });
        return;
      }
      const x = n.selectedSectionId === b.id ? null : b.id;
      o("update:selectedSectionId", x);
    }
    function g(b, x) {
      o("navigate", { section: b, item: x });
    }
    function v() {
      o("update:selectedSectionId", null);
    }
    function y(b, x) {
      g(b, x), v();
    }
    return (b, x) => l.value ? (m(), k("div", ft({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      N(ut, { name: "ksn-overlay" }, {
        default: R(() => [
          d.value ? (m(), k("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: v
          })) : F("", !0)
        ]),
        _: 1
      }),
      N(ut, { name: "ksn-sheet" }, {
        default: R(() => [
          d.value ? (m(), k("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Ce({ paddingBottom: n.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", TS, [
              u("p", BS, A(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: v
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
            u("nav", LS, [
              (m(!0), k(re, null, ge(d.value.items, (_) => (m(), k("button", {
                key: _.id,
                type: "button",
                "data-nav-id": _.id,
                "aria-current": h(_) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => y(d.value, _)
              }, [
                _.icon ? (m(), ee($t(_.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : F("", !0),
                u("span", IS, A(_.label), 1)
              ], 8, PS))), 128))
            ])
          ], 4)) : F("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Ce({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (m(!0), k(re, null, ge(e.sections, (_) => (m(), k("button", {
          key: _.id,
          type: "button",
          "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
          "data-has-active": f(_) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => p(_)
        }, [
          e.selectedSectionId === _.id || f(_) ? (m(), k("span", RS)) : F("", !0),
          _.icon ? (m(), ee($t(_.icon), {
            key: 1,
            class: "shrink-0",
            style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : F("", !0),
          u("span", FS, A(_.label), 1)
        ], 8, ES))), 128))
      ], 4)
    ], 16)) : (m(), k("aside", ft({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      u("div", kS, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Ce({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (_) => a.value = !0),
          onMouseleave: x[1] || (x[1] = (_) => a.value = !1)
        }, [
          b.$slots.logo ? (m(), k("div", _S, [
            _e(b.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : F("", !0),
          u("nav", wS, [
            (m(!0), k(re, null, ge(e.sections, (_) => (m(), k("button", {
              key: _.id,
              type: "button",
              "aria-current": e.selectedSectionId === _.id ? "true" : void 0,
              "data-has-active": f(_) ? "true" : void 0,
              title: _.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => p(_)
            }, [
              _.icon ? (m(), ee($t(_.icon), {
                key: 0,
                class: "shrink-0",
                style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : F("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Ce({ fontSize: e.primaryFontSize })
              }, A(_.label), 5)
            ], 8, CS))), 128))
          ]),
          b.$slots.footer ? (m(), k("div", $S, [
            _e(b.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : F("", !0)
        ], 36),
        N(ut, { name: "ksn-sub" }, {
          default: R(() => [
            d.value ? (m(), k("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Ce({ width: e.secondaryWidth })
            }, [
              u("div", SS, [
                u("p", MS, A(d.value.label), 1)
              ]),
              u("nav", DS, [
                (m(!0), k(re, null, ge(d.value.items, (_) => (m(), k("button", {
                  key: _.id,
                  type: "button",
                  "data-nav-id": _.id,
                  "aria-current": h(_) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, _)
                }, [
                  _.icon ? (m(), ee($t(_.icon), {
                    key: 0,
                    style: Ce({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : F("", !0),
                  u("span", {
                    class: "truncate",
                    style: Ce({ fontSize: e.secondaryFontSize })
                  }, A(_.label), 5)
                ], 8, AS))), 128))
              ])
            ], 4)) : F("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), VS = /* @__PURE__ */ be(OS, [["__scopeId", "data-v-e0ccb96c"]]), GS = {
  install(e) {
    e.component("KiutChartBar", kt), e.component("KiutChartLine", bt), e.component("KiutPieChart", Dn), e.component("KiutBoxplotChart", Sf), e.component("KiutCandlestickChart", fg), e.component("KiutHistogramChart", sr), e.component("KiutSankeyChart", Zt), e.component("KiutAgentsPerDay", up), e.component("KiutBookingManager", Wp), e.component("KiutCheckin", ur), e.component("KiutCheckinContainer", I0), e.component("KiutCheckinMetrics", x0), e.component("KiutCheckinSegments", hr), e.component("KiutDisruption", Q0), e.component("KiutFAQ", ib), e.component("KiutMessagesPerAgent", pb), e.component("KiutRecordLocator", Ib), e.component("KiutSalesByChannel", fr), e.component("KiutSeller", gr), e.component("KiutSellerContainer", xv), e.component("KiutTopAgents", Mv), e.component("KiutPaymentMethod", qv), e.component("KiutAgentHumanConversations", Py), e.component("KiutChannelMetrics", Hy), e.component("KiutTriageCombinations", n1), e.component("KiutSelectLanguage", c1), e.component("KiutGuardrails", y1), e.component("KiutDisruptionNotifier", V1), e.component("KiutTotalConversationsCard", z1), e.component("KiutCsatP95Card", N1), e.component("KiutCsatPulseCard", j1), e.component("KiutCSATContainer", px), e.component("KiutAiGeneratedRevenueCard", bx), e.component("KiutAiGeneratedChart", Mx), e.component("KiutCostCard", Ax), e.component("KiutHumanEscalations", Fx), e.component("KiutHumanEscalationsCard", Ox), e.component("KiutNpsDailyMetrics", pr), e.component("KiutNpsMetrics", br), e.component("KiutNpsOverviewMetrics", mr), e.component("KiutAWSCost", Yx), e.component("KiutCostUsage", ak), e.component("KiutTokenUsage", hk), e.component("KiutConversationCount", _k), e.component("KiutTopAgentsAnalysis", Ik), e.component("KiutTopAgentsPie", Hk), e.component("KiutDailyCostTrends", Qk), e.component("KiutModelUsage", h_), e.component("KiutMessageRoles", k_), e.component("KiutCostPerConversations", P_), e.component("Tabs", vr), e.component("Table", G_), e.component("TableVersions", H2), e.component("Filters", _w), e.component("InputText", wr), e.component("InputPassword", Ew), e.component("InputTextarea", zw), e.component("InputFile", i5), e.component("ImageUploadCircle", f5), e.component("InputDateTime", y5), e.component("InputTime", $5), e.component("InputRange", V5), e.component("InputNumber", W5), e.component("InputColorPicker", J5), e.component("EmojiPicker", bC), e.component("Select", Mo), e.component("MultiSelect", SC), e.component("Toggle", _r), e.component("InputPhone", IC), e.component("SelectablePills", NC), e.component("SegmentedControl", KC), e.component("DateRangePicker", x$), e.component("DatePickerPresets", Y$), e.component("Tag", Ue), e.component("TagSelect", Q$), e.component("Button", xt), e.component("Banner", oS), e.component("Modal", hS), e.component("Section", xS), e.component("KiutAppShellNavigation", VS);
  }
};
export {
  Yx as AWSCost,
  Py as AgentHumanConversations,
  up as AgentsPerDay,
  Mx as AiGeneratedChart,
  bx as AiGeneratedRevenueCard,
  VS as AppShellNavigation,
  oS as Banner,
  Wp as BookingManager,
  Sf as BoxplotChart,
  xt as Button,
  px as CSATContainer,
  fg as CandlestickChart,
  Hy as ChannelMetrics,
  kt as ChartBar,
  bt as ChartLine,
  ur as Checkin,
  I0 as CheckinContainer,
  x0 as CheckinMetrics,
  hr as CheckinSegments,
  _k as ConversationCount,
  Ax as CostCard,
  P_ as CostPerConversations,
  ak as CostUsage,
  N1 as CsatP95Card,
  j1 as CsatPulseCard,
  Cr as DEFAULT_CATEGORY_LABELS,
  $r as DEFAULT_EMOJI_CATALOG,
  _2 as DEFAULT_TABLE_VERSIONS_LABELS,
  Qk as DailyCostTrends,
  Y$ as DatePickerPresets,
  x$ as DateRangePicker,
  Q0 as Disruption,
  V1 as DisruptionNotifier,
  w2 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  bC as EmojiPicker,
  ib as FAQ,
  _w as Filters,
  y1 as Guardrails,
  sr as HistogramChart,
  Fx as HumanEscalations,
  Ox as HumanEscalationsCard,
  f5 as ImageUploadCircle,
  J5 as InputColorPicker,
  y5 as InputDateTime,
  i5 as InputFile,
  W5 as InputNumber,
  Ew as InputPassword,
  IC as InputPhone,
  V5 as InputRange,
  wr as InputText,
  zw as InputTextarea,
  $5 as InputTime,
  GS as KiutUIPlugin,
  k_ as MessageRoles,
  pb as MessagesPerAgent,
  hS as Modal,
  h_ as ModelUsage,
  SC as MultiSelect,
  pr as NpsDailyMetrics,
  br as NpsMetrics,
  mr as NpsOverviewMetrics,
  qv as PaymentMethod,
  Dn as PieChart,
  qS as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Ib as RecordLocator,
  fr as SalesByChannel,
  Zt as SankeyChart,
  xS as Section,
  KC as SegmentedControl,
  Mo as Select,
  c1 as SelectLanguage,
  NC as SelectablePills,
  gr as Seller,
  xv as SellerContainer,
  G_ as Table,
  H2 as TableVersions,
  vr as Tabs,
  Ue as Tag,
  Q$ as TagSelect,
  _r as Toggle,
  hk as TokenUsage,
  Mv as TopAgents,
  Ik as TopAgentsAnalysis,
  Hk as TopAgentsPie,
  z1 as TotalConversationsCard,
  n1 as TriageCombinations,
  nC as appendEmojiToDraft,
  XS as buildDefaultCategories,
  aC as extractEmojis,
  tC as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
