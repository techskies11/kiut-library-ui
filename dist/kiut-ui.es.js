import { defineComponent as ue, shallowRef as ri, h as Ve, ref as se, onMounted as Ze, onUnmounted as ct, watch as Ee, toRaw as Yn, nextTick as He, version as Er, isProxy as li, computed as C, toRef as $e, openBlock as m, createElementBlock as _, normalizeStyle as Ce, createVNode as j, unref as E, createElementVNode as u, Fragment as ce, renderList as me, normalizeClass as J, toDisplayString as A, createCommentVNode as V, onBeforeUnmount as ci, createStaticVNode as Un, useSlots as oo, renderSlot as ke, Transition as ut, withCtx as F, Comment as Rr, createBlock as ae, resolveDynamicComponent as St, createTextVNode as Ae, Teleport as la, withDirectives as Ge, withModifiers as Oe, vModelText as Wt, vShow as Ut, createSlots as To, vModelSelect as di, mergeProps as gt, useAttrs as Xa, withKeys as Oa, inject as ui } from "vue";
import * as Bo from "echarts/core";
import { TooltipComponent as Pr, TitleComponent as Ir } from "echarts/components";
import { SankeyChart as Fr } from "echarts/charts";
import { CanvasRenderer as Or } from "echarts/renderers";
import ze from "moment";
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
function Et(e) {
  return Ot(Ga(e / 2.55) / 100, 0, 1);
}
function Lo(e) {
  return Ot(Ga(e * 100), 0, 100);
}
const ft = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, qn = [..."0123456789ABCDEF"], Vr = (e) => qn[e & 15], zr = (e) => qn[(e & 240) >> 4] + qn[e & 15], Qa = (e) => (e & 240) >> 4 === (e & 15), Nr = (e) => Qa(e.r) && Qa(e.g) && Qa(e.b) && Qa(e.a);
function jr(e) {
  var t = e.length, a;
  return e[0] === "#" && (t === 4 || t === 5 ? a = {
    r: 255 & ft[e[1]] * 17,
    g: 255 & ft[e[2]] * 17,
    b: 255 & ft[e[3]] * 17,
    a: t === 5 ? ft[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (a = {
    r: ft[e[1]] << 4 | ft[e[2]],
    g: ft[e[3]] << 4 | ft[e[4]],
    b: ft[e[5]] << 4 | ft[e[6]],
    a: t === 9 ? ft[e[7]] << 4 | ft[e[8]] : 255
  })), a;
}
const Hr = (e, t) => e < 255 ? t(e) : "";
function Wr(e) {
  var t = Nr(e) ? Vr : zr;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Hr(e.a, t) : void 0;
}
const Kr = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hi(e, t, a) {
  const n = t * Math.min(a, 1 - a), o = (s, i = (s + e / 30) % 12) => a - n * Math.max(Math.min(i - 3, 9 - i, 1), -1);
  return [o(0), o(8), o(4)];
}
function Yr(e, t, a) {
  const n = (o, s = (o + e / 60) % 6) => a - a * t * Math.max(Math.min(s, 4 - s, 1), 0);
  return [n(5), n(3), n(1)];
}
function Ur(e, t, a) {
  const n = hi(e, 1, 0.5);
  let o;
  for (t + a > 1 && (o = 1 / (t + a), t *= o, a *= o), o = 0; o < 3; o++)
    n[o] *= 1 - t - a, n[o] += t;
  return n;
}
function qr(e, t, a, n, o) {
  return e === o ? (t - a) / n + (t < a ? 6 : 0) : t === o ? (a - e) / n + 2 : (e - t) / n + 4;
}
function so(e) {
  const a = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.max(a, n, o), i = Math.min(a, n, o), r = (s + i) / 2;
  let l, c, d;
  return s !== i && (d = s - i, c = r > 0.5 ? d / (2 - s - i) : d / (s + i), l = qr(a, n, o, d, s), l = l * 60 + 0.5), [l | 0, c || 0, r];
}
function io(e, t, a, n) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, a, n)).map(Kt);
}
function ro(e, t, a) {
  return io(hi, e, t, a);
}
function Xr(e, t, a) {
  return io(Ur, e, t, a);
}
function Gr(e, t, a) {
  return io(Yr, e, t, a);
}
function fi(e) {
  return (e % 360 + 360) % 360;
}
function Zr(e) {
  const t = Kr.exec(e);
  let a = 255, n;
  if (!t)
    return;
  t[5] !== n && (a = t[6] ? Ba(+t[5]) : Kt(+t[5]));
  const o = fi(+t[2]), s = +t[3] / 100, i = +t[4] / 100;
  return t[1] === "hwb" ? n = Xr(o, s, i) : t[1] === "hsv" ? n = Gr(o, s, i) : n = ro(o, s, i), {
    r: n[0],
    g: n[1],
    b: n[2],
    a
  };
}
function Qr(e, t) {
  var a = so(e);
  a[0] = fi(a[0] + t), a = ro(a), e.r = a[0], e.g = a[1], e.b = a[2];
}
function Jr(e) {
  if (!e)
    return;
  const t = so(e), a = t[0], n = Lo(t[1]), o = Lo(t[2]);
  return e.a < 255 ? `hsla(${a}, ${n}%, ${o}%, ${Et(e.a)})` : `hsl(${a}, ${n}%, ${o}%)`;
}
const Eo = {
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
}, Ro = {
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
function el() {
  const e = {}, t = Object.keys(Ro), a = Object.keys(Eo);
  let n, o, s, i, r;
  for (n = 0; n < t.length; n++) {
    for (i = r = t[n], o = 0; o < a.length; o++)
      s = a[o], r = r.replace(s, Eo[s]);
    s = parseInt(Ro[i], 16), e[r] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return e;
}
let Ja;
function tl(e) {
  Ja || (Ja = el(), Ja.transparent = [0, 0, 0, 0]);
  const t = Ja[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const al = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function nl(e) {
  const t = al.exec(e);
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
function ol(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Et(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Bn = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ga = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function sl(e, t, a) {
  const n = ga(Et(e.r)), o = ga(Et(e.g)), s = ga(Et(e.b));
  return {
    r: Kt(Bn(n + a * (ga(Et(t.r)) - n))),
    g: Kt(Bn(o + a * (ga(Et(t.g)) - o))),
    b: Kt(Bn(s + a * (ga(Et(t.b)) - s))),
    a: e.a + a * (t.a - e.a)
  };
}
function en(e, t, a) {
  if (e) {
    let n = so(e);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * a, t === 0 ? 360 : 1)), n = ro(n), e.r = n[0], e.g = n[1], e.b = n[2];
  }
}
function gi(e, t) {
  return e && Object.assign(t || {}, e);
}
function Po(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = Kt(e[3]))) : (t = gi(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = Kt(t.a)), t;
}
function il(e) {
  return e.charAt(0) === "r" ? nl(e) : Zr(e);
}
class Va {
  constructor(t) {
    if (t instanceof Va)
      return t;
    const a = typeof t;
    let n;
    a === "object" ? n = Po(t) : a === "string" && (n = jr(t) || tl(t) || il(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = gi(this._rgb);
    return t && (t.a = Et(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Po(t);
  }
  rgbString() {
    return this._valid ? ol(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Wr(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Jr(this._rgb) : void 0;
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
    return t && (this._rgb = sl(this._rgb, t._rgb, a)), this;
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
    return Qr(this._rgb, t), this;
  }
}
function Tt() {
}
const rl = /* @__PURE__ */ (() => {
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
function pt(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function wt(e, t) {
  return pt(e) ? e : t;
}
function De(e, t) {
  return typeof e > "u" ? t : e;
}
const ll = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, mi = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Fe(e, t, a) {
  if (e && typeof e.call == "function")
    return e.apply(a, t);
}
function Re(e, t, a, n) {
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
function pi(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function cl(e, t, a, n) {
  if (!pi(e))
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
  const s = a.merger || cl;
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
function Ra(e, t) {
  return za(e, t, {
    merger: dl
  });
}
function dl(e, t, a) {
  if (!pi(e))
    return;
  const n = t[e], o = a[e];
  Te(n) && Te(o) ? Ra(n, o) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = bn(o));
}
const Io = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function ul(e) {
  const t = e.split("."), a = [];
  let n = "";
  for (const o of t)
    n += o, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (a.push(n), n = "");
  return a;
}
function hl(e) {
  const t = ul(e);
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
  return (Io[t] || (Io[t] = hl(t)))(e);
}
function lo(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Na = (e) => typeof e < "u", qt = (e) => typeof e == "function", Fo = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const a of e)
    if (!t.has(a))
      return !1;
  return !0;
};
function fl(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Pe = Math.PI, We = 2 * Pe, gl = We + Pe, vn = Number.POSITIVE_INFINITY, ml = Pe / 180, Xe = Pe / 2, ea = Pe / 4, Oo = Pe * 2 / 3, bi = Math.log10, Mt = Math.sign;
function Pa(e, t, a) {
  return Math.abs(e - t) < a;
}
function Vo(e) {
  const t = Math.round(e);
  e = Pa(e, t, e / 1e3) ? t : e;
  const a = Math.pow(10, Math.floor(bi(e))), n = e / a;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * a;
}
function pl(e) {
  const t = [], a = Math.sqrt(e);
  let n;
  for (n = 1; n < a; n++)
    e % n === 0 && (t.push(n), t.push(e / n));
  return a === (a | 0) && t.push(a), t.sort((o, s) => o - s).pop(), t;
}
function bl(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function ja(e) {
  return !bl(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function vl(e, t) {
  const a = Math.round(e);
  return a - t <= e && a + t >= e;
}
function yl(e, t, a) {
  let n, o, s;
  for (n = 0, o = e.length; n < o; n++)
    s = e[n][a], isNaN(s) || (t.min = Math.min(t.min, s), t.max = Math.max(t.max, s));
}
function Rt(e) {
  return e * (Pe / 180);
}
function xl(e) {
  return e * (180 / Pe);
}
function zo(e) {
  if (!pt(e))
    return;
  let t = 1, a = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, a++;
  return a;
}
function vi(e, t) {
  const a = t.x - e.x, n = t.y - e.y, o = Math.sqrt(a * a + n * n);
  let s = Math.atan2(n, a);
  return s < -0.5 * Pe && (s += We), {
    angle: s,
    distance: o
  };
}
function Xn(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function _l(e, t) {
  return (e - t + gl) % We - Pe;
}
function yt(e) {
  return (e % We + We) % We;
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
function co(e, t, a) {
  a = a || ((i) => e[i] < t);
  let n = e.length - 1, o = 0, s;
  for (; n - o > 1; )
    s = o + n >> 1, a(s) ? o = s : n = s;
  return {
    lo: o,
    hi: n
  };
}
const ia = (e, t, a, n) => co(e, a, n ? (o) => {
  const s = e[o][t];
  return s < a || s === a && e[o + 1][t] === a;
} : (o) => e[o][t] < a), wl = (e, t, a) => co(e, a, (n) => e[n][t] >= a);
function Cl(e, t, a) {
  let n = 0, o = e.length;
  for (; n < o && e[n] < t; )
    n++;
  for (; o > n && e[o - 1] > a; )
    o--;
  return n > 0 || o < e.length ? e.slice(n, o) : e;
}
const yi = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function $l(e, t) {
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
  }), yi.forEach((a) => {
    const n = "_onData" + lo(a), o = e[a];
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
function No(e, t) {
  const a = e._chartjs;
  if (!a)
    return;
  const n = a.listeners, o = n.indexOf(t);
  o !== -1 && n.splice(o, 1), !(n.length > 0) && (yi.forEach((s) => {
    delete e[s];
  }), delete e._chartjs);
}
function xi(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const _i = (function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
})();
function ki(e, t) {
  let a = [], n = !1;
  return function(...o) {
    a = o, n || (n = !0, _i.call(window, () => {
      n = !1, e.apply(t, a);
    }));
  };
}
function Sl(e, t) {
  let a;
  return function(...n) {
    return t ? (clearTimeout(a), a = setTimeout(e, t, n)) : e.apply(this, n), t;
  };
}
const uo = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Qe = (e, t, a) => e === "start" ? t : e === "end" ? a : (t + a) / 2, Ml = (e, t, a, n) => e === (n ? "left" : "right") ? a : e === "center" ? (t + a) / 2 : t;
function Dl(e, t, a) {
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
        const b = l.slice(0, o + 1).reverse().findIndex((y) => !Le(y[r.axis]));
        o -= Math.max(0, b);
      }
      o = et(o, 0, n - 1);
    }
    if (g) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        ia(l, i.axis, f, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        a ? 0 : ia(t, d, i.getPixelForValue(f), !0).hi + 1
      );
      if (c) {
        const y = l.slice(b - 1).findIndex((v) => !Le(v[r.axis]));
        b += Math.max(0, y);
      }
      s = et(b, o, n) - o;
    } else
      s = n - o;
  }
  return {
    start: o,
    count: s
  };
}
function Al(e) {
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
const tn = (e) => e === 0 || e === 1, jo = (e, t, a) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * We / a)), Ho = (e, t, a) => Math.pow(2, -10 * e) * Math.sin((e - t) * We / a) + 1, Ia = {
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
  easeInOutSine: (e) => -0.5 * (Math.cos(Pe * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => tn(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => tn(e) ? e : jo(e, 0.075, 0.3),
  easeOutElastic: (e) => tn(e) ? e : Ho(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return tn(e) ? e : e < 0.5 ? 0.5 * jo(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ho(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ia.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ia.easeInBounce(e * 2) * 0.5 : Ia.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function ho(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Wo(e) {
  return ho(e) ? e : new Va(e);
}
function Ln(e) {
  return ho(e) ? e : new Va(e).saturate(0.5).darken(0.1).hexString();
}
const Tl = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Bl = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Ll(e) {
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
      properties: Bl
    },
    numbers: {
      type: "number",
      properties: Tl
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
function El(e) {
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
const Ko = /* @__PURE__ */ new Map();
function Rl(e, t) {
  t = t || {};
  const a = e + JSON.stringify(t);
  let n = Ko.get(a);
  return n || (n = new Intl.NumberFormat(e, t), Ko.set(a, n)), n;
}
function fo(e, t, a) {
  return Rl(t, a).format(e);
}
const Pl = {
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
      (c < 1e-4 || c > 1e15) && (o = "scientific"), s = Il(e, a);
    }
    const i = bi(Math.abs(s)), r = isNaN(i) ? 1 : Math.max(Math.min(-1 * Math.floor(i), 20), 0), l = {
      notation: o,
      minimumFractionDigits: r,
      maximumFractionDigits: r
    };
    return Object.assign(l, this.options.ticks.format), fo(e, n, l);
  }
};
function Il(e, t) {
  let a = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(a) >= 1 && e !== Math.floor(e) && (a = e - Math.floor(e)), a;
}
var wi = {
  formatters: Pl
};
function Fl(e) {
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
      callback: wi.formatters.values,
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
const da = /* @__PURE__ */ Object.create(null), Gn = /* @__PURE__ */ Object.create(null);
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
function En(e, t, a) {
  return typeof t == "string" ? za(Fa(e, t), a) : za(Fa(e, ""), t);
}
class Ol {
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
    }, this.hover = {}, this.hoverBackgroundColor = (n, o) => Ln(o.backgroundColor), this.hoverBorderColor = (n, o) => Ln(o.borderColor), this.hoverColor = (n, o) => Ln(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(a);
  }
  set(t, a) {
    return En(this, t, a);
  }
  get(t) {
    return Fa(this, t);
  }
  describe(t, a) {
    return En(Gn, t, a);
  }
  override(t, a) {
    return En(da, t, a);
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
var Ke = /* @__PURE__ */ new Ol({
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
  Ll,
  El,
  Fl
]);
function Vl(e) {
  return !e || Le(e.size) || Le(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Yo(e, t, a, n, o) {
  let s = t[o];
  return s || (s = t[o] = e.measureText(o).width, a.push(o)), s > n && (n = s), n;
}
function ta(e, t, a) {
  const n = e.currentDevicePixelRatio, o = a !== 0 ? Math.max(a / 2, 0.5) : 0;
  return Math.round((t - o) * n) / n + o;
}
function Uo(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Zn(e, t, a, n) {
  Ci(e, t, a, n, null);
}
function Ci(e, t, a, n, o) {
  let s, i, r, l, c, d, h, f;
  const p = t.pointStyle, g = t.rotation, b = t.radius;
  let y = (g || 0) * ml;
  if (p && typeof p == "object" && (s = p.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(a, n), e.rotate(y), e.drawImage(p, -p.width / 2, -p.height / 2, p.width, p.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), p) {
      // Default includes circle
      default:
        o ? e.ellipse(a, n, o / 2, b, 0, 0, We) : e.arc(a, n, b, 0, We), e.closePath();
        break;
      case "triangle":
        d = o ? o / 2 : b, e.moveTo(a + Math.sin(y) * d, n - Math.cos(y) * b), y += Oo, e.lineTo(a + Math.sin(y) * d, n - Math.cos(y) * b), y += Oo, e.lineTo(a + Math.sin(y) * d, n - Math.cos(y) * b), e.closePath();
        break;
      case "rectRounded":
        c = b * 0.516, l = b - c, i = Math.cos(y + ea) * l, h = Math.cos(y + ea) * (o ? o / 2 - c : l), r = Math.sin(y + ea) * l, f = Math.sin(y + ea) * (o ? o / 2 - c : l), e.arc(a - h, n - r, c, y - Pe, y - Xe), e.arc(a + f, n - i, c, y - Xe, y), e.arc(a + h, n + r, c, y, y + Xe), e.arc(a - f, n + i, c, y + Xe, y + Pe), e.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * b, d = o ? o / 2 : l, e.rect(a - d, n - l, 2 * d, 2 * l);
          break;
        }
        y += ea;
      /* falls through */
      case "rectRot":
        h = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, f = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - h, n - r), e.lineTo(a + f, n - i), e.lineTo(a + h, n + r), e.lineTo(a - f, n + i), e.closePath();
        break;
      case "crossRot":
        y += ea;
      /* falls through */
      case "cross":
        h = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, f = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + f, n - i), e.lineTo(a - f, n + i);
        break;
      case "star":
        h = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, f = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + f, n - i), e.lineTo(a - f, n + i), y += ea, h = Math.cos(y) * (o ? o / 2 : b), i = Math.cos(y) * b, r = Math.sin(y) * b, f = Math.sin(y) * (o ? o / 2 : b), e.moveTo(a - h, n - r), e.lineTo(a + h, n + r), e.moveTo(a + f, n - i), e.lineTo(a - f, n + i);
        break;
      case "line":
        i = o ? o / 2 : Math.cos(y) * b, r = Math.sin(y) * b, e.moveTo(a - i, n - r), e.lineTo(a + i, n + r);
        break;
      case "dash":
        e.moveTo(a, n), e.lineTo(a + Math.cos(y) * (o ? o / 2 : b), n + Math.sin(y) * b);
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
function go(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function mo(e) {
  e.restore();
}
function zl(e, t, a, n, o) {
  if (!t)
    return e.lineTo(a.x, a.y);
  if (o === "middle") {
    const s = (t.x + a.x) / 2;
    e.lineTo(s, t.y), e.lineTo(s, a.y);
  } else o === "after" != !!n ? e.lineTo(t.x, a.y) : e.lineTo(a.x, t.y);
  e.lineTo(a.x, a.y);
}
function Nl(e, t, a, n) {
  if (!t)
    return e.lineTo(a.x, a.y);
  e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? a.cp2x : a.cp1x, n ? a.cp2y : a.cp1y, a.x, a.y);
}
function jl(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), Le(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Hl(e, t, a, n, o) {
  if (o.strikethrough || o.underline) {
    const s = e.measureText(n), i = t - s.actualBoundingBoxLeft, r = t + s.actualBoundingBoxRight, l = a - s.actualBoundingBoxAscent, c = a + s.actualBoundingBoxDescent, d = o.strikethrough ? (l + c) / 2 : c;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = o.decorationWidth || 2, e.moveTo(i, d), e.lineTo(r, d), e.stroke();
  }
}
function Wl(e, t) {
  const a = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = a;
}
function Ka(e, t, a, n, o, s = {}) {
  const i = qe(t) ? t : [
    t
  ], r = s.strokeWidth > 0 && s.strokeColor !== "";
  let l, c;
  for (e.save(), e.font = o.string, jl(e, s), l = 0; l < i.length; ++l)
    c = i[l], s.backdrop && Wl(e, s.backdrop), r && (s.strokeColor && (e.strokeStyle = s.strokeColor), Le(s.strokeWidth) || (e.lineWidth = s.strokeWidth), e.strokeText(c, a, n, s.maxWidth)), e.fillText(c, a, n, s.maxWidth), Hl(e, a, n, c, s), n += Number(o.lineHeight);
  e.restore();
}
function yn(e, t) {
  const { x: a, y: n, w: o, h: s, radius: i } = t;
  e.arc(a + i.topLeft, n + i.topLeft, i.topLeft, 1.5 * Pe, Pe, !0), e.lineTo(a, n + s - i.bottomLeft), e.arc(a + i.bottomLeft, n + s - i.bottomLeft, i.bottomLeft, Pe, Xe, !0), e.lineTo(a + o - i.bottomRight, n + s), e.arc(a + o - i.bottomRight, n + s - i.bottomRight, i.bottomRight, Xe, 0, !0), e.lineTo(a + o, n + i.topRight), e.arc(a + o - i.topRight, n + i.topRight, i.topRight, 0, -Xe, !0), e.lineTo(a + i.topLeft, n);
}
const Kl = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Yl = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Ul(e, t) {
  const a = ("" + e).match(Kl);
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
const ql = (e) => +e || 0;
function po(e, t) {
  const a = {}, n = Te(t), o = n ? Object.keys(t) : t, s = Te(e) ? n ? (i) => De(e[i], e[t[i]]) : (i) => e[i] : () => e;
  for (const i of o)
    a[i] = ql(s(i));
  return a;
}
function $i(e) {
  return po(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ba(e) {
  return po(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function bt(e) {
  const t = $i(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function tt(e, t) {
  e = e || {}, t = t || Ke.font;
  let a = De(e.size, t.size);
  typeof a == "string" && (a = parseInt(a, 10));
  let n = De(e.style, t.style);
  n && !("" + n).match(Yl) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const o = {
    family: De(e.family, t.family),
    lineHeight: Ul(De(e.lineHeight, t.lineHeight), a),
    size: a,
    style: n,
    weight: De(e.weight, t.weight),
    string: ""
  };
  return o.string = Vl(o), o;
}
function an(e, t, a, n) {
  let o, s, i;
  for (o = 0, s = e.length; o < s; ++o)
    if (i = e[o], i !== void 0 && i !== void 0)
      return i;
}
function Xl(e, t, a) {
  const { min: n, max: o } = e, s = mi(t, (o - n) / 2), i = (r, l) => a && r === 0 ? 0 : r + l;
  return {
    min: i(n, -Math.abs(s)),
    max: i(o, s)
  };
}
function ua(e, t) {
  return Object.assign(Object.create(e), t);
}
function bo(e, t = [
  ""
], a, n, o = () => e[0]) {
  const s = a || e;
  typeof n > "u" && (n = Ai("_fallback", e));
  const i = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: s,
    _fallback: n,
    _getTarget: o,
    override: (r) => bo([
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
      return Mi(r, l, () => nc(l, t, e, r));
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
      return Xo(r).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(r) {
      return Xo(r);
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
    _descriptors: Si(e, n),
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
      return Mi(s, i, () => Zl(s, i, r));
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
function Si(e, t = {
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
const Gl = (e, t) => e ? e + lo(t) : t, vo = (e, t) => Te(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Mi(e, t, a) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const n = a();
  return e[t] = n, n;
}
function Zl(e, t, a) {
  const { _proxy: n, _context: o, _subProxy: s, _descriptors: i } = e;
  let r = n[t];
  return qt(r) && i.isScriptable(t) && (r = Ql(t, r, e, a)), qe(r) && r.length && (r = Jl(t, r, e, i.isIndexable)), vo(t, r) && (r = ya(r, o, s && s[t], i)), r;
}
function Ql(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _stack: r } = a;
  if (r.has(e))
    throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + e);
  r.add(e);
  let l = t(s, i || n);
  return r.delete(e), vo(e, l) && (l = yo(o._scopes, o, e, l)), l;
}
function Jl(e, t, a, n) {
  const { _proxy: o, _context: s, _subProxy: i, _descriptors: r } = a;
  if (typeof s.index < "u" && n(e))
    return t[s.index % t.length];
  if (Te(t[0])) {
    const l = t, c = o._scopes.filter((d) => d !== l);
    t = [];
    for (const d of l) {
      const h = yo(c, o, e, d);
      t.push(ya(h, s, i && i[e], r));
    }
  }
  return t;
}
function Di(e, t, a) {
  return qt(e) ? e(t, a) : e;
}
const ec = (e, t) => e === !0 ? t : typeof e == "string" ? ca(t, e) : void 0;
function tc(e, t, a, n, o) {
  for (const s of t) {
    const i = ec(a, s);
    if (i) {
      e.add(i);
      const r = Di(i._fallback, a, o);
      if (typeof r < "u" && r !== a && r !== n)
        return r;
    } else if (i === !1 && typeof n < "u" && a !== n)
      return null;
  }
  return !1;
}
function yo(e, t, a, n) {
  const o = t._rootScopes, s = Di(t._fallback, a, n), i = [
    ...e,
    ...o
  ], r = /* @__PURE__ */ new Set();
  r.add(n);
  let l = qo(r, i, a, s || a, n);
  return l === null || typeof s < "u" && s !== a && (l = qo(r, i, s, l, n), l === null) ? !1 : bo(Array.from(r), [
    ""
  ], o, s, () => ac(t, a, n));
}
function qo(e, t, a, n, o) {
  for (; a; )
    a = tc(e, t, a, n, o);
  return a;
}
function ac(e, t, a) {
  const n = e._getTarget();
  t in n || (n[t] = {});
  const o = n[t];
  return qe(o) && Te(a) ? a : o || {};
}
function nc(e, t, a, n) {
  let o;
  for (const s of t)
    if (o = Ai(Gl(s, e), a), typeof o < "u")
      return vo(e, o) ? yo(a, n, e, o) : o;
}
function Ai(e, t) {
  for (const a of t) {
    if (!a)
      continue;
    const n = a[e];
    if (typeof n < "u")
      return n;
  }
}
function Xo(e) {
  let t = e._keys;
  return t || (t = e._keys = oc(e._scopes)), t;
}
function oc(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of e)
    for (const n of Object.keys(a).filter((o) => !o.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
const sc = Number.EPSILON || 1e-14, xa = (e, t) => t < e.length && !e[t].skip && e[t], Ti = (e) => e === "x" ? "y" : "x";
function ic(e, t, a, n) {
  const o = e.skip ? t : e, s = t, i = a.skip ? t : a, r = Xn(s, o), l = Xn(i, s);
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
function rc(e, t, a) {
  const n = e.length;
  let o, s, i, r, l, c = xa(e, 0);
  for (let d = 0; d < n - 1; ++d)
    if (l = c, c = xa(e, d + 1), !(!l || !c)) {
      if (Pa(t[d], 0, sc)) {
        a[d] = a[d + 1] = 0;
        continue;
      }
      o = a[d] / t[d], s = a[d + 1] / t[d], r = Math.pow(o, 2) + Math.pow(s, 2), !(r <= 9) && (i = 3 / Math.sqrt(r), a[d] = o * i * t[d], a[d + 1] = s * i * t[d]);
    }
}
function lc(e, t, a = "x") {
  const n = Ti(a), o = e.length;
  let s, i, r, l = xa(e, 0);
  for (let c = 0; c < o; ++c) {
    if (i = r, r = l, l = xa(e, c + 1), !r)
      continue;
    const d = r[a], h = r[n];
    i && (s = (d - i[a]) / 3, r[`cp1${a}`] = d - s, r[`cp1${n}`] = h - s * t[c]), l && (s = (l[a] - d) / 3, r[`cp2${a}`] = d + s, r[`cp2${n}`] = h + s * t[c]);
  }
}
function cc(e, t = "x") {
  const a = Ti(t), n = e.length, o = Array(n).fill(0), s = Array(n);
  let i, r, l, c = xa(e, 0);
  for (i = 0; i < n; ++i)
    if (r = l, l = c, c = xa(e, i + 1), !!l) {
      if (c) {
        const d = c[t] - l[t];
        o[i] = d !== 0 ? (c[a] - l[a]) / d : 0;
      }
      s[i] = r ? c ? Mt(o[i - 1]) !== Mt(o[i]) ? 0 : (o[i - 1] + o[i]) / 2 : o[i - 1] : o[i];
    }
  rc(e, o, s), lc(e, s, t);
}
function nn(e, t, a) {
  return Math.max(Math.min(e, a), t);
}
function dc(e, t) {
  let a, n, o, s, i, r = Wa(e[0], t);
  for (a = 0, n = e.length; a < n; ++a)
    i = s, s = r, r = a < n - 1 && Wa(e[a + 1], t), s && (o = e[a], i && (o.cp1x = nn(o.cp1x, t.left, t.right), o.cp1y = nn(o.cp1y, t.top, t.bottom)), r && (o.cp2x = nn(o.cp2x, t.left, t.right), o.cp2y = nn(o.cp2y, t.top, t.bottom)));
}
function uc(e, t, a, n, o) {
  let s, i, r, l;
  if (t.spanGaps && (e = e.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    cc(e, o);
  else {
    let c = n ? e[e.length - 1] : e[0];
    for (s = 0, i = e.length; s < i; ++s)
      r = e[s], l = ic(c, r, e[Math.min(s + 1, i - (n ? 0 : 1)) % i], t.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, c = r;
  }
  t.capBezierPoints && dc(e, a);
}
function xo() {
  return typeof window < "u" && typeof document < "u";
}
function _o(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function xn(e, t, a) {
  let n;
  return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[a])) : n = e, n;
}
const Cn = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function hc(e, t) {
  return Cn(e).getPropertyValue(t);
}
const fc = [
  "top",
  "right",
  "bottom",
  "left"
];
function ra(e, t, a) {
  const n = {};
  a = a ? "-" + a : "";
  for (let o = 0; o < 4; o++) {
    const s = fc[o];
    n[s] = parseFloat(e[t + "-" + s + a]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const gc = (e, t, a) => (e > 0 || t > 0) && (!a || !a.shadowRoot);
function mc(e, t) {
  const a = e.touches, n = a && a.length ? a[0] : e, { offsetX: o, offsetY: s } = n;
  let i = !1, r, l;
  if (gc(o, s, e.target))
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
  const { canvas: a, currentDevicePixelRatio: n } = t, o = Cn(a), s = o.boxSizing === "border-box", i = ra(o, "padding"), r = ra(o, "border", "width"), { x: l, y: c, box: d } = mc(e, a), h = i.left + (d && r.left), f = i.top + (d && r.top);
  let { width: p, height: g } = t;
  return s && (p -= i.width + r.width, g -= i.height + r.height), {
    x: Math.round((l - h) / p * a.width / n),
    y: Math.round((c - f) / g * a.height / n)
  };
}
function pc(e, t, a) {
  let n, o;
  if (t === void 0 || a === void 0) {
    const s = e && _o(e);
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
function bc(e, t, a, n) {
  const o = Cn(e), s = ra(o, "margin"), i = xn(o.maxWidth, e, "clientWidth") || vn, r = xn(o.maxHeight, e, "clientHeight") || vn, l = pc(e, t, a);
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
function Go(e, t, a) {
  const n = t || 1, o = zt(e.height * n), s = zt(e.width * n);
  e.height = zt(e.height), e.width = zt(e.width);
  const i = e.canvas;
  return i.style && (a || !i.style.height && !i.style.width) && (i.style.height = `${e.height}px`, i.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || i.height !== o || i.width !== s ? (e.currentDevicePixelRatio = n, i.height = o, i.width = s, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const vc = (function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    xo() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
})();
function Zo(e, t) {
  const a = hc(e, t), n = a && a.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
function sa(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: e.y + a * (t.y - e.y)
  };
}
function yc(e, t, a, n) {
  return {
    x: e.x + a * (t.x - e.x),
    y: n === "middle" ? a < 0.5 ? e.y : t.y : n === "after" ? a < 1 ? e.y : t.y : a > 0 ? t.y : e.y
  };
}
function xc(e, t, a, n) {
  const o = {
    x: e.cp2x,
    y: e.cp2y
  }, s = {
    x: t.cp1x,
    y: t.cp1y
  }, i = sa(e, o, a), r = sa(o, s, a), l = sa(s, t, a), c = sa(i, r, a), d = sa(r, l, a);
  return sa(c, d, a);
}
const _c = function(e, t) {
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
  return e ? _c(t, a) : kc();
}
function Bi(e, t) {
  let a, n;
  (t === "ltr" || t === "rtl") && (a = e.canvas.style, n = [
    a.getPropertyValue("direction"),
    a.getPropertyPriority("direction")
  ], a.setProperty("direction", t, "important"), e.prevTextDirection = n);
}
function Li(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Ei(e) {
  return e === "angle" ? {
    between: Ha,
    compare: _l,
    normalize: yt
  } : {
    between: Vt,
    compare: (t, a) => t - a,
    normalize: (t) => t
  };
}
function Qo({ start: e, end: t, count: a, loop: n, style: o }) {
  return {
    start: e % a,
    end: t % a,
    loop: n && (t - e + 1) % a === 0,
    style: o
  };
}
function wc(e, t, a) {
  const { property: n, start: o, end: s } = a, { between: i, normalize: r } = Ei(n), l = t.length;
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
function Cc(e, t, a) {
  if (!a)
    return [
      e
    ];
  const { property: n, start: o, end: s } = a, i = t.length, { compare: r, between: l, normalize: c } = Ei(n), { start: d, end: h, loop: f, style: p } = wc(e, t, a), g = [];
  let b = !1, y = null, v, x, k;
  const w = () => l(o, k, v) && r(o, k) !== 0, $ = () => r(s, v) === 0 || l(s, k, v), D = () => b || w(), S = () => !b || $();
  for (let R = d, P = d; R <= h; ++R)
    x = t[R % i], !x.skip && (v = c(x[n]), v !== k && (b = l(v, o, s), y === null && D() && (y = r(v, o) === 0 ? R : P), y !== null && S() && (g.push(Qo({
      start: y,
      end: R,
      loop: f,
      count: i,
      style: p
    })), y = null), P = R, k = v));
  return y !== null && g.push(Qo({
    start: y,
    end: h,
    loop: f,
    count: i,
    style: p
  })), g;
}
function $c(e, t) {
  const a = [], n = e.segments;
  for (let o = 0; o < n.length; o++) {
    const s = Cc(n[o], e.points, t);
    s.length && a.push(...s);
  }
  return a;
}
function Sc(e, t, a, n) {
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
function Mc(e, t, a, n) {
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
function Dc(e, t) {
  const a = e.points, n = e.options.spanGaps, o = a.length;
  if (!o)
    return [];
  const s = !!e._loop, { start: i, end: r } = Sc(a, o, s, n);
  if (n === !0)
    return Jo(e, [
      {
        start: i,
        end: r,
        loop: s
      }
    ], a, t);
  const l = r < i ? r + o : r, c = !!e._fullLoop && i === 0 && r === o - 1;
  return Jo(e, Mc(a, i, l, c), a, t);
}
function Jo(e, t, a, n) {
  return !n || !n.setContext || !a ? t : Ac(e, t, a, n);
}
function Ac(e, t, a, n) {
  const o = e._chart.getContext(), s = es(e.options), { _datasetIndex: i, options: { spanGaps: r } } = e, l = a.length, c = [];
  let d = s, h = t[0].start, f = h;
  function p(g, b, y, v) {
    const x = r ? -1 : 1;
    if (g !== b) {
      for (g += l; a[g % l].skip; )
        g -= x;
      for (; a[b % l].skip; )
        b += x;
      g % l !== b % l && (c.push({
        start: g % l,
        end: b % l,
        loop: y,
        style: v
      }), d = v, h = b % l);
    }
  }
  for (const g of t) {
    h = r ? h : g.start;
    let b = a[h % l], y;
    for (f = h + 1; f <= g.end; f++) {
      const v = a[f % l];
      y = es(n.setContext(ua(o, {
        type: "segment",
        p0: b,
        p1: v,
        p0DataIndex: (f - 1) % l,
        p1DataIndex: f % l,
        datasetIndex: i
      }))), Tc(y, d) && p(h, f - 1, g.loop, d), b = v, d = y;
    }
    h < f - 1 && p(h, f - 1, g.loop, d);
  }
  return c;
}
function es(e) {
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
function Tc(e, t) {
  if (!t)
    return !1;
  const a = [], n = function(o, s) {
    return ho(s) ? (a.includes(s) || a.push(s), a.indexOf(s)) : s;
  };
  return JSON.stringify(e, n) !== JSON.stringify(t, n);
}
function on(e, t, a) {
  return e.options.clip ? e[a] : t[a];
}
function Bc(e, t) {
  const { xScale: a, yScale: n } = e;
  return a && n ? {
    left: on(a, t, "left"),
    right: on(a, t, "right"),
    top: on(n, t, "top"),
    bottom: on(n, t, "bottom")
  } : t;
}
function Lc(e, t) {
  const a = t._clip;
  if (a.disabled)
    return !1;
  const n = Bc(t, e.chartArea);
  return {
    left: a.left === !1 ? 0 : n.left - (a.left === !0 ? 0 : a.left),
    right: a.right === !1 ? e.width : n.right + (a.right === !0 ? 0 : a.right),
    top: a.top === !1 ? 0 : n.top - (a.top === !0 ? 0 : a.top),
    bottom: a.bottom === !1 ? e.height : n.bottom + (a.bottom === !0 ? 0 : a.bottom)
  };
}
class Ec {
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
    this._request || (this._running = !0, this._request = _i.call(window, () => {
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
var Bt = /* @__PURE__ */ new Ec();
const ts = "transparent", Rc = {
  boolean(e, t, a) {
    return a > 0.5 ? t : e;
  },
  color(e, t, a) {
    const n = Wo(e || ts), o = n.valid && Wo(t || ts);
    return o && o.valid ? o.mix(n, a).hexString() : t;
  },
  number(e, t, a) {
    return e + (t - e) * a;
  }
};
class Pc {
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
    this._active = !0, this._fn = t.fn || Rc[t.type || typeof i], this._easing = Ia[t.easing] || Ia.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = a, this._prop = n, this._from = i, this._to = o, this._promises = void 0;
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
class Ri {
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
    const n = a.options, o = Fc(t, n);
    if (!o)
      return [];
    const s = this._createAnimations(o, n);
    return n.$shared && Ic(t.options.$animations, n).then(() => {
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
      s[c] = h = new Pc(f, t, c, d), o.push(h);
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
function Ic(e, t) {
  const a = [], n = Object.keys(t);
  for (let o = 0; o < n.length; o++) {
    const s = e[n[o]];
    s && s.active() && a.push(s.wait());
  }
  return Promise.all(a);
}
function Fc(e, t) {
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
function as(e, t) {
  const a = e && e.options || {}, n = a.reverse, o = a.min === void 0 ? t : 0, s = a.max === void 0 ? t : 0;
  return {
    start: n ? s : o,
    end: n ? o : s
  };
}
function Oc(e, t, a) {
  if (a === !1)
    return !1;
  const n = as(e, a), o = as(t, a);
  return {
    top: o.end,
    right: n.end,
    bottom: o.start,
    left: n.start
  };
}
function Vc(e) {
  let t, a, n, o;
  return Te(e) ? (t = e.top, a = e.right, n = e.bottom, o = e.left) : t = a = n = o = e, {
    top: t,
    right: a,
    bottom: n,
    left: o,
    disabled: e === !1
  };
}
function Pi(e, t) {
  const a = [], n = e._getSortedDatasetMetas(t);
  let o, s;
  for (o = 0, s = n.length; o < s; ++o)
    a.push(n[o].index);
  return a;
}
function ns(e, t, a, n = {}) {
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
    c = e.values[l], pt(c) && (s || t === 0 || Mt(t) === Mt(c)) && (t += c);
  }
  return !d && !n.all ? 0 : t;
}
function zc(e, t) {
  const { iScale: a, vScale: n } = t, o = a.axis === "x" ? "x" : "y", s = n.axis === "x" ? "x" : "y", i = Object.keys(e), r = new Array(i.length);
  let l, c, d;
  for (l = 0, c = i.length; l < c; ++l)
    d = i[l], r[l] = {
      [o]: d,
      [s]: e[d]
    };
  return r;
}
function Rn(e, t) {
  const a = e && e.options.stacked;
  return a || a === void 0 && t.stack !== void 0;
}
function Nc(e, t, a) {
  return `${e.id}.${t.id}.${a.stack || a.type}`;
}
function jc(e) {
  const { min: t, max: a, minDefined: n, maxDefined: o } = e.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: o ? a : Number.POSITIVE_INFINITY
  };
}
function Hc(e, t, a) {
  const n = e[t] || (e[t] = {});
  return n[a] || (n[a] = {});
}
function os(e, t, a, n) {
  for (const o of t.getMatchingVisibleMetas(n).reverse()) {
    const s = e[o.index];
    if (a && s > 0 || !a && s < 0)
      return o.index;
  }
  return null;
}
function ss(e, t) {
  const { chart: a, _cachedMeta: n } = e, o = a._stacks || (a._stacks = {}), { iScale: s, vScale: i, index: r } = n, l = s.axis, c = i.axis, d = Nc(s, i, n), h = t.length;
  let f;
  for (let p = 0; p < h; ++p) {
    const g = t[p], { [l]: b, [c]: y } = g, v = g._stacks || (g._stacks = {});
    f = v[c] = Hc(o, d, b), f[r] = y, f._top = os(f, i, !0, n.type), f._bottom = os(f, i, !1, n.type);
    const x = f._visualValues || (f._visualValues = {});
    x[r] = y;
  }
}
function Pn(e, t) {
  const a = e.scales;
  return Object.keys(a).filter((n) => a[n].axis === t).shift();
}
function Wc(e, t) {
  return ua(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Kc(e, t, a) {
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
const In = (e) => e === "reset" || e === "none", is = (e, t) => t ? e : Object.assign({}, e), Yc = (e, t, a) => e && !t.hidden && t._stacked && {
  keys: Pi(a, !0),
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
    this.configure(), this.linkScales(), t._stacked = Rn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && wa(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, a = this._cachedMeta, n = this.getDataset(), o = (h, f, p, g) => h === "x" ? f : h === "r" ? g : p, s = a.xAxisID = De(n.xAxisID, Pn(t, "x")), i = a.yAxisID = De(n.yAxisID, Pn(t, "y")), r = a.rAxisID = De(n.rAxisID, Pn(t, "r")), l = a.indexAxis, c = a.iAxisID = o(l, s, i, r), d = a.vAxisID = o(l, i, s, r);
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
    this._data && No(this._data, this), t._stacked && wa(t);
  }
  _dataCheck() {
    const t = this.getDataset(), a = t.data || (t.data = []), n = this._data;
    if (Te(a)) {
      const o = this._cachedMeta;
      this._data = zc(a, o);
    } else if (n !== a) {
      if (n) {
        No(n, this);
        const o = this._cachedMeta;
        wa(o), o._parsed = [];
      }
      a && Object.isExtensible(a) && $l(a, this), this._syncList = [], this._data = a;
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
    a._stacked = Rn(a.vScale, a), a.stack !== n.stack && (o = !0, wa(a), a.stack = n.stack), this._resyncElements(t), (o || s !== a._stacked) && (ss(this, a._parsed), a._stacked = Rn(a.vScale, a));
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
    i && ss(this, f);
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
      keys: Pi(o, !0),
      values: a._stacks[t.axis]._visualValues
    };
    return ns(r, i, s.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, a, n, o) {
    const s = n[a.axis];
    let i = s === null ? NaN : s;
    const r = o && n._stacks[a.axis];
    o && r && (o.values = r, i = ns(o, s, this._cachedMeta.index)), t.min = Math.min(t.min, i), t.max = Math.max(t.max, i);
  }
  getMinMax(t, a) {
    const n = this._cachedMeta, o = n._parsed, s = n._sorted && t === n.iScale, i = o.length, r = this._getOtherScale(t), l = Yc(a, n, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = jc(r);
    let f, p;
    function g() {
      p = o[f];
      const b = p[r.axis];
      return !pt(p[t.axis]) || d > b || h < b;
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
      i = a[o][t.axis], pt(i) && n.push(i);
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
    this.update(t || "default"), a._clip = Vc(De(this.options.clip, Oc(a.xScale, a.yScale, this.getMaxOverflow())));
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
      s = i.$context || (i.$context = Kc(this.getContext(), t, i)), s.parsed = this.getParsed(t), s.raw = o.data[t], s.index = s.dataIndex = t;
    } else
      s = this.$context || (this.$context = Wc(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
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
      return is(r, l);
    const c = this.chart.config, d = c.datasetElementScopeKeys(this._type, t), h = o ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = c.getOptionScopes(this.getDataset(), d), p = Object.keys(Ke.elements[t]), g = () => this.getContext(n, o, a), b = c.resolveNamedOptions(f, p, g, h);
    return b.$shared && (b.$shared = l, s[i] = Object.freeze(is(b, l))), b;
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
    const c = new Ri(o, l && l.animations);
    return l && l._cacheable && (s[i] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, a) {
    return !a || In(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, a) {
    const n = this.resolveDataElementOptions(t, a), o = this._sharedOptions, s = this.getSharedOptions(n), i = this.includeOptions(a, s) || s !== o;
    return this.updateSharedOptions(s, a, n), {
      sharedOptions: s,
      includeOptions: i
    };
  }
  updateElement(t, a, n, o) {
    In(o) ? Object.assign(t, n) : this._resolveAnimations(a, o).update(t, n);
  }
  updateSharedOptions(t, a, n) {
    t && !In(a) && this._resolveAnimations(void 0, a).update(t, n);
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
function Uc(e, t) {
  if (!e._cache.$bar) {
    const a = e.getMatchingVisibleMetas(t);
    let n = [];
    for (let o = 0, s = a.length; o < s; o++)
      n = n.concat(a[o].controller.getAllParsedValues(e));
    e._cache.$bar = xi(n.sort((o, s) => o - s));
  }
  return e._cache.$bar;
}
function qc(e) {
  const t = e.iScale, a = Uc(t, e.type);
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
function Xc(e, t, a, n) {
  const o = a.barThickness;
  let s, i;
  return Le(o) ? (s = t.min * a.categoryPercentage, i = a.barPercentage) : (s = o * n, i = 1), {
    chunk: s / n,
    ratio: i,
    start: t.pixels[e] - s / 2
  };
}
function Gc(e, t, a, n) {
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
function Zc(e, t, a, n) {
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
function Ii(e, t, a, n) {
  return qe(e) ? Zc(e, t, a, n) : t[a.axis] = a.parse(e, n), t;
}
function rs(e, t, a, n) {
  const o = e.iScale, s = e.vScale, i = o.getLabels(), r = o === s, l = [];
  let c, d, h, f;
  for (c = a, d = a + n; c < d; ++c)
    f = t[c], h = {}, h[o.axis] = r || o.parse(i[c], c), l.push(Ii(f, h, s, c));
  return l;
}
function Fn(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Qc(e, t, a) {
  return e !== 0 ? Mt(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= a ? 1 : -1);
}
function Jc(e) {
  let t, a, n, o, s;
  return e.horizontal ? (t = e.base > e.x, a = "left", n = "right") : (t = e.base < e.y, a = "bottom", n = "top"), t ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: a,
    end: n,
    reverse: t,
    top: o,
    bottom: s
  };
}
function ed(e, t, a, n) {
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
  const { start: i, end: r, reverse: l, top: c, bottom: d } = Jc(e);
  o === "middle" && a && (e.enableBorderRadius = !0, (a._top || 0) === n ? o = c : (a._bottom || 0) === n ? o = d : (s[ls(d, i, r, l)] = !0, o = c)), s[ls(o, i, r, l)] = !0, e.borderSkipped = s;
}
function ls(e, t, a, n) {
  return n ? (e = td(e, t, a), e = cs(e, a, t)) : e = cs(e, t, a), e;
}
function td(e, t, a) {
  return e === t ? a : e === a ? t : e;
}
function cs(e, t, a) {
  return e === "start" ? t : e === "end" ? a : e;
}
function ad(e, { inflateAmount: t }, a) {
  e.inflateAmount = t === "auto" ? a === 1 ? 0.33 : 0 : t;
}
class nd extends $n {
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
    return rs(t, a, n, o);
  }
  parseArrayData(t, a, n, o) {
    return rs(t, a, n, o);
  }
  parseObjectData(t, a, n, o) {
    const { iScale: s, vScale: i } = t, { xAxisKey: r = "x", yAxisKey: l = "y" } = this._parsing, c = s.axis === "x" ? r : l, d = i.axis === "x" ? r : l, h = [];
    let f, p, g, b;
    for (f = n, p = n + o; f < p; ++f)
      b = a[f], g = {}, g[s.axis] = s.parse(ca(b, c), f), h.push(Ii(ca(b, d), g, i, f));
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
    const a = this._cachedMeta, { iScale: n, vScale: o } = a, s = this.getParsed(t), i = s._custom, r = Fn(i) ? "[" + i.start + ", " + i.end + "]" : "" + o.getLabelForValue(s[o.axis]);
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
      const g = this.getParsed(p), b = s || Le(g[r.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(p), y = this._calculateBarIndexPixels(p, d), v = (g._stacks || {})[r.axis], x = {
        horizontal: c,
        base: b.base,
        enableBorderRadius: !v || Fn(g._custom) || i === v._top || i === v._bottom,
        x: c ? b.head : y.center,
        y: c ? y.center : b.head,
        height: c ? y.size : Math.abs(b.size),
        width: c ? Math.abs(b.size) : y.size
      };
      f && (x.options = h || this.resolveDataElementOptions(p, t[p].active ? "active" : o));
      const k = x.options || t[p].options;
      ed(x, k, v, i), ad(x, k, d.ratio), this.updateElement(t[p], p, x, o);
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
      min: r || qc(a),
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
    const { _cachedMeta: { vScale: a, _stacked: n, index: o }, options: { base: s, minBarLength: i } } = this, r = s || 0, l = this.getParsed(t), c = l._custom, d = Fn(c);
    let h = l[a.axis], f = 0, p = n ? this.applyStack(a, l, n) : h, g, b;
    p !== h && (f = p - h, p = h), d && (h = c.barStart, p = c.barEnd - c.barStart, h !== 0 && Mt(h) !== Mt(c.barEnd) && (f = 0), f += h);
    const y = !Le(s) && !d ? s : f;
    let v = a.getPixelForValue(y);
    if (this.chart.getDataVisibility(t) ? g = a.getPixelForValue(f + p) : g = v, b = g - v, Math.abs(b) < i) {
      b = Qc(b, a, r) * i, h === r && (v -= b / 2);
      const x = a.getPixelForDecimal(0), k = a.getPixelForDecimal(1), w = Math.min(x, k), $ = Math.max(x, k);
      v = Math.max(Math.min(v, $), w), g = v + b, n && !d && (l._stacks[a.axis]._visualValues[o] = a.getValueForPixel(g) - a.getValueForPixel(v));
    }
    if (v === a.getPixelForValue(r)) {
      const x = Mt(b) * a.getLineWidthForValue(r) / 2;
      v += x, b -= x;
    }
    return {
      size: b,
      base: v,
      head: g,
      center: g + b / 2
    };
  }
  _calculateBarIndexPixels(t, a) {
    const n = a.scale, o = this.options, s = o.skipNull, i = De(o.maxBarThickness, 1 / 0);
    let r, l;
    const c = this._getAxisCount();
    if (a.grouped) {
      const d = s ? this._getStackCount(t) : a.stackCount, h = o.barThickness === "flex" ? Gc(t, a, o, d * c) : Xc(t, a, o, d * c), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, p = this._getAxis().indexOf(De(f, this.getFirstScaleIdForIndexAxis())), g = this._getStackIndex(this.index, this._cachedMeta.stack, s ? t : void 0) + p;
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
function od(e, t, a) {
  let n = 1, o = 1, s = 0, i = 0;
  if (t < We) {
    const r = e, l = r + t, c = Math.cos(r), d = Math.sin(r), h = Math.cos(l), f = Math.sin(l), p = (k, w, $) => Ha(k, r, l, !0) ? 1 : Math.max(w, w * a, $, $ * a), g = (k, w, $) => Ha(k, r, l, !0) ? -1 : Math.min(w, w * a, $, $ * a), b = p(0, c, h), y = p(Xe, d, f), v = g(Pe, c, h), x = g(Pe + Xe, d, f);
    n = (b - v) / 2, o = (y - x) / 2, s = -(b + v) / 2, i = -(y + x) / 2;
  }
  return {
    ratioX: n,
    ratioY: o,
    offsetX: s,
    offsetY: i
  };
}
class sd extends $n {
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
    return Rt(this.options.rotation - 90);
  }
  _getCircumference() {
    return Rt(this.options.circumference);
  }
  _getRotationExtents() {
    let t = We, a = -We;
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
    const a = this.chart, { chartArea: n } = a, o = this._cachedMeta, s = o.data, i = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, r = Math.max((Math.min(n.width, n.height) - i) / 2, 0), l = Math.min(ll(this.options.cutout, r), 1), c = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: p, offsetX: g, offsetY: b } = od(h, d, l), y = (n.width - i) / f, v = (n.height - i) / p, x = Math.max(Math.min(y, v) / 2, 0), k = mi(this.options.radius, x), w = Math.max(k * l, 0), $ = (k - w) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * k, this.offsetY = b * k, o.total = this.calculateTotal(), this.outerRadius = k - $ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - $ * c, 0), this.updateElements(s, 0, s.length, t);
  }
  _circumference(t, a) {
    const n = this.options, o = this._cachedMeta, s = this._getCircumference();
    return a && n.animation.animateRotate || !this.chart.getDataVisibility(t) || o._parsed[t] === null || o.data[t].hidden ? 0 : this.calculateCircumference(o._parsed[t] * s / We);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", i = this.chart, r = i.chartArea, c = i.options.animation, d = (r.left + r.right) / 2, h = (r.top + r.bottom) / 2, f = s && c.animateScale, p = f ? 0 : this.innerRadius, g = f ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: y } = this._getSharedOptions(a, o);
    let v = this._getRotation(), x;
    for (x = 0; x < a; ++x)
      v += this._circumference(x, s);
    for (x = a; x < a + n; ++x) {
      const k = this._circumference(x, s), w = t[x], $ = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: v,
        endAngle: v + k,
        circumference: k,
        outerRadius: g,
        innerRadius: p
      };
      y && ($.options = b || this.resolveDataElementOptions(x, w.active ? "active" : o)), v += k, this.updateElement(w, x, $, o);
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
    return a > 0 && !isNaN(t) ? We * (Math.abs(t) / a) : 0;
  }
  getLabelAndValue(t) {
    const a = this._cachedMeta, n = this.chart, o = n.data.labels || [], s = fo(a._parsed[t], n.options.locale);
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
class id extends $n {
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
    let { start: r, count: l } = Dl(a, o, i);
    this._drawStart = r, this._drawCount = l, Al(a) && (r = 0, l = o.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!s._decimated, n.points = o;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
      animated: !i,
      options: c
    }, t), this.updateElements(o, r, l, t);
  }
  updateElements(t, a, n, o) {
    const s = o === "reset", { iScale: i, vScale: r, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(a, o), f = i.axis, p = r.axis, { spanGaps: g, segment: b } = this.options, y = ja(g) ? g : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || s || o === "none", x = a + n, k = t.length;
    let w = a > 0 && this.getParsed(a - 1);
    for (let $ = 0; $ < k; ++$) {
      const D = t[$], S = v ? D : {};
      if ($ < a || $ >= x) {
        S.skip = !0;
        continue;
      }
      const R = this.getParsed($), P = Le(R[p]), I = S[f] = i.getPixelForValue(R[f], $), M = S[p] = s || P ? r.getBasePixel() : r.getPixelForValue(l ? this.applyStack(r, R, l) : R[p], $);
      S.skip = isNaN(I) || isNaN(M) || P, S.stop = $ > 0 && Math.abs(R[f] - w[f]) > y, b && (S.parsed = R, S.raw = c.data[$]), h && (S.options = d || this.resolveDataElementOptions($, D.active ? "active" : o)), v || this.updateElement(D, $, S, o), w = R;
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
class rd extends sd {
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
class ko {
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
    Object.assign(ko.prototype, t);
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
var ld = {
  _date: ko
};
function cd(e, t, a, n) {
  const { controller: o, data: s, _sorted: i } = e, r = o._cachedMeta.iScale, l = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (r && t === r.axis && t !== "r" && i && s.length) {
    const c = r._reversePixels ? wl : ia;
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
        const { vScale: h } = o._cachedMeta, { _parsed: f } = e, p = f.slice(0, d.lo + 1).reverse().findIndex((b) => !Le(b[h.axis]));
        d.lo -= Math.max(0, p);
        const g = f.slice(d.hi).findIndex((b) => !Le(b[h.axis]));
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
    const { index: c, data: d } = s[r], { lo: h, hi: f } = cd(s[r], t, i, o);
    for (let p = h; p <= f; ++p) {
      const g = d[p];
      g.skip || n(g, c, p);
    }
  }
}
function dd(e) {
  const t = e.indexOf("x") !== -1, a = e.indexOf("y") !== -1;
  return function(n, o) {
    const s = t ? Math.abs(n.x - o.x) : 0, i = a ? Math.abs(n.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(i, 2));
  };
}
function On(e, t, a, n, o) {
  const s = [];
  return !o && !e.isPointInArea(t) || Sn(e, a, t, function(r, l, c) {
    !o && !Wa(r, e.chartArea, 0) || r.inRange(t.x, t.y, n) && s.push({
      element: r,
      datasetIndex: l,
      index: c
    });
  }, !0), s;
}
function ud(e, t, a, n) {
  let o = [];
  function s(i, r, l) {
    const { startAngle: c, endAngle: d } = i.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: h } = vi(i, {
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
function hd(e, t, a, n, o, s) {
  let i = [];
  const r = dd(a);
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
function Vn(e, t, a, n, o, s) {
  return !s && !e.isPointInArea(t) ? [] : a === "r" && !n ? ud(e, t, a, o) : hd(e, t, a, n, o, s);
}
function ds(e, t, a, n, o) {
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
var fd = {
  modes: {
    index(e, t, a, n) {
      const o = oa(t, e), s = a.axis || "x", i = a.includeInvisible || !1, r = a.intersect ? On(e, o, s, n, i) : Vn(e, o, s, !1, n, i), l = [];
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
      let r = a.intersect ? On(e, o, s, n, i) : Vn(e, o, s, !1, n, i);
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
      return On(e, o, s, n, i);
    },
    nearest(e, t, a, n) {
      const o = oa(t, e), s = a.axis || "xy", i = a.includeInvisible || !1;
      return Vn(e, o, s, a.intersect, n, i);
    },
    x(e, t, a, n) {
      const o = oa(t, e);
      return ds(e, o, "x", a.intersect, n);
    },
    y(e, t, a, n) {
      const o = oa(t, e);
      return ds(e, o, "y", a.intersect, n);
    }
  }
};
const Fi = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ca(e, t) {
  return e.filter((a) => a.pos === t);
}
function us(e, t) {
  return e.filter((a) => Fi.indexOf(a.pos) === -1 && a.box.axis === t);
}
function $a(e, t) {
  return e.sort((a, n) => {
    const o = t ? n : a, s = t ? a : n;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function gd(e) {
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
function md(e) {
  const t = {};
  for (const a of e) {
    const { stack: n, pos: o, stackWeight: s } = a;
    if (!n || !Fi.includes(o))
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
function pd(e, t) {
  const a = md(e), { vBoxMaxWidth: n, hBoxMaxHeight: o } = t;
  let s, i, r;
  for (s = 0, i = e.length; s < i; ++s) {
    r = e[s];
    const { fullSize: l } = r.box, c = a[r.stack], d = c && r.stackWeight / c.weight;
    r.horizontal ? (r.width = d ? d * n : l && t.availableWidth, r.height = o) : (r.width = n, r.height = d ? d * o : l && t.availableHeight);
  }
  return a;
}
function bd(e) {
  const t = gd(e), a = $a(t.filter((c) => c.box.fullSize), !0), n = $a(Ca(t, "left"), !0), o = $a(Ca(t, "right")), s = $a(Ca(t, "top"), !0), i = $a(Ca(t, "bottom")), r = us(t, "x"), l = us(t, "y");
  return {
    fullSize: a,
    leftAndTop: n.concat(s),
    rightAndBottom: o.concat(l).concat(i).concat(r),
    chartArea: Ca(t, "chartArea"),
    vertical: n.concat(o).concat(l),
    horizontal: s.concat(i).concat(r)
  };
}
function hs(e, t, a, n) {
  return Math.max(e[a], t[a]) + Math.max(e[n], t[n]);
}
function Oi(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function vd(e, t, a, n) {
  const { pos: o, box: s } = a, i = e.maxPadding;
  if (!Te(o)) {
    a.size && (e[o] -= a.size);
    const h = n[a.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, a.horizontal ? s.height : s.width), a.size = h.size / h.count, e[o] += a.size;
  }
  s.getPadding && Oi(i, s.getPadding());
  const r = Math.max(0, t.outerWidth - hs(i, e, "left", "right")), l = Math.max(0, t.outerHeight - hs(i, e, "top", "bottom")), c = r !== e.w, d = l !== e.h;
  return e.w = r, e.h = l, a.horizontal ? {
    same: c,
    other: d
  } : {
    same: d,
    other: c
  };
}
function yd(e) {
  const t = e.maxPadding;
  function a(n) {
    const o = Math.max(t[n] - e[n], 0);
    return e[n] += o, o;
  }
  e.y += a("top"), e.x += a("left"), a("right"), a("bottom");
}
function xd(e, t) {
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
    r = e[s], l = r.box, l.update(r.width || t.w, r.height || t.h, xd(r.horizontal, t));
    const { same: h, other: f } = vd(t, a, r, n);
    c |= h && o.length, d = d || f, l.fullSize || o.push(r);
  }
  return c && La(o, t, a, n) || d;
}
function sn(e, t, a, n, o) {
  e.top = a, e.left = t, e.right = t + n, e.bottom = a + o, e.width = n, e.height = o;
}
function fs(e, t, a, n) {
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
var mt = {
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
    const o = bt(e.options.layout.padding), s = Math.max(t - o.width, 0), i = Math.max(a - o.height, 0), r = bd(e.boxes), l = r.vertical, c = r.horizontal;
    Re(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const d = l.reduce((b, y) => y.box.options && y.box.options.display === !1 ? b : b + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: a,
      padding: o,
      availableWidth: s,
      availableHeight: i,
      vBoxMaxWidth: s / 2 / d,
      hBoxMaxHeight: i / 2
    }), f = Object.assign({}, o);
    Oi(f, bt(n));
    const p = Object.assign({
      maxPadding: f,
      w: s,
      h: i,
      x: o.left,
      y: o.top
    }, o), g = pd(l.concat(c), h);
    La(r.fullSize, p, h, g), La(l, p, h, g), La(c, p, h, g) && La(l, p, h, g), yd(p), fs(r.leftAndTop, p, h, g), p.x += p.w, p.y += p.h, fs(r.rightAndBottom, p, h, g), e.chartArea = {
      left: p.left,
      top: p.top,
      right: p.left + p.w,
      bottom: p.top + p.h,
      height: p.h,
      width: p.w
    }, Re(r.chartArea, (b) => {
      const y = b.box;
      Object.assign(y, e.chartArea), y.update(p.w, p.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Vi {
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
class _d extends Vi {
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
}, gs = (e) => e === null || e === "";
function wd(e, t) {
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
  }, a.display = a.display || "block", a.boxSizing = a.boxSizing || "border-box", gs(o)) {
    const s = Zo(e, "width");
    s !== void 0 && (e.width = s);
  }
  if (gs(n))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const s = Zo(e, "height");
      s !== void 0 && (e.height = s);
    }
  return e;
}
const zi = vc ? {
  passive: !0
} : !1;
function Cd(e, t, a) {
  e && e.addEventListener(t, a, zi);
}
function $d(e, t, a) {
  e && e.canvas && e.canvas.removeEventListener(t, a, zi);
}
function Sd(e, t) {
  const a = kd[e.type] || e.type, { x: n, y: o } = oa(e, t);
  return {
    type: a,
    chart: t,
    native: e,
    x: n !== void 0 ? n : null,
    y: o !== void 0 ? o : null
  };
}
function _n(e, t) {
  for (const a of e)
    if (a === t || a.contains(t))
      return !0;
}
function Md(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || _n(r.addedNodes, n), i = i && !_n(r.removedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Dd(e, t, a) {
  const n = e.canvas, o = new MutationObserver((s) => {
    let i = !1;
    for (const r of s)
      i = i || _n(r.removedNodes, n), i = i && !_n(r.addedNodes, n);
    i && a();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Ya = /* @__PURE__ */ new Map();
let ms = 0;
function Ni() {
  const e = window.devicePixelRatio;
  e !== ms && (ms = e, Ya.forEach((t, a) => {
    a.currentDevicePixelRatio !== e && t();
  }));
}
function Ad(e, t) {
  Ya.size || window.addEventListener("resize", Ni), Ya.set(e, t);
}
function Td(e) {
  Ya.delete(e), Ya.size || window.removeEventListener("resize", Ni);
}
function Bd(e, t, a) {
  const n = e.canvas, o = n && _o(n);
  if (!o)
    return;
  const s = ki((r, l) => {
    const c = o.clientWidth;
    a(r, l), c < o.clientWidth && a();
  }, window), i = new ResizeObserver((r) => {
    const l = r[0], c = l.contentRect.width, d = l.contentRect.height;
    c === 0 && d === 0 || s(c, d);
  });
  return i.observe(o), Ad(e, s), i;
}
function zn(e, t, a) {
  a && a.disconnect(), t === "resize" && Td(e);
}
function Ld(e, t, a) {
  const n = e.canvas, o = ki((s) => {
    e.ctx !== null && a(Sd(s, e));
  }, e);
  return Cd(n, t, o), o;
}
class Ed extends Vi {
  acquireContext(t, a) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (wd(t, a), n) : null;
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
      attach: Md,
      detach: Dd,
      resize: Bd
    }[a] || Ld;
    o[a] = i(t, a, n);
  }
  removeEventListener(t, a) {
    const n = t.$proxies || (t.$proxies = {}), o = n[a];
    if (!o)
      return;
    ({
      attach: zn,
      detach: zn,
      resize: zn
    }[a] || $d)(t, a, o), n[a] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, a, n, o) {
    return bc(t, a, n, o);
  }
  isAttached(t) {
    const a = t && _o(t);
    return !!(a && a.isConnected);
  }
}
function Rd(e) {
  return !xo() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? _d : Ed;
}
let It = class {
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
function Pd(e, t) {
  const a = e.options.ticks, n = Id(e), o = Math.min(a.maxTicksLimit || n, n), s = a.major.enabled ? Od(t) : [], i = s.length, r = s[0], l = s[i - 1], c = [];
  if (i > o)
    return Vd(t, c, s, i / o), c;
  const d = Fd(s, t, o);
  if (i > 0) {
    let h, f;
    const p = i > 1 ? Math.round((l - r) / (i - 1)) : null;
    for (rn(t, c, d, Le(p) ? 0 : r - p, r), h = 0, f = i - 1; h < f; h++)
      rn(t, c, d, s[h], s[h + 1]);
    return rn(t, c, d, l, Le(p) ? t.length : l + p), c;
  }
  return rn(t, c, d), c;
}
function Id(e) {
  const t = e.options.offset, a = e._tickSize(), n = e._length / a + (t ? 0 : 1), o = e._maxLength / a;
  return Math.floor(Math.min(n, o));
}
function Fd(e, t, a) {
  const n = zd(e), o = t.length / a;
  if (!n)
    return Math.max(o, 1);
  const s = pl(n);
  for (let i = 0, r = s.length - 1; i < r; i++) {
    const l = s[i];
    if (l > o)
      return l;
  }
  return Math.max(o, 1);
}
function Od(e) {
  const t = [];
  let a, n;
  for (a = 0, n = e.length; a < n; a++)
    e[a].major && t.push(a);
  return t;
}
function Vd(e, t, a, n) {
  let o = 0, s = a[0], i;
  for (n = Math.ceil(n), i = 0; i < e.length; i++)
    i === s && (t.push(e[i]), o++, s = a[o * n]);
}
function rn(e, t, a, n, o) {
  const s = De(n, 0), i = Math.min(De(o, e.length), e.length);
  let r = 0, l, c, d;
  for (a = Math.ceil(a), o && (l = o - n, a = l / Math.floor(l / a)), d = s; d < 0; )
    r++, d = Math.round(s + r * a);
  for (c = Math.max(s, 0); c < i; c++)
    c === d && (t.push(e[c]), r++, d = Math.round(s + r * a));
}
function zd(e) {
  const t = e.length;
  let a, n;
  if (t < 2)
    return !1;
  for (n = e[0], a = 1; a < t; ++a)
    if (e[a] - e[a - 1] !== n)
      return !1;
  return n;
}
const Nd = (e) => e === "left" ? "right" : e === "right" ? "left" : e, ps = (e, t, a) => t === "top" || t === "left" ? e[t] + a : e[t] - a, bs = (e, t) => Math.min(t || e, e);
function vs(e, t) {
  const a = [], n = e.length / t, o = e.length;
  let s = 0;
  for (; s < o; s += n)
    a.push(e[Math.floor(s)]);
  return a;
}
function jd(e, t, a) {
  const n = e.ticks.length, o = Math.min(t, n - 1), s = e._startPixel, i = e._endPixel, r = 1e-6;
  let l = e.getPixelForTick(o), c;
  if (!(a && (n === 1 ? c = Math.max(l - s, i - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(o - 1)) / 2, l += o < t ? c : -c, l < s - r || l > i + r)))
    return l;
}
function Hd(e, t) {
  Re(e, (a) => {
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
function ys(e, t) {
  if (!e.display)
    return 0;
  const a = tt(e.font, t), n = bt(e.padding);
  return (qe(e.text) ? e.text.length : 1) * a.lineHeight + n.height;
}
function Wd(e, t) {
  return ua(e, {
    scale: t,
    type: "scale"
  });
}
function Kd(e, t, a) {
  return ua(e, {
    tick: a,
    index: t,
    type: "tick"
  });
}
function Yd(e, t, a) {
  let n = uo(e);
  return (a && t !== "right" || !a && t === "right") && (n = Nd(n)), n;
}
function Ud(e, t, a, n) {
  const { top: o, left: s, bottom: i, right: r, chart: l } = e, { chartArea: c, scales: d } = l;
  let h = 0, f, p, g;
  const b = i - o, y = r - s;
  if (e.isHorizontal()) {
    if (p = Qe(n, s, r), Te(a)) {
      const v = Object.keys(a)[0], x = a[v];
      g = d[v].getPixelForValue(x) + b - t;
    } else a === "center" ? g = (c.bottom + c.top) / 2 + b - t : g = ps(e, a, t);
    f = r - s;
  } else {
    if (Te(a)) {
      const v = Object.keys(a)[0], x = a[v];
      p = d[v].getPixelForValue(x) - y + t;
    } else a === "center" ? p = (c.left + c.right) / 2 - y + t : p = ps(e, a, t);
    g = Qe(n, i, o), h = a === "left" ? -Xe : Xe;
  }
  return {
    titleX: p,
    titleY: g,
    maxWidth: f,
    rotation: h
  };
}
class _a extends It {
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
    return t = wt(t, Number.POSITIVE_INFINITY), a = wt(a, Number.NEGATIVE_INFINITY), n = wt(n, Number.POSITIVE_INFINITY), o = wt(o, Number.NEGATIVE_INFINITY), {
      min: wt(t, n),
      max: wt(a, o),
      minDefined: pt(t),
      maxDefined: pt(a)
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
      min: wt(a, wt(n, a)),
      max: wt(n, wt(a, n))
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
    Fe(this.options.beforeUpdate, [
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
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Xl(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = r < this.ticks.length;
    this._convertTicksToLabels(l ? vs(this.ticks, r) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), i.display && (i.autoSkip || i.source === "auto") && (this.ticks = Pd(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, a, n;
    this.isHorizontal() ? (a = this.left, n = this.right) : (a = this.top, n = this.bottom, t = !t), this._startPixel = a, this._endPixel = n, this._reversePixels = t, this._length = n - a, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Fe(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Fe(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Fe(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Fe(this.options[t], [
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
    Fe(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const a = this.options.ticks;
    let n, o, s;
    for (n = 0, o = t.length; n < o; n++)
      s = t[n], s.label = Fe(a.callback, [
        s.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Fe(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Fe(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, a = t.ticks, n = bs(this.ticks.length, t.ticks.maxTicksLimit), o = a.minRotation || 0, s = a.maxRotation;
    let i = o, r, l, c;
    if (!this._isVisible() || !a.display || o >= s || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, f = d.highest.height, p = et(this.chart.width - h, 0, this.maxWidth);
    r = t.offset ? this.maxWidth / n : p / (n - 1), h + 6 > r && (r = p / (n - (t.offset ? 0.5 : 1)), l = this.maxHeight - Sa(t.grid) - a.padding - ys(t.title, this.chart.options.font), c = Math.sqrt(h * h + f * f), i = xl(Math.min(Math.asin(et((d.highest.height + 6) / r, -1, 1)), Math.asin(et(l / c, -1, 1)) - Math.asin(et(f / c, -1, 1)))), i = Math.max(o, Math.min(s, i))), this.labelRotation = i;
  }
  afterCalculateLabelRotation() {
    Fe(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Fe(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: a, options: { ticks: n, title: o, grid: s } } = this, i = this._isVisible(), r = this.isHorizontal();
    if (i) {
      const l = ys(o, a.options.font);
      if (r ? (t.width = this.maxWidth, t.height = Sa(s) + l) : (t.height = this.maxHeight, t.width = Sa(s) + l), n.display && this.ticks.length) {
        const { first: c, last: d, widest: h, highest: f } = this._getLabelSizes(), p = n.padding * 2, g = Rt(this.labelRotation), b = Math.cos(g), y = Math.sin(g);
        if (r) {
          const v = n.mirror ? 0 : y * h.width + b * f.height;
          t.height = Math.min(this.maxHeight, t.height + v + p);
        } else {
          const v = n.mirror ? 0 : b * h.width + y * f.height;
          t.width = Math.min(this.maxWidth, t.width + v + p);
        }
        this._calculatePadding(c, d, y, b);
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
    Fe(this.options.afterFit, [
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
      a < n.length && (n = vs(n, a)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, a, n) {
    const { ctx: o, _longestTextCache: s } = this, i = [], r = [], l = Math.floor(a / bs(a, n));
    let c = 0, d = 0, h, f, p, g, b, y, v, x, k, w, $;
    for (h = 0; h < a; h += l) {
      if (g = t[h].label, b = this._resolveTickFontOptions(h), o.font = y = b.string, v = s[y] = s[y] || {
        data: {},
        gc: []
      }, x = b.lineHeight, k = w = 0, !Le(g) && !qe(g))
        k = Yo(o, v.data, v.gc, k, g), w = x;
      else if (qe(g))
        for (f = 0, p = g.length; f < p; ++f)
          $ = g[f], !Le($) && !qe($) && (k = Yo(o, v.data, v.gc, k, $), w += x);
      i.push(k), r.push(w), c = Math.max(k, c), d = Math.max(w, d);
    }
    Hd(s, a);
    const D = i.indexOf(c), S = r.indexOf(d), R = (P) => ({
      width: i[P] || 0,
      height: r[P] || 0
    });
    return {
      first: R(0),
      last: R(a - 1),
      widest: R(D),
      highest: R(S),
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
      return n.$context || (n.$context = Kd(this.getContext(), t, n));
    }
    return this.$context || (this.$context = Wd(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, a = Rt(this.labelRotation), n = Math.abs(Math.cos(a)), o = Math.abs(Math.sin(a)), s = this._getLabelSizes(), i = t.autoSkipPadding || 0, r = s ? s.widest.width + i : 0, l = s ? s.highest.height + i : 0;
    return this.isHorizontal() ? l * n > r * o ? r / n : l / o : l * o < r * n ? l / n : r / o;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const a = this.axis, n = this.chart, o = this.options, { grid: s, position: i, border: r } = o, l = s.offset, c = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), f = Sa(s), p = [], g = r.setContext(this.getContext()), b = g.display ? g.width : 0, y = b / 2, v = function(q) {
      return ta(n, q, b);
    };
    let x, k, w, $, D, S, R, P, I, M, L, B;
    if (i === "top")
      x = v(this.bottom), S = this.bottom - f, P = x - y, M = v(t.top) + y, B = t.bottom;
    else if (i === "bottom")
      x = v(this.top), M = t.top, B = v(t.bottom) - y, S = x + y, P = this.top + f;
    else if (i === "left")
      x = v(this.right), D = this.right - f, R = x - y, I = v(t.left) + y, L = t.right;
    else if (i === "right")
      x = v(this.left), I = t.left, L = v(t.right) - y, D = x + y, R = this.left + f;
    else if (a === "x") {
      if (i === "center")
        x = v((t.top + t.bottom) / 2 + 0.5);
      else if (Te(i)) {
        const q = Object.keys(i)[0], ee = i[q];
        x = v(this.chart.scales[q].getPixelForValue(ee));
      }
      M = t.top, B = t.bottom, S = x + y, P = S + f;
    } else if (a === "y") {
      if (i === "center")
        x = v((t.left + t.right) / 2);
      else if (Te(i)) {
        const q = Object.keys(i)[0], ee = i[q];
        x = v(this.chart.scales[q].getPixelForValue(ee));
      }
      D = x - y, R = D - f, I = t.left, L = t.right;
    }
    const N = De(o.ticks.maxTicksLimit, h), W = Math.max(1, Math.ceil(h / N));
    for (k = 0; k < h; k += W) {
      const q = this.getContext(k), ee = s.setContext(q), X = r.setContext(q), le = ee.lineWidth, U = ee.color, T = X.dash || [], z = X.dashOffset, K = ee.tickWidth, de = ee.tickColor, ve = ee.tickBorderDash || [], Q = ee.tickBorderDashOffset;
      w = jd(this, k, l), w !== void 0 && ($ = ta(n, w, le), c ? D = R = I = L = $ : S = P = M = B = $, p.push({
        tx1: D,
        ty1: S,
        tx2: R,
        ty2: P,
        x1: I,
        y1: M,
        x2: L,
        y2: B,
        width: le,
        color: U,
        borderDash: T,
        borderDashOffset: z,
        tickWidth: K,
        tickColor: de,
        tickBorderDash: ve,
        tickBorderDashOffset: Q
      }));
    }
    return this._ticksLength = h, this._borderValue = x, p;
  }
  _computeLabelItems(t) {
    const a = this.axis, n = this.options, { position: o, ticks: s } = n, i = this.isHorizontal(), r = this.ticks, { align: l, crossAlign: c, padding: d, mirror: h } = s, f = Sa(n.grid), p = f + d, g = h ? -d : p, b = -Rt(this.labelRotation), y = [];
    let v, x, k, w, $, D, S, R, P, I, M, L, B = "middle";
    if (o === "top")
      D = this.bottom - g, S = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      D = this.top + g, S = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const W = this._getYAxisLabelAlignment(f);
      S = W.textAlign, $ = W.x;
    } else if (o === "right") {
      const W = this._getYAxisLabelAlignment(f);
      S = W.textAlign, $ = W.x;
    } else if (a === "x") {
      if (o === "center")
        D = (t.top + t.bottom) / 2 + p;
      else if (Te(o)) {
        const W = Object.keys(o)[0], q = o[W];
        D = this.chart.scales[W].getPixelForValue(q) + p;
      }
      S = this._getXAxisLabelAlignment();
    } else if (a === "y") {
      if (o === "center")
        $ = (t.left + t.right) / 2 - p;
      else if (Te(o)) {
        const W = Object.keys(o)[0], q = o[W];
        $ = this.chart.scales[W].getPixelForValue(q);
      }
      S = this._getYAxisLabelAlignment(f).textAlign;
    }
    a === "y" && (l === "start" ? B = "top" : l === "end" && (B = "bottom"));
    const N = this._getLabelSizes();
    for (v = 0, x = r.length; v < x; ++v) {
      k = r[v], w = k.label;
      const W = s.setContext(this.getContext(v));
      R = this.getPixelForTick(v) + s.labelOffset, P = this._resolveTickFontOptions(v), I = P.lineHeight, M = qe(w) ? w.length : 1;
      const q = M / 2, ee = W.color, X = W.textStrokeColor, le = W.textStrokeWidth;
      let U = S;
      i ? ($ = R, S === "inner" && (v === x - 1 ? U = this.options.reverse ? "left" : "right" : v === 0 ? U = this.options.reverse ? "right" : "left" : U = "center"), o === "top" ? c === "near" || b !== 0 ? L = -M * I + I / 2 : c === "center" ? L = -N.highest.height / 2 - q * I + I : L = -N.highest.height + I / 2 : c === "near" || b !== 0 ? L = I / 2 : c === "center" ? L = N.highest.height / 2 - q * I : L = N.highest.height - M * I, h && (L *= -1), b !== 0 && !W.showLabelBackdrop && ($ += I / 2 * Math.sin(b))) : (D = R, L = (1 - M) * I / 2);
      let T;
      if (W.showLabelBackdrop) {
        const z = bt(W.backdropPadding), K = N.heights[v], de = N.widths[v];
        let ve = L - z.top, Q = 0 - z.left;
        switch (B) {
          case "middle":
            ve -= K / 2;
            break;
          case "bottom":
            ve -= K;
            break;
        }
        switch (S) {
          case "center":
            Q -= de / 2;
            break;
          case "right":
            Q -= de;
            break;
          case "inner":
            v === x - 1 ? Q -= de : v > 0 && (Q -= de / 2);
            break;
        }
        T = {
          left: Q,
          top: ve,
          width: de + z.width,
          height: K + z.height,
          color: W.backdropColor
        };
      }
      y.push({
        label: w,
        font: P,
        textOffset: L,
        options: {
          rotation: b,
          color: ee,
          strokeColor: X,
          strokeWidth: le,
          textAlign: U,
          textBaseline: B,
          translation: [
            $,
            D
          ],
          backdrop: T
        }
      });
    }
    return y;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: a } = this.options;
    if (-Rt(this.labelRotation))
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
    o && go(n, o);
    const s = this.getLabelItems(t);
    for (const i of s) {
      const r = i.options, l = i.font, c = i.label, d = i.textOffset;
      Ka(n, c, 0, d, l, r);
    }
    o && mo(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: a, title: n, reverse: o } } = this;
    if (!n.display)
      return;
    const s = tt(n.font), i = bt(n.padding), r = n.align;
    let l = s.lineHeight / 2;
    a === "bottom" || a === "center" || Te(a) ? (l += i.bottom, qe(n.text) && (l += s.lineHeight * (n.text.length - 1))) : l += i.top;
    const { titleX: c, titleY: d, maxWidth: h, rotation: f } = Ud(this, l, a, r);
    Ka(t, n.text, 0, 0, s, {
      color: n.color,
      maxWidth: h,
      rotation: f,
      textAlign: Yd(r, a, o),
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
    return !this._isVisible() || this.draw !== _a.prototype.draw ? [
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
    Gd(a) && (n = this.register(a));
    const o = this.items, s = t.id, i = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + t);
    return s in o || (o[s] = t, qd(t, i, n), this.override && Ke.override(t.id, t.overrides)), i;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const a = this.items, n = t.id, o = this.scope;
    n in a && delete a[n], o && n in Ke[o] && (delete Ke[o][n], this.override && delete da[n]);
  }
}
function qd(e, t, a) {
  const n = za(/* @__PURE__ */ Object.create(null), [
    a ? Ke.get(a) : {},
    Ke.get(t),
    e.defaults
  ]);
  Ke.set(t, n), e.defaultRoutes && Xd(t, e.defaultRoutes), e.descriptors && Ke.describe(t, e.descriptors);
}
function Xd(e, t) {
  Object.keys(t).forEach((a) => {
    const n = a.split("."), o = n.pop(), s = [
      e
    ].concat(n).join("."), i = t[a].split("."), r = i.pop(), l = i.join(".");
    Ke.route(s, o, l, r);
  });
}
function Gd(e) {
  return "id" in e && "defaults" in e;
}
class Zd {
  constructor() {
    this.controllers = new ln($n, "datasets", !0), this.elements = new ln(It, "elements"), this.plugins = new ln(Object, "plugins"), this.scales = new ln(_a, "scales"), this._typedRegistries = [
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
      n || s.isForType(o) || s === this.plugins && o.id ? this._exec(t, s, o) : Re(o, (i) => {
        const r = n || this._getRegistryForType(i);
        this._exec(t, r, i);
      });
    });
  }
  _exec(t, a, n) {
    const o = lo(t);
    Fe(n["before" + o], [], n), a[t](n), Fe(n["after" + o], [], n);
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
var $t = /* @__PURE__ */ new Zd();
class Qd {
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
      if (Fe(r, l, i) === !1 && o.cancelable)
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
    const n = t && t.config, o = De(n.options && n.options.plugins, {}), s = Jd(n);
    return o === !1 && !a ? [] : tu(t, s, o, a);
  }
  _notifyStateChanges(t) {
    const a = this._oldCache || [], n = this._cache, o = (s, i) => s.filter((r) => !i.some((l) => r.plugin.id === l.plugin.id));
    this._notify(o(a, n), t, "stop"), this._notify(o(n, a), t, "start");
  }
}
function Jd(e) {
  const t = {}, a = [], n = Object.keys($t.plugins.items);
  for (let s = 0; s < n.length; s++)
    a.push($t.getPlugin(n[s]));
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
function eu(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function tu(e, { plugins: t, localIds: a }, n, o) {
  const s = [], i = e.getContext();
  for (const r of t) {
    const l = r.id, c = eu(n[l], o);
    c !== null && s.push({
      plugin: r,
      options: au(e.config, {
        plugin: r,
        local: a[l]
      }, c, i)
    });
  }
  return s;
}
function au(e, { plugin: t, local: a }, n, o) {
  const s = e.pluginScopeKeys(t), i = e.getOptionScopes(n, s);
  return a && t.defaults && i.push(t.defaults), e.createResolver(i, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Qn(e, t) {
  const a = Ke.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || a.indexAxis || "x";
}
function nu(e, t) {
  let a = e;
  return e === "_index_" ? a = t : e === "_value_" && (a = t === "x" ? "y" : "x"), a;
}
function ou(e, t) {
  return e === t ? "_index_" : "_value_";
}
function xs(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function su(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Jn(e, ...t) {
  if (xs(e))
    return e;
  for (const a of t) {
    const n = a.axis || su(a.position) || e.length > 1 && xs(e[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function _s(e, t, a) {
  if (a[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function iu(e, t) {
  if (t.data && t.data.datasets) {
    const a = t.data.datasets.filter((n) => n.xAxisID === e || n.yAxisID === e);
    if (a.length)
      return _s(e, "x", a[0]) || _s(e, "y", a[0]);
  }
  return {};
}
function ru(e, t) {
  const a = da[e.type] || {
    scales: {}
  }, n = t.scales || {}, o = Qn(e.type, t), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((i) => {
    const r = n[i];
    if (!Te(r))
      return console.error(`Invalid scale configuration for scale: ${i}`);
    if (r._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${i}`);
    const l = Jn(i, r, iu(i, e), Ke.scales[r.type]), c = ou(l, o), d = a.scales || {};
    s[i] = Ra(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      r,
      d[l],
      d[c]
    ]);
  }), e.data.datasets.forEach((i) => {
    const r = i.type || e.type, l = i.indexAxis || Qn(r, t), d = (da[r] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const f = nu(h, l), p = i[f + "AxisID"] || f;
      s[p] = s[p] || /* @__PURE__ */ Object.create(null), Ra(s[p], [
        {
          axis: f
        },
        n[p],
        d[h]
      ]);
    });
  }), Object.keys(s).forEach((i) => {
    const r = s[i];
    Ra(r, [
      Ke.scales[r.type],
      Ke.scale
    ]);
  }), s;
}
function ji(e) {
  const t = e.options || (e.options = {});
  t.plugins = De(t.plugins, {}), t.scales = ru(e, t);
}
function Hi(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function lu(e) {
  return e = e || {}, e.data = Hi(e.data), ji(e), e;
}
const ks = /* @__PURE__ */ new Map(), Wi = /* @__PURE__ */ new Set();
function cn(e, t) {
  let a = ks.get(e);
  return a || (a = t(), ks.set(e, a), Wi.add(a)), a;
}
const Ma = (e, t, a) => {
  const n = ca(t, a);
  n !== void 0 && e.add(n);
};
class cu {
  constructor(t) {
    this._config = lu(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Hi(t);
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
    this.clearCache(), ji(t);
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
      t && (l.add(t), d.forEach((h) => Ma(l, t, h))), d.forEach((h) => Ma(l, o, h)), d.forEach((h) => Ma(l, da[s] || {}, h)), d.forEach((h) => Ma(l, Ke, h)), d.forEach((h) => Ma(l, Gn, h));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), Wi.has(a) && i.set(a, c), c;
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
      Gn
    ];
  }
  resolveNamedOptions(t, a, n, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: i, subPrefixes: r } = ws(this._resolverCache, t, o);
    let l = i;
    if (uu(i, a)) {
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
    const { resolver: s } = ws(this._resolverCache, t, n);
    return Te(a) ? ya(s, a, void 0, o) : s;
  }
}
function ws(e, t, a) {
  let n = e.get(t);
  n || (n = /* @__PURE__ */ new Map(), e.set(t, n));
  const o = a.join();
  let s = n.get(o);
  return s || (s = {
    resolver: bo(t, a),
    subPrefixes: a.filter((r) => !r.toLowerCase().includes("hover"))
  }, n.set(o, s)), s;
}
const du = (e) => Te(e) && Object.getOwnPropertyNames(e).some((t) => qt(e[t]));
function uu(e, t) {
  const { isScriptable: a, isIndexable: n } = Si(e);
  for (const o of t) {
    const s = a(o), i = n(o), r = (i || s) && e[o];
    if (s && (qt(r) || du(r)) || i && qe(r))
      return !0;
  }
  return !1;
}
var hu = "4.5.1";
const fu = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Cs(e, t) {
  return e === "top" || e === "bottom" || fu.indexOf(e) === -1 && t === "x";
}
function $s(e, t) {
  return function(a, n) {
    return a[e] === n[e] ? a[t] - n[t] : a[e] - n[e];
  };
}
function Ss(e) {
  const t = e.chart, a = t.options.animation;
  t.notifyPlugins("afterRender"), Fe(a && a.onComplete, [
    e
  ], t);
}
function gu(e) {
  const t = e.chart, a = t.options.animation;
  Fe(a && a.onProgress, [
    e
  ], t);
}
function Ki(e) {
  return xo() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const mn = {}, Ms = (e) => {
  const t = Ki(e);
  return Object.values(mn).filter((a) => a.canvas === t).pop();
};
function mu(e, t, a) {
  const n = Object.keys(e);
  for (const o of n) {
    const s = +o;
    if (s >= t) {
      const i = e[o];
      delete e[o], (a > 0 || s > t) && (e[s + a] = i);
    }
  }
}
function pu(e, t, a, n) {
  return !a || e.type === "mouseout" ? null : n ? t : e;
}
let Xt = class {
  static defaults = Ke;
  static instances = mn;
  static overrides = da;
  static registry = $t;
  static version = hu;
  static getChart = Ms;
  static register(...t) {
    $t.add(...t), Ds();
  }
  static unregister(...t) {
    $t.remove(...t), Ds();
  }
  constructor(t, a) {
    const n = this.config = new cu(a), o = Ki(t), s = Ms(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const i = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Rd(o))(), this.platform.updateConfig(n);
    const r = this.platform.acquireContext(o, i.aspectRatio), l = r && r.canvas, c = l && l.height, d = l && l.width;
    if (this.id = rl(), this.ctx = r, this.canvas = l, this.width = d, this.height = c, this._options = i, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Qd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Sl((h) => this.update(h), i.resizeDelay || 0), this._dataChanges = [], mn[this.id] = this, !r || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Bt.listen(this, "complete", Ss), Bt.listen(this, "progress", gu), this._initialize(), this.attached && this.update();
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
    return $t;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Go(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Uo(this.canvas, this.ctx), this;
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
    this.width = i.width, this.height = i.height, this._aspectRatio = this.aspectRatio, Go(this, r, !0) && (this.notifyPlugins("resize", {
      size: i
    }), Fe(n.onResize, [
      this,
      i
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const a = this.options.scales || {};
    Re(a, (n, o) => {
      n.id = o;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, a = t.scales, n = this.scales, o = Object.keys(n).reduce((i, r) => (i[r] = !1, i), {});
    let s = [];
    a && (s = s.concat(Object.keys(a).map((i) => {
      const r = a[i], l = Jn(i, r), c = l === "r", d = l === "x";
      return {
        options: r,
        dposition: c ? "chartArea" : d ? "bottom" : "left",
        dtype: c ? "radialLinear" : d ? "category" : "linear"
      };
    }))), Re(s, (i) => {
      const r = i.options, l = r.id, c = Jn(l, r), d = De(r.type, i.dtype);
      (r.position === void 0 || Cs(r.position, c) !== Cs(i.dposition)) && (r.position = i.dposition), o[l] = !0;
      let h = null;
      if (l in n && n[l].type === d)
        h = n[l];
      else {
        const f = $t.getScale(d);
        h = new f({
          id: l,
          type: d,
          ctx: this.ctx,
          chart: this
        }), n[h.id] = h;
      }
      h.init(r, t);
    }), Re(o, (i, r) => {
      i || delete n[r];
    }), Re(n, (i) => {
      mt.configure(this, i, i.options), mt.addBox(this, i);
    });
  }
  _updateMetasets() {
    const t = this._metasets, a = this.data.datasets.length, n = t.length;
    if (t.sort((o, s) => o.index - s.index), n > a) {
      for (let o = a; o < n; ++o)
        this._destroyDatasetMeta(o);
      t.splice(a, n - a);
    }
    this._sortedMetasets = t.slice(0).sort($s("order", "index"));
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
      if (i.type && i.type !== r && (this._destroyDatasetMeta(n), i = this.getDatasetMeta(n)), i.type = r, i.indexAxis = s.indexAxis || Qn(r, this.options), i.order = s.order || 0, i.index = n, i.label = "" + s.label, i.visible = this.isDatasetVisible(n), i.controller)
        i.controller.updateIndex(n), i.controller.linkScales();
      else {
        const l = $t.getController(r), { datasetElementType: c, dataElementType: d } = Ke.datasets[r];
        Object.assign(l, {
          dataElementType: $t.getElement(d),
          datasetElementType: c && $t.getElement(c)
        }), i.controller = new l(this, n), t.push(i.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    Re(this.data.datasets, (t, a) => {
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
    i = this._minPadding = n.layout.autoPadding ? i : 0, this._updateLayout(i), o || Re(s, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort($s("z", "_idx"));
    const { _active: r, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : r.length && this._updateHoverStyles(r, r, !0), this.render();
  }
  _updateScales() {
    Re(this.scales, (t) => {
      mt.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, a = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Fo(a, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, a = this._getUniformDataChanges() || [];
    for (const { method: n, start: o, count: s } of a) {
      const i = n === "_removeElements" ? -s : s;
      mu(t, o, i);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const a = this.data.datasets.length, n = (s) => new Set(t.filter((i) => i[0] === s).map((i, r) => r + "," + i.splice(1).join(","))), o = n(0);
    for (let s = 1; s < a; s++)
      if (!Fo(o, n(s)))
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
    mt.update(this, this.width, this.height, t);
    const a = this.chartArea, n = a.width <= 0 || a.height <= 0;
    this._layers = [], Re(this.boxes, (o) => {
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
    }) !== !1 && (Bt.has(this) ? this.attached && !Bt.running(this) && Bt.start(this) : (this.draw(), Ss({
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
    }, o = Lc(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (o && go(a, o), t.controller.draw(), o && mo(a), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Wa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, a, n, o) {
    const s = fd.modes[a];
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
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Uo(t, a), this.platform.releaseContext(a), this.canvas = null, this.ctx = null), delete mn[this.id], this.notifyPlugins("afterDestroy");
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
    Re(this.options.events, (s) => n(s, o));
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
    Re(this._listeners, (t, a) => {
      this.platform.removeEventListener(this, a, t);
    }), this._listeners = {}, Re(this._responsiveListeners, (t, a) => {
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
    const { _active: o = [], options: s } = this, i = a, r = this._getActiveElements(t, o, n, i), l = fl(t), c = pu(t, this._lastEvent, n, l);
    n && (this._lastEvent = null, Fe(s.onHover, [
      t,
      r,
      this
    ], this), l && Fe(s.onClick, [
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
function Ds() {
  return Re(Xt.instances, (e) => e._plugins.invalidate());
}
function bu(e, t, a) {
  const { startAngle: n, x: o, y: s, outerRadius: i, innerRadius: r, options: l } = t, { borderWidth: c, borderJoinStyle: d } = l, h = Math.min(c / i, yt(n - a));
  if (e.beginPath(), e.arc(o, s, i - c / 2, n + h / 2, a - h / 2), r > 0) {
    const f = Math.min(c / r, yt(n - a));
    e.arc(o, s, r + c / 2, a - f / 2, n + f / 2, !0);
  } else {
    const f = Math.min(c / 2, i * yt(n - a));
    if (d === "round")
      e.arc(o, s, f, a - Pe / 2, n + Pe / 2, !0);
    else if (d === "bevel") {
      const p = 2 * f * f, g = -p * Math.cos(a + Pe / 2) + o, b = -p * Math.sin(a + Pe / 2) + s, y = p * Math.cos(n + Pe / 2) + o, v = p * Math.sin(n + Pe / 2) + s;
      e.lineTo(g, b), e.lineTo(y, v);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function vu(e, t, a) {
  const { startAngle: n, pixelMargin: o, x: s, y: i, outerRadius: r, innerRadius: l } = t;
  let c = o / r;
  e.beginPath(), e.arc(s, i, r, n - c, a + c), l > o ? (c = o / l, e.arc(s, i, l, a + c, n - c, !0)) : e.arc(s, i, o, a + Xe, n - Xe), e.closePath(), e.clip();
}
function yu(e) {
  return po(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function xu(e, t, a, n) {
  const o = yu(e.options.borderRadius), s = (a - t) / 2, i = Math.min(s, n * t / 2), r = (l) => {
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
function kn(e, t, a, n, o, s) {
  const { x: i, y: r, startAngle: l, pixelMargin: c, innerRadius: d } = t, h = Math.max(t.outerRadius + n + a - c, 0), f = d > 0 ? d + n + a + c : 0;
  let p = 0;
  const g = o - l;
  if (n) {
    const W = d > 0 ? d - n : 0, q = h > 0 ? h - n : 0, ee = (W + q) / 2, X = ee !== 0 ? g * ee / (ee + n) : g;
    p = (g - X) / 2;
  }
  const b = Math.max(1e-3, g * h - a / Pe) / h, y = (g - b) / 2, v = l + y + p, x = o - y - p, { outerStart: k, outerEnd: w, innerStart: $, innerEnd: D } = xu(t, f, h, x - v), S = h - k, R = h - w, P = v + k / S, I = x - w / R, M = f + $, L = f + D, B = v + $ / M, N = x - D / L;
  if (e.beginPath(), s) {
    const W = (P + I) / 2;
    if (e.arc(i, r, h, P, W), e.arc(i, r, h, W, I), w > 0) {
      const le = ma(R, I, i, r);
      e.arc(le.x, le.y, w, I, x + Xe);
    }
    const q = ma(L, x, i, r);
    if (e.lineTo(q.x, q.y), D > 0) {
      const le = ma(L, N, i, r);
      e.arc(le.x, le.y, D, x + Xe, N + Math.PI);
    }
    const ee = (x - D / f + (v + $ / f)) / 2;
    if (e.arc(i, r, f, x - D / f, ee, !0), e.arc(i, r, f, ee, v + $ / f, !0), $ > 0) {
      const le = ma(M, B, i, r);
      e.arc(le.x, le.y, $, B + Math.PI, v - Xe);
    }
    const X = ma(S, v, i, r);
    if (e.lineTo(X.x, X.y), k > 0) {
      const le = ma(S, P, i, r);
      e.arc(le.x, le.y, k, v - Xe, P);
    }
  } else {
    e.moveTo(i, r);
    const W = Math.cos(P) * h + i, q = Math.sin(P) * h + r;
    e.lineTo(W, q);
    const ee = Math.cos(I) * h + i, X = Math.sin(I) * h + r;
    e.lineTo(ee, X);
  }
  e.closePath();
}
function _u(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r } = t;
  let l = t.endAngle;
  if (s) {
    kn(e, t, a, n, l, o);
    for (let c = 0; c < s; ++c)
      e.fill();
    isNaN(r) || (l = i + (r % We || We));
  }
  return kn(e, t, a, n, l, o), e.fill(), l;
}
function ku(e, t, a, n, o) {
  const { fullCircles: s, startAngle: i, circumference: r, options: l } = t, { borderWidth: c, borderJoinStyle: d, borderDash: h, borderDashOffset: f, borderRadius: p } = l, g = l.borderAlign === "inner";
  if (!c)
    return;
  e.setLineDash(h || []), e.lineDashOffset = f, g ? (e.lineWidth = c * 2, e.lineJoin = d || "round") : (e.lineWidth = c, e.lineJoin = d || "bevel");
  let b = t.endAngle;
  if (s) {
    kn(e, t, a, n, b, o);
    for (let y = 0; y < s; ++y)
      e.stroke();
    isNaN(r) || (b = i + (r % We || We));
  }
  g && vu(e, t, b), l.selfJoin && b - i >= Pe && p === 0 && d !== "miter" && bu(e, t, b), s || (kn(e, t, a, n, b, o), e.stroke());
}
class wu extends It {
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
    ], n), { angle: s, distance: i } = vi(o, {
      x: t,
      y: a
    }), { startAngle: r, endAngle: l, innerRadius: c, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), f = (this.options.spacing + this.options.borderWidth) / 2, p = De(h, l - r), g = Ha(s, r, l) && r !== l, b = p >= We || g, y = Vt(i, c + f, d + f);
    return b && y;
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
    if (this.pixelMargin = a.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > We ? Math.floor(n / We) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    t.save();
    const r = (this.startAngle + this.endAngle) / 2;
    t.translate(Math.cos(r) * o, Math.sin(r) * o);
    const l = 1 - Math.sin(Math.min(Pe, n || 0)), c = o * l;
    t.fillStyle = a.backgroundColor, t.strokeStyle = a.borderColor, _u(t, this, c, s, i), ku(t, this, c, s, i), t.restore();
  }
}
function Yi(e, t, a = t) {
  e.lineCap = De(a.borderCapStyle, t.borderCapStyle), e.setLineDash(De(a.borderDash, t.borderDash)), e.lineDashOffset = De(a.borderDashOffset, t.borderDashOffset), e.lineJoin = De(a.borderJoinStyle, t.borderJoinStyle), e.lineWidth = De(a.borderWidth, t.borderWidth), e.strokeStyle = De(a.borderColor, t.borderColor);
}
function Cu(e, t, a) {
  e.lineTo(a.x, a.y);
}
function $u(e) {
  return e.stepped ? zl : e.tension || e.cubicInterpolationMode === "monotone" ? Nl : Cu;
}
function Ui(e, t, a = {}) {
  const n = e.length, { start: o = 0, end: s = n - 1 } = a, { start: i, end: r } = t, l = Math.max(o, i), c = Math.min(s, r), d = o < i && s < i || o > r && s > r;
  return {
    count: n,
    start: l,
    loop: t.loop,
    ilen: c < l && !d ? n + c - l : c - l
  };
}
function Su(e, t, a, n) {
  const { points: o, options: s } = t, { count: i, start: r, loop: l, ilen: c } = Ui(o, a, n), d = $u(s);
  let { move: h = !0, reverse: f } = n || {}, p, g, b;
  for (p = 0; p <= c; ++p)
    g = o[(r + (f ? c - p : p)) % i], !g.skip && (h ? (e.moveTo(g.x, g.y), h = !1) : d(e, b, g, f, s.stepped), b = g);
  return l && (g = o[(r + (f ? c : 0)) % i], d(e, b, g, f, s.stepped)), !!l;
}
function Mu(e, t, a, n) {
  const o = t.points, { count: s, start: i, ilen: r } = Ui(o, a, n), { move: l = !0, reverse: c } = n || {};
  let d = 0, h = 0, f, p, g, b, y, v;
  const x = (w) => (i + (c ? r - w : w)) % s, k = () => {
    b !== y && (e.lineTo(d, y), e.lineTo(d, b), e.lineTo(d, v));
  };
  for (l && (p = o[x(0)], e.moveTo(p.x, p.y)), f = 0; f <= r; ++f) {
    if (p = o[x(f)], p.skip)
      continue;
    const w = p.x, $ = p.y, D = w | 0;
    D === g ? ($ < b ? b = $ : $ > y && (y = $), d = (h * d + w) / ++h) : (k(), e.lineTo(w, $), g = D, h = 0, b = y = $), v = $;
  }
  k();
}
function eo(e) {
  const t = e.options, a = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !a ? Mu : Su;
}
function Du(e) {
  return e.stepped ? yc : e.tension || e.cubicInterpolationMode === "monotone" ? xc : sa;
}
function Au(e, t, a, n) {
  let o = t._path;
  o || (o = t._path = new Path2D(), t.path(o, a, n) && o.closePath()), Yi(e, t.options), e.stroke(o);
}
function Tu(e, t, a, n) {
  const { segments: o, options: s } = t, i = eo(t);
  for (const r of o)
    Yi(e, s, r.style), e.beginPath(), i(e, t, r, {
      start: a,
      end: a + n - 1
    }) && e.closePath(), e.stroke();
}
const Bu = typeof Path2D == "function";
function Lu(e, t, a, n) {
  Bu && !t.options.segment ? Au(e, t, a, n) : Tu(e, t, a, n);
}
class Eu extends It {
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
      uc(this._points, n, t, o, a), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Dc(this, this.options.segment));
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
    const n = this.options, o = t[a], s = this.points, i = $c(this, {
      property: a,
      start: o,
      end: o
    });
    if (!i.length)
      return;
    const r = [], l = Du(n);
    let c, d;
    for (c = 0, d = i.length; c < d; ++c) {
      const { start: h, end: f } = i[c], p = s[h], g = s[f];
      if (p === g) {
        r.push(p);
        continue;
      }
      const b = Math.abs((o - p[a]) / (g[a] - p[a])), y = l(p, g, b, n.stepped);
      y[a] = t[a], r.push(y);
    }
    return r.length === 1 ? r[0] : r;
  }
  pathSegment(t, a, n) {
    return eo(this)(t, this, a, n);
  }
  path(t, a, n) {
    const o = this.segments, s = eo(this);
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
    (this.points || []).length && s.borderWidth && (t.save(), Lu(t, this, n, o), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
function As(e, t, a, n) {
  const o = e.options, { [a]: s } = e.getProps([
    a
  ], n);
  return Math.abs(t - s) < o.radius + o.hitRadius;
}
class Ru extends It {
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
    return As(this, t, "x", a);
  }
  inYRange(t, a) {
    return As(this, t, "y", a);
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
    this.skip || n.radius < 0.1 || !Wa(this, a, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, Zn(t, n, this.x, this.y));
  }
  getRange() {
    const t = this.options || {};
    return t.radius + t.hitRadius;
  }
}
function qi(e, t) {
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
function Pu(e, t, a) {
  const n = e.options.borderWidth, o = e.borderSkipped, s = $i(n);
  return {
    t: Nt(o.top, s.top, 0, a),
    r: Nt(o.right, s.right, 0, t),
    b: Nt(o.bottom, s.bottom, 0, a),
    l: Nt(o.left, s.left, 0, t)
  };
}
function Iu(e, t, a) {
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
function Fu(e) {
  const t = qi(e), a = t.right - t.left, n = t.bottom - t.top, o = Pu(e, a / 2, n / 2), s = Iu(e, a / 2, n / 2);
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
function Nn(e, t, a, n) {
  const o = t === null, s = a === null, r = e && !(o && s) && qi(e, n);
  return r && (o || Vt(t, r.left, r.right)) && (s || Vt(a, r.top, r.bottom));
}
function Ou(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function Vu(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function jn(e, t, a = {}) {
  const n = e.x !== a.x ? -t : 0, o = e.y !== a.y ? -t : 0, s = (e.x + e.w !== a.x + a.w ? t : 0) - n, i = (e.y + e.h !== a.y + a.h ? t : 0) - o;
  return {
    x: e.x + n,
    y: e.y + o,
    w: e.w + s,
    h: e.h + i,
    radius: e.radius
  };
}
class zu extends It {
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
    const { inflateAmount: a, options: { borderColor: n, backgroundColor: o } } = this, { inner: s, outer: i } = Fu(this), r = Ou(i.radius) ? yn : Vu;
    t.save(), (i.w !== s.w || i.h !== s.h) && (t.beginPath(), r(t, jn(i, a, s)), t.clip(), r(t, jn(s, -a, i)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), r(t, jn(s, a)), t.fillStyle = o, t.fill(), t.restore();
  }
  inRange(t, a, n) {
    return Nn(this, t, a, n);
  }
  inXRange(t, a) {
    return Nn(this, t, null, a);
  }
  inYRange(t, a) {
    return Nn(this, null, t, a);
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
const Ts = (e, t) => {
  let { boxHeight: a = t, boxWidth: n = t } = e;
  return e.usePointStyle && (a = Math.min(a, t), n = e.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: a,
    itemHeight: Math.max(t, a)
  };
}, Nu = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Bs extends It {
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
    let a = Fe(t.generateLabels, [
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
    const n = t.labels, o = tt(n.font), s = o.size, i = this._computeTitleHeight(), { boxWidth: r, itemHeight: l } = Ts(n, s);
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
    return this.legendItems.forEach((g, b) => {
      const y = n + a / 2 + s.measureText(g.text).width;
      (b === 0 || c[c.length - 1] + y + 2 * r > i) && (h += d, c[c.length - (b > 0 ? 0 : 1)] = 0, p += d, f++), l[b] = {
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
    let h = r, f = 0, p = 0, g = 0, b = 0;
    return this.legendItems.forEach((y, v) => {
      const { itemWidth: x, itemHeight: k } = ju(n, a, s, y, o);
      v > 0 && p + k + 2 * r > d && (h += f + r, c.push({
        width: f,
        height: p
      }), g += f + r, b++, f = p = 0), l[v] = {
        left: g,
        top: p,
        col: b,
        width: x,
        height: k
      }, f = Math.max(f, x), p += k + r;
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
      go(t, this), this._draw(), mo(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: a, lineWidths: n, ctx: o } = this, { align: s, labels: i } = t, r = Ke.color, l = va(t.rtl, this.left, this.width), c = tt(i.font), { padding: d } = i, h = c.size, f = h / 2;
    let p;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = c.string;
    const { boxWidth: g, boxHeight: b, itemHeight: y } = Ts(i, h), v = function(D, S, R) {
      if (isNaN(g) || g <= 0 || isNaN(b) || b < 0)
        return;
      o.save();
      const P = De(R.lineWidth, 1);
      if (o.fillStyle = De(R.fillStyle, r), o.lineCap = De(R.lineCap, "butt"), o.lineDashOffset = De(R.lineDashOffset, 0), o.lineJoin = De(R.lineJoin, "miter"), o.lineWidth = P, o.strokeStyle = De(R.strokeStyle, r), o.setLineDash(De(R.lineDash, [])), i.usePointStyle) {
        const I = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: R.pointStyle,
          rotation: R.rotation,
          borderWidth: P
        }, M = l.xPlus(D, g / 2), L = S + f;
        Ci(o, I, M, L, i.pointStyleWidth && g);
      } else {
        const I = S + Math.max((h - b) / 2, 0), M = l.leftForLtr(D, g), L = ba(R.borderRadius);
        o.beginPath(), Object.values(L).some((B) => B !== 0) ? yn(o, {
          x: M,
          y: I,
          w: g,
          h: b,
          radius: L
        }) : o.rect(M, I, g, b), o.fill(), P !== 0 && o.stroke();
      }
      o.restore();
    }, x = function(D, S, R) {
      Ka(o, R.text, D, S + y / 2, c, {
        strikethrough: R.hidden,
        textAlign: l.textAlign(R.textAlign)
      });
    }, k = this.isHorizontal(), w = this._computeTitleHeight();
    k ? p = {
      x: Qe(s, this.left + d, this.right - n[0]),
      y: this.top + d + w,
      line: 0
    } : p = {
      x: this.left + d,
      y: Qe(s, this.top + w + d, this.bottom - a[0].height),
      line: 0
    }, Bi(this.ctx, t.textDirection);
    const $ = y + d;
    this.legendItems.forEach((D, S) => {
      o.strokeStyle = D.fontColor, o.fillStyle = D.fontColor;
      const R = o.measureText(D.text).width, P = l.textAlign(D.textAlign || (D.textAlign = i.textAlign)), I = g + f + R;
      let M = p.x, L = p.y;
      l.setWidth(this.width), k ? S > 0 && M + I + d > this.right && (L = p.y += $, p.line++, M = p.x = Qe(s, this.left + d, this.right - n[p.line])) : S > 0 && L + $ > this.bottom && (M = p.x = M + a[p.line].width + d, p.line++, L = p.y = Qe(s, this.top + w + d, this.bottom - a[p.line].height));
      const B = l.x(M);
      if (v(B, L, D), M = Ml(P, M + g + f, k ? M + I : this.right, t.rtl), x(l.x(M), L, D), k)
        p.x += I + d;
      else if (typeof D.text != "string") {
        const N = c.lineHeight;
        p.y += Xi(D, N) + d;
      } else
        p.y += $;
    }), Li(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, a = t.title, n = tt(a.font), o = bt(a.padding);
    if (!a.display)
      return;
    const s = va(t.rtl, this.left, this.width), i = this.ctx, r = a.position, l = n.size / 2, c = o.top + l;
    let d, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), d = this.top + c, h = Qe(t.align, h, this.right - f);
    else {
      const g = this.columnSizes.reduce((b, y) => Math.max(b, y.height), 0);
      d = c + Qe(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const p = Qe(r, h, h + f);
    i.textAlign = s.textAlign(uo(r)), i.textBaseline = "middle", i.strokeStyle = a.color, i.fillStyle = a.color, i.font = n.string, Ka(i, a.text, p, d, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, a = tt(t.font), n = bt(t.padding);
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
    if (!Ku(t.type, a))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const o = this._hoveredItem, s = Nu(o, n);
      o && !s && Fe(a.onLeave, [
        t,
        o,
        this
      ], this), this._hoveredItem = n, n && !s && Fe(a.onHover, [
        t,
        n,
        this
      ], this);
    } else n && Fe(a.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function ju(e, t, a, n, o) {
  const s = Hu(n, e, t, a), i = Wu(o, n, t.lineHeight);
  return {
    itemWidth: s,
    itemHeight: i
  };
}
function Hu(e, t, a, n) {
  let o = e.text;
  return o && typeof o != "string" && (o = o.reduce((s, i) => s.length > i.length ? s : i)), t + a.size / 2 + n.measureText(o).width;
}
function Wu(e, t, a) {
  let n = e;
  return typeof t.text != "string" && (n = Xi(t, a)), n;
}
function Xi(e, t) {
  const a = e.text ? e.text.length : 0;
  return t * a;
}
function Ku(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var wo = {
  id: "legend",
  _element: Bs,
  start(e, t, a) {
    const n = e.legend = new Bs({
      ctx: e.ctx,
      options: a,
      chart: e
    });
    mt.configure(e, n, a), mt.addBox(e, n);
  },
  stop(e) {
    mt.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, a) {
    const n = e.legend;
    mt.configure(e, n, a), n.options = a;
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
          const c = l.controller.getStyle(a ? 0 : void 0), d = bt(c.borderWidth);
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
class Gi extends It {
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
    this._padding = bt(n.padding);
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
    return this.isHorizontal() ? (d = Qe(r, n, s), h = a + t, c = s - n) : (i.position === "left" ? (d = n + t, h = Qe(r, o, a), l = Pe * -0.5) : (d = s - t, h = Qe(r, a, o), l = Pe * 0.5), c = o - a), {
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
      textAlign: uo(a.align),
      textBaseline: "middle",
      translation: [
        i,
        r
      ]
    });
  }
}
function Yu(e, t) {
  const a = new Gi({
    ctx: e.ctx,
    options: t,
    chart: e
  });
  mt.configure(e, a, t), mt.addBox(e, a), e.titleBlock = a;
}
var Zi = {
  id: "title",
  _element: Gi,
  start(e, t, a) {
    Yu(e, a);
  },
  stop(e) {
    const t = e.titleBlock;
    mt.removeBox(e, t), delete e.titleBlock;
  },
  beforeUpdate(e, t, a) {
    const n = e.titleBlock;
    mt.configure(e, n, a), n.options = a;
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
        const c = l.getCenterPoint(), d = Xn(t, c);
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
function Ct(e, t) {
  return t && (qe(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Lt(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function Uu(e, t) {
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
function Ls(e, t) {
  const a = e.chart.ctx, { body: n, footer: o, title: s } = e, { boxWidth: i, boxHeight: r } = t, l = tt(t.bodyFont), c = tt(t.titleFont), d = tt(t.footerFont), h = s.length, f = o.length, p = n.length, g = bt(t.padding);
  let b = g.height, y = 0, v = n.reduce((w, $) => w + $.before.length + $.lines.length + $.after.length, 0);
  if (v += e.beforeBody.length + e.afterBody.length, h && (b += h * c.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), v) {
    const w = t.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight;
    b += p * w + (v - p) * l.lineHeight + (v - 1) * t.bodySpacing;
  }
  f && (b += t.footerMarginTop + f * d.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const k = function(w) {
    y = Math.max(y, a.measureText(w).width + x);
  };
  return a.save(), a.font = c.string, Re(e.title, k), a.font = l.string, Re(e.beforeBody.concat(e.afterBody), k), x = t.displayColors ? i + 2 + t.boxPadding : 0, Re(n, (w) => {
    Re(w.before, k), Re(w.lines, k), Re(w.after, k);
  }), x = 0, a.font = d.string, Re(e.footer, k), a.restore(), y += g.width, {
    width: y,
    height: b
  };
}
function qu(e, t) {
  const { y: a, height: n } = t;
  return a < n / 2 ? "top" : a > e.height - n / 2 ? "bottom" : "center";
}
function Xu(e, t, a, n) {
  const { x: o, width: s } = n, i = a.caretSize + a.caretPadding;
  if (e === "left" && o + s + i > t.width || e === "right" && o - s - i < 0)
    return !0;
}
function Gu(e, t, a, n) {
  const { x: o, width: s } = a, { width: i, chartArea: { left: r, right: l } } = e;
  let c = "center";
  return n === "center" ? c = o <= (r + l) / 2 ? "left" : "right" : o <= s / 2 ? c = "left" : o >= i - s / 2 && (c = "right"), Xu(c, e, t, a) && (c = "center"), c;
}
function Es(e, t, a) {
  const n = a.yAlign || t.yAlign || qu(e, a);
  return {
    xAlign: a.xAlign || t.xAlign || Gu(e, t, a, n),
    yAlign: n
  };
}
function Zu(e, t) {
  let { x: a, width: n } = e;
  return t === "right" ? a -= n : t === "center" && (a -= n / 2), a;
}
function Qu(e, t, a) {
  let { y: n, height: o } = e;
  return t === "top" ? n += a : t === "bottom" ? n -= o + a : n -= o / 2, n;
}
function Rs(e, t, a, n) {
  const { caretSize: o, caretPadding: s, cornerRadius: i } = e, { xAlign: r, yAlign: l } = a, c = o + s, { topLeft: d, topRight: h, bottomLeft: f, bottomRight: p } = ba(i);
  let g = Zu(t, r);
  const b = Qu(t, l, c);
  return l === "center" ? r === "left" ? g += c : r === "right" && (g -= c) : r === "left" ? g -= Math.max(d, f) + o : r === "right" && (g += Math.max(h, p) + o), {
    x: et(g, 0, n.width - t.width),
    y: et(b, 0, n.height - t.height)
  };
}
function dn(e, t, a) {
  const n = bt(a.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left;
}
function Ps(e) {
  return Ct([], Lt(e));
}
function Ju(e, t, a) {
  return ua(e, {
    tooltip: t,
    tooltipItems: a,
    type: "tooltip"
  });
}
function Is(e, t) {
  const a = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return a ? e.override(a) : e;
}
const Qi = {
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
  return typeof o > "u" ? Qi[t].call(a, n) : o;
}
class Fs extends It {
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
    const a = this.chart, n = this.options.setContext(this.getContext()), o = n.enabled && a.options.animation && n.animations, s = new Ri(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = Ju(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, a) {
    const { callbacks: n } = a, o = st(n, "beforeTitle", this, t), s = st(n, "title", this, t), i = st(n, "afterTitle", this, t);
    let r = [];
    return r = Ct(r, Lt(o)), r = Ct(r, Lt(s)), r = Ct(r, Lt(i)), r;
  }
  getBeforeBody(t, a) {
    return Ps(st(a.callbacks, "beforeBody", this, t));
  }
  getBody(t, a) {
    const { callbacks: n } = a, o = [];
    return Re(t, (s) => {
      const i = {
        before: [],
        lines: [],
        after: []
      }, r = Is(n, s);
      Ct(i.before, Lt(st(r, "beforeLabel", this, s))), Ct(i.lines, st(r, "label", this, s)), Ct(i.after, Lt(st(r, "afterLabel", this, s))), o.push(i);
    }), o;
  }
  getAfterBody(t, a) {
    return Ps(st(a.callbacks, "afterBody", this, t));
  }
  getFooter(t, a) {
    const { callbacks: n } = a, o = st(n, "beforeFooter", this, t), s = st(n, "footer", this, t), i = st(n, "afterFooter", this, t);
    let r = [];
    return r = Ct(r, Lt(o)), r = Ct(r, Lt(s)), r = Ct(r, Lt(i)), r;
  }
  _createItems(t) {
    const a = this._active, n = this.chart.data, o = [], s = [], i = [];
    let r = [], l, c;
    for (l = 0, c = a.length; l < c; ++l)
      r.push(Uu(this.chart, a[l]));
    return t.filter && (r = r.filter((d, h, f) => t.filter(d, h, f, n))), t.itemSort && (r = r.sort((d, h) => t.itemSort(d, h, n))), Re(r, (d) => {
      const h = Is(t.callbacks, d);
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
      const r = Ea[n.position].call(this, o, this._eventPosition);
      i = this._createItems(n), this.title = this.getTitle(i, n), this.beforeBody = this.getBeforeBody(i, n), this.body = this.getBody(i, n), this.afterBody = this.getAfterBody(i, n), this.footer = this.getFooter(i, n);
      const l = this._size = Ls(this, n), c = Object.assign({}, r, l), d = Es(this.chart, n, c), h = Rs(n, c, d, this.chart);
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
    const { xAlign: o, yAlign: s } = this, { caretSize: i, cornerRadius: r } = n, { topLeft: l, topRight: c, bottomLeft: d, bottomRight: h } = ba(r), { x: f, y: p } = t, { width: g, height: b } = a;
    let y, v, x, k, w, $;
    return s === "center" ? (w = p + b / 2, o === "left" ? (y = f, v = y - i, k = w + i, $ = w - i) : (y = f + g, v = y + i, k = w - i, $ = w + i), x = y) : (o === "left" ? v = f + Math.max(l, d) + i : o === "right" ? v = f + g - Math.max(c, h) - i : v = this.caretX, s === "top" ? (k = p, w = k - i, y = v - i, x = v + i) : (k = p + b, w = k + i, y = v + i, x = v - i), $ = k), {
      x1: y,
      x2: v,
      x3: x,
      y1: k,
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
      const b = {
        radius: Math.min(c, l) / 2,
        pointStyle: r.pointStyle,
        rotation: r.rotation,
        borderWidth: 1
      }, y = o.leftForLtr(f, c) + c / 2, v = g + l / 2;
      t.strokeStyle = s.multiKeyBackground, t.fillStyle = s.multiKeyBackground, Zn(t, b, y, v), t.strokeStyle = i.borderColor, t.fillStyle = i.backgroundColor, Zn(t, b, y, v);
    } else {
      t.lineWidth = Te(i.borderWidth) ? Math.max(...Object.values(i.borderWidth)) : i.borderWidth || 1, t.strokeStyle = i.borderColor, t.setLineDash(i.borderDash || []), t.lineDashOffset = i.borderDashOffset || 0;
      const b = o.leftForLtr(f, c), y = o.leftForLtr(o.xPlus(f, 1), c - 2), v = ba(i.borderRadius);
      Object.values(v).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = s.multiKeyBackground, yn(t, {
        x: b,
        y: g,
        w: c,
        h: l,
        radius: v
      }), t.fill(), t.stroke(), t.fillStyle = i.backgroundColor, t.beginPath(), yn(t, {
        x: y,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: v
      }), t.fill()) : (t.fillStyle = s.multiKeyBackground, t.fillRect(b, g, c, l), t.strokeRect(b, g, c, l), t.fillStyle = i.backgroundColor, t.fillRect(y, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, a, n) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: i, displayColors: r, boxHeight: l, boxWidth: c, boxPadding: d } = n, h = tt(n.bodyFont);
    let f = h.lineHeight, p = 0;
    const g = va(n.rtl, this.x, this.width), b = function(R) {
      a.fillText(R, g.x(t.x + p), t.y + f / 2), t.y += f + s;
    }, y = g.textAlign(i);
    let v, x, k, w, $, D, S;
    for (a.textAlign = i, a.textBaseline = "middle", a.font = h.string, t.x = dn(this, y, n), a.fillStyle = n.bodyColor, Re(this.beforeBody, b), p = r && y !== "right" ? i === "center" ? c / 2 + d : c + 2 + d : 0, w = 0, D = o.length; w < D; ++w) {
      for (v = o[w], x = this.labelTextColors[w], a.fillStyle = x, Re(v.before, b), k = v.lines, r && k.length && (this._drawColorBox(a, t, w, g, n), f = Math.max(h.lineHeight, l)), $ = 0, S = k.length; $ < S; ++$)
        b(k[$]), f = h.lineHeight;
      Re(v.after, b);
    }
    p = 0, f = h.lineHeight, Re(this.afterBody, b), t.y -= s;
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
      const i = Ea[t.position].call(this, this._active, this._eventPosition);
      if (!i)
        return;
      const r = this._size = Ls(this, t), l = Object.assign({}, i, this._size), c = Es(a, t, l), d = Rs(t, l, c, a);
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
    const i = bt(a.padding), r = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    a.enabled && r && (t.save(), t.globalAlpha = n, this.drawBackground(s, t, o, a), Bi(t, a.textDirection), s.y += i.top, this.drawTitle(s, t, a), this.drawBody(s, t, a), this.drawFooter(s, t, a), Li(t, a.textDirection), t.restore());
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
    const { caretX: n, caretY: o, options: s } = this, i = Ea[s.position].call(this, t, a);
    return i !== !1 && (n !== i.x || o !== i.y);
  }
}
var Co = {
  id: "tooltip",
  _element: Fs,
  positioners: Ea,
  afterInit(e, t, a) {
    a && (e.tooltip = new Fs({
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
    callbacks: Qi
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
const eh = (e, t, a, n) => (typeof t == "string" ? (a = e.push(t) - 1, n.unshift({
  index: a,
  label: t
})) : isNaN(t) && (a = null), a);
function th(e, t, a, n) {
  const o = e.indexOf(t);
  if (o === -1)
    return eh(e, t, a, n);
  const s = e.lastIndexOf(t);
  return o !== s ? a : o;
}
const ah = (e, t) => e === null ? null : et(Math.round(e), 0, t);
function Os(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Ji extends _a {
  static id = "category";
  static defaults = {
    ticks: {
      callback: Os
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
    return a = isFinite(a) && n[a] === t ? a : th(n, t, De(a, t), this._addedLabels), ah(a, n.length - 1);
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
    return Os.call(this, t);
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
function nh(e, t) {
  const a = [], { bounds: o, step: s, min: i, max: r, precision: l, count: c, maxTicks: d, maxDigits: h, includeBounds: f } = e, p = s || 1, g = d - 1, { min: b, max: y } = t, v = !Le(i), x = !Le(r), k = !Le(c), w = (y - b) / (h + 1);
  let $ = Vo((y - b) / g / p) * p, D, S, R, P;
  if ($ < 1e-14 && !v && !x)
    return [
      {
        value: b
      },
      {
        value: y
      }
    ];
  P = Math.ceil(y / $) - Math.floor(b / $), P > g && ($ = Vo(P * $ / g / p) * p), Le(l) || (D = Math.pow(10, l), $ = Math.ceil($ * D) / D), o === "ticks" ? (S = Math.floor(b / $) * $, R = Math.ceil(y / $) * $) : (S = b, R = y), v && x && s && vl((r - i) / s, $ / 1e3) ? (P = Math.round(Math.min((r - i) / $, d)), $ = (r - i) / P, S = i, R = r) : k ? (S = v ? i : S, R = x ? r : R, P = c - 1, $ = (R - S) / P) : (P = (R - S) / $, Pa(P, Math.round(P), $ / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const I = Math.max(zo($), zo(S));
  D = Math.pow(10, Le(l) ? I : l), S = Math.round(S * D) / D, R = Math.round(R * D) / D;
  let M = 0;
  for (v && (f && S !== i ? (a.push({
    value: i
  }), S < i && M++, Pa(Math.round((S + M * $) * D) / D, i, Vs(i, w, e)) && M++) : S < i && M++); M < P; ++M) {
    const L = Math.round((S + M * $) * D) / D;
    if (x && L > r)
      break;
    a.push({
      value: L
    });
  }
  return x && f && R !== r ? a.length && Pa(a[a.length - 1].value, r, Vs(r, w, e)) ? a[a.length - 1].value = r : a.push({
    value: r
  }) : (!x || R === r) && a.push({
    value: R
  }), a;
}
function Vs(e, t, { horizontal: a, minRotation: n }) {
  const o = Rt(n), s = (a ? Math.sin(o) : Math.cos(o)) || 1e-3, i = 0.75 * t * ("" + e).length;
  return Math.min(t / s, i);
}
class oh extends _a {
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
    }, s = this._range || this, i = nh(o, s);
    return t.bounds === "ticks" && yl(i, this, "value"), t.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
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
    return fo(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class er extends oh {
  static id = "linear";
  static defaults = {
    ticks: {
      callback: wi.formatters.numeric
    }
  };
  determineDataLimits() {
    const { min: t, max: a } = this.getMinMax(!0);
    this.min = pt(t) ? t : 0, this.max = pt(a) ? a : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), a = t ? this.width : this.height, n = Rt(this.options.ticks.minRotation), o = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, s = this._resolveTickFontOptions(0);
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
function zs(e, t) {
  return e - t;
}
function Ns(e, t) {
  if (Le(t))
    return null;
  const a = e._adapter, { parser: n, round: o, isoWeekday: s } = e._parseOpts;
  let i = t;
  return typeof n == "function" && (i = n(i)), pt(i) || (i = typeof n == "string" ? a.parse(i, n) : a.parse(i)), i === null ? null : (o && (i = o === "week" && (ja(s) || s === !0) ? a.startOf(i, "isoWeek", s) : a.startOf(i, o)), +i);
}
function js(e, t, a, n) {
  const o = lt.length;
  for (let s = lt.indexOf(e); s < o - 1; ++s) {
    const i = Mn[lt[s]], r = i.steps ? i.steps : Number.MAX_SAFE_INTEGER;
    if (i.common && Math.ceil((a - t) / (r * i.size)) <= n)
      return lt[s];
  }
  return lt[o - 1];
}
function sh(e, t, a, n, o) {
  for (let s = lt.length - 1; s >= lt.indexOf(a); s--) {
    const i = lt[s];
    if (Mn[i].common && e._adapter.diff(o, n, i) >= t - 1)
      return i;
  }
  return lt[a ? lt.indexOf(a) : 0];
}
function ih(e) {
  for (let t = lt.indexOf(e) + 1, a = lt.length; t < a; ++t)
    if (Mn[lt[t]].common)
      return lt[t];
}
function Hs(e, t, a) {
  if (!a)
    e[t] = !0;
  else if (a.length) {
    const { lo: n, hi: o } = co(a, t), s = a[n] >= t ? a[n] : a[o];
    e[s] = !0;
  }
}
function rh(e, t, a, n) {
  const o = e._adapter, s = +o.startOf(t[0].value, n), i = t[t.length - 1].value;
  let r, l;
  for (r = s; r <= i; r = +o.add(r, 1, n))
    l = a[r], l >= 0 && (t[l].major = !0);
  return t;
}
function Ws(e, t, a) {
  const n = [], o = {}, s = t.length;
  let i, r;
  for (i = 0; i < s; ++i)
    r = t[i], o[r] = i, n.push({
      value: r,
      major: !1
    });
  return s === 0 || !a ? n : rh(e, n, o, a);
}
class Ks extends _a {
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
    const n = t.time || (t.time = {}), o = this._adapter = new ld._date(t.adapters.date);
    o.init(a), Ra(n.displayFormats, o.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = a.normalized;
  }
  parse(t, a) {
    return t === void 0 ? null : Ns(this, t);
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
    (!i || !r) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), o = pt(o) && !isNaN(o) ? o : +a.startOf(Date.now(), n), s = pt(s) && !isNaN(s) ? s : +a.endOf(Date.now(), n) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
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
    const s = this.min, i = this.max, r = Cl(o, s, i);
    return this._unit = a.unit || (n.autoSkip ? js(a.minUnit, this.min, this.max, this._getLabelCapacity(s)) : sh(this, r.length, a.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : ih(this._unit), this.initOffsets(o), t.reverse && r.reverse(), Ws(this, r, this._majorUnit);
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
    const t = this._adapter, a = this.min, n = this.max, o = this.options, s = o.time, i = s.unit || js(s.minUnit, a, n, this._getLabelCapacity(a)), r = De(o.ticks.stepSize, 1), l = i === "week" ? s.isoWeekday : !1, c = ja(l) || l === !0, d = {};
    let h = a, f, p;
    if (c && (h = +t.startOf(h, "isoWeek", l)), h = +t.startOf(h, c ? "day" : i), t.diff(n, a, i) > 1e5 * r)
      throw new Error(a + " and " + n + " are too far apart with stepSize of " + r + " " + i);
    const g = o.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, p = 0; f < n; f = +t.add(f, r, i), p++)
      Hs(d, f, g);
    return (f === n || o.bounds === "ticks" || p === 1) && Hs(d, f, g), Object.keys(d).sort(zs).map((b) => +b);
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
      return Fe(i, [
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
    const a = this.options.ticks, n = this.ctx.measureText(t).width, o = Rt(this.isHorizontal() ? a.maxRotation : a.minRotation), s = Math.cos(o), i = Math.sin(o), r = this._resolveTickFontOptions(0).size;
    return {
      w: n * s + r * i,
      h: n * i + r * s
    };
  }
  _getLabelCapacity(t) {
    const a = this.options.time, n = a.displayFormats, o = n[a.unit] || n.millisecond, s = this._tickFormatFunction(t, 0, Ws(this, [
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
      t.push(Ns(this, o[a]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return xi(t.sort(zs));
  }
}
function un(e, t, a) {
  let n = 0, o = e.length - 1, s, i, r, l;
  a ? (t >= e[n].pos && t <= e[o].pos && ({ lo: n, hi: o } = ia(e, "pos", t)), { pos: s, time: r } = e[n], { pos: i, time: l } = e[o]) : (t >= e[n].time && t <= e[o].time && ({ lo: n, hi: o } = ia(e, "time", t)), { time: s, pos: r } = e[n], { time: i, pos: l } = e[o]);
  const c = i - s;
  return c ? r + (l - r) * (t - s) / c : r;
}
class d4 extends Ks {
  static id = "timeseries";
  static defaults = Ks.defaults;
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
const tr = {
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
}, lh = {
  ariaLabel: {
    type: String
  },
  ariaDescribedby: {
    type: String
  }
}, ch = {
  type: {
    type: String,
    required: !0
  },
  destroyDelay: {
    type: Number,
    default: 0
    // No delay by default
  },
  ...tr,
  ...lh
}, dh = Er[0] === "2" ? (e, t) => Object.assign(e, {
  attrs: t
}) : (e, t) => Object.assign(e, t);
function pa(e) {
  return li(e) ? Yn(e) : e;
}
function uh(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e;
  return li(t) ? new Proxy(e, {}) : e;
}
function hh(e, t) {
  const a = e.options;
  a && t && Object.assign(a, t);
}
function ar(e, t) {
  e.labels = t;
}
function nr(e, t, a) {
  const n = [];
  e.datasets = t.map((o) => {
    const s = e.datasets.find((i) => i[a] === o[a]);
    return !s || !o.data || n.includes(s) ? {
      ...o
    } : (n.push(s), Object.assign(s, o), s);
  });
}
function fh(e, t) {
  const a = {
    labels: [],
    datasets: []
  };
  return ar(a, e.labels), nr(a, e.datasets, t), a;
}
const gh = ue({
  props: ch,
  setup(e, t) {
    let { expose: a, slots: n } = t;
    const o = se(null), s = ri(null);
    a({
      chart: s
    });
    const i = () => {
      if (!o.value) return;
      const { type: c, data: d, options: h, plugins: f, datasetIdKey: p } = e, g = fh(d, p), b = uh(g, d);
      s.value = new Xt(o.value, {
        type: c,
        data: b,
        options: {
          ...h
        },
        plugins: f
      });
    }, r = () => {
      const c = Yn(s.value);
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
      const b = Yn(s.value);
      if (!b)
        return;
      let y = !1;
      if (h) {
        const v = pa(h), x = pa(p);
        v && v !== x && (hh(b, v), y = !0);
      }
      if (f) {
        const v = pa(f.labels), x = pa(g.labels), k = pa(f.datasets), w = pa(g.datasets);
        v !== x && (ar(b.config.data, v), y = !0), k && k !== w && (nr(b.config.data, k, e.datasetIdKey), y = !0);
      }
      y && He(() => {
        l(b);
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
function $o(e, t) {
  return Xt.register(t), ue({
    props: tr,
    setup(a, n) {
      let { expose: o } = n;
      const s = ri(null), i = (r) => {
        s.value = r?.chart;
      };
      return o({
        chart: s
      }), () => Ve(gh, dh({
        ref: i
      }, {
        type: e,
        ...a
      }));
    }
  });
}
const mh = /* @__PURE__ */ $o("bar", nd), ph = /* @__PURE__ */ $o("line", id), bh = /* @__PURE__ */ $o("pie", rd), Ys = {
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
}, Us = {
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
}, vh = [
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
  const t = se("light");
  let a = null;
  const n = () => typeof document > "u" ? "light" : document.documentElement.classList.contains("dark") ? "dark" : "light", o = C(() => e?.value ? e.value : t.value), s = C(() => o.value === "dark"), i = C(() => s.value ? Us : Ys), r = () => {
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
    lightColors: Ys,
    darkColors: Us,
    chartSeriesColors: vh
  };
}
const Ua = 5, So = 8, yh = /^x\d*$/, xh = /^y\d*$/;
function or(e) {
  if (!e || typeof e != "object") return e;
  const t = { ...e }, a = t.scales;
  if (!a || typeof a != "object") return t;
  const n = { ...a };
  for (const o of Object.keys(n)) {
    const s = n[o];
    if (!s || typeof s != "object") continue;
    const i = { ...s }, r = i.ticks, l = r && typeof r == "object" ? { ...r } : {};
    if (yh.test(o) && (l.maxTicksLimit = So, l.autoSkip = !0, l.minRotation = 0, l.maxRotation = 0, l.autoSkipPadding = l.autoSkipPadding ?? 8), xh.test(o)) {
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
const it = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", _h = ["titleFont", "bodyFont", "footerFont"];
function sr(e, t = it) {
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
      for (const l of _h) {
        const c = r[l];
        c && typeof c == "object" && (r[l] = { ...c, family: t });
      }
      o.tooltip = r;
    }
    a.plugins = o;
  }
  return a;
}
const qs = 10, kh = /* @__PURE__ */ ue({
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
    Xt.register(Ji, er, zu, Zi, Co, wo), Xt.defaults.font.family = it;
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f) => typeof f != "string" ? f : a.uppercaseLegendLabels ? f.toUpperCase() : i(f), l = (f, p) => f.length <= p ? f : `${f.slice(0, Math.max(1, p - 1))}…`;
    function c(f, p) {
      if (p == null) return f;
      if (Array.isArray(p) || typeof p != "object" || f == null || Array.isArray(f) || typeof f != "object") return p;
      const g = { ...f };
      for (const b of Object.keys(p)) {
        const y = p[b];
        y !== void 0 && (g[b] = c(f[b], y));
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
              boxWidth: qs,
              boxHeight: qs,
              usePointStyle: !1,
              generateLabels: function(g) {
                return g.data.datasets.map((y, v) => {
                  const x = Array.isArray(y.backgroundColor) ? y.backgroundColor[0] : y.backgroundColor, k = Array.isArray(y.borderColor) ? y.borderColor[0] : y.borderColor, w = typeof k == "string" && k.length > 0 ? k : typeof x == "string" && x.length > 0 ? x : o.value.textSecondary;
                  return {
                    text: r(y.label || ""),
                    fillStyle: typeof x == "string" ? x : w,
                    strokeStyle: w,
                    lineWidth: 0,
                    fontColor: w,
                    hidden: !g.isDatasetVisible(v),
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
                let b = String(i(g.dataset.label || ""));
                b && (b += ": ");
                const v = (g.chart?.options?.indexAxis ?? "x") === "y" ? g.parsed.x : g.parsed.y;
                return v != null && (b += v), b;
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
              maxTicksLimit: So,
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
                const b = this.getLabelForValue(g);
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
      }, p = a.options ? c(f, a.options) : f;
      if (p.indexAxis === "y") {
        p.scales = p.scales ?? {}, p.scales.x = {
          type: "linear",
          beginAtZero: !0,
          ...p.scales.x
        };
        const { beginAtZero: g, ticks: b, ...y } = p.scales.y ?? {}, v = a.data.labels?.length ?? 0, x = a.categoryLabelMaxLength ?? 20;
        p.scales.y = {
          type: "category",
          ...y,
          ticks: {
            ...b,
            autoSkip: !1,
            maxTicksLimit: v > 0 ? v : Ua,
            callback: function(k) {
              const w = this.getLabelForValue(k), $ = typeof w == "string" ? w : String(w ?? "");
              return l($, x);
            }
          }
        };
      }
      return sr(
        or(p)
      );
    }), h = C(() => a.heightPx ?? 230);
    return t({ isDark: n }), (f, p) => (m(), _("div", {
      class: "relative w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]",
      style: Ce({ height: `${h.value}px` })
    }, [
      j(E(mh), {
        data: s.value,
        options: d.value
      }, null, 8, ["data", "options"])
    ], 4));
  }
}), pe = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, kt = /* @__PURE__ */ pe(kh, [["__scopeId", "data-v-1d64fb88"]]), wh = { class: "chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0" }, Ch = { class: "chart-line-canvas-host relative min-h-0 w-full flex-1" }, $h = {
  key: 0,
  class: "chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5",
  role: "list"
}, Sh = ["aria-pressed", "aria-label", "onClick"], Mh = {
  class: "inline-flex shrink-0 items-center",
  "aria-hidden": "true"
}, Dh = /* @__PURE__ */ ue({
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
      Ji,
      er,
      Ru,
      Eu,
      Zi,
      Co,
      wo
    ), Xt.defaults.font.family = it;
    const n = se(null), { isDark: o, colors: s } = Me($e(a, "theme")), i = C(() => s.value.bgCard), r = C(() => {
      const y = i.value;
      return {
        labels: a.data.labels,
        datasets: a.data.datasets.map((v) => {
          const x = v.borderColor, k = Array.isArray(x) ? x[0] : x, w = typeof k == "string" && k.length > 0 ? k : s.value.textSecondary, $ = v.pointBackgroundColor !== void 0 ? v.pointBackgroundColor : y, D = v.pointHoverBackgroundColor !== void 0 ? v.pointHoverBackgroundColor : $, S = v.pointBorderWidth ?? 2, R = v.pointHoverBorderWidth ?? S;
          return {
            ...v,
            fill: v.fill ?? !1,
            clip: v.clip ?? !1,
            pointBackgroundColor: $,
            pointHoverBackgroundColor: D,
            pointBorderColor: v.pointBorderColor ?? w,
            pointHoverBorderColor: v.pointHoverBorderColor ?? w,
            pointBorderWidth: S,
            pointHoverBorderWidth: R
          };
        })
      };
    }), l = (y) => typeof y == "string" ? y.charAt(0).toUpperCase() + y.slice(1).toLowerCase() : y, c = (y) => typeof y != "string" ? y : a.uppercaseLegendLabels ? y.toUpperCase() : l(y);
    function d(y) {
      const v = y.borderColor, x = Array.isArray(v) ? v[0] : v;
      return typeof x == "string" && x.length > 0 ? x : s.value.textSecondary;
    }
    const h = C(
      () => r.value.datasets.map((y, v) => ({
        key: `${y.label ?? "dataset"}-${v}`,
        label: c(y.label || ""),
        color: d(y)
      }))
    ), f = se([]);
    Ee(
      () => r.value.datasets.length,
      (y) => {
        const v = Array.from({ length: y }, (x, k) => f.value[k] ?? !0);
        f.value = v;
      },
      { immediate: !0 }
    );
    function p(y) {
      const x = n.value?.chart;
      if (!x || y < 0 || y >= x.data.datasets.length) return;
      const k = !x.isDatasetVisible(y);
      x.setDatasetVisibility(y, k), f.value[y] = k, x.update();
    }
    function g(y, v) {
      if (v == null) return y;
      if (Array.isArray(v) || typeof v != "object" || y == null || Array.isArray(y) || typeof y != "object") return v;
      const x = { ...y };
      for (const k of Object.keys(v)) {
        const w = v[k];
        w !== void 0 && (x[k] = g(y[k], w));
      }
      return x;
    }
    const b = C(() => {
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
              title: function(k) {
                return k.length > 0 ? String(l(k[0].label)) : "";
              },
              label: function(k) {
                let w = String(l(k.dataset.label || ""));
                return w && (w += ": "), k.parsed.y !== null && (w += k.parsed.y), w;
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
              maxTicksLimit: So,
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
      }, v = a.options ? g(y, a.options) : y;
      return sr(
        or(v)
      );
    });
    return t({ isDark: o }), (y, v) => (m(), _("div", wh, [
      u("div", Ch, [
        j(E(ph), {
          ref_key: "lineChartRef",
          ref: n,
          data: r.value,
          options: b.value
        }, null, 8, ["data", "options"])
      ]),
      h.value.length > 0 ? (m(), _("ul", $h, [
        (m(!0), _(ce, null, me(h.value, (x, k) => (m(), _("li", {
          key: x.key,
          role: "listitem"
        }, [
          u("button", {
            type: "button",
            class: J(["inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]", f.value[k] !== !1 ? "opacity-100" : "opacity-45 line-through"]),
            style: Ce({ color: x.color }),
            "aria-pressed": f.value[k] !== !1,
            "aria-label": `${x.label}. ${f.value[k] !== !1 ? "Visible" : "Oculta"}. Pulsa para alternar.`,
            onClick: (w) => p(k)
          }, [
            u("span", Mh, [
              v[0] || (v[0] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1)),
              u("span", {
                class: "relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent",
                style: Ce({ borderColor: x.color })
              }, null, 4),
              v[1] || (v[1] = u("span", { class: "h-0.5 w-2 shrink-0 rounded-full bg-current" }, null, -1))
            ]),
            u("span", null, A(x.label), 1)
          ], 14, Sh)
        ]))), 128))
      ])) : V("", !0)
    ]));
  }
}), ht = /* @__PURE__ */ pe(Dh, [["__scopeId", "data-v-426e23d5"]]), Ah = { class: "chart-container" }, Th = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", Bh = /* @__PURE__ */ ue({
  __name: "PieChart",
  props: {
    data: {},
    options: {},
    doughnut: { type: Boolean },
    theme: {}
  },
  setup(e, { expose: t }) {
    const a = e;
    Xt.register(wu, Co, wo);
    const { isDark: n, colors: o } = Me($e(a, "theme")), s = a.data, i = (l) => typeof l == "string" ? l.charAt(0).toUpperCase() + l.slice(1).toLowerCase() : l, r = C(() => a.options ? a.options : {
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
              family: Th,
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
                const p = l.getDatasetMeta(0).controller.getStyle(h), b = c.datasets[0].data[h], y = typeof p.backgroundColor == "string" && p.backgroundColor.length > 0 ? p.backgroundColor : o.value.textSecondary;
                return {
                  text: `${i(d)}: ${b}`,
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
    return t({ isDark: n }), (l, c) => (m(), _("div", Ah, [
      j(E(bh), {
        data: E(s),
        options: r.value
      }, null, 8, ["data", "options"])
    ]));
  }
}), Dn = /* @__PURE__ */ pe(Bh, [["__scopeId", "data-v-0f7806d6"]]), Lh = { class: "chart-container" }, Eh = ["viewBox"], Rh = ["transform"], Ph = ["x", "width", "fill", "stroke"], Ih = ["fill"], Fh = ["x1", "y1", "x2", "y2", "stroke"], Oh = ["points", "fill"], Vh = ["x1", "y1", "x2", "y2", "stroke"], zh = ["x", "y", "fill"], Nh = ["x1", "y1", "x2", "y2", "stroke"], jh = ["points", "fill"], Hh = ["transform"], Wh = ["y1", "y2"], Kh = ["y1", "y2"], Yh = ["y1", "y2"], Uh = ["y1", "y2"], qh = ["y", "height"], Xh = ["y1", "y2"], Gh = ["y1", "y2"], Zh = ["y1", "y2"], Qh = ["y1", "y2"], Jh = ["y", "height"], ef = ["cy", "stroke", "onMouseenter"], tf = ["cy", "stroke", "onMouseenter"], af = ["cy", "stroke", "onMouseenter"], nf = ["cy", "stroke", "onMouseenter"], of = ["y1", "y2", "onMouseenter"], sf = ["y1", "y2", "onMouseenter"], rf = ["x", "y", "fill"], lf = ["x", "y", "fill"], cf = ["transform"], df = { transform: "translate(-200, 0)" }, uf = ["stroke"], hf = ["fill"], ff = { transform: "translate(-130, 0)" }, gf = ["stroke"], mf = ["fill"], pf = { transform: "translate(-60, 0)" }, bf = ["stroke"], vf = ["fill"], yf = { transform: "translate(10, 0)" }, xf = ["stroke"], _f = ["fill"], kf = { transform: "translate(80, 0)" }, wf = ["fill"], Cf = { transform: "translate(150, 0)" }, $f = ["fill"], Sf = /* @__PURE__ */ ue({
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
    })), s = se({
      visible: !1,
      x: 0,
      y: 0,
      text: ""
    }), i = (f) => typeof f == "string" ? f.charAt(0).toUpperCase() + f.slice(1).toLowerCase() : f, r = (f, p) => {
      const g = f.currentTarget.closest("svg");
      if (!g) return;
      const b = g.getBoundingClientRect(), y = g.createSVGPoint();
      y.x = f.clientX - b.left, y.y = f.clientY - b.top, s.value = {
        visible: !0,
        x: y.x,
        y: y.y - 20,
        text: p
      };
    }, l = (f) => {
      if (s.value.visible) {
        const p = f.currentTarget, g = p.getBoundingClientRect(), b = p.createSVGPoint();
        b.x = f.clientX - g.left, b.y = f.clientY - g.top, s.value.x = b.x, s.value.y = b.y - 20;
      }
    }, c = () => {
      s.value.visible = !1;
    }, d = () => {
      s.value.visible = !1;
    }, h = C(() => {
      const f = [], g = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let b = 1; b <= 10; b++) {
        const y = b, v = (y - 1) / 9, x = a.chartMargin + g - v * g;
        f.push({ value: y, y: x });
      }
      return f;
    });
    return t({ isDark: n }), (f, p) => (m(), _("div", Lh, [
      (m(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full boxplot-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: l,
        onMouseleave: c
      }, [
        s.value.visible ? (m(), _("g", {
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
          }, null, 8, Ph),
          u("text", {
            x: "0",
            y: "0",
            "text-anchor": "middle",
            fill: o.value.tooltipText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "middle"
          }, A(s.value.text), 9, Ih)
        ], 8, Rh)) : V("", !0),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Fh),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: o.value.axis
        }, null, 8, Oh),
        (m(!0), _(ce, null, me(h.value, (g, b) => (m(), _(ce, { key: b }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: g.y,
            x2: e.chartMargin,
            y2: g.y,
            stroke: o.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Vh),
          u("text", {
            x: e.chartMargin - 12,
            y: g.y + 4,
            "text-anchor": "end",
            fill: o.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(g.value), 9, zh)
        ], 64))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: o.value.axis,
          "stroke-width": "2"
        }, null, 8, Nh),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: o.value.axis
        }, null, 8, jh),
        (m(!0), _(ce, null, me(e.boxplotData, (g, b) => (m(), _(ce, { key: b }, [
          u("g", {
            transform: `translate(${g.centerX}, 0)`
          }, [
            g.isTotal ? (m(), _(ce, { key: 0 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Wh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Kh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Yh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#8b5cf6",
                "stroke-width": "2.5"
              }, null, 8, Uh),
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
              }, null, 8, qh)
            ], 64)) : (m(), _(ce, { key: 1 }, [
              u("line", {
                x1: 0,
                y1: g.minY,
                x2: 0,
                y2: g.q1Y,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Xh),
              u("line", {
                x1: 0,
                y1: g.q3Y,
                x2: 0,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Gh),
              u("line", {
                x1: -18,
                y1: g.minY,
                x2: 18,
                y2: g.minY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Zh),
              u("line", {
                x1: -18,
                y1: g.maxY,
                x2: 18,
                y2: g.maxY,
                stroke: "#C67DFF",
                "stroke-width": "2.5"
              }, null, 8, Qh),
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
              }, null, 8, Jh)
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
            }, null, 40, ef),
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
            }, null, 40, tf),
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
            }, null, 40, af),
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
            }, null, 40, nf),
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
            }, null, 40, of),
            g.averageY ? (m(), _("line", {
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
            }, null, 40, sf)) : V("", !0)
          ], 8, Hh),
          u("text", {
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: o.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(i(g.label)), 9, rf),
          g.responseCount ? (m(), _("text", {
            key: 0,
            x: g.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: o.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(g.responseCount), 9, lf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), _("g", {
          key: 1,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", df, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
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
            }, " Min ", 8, hf)
          ]),
          u("g", ff, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#a855f7",
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
            }, " Q1 ", 8, mf)
          ]),
          u("g", pf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#7c3aed",
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
            }, " Q3 ", 8, vf)
          ]),
          u("g", yf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: o.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, xf),
            u("text", {
              x: "10",
              y: "4",
              fill: o.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, _f)
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
            }, " Avg ", 8, wf)
          ]),
          u("g", Cf, [
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
            }, " Median ", 8, $f)
          ])
        ], 8, cf)) : V("", !0)
      ], 44, Eh))
    ]));
  }
}), Mf = /* @__PURE__ */ pe(Sf, [["__scopeId", "data-v-9ac5c075"]]), Df = { class: "chart-container" }, Af = ["viewBox"], Tf = ["x1", "y1", "x2", "y2", "stroke"], Bf = ["points", "fill"], Lf = ["x1", "y1", "x2", "y2", "stroke"], Ef = ["x1", "y1", "x2", "y2", "stroke"], Rf = ["x", "y", "fill"], Pf = ["x", "y", "fill", "transform"], If = ["x1", "y1", "x2", "y2", "stroke"], Ff = ["points", "fill"], Of = ["transform"], Vf = ["y1", "y2", "stroke", "onMouseenter"], zf = ["x", "y", "width", "height", "fill", "stroke", "onMouseenter"], Nf = ["x1", "y1", "x2", "y2", "onMouseenter"], jf = ["x1", "y1", "x2", "y2", "onMouseenter"], Hf = ["cy", "stroke", "onMouseenter"], Wf = ["cy", "stroke", "onMouseenter"], Kf = ["x", "y", "fill"], Yf = ["x", "y", "fill"], Uf = ["transform"], qf = { transform: "translate(-180, 0)" }, Xf = ["stroke"], Gf = ["fill"], Zf = { transform: "translate(-120, 0)" }, Qf = ["fill"], Jf = { transform: "translate(-60, 0)" }, eg = ["fill"], tg = { transform: "translate(0, 0)" }, ag = ["stroke"], ng = ["fill"], og = { transform: "translate(60, 0)" }, sg = ["fill"], ig = { transform: "translate(130, 0)" }, rg = ["fill"], lg = ["transform"], cg = ["x", "y", "width", "height", "fill", "stroke"], dg = ["y", "fill"], ug = ["y", "fill"], hn = 10, hg = 14, Hn = 13, Xs = 4, Gs = 12, fg = /* @__PURE__ */ ue({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = hn + Hn + Xs + Gs + hn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(x, k, w) {
      const $ = w ? 0.6 : 0.535;
      return Math.ceil(Math.max(x, 1) * k * $);
    }
    function l(x, k) {
      return Math.max(
        r(x.length, Hn, !0),
        r(k.length, Gs, !1),
        52
      ) + hg * 2;
    }
    function c(x, k, w, $) {
      const D = w / 2, S = 6, R = Math.min(
        Math.max(x, D + S),
        a.chartWidth - D - S
      ), P = S + $ + 10, I = a.chartHeight - S + 10, M = Math.min(Math.max(k, P), I);
      return { x: R, y: M };
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
    })), h = se({
      visible: !1,
      x: 0,
      y: 0,
      title: "",
      text: "",
      width: 0,
      height: 0
    }), f = (x) => typeof x == "string" ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase() : x, p = (x, k, w) => {
      const $ = x.currentTarget.closest("svg");
      if (!$) return;
      const D = $.getBoundingClientRect(), S = $.createSVGPoint();
      S.x = x.clientX - D.left, S.y = x.clientY - D.top;
      let R = f(k.label), P = "";
      switch (w) {
        case "body":
          P = `Q1: ${k.q1.toFixed(1)} | Q3: ${k.q3.toFixed(1)}`;
          break;
        case "wick":
          P = `Min: ${k.low.toFixed(1)} | Max: ${k.high.toFixed(1)}`;
          break;
        case "median":
          P = `Median: ${k.median.toFixed(1)}`;
          break;
        case "average":
          P = `Average: ${k.average?.toFixed(1) ?? ""}`;
          break;
        case "min":
          P = `Min: ${k.low.toFixed(1)}`;
          break;
        case "max":
          P = `Max: ${k.high.toFixed(1)}`;
          break;
      }
      const I = l(R, P), M = s;
      let L = S.x, B = S.y - 20;
      const N = c(L, B, I, M);
      L = N.x, B = N.y, h.value = {
        visible: !0,
        x: L,
        y: B,
        title: R,
        text: P,
        width: I,
        height: M
      };
    }, g = (x) => {
      if (h.value.visible) {
        const k = x.currentTarget, w = k.getBoundingClientRect(), $ = k.createSVGPoint();
        $.x = x.clientX - w.left, $.y = x.clientY - w.top;
        let D = $.x, S = $.y - 20;
        const R = c(D, S, h.value.width, h.value.height);
        h.value.x = R.x, h.value.y = R.y;
      }
    }, b = () => {
      h.value.visible = !1;
    }, y = () => {
      h.value.visible = !1;
    }, v = C(() => {
      const x = [], w = a.chartHeight - a.chartMargin - a.chartBottomMargin;
      for (let $ = 1; $ <= 10; $++) {
        const D = $, S = (D - 1) / 9, R = a.chartMargin + w - S * w;
        x.push({ value: D, y: R });
      }
      return x;
    });
    return t({ isDark: n }), (x, k) => (m(), _("div", Df, [
      (m(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "candlestick-svg",
        style: Ce(`min-height: ${e.chartHeight}px; min-width: ${e.chartWidth}px;`),
        onMousemove: g,
        onMouseleave: b
      }, [
        k[4] || (k[4] = u("defs", null, [
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
        }, null, 8, Tf),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, Bf),
        (m(!0), _(ce, null, me(v.value, (w, $) => (m(), _("line", {
          key: `grid-${$}`,
          x1: e.chartMargin,
          y1: w.y,
          x2: e.chartWidth - e.chartMargin,
          y2: w.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, Lf))), 128)),
        (m(!0), _(ce, null, me(v.value, (w, $) => (m(), _(ce, { key: $ }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: w.y,
            x2: e.chartMargin,
            y2: w.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Ef),
          u("text", {
            x: e.chartMargin - 12,
            y: w.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(w.value), 9, Rf)
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
        }, A(f(e.yAxisLabel)), 9, Pf),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartHeight - e.chartBottomMargin,
          x2: e.chartWidth - e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, If),
        u("polygon", {
          points: `${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin - 4} ${e.chartWidth - e.chartMargin},${e.chartHeight - e.chartBottomMargin + 4} ${e.chartWidth - e.chartMargin + 10},${e.chartHeight - e.chartBottomMargin}`,
          fill: d.value.axis
        }, null, 8, Ff),
        (m(!0), _(ce, null, me(e.candlestickData, (w, $) => (m(), _(ce, { key: $ }, [
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
            }, null, 40, Vf),
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
            }, null, 40, zf),
            w.medianY ? (m(), _("line", {
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
            }, null, 40, Nf)) : V("", !0),
            w.averageY ? (m(), _("line", {
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
            }, null, 40, jf)) : V("", !0),
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
            }, null, 40, Hf),
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
            }, null, 40, Wf)
          ], 8, Of),
          u("text", {
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 22,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(f(w.label)), 9, Kf),
          w.responseCount ? (m(), _("text", {
            key: 0,
            x: w.centerX,
            y: e.chartHeight - e.chartBottomMargin + 38,
            "text-anchor": "middle",
            fill: d.value.tickText,
            "font-size": "11",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, " n=" + A(w.responseCount), 9, Yf)) : V("", !0)
        ], 64))), 128)),
        e.showLegend ? (m(), _("g", {
          key: 0,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 35})`
        }, [
          u("g", qf, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#5d4b93",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, Xf),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Min ", 8, Gf)
          ]),
          u("g", Zf, [
            k[0] || (k[0] = u("rect", {
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
            }, " Q1 ", 8, Qf)
          ]),
          u("g", Jf, [
            k[1] || (k[1] = u("rect", {
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
            }, " Q3 ", 8, eg)
          ]),
          u("g", tg, [
            u("circle", {
              cx: "0",
              cy: "0",
              r: "5",
              fill: "#C67DFF",
              stroke: d.value.dotStroke,
              "stroke-width": "1.5"
            }, null, 8, ag),
            u("text", {
              x: "10",
              y: "4",
              fill: d.value.legendText,
              "font-size": "12",
              "font-family": "'DM Sans', sans-serif",
              "font-weight": "500"
            }, " Max ", 8, ng)
          ]),
          u("g", og, [
            k[2] || (k[2] = u("line", {
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
            }, " Avg ", 8, sg)
          ]),
          u("g", ig, [
            k[3] || (k[3] = u("line", {
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
            }, " Median ", 8, rg)
          ])
        ], 8, Uf)) : V("", !0),
        h.value.visible ? (m(), _("g", {
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
          }, null, 8, cg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + hn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, dg),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + hn + Hn + Xs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, ug)
        ], 8, lg)) : V("", !0)
      ], 44, Af))
    ]));
  }
}), gg = /* @__PURE__ */ pe(fg, [["__scopeId", "data-v-22efd66d"]]), mg = ["viewBox"], pg = ["x1", "y1", "x2", "y2", "stroke"], bg = ["x1", "y1", "x2", "y2", "stroke"], vg = ["points", "fill"], yg = ["x1", "y1", "x2", "y2", "stroke"], xg = ["x", "y", "fill"], _g = ["x", "y", "fill", "transform"], kg = ["x1", "y1", "x2", "y2", "stroke"], wg = ["points", "fill"], Cg = ["x1", "y1", "x2", "y2", "stroke"], $g = ["x", "y", "fill"], Sg = ["x", "y", "fill"], Mg = ["d"], Dg = ["x", "y", "width", "height", "onMouseenter"], Ag = ["x1", "y1", "x2", "y2"], Tg = ["x", "y"], Bg = ["x1", "y1", "x2", "y2"], Lg = ["x", "y"], Eg = ["x1", "y1", "x2", "y2"], Rg = ["x", "y"], Pg = ["x1", "y1", "x2", "y2"], Ig = ["x", "y"], Fg = ["x1", "y1", "x2", "y2"], Og = ["x", "y"], Vg = ["x1", "y1", "x2", "y2"], zg = ["x", "y"], Ng = ["transform"], jg = { transform: "translate(-220, 0)" }, Hg = ["fill"], Wg = { transform: "translate(-140, 0)" }, Kg = ["fill"], Yg = { transform: "translate(-80, 0)" }, Ug = ["fill"], qg = { transform: "translate(-20, 0)" }, Xg = ["fill"], Gg = { transform: "translate(60, 0)" }, Zg = ["fill"], Qg = { transform: "translate(130, 0)" }, Jg = ["fill"], em = { transform: "translate(180, 0)" }, tm = ["fill"], am = ["transform"], nm = ["x", "y", "width", "height", "fill", "stroke"], om = ["y", "fill"], sm = ["y", "fill"], fn = 10, im = 14, Wn = 13, Zs = 12, Qs = 4, rm = /* @__PURE__ */ ue({
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
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = fn + Wn + Qs + Zs + fn, i = C(() => ({
      bg: o.value.tooltipBg,
      border: o.value.tooltipBorder,
      text: o.value.tooltipText,
      secondary: n.value ? "#d1d5db" : "#e2e8f0"
    }));
    function r(G, te, oe) {
      const ge = oe ? 0.6 : 0.535;
      return Math.ceil(Math.max(G, 1) * te * ge);
    }
    function l(G, te) {
      return Math.max(
        r(G.length, Wn, !0),
        r(te.length, Zs, !1),
        52
      ) + im * 2;
    }
    function c(G, te, oe, ge) {
      const xe = oe / 2, O = 6, Z = Math.min(
        Math.max(G, xe + O),
        a.chartWidth - xe - O
      ), re = O + ge + 10, fe = a.chartHeight - O + 10, ye = Math.min(Math.max(te, re), fe);
      return { x: Z, y: ye };
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
    })), h = se({
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
    ), b = C(() => Math.max(g.value - p.value, 1)), y = C(() => a.chartHeight - a.chartMargin - a.chartBottomMargin), v = C(() => b.value / 10 * 0.52);
    function x(G) {
      if (G < 1 || G > 10) return null;
      const te = b.value / 10;
      return p.value + (G - 0.5) * te;
    }
    const k = C(
      () => Array.from({ length: 10 }, (G, te) => {
        const oe = te + 1, ge = x(oe);
        return ge === null ? null : { score: oe, x: ge };
      }).filter((G) => G !== null)
    ), w = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const G = Math.max(...a.histogram.map((oe) => oe.count || 0), 1), te = Math.max(1, Math.ceil(G * 0.2));
      return G + te;
    }), $ = C(() => {
      if (!a.histogram || a.histogram.length === 0) return 1;
      const G = a.averageScore || 0;
      let te = 0, oe = 0;
      if (a.histogram.forEach((xe) => {
        const O = xe.count || 0;
        te += O;
        const Z = xe.score - G;
        oe += O * (Z * Z);
      }), te === 0) return 1;
      const ge = oe / te;
      return Math.sqrt(ge) || 1;
    }), D = (G, te, oe) => {
      if (oe === 0) return 0;
      const ge = 1 / (oe * Math.sqrt(2 * Math.PI)), xe = -0.5 * Math.pow((G - te) / oe, 2);
      return ge * Math.exp(xe);
    }, S = C(() => {
      if (!a.histogram || a.histogram.length === 0 || a.averageScore === 0 && $.value === 0) return null;
      const G = a.averageScore, te = $.value, oe = 100, xe = Math.max(...a.histogram.map((fe) => fe.count || 0), 1) / w.value * y.value;
      if (xe <= 0) return null;
      let O = 0;
      for (let fe = 0; fe <= oe; fe++) {
        const ye = 1 + 9 * (fe / oe), we = D(ye, G, te);
        we > O && (O = we);
      }
      if (O <= 0) return null;
      const Z = xe / O, re = [];
      for (let fe = 0; fe <= oe; fe++) {
        const ye = 1 + 9 * (fe / oe), we = D(ye, G, te) * Z, Ye = x(ye);
        if (Ye !== null) {
          const vt = a.chartHeight - a.chartBottomMargin - we;
          re.push(`${fe === 0 ? "M" : "L"} ${Ye} ${vt}`);
        }
      }
      return re.join(" ");
    }), R = C(() => {
      if (!a.histogram || a.histogram.length === 0) return [];
      const G = b.value / 10;
      return a.histogram.map((te) => {
        const oe = Number(te.score);
        if (!Number.isFinite(oe) || oe < 1 || oe > 10)
          return null;
        const ge = p.value + (oe - 0.5) * G, xe = te.count > 0 ? te.count / w.value * y.value : 0, O = a.chartHeight - a.chartBottomMargin - xe;
        return {
          score: oe,
          count: te.count,
          x: ge,
          y: O,
          height: xe
        };
      }).filter((te) => te !== null);
    }), P = C(() => x(a.minScore)), I = C(() => x(a.maxScore)), M = C(() => x(a.q1Score)), L = C(() => x(a.medianScore)), B = C(() => x(a.q3Score)), N = C(() => x(a.averageScore)), W = C(() => a.minScore), q = C(() => a.maxScore), ee = C(() => a.q1Score), X = C(() => a.medianScore), le = C(() => a.q3Score), U = C(() => a.averageScore), T = C(() => {
      const G = [], te = a.chartMargin - 8, oe = 18;
      M.value !== null && G.push({
        x: M.value,
        y: te,
        value: a.q1Score,
        label: `Q1: ${ee.value.toFixed(1)}`,
        color: "#a855f7",
        id: "q1",
        width: 55
      }), L.value !== null && G.push({
        x: L.value,
        y: te - oe,
        value: a.medianScore,
        label: `Median: ${X.value.toFixed(1)}`,
        color: "#8b5cf6",
        id: "median",
        width: 90
      }), N.value !== null && G.push({
        x: N.value,
        y: te - oe,
        value: a.averageScore,
        label: `Avg: ${U.value.toFixed(1)}`,
        color: "#f97316",
        id: "avg",
        width: 65
      }), B.value !== null && G.push({
        x: B.value,
        y: te,
        value: a.q3Score,
        label: `Q3: ${le.value.toFixed(1)}`,
        color: "#7c3aed",
        id: "q3",
        width: 55
      }), G.sort((O, Z) => (O.x || 0) - (Z.x || 0));
      const ge = [[], [], []];
      G.forEach((O) => {
        if (O.x === null) return;
        let Z = -1;
        for (let re = 0; re < ge.length; re++) {
          let fe = !1;
          for (const ye of ge[re]) {
            if (ye.x === null) continue;
            const we = Math.abs(O.x - ye.x), Ye = (O.width + ye.width) / 2 + 10;
            if (we < Ye) {
              fe = !0;
              break;
            }
          }
          if (!fe) {
            Z = re;
            break;
          }
        }
        Z === -1 && (Z = ge.length - 1), O.y = te - Z * oe, ge[Z].push(O);
      });
      const xe = 15;
      return G.forEach((O) => {
        O.y < xe && (O.y = xe);
      }), G;
    }), z = (G) => T.value.find((oe) => oe.id === G)?.y || a.chartMargin - 10, K = C(() => {
      const G = [];
      for (let oe = 0; oe <= 5; oe++) {
        const ge = Math.round(w.value / 5 * oe), xe = a.chartHeight - a.chartBottomMargin - oe / 5 * y.value;
        G.push({ value: ge, y: xe });
      }
      return G;
    });
    function de(G, te, oe) {
      const ge = G.createSVGPoint();
      ge.x = te, ge.y = oe;
      const xe = G.getScreenCTM();
      if (!xe) {
        const Z = G.getBoundingClientRect();
        return { x: te - Z.left, y: oe - Z.top };
      }
      const O = ge.matrixTransform(xe.inverse());
      return { x: O.x, y: O.y };
    }
    const ve = (G, te) => {
      a.interactive && Y(G, te);
    }, Q = () => {
      a.interactive && ie();
    }, Y = (G, te) => {
      const oe = G.currentTarget.closest("svg");
      if (!oe) return;
      const { x: ge, y: xe } = de(oe, G.clientX, G.clientY), O = `Score: ${te.score}`, Z = `Count: ${Number(te.count ?? 0).toLocaleString()}`, re = l(O, Z), fe = s, ye = typeof te?.x == "number" ? te.x : ge;
      let we = xe - 20;
      const Ye = c(ye, we, re, fe);
      h.value = {
        visible: !0,
        x: Ye.x,
        y: Ye.y,
        title: O,
        text: Z,
        width: re,
        height: fe,
        anchorX: typeof te?.x == "number" ? te.x : null
      };
    }, H = (G) => {
      if (a.interactive && h.value.visible) {
        const te = G.currentTarget, { x: oe, y: ge } = de(te, G.clientX, G.clientY), xe = h.value.anchorX, O = xe != null && Number.isFinite(xe) ? xe : oe;
        let Z = ge - 20;
        const re = c(O, Z, h.value.width, h.value.height);
        h.value.x = re.x, h.value.y = re.y;
      }
    }, ne = () => {
      ie();
    }, ie = () => {
      h.value.visible = !1, h.value.anchorX = null;
    };
    return t({ isDark: n }), (G, te) => (m(), _("div", {
      class: J(["chart-container", { "chart-container--static": !e.interactive }])
    }, [
      (m(), _("svg", {
        viewBox: `0 0 ${e.chartWidth} ${e.chartHeight}`,
        class: "w-full histogram-svg",
        style: Ce(`min-height: ${e.chartHeight}px;`),
        onMousemove: H,
        onMouseleave: ne
      }, [
        te[7] || (te[7] = u("defs", null, [
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
        (m(!0), _(ce, null, me(K.value, (oe, ge) => (m(), _("line", {
          key: `grid-${ge}`,
          x1: p.value,
          y1: oe.y,
          x2: g.value,
          y2: oe.y,
          stroke: d.value.gridLine,
          "stroke-width": "1",
          "stroke-dasharray": "4,4",
          opacity: "0.6"
        }, null, 8, pg))), 128)),
        u("line", {
          x1: e.chartMargin,
          y1: e.chartMargin,
          x2: e.chartMargin,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: d.value.axis,
          "stroke-width": "2"
        }, null, 8, bg),
        u("polygon", {
          points: `${e.chartMargin - 4},${e.chartMargin} ${e.chartMargin + 4},${e.chartMargin} ${e.chartMargin},${e.chartMargin - 10}`,
          fill: d.value.axis
        }, null, 8, vg),
        (m(!0), _(ce, null, me(K.value, (oe, ge) => (m(), _(ce, {
          key: `y-tick-${ge}`
        }, [
          u("line", {
            x1: e.chartMargin - 6,
            y1: oe.y,
            x2: e.chartMargin,
            y2: oe.y,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, yg),
          u("text", {
            x: e.chartMargin - 12,
            y: oe.y + 4,
            "text-anchor": "end",
            fill: d.value.tickText,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif"
          }, A(oe.value), 9, xg)
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
        }, " Count ", 8, _g),
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
        }, null, 8, wg),
        (m(!0), _(ce, null, me(k.value, (oe) => (m(), _(ce, {
          key: `tick-${oe.score}`
        }, [
          u("line", {
            x1: oe.x,
            y1: e.chartHeight - e.chartBottomMargin,
            x2: oe.x,
            y2: e.chartHeight - e.chartBottomMargin + 5,
            stroke: d.value.tickLine,
            "stroke-width": "1"
          }, null, 8, Cg),
          u("text", {
            x: oe.x,
            y: e.chartHeight - e.chartBottomMargin + 20,
            "text-anchor": "middle",
            fill: d.value.labelText,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif"
          }, A(oe.score), 9, $g)
        ], 64))), 128)),
        u("text", {
          x: e.chartWidth / 2,
          y: e.chartHeight - e.chartBottomMargin + 40,
          "text-anchor": "middle",
          fill: d.value.labelText,
          "font-size": "14",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Score ", 8, Sg),
        S.value ? (m(), _("path", {
          key: 0,
          d: S.value,
          fill: "none",
          stroke: "#8b5cf6",
          "stroke-width": "2.5",
          opacity: "0.7",
          class: "gaussian-curve"
        }, null, 8, Mg)) : V("", !0),
        (m(!0), _(ce, null, me(R.value, (oe, ge) => (m(), _("rect", {
          key: `bar-${ge}`,
          x: oe.x - v.value / 2,
          y: oe.y,
          width: v.value,
          height: oe.height,
          fill: "rgba(198, 125, 255, 0.6)",
          stroke: "#C67DFF",
          "stroke-width": "2",
          rx: "4",
          class: "histogram-bar",
          onMouseenter: (xe) => ve(xe, oe),
          onMouseleave: Q,
          style: Ce({ cursor: e.interactive ? "pointer" : "default" })
        }, null, 44, Dg))), 128)),
        e.showStatLabels && P.value ? (m(), _("line", {
          key: 1,
          x1: P.value,
          y1: e.chartMargin,
          x2: P.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#5d4b93",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Ag)) : V("", !0),
        e.showStatLabels && P.value ? (m(), _("text", {
          key: 2,
          x: P.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#5d4b93",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Min: " + A(W.value.toFixed(1)), 9, Tg)) : V("", !0),
        e.showStatLabels && M.value ? (m(), _("line", {
          key: 3,
          x1: M.value,
          y1: e.chartMargin,
          x2: M.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#a855f7",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Bg)) : V("", !0),
        e.showStatLabels && M.value ? (m(), _("text", {
          key: 4,
          x: M.value,
          y: z("q1"),
          "text-anchor": "middle",
          fill: "#a855f7",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q1: " + A(ee.value.toFixed(1)), 9, Lg)) : V("", !0),
        e.showStatLabels && L.value ? (m(), _("line", {
          key: 5,
          x1: L.value,
          y1: e.chartMargin,
          x2: L.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#8b5cf6",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Eg)) : V("", !0),
        e.showStatLabels && L.value ? (m(), _("text", {
          key: 6,
          x: L.value,
          y: z("median"),
          "text-anchor": "middle",
          fill: "#8b5cf6",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Median: " + A(X.value.toFixed(1)), 9, Rg)) : V("", !0),
        e.showStatLabels && N.value ? (m(), _("line", {
          key: 7,
          x1: N.value,
          y1: e.chartMargin,
          x2: N.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#f97316",
          "stroke-width": "3",
          "stroke-dasharray": "6,4",
          opacity: "0.9"
        }, null, 8, Pg)) : V("", !0),
        e.showStatLabels && N.value ? (m(), _("text", {
          key: 8,
          x: N.value,
          y: z("avg"),
          "text-anchor": "middle",
          fill: "#f97316",
          "font-size": "13",
          "font-weight": "700",
          "font-family": "'DM Sans', sans-serif"
        }, " Avg: " + A(U.value.toFixed(1)), 9, Ig)) : V("", !0),
        e.showStatLabels && B.value ? (m(), _("line", {
          key: 9,
          x1: B.value,
          y1: e.chartMargin,
          x2: B.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#7c3aed",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Fg)) : V("", !0),
        e.showStatLabels && B.value ? (m(), _("text", {
          key: 10,
          x: B.value,
          y: z("q3"),
          "text-anchor": "middle",
          fill: "#7c3aed",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Q3: " + A(le.value.toFixed(1)), 9, Og)) : V("", !0),
        e.showStatLabels && I.value ? (m(), _("line", {
          key: 11,
          x1: I.value,
          y1: e.chartMargin,
          x2: I.value,
          y2: e.chartHeight - e.chartBottomMargin,
          stroke: "#C67DFF",
          "stroke-width": "2.5",
          "stroke-dasharray": "6,4",
          opacity: "0.8"
        }, null, 8, Vg)) : V("", !0),
        e.showStatLabels && I.value ? (m(), _("text", {
          key: 12,
          x: I.value,
          y: e.chartHeight - e.chartBottomMargin + 60,
          "text-anchor": "middle",
          fill: "#C67DFF",
          "font-size": "12",
          "font-weight": "600",
          "font-family": "'DM Sans', sans-serif"
        }, " Max: " + A(q.value.toFixed(1)), 9, zg)) : V("", !0),
        e.showLegend ? (m(), _("g", {
          key: 13,
          transform: `translate(${e.chartWidth / 2}, ${e.chartMargin - 50})`
        }, [
          u("g", jg, [
            te[0] || (te[0] = u("line", {
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
            }, " Gaussian ", 8, Hg)
          ]),
          u("g", Wg, [
            te[1] || (te[1] = u("line", {
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
            }, " Min ", 8, Kg)
          ]),
          u("g", Yg, [
            te[2] || (te[2] = u("line", {
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
            }, " Q1 ", 8, Ug)
          ]),
          u("g", qg, [
            te[3] || (te[3] = u("line", {
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
            }, " Median ", 8, Xg)
          ]),
          u("g", Gg, [
            te[4] || (te[4] = u("line", {
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
            }, " Avg ", 8, Zg)
          ]),
          u("g", Qg, [
            te[5] || (te[5] = u("line", {
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
            }, " Q3 ", 8, Jg)
          ]),
          u("g", em, [
            te[6] || (te[6] = u("line", {
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
            }, " Max ", 8, tm)
          ])
        ], 8, Ng)) : V("", !0),
        e.interactive && h.value.visible ? (m(), _("g", {
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
          }, null, 8, nm),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + fn,
            "text-anchor": "middle",
            fill: i.value.text,
            "font-size": "13",
            "font-weight": "600",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.title), 9, om),
          u("text", {
            x: "0",
            y: -h.value.height - 10 + fn + Wn + Qs,
            "text-anchor": "middle",
            fill: i.value.secondary,
            "font-size": "12",
            "font-weight": "500",
            "font-family": "'DM Sans', sans-serif",
            "dominant-baseline": "hanging"
          }, A(h.value.text), 9, sm)
        ], 8, am)) : V("", !0)
      ], 44, mg))
    ], 2));
  }
}), ir = /* @__PURE__ */ pe(rm, [["__scopeId", "data-v-8f9da805"]]), lm = 639, rr = 1024;
function Js(e) {
  return e < 640 ? "mobile" : e <= rr ? "tablet" : "desktop";
}
function cm() {
  const e = se(
    typeof window > "u" ? "desktop" : Js(window.innerWidth)
  ), t = () => {
    typeof window > "u" || (e.value = Js(window.innerWidth));
  };
  let a = null, n = null, o = null, s = null;
  Ze(() => {
    typeof window > "u" || (t(), a = window.matchMedia(`(max-width: ${lm}px)`), n = window.matchMedia(`(min-width: 640px) and (max-width: ${rr}px)`), o = window.matchMedia("(min-width: 1025px)"), s = () => {
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
const dm = { class: "chart-container" }, um = {
  key: 0,
  class: "loading-state loading-overlay"
}, na = 12, hm = /* @__PURE__ */ ue({
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
    Bo.use([Pr, Ir, Fr, Or]);
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), { breakpoint: s } = cm(), i = se(null), r = se(!0), l = se(!1);
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
    }, g = /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i, b = /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i, y = C(() => {
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
    }), v = (Q) => {
      const Y = Q.replace(/_/g, " ").replace(/\s+/g, " ").trim(), H = Y.match(/^Failed:\s*(.+)$/i);
      return H ? `Failed:
${H[1].trim()}` : Y;
    }, x = (Q, Y) => {
      const H = Q.trim();
      if (!H || Y < 1 || H.length <= Y) return H;
      const ne = [];
      let ie = 0;
      for (; ie < H.length; ) {
        const G = Math.min(ie + Y, H.length);
        if (G >= H.length) {
          const ge = H.slice(ie).trim();
          ge && ne.push(ge);
          break;
        }
        const te = H.slice(ie, G), oe = te.lastIndexOf(" ");
        if (oe > 0)
          for (ne.push(H.slice(ie, ie + oe).trim()), ie += oe; ie < H.length && H[ie] === " "; ) ie += 1;
        else
          ne.push(te), ie = G;
      }
      return ne.join(`
`);
    }, k = (Q, Y) => {
      const H = Q.trim();
      return !H || Y < 1 ? Q : H.split(`
`).map((ne) => x(ne.trim(), Y)).filter(Boolean).join(`
`);
    }, w = (Q) => Q.status ? Q.status : g.test(Q.name) ? "abandon" : b.test(Q.name) ? "error" : "success", $ = (Q) => Q.originalValue ?? Q.value, D = (Q, Y) => {
      const H = new Set(Y.map((ie) => ie.target)), ne = Q.filter((ie) => !H.has(ie.name));
      for (const ie of ne) {
        if (typeof ie.value == "number" && ie.value > 0) return ie.value;
        const G = Y.filter((te) => te.source === ie.name);
        if (G.length > 0)
          return G.reduce((te, oe) => te + $(oe), 0);
      }
      return Y.reduce((ie, G) => Math.max(ie, $(G)), 0);
    }, S = (Q, Y) => {
      const H = /* @__PURE__ */ new Map(), ne = new Set(Y.map((G) => G.target)), ie = Q.filter((G) => !ne.has(G.name)).map((G) => ({ name: G.name, depth: 0 }));
      for (; ie.length > 0; ) {
        const { name: G, depth: te } = ie.shift(), oe = H.get(G);
        if (!(oe !== void 0 && oe >= te)) {
          H.set(G, te);
          for (const ge of Y)
            ge.source === G && ie.push({ name: ge.target, depth: te + 1 });
        }
      }
      for (const G of Q)
        H.has(G.name) || H.set(G.name, 0);
      return H;
    }, R = (Q, Y) => {
      const H = /* @__PURE__ */ new Map(), ne = new Set(Y.map((oe) => oe.target)), ie = Q.filter((oe) => !ne.has(oe.name));
      let G = 0;
      const te = (oe) => {
        let ge = oe;
        for (; ge && !H.has(ge); )
          H.set(ge, G), G += 1, ge = Y.filter(
            (O) => O.source === ge && w({ name: O.target }) === "success"
          ).sort((O, Z) => $(Z) - $(O))[0]?.target;
      };
      return ie.forEach((oe) => te(oe.name)), H;
    }, P = (Q, Y, H) => {
      const ne = w(Q);
      if (ne === "success" && H.has(Q.name))
        return H.get(Q.name);
      if (ne === "success") {
        const ie = Y.filter((te) => te.target === Q.name);
        return 200 + (ie.length ? Math.min(
          ...ie.map(
            (te) => H.has(te.source) ? (H.get(te.source) ?? 0) + 0.01 : 500
          )
        ) : 500);
      }
      return ne === "abandon" ? 1e3 : 2e3;
    }, I = (Q, Y) => {
      const H = S(Q, Y), ne = R(Q, Y);
      return [...Q].sort((ie, G) => {
        const te = H.get(ie.name) ?? 0, oe = H.get(G.name) ?? 0;
        if (te !== oe) return te - oe;
        const ge = p[w(ie)], xe = p[w(G)];
        if (ge !== xe) return ge - xe;
        const O = P(ie, Y, ne), Z = P(G, Y, ne);
        if (O !== Z) return O - Z;
        const re = typeof ie.order == "number" ? ie.order : Number.MAX_SAFE_INTEGER, fe = typeof G.order == "number" ? G.order : Number.MAX_SAFE_INTEGER;
        return re !== fe ? re - fe : ie.name.localeCompare(G.name);
      });
    }, M = (Q, Y, H, ne) => {
      const G = k(Q, ne).split(`
`), te = Y * 0.58, ge = Math.max(...G.map((O) => O.length), 1) * te, xe = G.length * H;
      return {
        lines: G,
        width: ge,
        height: xe,
        nodeWidth: ge + na * 2
      };
    }, L = (Q, Y) => Y ? `${(Q / Y * 100).toFixed(1)}%` : "0.0%", B = (Q, Y) => typeof Q.label == "string" && Q.label ? k(v(Q.label), Y) : k(v(Q.name), Y), N = (Q, Y = 0) => {
      if (Y > 0) return Y;
      const H = Q.match(/^(\d+(?:\.\d+)?)px$/);
      if (H) return Number(H[1]);
      const ne = Q.match(/^(\d+(?:\.\d+)?)vh$/);
      return ne && typeof window < "u" ? Number(ne[1]) / 100 * window.innerHeight : 500;
    }, W = (Q, Y, H, ne, ie) => {
      if (!Y.length || !Q.length || ie <= 0) return Q;
      const G = Q.map((fe) => ({ ...fe })), te = H.labelLineHeight || Math.round(H.labelFontSize * 1.25), oe = Math.max(4, H.labelCharsPerLine), ge = Math.max(ne * 0.88, 260), xe = S(Y, G), O = /* @__PURE__ */ new Map();
      Y.forEach((fe) => {
        const ye = xe.get(fe.name) ?? 0;
        O.set(ye, (O.get(ye) ?? 0) + 1);
      });
      const Z = (fe) => {
        const we = Y.find((Jt) => Jt.name === fe)?.displayLabel || fe, vt = M(we, H.labelFontSize, te, oe).height + na * 2, Qt = xe.get(fe) ?? 0, ka = O.get(Qt) ?? 1, fa = (Math.max(ka, 1) - 1) * H.nodeGap / Math.max(ka, 1), Tn = Math.max(ge - fa, vt);
        return Math.max(1, vt / Tn * ie);
      }, re = (fe) => {
        const ye = G.filter((we) => we.target === fe);
        return ye.length > 0 ? ye.reduce((we, Ye) => we + Ye.value, 0) : G.filter((we) => we.source === fe).reduce((we, Ye) => we + Ye.value, 0);
      };
      for (let fe = 0; fe < 16; fe += 1) {
        let ye = !1;
        for (const we of Y) {
          const Ye = Z(we.name), vt = re(we.name);
          if (vt >= Ye) continue;
          const Qt = G.filter((Jt) => Jt.target === we.name), ka = G.filter((Jt) => Jt.source === we.name), fa = Qt.length > 0 ? Qt : ka;
          if (fa.length === 0) continue;
          const Tn = Ye / Math.max(vt, 1e-6);
          fa.forEach((Jt) => {
            Jt.value *= Tn;
          }), ye = !0;
        }
        if (!ye) break;
      }
      return G;
    }, q = (Q, Y, H) => {
      const ne = D(Q, Y), ie = I(Q, Y), G = H.labelLineHeight || Math.round(H.labelFontSize * 1.25), te = Math.max(4, H.labelCharsPerLine);
      let oe = H.nodeWidth;
      const ge = [], xe = ie.map((Z, re) => {
        const fe = w(Z), ye = B(Z, te);
        ge.push(ye);
        const we = M(ye, H.labelFontSize, G, te);
        H.orient === "vertical" ? oe = Math.max(oe, we.height + na * 2) : oe = Math.max(oe, we.nodeWidth);
        const Ye = a.nodeColors[Z.name] || f[fe] || ee[re % ee.length], vt = Math.max(Math.ceil(we.nodeWidth - na * 2), 48);
        return {
          ...Z,
          displayLabel: ye,
          label: {
            width: vt,
            overflow: "none",
            lineHeight: G,
            fontSize: H.labelFontSize
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
      let O = { ...H.contentMargins };
      if (H.orient === "vertical") {
        const Z = Math.max(
          ...ge.map(
            (fe) => M(fe, H.labelFontSize, G, te).width
          ),
          0
        ), re = typeof O.right == "number" ? O.right : 10;
        O = {
          ...O,
          right: Math.max(re, Z + na + H.labelDistance)
        };
      }
      return { nodes: xe, maxNodeWidth: oe, contentMargins: O, originTotal: ne };
    }, ee = [
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
    ], X = () => {
      const Q = a.data.links.filter(
        (ie) => ie.source && ie.target && typeof ie.value == "number"
      ), Y = Math.max(...Q.map((ie) => ie.value), 1), H = Math.max(1, Y * 0.01), ne = Q.map((ie) => ({
        ...ie,
        originalValue: ie.value,
        value: ie.value < Y * 0.01 ? H : ie.value
      }));
      return {
        nodes: a.data.nodes.filter((ie) => ie.name),
        links: ne
      };
    }, le = (Q, Y) => (H) => {
      const ne = H.dataType === "node", ie = o.value.tooltipText, G = n.value ? "#d1d5db" : "#e2e8f0";
      if (ne) {
        const Z = Q.filter((ye) => ye.target === H.name), re = Q.filter((ye) => ye.source === H.name), fe = Z.length > 0 ? Z.reduce((ye, we) => ye + (we.originalValue || we.value), 0) : re.reduce((ye, we) => ye + (we.originalValue || we.value), 0);
        return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ie};">${H.name}</div><div style="color: ${G}; font-size: 12px;">Count: ${fe.toLocaleString()}</div>`;
      }
      const te = H.data?.source || H.source || "Unknown", oe = H.data?.target || H.target || "Unknown", ge = Number(H.data?.originalValue ?? H.data?.value ?? H.value ?? 0), xe = L(ge, Y), O = `${ge.toLocaleString()} (${xe})`;
      return `<div style="font-weight: 600; margin-bottom: 4px; color: ${ie};">${te} → ${oe}</div><div style="color: ${G}; font-size: 12px;">Flow: ${O}</div>`;
    }, U = () => {
      if (!c || !a.data.nodes?.length || !a.data.links?.length) return;
      const Q = y.value, Y = n.value ? "rgba(110, 110, 120, 0.35)" : "rgba(148, 163, 184, 0.45)", H = n.value ? "rgba(130, 130, 140, 0.5)" : "rgba(100, 116, 139, 0.55)", ne = n.value ? "rgba(203, 213, 225, 0.92)" : "#64748b", ie = Q.labelPosition === "inside" ? "#ffffff" : n.value ? o.value.textPrimary : "#334155";
      try {
        const { nodes: G, links: te } = X(), { nodes: oe, maxNodeWidth: ge, contentMargins: xe, originTotal: O } = q(
          G,
          te,
          Q
        ), Z = N(a.height, i.value?.clientHeight ?? 0), re = W(
          te,
          oe,
          {
            labelFontSize: Q.labelFontSize,
            labelLineHeight: Q.labelLineHeight || Math.round(Q.labelFontSize * 1.25),
            labelCharsPerLine: Q.labelCharsPerLine,
            nodeGap: Q.nodeGap
          },
          Z,
          O
        ), fe = {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove|click",
            confine: !0,
            formatter: le(re, O),
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
              data: oe,
              links: re,
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  color: H,
                  opacity: 1
                }
              },
              lineStyle: {
                color: Y,
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
                color: ie,
                fontWeight: 700,
                fontSize: Q.labelFontSize,
                lineHeight: Q.labelLineHeight || Math.round(Q.labelFontSize * 1.25),
                padding: na,
                align: "center",
                verticalAlign: "middle",
                overflow: "none",
                ...Q.orient === "horizontal" ? { width: Math.max(ge - na * 2, 48), overflow: "none" } : Q.labelWrap && Q.labelTextWidth > 0 ? { width: Q.labelTextWidth, overflow: "none" } : {},
                ...Q.labelDistance > 0 ? { distance: Q.labelDistance } : {},
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ye) => ye.data?.displayLabel || ye.name || ""
              },
              edgeLabel: Q.edgeLabelShow ? {
                show: !0,
                fontSize: Q.edgeLabelFontSize,
                color: ne,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (ye) => {
                  const we = Number(ye.data?.originalValue ?? ye.value ?? 0), Ye = L(we, O);
                  return `${we.toLocaleString()} (${Ye})`;
                }
              } : { show: !1 },
              nodeAlign: h.node.align,
              nodeGap: Q.nodeGap,
              nodeWidth: ge,
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
        c.setOption(fe), c.resize();
      } catch (G) {
        console.error("Error setting Sankey chart options:", G), l.value = !0;
      }
    }, T = async () => {
      if (i.value)
        try {
          c = Bo.init(i.value), U(), window.addEventListener("resize", de);
        } catch (Q) {
          console.error("Error initializing Sankey chart:", Q), l.value = !0;
        } finally {
          r.value = !1;
        }
    }, z = () => {
      const Q = i.value;
      return !!(Q && Q.clientWidth > 0 && Q.clientHeight > 0);
    }, K = async () => {
      if (await He(), z()) return T();
      await new Promise((Q) => {
        const Y = i.value;
        if (!Y) {
          Q();
          return;
        }
        d = new ResizeObserver(() => {
          z() && (d?.disconnect(), d = null, T().then(Q));
        }), d.observe(Y);
      });
    }, de = () => c?.resize(), ve = () => {
      window.removeEventListener("resize", de), d?.disconnect(), d = null, c && (c.dispose(), c = null);
    };
    return Ze(() => K()), ci(ve), Ee(() => a.data, U, { deep: !0 }), Ee(n, U), Ee(s, U), t({ isDark: n }), (Q, Y) => (m(), _("div", dm, [
      l.value ? (m(), _("div", {
        key: 0,
        class: "error-state",
        style: Ce({ height: e.height })
      }, [...Y[0] || (Y[0] = [
        Un('<div class="error-content" data-v-05d0f97f><svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-05d0f97f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-05d0f97f></path></svg><p class="error-title" data-v-05d0f97f>Chart could not be loaded</p><p class="error-description" data-v-05d0f97f>Please check the data format.</p></div>', 1)
      ])], 4)) : (m(), _("div", {
        key: 1,
        class: "chart-wrapper",
        style: Ce({ height: e.height })
      }, [
        u("div", {
          ref_key: "chartEl",
          ref: i,
          class: "chart-content"
        }, null, 512),
        r.value ? (m(), _("div", um, [...Y[1] || (Y[1] = [
          Un('<div class="loading-container" data-v-05d0f97f><div class="sankey-loader" data-v-05d0f97f><div class="flow flow-1" data-v-05d0f97f></div><div class="flow flow-2" data-v-05d0f97f></div><div class="flow flow-3" data-v-05d0f97f></div><div class="flow flow-4" data-v-05d0f97f></div></div><p class="loading-text" data-v-05d0f97f>Loading Sankey diagram...</p></div>', 1)
        ])])) : V("", !0)
      ], 4))
    ]));
  }
}), Zt = /* @__PURE__ */ pe(hm, [["__scopeId", "data-v-05d0f97f"]]), fm = ["open"], gm = { class: "card-header metric-collapsible__summary" }, mm = { class: "header-content metric-header-content" }, pm = { class: "metric-header-content__main" }, bm = { class: "metric-header-content__text" }, vm = { class: "metric-header-content__loaded" }, ym = {
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
}, wm = {
  key: 0,
  class: "chart-metric-container__body"
}, Cm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, $m = { key: "body-content" }, Sm = {
  key: 1,
  class: "chart-metric-container chart-metric-container--static"
}, Mm = { class: "card-header" }, Dm = { class: "header-content metric-header-content" }, Am = { class: "metric-header-content__main" }, Tm = { class: "metric-header-content__text" }, Bm = { class: "metric-header-content__loaded" }, Lm = {
  key: 0,
  class: "card-title"
}, Em = {
  key: 0,
  class: "card-subtitle"
}, Rm = {
  key: 0,
  class: "metric-header-content__export"
}, Pm = {
  key: 0,
  class: "cmc-header-aside"
}, Im = {
  key: 0,
  class: "chart-metric-container__body"
}, Fm = {
  key: "body-loading",
  class: "cmc-body-loading",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, Om = { key: "body-content" }, Vm = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = se(a.defaultOpen), s = se(a.defaultOpen), i = oo();
    function r(f) {
      return f.some((p) => {
        if (p.type === Rr) return !1;
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
      const g = o.value, b = p.open;
      if (o.value = b, b && !g) {
        const y = !s.value;
        s.value = !0, y && n("open");
      }
      n("toggle", b);
    }
    return (f, p) => e.collapsible ? (m(), _("details", {
      key: 0,
      class: "chart-metric-container metric-collapsible",
      open: o.value,
      onToggle: h
    }, [
      u("summary", gm, [
        u("div", mm, [
          u("div", pm, [
            u("div", bm, [
              u("div", vm, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (m(), _("h3", ym, A(e.title), 1)) : V("", !0)
                ], !0),
                e.subtitle ? (m(), _("p", xm, A(e.subtitle), 1)) : V("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (m(), _("div", _m, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          f.$slots.headerAside ? (m(), _("div", km, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
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
      l.value ? (m(), _("div", wm, [
        j(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            c.value ? (m(), _("div", Cm, [
              ke(f.$slots, "loading", {}, () => [
                p[1] || (p[1] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), _("div", $m, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : V("", !0)
    ], 40, fm)) : (m(), _("div", Sm, [
      u("div", Mm, [
        u("div", Dm, [
          u("div", Am, [
            u("div", Tm, [
              u("div", Bm, [
                ke(f.$slots, "title", {}, () => [
                  e.title ? (m(), _("h3", Lm, A(e.title), 1)) : V("", !0)
                ], !0),
                e.subtitle ? (m(), _("p", Em, A(e.subtitle), 1)) : V("", !0),
                ke(f.$slots, "headerAppend", {}, void 0, !0)
              ])
            ]),
            d.value ? (m(), _("div", Rm, [
              ke(f.$slots, "headerExport", {}, void 0, !0)
            ])) : V("", !0)
          ]),
          f.$slots.headerAside ? (m(), _("div", Pm, [
            ke(f.$slots, "headerAside", {}, void 0, !0)
          ])) : V("", !0)
        ])
      ]),
      l.value ? (m(), _("div", Im, [
        j(ut, {
          name: "chart-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            c.value ? (m(), _("div", Fm, [
              ke(f.$slots, "loading", {}, () => [
                p[2] || (p[2] = u("div", {
                  class: "cmc-body-loading__skeleton ut-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1))
              ], !0)
            ])) : (m(), _("div", Om, [
              ke(f.$slots, "default", {}, void 0, !0)
            ]))
          ]),
          _: 3
        })
      ])) : V("", !0)
    ]));
  }
}), Se = /* @__PURE__ */ pe(Vm, [["__scopeId", "data-v-46090b42"]]);
function zm(e, t) {
  return m(), _("svg", {
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
function to(e, t) {
  return m(), _("svg", {
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
function Mo(e, t) {
  return m(), _("svg", {
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
  return m(), _("svg", {
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
function Nm(e, t) {
  return m(), _("svg", {
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
  return m(), _("svg", {
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
function lr(e, t) {
  return m(), _("svg", {
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
function cr(e, t) {
  return m(), _("svg", {
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
function jm(e, t) {
  return m(), _("svg", {
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
function Hm(e, t) {
  return m(), _("svg", {
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
function ei(e, t) {
  return m(), _("svg", {
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
function Wm(e, t) {
  return m(), _("svg", {
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
function ti(e, t) {
  return m(), _("svg", {
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
function Km(e, t) {
  return m(), _("svg", {
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
function Ym(e, t) {
  return m(), _("svg", {
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
function Um(e, t) {
  return m(), _("svg", {
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
function qm(e, t) {
  return m(), _("svg", {
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
function ao(e, t) {
  return m(), _("svg", {
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
const Xm = {
  key: 0,
  class: "footer-divider"
}, Gm = {
  key: 0,
  class: "export-label"
}, Zm = { class: "export-buttons" }, Qm = ["disabled"], Jm = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, ep = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, tp = ["disabled"], ap = {
  key: 0,
  class: "spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
}, np = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, op = /* @__PURE__ */ ue({
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
    return (l, c) => (m(), ae(St(o.value), {
      class: J(s.value)
    }, {
      default: F(() => [
        e.variant === "footer" ? (m(), _("div", Xm)) : V("", !0),
        u("div", {
          class: J(["export-actions", { "export-actions--inline": e.variant === "inline" }])
        }, [
          e.variant === "footer" ? (m(), _("span", Gm, "Export")) : V("", !0),
          u("div", Zm, [
            i("pdf") ? (m(), _("button", {
              key: 0,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download PDF",
              onClick: c[0] || (c[0] = (d) => r("pdf"))
            }, [
              e.loading ? (m(), _("svg", Jm, [...c[2] || (c[2] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), _("svg", ep, [...c[3] || (c[3] = [
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
            ], 10, Qm)) : V("", !0),
            i("csv") ? (m(), _("button", {
              key: 1,
              type: "button",
              class: J(["export-btn", { "is-loading": e.loading }]),
              disabled: e.loading,
              title: "Download CSV",
              onClick: c[1] || (c[1] = (d) => r("csv"))
            }, [
              e.loading ? (m(), _("svg", ap, [...c[5] || (c[5] = [
                u("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10",
                  "stroke-opacity": "0.25"
                }, null, -1),
                u("path", { d: "M12 2a10 10 0 0 1 10 10" }, null, -1)
              ])])) : (m(), _("svg", np, [...c[6] || (c[6] = [
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
            ], 10, tp)) : V("", !0)
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Ie = /* @__PURE__ */ pe(op, [["__scopeId", "data-v-ebfab47f"]]), sp = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, ip = {
  key: "chart",
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, rp = { class: "w-full shrink-0 sm:pr-2" }, lp = {
  key: "empty",
  class: "flex min-h-[280px] w-full items-center justify-center"
}, cp = { class: "max-w-[360px] text-center" }, dp = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, up = /* @__PURE__ */ ue({
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
    }, r = $e(o, "theme"), l = $e(o, "options"), { isDark: c } = Me(r), d = (f) => {
      const p = new Date(f), g = String(p.getDate()).padStart(2, "0"), b = String(p.getMonth() + 1).padStart(2, "0");
      return `${g}-${b}`;
    }, h = C(() => {
      const f = o.data?.agents_by_day || {}, p = Object.keys(f).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.map((k) => d(k)), b = /* @__PURE__ */ new Set();
      for (const k of Object.values(f))
        for (const w of Object.keys(k))
          b.add(w);
      const y = Array.from(b), v = (k) => k, x = y.map((k) => ({
        label: k,
        data: p.map((w) => f[w]?.[k] || 0),
        backgroundColor: `${n[k] || "#94a3b8"}80`,
        borderColor: v(n[k] || "#94a3b8"),
        borderWidth: 1
      }));
      return {
        labels: g,
        datasets: x
      };
    });
    return t({ isDark: c }), (f, p) => (m(), ae(Se, {
      title: "Agents Total Messages per Day",
      subtitle: "Daily agent interactions (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", sp, [
          j(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              h.value.labels && h.value.labels.length ? (m(), _("section", ip, [
                u("div", rp, [
                  j(kt, {
                    data: h.value,
                    stacked: !0,
                    theme: r.value,
                    options: l.value
                  }, null, 8, ["data", "theme", "options"])
                ])
              ])) : (m(), _("section", lp, [
                u("div", cp, [
                  u("div", dp, [
                    j(E(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), hp = /* @__PURE__ */ pe(up, [["__scopeId", "data-v-f8d0ec91"]]), ha = (e, t) => t ? `${(e / t * 100).toFixed(1)}%` : "0.0%", be = (e, t) => `${e.toLocaleString()} (${ha(e, t)})`, fp = { class: "flex w-full min-w-0 justify-center" }, gp = { class: "flex max-w-full min-w-0 items-center gap-2" }, mp = { class: "min-w-0 truncate text-[12px] leading-normal capitalize" }, pp = { class: "text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]" }, bp = {
  key: 0,
  class: "min-w-0 w-full truncate text-[10px] leading-normal"
}, vp = /* @__PURE__ */ ue({
  __name: "CardInfo",
  props: {
    color: {},
    title: {},
    value: {},
    subvalue: {}
  },
  setup(e) {
    return (t, a) => (m(), _("div", {
      class: J(["card-info box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]", e.subvalue ? "h-[75px]" : "h-[58px]"])
    }, [
      u("div", fp, [
        u("div", gp, [
          e.color ? (m(), _("span", {
            key: 0,
            class: "inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle",
            style: Ce({ backgroundColor: e.color }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", mp, A(e.title), 1)
        ])
      ]),
      u("p", pp, A(e.value), 1),
      e.subvalue ? (m(), _("p", bp, A(e.subvalue), 1)) : V("", !0)
    ], 2));
  }
}), _e = /* @__PURE__ */ pe(vp, [["__scopeId", "data-v-0d546967"]]), dr = "inline-flex w-min max-w-full min-h-[22px] items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight";
function ur(e, t) {
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
const yp = {
  key: 0,
  class: "relative flex h-2 w-2 shrink-0 items-center justify-center",
  "aria-hidden": "true"
}, Ue = /* @__PURE__ */ ue({
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
      () => ur(t.color, t.outlined)
    );
    return (r, l) => a.value ? (m(), _("span", {
      key: 0,
      role: "status",
      class: J(["inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug", o.value])
    }, [
      e.statusLive === !0 ? (m(), _("span", yp, [...l[0] || (l[0] = [
        u("span", { class: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45" }, null, -1),
        u("span", { class: "relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]" }, null, -1)
      ])])) : V("", !0),
      u("span", {
        class: J(["min-w-0 flex-1 text-center", s.value])
      }, A(n.value), 3)
    ], 2)) : (m(), _("span", {
      key: 1,
      class: J([E(dr), i.value])
    }, [
      ke(r.$slots, "default", {}, () => [
        Ae(A(e.label), 1)
      ])
    ], 2));
  }
}), he = (e) => e == null ? "0" : new Intl.NumberFormat("en-US").format(e), Be = (e, t = "USD") => e == null ? "$0.00" : new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: t,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(e), Ft = (e) => {
  if (e == null) return "0";
  const t = Math.abs(e), a = e < 0 ? "-" : "";
  return t >= 1e6 ? `${a}${(t / 1e6).toFixed(2)}M` : t > 99999 ? `${a}${(t / 1e3).toFixed(1)}K` : `${a}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(t)}`;
}, xp = {
  class: "kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]",
  "data-component": "kiut-table"
}, _p = { class: "overflow-x-auto" }, kp = { class: "w-full table-auto border-collapse text-left text-[14px] leading-normal" }, wp = ["aria-sort", "onClick"], Cp = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, $p = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Sp = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, Mp = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = se(!1), s = "—";
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
    const b = C(() => a.rows?.length ?? 0), y = C(() => b.value > a.maxVisibleRows), v = C(() => Math.max(0, b.value - a.maxVisibleRows)), x = C(() => a.rows?.length ? o.value || !y.value ? a.rows : a.rows.slice(0, a.maxVisibleRows) : []), k = C(
      () => a.viewMoreLabel.replace(/\{count\}/g, String(v.value))
    );
    return (w, $) => (m(), _("div", xp, [
      u("div", _p, [
        u("table", kp, [
          u("thead", null, [
            u("tr", null, [
              (m(!0), _(ce, null, me(e.columns, (D) => (m(), _("th", {
                key: D.key,
                scope: "col",
                class: J(["kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]", [r(D.align), D.headerClass]])
              }, [
                D.sortable ? (m(), _("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", r(D.align)]),
                  "aria-sort": g(D.key),
                  onClick: (S) => p(D.key)
                }, [
                  u("span", null, A(D.label), 1),
                  u("span", Cp, [
                    f(D.key) ? (m(), _(ce, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), _("span", $p, "↑")) : e.sortDirection === "desc" ? (m(), _("span", Sp, "↓")) : V("", !0)
                    ], 64)) : (m(), _(ce, { key: 1 }, [
                      $[1] || ($[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      $[2] || ($[2] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, wp)) : (m(), _(ce, { key: 1 }, [
                  Ae(A(D.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), _(ce, null, me(x.value, (D, S) => (m(), _("tr", {
              key: h(D, S)
            }, [
              (m(!0), _(ce, null, me(e.columns, (R) => (m(), _("td", {
                key: `${S}-${R.key}`,
                class: J(["kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]", [r(R.align), R.cellClass]])
              }, [
                ke(w.$slots, l(R.key), {
                  row: D,
                  column: R,
                  value: c(D, R.key)
                }, () => [
                  Ae(A(i(c(D, R.key))), 1)
                ], !0)
              ], 2))), 128))
            ]))), 128))
          ])
        ])
      ]),
      y.value ? (m(), _("button", {
        key: 0,
        type: "button",
        class: "view-more-btn",
        onClick: $[0] || ($[0] = (D) => o.value = !o.value)
      }, [
        Ae(A(o.value ? e.viewLessLabel : k.value) + " ", 1),
        (m(), _("svg", {
          class: J(["view-more-icon", { "view-more-icon-rotated": o.value }]),
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
}), dt = /* @__PURE__ */ pe(Mp, [["__scopeId", "data-v-22a97a18"]]), Dp = {
  key: "error",
  class: "error-state"
}, Ap = { class: "error-content" }, Tp = { class: "error-description" }, Bp = {
  key: "content",
  class: "card-body"
}, Lp = { class: "chart-section" }, Ep = { class: "chart-wrapper" }, Rp = { class: "payment-success-summary" }, Pp = {
  key: 0,
  class: "booking-daily-section"
}, Ip = { class: "w-full min-w-0" }, Fp = { class: "font-medium" }, Op = { class: "percentage-text" }, Vp = { class: "badges-container" }, zp = {
  key: 0,
  class: "badges-container"
}, Np = {
  key: 1,
  class: "percentage-text"
}, jp = { class: "badges-container" }, Hp = {
  key: 1,
  class: "empty-state"
}, Wp = /* @__PURE__ */ ue({
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
    }, i = C(() => n.data?.booking_manager_by_day ? [...n.data.booking_manager_by_day].sort(
      (v, x) => new Date(v.date).getTime() - new Date(x.date).getTime()
    ) : []), r = [
      { key: "date", label: "Date", align: "center" },
      { key: "initiated", label: "Initiated", align: "center" },
      { key: "started", label: "Started", align: "center" },
      { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
      { key: "paymentResults", label: "Payment Results", align: "left" },
      { key: "paymentValue", label: "Payment Value", align: "left" },
      { key: "outcomes", label: "Outcomes", align: "left" }
    ], l = C(
      () => i.value.map((v) => ({
        id: v.date,
        ...v
      }))
    ), c = C(() => n.data?.total_payment_success_value || []), d = C(() => {
      const v = c.value;
      return v.length === 0 ? g(0) : v.map(
        (x) => `${x.currency} ${g(x.total_value)}`
      ).join(" · ");
    }), h = (v) => v.payment_success_value || [], f = (v) => typeof v.payment_success_count == "number" ? v.payment_success_count : (v.payment_success_value || []).reduce(
      (x, k) => x + (k.count || 0),
      0
    ), p = (v) => Be(v), g = (v) => v == null ? "0" : Ft(v);
    C(() => (n.data?.total_payment_success_value || []).reduce(
      (v, x) => v + (x.total_value || 0),
      0
    ));
    const b = C(() => {
      const v = n.data, x = v.total_booking_initiated || 0, k = v.total_booking_started || 0, w = v.total_payment_initiated || 0, $ = v.total_not_found || 0, D = v.total_cancelled || 0, S = v.total_no_pending_balance || 0, R = v.total_errors || 0, P = typeof v.total_payment_success == "number" ? v.total_payment_success : (v.total_payment_success_value || []).reduce(
        (q, ee) => q + (ee.count || 0),
        0
      ), I = v.total_payment_failed || 0, M = Math.max(0, x - k), L = Math.max(
        0,
        k - w - $ - D - S - R
      ), B = (q, ee) => be(q, ee), N = [
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
      return k > 0 && W.push({
        source: "Initiated",
        target: "Started",
        value: k,
        label: B(k, x)
      }), M > 0 && W.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: M,
        label: B(M, x)
      }), w > 0 && W.push({
        source: "Started",
        target: "Payment Initiated",
        value: w,
        label: B(w, x)
      }), $ > 0 && W.push({
        source: "Started",
        target: "Not Found",
        value: $,
        label: B($, x)
      }), D > 0 && W.push({
        source: "Started",
        target: "Cancelled",
        value: D,
        label: B(D, x)
      }), S > 0 && W.push({
        source: "Started",
        target: "No Pending Balance",
        value: S,
        label: B(S, x)
      }), R > 0 && W.push({
        source: "Started",
        target: "Errors",
        value: R,
        label: B(R, x)
      }), L > 0 && W.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: L,
        label: B(L, x)
      }), P > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Success",
        value: P,
        label: B(P, x)
      }), I > 0 && W.push({
        source: "Payment Initiated",
        target: "Payment Failed",
        value: I,
        label: B(I, x)
      }), { nodes: N, links: W };
    }), y = (v, x) => ha(v, x);
    return (v, x) => (m(), ae(Se, {
      class: "booking-manager-root h-full min-h-0",
      title: "Booking Manager Metrics",
      subtitle: "Booking manager workflow tracking and analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: x[0] || (x[0] = (k) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading && !n.error ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        j(ut, {
          name: "bm-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            n.error ? (m(), _("div", Dp, [
              u("div", Ap, [
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
                u("p", Tp, A(n.error), 1)
              ])
            ])) : (m(), _("div", Bp, [
              u("section", Lp, [
                u("div", Ep, [
                  j(Zt, {
                    data: b.value,
                    height: "400px",
                    "use-gradient": !1,
                    "node-gap": 16
                  }, null, 8, ["data"])
                ])
              ]),
              u("section", Rp, [
                j(_e, {
                  color: "#22c55e",
                  title: "Payment Success Value",
                  value: d.value
                }, null, 8, ["value"])
              ]),
              i.value.length > 0 ? (m(), _("section", Pp, [
                x[3] || (x[3] = u("div", { class: "section-header" }, [
                  u("h4", { class: "section-title" }, "Daily Overview")
                ], -1)),
                u("div", Ip, [
                  j(dt, {
                    columns: r,
                    rows: l.value,
                    "max-visible-rows": 3,
                    "row-key": "id"
                  }, {
                    "cell-date": F(({ row: k }) => [
                      u("span", Fp, A(E(ze)(String(k.date)).format("MMM DD")), 1)
                    ]),
                    "cell-initiated": F(({ row: k }) => [
                      u("span", null, A(E(he)(Number(k.booking_initiated_count))), 1)
                    ]),
                    "cell-started": F(({ row: k }) => [
                      u("span", null, [
                        Ae(A(E(he)(Number(k.booking_started_count))) + " ", 1),
                        u("span", Op, " (" + A(y(
                          Number(k.booking_started_count),
                          Number(k.booking_initiated_count)
                        )) + ") ", 1)
                      ])
                    ]),
                    "cell-paymentInitiated": F(({ row: k }) => [
                      u("span", null, A(E(he)(Number(k.payment_initiated_count))), 1)
                    ]),
                    "cell-paymentResults": F(({ row: k }) => [
                      u("div", Vp, [
                        j(Ue, { color: "success" }, {
                          default: F(() => [
                            Ae(" Success: " + A(E(he)(
                              f(k)
                            )), 1)
                          ]),
                          _: 2
                        }, 1024),
                        j(Ue, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Failed: " + A(E(he)(Number(k.payment_failed_count) || 0)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    "cell-paymentValue": F(({ row: k }) => [
                      h(k).length > 0 ? (m(), _("div", zp, [
                        (m(!0), _(ce, null, me(h(
                          k
                        ), (w) => (m(), _("span", {
                          key: `${k.date}-${w.currency}`,
                          class: "badge badge-currency"
                        }, A(w.currency) + " " + A(p(w.total_value)), 1))), 128))
                      ])) : (m(), _("span", Np, "N/A"))
                    ]),
                    "cell-outcomes": F(({ row: k }) => [
                      u("div", jp, [
                        j(Ue, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Not Found: " + A(k.not_found_count ? E(he)(Number(k.not_found_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        j(Ue, { color: "warning" }, {
                          default: F(() => [
                            Ae(" Cancelled: " + A(k.cancelled_count ? E(he)(Number(k.cancelled_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        j(Ue, { color: "orange" }, {
                          default: F(() => [
                            Ae(" No Balance: " + A(k.no_pending_balance_count ? E(he)(Number(k.no_pending_balance_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024),
                        j(Ue, { color: "danger" }, {
                          default: F(() => [
                            Ae(" Errors: " + A(k.error_count ? E(he)(Number(k.error_count)) : "N/A"), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 1
                  }, 8, ["rows"])
                ])
              ])) : (m(), _("section", Hp, [...x[4] || (x[4] = [
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
}), Kp = /* @__PURE__ */ pe(Wp, [["__scopeId", "data-v-d68eddff"]]), Yp = { class: "card-body" }, Up = {
  key: 0,
  class: "chart-section"
}, qp = { class: "chart-wrapper" }, Xp = {
  key: 1,
  class: "checkin-daily-section"
}, Gp = { class: "w-full min-w-0" }, Zp = { class: "font-medium" }, Qp = { class: "cell-success" }, Jp = { class: "cell-danger" }, e0 = {
  key: 0,
  class: "reasons-list"
}, t0 = { class: "reason-name" }, a0 = { class: "reason-count" }, n0 = {
  key: 1,
  class: "no-reasons"
}, o0 = {
  key: 2,
  class: "empty-state"
}, s0 = {
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
    }, r = se([]), l = [
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
    }), g = (w, $) => !$ || $ === 0 ? "0.0%" : ha(w, $), b = (w, $) => {
      const D = he(w), S = g(w, $);
      return `${D} (${S})`;
    }, y = (w) => w.reduce(($, D) => $ + D.failed_count, 0), v = C(() => {
      const w = [], $ = [], D = /* @__PURE__ */ new Set(), S = (G, te = {}) => {
        D.has(G) || (w.push({ name: G, ...te }), D.add(G));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: w, links: $ };
      S("Checkin Init", { value: f.value.total_checkin_initiated }), S("Booking retrive"), S("Booking retrive success"), S("Number of Passengers"), S("Completed"), S("Closed with BP");
      const R = f.value.total_checkin_initiated, P = f.value.total_checkin_init, I = f.value.total_checkin_init_abandoned || 0, M = f.value.total_checkin_pre_init_abandoned_error, L = f.value.total_checkin_pre_init_abandoned_voluntary, B = M != null || L != null, N = B ? Math.max(Number(M) || 0, 0) : 0, W = B ? Math.max(Number(L) || 0, 0) : 0, q = f.value.total_checkin_init_abandoned_error, ee = f.value.total_checkin_init_abandoned_voluntary, X = q != null || ee != null, le = X ? Math.max(Number(q) || 0, 0) : 0, U = X ? Math.max(Number(ee) || 0, 0) : 0, T = X ? Math.max(I - le - U, 0) : I, z = P - I, K = f.value.total_checkin_started, de = f.value.total_checkin_completed, ve = f.value.total_checkin_closed, Q = p.value.unrecovered_by_step || [], Y = Q.reduce(
        (G, te) => G + te.count,
        0
      );
      P > 0 && $.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: P,
        label: be(P, R)
      });
      const H = R - P;
      B ? (W > 0 && (S("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: W,
        label: be(W, R)
      })), N > 0 && (S("Booking not retreived", { status: "error" }), $.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: N,
        label: be(N, R)
      }))) : H > 0 && (S("Abandoned (Init)", { status: "abandon" }), $.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: H,
        label: be(H, R)
      })), X ? (le > 0 && (S("Error", { status: "error" }), $.push({
        source: "Booking retrive",
        target: "Error",
        value: le,
        label: be(le, R)
      })), U > 0 && (S("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: U,
        label: be(U, R)
      })), T > 0 && (S("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: be(T, R)
      }))) : I > 0 && (S("Abandoned (Started)", { status: "abandon" }), $.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: I,
        label: be(I, R)
      })), z > 0 && $.push({
        source: "Booking retrive",
        target: "Booking retrive success",
        value: z,
        label: be(z, R)
      }), K > 0 && $.push({
        source: "Booking retrive success",
        target: "Number of Passengers",
        value: K,
        label: be(K, R)
      }), de > 0 && $.push({
        source: "Number of Passengers",
        target: "Completed",
        value: de,
        label: be(de, R)
      }), Q.length > 0 && Y > 0 && (S("Unrecovered", { status: "error" }), $.push({
        source: "Number of Passengers",
        target: "Unrecovered",
        value: Y,
        label: be(Y, R)
      }), Q.forEach((G, te) => {
        const ge = G.step_name.replace(/_/g, " ").split(" ").map((xe) => xe.charAt(0).toUpperCase() + xe.slice(1)).join(" ");
        S(ge, { status: "error", order: te + 1 }), $.push({
          source: "Unrecovered",
          target: ge,
          value: G.count,
          label: be(G.count, R)
        });
      }));
      const ne = K - (de + Y);
      ne > 0 && (S("Abandoned (Flow)", { status: "abandon" }), $.push({
        source: "Number of Passengers",
        target: "Abandoned (Flow)",
        value: ne,
        label: be(ne, R)
      }));
      const ie = de - ve;
      return ie > 0 && (S("BP Error", { status: "error", order: 0 }), $.push({
        source: "Completed",
        target: "BP Error",
        value: ie,
        label: be(ie, R)
      })), ve > 0 && $.push({
        source: "Completed",
        target: "Closed with BP",
        value: ve,
        label: be(ve, R)
      }), { nodes: w, links: $ };
    }), x = () => {
      const w = o.data?.record_locator_by_day;
      if (Array.isArray(w) && w.length > 0) return w;
      const $ = o.checkinData?.record_locator_by_day;
      return Array.isArray($) && $.length > 0 ? $ : [];
    }, k = () => {
      const w = f.value.checkin_by_day || [], $ = p.value.failed_by_step_by_day || [], D = x();
      if (w.length === 0) {
        r.value = [];
        return;
      }
      r.value = [...w].map((S) => {
        const R = $.find(
          (I) => I.date === S.date
        ), P = D.find(
          (I) => I.date === S.date
        );
        return {
          ...S,
          failed_steps: R?.steps || [],
          record_locator_create_payment_count: S.record_locator_create_payment_count ?? P?.record_locator_create_payment_count ?? 0
        };
      }), r.value.sort((S, R) => new Date(S.date) - new Date(R.date));
    };
    return Ee(
      [() => o.data, () => o.checkinData, () => o.failedData],
      () => {
        k();
      },
      { deep: !0, immediate: !0 }
    ), (w, $) => (m(), ae(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Yp, [
          v.value.nodes.length > 0 ? (m(), _("section", Up, [
            u("div", qp, [
              j(Zt, {
                data: v.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : V("", !0),
          r.value && r.value.length > 0 ? (m(), _("section", Xp, [
            u("div", Gp, [
              j(dt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: D }) => [
                  u("span", Zp, A(E(ze)(String(D.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": F(({ row: D }) => [
                  u("span", null, A(E(he)(D.checkin_initiated_count)), 1)
                ]),
                "cell-bookingRetrieve": F(({ row: D }) => [
                  u("span", null, A(b(
                    D.checkin_init_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-passengers": F(({ row: D }) => [
                  u("span", null, A(E(he)(D.checkin_started_count)), 1)
                ]),
                "cell-completed": F(({ row: D }) => [
                  u("span", null, A(b(
                    D.checkin_completed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-closed": F(({ row: D }) => [
                  u("span", Qp, A(b(
                    D.checkin_closed_count,
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-failed": F(({ row: D }) => [
                  u("span", Jp, A(b(
                    y(D.failed_steps),
                    D.checkin_initiated_count
                  )), 1)
                ]),
                "cell-reasons": F(({ row: D }) => [
                  D.failed_steps && D.failed_steps.length > 0 ? (m(), _("div", e0, [
                    (m(!0), _(ce, null, me(D.failed_steps, (S) => (m(), _("div", {
                      key: S.step_name,
                      class: "reason-item"
                    }, [
                      u("span", t0, A(S.step_name.replace(/_/g, " ")) + ":", 1),
                      u("span", a0, A(S.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), _("div", n0, "-"))
                ]),
                "cell-createPayment": F(({ row: D }) => [
                  u("span", null, A(E(he)(D.record_locator_create_payment_count ?? 0)), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), _("section", o0, [...$[0] || ($[0] = [
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
}, hr = /* @__PURE__ */ pe(s0, [["__scopeId", "data-v-ae5fc0f7"]]), i0 = { class: "card-body" }, r0 = {
  key: 0,
  class: "sankey-section"
}, l0 = {
  key: 1,
  class: "checkin-metrics-daily-section"
}, c0 = { class: "w-full min-w-0" }, d0 = { class: "font-medium whitespace-nowrap" }, u0 = { class: "cell-success" }, h0 = { class: "cell-danger" }, f0 = {
  key: 0,
  class: "reasons-list"
}, g0 = { class: "reason-name" }, m0 = { class: "reason-count" }, p0 = {
  key: 1,
  class: "no-reasons"
}, b0 = {
  key: 2,
  class: "empty-state"
}, v0 = { class: "empty-state-content" }, y0 = { class: "empty-icon-wrapper" }, x0 = /* @__PURE__ */ ue({
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
    }, { isDark: i } = Me($e(n, "theme")), r = (x) => x == null ? "0" : x.toLocaleString(), l = (x) => {
      const [k, w, $] = x.split("-").map(Number);
      return ze([k, w - 1, $]).format("MMM DD");
    }, c = (x) => x.replace(/_/g, " ").replace(/\b\w/g, (k) => k.toUpperCase()), d = (x, k) => ha(x, k), h = (x, k) => {
      const w = x || 0, $ = k || 0, D = r(w), S = d(w, $);
      return `${D} (${S})`;
    }, f = C(() => {
      const x = n.checkinData?.record_locator_by_day || [], k = n.failedData?.failed_by_step_by_day || [], w = n.failedData?.unrecovered_by_day || [];
      return x.map((D) => {
        const S = k.find((P) => P.date === D.date), R = w.find(
          (P) => P.date === D.date
        );
        return {
          ...D,
          failed_steps: S?.steps || [],
          unrecovered_count: R?.unrecovered_count || 0
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
    }, b = C(
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
    ), v = C(() => {
      const x = [], k = [], w = /* @__PURE__ */ new Set(), $ = (H, ne = {}) => {
        w.has(H) || (x.push({ name: H, ...ne }), w.add(H));
      };
      if (!n.checkinData?.total_checkin_initiated)
        return { nodes: x, links: k };
      const D = n.checkinData.total_checkin_initiated || 0;
      $("Checkin Init", { value: D }), $("Booking Retrieval"), $("Booking Retrieved"), $("Completed"), $("Closed with BP");
      const S = n.checkinData.total_record_locator_init || 0, R = n.checkinData.total_record_locator_init_abandoned || 0, P = n.checkinData.total_checkin_pre_init_abandoned_error, I = n.checkinData.total_checkin_pre_init_abandoned_voluntary, M = P != null || I != null, L = M ? Math.max(Number(P) || 0, 0) : 0, B = M ? Math.max(Number(I) || 0, 0) : 0, N = n.checkinData.total_record_locator_init_abandoned_error, W = n.checkinData.total_record_locator_init_abandoned_voluntary, q = N != null || W != null, ee = q ? Math.max(Number(N) || 0, 0) : 0, X = q ? Math.max(Number(W) || 0, 0) : 0, le = q ? Math.max(R - ee - X, 0) : R, U = S - R, T = n.checkinData.total_record_locator_started || 0, z = n.checkinData.total_record_locator_completed || 0, K = n.checkinData.total_record_locator_closed || 0, de = n.checkinData.total_record_locator_unrecovered || 0;
      S > 0 && k.push({
        source: "Checkin Init",
        target: "Booking Retrieval",
        value: S,
        label: be(S, D)
      });
      const ve = D - S;
      M ? (B > 0 && ($("Abandoned (Init)"), k.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: B,
        label: be(B, D)
      })), L > 0 && ($("Booking not retreived"), k.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: L,
        label: be(L, D)
      }))) : ve > 0 && ($("Abandoned (Init)"), k.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: ve,
        label: be(ve, D)
      })), q ? (ee > 0 && ($("Error"), k.push({
        source: "Booking Retrieval",
        target: "Error",
        value: ee,
        label: be(ee, D)
      })), X > 0 && ($("Abandoned (Started)"), k.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: X,
        label: be(X, D)
      })), le > 0 && ($("Abandoned (Started)"), k.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: le,
        label: be(le, D)
      }))) : R > 0 && ($("Abandoned (Started)"), k.push({
        source: "Booking Retrieval",
        target: "Abandoned (Started)",
        value: R,
        label: be(R, D)
      })), U > 0 && k.push({
        source: "Booking Retrieval",
        target: "Booking Retrieved",
        value: U,
        label: be(U, D)
      }), z > 0 && k.push({
        source: "Booking Retrieved",
        target: "Completed",
        value: z,
        label: be(z, D)
      }), de > 0 && ($("Errors"), k.push({
        source: "Booking Retrieved",
        target: "Errors",
        value: de,
        label: be(de, D)
      }));
      const Q = T - (z + de);
      Q > 0 && ($("Abandoned (Flow)"), k.push({
        source: "Booking Retrieved",
        target: "Abandoned (Flow)",
        value: Q,
        label: be(Q, D)
      }));
      const Y = z - K;
      return Y > 0 && ($("BP Error"), k.push({
        source: "Completed",
        target: "BP Error",
        value: Y,
        label: be(Y, D)
      })), K > 0 && k.push({
        source: "Completed",
        target: "Closed with BP",
        value: K,
        label: be(K, D)
      }), { nodes: x, links: k };
    });
    return t({ isDark: i }), (x, k) => (m(), ae(Se, {
      class: "checkin-metrics-root h-full min-h-0",
      title: "Check-in Metrics",
      subtitle: "Check-in performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", i0, [
          v.value.nodes.length > 0 ? (m(), _("div", r0, [
            j(Zt, {
              data: v.value,
              height: "400px",
              "use-gradient": !1,
              "node-gap": 16
            }, null, 8, ["data"])
          ])) : V("", !0),
          f.value && f.value.length > 0 ? (m(), _("div", l0, [
            u("div", c0, [
              j(dt, {
                columns: b.value,
                rows: y.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: w }) => [
                  u("span", d0, A(l(String(w.date))), 1)
                ]),
                "cell-checkinInit": F(({ row: w }) => [
                  u("span", null, A(r(w.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieval": F(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_init_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-bookingRetrieved": F(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_started_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-completed": F(({ row: w }) => [
                  u("span", null, A(h(
                    w.record_locator_completed_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-closed": F(({ row: w }) => [
                  u("span", u0, A(h(
                    w.record_locator_closed_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-failed": F(({ row: w }) => [
                  u("span", h0, A(h(
                    w.unrecovered_count,
                    w.checkin_initiated
                  )), 1)
                ]),
                "cell-createPayment": F(({ row: w }) => [
                  u("span", null, A(r(
                    w.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-reasons": F(({ row: w }) => [
                  Array.isArray(w.failed_steps) && w.failed_steps.length > 0 ? (m(), _("div", f0, [
                    (m(!0), _(ce, null, me(w.failed_steps, ($) => (m(), _("div", {
                      key: $.step_name,
                      class: "reason-item"
                    }, [
                      u("span", g0, A(c($.step_name)) + ":", 1),
                      u("span", m0, A($.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), _("div", p0, "-"))
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), _("div", b0, [
            u("div", v0, [
              u("div", y0, [
                j(E(nt), { class: "empty-icon" })
              ]),
              k[0] || (k[0] = u("p", { class: "empty-title" }, "No check-in data available", -1)),
              k[1] || (k[1] = u("p", { class: "empty-description" }, " Try adjusting the date range or check your filters to see check-in metrics. ", -1))
            ])
          ]))
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), _0 = /* @__PURE__ */ pe(x0, [["__scopeId", "data-v-c78464fc"]]), k0 = { class: "card-body" }, w0 = {
  key: 0,
  class: "checkin-segments-daily-section"
}, C0 = { class: "w-full min-w-0" }, $0 = { class: "segment-plain" }, S0 = { class: "segment-plain" }, M0 = { class: "segment-plain" }, D0 = { class: "percentage-value" }, A0 = { class: "percentage-value" }, T0 = { class: "percentage-value success" }, B0 = {
  key: 1,
  class: "empty-state"
}, L0 = /* @__PURE__ */ ue({
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
    }, { isDark: i } = Me($e(n, "theme")), r = [
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
    return t({ isDark: i }), (f, p) => (m(), ae(Se, {
      class: "checkin-segments-root h-full min-h-0",
      title: "Checkin Segments",
      subtitle: "Breakdown by flight segment with connection when applicable",
      collapsible: e.collapsible,
      "default-open": e.initiallyOpen,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", k0, [
          n.data.length > 0 ? (m(), _("section", w0, [
            u("div", C0, [
              j(dt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-departure": F(({ row: g }) => [
                  u("span", $0, A(d(g.departure_airport)), 1)
                ]),
                "cell-connection": F(({ row: g }) => [
                  u("span", {
                    class: J(["segment-plain", {
                      "segment-plain--muted": d(g.conexion_airport) === "-"
                    }])
                  }, A(d(g.conexion_airport)), 3)
                ]),
                "cell-arrival": F(({ row: g }) => [
                  u("span", S0, A(d(g.arrival_airport)), 1)
                ]),
                "cell-trip": F(({ row: g }) => [
                  u("span", M0, A(h(g) ? "Roundtrip" : "One way"), 1)
                ]),
                "cell-init": F(({ row: g }) => [
                  Ae(A(E(he)(g.segment_init_count)), 1)
                ]),
                "cell-started": F(({ row: g }) => [
                  u("span", D0, A(c(
                    g.segment_started_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-completed": F(({ row: g }) => [
                  u("span", A0, A(c(
                    g.segment_completed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                "cell-closed": F(({ row: g }) => [
                  u("span", T0, A(c(
                    g.segment_closed_count,
                    g.segment_init_count
                  )), 1)
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : (m(), _("section", B0, [...p[0] || (p[0] = [
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
}), fr = /* @__PURE__ */ pe(L0, [["__scopeId", "data-v-b8704d3c"]]), E0 = { class: "checkin-container__body" }, R0 = /* @__PURE__ */ ue({
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
    return (c, d) => (m(), ae(Se, {
      class: "checkin-container-root w-full",
      title: "Check in",
      subtitle: "Check-in flows and segment breakdown.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[1] || (d[1] = (h) => n("open"))
    }, {
      default: F(() => [
        u("div", E0, [
          e.showCheckin ? (m(), ae(hr, {
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
          j(fr, {
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
}), P0 = /* @__PURE__ */ pe(R0, [["__scopeId", "data-v-cf0fe2d3"]]), I0 = { class: "card-body" }, F0 = { class: "chart-section" }, O0 = { class: "chart-wrapper" }, V0 = {
  key: 1,
  class: "empty-chart"
}, z0 = { class: "payment-success-summary" }, N0 = {
  key: 0,
  class: "disruption-daily-section"
}, j0 = { class: "w-full min-w-0" }, H0 = { class: "font-medium text-center" }, W0 = { class: "text-center" }, K0 = { class: "text-center" }, Y0 = { class: "percentage-text" }, U0 = { class: "text-center" }, q0 = { class: "abandoned-value" }, X0 = { class: "badges-container badges-wrap" }, G0 = { class: "badges-container badges-wrap" }, Z0 = {
  key: 1,
  class: "empty-state"
}, Q0 = /* @__PURE__ */ ue({
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
      (y, v) => new Date(y.date).getTime() - new Date(v.date).getTime()
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
      return y.length === 0 ? f(0) : y.map((v) => `${v.currency} ${f(v.total_value)}`).join(" · ");
    }), h = (y, v) => ha(y, v), f = (y) => Be(y), p = (y) => (y ?? []).reduce((v, x) => v + (x.count ?? 0), 0), g = (y) => typeof y.sell_success_count == "number" ? y.sell_success_count : p(y.payment_success_total), b = C(() => {
      const y = n.data, v = y.total_disruption_conversations || 0, x = y.total_disruption_initiated || 0, k = y.total_voluntary || 0, w = y.total_involuntary || 0, $ = y.total_accepted || 0, D = y.total_confirmed || 0, S = typeof y.total_sell_success == "number" ? y.total_sell_success : p(y.total_payment_success), R = y.total_sell_failed || 0, P = Math.max(0, v - x), I = Math.max(
        0,
        x - k - w
      ), M = Math.max(0, w - $), L = Math.max(0, k - D), B = R, N = Math.max(0, D - S - B), W = (X, le) => be(X, le), q = [
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
      ], ee = [];
      return x > 0 && ee.push({
        source: "Initiated",
        target: "Started",
        value: x,
        label: W(x, v)
      }), P > 0 && ee.push({
        source: "Initiated",
        target: "Abandoned (Init)",
        value: P,
        label: W(P, v)
      }), k > 0 && ee.push({
        source: "Started",
        target: "Voluntary",
        value: k,
        label: W(k, v)
      }), w > 0 && ee.push({
        source: "Started",
        target: "Involuntary",
        value: w,
        label: W(w, v)
      }), I > 0 && ee.push({
        source: "Started",
        target: "Abandoned (Start)",
        value: I,
        label: W(I, v)
      }), $ > 0 && ee.push({
        source: "Involuntary",
        target: "Accepted",
        value: $,
        label: W($, v)
      }), M > 0 && ee.push({
        source: "Involuntary",
        target: "Redirect to Human",
        value: M,
        label: W(M, v)
      }), D > 0 && ee.push({
        source: "Voluntary",
        target: "Confirmed",
        value: D,
        label: W(D, v)
      }), L > 0 && ee.push({
        source: "Voluntary",
        target: "Not Confirmed",
        value: L,
        label: W(L, v)
      }), S > 0 && ee.push({
        source: "Confirmed",
        target: "Paid",
        value: S,
        label: W(S, v)
      }), B > 0 && ee.push({
        source: "Confirmed",
        target: "Rejected",
        value: B,
        label: W(B, v)
      }), N > 0 && ee.push({
        source: "Confirmed",
        target: "Not Paid",
        value: N,
        label: W(N, v)
      }), { nodes: q, links: ee };
    });
    return (y, v) => (m(), ae(Se, {
      class: "disruption-metrics-root h-full min-h-0",
      title: "Disruption Manager Metrics",
      subtitle: "Disruption workflow performance and completion tracking",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: v[0] || (v[0] = (x) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", I0, [
          u("section", F0, [
            u("div", O0, [
              b.value.nodes.length > 0 && b.value.links.length > 0 ? (m(), ae(Zt, {
                key: 0,
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])) : (m(), _("div", V0, [...v[1] || (v[1] = [
                u("p", { class: "empty-chart-text" }, " No disruption data available for visualization ", -1)
              ])]))
            ])
          ]),
          u("section", z0, [
            j(_e, {
              color: "#22c55e",
              title: "Payment Success Value",
              value: d.value
            }, null, 8, ["value"])
          ]),
          i.value && i.value.length > 0 ? (m(), _("section", N0, [
            v[2] || (v[2] = u("div", { class: "section-header" }, [
              u("h4", { class: "section-title" }, "Daily Overview")
            ], -1)),
            u("div", j0, [
              j(dt, {
                columns: r,
                rows: l.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: x }) => [
                  u("span", H0, A(E(ze)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-initiated": F(({ row: x }) => [
                  u("span", W0, A(E(he)(Number(x.disruption_conversations))), 1)
                ]),
                "cell-started": F(({ row: x }) => [
                  u("span", K0, [
                    Ae(A(E(he)(Number(x.disruption_initiated_count))) + " ", 1),
                    u("span", Y0, " (" + A(h(
                      Number(x.disruption_initiated_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-abandoned": F(({ row: x }) => [
                  u("span", U0, [
                    u("span", q0, A(E(he)(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count)
                    )) + " (" + A(h(
                      Number(x.disruption_initiated_count) - Number(x.voluntary_count) - Number(x.involuntary_count),
                      Number(x.disruption_conversations)
                    )) + ") ", 1)
                  ])
                ]),
                "cell-voluntary": F(({ row: x }) => [
                  u("div", X0, [
                    (m(!0), _(ce, null, me([x], (k, w) => (m(), _(ce, { key: w }, [
                      j(Ue, {
                        color: "neutral",
                        outlined: !0
                      }, {
                        default: F(() => [
                          Ae(" VOL " + A(E(he)(k.voluntary_count)) + " (" + A(h(
                            k.voluntary_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, { color: "success" }, {
                        default: F(() => [
                          Ae(" Confirm " + A(E(he)(k.confirmed_count)) + " (" + A(h(
                            k.confirmed_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, { color: "warning" }, {
                        default: F(() => [
                          Ae(" Not Confirm " + A(E(he)(k.voluntary_count - k.confirmed_count)) + " (" + A(h(
                            k.voluntary_count - k.confirmed_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, { color: "danger" }, {
                        default: F(() => [
                          Ae(" Reject " + A(E(he)(k.sell_failed_count)) + " (" + A(h(
                            k.sell_failed_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, { color: "orange" }, {
                        default: F(() => [
                          Ae(" Not Paid " + A(E(he)(
                            Math.max(
                              0,
                              k.confirmed_count - g(k) - k.sell_failed_count
                            )
                          )) + " (" + A(h(
                            Math.max(
                              0,
                              k.confirmed_count - g(k) - k.sell_failed_count
                            ),
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, {
                        color: "success",
                        outlined: !0
                      }, {
                        default: F(() => [
                          Ae(" Finish " + A(E(he)(g(k))) + " (" + A(h(
                            g(k),
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      (m(!0), _(ce, null, me(k.payment_success_total || [], ($) => (m(), ae(Ue, {
                        key: `${k.date}-${$.currency}`,
                        color: "neutral"
                      }, {
                        default: F(() => [
                          Ae(A($.currency) + " " + A(f($.total_value)), 1)
                        ]),
                        _: 2
                      }, 1024))), 128))
                    ], 64))), 128))
                  ])
                ]),
                "cell-involuntary": F(({ row: x }) => [
                  u("div", G0, [
                    (m(!0), _(ce, null, me([x], (k, w) => (m(), _(ce, { key: w }, [
                      j(Ue, { color: "purple" }, {
                        default: F(() => [
                          Ae(" INV " + A(E(he)(k.involuntary_count)) + " (" + A(h(
                            k.involuntary_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, { color: "danger" }, {
                        default: F(() => [
                          Ae(" Human " + A(E(he)(k.involuntary_count - k.accepted_count)) + " (" + A(h(
                            k.involuntary_count - k.accepted_count,
                            k.disruption_conversations
                          )) + ") ", 1)
                        ]),
                        _: 2
                      }, 1024),
                      j(Ue, { color: "success" }, {
                        default: F(() => [
                          Ae(" Accept " + A(E(he)(k.accepted_count)) + " (" + A(h(
                            k.accepted_count,
                            k.disruption_conversations
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
          ])) : (m(), _("section", Z0, [...v[3] || (v[3] = [
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
}), J0 = /* @__PURE__ */ pe(Q0, [["__scopeId", "data-v-033e517a"]]), eb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, tb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, ab = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, nb = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ob = { class: "grid w-full xs:grid-cols-2 gap-3 grid-cols-4 md:gap-4" }, sb = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, ib = /* @__PURE__ */ ue({
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
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = {
      airline_information: "#8b5cf6",
      booking_info: "#f59e0b",
      flight_status: "#06b6d4"
    }, c = se({
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
      const p = d.value, g = p.total_airline_information_retrieved + p.total_booking_info_retrieved + p.total_flight_status_retrieved, b = (x) => g > 0 ? (x / g * 100).toFixed(1) : "0.0", y = p.total_faq_events, v = y > 0 ? `${(p.total_documents_found / y * 100).toFixed(1)}% of FAQ events` : void 0;
      return [
        {
          name: "airline_information",
          label: "Airline Info",
          color: l.airline_information,
          value: `${b(p.total_airline_information_retrieved)}%`,
          subvalue: `${he(p.total_airline_information_retrieved)} consultas`
        },
        {
          name: "booking_info",
          label: "Booking Info",
          color: l.booking_info,
          value: `${b(p.total_booking_info_retrieved)}%`,
          subvalue: `${he(p.total_booking_info_retrieved)} consultas`
        },
        {
          name: "flight_status",
          label: "Flight Status",
          color: l.flight_status,
          value: `${b(p.total_flight_status_retrieved)}%`,
          subvalue: `${he(p.total_flight_status_retrieved)} consultas`
        },
        {
          name: "documents_found",
          label: "Documents found",
          color: "#64748b",
          value: he(p.total_documents_found),
          subvalue: v
        }
      ];
    }), f = (p) => {
      if (!p) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const g = p.faq_by_day || [];
      if (g.length > 0) {
        const b = g.map(
          (k) => ze(k.date).format("MMM DD")
        ), y = g.map(
          (k) => k.airline_information_retrieved_count || 0
        ), v = g.map(
          (k) => k.flight_status_retrieved_count || 0
        ), x = g.map(
          (k) => k.booking_info_retrieved_count || 0
        );
        c.value = {
          labels: b,
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
    ), t({ isDark: r }), (p, g) => (m(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "FAQ Metrics",
      subtitle: "FAQ volume by category",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", eb, [
          u("div", tb, [
            c.value.labels && c.value.labels.length ? (m(), _("section", ab, [
              u("div", nb, [
                j(ht, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              u("div", ob, [
                (m(!0), _(ce, null, me(h.value, (b) => (m(), ae(_e, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: b.value,
                  subvalue: b.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ])
            ])) : (m(), _("section", sb, [...g[0] || (g[0] = [
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
}), rb = /* @__PURE__ */ pe(ib, [["__scopeId", "data-v-b6ea961f"]]), lb = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, cb = { class: "w-full shrink-0 flex min-h-0 flex-col" }, db = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, ub = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, hb = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, fb = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, gb = { class: "max-w-[360px] px-4 text-center" }, mb = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, pb = /* @__PURE__ */ ue({
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
    }, r = $e(o, "theme"), { isDark: l } = Me(r), c = C(() => {
      const p = o.data?.agents_by_day || {}, g = Object.keys(p).sort();
      if (g.length === 0)
        return { labels: [], datasets: [] };
      const b = /* @__PURE__ */ new Set();
      for (const x of Object.values(p))
        for (const k of Object.keys(x))
          b.add(k);
      const v = Array.from(b).map((x) => {
        const k = x.toLowerCase(), w = n[k] || n[x] || "#94a3b8";
        return {
          label: x.charAt(0).toUpperCase() + x.slice(1).replace(/_/g, " "),
          data: g.map(($) => p[$]?.[x] || 0),
          borderColor: w
        };
      });
      return {
        labels: g.map((x) => ze(x).format("MMM DD")),
        datasets: v
      };
    }), d = C(() => {
      const p = o.data?.agents_by_day || {}, g = {};
      for (const y of Object.values(p))
        for (const [v, x] of Object.entries(y))
          g[v] = (g[v] || 0) + x;
      const b = Object.values(g).reduce((y, v) => y + v, 0);
      return b === 0 ? [] : Object.entries(g).sort(([, y], [, v]) => v - y).map(([y, v]) => {
        const x = y.toLowerCase();
        return {
          name: y,
          label: y.charAt(0).toUpperCase() + y.slice(1).replace(/_/g, " "),
          total: v,
          percentage: (v / b * 100).toFixed(1),
          color: n[x] || n[y] || "#94a3b8"
        };
      });
    }), h = C(() => d.value.slice(0, 4)), f = C(() => {
      const p = h.value.length;
      if (!(p <= 0))
        return { gridTemplateColumns: `repeat(${p}, minmax(0, 1fr))` };
    });
    return t({ isDark: l }), (p, g) => (m(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "Interactions by Agent",
      subtitle: "Responses sent by AI agents",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: i
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", lb, [
          u("div", cb, [
            c.value.labels && c.value.labels.length ? (m(), _("section", db, [
              u("div", ub, [
                j(ht, {
                  data: c.value,
                  options: e.options,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              h.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(f.value)
              }, [
                (m(!0), _(ce, null, me(h.value, (b) => (m(), ae(_e, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: `${b.percentage}%`,
                  subvalue: `${E(he)(b.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : d.value.length ? (m(), _("section", hb, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(f.value)
              }, [
                (m(!0), _(ce, null, me(h.value, (b) => (m(), ae(_e, {
                  key: b.name,
                  class: "min-w-0",
                  color: b.color,
                  title: b.label,
                  value: `${b.percentage}%`,
                  subvalue: `${E(he)(b.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : V("", !0),
            d.value.length ? V("", !0) : (m(), _("section", fb, [
              u("div", gb, [
                u("div", mb, [
                  j(E(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), bb = /* @__PURE__ */ pe(pb, [["__scopeId", "data-v-932f6fac"]]), vb = { class: "card-body" }, yb = {
  key: 0,
  class: "chart-section"
}, xb = { class: "chart-wrapper" }, _b = {
  key: 1,
  class: "record-locator-daily-section"
}, kb = { class: "w-full min-w-0" }, wb = { class: "cell-plain font-medium" }, Cb = { class: "cell-plain text-center" }, $b = { class: "cell-plain text-center" }, Sb = { class: "cell-plain text-center" }, Mb = { class: "cell-plain text-center" }, Db = { class: "cell-plain text-center success-value" }, Ab = { class: "cell-plain text-center failed-value" }, Tb = { class: "cell-plain text-center warning-value" }, Bb = { class: "cell-plain text-center" }, Lb = { class: "cell-plain text-center failed-value" }, Eb = {
  key: 2,
  class: "empty-state"
}, Rb = /* @__PURE__ */ ue({
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
    }, { isDark: i } = Me($e(n, "theme")), r = C(() => n.data?.record_locator_by_day ? [...n.data.record_locator_by_day].sort(
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
    ), f = C(() => n.data), p = (y, v) => ha(y, v), g = (y, v) => {
      const x = he(y), k = p(y, v);
      return `${x} (${k})`;
    }, b = C(() => {
      const y = [], v = [], x = /* @__PURE__ */ new Set(), k = (K) => {
        x.has(K) || (y.push({ name: K }), x.add(K));
      };
      if (!f.value.total_checkin_initiated)
        return { nodes: y, links: v };
      k("Checkin Init"), k("Booking retrive"), k("Checkin Started"), k("Checkin Completed"), k("Checkin Closed");
      const w = f.value.total_checkin_initiated, $ = f.value.total_record_locator_init, D = f.value.total_record_locator_started, S = f.value.total_record_locator_completed, R = f.value.total_record_locator_closed, P = f.value.total_record_locator_failed, I = f.value.total_record_locator_abandoned, M = f.value.total_record_locator_init_abandoned, L = f.value.total_checkin_pre_init_abandoned_error, B = f.value.total_checkin_pre_init_abandoned_voluntary, N = L != null || B != null, W = N ? Math.max(Number(L) || 0, 0) : 0, q = N ? Math.max(Number(B) || 0, 0) : 0, ee = f.value.total_record_locator_init_abandoned_error, X = f.value.total_record_locator_init_abandoned_voluntary, le = ee != null || X != null, U = le ? Math.max(Number(ee) || 0, 0) : 0, T = le ? Math.max(Number(X) || 0, 0) : 0;
      $ > 0 && v.push({
        source: "Checkin Init",
        target: "Booking retrive",
        value: $,
        label: be($, w)
      });
      const z = w - $;
      return N ? (q > 0 && (k("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: q,
        label: be(q, w)
      })), W > 0 && (k("Booking not retreived"), v.push({
        source: "Checkin Init",
        target: "Booking not retreived",
        value: W,
        label: be(W, w)
      }))) : z > 0 && (k("Abandoned (Init)"), v.push({
        source: "Checkin Init",
        target: "Abandoned (Init)",
        value: z,
        label: be(z, w)
      })), D > 0 && v.push({
        source: "Booking retrive",
        target: "Checkin Started",
        value: D,
        label: be(D, w)
      }), le ? (U > 0 && (k("Error"), v.push({
        source: "Booking retrive",
        target: "Error",
        value: U,
        label: be(U, w)
      })), T > 0 && (k("Abandoned (Started)"), v.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: T,
        label: be(T, w)
      }))) : M > 0 && (k("Abandoned (Started)"), v.push({
        source: "Booking retrive",
        target: "Abandoned (Started)",
        value: M,
        label: be(M, w)
      })), S > 0 && v.push({
        source: "Checkin Started",
        target: "Checkin Completed",
        value: S,
        label: be(S, w)
      }), R > 0 && v.push({
        source: "Checkin Completed",
        target: "Checkin Closed",
        value: R,
        label: be(R, w)
      }), P > 0 && (k("Checkin Failed"), v.push({
        source: "Checkin Started",
        target: "Checkin Failed",
        value: P,
        label: be(P, w)
      })), I > 0 && (k("Abandoned (Flow)"), v.push({
        source: "Checkin Started",
        target: "Abandoned (Flow)",
        value: I,
        label: be(I, w)
      })), { nodes: y, links: v };
    });
    return t({ isDark: i }), (y, v) => (m(), ae(Se, {
      class: "record-locator-root h-full min-h-0",
      title: "Checkin by Record Locator Metrics",
      subtitle: "Checkin by record locator retrieval and completion analysis",
      collapsible: e.collapsible,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", vb, [
          b.value.nodes.length > 0 ? (m(), _("section", yb, [
            u("div", xb, [
              j(Zt, {
                data: b.value,
                height: "400px",
                "use-gradient": !1,
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : V("", !0),
          r.value && r.value.length > 0 ? (m(), _("section", _b, [
            u("div", kb, [
              j(dt, {
                columns: d.value,
                rows: h.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: x }) => [
                  u("span", wb, A(E(ze)(String(x.date)).format("MMM DD")), 1)
                ]),
                "cell-checkinInit": F(({ row: x }) => [
                  u("span", Cb, A(E(he)(x.checkin_initiated)), 1)
                ]),
                "cell-bookingRetrieve": F(({ row: x }) => [
                  u("span", $b, A(g(
                    x.record_locator_init_count,
                    x.checkin_initiated
                  )), 1)
                ]),
                "cell-checkinStarted": F(({ row: x }) => [
                  u("span", Sb, A(E(he)(x.record_locator_started_count)), 1)
                ]),
                "cell-checkinCompleted": F(({ row: x }) => [
                  u("span", Mb, A(g(
                    x.record_locator_completed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinClosed": F(({ row: x }) => [
                  u("span", Db, A(g(
                    x.record_locator_closed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-checkinFailed": F(({ row: x }) => [
                  u("span", Ab, A(g(
                    x.record_locator_failed_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-abandoned": F(({ row: x }) => [
                  u("span", Tb, A(g(
                    x.record_locator_abandoned_count,
                    x.record_locator_started_count
                  )), 1)
                ]),
                "cell-createPayment": F(({ row: x }) => [
                  u("span", Bb, A(E(he)(
                    x.record_locator_create_payment_count ?? 0
                  )), 1)
                ]),
                "cell-failedPayment": F(({ row: x }) => [
                  u("span", Lb, A(E(he)(
                    x.record_locator_create_payment_failed_count ?? 0
                  )), 1)
                ]),
                _: 1
              }, 8, ["columns", "rows"])
            ])
          ])) : (m(), _("section", Eb, [...v[0] || (v[0] = [
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
}), Pb = /* @__PURE__ */ pe(Rb, [["__scopeId", "data-v-f904c66a"]]), Ib = { class: "card-body" }, Fb = {
  key: 0,
  class: "chart-section"
}, Ob = {
  key: 1,
  class: "empty-state"
}, Vb = {
  key: 2,
  class: "comparison-section"
}, zb = { class: "comparison-grid" }, Nb = /* @__PURE__ */ ue({
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
    }, { isDark: l } = Me($e(s, "theme"));
    C(() => s.data?.total_sell_success ?? 0);
    const c = C(() => {
      const g = /* @__PURE__ */ new Set();
      for (const b of s.data?.sales_by_channel_by_day ?? [])
        for (const y of Object.keys(b.channels))
          g.add(y);
      return Array.from(g).sort();
    }), d = (g, b) => n[g.toLowerCase()] ?? o[b % o.length];
    function h(g) {
      return g.replace(/_/g, " ").toUpperCase();
    }
    function f(g) {
      if (g.delta === null) return "No previous data";
      const b = he(g.previous), y = `${Math.abs(g.delta).toFixed(1)}%`;
      return g.delta === 0 ? `0.0% vs prev. period (${b})` : `${g.delta > 0 ? "↑" : "↓"} ${y} vs prev. period (${b})`;
    }
    const p = C(() => {
      const g = s.data?.sales_by_channel_by_day ?? [];
      if (g.length === 0) return { labels: [], datasets: [] };
      const b = g.map((v) => ze(v.date).format("MMM-DD")), y = c.value.map((v, x) => ({
        label: v,
        data: g.map((k) => k.channels[v] ?? 0),
        backgroundColor: d(v, x),
        borderRadius: 4
      }));
      return { labels: b, datasets: y };
    });
    return t({ isDark: l }), (g, b) => (m(), ae(Se, {
      class: "sales-channel-root h-full min-h-0",
      title: "Sales by Channel",
      subtitle: "Successful sales breakdown by communication channel",
      "default-open": e.initiallyOpen,
      loading: s.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !s.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: r,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Ib, [
          p.value.labels.length > 0 ? (m(), _("section", Fb, [
            j(kt, {
              data: p.value,
              stacked: !0
            }, null, 8, ["data"])
          ])) : (m(), _("section", Ob, [...b[0] || (b[0] = [
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
          e.channelComparison.length > 0 ? (m(), _("section", Vb, [
            u("div", zb, [
              (m(!0), _(ce, null, me(e.channelComparison, (y, v) => (m(), ae(E(_e), {
                key: y.channel,
                color: d(y.channel, v),
                title: h(y.channel),
                value: E(he)(y.current),
                subvalue: f(y)
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["default-open", "loading"]));
  }
}), gr = /* @__PURE__ */ pe(Nb, [["__scopeId", "data-v-4879d791"]]), jb = { class: "card-body" }, Hb = {
  key: 0,
  class: "chart-section"
}, Wb = { class: "chart-wrapper" }, Kb = {
  key: 1,
  class: "empty-state"
}, Yb = { class: "seller-value-cards" }, Ub = {
  key: 2,
  class: "seller-daily-section"
}, qb = { class: "w-full min-w-0" }, Xb = { class: "sl-cell font-medium" }, Gb = { class: "sl-cell text-center" }, Zb = { class: "sl-cell text-center" }, Qb = { class: "sl-cell text-center" }, Jb = { class: "sl-cell text-center" }, ev = { class: "sl-cell text-center" }, tv = { class: "sl-cell text-center success-value" }, av = {
  key: 0,
  class: "currency-cell-list"
}, nv = {
  key: 1,
  class: "empty-cell"
}, ov = { class: "sl-cell text-center success-value" }, sv = { class: "sl-cell text-center" }, iv = { class: "sl-cell text-center success-value" }, rv = {
  key: 0,
  class: "currency-cell-list"
}, lv = {
  key: 1,
  class: "empty-cell"
}, cv = { class: "sl-cell text-center success-value" }, dv = { class: "sl-cell text-center" }, uv = { class: "sl-cell text-center success-value" }, hv = {
  key: 0,
  class: "currency-cell-list"
}, fv = { key: 1 }, gv = {
  key: 0,
  class: "failed-reasons"
}, mv = { class: "reason-name" }, pv = { class: "reason-count" }, bv = {
  key: 1,
  class: "empty-cell"
}, vv = /* @__PURE__ */ ue({
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
    }, { isDark: r } = Me($e(o, "theme")), l = C(() => {
      if (!o.sellerData?.seller_by_day) return [];
      const M = [...o.sellerData.seller_by_day];
      return o.failedData?.failed_by_reason_by_day && o.failedData.failed_by_reason_by_day.forEach((L) => {
        const B = M.findIndex(
          (N) => N.date === L.date
        );
        B !== -1 ? M[B] = { ...M[B], reasons: L.reasons } : M.push({
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
      }), M.sort(
        (L, B) => new Date(L.date).getTime() - new Date(B.date).getTime()
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
    ), b = C(
      () => Array.isArray(o.sellerData.total_value_sell_cash_option) ? o.sellerData.total_value_sell_cash_option : []
    ), y = C(() => {
      const M = p.value;
      return M.length > 0 ? M.map(
        (L) => `${L.currency} ${Ft(L.total_value)}`
      ).join(" · ") : I(o.sellerData.total_value_sell_success);
    });
    function v(M) {
      return M.length > 0 ? M.map(
        (L) => `${L.currency} ${Ft(L.total_value)}`
      ).join(" · ") : "—";
    }
    const x = C(
      () => v(g.value)
    ), k = C(
      () => v(b.value)
    ), w = (M) => M.replace(/_/g, " ").replace(/\b\w/g, (L) => L.toUpperCase()), $ = (M) => `Failed:
${w(M)}`, D = C(() => {
      const {
        total_seller_conversations: M = 0,
        total_sell_started: L = 0,
        total_sell_booking_created: B = 0,
        total_sell_success: N = 0,
        total_sell_bank_transfer: W = 0,
        total_sell_cash_option: q = 0,
        total_sell_success_bank_transfer: ee = 0,
        total_sell_success_cash: X = 0
      } = h.value, { failed_by_reason_by_day: le = [] } = f.value;
      if (M === 0) return { nodes: [], links: [] };
      const U = Math.max(
        0,
        N - (ee ?? 0) - (X ?? 0)
      ), T = [
        { name: "Sell Initiated", value: M, status: "success" },
        { name: "Sell Started", value: L, status: "success" },
        { name: "Booking Created", value: B, status: "success" },
        { name: "Sell Success", value: U, status: "success" }
      ], z = [], K = M - L;
      K > 0 && (T.push({
        name: "Abandoned (Init)",
        value: K,
        status: "abandon"
      }), z.push({
        source: "Sell Initiated",
        target: "Abandoned (Init)",
        value: K,
        label: be(K, M)
      })), L > 0 && z.push({
        source: "Sell Initiated",
        target: "Sell Started",
        value: L,
        label: be(L, M)
      });
      const de = le.reduce(
        (Y, H) => (H.reasons && Array.isArray(H.reasons) && H.reasons.forEach((ne) => {
          const ie = ne.reason, G = ne.failed_count;
          Y[ie] = (Y[ie] || 0) + G;
        }), Y),
        {}
      );
      B > 0 && z.push({
        source: "Sell Started",
        target: "Booking Created",
        value: B,
        label: be(B, M)
      }), W > 0 && (T.push({ name: "Bank Transfer", value: W, status: "success" }), z.push({
        source: "Booking Created",
        target: "Bank Transfer",
        value: W,
        label: be(W, M)
      })), q > 0 && (T.push({ name: "Cash Option", value: q, status: "success" }), z.push({
        source: "Booking Created",
        target: "Cash Option",
        value: q,
        label: be(q, M)
      })), U > 0 && z.push({
        source: "Booking Created",
        target: "Sell Success",
        value: U,
        label: be(U, M)
      }), (ee ?? 0) > 0 && (T.push({
        name: "Bank Transfer Success",
        value: ee ?? 0,
        status: "success"
      }), z.push({
        source: "Bank Transfer",
        target: "Bank Transfer Success",
        value: ee ?? 0,
        label: be(ee ?? 0, M)
      })), (X ?? 0) > 0 && (T.push({
        name: "Cash Option Success",
        value: X ?? 0,
        status: "success"
      }), z.push({
        source: "Cash Option",
        target: "Cash Option Success",
        value: X ?? 0,
        label: be(X ?? 0, M)
      }));
      const ve = B - U - W - q;
      ve > 0 && (T.push({
        name: "Failed at Completion",
        value: ve,
        status: "error"
      }), z.push({
        source: "Booking Created",
        target: "Failed at Completion",
        value: ve,
        label: be(ve, M)
      }));
      const Q = L - B;
      if (Q > 0 && (T.push({
        name: "Failed at Booking",
        value: Q,
        status: "error"
      }), z.push({
        source: "Sell Started",
        target: "Failed at Booking",
        value: Q,
        label: be(Q, M)
      })), Object.keys(de).length > 0) {
        const Y = Object.values(de).reduce(
          (ne, ie) => ne + ie,
          0
        ), H = Q - Y;
        Object.entries(de).filter(([, ne]) => ne > 0).sort(([, ne], [, ie]) => ie - ne).forEach(([ne, ie]) => {
          const G = `Failed: ${ne}`;
          T.push({
            name: G,
            value: ie,
            status: "error",
            label: $(ne)
          }), z.push({
            source: "Failed at Booking",
            target: G,
            value: ie,
            label: be(ie, M)
          });
        }), H > 0 && (T.push({
          name: "Failed: Without Reason",
          value: H,
          status: "error",
          label: `Failed:
Without Reason`
        }), z.push({
          source: "Failed at Booking",
          target: "Failed: Without Reason",
          value: H,
          label: be(H, M)
        }));
      }
      return { nodes: T, links: z };
    }), S = (M, L) => ha(M, L), R = (M, L) => {
      const B = he(M), N = S(M, L);
      return `${B} (${N})`;
    }, P = (M) => M == null ? 0 : typeof M == "number" ? M : Array.isArray(M) ? M.reduce((L, B) => L + (B.total_value || 0), 0) : 0, I = (M) => Ft(P(M));
    return t({ isDark: r }), (M, L) => (m(), ae(Se, {
      class: "seller-metrics-root h-full min-h-0",
      title: "Seller Metrics",
      subtitle: "Sales performance and failure analysis",
      "default-open": e.initiallyOpen,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", jb, [
          D.value.nodes.length > 0 ? (m(), _("section", Hb, [
            u("div", Wb, [
              j(Zt, {
                data: D.value,
                height: "420px",
                "node-gap": 16
              }, null, 8, ["data"])
            ])
          ])) : (m(), _("section", Kb, [...L[0] || (L[0] = [
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
          u("section", Yb, [
            j(_e, {
              class: "seller-value-card",
              color: "var(--kiut-success)",
              title: "Total Sales Value",
              value: y.value
            }, null, 8, ["value"]),
            j(_e, {
              class: "seller-value-card",
              color: "#d97706",
              title: "Bank Transfer Value",
              value: x.value
            }, null, 8, ["value"]),
            j(_e, {
              class: "seller-value-card",
              color: "#ca8a04",
              title: "Cash Option Value",
              value: k.value
            }, null, 8, ["value"])
          ]),
          l.value && l.value.length > 0 ? (m(), _("section", Ub, [
            u("div", qb, [
              j(dt, {
                columns: c,
                rows: d.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: B }) => [
                  u("span", Xb, A(E(ze)(String(B.date)).format("MMM DD")), 1)
                ]),
                "cell-sellInitiated": F(({ row: B }) => [
                  u("span", Gb, A(E(he)(Number(B.seller_conversations) || 0)), 1)
                ]),
                "cell-sellStarted": F(({ row: B }) => [
                  u("span", Zb, A(R(
                    B.sell_started_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-getQuote": F(({ row: B }) => [
                  u("span", Qb, A(R(
                    B.sell_get_quote_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bookingCreated": F(({ row: B }) => [
                  u("span", Jb, A(R(
                    B.sell_booking_created_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-bankTransfer": F(({ row: B }) => [
                  u("span", ev, A(E(he)(Number(B.sell_bank_transfer_count) || 0)), 1)
                ]),
                "cell-btValue": F(({ row: B }) => [
                  u("span", tv, [
                    Array.isArray(
                      B.daily_value_sell_success_bank_transfer
                    ) && B.daily_value_sell_success_bank_transfer.length > 0 ? (m(), _("div", av, [
                      (m(!0), _(ce, null, me(B.daily_value_sell_success_bank_transfer, (N) => (m(), _("span", {
                        key: `${B.date}-bt-success-${N.currency}`
                      }, A(N.currency) + " " + A(E(Ft)(N.total_value)), 1))), 128))
                    ])) : (m(), _("span", nv, "-"))
                  ])
                ]),
                "cell-btSuccess": F(({ row: B }) => [
                  u("span", ov, A(E(he)(
                    Number(
                      B.sell_success_bank_transfer_count
                    ) || 0
                  )), 1)
                ]),
                "cell-cashOption": F(({ row: B }) => [
                  u("span", sv, A(E(he)(Number(B.sell_cash_option_count) || 0)), 1)
                ]),
                "cell-coValue": F(({ row: B }) => [
                  u("span", iv, [
                    Array.isArray(
                      B.daily_value_sell_success_cash
                    ) && B.daily_value_sell_success_cash.length > 0 ? (m(), _("div", rv, [
                      (m(!0), _(ce, null, me(B.daily_value_sell_success_cash, (N) => (m(), _("span", {
                        key: `${B.date}-co-success-${N.currency}`
                      }, A(N.currency) + " " + A(E(Ft)(N.total_value)), 1))), 128))
                    ])) : (m(), _("span", lv, "-"))
                  ])
                ]),
                "cell-cashSuccess": F(({ row: B }) => [
                  u("span", cv, A(E(he)(
                    Number(B.sell_success_cash_count) || 0
                  )), 1)
                ]),
                "cell-sellSuccess": F(({ row: B }) => [
                  u("span", dv, A(R(
                    B.sell_success_count,
                    B.seller_conversations || B.sell_started_count
                  )), 1)
                ]),
                "cell-totalSalesValue": F(({ row: B }) => [
                  u("span", uv, [
                    Array.isArray(B.daily_value_sell_success) && B.daily_value_sell_success.length > 0 ? (m(), _("div", hv, [
                      (m(!0), _(ce, null, me(B.daily_value_sell_success, (N) => (m(), _("span", {
                        key: `${B.date}-${N.currency}`
                      }, A(N.currency) + " " + A(E(Ft)(N.total_value)), 1))), 128))
                    ])) : (m(), _("span", fv, A(I(
                      B.daily_value_sell_success
                    )), 1))
                  ])
                ]),
                "cell-failed": F(({ row: B }) => [
                  (B.reasons || []).length > 0 ? (m(), _("div", gv, [
                    (m(!0), _(ce, null, me(B.reasons || [], (N) => (m(), _("div", {
                      key: N.reason,
                      class: "failed-reason-item"
                    }, [
                      u("span", mv, A(N.reason) + ":", 1),
                      u("span", pv, A(N.failed_count), 1)
                    ]))), 128))
                  ])) : (m(), _("div", bv, "-"))
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
}), mr = /* @__PURE__ */ pe(vv, [["__scopeId", "data-v-f823c802"]]), yv = { class: "seller-container__body" }, xv = /* @__PURE__ */ ue({
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
    return (c, d) => (m(), ae(Se, {
      class: "seller-container-root w-full",
      title: "Seller",
      subtitle: "Sales funnel performance and successful sales by communication channel.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: d[2] || (d[2] = (h) => n("open"))
    }, {
      default: F(() => [
        u("div", yv, [
          j(mr, {
            "initially-open": e.childrenInitiallyOpen,
            "seller-data": e.sellerData,
            "failed-data": e.failedData,
            loading: o.value,
            theme: e.theme,
            "enable-export": e.enableExport,
            "export-loading": i.value,
            onExport: d[0] || (d[0] = (h) => l("seller", h))
          }, null, 8, ["initially-open", "seller-data", "failed-data", "loading", "theme", "enable-export", "export-loading"]),
          j(gr, {
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
}), _v = /* @__PURE__ */ pe(xv, [["__scopeId", "data-v-bd0ec4ff"]]), kv = { class: "card-body" }, wv = {
  key: 0,
  class: "chart-section"
}, Cv = {
  key: 1,
  class: "empty-state"
}, $v = { class: "empty-state-content" }, Sv = { class: "empty-icon-wrapper" }, Mv = /* @__PURE__ */ ue({
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
    }, { isDark: r, colors: l } = Me($e(o, "theme")), c = C(() => {
      const f = (o.data?.top_agents || []).filter(
        (y) => y.agent_type?.toLowerCase() !== "triage"
      );
      if (f.length === 0)
        return { labels: [], datasets: [] };
      const p = f.reduce(
        (y, v) => y + (Number(v.conversations) || 0),
        0
      ), g = f.map((y) => {
        const v = y.agent_type?.toLowerCase();
        return n[v] || "#94a3b8";
      }), b = g.map((y) => `${y}80`);
      return {
        labels: f.map((y) => {
          const v = Number(y.conversations) || 0, x = p ? v / p * 100 : 0;
          return `${y.agent_type} - ${v.toLocaleString()} (${x.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: f.map((y) => y.conversations),
            backgroundColor: b,
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
                (y, v) => y + (Number(v) || 0),
                0
              ), b = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: r }), (h, f) => (m(), ae(Se, {
      class: "top-agents-root h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: i,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", kv, [
          c.value.labels && c.value.labels.length ? (m(), _("section", wv, [
            j(Dn, {
              data: c.value,
              options: d.value
            }, null, 8, ["data", "options"])
          ])) : (m(), _("section", Cv, [
            u("div", $v, [
              u("div", Sv, [
                j(E(Nm), { class: "empty-icon" })
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
}), Dv = /* @__PURE__ */ pe(Mv, [["__scopeId", "data-v-08639fed"]]), Av = { class: "card-body" }, Tv = {
  key: 0,
  class: "payment-methods-section"
}, Bv = { class: "payment-methods-grid" }, Lv = {
  key: 1,
  class: "empty-state"
}, Ev = { class: "empty-state-content" }, Rv = { class: "empty-icon-wrapper" }, Pv = {
  key: 2,
  class: "payment-method-daily-section"
}, Iv = { class: "w-full min-w-0" }, Fv = { class: "font-medium" }, Ov = { class: "text-center" }, Vv = { class: "text-center success-value" }, zv = {
  key: 0,
  class: "currency-cell-list"
}, Nv = { class: "payment-tags" }, jv = { class: "tag-name" }, Hv = {
  key: 0,
  class: "tag-amount"
}, Wv = {
  key: 1,
  class: "tag-amount"
}, Kv = { class: "tag-count" }, Yv = {
  key: 3,
  class: "empty-table-state"
}, Uv = "Not Registered", qv = /* @__PURE__ */ ue({
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
    const n = e, o = a, { isDark: s } = Me($e(n, "theme")), i = se(!1), r = se({
      airline_name: "",
      start_date: "",
      end_date: "",
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: []
    }), l = C(() => r.value.payment_method_breakdown && r.value.payment_method_breakdown.length > 0), c = C(() => r.value.payment_method_by_day && r.value.payment_method_by_day.length > 0), d = C(() => !r.value.payment_method_by_day || r.value.payment_method_by_day.length === 0 ? [] : [...r.value.payment_method_by_day].sort((S, R) => ze(S.date).valueOf() - ze(R.date).valueOf())), h = [
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
      const R = (S.payment_method_breakdown || []).map(
        (I) => ({
          payment_method: I.payment_method || "Unknown",
          total_amount: I.total_amount ?? 0,
          count: I.count ?? 0,
          total_amount_by_currency: I.total_amount_by_currency ?? []
        })
      ), P = (S.payment_method_by_day || []).map((I) => ({
        date: I.date || "",
        total_count: I.total_count ?? 0,
        total_amount: I.total_amount ?? 0,
        total_amount_by_currency: I.total_amount_by_currency ?? [],
        payment_methods: (I.payment_methods || []).map((M) => ({
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
        payment_method_breakdown: R,
        payment_method_by_day: P
      };
    }, g = async () => {
      if (!(!n.fetchFunction || !n.dates || n.dates.length < 2 || !n.airlineName)) {
        i.value = !0;
        try {
          const [S, R] = n.dates.map(
            (I) => ze(I).format("YYYY-MM-DD")
          ), P = await n.fetchFunction(
            n.airlineName,
            S,
            R
          );
          r.value = p(P);
        } catch (S) {
          console.error("Error fetching payment method metrics:", S), r.value = p(null);
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
    ], y = (S) => !S || S.toLowerCase() === "unknown" ? Uv : S.replace(/_/g, " "), v = (S) => S == null ? "$0.00" : Be(S), x = (S) => {
      const R = S.total_amount_by_currency;
      return R && R.length > 0 ? R.map((P) => `${P.currency} ${v(P.total_value)}`).join(" · ") : v(S.total_amount);
    }, k = (S) => S ? ze(S).format("MMM DD") : "-", w = (S) => S == null || Number.isNaN(Number(S)) ? 0 : Number(S), $ = (S) => {
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
    ), t({ isDark: s }), (S, R) => (m(), ae(Se, {
      class: "payment-method-root h-full min-h-0",
      title: "Payment Method Metrics",
      subtitle: "Sales breakdown by payment method",
      loading: i.value,
      "lazy-mount": "",
      onOpen: R[0] || (R[0] = (P) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !i.value ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: $,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Av, [
          l.value ? (m(), _("section", Tv, [
            R[1] || (R[1] = u("p", { class: "section-label" }, "Sales by Payment Method", -1)),
            u("div", Bv, [
              (m(!0), _(ce, null, me(r.value.payment_method_breakdown, (P, I) => (m(), ae(_e, {
                key: P.payment_method,
                class: "payment-method-card-item min-w-0",
                color: b[I % b.length],
                title: y(P.payment_method),
                value: x(P),
                subvalue: `${w(P.count)} ${w(P.count) === 1 ? "sale" : "sales"}`
              }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
            ])
          ])) : (m(), _("section", Lv, [
            u("div", Ev, [
              u("div", Rv, [
                j(E(Hm), { class: "empty-icon" })
              ]),
              R[2] || (R[2] = u("p", { class: "empty-title" }, "No payment data available", -1)),
              R[3] || (R[3] = u("p", { class: "empty-description" }, " No payment method data found for the selected period. Try adjusting the date range. ", -1))
            ])
          ])),
          c.value ? (m(), _("section", Pv, [
            R[5] || (R[5] = u("p", { class: "section-label" }, "Daily Breakdown", -1)),
            u("div", Iv, [
              j(dt, {
                columns: h,
                rows: f.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-date": F(({ row: P }) => [
                  u("span", Fv, A(k(String(P.date))), 1)
                ]),
                "cell-totalSales": F(({ row: P }) => [
                  u("span", Ov, A(E(he)(P.total_count ?? 0)), 1)
                ]),
                "cell-totalAmount": F(({ row: P }) => [
                  u("span", Vv, [
                    Array.isArray(P.total_amount_by_currency) && P.total_amount_by_currency.length > 0 ? (m(), _("div", zv, [
                      (m(!0), _(ce, null, me(P.total_amount_by_currency, (I) => (m(), _("span", {
                        key: `${P.date}-${I.currency}`
                      }, A(I.currency) + " " + A(v(I.total_value)), 1))), 128))
                    ])) : (m(), _(ce, { key: 1 }, [
                      Ae(A(v(Number(P.total_amount ?? 0))), 1)
                    ], 64))
                  ])
                ]),
                "cell-paymentMethods": F(({ row: P }) => [
                  u("div", Nv, [
                    (m(!0), _(ce, null, me(Array.isArray(P.payment_methods) ? P.payment_methods : [], (I) => (m(), _("div", {
                      key: I.payment_method,
                      class: "payment-tag"
                    }, [
                      u("span", jv, A(y(I.payment_method)), 1),
                      R[4] || (R[4] = u("span", { class: "tag-separator" }, "•", -1)),
                      !I.total_amount_by_currency || I.total_amount_by_currency.length === 0 ? (m(), _("span", Hv, A(v(I.total_amount)), 1)) : (m(), _("span", Wv, A(I.total_amount_by_currency.map(
                        (M) => `${M.currency} ${v(M.total_value)}`
                      ).join(" / ")), 1)),
                      u("span", Kv, "(" + A(w(I.count)) + ")", 1)
                    ]))), 128))
                  ])
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ])) : l.value ? (m(), _("div", Yv, [...R[6] || (R[6] = [
            u("p", { class: "empty-table-text" }, "No daily breakdown available", -1)
          ])])) : V("", !0)
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Xv = /* @__PURE__ */ pe(qv, [["__scopeId", "data-v-168637eb"]]), Gv = {
  key: "title-skeleton",
  class: "header-title-group",
  "aria-hidden": "true"
}, Zv = {
  key: 0,
  class: "ut-skeleton-blink skeleton-header-label"
}, Qv = {
  key: "title-content",
  class: "header-title-group"
}, Jv = {
  class: "icon-wrapper",
  "aria-hidden": "true"
}, ey = {
  key: 0,
  class: "metric-label metric-label--header"
}, ty = {
  key: "aside-skeleton",
  class: "ut-skeleton-blink skeleton-badge",
  "aria-hidden": "true"
}, ay = { key: "aside-content" }, ny = {
  key: "body-skeleton",
  class: "skeleton-body",
  "aria-busy": "true",
  "aria-label": "Loading metric"
}, oy = {
  key: 0,
  class: "ut-skeleton-blink skeleton-label"
}, sy = {
  key: "body-content",
  class: "highlight-inner"
}, iy = { class: "card-body" }, ry = { class: "metric-row" }, ly = {
  key: 0,
  class: "metric-prefix"
}, cy = {
  key: 0,
  class: "metric-label"
}, dy = /* @__PURE__ */ ue({
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
    }), r = C(() => {
      const c = i.value;
      if (Number.isNaN(c)) return "-";
      const d = c.toFixed(1);
      return c > 0 ? `+${d}%` : `${d}%`;
    }), l = C(() => i.value > 0 ? "change-badge--up" : i.value < 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: n, changePercent: i }), (c, d) => (m(), ae(Se, {
      collapsible: !1,
      class: J([
        "card-metric",
        "w-full",
        {
          "card-metric--dark": E(n),
          "card-metric--label-header": o.value
        }
      ])
    }, {
      title: F(() => [
        j(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (m(), _("div", Gv, [
              d[0] || (d[0] = u("div", { class: "ut-skeleton-blink skeleton-icon" }, null, -1)),
              o.value ? (m(), _("div", Zv)) : V("", !0)
            ])) : (m(), _("div", Qv, [
              u("div", Jv, [
                ke(c.$slots, "icon", {}, void 0, !0)
              ]),
              o.value ? (m(), _("span", ey, A(e.label), 1)) : V("", !0)
            ]))
          ]),
          _: 3
        })
      ]),
      headerAside: F(() => [
        j(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (m(), _("div", ty)) : (m(), _("div", ay, [
              ke(c.$slots, "headerAside", {}, () => [
                s.value ? (m(), _("div", {
                  key: 0,
                  class: J(["change-badge", l.value])
                }, A(r.value), 3)) : V("", !0)
              ], !0)
            ]))
          ]),
          _: 3
        })
      ]),
      default: F(() => [
        j(ut, {
          name: "card-metric-fade",
          mode: "out-in"
        }, {
          default: F(() => [
            e.loading ? (m(), _("div", ny, [
              d[1] || (d[1] = u("div", { class: "ut-skeleton-blink skeleton-value" }, null, -1)),
              o.value ? V("", !0) : (m(), _("div", oy))
            ])) : (m(), _("div", sy, [
              u("div", iy, [
                ke(c.$slots, "value", {}, () => [
                  u("div", ry, [
                    e.prefix ? (m(), _("span", ly, A(e.prefix), 1)) : V("", !0),
                    u("span", {
                      class: J(["metric-value", e.valueSize === "large" ? "metric-value--large" : ""])
                    }, A(e.value), 3)
                  ])
                ], !0),
                o.value ? V("", !0) : (m(), _("span", cy, A(e.label), 1))
              ])
            ]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), _t = /* @__PURE__ */ pe(dy, [["__scopeId", "data-v-c81268f4"]]);
function Do(e, t) {
  return m(), _("svg", {
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
function Ne() {
  const e = new Uint8Array(8);
  return globalThis.crypto.getRandomValues(e), Array.from(e, (t) => t.toString(16).padStart(2, "0")).join("");
}
const ot = "mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100", at = "min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", uy = "min-h-[5.5rem] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans leading-normal text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500", Dt = "border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400", At = "mt-1 text-xs font-medium text-red-600 dark:text-red-400", hy = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], fy = {
  key: 0,
  class: "sticky top-0 z-10 border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-2 dark:border-[color:var(--kiut-border-light)]"
}, gy = ["placeholder", "aria-label"], my = {
  key: 0,
  class: "px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, py = ["aria-selected", "onClick", "onMouseenter"], by = {
  key: 0,
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, vy = { class: "min-w-0 flex-1" }, An = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-select-${Ne()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = se(null), c = se(null), d = se(null), h = se(null), f = se(null), p = se(!1), g = se(0), b = se(""), y = se({});
    function v() {
      const U = c.value;
      if (!U) return;
      const T = U.getBoundingClientRect();
      y.value = {
        top: `${T.bottom - 3}px`,
        left: `${T.left}px`,
        width: `${T.width}px`
      };
    }
    const x = C(() => a.options.filter((U) => !U.disabled)), k = C(() => {
      if (!a.searchable) return x.value;
      const U = b.value.trim().toLowerCase();
      return U ? x.value.filter((T) => T.label.toLowerCase().includes(U)) : x.value;
    }), w = C(
      () => a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opción"
    ), $ = C(() => a.modelValue === null || a.modelValue === void 0 || a.modelValue === "" ? a.placeholder : a.options.find((T) => T.value === a.modelValue)?.label ?? String(a.modelValue));
    function D(U) {
      return `${String(U.value)}-${U.label}`;
    }
    function S(U) {
      return a.modelValue === U.value;
    }
    function R(U, T) {
      const z = S(U), K = g.value === T;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        z ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !z && K ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function P() {
      g.value = Math.max(
        0,
        k.value.findIndex((U) => U.value === a.modelValue)
      );
    }
    function I() {
      if (a.searchable) {
        f.value?.focus();
        return;
      }
      h.value?.focus();
    }
    function M() {
      v(), b.value = "", P(), He(() => I());
    }
    function L() {
      p.value = !1, b.value = "";
    }
    function B(U) {
      n("update:modelValue", U.value), L();
    }
    function N() {
      if (!a.disabled) {
        if (p.value) {
          L();
          return;
        }
        p.value = !0, M();
      }
    }
    function W(U) {
      U.stopPropagation(), !a.disabled && N();
    }
    function q(U) {
      if (!p.value) return;
      const T = U.target, z = l.value, K = d.value;
      z && !z.contains(T) && (!K || !K.contains(T)) && L();
    }
    function ee(U) {
      a.disabled || (U.key === "ArrowDown" || U.key === "Enter" || U.key === " ") && (U.preventDefault(), p.value || (p.value = !0, M()));
    }
    function X(U) {
      const T = k.value;
      if (U.key === "Escape") {
        U.preventDefault(), L();
        return;
      }
      if (U.key === "ArrowDown") {
        if (U.preventDefault(), T.length === 0) return;
        g.value = 0, h.value?.focus();
        return;
      }
      if (U.key === "ArrowUp") {
        if (U.preventDefault(), T.length === 0) return;
        g.value = T.length - 1, h.value?.focus();
        return;
      }
      if (U.key === "Enter") {
        U.preventDefault();
        const z = T[g.value];
        z && B(z);
      }
    }
    function le(U) {
      const T = k.value;
      if (U.key === "Escape") {
        U.preventDefault(), L();
        return;
      }
      if (T.length !== 0) {
        if (U.key === "ArrowDown") {
          U.preventDefault(), g.value = Math.min(g.value + 1, T.length - 1);
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
          const z = T[g.value];
          z && B(z);
        }
      }
    }
    return Ee(b, () => {
      g.value = 0;
    }), Ze(() => {
      document.addEventListener("click", q);
    }), ct(() => {
      document.removeEventListener("click", q);
    }), (U, T) => (m(), _("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: J(E(ot))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        ref_key: "buttonRef",
        ref: c,
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          E(at),
          "flex items-center justify-between gap-2 text-left",
          p.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": p.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : w.value,
        onClick: W,
        onKeydown: ee
      }, [
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            e.modelValue === null || e.modelValue === void 0 || e.modelValue === "" ? "text-[color:var(--kiut-text-muted)] dark:text-slate-500" : ""
          ])
        }, A($.value), 3),
        j(E(Gt), {
          class: J(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", p.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, hy),
      (m(), ae(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: d,
          style: Ce(y.value),
          class: "fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
        }, [
          e.searchable ? (m(), _("div", fy, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: f,
              "onUpdate:modelValue": T[0] || (T[0] = (z) => b.value = z),
              type: "search",
              class: J([E(at), "min-h-0 py-1.5 text-sm"]),
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              onClick: T[1] || (T[1] = Oe(() => {
              }, ["stop"])),
              onKeydown: Oe(X, ["stop"])
            }, null, 42, gy), [
              [Wt, b.value]
            ])
          ])) : V("", !0),
          u("ul", {
            id: r,
            ref_key: "listRef",
            ref: h,
            role: "listbox",
            tabindex: "-1",
            class: "py-1",
            onKeydown: Oe(le, ["stop"])
          }, [
            k.value.length === 0 ? (m(), _("li", my, A(e.noResultsText), 1)) : V("", !0),
            (m(!0), _(ce, null, me(k.value, (z, K) => (m(), _("li", {
              key: D(z),
              role: "option",
              "aria-selected": S(z),
              class: J(R(z, K)),
              onClick: Oe((de) => B(z), ["stop"]),
              onMouseenter: (de) => g.value = K
            }, [
              e.showOptionCheck ? (m(), _("span", by, [
                S(z) ? (m(), ae(E(Do), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ])) : V("", !0),
              u("span", vy, A(z.label), 1)
            ], 42, py))), 128))
          ], 544)
        ], 4), [
          [Ut, p.value]
        ])
      ]))
    ], 512));
  }
}), yy = { class: "card-body" }, xy = { class: "kpi-closed-value" }, _y = { class: "kpi-closed-value__main" }, ky = {
  key: 0,
  class: "kpi-closed-value__pct"
}, wy = { class: "table-view-select flex justify-end" }, Cy = { class: "table-section w-full min-w-0" }, $y = { class: "cell-plain" }, Sy = { class: "cell-plain" }, My = { class: "cell-plain cell-plain--muted" }, Dy = { class: "cell-plain" }, Ay = { class: "cell-plain" }, Ty = { class: "cell-plain" }, By = {
  key: 2,
  class: "empty-state"
}, Ly = 6, Ey = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (Y) => {
      o("export", Y);
    }, { isDark: i } = Me($e(n, "theme")), r = /* @__PURE__ */ new Set(["—", "-", "–", ""]);
    function l(Y) {
      const H = Y?.trim() ?? "";
      return H.length > 0 && !r.has(H);
    }
    function c(Y) {
      if (!l(Y.agent_email)) return !1;
      const H = Y.assigned_count ?? 0, ne = Y.closed_count ?? 0;
      return H > 0 || ne > 0;
    }
    function d(Y) {
      return Y.closed_count ?? 0;
    }
    function h(Y) {
      const H = Y?.trim();
      return H || "—";
    }
    const f = C(
      () => (n.data?.agents_by_day ?? []).filter(c)
    ), p = C(() => f.value.length > 0), g = C(() => {
      const Y = (n.data?.total_enqueued ?? 0) > 0;
      return p.value || Y;
    }), b = se("by_date"), y = [
      { value: "by_date", label: "By date" },
      { value: "aggregated", label: "Aggregated" }
    ], v = se("date"), x = se("desc");
    Ee(b, (Y) => {
      Y === "aggregated" ? (v.value = "name", x.value = "asc") : (v.value = "date", x.value = "desc");
    });
    function k(Y, H) {
      return H == null ? null : H === 0 ? Y > 0 ? 100 : 0 : (Y - H) / H * 100;
    }
    function w(Y) {
      const H = Y.toFixed(1);
      return Y > 0 ? `+${H}%` : `${H}%`;
    }
    function $(Y, H = !1) {
      const ne = H ? -Y : Y;
      return ne > 0 ? "change-badge--up" : ne < 0 ? "change-badge--down" : "change-badge--neutral";
    }
    function D(Y, H) {
      if (Y === null) return null;
      const ne = k(Y, H);
      return ne === null ? null : {
        label: w(ne),
        class: $(ne, !0)
      };
    }
    function S(Y) {
      if (Y == null || Y === "") return null;
      if (typeof Y == "number")
        return Number.isFinite(Y) ? Y : null;
      const H = Y.trim();
      if (!H) return null;
      if (H.includes(":")) {
        const ie = H.split(":").map(Number);
        return ie.length !== 3 || ie.some(isNaN) ? null : ie[0] * 3600 + ie[1] * 60 + ie[2];
      }
      const ne = Number(H);
      return Number.isFinite(ne) ? ne : null;
    }
    function R(Y) {
      const H = Math.round(Y), ne = Math.floor(H / 3600), ie = Math.floor(H % 3600 / 60), G = H % 60;
      return `${String(ne).padStart(2, "0")}:${String(ie).padStart(2, "0")}:${String(G).padStart(2, "0")}`;
    }
    function P(Y) {
      const H = S(Y);
      return H === null ? "—" : typeof Y == "string" && Y.includes(":") ? Y.trim() : R(H);
    }
    const I = C(() => n.data?.total_enqueued ?? 0), M = C(() => n.data?.total_closed ?? 0), L = C(
      () => n.data?.avg_time_to_assign_seconds ?? null
    ), B = C(
      () => n.data?.avg_conversation_duration_seconds ?? null
    ), N = C(() => I.value <= 0 ? null : `(${(M.value / I.value * 100).toFixed(1)}%)`), W = C(
      () => D(
        S(L.value),
        n.previousAvgTimeToAssignSeconds
      )
    ), q = C(
      () => D(
        S(B.value),
        n.previousAvgConversationDurationSeconds
      )
    );
    function ee(Y, H) {
      return {
        id: `${Y.date}-${Y.agent_email}-${H}`,
        date: Y.date,
        dateSort: new Date(Y.date).getTime(),
        agent_name: Y.agent_name ?? "",
        agent_email: Y.agent_email,
        handled: d(Y),
        avg_assignation_seconds: S(Y.avg_time_to_assign_seconds),
        avg_resolution_seconds: S(Y.avg_conversation_duration_seconds),
        avg_assignation_display: P(Y.avg_time_to_assign_seconds),
        avg_resolution_display: P(Y.avg_conversation_duration_seconds)
      };
    }
    function X(Y) {
      const H = /* @__PURE__ */ new Map();
      for (const ne of Y) {
        if (!c(ne)) continue;
        const ie = ne.agent_email.trim();
        H.has(ie) || H.set(ie, {
          agent_name: ne.agent_name?.trim() ?? "",
          agent_email: ie,
          handled: 0,
          assignSum: 0,
          assignWeight: 0,
          resolutionSum: 0,
          resolutionWeight: 0
        });
        const G = H.get(ie), te = ne.assigned_count ?? 0, oe = ne.closed_count ?? 0;
        G.handled += d(ne), ne.agent_name?.trim() && (G.agent_name = ne.agent_name.trim());
        const ge = S(ne.avg_time_to_assign_seconds);
        ge !== null && te > 0 && (G.assignSum += ge * te, G.assignWeight += te);
        const xe = S(ne.avg_conversation_duration_seconds);
        xe !== null && oe > 0 && (G.resolutionSum += xe * oe, G.resolutionWeight += oe);
      }
      return Array.from(H.values()).map((ne, ie) => {
        const G = ne.assignWeight > 0 ? ne.assignSum / ne.assignWeight : null, te = ne.resolutionWeight > 0 ? ne.resolutionSum / ne.resolutionWeight : null;
        return {
          id: `agg-${ne.agent_email}-${ie}`,
          agent_name: ne.agent_name,
          agent_email: ne.agent_email,
          handled: ne.handled,
          avg_assignation_seconds: G,
          avg_resolution_seconds: te,
          avg_assignation_display: G !== null ? R(G) : "—",
          avg_resolution_display: te !== null ? R(te) : "—"
        };
      });
    }
    const le = C(() => {
      const Y = f.value;
      return b.value === "aggregated" ? X(Y) : Y.map(ee);
    });
    function U(Y, H, ne, ie) {
      const G = ie === "asc" ? 1 : -1;
      let te = 0;
      switch (ne) {
        case "date":
          te = (Y.dateSort ?? 0) - (H.dateSort ?? 0);
          break;
        case "name":
          te = (Y.agent_name || "").localeCompare(H.agent_name || "", void 0, {
            sensitivity: "base"
          });
          break;
        case "email":
          te = Y.agent_email.localeCompare(H.agent_email, void 0, {
            sensitivity: "base"
          });
          break;
        case "handled":
          te = Y.handled - H.handled;
          break;
        case "avgAssignation":
          te = (Y.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) - (H.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
          break;
        case "avgResolution":
          te = (Y.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) - (H.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
          break;
      }
      if (te !== 0) return te * G;
      if (b.value === "by_date" && ne !== "date") {
        const oe = (H.dateSort ?? 0) - (Y.dateSort ?? 0);
        if (oe !== 0) return oe;
      }
      return (Y.agent_name || "").localeCompare(H.agent_name || "", void 0, {
        sensitivity: "base"
      });
    }
    const T = C(() => {
      const Y = [...le.value];
      return Y.sort((H, ne) => U(H, ne, v.value, x.value)), Y;
    }), z = C(
      () => T.value
    ), K = C(() => {
      const Y = [];
      return b.value === "by_date" && Y.push({
        key: "date",
        label: "Date",
        align: "left",
        sortable: !0
      }), Y.push(
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
      ), Y;
    });
    function de(Y) {
      const H = Y;
      if (v.value === H) {
        x.value = x.value === "asc" ? "desc" : "asc";
        return;
      }
      v.value = H, H === "date" ? x.value = "desc" : H === "name" || H === "email" ? x.value = "asc" : x.value = "desc";
    }
    const ve = (Y) => Y == null ? "0" : he(Y), Q = (Y) => new Date(Y).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
    return t({ isDark: i }), (Y, H) => (m(), ae(Se, {
      class: "agent-human-conv-root h-full min-h-0",
      title: "Agent Human Conversations",
      subtitle: "Human conversation assignments and closures by agent",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: H[1] || (H[1] = (ne) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", yy, [
          g.value ? (m(), _("div", {
            key: 0,
            class: J(["grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4", { "agent-human-conv--dark": E(i) }])
          }, [
            j(_t, {
              label: "Conversations Opened",
              "label-position": "header",
              value: ve(I.value),
              theme: e.theme,
              "current-value": I.value,
              "previous-value": e.previousTotalEnqueued
            }, {
              icon: F(() => [...H[2] || (H[2] = [
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
            j(_t, {
              label: "Conversations Closed",
              "label-position": "header",
              value: ve(M.value),
              theme: e.theme,
              "current-value": M.value,
              "previous-value": e.previousTotalClosed
            }, {
              icon: F(() => [...H[3] || (H[3] = [
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
              value: F(() => [
                u("div", xy, [
                  u("span", _y, A(ve(M.value)), 1),
                  N.value ? (m(), _("span", ky, A(N.value), 1)) : V("", !0)
                ])
              ]),
              _: 1
            }, 8, ["value", "theme", "current-value", "previous-value"]),
            j(_t, {
              label: "Avg Time to Assign",
              "label-position": "header",
              value: P(L.value),
              theme: e.theme,
              "current-value": S(L.value) ?? 0,
              "previous-value": e.previousAvgTimeToAssignSeconds
            }, To({
              icon: F(() => [
                H[4] || (H[4] = u("svg", {
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
              W.value ? {
                name: "headerAside",
                fn: F(() => [
                  u("div", {
                    class: J(["duration-trend-badge", W.value.class])
                  }, A(W.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"]),
            j(_t, {
              label: "Avg Resolution Time",
              "label-position": "header",
              value: P(B.value),
              theme: e.theme,
              "current-value": S(B.value) ?? 0,
              "previous-value": e.previousAvgConversationDurationSeconds
            }, To({
              icon: F(() => [
                H[5] || (H[5] = u("svg", {
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
                fn: F(() => [
                  u("div", {
                    class: J(["duration-trend-badge", q.value.class])
                  }, A(q.value.label), 3)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["value", "theme", "current-value", "previous-value"])
          ], 2)) : V("", !0),
          p.value ? (m(), ae(Se, {
            key: 1,
            class: "agent-table-section mt-6",
            title: "Conversations Managed by Agent",
            subtitle: "Daily performance per human agent",
            collapsible: !1
          }, {
            headerAside: F(() => [
              u("div", wy, [
                j(An, {
                  modelValue: b.value,
                  "onUpdate:modelValue": H[0] || (H[0] = (ne) => b.value = ne),
                  options: y,
                  "aria-label-trigger": "Table view mode",
                  "show-option-check": !1
                }, null, 8, ["modelValue"])
              ])
            ]),
            default: F(() => [
              u("div", Cy, [
                (m(), ae(dt, {
                  key: `${b.value}-${v.value}-${x.value}`,
                  columns: K.value,
                  rows: z.value,
                  "sort-key": v.value,
                  "sort-direction": x.value,
                  "max-visible-rows": Ly,
                  "row-key": "id",
                  onSort: de
                }, {
                  "cell-date": F(({ row: ne }) => [
                    u("span", $y, A(Q(String(ne.date))), 1)
                  ]),
                  "cell-name": F(({ row: ne }) => [
                    u("span", Sy, A(h(ne.agent_name)), 1)
                  ]),
                  "cell-email": F(({ row: ne }) => [
                    u("span", My, A(ne.agent_email), 1)
                  ]),
                  "cell-handled": F(({ row: ne }) => [
                    u("span", Dy, A(ve(Number(ne.handled))), 1)
                  ]),
                  "cell-avgAssignation": F(({ row: ne }) => [
                    u("span", Ay, A(ne.avg_assignation_display), 1)
                  ]),
                  "cell-avgResolution": F(({ row: ne }) => [
                    u("span", Ty, A(ne.avg_resolution_display), 1)
                  ]),
                  _: 1
                }, 8, ["columns", "rows", "sort-key", "sort-direction"]))
              ])
            ]),
            _: 1
          })) : g.value ? V("", !0) : (m(), _("div", By, [...H[6] || (H[6] = [
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
}), Ry = /* @__PURE__ */ pe(Ey, [["__scopeId", "data-v-837b41e7"]]), Py = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Iy = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Fy = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-3"
}, Oy = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Vy = {
  key: 1,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, zy = {
  key: 2,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Ny = { class: "max-w-[360px] px-4 text-center" }, jy = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]" }, ai = 5, Hy = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (b) => {
      o("export", b);
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, c = se({
      labels: [],
      datasets: []
    }), d = C(
      () => n.data ?? {
        channels_by_day: {},
        total_by_channel: {},
        total_conversations: 0
      }
    ), h = C(() => {
      const b = d.value.total_by_channel || {}, y = Object.values(b).reduce(
        (v, x) => v + x,
        0
      );
      return y === 0 ? [] : Object.entries(b).sort(([, v], [, x]) => x - v).map(([v, x]) => ({
        name: v,
        label: v.toUpperCase(),
        total: x,
        percentage: (x / y * 100).toFixed(1),
        color: l[v.toLowerCase()] || "#9ca3af"
      }));
    }), f = C(
      () => h.value.slice(0, ai)
    ), p = C(() => {
      const b = Math.min(f.value.length, ai);
      if (!(b <= 0))
        return { gridTemplateColumns: `repeat(${b}, minmax(0, 1fr))` };
    }), g = (b) => {
      if (!b || !b.channels_by_day) {
        c.value = { labels: [], datasets: [] };
        return;
      }
      const y = b.channels_by_day, v = Object.keys(y).sort();
      if (v.length === 0) {
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
          data: v.map((R) => y[R]?.[$] || 0),
          borderColor: S
        };
      });
      c.value = {
        labels: v.map(($) => ze($).format("MMM DD")),
        datasets: w
      };
    };
    return Ee(
      () => n.data,
      (b) => {
        g(b ?? null);
      },
      { deep: !0, immediate: !0 }
    ), t({ isDark: r }), (b, y) => (m(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "Conversations by Channel",
      subtitle: "Conversations sent by AI agents",
      collapsible: !1,
      loading: n.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Py, [
          u("div", Iy, [
            c.value.labels && c.value.labels.length ? (m(), _("section", Fy, [
              u("div", Oy, [
                j(ht, {
                  data: c.value,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              f.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(p.value)
              }, [
                (m(!0), _(ce, null, me(f.value, (v) => (m(), ae(_e, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${E(he)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : h.value.length ? (m(), _("section", Vy, [
              u("div", {
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(p.value)
              }, [
                (m(!0), _(ce, null, me(f.value, (v) => (m(), ae(_e, {
                  key: v.name,
                  class: "min-w-0",
                  color: v.color,
                  title: v.label,
                  value: `${v.percentage}%`,
                  subvalue: `${E(he)(v.total)} msgs`
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)
            ])) : V("", !0),
            h.value.length ? V("", !0) : (m(), _("section", zy, [
              u("div", Ny, [
                u("div", jy, [
                  j(E(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}), Wy = /* @__PURE__ */ pe(Hy, [["__scopeId", "data-v-d3f89004"]]), Ky = { class: "card-body" }, Yy = { class: "chart-container" }, Uy = { class: "triage-table-block w-full min-w-0" }, qy = { class: "triage-row-label" }, Xy = {
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
}, t1 = { class: "empty-state-content" }, a1 = { class: "empty-icon-wrapper" }, n1 = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (k) => {
      o("export", k);
    }, { isDark: i, colors: r } = Me(
      $e(n, "theme")
    ), l = C(() => {
      const k = n.data?.combinations || {}, w = { 0: 0, 1: 0, 2: 0, 3: 0, "4p": 0 };
      for (const [$, D] of Object.entries(k)) {
        const S = $.split("+").filter(Boolean);
        if (!S.includes("triage")) continue;
        const R = S.filter((P) => P !== "triage").length;
        R >= 4 ? w["4p"] += Number(D) || 0 : w[R] += Number(D) || 0;
      }
      return w;
    }), c = C(() => {
      const k = l.value;
      return k[0] + k[1] + k[2] + k[3] + k["4p"] || 0;
    }), d = C(() => Object.keys(n.data?.combinations || {}).length > 0), h = C(() => {
      const k = c.value;
      if (!k) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 };
      const w = l.value;
      return {
        pct0: w[0] / k * 100,
        pct1: w[1] / k * 100,
        pct2: w[2] / k * 100,
        pct3: w[3] / k * 100,
        pct4p: w["4p"] / k * 100
      };
    }), f = [
      { key: "metric", label: "Number of intentions", align: "left" },
      { key: "b0", label: "0", align: "center" },
      { key: "b1", label: "1", align: "center" },
      { key: "b2", label: "2", align: "center" },
      { key: "b3", label: "3", align: "center" },
      { key: "b4p", label: "4 or more", align: "center" }
    ], p = C(() => {
      const k = h.value, w = l.value;
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
    }, b = (k) => k?.replace("80", "") || "#888888", y = C(() => ({
      labels: ["Distribution"],
      datasets: [
        {
          label: "0",
          data: [h.value.pct0],
          backgroundColor: g.c0,
          borderColor: b(g.c0),
          borderWidth: 1
        },
        {
          label: "1",
          data: [h.value.pct1],
          backgroundColor: g.c1,
          borderColor: b(g.c1),
          borderWidth: 1
        },
        {
          label: "2",
          data: [h.value.pct2],
          backgroundColor: g.c2,
          borderColor: b(g.c2),
          borderWidth: 1
        },
        {
          label: "3",
          data: [h.value.pct3],
          backgroundColor: g.c3,
          borderColor: b(g.c3),
          borderWidth: 1
        },
        {
          label: "4+",
          data: [h.value.pct4p],
          backgroundColor: g.c4p,
          borderColor: b(g.c4p),
          borderWidth: 1
        }
      ]
    })), v = C(() => ({
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
    })), x = (k) => `${(Number(k) || 0).toFixed(0)}`;
    return t({ isDark: i }), (k, w) => (m(), ae(Se, {
      class: "triage-combinations-root h-full min-h-0",
      title: "Distribution of Number of Intents",
      subtitle: "Analysis of intent combinations per conversation",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Ky, [
          d.value ? (m(), _(ce, { key: 0 }, [
            u("div", Yy, [
              j(kt, {
                data: y.value,
                options: v.value
              }, null, 8, ["data", "options"])
            ]),
            j(_e, {
              class: "w-full min-w-0",
              title: "Total",
              value: E(he)(c.value),
              subvalue: "Conversations with triage"
            }, null, 8, ["value"]),
            u("div", Uy, [
              j(dt, {
                columns: f,
                rows: p.value,
                "max-visible-rows": 3,
                "row-key": "id"
              }, {
                "cell-metric": F(({ row: $ }) => [
                  u("span", qy, A($.metric), 1)
                ]),
                "cell-b0": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(g.c0) })
                  }, A(x(Number($.b0))) + "%", 5)) : (m(), _("span", Xy, A(E(he)(Number($.b0))), 1))
                ]),
                "cell-b1": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(g.c1) })
                  }, A(x(Number($.b1))) + "%", 5)) : (m(), _("span", Gy, A(E(he)(Number($.b1))), 1))
                ]),
                "cell-b2": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(g.c2) })
                  }, A(x(Number($.b2))) + "%", 5)) : (m(), _("span", Zy, A(E(he)(Number($.b2))), 1))
                ]),
                "cell-b3": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(g.c3) })
                  }, A(x(Number($.b3))) + "%", 5)) : (m(), _("span", Qy, A(E(he)(Number($.b3))), 1))
                ]),
                "cell-b4p": F(({ row: $ }) => [
                  $.id === "pct" ? (m(), _("span", {
                    key: 0,
                    class: "triage-pct",
                    style: Ce({ color: b(g.c4p) })
                  }, A(x(Number($.b4p))) + "%", 5)) : (m(), _("span", Jy, A(E(he)(Number($.b4p))), 1))
                ]),
                _: 1
              }, 8, ["rows"])
            ])
          ], 64)) : (m(), _("div", e1, [
            u("div", t1, [
              u("div", a1, [
                j(E(nt), { class: "empty-icon" })
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
}), o1 = /* @__PURE__ */ pe(n1, [["__scopeId", "data-v-be7d2c0c"]]), s1 = { class: "card-body" }, i1 = {
  key: 0,
  class: "distribution-with-total flex w-full min-w-0 flex-1 flex-col gap-3 min-h-0"
}, r1 = { class: "pie-section" }, l1 = {
  key: 1,
  class: "empty-state"
}, c1 = /* @__PURE__ */ ue({
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
    }, r = (p) => i[p]?.label || p.toUpperCase(), l = C(
      () => a.data?.items && a.data.items.length > 0
    ), c = C(
      () => (a.data?.items || []).reduce((p, g) => p + g.count, 0)
    ), d = C(() => {
      const p = {};
      for (const g of a.data?.items || [])
        p[g.language] = (p[g.language] || 0) + g.count;
      return Object.entries(p).map(([g, b]) => ({ language: g, count: b })).sort((g, b) => b.count - g.count);
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
              const g = p.raw || 0, b = c.value > 0 ? (g / c.value * 100).toFixed(1) : "0";
              return ` ${p.label}: ${g} (${b}%)`;
            }
          }
        }
      }
    }));
    return t({ isDark: n }), (p, g) => (m(), ae(Se, {
      class: "select-language-root h-full min-h-0",
      title: "Language Selection",
      subtitle: "Language distribution across conversations",
      collapsible: !1,
      loading: a.loading
    }, {
      default: F(() => [
        u("div", s1, [
          l.value ? (m(), _("div", i1, [
            u("section", r1, [
              j(Dn, {
                data: h.value,
                options: f.value
              }, null, 8, ["data", "options"])
            ]),
            j(_e, {
              class: "shrink-0",
              title: "Total",
              value: E(he)(c.value),
              color: "#8b5cf6"
            }, null, 8, ["value"])
          ])) : (m(), _("section", l1, [...g[0] || (g[0] = [
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
}), d1 = /* @__PURE__ */ pe(c1, [["__scopeId", "data-v-9385c088"]]), u1 = { class: "card-body" }, h1 = {
  key: 0,
  class: "guardrails-daily-section"
}, f1 = { class: "w-full min-w-0" }, g1 = { class: "font-medium" }, m1 = { class: "font-semibold" }, p1 = { class: "type-badges-row" }, b1 = { class: "guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4" }, v1 = {
  key: 1,
  class: "empty-state"
}, y1 = /* @__PURE__ */ ue({
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
    }, { isDark: i } = Me($e(n, "theme")), r = C(
      () => n.data?.items && n.data.items.length > 0
    ), l = C(
      () => (n.data?.items || []).reduce((y, v) => y + v.count, 0)
    ), c = (y) => {
      const v = {};
      for (const w of n.data?.items || [])
        v[w[y]] = (v[w[y]] || 0) + w.count;
      const x = Object.entries(v).sort((w, $) => $[1] - w[1]);
      if (x.length === 0) return { name: "—", pct: 0 };
      const k = l.value;
      return {
        name: x[0][0],
        pct: k > 0 ? Math.round(x[0][1] / k * 100) : 0
      };
    }, d = C(() => c("guardrail_type")), h = C(() => c("guardrail_action")), f = C(() => c("guardrail_source")), p = C(() => {
      const y = {};
      for (const v of n.data?.items || [])
        y[v.date] || (y[v.date] = {}), y[v.date][v.guardrail_type] = (y[v.date][v.guardrail_type] || 0) + v.count;
      return Object.entries(y).map(([v, x]) => ({
        date: v,
        total: Object.values(x).reduce((k, w) => k + w, 0),
        types: Object.entries(x).map(([k, w]) => ({ type: k, count: w })).sort((k, w) => w.count - k.count)
      })).sort((v, x) => new Date(v.date).getTime() - new Date(x.date).getTime());
    }), g = [
      { key: "date", label: "Date", align: "center" },
      { key: "count", label: "Count", align: "center" },
      { key: "types", label: "Types", align: "left" }
    ], b = C(
      () => p.value.map((y) => ({
        id: y.date,
        date: y.date,
        total: y.total,
        types: y.types
      }))
    );
    return t({ isDark: i }), (y, v) => (m(), ae(Se, {
      class: "guardrails-root h-full min-h-0",
      title: "Guardrails Metrics",
      subtitle: "Content safety guardrail events and actions",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", u1, [
          r.value ? (m(), _(ce, { key: 0 }, [
            p.value.length > 0 ? (m(), _("section", h1, [
              u("div", f1, [
                j(dt, {
                  columns: g,
                  rows: b.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-date": F(({ row: x }) => [
                    u("span", g1, A(E(ze)(String(x.date)).format("MMM DD")), 1)
                  ]),
                  "cell-count": F(({ row: x }) => [
                    u("span", m1, A(E(he)(x.total)), 1)
                  ]),
                  "cell-types": F(({ row: x }) => [
                    u("div", p1, [
                      (m(!0), _(ce, null, me(x.types, (k) => (m(), _("span", {
                        key: k.type,
                        class: "type-count-badge"
                      }, A(k.type) + " (" + A(k.count) + ") ", 1))), 128))
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            u("section", b1, [
              j(_e, {
                title: "Total Events",
                value: E(he)(l.value)
              }, null, 8, ["value"]),
              j(_e, {
                title: "Top type",
                value: d.value.name,
                subvalue: d.value.pct > 0 ? `(${d.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              j(_e, {
                title: "Top action",
                value: h.value.name,
                subvalue: h.value.pct > 0 ? `(${h.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"]),
              j(_e, {
                title: "Top source",
                value: f.value.name,
                subvalue: f.value.pct > 0 ? `(${f.value.pct}%)` : void 0
              }, null, 8, ["value", "subvalue"])
            ])
          ], 64)) : (m(), _("section", v1, [...v[0] || (v[0] = [
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
}), x1 = /* @__PURE__ */ pe(y1, [["__scopeId", "data-v-c042ede0"]]), _1 = { class: "card-body" }, k1 = { class: "chart-section" }, w1 = { class: "chart-wrapper" }, C1 = {
  key: 1,
  class: "empty-chart"
}, $1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" }, S1 = {
  key: 0,
  class: "dn-failure-section"
}, M1 = { class: "w-full min-w-0" }, D1 = { class: "failure-reason" }, A1 = { class: "failure-count" }, T1 = { class: "impact-bar-container" }, B1 = { class: "impact-label" }, L1 = { class: "dn-trend-health-block flex flex-col gap-0" }, E1 = {
  key: 0,
  class: "chart-section dn-trend-chart-section"
}, R1 = { class: "dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1" }, P1 = { class: "system-health" }, I1 = { class: "system-health-content" }, F1 = { class: "grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" }, O1 = {
  key: 1,
  class: "empty-state"
}, V1 = /* @__PURE__ */ ue({
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
    }, { isDark: i, colors: r } = Me($e(n, "theme")), l = C(() => {
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
    }), b = C(() => {
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
    ], v = C(
      () => b.value.map(($) => ({
        id: $.reason,
        reason: $.reason,
        count: $.count,
        impactPct: $.impactPct
      }))
    ), x = C(() => {
      const $ = h.value, D = d.value.processing_success, S = Math.max(0, D - d.value.totalDqErrors), R = d.value.notification_sent, P = Math.max(0, $ - D), I = d.value.totalDqErrors, M = Math.max(0, S - R), L = (W, q) => be(W, q), B = [
        { name: "Records Detected", status: "success" },
        { name: "Valid Reservations", status: "success" },
        { name: "Invalid / Unprocessed", status: "error" },
        { name: "Contactable", status: "success" },
        { name: "Data Quality Issues", status: "error" },
        { name: "Notified", status: "success" },
        { name: "Not Delivered", status: "abandon" }
      ], N = [];
      return D > 0 && N.push({
        source: "Records Detected",
        target: "Valid Reservations",
        value: D,
        label: L(D, $)
      }), P > 0 && N.push({
        source: "Records Detected",
        target: "Invalid / Unprocessed",
        value: P,
        label: L(P, $)
      }), S > 0 && N.push({
        source: "Valid Reservations",
        target: "Contactable",
        value: S,
        label: L(S, $)
      }), I > 0 && N.push({
        source: "Valid Reservations",
        target: "Data Quality Issues",
        value: I,
        label: L(I, $)
      }), R > 0 && N.push({
        source: "Contactable",
        target: "Notified",
        value: R,
        label: L(R, $)
      }), M > 0 && N.push({
        source: "Contactable",
        target: "Not Delivered",
        value: M,
        label: L(M, $)
      }), { nodes: B, links: N };
    }), k = C(() => {
      const $ = [...n.data?.processingCounts?.items || []].sort(
        (L, B) => new Date(L.date).getTime() - new Date(B.date).getTime()
      ), D = n.data?.documentCounts?.items || [], S = {};
      for (const L of D)
        S[L.date] = (S[L.date] || 0) + L.row_count_total;
      const R = [
        .../* @__PURE__ */ new Set([
          ...$.map((L) => L.date),
          ...D.map((L) => L.date)
        ])
      ].sort(), P = R.map((L) => ze(L).format("MMM DD")), I = R.map((L) => {
        const B = $.find((q) => q.date === L), N = B?.notification_sent || 0, W = S[L] || B?.processing_started || 0;
        return W > 0 ? Math.round(N / W * 100) : 0;
      }), M = R.map((L) => $.find((N) => N.date === L)?.notification_sent || 0);
      return {
        labels: P,
        datasets: [
          {
            label: "Success Rate (%)",
            data: I,
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
    return t({ isDark: i }), ($, D) => (m(), ae(Se, {
      class: "dn-metrics-root h-full min-h-0",
      title: "Disruption Notifier",
      subtitle: "Passenger notification effectiveness and delivery analysis",
      loading: e.loading,
      "lazy-mount": "",
      onOpen: D[0] || (D[0] = (S) => o("open"))
    }, {
      headerExport: F(() => [
        e.enableExport && !n.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", _1, [
          l.value ? (m(), _(ce, { key: 0 }, [
            u("section", k1, [
              D[2] || (D[2] = u("div", { class: "chart-header" }, [
                u("h4", { class: "section-title" }, "Passenger Disruption Funnel")
              ], -1)),
              u("div", w1, [
                x.value.nodes.length > 0 && x.value.links.length > 0 ? (m(), ae(Zt, {
                  key: 0,
                  data: x.value,
                  height: "350px",
                  "use-gradient": !1,
                  "node-gap": 16
                }, null, 8, ["data"])) : (m(), _("div", C1, [...D[1] || (D[1] = [
                  u("p", { class: "empty-chart-text" }, " No processing data available for visualization ", -1)
                ])]))
              ])
            ]),
            u("div", $1, [
              j(_e, {
                color: "#3b82f6",
                title: "Total Records",
                value: E(he)(c.value.row_count_total)
              }, null, 8, ["value"]),
              j(_e, {
                color: "#8b5cf6",
                title: "Passengers Affected",
                value: E(he)(h.value)
              }, null, 8, ["value"]),
              j(_e, {
                color: "#10b981",
                title: "Successfully Notified",
                value: E(he)(d.value.notification_sent),
                subvalue: p(d.value.notification_sent, h.value)
              }, null, 8, ["value", "subvalue"]),
              j(_e, {
                color: "#ef4444",
                title: "Not Notified",
                value: E(he)(f.value),
                subvalue: p(f.value, h.value)
              }, null, 8, ["value", "subvalue"]),
              j(_e, {
                color: "#f59e0b",
                title: "Main Failure Reason",
                value: g.value.reason,
                subvalue: g.value.count > 0 ? `${E(he)(g.value.count)} cases` : void 0
              }, null, 8, ["value", "subvalue"])
            ]),
            b.value.length > 0 ? (m(), _("section", S1, [
              D[3] || (D[3] = u("div", { class: "section-header" }, [
                u("h4", { class: "section-title" }, "Why Passengers Were Not Notified")
              ], -1)),
              u("div", M1, [
                j(dt, {
                  columns: y,
                  rows: v.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, {
                  "cell-reason": F(({ row: S }) => [
                    u("span", D1, A(S.reason), 1)
                  ]),
                  "cell-count": F(({ row: S }) => [
                    u("span", A1, A(E(he)(S.count)), 1)
                  ]),
                  "cell-impact": F(({ row: S }) => [
                    u("div", T1, [
                      u("div", {
                        class: "impact-bar",
                        style: Ce({ width: S.impactPct + "%" })
                      }, null, 4),
                      u("span", B1, A(S.impactPct) + "%", 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["rows"])
              ])
            ])) : V("", !0),
            u("div", L1, [
              k.value.labels.length > 0 ? (m(), _("section", E1, [
                D[4] || (D[4] = u("div", { class: "chart-header" }, [
                  u("h4", { class: "section-title" }, "Notification Success Rate by Day")
                ], -1)),
                u("div", R1, [
                  j(ht, {
                    data: k.value,
                    options: w.value,
                    theme: n.theme
                  }, null, 8, ["data", "options", "theme"])
                ])
              ])) : V("", !0),
              u("details", P1, [
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
                u("div", I1, [
                  u("div", F1, [
                    j(_e, {
                      title: "Docs Started",
                      value: E(he)(c.value.processing_started)
                    }, null, 8, ["value"]),
                    j(_e, {
                      title: "Docs Completed",
                      value: E(he)(c.value.processing_completed)
                    }, null, 8, ["value"]),
                    j(_e, {
                      title: "Docs Failed",
                      value: E(he)(c.value.processing_failed)
                    }, null, 8, ["value"]),
                    j(_e, {
                      title: "Processing Started",
                      value: E(he)(d.value.processing_started)
                    }, null, 8, ["value"]),
                    j(_e, {
                      title: "Processing Success",
                      value: E(he)(d.value.processing_success)
                    }, null, 8, ["value"]),
                    j(_e, {
                      title: "Notification Failed",
                      value: E(he)(d.value.notification_failed)
                    }, null, 8, ["value"])
                  ])
                ])
              ])
            ])
          ], 64)) : (m(), _("section", O1, [...D[6] || (D[6] = [
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
}), z1 = /* @__PURE__ */ pe(V1, [["__scopeId", "data-v-2342d485"]]), N1 = /* @__PURE__ */ ue({
  __name: "TotalConversationsCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => he(a.totalConversations)), s = C(() => E(n.value?.isDark) ?? !1), i = C(() => E(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ae(_t, {
      label: "Total Conversations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.totalConversations,
      "previous-value": e.previousTotalConversations,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), j1 = /* @__PURE__ */ ue({
  __name: "CsatP95Card",
  props: {
    csatP95: { default: 0 },
    previousCsatP95: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${a.csatP95.toFixed(1)}`), s = C(() => E(n.value?.isDark) ?? !1), i = C(() => E(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ae(_t, {
      label: "CSAT P95",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatP95,
      "previous-value": e.previousCsatP95,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), H1 = /* @__PURE__ */ ue({
  __name: "CsatPulseCard",
  props: {
    csatPulse: { default: 0 },
    previousCsatPulse: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${a.csatPulse.toFixed(1)}%`), s = C(() => E(n.value?.isDark) ?? !1), i = C(() => E(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ae(_t, {
      label: "CSAT Pulse",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.csatPulse,
      "previous-value": e.previousCsatPulse,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
}), W1 = {
  key: 0,
  class: "card-body"
}, K1 = { class: "chart-wrapper" }, Y1 = { class: "overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4" }, U1 = {
  key: 1,
  class: "empty-state"
}, q1 = 520, X1 = 300, G1 = 40, Z1 = 48, Q1 = 48, J1 = {
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
    }, s = e, { isDark: i } = Me($e(s, "theme")), r = C(() => s.data);
    return t({ isDark: i }), (l, c) => (m(), ae(Se, {
      class: "nps-overview-root min-h-0",
      title: "CSAT Overview Metrics",
      subtitle: "Overall CSAT Distribution",
      collapsible: !1,
      loading: s.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !s.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: o,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        r.value && r.value.total_nps_responses > 0 ? (m(), _("div", W1, [
          u("div", K1, [
            j(ir, {
              histogram: r.value.histogram || [],
              "min-score": r.value.min_score || 0,
              "max-score": r.value.max_score || 0,
              "q1-score": r.value.q1_score || 0,
              "median-score": r.value.median_score || 0,
              "q3-score": r.value.q3_score || 0,
              "average-score": r.value.average_score || 0,
              "chart-width": q1,
              "chart-height": X1,
              "chart-margin": G1,
              "chart-margin-right": Z1,
              "chart-bottom-margin": Q1,
              "plot-inset": 10,
              "show-legend": !1,
              "show-stat-labels": !1
            }, null, 8, ["histogram", "min-score", "max-score", "q1-score", "median-score", "q3-score", "average-score"])
          ]),
          u("div", Y1, [
            j(_e, {
              class: "min-w-0 flex-1",
              title: "Responses",
              value: String(r.value.total_nps_responses)
            }, null, 8, ["value"]),
            r.value.p95_score > 0 ? (m(), ae(_e, {
              key: 0,
              class: "min-w-0 flex-1",
              title: "Percentile 95",
              value: String(r.value.p95_score)
            }, null, 8, ["value"])) : V("", !0)
          ])
        ])) : (m(), _("div", U1, [...c[0] || (c[0] = [
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
}, pr = /* @__PURE__ */ pe(J1, [["__scopeId", "data-v-e98fe9b2"]]), ex = {
  key: 0,
  class: "card-body"
}, tx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, ax = {
  key: 1,
  class: "empty-state"
}, nx = {
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
    return (c, d) => (m(), ae(Se, {
      class: "nps-daily-root min-h-0",
      title: "CSAT P95",
      subtitle: "Daily P95 trend for CSAT responses",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: n,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        i.value ? (m(), _("div", ex, [
          u("div", tx, [
            j(ht, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), _("div", ax, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No daily CSAT P95 available", -1),
          u("p", { class: "empty-description" }, " No CSAT P95 points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}, br = /* @__PURE__ */ pe(nx, [["__scopeId", "data-v-5207cfa7"]]), ox = {
  key: 0,
  class: "card-body"
}, sx = {
  key: 1,
  class: "empty-state"
}, ix = /* @__PURE__ */ ue({
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
    return (i, r) => (m(), ae(Se, {
      class: "nps-resolution-root min-h-0",
      title: "CSAT Resolution",
      subtitle: "Resolution answers distribution (1=Si, 2=No)",
      collapsible: !1,
      loading: t.loading
    }, {
      default: F(() => [
        n.value ? (m(), _("div", ox, [
          j(kt, {
            data: o.value,
            options: s,
            "uppercase-legend-labels": !0
          }, null, 8, ["data"])
        ])) : (m(), _("div", sx, [...r[0] || (r[0] = [
          u("p", { class: "empty-title" }, "No resolution answers available", -1),
          u("p", { class: "empty-description" }, " This airline has the resolution survey configured, but no responses were found for the selected dates. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), rx = /* @__PURE__ */ pe(ix, [["__scopeId", "data-v-6849ef24"]]), lx = {
  key: 0,
  class: "card-body"
}, cx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, dx = {
  key: 1,
  class: "empty-state"
}, ux = /* @__PURE__ */ ue({
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
    return (c, d) => (m(), ae(Se, {
      class: "nps-pulse-root min-h-0",
      title: "CSAT Pulse",
      subtitle: "Weighted index: Σ(frequency × weight) / total surveys × 100",
      collapsible: !1,
      loading: o.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !o.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: n
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        i.value ? (m(), _("div", lx, [
          u("div", cx, [
            j(ht, {
              data: r.value,
              options: l,
              "uppercase-legend-labels": !0
            }, null, 8, ["data"])
          ])
        ])) : (m(), _("div", dx, [...d[0] || (d[0] = [
          u("p", { class: "empty-title" }, "No CSAT Pulse data available", -1),
          u("p", { class: "empty-description" }, " No CSAT pulse points were found for the selected date range. ", -1)
        ])]))
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), hx = /* @__PURE__ */ pe(ux, [["__scopeId", "data-v-72955d9a"]]), fx = { class: "nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, gx = { class: "grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2" }, vr = {
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
    return (d, h) => (m(), _("div", fx, [
      u("div", gx, [
        j(pr, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"]),
        j(br, {
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])
      ]),
      l.value ? (m(), _("div", {
        key: 0,
        class: J(["grid w-full items-start gap-6", c.value])
      }, [
        s.value ? (m(), ae(rx, {
          key: 0,
          class: "min-w-0",
          data: e.data,
          loading: e.loading
        }, null, 8, ["data", "loading"])) : V("", !0),
        i.value ? (m(), ae(hx, {
          key: 1,
          class: "min-w-0",
          data: e.data,
          loading: e.loading,
          "enable-export": e.enableExport,
          onExport: n
        }, null, 8, ["data", "loading", "enable-export"])) : V("", !0)
      ], 2)) : V("", !0)
    ]));
  }
}, mx = { class: "csat-container__body" }, px = /* @__PURE__ */ ue({
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
    return (o, s) => (m(), ae(Se, {
      class: "csat-container-root w-full",
      title: "CSAT",
      subtitle: "Customer satisfaction score distribution and daily trend metrics.",
      "default-open": e.containerInitiallyOpen,
      loading: e.loading,
      "lazy-mount": "",
      onOpen: s[0] || (s[0] = (i) => a("open"))
    }, {
      default: F(() => [
        u("div", mx, [
          j(vr, {
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
}), bx = /* @__PURE__ */ pe(px, [["__scopeId", "data-v-37178ba1"]]), vx = /* @__PURE__ */ ue({
  __name: "AiGeneratedRevenueCard",
  props: {
    totalRevenue: { default: 0 },
    previousTotalRevenue: { default: null },
    currencyCode: { default: "USD" },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => Ft(a.totalRevenue)), s = C(() => E(n.value?.isDark) ?? !1), i = C(() => E(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ae(_t, {
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
      icon: F(() => [...l[0] || (l[0] = [
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
}), yx = { class: "flex items-center gap-2 justify-end flex-wrap" }, xx = {
  key: "loading",
  class: "bm-status shrink-0",
  "aria-busy": "true",
  "aria-label": "Loading chart"
}, _x = {
  key: "content",
  class: "w-full shrink-0 flex min-h-0 flex-col"
}, kx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, wx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Cx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, $x = /* @__PURE__ */ ue({
  __name: "AiGeneratedChart",
  props: {
    loading: { type: Boolean, default: !1 },
    data: { default: null },
    breakdownBy: { default: "all" },
    theme: { default: void 0 }
  },
  emits: ["changeBreakdown"],
  setup(e, { expose: t, emit: a }) {
    const n = e, o = a, s = $e(n, "theme"), { isDark: i, colors: r } = Me(s), l = se(n.breakdownBy), c = C(() => n.data?.currency ?? "USD"), d = C(() => l.value === "payment_method"), h = [
      "#a78bfa",
      "#34d399",
      "#f59e0b",
      "#60a5fa",
      "#f472b6",
      "#fb923c",
      "#4ade80",
      "#e879f9"
    ], f = (P) => h[P % h.length], p = (P) => {
      if (!P) return "0";
      const I = Math.abs(P);
      return I >= 1e6 ? (P / 1e6).toFixed(2) + "M" : I >= 1e5 ? (P / 1e3).toFixed(1) + "K" : Math.round(P).toLocaleString();
    }, g = (P) => !P || P === "unknown" ? "Unknown" : P.split(/[_|]/).map((I) => I ? I.charAt(0).toUpperCase() + I.slice(1) : "").join(" "), b = se({
      labels: [],
      datasets: []
    }), y = se([]), v = C(() => {
      const P = Math.min(y.value.length, 5);
      if (!(P <= 0))
        return { gridTemplateColumns: `repeat(${P}, minmax(0, 1fr))` };
    }), x = (P) => {
      const I = P?.ai_revenue_by_day ?? [], M = P?.breakdown ?? [];
      if (!I.length) {
        b.value = { labels: [], datasets: [] }, y.value = [];
        return;
      }
      const L = [...I].sort((ee, X) => ee.date.localeCompare(X.date)), B = L.map((ee) => ze(ee.date).format("MMM DD")), N = "ai_revenue";
      if (l.value === "all") {
        b.value = {
          labels: B,
          datasets: [
            {
              label: `Revenue (${c.value})`,
              data: L.map((ee) => Number(ee[N] ?? 0)),
              borderColor: h[0],
              backgroundColor: "rgba(167,139,250,0.08)",
              fill: !1,
              tension: 0.35,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: "#ffffff",
              pointBorderColor: h[0],
              pointBorderWidth: 2
            }
          ]
        }, y.value = [];
        return;
      }
      const q = M.slice(0, 7).map((ee) => ee.key).map((ee, X) => {
        const le = f(X), U = L.map((T) => {
          const z = (T.breakdown ?? {})[ee];
          return z ? Number(z[N] ?? 0) : 0;
        });
        return d.value ? {
          label: g(ee),
          data: U,
          backgroundColor: le,
          borderColor: le,
          borderWidth: 1,
          borderRadius: 3
        } : {
          label: g(ee),
          data: U,
          borderColor: le,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: le,
          pointBorderWidth: 2
        };
      });
      b.value = { labels: B, datasets: q }, y.value = M.slice(0, 5).map((ee, X) => ({
        key: ee.key,
        label: g(ee.key),
        amount: `${c.value} ${p(ee.total)}`,
        percentage: Number(ee.percentage ?? 0),
        color: f(X)
      }));
    }, k = C(() => ({
      callback: (P) => `${c.value} ${p(Number(P))}`,
      color: r.value.textSecondary,
      padding: 8
    })), w = C(() => ({
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: { color: r.value.textSecondary, padding: 8 }
    })), $ = C(() => ({
      beginAtZero: !0,
      border: { display: !1 },
      grid: { color: r.value.gridLines, lineWidth: 1, drawTicks: !1 },
      ticks: k.value
    })), D = C(() => ({
      scales: {
        x: w.value,
        y: $.value
      }
    })), S = C(() => ({
      scales: {
        x: { ...w.value, stacked: !0 },
        y: { ...$.value, stacked: !0 }
      }
    }));
    Ee(
      () => n.data,
      (P) => x(P ?? null),
      { deep: !0, immediate: !0 }
    ), Ee(
      () => n.breakdownBy,
      (P) => {
        l.value = P, x(n.data ?? null);
      }
    );
    const R = () => {
      o("changeBreakdown", l.value);
    };
    return t({ isDark: i }), (P, I) => (m(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "AI Generated Revenue",
      subtitle: "Revenue generated by AI agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerAside: F(() => [
        u("div", yx, [
          Ge(u("select", {
            "onUpdate:modelValue": I[0] || (I[0] = (M) => l.value = M),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: R
          }, [...I[1] || (I[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "payment_method" }, "Payment Method", -1),
            u("option", { value: "agent_type" }, "Agent Type", -1),
            u("option", { value: "channel" }, "Channel", -1),
            u("option", { value: "channel_and_agent" }, "Channel & Agent", -1)
          ])], 544), [
            [di, l.value]
          ])
        ])
      ]),
      default: F(() => [
        u("div", {
          class: J(["flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]", n.loading ? "flex-1" : "w-full shrink-0"])
        }, [
          j(ut, {
            name: "bm-fade",
            mode: "out-in"
          }, {
            default: F(() => [
              n.loading ? (m(), _("div", xx, [...I[2] || (I[2] = [
                u("div", {
                  class: "flex-1 bm-skeleton-blink",
                  "aria-hidden": "true"
                }, null, -1)
              ])])) : (m(), _("div", _x, [
                b.value.labels && b.value.labels.length && b.value.datasets.length ? (m(), _("section", kx, [
                  u("div", wx, [
                    d.value ? (m(), ae(kt, {
                      key: 0,
                      data: b.value,
                      options: S.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"])) : (m(), ae(ht, {
                      key: 1,
                      data: b.value,
                      options: D.value,
                      theme: s.value
                    }, null, 8, ["data", "options", "theme"]))
                  ]),
                  y.value.length ? (m(), _("div", {
                    key: 0,
                    class: "grid w-full gap-3 md:gap-4",
                    style: Ce(v.value)
                  }, [
                    (m(!0), _(ce, null, me(y.value, (M) => (m(), ae(_e, {
                      key: `card-${M.key}`,
                      class: "min-w-0",
                      color: M.color,
                      title: M.label,
                      value: M.amount,
                      subvalue: `${M.percentage.toFixed(1)}%`
                    }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
                  ], 4)) : V("", !0)
                ])) : (m(), _("section", Cx, [...I[3] || (I[3] = [
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
}), Sx = /* @__PURE__ */ pe($x, [["__scopeId", "data-v-d19e1ba6"]]), ni = 1, Mx = /* @__PURE__ */ ue({
  __name: "CostCard",
  props: {
    totalConversations: { default: 0 },
    previousTotalConversations: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), { isDark: o } = Me($e(a, "theme")), s = C(() => a.totalConversations * ni), i = C(() => a.previousTotalConversations === null || a.previousTotalConversations === void 0 ? null : a.previousTotalConversations * ni), r = C(() => he(s.value)), l = C(
      () => i.value !== null && i.value !== void 0
    ), c = C(() => {
      if (!l.value) return 0;
      const f = i.value;
      return f === 0 ? s.value > 0 ? 100 : 0 : (s.value - f) / f * 100;
    }), d = C(() => {
      const f = c.value.toFixed(1);
      return c.value > 0 ? `+${f}%` : `${f}%`;
    }), h = C(() => c.value < 0 ? "change-badge--up" : c.value > 0 ? "change-badge--down" : "change-badge--neutral");
    return t({ isDark: o, changePercent: c }), (f, p) => (m(), ae(_t, {
      label: "Cost",
      value: r.value,
      prefix: "USD",
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...p[0] || (p[0] = [
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
      headerAside: F(() => [
        l.value ? (m(), _("div", {
          key: 0,
          class: J(["change-badge", h.value, { "change-badge--dark": E(o) }])
        }, A(d.value), 3)) : V("", !0)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), Dx = /* @__PURE__ */ pe(Mx, [["__scopeId", "data-v-411e0735"]]), Ax = { class: "flex justify-end" }, Tx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, Lx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Ex = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Rx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Px = /* @__PURE__ */ ue({
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
    }, i = $e(n, "theme"), { isDark: r } = Me(i), l = se(n.breakdownBy), c = C(() => n.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: []
    }), d = se({
      labels: [],
      datasets: []
    }), h = se([]), f = C(() => {
      const w = h.value.length;
      if (!(w <= 0))
        return { gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))` };
    }), p = se(
      []
    ), g = [
      "#3b82f6",
      "#f59e0b",
      "#06b6d4",
      "#8b5cf6",
      "#22c55e",
      "#ef4444",
      "#14b8a6"
    ], b = (w) => g[w % g.length], y = {
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
    }, v = () => {
      o("changeBreakdown", l.value);
    }, x = (w) => {
      if (!w) return "";
      const D = w.replace(/_/g, " ").trim().replace(/\s+state$/i, "").trim();
      return D ? D.charAt(0).toUpperCase() + D.slice(1) : "";
    }, k = (w) => {
      if (l.value === "all") {
        const M = w?.escalations_by_day ?? [];
        if (!M.length) {
          d.value = { labels: [], datasets: [] }, h.value = [], p.value = [];
          return;
        }
        const L = [...M].sort((B, N) => B.date.localeCompare(N.date));
        d.value = {
          labels: L.map((B) => ze(B.date).format("MMM DD")),
          datasets: [
            {
              label: "All",
              data: L.map(
                (B) => Number(B.escalation_rate_percentage || 0)
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
        (M, L) => M.date.localeCompare(L.date)
      ), R = D.slice(0, 5).map((M) => M.key), P = S.map((M) => ze(M.date).format("MMM DD")), I = R.map((M, L) => {
        const B = D.find((N) => N.key === M);
        return {
          label: x(B?.label || M),
          data: S.map((N) => {
            const W = N.items.find((q) => q.key === M);
            return Number(W?.percentage || 0);
          }),
          borderColor: b(L),
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35
        };
      });
      d.value = {
        labels: P,
        datasets: I
      }, h.value = D.slice(0, 5).map((M, L) => ({
        key: M.key,
        label: x(M.label),
        percentage: Number(M.percentage || 0),
        color: b(L)
      })), p.value = D.slice(0, 5).map((M, L) => ({
        key: M.key,
        label: x(M.label),
        color: b(L)
      }));
    };
    return Ee(
      () => n.data,
      (w) => {
        k(w ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ee(
      () => n.breakdownBy,
      (w) => {
        l.value = w, k(c.value);
      }
    ), t({ isDark: r }), (w, $) => (m(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "Human escalations",
      subtitle: "% of conversations transferred to human agents",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      headerAside: F(() => [
        u("div", Ax, [
          Ge(u("select", {
            "onUpdate:modelValue": $[0] || ($[0] = (D) => l.value = D),
            class: "rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]",
            onChange: v
          }, [...$[1] || ($[1] = [
            u("option", { value: "all" }, "All", -1),
            u("option", { value: "agent" }, "By Agent", -1)
          ])], 544), [
            [di, l.value]
          ])
        ])
      ]),
      default: F(() => [
        u("div", Tx, [
          u("div", Bx, [
            d.value.labels && d.value.labels.length && d.value.datasets.length ? (m(), _("section", Lx, [
              u("div", Ex, [
                j(ht, {
                  data: d.value,
                  options: y,
                  theme: i.value
                }, null, 8, ["data", "theme"])
              ]),
              h.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(f.value)
              }, [
                (m(!0), _(ce, null, me(h.value, (D) => (m(), ae(_e, {
                  key: `card-${D.key}`,
                  class: "min-w-0",
                  color: D.color,
                  title: D.label,
                  value: `${D.percentage.toFixed(1)}%`
                }, null, 8, ["color", "title", "value"]))), 128))
              ], 4)) : V("", !0)
            ])) : (m(), _("section", Rx, [...$[2] || ($[2] = [
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
}), Ix = /* @__PURE__ */ pe(Px, [["__scopeId", "data-v-b18e0ebd"]]), Fx = /* @__PURE__ */ ue({
  __name: "HumanEscalationsCard",
  props: {
    escalationRatePercentage: { default: 0 },
    previousEscalationRatePercentage: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), o = C(() => `${Number(a.escalationRatePercentage || 0).toFixed(2)}%`), s = C(() => E(n.value?.isDark) ?? !1), i = C(() => E(n.value?.changePercent) ?? 0);
    return t({ isDark: s, changePercent: i }), (r, l) => (m(), ae(_t, {
      label: "Human Escalations",
      value: o.value,
      loading: e.loading,
      theme: e.theme,
      "current-value": e.escalationRatePercentage,
      "previous-value": e.previousEscalationRatePercentage,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
function no(e) {
  if (e == null || Number.isNaN(e)) return "-";
  const t = Math.max(0, Math.round(e)), a = Math.floor(t / 3600), n = Math.floor(t % 3600 / 60), o = t % 60;
  return a > 0 ? `${a}h ${n}m` : n > 0 ? `${n}m ${o}s` : `${o}s`;
}
const Ox = { class: "flex justify-end" }, Vx = { class: "w-52" }, zx = { class: "flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Nx = { class: "w-full shrink-0 flex min-h-0 flex-col" }, jx = {
  key: 0,
  class: "flex w-full shrink-0 flex-col gap-4 sm:gap-6"
}, Hx = { class: "chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden" }, Wx = {
  key: 1,
  class: "flex min-h-[280px] flex-1 items-center justify-center"
}, Kx = "#8b5cf6", Yx = "#9ca3af", Ux = "#94a3b8", qx = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (X) => {
      o("export", X);
    }, i = [
      { value: "all", label: "All" },
      { value: "resolution_mode", label: "By Resolution Mode" },
      { value: "channel", label: "By Channel" },
      { value: "agent", label: "By Agent" },
      { value: "agent_channel", label: "By Agent & Channel" }
    ], r = $e(n, "theme"), { isDark: l } = Me(r), c = se(n.breakdownBy), d = (X) => {
      c.value = String(X), o("changeBreakdown", c.value);
    }, h = [
      { key: "ai_agent", label: "AI Agent", color: "#8b5cf6" },
      { key: "human", label: "Human", color: "#f59e0b" },
      { key: "hybrid", label: "AI + Human", color: "#06b6d4" }
    ], f = {
      wsp: "#25D366",
      whatsapp: "#25D366",
      voice: "#8b5cf6",
      sms: "#f59e0b",
      web_chat: "#06b6d4",
      email: "#ec4899",
      messenger: "#0084ff",
      telegram: "#0088cc",
      instagram: "#E4405F"
    }, p = (X) => f[X.toLowerCase()] || Yx, g = {
      checkin: "#3B82F6",
      faq: "#EF4444",
      disruption_manager: "#F59E0B",
      booking_manager: "#a78bfa",
      triage: "#10B981",
      seller: "#06B6D4",
      human: "#F472B6",
      agency: "#6366F1",
      loyalty: "#EAB308"
    }, b = (X) => g[X.toLowerCase()] || Ux, y = (X) => {
      const [le] = X.split("|").map((U) => U.trim());
      return b(le || X);
    }, v = (X) => {
      if (!X) return "Unknown";
      const le = X.replace(/_/g, " ").trim();
      return le ? le.charAt(0).toUpperCase() + le.slice(1) : "Unknown";
    }, x = C(() => n.data ?? {
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
    }), k = se({
      labels: [],
      datasets: []
    }), w = C(() => {
      const X = x.value, le = {
        ai_agent: X.ai_agent_total_conversations,
        human: X.human_total_conversations,
        hybrid: X.hybrid_total_conversations
      }, U = {
        ai_agent: X.ai_agent_avg_resolution_time_formatted,
        human: X.human_avg_resolution_time_formatted,
        hybrid: X.hybrid_avg_resolution_time_formatted
      };
      return h.map((T) => ({
        key: T.key,
        label: T.label,
        color: T.color,
        formattedValue: U[T.key] || "-",
        subvalue: `${le[T.key] || 0} conversations`
      }));
    }), $ = (X, le) => X.map((U) => ({
      key: U.key,
      label: v(U.label),
      color: le(U.key),
      formattedValue: U.avg_resolution_time_formatted || "-",
      subvalue: `${U.total_conversations} conversations (${U.percentage.toFixed(1)}%)`
    })), D = C(
      () => $(x.value.channel_breakdown_items ?? [], p)
    ), S = C(
      () => $(x.value.agent_breakdown_items ?? [], b)
    ), R = C(
      () => $(
        x.value.agent_channel_breakdown_items ?? [],
        y
      )
    ), P = C(() => {
      switch (c.value) {
        case "channel":
          return D.value;
        case "agent":
          return S.value;
        case "agent_channel":
          return R.value;
        case "resolution_mode":
          return w.value;
        default:
          return [];
      }
    }), I = C(() => {
      const X = P.value.length;
      if (!(X <= 0))
        return { gridTemplateColumns: `repeat(${X}, minmax(0, 1fr))` };
    }), M = (X) => X == null ? null : Number((X / 60).toFixed(2)), L = se([]), B = (X) => {
      const le = X?.overall_resolution_time_by_day ?? {}, U = Object.keys(le).sort((T, z) => T.localeCompare(z));
      if (!U.length) {
        k.value = { labels: [], datasets: [] }, L.value = [];
        return;
      }
      L.value = [U.map((T) => le[T] ?? null)], k.value = {
        labels: U.map((T) => ze(T).format("MMM DD")),
        datasets: [
          {
            label: "All",
            data: L.value[0].map((T) => M(T)),
            borderColor: Kx,
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          }
        ]
      };
    }, N = (X) => {
      const le = X?.resolution_time_by_day ?? {}, U = Object.keys(le).sort((T, z) => T.localeCompare(z));
      if (!U.length) {
        k.value = { labels: [], datasets: [] }, L.value = [];
        return;
      }
      L.value = h.map(
        (T) => U.map((z) => le[z]?.[T.key] ?? null)
      ), k.value = {
        labels: U.map((T) => ze(T).format("MMM DD")),
        datasets: h.map((T, z) => ({
          label: T.label,
          data: L.value[z].map((K) => M(K)),
          borderColor: T.color,
          backgroundColor: "transparent",
          fill: !1,
          tension: 0.35,
          spanGaps: !0
        }))
      };
    }, W = (X, le, U) => {
      const T = Object.keys(X).sort((K, de) => K.localeCompare(de));
      if (!T.length || !le.length) {
        k.value = { labels: [], datasets: [] }, L.value = [];
        return;
      }
      const z = le.map((K) => K.key);
      L.value = z.map((K) => T.map((de) => X[de]?.[K] ?? null)), k.value = {
        labels: T.map((K) => ze(K).format("MMM DD")),
        datasets: z.map((K, de) => {
          const ve = le.find((Q) => Q.key === K);
          return {
            label: v(ve?.label || K),
            data: L.value[de].map((Q) => M(Q)),
            borderColor: U(K),
            backgroundColor: "transparent",
            fill: !1,
            tension: 0.35,
            spanGaps: !0
          };
        })
      };
    }, q = (X) => {
      switch (c.value) {
        case "channel":
          W(
            X?.channel_resolution_time_by_day ?? {},
            X?.channel_breakdown_items ?? [],
            p
          );
          return;
        case "agent":
          W(
            X?.agent_resolution_time_by_day ?? {},
            X?.agent_breakdown_items ?? [],
            b
          );
          return;
        case "agent_channel":
          W(
            X?.agent_channel_resolution_time_by_day ?? {},
            X?.agent_channel_breakdown_items ?? [],
            y
          );
          return;
        case "resolution_mode":
          N(X);
          return;
        default:
          B(X);
      }
    }, ee = C(() => ({
      scales: {
        y: {
          min: 0,
          ticks: {
            callback: (X) => `${X}m`
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (X) => {
              const le = X.dataset.label || "", U = L.value[X.datasetIndex]?.[X.dataIndex];
              return U == null ? `${le}: -` : `${le}: ${no(U)}`;
            }
          }
        }
      }
    }));
    return Ee(
      () => n.data,
      (X) => {
        q(X ?? null);
      },
      { deep: !0, immediate: !0 }
    ), Ee(
      () => n.breakdownBy,
      (X) => {
        c.value = X, q(n.data ?? null);
      }
    ), t({ isDark: l }), (X, le) => (m(), ae(Se, {
      class: "w-full min-h-0 self-start",
      title: "Average resolution time",
      subtitle: "How long conversations take to resolve",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          loading: e.exportLoading,
          onExport: s
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      headerAside: F(() => [
        u("div", Ox, [
          u("div", Vx, [
            j(An, {
              "model-value": c.value,
              options: i,
              "onUpdate:modelValue": d
            }, null, 8, ["model-value"])
          ])
        ])
      ]),
      default: F(() => [
        u("div", zx, [
          u("div", Nx, [
            k.value.labels.length && k.value.datasets.length ? (m(), _("section", jx, [
              u("div", Hx, [
                j(ht, {
                  data: k.value,
                  options: ee.value,
                  theme: r.value
                }, null, 8, ["data", "options", "theme"])
              ]),
              P.value.length ? (m(), _("div", {
                key: 0,
                class: "grid w-full gap-3 md:gap-4",
                style: Ce(I.value)
              }, [
                (m(!0), _(ce, null, me(P.value, (U) => (m(), ae(_e, {
                  key: `card-${U.key}`,
                  class: "min-w-0",
                  color: U.color,
                  title: U.label,
                  value: U.formattedValue,
                  subvalue: U.subvalue
                }, null, 8, ["color", "title", "value", "subvalue"]))), 128))
              ], 4)) : V("", !0)
            ])) : (m(), _("section", Wx, [...le[0] || (le[0] = [
              u("div", { class: "max-w-[360px] px-4 text-center" }, [
                u("p", { class: "mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]" }, " No resolution time data available "),
                u("p", { class: "m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]" }, " No conversations found for the selected period. Try adjusting the date range. ")
              ], -1)
            ])]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), Xx = /* @__PURE__ */ pe(qx, [["__scopeId", "data-v-8c2008bc"]]), Gx = { class: "art-values__item" }, Zx = { class: "art-values__number" }, Qx = { class: "art-values__item" }, Jx = { class: "art-values__number" }, e_ = /* @__PURE__ */ ue({
  __name: "AvgResolutionTimeCard",
  props: {
    aiAgentAvgResolutionTimeSeconds: { default: null },
    humanAvgResolutionTimeSeconds: { default: null },
    loading: { type: Boolean, default: !1 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, n = se(null), { isDark: o } = Me($e(a, "theme")), s = C(() => no(a.aiAgentAvgResolutionTimeSeconds)), i = C(() => no(a.humanAvgResolutionTimeSeconds));
    return t({ isDark: o }), (r, l) => (m(), ae(_t, {
      label: "Average Resolution Time",
      value: s.value,
      loading: e.loading,
      theme: e.theme,
      ref_key: "cardMetricRef",
      ref: n
    }, {
      icon: F(() => [...l[0] || (l[0] = [
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
      value: F(() => [
        u("div", {
          class: J(["art-values", { "art-values--dark": E(o) }])
        }, [
          u("div", Gx, [
            u("span", Zx, A(s.value), 1),
            l[1] || (l[1] = u("span", { class: "art-values__label" }, "AI Agent", -1))
          ]),
          l[3] || (l[3] = u("div", {
            class: "art-values__divider",
            "aria-hidden": "true"
          }, null, -1)),
          u("div", Qx, [
            u("span", Jx, A(i.value), 1),
            l[2] || (l[2] = u("span", { class: "art-values__label" }, "Human", -1))
          ])
        ], 2)
      ]),
      _: 1
    }, 8, ["value", "loading", "theme"]));
  }
}), t_ = /* @__PURE__ */ pe(e_, [["__scopeId", "data-v-80ecbf03"]]), a_ = { class: "flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, n_ = {
  key: 0,
  class: "flex w-full shrink-0 flex-col min-h-0"
}, o_ = { class: "flex h-[230px] max-h-[230px] w-full shrink-0 flex-col min-h-0 mb-4" }, s_ = { class: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2" }, i_ = {
  key: 1,
  class: "flex min-h-[280px] w-full items-center justify-center"
}, r_ = { class: "max-w-[360px] text-center" }, l_ = { class: "mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]" }, c_ = {
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
    return (r, l) => (m(), ae(Se, {
      title: o.value.airline_name || "AWS Cost",
      subtitle: "AWS vs Allocated costs over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", a_, [
          o.value.daily.length > 0 ? (m(), _("div", n_, [
            u("div", o_, [
              j(ht, {
                class: "h-full min-h-0 w-full",
                data: s.value,
                options: i.value
              }, null, 8, ["data", "options"])
            ]),
            u("div", s_, [
              j(_e, {
                color: E(n).primaryLight,
                title: "Total Allocated",
                value: E(Be)(o.value.total_allocated_cost)
              }, null, 8, ["color", "value"]),
              j(_e, {
                color: "#FF9900",
                title: "Total AWS",
                value: E(Be)(o.value.total_cost)
              }, null, 8, ["value"])
            ])
          ])) : (m(), _("section", i_, [
            u("div", r_, [
              u("div", l_, [
                j(E(nt), { class: "h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" })
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
}, d_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, u_ = { class: "card-body" }, h_ = {
  key: 0,
  class: "chart-section"
}, f_ = { class: "chart-container" }, g_ = { class: "mt-auto grid grid-cols-2 gap-3 sm:grid-cols-3 max-[768px]:gap-2" }, m_ = {
  key: 1,
  class: "empty-state"
}, p_ = { class: "empty-state-content" }, b_ = { class: "empty-icon-wrapper" }, Da = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", oi = 10, v_ = /* @__PURE__ */ ue({
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
    const n = e, { isDark: o, colors: s } = Me($e(n, "theme")), i = (g) => {
      const b = new Date(g), y = String(b.getDate()).padStart(2, "0"), v = String(b.getMonth() + 1).padStart(2, "0");
      return `${y}-${v}`;
    }, r = {
      input: "#a78bfa",
      output: "#f59e0b",
      cache_read: "#10b981",
      cache_write: "#ef4444"
    }, l = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((b, y) => b + (y.input_cost || 0), 0);
    }), c = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((b, y) => b + (y.output_cost || 0), 0);
    }), d = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((b, y) => b + (y.cache_read_cost || 0), 0);
    }), h = C(() => {
      const g = n.data?.costs_by_day || {};
      return Object.values(g).reduce((b, y) => b + (y.cache_write_cost || 0), 0);
    }), f = C(() => {
      const g = n.data?.costs_by_day || {}, b = Object.keys(g).sort();
      if (b.length === 0)
        return { labels: [], datasets: [] };
      const y = b.map((x) => i(x)), v = [
        {
          label: "Input Cost",
          data: b.map((x) => g[x]?.input_cost || 0),
          backgroundColor: `${r.input}80`,
          borderColor: r.input,
          borderWidth: 1
        },
        {
          label: "Output Cost",
          data: b.map((x) => g[x]?.output_cost || 0),
          backgroundColor: `${r.output}80`,
          borderColor: r.output,
          borderWidth: 1
        },
        {
          label: "Cache Read Cost",
          data: b.map((x) => g[x]?.cache_read_cost || 0),
          backgroundColor: `${r.cache_read}80`,
          borderColor: r.cache_read,
          borderWidth: 1
        },
        {
          label: "Cache Write Cost",
          data: b.map((x) => g[x]?.cache_write_cost || 0),
          backgroundColor: `${r.cache_write}80`,
          borderColor: r.cache_write,
          borderWidth: 1
        }
      ];
      return {
        labels: y,
        datasets: v
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
              let b = g.dataset.label || "";
              return b && (b += ": "), g.parsed.y !== null && (b += Be(g.parsed.y)), b;
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
    return t({ isDark: o }), (g, b) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Cost Usage",
      subtitle: "Cost breakdown over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", d_, [
          u("div", u_, [
            f.value.labels && f.value.labels.length ? (m(), _("section", h_, [
              u("div", f_, [
                j(kt, {
                  data: f.value,
                  options: p.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", g_, [
                j(_e, {
                  title: "Total Cost",
                  value: E(Be)(e.data.total_cost)
                }, null, 8, ["value"]),
                j(_e, {
                  title: "Input Cost",
                  value: E(Be)(l.value),
                  color: r.input
                }, null, 8, ["value", "color"]),
                j(_e, {
                  title: "Output Cost",
                  value: E(Be)(c.value),
                  color: r.output
                }, null, 8, ["value", "color"]),
                j(_e, {
                  title: "Cache Read",
                  value: E(Be)(d.value),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                j(_e, {
                  title: "Cache Write",
                  value: E(Be)(h.value),
                  color: r.cache_write
                }, null, 8, ["value", "color"]),
                j(_e, {
                  title: "Avg / Conv.",
                  value: E(Be)(e.data.avg_cost_per_conversation)
                }, null, 8, ["value"])
              ])
            ])) : (m(), _("section", m_, [
              u("div", p_, [
                u("div", b_, [
                  j(E(nt), { class: "empty-icon" })
                ]),
                b[0] || (b[0] = u("p", { class: "empty-title" }, "No cost usage data", -1)),
                b[1] || (b[1] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see cost breakdown trends.", -1))
              ])
            ]))
          ])
        ])
      ]),
      _: 1
    }, 8, ["loading"]));
  }
}), y_ = /* @__PURE__ */ pe(v_, [["__scopeId", "data-v-e1c4a95b"]]), x_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, __ = { class: "card-body" }, k_ = {
  key: 0,
  class: "chart-section"
}, w_ = { class: "chart-container" }, C_ = { class: "mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3" }, $_ = {
  key: 1,
  class: "empty-state"
}, S_ = { class: "empty-state-content" }, M_ = { class: "empty-icon-wrapper" }, Aa = "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", si = 10, D_ = /* @__PURE__ */ ue({
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
            boxWidth: si,
            boxHeight: si,
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
    return t({ isDark: o }), (d, h) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Token Usage",
      subtitle: "Token consumption over time (stacked)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", x_, [
          u("div", __, [
            l.value.labels && l.value.labels.length ? (m(), _("section", k_, [
              u("div", w_, [
                j(kt, {
                  data: l.value,
                  options: c.value,
                  stacked: !0
                }, null, 8, ["data", "options"])
              ]),
              u("footer", C_, [
                j(_e, {
                  class: "min-w-0 flex-1",
                  title: "Total Tokens",
                  value: E(he)(e.data.total_tokens)
                }, null, 8, ["value"]),
                j(_e, {
                  class: "min-w-0 flex-1",
                  title: "Input",
                  value: E(he)(e.data.total_input_tokens),
                  color: r.input
                }, null, 8, ["value", "color"]),
                j(_e, {
                  class: "min-w-0 flex-1",
                  title: "Output",
                  value: E(he)(e.data.total_output_tokens),
                  color: r.output
                }, null, 8, ["value", "color"]),
                j(_e, {
                  class: "min-w-0 flex-1",
                  title: "Cache Read",
                  value: E(he)(e.data.total_cache_read_tokens),
                  color: r.cache_read
                }, null, 8, ["value", "color"]),
                j(_e, {
                  class: "min-w-0 flex-1",
                  title: "Cache Write",
                  value: E(he)(e.data.total_cache_write_tokens),
                  color: r.cache_write
                }, null, 8, ["value", "color"])
              ])
            ])) : (m(), _("section", $_, [
              u("div", S_, [
                u("div", M_, [
                  j(E(nt), { class: "empty-icon" })
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
}), A_ = /* @__PURE__ */ pe(D_, [["__scopeId", "data-v-554d3cda"]]), T_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, B_ = { class: "card-body" }, L_ = {
  key: 0,
  class: "chart-section"
}, E_ = { class: "chart-container" }, R_ = { class: "mt-4 w-full min-w-0" }, P_ = {
  key: 1,
  class: "empty-state"
}, I_ = { class: "empty-state-content" }, F_ = { class: "empty-icon-wrapper" }, O_ = /* @__PURE__ */ ue({
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
    }, i = C(
      () => he(a.data?.total_conversations ?? 0)
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
    return t({ isDark: n }), (c, d) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Conversation Count",
      subtitle: "Conversations over time",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", T_, [
          u("div", B_, [
            r.value.labels && r.value.labels.length ? (m(), _("section", L_, [
              u("div", E_, [
                j(ht, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ]),
              u("div", R_, [
                j(_e, {
                  class: "min-w-0 w-full",
                  title: "Total",
                  value: i.value
                }, null, 8, ["value"])
              ])
            ])) : (m(), _("section", P_, [
              u("div", I_, [
                u("div", F_, [
                  j(E(nt), { class: "empty-icon" })
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
}), V_ = /* @__PURE__ */ pe(O_, [["__scopeId", "data-v-311f443a"]]), z_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, N_ = { class: "card-body" }, j_ = {
  key: 0,
  class: "charts-grid"
}, H_ = { class: "chart-section" }, W_ = { class: "chart-container" }, K_ = { class: "chart-section" }, Y_ = { class: "chart-container" }, U_ = {
  key: 1,
  class: "empty-state"
}, q_ = { class: "empty-state-content" }, X_ = { class: "empty-icon-wrapper" }, G_ = /* @__PURE__ */ ue({
  __name: "TopAgentsAnalysis",
  props: {
    data: { default: () => ({}) },
    loading: { type: Boolean, default: !1 },
    options: { default: void 0 },
    theme: { default: void 0 }
  },
  setup(e, { expose: t }) {
    const a = e, { isDark: n, colors: o } = Me($e(a, "theme")), s = C(() => a.data?.top_agents && a.data.top_agents.length > 0), i = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((f, p) => (p.total_cost || 0) - (f.total_cost || 0)) : []), r = C(() => a.data?.top_agents ? [...a.data.top_agents].sort((f, p) => (p.total_tokens || 0) - (f.total_tokens || 0)) : []), l = C(() => {
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
              const p = f.label, g = a.data?.top_agents?.find((b) => b.agent_type === p);
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
              const p = f.label, g = a.data?.top_agents?.find((b) => b.agent_type === p);
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
    return t({ isDark: n }), (f, p) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Top Agents Analysis",
      subtitle: "Cost and token usage by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", z_, [
          u("div", N_, [
            s.value ? (m(), _("div", j_, [
              u("section", H_, [
                p[0] || (p[0] = u("h4", { class: "chart-section-title" }, "Total cost per agent", -1)),
                u("div", W_, [
                  j(kt, {
                    data: l.value,
                    options: d.value
                  }, null, 8, ["data", "options"])
                ])
              ]),
              u("section", K_, [
                p[1] || (p[1] = u("h4", { class: "chart-section-title" }, "Total tokens per agent", -1)),
                u("div", Y_, [
                  j(kt, {
                    data: c.value,
                    options: h.value
                  }, null, 8, ["data", "options"])
                ])
              ])
            ])) : (m(), _("section", U_, [
              u("div", q_, [
                u("div", X_, [
                  j(E(nt), { class: "empty-icon" })
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
}), Z_ = /* @__PURE__ */ pe(G_, [["__scopeId", "data-v-bb4ae132"]]), Q_ = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, J_ = { class: "card-body" }, ek = {
  key: 0,
  class: "chart-section"
}, tk = { class: "chart-container" }, ak = {
  key: 1,
  class: "empty-state"
}, nk = { class: "empty-state-content" }, ok = { class: "empty-icon-wrapper" }, sk = /* @__PURE__ */ ue({
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
      (h) => h.agent_type?.toLowerCase() !== "triage"
    ) : []), r = C(() => i.value.length > 0), l = C(() => i.value.reduce((h, f) => h + (f.conversations || 0), 0)), c = C(() => {
      const h = i.value;
      if (h.length === 0)
        return { labels: [], datasets: [] };
      const f = h.map((b) => {
        const y = b.agent_type?.toLowerCase();
        return (s[y] || "#a78bfa") + "80";
      }), p = h.map((b) => {
        const y = b.agent_type?.toLowerCase();
        return s[y] || "#a78bfa";
      });
      return {
        labels: h.map((b) => {
          const y = b.conversations || 0, v = l.value ? y / l.value * 100 : 0;
          return `${b.agent_type} - ${y.toLocaleString()} (${v.toFixed(1)}%)`;
        }),
        datasets: [
          {
            data: h.map((b) => b.conversations || 0),
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
              const f = (h.label || "").toString(), p = Number(h.parsed) || 0, g = (h.dataset.data || []).reduce((y, v) => y + (Number(v) || 0), 0), b = g ? p / g * 100 : 0;
              return `${f}: ${p.toLocaleString()} (${b.toFixed(1)}%)`;
            }
          }
        }
      }
    });
    return t({ isDark: n }), (h, f) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Top Agents",
      subtitle: "Interactions by agent (excluding triage)",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", Q_, [
          u("div", J_, [
            r.value ? (m(), _("section", ek, [
              u("div", tk, [
                j(Dn, {
                  data: c.value,
                  options: d.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), _("section", ak, [
              u("div", nk, [
                u("div", ok, [
                  j(E(nt), { class: "empty-icon" })
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
}), ik = /* @__PURE__ */ pe(sk, [["__scopeId", "data-v-74c924dc"]]), rk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, lk = { class: "card-body" }, ck = {
  key: 0,
  class: "chart-section"
}, dk = { class: "chart-container" }, uk = {
  key: 1,
  class: "empty-state"
}, hk = { class: "empty-state-content" }, fk = { class: "empty-icon-wrapper" }, gk = /* @__PURE__ */ ue({
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
    }, i = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (Array.isArray(c) && c.length > 0)
        return !0;
      const d = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {};
      return Object.keys(d).length > 0 && Object.keys(h).length > 0;
    }), r = C(() => {
      const c = a.costData?.daily_mean_cost_per_conversation || [];
      if (c.length > 0) {
        const y = [...c].sort((v, x) => v.date.localeCompare(x.date));
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
      const d = a.costData?.costs_by_day || {}, h = a.conversationData?.conversations_by_day || {}, p = Object.keys(d).filter((y) => h[y]).sort();
      if (p.length === 0)
        return { labels: [], datasets: [] };
      const g = p.map((y) => s(y)), b = p.map((y) => {
        const v = d[y]?.total_cost || 0, x = h[y] || 0;
        return x > 0 ? v / x : 0;
      });
      return {
        labels: g,
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
    return t({ isDark: n }), (c, d) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Daily Cost Trends",
      subtitle: "Mean USD/conversation per day",
      collapsible: !1,
      loading: e.loading
    }, {
      default: F(() => [
        u("div", rk, [
          u("div", lk, [
            i.value ? (m(), _("section", ck, [
              u("div", dk, [
                j(ht, {
                  data: r.value,
                  options: l.value
                }, null, 8, ["data", "options"])
              ])
            ])) : (m(), _("section", uk, [
              u("div", hk, [
                u("div", fk, [
                  j(E(nt), { class: "empty-icon" })
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
}), mk = /* @__PURE__ */ pe(gk, [["__scopeId", "data-v-ae6c48b1"]]), pk = { class: "tabs text-sm" }, bk = ["aria-label"], vk = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], yk = { class: "truncate whitespace-nowrap font-medium tracking-tight" }, xk = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = se([]), s = `tabs-${Ne()}`, i = (g) => `${s}-tab-${g}`, r = C(
      () => a.items.map((g, b) => g.disabled ? -1 : b).filter((g) => g >= 0)
    );
    function l(g) {
      return g.value === a.modelValue;
    }
    function c(g) {
      const b = l(g), v = `${a.fullWidth ? "relative flex min-w-0 flex-1" : "relative inline-flex max-w-full shrink-0"} h-8 max-h-8 min-h-8 items-stretch cursor-pointer rounded-lg border border-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100`;
      return g.disabled ? `${v} cursor-not-allowed opacity-40` : b ? `${v} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]` : `${v} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
    }
    function d(g, b) {
      g === b || a.items.find((v) => v.value === g)?.disabled || (n("update:modelValue", g), n("change", { value: g, previousValue: b }));
    }
    function h(g, b) {
      n("tab-click", { value: g.value, originalEvent: b }), !g.disabled && (d(g.value, a.modelValue), He(() => {
        o.value[a.items.indexOf(g)]?.focus();
      }));
    }
    function f(g, b) {
      const y = a.items.length;
      if (y === 0) return 0;
      let v = g;
      for (let x = 0; x < y; x++)
        if (v = (v + b + y) % y, !a.items[v]?.disabled) return v;
      return g;
    }
    async function p(g, b) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(g.key)) return;
      g.preventDefault();
      let v = b;
      g.key === "ArrowLeft" ? v = f(b, -1) : g.key === "ArrowRight" ? v = f(b, 1) : g.key === "Home" ? v = r.value[0] ?? 0 : g.key === "End" && (v = r.value[r.value.length - 1] ?? b);
      const x = a.items[v];
      !x || x.disabled || (d(x.value, a.modelValue), await He(), o.value[v]?.focus());
    }
    return (g, b) => (m(), _("div", pk, [
      u("div", {
        role: "tablist",
        "aria-label": e.ariaLabel,
        class: J([
          "box-border h-10 max-h-10 min-h-10 flex-wrap items-center gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 px-0.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none",
          e.fullWidth ? "flex w-full" : "inline-flex w-fit max-w-full"
        ])
      }, [
        (m(!0), _(ce, null, me(e.items, (y, v) => (m(), _("button", {
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
          class: J(c(y)),
          onClick: (x) => h(y, x),
          onKeydown: (x) => p(x, v)
        }, [
          u("span", {
            class: J(["tabs-tab__label flex min-h-0 min-w-0 items-center justify-center gap-2 px-3", { "min-w-0 flex-1": e.fullWidth }])
          }, [
            y.icon ? (m(), ae(St(y.icon), {
              key: 0,
              class: "h-[1.125rem] w-[1.125rem] shrink-0",
              "aria-hidden": "true"
            })) : V("", !0),
            u("span", yk, A(y.label), 1)
          ], 2)
        ], 42, vk))), 128))
      ], 10, bk),
      g.$slots.default ? (m(), ae(ut, {
        key: 0,
        name: "tabs-panel",
        mode: "out-in"
      }, {
        default: F(() => [
          (m(), _("div", {
            key: e.modelValue,
            class: "tabs-panel mt-4"
          }, [
            ke(g.$slots, "default", { active: e.modelValue }, void 0, !0)
          ]))
        ]),
        _: 3
      })) : V("", !0)
    ]));
  }
}), yr = /* @__PURE__ */ pe(xk, [["__scopeId", "data-v-f9c367eb"]]), _k = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, kk = { class: "card-body" }, wk = {
  key: 0,
  class: "model-usage-table-block"
}, Ck = { class: "w-full min-w-0" }, $k = {
  key: 1,
  class: "empty-state"
}, Sk = { class: "empty-state-content" }, Mk = { class: "empty-icon-wrapper" }, Dk = /* @__PURE__ */ ue({
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
    }, { isDark: i } = Me($e(n, "theme")), r = [
      { value: "by_model", label: "Model" },
      { value: "by_provider", label: "Provider" }
    ], l = se("by_model"), c = C(() => l.value === "by_model" ? n.data?.total_by_model || {} : n.data?.total_by_provider || {}), d = C(() => [
      { key: "name", label: l.value === "by_model" ? "Model" : "Provider", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ]), h = C(
      () => Object.entries(c.value).map(([g, b]) => ({
        id: g,
        name: g,
        avgCost: p(b.avg_cost_per_message),
        avgTokens: f(b.avg_tokens_per_message),
        messageCount: f(b.message_count),
        totalCost: p(b.total_cost),
        totalTokens: f(b.total_tokens)
      }))
    ), f = (g) => g == null ? "0" : he(g), p = (g) => g == null ? "$0.00" : Be(g);
    return t({ isDark: i }), (g, b) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Model Usage",
      subtitle: "AI model performance and costs",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", _k, [
          u("div", kk, [
            j(yr, {
              modelValue: l.value,
              "onUpdate:modelValue": b[0] || (b[0] = (y) => l.value = y),
              items: r,
              "aria-label": "Model Usage Tabs",
              "full-width": ""
            }, {
              default: F(() => [
                c.value && Object.keys(c.value).length > 0 ? (m(), _("div", wk, [
                  u("div", Ck, [
                    j(dt, {
                      columns: d.value,
                      rows: h.value,
                      "max-visible-rows": 3,
                      "row-key": "id"
                    }, null, 8, ["columns", "rows"])
                  ])
                ])) : (m(), _("div", $k, [
                  u("div", Sk, [
                    u("div", Mk, [
                      j(E(nt), { class: "empty-icon" })
                    ]),
                    b[1] || (b[1] = u("p", { class: "empty-title" }, "No model usage data available", -1)),
                    b[2] || (b[2] = u("p", { class: "empty-description" }, "Try adjusting the date range or check your filters to see model performance metrics.", -1))
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
}), Ak = /* @__PURE__ */ pe(Dk, [["__scopeId", "data-v-48a6cc07"]]), Tk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, Bk = { class: "card-body" }, Lk = {
  key: 0,
  class: "message-roles-table-block"
}, Ek = { class: "w-full min-w-0" }, Rk = {
  key: 1,
  class: "empty-state"
}, Pk = { class: "empty-state-content" }, Ik = { class: "empty-icon-wrapper" }, Fk = /* @__PURE__ */ ue({
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
    }, { isDark: i } = Me($e(n, "theme")), r = ["assistant", "system", "user"], l = [
      { key: "role", label: "Role", align: "left" },
      { key: "avgCost", label: "Avg cost per message", align: "center" },
      { key: "avgTokens", label: "Avg tokens per message", align: "center" },
      { key: "messageCount", label: "Message count", align: "center" },
      { key: "totalCost", label: "Total cost", align: "center" },
      { key: "totalTokens", label: "Total tokens", align: "center" }
    ], c = C(() => n.data?.total_by_role || {}), d = C(
      () => r.map((b) => ({
        id: b,
        role: g(b),
        avgCost: p(c.value[b]?.avg_cost_per_message),
        avgTokens: f(c.value[b]?.avg_tokens_per_message),
        messageCount: f(c.value[b]?.message_count),
        totalCost: p(c.value[b]?.total_cost),
        totalTokens: f(c.value[b]?.total_tokens)
      }))
    ), h = C(() => Object.keys(c.value).length > 0), f = (b) => b == null ? "0" : he(b), p = (b) => b == null ? "$0.00" : Be(b), g = (b) => b.charAt(0).toUpperCase() + b.slice(1);
    return t({ isDark: i }), (b, y) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Message Roles",
      subtitle: "Performance by message role",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Tk, [
          u("div", Bk, [
            h.value ? (m(), _("div", Lk, [
              u("div", Ek, [
                j(dt, {
                  columns: l,
                  rows: d.value,
                  "max-visible-rows": 3,
                  "row-key": "id"
                }, null, 8, ["rows"])
              ])
            ])) : (m(), _("div", Rk, [
              u("div", Pk, [
                u("div", Ik, [
                  j(E(nt), { class: "empty-icon" })
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
}), Ok = /* @__PURE__ */ pe(Fk, [["__scopeId", "data-v-d38e854e"]]), Vk = { class: "flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]" }, zk = { class: "card-body" }, Nk = {
  key: 0,
  class: "chart-section"
}, jk = { class: "chart-container" }, Hk = { class: "kpi-grid" }, Wk = {
  key: 1,
  class: "empty-state"
}, Kk = { class: "empty-state-content" }, Yk = { class: "empty-icon-wrapper" }, Uk = 40, qk = 230, Xk = /* @__PURE__ */ ue({
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
    const n = e, o = a, s = (k) => {
      o("export", k);
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
    }, c = (k) => k.agent_type || k.agent_id || k.agent_name || "", d = (k) => k.agent_name ? k.agent_name : c(k).split("_").map(($) => $.charAt(0).toUpperCase() + $.slice(1)).join(" ").replace(/V\d+$/, "").trim(), h = (k) => {
      const w = c(k).toLowerCase();
      for (const [$, D] of Object.entries(l))
        if (w.includes($))
          return D;
      return "#9ca3af";
    }, f = C(() => [...n.data?.top_agents || []].sort((w, $) => $.avg_cost_per_conversation - w.avg_cost_per_conversation)), p = C(
      () => Math.max(qk, f.value.length * Uk + 32)
    ), g = C(() => n.data?.total_conversations !== void 0 ? Number(n.data.total_conversations) || 0 : f.value.reduce((k, w) => k + w.conversations, 0)), b = C(() => n.data?.total_cost !== void 0 ? Number(n.data.total_cost) || 0 : f.value.reduce((k, w) => k + w.total_cost, 0)), y = C(() => n.data?.overall_avg_cost_per_conversation !== void 0 ? Number(n.data.overall_avg_cost_per_conversation) || 0 : g.value === 0 ? 0 : b.value / g.value), v = C(() => {
      const k = f.value;
      if (k.length === 0)
        return { labels: [], datasets: [] };
      const w = k.map((S) => d(S)), $ = k.map((S) => S.avg_cost_per_conversation), D = k.map((S) => h(S));
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
            title: function(k) {
              const w = f.value[k[0]?.dataIndex];
              return w ? d(w) : "";
            },
            label: function(k) {
              const w = f.value[k.dataIndex];
              return [
                `Cost: ${Be(k.parsed.x)}`,
                `Conversations: ${he(w.conversations)}`,
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
            callback: function(k) {
              return Be(k);
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
    return t({ isDark: i }), (k, w) => (m(), ae(Se, {
      class: "h-full min-h-0",
      title: "Cost Per Conversation",
      subtitle: "USD per conversation by agent",
      collapsible: !1,
      loading: e.loading
    }, {
      headerExport: F(() => [
        e.enableExport && !e.loading ? (m(), ae(E(Ie), {
          key: 0,
          variant: "inline",
          onExport: s,
          loading: e.exportLoading
        }, null, 8, ["loading"])) : V("", !0)
      ]),
      default: F(() => [
        u("div", Vk, [
          u("div", zk, [
            v.value.labels && v.value.labels.length ? (m(), _("section", Nk, [
              u("div", jk, [
                j(kt, {
                  data: v.value,
                  options: x.value,
                  "height-px": p.value,
                  "category-label-max-length": 18
                }, null, 8, ["data", "options", "height-px"])
              ]),
              u("footer", Hk, [
                j(E(_e), {
                  title: "Total Agents",
                  value: String(f.value.length)
                }, null, 8, ["value"]),
                j(E(_e), {
                  title: "Total Conversations",
                  value: E(he)(g.value)
                }, null, 8, ["value"]),
                j(E(_e), {
                  title: "Total Cost",
                  value: E(Be)(b.value)
                }, null, 8, ["value"]),
                j(E(_e), {
                  title: "Avg Cost / Conv.",
                  value: E(Be)(y.value)
                }, null, 8, ["value"])
              ])
            ])) : (m(), _("section", Wk, [
              u("div", Kk, [
                u("div", Yk, [
                  j(E(nt), { class: "empty-icon" })
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
}), Gk = /* @__PURE__ */ pe(Xk, [["__scopeId", "data-v-65f2d154"]]);
function Ao(e, t) {
  const a = e[t];
  return Array.isArray(a) ? a.filter(
    (n) => n !== null && typeof n == "object" && !Array.isArray(n)
  ) : [];
}
function xr(e, t) {
  const { childrenKey: a, sortKey: n, sortDirection: o, compare: s } = t;
  return [...e].sort((i, r) => s(i, r, n, o)).map((i) => {
    const r = Ao(i, a);
    return r.length === 0 ? i : {
      ...i,
      [a]: xr(r, t)
    };
  });
}
function _r(e, t, a = 0, n = null, o = 0) {
  const { childrenKey: s, expandedKeys: i, resolveRowKey: r, maxDepth: l } = t, c = [];
  return e.forEach((d, h) => {
    const f = r(d, o + h), p = Ao(d, s), g = p.length > 0, b = i.has(f);
    c.push({
      row: d,
      key: f,
      depth: a,
      hasChildren: g,
      isExpanded: b,
      parentKey: n
    }), g && b && (l === void 0 || a < l) && c.push(
      ..._r(p, t, a + 1, f, 0)
    );
  }), c;
}
function kr(e, t, a = 0, n = 0) {
  const { childrenKey: o, resolveRowKey: s, isRowSelectable: i } = t, r = [];
  return e.forEach((l, c) => {
    const d = s(l, n + c), h = Ao(l, o), f = h.length > 0, p = {
      depth: a,
      isChild: a > 0,
      hasChildren: f
    };
    (i?.(l, p) ?? !0) && r.push(d), h.length > 0 && r.push(
      ...kr(h, t, a + 1, 0)
    );
  }), r;
}
const Zk = { class: "kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, Qk = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, Jk = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, e2 = {
  key: 0,
  scope: "col",
  class: "w-14 bg-transparent px-4 py-3 text-center align-middle"
}, t2 = ["checked", "aria-label"], a2 = ["aria-sort", "onClick"], n2 = {
  class: "kiut-table-sort-icons inline-flex items-center",
  "aria-hidden": "true"
}, o2 = {
  key: 0,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, s2 = {
  key: 1,
  class: "kiut-table-sort-arrow kiut-table-sort-arrow--active"
}, i2 = {
  key: 0,
  class: "kiut-table-body-cell w-12 bg-transparent pl-4 pr-0 py-0 text-center align-middle"
}, r2 = ["checked", "aria-label", "onChange"], l2 = ["aria-expanded", "aria-label", "onClick"], c2 = ["aria-expanded", "aria-label", "onClick"], d2 = {
  key: 1,
  class: "inline-block w-4 shrink-0",
  "aria-hidden": "true"
}, u2 = { class: "min-w-0 flex-1" }, h2 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = se(null), s = se([...a.defaultExpandedKeys]), i = C({
      get() {
        return a.expandedKeys ?? s.value;
      },
      set(T) {
        s.value = T, n("update:expandedKeys", T);
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
      const { sortKey: T, sortDirection: z, sortCompare: K, rows: de } = a;
      return !T || !z || !K ? de : a.expandable ? xr(de, {
        childrenKey: a.childrenKey,
        sortKey: T,
        sortDirection: z,
        compare: K
      }) : [...de].sort((ve, Q) => K(ve, Q, T, z));
    }), h = C(() => a.expandable ? _r(d.value, c.value) : d.value.map((T, z) => ({
      row: T,
      key: g(T, z),
      depth: 0,
      hasChildren: !1,
      isExpanded: !1,
      parentKey: null
    })));
    function f(T) {
      return `cell-${T}`;
    }
    function p(T) {
      return T === "center" ? "text-center" : T === "right" ? "text-right" : "text-left";
    }
    function g(T, z) {
      if (typeof a.rowKey == "function")
        return a.rowKey(T);
      const K = T[a.rowKey];
      return K != null ? String(K) : `__index_${z}`;
    }
    function b(T, z) {
      return T[z];
    }
    function y(T) {
      return T == null || typeof T == "object" ? "" : String(T);
    }
    function v(T) {
      return a.expandable && T === l.value;
    }
    function x(T) {
      return T.hasChildren || (a.isRowExpandable?.(T.row) ?? !1);
    }
    function k(T, z) {
      return {
        row: T.row,
        column: z,
        value: b(T.row, z.key),
        depth: T.depth,
        isChild: T.depth > 0,
        hasChildren: T.hasChildren,
        expanded: T.isExpanded
      };
    }
    function w(T) {
      if (!x(T)) return;
      const z = new Set(i.value);
      z.has(T.key) ? (z.delete(T.key), n("collapse", T.key, T.row)) : (a.singleExpand && z.clear(), z.add(T.key), n("expand", T.key, T.row)), i.value = [...z];
    }
    function $(T) {
      return {
        depth: T.depth,
        isChild: T.depth > 0,
        hasChildren: T.hasChildren
      };
    }
    function D(T, z) {
      return a.isRowSelectable?.(T, z) ?? !0;
    }
    function S(T) {
      return D(T.row, $(T));
    }
    function R(T) {
      return a.selectable && x(T) && !S(T);
    }
    function P(T) {
      return x(T) && !R(T);
    }
    function I(T) {
      return P(T) ? !1 : T.depth > 0 ? !0 : a.selectable && !x(T);
    }
    const M = C(() => {
      const { isRowSelectable: T } = a;
      return a.expandable ? kr(d.value, {
        childrenKey: a.childrenKey,
        resolveRowKey: g,
        isRowSelectable: T
      }) : d.value.map((z, K) => ({
        row: z,
        key: g(z, K),
        context: {
          depth: 0,
          isChild: !1,
          hasChildren: !1
        }
      })).filter(({ row: z, context: K }) => D(z, K)).map(({ key: z }) => z);
    });
    function L(T) {
      const z = String(T);
      return a.selectedKeys.some((K) => String(K) === z);
    }
    const B = C(() => !a.selectable || M.value.length === 0 ? !1 : M.value.every(
      (T) => a.selectedKeys.some((z) => String(z) === String(T))
    )), N = C(() => {
      if (!a.selectable || M.value.length === 0) return !1;
      const T = M.value.filter(
        (z) => a.selectedKeys.some((K) => String(K) === String(z))
      );
      return T.length > 0 && T.length < M.value.length;
    });
    Ee(
      [N, B, () => a.selectable],
      async () => {
        await He();
        const T = o.value;
        T && (T.indeterminate = N.value && !B.value);
      },
      { immediate: !0 }
    );
    function W() {
      if (a.selectable)
        if (B.value) {
          const T = new Set(
            M.value.map((K) => String(K))
          ), z = a.selectedKeys.filter(
            (K) => !T.has(String(K))
          );
          n("update:selectedKeys", z);
        } else {
          const T = new Set(a.selectedKeys.map((z) => String(z)));
          M.value.forEach((z) => T.add(String(z))), n("update:selectedKeys", [...T]);
        }
    }
    function q(T) {
      if (!a.selectable) return;
      const z = String(T), K = h.value.find((ve) => String(ve.key) === z);
      if (K && !S(K) || !K && !M.value.some((ve) => String(ve) === z))
        return;
      a.selectedKeys.some((ve) => String(ve) === z) ? n(
        "update:selectedKeys",
        a.selectedKeys.filter((ve) => String(ve) !== z)
      ) : n("update:selectedKeys", [...a.selectedKeys, z]);
    }
    function ee(T) {
      return `${a.ariaLabelSelectRow} ${T}`;
    }
    function X(T) {
      n("sort", T);
    }
    function le(T) {
      return a.sortKey === T && a.sortDirection != null;
    }
    function U(T) {
      return le(T) ? a.sortDirection === "asc" ? "ascending" : "descending" : "none";
    }
    return (T, z) => (m(), _("div", Zk, [
      u("div", Qk, [
        u("table", {
          class: J([
            "kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm",
            e.fixedLayout ? "table-fixed" : ""
          ])
        }, [
          u("thead", null, [
            u("tr", Jk, [
              e.selectable ? (m(), _("th", e2, [
                u("input", {
                  ref_key: "selectAllRef",
                  ref: o,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: B.value,
                  "aria-label": e.ariaLabelSelectAll,
                  onChange: W
                }, null, 40, t2)
              ])) : V("", !0),
              (m(!0), _(ce, null, me(e.columns, (K) => (m(), _("th", {
                key: K.key,
                scope: "col",
                class: J([
                  "px-2 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]",
                  v(K.key) && e.selectable ? "!pl-0" : "",
                  p(K.align),
                  K.headerClass ?? ""
                ])
              }, [
                K.sortable ? (m(), _("button", {
                  key: 0,
                  type: "button",
                  class: J(["kiut-table-sort-btn inline-flex items-center gap-1", p(K.align)]),
                  "aria-sort": U(K.key),
                  onClick: (de) => X(K.key)
                }, [
                  u("span", null, A(K.label), 1),
                  u("span", n2, [
                    le(K.key) ? (m(), _(ce, { key: 0 }, [
                      e.sortDirection === "asc" ? (m(), _("span", o2, "↑")) : e.sortDirection === "desc" ? (m(), _("span", s2, "↓")) : V("", !0)
                    ], 64)) : (m(), _(ce, { key: 1 }, [
                      z[0] || (z[0] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↑", -1)),
                      z[1] || (z[1] = u("span", { class: "kiut-table-sort-arrow kiut-table-sort-arrow--muted" }, "↓", -1))
                    ], 64))
                  ])
                ], 10, a2)) : (m(), _(ce, { key: 1 }, [
                  Ae(A(K.label), 1)
                ], 64))
              ], 2))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), _(ce, null, me(h.value, (K) => (m(), _("tr", {
              key: K.key,
              class: J([
                "kiut-table-body-row border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]",
                K.depth > 0 ? "kiut-table-row--child dark:bg-[#1a1a22]" : ""
              ])
            }, [
              e.selectable ? (m(), _("td", i2, [
                S(K) ? (m(), _("input", {
                  key: 0,
                  type: "checkbox",
                  class: "kiut-table-checkbox",
                  checked: L(K.key),
                  "aria-label": ee(K.key),
                  onChange: (de) => q(K.key)
                }, null, 40, r2)) : R(K) ? (m(), _("button", {
                  key: 1,
                  type: "button",
                  class: "kiut-table-expand-btn shrink-0",
                  "aria-expanded": K.isExpanded,
                  "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                  onClick: Oe((de) => w(K), ["stop"])
                }, [
                  j(E(Gt), {
                    class: J(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                    "aria-hidden": "true"
                  }, null, 8, ["class"])
                ], 8, l2)) : V("", !0)
              ])) : V("", !0),
              (m(!0), _(ce, null, me(e.columns, (de) => (m(), _("td", {
                key: de.key,
                class: J([
                  "kiut-table-body-cell bg-transparent py-0 align-middle text-[color:var(--kiut-text-secondary)]",
                  v(de.key) ? "pl-0 pr-2" : "px-2",
                  p(de.align),
                  de.cellClass ?? ""
                ])
              }, [
                v(de.key) ? (m(), _("div", {
                  key: 0,
                  class: "flex min-w-0 items-start gap-1",
                  style: Ce({ paddingLeft: `${K.depth * 1.25}rem` })
                }, [
                  ke(T.$slots, "row-expand", {
                    row: K.row,
                    expanded: K.isExpanded,
                    hasChildren: K.hasChildren,
                    depth: K.depth,
                    toggle: () => w(K)
                  }, () => [
                    P(K) ? (m(), _("button", {
                      key: 0,
                      type: "button",
                      class: "kiut-table-expand-btn shrink-0",
                      "aria-expanded": K.isExpanded,
                      "aria-label": K.isExpanded ? e.ariaLabelCollapseRow : e.ariaLabelExpandRow,
                      onClick: Oe((ve) => w(K), ["stop"])
                    }, [
                      j(E(Gt), {
                        class: J(["h-5 w-5 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !K.isExpanded }]),
                        "aria-hidden": "true"
                      }, null, 8, ["class"])
                    ], 8, c2)) : I(K) ? (m(), _("span", d2)) : V("", !0)
                  ], !0),
                  u("div", u2, [
                    ke(T.$slots, f(de.key), gt({ ref_for: !0 }, k(K, de)), () => [
                      Ae(A(y(b(K.row, de.key))), 1)
                    ], !0)
                  ])
                ], 4)) : ke(T.$slots, f(de.key), gt({
                  key: 1,
                  ref_for: !0
                }, k(K, de)), () => [
                  Ae(A(y(b(K.row, de.key))), 1)
                ], !0)
              ], 2))), 128))
            ], 2))), 128))
          ])
        ], 2)
      ])
    ]));
  }
}), f2 = /* @__PURE__ */ pe(h2, [["__scopeId", "data-v-b3104817"]]), ii = /* @__PURE__ */ ue({
  name: "ButtonLoadingSpinner",
  __name: "ButtonLoadingSpinner",
  props: {
    compact: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, a = C(
      () => t.compact ? "size-4" : "h-[1.125rem] w-[1.125rem]"
    );
    return (n, o) => (m(), _("svg", {
      class: J(["inline-flex shrink-0 animate-spin", a.value]),
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
}), g2 = ["disabled", "aria-expanded", "aria-label"], m2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]",
  "aria-hidden": "true"
}, p2 = { class: "min-w-0 truncate" }, b2 = ["disabled", "onClick", "onMouseenter"], v2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, y2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, x2 = { class: "min-w-0 flex-1 text-left" }, _2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, k2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, w2 = ["disabled", "aria-expanded", "aria-label"], C2 = {
  key: 0,
  class: "inline-flex shrink-0 [&>svg]:size-4",
  "aria-hidden": "true"
}, $2 = ["disabled", "onClick", "onMouseenter"], S2 = {
  key: 0,
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, M2 = {
  key: 1,
  class: "h-5 w-5 shrink-0",
  "aria-hidden": "true"
}, D2 = { class: "min-w-0 flex-1 text-left" }, A2 = { class: "block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, T2 = {
  key: 0,
  class: "mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, B2 = {
  key: 2,
  class: "group relative inline-flex shrink-0"
}, L2 = ["type", "disabled", "aria-busy", "aria-label"], E2 = {
  key: 2,
  class: "min-w-0 truncate"
}, R2 = {
  role: "tooltip",
  "aria-hidden": "true",
  class: "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
}, P2 = ["type", "disabled", "aria-busy", "aria-label"], I2 = {
  key: 2,
  class: "min-w-0 truncate"
}, xt = /* @__PURE__ */ ue({
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
      const T = o["aria-label"];
      if (typeof T == "string" && T.length > 0) return T;
      if ((l.value || r.value) && a.tooltip?.trim()) return a.tooltip.trim();
    }), p = C(() => {
      const T = o.type;
      return T === "submit" || T === "reset" || T === "button" ? T : "button";
    }), g = C(() => {
      const { class: T, type: z, "aria-label": K, ...de } = o;
      return de;
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
    ]), y = `kiut-button-menu-${Ne()}`, v = `${y}-btn`, x = `${y}-menu`, k = se(null), w = se(null), $ = se(null), D = se(!1), S = se(0), R = se({}), P = C(() => a.options.filter((T) => !T.disabled));
    function I(T) {
      return `${T.value}-${T.label}`;
    }
    function M() {
      const T = w.value;
      if (!T) return;
      const z = T.getBoundingClientRect(), K = {
        top: `${z.bottom - 3}px`,
        minWidth: `max(${z.width}px, ${a.menuMinWidth})`
      };
      a.menuAlign === "right" ? (K.right = `${window.innerWidth - z.right}px`, K.left = "auto") : (K.left = `${z.left}px`, K.right = "auto"), R.value = K;
    }
    function L(T) {
      return [
        "mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        S.value === T ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function B() {
      D.value = !1;
    }
    function N() {
      M(), S.value = 0, He(() => $.value?.focus());
    }
    function W() {
      if (!a.disabled) {
        if (D.value) {
          B();
          return;
        }
        D.value = !0, N();
      }
    }
    function q(T) {
      T.disabled || (n("select", T), B());
    }
    function ee(T) {
      T.stopPropagation(), W();
    }
    function X(T) {
      if (!D.value) return;
      const z = T.target, K = k.value, de = $.value;
      K && !K.contains(z) && (!de || !de.contains(z)) && B();
    }
    function le(T) {
      a.disabled || (T.key === "ArrowDown" || T.key === "Enter" || T.key === " ") && (T.preventDefault(), D.value || (D.value = !0, N()));
    }
    function U(T) {
      const z = P.value;
      if (T.key === "Escape") {
        T.preventDefault(), B(), w.value?.focus();
        return;
      }
      if (z.length !== 0) {
        if (T.key === "ArrowDown") {
          T.preventDefault(), S.value = Math.min(S.value + 1, z.length - 1);
          return;
        }
        if (T.key === "ArrowUp") {
          T.preventDefault(), S.value = Math.max(S.value - 1, 0);
          return;
        }
        if (T.key === "Enter" || T.key === " ") {
          T.preventDefault();
          const K = z[S.value];
          K && q(K);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", X);
    }), ct(() => {
      document.removeEventListener("click", X);
    }), (T, z) => i.value ? (m(), _("div", {
      key: 0,
      ref_key: "rootRef",
      ref: k,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", gt({
        ref_key: "buttonRef",
        ref: w,
        id: v,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, E(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ee,
        onKeydown: le
      }), [
        T.$slots.icon ? (m(), _("span", m2, [
          ke(T.$slots, "icon")
        ])) : V("", !0),
        u("span", p2, [
          ke(T.$slots, "default")
        ]),
        j(E(Gt), {
          class: J(["h-[1.125rem] w-[1.125rem] shrink-0 transition-transform", D.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 16, g2),
      (m(), ae(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(R.value),
          onKeydown: Oe(U, ["stop"])
        }, [
          (m(!0), _(ce, null, me(P.value, (K, de) => (m(), _("button", {
            key: I(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: J(L(de)),
            onClick: Oe((ve) => q(K), ["stop"]),
            onMouseenter: (ve) => S.value = de
          }, [
            K.icon ? (m(), _("span", v2, [
              (m(), ae(St(K.icon), { class: "h-5 w-5" }))
            ])) : (m(), _("span", y2)),
            u("span", x2, [
              u("span", _2, A(K.label), 1),
              K.description ? (m(), _("span", k2, A(K.description), 1)) : V("", !0)
            ])
          ], 42, b2))), 128))
        ], 36), [
          [Ut, D.value]
        ])
      ]))
    ], 512)) : r.value ? (m(), _("div", {
      key: 1,
      ref_key: "rootRef",
      ref: k,
      class: "relative inline-flex shrink-0 font-sans"
    }, [
      u("button", gt({
        ref_key: "buttonRef",
        ref: w,
        type: "button",
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [b.value, E(o).class]],
        disabled: e.disabled,
        "aria-expanded": D.value,
        "aria-haspopup": "menu",
        "aria-controls": x,
        "aria-label": f.value
      }, g.value, {
        onClick: ee,
        onKeydown: le
      }), [
        T.$slots.icon ? (m(), _("span", C2, [
          ke(T.$slots, "icon")
        ])) : V("", !0)
      ], 16, w2),
      (m(), ae(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: $,
          id: x,
          role: "menu",
          tabindex: "-1",
          class: "fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
          style: Ce(R.value),
          onKeydown: Oe(U, ["stop"])
        }, [
          (m(!0), _(ce, null, me(P.value, (K, de) => (m(), _("button", {
            key: I(K),
            type: "button",
            role: "menuitem",
            disabled: K.disabled,
            class: J(L(de)),
            onClick: Oe((ve) => q(K), ["stop"]),
            onMouseenter: (ve) => S.value = de
          }, [
            K.icon ? (m(), _("span", S2, [
              (m(), ae(St(K.icon), { class: "h-5 w-5" }))
            ])) : (m(), _("span", M2)),
            u("span", D2, [
              u("span", A2, A(K.label), 1),
              K.description ? (m(), _("span", T2, A(K.description), 1)) : V("", !0)
            ])
          ], 42, $2))), 128))
        ], 36), [
          [Ut, D.value]
        ])
      ]))
    ], 512)) : s.value ? (m(), _("span", B2, [
      u("button", gt({
        type: p.value,
        class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, b.value, E(o).class]],
        disabled: d.value,
        "aria-busy": e.loading || void 0,
        "aria-label": f.value
      }, g.value), [
        e.loading ? (m(), ae(ii, {
          key: 0,
          compact: l.value
        }, null, 8, ["compact"])) : T.$slots.icon ? (m(), _("span", {
          key: 1,
          class: J(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
          "aria-hidden": "true"
        }, [
          ke(T.$slots, "icon")
        ], 2)) : V("", !0),
        c.value ? (m(), _("span", E2, [
          ke(T.$slots, "default")
        ])) : V("", !0)
      ], 16, L2),
      u("span", R2, A(e.tooltip), 1)
    ])) : (m(), _("button", gt({
      key: 3,
      type: p.value,
      class: ["inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]", [h.value, b.value, E(o).class]],
      disabled: d.value,
      "aria-busy": e.loading || void 0,
      "aria-label": f.value
    }, g.value), [
      e.loading ? (m(), ae(ii, {
        key: 0,
        compact: l.value
      }, null, 8, ["compact"])) : T.$slots.icon ? (m(), _("span", {
        key: 1,
        class: J(["inline-flex shrink-0", l.value ? "[&>svg]:size-4" : "[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"]),
        "aria-hidden": "true"
      }, [
        ke(T.$slots, "icon")
      ], 2)) : V("", !0),
      c.value ? (m(), _("span", I2, [
        ke(T.$slots, "default")
      ])) : V("", !0)
    ], 16, P2));
  }
}), F2 = ["id", "data-kiut-toggle-size", "aria-checked", "aria-disabled", "disabled", "onKeydown"], O2 = { class: "sr-only" }, wr = /* @__PURE__ */ ue({
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
    return (s, i) => (m(), _("button", {
      id: e.id,
      type: "button",
      role: "switch",
      "data-kiut-toggle-size": e.size,
      "aria-checked": e.modelValue,
      "aria-disabled": e.disabled ? "true" : void 0,
      disabled: e.disabled,
      class: J([
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors",
        e.size === "sm" ? "h-6 w-11" : "h-8 w-[3.75rem]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        e.modelValue ? "bg-[color:var(--kiut-primary)]" : "bg-[#DEDEE3] dark:bg-slate-600"
      ]),
      onClick: o,
      onKeydown: [
        Oa(Oe(o, ["prevent", "stop"]), ["space"]),
        Oa(Oe(o, ["prevent"]), ["enter"])
      ]
    }, [
      u("span", {
        class: J(["pointer-events-none inline-block translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", [
          e.size === "sm" ? "h-5 w-5" : "h-7 w-7",
          e.modelValue ? e.size === "sm" ? "translate-x-5" : "translate-x-7" : "translate-x-0"
        ]]),
        "aria-hidden": "true"
      }, null, 2),
      u("span", O2, A(e.ariaLabel), 1)
    ], 42, F2));
  }
}), V2 = {
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
}, z2 = [
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
], u4 = [
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
], N2 = { class: "kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]" }, j2 = { class: "w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden" }, H2 = { class: "kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm" }, W2 = { class: "h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]" }, K2 = { class: "h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]" }, Y2 = {
  key: 0,
  class: "flex min-w-0 items-center gap-1.5"
}, U2 = ["aria-expanded", "aria-label", "onClick"], q2 = { class: "min-w-0 flex-1" }, X2 = {
  key: 0,
  class: "border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
}, G2 = ["colspan"], Z2 = { class: "mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]" }, Q2 = ["aria-label"], J2 = {
  key: 1,
  class: "text-sm text-[color:var(--kiut-text-muted)]"
}, ew = {
  key: 2,
  class: "space-y-2"
}, tw = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)]" }, aw = ["title"], nw = { class: "whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]" }, ow = { class: "ml-auto flex shrink-0 items-center gap-2" }, sw = /* @__PURE__ */ ue({
  name: "TableVersions",
  __name: "TableVersions",
  props: {
    rows: { default: () => [] },
    columns: { default: () => z2 },
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
    const a = e, n = t, o = se([...a.defaultExpandedKeys]), s = C({
      get() {
        return a.expandedKeys ?? o.value;
      },
      set(M) {
        o.value = M, n("update:expandedKeys", M);
      }
    }), i = C(() => ({
      ...V2,
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
    function d(M, L, B) {
      return {
        row: M,
        column: L,
        index: B,
        expanded: b(M, B)
      };
    }
    function h(M) {
      const L = M.key;
      return M.label ? M.label : L in i.value ? i.value[L] : M.key;
    }
    function f(M) {
      return M === "center" ? "text-center" : M === "right" ? "text-right" : "text-left";
    }
    function p(M) {
      return M === r.value;
    }
    function g(M, L) {
      if (typeof a.rowKey == "function")
        return a.rowKey(M);
      const B = M[a.rowKey];
      return B != null ? String(B) : `__index_${L}`;
    }
    function b(M, L) {
      return s.value.includes(g(M, L));
    }
    function y(M) {
      return M.versionsLoading === !0;
    }
    function v(M, L) {
      const B = g(M, L), N = new Set(s.value);
      N.has(B) ? (N.delete(B), n("collapse", B, M)) : (a.singleExpand && N.clear(), N.add(B), n("expand", B, M)), s.value = [...N];
    }
    function x(M) {
      return M.type ?? M.key;
    }
    function k(M) {
      return l[M] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
    }
    function w(M) {
      return M === "published" ? "success" : "warning";
    }
    function $(M) {
      const L = M instanceof Date ? M : new Date(M);
      return Number.isNaN(L.getTime()) ? String(M) : L.toLocaleDateString("es-ES");
    }
    function D(M) {
      const L = M instanceof Date ? M : new Date(M);
      return Number.isNaN(L.getTime()) ? String(M) : L.toLocaleString("es-ES");
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
    function R(M) {
      return M.method ? Ve(
        "span",
        {
          class: [
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            k(M.method)
          ]
        },
        M.method
      ) : null;
    }
    function P(M, L) {
      const B = L.actions ?? ["view", "edit"], N = [];
      for (const W of B)
        W === "view" ? N.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.view,
              ariaLabel: i.value.view,
              onClick: () => n("view", M)
            },
            { icon: () => Ve(ti, { class: "h-4 w-4" }) }
          )
        ) : W === "run" ? N.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.run,
              ariaLabel: i.value.run,
              onClick: () => n("run", M)
            },
            { icon: () => Ve(Um, { class: "h-4 w-4" }) }
          )
        ) : W === "edit" ? N.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.edit,
              ariaLabel: i.value.edit,
              onClick: () => n("edit", M)
            },
            { icon: () => Ve(Ym, { class: "h-4 w-4" }) }
          )
        ) : W === "createDraft" ? N.push(
          Ve(
            xt,
            {
              variant: "action",
              tooltip: i.value.createDraft,
              ariaLabel: i.value.createDraft,
              onClick: () => n("createDraft", M)
            },
            { icon: () => Ve(ei, { class: "h-4 w-4" }) }
          )
        ) : W === "delete" && N.push(
          Ve(
            xt,
            {
              variant: "action",
              tone: "danger",
              tooltip: i.value.delete,
              ariaLabel: i.value.delete,
              onClick: () => n("delete", M)
            },
            { icon: () => Ve(qm, { class: "h-4 w-4" }) }
          )
        );
      return Ve(
        "div",
        { class: "flex items-center justify-end gap-1" },
        N
      );
    }
    function I(M, L, B) {
      switch (x(L)) {
        case "name":
          return S(M);
        case "method":
          return R(M);
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
          return Ve(wr, {
            modelValue: M.active ?? !1,
            ariaLabel: i.value.toggleActive,
            "onUpdate:modelValue": (W) => n("toggleActive", M, W)
          });
        case "actions":
          return P(M, L);
        default:
          return Ve("span", {}, String(M[L.key] ?? ""));
      }
    }
    return (M, L) => (m(), _("div", N2, [
      u("div", j2, [
        u("table", H2, [
          u("thead", null, [
            u("tr", W2, [
              (m(!0), _(ce, null, me(e.columns, (B) => (m(), _("th", {
                key: B.key,
                scope: "col",
                class: J([
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]",
                  f(B.align),
                  B.headerClass ?? ""
                ])
              }, A(h(B)), 3))), 128))
            ])
          ]),
          u("tbody", null, [
            (m(!0), _(ce, null, me(e.rows, (B, N) => (m(), _(ce, {
              key: g(B, N)
            }, [
              u("tr", K2, [
                (m(!0), _(ce, null, me(e.columns, (W) => (m(), _("td", {
                  key: W.key,
                  class: J([
                    "px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]",
                    f(W.align),
                    W.cellClass ?? ""
                  ])
                }, [
                  ke(M.$slots, c(W.key), gt({ ref_for: !0 }, d(B, W, N)), () => [
                    p(W.key) ? (m(), _("div", Y2, [
                      u("button", {
                        type: "button",
                        class: "kiut-table-versions-expand-btn shrink-0",
                        "aria-expanded": b(B, N),
                        "aria-label": b(B, N) ? i.value.collapseRow : i.value.expandRow,
                        onClick: (q) => v(B, N)
                      }, [
                        j(E(Gt), {
                          class: J(["h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200", { "-rotate-90": !b(B, N) }]),
                          "aria-hidden": "true"
                        }, null, 8, ["class"])
                      ], 8, U2),
                      u("div", q2, [
                        (m(), ae(St(() => I(B, W))))
                      ])
                    ])) : (m(), ae(St(() => I(B, W)), { key: 1 }))
                  ], !0)
                ], 2))), 128))
              ]),
              b(B, N) ? (m(), _("tr", X2, [
                u("td", {
                  colspan: e.columns.length,
                  class: "py-3 px-4"
                }, [
                  u("h4", Z2, A(i.value.historialTitle), 1),
                  y(B) ? (m(), _("div", {
                    key: 0,
                    class: "space-y-2",
                    role: "status",
                    "aria-busy": "true",
                    "aria-label": i.value.loadingHistory
                  }, [
                    (m(!0), _(ce, null, me(e.historySkeletonCount, (W) => (m(), _("div", {
                      key: W,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]",
                      "aria-hidden": "true"
                    }, [...L[0] || (L[0] = [
                      Un('<div class="kiut-table-versions-skeleton h-5 w-16 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-8" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-14 rounded-full" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 min-w-[8rem] flex-1" data-v-177ecafb></div><div class="kiut-table-versions-skeleton h-4 w-28" data-v-177ecafb></div>', 5)
                    ])]))), 128))
                  ], 8, Q2)) : B.versions?.length ? (m(), _("div", ew, [
                    (m(!0), _(ce, null, me(B.versions, (W) => (m(), _("div", {
                      key: W.id,
                      class: "flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                    }, [
                      ke(M.$slots, "history-item", {
                        version: W,
                        row: B
                      }, () => [
                        j(Ue, {
                          color: "neutral",
                          outlined: ""
                        }, {
                          default: F(() => [
                            Ae(A(W.status), 1)
                          ]),
                          _: 2
                        }, 1024),
                        u("span", tw, A(W.version), 1),
                        W.method ? (m(), _("span", {
                          key: 0,
                          class: J(["inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", k(W.method)])
                        }, A(W.method), 3)) : V("", !0),
                        W.url ? (m(), _("span", {
                          key: 1,
                          class: "min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]",
                          title: W.url
                        }, A(W.url), 9, aw)) : V("", !0),
                        u("span", nw, A(D(W.updatedAt)), 1)
                      ], !0),
                      u("div", ow, [
                        ke(M.$slots, "history-actions", {
                          version: W,
                          row: B
                        }, () => [
                          j(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (q) => n("viewVersion", W, B)
                          }, {
                            icon: F(() => [
                              j(E(ti), { class: "h-4 w-4" })
                            ]),
                            default: F(() => [
                              Ae(" " + A(i.value.viewVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          j(xt, {
                            variant: "secondary",
                            class: "!min-h-8 !px-3 !py-1.5 !text-xs",
                            onClick: (q) => n("createDraftFromVersion", W, B)
                          }, {
                            icon: F(() => [
                              j(E(ei), { class: "h-4 w-4" })
                            ]),
                            default: F(() => [
                              Ae(" " + A(i.value.createDraftFromVersion), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ], !0)
                      ])
                    ]))), 128))
                  ])) : (m(), _("p", J2, A(i.value.emptyHistory), 1))
                ], 8, G2)
              ])) : V("", !0)
            ], 64))), 128))
          ])
        ])
      ])
    ]));
  }
}), iw = /* @__PURE__ */ pe(sw, [["__scopeId", "data-v-177ecafb"]]);
function rw(e, t) {
  return m(), _("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" })
  ]);
}
function lw(e, t) {
  return m(), _("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    u("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" })
  ]);
}
const cw = ["aria-label"], dw = { class: "flex flex-wrap items-center gap-x-2 gap-y-1.5" }, uw = { class: "shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, hw = { class: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5" }, fw = ["aria-label", "aria-expanded", "aria-controls", "onClick"], gw = { class: "truncate" }, mw = {
  key: 0,
  class: "ml-0.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--kiut-primary)]/20 px-1 text-[10px] font-semibold tabular-nums text-[color:var(--kiut-primary-default)] dark:bg-[color:var(--kiut-primary)]/25 dark:text-[color:var(--kiut-primary-light)]"
}, pw = {
  key: 0,
  class: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5"
}, bw = { class: "flex min-w-0 flex-wrap items-center gap-1.5" }, vw = ["aria-label", "onClick"], yw = ["aria-label", "onClick"], xw = ["aria-label"], _w = ["aria-label"], kw = {
  key: 1,
  class: "space-y-2"
}, ww = ["for"], Cw = ["id", "placeholder", "onKeydown"], $w = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Sw = ["aria-label"], Mw = { class: "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] transition hover:bg-black/[0.04] dark:text-slate-100 dark:hover:bg-white/[0.06]" }, Dw = ["checked", "onChange"], Aw = { class: "min-w-0 flex-1" }, Tw = { class: "text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400" }, Bw = { class: "flex flex-wrap items-end gap-2" }, Lw = { class: "min-w-[120px] flex-1" }, Ew = ["for"], Rw = ["id"], Pw = { class: "min-w-[120px] flex-1" }, Iw = ["for"], Fw = ["id"], Ow = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = oo(), i = `${`kiut-filters-${Ne()}`}-panel`, r = se(null), l = /* @__PURE__ */ new Map(), c = se(null), d = se(!1), h = se({}), f = se(null), p = se(""), g = se([]), b = se(""), y = se(""), v = C(() => c.value ? a.filterDefinitions.find((O) => O.id === c.value) ?? null : null), x = C(() => {
      const O = v.value;
      if (O)
        return O.type === "text" ? p.value : O.type === "select" ? g.value : { start: b.value, end: y.value };
    });
    function k(O, Z) {
      Z && Z instanceof HTMLElement ? l.set(O, Z) : l.delete(O);
    }
    function w(O) {
      return a.modelValue[O];
    }
    function $(O) {
      if (O == null) return [];
      if (Array.isArray(O))
        return O.filter((Z) => typeof Z == "string" && Z.trim() !== "");
      if (typeof O == "string") {
        const Z = O.trim();
        return Z ? [Z] : [];
      }
      return [];
    }
    function D(O, Z) {
      if (Z == null) return !0;
      if (O.type === "text") return String(Z).trim() === "";
      if (O.type === "select") return $(Z).length === 0;
      if (O.type === "dateRange") {
        const re = Z;
        return !re?.start?.trim() || !re?.end?.trim();
      }
      return !0;
    }
    const S = C(
      () => a.filterDefinitions.some((O) => !D(O, w(O.id)))
    ), R = C(() => {
      const O = [];
      for (const Z of a.filterDefinitions) {
        const re = w(Z.id);
        if (!D(Z, re)) {
          if (Z.type === "text")
            O.push({ kind: "text", def: Z, key: Z.id });
          else if (Z.type === "dateRange")
            O.push({ kind: "dateRange", def: Z, key: Z.id });
          else if (Z.type === "select")
            for (const fe of $(re))
              O.push({
                kind: "select",
                def: Z,
                optionValue: fe,
                key: `${Z.id}::${fe}`
              });
        }
      }
      return O;
    });
    function P(O) {
      return O.type !== "select" ? 0 : $(w(O.id)).length;
    }
    function I(O) {
      const Z = w(O.id), re = O.label.replace(/^\+\s*/, "");
      if (O.type === "text") return `${re}: ${String(Z ?? "").trim()}`;
      if (O.type === "select") {
        const vt = $(Z).map((Qt) => O.options.find((fa) => fa.value === Qt)?.label ?? Qt);
        return `${re}: ${vt.join(", ")}`;
      }
      const fe = Z, ye = L(fe.start), we = L(fe.end);
      return `${re}: ${ye} – ${we}`;
    }
    function M(O) {
      return O.kind === "text" || O.kind === "dateRange" ? I(O.def) : O.def.options.find((re) => re.value === O.optionValue)?.label ?? O.optionValue;
    }
    function L(O) {
      if (!O) return "";
      const Z = ze(O, "YYYY-MM-DD", !0);
      return Z.isValid() ? Z.format("L") : O;
    }
    function B(O) {
      const Z = c.value === O.id && d.value, re = !D(O, w(O.id));
      return Z || re ? "border border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]" : "border border-dashed border-[#838395] text-[color:var(--kiut-text-secondary)] hover:border-[#838395] hover:bg-slate-50 dark:border-[#838395] dark:text-slate-400 dark:hover:border-[#838395] dark:hover:bg-white/[0.04]";
    }
    function N(O) {
      return D(O, w(O.id)) ? G(O) : `Editar filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    function W(O) {
      const Z = w(O.id);
      if (O.type === "text") {
        p.value = Z != null ? String(Z) : "";
        return;
      }
      if (O.type === "select") {
        g.value = [...$(Z)];
        return;
      }
      const re = Z;
      b.value = re?.start?.trim() ?? "", y.value = re?.end?.trim() ?? "";
    }
    function q() {
      const O = v.value;
      if (!O || O.type !== "select") return;
      const Z = { ...a.modelValue };
      g.value.length === 0 ? delete Z[O.id] : Z[O.id] = [...g.value], n("update:modelValue", Z), n("change", Z);
    }
    function ee(O) {
      const Z = g.value.indexOf(O);
      Z >= 0 ? g.value = g.value.filter((re, fe) => fe !== Z) : g.value = [...g.value, O], q();
    }
    function X(O) {
      if (!O) return;
      f.value = O;
      const Z = O.getBoundingClientRect(), re = 300;
      let fe = Z.left;
      const ye = window.innerWidth - re - 12;
      fe > ye && (fe = Math.max(12, ye)), fe < 12 && (fe = 12);
      const we = Z.bottom + 8;
      h.value = {
        top: `${we}px`,
        left: `${fe}px`,
        width: `${Math.min(re, window.innerWidth - 24)}px`
      };
    }
    function le(O, Z) {
      if (c.value === O.id && d.value) {
        de();
        return;
      }
      d.value && c.value !== O.id && de(), c.value = O.id, d.value = !0, W(O), He().then(async () => {
        X(Z.currentTarget), await He(), T();
      });
    }
    function U(O, Z) {
      if (c.value === O.id && d.value) {
        de();
        return;
      }
      d.value && c.value !== O.id && de(), c.value = O.id, d.value = !0, W(O), He().then(async () => {
        const re = l.get(O.id) ?? Z.currentTarget;
        X(re), await He(), T();
      });
    }
    function T() {
      const O = r.value;
      if (!O) return;
      O.querySelector(
        'input[type="text"], input[type="date"], input[type="checkbox"], select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
      )?.focus();
    }
    function z() {
      d.value = !1, c.value = null, f.value = null;
    }
    function K(O) {
      const Z = v.value;
      if (!Z) return;
      if (Z.type === "text") {
        p.value = O != null ? String(O) : "";
        return;
      }
      if (Z.type === "select") {
        g.value = Array.isArray(O) ? O.filter((fe) => typeof fe == "string") : $(O);
        return;
      }
      const re = O;
      b.value = re?.start?.trim() ?? "", y.value = re?.end?.trim() ?? "";
    }
    function de() {
      const O = v.value;
      if (!O) return;
      if (O.type === "text") {
        const ye = p.value.trim(), we = { ...a.modelValue };
        ye === "" ? delete we[O.id] : we[O.id] = ye, n("update:modelValue", we), n("change", we), z();
        return;
      }
      if (O.type === "select") {
        q(), z();
        return;
      }
      const Z = b.value.trim(), re = y.value.trim(), fe = { ...a.modelValue };
      !Z || !re || Z > re ? delete fe[O.id] : fe[O.id] = { start: Z, end: re }, n("update:modelValue", fe), n("change", fe), z();
    }
    function ve(O) {
      const Z = { ...a.modelValue };
      delete Z[O], n("update:modelValue", Z), n("change", Z), c.value === O && z();
    }
    function Q(O) {
      if (O.kind === "text" || O.kind === "dateRange") {
        ve(O.def.id);
        return;
      }
      const Z = { ...a.modelValue }, fe = $(Z[O.def.id]).filter((ye) => ye !== O.optionValue);
      fe.length === 0 ? delete Z[O.def.id] : Z[O.def.id] = fe, n("update:modelValue", Z), n("change", Z), c.value === O.def.id && W(O.def);
    }
    function Y() {
      const O = {};
      n("update:modelValue", O), n("change", O), z();
    }
    const H = C(() => {
      const O = v.value;
      return O ? `Editar filtro: ${O.label}` : "Filtro";
    });
    function ne(O) {
      const Z = O.def.label.replace(/^\+\s*/, "");
      return O.kind === "select" ? `Quitar ${O.def.options.find((ye) => ye.value === O.optionValue)?.label ?? O.optionValue} del filtro ${Z}` : `Quitar filtro ${Z}`;
    }
    function ie(O) {
      const Z = O.def.label.replace(/^\+\s*/, "");
      if (O.kind === "select") {
        const fe = O.def.options.find((ye) => ye.value === O.optionValue)?.label ?? O.optionValue;
        return `Editar filtro ${Z}: ${fe}`;
      }
      return `Editar filtro ${Z}`;
    }
    function G(O) {
      return `Añadir filtro ${O.label.replace(/^\+\s*/, "")}`;
    }
    const te = C(() => a.clearLabel);
    function oe(O) {
      if (!d.value || !r.value) return;
      const Z = O.target;
      if (!(r.value.contains(Z) || (Z instanceof Element ? Z : null)?.closest("[data-kiut-filter-chip]"))) {
        for (const fe of l.values())
          if (fe?.contains(Z)) return;
        de();
      }
    }
    function ge(O) {
      O.key === "Escape" && d.value && (O.preventDefault(), z());
    }
    function xe() {
      !d.value || !f.value || X(f.value);
    }
    return Ze(() => {
      document.addEventListener("mousedown", oe, !0), window.addEventListener("keydown", ge, !0), window.addEventListener("resize", xe);
    }), ci(() => {
      document.removeEventListener("mousedown", oe, !0), window.removeEventListener("keydown", ge, !0), window.removeEventListener("resize", xe);
    }), Ee(
      () => a.modelValue,
      () => {
        const O = v.value;
        O && d.value && !o.panel && W(O);
      },
      { deep: !0 }
    ), (O, Z) => (m(), _("div", {
      class: "kiut-filters font-[Inter] text-xs",
      role: "region",
      "aria-label": e.regionAriaLabel
    }, [
      u("div", dw, [
        u("span", uw, A(e.label), 1),
        u("div", hw, [
          (m(!0), _(ce, null, me(e.filterDefinitions, (re) => (m(), _("button", {
            key: `pill-${re.id}`,
            ref_for: !0,
            ref: (fe) => k(re.id, fe),
            type: "button",
            class: J(["inline-flex h-[26px] max-w-full shrink-0 items-center gap-0.5 rounded-full px-2 font-medium transition-colors", B(re)]),
            "aria-label": N(re),
            "aria-expanded": c.value === re.id,
            "aria-haspopup": !0,
            "aria-controls": c.value === re.id ? i : void 0,
            onClick: (fe) => U(re, fe)
          }, [
            j(E(rw), {
              class: "h-2.5 w-2.5 shrink-0",
              "aria-hidden": "true"
            }),
            u("span", gw, A(re.label), 1),
            re.type === "select" && P(re) > 0 ? (m(), _("span", mw, A(P(re)), 1)) : V("", !0)
          ], 10, fw))), 128))
        ])
      ]),
      S.value ? (m(), _("div", pw, [
        u("div", bw, [
          (m(!0), _(ce, null, me(R.value, (re) => (m(), _("div", {
            key: re.key,
            "data-kiut-filter-chip": "",
            class: "inline-flex h-[26px] max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:bg-white/[0.08] dark:text-slate-100"
          }, [
            u("button", {
              type: "button",
              class: "min-w-0 flex-1 truncate text-left transition hover:opacity-90",
              "aria-label": ie(re),
              onClick: (fe) => le(re.def, fe)
            }, [
              ke(O.$slots, "formatChip", {
                filter: re.def,
                value: w(re.def.id),
                optionValue: re.kind === "select" ? re.optionValue : void 0
              }, () => [
                Ae(A(M(re)), 1)
              ], !0)
            ], 8, vw),
            u("button", {
              type: "button",
              class: "shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100",
              "aria-label": ne(re),
              onClick: (fe) => Q(re)
            }, [
              j(E(lw), {
                class: "h-3.5 w-3.5",
                "aria-hidden": "true"
              })
            ], 8, yw)
          ]))), 128))
        ]),
        u("button", {
          type: "button",
          class: "shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]",
          "aria-label": te.value,
          onClick: Y
        }, A(e.clearLabel), 9, xw)
      ])) : V("", !0),
      (m(), ae(la, { to: "body" }, [
        c.value && d.value ? (m(), _("div", {
          key: 0,
          id: i,
          ref_key: "panelRef",
          ref: r,
          role: "dialog",
          "aria-modal": !0,
          "aria-label": H.value,
          class: "fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:bg-[#252528]",
          style: Ce(h.value),
          onKeydown: Z[3] || (Z[3] = Oe(() => {
          }, ["stop"]))
        }, [
          v.value ? (m(), _(ce, { key: 0 }, [
            O.$slots.panel ? ke(O.$slots, "panel", {
              key: 0,
              filter: v.value,
              close: de,
              value: x.value,
              updateValue: K
            }, void 0, !0) : (m(), _("div", kw, [
              v.value.type === "text" ? (m(), _(ce, { key: 0 }, [
                u("label", {
                  for: `${i}-text`,
                  class: "block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                }, A(v.value.label), 9, ww),
                Ge(u("input", {
                  id: `${i}-text`,
                  "onUpdate:modelValue": Z[0] || (Z[0] = (re) => p.value = re),
                  type: "text",
                  class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500",
                  placeholder: v.value.placeholder ?? "…",
                  onKeydown: Oa(Oe(de, ["prevent"]), ["enter"])
                }, null, 40, Cw), [
                  [Wt, p.value]
                ])
              ], 64)) : v.value.type === "select" ? (m(), _(ce, { key: 1 }, [
                u("p", $w, A(v.value.label), 1),
                u("ul", {
                  class: "max-h-[min(280px,50vh)] space-y-0.5 overflow-y-auto",
                  role: "listbox",
                  "aria-label": v.value.label,
                  "aria-multiselectable": !0
                }, [
                  (m(!0), _(ce, null, me(v.value.options, (re) => (m(), _("li", {
                    key: re.value
                  }, [
                    u("label", Mw, [
                      u("input", {
                        type: "checkbox",
                        class: "kiut-filter-ms-checkbox shrink-0",
                        checked: g.value.includes(re.value),
                        onChange: (fe) => ee(re.value)
                      }, null, 40, Dw),
                      u("span", Aw, A(re.label), 1)
                    ])
                  ]))), 128))
                ], 8, Sw)
              ], 64)) : v.value.type === "dateRange" ? (m(), _(ce, { key: 2 }, [
                u("p", Tw, A(v.value.label), 1),
                u("div", Bw, [
                  u("div", Lw, [
                    u("label", {
                      for: `${i}-start`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Desde ", 8, Ew),
                    Ge(u("input", {
                      id: `${i}-start`,
                      "onUpdate:modelValue": Z[1] || (Z[1] = (re) => b.value = re),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, Rw), [
                      [Wt, b.value]
                    ])
                  ]),
                  u("div", Pw, [
                    u("label", {
                      for: `${i}-end`,
                      class: "mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    }, " Hasta ", 8, Iw),
                    Ge(u("input", {
                      id: `${i}-end`,
                      "onUpdate:modelValue": Z[2] || (Z[2] = (re) => y.value = re),
                      type: "date",
                      class: "w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-xs text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:bg-[#1e1e20] dark:text-slate-100"
                    }, null, 8, Fw), [
                      [Wt, y.value]
                    ])
                  ])
                ])
              ], 64)) : V("", !0)
            ]))
          ], 64)) : V("", !0)
        ], 44, _w)) : V("", !0)
      ]))
    ], 8, cw));
  }
}), Vw = /* @__PURE__ */ pe(Ow, [["__scopeId", "data-v-f38e0100"]]), zw = { class: "font-sans" }, Nw = ["for"], jw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], Hw = ["id"], Cr = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = Xa(), s = ui("$pcForm", null), i = `kiut-input-text-${Ne()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), d = se(a.modelValue ?? "");
    Ee(
      () => a.modelValue,
      (v) => {
        d.value = v ?? "";
      }
    ), Ze(() => {
      s && c.value && s.register?.(c.value, {});
    }), ct(() => {
      s && c.value && s.deregister?.(c.value);
    });
    const h = C(() => s && c.value ? s.fields?.[c.value]?.states?.value ?? d.value : d.value), f = C(() => s && c.value ? s.fields?.[c.value]?.states?.invalid ?? a.invalid ?? !1 : a.invalid ?? !1);
    function p(v) {
      const x = v.target.value;
      d.value = x, n("update:modelValue", x);
      const k = s?.fields?.[c.value]?.props;
      k?.onInput && k.onInput(v);
    }
    function g(v) {
      const x = s?.fields?.[c.value]?.props;
      x?.onChange && x.onChange(v);
    }
    function b(v) {
      const x = s?.fields?.[c.value]?.props;
      x?.onBlur && x.onBlur(v);
    }
    const y = C(() => {
      const { name: v, id: x, type: k, ...w } = o;
      return w;
    });
    return (v, x) => (m(), _("div", zw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: J(E(ot))
      }, A(e.label), 11, Nw)) : V("", !0),
      u("input", gt(y.value, {
        id: r.value,
        name: c.value,
        type: e.type,
        autocomplete: "off",
        class: [E(at), f.value ? E(Dt) : ""],
        placeholder: e.placeholder,
        disabled: e.disabled,
        value: h.value,
        "aria-invalid": f.value ? "true" : void 0,
        "aria-describedby": e.errorText ? l.value : void 0,
        onInput: p,
        onChange: g,
        onBlur: b
      }), null, 16, jw),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, Hw)) : V("", !0)
    ]));
  }
}), Ww = { class: "font-sans" }, Kw = ["for"], Yw = { class: "relative" }, Uw = ["id", "name", "type", "placeholder", "disabled", "value", "aria-invalid", "aria-describedby"], qw = ["aria-label"], Xw = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Gw = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "size-4"
}, Zw = ["id"], Qw = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = Xa(), s = ui("$pcForm", null), i = `kiut-input-password-${Ne()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-err`), c = C(() => a.name ?? o.name ?? ""), d = se(!1), h = se(a.modelValue ?? "");
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
      const k = x.target.value;
      h.value = k, n("update:modelValue", k);
      const w = s?.fields?.[c.value]?.props;
      w?.onInput && w.onInput(x);
    }
    function b(x) {
      const k = s?.fields?.[c.value]?.props;
      k?.onChange && k.onChange(x);
    }
    function y(x) {
      const k = s?.fields?.[c.value]?.props;
      k?.onBlur && k.onBlur(x);
    }
    const v = C(() => {
      const { name: x, id: k, ...w } = o;
      return w;
    });
    return (x, k) => (m(), _("div", Ww, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: J(E(ot))
      }, A(e.label), 11, Kw)) : V("", !0),
      u("div", Yw, [
        u("input", gt(v.value, {
          id: r.value,
          name: c.value,
          type: d.value ? "text" : "password",
          autocomplete: "current-password",
          class: [E(at), p.value ? E(Dt) : "", "pr-10"],
          placeholder: e.placeholder,
          disabled: e.disabled,
          value: f.value,
          "aria-invalid": p.value ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: g,
          onChange: b,
          onBlur: y
        }), null, 16, Uw),
        u("button", {
          type: "button",
          tabindex: "-1",
          onClick: k[0] || (k[0] = (w) => d.value = !d.value),
          class: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
          "aria-label": d.value ? "Hide password" : "Show password"
        }, [
          d.value ? (m(), _("svg", Gw, [...k[2] || (k[2] = [
            u("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            }, null, -1)
          ])])) : (m(), _("svg", Xw, [...k[1] || (k[1] = [
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
        ], 8, qw)
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, Zw)) : V("", !0)
    ]));
  }
}), Jw = { class: "font-sans" }, e5 = ["for"], t5 = ["id", "rows", "placeholder", "disabled", "aria-invalid", "aria-describedby"], a5 = ["id"], n5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-textarea-${Ne()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C({
      get: () => a.modelValue,
      set: (l) => n("update:modelValue", l)
    });
    return (l, c) => (m(), _("div", Jw, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: J(E(ot))
      }, A(e.label), 11, e5)) : V("", !0),
      Ge(u("textarea", {
        id: s.value,
        "onUpdate:modelValue": c[0] || (c[0] = (d) => r.value = d),
        rows: e.rows,
        autocomplete: "off",
        class: J([E(uy), e.invalid ? E(Dt) : ""]),
        placeholder: e.placeholder,
        disabled: e.disabled,
        "aria-invalid": e.invalid ? "true" : void 0,
        "aria-describedby": e.errorText ? i.value : void 0
      }, null, 10, t5), [
        [Wt, r.value]
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, a5)) : V("", !0)
    ]));
  }
}), o5 = { class: "font-sans" }, s5 = ["for"], i5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], r5 = ["for"], l5 = ["title"], c5 = ["aria-label"], d5 = {
  key: 2,
  class: "space-y-3"
}, u5 = ["id", "name", "accept", "disabled", "aria-invalid", "aria-describedby"], h5 = ["for"], f5 = { class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400" }, g5 = {
  key: 0,
  class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, m5 = {
  key: 0,
  class: "space-y-2",
  role: "list"
}, p5 = { class: "flex items-start gap-2" }, b5 = { class: "min-w-0 flex-1 space-y-2" }, v5 = { class: "flex items-center gap-2" }, y5 = ["title"], x5 = { class: "shrink-0 text-xs text-[color:var(--kiut-text-muted)]" }, _5 = ["aria-label", "onClick"], k5 = ["id"], w5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-file-${Ne()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = se(null), l = C(
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
    function b(S) {
      return {
        id: `file-${Ne()}`,
        file: S,
        description: ""
      };
    }
    function y(S, R) {
      return S.some(
        (P) => P.file.name === R.name && P.file.size === R.size && P.file.lastModified === R.lastModified
      );
    }
    function v() {
      r.value && (r.value.value = "");
    }
    function x(S) {
      const P = S.target.files?.[0] ?? null;
      n("update:modelValue", P);
    }
    function k(S) {
      const R = S.target, P = Array.from(R.files ?? []);
      if (P.length === 0) return;
      const I = [...c.value];
      for (const M of P) {
        if (I.length >= a.maxFiles) break;
        y(I, M) || I.push(b(M));
      }
      n("update:modelValue", I), v();
    }
    function w() {
      n("update:modelValue", null), v();
    }
    function $(S) {
      n(
        "update:modelValue",
        c.value.filter((R) => R.id !== S)
      );
    }
    function D(S, R) {
      n(
        "update:modelValue",
        c.value.map(
          (P) => P.id === S ? { ...P, description: R } : P
        )
      );
    }
    return (S, R) => (m(), _("div", o5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: J(E(ot))
      }, A(e.label), 11, s5)) : V("", !0),
      e.multiple ? (m(), _("div", d5, [
        u("div", {
          class: J([
            E(at),
            "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
            e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
            e.invalid ? E(Dt) : "",
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
            onChange: k
          }, null, 40, u5),
          u("label", {
            for: s.value,
            class: J(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled || h.value ? "cursor-not-allowed opacity-50" : ""])
          }, [
            j(E(to), {
              class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
              "aria-hidden": "true"
            }),
            Ae(" " + A(e.chooseLabel), 1)
          ], 10, h5),
          u("span", f5, A(f.value), 1),
          e.filesCountLabel ? (m(), _("span", g5, A(e.filesCountLabel), 1)) : V("", !0)
        ], 2),
        c.value.length > 0 ? (m(), _("ul", m5, [
          (m(!0), _(ce, null, me(c.value, (P) => (m(), _("li", {
            key: P.id,
            class: "rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          }, [
            u("div", p5, [
              j(E(Wm), {
                class: "mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]",
                "aria-hidden": "true"
              }),
              u("div", b5, [
                u("div", v5, [
                  u("span", {
                    class: "min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100",
                    title: P.file.name
                  }, A(P.file.name), 9, y5),
                  u("span", x5, A(g(P.file.size)), 1),
                  e.disabled ? V("", !0) : (m(), _("button", {
                    key: 0,
                    type: "button",
                    class: "inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
                    "aria-label": e.removeFileAriaLabel,
                    onClick: (I) => $(P.id)
                  }, [
                    j(E(ao), {
                      class: "h-4 w-4",
                      "aria-hidden": "true"
                    })
                  ], 8, _5))
                ]),
                e.showDescriptions ? (m(), ae(Cr, {
                  key: 0,
                  "model-value": P.description,
                  label: e.descriptionLabel,
                  placeholder: e.descriptionPlaceholder,
                  disabled: e.disabled,
                  invalid: p(P),
                  "error-text": p(P) ? e.descriptionErrorText : "",
                  "onUpdate:modelValue": (I) => D(P.id, I)
                }, null, 8, ["model-value", "label", "placeholder", "disabled", "invalid", "error-text", "onUpdate:modelValue"])) : V("", !0)
              ])
            ])
          ]))), 128))
        ])) : V("", !0)
      ])) : (m(), _("div", {
        key: 1,
        class: J([
          E(at),
          "flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0",
          e.invalid ? "focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400" : "focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25",
          e.invalid ? E(Dt) : "",
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
        }, null, 40, i5),
        u("label", {
          for: s.value,
          class: J(["inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]", e.disabled ? "cursor-not-allowed opacity-50" : ""])
        }, [
          j(E(to), {
            class: "h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]",
            "aria-hidden": "true"
          }),
          Ae(" " + A(e.chooseLabel), 1)
        ], 10, r5),
        u("span", {
          class: "min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100",
          title: d.value || void 0
        }, A(d.value), 9, l5),
        l.value && !e.disabled ? (m(), _("button", {
          key: 0,
          type: "button",
          class: "inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100",
          "aria-label": e.clearAriaLabel,
          onClick: w
        }, [
          j(E(ao), {
            class: "h-4 w-4",
            "aria-hidden": "true"
          })
        ], 8, c5)) : V("", !0)
      ], 2)),
      e.errorText ? (m(), _("p", {
        key: 3,
        id: i.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, k5)) : V("", !0)
    ]));
  }
}), C5 = ["for"], $5 = { class: "flex w-full min-w-0 items-center gap-3" }, S5 = ["for", "aria-label"], M5 = ["src"], D5 = ["id", "accept", "disabled"], A5 = ["id", "value", "placeholder", "disabled"], T5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = se(!1), s = se(null), i = `kiut-image-upload-circle-${Ne()}`, r = C(() => a.id ?? i), l = C(() => `${r.value}-url`), c = C(() => a.size === "sm" ? "h-10 w-10" : a.size === "lg" ? "h-16 w-16" : "h-12 w-12"), d = C(() => a.size === "sm" ? "h-4 w-4" : a.size === "lg" ? "h-6 w-6" : "h-5 w-5"), h = C(() => !a.disabled && !a.loading);
    Ee(
      () => a.modelValue,
      () => {
        o.value = !1;
      }
    );
    function f(g) {
      const b = g.target, y = b.files?.[0];
      y && n("select", y), b.value = "";
    }
    function p(g) {
      n("update:modelValue", g.target.value);
    }
    return (g, b) => (m(), _("div", gt({ class: "font-sans flex w-full flex-col gap-2" }, g.$attrs), [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: J(E(ot))
      }, A(e.label), 11, C5)) : V("", !0),
      u("div", $5, [
        u("label", {
          for: r.value,
          class: J(["relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40", [
            c.value,
            h.value ? "cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]" : "cursor-not-allowed opacity-60"
          ]]),
          "aria-label": e.uploadAriaLabel
        }, [
          e.modelValue && !o.value && !e.loading ? (m(), _("img", {
            key: 0,
            src: e.modelValue,
            alt: "",
            class: "h-full w-full object-cover",
            onError: b[0] || (b[0] = (y) => o.value = !0)
          }, null, 40, M5)) : e.loading ? (m(), ae(E(zm), {
            key: 1,
            class: J([d.value, "animate-spin text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"])) : (m(), ae(E(to), {
            key: 2,
            class: J([d.value, "text-[color:var(--kiut-primary)]"]),
            "aria-hidden": "true"
          }, null, 8, ["class"]))
        ], 10, S5),
        u("input", {
          id: r.value,
          ref_key: "fileInputRef",
          ref: s,
          type: "file",
          class: "sr-only focus:outline-none focus:ring-0",
          accept: e.accept,
          disabled: e.disabled || e.loading,
          onChange: f
        }, null, 40, D5),
        e.showUrlInput ? (m(), _("div", {
          key: 0,
          class: J(["min-w-0 flex-1 basis-0", e.urlInputClass])
        }, [
          u("input", {
            id: l.value,
            type: "text",
            autocomplete: "off",
            value: e.modelValue,
            placeholder: e.urlPlaceholder,
            disabled: e.disabled,
            class: J([E(at), "w-full min-w-0"]),
            onInput: p
          }, null, 42, A5)
        ], 2)) : V("", !0)
      ])
    ], 16));
  }
}), B5 = { class: "font-sans" }, L5 = ["for"], E5 = { class: "relative" }, R5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], P5 = ["id"], I5 = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-datetime-${Ne()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => a.modelValue ?? "");
    function l(c) {
      const d = c.target.value;
      n("update:modelValue", d === "" ? null : d);
    }
    return (c, d) => (m(), _("div", B5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: J(E(ot))
      }, A(e.label), 11, L5)) : V("", !0),
      u("div", E5, [
        j(E(Mo), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: s.value,
          value: r.value,
          type: "datetime-local",
          autocomplete: "off",
          class: J([
            E(at),
            "pl-10",
            e.invalid ? E(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? i.value : void 0,
          onInput: l
        }, null, 42, R5)
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, P5)) : V("", !0)
    ]));
  }
}), F5 = { class: "font-sans" }, O5 = ["for"], V5 = { class: "relative" }, z5 = ["id", "value", "name", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], N5 = ["id"], j5 = /* @__PURE__ */ ue({
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
    const o = e, s = t, i = `kiut-input-time-${Ne()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => o.modelValue == null || o.modelValue === "" ? "" : a(o.modelValue) ?? "");
    function d(h) {
      const f = h.target.value;
      s("update:modelValue", n(f));
    }
    return (h, f) => (m(), _("div", F5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: J(E(ot))
      }, A(e.label), 11, O5)) : V("", !0),
      u("div", V5, [
        j(E(jm), {
          class: "pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("input", {
          id: r.value,
          value: c.value,
          type: "time",
          autocomplete: "off",
          class: J([
            E(at),
            "pl-10",
            e.invalid ? E(Dt) : ""
          ]),
          name: e.name,
          disabled: e.disabled,
          min: e.min,
          max: e.max,
          step: e.step,
          "aria-invalid": e.invalid ? "true" : void 0,
          "aria-describedby": e.errorText ? l.value : void 0,
          onInput: d
        }, null, 42, z5)
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, N5)) : V("", !0)
    ]));
  }
}), H5 = { class: "font-sans" }, W5 = ["for"], K5 = {
  key: 0,
  class: "order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, Y5 = ["id", "value", "min", "max", "step", "disabled", "aria-orientation", "aria-invalid", "aria-describedby"], U5 = {
  key: 1,
  class: "text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, q5 = {
  key: 2,
  class: "grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, X5 = { class: "min-w-0 text-left leading-snug" }, G5 = { class: "max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug" }, Z5 = { class: "min-w-0 text-right leading-snug" }, Q5 = {
  key: 3,
  class: "order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, J5 = {
  key: 4,
  class: "order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
}, eC = ["id"], tC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-range-${Ne()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
      const p = [];
      return a.errorText && p.push(i.value), p.length ? p.join(" ") : void 0;
    }), l = C(
      () => !!(a.caption && !a.captionMin && !a.captionMax)
    ), c = C(() => !!(a.captionMin || a.captionMax)), d = C(() => {
      const { min: p, max: g, modelValue: b } = a;
      if (g === p) return 0;
      const y = (b - p) / (g - p);
      return Math.min(100, Math.max(0, y * 100));
    }), h = C(() => ({
      "--kiut-range-fill": `${d.value}%`,
      "--kiut-range-length": a.trackLength
    }));
    function f(p) {
      const g = Number(p.target.value);
      n("update:modelValue", Number.isNaN(g) ? a.min : g);
    }
    return (p, g) => (m(), _("div", H5, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: J(E(ot))
      }, A(e.label), 11, W5)) : V("", !0),
      u("div", {
        class: J(["flex flex-col items-center gap-2", (e.orientation === "vertical", "w-full")])
      }, [
        e.orientation === "vertical" && e.captionMax ? (m(), _("p", K5, A(e.captionMax), 1)) : V("", !0),
        u("div", {
          class: J(["flex items-center justify-center", [
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
            class: J([
              "kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "dark:[--kiut-range-track:#282836] dark:[--kiut-range-thumb-bg:#282836] dark:[--kiut-range-thumb-shadow:none]",
              e.orientation === "vertical" ? "kiut-range-input--vertical" : "kiut-range-input--horizontal w-full"
            ]),
            onInput: f
          }, null, 42, Y5)
        ], 6),
        e.orientation === "horizontal" && l.value ? (m(), _("p", U5, A(e.caption), 1)) : e.orientation === "horizontal" && c.value ? (m(), _("div", q5, [
          u("span", X5, A(e.captionMin), 1),
          u("span", G5, A(e.caption), 1),
          u("span", Z5, A(e.captionMax), 1)
        ])) : V("", !0),
        e.orientation === "vertical" && e.captionMin ? (m(), _("p", Q5, A(e.captionMin), 1)) : V("", !0),
        e.orientation === "vertical" && e.caption ? (m(), _("p", J5, A(e.caption), 1)) : V("", !0)
      ], 2),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, eC)) : V("", !0)
    ]));
  }
}), aC = /* @__PURE__ */ pe(tC, [["__scopeId", "data-v-ce7263e4"]]), nC = { class: "font-sans" }, oC = ["for"], sC = ["id", "value", "placeholder", "disabled", "min", "max", "step", "aria-invalid", "aria-describedby"], iC = ["id"], rC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-input-number-${Ne()}`, s = C(() => a.id ?? o), i = C(() => `${s.value}-err`), r = C(() => {
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
    return (d, h) => (m(), _("div", nC, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: J(E(ot))
      }, A(e.label), 11, oC)) : V("", !0),
      u("input", {
        id: s.value,
        value: l.value,
        type: "number",
        onInput: c,
        class: J([
          E(at),
          e.invalid ? E(Dt) : "",
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
      }, null, 42, sC),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, iC)) : V("", !0)
    ]));
  }
}), lC = { class: "font-sans" }, cC = ["for"], dC = ["id", "value", "disabled", "aria-invalid", "aria-describedby"], uC = ["disabled"], hC = ["id"], fC = "#3b82f6", gC = "#aabbcc", mC = "flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]", pC = /* @__PURE__ */ ue({
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
      const b = g.trim(), y = /^#?([0-9a-fA-F]{6})$/.exec(b);
      if (y) return `#${y[1].toLowerCase()}`;
      const v = /^#?([0-9a-fA-F]{3})$/.exec(b);
      if (v) {
        const [x, k, w] = v[1].split("");
        return `#${x}${x}${k}${k}${w}${w}`.toLowerCase();
      }
      return null;
    }
    function n(g) {
      return a(g) ?? fC;
    }
    const o = e, s = t, i = `kiut-input-color-${Ne()}`, r = C(() => o.id ?? i), l = C(() => `${r.value}-err`), c = C(() => n(o.modelValue)), d = se(c.value), h = se(!1);
    Ee(c, (g) => {
      h.value || (d.value = g);
    });
    function f(g) {
      const b = g.target, y = a(b.value);
      y && s("update:modelValue", y);
    }
    function p() {
      h.value = !1;
      const g = a(d.value);
      g ? (d.value = g, s("update:modelValue", g)) : d.value = c.value;
    }
    return Ee(d, (g) => {
      if (!h.value) return;
      const b = a(g);
      b && s("update:modelValue", b);
    }), (g, b) => (m(), _("div", lC, [
      e.label ? (m(), _("label", {
        key: 0,
        for: r.value,
        class: J(E(ot))
      }, A(e.label), 11, cC)) : V("", !0),
      u("div", {
        class: J([
          mC,
          e.invalid ? E(Dt) : "",
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
        }, null, 40, dC),
        e.showHexInput ? Ge((m(), _("input", {
          key: 0,
          "onUpdate:modelValue": b[0] || (b[0] = (y) => d.value = y),
          type: "text",
          disabled: e.disabled,
          autocomplete: "off",
          spellcheck: "false",
          "aria-label": "Código hexadecimal del color",
          class: "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500",
          placeholder: gC,
          onFocus: b[1] || (b[1] = (y) => h.value = !0),
          onBlur: p
        }, null, 40, uC)), [
          [Wt, d.value]
        ]) : V("", !0)
      ], 2),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: l.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, hC)) : V("", !0)
    ]));
  }
}), $r = {
  smileys: "Smileys",
  gestures: "Gestos",
  symbols: "Símbolos",
  travel: "Viajes",
  objects: "Objetos"
}, Sr = [
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
function bC(e, t) {
  return e.char.includes(t) ? !0 : e.terms?.some((a) => a.toLowerCase().includes(t)) ?? !1;
}
function vC(e, t, a) {
  const n = a.trim().toLowerCase();
  return n ? e.map((o) => {
    const s = t[o.id]?.toLowerCase().includes(n) || o.id.includes(n), i = o.emojis.filter(
      (r) => s || bC(r, n)
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
function h4(e) {
  const t = {
    ...$r,
    ...e
  };
  return Sr.map((a) => ({
    id: a.id,
    label: t[a.id],
    emojis: a.emojis.map((n) => n.char)
  }));
}
function yC(e) {
  return e ? e.match(new RegExp("\\p{Extended_Pictographic}(\\u200d\\p{Extended_Pictographic})*", "gu")) ?? [] : [];
}
function xC(e, t) {
  return `${e}${t}`;
}
const _C = ["disabled", "aria-expanded", "aria-label"], kC = {
  class: "inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400",
  "aria-hidden": "true"
}, wC = {
  key: 0,
  class: "truncate text-sm"
}, CC = ["aria-label"], $C = { class: "border-b border-gray-200/80 p-3 dark:border-white/10" }, SC = ["disabled", "placeholder", "aria-label"], MC = { class: "min-h-0 flex-1 space-y-4 overflow-y-auto p-3" }, DC = { class: "mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500" }, AC = { class: "grid grid-cols-8 gap-0.5" }, TC = ["disabled", "aria-label", "onClick"], BC = { class: "text-[1.35rem] leading-none" }, LC = {
  key: 1,
  class: "py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, EC = {
  key: 0,
  class: "border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
}, RC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-emoji-picker-${Ne()}`, s = `${o}-btn`, i = `${o}-panel`, r = se(null), l = se(null), c = se(null), d = se(null), h = se(!1), f = se(""), p = se({}), g = C(
      () => a.ariaLabelTrigger ?? a.triggerLabel ?? a.ariaLabel
    ), b = C(() => ({
      ...$r,
      ...a.categoryLabels
    })), y = C(() => new Set(yC(a.draft))), v = C(() => {
      if (a.categories?.length) {
        const B = f.value.trim().toLowerCase();
        return B ? a.categories.map((N) => ({
          ...N,
          emojis: N.emojis.filter((W) => W.includes(B) || N.label.toLowerCase().includes(B) ? !0 : N.id.toLowerCase().includes(B))
        })).filter((N) => N.emojis.length > 0) : a.categories;
      }
      return vC(
        Sr,
        b.value,
        f.value
      );
    });
    function x() {
      const B = l.value;
      if (!B) return;
      const N = B.getBoundingClientRect(), W = 320, q = 8, ee = 8;
      let X = N.right - W;
      X < ee && (X = N.left), X + W > window.innerWidth - ee && (X = Math.max(ee, window.innerWidth - W - ee));
      const le = Math.max(160, N.top - q - ee);
      p.value = {
        bottom: `${window.innerHeight - N.top + q}px`,
        left: `${X}px`,
        width: `${W}px`,
        maxHeight: `${le}px`
      };
    }
    function k(B) {
      const N = "flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5";
      return y.value.has(B) ? `${N} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25` : N;
    }
    function w(B) {
      if (a.disabled) return;
      const N = xC(a.draft ?? "", B);
      n("update:draft", N), n("select", B);
    }
    function $() {
      f.value = "", n("open"), He(() => {
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
    function R(B) {
      B.stopPropagation(), S();
    }
    function P(B) {
      if (!h.value) return;
      const N = B.target, W = r.value, q = c.value;
      W && !W.contains(N) && (!q || !q.contains(N)) && D();
    }
    function I(B) {
      a.disabled || ((B.key === "ArrowDown" || B.key === "Enter" || B.key === " ") && (B.preventDefault(), h.value || (h.value = !0, $())), B.key === "Escape" && h.value && (B.preventDefault(), D()));
    }
    function M(B) {
      B.key === "Escape" && (B.preventDefault(), D());
    }
    function L() {
      h.value && x();
    }
    return Ze(() => {
      document.addEventListener("click", P), window.addEventListener("resize", L), window.addEventListener("scroll", L, !0);
    }), ct(() => {
      document.removeEventListener("click", P), window.removeEventListener("resize", L), window.removeEventListener("scroll", L, !0);
    }), (B, N) => (m(), _("div", {
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
        class: J([
          E(at),
          "inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2",
          e.triggerLabel ? "min-w-[9rem]" : "min-w-[2.75rem]",
          h.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": h.value,
        "aria-haspopup": "dialog",
        "aria-controls": i,
        "aria-label": g.value,
        onClick: R,
        onKeydown: I
      }, [
        u("span", kC, [
          ke(B.$slots, "icon", {}, () => [
            j(E(Km), { class: "h-5 w-5" })
          ])
        ]),
        e.triggerLabel ? (m(), _("span", wC, A(e.triggerLabel), 1)) : V("", !0),
        e.triggerLabel ? (m(), ae(E(Gt), {
          key: 1,
          class: J(["h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", h.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])) : V("", !0)
      ], 42, _C),
      (m(), ae(la, { to: "body" }, [
        Ge(u("div", {
          ref_key: "panelRef",
          ref: c,
          id: i,
          role: "dialog",
          "aria-label": e.ariaLabel,
          style: Ce(p.value),
          class: "fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]",
          onClick: N[2] || (N[2] = Oe(() => {
          }, ["stop"])),
          onKeydown: Oe(M, ["stop"])
        }, [
          u("div", $C, [
            Ge(u("input", {
              ref_key: "searchInputRef",
              ref: d,
              "onUpdate:modelValue": N[0] || (N[0] = (W) => f.value = W),
              type: "search",
              disabled: e.disabled,
              placeholder: e.searchPlaceholder,
              "aria-label": e.searchPlaceholder,
              autocomplete: "off",
              spellcheck: "false",
              class: "min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500",
              onClick: N[1] || (N[1] = Oe(() => {
              }, ["stop"]))
            }, null, 8, SC), [
              [Wt, f.value]
            ])
          ]),
          u("div", MC, [
            v.value.length > 0 ? (m(!0), _(ce, { key: 0 }, me(v.value, (W) => (m(), _("section", {
              key: W.id
            }, [
              u("h3", DC, A(W.label), 1),
              u("div", AC, [
                (m(!0), _(ce, null, me(W.emojis, (q) => (m(), _("button", {
                  key: `${W.id}-${q}`,
                  type: "button",
                  disabled: e.disabled,
                  "aria-label": `Add ${q} to input`,
                  class: J(k(q)),
                  onClick: Oe((ee) => w(q), ["stop"])
                }, [
                  u("span", BC, A(q), 1)
                ], 10, TC))), 128))
              ])
            ]))), 128)) : (m(), _("p", LC, A(e.emptySearchText), 1))
          ]),
          e.hint ? (m(), _("p", EC, A(e.hint), 1)) : V("", !0)
        ], 44, CC), [
          [Ut, h.value]
        ])
      ]))
    ], 512));
  }
}), PC = ["disabled", "aria-expanded", "aria-labelledby", "aria-label"], IC = { class: "min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5" }, FC = {
  key: 0,
  class: "block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
}, OC = {
  key: 1,
  class: "flex flex-wrap gap-1"
}, VC = { class: "truncate" }, zC = ["aria-selected", "onClick", "onMouseenter"], NC = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, jC = { class: "min-w-0 flex-1" }, HC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-multiselect-${Ne()}`, s = `${o}-label`, i = `${o}-btn`, r = `${o}-listbox`, l = se(null), c = se(null), d = se(!1), h = se(0), f = C(() => a.options.filter((I) => !I.disabled)), p = C(() => new Set(a.modelValue ?? [])), g = C(
      () => a.options.filter((I) => p.value.has(I.value))
    ), b = C(() => {
      const I = a.ariaLabelTrigger ?? a.placeholder ?? "Seleccionar opciones", M = g.value.length;
      return M === 0 ? I : `${I}, ${M} seleccionada${M === 1 ? "" : "s"}`;
    });
    function y(I) {
      return `${String(I.value)}-${I.label}`;
    }
    function v(I) {
      return p.value.has(I.value);
    }
    function x(I, M) {
      const L = v(I), B = h.value === M;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        L ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !L && B ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function k(I) {
      const M = [...a.modelValue ?? []], L = M.indexOf(I.value);
      L >= 0 ? M.splice(L, 1) : M.push(I.value), n("update:modelValue", M);
    }
    function w() {
      const I = f.value;
      if (I.length === 0) {
        h.value = 0;
        return;
      }
      const M = p.value, L = I.findIndex((B) => M.has(B.value));
      h.value = L >= 0 ? L : 0;
    }
    function $() {
      a.disabled || (d.value = !d.value);
    }
    function D(I) {
      I.stopPropagation(), !a.disabled && ($(), d.value && (w(), He(() => c.value?.focus())));
    }
    function S(I) {
      if (!d.value) return;
      const M = l.value;
      M && !M.contains(I.target) && (d.value = !1);
    }
    function R(I) {
      a.disabled || (I.key === "ArrowDown" || I.key === "Enter" || I.key === " ") && (I.preventDefault(), d.value || (d.value = !0, w(), He(() => c.value?.focus())));
    }
    function P(I) {
      const M = f.value;
      if (M.length !== 0) {
        if (I.key === "Escape") {
          I.preventDefault(), d.value = !1;
          return;
        }
        if (I.key === "ArrowDown") {
          I.preventDefault(), h.value = Math.min(h.value + 1, M.length - 1);
          return;
        }
        if (I.key === "ArrowUp") {
          I.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (I.key === "Enter" || I.key === " ") {
          I.preventDefault();
          const L = M[h.value];
          L && k(L);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", S);
    }), ct(() => {
      document.removeEventListener("click", S);
    }), (I, M) => (m(), _("div", {
      ref_key: "rootRef",
      ref: l,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: J(E(ot))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        id: i,
        type: "button",
        disabled: e.disabled,
        class: J([
          E(at),
          "flex items-start justify-between gap-2 text-left",
          d.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": r,
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : b.value,
        onClick: D,
        onKeydown: R
      }, [
        u("div", IC, [
          g.value.length === 0 ? (m(), _("span", FC, A(e.placeholder), 1)) : (m(), _("div", OC, [
            (m(!0), _(ce, null, me(g.value, (L) => (m(), _("span", {
              key: y(L),
              class: "inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
            }, [
              u("span", VC, A(L.label), 1)
            ]))), 128))
          ]))
        ]),
        j(E(Gt), {
          class: J(["mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, PC),
      Ge(u("ul", {
        id: r,
        ref_key: "listRef",
        ref: c,
        role: "listbox",
        tabindex: "-1",
        "aria-multiselectable": "true",
        class: "absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]",
        onKeydown: Oe(P, ["stop"])
      }, [
        (m(!0), _(ce, null, me(f.value, (L, B) => (m(), _("li", {
          key: y(L),
          role: "option",
          "aria-selected": v(L),
          class: J(x(L, B)),
          onClick: Oe((N) => k(L), ["stop"]),
          onMouseenter: (N) => h.value = B
        }, [
          u("span", NC, [
            v(L) ? (m(), ae(E(Do), {
              key: 0,
              class: "h-4 w-4 text-white"
            })) : V("", !0)
          ]),
          u("span", jC, A(L.label), 1)
        ], 42, zC))), 128))
      ], 544), [
        [Ut, d.value]
      ])
    ], 512));
  }
}), WC = { class: "font-sans" }, KC = ["for"], YC = { class: "flex gap-2" }, UC = { class: "w-[7.5rem] shrink-0" }, qC = { class: "min-w-0 flex-1" }, XC = ["id", "placeholder", "disabled", "aria-invalid", "aria-describedby"], GC = ["id"], ZC = /* @__PURE__ */ ue({
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
    const a = e, n = t, o = `kiut-phone-${Ne()}`, s = C(() => a.id ?? `${o}-num`), i = C(() => `${s.value}-err`), r = C({
      get: () => a.modelValue.prefix,
      set: (c) => n("update:modelValue", { ...a.modelValue, prefix: c })
    }), l = C({
      get: () => a.modelValue.number,
      set: (c) => n("update:modelValue", { ...a.modelValue, number: c })
    });
    return (c, d) => (m(), _("div", WC, [
      e.label ? (m(), _("label", {
        key: 0,
        for: s.value,
        class: J(E(ot))
      }, A(e.label), 11, KC)) : V("", !0),
      u("div", YC, [
        u("div", UC, [
          j(An, {
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (h) => r.value = h),
            "aria-label-trigger": "Prefijo telefónico",
            options: e.prefixOptions,
            placeholder: e.prefixPlaceholder,
            disabled: e.disabled,
            "show-option-check": !1
          }, null, 8, ["modelValue", "options", "placeholder", "disabled"])
        ]),
        u("div", qC, [
          Ge(u("input", {
            id: s.value,
            "onUpdate:modelValue": d[1] || (d[1] = (h) => l.value = h),
            type: "tel",
            inputmode: "numeric",
            autocomplete: "tel-national",
            class: J([E(at), e.invalid ? E(Dt) : ""]),
            placeholder: e.numberPlaceholder,
            disabled: e.disabled,
            "aria-invalid": e.invalid ? "true" : void 0,
            "aria-describedby": e.errorText ? i.value : void 0
          }, null, 10, XC), [
            [Wt, l.value]
          ])
        ])
      ]),
      e.errorText ? (m(), _("p", {
        key: 1,
        id: i.value,
        class: J(E(At)),
        role: "alert"
      }, A(e.errorText), 11, GC)) : V("", !0)
    ]));
  }
}), QC = ["role", "aria-label"], JC = { class: "flex flex-wrap gap-2" }, e$ = ["aria-checked", "role", "onClick"], t$ = { class: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]" }, a$ = {
  key: 0,
  class: "h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
}, n$ = { class: "text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100" }, o$ = /* @__PURE__ */ ue({
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
    return (l, c) => (m(), _("div", {
      class: "font-sans",
      role: e.multiple ? "group" : "radiogroup",
      "aria-label": e.ariaLabel
    }, [
      u("div", JC, [
        (m(!0), _(ce, null, me(e.items, (d) => (m(), _("button", {
          key: d.value,
          type: "button",
          class: J(i(d)),
          "aria-checked": s(d),
          role: e.multiple ? "checkbox" : "radio",
          onClick: (h) => r(d)
        }, [
          u("span", t$, [
            s(d) ? (m(), _("span", a$)) : V("", !0)
          ]),
          d.dotColor ? (m(), _("span", {
            key: 0,
            class: "h-2 w-2 shrink-0 rounded-full",
            style: Ce({ backgroundColor: d.dotColor }),
            "aria-hidden": "true"
          }, null, 4)) : V("", !0),
          u("span", n$, A(d.label), 1)
        ], 10, e$))), 128))
      ])
    ], 8, QC));
  }
}), s$ = ["aria-label"], i$ = ["id", "aria-selected", "aria-disabled", "tabindex", "onClick", "onKeydown"], r$ = { class: "truncate px-3 py-2 text-sm font-medium" }, l$ = /* @__PURE__ */ ue({
  name: "SegmentedControl",
  __name: "SegmentedControl",
  props: {
    items: {},
    modelValue: {},
    ariaLabel: { default: "Segmented control" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const a = e, n = t, o = `kiut-seg-${Ne()}`, s = (b) => `${o}-seg-${b}`, i = se([]);
    function r(b, y) {
      b instanceof HTMLButtonElement ? i.value[y] = b : i.value[y] = null;
    }
    function l(b) {
      return b.value === a.modelValue;
    }
    function c(b) {
      const y = l(b), v = "flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]";
      return b.disabled ? `${v} cursor-not-allowed opacity-40` : y ? `${v} bg-[color:var(--kiut-primary)] text-white shadow-sm` : `${v} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
    }
    function d(b) {
      b.disabled || b.value !== a.modelValue && n("update:modelValue", b.value);
    }
    function h(b, y, v) {
      d(b), He(() => i.value[y]?.focus());
    }
    const f = C(
      () => a.items.map((b, y) => b.disabled ? -1 : y).filter((b) => b >= 0)
    );
    function p(b, y) {
      const v = a.items.length;
      if (v === 0) return 0;
      let x = b;
      for (let k = 0; k < v; k++)
        if (x = (x + y + v) % v, !a.items[x]?.disabled) return x;
      return b;
    }
    function g(b, y) {
      if (b.key === "ArrowRight" || b.key === "ArrowDown") {
        b.preventDefault();
        const v = p(y, 1), x = a.items[v];
        x && d(x), He(() => i.value[v]?.focus());
      } else if (b.key === "ArrowLeft" || b.key === "ArrowUp") {
        b.preventDefault();
        const v = p(y, -1), x = a.items[v];
        x && d(x), He(() => i.value[v]?.focus());
      } else if (b.key === "Home") {
        b.preventDefault();
        const v = f.value[0];
        if (v !== void 0) {
          const x = a.items[v];
          x && d(x), He(() => i.value[v]?.focus());
        }
      } else if (b.key === "End") {
        b.preventDefault();
        const v = f.value[f.value.length - 1];
        if (v !== void 0) {
          const x = a.items[v];
          x && d(x), He(() => i.value[v]?.focus());
        }
      }
    }
    return (b, y) => (m(), _("div", {
      role: "tablist",
      "aria-label": e.ariaLabel,
      class: "inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-[color:var(--kiut-border-light)]"
    }, [
      (m(!0), _(ce, null, me(e.items, (v, x) => (m(), _("button", {
        id: s(v.value),
        key: v.value,
        ref_for: !0,
        ref: (k) => r(k, x),
        type: "button",
        role: "tab",
        "aria-selected": l(v),
        "aria-disabled": v.disabled === !0,
        tabindex: l(v) ? 0 : -1,
        class: J(c(v)),
        onClick: (k) => h(v, x),
        onKeydown: (k) => g(k, x)
      }, [
        u("span", r$, A(v.label), 1)
      ], 42, i$))), 128))
    ], 8, s$));
  }
}), c$ = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
}, d$ = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}, u$ = {
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
}, h$ = {
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
}, f$ = [
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
function g$(e = "en") {
  return c$[e];
}
function Mr(e = "en") {
  return f$.map((t) => ({ id: t, label: h$[e][t] }));
}
function m$(e = "en") {
  return "Presets";
}
Mr("es");
function Je(e) {
  const [t, a, n] = e.split("-").map(Number);
  return new Date(t, a - 1, n);
}
function rt(e) {
  const t = e.getFullYear(), a = String(e.getMonth() + 1).padStart(2, "0"), n = String(e.getDate()).padStart(2, "0");
  return `${t}-${a}-${n}`;
}
function je(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function Pt(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function qa(e, t) {
  return new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
}
function p$(e, t) {
  const a = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
  return je(a);
}
function Ta(e, t) {
  return p$(e, -t);
}
function b$(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function Dr(e, t = /* @__PURE__ */ new Date()) {
  const a = je(t);
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
      return { start: Pt(a), end: a };
    case "lastMonth": {
      const n = Pt(qa(a, -1));
      return { start: n, end: b$(n) };
    }
    case "yearToDate":
      return { start: new Date(a.getFullYear(), 0, 1), end: a };
  }
}
function Ar(e, t, a) {
  let n = je(e.start), o = je(e.end);
  if (t) {
    const s = je(Je(t));
    Yt(n, s) && (n = s), Yt(o, s) && (o = s);
  }
  if (a) {
    const s = je(Je(a));
    Kn(n, s) && (n = s), Kn(o, s) && (o = s);
  }
  return Kn(n, o) ? { start: o, end: n } : { start: n, end: o };
}
function v$(e, t, a = /* @__PURE__ */ new Date(), n, o) {
  if (!e.start || !e.end) return !1;
  const s = Ar(Dr(t, a), n, o);
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
function Kn(e, t) {
  return Za(e, t) > 0;
}
function Tr(e, t) {
  return Za(e, t) >= 0;
}
function Br(e, t) {
  return Za(e, t) <= 0;
}
function Lr(e) {
  const t = e.getFullYear(), a = e.getMonth(), n = new Date(t, a, 1), o = new Date(n);
  o.setDate(n.getDate() - n.getDay());
  const s = [], i = new Date(o);
  for (let r = 0; r < 42; r++)
    s.push(new Date(i)), i.setDate(i.getDate() + 1);
  return s;
}
function wn(e, t = "en") {
  return `${d$[t][e.getMonth()]} ${String(e.getDate()).padStart(2, "0")}`;
}
function Ht(e, t = "en") {
  return `${u$[t][e.getMonth()]} ${e.getFullYear()}`;
}
const y$ = ["aria-expanded", "aria-labelledby", "aria-label"], x$ = ["onKeydown"], _$ = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, k$ = { class: "mb-4 flex items-center justify-between gap-2" }, w$ = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, C$ = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, $$ = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, S$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, M$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, D$ = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, A$ = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, T$ = { class: "grid grid-cols-7 gap-y-2 mt-2" }, B$ = ["disabled", "onClick"], L$ = "rounded-lg text-[#61616b]", E$ = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", R$ = "opacity-30", P$ = "bg-[#6b35e9] font-medium text-white", I$ = "bg-[#895af6] font-semibold text-white", F$ = /* @__PURE__ */ ue({
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
    const a = e, n = t, s = `${`kiut-drp-${Ne()}`}-lbl`, i = se(null), r = se(null), l = se(!1), c = se(null), d = se(Pt(/* @__PURE__ */ new Date())), h = C(() => !!(a.modelValue.start && a.modelValue.end)), f = C(() => {
      const M = Pt(d.value);
      return [M, qa(M, 1)];
    }), p = C(() => a.ariaLabel ?? a.placeholder), g = C(() => {
      const M = "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
      return a.panelAlign === "end" ? `right-0 left-auto ${M}` : `left-0 right-auto ${M}`;
    }), b = C(
      () => `${Ht(f.value[0])} – ${Ht(f.value[1])}`
    ), y = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], v = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return a.placeholder;
      const M = Je(a.modelValue.start), L = Je(a.modelValue.end);
      return `${wn(M)} – ${wn(L)}`;
    });
    function x(M, L) {
      return M.getMonth() === L.getMonth() && M.getFullYear() === L.getFullYear();
    }
    function k(M) {
      const L = je(M);
      if (a.minDate) {
        const B = je(Je(a.minDate));
        if (Yt(L, B)) return !0;
      }
      if (a.maxDate) {
        const B = je(Je(a.maxDate));
        if (Yt(B, L)) return !0;
      }
      return !1;
    }
    function w(M, L, B) {
      const N = jt(M, L), W = jt(M, B);
      if (N && W) return "rounded-lg";
      const q = N || M.getDay() === 0, ee = W || M.getDay() === 6;
      return q && ee ? "rounded-lg" : q ? "rounded-l-lg" : ee ? "rounded-r-lg" : "rounded-none";
    }
    function $(M, L) {
      const B = x(L, M), N = k(L), W = a.modelValue.start ? je(Je(a.modelValue.start)) : null, q = a.modelValue.end ? je(Je(a.modelValue.end)) : null, ee = je(L);
      if (N)
        return L$;
      let X = E$;
      if (W && q && Tr(ee, W) && Br(ee, q)) {
        const U = jt(ee, W), T = jt(ee, q);
        X = `${w(ee, W, q)} ${U || T ? I$ : P$}`;
      }
      return B || (X = `${X} ${R$}`), X;
    }
    function D(M) {
      if (k(M)) return;
      const L = je(M);
      if (!c.value) {
        c.value = new Date(L), n("update:modelValue", { start: rt(L), end: rt(L) });
        return;
      }
      let N = je(c.value), W = new Date(L);
      Yt(W, N) && ([N, W] = [W, N]), n("update:modelValue", { start: rt(N), end: rt(W) }), c.value = null, l.value = !1;
    }
    function S(M) {
      d.value = qa(d.value, M);
    }
    function R() {
      l.value = !1;
    }
    function P(M) {
      if (M?.stopPropagation(), !l.value) {
        if (l.value = !0, c.value = null, a.modelValue.start)
          try {
            d.value = Pt(Je(a.modelValue.start));
          } catch {
          }
        He(() => r.value?.focus());
      }
    }
    function I(M) {
      if (!l.value) return;
      const L = i.value;
      L && !L.contains(M.target) && (l.value = !1);
    }
    return Ee(l, (M) => {
      M && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", I);
    }), ct(() => {
      document.removeEventListener("click", I);
    }), (M, L) => (m(), _("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: J(E(ot))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: J([
          E(at),
          "flex w-full items-center gap-2 text-left",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : p.value,
        onFocus: P,
        onClick: P
      }, [
        j(E(Mo), {
          class: "h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          ])
        }, A(v.value), 3)
      ], 42, y$),
      Ge(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": "Calendario de rango",
        class: J([
          g.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Oa(Oe(R, ["stop"]), ["escape"])
      }, [
        u("div", _$, [
          u("div", k$, [
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes anterior",
              onClick: L[0] || (L[0] = (B) => S(-1))
            }, [
              j(E(lr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ]),
            u("div", w$, [
              u("span", C$, A(b.value), 1),
              u("div", $$, [
                u("span", S$, A(E(Ht)(f.value[0])), 1),
                u("span", M$, A(E(Ht)(f.value[1])), 1)
              ])
            ]),
            u("button", {
              type: "button",
              class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
              "aria-label": "Mes siguiente",
              onClick: L[1] || (L[1] = (B) => S(1))
            }, [
              j(E(cr), {
                class: "h-4 w-4",
                "aria-hidden": "true"
              })
            ])
          ]),
          u("div", D$, [
            (m(!0), _(ce, null, me(f.value, (B) => (m(), _("div", {
              key: `${B.getFullYear()}-${B.getMonth()}`,
              class: "w-full max-w-[252px] shrink-0"
            }, [
              u("div", A$, [
                (m(), _(ce, null, me(y, (N) => u("span", { key: N }, A(N), 1)), 64))
              ]),
              u("div", T$, [
                (m(!0), _(ce, null, me(E(Lr)(B), (N) => (m(), _("button", {
                  key: E(rt)(N),
                  type: "button",
                  disabled: k(N),
                  class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", $(B, N)]),
                  onClick: (W) => D(N)
                }, A(N.getDate()), 11, B$))), 128))
              ])
            ]))), 128))
          ])
        ])
      ], 42, x$), [
        [Ut, l.value]
      ])
    ], 512));
  }
}), O$ = ["aria-expanded", "aria-labelledby", "aria-label"], V$ = ["aria-label", "onKeydown"], z$ = { class: "flex flex-col sm:flex-row" }, N$ = ["aria-label"], j$ = { class: "px-2 pt-1 pb-1.5 text-[10px] font-semibold uppercase dark:text-[#61616b] text-[#e3e3e8]" }, H$ = { class: "flex flex-col gap-0.5" }, W$ = ["onClick"], K$ = { class: "min-w-0 flex-1 overflow-x-hidden p-3" }, Y$ = { class: "mb-4 flex items-center justify-between gap-2" }, U$ = ["aria-label"], q$ = { class: "flex min-w-0 flex-1 justify-center text-center text-[#61616b] dark:text-[#e3e3e8]" }, X$ = { class: "min-w-0 truncate px-1 text-sm font-medium sm:hidden" }, G$ = { class: "hidden min-w-0 flex-1 justify-center gap-4 sm:flex" }, Z$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, Q$ = { class: "w-[252px] min-w-0 truncate text-sm font-medium" }, J$ = ["aria-label"], eS = { class: "flex flex-col items-center gap-4 sm:flex-row sm:items-start" }, tS = { class: "mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]" }, aS = { class: "grid grid-cols-7 gap-y-2 mt-2" }, nS = ["disabled", "onClick"], oS = "rounded-lg text-[#61616b]", sS = "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white", iS = "opacity-30", rS = "bg-[#6b35e9] font-medium text-white", lS = "bg-[#895af6] font-semibold text-white", cS = /* @__PURE__ */ ue({
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
    const a = e, n = t, s = `${`kiut-dpp-${Ne()}`}-lbl`, i = se(null), r = se(null), l = se(!1), c = se(null), d = se(Pt(/* @__PURE__ */ new Date())), h = C(() => !!(a.modelValue.start && a.modelValue.end)), f = C(() => {
      const U = Pt(d.value);
      return [U, qa(U, 1)];
    }), p = C(
      () => a.placeholder ?? (a.locale === "es" ? "Seleccionar fechas" : "Select dates")
    ), g = C(() => a.ariaLabel ?? p.value), b = C(() => Mr(a.locale)), y = C(() => m$(a.locale)), v = C(() => g$(a.locale)), x = C(
      () => a.locale === "es" ? "Preajustes de rango" : "Range presets"
    ), k = C(
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
    ), R = C(() => {
      if (!a.modelValue.start || !a.modelValue.end) return p.value;
      const U = Je(a.modelValue.start), T = Je(a.modelValue.end);
      return `${wn(U, a.locale)} – ${wn(T, a.locale)}`;
    });
    function P(U, T) {
      return U.getMonth() === T.getMonth() && U.getFullYear() === T.getFullYear();
    }
    function I(U) {
      const T = je(U);
      if (a.minDate) {
        const z = je(Je(a.minDate));
        if (Yt(T, z)) return !0;
      }
      if (a.maxDate) {
        const z = je(Je(a.maxDate));
        if (Yt(z, T)) return !0;
      }
      return !1;
    }
    function M(U, T, z) {
      const K = jt(U, T), de = jt(U, z);
      if (K && de) return "rounded-lg";
      const ve = K || U.getDay() === 0, Q = de || U.getDay() === 6;
      return ve && Q ? "rounded-lg" : ve ? "rounded-l-lg" : Q ? "rounded-r-lg" : "rounded-none";
    }
    function L(U) {
      const T = v$(
        a.modelValue,
        U,
        /* @__PURE__ */ new Date(),
        a.minDate,
        a.maxDate
      ), z = "text-[#61616b] hover:bg-[#efeff0b3] dark:text-[#e3e3e8] dark:hover:bg-[#23232fb3]";
      return T ? `${z} font-medium` : z;
    }
    function B(U, T) {
      const z = P(T, U), K = I(T), de = a.modelValue.start ? je(Je(a.modelValue.start)) : null, ve = a.modelValue.end ? je(Je(a.modelValue.end)) : null, Q = je(T);
      if (K)
        return oS;
      let Y = sS;
      if (de && ve && Tr(Q, de) && Br(Q, ve)) {
        const ne = jt(Q, de), ie = jt(Q, ve);
        Y = `${M(Q, de, ve)} ${ne || ie ? lS : rS}`;
      }
      return z || (Y = `${Y} ${iS}`), Y;
    }
    function N(U) {
      const T = Ar(Dr(U), a.minDate, a.maxDate);
      n("update:modelValue", {
        start: rt(T.start),
        end: rt(T.end)
      }), d.value = Pt(T.start), c.value = null, l.value = !1;
    }
    function W(U) {
      if (I(U)) return;
      const T = je(U);
      if (!c.value) {
        c.value = new Date(T), n("update:modelValue", { start: rt(T), end: rt(T) });
        return;
      }
      let K = je(c.value), de = new Date(T);
      Yt(de, K) && ([K, de] = [de, K]), n("update:modelValue", { start: rt(K), end: rt(de) }), c.value = null, l.value = !1;
    }
    function q(U) {
      d.value = qa(d.value, U);
    }
    function ee() {
      l.value = !1;
    }
    function X(U) {
      if (U.stopPropagation(), l.value) {
        l.value = !1;
        return;
      }
      if (l.value = !0, c.value = null, a.modelValue.start)
        try {
          d.value = Pt(Je(a.modelValue.start));
        } catch {
        }
      He(() => r.value?.focus());
    }
    function le(U) {
      if (!l.value) return;
      const T = i.value;
      T && !T.contains(U.target) && (l.value = !1);
    }
    return Ee(l, (U) => {
      U && (c.value = null);
    }), Ze(() => {
      document.addEventListener("click", le);
    }), ct(() => {
      document.removeEventListener("click", le);
    }), (U, T) => (m(), _("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative font-sans"
    }, [
      e.label ? (m(), _("label", {
        key: 0,
        id: s,
        class: J(E(ot))
      }, A(e.label), 3)) : V("", !0),
      u("button", {
        type: "button",
        class: J([
          E(at),
          "group flex w-full items-center gap-2 text-left hover:bg-[#6b35e9] hover:text-white",
          l.value ? "border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": l.value,
        "aria-haspopup": "dialog",
        "aria-labelledby": e.label ? s : void 0,
        "aria-label": e.label ? void 0 : g.value,
        onClick: X
      }, [
        j(E(Mo), {
          class: "h-5 w-5 shrink-0 text-gray-500 transition-colors group-hover:text-white dark:text-slate-400",
          "aria-hidden": "true"
        }),
        u("span", {
          class: J([
            "min-w-0 flex-1 truncate",
            h.value ? "" : "text-[color:var(--kiut-text-muted)] group-hover:text-white dark:text-slate-500"
          ])
        }, A(R.value), 3)
      ], 10, O$),
      Ge(u("div", {
        ref_key: "panelRef",
        ref: r,
        role: "dialog",
        tabindex: "-1",
        "aria-modal": "true",
        "aria-label": $.value,
        class: J([
          D.value,
          "absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
        ]),
        onKeydown: Oa(Oe(ee, ["stop"]), ["escape"])
      }, [
        u("div", z$, [
          u("aside", {
            class: "w-full shrink-0 border-b border-gray-200 p-3 sm:w-[176px] sm:border-r sm:border-b-0 dark:border-[color:var(--kiut-border-light)]",
            "aria-label": x.value
          }, [
            u("p", j$, A(y.value), 1),
            u("ul", H$, [
              (m(!0), _(ce, null, me(b.value, (z) => (m(), _("li", {
                key: z.id
              }, [
                u("button", {
                  type: "button",
                  class: J(["w-full rounded-lg px-2 py-1.5 text-left text-xs transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40", L(z.id)]),
                  onClick: (K) => N(z.id)
                }, A(z.label), 11, W$)
              ]))), 128))
            ])
          ], 8, N$),
          u("div", K$, [
            u("div", Y$, [
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": k.value,
                onClick: T[0] || (T[0] = (z) => q(-1))
              }, [
                j(E(lr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, U$),
              u("div", q$, [
                u("span", X$, A(S.value), 1),
                u("div", G$, [
                  u("span", Z$, A(E(Ht)(f.value[0], e.locale)), 1),
                  u("span", Q$, A(E(Ht)(f.value[1], e.locale)), 1)
                ])
              ]),
              u("button", {
                type: "button",
                class: "inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]",
                "aria-label": w.value,
                onClick: T[1] || (T[1] = (z) => q(1))
              }, [
                j(E(cr), {
                  class: "h-4 w-4",
                  "aria-hidden": "true"
                })
              ], 8, J$)
            ]),
            u("div", eS, [
              (m(!0), _(ce, null, me(f.value, (z) => (m(), _("div", {
                key: `${z.getFullYear()}-${z.getMonth()}`,
                class: "w-full max-w-[252px] shrink-0"
              }, [
                u("div", tS, [
                  (m(!0), _(ce, null, me(v.value, (K) => (m(), _("span", { key: K }, A(K), 1))), 128))
                ]),
                u("div", aS, [
                  (m(!0), _(ce, null, me(E(Lr)(z), (K) => (m(), _("button", {
                    key: E(rt)(K),
                    type: "button",
                    disabled: I(K),
                    class: J(["relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100", B(z, K)]),
                    onClick: (de) => W(K)
                  }, A(K.getDate()), 11, nS))), 128))
                ])
              ]))), 128))
            ])
          ])
        ])
      ], 42, V$), [
        [Ut, l.value]
      ])
    ], 512));
  }
}), dS = ["disabled", "aria-expanded", "aria-label"], uS = { class: "min-w-0 flex-1 truncate" }, hS = ["aria-selected", "onClick", "onMouseenter"], fS = {
  class: "flex w-5 shrink-0 justify-center",
  "aria-hidden": "true"
}, gS = { class: "min-w-0 flex-1" }, mS = /* @__PURE__ */ ue({
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
    const a = e, n = t, s = `${`kiut-tag-select-${Ne()}`}-listbox`, i = se(null), r = se(null), l = se(null), c = se(null), d = se(!1), h = se(0), f = se({}), p = C(() => a.options.filter((q) => !q.disabled)), g = C(
      () => a.options.find((q) => q.value === a.modelValue) ?? null
    ), b = C(() => g.value?.color ?? "neutral"), y = C(
      () => ur(b.value, a.outlined)
    ), v = C(() => g.value ? g.value.label : a.modelValue !== null && a.modelValue !== void 0 && a.modelValue !== "" ? String(a.modelValue) : p.value[0]?.label ?? "Seleccionar…"), x = C(
      () => a.ariaLabel ?? `Estado: ${v.value}`
    );
    function k() {
      const q = r.value;
      if (!q) return;
      const ee = q.getBoundingClientRect();
      f.value = {
        top: `${ee.bottom + 4}px`,
        left: `${ee.left}px`,
        minWidth: `${ee.width}px`
      };
    }
    function w(q) {
      return `${String(q.value)}-${q.label}`;
    }
    function $(q) {
      return a.modelValue === q.value;
    }
    function D(q, ee) {
      const X = $(q), le = h.value === ee;
      return [
        "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
        X ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white" : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
        !X && le ? "bg-slate-100 dark:bg-white/5" : ""
      ];
    }
    function S() {
      h.value = Math.max(
        0,
        p.value.findIndex((q) => q.value === a.modelValue)
      );
    }
    function R() {
      k(), S(), He(() => c.value?.focus());
    }
    function P() {
      d.value = !1;
    }
    function I(q) {
      n("update:modelValue", q.value), P();
    }
    function M() {
      if (!a.disabled) {
        if (d.value) {
          P();
          return;
        }
        d.value = !0, R();
      }
    }
    function L(q) {
      q.stopPropagation(), !a.disabled && M();
    }
    function B(q) {
      if (!d.value) return;
      const ee = q.target, X = i.value, le = l.value;
      X && !X.contains(ee) && (!le || !le.contains(ee)) && P();
    }
    function N(q) {
      a.disabled || (q.key === "ArrowDown" || q.key === "Enter" || q.key === " ") && (q.preventDefault(), d.value || (d.value = !0, R()));
    }
    function W(q) {
      const ee = p.value;
      if (q.key === "Escape") {
        q.preventDefault(), P(), r.value?.focus();
        return;
      }
      if (ee.length !== 0) {
        if (q.key === "ArrowDown") {
          q.preventDefault(), h.value = Math.min(h.value + 1, ee.length - 1);
          return;
        }
        if (q.key === "ArrowUp") {
          q.preventDefault(), h.value = Math.max(h.value - 1, 0);
          return;
        }
        if (q.key === "Enter") {
          q.preventDefault();
          const X = ee[h.value];
          X && I(X);
        }
      }
    }
    return Ze(() => {
      document.addEventListener("click", B);
    }), ct(() => {
      document.removeEventListener("click", B);
    }), (q, ee) => (m(), _("div", {
      ref_key: "rootRef",
      ref: i,
      class: "relative inline-flex font-sans"
    }, [
      u("button", {
        ref_key: "buttonRef",
        ref: r,
        type: "button",
        disabled: e.disabled,
        class: J([
          E(dr),
          "cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50",
          y.value,
          d.value ? "ring-2 ring-[color:var(--kiut-primary)]/25" : ""
        ]),
        "aria-expanded": d.value,
        "aria-haspopup": "listbox",
        "aria-controls": s,
        "aria-label": x.value,
        onClick: L,
        onKeydown: N
      }, [
        u("span", uS, A(v.value), 1),
        j(E(Gt), {
          class: J(["h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", d.value ? "rotate-180" : ""]),
          "aria-hidden": "true"
        }, null, 8, ["class"])
      ], 42, dS),
      (m(), ae(la, { to: "body" }, [
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
            onKeydown: Oe(W, ["stop"])
          }, [
            (m(!0), _(ce, null, me(p.value, (X, le) => (m(), _("li", {
              key: w(X),
              role: "option",
              "aria-selected": $(X),
              class: J(D(X, le)),
              onClick: Oe((U) => I(X), ["stop"]),
              onMouseenter: (U) => h.value = le
            }, [
              u("span", fS, [
                $(X) ? (m(), ae(E(Do), {
                  key: 0,
                  class: "h-4 w-4 text-white"
                })) : V("", !0)
              ]),
              u("span", gS, A(X.label), 1)
            ], 42, hS))), 128))
          ], 544)
        ], 4), [
          [Ut, d.value]
        ])
      ]))
    ], 512));
  }
}), pS = ["aria-label"], bS = { class: "flex flex-col gap-1" }, vS = { class: "flex flex-row gap-3 items-center" }, yS = {
  key: 0,
  class: "flex flex-row gap-1 items-center"
}, xS = {
  key: 1,
  class: "flex flex-row gap-1 items-center"
}, _S = /* @__PURE__ */ ue({
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
    return (s, i) => (m(), _("div", {
      role: "region",
      "aria-label": e.title,
      class: J([
        o.value.container,
        E(t).class,
        "p-4 flex flex-row gap-2 justify-start items-start border rounded-xl"
      ])
    }, [
      s.$slots.icon ? (m(), _("div", {
        key: 0,
        class: J([
          o.value.container_icon,
          "p-2 rounded-4xl flex justify-center items-center"
        ])
      }, [
        u("span", {
          class: J([
            o.value.icon,
            "inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
          ]),
          "aria-hidden": "true"
        }, [
          ke(s.$slots, "icon")
        ], 2)
      ], 2)) : V("", !0),
      u("div", bS, [
        u("h1", {
          class: J([o.value.title, "text-base font-bold"])
        }, A(a.title), 3),
        u("span", {
          class: J([o.value.description, "text-sm leading-snug"])
        }, A(a.description), 3),
        u("div", vS, [
          a.date_start ? (m(), _("div", yS, [
            s.$slots.icon_date ? (m(), _("span", {
              key: 0,
              class: J([
                o.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(s.$slots, "icon_date")
            ], 2)) : V("", !0),
            a.subtitle_date_start ? (m(), _("span", {
              key: 1,
              class: J([o.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_start), 3)) : V("", !0),
            u("span", {
              class: J([o.value.date, "text-xs"])
            }, A(a.date_start), 3)
          ])) : V("", !0),
          a.date_final ? (m(), _("div", xS, [
            s.$slots.icon_date ? (m(), _("span", {
              key: 0,
              class: J([
                o.value.icon_date,
                "inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]"
              ]),
              "aria-hidden": "true"
            }, [
              ke(s.$slots, "icon_date")
            ], 2)) : V("", !0),
            a.subtitle_date_final ? (m(), _("span", {
              key: 1,
              class: J([o.value.subtitle_date, "text-xs font-bold"])
            }, A(a.subtitle_date_final), 3)) : V("", !0),
            u("span", {
              class: J([o.value.date, "text-xs"])
            }, A(a.date_final), 3)
          ])) : V("", !0)
        ])
      ])
    ], 10, pS));
  }
}), kS = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]",
  "aria-hidden": "false"
}, wS = ["id"], CS = { class: "min-w-0 flex-1 space-y-1" }, $S = {
  key: 0,
  class: "text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
}, SS = { class: "min-h-0 flex-1 overflow-y-auto px-6 py-6" }, MS = { class: "flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2" }, DS = /* @__PURE__ */ ue({
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
    const a = e, n = C(() => ({ maxWidth: `${a.width}px` })), o = t, i = `${`kiut-modal-${Ne()}`}-title`, r = se(null);
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
    }), (h, f) => (m(), ae(la, { to: "body" }, [
      j(ut, { name: "kiut-modal" }, {
        default: F(() => [
          e.modelValue ? (m(), _("div", kS, [
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
              onClick: f[0] || (f[0] = Oe(() => {
              }, ["stop"]))
            }, [
              u("header", {
                class: J(["flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]", e.subtitle ? "items-start" : "items-center"])
              }, [
                u("div", CS, [
                  u("h2", {
                    id: i,
                    class: "text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                  }, A(e.title), 1),
                  e.subtitle ? (m(), _("p", $S, A(e.subtitle), 1)) : V("", !0)
                ]),
                j(xt, {
                  variant: "action",
                  type: "button",
                  class: "shrink-0",
                  disabled: e.loading,
                  onClick: l
                }, {
                  icon: F(() => [
                    j(E(ao), { class: "h-5 w-5" })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2),
              u("div", SS, [
                ke(h.$slots, "default", {}, void 0, !0)
              ]),
              u("footer", MS, [
                j(xt, {
                  variant: "secondary",
                  type: "button",
                  disabled: e.loading,
                  onClick: l
                }, {
                  default: F(() => [
                    Ae(A(e.cancelLabel), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                j(xt, {
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
              ])
            ], 12, wS)
          ])) : V("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), AS = /* @__PURE__ */ pe(DS, [["__scopeId", "data-v-9134bb89"]]), TS = { class: "text-left font-['Inter',system-ui,sans-serif]" }, BS = {
  key: 0,
  class: ""
}, LS = {
  key: 0,
  class: "flex min-w-0 flex-col gap-1.5 mb-4"
}, ES = { class: "flex min-w-0 flex-1 items-center" }, RS = {
  key: 0,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, PS = {
  key: 0,
  class: "flex min-w-0 flex-1 flex-wrap items-center gap-2"
}, IS = {
  key: 1,
  class: "flex shrink-0 flex-wrap items-center gap-2"
}, FS = /* @__PURE__ */ ue({
  name: "Section",
  __name: "Section",
  setup(e) {
    const t = oo(), a = C(() => {
      const n = !!t.filters, o = !!t.actions;
      return n && o ? "justify-between" : o ? "justify-end" : "";
    });
    return (n, o) => (m(), _("section", TS, [
      n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions ? (m(), _("header", BS, [
        n.$slots.description ? (m(), _("div", LS, [
          ke(n.$slots, "description")
        ])) : V("", !0),
        n.$slots.tabs ? (m(), _("div", {
          key: 1,
          class: J(["flex flex-wrap items-center gap-2", n.$slots.filters ? "" : "justify-between"])
        }, [
          u("div", ES, [
            ke(n.$slots, "tabs")
          ]),
          n.$slots.actions && !n.$slots.filters ? (m(), _("div", RS, [
            ke(n.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0),
        n.$slots.filters || n.$slots.actions && !n.$slots.tabs ? (m(), _("div", {
          key: 2,
          class: J([
            "flex flex-wrap gap-2 items-center",
            n.$slots.tabs ? "mt-2" : "",
            a.value
          ])
        }, [
          n.$slots.filters ? (m(), _("div", PS, [
            ke(n.$slots, "filters")
          ])) : V("", !0),
          n.$slots.actions ? (m(), _("div", IS, [
            ke(n.$slots, "actions")
          ])) : V("", !0)
        ], 2)) : V("", !0)
      ])) : V("", !0),
      n.$slots.content || n.$slots.default ? (m(), _("div", {
        key: 1,
        class: J({
          "mt-6": n.$slots.description || n.$slots.tabs || n.$slots.filters || n.$slots.actions
        })
      }, [
        ke(n.$slots, "content", {}, () => [
          ke(n.$slots, "default")
        ])
      ], 2)) : V("", !0)
    ]));
  }
}), OS = { class: "flex flex-1 min-h-0" }, VS = {
  key: 0,
  class: "flex justify-center items-center my-4 shrink-0"
}, zS = {
  class: "flex-1 overflow-y-auto p-1 flex flex-col gap-1",
  "aria-label": "Sections"
}, NS = ["aria-current", "data-has-active", "title", "onClick"], jS = {
  key: 1,
  class: "footer-section shrink-0 border-t [background-color:var(--kiut-lateral-bg)]"
}, HS = { class: "px-4 py-4 shrink-0" }, WS = { class: "text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]" }, KS = {
  class: "flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5",
  "aria-label": "Section items"
}, YS = ["data-nav-id", "aria-current", "onClick"], US = { class: "flex items-center justify-between px-5 py-3 shrink-0" }, qS = { class: "text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]" }, XS = {
  class: "overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1",
  "aria-label": "Section items"
}, GS = ["data-nav-id", "aria-current", "onClick"], ZS = { class: "truncate text-[15px]" }, QS = ["aria-current", "data-has-active", "onClick"], JS = {
  key: 0,
  class: "absolute top-0 w-1/2 h-0.5 rounded-full [background-color:var(--kiut-primary)]",
  "aria-hidden": "true"
}, e4 = { class: "text-[9px] font-semibold leading-none truncate w-full text-center px-0.5" }, t4 = /* @__PURE__ */ ue({
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
    const a = se(!1), n = e, o = t, s = Xa(), { class: i, ...r } = s, l = se(!1);
    function c() {
      typeof window > "u" || (l.value = window.innerWidth < n.mobileBreakpoint);
    }
    Ze(() => {
      c(), window.addEventListener("resize", c);
    }), ct(() => {
      window.removeEventListener("resize", c);
    });
    const d = C(() => {
      const v = n.sections.find((x) => x.id === n.selectedSectionId);
      return v?.items?.length ? v : null;
    });
    function h(v) {
      return n.activePath ? n.activePath === v.path || n.activePath.startsWith(v.path + "/") : !1;
    }
    function f(v) {
      return v.items?.length ? v.items.some(h) : !n.activePath || !v.path ? !1 : n.activePath === v.path || n.activePath.startsWith(v.path + "/");
    }
    function p(v) {
      if (!v.items?.length) {
        o("update:selectedSectionId", null), o("navigate", {
          section: v,
          item: { id: v.id, label: v.label, path: v.path }
        });
        return;
      }
      const x = n.selectedSectionId === v.id ? null : v.id;
      o("update:selectedSectionId", x);
    }
    function g(v, x) {
      o("navigate", { section: v, item: x });
    }
    function b() {
      o("update:selectedSectionId", null);
    }
    function y(v, x) {
      g(v, x), b();
    }
    return (v, x) => l.value ? (m(), _("div", gt({
      key: 1,
      class: "kiut-app-shell-nav font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      j(ut, { name: "ksn-overlay" }, {
        default: F(() => [
          d.value ? (m(), _("div", {
            key: 0,
            class: "fixed inset-0 bg-black/40 z-40",
            "aria-hidden": "true",
            onClick: b
          })) : V("", !0)
        ]),
        _: 1
      }),
      j(ut, { name: "ksn-sheet" }, {
        default: F(() => [
          d.value ? (m(), _("div", {
            key: 0,
            class: "mobile-subsections fixed left-0 right-0 bottom-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t max-h-[70vh] flex flex-col",
            style: Ce({ paddingBottom: n.mobileBarHeight })
          }, [
            x[3] || (x[3] = u("div", { class: "flex justify-center pt-3 pb-1 shrink-0" }, [
              u("div", { class: "w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30" })
            ], -1)),
            u("div", US, [
              u("p", qS, A(d.value.label), 1),
              u("button", {
                type: "button",
                class: "w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors",
                "aria-label": "Close",
                onClick: b
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
            u("nav", XS, [
              (m(!0), _(ce, null, me(d.value.items, (k) => (m(), _("button", {
                key: k.id,
                type: "button",
                "data-nav-id": k.id,
                "aria-current": h(k) ? "page" : void 0,
                class: "ksn-item-btn group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]",
                onClick: (w) => y(d.value, k)
              }, [
                k.icon ? (m(), ae(St(k.icon), {
                  key: 0,
                  class: "shrink-0",
                  style: { width: "18px", height: "18px" },
                  "aria-hidden": "true"
                })) : V("", !0),
                u("span", ZS, A(k.label), 1)
              ], 8, GS))), 128))
            ])
          ], 4)) : V("", !0)
        ]),
        _: 1
      }),
      u("nav", {
        class: "ksn-mobile-bar fixed bottom-0 left-0 right-0 z-50 border-t flex items-stretch justify-around overflow-hidden",
        style: Ce({ height: e.mobileBarHeight }),
        "aria-label": "Sections"
      }, [
        (m(!0), _(ce, null, me(e.sections, (k) => (m(), _("button", {
          key: k.id,
          type: "button",
          "aria-current": e.selectedSectionId === k.id ? "true" : void 0,
          "data-has-active": f(k) ? "true" : void 0,
          class: "ksn-section-btn relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset",
          onClick: (w) => p(k)
        }, [
          e.selectedSectionId === k.id || f(k) ? (m(), _("span", JS)) : V("", !0),
          k.icon ? (m(), ae(St(k.icon), {
            key: 1,
            class: "shrink-0",
            style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
            "aria-hidden": "true"
          }, null, 8, ["style"])) : V("", !0),
          u("span", e4, A(k.label), 1)
        ], 8, QS))), 128))
      ], 4)
    ], 16)) : (m(), _("aside", gt({
      key: 0,
      class: "kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]",
      role: "navigation",
      "aria-label": "Main navigation"
    }, r), [
      u("div", OS, [
        u("div", {
          class: "primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center",
          style: Ce({
            "--expanded-width": e.expandedPrimaryWidth,
            width: e.primaryRailWidth
          }),
          onMouseenter: x[0] || (x[0] = (k) => a.value = !0),
          onMouseleave: x[1] || (x[1] = (k) => a.value = !1)
        }, [
          v.$slots.logo ? (m(), _("div", VS, [
            ke(v.$slots, "logo", { expanded: a.value }, void 0, !0)
          ])) : V("", !0),
          u("nav", zS, [
            (m(!0), _(ce, null, me(e.sections, (k) => (m(), _("button", {
              key: k.id,
              type: "button",
              "aria-current": e.selectedSectionId === k.id ? "true" : void 0,
              "data-has-active": f(k) ? "true" : void 0,
              title: k.label,
              class: "ksn-section-btn group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
              onClick: (w) => p(k)
            }, [
              k.icon ? (m(), ae(St(k.icon), {
                key: 0,
                class: "shrink-0",
                style: Ce({ width: e.primaryIconSize, height: e.primaryIconSize }),
                "aria-hidden": "true"
              }, null, 8, ["style"])) : V("", !0),
              u("span", {
                class: "leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-",
                style: Ce({ fontSize: e.primaryFontSize })
              }, A(k.label), 5)
            ], 8, NS))), 128))
          ]),
          v.$slots.footer ? (m(), _("div", jS, [
            ke(v.$slots, "footer", { expanded: a.value }, void 0, !0)
          ])) : V("", !0)
        ], 36),
        j(ut, { name: "ksn-sub" }, {
          default: F(() => [
            d.value ? (m(), _("div", {
              key: "secondary",
              class: "secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden",
              style: Ce({ width: e.secondaryWidth })
            }, [
              u("div", HS, [
                u("p", WS, A(d.value.label), 1)
              ]),
              u("nav", KS, [
                (m(!0), _(ce, null, me(d.value.items, (k) => (m(), _("button", {
                  key: k.id,
                  type: "button",
                  "data-nav-id": k.id,
                  "aria-current": h(k) ? "page" : void 0,
                  class: "ksn-item-btn group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20",
                  onClick: (w) => g(d.value, k)
                }, [
                  k.icon ? (m(), ae(St(k.icon), {
                    key: 0,
                    style: Ce({ width: e.secondaryIconSize, height: e.secondaryIconSize })
                  }, null, 8, ["style"])) : V("", !0),
                  u("span", {
                    class: "truncate",
                    style: Ce({ fontSize: e.secondaryFontSize })
                  }, A(k.label), 5)
                ], 8, YS))), 128))
              ])
            ], 4)) : V("", !0)
          ]),
          _: 1
        })
      ])
    ], 16));
  }
}), a4 = /* @__PURE__ */ pe(t4, [["__scopeId", "data-v-e0ccb96c"]]), f4 = {
  install(e) {
    e.component("KiutChartBar", kt), e.component("KiutChartLine", ht), e.component("KiutPieChart", Dn), e.component("KiutBoxplotChart", Mf), e.component("KiutCandlestickChart", gg), e.component("KiutHistogramChart", ir), e.component("KiutSankeyChart", Zt), e.component("KiutAgentsPerDay", hp), e.component("KiutBookingManager", Kp), e.component("KiutCheckin", hr), e.component("KiutCheckinContainer", P0), e.component("KiutCheckinMetrics", _0), e.component("KiutCheckinSegments", fr), e.component("KiutDisruption", J0), e.component("KiutFAQ", rb), e.component("KiutMessagesPerAgent", bb), e.component("KiutRecordLocator", Pb), e.component("KiutSalesByChannel", gr), e.component("KiutSeller", mr), e.component("KiutSellerContainer", _v), e.component("KiutTopAgents", Dv), e.component("KiutPaymentMethod", Xv), e.component("KiutAgentHumanConversations", Ry), e.component("KiutChannelMetrics", Wy), e.component("KiutTriageCombinations", o1), e.component("KiutSelectLanguage", d1), e.component("KiutGuardrails", x1), e.component("KiutDisruptionNotifier", z1), e.component("KiutTotalConversationsCard", N1), e.component("KiutCsatP95Card", j1), e.component("KiutCsatPulseCard", H1), e.component("KiutCSATContainer", bx), e.component("KiutAiGeneratedRevenueCard", vx), e.component("KiutAiGeneratedChart", Sx), e.component("KiutCostCard", Dx), e.component("KiutHumanEscalations", Ix), e.component("KiutHumanEscalationsCard", Fx), e.component("KiutAvgResolutionTime", Xx), e.component("KiutAvgResolutionTimeCard", t_), e.component("KiutNpsDailyMetrics", br), e.component("KiutNpsMetrics", vr), e.component("KiutNpsOverviewMetrics", pr), e.component("KiutAWSCost", c_), e.component("KiutCostUsage", y_), e.component("KiutTokenUsage", A_), e.component("KiutConversationCount", V_), e.component("KiutTopAgentsAnalysis", Z_), e.component("KiutTopAgentsPie", ik), e.component("KiutDailyCostTrends", mk), e.component("KiutModelUsage", Ak), e.component("KiutMessageRoles", Ok), e.component("KiutCostPerConversations", Gk), e.component("Tabs", yr), e.component("Table", f2), e.component("TableVersions", iw), e.component("Filters", Vw), e.component("InputText", Cr), e.component("InputPassword", Qw), e.component("InputTextarea", n5), e.component("InputFile", w5), e.component("ImageUploadCircle", T5), e.component("InputDateTime", I5), e.component("InputTime", j5), e.component("InputRange", aC), e.component("InputNumber", rC), e.component("InputColorPicker", pC), e.component("EmojiPicker", RC), e.component("Select", An), e.component("MultiSelect", HC), e.component("Toggle", wr), e.component("InputPhone", ZC), e.component("SelectablePills", o$), e.component("SegmentedControl", l$), e.component("DateRangePicker", F$), e.component("DatePickerPresets", cS), e.component("Tag", Ue), e.component("TagSelect", mS), e.component("Button", xt), e.component("Banner", _S), e.component("Modal", AS), e.component("Section", FS), e.component("KiutAppShellNavigation", a4);
  }
};
export {
  c_ as AWSCost,
  Ry as AgentHumanConversations,
  hp as AgentsPerDay,
  Sx as AiGeneratedChart,
  vx as AiGeneratedRevenueCard,
  a4 as AppShellNavigation,
  Xx as AvgResolutionTime,
  t_ as AvgResolutionTimeCard,
  _S as Banner,
  Kp as BookingManager,
  Mf as BoxplotChart,
  xt as Button,
  bx as CSATContainer,
  gg as CandlestickChart,
  Wy as ChannelMetrics,
  kt as ChartBar,
  ht as ChartLine,
  hr as Checkin,
  P0 as CheckinContainer,
  _0 as CheckinMetrics,
  fr as CheckinSegments,
  V_ as ConversationCount,
  Dx as CostCard,
  Gk as CostPerConversations,
  y_ as CostUsage,
  j1 as CsatP95Card,
  H1 as CsatPulseCard,
  $r as DEFAULT_CATEGORY_LABELS,
  Sr as DEFAULT_EMOJI_CATALOG,
  V2 as DEFAULT_TABLE_VERSIONS_LABELS,
  mk as DailyCostTrends,
  cS as DatePickerPresets,
  F$ as DateRangePicker,
  J0 as Disruption,
  z1 as DisruptionNotifier,
  z2 as ENDPOINT_TABLE_VERSIONS_COLUMNS,
  RC as EmojiPicker,
  rb as FAQ,
  Vw as Filters,
  x1 as Guardrails,
  ir as HistogramChart,
  Ix as HumanEscalations,
  Fx as HumanEscalationsCard,
  T5 as ImageUploadCircle,
  pC as InputColorPicker,
  I5 as InputDateTime,
  w5 as InputFile,
  rC as InputNumber,
  Qw as InputPassword,
  ZC as InputPhone,
  aC as InputRange,
  Cr as InputText,
  n5 as InputTextarea,
  j5 as InputTime,
  f4 as KiutUIPlugin,
  Ok as MessageRoles,
  bb as MessagesPerAgent,
  AS as Modal,
  Ak as ModelUsage,
  HC as MultiSelect,
  br as NpsDailyMetrics,
  vr as NpsMetrics,
  pr as NpsOverviewMetrics,
  Xv as PaymentMethod,
  Dn as PieChart,
  u4 as RESOURCE_TABLE_VERSIONS_COLUMNS,
  Pb as RecordLocator,
  gr as SalesByChannel,
  Zt as SankeyChart,
  FS as Section,
  l$ as SegmentedControl,
  An as Select,
  d1 as SelectLanguage,
  o$ as SelectablePills,
  mr as Seller,
  _v as SellerContainer,
  f2 as Table,
  iw as TableVersions,
  yr as Tabs,
  Ue as Tag,
  mS as TagSelect,
  wr as Toggle,
  A_ as TokenUsage,
  Dv as TopAgents,
  Z_ as TopAgentsAnalysis,
  ik as TopAgentsPie,
  N1 as TotalConversationsCard,
  o1 as TriageCombinations,
  xC as appendEmojiToDraft,
  h4 as buildDefaultCategories,
  yC as extractEmojis,
  vC as filterEmojiCatalog
};
//# sourceMappingURL=kiut-ui.es.js.map
